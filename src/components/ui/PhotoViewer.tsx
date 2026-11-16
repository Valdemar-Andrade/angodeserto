"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import type { Photo } from "../../content/photos";

export default function PhotoViewer({ photos, label, children }: {
  photos: readonly Photo[];
  label: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [imageResult, setImageResult] = useState<{ src: Photo["src"]; status: "loaded" | "error" }>();
  const viewer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const photo = active === null ? undefined : photos[active];
  const imageStatus = imageResult?.src === photo?.src ? imageResult?.status : undefined;

  function openPhoto(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>("button[data-photo-index]");
    if (!button) return;

    const index = Number(button.dataset.photoIndex);
    if (!photos[index]) return;

    trigger.current = button;
    setActive(index);
    viewer.current?.showModal();
  }

  function step(direction: number) {
    setActive((previous) => previous === null ? null : (previous + direction + photos.length) % photos.length);
  }

  return (
    <>
      <div onClick={openPhoto}>{children}</div>
      <dialog
        className="photo-viewer"
        ref={viewer}
        aria-label={label}
        onClose={() => {
          setActive(null);
          setImageResult(undefined);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) viewer.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            step(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="viewer-content">
          <div className="viewer-header">
            <span>{label}</span>
            <button className="viewer-control" type="button" autoFocus aria-label="Fechar fotografias" onClick={() => viewer.current?.close()}>
              <FiX aria-hidden="true" />
            </button>
          </div>
          {photo && (
            <>
              <div className="viewer-stage">
                {imageStatus === "error" ? (
                  <a className="viewer-fallback" href={photo.src}>Abrir a fotografia</a>
                ) : (
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1060px) 1000px, 92vw"
                    loading="eager"
                    quality={85}
                    onLoad={() => setImageResult({ src: photo.src, status: "loaded" })}
                    onError={() => setImageResult({ src: photo.src, status: "error" })}
                  />
                )}
                {!imageStatus && <p className="viewer-loading" role="status">A carregar fotografia…</p>}
              </div>
              <div className="viewer-footer">
                <button className="viewer-control" type="button" aria-label="Fotografia anterior" onClick={() => step(-1)}>
                  <FiArrowLeft aria-hidden="true" />
                </button>
                <p aria-live="polite" aria-atomic="true">
                  {photo.caption}<span>{(active ?? 0) + 1} / {photos.length}</span>
                </p>
                <button className="viewer-control" type="button" aria-label="Fotografia seguinte" onClick={() => step(1)}>
                  <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
