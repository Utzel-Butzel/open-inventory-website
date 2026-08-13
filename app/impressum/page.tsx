import type { Metadata } from "next";

import {
  EnglishMarketingPage,
  GermanTechnicalPage,
} from "@/components/marketing/marketing-locale-page";
import {
  marketingPathAlternates,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  return {
    title: { absolute: locale === "de" ? "Impressum — Open Inventory" : "Legal notice — Open Inventory" },
    alternates: marketingPathAlternates(locale, "/impressum"),
    robots: { index: false, follow: true },
  };
}

export default async function ImpressumPage() {
  const locale = await getMarketingLocale();
  return locale === "de"
    ? <GermanTechnicalPage kind="imprint" />
    : <EnglishMarketingPage kind="imprint" />;
}
