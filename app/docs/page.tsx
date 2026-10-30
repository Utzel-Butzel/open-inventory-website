import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { MarketingFooter, MarketingHeader } from "@/components/marketing/site-chrome";
import { HostingGuide } from "@/components/marketing/hosting-guide";
import { LegacyDocsLinks } from "@/components/marketing/legacy-docs-links";
import { marketingHref, marketingOgLocale, marketingPathAlternates, technicalDocsHref } from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

const dokploy = readFileSync(path.join(process.cwd(), "public/install/dokploy.txt"), "utf8");
const coolify = readFileSync(path.join(process.cwd(), "public/install/coolify.yaml"), "utf8");

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const title = locale === "de" ? "Open Inventory einfach einrichten" : "Set up Open Inventory";
  const description = locale === "de" ? "Open Inventory mit Dokploy oder Coolify selbst hosten: Vorlage importieren, Adresse wählen, anmelden und den ersten Gegenstand anlegen." : "Host Open Inventory with Dokploy or Coolify: import a template, choose an address, sign in and add your first item.";
  return { title, description, alternates: marketingPathAlternates(locale, "/docs"), openGraph: { title, description, url: marketingHref(locale, "/docs"), ...marketingOgLocale(locale) } };
}

export default async function DocsPage() {
  const locale = await getMarketingLocale();
  const de = locale === "de";
  return <div className="min-h-dvh bg-background text-foreground">
    <MarketingHeader />
    <LegacyDocsLinks locale={locale} />
    <main id="main-content">
      <section className="border-b border-border"><div className="site-shell py-16 sm:py-20">
        <p className="site-eyebrow">{de ? "Einrichten & loslegen" : "Set up & get started"}</p>
        <h1 className="site-title mt-5 max-w-4xl">{de ? "Dein Inventar. Auf deinem Server." : "Your inventory. On your server."}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{de ? "Mit einer fertigen Vorlage installierst du Open Inventory in Dokploy oder Coolify. Danach meldest du dich an und kannst direkt deinen ersten Gegenstand anlegen." : "Install Open Inventory in Dokploy or Coolify using a ready-made template. Then sign in and add your first item."}</p>
      </div></section>
      <div className="site-shell grid gap-10 py-12 lg:grid-cols-[200px_minmax(0,760px)] lg:justify-between">
        <aside><nav aria-label={de ? "Auf dieser Seite" : "On this page"} className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:grid">{[["before", de ? "Was du brauchst" : "What you need"], ["docker", "Dokploy / Coolify"], ["first-steps", de ? "Erste Schritte" : "First steps"], ["help", de ? "Wenn etwas hakt" : "Troubleshooting"]].map(([id, text]) => <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground">{text}</a>)}</nav></aside>
        <article className="min-w-0 space-y-14">
          <section id="before" className="scroll-mt-28"><h2 className="site-heading">{de ? "Was du brauchst" : "What you need"}</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-muted"><li>{de ? "Einen eigenen Server, auf dem Dokploy oder Coolify bereits läuft, und Zugriff auf dessen Verwaltungsoberfläche." : "Your own server with Dokploy or Coolify already running, and access to its dashboard."}</li><li>{de ? "Eine freie Adresse für die Anwendung, zum Beispiel inventar.deine-domain.de. Trage dafür beim Domainanbieter einen A-Eintrag mit der IP-Adresse deines Servers ein." : "An available hostname for your application, such as inventory.your-domain.com. At your domain provider, create an A record pointing to your server’s IP address."}</li></ul>
            <p className="mt-4 text-sm leading-7 text-muted">{de ? "Die Vorlagen enthalten Open Inventory, PostgreSQL und dauerhaften Speicher für deine Dateien. Für die normale Inventarverwaltung brauchst du keinen KI-Schlüssel." : "The templates include Open Inventory, PostgreSQL and persistent storage for your files. Everyday inventory management does not require an AI key."}</p>
            <p className="mt-4 text-sm text-muted">{de ? "Die Plattform fehlt noch?" : "Need to install the hosting platform first?"} <a className="site-link" href="https://docs.dokploy.com/docs/core/installation">Dokploy ↗</a> · <a className="site-link" href="https://coolify.io/docs/get-started/installation">Coolify ↗</a></p>
          </section>
          <section id="docker" className="scroll-mt-28"><span id="docker-quick-start" /><h2 className="site-heading">{de ? "Wähle deine Hosting-Plattform" : "Choose your hosting platform"}</h2><HostingGuide locale={locale} dokploy={dokploy} coolify={coolify} /></section>
          <section id="first-steps" className="scroll-mt-28"><h2 className="site-heading">{de ? "Deinen ersten Gegenstand anlegen" : "Add your first item"}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted"><li>{de ? "Öffne das Inventar und lege einen neuen Artikel an. Für den Anfang reichen ein Name und ein Standort." : "Open Inventory and create a new item. Start with a name and a location."}</li><li>{de ? "Trage einen Anfangsbestand ein. Nutze Mengenbestand für austauschbare Dinge wie Schrauben und Einzelgeräte für Geräte, die du getrennt verfolgen möchtest." : "Enter an opening stock balance. Use quantity stock for interchangeable supplies such as screws, and individual units for equipment you want to track separately."}</li><li>{de ? "Lade bei Bedarf ein Foto hoch. Suche anschließend nach dem Artikel, um zu prüfen, ob du ihn schnell wiederfindest." : "Upload a photo if useful. Then search for the item to check that you can find it again."}</li></ol></section>
          <section id="help" className="scroll-mt-28"><h2 className="site-heading">{de ? "Wenn etwas hakt" : "If something gets stuck"}</h2><div className="mt-5 divide-y divide-border">{(de ? [
            ["Die Webseite öffnet sich nicht", "Prüfe, ob der DNS-Eintrag auf deinen Server zeigt, HTTPS aktiviert ist und die Domain auf den Dienst inventory mit Port 3000 verweist. Neue DNS-Einträge können etwas Zeit brauchen."],
            ["Das Passwort funktioniert nicht", "Verwende beim ersten Login admin@inventory.local und den erzeugten Startpasswort-Wert deiner Plattform. Nach dem Ändern gilt dein selbst gewähltes Passwort."],
            ["Der Start schlägt fehl", "Öffne die Deployment-Logs. Warte, bis PostgreSQL bereit ist und die Datenbankmigrationen abgeschlossen sind. Lösche dabei keine Volumes: Dort liegen deine Daten."],
          ] : [
            ["The website does not open", "Check that DNS points to your server, HTTPS is enabled and the domain routes to the inventory service on port 3000. New DNS records can take time to become available."],
            ["The password does not work", "For the first login, use admin@inventory.local and the initial password generated by your hosting platform. After changing it, use your new password."],
            ["Deployment fails", "Open the deployment logs. Wait until PostgreSQL is ready and database migrations finish. Do not delete volumes while troubleshooting: they contain your data."],
          ]).map(([title, text]) => <details key={title} className="py-5"><summary className="cursor-pointer font-semibold">{title}</summary><p className="mt-3 text-sm leading-7 text-muted">{text}</p></details>)}</div></section>
          <section className="rounded-xl border border-border bg-surface p-6"><h2 className="text-xl font-semibold">{de ? "Du möchtest mehr einrichten?" : "Ready to configure more?"}</h2><p className="mt-3 text-sm leading-7 text-muted">{de ? "Drucker, API, externe Anmeldung, Backups und spezielle Bestandsabläufe findest du in der technischen Dokumentation." : "Find printer setup, the API, external sign-in, backups and advanced stock workflows in the technical documentation."}</p><a className="site-link mt-4" href={technicalDocsHref()}>{de ? "Technische Dokumentation öffnen" : "Open technical documentation"} →</a></section>
        </article>
      </div>
    </main>
    <MarketingFooter />
  </div>;
}
