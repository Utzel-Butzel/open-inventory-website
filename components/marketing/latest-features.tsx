import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  CircleDollarSign,
  GitBranch,
  Heart,
  ShoppingBag,
  Store,
} from "lucide-react";

import {
  marketingHref,
  type MarketingLocale,
} from "@/lib/marketing-i18n";

const copy = {
  de: {
    eyebrow: "Neu hinzugekommen",
    title: "Vom einzelnen Ding zum vollständigen Vorgang.",
    description:
      "Open Inventory bildet jetzt auch die Abläufe rund um deinen Bestand ab: planen, bestellen, verkaufen, ausleihen, reservieren und mit externen Shops abgleichen.",
    screenshotAlt:
      "Einkaufsübersicht in Open Inventory mit offenen Bestellungen, erwarteten Mengen und Wareneingängen",
    screenshotLabel: "Echte Web-App · Demo-Daten",
    screenshotTitle: "Einkäufe, Verkäufe und Ausleihen",
    screenshotCopy:
      "Mehrteilige Vorgänge bündeln Kontakte, Positionen, Termine und Bestandsbuchungen in einer gemeinsamen Historie.",
    flow: ["Anfragen", "Reservieren", "Ausgeben", "Zurücknehmen"],
    linkLabel: "Mehr erfahren",
    items: [
      {
        title: "Vorgänge an einem Ort",
        copy: "Einkäufe, Verkäufe und mehrteilige Ausleihen mit Teilmengen, Seriennummern, Kontakten und Fälligkeiten verwalten.",
        href: "/features/bestand-ausleihe",
        icon: ShoppingBag,
      },
      {
        title: "Anfragen & Kalender",
        copy: "Bedarf im Team einreichen, genehmigen, reservieren und erfüllen. Der Kalender zeigt kommende Belegungen vor der Zusage.",
        href: "/features/bestand-ausleihe",
        icon: CalendarRange,
      },
      {
        title: "WooCommerce-Sync",
        copy: "Bestellungen über exakte SKUs mit Mengenbestand abgleichen – inklusive Webhooks, Rückerstattungen und gezielten Wiederholungen.",
        href: "/features/labels-api",
        icon: Store,
      },
      {
        title: "Varianten & Optionen",
        copy: "Bestehende Einträge zu Variantenfamilien verbinden oder Konfigurationen aus Optionen erzeugen – mit eigenem Bestand je Variante.",
        href: "/features/strukturieren",
        icon: GitBranch,
      },
      {
        title: "Kosten im Blick",
        copy: "Preise an Warenbewegungen, Materialkosten und geschätzte KI-Ausgaben mit einem monatlichen Organisationslimit verfolgen.",
        href: "/features/betrieb-sicherheit",
        icon: CircleDollarSign,
      },
      {
        title: "Schneller wiederfinden",
        copy: "Wichtige Einträge favorisieren und ausgewählte Ansichten auf vertrauenswürdigen Geräten kontrolliert offline bereithalten.",
        href: "/features/strukturieren",
        icon: Heart,
      },
    ],
  },
  en: {
    eyebrow: "Recently added",
    title: "From an individual object to the complete operation.",
    description:
      "Open Inventory now covers the workflows around stock as well: plan, purchase, sell, lend, reserve, and reconcile with an external store.",
    screenshotAlt:
      "Open Inventory purchasing overview with open orders, expected quantities, and stock receipts",
    screenshotLabel: "Actual web app · German demo data",
    screenshotTitle: "Purchases, sales, and loans",
    screenshotCopy:
      "Multi-line operations keep contacts, items, due dates, and stock movements in one shared history.",
    flow: ["Request", "Reserve", "Issue", "Return"],
    linkLabel: "Learn more",
    items: [
      {
        title: "Operations in one place",
        copy: "Manage purchases, sales, and multi-line loans with partial quantities, serialized units, contacts, and due dates.",
        href: "/features/bestand-ausleihe",
        icon: ShoppingBag,
      },
      {
        title: "Requests and calendar",
        copy: "Submit, approve, reserve, and fulfil internal demand. The calendar exposes upcoming allocation before approval.",
        href: "/features/bestand-ausleihe",
        icon: CalendarRange,
      },
      {
        title: "WooCommerce sync",
        copy: "Reconcile orders with bulk stock by exact SKU, including webhooks, refunds, reversals, and targeted retries.",
        href: "/features/labels-api",
        icon: Store,
      },
      {
        title: "Variants and options",
        copy: "Connect existing records as a variant family or generate configurations from options, with separate stock per variant.",
        href: "/features/strukturieren",
        icon: GitBranch,
      },
      {
        title: "Costs under control",
        copy: "Track prices on stock movements, material costs, and estimated AI spend with a monthly organization limit.",
        href: "/features/betrieb-sicherheit",
        icon: CircleDollarSign,
      },
      {
        title: "Find it faster",
        copy: "Favorite important records and keep selected views available offline on trusted devices under explicit control.",
        href: "/features/strukturieren",
        icon: Heart,
      },
    ],
  },
} satisfies Record<MarketingLocale, {
  eyebrow: string;
  title: string;
  description: string;
  screenshotAlt: string;
  screenshotLabel: string;
  screenshotTitle: string;
  screenshotCopy: string;
  flow: string[];
  linkLabel: string;
  items: Array<{
    title: string;
    copy: string;
    href: string;
    icon: typeof ShoppingBag;
  }>;
}>;

