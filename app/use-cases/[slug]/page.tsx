import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEnglishUseCase } from "@/components/marketing/english-use-case-pages";
import { UseCaseDetail } from "@/components/marketing/use-case-detail";
import { marketingHref, marketingOgLocale, marketingPathAlternates } from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { getUseCase, useCases } from "../use-cases";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: UseCasePageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getMarketingLocale()]);
  const useCase = locale === "en" ? getEnglishUseCase(slug) : getUseCase(slug);

  if (!useCase) {
    return { title: locale === "en" ? "Use case not found" : "Use Case nicht gefunden" };
  }

  const title = locale === "en"
    ? `Open Inventory for ${useCase.name}`
    : `Open Inventory für ${useCase.name}`;
  const path = `/use-cases/${useCase.slug}`;

  return {
    title: { absolute: title },
    description: useCase.cardCopy,
    alternates: marketingPathAlternates(locale, path),
    openGraph: {
      title,
      description: useCase.cardCopy,
      url: marketingHref(locale, path),
      images: [useCase.image ?? "/og.png"],
      ...marketingOgLocale(locale),
    },
  };
}

export default async function UseCaseDetailPage({ params }: UseCasePageProps) {
  const [{ slug }, locale] = await Promise.all([params, getMarketingLocale()]);
  const useCase = locale === "en" ? getEnglishUseCase(slug) : getUseCase(slug);
  if (!useCase) notFound();
  return <UseCaseDetail useCase={useCase} locale={locale} />;
}
