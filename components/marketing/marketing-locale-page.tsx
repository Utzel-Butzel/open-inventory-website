import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Boxes,
  Camera,
  Container,
  Database,
  Github,
  PackageCheck,
  QrCode,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import { HeroVideo } from "@/components/marketing/hero-video";
import {
  marketingHref,
  type MarketingLocale,
} from "@/lib/marketing-i18n";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";

export type MarketingPageKind =
  | "home"
  | "features"
  | "use-cases"
  | "ios"
  | "open-source"
  | "blog"
  | "docs"
  | "api-docs"
  | "imprint";

type MarketingPageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  sections: Array<{ title: string; copy: string; href?: string }>;
};

const pageCopy: Record<MarketingPageKind, MarketingPageCopy> = {
  home: {
    eyebrow: "MIT licensed · Self-hostable · Native iOS app",
    title: "Inventory in seconds, not hours.",
    intro: "Take a photo, review the proposed data, and save it. Open Inventory turns physical objects into searchable records without locking your data or workflow into a closed service.",
    primary: "Start with Docker",
    secondary: "Read the source",
    sections: [
      { title: "Camera-first capture", copy: "Capture one object or a batch. Shared context is set once; uploads and optional analysis continue in retryable background stages.", href: "/features/erfassen" },
      { title: "Inventory model", copy: "Use custom types, fields, relations, locations and media. Choose bulk quantities or individually serialized units where the distinction matters.", href: "/features/strukturieren" },
      { title: "Stock workflows", copy: "Book movements, lending, reservations, assignments, purchase receipts and assemblies with explicit history.", href: "/features/bestand-ausleihe" },
      { title: "Labels and scans", copy: "Generate QR and Code 128 labels, then preview and execute guarded scan workflows in the browser or iOS app.", href: "/features/labels-api" },
      { title: "Native iOS client", copy: "The SwiftUI app captures photos and codes, keeps a persistent upload outbox and can add RoomPlan geometry on supported devices.", href: "/ios" },
      { title: "Open by default", copy: "The web app, database migrations, OpenAPI contract and iOS source are published together under the MIT license.", href: "/open-source" },
    ],
  },
  features: {
    eyebrow: "MIT licensed · Web and iOS",
    title: "Every feature, with its technical boundaries.",
    intro: "From camera-first batch capture to stock movements, QR labels, RoomPlan and the documented REST API. Open Inventory is open source and can run on your own infrastructure.",
    primary: "Browse feature details",
    secondary: "Read the source",
    sections: [
      { title: "Capture & analysis", copy: "Capture a sequence of items without waiting for each upload. Optional image analysis produces a reviewable draft; original files remain attached.", href: "/features/erfassen" },
      { title: "Data model", copy: "Model inventory types, custom fields, relations, locations and media without hiding the schema behind a proprietary layer.", href: "/features/strukturieren" },
      { title: "Stock & lending", copy: "Track bulk quantities or serialized units, reservations, assignments, movements, orders and bills of materials.", href: "/features/bestand-ausleihe" },
      { title: "Labels & API", copy: "Create QR and Code 128 labels, run guarded scan workflows, import CSV files and integrate through OpenAPI 3.1.", href: "/features/labels-api" },
      { title: "Locations & spaces", copy: "Connect storage locations, maps and spatial structures. The iOS app can add RoomPlan geometry where supported.", href: "/features/orte-raeume" },
      { title: "Operations & security", copy: "Deploy with Docker and PostgreSQL, configure storage, and define roles, conditional access rules and API tokens.", href: "/features/betrieb-sicherheit" },
    ],
  },
  "use-cases": {
    eyebrow: "Concrete setups · No industry lock-in",
    title: "One data model, several working environments.",
    intro: "The same open-source core can describe a makerspace, a household, a startup asset pool or lab equipment. Each setup keeps its own fields, locations and permissions.",
    primary: "Explore use cases",
    secondary: "Deployment docs",
    sections: [
      { title: "Makerspace", copy: "Tools, machines, consumables, QR labels and traceable checkout workflows.", href: "/use-cases/makerspace" },
      { title: "Family", copy: "Boxes, rooms, documents and shared belongings without maintaining a spreadsheet.", href: "/use-cases/familie" },
      { title: "Startup", copy: "Assign devices, count prototype parts and connect operational workflows through the API.", href: "/use-cases/startup" },
      { title: "Club & lending", copy: "Track shared equipment, issue and return events, reservations and responsible people.", href: "/use-cases/verein" },
      { title: "Collection", copy: "Document objects, provenance, condition, media and physical storage locations.", href: "/use-cases/sammlung" },
      { title: "School, trades and lab", copy: "Model equipment and supplies for classrooms, job sites or technical labs with custom fields and roles.", href: "/use-cases/schule" },
    ],
  },
  ios: {
    eyebrow: "Native SwiftUI app · Source included",
    title: "Capture inventory where the objects are.",
    intro: "The native iOS app uses AVFoundation for photos and codes, a persistent outbox for uploads, and RoomPlan or LiDAR-assisted capture for supported spaces.",
    primary: "Read the iOS architecture",
    secondary: "Open the repository",
    sections: [
      { title: "Camera-first capture", copy: "Take up to twelve photos, set shared batch context once, and continue while earlier items upload in the background." },
      { title: "Codes on device", copy: "Scan QR, EAN, Code 128, Data Matrix, PDF417 and Aztec codes with native camera APIs." },
      { title: "Persistent outbox", copy: "Jobs are written to Application Support before upload. Stable idempotency keys make retries safe after network loss or restarts." },
      { title: "RoomPlan and LiDAR", copy: "RoomPlan provides parametric geometry. LiDAR depth improves supported captures, with plane-based fallback on other devices." },
      { title: "Your server", copy: "The app connects to an Open Inventory instance you control and authenticates with an API token stored in the Keychain." },
      { title: "Open implementation", copy: "SwiftUI screens, API client, outbox stages and RoomPlan controller are inspectable in the MIT-licensed repository." },
    ],
  },
  "open-source": {
    eyebrow: "MIT license · Public repository",
    title: "Your inventory should not depend on a closed service.",
    intro: "Open Inventory publishes the web application, database migrations, OpenAPI contract and native iOS client in one repository. You can inspect, modify and self-host it.",
    primary: "View source on GitHub",
    secondary: "Self-hosting guide",
    sections: [
      { title: "MIT licensed", copy: "Use, audit and adapt the code under a short permissive license. The license text lives in the repository." },
      { title: "Self-hostable", copy: "Run Next.js and PostgreSQL with Docker. Local or compatible object storage can be selected by the operator." },
      { title: "Documented API", copy: "The OpenAPI 3.1 document describes resources, stock, scans, spatial data and automation endpoints." },
      { title: "Native client included", copy: "The iOS application is not a separate closed product. Its SwiftUI source and server contract are part of the project." },
      { title: "Visible provider boundaries", copy: "Optional AI and hosted-storage paths are explicit in code and configuration instead of being presented as local processing." },
      { title: "Operational ownership", copy: "Backups, TLS, upgrades and restore tests remain real responsibilities when you operate the system yourself." },
    ],
  },
  blog: {
    eyebrow: "Technical notes · Open source",
    title: "Implementation notes from Open Inventory.",
    intro: "Articles about queues, inventory models, QR labels, self-hosting and the iOS stack. They describe code paths, trade-offs and known limits without hiding them behind product language.",
    primary: "Read technical notes",
    secondary: "Browse the code",
    sections: [
      { title: "Batch capture: where the time goes", copy: "How resource creation, media uploads, analysis and cover jobs are split into retryable stages.", href: "/blog/serienerfassung-in-sekunden" },
      { title: "Bulk stock versus serialized units", copy: "The different invariants behind quantities, individual codes, states and locations.", href: "/blog/mengenbestand-oder-serialisiert" },
      { title: "QR labels in a makerspace", copy: "Short links, print dimensions and the preview/diff/execute scan workflow.", href: "/blog/qr-etiketten-im-makerspace" },
      { title: "Operating a self-hosted inventory", copy: "Next.js, PostgreSQL, media storage, backups, TLS and restore testing.", href: "/blog/warum-inventar-selbst-hosten" },
      { title: "iOS, outbox, RoomPlan and LiDAR", copy: "Native capture components, persistent jobs and the limits of spatial reconstruction.", href: "/blog/iphone-lidar-inventarisierung" },
      { title: "Images and examples", copy: "Article images use credited real-world contextual photography. Product views are direct captures of the web and native iOS applications with purpose-built demo records, not generated interfaces." },
    ],
  },
  docs: {
    eyebrow: "Documentation · Self-hosting",
    title: "Run Open Inventory on your infrastructure.",
    intro: "The smallest setup uses Docker Compose with the Next.js service and PostgreSQL. Production operation also needs persistent storage, TLS, backups and tested restores.",
    primary: "Start with Docker",
    secondary: "Open the repository",
    sections: [
      { title: "1. Clone", copy: "Clone the public repository and review the example environment configuration before starting services." },
      { title: "2. Configure", copy: "Set authentication, database and storage values. Configure optional AI providers only if you intend to use them." },
      { title: "3. Start", copy: "Build and run the Compose stack, then check the health endpoint and create the first account." },
      { title: "4. Persist", copy: "Keep PostgreSQL data and uploaded media on persistent volumes or an explicitly configured object store." },
      { title: "5. Protect", copy: "Terminate TLS at a reverse proxy and restrict database and storage services to trusted networks." },
      { title: "6. Restore", copy: "Backups are incomplete until a restore has been tested against the application version you operate." },
    ],
  },
  "api-docs": {
    eyebrow: "OpenAPI 3.1 · REST",
    title: "Integrate against a documented contract.",
    intro: "Open Inventory exposes authenticated endpoints for resources, stock, scans, spatial data, translations and webhooks. The specification is generated from the repository.",
    primary: "Open API reference",
    secondary: "Download OpenAPI JSON",
    sections: [
      { title: "Authentication", copy: "Use scoped API tokens or application sessions. Store credentials outside source control and rotate them when needed." },
      { title: "Resources", copy: "Create and query inventory records, media, relations, variants and localized fields." },
      { title: "Stock", copy: "Book movements, serialized units, locations, assignments, reservations and purchase-order receipts." },
      { title: "Scan workflows", copy: "Resolve a code, preview the intended operations, inspect the diff and execute with an idempotency key." },
      { title: "Spatial data", copy: "Upload room scans, layouts, keyframes and resource placements from supported clients." },
      { title: "Webhooks", copy: "Register signed delivery targets, inspect attempts and retry failed deliveries deliberately." },
    ],
  },
  imprint: {
    eyebrow: "Project information",
    title: "Legal notice",
    intro: "Open Inventory is an open-source software project. Repository history, contributors, license and issue tracking are available publicly on GitHub.",
    primary: "Open GitHub repository",
    secondary: "Read MIT license",
    sections: [
      { title: "Project", copy: "Open Inventory — self-hostable inventory software with a native iOS client." },
      { title: "Source code", copy: "The complete source and revision history are published in the project repository." },
      { title: "License", copy: "The software is distributed under the MIT license. Third-party components retain their respective licenses." },
    ],
  },
};

