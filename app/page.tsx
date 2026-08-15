import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  Camera,
  Container,
  Github,
  KeyRound,
  MapPin,
  PackageCheck,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
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
      title: "Open Inventory – Inventar für Werkstatt und Technik",
      description:
        "Open Inventory verbindet Gegenstände mit Standorten, Beständen und Buchungen. Selbst hostbar, MIT-lizenziert, mit optionaler Bildanalyse und nativer iOS-App.",
    },
    hero: {
      eyebrow: "Inventar für Werkstatt und Technik",
      title: "Wo ist der Akkuschrauber?",
      description:
        "Open Inventory zeigt seinen hinterlegten Standort und die letzte Buchung. Ein Foto beginnt den Datensatz; auf Wunsch füllt die Bildanalyse Felder vor. Du bestimmst, was gespeichert wird.",
      primary: "Live-Demo öffnen",
      secondary: "Mit Docker starten",
      facts: ["MIT-Lizenz", "Docker & PostgreSQL", "Web + native iOS-App"],
      captureLabel: "Web-App · Beispieldaten",
      captureCaption:
        "Bestand, erwartete Lieferungen und knappe Artikel in einer gemeinsamen Ansicht.",
      captureMeta: "13 Artikel · 223 Einheiten",
    },
    workflow: {
      eyebrow: "Foto → Entwurf → Datensatz",
      title: "Ein Vorschlag bleibt ein Entwurf.",
      description:
        "Der Ablauf funktioniert mit oder ohne Bildanalyse. Wenn sie aktiv ist, füllt sie das Formular vor. Du änderst und speicherst in der Oberfläche.",
      captureCaption: "Serienerfassung in der Web-App · Beispieldaten",
      steps: [
        {
          number: "01",
          title: "Aufnehmen",
          copy: "Fotografiere den Gegenstand und bei Bedarf sein Typenschild. Standort und Typ lassen sich für eine Serie einmal setzen.",
        },
        {
          number: "02",
          title: "Entwurf bearbeiten",
          copy: "Vorgeschlagene Bezeichnung, Typ und Tags stehen in editierbaren Feldern. Vor dem Speichern kannst du sie korrigieren oder entfernen.",
        },
        {
          number: "03",
          title: "Finden und buchen",
          copy: "Suche und QR-Etikett öffnen denselben Datensatz. Dort siehst du Standort und Bestand; Ausleihe oder Rückgabe ergänzen die Historie.",
        },
      ],
    },
    tasks: {
      eyebrow: "Im Alltag",
      title: "Was mit dem Eintrag möglich wird.",
      description:
        "Vom ersten Foto bis zur nächsten Bestandsbewegung bleibt alles an einem nachvollziehbaren Datensatz.",
      linkLabel: "Im Detail",
      items: [
        {
          title: "Erfassen",
          copy: "Bei einer Serie bleibt die Kamera für den nächsten Gegenstand frei. Standort und Typ musst du nicht wiederholt eingeben.",
          href: "/features/erfassen",
          icon: Camera,
        },
        {
          title: "Finden",
          copy: "Suche nach Bezeichnung oder Inventar-ID. Ein QR- oder Code-128-Etikett öffnet den Eintrag direkt am Regal.",
          href: "/features/strukturieren",
          icon: Search,
        },
        {
          title: "Bewegen",
          copy: "Ausleihe und Rückgabe ändern den Status. Verbrauch oder Standortwechsel werden als weitere Bewegung protokolliert.",
          href: "/features/bestand-ausleihe",
          icon: PackageCheck,
        },
        {
          title: "Betreiben",
          copy: "Rollen begrenzen Bearbeitung und Buchung. API-Tokens und OpenAPI 3.1 binden eigene Abläufe an.",
          href: "/features/betrieb-sicherheit",
          icon: ShieldCheck,
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
      title: "Open Inventory – Inventory for workshops and technical teams",
      description:
        "Open Inventory connects objects with locations, stock, and movement history. Self-hostable and MIT licensed, with optional image analysis and a native iOS app.",
    },
    hero: {
      eyebrow: "Inventory for workshops and technical teams",
      title: "Where is the cordless drill?",
      description:
        "Open Inventory shows its recorded location and most recent movement. A photo starts the record; optional image analysis prefills fields. You decide what gets saved.",
      primary: "Open live demo",
      secondary: "Start with Docker",
      facts: ["MIT licensed", "Docker & PostgreSQL", "Web + native iOS app"],
      captureLabel: "Web app · German sample data",
      captureCaption:
        "Stock, incoming orders, and items needing attention in one view.",
      captureMeta: "13 items · 223 units",
    },
    workflow: {
      eyebrow: "Photo → draft → record",
      title: "A suggestion stays a draft.",
      description:
        "The workflow works with or without image analysis. When enabled, it prefills the form. You edit and save in the interface.",
      captureCaption: "Batch capture in the web app · German sample data",
      steps: [
        {
          number: "01",
          title: "Capture",
          copy: "Photograph the object and, when useful, its nameplate. Set location and type once for a batch.",
        },
        {
          number: "02",
          title: "Edit the draft",
          copy: "Suggested names, types, and tags appear in editable fields. Correct or remove them before saving.",
        },
        {
          number: "03",
          title: "Find and record changes",
          copy: "Search and the QR label open the same record. It shows location and stock; a checkout or return adds to its history.",
        },
      ],
    },
    tasks: {
      eyebrow: "Day to day",
      title: "What the record lets you do.",
      description:
        "From the first photo to the next stock movement, the work stays attached to one traceable record.",
      linkLabel: "View details",
      items: [
        {
          title: "Capture",
          copy: "During a batch, the camera stays ready for the next object. Location and type do not need repeated entry.",
          href: "/features/erfassen",
          icon: Camera,
        },
        {
          title: "Find",
          copy: "Search by name or inventory ID. A QR or Code 128 label opens the record at the shelf.",
          href: "/features/strukturieren",
          icon: Search,
        },
        {
          title: "Move",
          copy: "Checkout and return change the status. Consumption or a location change is recorded as another movement.",
          href: "/features/bestand-ausleihe",
          icon: PackageCheck,
        },
        {
          title: "Operate",
          copy: "Roles limit editing and stock bookings. API tokens and OpenAPI 3.1 connect your own workflows.",
          href: "/features/betrieb-sicherheit",
          icon: ShieldCheck,
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

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start lg:gap-16">
              <figure className="border border-border-strong bg-[#11130f] p-2 sm:p-3">
                <Image
                  src="/marketing/screenshots/web-batch-home.png"
                  width={1148}
                  height={640}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  alt={copy.workflow.captureCaption}
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-white/10 px-3 py-3 text-[12px] text-white/62 sm:px-4">
                  {copy.workflow.captureCaption}
                </figcaption>
              </figure>

              <ol className="border-t border-border-strong">
                {copy.workflow.steps.map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-3 border-b border-border-strong py-7 sm:grid-cols-[44px_1fr]"
                  >
                    <span className="font-mono text-[11px] text-brand">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-[21px] font-semibold tracking-[-0.035em]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-6 text-muted">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionIntro
              eyebrow={copy.tasks.eyebrow}
              title={copy.tasks.title}
              description={copy.tasks.description}
            />

            <div className="border-t border-border-strong">
              {copy.tasks.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={href(item.href)}
                    className="group grid gap-4 border-b border-border-strong py-6 sm:grid-cols-[42px_150px_1fr_auto] sm:items-start"
                  >
                    <span className="font-mono text-[11px] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-3 text-[18px] font-semibold tracking-[-0.025em]">
                      <Icon className="size-4 text-brand" aria-hidden="true" />
                      {item.title}
                    </span>
                    <span className="text-[14px] leading-6 text-muted">
                      {item.copy}
                    </span>
                    <span className="flex items-center gap-2 text-[12px] font-semibold text-brand">
                      {copy.tasks.linkLabel}
                      <ArrowRight
                        className="size-3.5 transition group-hover:translate-x-1"
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
                      className="grid gap-3 border-b border-white/18 py-5 sm:grid-cols-[36px_150px_1fr]"
                    >
                      <Icon
                        className="size-4 text-[#8ff0cc]"
                        aria-hidden="true"
                      />
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
