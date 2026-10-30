"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MarketingLanguageSwitcher } from "@/components/marketing/marketing-language-switcher";
import {
  marketingHref,
  type MarketingLocale,
} from "@/lib/marketing-i18n";

type DropdownKey = "features" | "use-cases";

type DropdownItem = {
  label: string;
  href: string;
  description: string;
};

const featureItemsDe: DropdownItem[] = [
  {
    label: "Inventar erfassen",
    href: "/features/erfassen",
    description: "Per Foto erfassen und Vorschläge prüfen.",
  },
  {
    label: "Inventar strukturieren",
    href: "/features/strukturieren",
    description: "Typen, Varianten, Optionen und Beziehungen abbilden.",
  },
  {
    label: "Bestand & Vorgänge",
    href: "/features/bestand-ausleihe",
    description: "Bestand und Ausleihe verfolgen, Nachbestellung und Fertigung planen.",
  },
  {
    label: "Etiketten, Drucken & API",
    href: "/features/labels-api",
    description: "Etiketten gestalten, lokal oder gemeinsam drucken und per API verbinden.",
  },
  {
    label: "Orte & 3D-Räume",
    href: "/features/orte-raeume",
    description: "Karten, Räume und Fundorte verbinden.",
  },
  {
    label: "Betrieb & Sicherheit",
    href: "/features/betrieb-sicherheit",
    description: "Self-hosting, Rollen und Datenkontrolle.",
  },
];

const featureItemsEn: DropdownItem[] = [
  { label: "Capture inventory", href: "/features/erfassen", description: "Capture by photo and review suggestions." },
  { label: "Structure inventory", href: "/features/strukturieren", description: "Model types, variants, options and relations." },
  { label: "Stock & operations", href: "/features/bestand-ausleihe", description: "Track stock and loans, plan replenishment and production." },
  { label: "Labels, printing & API", href: "/features/labels-api", description: "Design labels, print locally or share a printer, and connect the API." },
  { label: "Locations & 3D spaces", href: "/features/orte-raeume", description: "Connect maps, rooms and storage locations." },
  { label: "Operations & security", href: "/features/betrieb-sicherheit", description: "Self-hosting, roles and data control." },
];

const useCaseItemsDe: DropdownItem[] = [
  {
    label: "Makerspace",
    href: "/use-cases/makerspace",
    description: "Werkzeuge, Maschinen und Material.",
  },
  {
    label: "Familie",
    href: "/use-cases/familie",
    description: "Keller, Kisten und geteilte Dinge.",
  },
  {
    label: "Startup",
    href: "/use-cases/startup",
    description: "Assets für wachsende Teams.",
  },
  {
    label: "Verein & Verleih",
    href: "/use-cases/verein",
    description: "Material, Ausgabe und Rückgabe.",
  },
  {
    label: "Sammlung",
    href: "/use-cases/sammlung",
    description: "Objekte und Herkunft dokumentieren.",
  },
  {
    label: "Schule & Bildung",
    href: "/use-cases/schule",
    description: "Geräte, Lernmittel und Fachräume.",
  },
  {
    label: "Handwerk",
    href: "/use-cases/handwerk",
    description: "Werkzeug zwischen Lager und Baustelle.",
  },
  {
    label: "Labor",
    href: "/use-cases/labor",
    description: "Geräte, Probenbedarf und Standorte.",
  },
];

const useCaseItemsEn: DropdownItem[] = [
  { label: "Makerspace", href: "/use-cases/makerspace", description: "Tools, machines and materials." },
  { label: "Family", href: "/use-cases/familie", description: "Basements, boxes and shared belongings." },
  { label: "Startup", href: "/use-cases/startup", description: "Assets for growing teams." },
  { label: "Club & lending", href: "/use-cases/verein", description: "Equipment, checkout and returns." },
  { label: "Collection", href: "/use-cases/sammlung", description: "Document objects and provenance." },
  { label: "School & education", href: "/use-cases/schule", description: "Devices, learning materials and rooms." },
  { label: "Trades", href: "/use-cases/handwerk", description: "Tools between storage and job sites." },
  { label: "Lab", href: "/use-cases/labor", description: "Equipment, supplies and locations." },
];

const directLinksDe = [
  { label: "Open Source", href: "/open-source" },
  { label: "Dokumentation", href: "/docs" },
];

const directLinksEn = [
  { label: "Open Source", href: "/open-source" },
  { label: "Documentation", href: "/docs" },
];

