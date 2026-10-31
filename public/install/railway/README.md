# Open Inventory — Railway template preparation

Status: prepared configuration, not published and not live-tested on Railway.
This folder is a setup recipe for Railway's template editor, not an importable
Railway template or a one-click deployment link. No credentials are included.
Secret expressions are evaluated when a Railway template is deployed; do not
paste them into an ordinary project's variables as literal passwords.

## Create the template

In your Railway workspace, open Templates → New Template. Add two services
with these exact names. Use Docker images, not a GitHub source build.

| Setting | Postgres | Inventory |
| --- | --- | --- |
| Image | `postgres:16-bookworm` | `ghcr.io/utzel-butzel/inventory:latest` |
| Volume mount path | `/var/lib/postgresql/data` | `/app/data/uploads` |
| Public networking | Disabled | HTTP, target port `3000`, generate a Railway domain |
| Variables | `postgres.variables.txt` | `inventory.variables.txt` |
| Healthcheck path | None (not HTTP) | `/api/health` |
| Healthcheck timeout | — | 300 seconds |
| Restart policy | On failure | On failure, at least 10 retries |
| Replicas | 1 | 1 |

Enter the key/value pairs from the two files in each service's Variables tab.
Keep the `${{...}}` reference and secret expressions intact. `Postgres` in
`DATABASE_URL` must match the database service name exactly. Never expose the
database through a public TCP proxy for this setup.

Set Inventory's start command to this single line:

```sh
node -e 'const fs=require("node:fs"); fs.mkdirSync("/app/data/uploads",{recursive:true}); fs.chownSync("/app/data/uploads",1001,1001); process.setgid(1001); process.setuid(1001); import("./scripts/start-production.mjs").catch(e=>{console.error(e);process.exit(1)})'
```

Railway mounts volumes as root. `RAILWAY_RUN_UID=0` allows the startup command
to give the upload mount to the application's user. It then drops to UID/GID
1001 before running Open Inventory. Keep this command together with the UID
setting; the normal image user cannot write to a new root-owned Railway volume.
The image handles migrations on startup. If Postgres is still starting, the
application may restart until the database becomes reachable.

## Validate before publishing

Create the template as an unpublished draft. Deploy a separate test project
only when you are ready to incur Railway hosting charges.

1. Check that both persistent volumes are attached before the first start.
2. Verify `/api/health` returns HTTP 200 over the generated HTTPS domain.
3. Sign in as `admin@inventory.local` with Inventory's generated
   `BOOTSTRAP_ADMIN_PASSWORD`. Confirm the application can create an item and
   upload an image.
4. Redeploy both services and verify the item, image and login remain available.
5. Change the password in Settings → Users. Remove `BOOTSTRAP_ADMIN_PASSWORD`
   and `BOOTSTRAP_ADMIN_PASSWORD_ONCE` from the deployed service and redeploy.
   Keep the secret-generating expressions in the reusable template for new users.
6. Enable backups for both volumes. If adding a custom domain later, set
   `AUTH_URL` to that exact HTTPS origin and redeploy.
7. Only after these checks, publish the template and copy its real deploy URL
   to the public website. This package intentionally contains no invented URL.

## References

- [Create a Railway template](https://docs.railway.com/templates/create)
- [Railway variables](https://docs.railway.com/variables)
- [Railway volumes and permissions](https://docs.railway.com/volumes)
- [Open Inventory](https://github.com/Utzel-Butzel/inventory)
