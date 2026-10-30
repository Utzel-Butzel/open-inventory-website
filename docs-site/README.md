# Open Inventory technical documentation

Fumadocs website at https://docs.openinventory.polyxo.de, separate from the public
website's short setup guide. English MDX content lives in
`content/docs`. The API reference is generated directly from the root
`public/openapi.yaml`; edit the application specification first.

```sh
npm ci
npm run dev
```

Preview: http://localhost:3002. Previous /de and /en URLs redirect permanently to the matching English page.
`npm run build` prepares the OpenAPI downloads and builds the standalone server.
The API examples default to `inventory.example.com`; readers use their own
application origin. No API credentials or proxy are stored on this site.

## Dokploy

Create an Application from the same repository and branch as the website.
Use Dockerfile build type with `docs-site/Dockerfile`, build context `/`, build
path `/` and target `runner`. Route `docs.openinventory.polyxo.de` to port 3000
with HTTPS / Let's Encrypt. Set `NODE_ENV=production` and `PORT=3000`.
Build the container from the repository root, not from this directory.

```sh
docker build -f docs-site/Dockerfile -t open-inventory-docs .
```
