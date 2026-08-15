import Link from "next/link";
import { ArrowUpRight, Boxes, Container, Github } from "lucide-react";

import {
  DesktopMarketingNavigation,
  MobileMarketingNavigation,
} from "@/components/marketing/marketing-navigation";
import {
  MarketingDocumentLanguage,
  MarketingLanguageSwitcher,
} from "@/components/marketing/marketing-language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  marketingHref,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { appHref, publicDemoUrl } from "@/lib/site-config";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";

export function OpenInventoryBrand({
  inverse = false,
  href = "/",
  homeLabel = "Open Inventory Startseite",
}: {
  inverse?: boolean;
  href?: string;
  homeLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center gap-2.5 rounded-xl ${
        inverse ? "text-white" : "text-foreground"
      }`}
      aria-label={homeLabel}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-solid text-on-brand shadow-[0_7px_20px_rgba(102,92,255,0.24)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.04]">
        <Boxes className="size-[19px]" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.025em] sm:text-base">
        Open Inventory
      </span>
    </Link>
  );
}

export async function MarketingHeader() {
  const locale = await getMarketingLocale();
  const copy = locale === "de"
    ? {
        home: "Open Inventory Startseite",
        docker: "Mit Docker starten",
        openApp: "Live-Demo öffnen",
        lightTheme: "Helles Farbschema verwenden",
        darkTheme: "Dunkles Farbschema verwenden",
        toggleTheme: "Farbschema wechseln",
      }
    : {
        home: "Open Inventory home",
        docker: "Start with Docker",
        openApp: "Open live demo",
        lightTheme: "Use light theme",
        darkTheme: "Use dark theme",
        toggleTheme: "Toggle color theme",
      };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <MarketingDocumentLanguage locale={locale} />
      <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <OpenInventoryBrand
          href={marketingHref(locale, "/")}
          homeLabel={copy.home}
        />

        <DesktopMarketingNavigation locale={locale} />

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <MarketingLanguageSwitcher locale={locale} />
          <ThemeToggle
            lightLabel={copy.lightTheme}
            darkLabel={copy.darkTheme}
            pendingLabel={copy.toggleTheme}
          />
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex size-10 items-center justify-center rounded-xl text-foreground transition hover:bg-surface-muted"
          >
            <Github className="size-4" aria-hidden="true" />
          </a>
          <Link
            href={marketingHref(locale, "/docs#docker")}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-surface px-3 text-[13px] font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted"
          >
            <Container className="size-3.5" aria-hidden="true" />
            {copy.docker}
          </Link>
          <a
            href={publicDemoUrl}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xl bg-brand-solid px-4 text-[13px] font-semibold text-on-brand shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
          >
            {copy.openApp}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle
            className="size-10"
            lightLabel={copy.lightTheme}
            darkLabel={copy.darkTheme}
            pendingLabel={copy.toggleTheme}
          />
          <MobileMarketingNavigation
            appUrl={publicDemoUrl}
            githubUrl={githubUrl}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}

export async function MarketingFooter() {
  const locale = await getMarketingLocale();
  const href = (path: string) => marketingHref(locale, path);
  const copy = locale === "de"
    ? {
        home: "Open Inventory Startseite",
        intro: "Gegenstände mit Standorten, Beständen und Buchungen verbinden. MIT-lizenziert und selbst hostbar.",
        product: "Produkt",
        features: "Funktionen",
        docs: "Dokumentation",
        api: "API-Referenz",
        useCases: "Use Cases",
        family: "Familie",
        club: "Verein & Verleih",
        collection: "Sammlung",
        school: "Schule",
        trades: "Handwerk",
        project: "Projekt",
        license: "MIT-Lizenz",
        openApp: "Web-App öffnen",
        imprint: "Impressum",
        tagline: "Gebaut für Werkstatt, Regal und Gerätekoffer.",
      }
    : {
        home: "Open Inventory home",
        intro: "Connect objects with locations, stock, and movement history. MIT licensed and self-hostable.",
        product: "Product",
        features: "Features",
        docs: "Documentation",
        api: "API reference",
        useCases: "Use cases",
        family: "Family",
        club: "Club & lending",
        collection: "Collection",
        school: "School",
        trades: "Trades",
        project: "Project",
        license: "MIT license",
        openApp: "Open web app",
        imprint: "Legal notice",
        tagline: "Built for workshops, shelves, and tool cases.",
      };

  return (
    <footer className="border-t border-white/10 bg-[#111216] text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <OpenInventoryBrand inverse href={href("/")} homeLabel={copy.home} />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
              {copy.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
              <span>MIT Open Source</span>
              <span aria-hidden="true">·</span>
              <span>Web + iOS</span>
              <span aria-hidden="true">·</span>
              <span>Self-hosted</span>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{copy.product}</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <Link href={href("/features")} className="w-fit hover:text-white">{copy.features}</Link>
              <Link href={href("/ios")} className="w-fit hover:text-white">iOS App</Link>
              <Link href={href("/open-source")} className="w-fit hover:text-white">Open Source</Link>
              <Link href={href("/docs")} className="w-fit hover:text-white">{copy.docs}</Link>
              <Link href={href("/api-docs")} className="w-fit hover:text-white">{copy.api}</Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{copy.useCases}</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <Link href={href("/use-cases/makerspace")} className="w-fit hover:text-white">Makerspace</Link>
              <Link href={href("/use-cases/familie")} className="w-fit hover:text-white">{copy.family}</Link>
              <Link href={href("/use-cases/startup")} className="w-fit hover:text-white">Startup</Link>
              <Link href={href("/use-cases/verein")} className="w-fit hover:text-white">{copy.club}</Link>
              <Link href={href("/use-cases/sammlung")} className="w-fit hover:text-white">{copy.collection}</Link>
              <Link href={href("/use-cases/schule")} className="w-fit hover:text-white">{copy.school}</Link>
              <Link href={href("/use-cases/handwerk")} className="w-fit hover:text-white">{copy.trades}</Link>
              <Link href={href("/use-cases/labor")} className="w-fit hover:text-white">Lab</Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{copy.project}</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="w-fit hover:text-white">GitHub</a>
              <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer" className="w-fit hover:text-white">Issues</a>
              <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="w-fit hover:text-white">{copy.license}</a>
              <Link href={href("/blog")} className="w-fit hover:text-white">Blog</Link>
              <a href={appHref("/login")} className="w-fit hover:text-white">{copy.openApp}</a>
              <Link href={href("/impressum")} className="w-fit hover:text-white">{copy.imprint}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Open Inventory · {copy.license}</p>
          <div className="flex flex-col gap-3 sm:items-end">
            <MarketingLanguageSwitcher locale={locale} inverse />
            <p>{copy.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
