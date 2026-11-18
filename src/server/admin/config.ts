import { parseHash } from "./password";

export function deploymentScope() {
  const target = process.env.VERCEL_ENV;
  if (target === "production" || target === "preview" || target === "development") return target;
  if (!process.env.VERCEL && !target && process.env.NODE_ENV !== "production") return "development";
}

export function blobConfig() {
  const scope = deploymentScope();
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (scope && token) return { token, prefix: `angodeserto/editorial/v1/${scope}/` };
}

export function adminConfig() {
  const username = process.env.ADMIN_USERNAME;
  const rawHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const scope = deploymentScope();
  if (!username || !username.trim() || username.length > 80 || !rawHash || !secret ||
      !/^[a-f0-9]{64}$/i.test(secret) || !scope || !blobConfig()) return;
  const password = parseHash(rawHash);
  if (!password) return;
  return { username, rawHash, password, secret: Buffer.from(secret, "hex"), scope };
}

export type AdminConfig = NonNullable<ReturnType<typeof adminConfig>>;
