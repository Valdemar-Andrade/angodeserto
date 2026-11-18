"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import {
  altLimit, captionLimit, displayPhotos, galleryLimit, highlightLimit, parseEditorial, titleLimit,
  type EditorialContent, type EditorialPhoto, type EditorialSection, type EditorialState,
} from "../../content/editorial";
import Gallery from "../Gallery";
import SpecialHighlight from "../SpecialHighlight";
import Logout from "./Logout";
import { preparePhoto } from "./prepare-photo";
import { adminRequest } from "./request";

type Action = "publish" | "restore" | "withdraw";
type Notice = { text: string; error?: boolean };

const confirmations = {
  publish: { title: "Publicar alterações?", text: "A seleção vai aparecer no website.", confirm: "Publicar" },
  restore: { title: "Recuperar a versão anterior?", text: "A versão anterior voltará ao website e substituirá o rascunho aberto.", confirm: "Recuperar versão" },
  withdraw: { title: "Retirar o destaque?", text: "O capítulo ficará oculto na homepage. Pode recuperar a publicação anterior.", confirm: "Retirar destaque" },
};

const accept = "image/jpeg,image/png,image/webp";
const fields = ["alt", "caption"] as const;

export default function AdminEditor({ initial }: { initial: Record<EditorialSection, EditorialState> }) {
  const [section, setSection] = useState<EditorialSection>("gallery");
  const [published, setPublished] = useState(initial);
  const [drafts, setDrafts] = useState({ gallery: initial.gallery.content, highlight: initial.highlight.content });
  const [preview, setPreview] = useState(false);
  const [action, setAction] = useState<Action>("publish");
  const [pending, setPending] = useState("");
  const [notice, setNotice] = useState<Notice>();
  const dialog = useRef<HTMLDialogElement>(null);
  const previewHeading = useRef<HTMLHeadingElement>(null);

  const gallery = section === "gallery";
  const limit = gallery ? galleryLimit : highlightLimit;
  const draft = drafts[section];
  const state = published[section];
  const images = displayPhotos(draft.photos, true);
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.content);

  function update(change: (draft: EditorialContent) => EditorialContent) {
    setDrafts((previous) => ({ ...previous, [section]: change(previous[section]) }));
  }

  function editPhoto(index: number, field: "alt" | "caption", value: string) {
    update((draft) => ({
      ...draft, photos: draft.photos.map((photo, i) => i === index ? { ...photo, [field]: value } : photo),
    }));
  }

  function movePhoto(index: number, direction: -1 | 1) {
    update((draft) => {
      const photos = [...draft.photos];
      const destination = index + direction;
      if (destination < 0 || destination >= photos.length) return draft;
      [photos[index], photos[destination]] = [photos[destination], photos[index]];
      return { ...draft, photos };
    });
  }

  async function addPhotos(event: ChangeEvent<HTMLInputElement>, replace?: number) {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    const remaining = replace === undefined ? limit - draft.photos.length : 1;
    if (pending || !files.length) return;
    if (files.length > remaining) {
      setNotice({ text: `Pode escolher até ${remaining} fotografia(s) nesta operação.`, error: true });
      return;
    }

    const added: EditorialPhoto[] = [];
    setNotice(undefined);
    try {
      for (const [index, file] of files.entries()) {
        setPending(`A preparar fotografia ${index + 1} de ${files.length}…`);
        const prepared = await preparePhoto(file);
        setPending(`A carregar fotografia ${index + 1} de ${files.length}…`);
        added.push(await adminRequest<EditorialPhoto>("/api/admin/photos", prepared));
      }
      setNotice({ text: "Fotografias no rascunho. Reveja as descrições antes de publicar." });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Falha no carregamento.";
      setNotice({ text: added.length ? `${reason} As fotografias já carregadas ficaram no rascunho.` : reason, error: true });
    } finally {
      if (added.length) {
        update((draft) => ({
          ...draft,
          photos: replace === undefined
            ? [...draft.photos, ...added]
            : draft.photos.map((photo, index) => index === replace
              ? { ...added[0], alt: photo.alt, caption: photo.caption } : photo),
        }));
      }
      setPending("");
    }
  }

  function ask(nextAction: Action) {
    setNotice(undefined);
    if (nextAction === "publish" && (!draft.photos.length || !parseEditorial(section, draft))) {
      setNotice({ text: "Adicione as fotografias e preencha todas as descrições alternativas.", error: true });
      return;
    }
    setAction(nextAction);
    dialog.current?.showModal();
  }

  async function apply() {
    dialog.current?.close();
    setPending(action === "publish" ? "A publicar…" : "A atualizar…");
    try {
      const next = await adminRequest<EditorialState>(`/api/admin/content/${section}`, {
        action, revision: state.revision, ...(action === "publish" ? { content: draft } : {}),
      });
      setPublished((previous) => ({ ...previous, [section]: next }));
      setDrafts((previous) => ({ ...previous, [section]: next.content }));
      setNotice({ text: action === "withdraw" ? "Destaque retirado do website." : "Alterações publicadas." });
    } catch (error) {
      setNotice({ text: error instanceof Error ? error.message : "A atualização falhou. O rascunho foi mantido.", error: true });
    } finally {
      setPending("");
    }
  }

  return (
    <>
      <div className="admin-heading">
        <h1>Gestão de Fotografias</h1>
        <Logout disabled={Boolean(pending)} />
      </div>
      <nav className="admin-areas" aria-label="Áreas administrativas">
        <button type="button" aria-pressed={gallery} disabled={Boolean(pending)}
          onClick={() => { setSection("gallery"); setNotice(undefined); }}>Galeria</button>
        <button type="button" aria-pressed={!gallery} disabled={Boolean(pending)}
          onClick={() => { setSection("highlight"); setNotice(undefined); }}>Destaques</button>
      </nav>

      <section className="admin-panel admin-area" aria-labelledby="admin-area-title">
        <header className="admin-area-heading">
          <div>
            <h2 id="admin-area-title">{gallery ? "Galeria" : "Destaques Especiais"}</h2>
            <p>{gallery ? `${draft.photos.length} de ${limit} fotografias` : state.content.photos.length
              ? "Um destaque publicado" : "Sem destaque publicado"}{dirty ? " · Rascunho por publicar" : ""}</p>
          </div>
          <button type="button" className="admin-button" aria-expanded={preview} onClick={() => {
            setPreview(!preview);
            if (!preview) requestAnimationFrame(() => previewHeading.current?.focus());
          }}>{preview ? "Fechar pré-visualização" : "Pré-visualizar"}</button>
        </header>

        <fieldset disabled={Boolean(pending)}>
          {!gallery && (
            <label className="admin-input-label admin-title-field">Título (opcional)
              <input type="text" value={draft.title} maxLength={titleLimit}
                onChange={(event) => update((draft) => ({ ...draft, title: event.target.value }))} />
            </label>
          )}
          <ol className="admin-photos">
            {draft.photos.map((photo, index) => (
              <li className="admin-photo" key={photo.key}>
                <div className="admin-thumb">
                  <Image src={images[index].src} alt={photo.alt || "Fotografia por descrever"} width={photo.width}
                    height={photo.height} sizes="(min-width: 650px) 200px, 90vw" unoptimized={images[index].unoptimized} />
                </div>
                <div className="admin-photo-editor">
                  <p className="admin-photo-position">{gallery ? `Fotografia ${index + 1}`
                    : index === 0 ? "Fotografia principal" : `Complementar ${index}`}</p>
                  {(gallery ? fields : fields.slice(0, 1)).map((field) => (
                    <label className="admin-input-label" key={field}>
                      {field === "alt" ? "Descrição alternativa" : "Legenda (opcional)"}
                      <input type="text" value={photo[field]} maxLength={field === "alt" ? altLimit : captionLimit}
                        onChange={(event) => editPhoto(index, field, event.target.value)}
                        placeholder={field === "alt" ? "O que aparece na fotografia?" : undefined} />
                    </label>
                  ))}
                  <div className="admin-photo-actions">
                    <button type="button" className="admin-button" disabled={index === 0}
                      aria-label={`Subir fotografia ${index + 1}`} onClick={() => movePhoto(index, -1)}>Subir</button>
                    <button type="button" className="admin-button" disabled={index === draft.photos.length - 1}
                      aria-label={`Descer fotografia ${index + 1}`} onClick={() => movePhoto(index, 1)}>Descer</button>
                    <label className="admin-file admin-button">
                      Substituir
                      <input type="file" accept={accept} aria-label={`Substituir fotografia ${index + 1}`}
                        onChange={(event) => void addPhotos(event, index)} />
                    </label>
                    <button type="button" className="admin-button admin-button--remove" aria-label={`Retirar fotografia ${index + 1}`}
                      onClick={() => update((draft) => ({ ...draft, photos: draft.photos.filter((_, i) => index !== i) }))}>Retirar</button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          {draft.photos.length < limit && (
            <label className="admin-upload">
              {gallery || draft.photos.length ? "Adicionar fotografias" : "Adicionar fotografia principal"}
              <input type="file" multiple accept={accept} onChange={(event) => void addPhotos(event)} />
              <small>JPEG, PNG ou WebP · até 28 MB por original</small>
            </label>
          )}
          <div className="admin-publication">
            <button type="button" className="admin-button admin-button--solid" disabled={!dirty} onClick={() => ask("publish")}>
              Publicar alterações
            </button>
            {!gallery && state.content.photos.length > 0 && (
              <button type="button" className="admin-button admin-button--remove" onClick={() => ask("withdraw")}>Retirar destaque</button>
            )}
            {state.canRestore && <button type="button" className="admin-button" onClick={() => ask("restore")}>
              Recuperar versão anterior
            </button>}
          </div>
        </fieldset>

        {pending && <p className="admin-notice" role="status">{pending}</p>}
        {notice && <p className={`admin-notice${notice.error ? " admin-notice--error" : ""}`}
          role={notice.error ? "alert" : "status"}>{notice.text}</p>}
      </section>

      {preview && (
        <section className="admin-preview" aria-labelledby="admin-preview-title">
          <h2 id="admin-preview-title" ref={previewHeading} tabIndex={-1}>Pré-visualização do rascunho</h2>
          {images.length === 0 ? <p>Adicione uma fotografia para ver a composição.</p>
            : gallery ? <Gallery photos={images} /> : <SpecialHighlight title={draft.title.trim()} photos={images} />}
        </section>
      )}

      <dialog className="admin-confirm" ref={dialog} aria-labelledby="admin-confirm-title">
        <h2 id="admin-confirm-title">{confirmations[action].title}</h2>
        <p>{confirmations[action].text}</p>
        <div className="admin-publication">
          <button type="button" className="admin-button" autoFocus onClick={() => dialog.current?.close()}>Cancelar</button>
          <button type="button" className="admin-button admin-button--solid" onClick={() => void apply()}>
            {confirmations[action].confirm}
          </button>
        </div>
      </dialog>
    </>
  );
}