function DesktopDropdown({
  dropdownKey,
  label,
  overviewHref,
  overviewLabel,
  overviewDescription,
  items,
  isOpen,
  onToggle,
  onClose,
  buttonRef,
  relatedLink,
}: {
  dropdownKey: DropdownKey;
  label: string;
  overviewHref: string;
  overviewLabel: string;
  overviewDescription: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  relatedLink?: { label: string; href: string };
}) {
  const panelId = `marketing-${dropdownKey}-dropdown`;

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onClose();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-md px-1 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isOpen ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute left-1/2 top-[calc(100%+16px)] z-50 w-[560px] -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface p-3 shadow-[0_12px_32px_rgb(0_0_0/0.10)]"
      >
        <Link
          href={overviewHref}
          onClick={onClose}
          className="group flex items-center justify-between rounded-md border-b border-border px-3 pb-4 pt-2 transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
        >
          <span>
            <span className="block text-sm font-semibold text-foreground">
              {overviewLabel}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted">
              {overviewDescription}
            </span>
          </span>
          <ArrowRight
            className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden="true"
          />
        </Link>

        <div className="mt-2 grid grid-cols-2 gap-1">
          {items.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex min-h-[86px] items-start rounded-md p-3 transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
              >
                <span className="min-w-0 pt-0.5">
                  <span className="block text-[13px] font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {relatedLink && (
          <Link
            href={relatedLink.href}
            onClick={onClose}
            className="mt-2 flex items-center justify-between rounded-md border-t border-border px-3 pb-1 pt-3 text-xs font-medium text-muted transition hover:text-foreground"
          >
            {relatedLink.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function DesktopMarketingNavigation({
  locale,
}: {
  locale: MarketingLocale;
}) {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const featureButtonRef = useRef<HTMLButtonElement>(null);
  const useCaseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const button =
        openDropdown === "features"
          ? featureButtonRef.current
          : useCaseButtonRef.current;
      setOpenDropdown(null);
      button?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  const closeDropdown = () => setOpenDropdown(null);
  const featureItems = (locale === "de" ? featureItemsDe : featureItemsEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const useCaseItems = (locale === "de" ? useCaseItemsDe : useCaseItemsEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const directLinks = (locale === "de" ? directLinksDe : directLinksEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const copy = locale === "de"
    ? {
        navigation: "Hauptnavigation",
        features: "Produkt",
        allFeatures: "Alle Funktionen",
        featuresDescription: "Erfassen, wiederfinden und gemeinsam nutzen.",
        useCases: "Einsatzbereiche",
        allUseCases: "Alle Einsatzbereiche",
        useCasesDescription: "Für Werkstätten, Teams und gemeinsame Ausrüstung.",
        ios: "Inventar unterwegs verwalten: die iOS-App",
      }
    : {
        navigation: "Main navigation",
        features: "Product",
        allFeatures: "All features",
        featuresDescription: "Capture, find and share your inventory.",
        useCases: "Use cases",
        allUseCases: "All use cases",
        useCasesDescription: "For workshops, teams and shared equipment.",
        ios: "Manage inventory on the go with the iOS app",
      };

  return (
    <nav
      ref={navigationRef}
      className="hidden items-center gap-4 lg:flex xl:gap-5"
      aria-label={copy.navigation}
    >
      <DesktopDropdown
        dropdownKey="features"
        label={copy.features}
        overviewHref={marketingHref(locale, "/features")}
        overviewLabel={copy.allFeatures}
        overviewDescription={copy.featuresDescription}
        items={featureItems}
        isOpen={openDropdown === "features"}
        onToggle={() =>
          setOpenDropdown((current) =>
            current === "features" ? null : "features",
          )
        }
        onClose={closeDropdown}
        buttonRef={featureButtonRef}
        relatedLink={{ label: copy.ios, href: marketingHref(locale, "/ios") }}
      />
      <DesktopDropdown
        dropdownKey="use-cases"
        label={copy.useCases}
        overviewHref={marketingHref(locale, "/use-cases")}
        overviewLabel={copy.allUseCases}
        overviewDescription={copy.useCasesDescription}
        items={useCaseItems}
        isOpen={openDropdown === "use-cases"}
        onToggle={() =>
          setOpenDropdown((current) =>
            current === "use-cases" ? null : "use-cases",
          )
        }
        onClose={closeDropdown}
        buttonRef={useCaseButtonRef}
      />
      {directLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeDropdown}
          className="inline-flex h-10 items-center whitespace-nowrap rounded-md text-[13px] font-medium text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileAccordion({
  accordionKey,
  label,
  overviewHref,
  overviewLabel,
  items,
  expanded,
  onToggle,
  onNavigate,
}: {
  accordionKey: DropdownKey;
  label: string;
  overviewHref: string;
  overviewLabel: string;
  items: DropdownItem[];
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-${accordionKey}-navigation`;

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
      >
        {label}
        <ChevronDown
          className={`size-4 text-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div id={panelId} hidden={!expanded} className="ml-3 border-l border-border pl-2">
        <Link
          href={overviewHref}
          onClick={onNavigate}
          className="flex items-center justify-between rounded-md px-3 py-2.5 text-[13px] font-semibold text-brand hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
        >
          {overviewLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        {items.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileMarketingNavigation({
  appUrl,
  githubUrl,
  locale,
}: {
  appUrl: string;
  githubUrl: string;
  locale: MarketingLocale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] =
    useState<DropdownKey | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const featureItems = (locale === "de" ? featureItemsDe : featureItemsEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const useCaseItems = (locale === "de" ? useCaseItemsDe : useCaseItemsEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const directLinks = (locale === "de" ? directLinksDe : directLinksEn).map(
    (item) => ({ ...item, href: marketingHref(locale, item.href) }),
  );
  const copy = locale === "de"
    ? {
        close: "Navigation schließen",
        open: "Navigation öffnen",
        mobile: "Mobile Navigation",
        features: "Produkt",
        allFeatures: "Alle Funktionen",
        useCases: "Einsatzbereiche",
        allUseCases: "Alle Einsatzbereiche",
        openApp: "Live-Demo öffnen",
        docker: "Selbst hosten",
        ios: "iOS-App",
      }
    : {
        close: "Close navigation",
        open: "Open navigation",
        mobile: "Mobile navigation",
        features: "Product",
        allFeatures: "All features",
        useCases: "Use cases",
        allUseCases: "All use cases",
        openApp: "Open live demo",
        docker: "Self-hosting",
        ios: "iOS app",
      };

  const closeNavigation = () => {
    setIsOpen(false);
    setExpandedAccordion(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        closeNavigation();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeNavigation();
      menuButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
      }}
    >
      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-marketing-navigation"
        onClick={() => {
          setIsOpen((current) => !current);
          if (isOpen) setExpandedAccordion(null);
        }}
        className="grid size-10 place-items-center rounded-md border border-border text-foreground transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {isOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isOpen ? copy.close : copy.open}
        </span>
      </button>

      <nav
        id="mobile-marketing-navigation"
        hidden={!isOpen}
        className="absolute right-0 top-14 max-h-[calc(100dvh-96px)] w-[min(390px,calc(100vw-40px))] overflow-y-auto rounded-lg border border-border bg-surface p-3 shadow-[0_12px_32px_rgb(0_0_0/0.10)]"
        aria-label={copy.mobile}
      >
        <div className="mb-1 flex items-center justify-end px-2 py-1">
          <MarketingLanguageSwitcher locale={locale} />
        </div>
        <a
          href={appUrl}
          onClick={closeNavigation}
          className="site-button site-button-primary mb-3 w-full !justify-between"
        >
          {copy.openApp}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <MobileAccordion
          accordionKey="features"
          label={copy.features}
          overviewHref={marketingHref(locale, "/features")}
          overviewLabel={copy.allFeatures}
          items={featureItems}
          expanded={expandedAccordion === "features"}
          onToggle={() =>
            setExpandedAccordion((current) =>
              current === "features" ? null : "features",
            )
          }
          onNavigate={closeNavigation}
        />
        <MobileAccordion
          accordionKey="use-cases"
          label={copy.useCases}
          overviewHref={marketingHref(locale, "/use-cases")}
          overviewLabel={copy.allUseCases}
          items={useCaseItems}
          expanded={expandedAccordion === "use-cases"}
          onToggle={() =>
            setExpandedAccordion((current) =>
              current === "use-cases" ? null : "use-cases",
            )
          }
          onNavigate={closeNavigation}
        />

        <div className="mt-1 border-t border-border pt-1">
          {directLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeNavigation}
              className="block rounded-md px-3 py-3 text-sm font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-1 flex gap-4 border-t border-border px-3 pb-2 pt-4 text-[13px] text-muted">
            <Link href={marketingHref(locale, "/ios")} onClick={closeNavigation} className="hover:text-foreground">{copy.ios}</Link>
            <Link href={marketingHref(locale, "/blog")} onClick={closeNavigation} className="hover:text-foreground">Blog</Link>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeNavigation}
            className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
          >
            GitHub
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <Link
            href={marketingHref(locale, "/docs#docker")}
            onClick={closeNavigation}
            className="site-button site-button-secondary mt-2 w-full !justify-between"
          >
            {copy.docker}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