export function LatestFeatures({ locale }: { locale: MarketingLocale }) {
  const content = copy[locale];
  const href = (path: string) => marketingHref(locale, path);

  return (
    <section className="overflow-hidden border-b border-white/10 bg-[#15171a] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[12px] font-semibold text-[#8ff0cc]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(2.55rem,5vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.058em]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-xl text-[16px] leading-7 text-white/68 lg:justify-self-end">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <figure className="flex min-h-full flex-col overflow-hidden border border-white/14 bg-white/[0.045]">
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 font-mono text-[9px] text-white/52">
              <span>{content.screenshotLabel}</span>
              <span>OPERATIONS / 01</span>
            </div>
            <div className="relative flex-1 overflow-hidden bg-[#f5f6f8]">
              <Image
                src="/marketing/screenshots/web-orders.png"
                alt={content.screenshotAlt}
                width={1440}
                height={960}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-full min-h-[320px] w-full object-cover object-[43%_top]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111318] via-[#111318]/92 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
                <h3 className="text-[25px] font-semibold tracking-[-0.04em]">
                  {content.screenshotTitle}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-white/64">
                  {content.screenshotCopy}
                </p>
              </div>
            </div>
            <figcaption className="grid grid-cols-4 border-t border-white/12">
              {content.flow.map((step, index) => (
                <div
                  key={step}
                  className="relative border-r border-white/12 px-3 py-4 last:border-r-0"
                >
                  <span className="font-mono text-[8px] text-[#8ff0cc]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-[11px] font-semibold text-white/82">
                    {step}
                  </p>
                  {index < content.flow.length - 1 ? (
                    <ArrowRight className="absolute -right-2 top-1/2 z-10 size-4 -translate-y-1/2 bg-[#15171a] text-white/36" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </figcaption>
          </figure>

          <div className="grid gap-px overflow-hidden border border-white/14 bg-white/14 sm:grid-cols-2">
            {content.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={href(item.href)}
                  className="group flex min-h-[220px] flex-col bg-[#15171a] p-5 transition hover:bg-white/[0.055] sm:p-6"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-white/14 bg-white/[0.055] text-[#8ff0cc]">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 text-[18px] font-semibold tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-5 text-white/56">
                    {item.copy}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-[11px] font-semibold text-[#8ff0cc]">
                    {content.linkLabel}
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
