import type { Metadata } from "next";
import { FeatureOverviewPage } from "@/components/marketing/english-feature-pages";
import {
  marketingHref,
  marketingOgLocale,
  marketingPathAlternates,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const copy = locale === "en"
    ? {
        title: "Inventory features — Open Inventory",
        description:
          "Explore photo capture, inventory records, stock, lending, QR labels and self-hosting in Open Inventory.",
        openGraphDescription:
          "How Open Inventory implements capture, stock, labels, spatial data, operations and its native iOS client.",
      }
    : {
        title: "Alle Funktionen — Open Inventory",
        description:
          "Von Fotoerfassung, Varianten und Lagerbewegungen über Einkauf, Verkauf, Ausleihe und WooCommerce bis zur offenen API: alle Funktionen verständlich erklärt.",
        openGraphDescription:
          "Gegenstände erfassen, Standorte finden und Bestände und Ausleihen verfolgen – mit Web-App, iOS-App und offener API.",
      };

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: marketingPathAlternates(locale, "/features"),
    openGraph: {
      title: copy.title,
      description: copy.openGraphDescription,
      url: marketingHref(locale, "/features"),
      images: ["/og.png"],
      ...marketingOgLocale(locale),
    },
  };
}

export default async function FeaturesPage() {
  const locale = await getMarketingLocale();
  return <FeatureOverviewPage locale={locale} />;
}
