"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import type { MarketingLocale } from "@/lib/marketing-i18n";

export function HostingGuide({ locale, dokploy, coolify }: { locale: MarketingLocale; dokploy: string; coolify: string }) {
  const [platform, setPlatform] = useState<"dokploy" | "coolify">("dokploy");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const de = locale === "de";
  const dok = platform === "dokploy";
  const name = dok ? "Dokploy" : "Coolify";
  const steps = dok
    ? de ? [
      ["Dienst anlegen", "Öffne dein Projekt in Dokploy und erstelle einen Docker-Compose-Dienst. Gib ihm den Namen Open Inventory."],
      ["Vorlage importieren", "Kopiere die Dokploy-Vorlage mit dem Button unten. Öffne im neuen Dienst Advanced → Import, füge sie in das Base64-Feld ein und bestätige den Import. Die Vorlage bringt Datenbank und Dateispeicher mit und erzeugt die benötigten Passwörter."],
      ["Adresse wählen und starten", "Gib beim Import deine eigene Anwendungsadresse an, zum Beispiel inventar.deine-domain.de. Ihr DNS-Eintrag muss auf deinen Server zeigen. Prüfe unter Domains: Dienst inventory, Port 3000, HTTPS mit Let’s Encrypt. Wähle Deploy und warte, bis der Dienst läuft."],
      ["Zum ersten Mal anmelden", "Öffne deine neue HTTPS-Adresse. Der Benutzername ist admin@inventory.local. Das erste Passwort findest du unter Environment → BOOTSTRAP_ADMIN_PASSWORD. Kopiere den dort erzeugten Wert in die Anmeldung."],
    ] : [
      ["Create a service", "Open your project in Dokploy and create a Docker Compose service. Name it Open Inventory."],
      ["Import the template", "Copy the Dokploy template using the button below. Open Advanced → Import in the new service, paste it into the Base64 field and confirm. The template includes a database and file storage and generates the required passwords."],
      ["Choose an address and deploy", "Enter your own application hostname during import, for example inventory.your-domain.com. Its DNS record must point to your server. Under Domains, check service inventory, port 3000 and HTTPS with Let’s Encrypt. Select Deploy and wait until the service is running."],
      ["Sign in for the first time", "Open your new HTTPS address. The username is admin@inventory.local. Find the initial password under Environment → BOOTSTRAP_ADMIN_PASSWORD and copy its generated value into the sign-in form."],
    ]
    : de ? [
      ["Dienst anlegen", "Öffne dein Projekt in Coolify. Wähle New Resource → Docker Compose Empty."],
      ["Vorlage einfügen", "Kopiere die Coolify-Vorlage mit dem Button unten, füge den vollständigen Text in den Compose-Editor ein und speichere. Die Datenbank, der Dateispeicher und zufällige Passwörter werden damit vorbereitet."],
      ["Adresse wählen und starten", "Trage beim Dienst inventory deine eigene HTTPS-Adresse mit Port 3000 ein, zum Beispiel https://inventar.deine-domain.de:3000. Der Port hilft Coolify beim internen Routing; Besucher öffnen später die HTTPS-Adresse ohne Port. Der DNS-Eintrag muss auf deinen Server zeigen. Wähle Deploy und warte auf den gesunden Dienst."],
      ["Zum ersten Mal anmelden", "Öffne deine neue HTTPS-Adresse. Melde dich als admin@inventory.local an. Das erste Passwort findest du in den Umgebungsvariablen unter SERVICE_PASSWORD_64_ADMIN; blende den erzeugten Wert dort ein."],
    ] : [
      ["Create a service", "Open your project in Coolify. Choose New Resource → Docker Compose Empty."],
      ["Paste the template", "Copy the Coolify template using the button below, paste all of it into the Compose editor and save. This prepares the database, file storage and randomly generated passwords."],
      ["Choose an address and deploy", "Assign your own HTTPS domain with port 3000 to the inventory service, for example https://inventory.your-domain.com:3000. The port tells Coolify where to route internally; visitors use the HTTPS address without a port. Point the DNS record at your server. Select Deploy and wait until the service is healthy."],
      ["Sign in for the first time", "Open your new HTTPS address and sign in as admin@inventory.local. Reveal the generated value of SERVICE_PASSWORD_64_ADMIN in the environment settings to find your initial password."],
    ];

  async function copyTemplate() {
    try { await navigator.clipboard.writeText(dok ? dokploy : coolify); setCopyState("copied"); }
    catch { setCopyState("failed"); }
  }

  return <div className="mt-8">
    <div role="group" aria-label={de ? "Hosting-Plattform wählen" : "Choose hosting platform"} className="inline-flex gap-1 rounded-xl border border-border bg-surface p-1">
      {(["dokploy", "coolify"] as const).map(option => <button key={option} type="button" aria-pressed={platform === option} onClick={() => { setPlatform(option); setCopyState("idle"); }} className={`rounded-lg px-6 py-3 text-sm font-semibold transition ${platform === option ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}>{option === "dokploy" ? "Dokploy" : "Coolify"}</button>)}
    </div>
    <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-7">
      <h3 className="text-lg font-semibold">{de ? `Mit ${name} einrichten` : `Set up with ${name}`}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{de ? "Du importierst eine fertige Vorlage. Du musst keinen Quellcode herunterladen oder die Datenbank selbst installieren." : "Import a ready-made template. You do not need to download source code or install the database yourself."}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="button" onClick={copyTemplate} className="site-button site-button-primary">{copyState === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}{copyState === "copied" ? (de ? "Vorlage kopiert" : "Template copied") : (de ? `${name}-Vorlage kopieren` : `Copy ${name} template`)}</button>
        <a href={dok ? "/install/dokploy.txt" : "/install/coolify.yaml"} download className="site-link"><Download className="size-4" aria-hidden="true" />{de ? "Herunterladen" : "Download"}</a>
      </div>
      <p role="status" className="mt-2 text-sm text-muted">{copyState === "failed" ? (de ? "Kopieren ist im Browser nicht verfügbar. Lade die Vorlage herunter und kopiere ihren gesamten Inhalt." : "Clipboard access is unavailable. Download the template and copy its entire contents.") : copyState === "copied" ? (de ? "Jetzt in deiner Hosting-Plattform einfügen." : "Now paste it into your hosting platform.") : ""}</p>
    </div>
    <ol className="mt-8 space-y-7">{steps.map(([title, text], index) => <li key={title} className="flex gap-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft font-mono text-sm text-brand" aria-hidden="true">{index + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-muted">{text}</p></div></li>)}</ol>
    <div className="mt-8 rounded-xl border border-border p-5 text-sm leading-7 text-muted"><h3 className="font-semibold text-foreground">{de ? "Einmalig: deinen Zugang fertig einrichten" : "One last step: finish setting up your account"}</h3><p className="mt-2">{de ? "Ändere nach der ersten Anmeldung dein Passwort unter Einstellungen → Benutzer. Entferne danach in der Compose-Vorlage die beiden Zeilen BOOTSTRAP_ADMIN_PASSWORD und BOOTSTRAP_ADMIN_PASSWORD_ONCE. Entferne auch den erzeugten Startpasswort-Wert aus der Hosting-Umgebung und deploye noch einmal. Dein Benutzer und dein neues Passwort bleiben erhalten." : "After your first sign-in, change your password under Settings → Users. Then remove the BOOTSTRAP_ADMIN_PASSWORD and BOOTSTRAP_ADMIN_PASSWORD_ONCE lines from the Compose template. Also remove the generated initial-password value from the hosting environment and deploy again. Your user and new password remain intact."}</p><p className="mt-2">{de ? "Datenbankpasswort und AUTH_SECRET bleiben unverändert. Sichere anschließend Datenbank und Upload-Speicher über deine Hosting-Plattform." : "Keep the database password and AUTH_SECRET unchanged. Then set up backups of the database and upload storage in your hosting platform."}</p></div>
  </div>;
}
