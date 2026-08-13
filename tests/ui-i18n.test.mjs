import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  marketingHref,
  marketingPathAlternates,
} from "../lib/marketing-i18n.ts";
import {
  UI_LANGUAGE_COOKIE,
  UI_LANGUAGE_HEADER,
  UI_LANGUAGES,
} from "../i18n.config.ts";

test("marketing URLs use stable English routes and a German prefix", () => {
  assert.equal(marketingHref("en", "/features"), "/features");
  assert.equal(marketingHref("de", "/features"), "/de/features");
  assert.equal(marketingHref("de", "/docs#docker"), "/de/docs#docker");
  assert.equal(marketingHref("en", "/de/features"), "/features");
  assert.equal(marketingHref("de", "/openapi.yaml"), "/openapi.yaml");
  assert.equal(marketingHref("en", "https://example.com"), "https://example.com");

  assert.deepEqual(marketingPathAlternates("de", "/blog/example"), {
    canonical: "/de/blog/example",
    languages: {
      de: "/de/blog/example",
      en: "/blog/example",
      "x-default": "/blog/example",
    },
  });
});

test("the website proxy handles only public marketing routes", async () => {
  const source = await readFile(
    fileURLToPath(new URL("../proxy.ts", import.meta.url)),
    "utf8",
  );
  const matcherBlock = source.match(/matcher:\s*\[([\s\S]*?)\]/)?.[1];
  assert.ok(matcherBlock, "proxy matcher is missing");
  const configuredPaths = [...matcherBlock.matchAll(/"([^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(configuredPaths, [
    "/",
    "/en/:path*",
    "/de/:path*",
    "/features/:path*",
    "/use-cases/:path*",
    "/ios",
    "/open-source",
    "/blog/:path*",
    "/docs",
    "/api-docs",
    "/impressum",
  ]);
  assert.doesNotMatch(source, /next-i18next/);
  assert.match(source, /x-inventory-marketing-rewrite-language/);
  assert.match(source, /localizedResponse\(request, rewrittenLanguage\)/);
  assert.match(source, /NextResponse\.redirect\(redirectUrl, 308\)/);
  assert.equal(UI_LANGUAGE_COOKIE, "inventory-ui-language");
  assert.equal(UI_LANGUAGE_HEADER, "x-inventory-ui-language");
  assert.deepEqual(UI_LANGUAGES, ["en", "de"]);
});

test("language changes use a full document navigation", async () => {
  const source = await readFile(
    fileURLToPath(
      new URL(
        "../components/marketing/marketing-language-switcher.tsx",
        import.meta.url,
      ),
    ),
    "utf8",
  );

  assert.doesNotMatch(source, /from "next\/link"/);
  assert.match(source, /<a[\s\S]*?href=\{localizedPath\(pathname, item\)\}/);
});

test("the web-app link is configured as an external origin", async () => {
  const [chrome, config] = await Promise.all([
    readFile(
      fileURLToPath(
        new URL("../components/marketing/site-chrome.tsx", import.meta.url),
      ),
      "utf8",
    ),
    readFile(
      fileURLToPath(new URL("../lib/site-config.ts", import.meta.url)),
      "utf8",
    ),
  ]);

  assert.match(chrome, /href=\{appHref\("\/login"\)\}/);
  assert.match(config, /process\.env\.APP_URL/);
  assert.match(config, /NEXT_PUBLIC_APP_URL/);
});
