import "server-only";
import { BlobNotFoundError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";
import { uploadDimensions } from "../../content/editorial";
import { blobConfig } from "./config";

function connection() {
  const config = blobConfig();
  if (!config) throw new Error("Blob configuration unavailable");
  return config;
}

async function read(key: string, fresh: boolean) {
  const { token, prefix } = connection();
  const result = await get(prefix + key, {
    access: "private", token, useCache: !fresh, abortSignal: AbortSignal.timeout(6000),
  });
  if (!result) return null;
  if (result.statusCode !== 200) throw new Error("Unexpected Blob response");
  return result;
}

export async function readJsonBlob(key: string) {
  const result = await read(key, true);
  if (!result) return null;
  const { blob, stream } = result;
  if (!blob.etag || blob.size > 64_000 || blob.contentType !== "application/json") {
    void stream.cancel().catch(() => {});
    throw new Error("Invalid JSON object in Blob");
  }
  const value: unknown = await new Response(stream).json();
  return { value, etag: blob.etag };
}

export async function writeJsonBlob(key: string, value: unknown, etag: string | null) {
  const { token, prefix } = connection();
  try {
    await put(prefix + key, JSON.stringify(value), {
      access: "private", token, contentType: "application/json", cacheControlMaxAge: 60,
      addRandomSuffix: false, allowOverwrite: etag !== null, ifMatch: etag ?? undefined,
      abortSignal: AbortSignal.timeout(6000),
    });
    return true;
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) return false;
    // A first write is also conditional. If a competing request created the object, reconcile.
    if (!etag && await readJsonBlob(key)) return false;
    throw error;
  }
}

function photoPath(key: string) {
  if (!uploadDimensions(key)) throw new Error("Invalid image key");
  return `photos/${key}.webp`;
}

export async function savePhoto(key: string, data: Buffer) {
  const { token, prefix } = connection();
  await put(prefix + photoPath(key), data, {
    access: "private", token, contentType: "image/webp", addRandomSuffix: false,
    abortSignal: AbortSignal.timeout(12000),
  });
}

export function readPhoto(key: string) {
  return read(photoPath(key), false);
}

export async function hasPhoto(key: string) {
  const { token, prefix } = connection();
  try {
    const blob = await head(prefix + photoPath(key), { token, abortSignal: AbortSignal.timeout(6000) });
    return blob.contentType === "image/webp" && blob.size > 0;
  } catch (error) {
    // A service failure must not be mistaken for a missing photo.
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}
