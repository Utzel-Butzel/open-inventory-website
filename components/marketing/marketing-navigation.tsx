"use client";

import Link from "next/link";
import {
  Archive,
  ArrowRight,
  Camera,
  ChevronDown,
  Container,
  FlaskConical,
  Github,
  Hammer,
  House,
  MapPinned,
  Menu,
  PackageCheck,
  QrCode,
  Rocket,
  School,
  ShieldCheck,
  Tags,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
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
  icon: LucideIcon;
};

const featureItemsDe: DropdownItem[] = [
  {
    label: "Schnellerfassung & KI",
    href: "/features/erfassen",
    description: "Per Foto erfassen und Vorschläge prüfen.",
    icon: Camera,
  },
  {
    label: "Inventar strukturieren",
    href: "/features/strukturieren",
    description: "Typen, Felder und Beziehungen abbilden.",
    icon: Tags,
  },
  {
    label: "Bestand & Ausleihen",
    href: "/features/bestand-ausleihe",
    description: "Mengen, Geräte und Bewegungen verfolgen.",
    icon: PackageCheck,
  },
  {
    label: "Labels, Scans & API",
    href: "/features/labels-api",
    description: "QR-Codes, Barcodes und Integrationen nutzen.",
    icon: QrCode,
  },
  {
    label: "Orte & 3D-Räume",
    href: "/features/orte-raeume",
    description: "Karten, Räume und Fundorte verbinden.",
    icon: MapPinned,
  },
  {
    label: "Betrieb & Sicherheit",
    href: "/features/betrieb-sicherheit",
    description: "Self-hosting, Rollen und Datenkontrolle.",
    icon: ShieldCheck,
  },
];

const featureItemsEn: DropdownItem[] = [
  { label: "Fast capture & AI", href: "/features/erfassen", description: "Capture by photo and review suggestions.", icon: Camera },
  { label: "Structure inventory", href: "/features/strukturieren", description: "Model types, fields and relations.", icon: Tags },
  { label: "Stock & lending", href: "/features/bestand-ausleihe", description: "Track quantities, devices and movements.", icon: PackageCheck },
  { label: "Labels, scans & API", href: "/features/labels-api", description: "Use QR codes, barcodes and integrations.", icon: QrCode },
  { label: "Locations & 3D spaces", href: "/features/orte-raeume", description: "Connect maps, rooms and storage locations.", icon: MapPinned },
  { label: "Operations & security", href: "/features/betrieb-sicherheit", description: "Self-hosting, roles and data control.", icon: ShieldCheck },
];

const useCaseItemsDe: DropdownItem[] = [
  {
    label: "Makerspace",
    href: "/use-cases/makerspace",
    description: "Werkzeuge, Maschinen und Material.",
    icon: Wrench,
  },
  {
    label: "Familie",
    href: "/use-cases/familie",
    description: "Keller, Kisten und geteilte Dinge.",
    icon: House,
  },
  {
    label: "Startup",
    href: "/use-cases/startup",
    description: "Assets für wachsende Teams.",
    icon: Rocket,
  },
  {
    label: "Verein & Verleih",
    href: "/use-cases/verein",
    description: "Material, Ausgabe und Rückgabe.",
    icon: Users,
  },
  {
    label: "Sammlung",
    href: "/use-cases/sammlung",
    description: "Objekte und Herkunft dokumentieren.",
    icon: Archive,
  },
  {
    label: "Schule & Bildung",
    href: "/use-cases/schule",
    description: "Geräte, Lernmittel und Fachräume.",
    icon: School,
  },
  {
    label: "Handwerk",
    href: "/use-cases/handwerk",
    description: "Werkzeug zwischen Lager und Baustelle.",
    icon: Hammer,
  },
  {
    label: "Labor",
    href: "/use-cases/labor",
    description: "Geräte, Probenbedarf und Standorte.",
    icon: FlaskConical,
  },
];

const useCaseItemsEn: DropdownItem[] = [
  { label: "Makerspace", href: "/use-cases/makerspace", description: "Tools, machines and materials.", icon: Wrench },
  { label: "Family", href: "/use-cases/familie", description: "Basements, boxes and shared belongings.", icon: House },
  { label: "Startup", href: "/use-cases/startup", description: "Assets for growing teams.", icon: Rocket },
  { label: "Club & lending", href: "/use-cases/verein", description: "Equipment, checkout and returns.", icon: Users },
  { label: "Collection", href: "/use-cases/sammlung", description: "Document objects and provenance.", icon: Archive },
  { label: "School & education", href: "/use-cases/schule", description: "Devices, learning materials and rooms.", icon: School },
  { label: "Trades", href: "/use-cases/handwerk", description: "Tools between storage and job sites.", icon: Hammer },
  { label: "Lab", href: "/use-cases/labor", description: "Equipment, supplies and locations.", icon: FlaskConical },
];