const germanTechnicalPageCopy: Record<"docs" | "api-docs" | "imprint", MarketingPageCopy> = {
  docs: {
    eyebrow: "Dokumentation · Self-Hosting",
    title: "Open Inventory auf eigener Infrastruktur betreiben.",
    intro: "Das kleinste Setup besteht aus dem Next.js-Dienst und PostgreSQL in Docker Compose. Für den produktiven Betrieb kommen persistenter Speicher, TLS, Backups und getestete Wiederherstellungen dazu.",
    primary: "Mit Docker starten",
    secondary: "Repository öffnen",
    sections: [
      { title: "1. Repository klonen", copy: "Klone das öffentliche Repository und prüfe die Beispielkonfiguration, bevor du Dienste startest." },
      { title: "2. Umgebung konfigurieren", copy: "Setze Authentifizierung, Datenbank und Speicher. Externe KI-Provider werden nur benötigt, wenn du die optionalen Funktionen aktivierst." },
      { title: "3. Dienste starten", copy: "Baue und starte den Compose-Stack. Prüfe anschließend den Health-Endpunkt und lege das erste Konto an." },
      { title: "4. Daten persistent halten", copy: "PostgreSQL-Daten und Uploads gehören auf dauerhafte Volumes oder in einen ausdrücklich konfigurierten Objektspeicher." },
      { title: "5. Zugriff absichern", copy: "Beende TLS an einem Reverse Proxy und beschränke Datenbank und Speicher auf vertrauenswürdige Netze." },
      { title: "6. Wiederherstellung testen", copy: "Ein Backup ist erst belastbar, wenn die Wiederherstellung mit der betriebenen Anwendungsversion getestet wurde." },
    ],
  },
  "api-docs": {
    eyebrow: "OpenAPI 3.1 · REST",
    title: "Gegen einen dokumentierten Vertrag integrieren.",
    intro: "Open Inventory stellt authentifizierte Endpunkte für Ressourcen, Bestand, Scans, räumliche Daten, Übersetzungen und Webhooks bereit. Die Spezifikation liegt direkt im offenen Repository.",
    primary: "API-Referenz öffnen",
    secondary: "OpenAPI-JSON laden",
    sections: [
      { title: "Authentifizierung", copy: "Verwende eingeschränkte API-Token oder Anwendungssitzungen. Zugangsdaten gehören nicht ins Repository und sollten rotierbar bleiben." },
      { title: "Ressourcen", copy: "Inventareinträge, Medien, Beziehungen, Varianten und lokalisierte Felder anlegen und abfragen." },
      { title: "Bestand", copy: "Bewegungen, serialisierte Einheiten, Lagerorte, Zuweisungen, Reservierungen und Wareneingänge buchen." },
      { title: "Scan-Workflows", copy: "Code auflösen, geplante Operationen als Vorschau prüfen und anschließend mit Idempotenzschlüssel ausführen." },
      { title: "Räumliche Daten", copy: "Raumscans, Layouts, Keyframes und Objektpositionen von unterstützten Clients hochladen." },
      { title: "Webhooks", copy: "Signierte Ziele registrieren, Zustellversuche prüfen und fehlgeschlagene Lieferungen bewusst wiederholen." },
    ],
  },
  imprint: {
    eyebrow: "Projektangaben",
    title: "Impressum",
    intro: "Open Inventory ist ein Open-Source-Softwareprojekt. Repository-Verlauf, Mitwirkende, Lizenz und Issue-Tracking sind öffentlich auf GitHub einsehbar.",
    primary: "GitHub-Repository öffnen",
    secondary: "MIT-Lizenz lesen",
    sections: [
      { title: "Projekt", copy: "Open Inventory — selbst hostbare Inventarsoftware mit einer nativen iOS-App." },
      { title: "Quellcode", copy: "Der vollständige Quellcode und die Änderungshistorie werden im Projekt-Repository veröffentlicht." },
      { title: "Lizenz", copy: "Die Software steht unter der MIT-Lizenz. Komponenten Dritter behalten ihre jeweiligen Lizenzen." },
    ],
  },
};

