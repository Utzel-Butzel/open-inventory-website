# Open Inventory website

Public website, technical documentation and blog for
[Open Inventory](https://github.com/Utzel-Butzel/inventory).

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

Set `NEXT_PUBLIC_APP_URL` to the public origin of the web application. Links
from the website to sign-in use this value.

## Languages

German uses unprefixed routes such as `/features`. English uses matching
`/en/features` routes. Canonical URLs, `hreflang`, Open Graph metadata and the
sitemap are generated for both languages.

## API documentation

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

## Hero video source

The rendered website asset is stored under `public/marketing`. Its Remotion
source project is kept in `video/` so the product video can be reproduced and
updated. Screens and examples use mock inventory data.

## License

MIT. See [LICENSE](./LICENSE).
