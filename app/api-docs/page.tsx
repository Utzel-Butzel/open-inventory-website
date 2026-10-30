import { permanentRedirect } from "next/navigation";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { technicalDocsHref } from "@/lib/marketing-i18n";

export default async function Page() {
  permanentRedirect(technicalDocsHref(await getMarketingLocale(), "api-reference"));
}
