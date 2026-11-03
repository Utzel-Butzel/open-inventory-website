"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import type { MarketingLocale } from "@/lib/marketing-i18n";

function localizedPath(pathname: string, locale: MarketingLocale) {
  const pathWithoutLocalePrefix = pathname.replace(/^\/(?:de|en)(?=\/|$)/, "") || "/";
  return locale === "de"
    ? pathWithoutLocalePrefix === "/"
      ? "/de"
      : `/de${pathWithoutLocalePrefix}`
    : pathWithoutLocalePrefix;
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
      className={`site-control inline-flex items-center gap-0.5 rounded-md text-[11px] font-medium uppercase tracking-[0.04em] ${
        inverse
          ? "text-white/70"
          : "text-muted"
      }`}
      role="group"
      aria-label={label}
    >
      {(["de", "en"] as const).map((item) => (
        <a
          key={item}
          href={localizedPath(pathname, item)}
          hrefLang={item}
          aria-label={item === "de" ? "Deutsch" : "English"}
          title={item === "de" ? "Deutsch" : "English"}
          lang={item}
          aria-current={locale === item ? "page" : undefined}
          className={`grid h-full min-w-8 place-items-center rounded px-1.5 transition-colors ${
            locale === item
              ? inverse
                ? "bg-white text-[#111216]"
                : "bg-surface-muted text-foreground"
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
