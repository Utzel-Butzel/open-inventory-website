import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Barcode,
  Box,
  Camera,
  Link2,
  LogIn,
  Map,
  MapPin,
  PackagePlus,
  RefreshCw,
  ScanLine,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { AppDownloads } from "@/components/marketing/app-downloads";
import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import {
  marketingOgLocale,
  marketingPathAlternates,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const title = locale === "de" ? "Open Inventory Apps" : "Open Inventory apps";
  const description = locale === "de"
    ? "Mobile Apps für Open Inventory: Android-Vorabversion herunterladen, App-Funktionen ansehen und Verfügbarkeit prüfen."
    : "Mobile apps for Open Inventory: download the Android preview, explore mobile app features and check availability.";
  return {
    title: { absolute: title },
    description,
    alternates: marketingPathAlternates(locale, "/app"),
    openGraph: {
      title,
      description,
      url: locale === "de" ? "/de/app" : "/app",
      images: ["/marketing/ios-app-icon-current.png"],
      ...marketingOgLocale(locale),
    },
  };
}

type AppFeature = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

const everydayFeatures: AppFeature[] = [
  {
    icon: Camera,
    title: "Fotografieren statt tippen",
    copy: "Nimm bis zu zwölf Fotos auf oder wähle sie aus der Mediathek. So bleiben Gesamtansicht, Typenschild und Zubehör am selben Eintrag.",
  },
  {
    icon: Sparkles,
    title: "Prüfbarer KI-Entwurf",
    copy: "Wenn du KI aktivierst, schlägt sie Angaben zum Foto vor. Prüfe und korrigiere Name und Beschreibung, bevor du sie übernimmst.",
  },
  {
    icon: Barcode,
    title: "QR & gängige Barcodes",
    copy: "Scanne ein Inventaretikett oder einen vorhandenen Barcode. Ein bekannter Code öffnet den passenden Eintrag.",
  },
  {
    icon: Search,
    title: "Inventar in der Tasche",
    copy: "Suche nach einem Gegenstand und sieh Fotos, Standort und Bestand nach. Änderungen sind auch in der Webanwendung sichtbar.",
  },
  {
    icon: PackagePlus,
    title: "Buchen direkt am Regal",
    copy: "Erfasse einen Zugang mit einem Tipp oder bestätige einen Abgang am gescannten Objekt. Die Bewegung landet in derselben Historie wie im Web.",
  },
  {
    icon: ScanLine,
    title: "Teile per Foto zählen",
    copy: "Lass bei Bedarf Teile auf einem Foto zählen. Prüfe die markierten Treffer und korrigiere die Menge vor der Bestandsbuchung.",
  },
];

const everydayFeaturesEn: AppFeature[] = [
  {
    icon: Camera,
    title: "Take photos instead of typing",
    copy: "Take up to twelve photos or select them from your library. Keep the item, its nameplate and accessories together in one record.",
  },
  {
    icon: Sparkles,
    title: "AI drafts you can review",
    copy: "If you enable AI, it suggests details from the photo. Review and correct the name and description before accepting them.",
  },
  {
    icon: Barcode,
    title: "QR and common barcodes",
    copy: "Scan an inventory label or an existing barcode. A recognised code opens the matching record.",
  },
  {
    icon: Search,
    title: "Inventory in your pocket",
    copy: "Look up an item to see its photos, location and stock. Changes also appear in the web application.",
  },
  {
    icon: PackagePlus,
    title: "Record stock at the shelf",
    copy: "Add incoming stock with one tap or confirm outgoing stock on the scanned item. The movement appears in the same history as it does on the web.",
  },
  {
    icon: ScanLine,
    title: "Count parts from a photo",
    copy: "Optionally count parts in a photo. Check the marked results and correct the quantity before recording stock.",
  },
];

