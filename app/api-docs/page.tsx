import type { Metadata } from "next";
import Link from "next/link";
import { Braces, ExternalLink, FileCode2, KeyRound } from "lucide-react";

import { ApiDocumentation } from "@/components/api-documentation";
import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import {
  marketingHref,
  marketingOgLocale,
  marketingPathAlternates,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const title = locale === "de" ? "API-Dokumentation — Open Inventory" : "API documentation — Open Inventory";
  const description = locale === "de"
    ? "API-Referenz für Inventar, Bestand, Etiketten und Druckaufträge. Mit Authentifizierung, Beispielen und OpenAPI-Download."
    : "API reference for inventory, stock, labels and print jobs, with authentication, examples and OpenAPI downloads.";
  return {
    title: { absolute: title },
    description,
    alternates: marketingPathAlternates(locale, "/api-docs"),
    openGraph: { title, description, url: marketingHref(locale, "/api-docs"), ...marketingOgLocale(locale) },
  };
}

export default async function ApiDocsPage() {
  const locale = await getMarketingLocale();
  const copy = locale === "de"
    ? {
        eyebrow: "Entwicklerreferenz",
        intro: "Endpunkte, Eingaben und Antworten für deine Integration. Requests gehen an die Anwendungsinstanz, deren Adresse unter Server steht. Ersetze sie bei Bedarf durch deine eigene Instanz.",
        auth: "Inventar-Endpunkte verwenden Bearer-Token aus Einstellungen → API. Druckverwaltung und QZ benötigen eine Browsersitzung auf der Anwendungsinstanz; Agent-Endpunkte ein eigenes Drucker-Token. Die Authentifizierung steht am jeweiligen Endpunkt.",
        json: "JSON öffnen",
        yaml: "YAML öffnen",
        reference: "Interaktive API-Referenz",
        variants: "Varianten fertigen und ausbuchen",
        start: "API-Einstieg",
        printing: "Drucken einrichten",
        note: "Browsersitzungen lassen sich von dieser separaten Webseite aus nicht wie ein API-Token verwenden. Teste sitzungsgebundene Aufrufe auf der Anwendungsinstanz.",
      }
    : {
        eyebrow: "Developer reference",
        intro: "Endpoints, inputs and responses for your integration. Requests target the application address shown under Server. Replace it with your own instance when needed.",
        auth: "Inventory endpoints use bearer tokens from Settings → API. Print management and QZ require a browser session on the application instance; agent endpoints need a dedicated printer token. Check authentication on each operation.",
        json: "Open JSON",
        yaml: "Open YAML",
        reference: "Interactive API reference",
        variants: "Build and issue variants",
        start: "API quick start",
        printing: "Set up printing",
        note: "Browser sessions cannot be used like an API token from this separate website. Test session-authenticated requests on the application instance.",
      };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main id="main-content">
        <section className="overflow-hidden border-b border-border bg-background text-foreground">
          <div className="site-shell relative py-16 sm:py-20">

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="site-eyebrow">
                  {copy.eyebrow}
                </p>
                <h1 className="site-title mt-5">
                  Open Inventory API
                </h1>
                <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted sm:text-[17px]">
                  {copy.intro}
                </p>
                <nav aria-label={copy.reference} className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-brand">
                  <Link href={marketingHref(locale, "/docs#api")} className="hover:underline">{copy.start} →</Link>
                  <Link href={marketingHref(locale, "/docs#printing")} className="hover:underline">{copy.printing} →</Link>
                  <Link href={marketingHref(locale, "/docs#variant-stock")} className="hover:underline">{copy.variants} →</Link>
                </nav>
                <div className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-muted">
                  <KeyRound className="mt-1 size-4 shrink-0 text-brand" />
                  <p>
                    {copy.auth}
                  </p>
                </div>
                <p className="mt-3 max-w-2xl text-xs leading-6 text-muted">{copy.note}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/openapi.json"
                  target="_blank"
                  rel="noreferrer"
                  className="site-button site-button-secondary"
                >
                  <Braces className="size-4" />
                  {copy.json}
                  <ExternalLink className="size-3.5 text-muted" />
                </Link>
                <Link
                  href="/openapi.yaml"
                  target="_blank"
                  rel="noreferrer"
                  className="site-button site-button-secondary"
                >
                  <FileCode2 className="size-4 text-brand" />
                  {copy.yaml}
                  <ExternalLink className="size-3.5 text-muted" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label={copy.reference}
          className="api-docs-reference bg-surface"
        >
          <ApiDocumentation />
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
