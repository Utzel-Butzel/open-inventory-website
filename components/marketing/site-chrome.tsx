import Link from "next/link";
import { ArrowUpRight, Boxes } from "lucide-react";

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
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-md ${
        inverse ? "text-white" : "text-foreground"
      }`}
      aria-label={homeLabel}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-solid text-on-brand">
        <Boxes className="size-[19px]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.035em] sm:text-base">
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
        skip: "Zum Inhalt springen",
        openApp: "Live-Demo öffnen",
        lightTheme: "Helles Farbschema verwenden",
        darkTheme: "Dunkles Farbschema verwenden",
        toggleTheme: "Farbschema wechseln",
      }
    : {
        home: "Open Inventory home",
        skip: "Skip to content",
        openApp: "Open live demo",
        lightTheme: "Use light theme",
        darkTheme: "Use dark theme",
        toggleTheme: "Toggle color theme",
      };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <MarketingDocumentLanguage locale={locale} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:text-background">
        {copy.skip}
      </a>
      <div className="site-shell flex h-[72px] items-center justify-between gap-6">
        <OpenInventoryBrand
          href={marketingHref(locale, "/")}
          homeLabel={copy.home}
        />

        <DesktopMarketingNavigation locale={locale} />

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <MarketingLanguageSwitcher locale={locale} />
          <ThemeToggle
            lightLabel={copy.lightTheme}
            darkLabel={copy.darkTheme}
            pendingLabel={copy.toggleTheme}
          />
          <a
            href={publicDemoUrl}
            className="site-button site-button-primary ml-2 !min-h-10 !px-4 !text-[13px]"
          >
            {copy.openApp}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
        intro: "Geräte, Material und gemeinsame Ausrüstung an einem Ort. Open Source, auf deinem eigenen Server.",
        product: "Produkt",
        features: "Funktionen",
        docs: "Dokumentation",
        api: "API-Referenz",
        useCases: "Einsatzbereiche",
        family: "Familie",
        club: "Verein & Verleih",
        collection: "Sammlung",
        school: "Schule",
        trades: "Handwerk",
        project: "Projekt",
        license: "MIT-Lizenz",
        openApp: "Web-App öffnen",
        imprint: "Impressum",
        tagline: "Wissen, was da ist. Finden, was du brauchst.",
      }
    : {
        home: "Open Inventory home",
        intro: "Equipment, materials and shared tools in one place. Open source, on your own server.",
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
        tagline: "Know what you have. Find what you need.",
      };

  return (
    <footer className="border-t border-border bg-surface-subtle text-foreground">
      <div className="site-shell py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <OpenInventoryBrand href={href("/")} homeLabel={copy.home} />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              {copy.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
              <span>MIT Open Source</span>
              <span aria-hidden="true">·</span>
              <span>Web + iOS + Android</span>
              <span aria-hidden="true">·</span>
              <span>Self-hosted</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">{copy.product}</p>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              <Link href={href("/features")} className="w-fit transition-colors hover:text-foreground">{copy.features}</Link>
              <Link href={href("/app")} className="w-fit transition-colors hover:text-foreground">iOS App</Link>
              <Link href={href("/app#app-downloads")} className="w-fit transition-colors hover:text-foreground">{locale === "de" ? "App-Downloads" : "App downloads"}</Link>
              <Link href={href("/open-source")} className="w-fit transition-colors hover:text-foreground">Open Source</Link>
              <Link href={href("/docs")} className="w-fit transition-colors hover:text-foreground">{copy.docs}</Link>
              <Link href={href("/api-docs")} className="w-fit transition-colors hover:text-foreground">{copy.api}</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">{copy.useCases}</p>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              <Link href={href("/use-cases/makerspace")} className="w-fit transition-colors hover:text-foreground">Makerspace</Link>
              <Link href={href("/use-cases/familie")} className="w-fit transition-colors hover:text-foreground">{copy.family}</Link>
              <Link href={href("/use-cases/startup")} className="w-fit transition-colors hover:text-foreground">Startup</Link>
              <Link href={href("/use-cases/verein")} className="w-fit transition-colors hover:text-foreground">{copy.club}</Link>
              <Link href={href("/use-cases/sammlung")} className="w-fit transition-colors hover:text-foreground">{copy.collection}</Link>
              <Link href={href("/use-cases/schule")} className="w-fit transition-colors hover:text-foreground">{copy.school}</Link>
              <Link href={href("/use-cases/handwerk")} className="w-fit transition-colors hover:text-foreground">{copy.trades}</Link>
              <Link href={href("/use-cases/labor")} className="w-fit transition-colors hover:text-foreground">Lab</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">{copy.project}</p>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-foreground">GitHub</a>
              <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-foreground">Issues</a>
              <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-foreground">{copy.license}</a>
              <Link href={href("/blog")} className="w-fit transition-colors hover:text-foreground">Blog</Link>
              <a href={appHref("/login")} className="w-fit transition-colors hover:text-foreground">{copy.openApp}</a>
              <Link href={href("/impressum")} className="w-fit transition-colors hover:text-foreground">{copy.imprint}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Open Inventory · {copy.license}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <MarketingLanguageSwitcher locale={locale} />
            <p>{copy.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
