import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Barcode,
  Box,
  Camera,
  Check,
  ChevronRight,
  CircleDot,
  CloudUpload,
  Code2,
  Github,
  Hammer,
  KeyRound,
  Map,
  MapPin,
  PackagePlus,
  QrCode,
  RefreshCw,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Warehouse,
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

const githubUrl = "https://github.com/Utzel-Butzel/inventory";
const iosSourceUrl = `${githubUrl}/tree/main/ios/Inventory`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const title = locale === "de" ? "Native iOS-App — Open Inventory" : "Native iOS app — Open Inventory";
  const description = locale === "de"
    ? "Mit der nativen, offenen SwiftUI-App Inventar in Sekunden erfassen, QR- und Barcodes scannen und Bestände direkt am Regal buchen."
    : "Capture inventory with the native open-source SwiftUI app, scan QR codes and barcodes, and book stock movements at the shelf.";
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
    copy: "Suche, filtere, öffne und bearbeite Einträge mit authentifizierten Bildern. Karte, Details und Einstellungen sind nativ in SwiftUI umgesetzt.",
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
    copy: "Search, filter, open, and edit items with authenticated images. The map, details, and settings are implemented natively in SwiftUI.",
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

function InventoryRow({
  icon: Icon,
  name,
  meta,
  amount,
  tone,
}: {
  icon: LucideIcon;
  name: string;
  meta: string;
  amount: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#d9d9de] px-4 py-3.5 last:border-0">
      <span className={`grid size-11 shrink-0 place-items-center rounded-[12px] ${tone}`}>
        <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-[#16171a]">
          {name}
        </p>
        <p className="mt-0.5 truncate text-[9px] text-[#74777e]">{meta}</p>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <span className="rounded-full bg-[#e8f7f0] px-2 py-1 text-[8px] font-bold text-[#11734d]">
          {amount}
        </span>
        <ChevronRight className="size-3.5 text-[#b2b4ba]" aria-hidden="true" />
      </div>
    </div>
  );
}

function IPhoneMockup({ locale }: { locale: "de" | "en" }) {
  const isEnglish = locale === "en";

  return (
    <figure className="mx-auto w-full max-w-[370px]">
      <div className="relative rounded-[58px] border-[7px] border-[#2c2d31] bg-black p-[5px] shadow-[0_45px_100px_rgba(0,0,0,0.38),inset_0_0_0_1px_rgba(255,255,255,0.18)]">
        <div className="absolute -left-[10px] top-32 h-20 w-[3px] rounded-l bg-[#424349]" />
        <div className="absolute -right-[10px] top-40 h-24 w-[3px] rounded-r bg-[#424349]" />
        <div className="relative min-h-[720px] overflow-hidden rounded-[46px] bg-[#f2f2f7] text-[#16171a]">
          <div className="absolute left-1/2 top-3 z-20 h-[27px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

          <div className="flex h-12 items-end justify-between px-7 pb-1.5 text-[9px] font-bold">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <span className="flex h-2.5 items-end gap-px">
                {[4, 6, 8, 10].map((height) => (
                  <span key={height} className="w-[2px] rounded-sm bg-[#16171a]" style={{ height }} />
                ))}
              </span>
              <span className="h-2.5 w-4 rounded-[3px] border border-[#16171a] p-px">
                <span className="block h-full w-[85%] rounded-[1px] bg-[#16171a]" />
              </span>
            </div>
          </div>

          <div className="px-4 pb-2 pt-2">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold text-[#6d45d8]">
                  {isEnglish ? "Workshop" : "Werkstatt"}
                </p>
                <h2 className="mt-0.5 text-[27px] font-bold tracking-[-0.05em]">
                  {isEnglish ? "Inventory" : "Inventar"}
                </h2>
              </div>
              <div className="flex gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#6d45d8] shadow-sm">
                  <Camera className="size-[17px]" aria-hidden="true" />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-[#6d45d8] text-white shadow-sm">
                  <QrCode className="size-[17px]" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="mt-4 flex h-9 items-center gap-2 rounded-[11px] bg-[#e3e3e8] px-3 text-[10px] text-[#7a7d84]">
              <Search className="size-3.5" aria-hidden="true" />
              {isEnglish ? "Name, SKU, tag, or location" : "Name, SKU, Tag oder Ort"}
            </div>

            <div className="mt-3 flex gap-2 overflow-hidden text-[9px] font-semibold">
              <span className="rounded-full bg-[#6d45d8] px-3 py-1.5 text-white">
                {isEnglish ? "All 248" : "Alle 248"}
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 text-[#54575d]">
                {isEnglish ? "Tools" : "Werkzeuge"}
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 text-[#54575d]">
                {isEnglish ? "On loan" : "Verliehen"}
              </span>
            </div>
          </div>

          <div className="mx-3 mt-2 overflow-hidden rounded-[17px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <InventoryRow
              icon={Hammer}
              name={isEnglish ? "18 V cordless drill" : "Akku-Bohrschrauber 18 V"}
              meta={isEnglish ? "Shelf B · TOOL-0042" : "Regal B · WERK-0042"}
              amount={isEnglish ? "6 pcs" : "6 Stk."}
              tone="bg-[#fff2e2] text-[#9b5300]"
            />
            <InventoryRow
              icon={Box}
              name={isEnglish ? "Parts organizer M4–M8" : "Sortimentskasten M4–M8"}
              meta={isEnglish ? "Workbench · BOX-0018" : "Werkbank · BOX-0018"}
              amount={isEnglish ? "1 pc" : "1 Stk."}
              tone="bg-[#eeedff] text-[#5147d9]"
            />
            <InventoryRow
              icon={Warehouse}
              name={isEnglish ? "25 m cable reel" : "Kabeltrommel 25 m"}
              meta={isEnglish ? "North storage · ELEC-0061" : "Lager Nord · ELEK-0061"}
              amount={isEnglish ? "4 pcs" : "4 Stk."}
              tone="bg-[#eaf4ff] text-[#2670b8]"
            />
            <InventoryRow
              icon={MapPin}
              name={isEnglish ? "Label printer" : "Etikettendrucker"}
              meta={isEnglish ? "Office · DEV-0023" : "Büro · SER-0023"}
              amount={isEnglish ? "1 pc" : "1 Stk."}
              tone="bg-[#e8f7f0] text-[#11734d]"
            />
          </div>

          <div className="mx-3 mt-3 flex items-center gap-3 rounded-[15px] bg-[#17181d] p-3 text-white">
            <span className="grid size-9 place-items-center rounded-[11px] bg-[#2d294b] text-[#a9a2ff]">
              <CloudUpload className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold">
                {isEnglish ? "Uploading 3 jobs" : "3 Aufträge werden übertragen"}
              </p>
              <p className="mt-0.5 text-[8px] text-white/48">
                {isEnglish
                  ? "Persisted locally · resumes automatically"
                  : "Absturzsicher · automatisch fortsetzen"}
              </p>
            </div>
            <CircleDot className="ml-auto size-3.5 text-[#8ff0cc]" aria-hidden="true" />
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-[#d6d6dc] bg-white/95 px-5 pb-5 pt-2 backdrop-blur">
            <div className="grid grid-cols-4 gap-2 text-center text-[8px] font-semibold text-[#7b7d84]">
              {[
                [Box, isEnglish ? "Inventory" : "Inventar", true],
                [Map, isEnglish ? "Map" : "Karte", false],
                [ScanLine, isEnglish ? "Rooms" : "Räume", false],
                [ShieldCheck, isEnglish ? "Settings" : "Einstellungen", false],
              ].map(([Icon, label, active]) => {
                const TabIcon = Icon as LucideIcon;
                return (
                  <span key={label as string} className={active ? "text-[#6d45d8]" : undefined}>
                    <TabIcon className="mx-auto mb-1 size-[18px]" aria-hidden="true" />
                    {label as string}
                  </span>
                );
              })}
            </div>
            <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-[#17181d]" />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-[10px] text-white/45">
        {isEnglish
          ? "Illustrative app view with mock data"
          : "Illustrative App-Ansicht mit Mockdaten"}
      </figcaption>
    </figure>
  );
}

export default async function IOSPage() {
  const locale = await getMarketingLocale();
  const isEnglish = locale === "en";

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
              <div className="flex items-center gap-4">
                <Image
                  src="/marketing/ios-app-icon-current.png"
                  alt={
                    isEnglish
                      ? "Open Inventory app icon for iOS"
                      : "App-Icon von Open Inventory für iOS"
                  }
                  width={76}
                  height={76}
                  priority
                  className="size-[76px] rounded-[18px] shadow-[0_14px_38px_rgba(0,0,0,0.34)] ring-1 ring-white/15"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                    {isEnglish ? "Native SwiftUI app" : "Native SwiftUI-App"}
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    {isEnglish ? "Open source · iOS 17+" : "Open Source · iOS 17+"}
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
                  ? "Take photos, scan labels, and record stock where the objects actually are. The native iPhone app connects to your own Open Inventory instance; per-item input is designed to take seconds while uploads and optional analysis continue in the background."
                  : "Fotografiere, scanne und buche direkt dort, wo die Dinge sind. Die native iPhone-App verbindet sich mit deiner eigenen Open-Inventory-Instanz – schnell genug für Sekunden statt Stunden."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={iosSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-sm font-semibold text-[#17181d] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  <Github className="size-[17px]" aria-hidden="true" />
                  {isEnglish ? "Open the iOS source" : "iOS-Quellcode öffnen"}
                </a>
                <Link
                  href="#installation"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/15 bg-white/[0.06] px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {isEnglish ? "Install with Xcode" : "Installation mit Xcode"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-white/50">
                {(isEnglish
                  ? ["MIT licensed", "No App Store download", "Your server URL"]
                  : ["MIT-lizenziert", "Kein App-Store-Download", "Deine Server-URL"]
                ).map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="size-3 text-[#8ff0cc]" strokeWidth={2.6} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <IPhoneMockup locale={locale} />
          </div>
        </section>

        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Smartphone,
                  title: isEnglish ? "Actually native" : "Echt nativ",
                  copy: isEnglish
                    ? "SwiftUI and AVFoundation instead of an embedded web interface."
                    : "SwiftUI und AVFoundation statt eingebetteter Web-Oberfläche.",
                },
                {
                  icon: Github,
                  title: isEnglish ? "Fully open source" : "Echt offen",
                  copy: isEnglish
                    ? "The complete app source is MIT licensed and lives in the same repository as the server."
                    : "Der gesamte App-Code liegt MIT-lizenziert im selben Repository.",
                },
                {
                  icon: RefreshCw,
                  title: isEnglish ? "Built for bad reception" : "Für echte Funklöcher",
                  copy: isEnglish
                    ? "Persistent jobs and safe retries resume interrupted uploads."
                    : "Persistente Aufträge und sichere Wiederholungen setzen Uploads fort.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-[22px] border border-border bg-background p-6">
                  <Icon className="size-5 text-brand" aria-hidden="true" />
                  <h2 className="mt-5 text-lg font-semibold tracking-[-0.03em]">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
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
                  ? "The open-source iOS features use the same API and stock rules as the web app."
                  : "Die offenen iOS-Funktionen nutzen dieselbe API und dieselben Bestandsregeln wie die Web-App."}
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(isEnglish ? everydayFeaturesEn : everydayFeatures).map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="mt-10 text-xl font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
                  <article key={title as string} className="rounded-[20px] border border-white/10 bg-white/[0.045] p-5">
                    <FeatureIcon className="size-5 text-[#9188ff]" aria-hidden="true" />
                    <h3 className="mt-5 text-[16px] font-semibold">{title as string}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-white/48">{copy as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="installation" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                {isEnglish ? "Installation" : "Installation"}
              </p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[52px]">
                {isEnglish
                  ? "Use Xcode for now, not the App Store."
                  : "Heute per Xcode, nicht per App Store."}
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-muted">
                {isEnglish
                  ? "There is no App Store download yet. Build the open-source app from the repository and sign it for your iPhone with your Apple development team."
                  : "Es gibt derzeit keinen App-Store-Download. Die Open-Source-App wird aus dem Repository gebaut und mit deinem Apple-Entwicklerteam auf dem iPhone signiert."}
              </p>
              <div className="mt-7 rounded-2xl border border-warning-border bg-warning-soft p-4 text-sm leading-6 text-warning">
                {isEnglish
                  ? "Requirements: Xcode 26 or newer and an iPhone running iOS 17 or newer. Test camera and scanner behavior on a physical device; LiDAR is only required for the room features."
                  : "Benötigt: Xcode 26 oder neuer und ein iPhone mit iOS 17 oder neuer. Kamera- und Scanner-Abnahme erfolgt auf einem physischen Gerät; LiDAR ist nur für die Raumfunktionen nötig."}
              </div>
            </div>

            <ol className="space-y-3">
              {(isEnglish
                ? [
                    ["01", "Run the server", "Start a reachable Open Inventory instance and apply all database migrations."],
                    ["02", "Open the project in Xcode", "Clone the open-source repository and open ios/Inventory/Inventory.xcodeproj with Xcode 26+."],
                    ["03", "Sign and run", "Select the Inventory target, your Apple development team, and a physical iPhone running iOS 17+."],
                    ["04", "Connect your instance", "Enter the HTTPS base URL and sign in with a local account. A manually entered API token remains available as an advanced option."],
                  ]
                : [
                    ["01", "Server bereitstellen", "Starte eine erreichbare Open-Inventory-Instanz und führe alle Datenbankmigrationen aus."],
                    ["02", "Projekt in Xcode öffnen", "Klone das offene Repository und öffne ios/Inventory/Inventory.xcodeproj mit Xcode 26+."],
                    ["03", "Signieren & starten", "Wähle das Target Inventory, dein Apple-Entwicklerteam und ein physisches iPhone mit iOS 17+."],
                    ["04", "Mit deiner Instanz verbinden", "Trage die HTTPS-Basis-URL ein und melde dich mit einem lokalen Konto an; ein manueller API-Token bleibt die Expertenoption."],
                  ]
              ).map(([number, title, copy]) => (
                <li key={number} className="grid gap-4 rounded-[20px] border border-border bg-surface p-5 sm:grid-cols-[48px_1fr] sm:p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft font-mono text-[10px] font-semibold text-brand">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.025em]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                  </div>
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
                <article key={title} className="rounded-[22px] bg-background p-6">
                  <Icon className="size-5 text-success" aria-hidden="true" />
                  <h3 className="mt-5 text-[17px] font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto flex max-w-[920px] flex-col items-center px-5 text-center sm:px-8">
            <Image
              src="/marketing/ios-app-icon-current.png"
              alt=""
              width={88}
              height={88}
              className="size-[88px] rounded-[21px] shadow-[0_18px_45px_rgba(80,71,217,0.22)]"
            />
            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              {isEnglish ? "Open source on your Home Screen" : "Open Source auf dem Homescreen"}
            </p>
            <h2 className="mt-4 text-[40px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[56px]">
              {isEnglish
                ? "Build the app. Connect your server. Start scanning."
                : "Baue die App. Verbinde deinen Server. Fang an zu scannen."}
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={iosSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand transition hover:-translate-y-0.5 hover:bg-brand-hover"
              >
                <Code2 className="size-4" aria-hidden="true" />
                {isEnglish ? "View the SwiftUI source" : "SwiftUI-Code ansehen"}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <Link
                href={isEnglish ? "/docs" : "/de/docs"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold transition hover:bg-surface-muted"
              >
                {isEnglish ? "Server documentation" : "Server-Dokumentation"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
