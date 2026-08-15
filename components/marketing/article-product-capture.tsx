import Image from "next/image";

type Locale = "de" | "en";

type LocalizedText = Record<Locale, string>;

type ArticleCapture = {
  src: string;
  width: number;
  height: number;
  mobile?: boolean;
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
};

const articleCaptures: Record<string, ArticleCapture> = {
  "serienerfassung-in-sekunden": {
    src: "/marketing/screenshots/web-batch.png",
    width: 1440,
    height: 960,
    title: {
      de: "Serienerfassung in der laufenden Web-App",
      en: "Batch capture in the running web app",
    },
    description: {
      de: "Echte Aufnahme der Fotoablage mit eigens angelegten Demo-Inhalten und einem realen Objektfoto.",
      en: "Actual capture of the photo tray with purpose-built demo content and a real object photograph.",
    },
    alt: {
      de: "Echte Open-Inventory-Webansicht der Serienerfassung mit Fotoablage und Demo-Daten",
      en: "Actual Open Inventory batch-capture screen with a photo tray and demo data",
    },
  },
  "mengenbestand-oder-serialisiert": {
    src: "/marketing/screenshots/web-stock.png",
    width: 1440,
    height: 960,
    title: {
      de: "Bestand, Buchungen und Historie",
      en: "Stock, bookings, and movement history",
    },
    description: {
      de: "Echte Aufnahme der Bestandsverwaltung mit bewusst erzeugten Zu- und Abgängen in der Demo-Instanz.",
      en: "Actual capture of stock management with deliberately created incoming and outgoing movements in the demo instance.",
    },
    alt: {
      de: "Echte Open-Inventory-Bestandsansicht mit Buchungen und Demo-Daten",
      en: "Actual Open Inventory stock screen with movements and demo data",
    },
  },
  "qr-etiketten-im-makerspace": {
    src: "/marketing/screenshots/web-label-designer.png",
    width: 1440,
    height: 960,
    title: {
      de: "QR und Code 128 im echten Labeldesigner",
      en: "QR and Code 128 in the actual label designer",
    },
    description: {
      de: "Direkte Aufnahme des visuellen Editors mit einem ausgewählten Demo-Datensatz und druckbarer Vorschau.",
      en: "Direct capture of the visual editor with a selected demo record and printable preview.",
    },
    alt: {
      de: "Echter Open-Inventory-Labeldesigner mit QR-Code, Barcode und Demo-Datensatz",
      en: "Actual Open Inventory label designer with a QR code, barcode, and demo record",
    },
  },
  "warum-inventar-selbst-hosten": {
    src: "/marketing/screenshots/web-api-tokens.png",
    width: 1440,
    height: 960,
    title: {
      de: "API-Zugriff in der selbst gehosteten Instanz",
      en: "API access in the self-hosted instance",
    },
    description: {
      de: "Echte Aufnahme der Token-Verwaltung. Sichtbare Werte gehören ausschließlich zur lokalen Demo-Instanz.",
      en: "Actual capture of token management. Any visible values belong exclusively to the local demo instance.",
    },
    alt: {
      de: "Echte Open-Inventory-Ansicht zur Verwaltung von API-Token in einer lokalen Demo-Instanz",
      en: "Actual Open Inventory API-token management screen in a local demo instance",
    },
  },
  "iphone-lidar-inventarisierung": {
    src: "/marketing/screenshots/ios-map.png",
    width: 1206,
    height: 2622,
    mobile: true,
    title: {
      de: "Karte in der nativen SwiftUI-App",
      en: "Map in the native SwiftUI app",
    },
    description: {
      de: "Direkte Simulatoraufnahme der echten iOS-App mit absichtlich angelegten Orten und Demo-Inhalten.",
      en: "Direct Simulator capture of the actual iOS app with deliberately created locations and demo content.",
    },
    alt: {
      de: "Echte Aufnahme der nativen Open-Inventory-iOS-App mit Kartenansicht und Demo-Orten",
      en: "Actual capture of the native Open Inventory iOS app showing the map and demo locations",
    },
  },
};

export function ArticleProductCapture({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const capture = articleCaptures[slug];
  if (!capture) return null;

  const isEnglish = locale === "en";

  return (
    <figure className="mt-10 overflow-hidden rounded-[24px] border border-border bg-surface shadow-sm sm:mt-12">
      <div className="flex flex-col gap-3 border-b border-border bg-[#17181d] px-5 py-5 text-white sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8ff0cc]">
            {isEnglish ? "Actual app capture" : "Echte App-Aufnahme"}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-[-0.025em]">
            {capture.title[locale]}
          </p>
        </div>
        <span className="shrink-0 text-[10px] text-white/45">
          {isEnglish ? "Purpose-built demo data" : "Eigens angelegte Demo-Daten"}
        </span>
      </div>
      <div
        className={`bg-[linear-gradient(to_right,rgba(102,92,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(102,92,255,0.055)_1px,transparent_1px)] bg-[size:32px_32px] ${capture.mobile ? "px-12 py-8 sm:px-24 sm:py-12" : "p-2.5 sm:p-4"}`}
      >
        <div
          className={capture.mobile
            ? "mx-auto max-w-[286px] overflow-hidden rounded-[48px] border-[7px] border-[#101114] bg-[#101114] p-[3px] shadow-[0_24px_60px_rgba(18,20,28,0.28)]"
            : "overflow-hidden rounded-[14px] border border-border bg-surface"}
        >
          <Image
            src={capture.src}
            width={capture.width}
            height={capture.height}
            sizes={capture.mobile ? "286px" : "(max-width: 760px) 100vw, 728px"}
            alt={capture.alt[locale]}
            className={capture.mobile ? "h-auto w-full rounded-[36px]" : "h-auto w-full"}
          />
        </div>
      </div>
      <figcaption className="border-t border-border px-5 py-4 text-xs leading-5 text-muted sm:px-6">
        {capture.description[locale]}
      </figcaption>
    </figure>
  );
}
