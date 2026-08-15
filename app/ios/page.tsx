import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Barcode,
  Box,
  Camera,
  Check,
  Clock3,
  KeyRound,
  Link2,
  LogIn,
  Map,
  MapPin,
  PackagePlus,
  RefreshCw,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
} from "lucide-react";

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
  const title = locale === "de" ? "Open Inventory für iPhone" : "Open Inventory for iPhone";
  const description = locale === "de"
    ? "Objekte fotografieren, automatisch beschreiben, QR- und Barcodes scannen, Bestände buchen und Räume mit Open Inventory für iPhone erfassen."
    : "Photograph objects, create useful descriptions, scan QR codes and barcodes, record stock, and capture rooms with Open Inventory for iPhone.";
  return {
    title: { absolute: title },
    description,
    alternates: marketingPathAlternates(locale, "/ios"),
    openGraph: {
      title,
      description,
      url: locale === "de" ? "/de/ios" : "/ios",
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
    copy: "Nimm bis zu zwölf Fotos auf oder wähle sie aus der Mediathek. Die App verkleinert sie auf 2.200 Pixel und legt daraus einen verlässlichen Upload-Auftrag an.",
  },
  {
    icon: Sparkles,
    title: "Prüfbarer KI-Entwurf",
    copy: "Auf Wunsch stößt die App am Server Analyse und Cover-Erstellung an. Name, Details und Modellwahl bleiben sichtbar und unter deiner Kontrolle.",
  },
  {
    icon: Barcode,
    title: "QR & gängige Barcodes",
    copy: "Erkennt QR, EAN-8/13, UPC-E, Code 128, Data Matrix, PDF417 und Aztec. UUID, Inventarlink, SKU oder Seriennummer führen direkt zum passenden Eintrag.",
  },
  {
    icon: Search,
    title: "Inventar in der Tasche",
    copy: "Suche, filtere, öffne und bearbeite Einträge mit geschützten Bildern. Karte, Details und Einstellungen sind direkt auf dem iPhone verfügbar.",
  },
  {
    icon: PackagePlus,
    title: "Buchen direkt am Regal",
    copy: "Erfasse einen Zugang mit einem Tipp oder bestätige einen Abgang am gescannten Objekt. Die Bewegung landet in derselben Historie wie im Web.",
  },
  {
    icon: ScanLine,
    title: "Teile per Foto zählen",
    copy: "Eine optionale serverseitige Zählung liefert Menge, Markierungen und Konfidenz. Du korrigierst das Ergebnis, bevor Bestand hinzugefügt oder entnommen wird.",
  },
];

const everydayFeaturesEn: AppFeature[] = [
  {
    icon: Camera,
    title: "Take photos instead of typing",
    copy: "Take up to twelve photos or choose them from the photo library. The app resizes them to 2,200 pixels and creates a durable upload job.",
  },
  {
    icon: Sparkles,
    title: "AI drafts you can review",
    copy: "If enabled, the app asks the server to analyze the photos and generate a cover. The suggested name, details, and selected model stay visible and editable.",
  },
  {
    icon: Barcode,
    title: "QR and common barcodes",
    copy: "Reads QR, EAN-8/13, UPC-E, Code 128, Data Matrix, PDF417, and Aztec. A UUID, inventory link, SKU, or serial number opens the matching item directly.",
  },
  {
    icon: Search,
    title: "Inventory in your pocket",
    copy: "Search, filter, open, and edit items with protected images. The map, details, and settings are available directly on your iPhone.",
  },
  {
    icon: PackagePlus,
    title: "Record stock at the shelf",
    copy: "Add incoming stock with one tap or confirm outgoing stock on the scanned item. The movement appears in the same history as it does on the web.",
  },
  {
    icon: ScanLine,
    title: "Count parts from a photo",
    copy: "An optional server-side count returns a quantity, annotations, and confidence score. You can correct it before stock is added or removed.",
  },
];

