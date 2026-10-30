import type { Metadata } from "next";
import { MarketingFooter, MarketingHeader } from "@/components/marketing/site-chrome";
import { VariantStockGuide } from "@/components/marketing/variant-stock-guide";
import { ApiQuickStart, DocCode, DocLinks, DocSection, PlanningGuide, PrintingGuide, repositoryUrl } from "@/components/marketing/documentation-sections";
import { marketingHref, marketingOgLocale, marketingPathAlternates } from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const title = locale === "de" ? "Dokumentation — Open Inventory" : "Documentation — Open Inventory";
  const description = locale === "de"
    ? "Open Inventory einrichten: Installation, API, Etikettendruck, gemeinsame Drucker, Bestandsplanung und Variantenfertigung."
    : "Set up Open Inventory: installation, API, label printing, shared printers, stock planning and variant assembly.";
  return { title: { absolute: title }, description, alternates: marketingPathAlternates(locale, "/docs"), openGraph: { title, description, url: marketingHref(locale, "/docs"), ...marketingOgLocale(locale) } };
}

const install = `git clone ${repositoryUrl}.git
cd inventory
./scripts/install.sh`;
const authConfig = `AUTH_URL=https://inventory.example.com
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_TRUST_HOST=true`;
const oidcConfig = `AUTH_OIDC_PROVIDER_ID=supabase
AUTH_OIDC_PROVIDER_NAME=Supabase
AUTH_OIDC_ISSUER=https://your-project.supabase.co/auth/v1
AUTH_OIDC_CLIENT_ID=your-client-id
AUTH_OIDC_CLIENT_SECRET=your-client-secret
AUTH_OIDC_SCOPES=openid email profile`;

