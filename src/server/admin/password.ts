import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const options = { N: 2 ** 17, r: 8, p: 1, maxmem: 160 * 1024 * 1024 };
const length = 32;
const hashPattern = /^scrypt-v1\$([A-Za-z0-9_-]{22})\$([A-Za-z0-9_-]{43})$/;

function derive(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, length, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export function parseHash(hash: string) {
  const match = hashPattern.exec(hash);
  if (!match) return;
  const salt = Buffer.from(match[1], "base64url");
  const expected = Buffer.from(match[2], "base64url");
  if (salt.toString("base64url") === match[1] && expected.toString("base64url") === match[2]) {
    return { salt, expected };
  }
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `scrypt-v1$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

export async function verifyPassword(password: string, hash: NonNullable<ReturnType<typeof parseHash>>) {
  const key = await derive(password, hash.salt);
  return timingSafeEqual(key, hash.expected);
}
