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
    ? "Die Open-Inventory-API mit Bearer-Token und der interaktiven OpenAPI-Referenz untersuchen."
    : "Explore and test the Open Inventory bearer-token API with the interactive OpenAPI reference.";
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
        intro: "Untersuche den OpenAPI-3.1-Vertrag, erzeuge Request-Beispiele und führe authentifizierte Aufrufe gegen diese Instanz aus.",
        auth: "Wähle in der Referenz die Authentifizierung und trage ein eingeschränktes API-Token aus den Workspace-Einstellungen ein.",
        json: "JSON öffnen",
        yaml: "YAML öffnen",
        reference: "Interaktive API-Referenz",
      }
    : {
        eyebrow: "Developer reference",
        intro: "Explore the OpenAPI 3.1 contract, generate request examples, and run authenticated calls against this deployment.",
        auth: "Select Authentication in the reference and enter a scoped API token created in your workspace settings.",
        json: "Open JSON",
        yaml: "Open YAML",
        reference: "Interactive API reference",
      };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="overflow-hidden border-b border-white/10 bg-[#121318] text-white">
          <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
            <div className="pointer-events-none absolute -right-16 -top-24 size-[420px] rounded-full bg-[#665cff]/25 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[320px] rounded-full bg-[#8ff0cc]/10 blur-[100px]" />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
                  Open Inventory API
                </h1>
                <p className="mt-6 max-w-2xl text-[16px] leading-7 text-white/55 sm:text-[17px]">
                  {copy.intro}
                </p>
                <div className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-white/55">
                  <KeyRound className="mt-1 size-4 shrink-0 text-[#9188ff]" />
                  <p>
                    {copy.auth}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/openapi.json"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <Braces className="size-4" />
                  {copy.json}
                  <ExternalLink className="size-3.5 text-white/45" />
                </Link>
                <Link
                  href="/openapi.yaml"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#24252a] transition hover:bg-[#f0efff]"
                >
                  <FileCode2 className="size-4 text-[#665cff]" />
                  {copy.yaml}
                  <ExternalLink className="size-3.5 text-[#9a9ca3]" />
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