export default async function DocsPage() {
  const locale = await getMarketingLocale();
  const de = locale === "de";
  const navigation = [
    ["docker", "Installation"],
    ["configuration", de ? "Konfiguration" : "Configuration"],
    ["authentication", de ? "Anmeldung" : "Authentication"],
    ["api", "API"],
    ["printing", de ? "Etiketten & Drucken" : "Labels & printing"],
    ["planning", de ? "Bestandsplanung & Zählen" : "Planning & counting"],
    ["variant-stock", de ? "Varianten & Fertigung" : "Variants & assembly"],
    ["operations", de ? "Betrieb & Backups" : "Operations & backups"],
  ];
  return <div className="min-h-dvh bg-background text-foreground">
    <MarketingHeader />
    <main id="main-content">
      <section id="overview" className="border-b border-border">
        <div className="site-shell py-16 sm:py-20">
          <p className="site-eyebrow">{de ? "Dokumentation" : "Documentation"}</p>
          <h1 className="site-title mt-5 max-w-4xl">{de ? "Einrichten. Verbinden. Im Alltag nutzen." : "Set up. Connect. Put it to work."}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{de ? "Installiere deine Instanz, verbinde die API und richte Etikettendruck und Bestandsabläufe ein. Hier findest du die Schritte und Voraussetzungen." : "Install your instance, connect the API and set up printing and stock workflows. Find the steps and requirements here."}</p>
          <div className="mt-7"><DocLinks links={[[de ? "Direkt zur Druckanleitung" : "Go to printing setup", "#printing"], [de ? "API-Referenz" : "API reference", marketingHref(locale, "/api-docs")]]} /></div>
        </div>
      </section>
      <div className="site-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-between">
        <aside><nav aria-label={de ? "Auf dieser Seite" : "On this page"} className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:grid">
          {navigation.map(([id, title]) => <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground">{title}</a>)}
        </nav></aside>
        <article className="min-w-0">
          <DocSection id="docker" title={de ? "Mit Docker starten" : "Start with Docker"} intro={de ? "Du brauchst Git, Docker Compose v2, OpenSSL und curl. Der Installer startet die Anwendung und PostgreSQL mit persistenten Volumes und führt die Datenbankmigrationen aus." : "You need Git, Docker Compose v2, OpenSSL and curl. The installer starts the application and PostgreSQL with persistent volumes and runs database migrations."}>
            <div id="docker-quick-start" className="scroll-mt-28"><DocCode locale={locale} label={de ? "Terminal · Installation" : "Terminal · installation"} code={install} /></div>
            <p>{de ? "Der Installer erstellt die .env und erzeugt die nötigen Geheimnisse. Am Ende zeigt er die Adresse und den ersten Admin-Zugang an, standardmäßig admin@inventory.local. Melde dich mit dem ausgegebenen Passwort an und ändere es unter Einstellungen → Benutzer." : "The installer creates .env and generates the required secrets. When finished, it prints the application address and first admin credentials, using admin@inventory.local by default. Sign in with the generated password and change it under Settings → Users."}</p>
            <p>{de ? "Für Dokploy und Coolify stehen eigene Deployment-Vorlagen bereit. Sie richten Datenbank, Upload-Speicher und Healthcheck ein. Das erste Passwort findest du dort in den Umgebungsvariablen der Plattform." : "Dokploy and Coolify deployment templates configure the database, upload storage and health check. Find the initial password in the platform’s environment settings."}</p>
            <DocLinks links={[["Dokploy", `${repositoryUrl}/tree/main/deploy/dokploy`], ["Coolify", `${repositoryUrl}/tree/main/deploy/coolify`]]} />
          </DocSection>
          <DocSection id="configuration" title={de ? "Instanz konfigurieren" : "Configure your instance"}>
            <p>{de ? "AUTH_URL ist die öffentliche HTTPS-Adresse deiner Anwendung. Verwende pro Installation ein eigenes AUTH_SECRET. Datenbank und Uploads benötigen dauerhaften Speicher." : "AUTH_URL is the public HTTPS address of your application. Use a unique AUTH_SECRET for each installation. Database data and uploads need persistent storage."}</p>
            <DocCode locale={locale} label=".env" code={authConfig} />
            <ul className="list-disc space-y-2 pl-5">
              <li>{de ? "Dateien: lokales Upload-Volume oder eine konfigurierte Openinary-Instanz." : "Files: the local upload volume or a configured Openinary instance."}</li>
              <li>{de ? "KI: optional für Bildanalyse, Zählhilfen, Übersetzungen und Cover. Organisationsweite Modelle und Vorgaben stehen unter Einstellungen → KI." : "AI: optional for image analysis, counting, translations and covers. Organization models and defaults live under Settings → AI."}</li>
              <li>{de ? "Karten: die Standardkarten laden externe Kacheln; eigene kompatible Tile-URLs sind konfigurierbar." : "Maps: default maps load external tiles; you can configure your own compatible tile URLs."}</li>
            </ul>
            <DocLinks links={[[de ? "Alle Umgebungsvariablen" : "All environment variables", `${repositoryUrl}/blob/main/.env.example`]]} />
          </DocSection>
          <DocSection id="authentication" title={de ? "Anmeldung und Zugriff" : "Sign-in and access"} intro={de ? "Nutze lokale Passwörter, Auth0 oder einen OpenID-Connect-Provider. Organisationen, Rollen und Berechtigungen werden in Open Inventory verwaltet." : "Use local passwords, Auth0 or an OpenID Connect provider. Open Inventory manages organizations, roles and permissions."}>
            <p>{de ? "Für Auth0 oder OIDC muss bereits ein aktiver Benutzer mit derselben E-Mail-Adresse existieren. Der Provider muss email_verified: true liefern. Teste die externe Anmeldung, bevor du lokale Passwörter deaktivierst. Der aktuelle iOS-Passwortlogin funktioniert nicht bei einer ausschließlich externen Anmeldung." : "Auth0 or OIDC requires an existing active user with the same email address, and the provider must return email_verified: true. Test external sign-in before disabling local passwords. The current iOS password sign-in does not work with an external-only deployment."}</p>
            <details className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold text-foreground">{de ? "Auth0 und OIDC konfigurieren" : "Configure Auth0 and OIDC"}</summary>
              <div className="mt-4 space-y-5">
                <p>{de ? "Auth0 benötigt AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET und AUTH0_DOMAIN. Hinterlege als Callback https://inventory.example.com/api/auth/callback/auth0." : "Auth0 requires AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET and AUTH0_DOMAIN. Register https://inventory.example.com/api/auth/callback/auth0 as the callback."}</p>
                <DocCode locale={locale} label=".env · OIDC" code={oidcConfig} />
                <p className="break-words">{de ? "Bei OIDC entspricht das letzte Callback-Segment der Provider-ID: im Beispiel https://inventory.example.com/api/auth/callback/supabase. Ersetze die Beispieldomain durch deine Anwendungsadresse." : "For OIDC, the final callback segment is the provider ID: https://inventory.example.com/api/auth/callback/supabase in this example. Replace the example domain with your application address."}</p>
              </div>
            </details>
            <DocLinks links={[[de ? "Anmeldeprovider einrichten" : "Configure sign-in providers", `${repositoryUrl}/blob/main/AUTHPROVIDERS.md`]]} />
          </DocSection>
          <ApiQuickStart locale={locale} />
          <PrintingGuide locale={locale} />
          <PlanningGuide locale={locale} />
          <VariantStockGuide locale={locale} />
          <DocSection id="operations" title={de ? "Betrieb und Backups" : "Operations and backups"}>
            <ul className="list-disc space-y-2 pl-5">
              <li>{de ? "Datenbank und hochgeladene Dateien gemeinsam sichern und die Wiederherstellung testen." : "Back up the database and uploaded files together, and test restoring them."}</li>
              <li>{de ? "HTTPS einrichten und Datenbankzugriff auf das interne Netz begrenzen." : "Configure HTTPS and keep database access on the internal network."}</li>
              <li>{de ? "Nach Updates /api/health sowie Anmeldung und Upload prüfen. Migrationen laufen beim Produktionsstart." : "After updates, check /api/health, sign-in and uploads. Migrations run at production startup."}</li>
              <li>{de ? "Beim gemeinsamen Drucker den Windows-Agenten und seine geschützte Konfiguration mitpflegen. Die lokale Datei pending.json bei Updates erhalten, damit unklare Aufträge nicht versehentlich wiederholt werden." : "Maintain the shared printer’s Windows agent and protected configuration. Preserve pending.json during updates to avoid losing recovery information for uncertain jobs."}</li>
            </ul>
            <DocLinks links={[[de ? "Betriebsanleitung im Repository" : "Repository operations guide", `${repositoryUrl}#readme`]]} />
          </DocSection>
        </article>
      </div>
    </main>
    <MarketingFooter />
  </div>;
}
