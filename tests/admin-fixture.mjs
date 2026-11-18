import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes, randomUUID } from "node:crypto";
import { once } from "node:events";
import { cp, mkdtemp, rm, symlink } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout } from "node:timers/promises";
import { hashPassword } from "../src/server/admin/password.ts";

export async function bootBlobFixture() {
  const objects = new Map();
  const token = `fixture_test_only_admin01_${randomUUID()}`;
  const fixture = { objects, outage: false, failedReads: 0 };
  const blob = createServer(async (request, response) => {
    const json = (status, value) => response.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(value));
    const fail = (status, code) => json(status, { error: { code } });
    if (request.headers.authorization !== `Bearer ${token}`) return fail(403, "forbidden");
    if (fixture.outage) {
      if (request.method === "GET") fixture.failedReads += 1;
      return fail(503, "service_unavailable");
    }
    const url = new URL(request.url, "http://localhost");
    const raw = url.pathname.startsWith("/private/");
    const pathname = raw ? decodeURIComponent(url.pathname.slice(9))
      : url.searchParams.get("url") ?? url.searchParams.get("pathname");
    if (!pathname) return fail(400, "bad_request");
    if (request.method === "PUT") {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      const previous = objects.get(pathname);
      if (request.headers["x-if-match"] && request.headers["x-if-match"] !== previous?.etag) {
        return fail(412, "precondition_failed");
      }
      if (previous && request.headers["x-allow-overwrite"] !== "1") return fail(400, "bad_request");
      const content = Buffer.concat(chunks);
      const record = {
        pathname, content, size: content.length,
        contentType: request.headers["x-content-type"],
        etag: `"${randomUUID()}"`, uploadedAt: new Date().toISOString(),
        url: `https://admin01.private.blob.vercel-storage.com/${pathname}`,
      };
      objects.set(pathname, record);
      return json(200, { ...record, content: undefined, downloadUrl: record.url });
    }
    const record = objects.get(pathname);
    if (!record) return fail(404, "not_found");
    if (!raw) return json(200, { ...record, content: undefined, downloadUrl: record.url });
    if (record.contentType === "application/json" && url.searchParams.get("cache") !== "0") {
      return fail(400, "bad_request");
    }
    return response.writeHead(200, {
      "content-type": record.contentType,
      "content-length": record.size,
      etag: record.etag,
    }).end(record.content);
  });
  blob.listen(0, "127.0.0.1");
  await once(blob, "listening");
  return {
    fixture,
    config: { BLOB_READ_WRITE_TOKEN: token, VERCEL_BLOB_API_URL: `http://127.0.0.1:${blob.address().port}` },
    close: () => new Promise((resolve) => {
      blob.close(resolve);
      blob.closeAllConnections();
    }),
  };
}

export async function fixtureCredentials() {
  const username = "curador-teste";
  const password = randomBytes(24).toString("base64url");
  return {
    username, password,
    config: {
      ADMIN_USERNAME: username,
      ADMIN_PASSWORD_HASH: await hashPassword(password),
      ADMIN_SESSION_SECRET: randomBytes(32).toString("hex"),
    },
  };
}

export async function startSite({ blob, credentials, scope = "preview" } = {}) {
  const env = { ...process.env };
  for (const name of [
    "ADMIN_USERNAME", "ADMIN_PASSWORD_HASH", "ADMIN_SESSION_SECRET", "VERCEL", "VERCEL_ENV",
    "VERCEL_URL", "VERCEL_BLOB_API_URL", "BLOB_READ_WRITE_TOKEN", "SITE_URL",
    "NODE_USE_ENV_PROXY", "HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "http_proxy", "https_proxy", "all_proxy",
  ]) delete env[name];
  const loader = fileURLToPath(new URL("blob-dispatcher.mjs", import.meta.url));
  const source = fileURLToPath(new URL("../", import.meta.url));
  const directory = await mkdtemp(join(tmpdir(), "angodeserto-admin-"));
  const remove = () => rm(directory, { recursive: true, force: true });
  try {
    await Promise.all([
      ...["node_modules", "public", "package.json", "next.config.ts", "tsconfig.json"].map((name) =>
        symlink(join(source, name), join(directory, name))),
      cp(join(source, ".next"), join(directory, ".next"), {
        recursive: true,
        filter: (name) => name !== join(source, ".next/cache"),
      }),
    ]);
  } catch (error) {
    await remove();
    throw error;
  }
  const next = spawn(process.execPath, [
    ...(blob ? ["--import", loader] : []),
    "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "0",
  ], {
    cwd: directory,
    env: {
      ...env,
      ...(scope ? { VERCEL_ENV: scope } : {}),
      VERCEL_BLOB_RETRIES: "0",
      ...blob?.config,
      ...credentials?.config,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  next.stdout.on("data", (data) => { output += data; });
  next.stderr.on("data", (data) => { output += data; });
  const exited = once(next, "exit");
  const stop = async () => { next.kill(); await exited; await remove(); };
  for (let tries = 0; tries < 100; tries += 1) {
    const port = output.match(/Local:\s+http:\/\/127\.0\.0\.1:(\d+)/)?.[1];
    if (port) {
      const origin = `http://127.0.0.1:${port}`;
      try {
        await fetch(origin + "/robots.txt");
        return { origin, stop };
      } catch {
        // Next has opened its socket and is still starting.
      }
    }
    if (next.exitCode !== null) break;
    await setTimeout(50);
  }
  await stop();
  assert.fail(`Next failed to start. Run npm run build first.\n${output}`);
}
