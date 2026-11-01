import Image from "next/image";
import type { MarketingLocale } from "@/lib/marketing-i18n";

export function OpenSourceBadge({ locale, compact = false }: { locale: MarketingLocale; compact?: boolean }) {
  const de = locale === "de";
  return (
    <div className={`flex flex-wrap items-center ${compact ? "gap-3" : "gap-5"}`}>
      <a href="https://opensource.org" aria-label="Open Source Initiative" className="inline-flex shrink-0 rounded-md bg-white p-2 ring-1 ring-black/10 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
        <Image src="/marketing/opensource/osi-horizontal.png" alt="Open Source Initiative®" width={1488} height={720} sizes={compact ? "124px" : "164px"} className={`h-auto ${compact ? "w-[124px]" : "w-[164px]"}`} />
      </a>
      <div>
        <a href="https://github.com/Utzel-Butzel/inventory/blob/main/LICENSE" className="text-sm font-semibold underline decoration-border-strong underline-offset-4 hover:decoration-current">{de ? "MIT-Lizenz" : "MIT license"}</a>
        <p className="mt-1 text-xs leading-5 text-muted">{de ? "Nutzen, verändern, weitergeben." : "Use, modify and share."}</p>
      </div>
    </div>
  );
}
