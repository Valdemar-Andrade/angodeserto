# Angodeserto V2

Website público da Angodeserto e da Rota dos Camelos, em Caraculo, no Namibe. A homepage é pré-renderizada com Next.js App Router. O menu móvel e a visualização ampliada das fotografias são os componentes interativos.

## Desenvolvimento

```sh
nvm use
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run build
```

Os contactos e as ligações para reservas estão em `src/content/site.ts`. As imagens usadas e as respetivas descrições estão em `src/content/photos.ts`. A seleção, a origem e os tratamentos estão em [docs/CURADORIA.md](docs/CURADORIA.md).

## Vercel e indexação

Usar o preset Next.js e o Node.js 24. A revisão da V2 é feita na branch `feat/angodeserto-v2` com um Preview na Vercel.

Configurar `SITE_URL` apenas para o ambiente Production, com a origem HTTPS oficial e verificada. O canónico, os metadados sociais, o `robots.txt` e o sitemap usam esse valor. A pré-visualização tem `noindex` e sitemap vazio. Quando a Vercel fornece `VERCEL_URL`, os metadados sociais do Preview usam o seu próprio domínio.

A migração do domínio da Netlify para a Vercel é tratada na publicação, após a aprovação do site.
