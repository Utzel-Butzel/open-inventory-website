import { Cloud, Container, Server, Terminal } from "lucide-react";
import { PortainerSetup } from "@/components/marketing/portainer-setup";
import type { MarketingLocale } from "@/lib/marketing-i18n";

export function HostingChoices({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const options = [
    { id: "docker", icon: Server, name: "Dokploy / Coolify", status: de ? "Vorlagen verfügbar" : "Templates available", text: de ? "Für deinen Server mit Dokploy oder Coolify. Vorlage importieren und starten." : "For your server running Dokploy or Coolify. Import a template and deploy." },
    { id: "docker-installer", icon: Terminal, name: "Docker", status: de ? "Installer verfügbar" : "Installer available", text: de ? "Auf deinem Rechner oder Server. Ein Skript richtet Anwendung und Datenbank ein." : "On your computer or server. A script sets up the application and database." },
    { id: "railway", icon: Cloud, name: "Railway", status: de ? "Konfiguration vorbereitet" : "Configuration prepared", text: de ? "Ohne eigenen Server. Vorbereitetes Konfigurationspaket; laufende Hostingkosten." : "No server of your own needed. Prepared configuration package; ongoing hosting costs apply." },
    { id: "portainer", icon: Container, name: "Portainer", status: de ? "Vorlage erstellen" : "Template generator available", text: de ? "Wenn du Docker bereits mit Portainer verwaltest. Einrichtung als Compose-Stack." : "If you already manage Docker with Portainer. Set up a Compose stack." },
  ];
  return <section id="hosting" className="scroll-mt-28">
    <h2 className="site-heading">{de ? "Welche Option passt zu dir?" : "Which option fits your setup?"}</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{options.map(({ id, icon: Icon, name, status, text }) => <a key={id} href={`#${id}`} className="rounded-xl border border-border bg-surface p-5 transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
      <Icon className="mb-4 size-6 text-brand" aria-hidden="true" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
      <p className="mt-4 text-xs font-semibold text-muted">{status} →</p>
    </a>)}</div>
  </section>;
}

export function AdditionalHostingOptions({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  return <>
    <section id="docker-installer" className="scroll-mt-28">
      <h2 className="site-heading">{de ? "Mit Docker einrichten" : "Set up with Docker"}</h2>
      <p className="mt-5 text-sm leading-7 text-muted">{de ? "Du brauchst Git, Docker mit Compose v2, OpenSSL und curl. Auf macOS oder Windows kannst du Docker Desktop verwenden; führe die Befehle in einer Unix-Shell aus, unter Windows zum Beispiel in WSL." : "You need Git, Docker with Compose v2, OpenSSL and curl. On macOS or Windows, you can use Docker Desktop; run the commands in a Unix shell, such as WSL on Windows."}</p>
      <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-7 text-muted">
        <li>{de ? "Öffne ein Terminal auf dem Rechner, auf dem Open Inventory laufen soll, und führe diese Befehle aus:" : "Open a terminal on the computer that will run Open Inventory and run these commands:"}
          <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-xs leading-6 text-foreground"><code>{"git clone https://github.com/Utzel-Butzel/inventory.git\ncd inventory\n./scripts/install.sh"}</code></pre>
        </li>
        <li>{de ? "Warte, bis der Installer die Zugangsdaten ausgibt. Er erstellt Passwörter, startet die Datenbank und baut die Anwendung. Der erste Start kann einige Minuten dauern." : "Wait for the installer to print your sign-in details. It generates passwords, starts the database and builds the application. The first start may take a few minutes."}</li>
        <li>{de ? "Öffne auf demselben Rechner http://localhost:3000 und melde dich mit den ausgegebenen Zugangsdaten an." : "On that same computer, open http://localhost:3000 and sign in with the credentials printed in the terminal."}</li>
        <li>{de ? "Ändere dein Passwort unter Einstellungen → Benutzer. Entferne danach BOOTSTRAP_ADMIN_PASSWORD und BOOTSTRAP_ADMIN_PASSWORD_ONCE aus der Datei .env und starte den Stack erneut:" : "Change your password under Settings → Users. Then remove BOOTSTRAP_ADMIN_PASSWORD and BOOTSTRAP_ADMIN_PASSWORD_ONCE from .env and restart the stack:"}
          <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-xs leading-6 text-foreground"><code>docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build</code></pre>
        </li>
      </ol>
      <p className="mt-5 text-sm leading-7 text-muted">{de ? "Die Installation ist zunächst nur auf diesem Rechner erreichbar. Für einen öffentlichen Server brauchst du zusätzlich eine Domain, einen HTTPS-Reverse-Proxy und die passende AUTH_URL. Mit Dokploy oder Coolify ist dieser Schritt einfacher. Datenbank und Uploads liegen in dauerhaften Docker-Volumes; sichere beide regelmäßig." : "The installation is initially reachable only on that computer. A public server also needs a domain, an HTTPS reverse proxy and a matching AUTH_URL. Dokploy or Coolify makes that step easier. The database and uploads use persistent Docker volumes; back up both regularly."}</p>
      <a className="site-link mt-4" href="https://github.com/Utzel-Butzel/inventory#quick-start">{de ? "Docker-Anleitung und Server-Konfiguration" : "Docker guide and server configuration"} ↗</a>
    </section>
    <section id="railway" className="scroll-mt-28">
      <h2 className="site-heading">Railway</h2>
      <p className="mt-5 text-sm leading-7 text-muted">{de ? "Eine Option, wenn du keinen eigenen Server verwalten möchtest. Railway kann Anwendung und PostgreSQL in einem Projekt betreiben. Dafür brauchst du ein Railway-Konto; die Nutzung verursacht laufende Hostingkosten." : "An option if you do not want to manage your own server. Railway can run the application and PostgreSQL in one project. You need a Railway account, and ongoing hosting costs apply."}</p>
      <p className="mt-4 text-sm leading-7 text-muted">{de ? "Das Konfigurationspaket enthält die vorbereiteten Dienste, Variablen und Speicher-Einstellungen. Es ist noch nicht als Railway-Vorlage veröffentlicht oder auf Railway getestet. Deshalb gibt es noch keinen Deploy-Button; die enthaltene Anleitung beschreibt die Einrichtung im Railway-Vorlageneditor." : "The configuration package contains prepared services, variables and storage settings. It has not been published as a Railway template or tested on Railway. There is no Deploy button yet; the included guide explains setup in Railway’s template editor."}</p>
      <a className="site-link mt-4" href="/install/open-inventory-railway.zip" download>{de ? "Railway-Konfigurationspaket herunterladen" : "Download Railway configuration package"} ↓</a>
    </section>
    <section id="portainer" className="scroll-mt-28">
      <h2 className="site-heading">Portainer</h2>
      <p className="mt-5 text-sm leading-7 text-muted">{de ? "Sinnvoll, wenn auf deinem Server bereits Docker und Portainer laufen. Portainer kann die Anwendung, PostgreSQL und den Dateispeicher gemeinsam als Compose-Stack verwalten." : "Useful if your server already runs Docker and Portainer. Portainer can manage the application, PostgreSQL and file storage together as a Compose stack."}</p>
      <p className="mt-4 text-sm leading-7 text-muted">{de ? "Voraussetzung: ein Docker-Standalone-Server mit Portainer. Die Domain muss per DNS auf diesen Server zeigen. Die Ports 80 und 443 müssen frei und von außen erreichbar sein, damit Caddy HTTPS einrichten kann. Auf einem Server mit bereits belegten Web-Ports nutze stattdessen Dokploy oder Coolify." : "You need a Docker Standalone server with Portainer. Point your domain’s DNS record to this server. Ports 80 and 443 must be unused and publicly reachable so Caddy can set up HTTPS. If your server already uses these web ports, use Dokploy or Coolify instead."}</p>
      <PortainerSetup locale={locale} />
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted">
        <li>{de ? "Erstelle oben deine Vorlage und kopiere sie." : "Generate your template above and copy it."}</li>
        <li>{de ? "Öffne in Portainer Stacks → Add stack. Vergib den Namen open-inventory und füge die Vorlage im Web editor ein. Wähle Deploy the stack." : "In Portainer, open Stacks → Add stack. Name it open-inventory and paste the template into the Web editor. Select Deploy the stack."}</li>
        <li>{de ? "Warte, bis die Container laufen und HTTPS bereit ist. Öffne deine Adresse und melde dich mit deiner E-Mail-Adresse und dem erzeugten Startpasswort an." : "Wait for the containers to start and HTTPS to become ready. Open your address and sign in with your email and the generated initial password."}</li>
        <li>{de ? "Ändere dein Passwort unter Einstellungen → Benutzer. Entferne anschließend BOOTSTRAP_ADMIN_PASSWORD und BOOTSTRAP_ADMIN_PASSWORD_ONCE im Stack-Editor und wähle Update the stack. Sichere Datenbank und Upload-Volume regelmäßig." : "Change your password under Settings → Users. Then remove BOOTSTRAP_ADMIN_PASSWORD and BOOTSTRAP_ADMIN_PASSWORD_ONCE in the stack editor and select Update the stack. Back up the database and upload volume regularly."}</li>
      </ol>
    </section>
  </>;
}
