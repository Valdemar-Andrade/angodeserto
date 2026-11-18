import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { isRecord } from "../../content/editorial";
import { readJsonBlob, writeJsonBlob } from "./blob";
import type { AdminConfig } from "./config";
import { AdminError } from "./http";

const key = "auth/login-window.json";
const windowSeconds = 600;
const perSource = 6;
const perEnvironment = 40;

function source(request: Request) {
  if (process.env.VERCEL !== "1") return "local";
  const address = request.headers.get("x-vercel-forwarded-for")?.trim();
  return address && isIP(address) ? address : "unknown";
}

function counts(value: unknown, window: number): Record<string, number> {
  if (!isRecord(value) || !Number.isSafeInteger(value.window) || !isRecord(value.counts)) {
    throw new Error("Invalid login counter");
  }
  if (value.window !== window) return {};
  const entries = Object.entries(value.counts);
  if (entries.length > perEnvironment) throw new Error("Invalid login counter");
  const result: Record<string, number> = {};
  for (const [id, count] of entries) {
    if (!/^[a-f0-9]{64}$/.test(id) || typeof count !== "number" ||
        !Number.isSafeInteger(count) || count < 1 || count > perSource) {
      throw new Error("Invalid login counter");
    }
    result[id] = count;
  }
  return result;
}

export async function reserveLoginAttempt(request: Request, config: AdminConfig) {
  const id = createHmac("sha256", config.secret).update("angodeserto-login-v1:").update(source(request)).digest("hex");
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const record = await readJsonBlob(key);
    const now = Math.floor(Date.now() / 1000);
    const window = Math.floor(now / windowSeconds);
    const visits = record ? counts(record.value, window) : {};
    if ((visits[id] ?? 0) >= perSource ||
        Object.values(visits).reduce((sum, count) => sum + count, 0) >= perEnvironment) {
      throw new AdminError(429, "Demasiadas tentativas. Aguarde alguns minutos para voltar a entrar.",
        windowSeconds - now % windowSeconds);
    }
    visits[id] = (visits[id] ?? 0) + 1;
    if (await writeJsonBlob(key, { window, counts: visits }, record?.etag ?? null)) return;
  }
  throw new AdminError(503, "O acesso está temporariamente indisponível. Tente novamente.");
}
