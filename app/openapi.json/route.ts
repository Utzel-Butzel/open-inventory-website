import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parse } from "yaml";
import { appHref } from "@/lib/site-config";

export const dynamic = "force-dynamic";

const openApiDocument = parse(
  readFileSync(join(process.cwd(), "public", "openapi.yaml"), "utf8"),
);

export function GET() {
  return Response.json({ ...openApiDocument, servers: [{ url: appHref("/api/v1") }] }, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Disposition": 'inline; filename="openapi.json"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}
