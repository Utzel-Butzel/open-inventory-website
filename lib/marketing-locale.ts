import { headers } from "next/headers";

import { UI_LANGUAGE_HEADER } from "@/i18n.config";
import type { MarketingLocale } from "@/lib/marketing-i18n";

export async function getMarketingLocale(): Promise<MarketingLocale> {
  const requestHeaders = await headers();
  return requestHeaders.get(UI_LANGUAGE_HEADER) === "en" ? "en" : "de";
}
