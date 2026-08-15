import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  Box,
  Camera,
  Container,
  Github,
  ImageIcon,
  KeyRound,
  MapPinned,
  MapPin,
  PackageCheck,
  Search,
  Server,
  Sparkles,
  Smartphone,
  Workflow,
} from "lucide-react";

import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import {
  marketingHref,
  marketingOgLocale,
  marketingPathAlternates,
  type MarketingLocale,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { publicDemoUrl } from "@/lib/site-config";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";

type HomepageCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
    facts: string[];
    captureLabel: string;
    captureCaption: string;
    captureMeta: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    captureCaption: string;
    steps: Array<{ number: string; title: string; copy: string }>;
  };
  tasks: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    items: Array<{
      title: string;
      copy: string;
      href: string;
      icon: typeof Camera;
    }>;
  };
  audiences: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    items: Array<{
      title: string;
      copy: string;
      href: string;
    }>;
  };
  trust: {
    eyebrow: string;
    title: string;
    description: string;
    iosCaption: string;
    more: string;
    items: Array<{
      title: string;
      copy: string;
      icon: typeof Server;
    }>;
  };
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const homepageCopy: Record<MarketingLocale, HomepageCopy> = {
  de: {
    metadata: {
      title: "Open Inventory – Inventarisierung in Sekunden",
      description:
        "Ein Foto genügt: Open Inventory schlägt mit KI Bezeichnung, Beschreibung, Typ und Tags vor und verbindet den Eintrag mit Bildern, Bestand und Standort.",
    },
    hero: {
      eyebrow: "Inventarisierung",
      title: "Wo ist der Akkuschrauber?",
      description:
        "Inventarisierung in Sekunden statt Stunden: Einfache Inventarisierung mit KI – vom automatisch erzeugten Text bis zum perfekten Bild.",
      primary: "Live-Demo öffnen",
      secondary: "Mit Docker starten",
      facts: ["MIT-Lizenz", "Docker & PostgreSQL", "Web + native iOS-App"],
      captureLabel: "Web-App · Beispieldaten",
      captureCaption:
        "Bestände, Orte und nächste Aufgaben in einer gemeinsamen Ansicht.",
      captureMeta: "13 Artikel · 223 Einheiten",
    },
    workflow: {
      eyebrow: "Ein Foto · vier Ergebnisse",
      title: "Inventarisierung modern gedacht.",
      description:
        "Geh durch deine Werkstatt und fotografiere, was da ist. Open Inventory erkennt sichtbare Produktdetails, schreibt den Eintrag, bereitet ein Titelbild vor und verbindet ihn auf Wunsch mit seinem Platz im Raum.",
      captureCaption: "Vom schnellen Werkstattfoto zum vollständigen Inventareintrag",
      steps: [
        {
          number: "01",
          title: "Foto aufnehmen",
          copy: "Ein schnelles Handyfoto genügt – direkt dort, wo die Zange gerade liegt. Für eine Serie bleiben Typ und Standort bereits vorausgewählt.",
        },
        {
          number: "02",
          title: "Daten entstehen automatisch",
          copy: "Die KI erkennt sichtbare Produktdetails und schlägt Bezeichnung, Beschreibung, Typ und Tags vor. Der Standort kommt aus Serienvorgabe, GPS oder Raumplatzierung.",
        },
        {
          number: "03",
          title: "Titelbild aufbereiten",
          copy: "Optional entsteht aus dem Ausgangsfoto ein ruhiges, quadratisches Titelbild. Das Original bleibt trotzdem am Eintrag erhalten.",
        },
        {
          number: "04",
          title: "Im Raum wiederfinden",
          copy: "GPS, Karte oder eine separate RoomPlan-Platzierung verknüpfen den Eintrag mit seinem Fundort – bis hin zu Raum, Werkbank und Position.",
        },
      ],
    },
    tasks: {
      eyebrow: "Was Open Inventory kann",
      title: "Alles im Blick. Alles sofort griffbereit.",
      description:
        "Vom automatisch erstellten Eintrag bis zur Suche, Ausleihe und Bestandsführung begleitet Open Inventory deine Ausrüstung im gesamten Alltag.",
      linkLabel: "Im Detail",
      items: [
        {
          title: "Automatisch erfassen",
          copy: "Fotos werden zu vorgeschlagenen Namen, Beschreibungen, Typen und Tags – einzeln oder als schnelle Serie.",
          href: "/features/erfassen",
          icon: Sparkles,
        },
        {
          title: "Bilder aufbereiten",
          copy: "Originale bleiben erhalten; optional entsteht zusätzlich ein einheitliches quadratisches Titelbild.",
          href: "/features/erfassen",
          icon: ImageIcon,
        },
        {
          title: "Sofort wiederfinden",
          copy: "Suche, Tags, QR- und Barcodes führen direkt zum Eintrag mit Medien, Zustand, Bestand und Fundort.",
          href: "/features/strukturieren",
          icon: Search,
        },
        {
          title: "Räumlich verorten",
          copy: "Strukturierte Orte, GPS, Kartenpunkte und optionale RoomPlan-Räume zeigen, wo etwas wirklich liegt.",
          href: "/features/orte-raeume",
          icon: MapPinned,
        },
        {
          title: "Bestand & Ausleihe",
          copy: "Mengen, Einzelgeräte, Zu- und Abgänge, Reservierungen, Ausgaben und Rückgaben bleiben nachvollziehbar.",
          href: "/features/bestand-ausleihe",
          icon: PackageCheck,
        },
        {
          title: "Abläufe verbinden",
          copy: "Etiketten, Scan-Workflows, Rollen, API-Tokens und OpenAPI 3.1 binden dein Team und eigene Prozesse an.",
          href: "/features/labels-api",
          icon: Workflow,
        },
      ],
    },
    audiences: {
      eyebrow: "Für gemeinsam genutzte Ausrüstung",
      title: "Dort sinnvoll, wo Dinge wandern.",
      description:
        "Drei typische Abläufe zeigen konkret, wie Standort, Menge und Rückgabe zusammenarbeiten.",
      linkLabel: "Ablauf ansehen",
      items: [
        {
          title: "Makerspace",
          copy: "Maschinen einzeln und Schrauben als Mengenbestand führen. Ein QR-Scan öffnet die Ausleihe direkt am Regal.",
          href: "/use-cases/makerspace",
        },
        {
          title: "Werkstatt und Service",
          copy: "Wenn ein Werkzeugkoffer ins Fahrzeug wandert, öffnet ein Scan die Standortbuchung. Die Rückgabe setzt die Historie fort.",
          href: "/use-cases/handwerk",
        },
        {
          title: "Kleines Technikteam",
          copy: "Prüfgeräte Personen zuordnen und Prototypteile als Bestand führen. Die Suche zeigt Raum oder Schrank.",
          href: "/use-cases/startup",
        },
      ],
    },
    trust: {
      eyebrow: "Betrieb und Datenfluss",
      title: "Dein Server bleibt der Mittelpunkt.",
      description:
        "Anwendung, Datenbankmigrationen, OpenAPI-Vertrag und iOS-Quellcode stehen gemeinsam unter der MIT-Lizenz.",
      iosCaption: "Native SwiftUI-App · Beispieldaten",
      more: "Betrieb und Datenfluss ansehen",
      items: [
        {
          title: "Self-hosting",
          copy: "Docker Compose startet Anwendung, Migrationen und PostgreSQL. TLS, Backups und Updates bleiben Teil deines Betriebs.",
          icon: Server,
        },
        {
          title: "Optionale KI",
          copy: "Ohne Provider-Schlüssel bleibt die Bildanalyse aus. Bei Nutzung gehen benötigte Inhalte an den konfigurierten Dienst.",
          icon: KeyRound,
        },
        {
          title: "Native iOS-App",
          copy: "Der SwiftUI-Client nimmt Fotos auf, scannt Codes und hält ausstehende Uploads in einer dauerhaften Warteschlange.",
          icon: Smartphone,
        },
      ],
    },
    closing: {
      eyebrow: "Erster Test",
      title: "Fang mit dem Gegenstand an, den alle suchen.",
      description:
        "Starte Docker, fotografiere ihn, trage seinen Standort ein und drucke das QR-Etikett. So merkst du, ob Open Inventory zu deinem Team passt.",
      primary: "Docker-Anleitung öffnen",
      secondary: "Quellcode auf GitHub",
    },
  },
  en: {
    metadata: {
      title: "Open Inventory – Inventory in seconds",
      description:
        "One photo is enough: Open Inventory uses AI to suggest a name, description, type, and tags, then connects the record with images, stock, and location.",
    },
    hero: {
      eyebrow: "Inventory",
      title: "Where is the cordless drill?",
      description:
        "Inventory in seconds, not hours: simple AI-assisted capture, from automatically written details to a polished product image.",
      primary: "Open live demo",
      secondary: "Start with Docker",
      facts: ["MIT licensed", "Docker & PostgreSQL", "Web + native iOS app"],
      captureLabel: "Web app · German sample data",
      captureCaption:
        "Stock, locations, and the next actions in one view.",
      captureMeta: "13 items · 223 units",
    },
    workflow: {
      eyebrow: "One photo · four results",
      title: "Inventory, reimagined.",
      description:
        "Walk through your workshop and photograph what is there. Open Inventory recognises visible product details, writes the record, prepares a cover, and can connect it with its position in the room.",
      captureCaption: "From a quick workshop photo to a complete inventory record",
      steps: [
        {
          number: "01",
          title: "Take a photo",
          copy: "A quick phone photo is enough, right where the pliers happen to be. Type and location can stay preselected for a batch.",
        },
        {
          number: "02",
          title: "Create the details automatically",
          copy: "AI recognises visible product details and suggests a name, description, type, and tags. Location comes from batch context, GPS, or room placement.",
        },
        {
          number: "03",
          title: "Prepare the cover image",
          copy: "Optionally, the source photo becomes a calm square cover. The original image remains attached to the record.",
        },
        {
          number: "04",
          title: "Find it in the room",
          copy: "GPS, the map, or a separate RoomPlan placement can connect the record with its exact place, down to the room and workbench.",
        },
      ],
    },
    tasks: {
      eyebrow: "What Open Inventory can do",
      title: "Everything visible. Everything within reach.",
      description:
        "From automatic capture to search, checkout, and stock management, Open Inventory supports your equipment throughout its working life.",
      linkLabel: "View details",
      items: [
        {
          title: "Capture automatically",
          copy: "Photos become suggested names, descriptions, types, and tags, one at a time or in a fast batch.",
          href: "/features/erfassen",
          icon: Sparkles,
        },
        {
          title: "Prepare consistent images",
          copy: "Originals stay attached while an optional square cover creates a calm, consistent inventory grid.",
          href: "/features/erfassen",
          icon: ImageIcon,
        },
        {
          title: "Find anything immediately",
          copy: "Search, tags, QR, and barcodes lead to the record with media, condition, stock, and location.",
          href: "/features/strukturieren",
          icon: Search,
        },
        {
          title: "Place it spatially",
          copy: "Structured locations, GPS, map features, and optional RoomPlan rooms show where an item actually is.",
          href: "/features/orte-raeume",
          icon: MapPinned,
        },
        {
          title: "Manage stock and lending",
          copy: "Quantities, serialized devices, movements, reservations, checkout, and returns remain traceable.",
          href: "/features/bestand-ausleihe",
          icon: PackageCheck,
        },
        {
          title: "Connect your workflows",
          copy: "Labels, scan workflows, roles, API tokens, and OpenAPI 3.1 connect teams and custom processes.",
          href: "/features/labels-api",
          icon: Workflow,
        },
      ],
    },
    audiences: {
      eyebrow: "For shared equipment",
      title: "Useful wherever objects move.",
      description:
        "Three typical workflows show how location, quantities, and returns work together.",
      linkLabel: "See the workflow",
      items: [
        {
          title: "Makerspace",
          copy: "Track machines individually and screws as bulk stock. A QR scan opens checkout at the shelf.",
          href: "/use-cases/makerspace",
        },
        {
          title: "Workshop and field service",
          copy: "When a tool case moves to a van, a scan opens the location change. Its return continues the history.",
          href: "/use-cases/handwerk",
        },
        {
          title: "Small technical team",
          copy: "Assign test equipment to a person and manage prototype parts as stock. Search shows the recorded room or cabinet.",
          href: "/use-cases/startup",
        },
      ],
    },
    trust: {
      eyebrow: "Operations and data flow",
      title: "Your server remains at the centre.",
      description:
        "The application, database migrations, OpenAPI contract, and iOS source are published together under the MIT license.",
      iosCaption: "Native SwiftUI app · German sample data",
      more: "Review operations and data flow",
      items: [
        {
          title: "Self-hosting",
          copy: "Docker Compose starts the application, migrations, and PostgreSQL. TLS, backups, and updates remain your responsibility.",
          icon: Server,
        },
        {
          title: "Optional AI",
          copy: "Without provider keys, image analysis stays off. When used, required content goes to the service configured for the instance.",
          icon: KeyRound,
        },
        {
          title: "Native iOS app",
          copy: "The SwiftUI client captures photos, scans codes, and keeps pending uploads in a persistent outbox.",
          icon: Smartphone,
        },
      ],
    },
    closing: {
      eyebrow: "First test",
      title: "Start with the thing everyone keeps looking for.",
      description:
        "Run the Docker setup, photograph it, record its location, and print the QR label. That small workflow will tell you whether Open Inventory fits your team.",
      primary: "Open the Docker guide",
      secondary: "View source on GitHub",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const copy = homepageCopy[locale].metadata;

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: marketingPathAlternates(locale, "/"),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: marketingHref(locale, "/"),
      images: ["/og.png"],
      ...marketingOgLocale(locale),
    },
  };
}

