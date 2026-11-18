import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { AdminConfig } from "./config";

const duration = 6 * 60 * 60;
const secure = process.env.NODE_ENV === "production";
export const sessionCookie = secure ? "__Host-angodeserto-admin" : "angodeserto-admin";
export const sessionOptions = { secure, httpOnly: true, sameSite: "strict", path: "/", maxAge: duration } as const;

export function sameUsername(left: string, right: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(left), digest(right));
}

function signature(config: AdminConfig, payload: string) {
  return createHmac("sha256", config.secret)
    .update(JSON.stringify(["angodeserto-admin-v1", config.scope, config.username, config.rawHash, payload]))
    .digest("base64url");
}

export function issueSession(config: AdminConfig, now = Math.floor(Date.now() / 1000)) {
  const payload = `${now + duration}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${signature(config, payload)}`;
}

export function verifySession(config: AdminConfig, value: string | undefined, now = Math.floor(Date.now() / 1000)) {
  const match = value && /^(\d{1,12})\.([A-Za-z0-9_-]{22})\.([A-Za-z0-9_-]{43})$/.exec(value);
  if (!match) return false;
  const expires = Number(match[1]);
  if (expires <= now || expires > now + duration) return false;
  const expected = signature(config, `${match[1]}.${match[2]}`);
  return timingSafeEqual(Buffer.from(expected), Buffer.from(match[3]));
}
