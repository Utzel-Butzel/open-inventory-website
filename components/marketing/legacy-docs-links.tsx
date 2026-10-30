"use client";

import { useEffect } from "react";
import { legacyTechnicalDocs, technicalDocsHref, type MarketingLocale } from "@/lib/marketing-i18n";

export function LegacyDocsLinks({ locale }: { locale: MarketingLocale }) {
  useEffect(() => {
    function followLegacyLink() {
      const slug = legacyTechnicalDocs[window.location.hash.slice(1)];
      if (slug) window.location.replace(technicalDocsHref(slug));
    }
    followLegacyLink();
    window.addEventListener("hashchange", followLegacyLink);
    return () => window.removeEventListener("hashchange", followLegacyLink);
  }, [locale]);
  return null;
}
