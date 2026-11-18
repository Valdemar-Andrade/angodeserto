import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";
import { test } from "node:test";
import sharp from "sharp";
import { parseHash } from "../src/server/admin/password.ts";
import { issueSession } from "../src/server/admin/session.ts";
import { bootBlobFixture, fixtureCredentials, startSite } from "./admin-fixture.mjs";

const cookieName = "__Host-angodeserto-admin";
const galleryCaption = "Publicação de teste da Galeria";
const highlightTitle = "Destaque de teste";

function requests(site) {
  const path = (pathname) => site.origin + pathname;
  return {
    get: (pathname, cookie) => fetch(path(pathname), { headers: cookie ? { cookie } : {} }),
    post: (pathname, body, { cookie, origin = site.origin, mime = "application/json", csrf = "1" } = {}) =>
      fetch(path(pathname), {
        method: "POST",
        headers: { origin, "x-angodeserto-admin": csrf, "content-type": mime, ...(cookie ? { cookie } : {}) },
        body: mime === "application/json" ? JSON.stringify(body) : body,
      }),
  };
}

async function homepage(site, predicate) {
  for (let attempts = 0; attempts < 30; attempts += 1) {
    const html = await (await fetch(site.origin)).text();
    if (predicate(html)) return html;
    await setTimeout(100);
  }
  assert.fail("A publicação esperada não apareceu na homepage");
}