function IPhoneCaptures({ locale }: { locale: "de" | "en" }) {
  const isEnglish = locale === "en";
  const captures = [
    {
      src: "/marketing/screenshots/ios-inventory.png",
      label: isEnglish ? "Inventory" : "Inventarliste",
      alt: isEnglish
        ? "Real capture of the native Open Inventory iOS app showing inventory records with demo data"
        : "Echte Aufnahme der nativen Open-Inventory-iOS-App mit Inventareinträgen und Demo-Daten",
    },
    {
      src: "/marketing/screenshots/ios-item-detail.png",
      label: isEnglish ? "Item detail" : "Eintragsdetail",
      alt: isEnglish
        ? "Real capture of the native Open Inventory iOS app showing an item detail with demo data"
        : "Echte Aufnahme der nativen Open-Inventory-iOS-App mit einem Eintragsdetail und Demo-Daten",
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
            <div className="relative rounded-[clamp(1.65rem,5vw,3.25rem)] border-[clamp(4px,0.8vw,7px)] border-[#2c2d31] bg-black p-[clamp(3px,0.6vw,5px)] shadow-[0_35px_80px_rgba(0,0,0,0.38),inset_0_0_0_1px_rgba(255,255,255,0.18)]">
              <span className="absolute -left-[9px] top-[18%] h-[11%] w-[3px] rounded-l bg-[#424349]" />
              <span className="absolute -right-[9px] top-[24%] h-[13%] w-[3px] rounded-r bg-[#424349]" />
              <div className="relative aspect-[1206/2622] overflow-hidden rounded-[clamp(1.25rem,4vw,2.65rem)] bg-[#f2f2f7]">
                <Image
                  src={capture.src}
                  alt={capture.alt}
                  fill
                  sizes="(max-width: 639px) 45vw, (max-width: 1023px) 260px, 220px"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40 sm:text-[10px]">
              {capture.label}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-10 text-center text-[10px] font-medium text-white/45 sm:mt-14">
        {isEnglish
          ? "Real app captures with demo data"
          : "Echte App-Aufnahmen mit Demo-Daten"}
      </figcaption>
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
    {
      src: "/marketing/screenshots/ios-settings.png",
      label: isEnglish ? "Workspace" : "Arbeitsbereich",
      alt: isEnglish
        ? "Actual native Open Inventory workspace settings"
        : "Echte native Open-Inventory-Einstellungen für den Arbeitsbereich",
    },
    {
      src: "/marketing/screenshots/ios-permissions.png",
      label: isEnglish ? "Permissions" : "Berechtigungen",
      alt: isEnglish
        ? "Actual native Open Inventory permissions screen for a demo administrator"
        : "Echte native Open-Inventory-Berechtigungsansicht eines Demo-Administrators",
    },
    {
      src: "/marketing/screenshots/ios-system-status.png",
      label: isEnglish ? "System status" : "Systemstatus",
      alt: isEnglish
        ? "Actual native Open Inventory system-status screen for the local demo server"
        : "Echte native Open-Inventory-Systemstatusansicht des lokalen Demo-Servers",
    },
  ];

  return (
    <section className="border-y border-border bg-surface-subtle py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {isEnglish ? "More actual app states" : "Mehr echte App-Zustände"}
            </p>
            <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[60px]">
              {isEnglish
                ? "Six workflows. Directly from the native app."
                : "Sechs Abläufe. Direkt aus der nativen App."}
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-muted">
            {isEnglish
              ? "These original captures come directly from the running app. Every record and location was purpose-built as realistic demo data; none of the interfaces were recreated or generated."
              : "Diese Originalaufnahmen stammen direkt aus der laufenden App. Alle Einträge und Orte wurden als realistische Demo-Daten angelegt; keine Oberfläche wurde nachgebaut oder generiert."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {captures.map((capture, index) => (
            <figure
              key={capture.src}
              className={`group ${index % 2 === 1 ? "sm:translate-y-6" : ""}`}
            >
              <div className="overflow-hidden rounded-[28px] border-[5px] border-[#17181d] bg-[#17181d] p-1 shadow-[0_18px_48px_rgba(28,25,45,0.17)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_64px_rgba(28,25,45,0.24)] sm:rounded-[36px] sm:border-[6px]">
                <Image
                  src={capture.src}
                  width={1206}
                  height={2622}
                  sizes="(max-width: 767px) 46vw, (max-width: 1023px) 30vw, 180px"
                  alt={capture.alt}
                  className="h-auto w-full rounded-[20px] sm:rounded-[27px]"
                />
              </div>
              <figcaption className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-muted sm:text-[10px]">
                {capture.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] font-medium text-muted sm:mt-16">
          {isEnglish
            ? "Original app captures · purpose-built demo data · no recreated interfaces"
            : "Originale App-Aufnahmen · eigens angelegte Demo-Daten · keine nachgebauten Oberflächen"}
        </p>
      </div>
    </section>
  );
}

export default async function IOSPage() {
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
          copy: "Start Open Inventory on your iPhone and allow camera access when prompted.",
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
          copy: "Starte Open Inventory auf deinem iPhone und erlaube beim ersten Mal den Kamerazugriff.",
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

      <main>
        <section className="relative overflow-hidden bg-[#111216] text-white">
          <div className="pointer-events-none absolute -left-24 top-20 size-[420px] rounded-full bg-[#665cff]/28 blur-[130px]" />
          <div className="pointer-events-none absolute right-[8%] top-24 size-[380px] rounded-full bg-[#8ff0cc]/14 blur-[130px]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

          <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_0.78fr] lg:gap-10">
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                    {isEnglish ? "Open Inventory for iPhone" : "Open Inventory für iPhone"}
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    {isEnglish ? "Native app · iOS 17+" : "Native App · iOS 17+"}
                  </p>
                </div>
              </div>

              <h1 className="mt-8 text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
                {isEnglish ? "Inventory in" : "Inventar in"}
                <span className="block text-[#9188ff]">
                  {isEnglish ? "your hands." : "deiner Hand."}
                </span>
              </h1>
              <p className="mt-7 max-w-[600px] text-[17px] leading-8 text-white/55 sm:text-[19px]">
                {isEnglish
                  ? "Take a photo, scan a code, or record stock right at the shelf. Open Inventory connects to your own instance, while uploads and optional AI processing continue reliably in the background."
                  : "Foto aufnehmen, Code scannen oder Bestand direkt am Regal buchen: Open Inventory verbindet sich mit deiner eigenen Instanz, während Uploads und optionale KI-Verarbeitung zuverlässig im Hintergrund weiterlaufen."}
              </p>

              <div className="mt-8 max-w-[590px] rounded-[22px] border border-white/12 bg-white/[0.065] p-4 backdrop-blur-sm sm:p-5">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#8ff0cc]/12 text-[#8ff0cc]">
                    <Clock3 className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {isEnglish
                        ? "App Store release in preparation"
                        : "App-Store-Veröffentlichung in Vorbereitung"}
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-white/45">
                      {isEnglish
                        ? "The public App Store product page is not live yet. We will link it here as soon as it is available."
                        : "Die öffentliche Produktseite im App Store ist noch nicht freigeschaltet. Sobald sie verfügbar ist, wird sie hier verlinkt."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#app-workflows"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-sm font-semibold text-[#17181d] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  {isEnglish ? "Explore the workflows" : "Abläufe ansehen"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#getting-started"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/15 bg-white/[0.06] px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {isEnglish ? "See how to get started" : "So startest du"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-white/50">
                {(isEnglish
                  ? ["Native for iPhone", "iOS 17+", "Your server URL"]
                  : ["Nativ für iPhone", "iOS 17+", "Deine Server-URL"]
                ).map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="size-3 text-[#8ff0cc]" strokeWidth={2.6} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <IPhoneCaptures locale={locale} />
          </div>
        </section>

        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr]">
              {[
                {
                  icon: Smartphone,
                  title: isEnglish ? "Made for the iPhone" : "Für das iPhone gemacht",
                  copy: isEnglish
                    ? "SwiftUI and AVFoundation provide a fast camera, fluid scanning, and familiar iPhone controls instead of an embedded web interface."
                    : "SwiftUI und AVFoundation sorgen für eine schnelle Kamera, flüssiges Scannen und vertraute iPhone-Bedienung statt einer eingebetteten Web-Oberfläche.",
                },
                {
                  icon: Link2,
                  title: isEnglish ? "One shared inventory" : "Ein gemeinsames Inventar",
                  copy: isEnglish
                    ? "The iPhone app and web application use the same records, images, permissions, and stock history."
                    : "iPhone-App und Webanwendung nutzen dieselben Einträge, Bilder, Berechtigungen und Bestandsverläufe.",
                },
                {
                  icon: RefreshCw,
                  title: isEnglish ? "Built for bad reception" : "Für echte Funklöcher",
                  copy: isEnglish
                    ? "Persistent jobs and safe retries resume interrupted uploads."
                    : "Persistente Aufträge und sichere Wiederholungen setzen Uploads fort.",
                },
              ].map(({ icon: Icon, title, copy }, index) => (
                <article
                  key={title}
                  className={`rounded-[26px] border p-7 sm:p-8 ${
                    index === 0
                      ? "border-brand/15 bg-[linear-gradient(135deg,var(--color-background),var(--color-brand-soft))]"
                      : "border-border bg-background"
                  }`}
                >
                  <span
                    className={`grid place-items-center rounded-[22px] bg-brand-soft text-brand ${
                      index === 0 ? "size-20" : "size-16"
                    }`}
                  >
                    <Icon
                      className={index === 0 ? "size-10" : "size-8"}
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                  </span>
                  <h2 className="mt-8 text-xl font-semibold tracking-[-0.035em]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="app-workflows" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {isEnglish ? "Day to day" : "Im Alltag"}
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[60px]">
                {isEnglish
                  ? "Less data entry. A clearer inventory."
                  : "Weniger Verwaltung. Mehr Überblick."}
              </h2>
              <p className="mt-6 text-[17px] leading-8 text-muted">
                {isEnglish
                  ? "The iPhone app uses the same records, permissions, and stock rules as the web application."
                  : "Die iPhone-App nutzt dieselben Einträge, Berechtigungen und Bestandsregeln wie die Webanwendung."}
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(isEnglish ? everydayFeaturesEn : everydayFeatures).map(({ icon: Icon, title, copy }, index) => (
                <article
                  key={title}
                  className={`relative overflow-hidden rounded-[28px] border border-border bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-8 ${
                    index === 0 ? "min-h-[340px] md:col-span-2 lg:col-span-2" : "min-h-[280px]"
                  }`}
                >
                  {index === 0 ? (
                    <Icon
                      className="pointer-events-none absolute -bottom-12 -right-10 size-56 text-brand opacity-[0.07] sm:size-64"
                      strokeWidth={1.1}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`relative grid place-items-center rounded-[22px] bg-brand-soft text-brand ${
                      index === 0 ? "size-20" : "size-16"
                    }`}
                  >
                    <Icon
                      className={index === 0 ? "size-10" : "size-8"}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                  <h3
                    className={`relative mt-10 font-semibold tracking-[-0.04em] ${
                      index === 0 ? "text-3xl sm:text-[38px]" : "text-xl"
                    }`}
                  >
                    {title}
                  </h3>
                  <p className={`relative mt-3 leading-7 text-muted ${index === 0 ? "max-w-xl text-base" : "text-sm"}`}>
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <NativeWorkflowCaptures locale={locale} />

        <section className="border-y border-border bg-[#17181d] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                {isEnglish ? "Optional on LiDAR devices" : "Optional auf LiDAR-Geräten"}
              </p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[54px]">
                {isEnglish
                  ? "Measure rooms. Place inventory in 3D space."
                  : "Räume vermessen. Dinge räumlich verorten."}
              </h2>
              <p className="mt-6 text-[16px] leading-7 text-white/52">
                {isEnglish
                  ? "RoomPlan, depth sensing, and precise indoor placement are optional features for compatible LiDAR iPhones, usually recent Pro models. Taking photos, scanning, searching, and recording stock work on supported iPhones without LiDAR."
                  : "RoomPlan, Tiefenmessung und präzise Innenraum-Platzierung sind Zusatzfunktionen für kompatible LiDAR-iPhones, typischerweise aktuelle Pro-Modelle. Fotografieren, Scannen, Suchen und Buchen funktionieren unabhängig davon auf unterstützten iPhones."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(isEnglish
                ? [
                    [Map, "Multiple rooms and floors", "Connected RoomPlan captures share an explicitly labelled coordinate system."],
                    [MapPin, "Measured item position", "ARKit relocalization, scene depth, or plane measurements place a photographed item inside the room."],
                    [Camera, "Localization keyframes", "A limited set of calibrated room photos can provide additional evidence for a position."],
                    [Box, "Reuse 3D data on the web", "Measured scenes, USDZ files, and inventory markers appear in the browser under 3D Rooms."],
                  ]
                : [
                    [Map, "Mehrere Räume & Etagen", "Zusammenhängende RoomPlan-Aufnahmen teilen ein klar gekennzeichnetes Koordinatensystem."],
                    [MapPin, "Gemessene Objektposition", "ARKit-Relokalisierung, Szenentiefe oder Ebenenmessung verorten ein fotografiertes Objekt im Raum."],
                    [Camera, "Lokalisierungs-Keyframes", "Begrenzte, kalibrierte Raumfotos können eine Position als zusätzliche Evidenz stützen."],
                    [Box, "3D im Web weiterverwenden", "Gemessene Szenen, USDZ-Dateien und Inventarmarker erscheinen im Browser unter Räume 3D."],
                  ]
              ).map(([Icon, title, copy]) => {
                const FeatureIcon = Icon as LucideIcon;
                return (
                  <article
                    key={title as string}
                    className="flex gap-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-5 sm:p-6"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-[20px] bg-[#9188ff]/12 text-[#a39cff]">
                      <FeatureIcon className="size-7" strokeWidth={1.65} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold">{title as string}</h3>
                      <p className="mt-2 text-[13px] leading-6 text-white/48">{copy as string}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="getting-started" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {isEnglish ? "Ready in moments" : "In wenigen Momenten startklar"}
                </p>
                <h2 className="mt-4 text-[40px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[56px]">
                  {isEnglish
                    ? "Open the app. Connect your server. Start capturing."
                    : "App öffnen. Instanz verbinden. Losfotografieren."}
                </h2>
                <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted">
                  {isEnglish
                    ? "On first launch, enter the HTTPS address of your Open Inventory instance and sign in. Photos, scanning, search, stock, and rooms are then ready on your iPhone."
                    : "Beim ersten Start trägst du einmalig die HTTPS-Adresse deiner Open-Inventory-Instanz ein und meldest dich an. Danach stehen Fotos, Scanner, Suche, Bestände und Räume direkt auf dem iPhone bereit."}
                </p>
              </div>

              <div className="rounded-[26px] border border-brand-border bg-brand-soft p-6 sm:p-7">
                <Link2 className="size-9 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-5 text-[16px] font-semibold tracking-[-0.025em]">
                  {isEnglish
                    ? "Your app. Your instance."
                    : "Deine App. Deine Instanz."}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {isEnglish
                    ? "The iPhone connects directly to the HTTPS address of your Open Inventory server and uses the same accounts and permissions."
                    : "Das iPhone verbindet sich direkt mit der HTTPS-Adresse deines Open-Inventory-Servers und nutzt dieselben Konten und Berechtigungen."}
                </p>
              </div>
            </div>

            <ol className="mt-14 grid overflow-hidden rounded-[34px] bg-[#17181d] text-white md:grid-cols-2 lg:grid-cols-4">
              {startSteps.map(({ icon: StepIcon, number, title, copy }, index) => (
                <li
                  key={number}
                  className="relative min-h-[310px] border-b border-white/10 p-7 last:border-b-0 md:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-[76px] place-items-center rounded-[26px] bg-white/[0.07] text-[#8ff0cc] ring-1 ring-white/10">
                      <StepIcon className="size-9" strokeWidth={1.55} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-white/35">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-12 text-[24px] font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{copy}</p>
                  {index < startSteps.length - 1 ? (
                    <ArrowRight
                      className="absolute -right-3 top-14 z-10 hidden size-6 rounded-full bg-[#17181d] p-1 text-[#9188ff] lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: KeyRound,
                  title: isEnglish ? "Token in Keychain" : "Token im Keychain",
                  copy: isEnglish
                    ? "Signing in creates a device token that iOS stores in Keychain."
                    : "Die Anmeldung erzeugt einen Geräte-Token, den iOS geschützt im Keychain speichert.",
                },
                {
                  icon: WifiOff,
                  title: isEnglish ? "Persistent outbox" : "Persistente Outbox",
                  copy: isEnglish
                    ? "Before upload, the app binds photos and their job to the canonical server origin and stores them locally."
                    : "Vor dem Upload werden Fotos und Auftrag an den kanonischen Server-Ursprung gebunden und lokal gesichert.",
                },
                {
                  icon: ShieldCheck,
                  title: isEnglish ? "Idempotent steps" : "Idempotente Schritte",
                  copy: isEnglish
                    ? "Creation, media upload, analysis, and cover generation use stable keys, so a retry does not create duplicates."
                    : "Create, Medien, Analyse und Cover besitzen stabile Schlüssel – Wiederholen heißt nicht duplizieren.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="flex gap-5 rounded-[24px] bg-background p-6 sm:p-7">
                  <span className="grid size-14 shrink-0 place-items-center rounded-[20px] bg-success-soft text-success">
                    <Icon className="size-7" strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[38px] border border-brand-border bg-[radial-gradient(circle_at_50%_0%,var(--color-brand-soft),var(--color-background)_64%)] px-6 py-14 text-center sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute -left-20 top-10 size-64 rounded-full bg-brand/10 blur-[90px]" />
              <div className="relative flex flex-col items-center">
                <Image
                  src="/marketing/ios-app-icon-current.png"
                  alt=""
                  width={132}
                  height={132}
                  className="size-[112px] rounded-[27px] shadow-[0_24px_60px_rgba(80,71,217,0.25)] sm:size-[132px] sm:rounded-[31px]"
                />
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {isEnglish ? "Open Inventory for iPhone" : "Open Inventory für iPhone"}
                </p>
                <h2 className="mt-4 max-w-[820px] text-[40px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[60px]">
                  {isEnglish ? "Take a photo. Finish the record." : "Foto aufnehmen. Eintrag fertig."}
                </h2>
                <p className="mt-6 max-w-2xl text-[16px] leading-7 text-muted sm:text-[17px]">
                  {isEnglish
                    ? "Capture objects where they are used. Open Inventory turns photos, codes, stock movements, and optional spatial data into one shared inventory."
                    : "Erfasse Dinge dort, wo sie genutzt werden. Open Inventory verbindet Fotos, Codes, Bestandsbewegungen und optionale Raumdaten zu einem gemeinsamen Inventar."}
                </p>

                <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-brand-border bg-background/80 px-5 py-3 text-sm font-semibold shadow-sm backdrop-blur">
                  <Smartphone className="size-5 text-brand" strokeWidth={1.7} aria-hidden="true" />
                  {isEnglish
                    ? "Native app · iOS 17+ · your server URL"
                    : "Native App · iOS 17+ · deine Server-URL"}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#app-workflows"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand transition hover:-translate-y-0.5 hover:bg-brand-hover"
                  >
                    <Smartphone className="size-5" aria-hidden="true" />
                    {isEnglish ? "Explore the app" : "App kennenlernen"}
                  </Link>
                  <Link
                    href="#getting-started"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold transition hover:bg-surface-muted"
                  >
                    {isEnglish ? "See how to get started" : "So startest du"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