const kindIcons = {
  home: Boxes,
  features: Blocks,
  "use-cases": Wrench,
  ios: Smartphone,
  "open-source": Github,
  blog: BookOpen,
  docs: Container,
  "api-docs": Database,
  imprint: ShieldCheck,
} satisfies Record<MarketingPageKind, typeof Boxes>;

export function EnglishMarketingPage({ kind }: { kind: MarketingPageKind }) {
  return <MarketingPageContent kind={kind} locale="en" copy={pageCopy[kind]} />;
}

export function GermanTechnicalPage({
  kind,
}: {
  kind: "docs" | "api-docs" | "imprint";
}) {
  return <MarketingPageContent kind={kind} locale="de" copy={germanTechnicalPageCopy[kind]} />;
}

function MarketingPageContent({
  kind,
  locale,
  copy,
}: {
  kind: MarketingPageKind;
  locale: MarketingLocale;
  copy: MarketingPageCopy;
}) {
  const Icon = kindIcons[kind];
  const primaryHref = kind === "home"
    ? marketingHref(locale, "/docs#docker")
    : kind === "ios"
      ? marketingHref(locale, "/blog/iphone-lidar-inventarisierung")
    : kind === "open-source" || kind === "imprint"
    ? githubUrl
    : kind === "api-docs"
      ? "/openapi.json"
      : kind === "docs"
        ? marketingHref(locale, "/docs#docker")
        : copy.sections[0]?.href
          ? marketingHref(locale, copy.sections[0].href)
          : githubUrl;
  const secondaryHref = kind === "api-docs"
    ? "/openapi.json"
    : kind === "open-source"
      ? marketingHref(locale, "/docs")
    : kind === "docs"
      ? githubUrl
      : kind === "imprint"
        ? `${githubUrl}/blob/main/LICENSE`
        : githubUrl;
  const labels = locale === "de"
    ? {
        openPage: "Seite öffnen",
        trustEyebrow: "Open Source als Grundlage",
        trustTitle: "Implementierung prüfen, nicht nur Aussagen.",
        trustCopy: "Repository, Migrationen, API-Beschreibung und iOS-App stehen gemeinsam unter der MIT-Lizenz.",
      }
    : {
        openPage: "Open page",
        trustEyebrow: "Open source by design",
        trustTitle: "Inspect the implementation, not just the claims.",
        trustCopy: "The repository contains the application, migrations, API description and iOS client under the MIT license.",
      };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-[#111216] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.055)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8ff0cc]">
              <Icon className="size-3.5" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/60">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={primaryHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#8ff0cc] px-5 text-sm font-semibold text-[#17382d]">
                {copy.primary}<ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href={secondaryHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/15 bg-white/[0.06] px-5 text-sm font-semibold text-white">
                {copy.secondary}<Github className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {kind === "home" ? <HeroVideo locale={locale} /> : null}

        <section
          id={kind === "docs" ? "docker" : undefined}
          className="scroll-mt-24 bg-surface py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {copy.sections.map((section, index) => {
                const card = (
                  <article className="h-full rounded-[24px] border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                        {index % 3 === 0 ? <Camera className="size-4" /> : index % 3 === 1 ? <PackageCheck className="size-4" /> : <QrCode className="size-4" />}
                      </span>
                      <span className="font-mono text-[10px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-9 text-[24px] font-semibold leading-[1.05] tracking-[-0.04em]">{section.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{section.copy}</p>
                    {section.href ? <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">{labels.openPage} <ArrowRight className="size-4" /></span> : null}
                  </article>
                );
                return section.href ? <Link key={section.title} href={marketingHref(locale, section.href)}>{card}</Link> : <div key={section.title}>{card}</div>;
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-background py-16 sm:py-20">
          <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{labels.trustEyebrow}</p>
              <h2 className="mt-3 text-[36px] font-semibold tracking-[-0.05em]">{labels.trustTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{labels.trustCopy}</p>
            </div>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-strong px-5 text-sm font-semibold text-on-strong">
              GitHub <Github className="size-4" />
            </a>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