test("ADMIN01 num build Next.js com armazenamento Blob simulado", { timeout: 60_000 }, async (t) => {
  const blob = await bootBlobFixture();
  t.after(blob.close);
  const credentials = await fixtureCredentials();
  const site = await startSite({ blob, credentials });
  t.after(site.stop);
  const { get, post } = requests(site);
  const galleryPath = "/api/admin/content/gallery";
  const highlightPath = "/api/admin/content/highlight";
  const uploadPath = "/api/admin/photos";
  const loginPath = "/api/admin/login";
  const previewPrefix = "angodeserto/editorial/v1/preview/";
  const login = { username: credentials.username, password: credentials.password };
  const jsonPhoto = (key) => {
    const [width, height] = key.split("-").at(-1).split("x").map(Number);
    return { key, width, height, alt: "Fotografia de teste", caption: "" };
  };
  let cookie;
  let gallery;
  let portrait;

  await t.test("fallback inicial, cabeçalhos do painel e isolamento da navegação pública", async () => {
    const response = await get("/admin");
    assert.match(response.headers.get("cache-control"), /no-store/);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    const body = await response.text();
    assert.match(body, /name="robots" content="noindex, nofollow"/);
    assert.match(body, /<form method="post"/);
    assert.doesNotMatch(body, /<fieldset disabled/);
    assert.doesNotMatch(body, /aria-label="Áreas administrativas"/);
    assert.doesNotMatch(await (await get("/sitemap.xml")).text(), /\/admin/);
    const html = await homepage(site, (html) => html.includes('data-photo-count="5"'));
    assert.doesNotMatch(html, /id="special-highlight"|href="\/admin"|curador-teste/);
  });

  await t.test("sessão ausente, origem externa, CSRF ausente, login inválido e válido", async () => {
    assert.equal((await post(uploadPath, {})).status, 401);
    assert.equal((await post(galleryPath, {})).status, 401);
    assert.equal((await post(loginPath, login, { origin: "https://other.example" })).status, 403);
    assert.equal((await post(loginPath, login, { csrf: "" })).status, 403);
    const invalid = await post(loginPath, { ...login, username: "utilizador-inválido" });
    assert.equal(invalid.status, 401);
    const wrong = await post(loginPath, { ...login, password: randomUUID() });
    assert.equal(wrong.status, 401);
    assert.deepEqual(await invalid.json(), await wrong.json());
    const response = await post(loginPath, login);
    assert.equal(response.status, 200);
    const setCookie = response.headers.get("set-cookie");
    assert.match(setCookie, /^__Host-angodeserto-admin=/);
    for (const attribute of ["HttpOnly", "Secure", "SameSite=strict", "Path=/", "Max-Age=21600"]) {
      assert.ok(setCookie.includes(attribute), attribute);
    }
    cookie = setCookie.split(";")[0];
    assert.match(await (await get("/admin", cookie)).text(), /aria-label="Áreas administrativas"/);
    assert.equal((await post(galleryPath, {}, { cookie, csrf: "" })).status, 403);
    const tampered = cookie.slice(0, -1) + (cookie.endsWith("A") ? "B" : "A");
    assert.equal((await post(galleryPath, {}, { cookie: tampered })).status, 401);
    const { ADMIN_PASSWORD_HASH: rawHash, ADMIN_SESSION_SECRET: secret } = credentials.config;
    const expired = issueSession({
      username: credentials.username, scope: "preview", rawHash, password: parseHash(rawHash),
      secret: Buffer.from(secret, "hex"),
    }, Math.floor(Date.now() / 1000) - 7 * 60 * 60);
    assert.equal((await post(galleryPath, {}, { cookie: `${cookieName}=${expired}` })).status, 401);
  });

  await t.test("upload valida bytes e tamanho, corrige orientação e guarda só o WebP privado", async () => {
    const options = { cookie, mime: "image/jpeg" };
    assert.equal((await post(uploadPath, Buffer.from("texto"), { cookie, mime: "text/plain" })).status, 415);
    assert.equal((await post(uploadPath, Buffer.from("texto"), options)).status, 422);
    assert.equal((await post(uploadPath, Buffer.alloc(4_000_001), options)).status, 413);
    const jpeg = await sharp({
      create: { width: 2500, height: 1670, channels: 3, background: "#cb9266" },
    }).jpeg().withMetadata({ orientation: 6 }).toBuffer();
    const uploaded = await post(uploadPath, jpeg, options);
    assert.equal(uploaded.status, 201);
    portrait = { ...await uploaded.json(), alt: "Retrato de teste", caption: galleryCaption };
    assert.deepEqual([portrait.width, portrait.height], [1283, 1920]);
    const png = await sharp(jpeg).resize(700).png().toBuffer();
    assert.equal((await post(uploadPath, png, options)).status, 422);
    assert.equal((await get(`/api/admin/photos/${portrait.key}`)).status, 401);
    assert.equal((await get(`/api/photos/${portrait.key}`)).status, 404);
    const preview = await get(`/api/admin/photos/${portrait.key}`, cookie);
    assert.equal(preview.status, 200);
    assert.match(preview.headers.get("cache-control"), /no-store/);
    const decoded = await sharp(Buffer.from(await preview.arrayBuffer())).metadata();
    assert.equal(decoded.format, "webp");
    assert.equal(decoded.exif, undefined);
    assert.equal(decoded.orientation, undefined);
  });

  await t.test("substituir, reordenar, retirar, publicar e restaurar Galeria com revalidação", async () => {
    const invalid = await post(galleryPath, { action: "publish", revision: "initial", content: { title: "", photos: [] } }, { cookie });
    assert.equal(invalid.status, 400);
    const unknownPhoto = jsonPhoto(`${randomUUID()}-30x30`);
    const missing = await post(galleryPath, { action: "publish", revision: "initial", content: { title: "", photos: [unknownPhoto] } }, { cookie });
    assert.equal(missing.status, 409);

    const restoreBeforePublication = await post(galleryPath, { action: "restore", revision: "initial" }, { cookie });
    assert.equal(restoreBeforePublication.status, 400);
    const png = await sharp({ create: { width: 800, height: 520, channels: 3, background: "#967053" } }).png().toBuffer();
    const uploaded = await post(uploadPath, png, { cookie, mime: "image/png" });
    assert.equal(uploaded.status, 201);
    const landscape = { ...await uploaded.json(), alt: "Paisagem de teste", caption: "Outra fotografia" };
    const replacement = { action: "publish", revision: "initial", content: { title: "", photos: [portrait, landscape] } };
    const [first, second] = await Promise.all([post(galleryPath, replacement, { cookie }), post(galleryPath, replacement, { cookie })]);
    assert.deepEqual([first.status, second.status].sort(), [200, 409]);
    gallery = await (first.ok ? first : second).json();
    assert.match(await homepage(site, (html) => html.includes(galleryCaption)), /data-photo-count="2"/);
    assert.equal((await get(`/api/photos/${portrait.key}`)).status, 200);
    const optimized = await fetch(site.origin + "/_next/image?" + new URLSearchParams({
      url: `/api/photos/${portrait.key}`, w: 480, q: 75,
    }), { headers: { accept: "image/webp" } });
    assert.equal(optimized.status, 200);
    assert.equal(optimized.headers.get("content-type"), "image/webp");
    assert.match(await (await get("/admin", cookie)).text(), new RegExp(galleryCaption));

    const reordered = await post(galleryPath, {
      action: "publish", revision: gallery.revision,
      content: { title: "", photos: [landscape, portrait] },
    }, { cookie });
    assert.equal(reordered.status, 200);
    gallery = await reordered.json();
    assert.deepEqual(gallery.content.photos.map((item) => item.key), [landscape.key, portrait.key]);
    const removed = await post(galleryPath, {
      action: "publish", revision: gallery.revision, content: { title: "", photos: [portrait] },
    }, { cookie });
    assert.equal(removed.status, 200);
    gallery = await removed.json();
    assert.deepEqual(gallery.content.photos.map((item) => item.key), [portrait.key]);
    const history = JSON.parse(blob.fixture.objects.get(previewPrefix + "sections/gallery.json").content);
    const original = history.previous.content.photos;
    assert.deepEqual(original.map((item) => item.key), [landscape.key, portrait.key]);
    const restored = await post(galleryPath, { action: "restore", revision: gallery.revision }, { cookie });
    assert.equal(restored.status, 200);
    gallery = await restored.json();
    assert.equal(gallery.content.photos[1].caption, galleryCaption);
  });

  await t.test("Destaque com título opcional, uma a quatro fotografias e retirada", async () => {
    const photos = [portrait];
    for (let i = 0; i < 3; i += 1) {
      const png = await sharp({ create: { width: 700, height: 490, channels: 3, background: "#967053" } }).png().toBuffer();
      const uploaded = await post(uploadPath, png, { cookie, mime: "image/png" });
      assert.equal(uploaded.status, 201);
      photos.push({ ...await uploaded.json(), alt: `Complementar ${i + 1}` });
    }
    photos[0] = { ...photos[0], caption: "" };
    const publish = (revision, title, selection) => post(highlightPath, {
      action: "publish", revision, content: { title, photos: selection },
    }, { cookie });
    assert.equal((await publish("initial", highlightTitle, [...photos, photos[1]])).status, 400);
    const single = await publish("initial", "", [photos[0]]);
    assert.equal(single.status, 200);
    let highlight = await single.json();
    assert.match(await homepage(site, (html) => html.includes('id="special-highlight"')), /Destaques Especiais/);
    const complete = await publish(highlight.revision, highlightTitle, photos);
    assert.equal(complete.status, 200);
    highlight = await complete.json();
    assert.match(await homepage(site, (html) => html.includes(highlightTitle)), /data-photo-count="4"/);
    const withdrawn = await post(highlightPath, { action: "withdraw", revision: highlight.revision }, { cookie });
    assert.equal(withdrawn.status, 200);
    assert.equal((await withdrawn.json()).content.photos.length, 0);
    await homepage(site, (html) => !html.includes('id="special-highlight"'));
    assert.equal((await get(`/api/photos/${photos[1].key}`)).status, 404);
    assert.ok(blob.fixture.objects.has(previewPrefix + `photos/${photos[1].key}.webp`));
  });

  await t.test("ambientes isolados, indisponibilidade, configuração ausente e logout", async () => {
    assert.ok([...blob.fixture.objects.keys()].every((key) => key.startsWith(previewPrefix)));
    const production = await startSite({ blob, credentials, scope: "production" });
    try {
      const prod = requests(production);
      assert.equal((await prod.post(galleryPath, {}, { cookie })).status, 401);
      assert.equal((await prod.get(`/api/photos/${portrait.key}`)).status, 404);
      assert.doesNotMatch(await homepage(production, (html) => html.includes('data-photo-count="5"')), new RegExp(galleryCaption));
    } finally {
      await production.stop();
    }
    blob.fixture.outage = true;
    const fallback = await startSite({ blob, credentials });
    try {
      const safe = requests(fallback);
      assert.equal((await safe.get(`/api/photos/${portrait.key}`)).status, 404);
      assert.match(await homepage(fallback, (html) => html.includes('data-photo-count="5"')), /O Namibe/);
      assert.equal((await safe.post(loginPath, login)).status, 503);
      assert.ok(blob.fixture.failedReads > 0);
    } finally {
      await fallback.stop();
      blob.fixture.outage = false;
    }
    const unconfigured = await startSite({ blob, credentials, scope: null });
    try {
      const noConfig = requests(unconfigured);
      assert.match(await (await noConfig.get("/admin")).text(), /ainda não está configurado/);
      assert.equal((await noConfig.post(loginPath, login)).status, 503);
      assert.match(await homepage(unconfigured, (html) => html.includes('data-photo-count="5"')), /O Namibe/);
    } finally {
      await unconfigured.stop();
    }
    const logout = await post("/api/admin/logout", {}, { cookie });
    assert.equal(logout.status, 200);
    assert.match(logout.headers.get("set-cookie"), /^__Host-angodeserto-admin=;.*Max-Age=0/);
    assert.doesNotMatch(await (await get("/admin")).text(), /aria-label="Áreas administrativas"/);
  });

  await t.test("limite de tentativas persistido no Blob e Retry-After", async () => {
    for (let i = 0; i < 4; i += 1) {
      const response = await post(loginPath, { ...login, password: randomUUID() });
      assert.ok(response.status === 401 || response.status === 429);
    }
    const blocked = await post(loginPath, login);
    assert.equal(blocked.status, 429);
    assert.ok(Number(blocked.headers.get("retry-after")) > 0);
    assert.ok(blob.fixture.objects.has(previewPrefix + "auth/login-window.json"));
  });
});
