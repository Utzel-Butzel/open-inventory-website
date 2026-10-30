import { permanentRedirect } from "next/navigation";
import { technicalDocsHref } from "@/lib/marketing-i18n";

export default function ApiDocsPage() {
  permanentRedirect(technicalDocsHref("api-reference"));
}
