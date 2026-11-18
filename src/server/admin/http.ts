import { NextResponse, type NextRequest } from "next/server";
import { adminConfig } from "./config";
import { sessionCookie, verifySession } from "./session";

export const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
};

export class AdminError extends Error {
  constructor(readonly status: number, message: string, readonly retryAfter?: number) {
    super(message);
  }
}

export function adminJson<T>(data: T, status = 200) {
  return NextResponse.json(data, { status, headers: privateHeaders });
}

export function adminFailure(error: unknown) {
  if (!(error instanceof AdminError)) {
    return adminJson({ error: "O serviço está indisponível. Tente novamente dentro de instantes." }, 503);
  }
  const response = adminJson({ error: error.message }, error.status);
  if (error.retryAfter) response.headers.set("Retry-After", String(error.retryAfter));
  return response;
}

export function requireOrigin(request: NextRequest) {
  const { headers } = request;
  const origin = headers.get("origin");
  const host = headers.get("host");
  const protocol = process.env.VERCEL === "1"
    ? "https:" : new URL(request.url).protocol;
  const site = headers.get("sec-fetch-site");
  // The browser supplies Origin and Host. Our header makes cross-origin fetches require preflight.
  if (!host || !origin || origin !== `${protocol}//${host.toLowerCase()}` ||
      headers.get("x-angodeserto-admin") !== "1" || (site && site !== "same-origin")) {
    throw new AdminError(403, "Pedido recusado. Volte a abrir o painel e tente novamente.");
  }
}

export function requireSession(request: NextRequest) {
  const config = adminConfig();
  if (!config || !verifySession(config, request.cookies.get(sessionCookie)?.value)) {
    throw new AdminError(401, "A sessão terminou. Entre novamente.");
  }
  return config;
}

export async function readBytes(request: Request, limit: number) {
  const declaredSize = request.headers.get("content-length");
  if (declaredSize && Number(declaredSize) > limit) {
    throw new AdminError(413, "O ficheiro ultrapassa o tamanho permitido.");
  }
  if (!request.body) throw new AdminError(400, "O pedido está vazio.");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        // Cancel the remaining body without delaying the error response.
        void reader.cancel().catch(() => {});
        throw new AdminError(413, "O ficheiro ultrapassa o tamanho permitido.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks, size);
}

export async function readJson(request: Request, byteLimit = 4096): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    throw new AdminError(415, "Formato de pedido inválido.");
  }
  const buffer = await readBytes(request, byteLimit);
  try {
    return JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new AdminError(400, "Formato de pedido inválido.");
  }
}
