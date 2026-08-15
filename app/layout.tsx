import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

import { UI_LANGUAGE_HEADER, UI_LANGUAGES } from "@/i18n.config";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const fallback = process.env.SITE_URL ?? "http://localhost:3000";
  const metadataBase = new URL(host ? `${protocol}://${host}` : fallback);
  const locale = requestHeaders.get(UI_LANGUAGE_HEADER) === "de" ? "de" : "en";
  const description = locale === "de"
    ? "Open Inventory verbindet Gegenstände mit Standorten, Beständen und Buchungen. Selbst hostbar, MIT-lizenziert, mit optionaler Bildanalyse und nativer iOS-App."
    : "Open Inventory connects objects with locations, stock, and movement history. Self-hostable and MIT licensed, with optional image analysis and a native iOS app.";
  const title = locale === "de"
    ? "Open Inventory – Inventar für Werkstatt und Technik"
    : "Open Inventory – Inventory for workshops and technical teams";

  return {
    metadataBase,
    title: {
      default: title,
      template: "%s · Open Inventory",
    },
    description,
    applicationName: "Open Inventory",
    openGraph: {
      type: "website",
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c10" },
  ],
};

const themeInitScript = `
let theme = null;
try {
  theme = localStorage.getItem("inventory-theme");
} catch {}
if (theme === "light" || theme === "dark") {
  document.documentElement.dataset.theme = theme;
}
const resolvedTheme = theme === "light" || theme === "dark"
  ? theme
  : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
  meta.setAttribute("content", resolvedTheme === "dark" ? "#0a0c10" : "#f6f7f9");
});
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLanguage = requestHeaders.get(UI_LANGUAGE_HEADER) ?? "en";
  const language = UI_LANGUAGES.includes(requestedLanguage as "en" | "de")
    ? requestedLanguage
    : "en";

  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
