import type { Metadata } from "next";

export const MARKETING_LOCALES = ["de", "en"] as const;
export type MarketingLocale = (typeof MARKETING_LOCALES)[number];

export const DEFAULT_MARKETING_LOCALE: MarketingLocale = "en";

export const legacyTechnicalDocs: Record<string, string> = {
  configuration: "configuration", authentication: "authentication", api: "api",
  printing: "printing", "shared-printer": "printing", planning: "planning",
  "variant-stock": "variant-stock", operations: "operations",
};

export function technicalDocsHref(locale: MarketingLocale, slug = "") {
  return `https://docs.openinventory.polyxo.de/${locale}${slug ? `/${slug}` : ""}`;
}

export function marketingHref(locale: MarketingLocale, href: string) {
  const pathname = href.split(/[?#]/, 1)[0] || href;
  const suffix = href.slice(pathname.length);
  const applicationRoots = [
    "/api",
    "/batch",
    "/dashboard",
    "/duplicates",
    "/inventory",
    "/labels",
    "/login",
    "/map",
    "/notifications",
    "/r",
    "/settings",
    "/share",
    "/spaces",
    "/stock",
  ];
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    applicationRoots.some(
      (root) => pathname === root || pathname.startsWith(`${root}/`),
    ) ||
    pathname === "/openapi.json" ||
    pathname === "/openapi.yaml"
  ) {
    return href;
  }

  const unprefixedPath =
    pathname === "/en" || pathname === "/de"
      ? "/"
      : pathname.startsWith("/en/") || pathname.startsWith("/de/")
        ? pathname.slice(3)
        : pathname;

  if (unprefixedPath === "/api-docs") return technicalDocsHref(locale, "api-reference");
  if (unprefixedPath === "/docs" && suffix.startsWith("#")) {
    const slug = legacyTechnicalDocs[suffix.slice(1)];
    if (slug) return technicalDocsHref(locale, slug);
  }
  if (locale === "en") return `${unprefixedPath}${suffix}`;
  return `${unprefixedPath === "/" ? "/de" : `/de${unprefixedPath}`}${suffix}`;
}

export function marketingPathAlternates(
  locale: MarketingLocale,
  path: string,
): Metadata["alternates"] {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const germanPath = normalizedPath === "/" ? "/de" : `/de${normalizedPath}`;

  return {
    canonical: locale === "en" ? normalizedPath : germanPath,
    languages: {
      de: germanPath,
      en: normalizedPath,
      "x-default": normalizedPath,
    },
  };
}

export function marketingCanonical(locale: MarketingLocale, path: string) {
  return marketingHref(locale, path);
}

export function marketingOgLocale(locale: MarketingLocale) {
  return locale === "de"
    ? { locale: "de_DE", alternateLocale: ["en_US"] }
    : { locale: "en_US", alternateLocale: ["de_DE"] };
}