function IPhoneCaptures({ locale }: { locale: "de" | "en" }) {
  const isEnglish = locale === "en";
  const captures = [
    {
      src: "/marketing/devices/iphone-inventory-cutout-v1.webp",
      label: isEnglish ? "Inventory" : "Inventarliste",
      alt: isEnglish
        ? "Photorealistic iPhone mockup showing the Open Inventory list"
        : "Freigestelltes, fotorealistisches iPhone mit der Open-Inventory-Inventarliste",
    },
    {
      src: "/marketing/devices/iphone-detail-cutout-v1.webp",
      label: isEnglish ? "Item detail" : "Eintragsdetail",
      alt: isEnglish
        ? "Photorealistic iPhone mockup showing an item in Open Inventory"
        : "Freigestelltes, fotorealistisches iPhone mit der Open-Inventory-Eintragsansicht",
    },
  ];

  return (
    <figure className="mx-auto w-full max-w-[570px]">
      <div className="grid grid-cols-2 items-end gap-3 sm:gap-5">
        {captures.map((capture, index) => (
          <div
            key={capture.src}
            className={index === 1 ? "translate-y-6 sm:translate-y-10" : undefined}
          >
            <div className="relative aspect-[1/2.08] drop-shadow-[0_28px_28px_rgba(0,0,0,0.35)]">
              <Image
                src={capture.src}
                alt={capture.alt}
                loading="eager"
                fill
                sizes="(max-width: 639px) 45vw, (max-width: 1023px) 260px, 220px"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 sm:text-[10px]">
              {capture.label}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}

function NativeWorkflowCaptures({ locale }: { locale: "de" | "en" }) {
  const isEnglish = locale === "en";
  const captures = [
    {
      src: "/marketing/screenshots/ios-search.png",
      label: isEnglish ? "Search" : "Suche",
      alt: isEnglish
        ? "Actual native Open Inventory search with demo records"
        : "Echte native Open-Inventory-Suche mit Demo-Einträgen",
    },
    {
      src: "/marketing/screenshots/ios-stock-management.png",
      label: isEnglish ? "Stock" : "Bestand",
      alt: isEnglish
        ? "Actual native Open Inventory stock management with demo data"
        : "Echte native Open-Inventory-Bestandsverwaltung mit Demo-Daten",
    },
    {
      src: "/marketing/screenshots/ios-map.png",
      label: isEnglish ? "Map" : "Karte",
      alt: isEnglish
        ? "Actual native Open Inventory map with purpose-built demo locations"
        : "Echte native Open-Inventory-Karte mit eigens angelegten Demo-Orten",
    },
  ];

  return (
    <section className="border-y border-border bg-surface-subtle py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {isEnglish ? "On the phone" : "Auf dem Telefon"}
            </p>
            <h2 className="mt-4 text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[60px]">
              {isEnglish
                ? "Search, stock and locations"
                : "Suche, Bestand und Standorte"}
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-muted">
            {isEnglish
              ? "Find a record, check stock and look up a location. These views show the mobile app with demo data and a German interface."
              : "Einen Eintrag finden, den Bestand prüfen und den Standort nachsehen. Diese Ansichten zeigen die App auf dem Telefon."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {captures.map((capture) => (
            <figure
              key={capture.src}
              className="mx-auto w-full max-w-[260px]"
            >
              <div className="relative aspect-[388/800] drop-shadow-[0_18px_24px_rgba(28,25,45,0.17)]">
                <Image
                  src="/marketing/devices/iphone-16-pro-max-frame.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="260px"
                  className="pointer-events-none z-10 object-contain"
                />
                {/* Match the frame's 388×800 source: screen inset 16×13 px, corner radius 59 px. */}
                <div className="absolute inset-x-[4.1237%] inset-y-[1.625%] overflow-hidden rounded-[16.573%/7.623%]">
                  <Image
                    src={capture.src}
                    fill
                    sizes="(max-width: 639px) 244px, 24vw"
                    alt={capture.alt}
                    className="object-fill"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-muted sm:text-[10px]">
                {capture.label}
              </figcaption>
            </figure>
          ))}
        </div>


      </div>
    </section>
  );
}

export default async function AppPage() {
  const locale = await getMarketingLocale();
  const isEnglish = locale === "en";
  const startSteps: Array<{
    icon: LucideIcon;
    number: string;
    title: string;
    copy: string;
  }> = isEnglish
    ? [
        {
          icon: Smartphone,
          number: "01",
          title: "Open the app",
          copy: "Start Open Inventory on your phone and allow camera access when prompted.",
        },
        {
          icon: Link2,
          number: "02",
          title: "Connect your instance",
          copy: "Enter the HTTPS address of your Open Inventory instance once.",
        },
        {
          icon: LogIn,
          number: "03",
          title: "Sign in",
          copy: "Use your local account and choose the workspace you want to capture into.",
        },
        {
          icon: Camera,
          number: "04",
          title: "Start capturing",
          copy: "Walk through the workshop, take photos, and let the background workflow do the rest.",
        },
      ]
    : [
        {
          icon: Smartphone,
          number: "01",
          title: "App öffnen",
          copy: "Starte Open Inventory auf deinem Telefon und erlaube beim ersten Mal den Kamerazugriff.",
        },
        {
          icon: Link2,
          number: "02",
          title: "Instanz verbinden",
          copy: "Trage einmalig die HTTPS-Adresse deiner Open-Inventory-Instanz ein.",
        },
        {
          icon: LogIn,
          number: "03",
          title: "Anmelden",
          copy: "Melde dich mit deinem lokalen Konto an und wähle den passenden Arbeitsbereich.",
        },
        {
          icon: Camera,
          number: "04",
          title: "Erfassen",
          copy: "Geh durch die Werkstatt, fotografiere deine Dinge und lass den Ablauf im Hintergrund weiterarbeiten.",
        },
      ];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#111216] text-white">

          <div className="site-shell relative grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-[1fr_0.78fr] lg:gap-10">
            <div className="max-w-[650px]">
              <div className="flex items-center gap-5 sm:gap-6">
                <Image
                  src="/marketing/ios-app-icon-current.png"
                  alt={
                    isEnglish
                      ? "Open Inventory app icon for iOS"
                      : "App-Icon von Open Inventory für iOS"
                  }
                  width={120}
                  height={120}
                  preload
                  className="size-[96px] rounded-[23px] shadow-[0_20px_55px_rgba(0,0,0,0.42)] ring-1 ring-white/15 sm:size-[120px] sm:rounded-[28px]"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-inverse">
                    {isEnglish ? "Open Inventory apps" : "Open Inventory Apps"}
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    {isEnglish ? "iOS and Android" : "iOS und Android"}
                  </p>
                </div>
              </div>

              <h1 className="site-title mt-8">{isEnglish ? "Inventory at the shelf" : "Inventar direkt am Regal"}</h1>
              <p className="mt-7 max-w-[600px] text-[17px] leading-8 text-white/65 sm:text-[19px]">
                {isEnglish
                  ? "Take a photo, scan a code, or record stock right at the shelf. Open Inventory connects to your own instance, while uploads and optional AI processing continue reliably in the background."
                  : "Fotografiere einen Gegenstand, scanne sein Etikett oder buche Material direkt am Regal. Die mobilen Apps verbinden sich mit deiner eigenen Open-Inventory-Installation."}
              </p>

              <div id="app-downloads" className="scroll-mt-24">
                <AppDownloads locale={locale} dark />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#app-workflows"
                  className="site-button site-button-primary"
                >
                  {isEnglish ? "Explore the workflows" : "Abläufe ansehen"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#getting-started"
                  className="site-button site-button-secondary"
                >
                  {isEnglish ? "See how to get started" : "So startest du"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

            </div>

            <IPhoneCaptures locale={locale} />
          </div>
        </section>

        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  icon: Smartphone,
                  title: isEnglish ? "Made for your phone" : "Für das Telefon gemacht",
                  copy: isEnglish
                    ? "Use your phone camera to photograph equipment and scan labels directly in the app."
                    : "Nutze die Kamera deines Telefons, um Geräte aufzunehmen und Etiketten direkt in der App zu scannen.",
                },
                {
                  icon: Link2,
                  title: isEnglish ? "One shared inventory" : "Ein gemeinsames Inventar",
                  copy: isEnglish
                    ? "The mobile app and web application use the same records, images, permissions, and stock history."
                    : "App auf dem Telefon und Webanwendung nutzen dieselben Einträge, Bilder, Berechtigungen und Bestandsverläufe.",
                },
                {
                  icon: RefreshCw,
                  title: isEnglish ? "Resume interrupted uploads" : "Uploads fortsetzen",
                  copy: isEnglish
                    ? "If a connection drops, saved uploads can resume without creating duplicate records."
                    : "Wenn die Verbindung abbricht, können gespeicherte Uploads fortgesetzt werden, ohne doppelte Einträge anzulegen.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="border-t border-border py-6">
                  <Icon className="size-6 text-muted" strokeWidth={1.7} aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.035em]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="app-workflows" className="scroll-mt-24 py-20 sm:py-28">
          <div className="site-shell">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {isEnglish ? "Day to day" : "Im Alltag"}
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[60px]">
                {isEnglish
                  ? "What you can do on the phone"
                  : "Was du auf dem Telefon erledigen kannst"}
              </h2>
              <p className="mt-6 text-[17px] leading-8 text-muted">
                {isEnglish
                  ? "The mobile app uses the same records, permissions, and stock rules as the web application."
                  : "Die App auf dem Telefon nutzt dieselben Einträge, Berechtigungen und Bestandsregeln wie die Webanwendung."}
              </p>
            </div>

            <dl className="mt-10 grid gap-x-12 md:grid-cols-2">
              {(isEnglish ? everydayFeaturesEn : everydayFeatures).map(({ title, copy }) => (
                <div key={title} className="border-t border-border py-6">
                  <dt className="text-lg font-semibold">{title}</dt>
                  <dd className="mt-2 max-w-xl text-sm leading-7 text-muted">{copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <NativeWorkflowCaptures locale={locale} />

        <section className="border-y border-border bg-[#17181d] py-20 text-white sm:py-28">
          <div className="site-shell grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-inverse">
                {isEnglish ? "Optional on LiDAR devices" : "Optional auf LiDAR-Geräten"}
              </p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[54px]">
                {isEnglish
                  ? "Record rooms with a LiDAR iPhone"
                  : "Räume mit einem LiDAR-iPhone erfassen"}
              </h2>
              <p className="mt-6 text-[16px] leading-7 text-white/65">
                {isEnglish
                  ? "RoomPlan, depth sensing, and precise indoor placement are optional features for compatible LiDAR iPhones, usually recent Pro models. Taking photos, scanning, searching, and recording stock work on supported iPhones without LiDAR."
                  : "RoomPlan, Tiefenmessung und präzise Innenraum-Platzierung sind Zusatzfunktionen für kompatible LiDAR-iPhones, typischerweise aktuelle Pro-Modelle. Fotografieren, Scannen, Suchen und Buchen funktionieren unabhängig davon auf unterstützten iPhones."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(isEnglish
                ? [
                    [Map, "Rooms and floors", "Combine room scans to document connected rooms and floors."],
                    [MapPin, "Measured item position", "Use a measured position to mark where an item is located in the room."],
                    [Camera, "Room reference photos", "Saved room photos can help locate an item again."],
                    [Box, "Reuse 3D data on the web", "Measured scenes, USDZ files, and inventory markers appear in the browser under 3D Rooms."],
                  ]
                : [
                    [Map, "Räume und Etagen", "Verbinde Raumaufnahmen, um zusammenhängende Räume und Etagen zu dokumentieren."],
                    [MapPin, "Gemessene Objektposition", "Markiere anhand einer gemessenen Position, wo sich ein Gegenstand im Raum befindet."],
                    [Camera, "Raumfotos zur Orientierung", "Gespeicherte Raumfotos können helfen, die Position eines Gegenstands wiederzufinden."],
                    [Box, "3D im Web weiterverwenden", "Gemessene Szenen, USDZ-Dateien und Inventarmarker erscheinen im Browser unter Räume 3D."],
                  ]
              ).map(([Icon, title, copy]) => {
                const FeatureIcon = Icon as LucideIcon;
                return (
                  <article
                    key={title as string}
                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:p-6"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-inverse/12 text-brand-inverse">
                      <FeatureIcon className="size-7" strokeWidth={1.65} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold">{title as string}</h3>
                      <p className="mt-2 text-[13px] leading-6 text-white/65">{copy as string}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="getting-started" className="scroll-mt-24 py-20 sm:py-28">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {isEnglish ? "Connect your installation" : "Installation verbinden"}
                </p>
                <h2 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[56px]">
                  {isEnglish
                    ? "Connect the app on your phone to your server"
                    : "Die App auf deinem Telefon mit deinem Server verbinden"}
                </h2>
                <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
                  {isEnglish
                    ? "On first launch, enter the HTTPS address of your Open Inventory instance and sign in. Photos, scanning, search, stock, and rooms are then ready on your phone."
                    : "Beim ersten Start trägst du einmalig die HTTPS-Adresse deiner Open-Inventory-Instanz ein und meldest dich an. Danach stehen Fotos, Scanner, Suche, Bestände und Räume direkt auf dem Telefon bereit."}
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-soft p-6 sm:p-7">
                <Link2 className="size-9 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-5 text-[16px] font-semibold tracking-[-0.025em]">
                  {isEnglish
                    ? "Your existing account"
                    : "Dein vorhandenes Konto"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {isEnglish
                    ? "The phone connects directly to the HTTPS address of your Open Inventory server and uses the same accounts and permissions."
                    : "Das Telefon verbindet sich direkt mit der HTTPS-Adresse deines Open-Inventory-Servers und nutzt dieselben Konten und Berechtigungen."}
                </p>
              </div>
            </div>

            <ol className="mt-14 grid overflow-hidden rounded-2xl bg-[#17181d] text-white md:grid-cols-2 lg:grid-cols-4">
              {startSteps.map(({ icon: StepIcon, number, title, copy }, index) => (
                <li
                  key={number}
                  className="relative border-b border-white/10 p-7 last:border-b-0 md:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-2xl bg-white/[0.07] text-brand-inverse ring-1 ring-white/10">
                      <StepIcon className="size-5" strokeWidth={1.55} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-white/65">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{copy}</p>
                  {index < startSteps.length - 1 ? (
                    <ArrowRight
                      className="absolute -right-3 top-14 z-10 hidden size-6 rounded-full bg-[#17181d] p-1 text-brand-inverse lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border py-10">
          <div className="site-shell flex flex-wrap gap-6">
            <Link href="#app-downloads" className="site-link">{isEnglish ? "Back to app availability" : "Zur App-Verfügbarkeit"}<ArrowRight aria-hidden="true" /></Link>
            <Link href={isEnglish ? "/docs#docker" : "/de/docs#docker"} className="site-link">{isEnglish ? "Set up your server" : "Eigenen Server einrichten"}<ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