const directLinksDe = [
  { label: "iOS App", href: "/ios" },
  { label: "Blog", href: "/blog" },
  { label: "Open Source", href: "/open-source" },
  { label: "Docs", href: "/docs" },
];

const directLinksEn = [
  { label: "iOS app", href: "/ios" },
  { label: "Blog", href: "/blog" },
  { label: "Open Source", href: "/open-source" },
  { label: "Docs", href: "/docs" },
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
  openSourceLabel,
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
  openSourceLabel: string;
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
        className={`inline-flex h-10 items-center gap-1 rounded-lg px-1.5 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
        className="absolute left-0 top-[calc(100%+8px)] z-50 w-[620px] overflow-hidden rounded-[22px] border border-border bg-surface p-3 shadow-2xl"
      >
        <Link
          href={overviewHref}
          onClick={onClose}
          className="group flex items-center justify-between rounded-2xl bg-surface-muted px-4 py-3.5 transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
        >
          <span>
            <span className="block text-sm font-semibold text-foreground">
              {overviewLabel}
            </span>
            <span className="mt-1 block text-[11px] leading-4 text-muted">
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
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex min-h-[72px] items-start gap-3 rounded-2xl p-3 transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand-solid group-hover:text-on-brand">
                  <Icon className="size-4" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-[13px] font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-muted">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex items-center gap-2 border-t border-border px-3 pb-1 pt-3 text-[10px] font-semibold text-muted">
          <Github className="size-3.5 text-brand" aria-hidden="true" />
          {openSourceLabel}
        </div>
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
        features: "Funktionen",
        allFeatures: "Alle Funktionen",
        featuresDescription: "Den vollständigen Funktionskatalog entdecken.",
        useCases: "Use Cases",
        allUseCases: "Alle Use Cases",
        useCasesDescription: "Open Inventory in konkreten Arbeitswelten.",
        openSource: "Teil des MIT-lizenzierten Open-Source-Projekts",
      }
    : {
        navigation: "Main navigation",
        features: "Features",
        allFeatures: "All features",
        featuresDescription: "Browse the complete feature reference.",
        useCases: "Use cases",
        allUseCases: "All use cases",
        useCasesDescription: "Open Inventory in concrete working environments.",
        openSource: "Part of the MIT-licensed open-source project",
      };

  return (
    <nav
      ref={navigationRef}
      className="hidden items-center gap-4 xl:flex"
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
        openSourceLabel={copy.openSource}
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
        openSourceLabel={copy.openSource}
      />
      {directLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeDropdown}
          className="rounded-lg text-[13px] font-medium text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
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
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-semibold text-brand hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
        >
          {overviewLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
            >
              <Icon className="size-3.5 shrink-0 text-brand" strokeWidth={1.9} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileMarketingNavigation({
  githubUrl,
  locale,
}: {
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
        features: "Funktionen",
        allFeatures: "Alle Funktionen",
        useCases: "Use Cases",
        allUseCases: "Alle Use Cases",
        docker: "Mit Docker starten",
      }
    : {
        close: "Close navigation",
        open: "Open navigation",
        mobile: "Mobile navigation",
        features: "Features",
        allFeatures: "All features",
        useCases: "Use cases",
        allUseCases: "All use cases",
        docker: "Start with Docker",
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
    <div ref={wrapperRef} className="relative">
      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-marketing-navigation"
        onClick={() => {
          setIsOpen((current) => !current);
          if (isOpen) setExpandedAccordion(null);
        }}
        className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        className="absolute right-0 top-12 max-h-[calc(100dvh-88px)] w-[min(360px,calc(100vw-40px))] overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-2xl"
        aria-label={copy.mobile}
      >
        <div className="mb-1 flex items-center justify-end px-2 py-1">
          <MarketingLanguageSwitcher locale={locale} />
        </div>
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
              className="block rounded-xl px-3 py-3 text-sm font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeNavigation}
            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-muted-strong transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
          >
            GitHub
            <Github className="size-4" aria-hidden="true" />
          </a>
          <Link
            href={marketingHref(locale, "/docs#docker")}
            onClick={closeNavigation}
            className="mt-1 flex items-center justify-between rounded-xl bg-strong px-3 py-3 text-sm font-semibold text-on-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-border"
          >
            {copy.docker}
            <Container className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
