import { featureGroups } from "@/app/features/features";
import { useCases } from "@/app/use-cases/use-cases";
import { articles } from "@/app/blog/articles";
import { englishArticles } from "@/app/blog/articles.en";
import { getEnglishFeatureCopy } from "@/components/marketing/english-feature-pages";
import { englishUseCases } from "@/components/marketing/english-use-case-pages";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import type { SearchDocument } from "@/lib/site-search";

// Index the same editorial content used by the pages, including their detailed sections.
function textContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textContent).join(" ");
  if (value && typeof value === "object") return Object.entries(value)
    .filter(([key]) => !["icon", "src", "href", "image", "accent", "softAccent", "accentSoft"].includes(key))
    .map(([, child]) => textContent(child)).join(" ");
  return "";
}

const overviewPages = {
  de: [
    ["/", "Open Inventory – Wissen, was da ist.", "Inventar für Geräte, Werkzeug und Material: Fotos, KI-Erfassung, Bestände, Ausleihen, QR-Etiketten und Standorte."],
    ["/features", "Funktionen", "Foto und KI, Inventar strukturieren, Bestand und Ausleihe, Etiketten und API, Orte und 3D-Räume, Betrieb und Sicherheit."],
    ["/use-cases", "Einsatzbereiche", "Inventar für Makerspace, Familie, Startup, Verein, Sammlung, Schule, Handwerk und Labor."],
    ["/app", "Apps für iPhone und Android", "Mobile Apps herunterladen: Android APK, iPhone, iOS, Kamera, Barcode-Scanner, LiDAR, RoomPlan und Offline-Erfassung."],
    ["/open-source", "Open Source und Self-Hosting", "MIT-Lizenz, GitHub, eigener Server, Docker, Datenschutz, Backups, Datenexport, CSV, REST API und Integrationen."],
    ["/docs", "Installation und Self-Hosting", "Open Inventory installieren: Docker Compose, Dokploy, Coolify, Railway, Portainer. Umgebung konfigurieren und Daten sichern."],
    ["/blog", "Blog", "Anleitungen, Hintergründe und Praxisbeispiele zu Serienerfassung, Beständen, QR-Etiketten, Self-Hosting und iPhone LiDAR."],
    ["/impressum", "Impressum", "Rechtliche Angaben, Anbieter und Kontakt."],
  ],
  en: [
    ["/", "Open Inventory – Know what you have.", "Inventory for equipment, tools and materials: photos, AI capture, stock, lending, QR labels and locations."],
    ["/features", "Features", "Photo and AI capture, inventory structure, stock and lending, labels and API, locations and 3D rooms, operations and security."],
    ["/use-cases", "Use cases", "Inventory for makerspaces, families, startups, clubs, collections, schools, trades and labs."],
    ["/app", "Apps for iPhone and Android", "Download mobile apps: Android APK, iPhone, iOS, camera, barcode scanner, LiDAR, RoomPlan and offline capture."],
    ["/open-source", "Open source and self-hosting", "MIT license, GitHub, your own server, Docker, privacy, backups, data export, CSV, REST API and integrations."],
    ["/docs", "Installation and self-hosting", "Install Open Inventory with Docker Compose, Dokploy, Coolify, Railway or Portainer. Configure the environment and back up your data."],
    ["/blog", "Blog", "Guides and practical examples for batch capture, stock, QR labels, self-hosting and iPhone LiDAR."],
    ["/impressum", "Legal notice", "Legal information, provider and contact."],
  ],
};

export function websiteSearchDocuments(locale: MarketingLocale): SearchDocument[] {
  const href = (path: string) => marketingHref(locale, path);
  return [
    ...overviewPages[locale].map(([url, title, description]) => ({ url: href(url), title, description, body: description })),
    ...featureGroups.map((group) => {
      const content = locale === "de" ? group : getEnglishFeatureCopy(group.slug)!;
      return { url: href(`/features/${group.slug}`), title: content.title, description: content.description, body: textContent(content) };
    }),
    ...(locale === "de" ? useCases : englishUseCases).map((item) => ({ url: href(`/use-cases/${item.slug}`), title: item.name, description: item.description, body: textContent(item) })),
    ...(locale === "de" ? articles : englishArticles).map((item) => ({ url: href(`/blog/${item.slug}`), title: item.title, description: item.description, body: textContent(item) })),
  ];
}
