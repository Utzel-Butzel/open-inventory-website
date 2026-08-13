import type { MetadataRoute } from "next";
import { connection } from "next/server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();
  const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/features", "/ios", "/open-source", "/use-cases/", "/blog/", "/docs", "/api-docs"],
      disallow: ["/api/"],
    },
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
  };
}
