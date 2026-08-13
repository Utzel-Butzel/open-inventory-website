import type { MetadataRoute } from "next";
import { connection } from "next/server";

const useCases = [
  "makerspace",
  "familie",
  "startup",
  "verein",
  "sammlung",
  "schule",
  "handwerk",
  "labor",
];
const featurePages = [
  "erfassen",
  "strukturieren",
  "bestand-ausleihe",
  "labels-api",
  "orte-raeume",
  "betrieb-sicherheit",
];
const posts = [
  "serienerfassung-in-sekunden",
  "mengenbestand-oder-serialisiert",
  "qr-etiketten-im-makerspace",
  "warum-inventar-selbst-hosten",
  "iphone-lidar-inventarisierung",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/features",
    ...featurePages.map((slug) => `/features/${slug}`),
    "/ios",
    "/open-source",
    "/use-cases",
    ...useCases.map((slug) => `/use-cases/${slug}`),
    "/blog",
    ...posts.map((slug) => `/blog/${slug}`),
    "/docs",
    "/api-docs",
  ];

  return routes.flatMap((route, index) => {
    const enPath = route || "/";
    const dePath = route ? `/de${route}` : "/de";
    const languages = {
      de: new URL(dePath, baseUrl).toString(),
      en: new URL(enPath, baseUrl).toString(),
      "x-default": new URL(enPath, baseUrl).toString(),
    };
    const shared = {
      changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: index === 0 ? 1 : route === "/features" ? 0.9 : 0.7,
      alternates: { languages },
    };

    return [
      { url: languages.en, ...shared },
      { url: languages.de, ...shared },
    ];
  });
}
