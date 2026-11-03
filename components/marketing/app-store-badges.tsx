import Image from "next/image";

import type { MarketingLocale } from "@/lib/marketing-i18n";
import { appStoreUrl } from "@/lib/site-config";

export function AppStoreBadges({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  return (
    <div className="mt-7 flex flex-wrap items-center gap-4" aria-label={de ? "Apps herunterladen" : "Download apps"}>
      <a href={appStoreUrl} className="shrink-0" aria-label={de ? "Laden im App Store" : "Download on the App Store"}>
        <Image
          src={`/marketing/store-badges/app-store-${locale}.svg`}
          alt={de ? "Laden im App Store" : "Download on the App Store"}
          width={120}
          height={40}
          className="h-14 w-auto"
          unoptimized
        />
      </a>
      <button type="button" disabled className="shrink-0 cursor-not-allowed border-0 bg-transparent p-0" aria-label={`Google Play – ${de ? "demnächst verfügbar" : "coming soon"}`}>
        <Image
          src={`/marketing/store-badges/google-play-${locale}.svg`}
          alt={de ? "Jetzt bei Google Play" : "Get it on Google Play"}
          width={239}
          height={71}
          className="h-14 w-auto"
          unoptimized
        />
      </button>
    </div>
  );
}
