import type { Metadata } from "next";

export const MARKETING_LOCALES = ["de", "en"] as const;
export type MarketingLocale = (typeof MARKETING_LOCALES)[number];

export const DEFAULT_MARKETING_LOCALE: MarketingLocale = "de";

export function marketingHref(locale: MarketingLocale, href: string) {
  const pathname = href.split(/[?#]/, 1)[0] || href;
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
    locale === "de" ||
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

  if (href === "/en" || href.startsWith("/en/")) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

export function marketingPathAlternates(
  locale: MarketingLocale,
  path: string,
): Metadata["alternates"] {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const englishPath = normalizedPath === "/" ? "/en" : `/en${normalizedPath}`;

  return {
    canonical: locale === "de" ? normalizedPath : englishPath,
    languages: {
      de: normalizedPath,
      en: englishPath,
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
