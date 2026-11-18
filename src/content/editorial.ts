import { photos, type Photo } from "./photos";

export const galleryLimit = 5;
export const highlightLimit = 4;
export const uploadLimit = 4_000_000;
export const originalUploadLimit = 28_000_000;
export const photoSideLimit = 1920;
export const altLimit = 180;
export const captionLimit = 120;
export const titleLimit = 80;

export type EditorialSection = "gallery" | "highlight";
export type EditorialPhoto = {
  key: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
export type EditorialContent = { title: string; photos: EditorialPhoto[] };
export type EditorialState = { revision: string; content: EditorialContent; canRestore: boolean };

const initialPhotos = {
  passeio: photos.camelRide,
  encontros: photos.visitors,
  sabores: photos.tasting,
  refeicao: photos.lunchOutside,
  poente: photos.camelsAtDusk,
} as const;

export const initialGallery: EditorialContent = {
  title: "",
  photos: Object.entries(initialPhotos).map(([key, photo]) => ({
    key, width: photo.width, height: photo.height, alt: photo.alt, caption: photo.caption,
  })),
};
export const emptyHighlight: EditorialContent = { title: "", photos: [] };

export function isSection(value: string): value is EditorialSection {
  return value === "gallery" || value === "highlight";
}

function stockPhoto(key: string): Photo | undefined {
  return Object.hasOwn(initialPhotos, key) ? initialPhotos[key as keyof typeof initialPhotos] : undefined;
}

export function uploadDimensions(key: string) {
  const match = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}-([1-9]\d{0,3})x([1-9]\d{0,3})$/.exec(key);
  if (!match) return;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (width > photoSideLimit || height > photoSideLimit) return;
  return { width, height };
}

export function displayPhotos(photos: readonly EditorialPhoto[], editing = false): Photo[] {
  return photos.map(({ key, width, height, alt, caption }) => {
    const stock = stockPhoto(key);
    const src = stock?.src ?? (editing ? `/api/admin/photos/${key}` : `/api/photos/${key}`);
    return {
      src,
      width,
      height,
      alt,
      caption: caption || alt,
      ...(editing && !stock ? { unoptimized: true } : {}),
    };
  });
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseEditorial(section: EditorialSection, input: unknown): EditorialContent | undefined {
  if (!isRecord(input) || typeof input.title !== "string" || !Array.isArray(input.photos)) return;
  const title = input.title.trim();
  const gallery = section === "gallery";
  if (title.length > titleLimit || (gallery && title)) return;
  if (input.photos.length > (gallery ? galleryLimit : highlightLimit)) return;
  if (!input.photos.length && (gallery || title)) return;

  const photos: EditorialPhoto[] = [];
  const keys = new Set<string>();
  for (const item of input.photos) {
    if (!isRecord(item) || typeof item.key !== "string" || keys.has(item.key)) return;
    const size = (gallery ? stockPhoto(item.key) : undefined) ?? uploadDimensions(item.key);
    if (!size || item.width !== size.width || item.height !== size.height) return;
    if (typeof item.alt !== "string" || typeof item.caption !== "string") return;
    const alt = item.alt.trim();
    const caption = item.caption.trim();
    if (!alt || alt.length > altLimit || caption.length > captionLimit || (!gallery && caption)) return;
    photos.push({ key: item.key, width: size.width, height: size.height, alt, caption });
    keys.add(item.key);
  }
  return { title, photos };
}
