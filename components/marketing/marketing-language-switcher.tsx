"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import type { MarketingLocale } from "@/lib/marketing-i18n";

function localizedPath(pathname: string, locale: MarketingLocale) {
  const pathWithoutEnglishPrefix = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return locale === "en"
    ? pathWithoutEnglishPrefix === "/"
      ? "/en"
      : `/en${pathWithoutEnglishPrefix}`
    : pathWithoutEnglishPrefix;
}

export function MarketingDocumentLanguage({
  locale,
}: {
  locale: MarketingLocale;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

export function MarketingLanguageSwitcher({
  locale,
  inverse = false,
}: {
  locale: MarketingLocale;
  inverse?: boolean;
}) {
  const pathname = usePathname();
  const label = locale === "de" ? "Sprache wählen" : "Choose language";

  return (
    <div
      className={`inline-flex h-10 items-center gap-0.5 rounded-xl border p-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
        inverse
          ? "border-white/15 bg-white/[0.06] text-white/60"
          : "border-border bg-surface text-muted"
      }`}
      aria-label={label}
    >
      <Languages className="ml-1.5 mr-1 size-3.5" aria-hidden="true" />
      {(["de", "en"] as const).map((item) => (
        <a
          key={item}
          href={localizedPath(pathname, item)}
          hrefLang={item}
          lang={item}
          aria-current={locale === item ? "page" : undefined}
          className={`grid h-7 min-w-8 place-items-center rounded-lg px-1.5 transition ${
            locale === item
              ? inverse
                ? "bg-white text-[#111216]"
                : "bg-strong text-on-strong"
              : inverse
                ? "hover:bg-white/10 hover:text-white"
                : "hover:bg-surface-muted hover:text-foreground"
          }`}
        >
          {item}
        </a>
      ))}
    </div>
  );
}
