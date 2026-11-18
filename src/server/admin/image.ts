import "server-only";
import { randomUUID } from "node:crypto";
import sharp, { type OutputInfo } from "sharp";
import { photoSideLimit, uploadDimensions, uploadLimit, type EditorialPhoto } from "../../content/editorial";
import { readPhoto, savePhoto } from "./blob";
import { AdminError, privateHeaders, readBytes } from "./http";

const allowed = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;

export async function uploadPhoto(request: Request): Promise<EditorialPhoto> {
  const contentType = request.headers.get("content-type");
  if (!Object.values(allowed).some((mime) => mime === contentType)) {
    throw new AdminError(415, "Escolha uma fotografia JPEG, PNG ou WebP.");
  }
  const buffer = await readBytes(request, uploadLimit);
  const image = sharp(buffer, { limitInputPixels: 50_000_000, failOn: "warning" });
  let processed: { data: Buffer; info: OutputInfo };
  try {
    const { format, pages } = await image.metadata();
    if (!format || !Object.hasOwn(allowed, format) ||
        allowed[format as keyof typeof allowed] !== contentType || (pages ?? 1) !== 1) {
      throw new Error("Unexpected format");
    }
    processed = await image.autoOrient().resize({
      width: photoSideLimit, height: photoSideLimit, fit: "inside", withoutEnlargement: true,
    }).webp({ quality: 86 }).toBuffer({ resolveWithObject: true });
  } catch {
    throw new AdminError(422, "A fotografia está danificada, animada ou ultrapassa o limite de resolução.");
  }
  const { width, height } = processed.info;
  if (processed.data.byteLength > uploadLimit) {
    throw new AdminError(413, "A fotografia otimizada ainda é demasiado grande.");
  }
  const key = `${randomUUID()}-${width}x${height}`;
  await savePhoto(key, processed.data);
  return { key, width, height, caption: "", alt: "" };
}

export async function photoResponse(key: string, privateView: boolean) {
  if (!uploadDimensions(key)) return new Response(null, { status: 404, headers: privateHeaders });
  const result = await readPhoto(key);
  if (!result || result.blob.contentType !== "image/webp") {
    if (result) void result.stream.cancel().catch(() => {});
    return new Response(null, { status: 404, headers: privateHeaders });
  }
  return new Response(result.stream, {
    headers: {
      ...(privateView ? privateHeaders : {
        "Cache-Control": "public, max-age=60, s-maxage=120",
        "X-Content-Type-Options": "nosniff",
      }),
      "Content-Type": "image/webp",
      "Content-Length": String(result.blob.size),
    },
  });
}