function SectionIntro({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`font-mono text-[12px] font-semibold tracking-[-0.01em] ${
          inverse ? "text-[#8ff0cc]" : "text-brand"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(2.55rem,5vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.058em]">
        {title}
      </h2>
      <p
        className={`mt-5 max-w-2xl text-[16px] leading-7 sm:text-[18px] sm:leading-8 ${
          inverse ? "text-white/68" : "text-muted"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function ProductFigure({ copy }: { copy: HomepageCopy["hero"] }) {
  return (
    <figure className="relative overflow-hidden border border-border-strong bg-surface p-2 shadow-[0_26px_80px_rgba(28,25,45,0.14)] sm:p-3">
      <div className="flex min-h-10 items-center justify-between border-b border-border px-2 pb-2 font-mono text-[10px] text-muted sm:px-3">
        <span>{copy.captureLabel}</span>
        <span>INV-2026-08</span>
      </div>
      <div className="overflow-hidden bg-surface-muted">
        <Image
          src="/marketing/screenshots/web-stock-home.png"
          width={1148}
          height={735}
          sizes="(max-width: 1024px) 100vw, 58vw"
          alt={copy.captureCaption}
          loading="eager"
          fetchPriority="high"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="grid gap-2 border-t border-border px-3 py-3 text-[12px] leading-5 text-muted sm:grid-cols-[1fr_auto] sm:px-4">
        <span>{copy.captureCaption}</span>
        <span className="font-mono">{copy.captureMeta}</span>
      </figcaption>
    </figure>
  );
}

function InventoryMagicFlow({
  locale,
  copy,
}: {
  locale: MarketingLocale;
  copy: HomepageCopy["workflow"];
}) {
  const isEnglish = locale === "en";
  const icons = [Camera, Sparkles, ImageIcon, Box];

  const visual = (index: number) => {
    if (index === 0) {
      return (
        <div className="relative aspect-[4/3] overflow-hidden bg-[#171813]">
          <Image
            src="/marketing/photography/knipex-pliers-wrench.webp"
            alt={
              isEnglish
                ? "Real photograph of Knipex pliers, deliberately presented as a quick handheld capture"
                : "Reales Foto eines Knipex-Zangenschlüssels, bewusst wie eine schnelle Handyaufnahme inszeniert"
            }
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
            className="scale-[1.42] -rotate-6 object-cover object-center brightness-[0.72] contrast-[0.88] saturate-[0.72]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(0,0,0,0.62)_100%)]" />
          <div className="absolute inset-5 border border-white/24">
            <span className="absolute -left-px -top-px size-5 border-l-2 border-t-2 border-[#d6ff55]" />
            <span className="absolute -right-px -top-px size-5 border-r-2 border-t-2 border-[#d6ff55]" />
            <span className="absolute -bottom-px -left-px size-5 border-b-2 border-l-2 border-[#d6ff55]" />
            <span className="absolute -bottom-px -right-px size-5 border-b-2 border-r-2 border-[#d6ff55]" />
          </div>
          <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[9px] text-white/82">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#ff5a5f]" /> REC
            </span>
            <span>AUTO · 1×</span>
          </div>
          <p className="absolute inset-x-4 bottom-4 font-mono text-[9px] text-white/72">
            {isEnglish ? "Quick capture · workshop" : "Schnelle Aufnahme · Werkstatt"}
          </p>
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className="flex aspect-[4/3] flex-col bg-[#17181d] p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#8ff0cc]">
              <Sparkles className="size-4" aria-hidden="true" />
              {isEnglish ? "AI suggestion" : "KI-Vorschlag"}
            </span>
            <span className="rounded-full bg-white/8 px-2 py-1 font-mono text-[8px] text-white/54">
              96%
            </span>
          </div>
          <p className="mt-5 text-[20px] font-semibold leading-[1.05] tracking-[-0.04em]">
            KNIPEX Zangenschlüssel
          </p>
          <p className="mt-1 font-mono text-[10px] text-white/48">86 03 125 · Werkzeug</p>
          <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-white/64">
            {isEnglish
              ? "Compact pliers wrench with parallel jaws and red grips for gripping and turning workpieces."
              : "Kompakter Zangenschlüssel mit parallelen Backen und roten Griffen zum Greifen und Drehen von Werkstücken."}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {["KNIPEX", "125 mm", isEnglish ? "Pliers" : "Zange"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/12 px-2 py-1 font-mono text-[8px] text-white/56">
                {tag}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className="relative aspect-[4/3] overflow-hidden bg-[#dfff86] p-4">
          <div className="relative h-full overflow-hidden bg-white shadow-[0_18px_45px_rgba(33,38,27,0.16)]">
            <Image
              src="/marketing/photography/knipex-pliers-wrench.webp"
              alt={
                isEnglish
                  ? "Clean real product photograph of a Knipex pliers wrench"
                  : "Sauberes reales Produktfoto eines Knipex-Zangenschlüssels"
              }
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
              className="object-contain p-4"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[#17181d] px-2.5 py-1 font-mono text-[8px] text-white">
              {isEnglish ? "Cover" : "Titelbild"}
            </span>
            <p className="absolute inset-x-3 bottom-3 text-[10px] font-semibold text-[#252821]">
              KNIPEX · 86 03 125
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[#11151a] text-white [perspective:700px]">
        <div className="absolute inset-x-6 bottom-5 top-8 border border-white/18 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:28px_28px] [transform:rotateX(58deg)_rotateZ(-8deg)] [transform-origin:bottom]" />
        <div className="absolute left-[16%] top-[28%] h-[34%] w-[28%] border border-[#9188ff]/70 bg-[#9188ff]/14 [transform:skewY(-8deg)]" />
        <div className="absolute right-[17%] top-[37%] h-[28%] w-[30%] border border-white/22 bg-white/[0.04] [transform:skewY(7deg)]" />
        <span className="absolute left-[52%] top-[45%] grid size-12 place-items-center rounded-full bg-[#d6ff55] text-[#17181d] shadow-[0_0_0_10px_rgba(214,255,85,0.13)]">
          <MapPin className="size-6" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#8ff0cc]">
              {isEnglish ? "Spatial placement" : "Räumliche Platzierung"}
            </p>
            <p className="mt-1 text-[11px] font-semibold">
              {isEnglish ? "Workshop · Bench 2" : "Werkstatt · Werkbank 2"}
            </p>
          </div>
          <Box className="size-7 text-[#9188ff]" aria-hidden="true" />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li key={step.number} className="group relative border-t-2 border-foreground pt-4">
              {index < copy.steps.length - 1 ? (
                <span className="absolute -right-[18px] top-[22px] z-10 hidden size-8 place-items-center rounded-full border border-border-strong bg-background text-brand xl:grid">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              ) : null}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-brand">{step.number}</span>
                <Icon className="size-8 text-brand" strokeWidth={1.55} aria-hidden="true" />
              </div>
              {visual(index)}
              <h3 className="mt-5 text-[22px] font-semibold leading-[1.05] tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-muted">{step.copy}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-9 grid gap-3 border-t border-border-strong pt-5 text-[11px] leading-5 text-muted sm:grid-cols-[1fr_auto]">
        <p>
          {isEnglish
            ? "The example uses the same licensed real photograph in both image stages. AI suggestions, optional cover creation, and room placement remain separate operations."
            : "Das Beispiel nutzt in beiden Bildschritten dasselbe lizenzierte reale Foto. KI-Vorschläge, optionale Titelbilderstellung und Raumplatzierung bleiben getrennte Schritte."}
        </p>
        <a
          href="https://commons.wikimedia.org/wiki/File:Knipex_Zangenschl%C3%BCssel-8892.jpg"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-foreground underline decoration-border-strong underline-offset-4"
        >
          © Raimond Spekking · CC BY-SA 4.0
        </a>
      </div>
    </div>
  );
}

function HomePageContent({
  locale,
  copy,
}: {
  locale: MarketingLocale;
  copy: HomepageCopy;
}) {
  const href = (path: string) => marketingHref(locale, path);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="overflow-hidden border-b border-border">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:py-24">
            <div className="animate-fade-up">
              <p className="font-mono text-[12px] font-semibold text-brand">
                {copy.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[720px] text-[clamp(3.5rem,6.8vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                {copy.hero.title}
              </h1>
              <p className="mt-7 max-w-[620px] text-[17px] leading-8 text-muted sm:text-[19px]">
                {copy.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={publicDemoUrl}
                  className="inline-flex h-12 items-center justify-center gap-2 bg-strong px-5 text-sm font-semibold text-on-strong transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  {copy.hero.primary}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <Link
                  href={href("/docs#docker")}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-border-strong bg-surface px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-surface-muted"
                >
                  <Container className="size-4" aria-hidden="true" />
                  {copy.hero.secondary}
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted">
                {copy.hero.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <span className="size-1.5 bg-success" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:-mr-20 xl:-mr-28">
              <ProductFigure copy={copy.hero} />
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="scroll-mt-24 border-b border-border bg-surface py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <SectionIntro
              eyebrow={copy.workflow.eyebrow}
              title={copy.workflow.title}
              description={copy.workflow.description}
            />
            <InventoryMagicFlow locale={locale} copy={copy.workflow} />
          </div>
        </section>

        <section className="border-b border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
              <SectionIntro
                eyebrow={copy.tasks.eyebrow}
                title={copy.tasks.title}
                description={copy.tasks.description}
              />
              <p className="max-w-lg border-l-2 border-brand-border pl-5 text-[14px] leading-6 text-muted lg:justify-self-end">
                {locale === "en"
                  ? "One record carries its photographs, generated details, location, stock history, labels, and permissions through every workflow."
                  : "Ein Datensatz trägt Fotos, erzeugte Details, Standort, Bestandshistorie, Etiketten und Rechte durch jeden weiteren Ablauf."}
              </p>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.tasks.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={href(item.href)}
                    className="group relative border-t border-border-strong pt-6"
                  >
                    <span className="flex items-start justify-between gap-5">
                      <span className="grid size-16 place-items-center rounded-full bg-brand-soft text-brand transition duration-300 group-hover:scale-105 group-hover:bg-brand-solid group-hover:text-on-brand">
                        <Icon className="size-8" strokeWidth={1.55} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h3 className="mt-8 text-[23px] font-semibold tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <span className="mt-3 block text-[14px] leading-6 text-muted">
                      {item.copy}
                    </span>
                    <span className="mt-6 flex items-center gap-2 text-[12px] font-semibold text-brand">
                      {copy.tasks.linkLabel}
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <SectionIntro
                eyebrow={copy.audiences.eyebrow}
                title={copy.audiences.title}
                description={copy.audiences.description}
              />
              <div className="border-t border-border-strong">
                {copy.audiences.items.map((item, index) => (
                  <Link
                    key={item.title}
                    href={href(item.href)}
                    className="group grid gap-4 border-b border-border-strong py-7 sm:grid-cols-[42px_180px_1fr_auto] sm:items-start"
                  >
                    <p className="font-mono text-[11px] text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[20px] font-semibold leading-[1.1] tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-6 text-muted">
                      {item.copy}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-foreground">
                      {copy.audiences.linkLabel}
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#15171a] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
            <div>
              <SectionIntro
                eyebrow={copy.trust.eyebrow}
                title={copy.trust.title}
                description={copy.trust.description}
                inverse
              />

              <div className="mt-10 border-t border-white/18">
                {copy.trust.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="grid gap-4 border-b border-white/18 py-6 sm:grid-cols-[56px_150px_1fr] sm:items-start"
                    >
                      <span className="grid size-12 place-items-center rounded-full border border-white/14 bg-white/[0.06] text-[#8ff0cc]">
                        <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <h3 className="text-[15px] font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-6 text-white/62">
                        {item.copy}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                href={href("/open-source")}
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[#8ff0cc]"
              >
                {copy.trust.more}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <figure className="mx-auto w-full max-w-[560px] border border-white/16 bg-[#0d0f11] p-3 sm:p-4">
              <div className="flex items-center justify-between border-b border-white/12 px-1 pb-3 font-mono text-[10px] text-white/54">
                <span>{copy.trust.iosCaption}</span>
                <span>iOS 17+</span>
              </div>
              <div className="mt-4 overflow-hidden border border-white/12 bg-black">
                <Image
                  src="/marketing/screenshots/ios-search-home.png"
                  width={1206}
                  height={980}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  alt={copy.trust.iosCaption}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 grid grid-cols-2 gap-3 border-t border-white/12 pt-4 font-mono text-[10px] text-white/52">
                <span className="flex items-center gap-2">
                  <Barcode className="size-3.5" aria-hidden="true" />
                  QR · EAN · Code 128
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  GPS · RoomPlan
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-b border-border bg-brand-solid px-5 py-14 text-on-brand sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[12px] font-semibold text-white/74">
                {copy.closing.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(2.8rem,5.7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
                {copy.closing.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/76">
                {copy.closing.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={href("/docs#docker")}
                className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-sm font-semibold text-[#202127]"
              >
                <Container className="size-4" aria-hidden="true" />
                {copy.closing.primary}
              </Link>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 border border-white/28 px-5 text-sm font-semibold text-white"
              >
                <Github className="size-4" aria-hidden="true" />
                {copy.closing.secondary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

export default async function HomePage() {
  const locale = await getMarketingLocale();
  return <HomePageContent locale={locale} copy={homepageCopy[locale]} />;
}
