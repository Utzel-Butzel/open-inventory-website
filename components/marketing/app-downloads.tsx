import { Download } from "lucide-react";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import { appStoreUrl } from "@/lib/site-config";

const androidApkUrl = "https://github.com/Utzel-Butzel/inventory/releases/download/android-preview-2026-10-31/open-inventory-android-preview.apk";

export function AppDownloads({ locale, dark = false }: { locale: MarketingLocale; dark?: boolean }) {
  const de = locale === "de";
  const muted = dark ? "text-white/70" : "text-muted";
  return (
    <div className="mt-7" aria-label={de ? "Apps herunterladen" : "Download apps"}>
      <dl className={`grid gap-5 border-y py-5 text-sm sm:grid-cols-2 ${dark ? "border-white/20" : "border-border"}`}>
        <div>
          <dt className="font-semibold">Android <span className={`ml-2 text-xs font-normal ${muted}`}>{de ? "Vorabversion" : "Preview"}</span></dt>
          <dd className={`mt-2 leading-6 ${muted}`}>
            <p>{de ? "Ab Android 8.0. Als APK verfügbar; Google Play folgt." : "Android 8.0 or later. Available as an APK; Google Play release to follow."}</p>
            <a href={androidApkUrl} className={`mt-2 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 ${dark ? "text-brand-inverse" : "text-brand"}`}><Download className="size-4" aria-hidden="true" />{de ? "Android-APK herunterladen" : "Download Android APK"}</a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold">iPhone <span className={`ml-2 text-xs font-normal ${muted}`}>{de ? "Im App Store verfügbar" : "Available on the App Store"}</span></dt>
          <dd className={`mt-2 leading-6 ${muted}`}>
            <p>{de ? "Ab iOS 17. Jetzt im App Store herunterladen und mit deiner eigenen Instanz verbinden." : "iOS 17 or later. Download from the App Store and connect to your own instance."}</p>
            <a href={appStoreUrl} className={`mt-2 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 ${dark ? "text-brand-inverse" : "text-brand"}`}><Download className="size-4" aria-hidden="true" />{de ? "iPhone-App im App Store laden" : "Download iPhone app on the App Store"}</a>
            <br />
            <a href="https://github.com/Utzel-Butzel/inventory/tree/main/ios/Inventory" className="mt-2 inline-flex min-h-11 items-center underline underline-offset-4">{de ? "iPhone-App auf GitHub" : "iPhone app on GitHub"}</a>
          </dd>
        </div>
      </dl>
      <p className={`mt-3 text-xs leading-5 ${muted}`}>{de ? "Beide Apps benötigen eine eigene Open-Inventory-Installation. Für Android öffnest du die heruntergeladene APK und erlaubst die Installation aus dieser Quelle." : "Both apps require your own Open Inventory installation. On Android, open the downloaded APK and allow installation from this source."}</p>
    </div>
  );
}
