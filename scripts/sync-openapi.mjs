import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const sourceUrl =
  process.env.OPENAPI_SOURCE_URL ??
  "https://raw.githubusercontent.com/Utzel-Butzel/inventory/main/public/openapi.yaml";
const targetUrl = new URL("../public/openapi.yaml", import.meta.url);
const response = await fetch(sourceUrl);

if (!response.ok) {
  throw new Error(`OpenAPI download failed with HTTP ${response.status}`);
}

const remote = (await response.text()).replaceAll("\r\n", "\n");

if (process.argv.includes("--check")) {
  const local = (await readFile(targetUrl, "utf8")).replaceAll("\r\n", "\n");
  if (local !== remote) {
    console.error("public/openapi.yaml differs from inventory/main.");
    console.error("Run `npm run sync:openapi` and commit the updated file.");
    process.exitCode = 1;
  } else {
    console.log("OpenAPI specification is in sync with inventory/main.");
  }
} else {
  await writeFile(targetUrl, remote);
  console.log("Updated public/openapi.yaml from inventory/main.");
}
