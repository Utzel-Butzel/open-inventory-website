import { Download } from "lucide-react";

import type { MarketingLocale } from "@/lib/marketing-i18n";

const androidApkUrl = "https://github.com/Utzel-Butzel/inventory/releases/download/android-preview-2026-10-31/open-inventory-android-preview.apk";

export function AppDownloads({ locale, dark = false }: { locale: MarketingLocale; dark?: boolean }) {
  const de = locale === "de";
  const muted = dark ? "text-white/65" : "text-muted";

  return (
    <div className="mt-7" aria-label={de ? "Apps herunterladen" : "Download apps"}>
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled className="inline-flex min-h-14 min-w-[190px] cursor-not-allowed items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2.5 text-left text-white" aria-label={`App Store – ${de ? "demnächst verfügbar" : "coming soon"}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-7 shrink-0" aria-hidden="true">
            <path d="M17.05 12.54c.03 3.04 2.67 4.05 2.7 4.06-.02.07-.42 1.45-1.39 2.88-.84 1.24-1.72 2.48-3.1 2.5-1.36.03-1.8-.81-3.36-.81-1.55 0-2.04.79-3.33.84-1.33.05-2.35-1.34-3.2-2.57-1.74-2.52-3.07-7.12-1.28-10.23.89-1.54 2.47-2.52 4.19-2.55 1.3-.02 2.54.89 3.35.89.8 0 2.31-1.1 3.89-.94.66.03 2.52.27 3.72 2.03-.1.06-2.22 1.29-2.19 3.9ZM14.49 5c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-2.99 1.54-.66.76-1.24 1.97-1.09 3.13 1.14.09 2.3-.58 3.02-1.42Z" />
          </svg>
          <span><span className="block text-[10px] leading-4">{de ? "Laden im" : "Download on the"}</span><span className="block text-xl font-semibold leading-6">App Store</span></span>
        </button>
        <button type="button" disabled className="inline-flex min-h-14 min-w-[190px] cursor-not-allowed items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2.5 text-left text-white" aria-label={`Google Play – ${de ? "demnächst verfügbar" : "coming soon"}`}>
          <svg viewBox="0 0 24 26" className="h-7 w-7 shrink-0" aria-hidden="true">
            <path fill="#4285F4" d="M1 1 13 13 1 25Z" />
            <path fill="#34A853" d="M1 1 17 10 13 13Z" />
            <path fill="#FBBC04" d="m17 10 6 3-6 3-4-3Z" />
            <path fill="#EA4335" d="m1 25 12-12 4 3Z" />
          </svg>
          <span><span className="block text-[10px] leading-4">{de ? "Jetzt bei" : "Get it on"}</span><span className="block text-xl font-semibold leading-6">Google Play</span></span>
        </button>
      </div>
      <p className={`mt-2 text-xs leading-5 ${muted}`}>{de ? "Demnächst im App Store und bei Google Play." : "Coming soon to the App Store and Google Play."}</p>
      <a href={androidApkUrl} className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "text-brand-inverse" : "text-brand"}`}>
        <Download className="size-4 shrink-0" aria-hidden="true" />
        {de ? "Android-APK herunterladen" : "Download Android APK"}
      </a>
      <p className={`mt-1 max-w-md text-xs leading-5 ${muted}`}>
        {de ? "Vorabversion · Android 8.0+ · Eigene Open-Inventory-Instanz erforderlich. Für die Installation den APK-Download öffnen und die Installation aus dieser Quelle erlauben." : "Preview · Android 8.0+ · Requires your own Open Inventory instance. Open the downloaded APK and allow installation from this source."}
      </p>
    </div>
  );
}
