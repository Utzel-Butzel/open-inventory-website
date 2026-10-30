# Open Inventory website

Public website, technical documentation and blog for
[Open Inventory](https://github.com/Utzel-Butzel/inventory).

Production: [openinventory.polyxo.de](https://openinventory.polyxo.de).
Set `SITE_URL=https://openinventory.polyxo.de` in Dokploy. The previous host,
`inventory.rollingtime.de`, stays attached for permanent redirects; paths and
query parameters are preserved.

The website is deliberately separate from the inventory application. It does
not connect to PostgreSQL, start background workers or handle authentication.
The self-hostable web application and REST API remain in the
[`inventory`](https://github.com/Utzel-Butzel/inventory) repository.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The default local addresses are:

- website: `http://localhost:3000`
- web application: `http://localhost:3001`

Set `SITE_URL` to the website origin and `APP_URL` to the public origin of the
web application. Both are read at runtime, so the same Docker image can be used
with different Dokploy domains.

## Languages

English uses unprefixed routes such as `/features`. German uses matching
`/de/features` routes. Canonical URLs, `hreflang`, Open Graph metadata and the
sitemap are generated for both languages.

## API documentation

The main `/docs` page is the short Dokploy/Coolify setup guide. Technical guides
and the Fumadocs API reference live in [`docs-site`](docs-site/README.md), deployed
separately at [docs.openinventory.polyxo.de](https://docs.openinventory.polyxo.de).
Old `/api-docs` routes and technical `/docs#…` links forward to the matching
language there. The downloadable installation templates in `public/install`
are copied from `inventory/deploy/dokploy/base64.txt` and
`inventory/deploy/coolify/compose.yaml`.

`public/openapi.yaml` is a synchronized copy of the source specification in
the application repository. Check or update it with:

```bash
npm run check:openapi
npm run sync:openapi
```

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

To synchronize an unpublished local application checkout, use the same source for
both commands:

```bash
OPENAPI_SOURCE_FILE=../inventory/public/openapi.yaml npm run sync:openapi
OPENAPI_SOURCE_FILE=../inventory/public/openapi.yaml npm run check:openapi
```

Edit the application's specification first; the website YAML is a copy. The JSON
reference uses `APP_URL` as its API server so requests target the application.

## Website design

Shared colours and layout primitives live in `app/globals.css`: `site-shell`,
`site-section`, `site-title`, `site-heading`, `site-eyebrow`, `site-button`,
`site-link` and `site-product-frame`. Use semantic colour tokens for surfaces
that change with the theme; use `brand-inverse` for accents on fixed dark panels.
Homepage-specific composition lives in `app/page.module.css`.

Product screenshots show the actual applications with demo data. Contextual
photography is documented in `public/marketing/photography/README.md`; it does
not represent customers or endorsements. Keep the English and German copy in
sync and identify German interface captures on English pages.

## Hero video source

The rendered website asset is stored under `public/marketing`. Its Remotion
source project is kept in `video/` so the product video can be reproduced and
updated. Screens and examples use mock inventory data.

## License

MIT. See [LICENSE](./LICENSE).
