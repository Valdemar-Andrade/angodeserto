import "server-only";
import { randomUUID } from "node:crypto";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import {
  emptyHighlight, initialGallery, isRecord, parseEditorial, uploadDimensions,
  type EditorialContent, type EditorialSection, type EditorialState,
} from "../../content/editorial";
import { hasPhoto, readJsonBlob, writeJsonBlob } from "./blob";
import { blobConfig, deploymentScope } from "./config";
import { AdminError } from "./http";

type Edition = { revision: string; content: EditorialContent };
type History = { schema: 1; current: Edition; previous: Edition | null };

function original(section: EditorialSection): Edition {
  return { revision: "initial", content: section === "gallery" ? initialGallery : emptyHighlight };
}

function edition(section: EditorialSection, value: unknown): Edition {
  if (!isRecord(value) || typeof value.revision !== "string" ||
      !/^(?:initial|[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})$/.test(value.revision)) {
    throw new Error("Invalid edition");
  }
  const content = parseEditorial(section, value.content);
  if (!content) throw new Error("Invalid publication");
  return { revision: value.revision, content };
}

async function load(section: EditorialSection) {
  const record = await readJsonBlob(`sections/${section}.json`);
  if (!record) return { current: original(section), previous: null, etag: null };
  const data = record.value;
  if (!isRecord(data) || data.schema !== 1) throw new Error("Invalid manifest");
  return {
    current: edition(section, data.current),
    previous: data.previous === null ? null : edition(section, data.previous),
    etag: record.etag,
  };
}

function adminState(current: Edition, previous: Edition | null): EditorialState {
  return { ...current, canRestore: previous !== null };
}

export async function readEditorialState(section: EditorialSection) {
  const data = await load(section);
  return adminState(data.current, data.previous);
}

const tag = `angodeserto-editorial-v1-${deploymentScope() ?? "disabled"}`;
const cachedPublication = unstable_cache(
  async (section: EditorialSection) => (await load(section)).current.content,
  [tag],
  { revalidate: 120, tags: [tag] },
);

export async function publicEditorial(section: EditorialSection) {
  if (blobConfig()) {
    try {
      return await cachedPublication(section);
    } catch {
      // Each chapter can use its bundled fallback independently of the other.
    }
  }
  return original(section).content;
}

export async function publishEditorial(section: EditorialSection, input: unknown) {
  if (!isRecord(input) || typeof input.revision !== "string" ||
      (input.action !== "publish" && input.action !== "restore" &&
       (input.action !== "withdraw" || section !== "highlight"))) {
    throw new AdminError(400, "Pedido de publicação inválido.");
  }
  const stored = await load(section);
  if (stored.current.revision !== input.revision) {
    throw new AdminError(409, "A publicação mudou. Recarregue o painel antes de continuar.");
  }
  let content: EditorialContent | undefined;
  switch (input.action) {
    case "restore":
      content = stored.previous?.content;
      break;
    case "withdraw":
      content = stored.current.content.photos.length ? emptyHighlight : undefined;
      break;
    default:
      content = parseEditorial(section, input.content);
      if (!content?.photos.length) content = undefined;
  }
  if (!content) {
    throw new AdminError(400, input.action === "publish"
      ? "Verifique o número de fotografias e as descrições alternativas."
      : "A versão solicitada já não está disponível.");
  }
  const uploads = content.photos.filter(({ key }) => uploadDimensions(key));
  if ((await Promise.all(uploads.map(({ key }) => hasPhoto(key)))).some((exists) => !exists)) {
    throw new AdminError(409, "Uma fotografia deixou de estar disponível. Substitua-a e tente novamente.");
  }
  const history: History = {
    schema: 1, current: { revision: randomUUID(), content }, previous: stored.current,
  };
  if (!await writeJsonBlob(`sections/${section}.json`, history, stored.etag)) {
    throw new AdminError(409, "A publicação mudou. Recarregue o painel antes de continuar.");
  }
  revalidateTag(tag, { expire: 0 });
  revalidatePath("/");
  return adminState(history.current, history.previous);
}
