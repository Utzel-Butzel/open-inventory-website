import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FeatureDetailContent,
  getEnglishFeatureCopy,
} from "@/components/marketing/english-feature-pages";
import {
  marketingHref,
  marketingOgLocale,
  marketingPathAlternates,
} from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

import {
  featureGroups,
  getFeatureGroup,
} from "../features";

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featureGroups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([
    params,
    getMarketingLocale(),
  ]);
  const group = getFeatureGroup(slug);

  if (!group) return {};

  const englishCopy = locale === "en" ? getEnglishFeatureCopy(slug) : undefined;
  const title = englishCopy?.menuTitle ?? group.menuTitle;
  const description = englishCopy?.description ?? group.description;
  const imageAlt = englishCopy?.screenshot.alt ?? group.screenshot.alt;

  return {
    title: { absolute: `${title} — Open Inventory` },
    description,
    alternates: marketingPathAlternates(
      locale,
      `/features/${group.slug}`,
    ),
    openGraph: {
      title: `${title} — Open Inventory`,
      description,
      url: marketingHref(locale, `/features/${group.slug}`),
      images: [
        {
          url: group.screenshot.src,
          width: 1440,
          height: 960,
          alt: imageAlt,
        },
      ],
      ...marketingOgLocale(locale),
    },
  };
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const [{ slug }, locale] = await Promise.all([params, getMarketingLocale()]);
  const group = getFeatureGroup(slug);
  if (!group || (locale === "en" && !getEnglishFeatureCopy(slug))) notFound();
  return <FeatureDetailContent locale={locale} group={group} />;
}
