import Link from "next/link";
import type { ReactNode } from "react";
import { CopyInstallCommand } from "@/components/marketing/copy-install-command";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";

export const repositoryUrl = "https://github.com/Utzel-Butzel/inventory";

export function DocSection({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-28 border-b border-border py-12 first:pt-0 last:border-b-0">
    <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
    {intro && <p className="mt-4 text-base leading-7 text-muted">{intro}</p>}
    <div className="mt-6 space-y-6 text-sm leading-7 text-muted">{children}</div>
  </section>;
}

export function DocCode({ code, label, locale = "en" }: { code: string; label: string; locale?: MarketingLocale }) {
  return <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-[#17181d] text-white/85">
    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2 text-xs text-white/70"><span>{label}</span><CopyInstallCommand command={code} ariaLabel={locale === "de" ? "Befehl kopieren" : "Copy command"} copyLabel={locale === "de" ? "Kopieren" : "Copy"} copiedLabel={locale === "de" ? "Kopiert" : "Copied"} /></div>
    <pre className="overflow-x-auto p-4 text-xs leading-6 sm:p-5"><code>{code}</code></pre>
  </div>;
}

export function DocLinks({ links }: { links: Array<[string, string]> }) {
  return <div className="flex flex-wrap gap-x-6 gap-y-2">{links.map(([label, href]) => <Link key={href} href={href} className="site-link">{label} →</Link>)}</div>;
}

export function ApiQuickStart({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const example = `curl 'https://inventory.example.com/api/v1/resources?limit=10' \\\n  -H "Authorization: Bearer $INVENTORY_API_TOKEN"`;
  const rows = de ? [
    ["API-Token", "Inventar, Bestände und Integrationen. Unter Einstellungen → API anlegen und die benötigten Scopes auswählen."],
    ["Browsersitzung", "Drucklisten, gemeinsame Drucker, Druckaufträge und QZ-Signierung. Ein gewöhnliches API-Token ersetzt diese Anmeldung nicht."],
    ["Drucker-Token (iprt_)", "Nur für den Windows-Agenten: Aufträge des zugehörigen Druckers abholen und quittieren."],
  ] : [
    ["API token", "Inventory, stock and integrations. Create one under Settings → API and select the required scopes."],
    ["Browser session", "Saved print lists, shared printers, print jobs and QZ signing. An ordinary API token cannot replace this sign-in."],
    ["Printer token (iprt_)", "For the Windows agent only: claim and acknowledge jobs for its assigned printer."],
  ];
  return <DocSection id="api" title={de ? "API: den ersten Request senden" : "API: send your first request"} intro={de ? "Die API läuft unter /api/v1 auf deiner Anwendungsinstanz. Diese öffentliche Webseite stellt die Referenz bereit." : "The API runs at /api/v1 on your application instance. This public website hosts the reference."}>
    <p>{de ? "Ersetze inventory.example.com durch die Adresse deiner Instanz und setze INVENTORY_API_TOKEN in deiner lokalen Shell. Der folgende Aufruf liest bis zu zehn Einträge; er verändert keine Daten." : "Replace inventory.example.com with your instance address and set INVENTORY_API_TOKEN in your local shell. This request reads up to ten records without changing any data."}</p>
    <DocCode locale={locale} label="GET /api/v1/resources" code={example} />
    <div className="divide-y divide-border rounded-xl border border-border">{rows.map(([title, text]) => <div key={title} className="p-5"><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-1">{text}</p></div>)}</div>
    <p>{de ? "Benutzergebundene Zugänge können über X-Organization-ID eine eigene aktive Mitgliedschaft wählen. Eigenständige API-Token bleiben an ihre Organisation gebunden. Zusätzlich zu Scopes gelten die Berechtigungen des jeweiligen Endpunkts und gegebenenfalls Artikelrechte." : "User-bound credentials can select an active membership with X-Organization-ID. Standalone API tokens remain bound to their issuing organization. Endpoint permissions and, where applicable, item access apply in addition to scopes."}</p>
    <p>{de ? "Bei Endpunkten mit Idempotency-Key bekommt jeder neue Vorgang eine eigene UUID. Wiederhole denselben Request mit demselben Schlüssel. Prüfe bei 409 den Konflikt oder laufenden Auftrag, bei 422 die Eingaben und bei 429 das Ratenlimit. Druckaufträge verwenden stattdessen die UUID im Feld id." : "For endpoints using Idempotency-Key, assign a new UUID to each operation and reuse it only for the same request. For 409, inspect the conflict or running operation; for 422, check the input; for 429, check the rate limit. Print submissions use the UUID in the id field instead."}</p>
    <DocLinks links={[[de ? "Interaktive Referenz" : "Interactive reference", marketingHref(locale, "/api-docs")], ["OpenAPI JSON", "/openapi.json"], ["OpenAPI YAML", "/openapi.yaml"]]} />
  </DocSection>;
}

export function PrintingGuide({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const methods = de ? [
    { title: "Browser-Druckdialog", text: "Für vorhandene Drucker und andere Etikettenformate. Wähle den Drucker im Systemdialog, stelle die passende Papiergröße und 100 % Skalierung ein und prüfe ein Testetikett.", setup: "Benötigt einen auf diesem Rechner eingerichteten Drucker." },
    { title: "Brother PT-P710BT · QZ Tray", text: "Direkter USB-Druck vom Desktop-Browser. QZ Tray läuft auf demselben Rechner wie Browser und Drucker. Bandbreite auswählen, QZ verbinden und die passende Druckerwarteschlange wählen.", setup: "Die Einrichtung der dedizierten Warteschlange für macOS ist unten verlinkt. Ohne Signatur fragt QZ bei Zugriffen nach Zustimmung." },
    { title: "Gemeinsamer Bürodrucker", text: "Ein Windows-PC nimmt die Aufträge über den Druckagenten entgegen und druckt am angeschlossenen PT-P710BT. Andere Nutzer senden über die Web-App; auf ihren Geräten ist kein QZ Tray nötig.", setup: "Der Drucker-PC muss eingeschaltet, wach und online sein. Die Einrichtung unterstützt derzeit 24-mm-Band." },
  ] : [
    { title: "Browser print dialog", text: "For installed printers and other label formats. Choose the printer in the system dialog, select the matching paper size and 100% scale, then check a test label.", setup: "Requires a printer configured on this computer." },
    { title: "Brother PT-P710BT · QZ Tray", text: "Direct USB printing from a desktop browser. QZ Tray runs on the same computer as the browser and printer. Select the loaded tape width, connect QZ and choose the correct print queue.", setup: "The dedicated macOS queue setup is linked below. Without signing, QZ asks for approval when accessed." },
    { title: "Shared Office printer", text: "A Windows PC receives jobs through the print agent and sends them to its connected PT-P710BT. Other users submit through the web app without installing QZ Tray on their devices.", setup: "The printer PC must stay awake and online. Setup currently supports 24 mm tape." },
  ];
  const steps = de ? [
    ["Artikel oder Einzelgerät wählen", "Öffne Etiketten oder den Druckzugang am Artikel. Bei serialisiertem Bestand kannst du einzelne Einheiten wählen. Ihr QR-Code öffnet genau diese Einheit; eine umbenannte Kennung ändert den Link nicht."],
    ["Vorlage gestalten", "Lege Maße fest und ordne QR-Code, Barcode, Bilder und Text an. Mehrere Textfelder, Untertitel, Schriftarten, Ausrichtung, Bildzuschnitt und invertierter Druck sind verfügbar. Ein Textfeld kann die Etikettenlänge automatisch an seinen Inhalt anpassen."],
    ["Text und Kopien prüfen", "Passe Titel oder Untertitel nur für den Druck an; der Artikel bleibt unverändert. Wähle die Kopienzahl. Einen Entwurf kannst du testdrucken und anschließend als eigene Vorlage oder Kopie speichern."],
    ["Druckliste vorbereiten", "Für P-touch und den gemeinsamen Drucker kannst du mehrere Artikel und Vorlagen sammeln. Vorschau, Text und Druckdaten werden gemeinsam gespeichert. Die persönliche Liste bleibt je Organisation nach dem Neuladen erhalten; spätere Vorlagenänderungen verändern vorbereitete Etiketten nicht."],
    ["Serie drucken", "Alle Etiketten einer Serie brauchen dieselbe Bandbreite. Unterschiedliche Längen und Layouts sind möglich. Maximal 100 Etiketten und 4 MB Druckdaten pro Auftrag. Druckliste prüfen und an das gewählte Ziel senden."],
  ] : [
    ["Choose an item or individual unit", "Open Labels or the print shortcut on an item. For serialized stock, select individual units. Their QR codes open that exact unit; renaming its code does not change the link."],
    ["Design a template", "Set the dimensions and position QR codes, barcodes, images and text. Use multiple text fields, subtitles, fonts, alignment, image cropping and inverted printing. One text field can automatically adjust the label length to its content."],
    ["Check text and copies", "Override a title or subtitle for printing without changing the item. Set the copy count. Test-print a draft, then save it as a template or a separate copy."],
    ["Prepare a print list", "For P-touch and shared printing, collect items using different templates. Preview, text and print data are saved together. Your personal list is stored per organization and survives reloads; later template edits do not change prepared labels."],
    ["Print the series", "Every label in a series needs the same tape width; lengths and layouts may differ. Each job supports up to 100 labels and 4 MB of print data. Review the list and send it to the selected destination."],
  ];
  return <DocSection id="printing" title={de ? "Etiketten gestalten und drucken" : "Design and print labels"} intro={de ? "Wähle den Druckweg passend zum Arbeitsplatz. Vorlagen und vorbereitete Etiketten verwendest du direkt in der Web-App." : "Choose a print destination for your workspace. Design templates and prepare labels in the web app."}>
    <div className="space-y-3">{methods.map(method => <article key={method.title} className="rounded-xl border border-border bg-surface p-5"><h3 className="text-lg font-semibold text-foreground">{method.title}</h3><p className="mt-2">{method.text}</p><p className="mt-2 text-xs leading-6">{method.setup}</p></article>)}</div>
    <ol className="space-y-5">{steps.map(([title, text], i) => <li key={title} className="flex gap-4"><span className="font-mono text-brand">{i + 1}.</span><div><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-1">{text}</p></div></li>)}</ol>
    <details id="shared-printer" className="scroll-mt-28 rounded-xl border border-border p-5">
      <summary className="cursor-pointer font-semibold text-foreground">{de ? "Gemeinsamen Drucker einrichten" : "Set up a shared printer"}</summary>
      <ol className="mt-4 list-decimal space-y-3 pl-5">
        <li>{de ? "Am Windows-PC eine dedizierte Warteschlange „Generic / Text Only“ mit dem USB-Port des PT-P710BT und RAW/winprint einrichten. 24-mm-Band einlegen." : "On the Windows PC, create a dedicated Generic / Text Only queue on the PT-P710BT USB port with RAW/winprint. Load 24 mm tape."}</li>
        <li>{de ? "Mit tokens.manage in der Web-App den gemeinsamen Drucker anlegen und config.json herunterladen. Die Datei enthält den Zugang für diesen Drucker und gehört nur auf den Drucker-PC." : "With tokens.manage, create the shared printer in the web app and download config.json. This file grants access to that printer and belongs only on the printer PC."}</li>
        <li>{de ? "config.json und die beiden PowerShell-Skripte aus scripts/print-agent zusammen ablegen. Install-InventoryPrintAgent.ps1 mit Administratorrechten gemäß der lokalen PowerShell-Richtlinie ausführen." : "Place config.json beside both PowerShell scripts from scripts/print-agent. Run Install-InventoryPrintAgent.ps1 as an administrator under your local PowerShell policy."}</li>
        <li>{de ? "Der Installer richtet eine beim Systemstart laufende Aufgabe ein. In der Web-App auf „Online“ warten und ein Testetikett drucken. Es ist keine eingehende Firewall-Freigabe nötig." : "The installer creates a task that runs at startup. Wait for Online in the web app, then print a test label. No inbound firewall rule is needed."}</li>
      </ol>
      <div className="mt-4"><DocLinks links={[[de ? "Installation und Wartung" : "Installation and maintenance", `${repositoryUrl}/tree/main/scripts/print-agent`]]} /></div>
    </details>
    <details className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold text-foreground">{de ? "QZ Tray einrichten und optional signieren" : "Set up QZ Tray and optional signing"}</summary>
      <p className="mt-4">{de ? "QZ Tray installieren, den PT-P710BT per USB verbinden und die dedizierte Warteschlange nach der Anleitung einrichten. Die ausgewählte Bandbreite muss dem eingelegten Band entsprechen. Bei 24-mm-Band beträgt die bedruckbare Höhe etwa 18 mm; starte mit der passenden P-touch-Vorlage." : "Install QZ Tray, connect the PT-P710BT by USB and create the dedicated queue using the linked guide. The selected tape width must match the loaded tape. On 24 mm tape the printable height is about 18 mm; start with the matching P-touch preset."}</p>
      <p className="mt-3">{de ? "Optional kann der Server QZ-Anfragen mit einem auf dem Druckrechner vertrauten Zertifikat signieren. Setze QZ_CERTIFICATE_PATH und QZ_PRIVATE_KEY_PATH oder die entsprechenden _BASE64-Variablen. Der private Schlüssel bleibt ausschließlich auf dem Server." : "Optionally, the server can sign QZ requests using a certificate trusted on the printing computer. Set QZ_CERTIFICATE_PATH and QZ_PRIVATE_KEY_PATH, or their _BASE64 equivalents. Keep the private key on the server only."}</p>
      <div className="mt-4"><DocLinks links={[[de ? "USB-Einrichtung und Bandformate" : "USB setup and tape formats", `${repositoryUrl}/blob/main/docs/ptouch-printing.md`]]} /></div>
    </details>
    <div className="border-l-2 border-brand pl-5"><h3 className="font-semibold text-foreground">{de ? "Auftrag angenommen, aber kein Etikett?" : "Job accepted, but no label?"}</h3><p className="mt-2">{de ? "Die Annahme durch QZ oder Windows bestätigt noch keinen physischen Druck. Prüfe Strom, Band und die Warteschlange am Druckrechner. Bei „Ergebnis unklar“ zuerst die tatsächliche Ausgabe prüfen, bevor du erneut sendest. Wartende eigene Aufträge am gemeinsamen Drucker lassen sich abbrechen; sie verfallen nach zehn Minuten." : "Acceptance by QZ or Windows does not confirm physical printing. Check power, tape and the queue on the printer computer. For Outcome uncertain, inspect the actual output before resubmitting. You can cancel your own waiting shared-printer jobs; they expire after ten minutes."}</p></div>
    <p>{de ? "Die Druckfunktionen benötigen labels.read und eine Browsersitzung. Vorlagen speichern und ändern erfordert labels.manage, gemeinsame Drucker verwalten tokens.manage. Drucklisten, Drucker und Aufträge sind in der API-Referenz unter Label printing beschrieben." : "Printing requires labels.read and a browser session. Saving and editing templates requires labels.manage; managing shared printers requires tokens.manage. Saved lists, printers and jobs are documented under Label printing in the API reference."}</p>
    <details className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold text-foreground">{de ? "So läuft ein Auftrag durch die Druck-API" : "How a job moves through the printing API"}</summary>
      <ol className="mt-4 list-decimal space-y-3 pl-5">
        <li>{de ? "Vorlagen über /label-setups lesen. Der Browser rendert daraus Etiketten und prüft QR-Code und Bandformat. /label-workspace speichert die vorbereitete persönliche Liste." : "Read templates from /label-setups. The browser renders the labels and checks QR readability and tape fit. /label-workspace stores the prepared personal list."}</li>
        <li>{de ? "POST /label-print-jobs erhält id, printerId, tape und labels. labels enthält Base64-codierte P-touch-Rasterdaten, keine PNG-Bilder. Für denselben Auftrag dieselbe id wiederverwenden." : "POST /label-print-jobs accepts id, printerId, tape and labels. labels contains base64-encoded P-touch raster data, not PNG images. Reuse the same id for the same submission."}</li>
        <li>{de ? "Der Windows-Agent holt mit seinem Drucker-Token über /label-print-agent/claim einen Auftrag ab und quittiert ihn über /label-print-agent/ack. Der normale API-Token ist dafür nicht gültig." : "The Windows agent uses its printer token to retrieve a job from /label-print-agent/claim and acknowledge it through /label-print-agent/ack. An ordinary API token is not valid here."}</li>
        <li>{de ? "GET /label-print-jobs zeigt die letzten eigenen Aufträge. queued heißt wartend, claimed abgeholt, submitted an Windows übergeben. failed meldet einen Fehler, uncertain einen unklaren Ausgang. uncertain wird nicht automatisch erneut gedruckt." : "GET /label-print-jobs lists your latest jobs. queued means waiting, claimed means retrieved and submitted means accepted by Windows. failed indicates a failure; uncertain indicates an ambiguous outcome and is never automatically reprinted."}</li>
      </ol>
      <p className="mt-4">{de ? "Alle Pfade liegen unter /api/v1. Beim lokalen QZ-Druck geht der Auftrag direkt vom Browser an QZ Tray; die Server-Endpunkte /labels/qz-certificate und /labels/qz-sign dienen nur der optionalen Signierung." : "All paths are under /api/v1. With local QZ printing, the browser sends the job directly to QZ Tray; the server endpoints /labels/qz-certificate and /labels/qz-sign only provide optional signing."}</p>
    </details>
    <DocLinks links={[[de ? "Druck-API öffnen" : "Open the printing API", marketingHref(locale, "/api-docs")], [de ? "Produkt: Etiketten und API" : "Product: labels and API", marketingHref(locale, "/features/labels-api")]]} />
  </DocSection>;
}

export function PlanningGuide({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const entries = de ? [
    ["Bestandsprognose", "Pflege Mindestbestand, Lieferzeit und Bestelleinheit. Die Planung verwendet Verbrauch, Bestand und offene Wareneingänge, zeigt historische und erwartete Verläufe und schlägt Nachbestellmengen vor. Ausleihen und Umlagerungen gelten nicht als Verbrauch. Die Vorschläge lösen keine Bestellung aus."],
    ["Stücklistenanalyse", "Vergleiche Produktionsmengen und Varianten anhand ihrer Komponenten, Bestände, Kosten und Abhängigkeiten. Fehlende Preise werden als unbekannt ausgewiesen. Die Analyse bucht nichts; Komponenten werden erst beim bestätigten Bau verbraucht."],
    ["Einzelgeräte", "Kennungen lassen sich nachträglich ändern und einzeln etikettieren. UUID und QR-Link bleiben dabei erhalten. Nur Einheiten ohne Verknüpfung zu Aufträgen, Zuweisungen oder Baugruppen können gelöscht werden; der Vorgang wird in der Historie erfasst."],
    ["Mengen per Foto", "In Bestandsbuchung oder Inventur öffnet „Menge per Foto“ die Zählhilfe. Neben sichtbaren Einzelteilen gibt es eine experimentelle Schätzung für Kisteninhalte aus drei bis fünf Fotos. Ergebnis und Annahmen prüfen, die Menge ins Formular übernehmen und die Buchung separat bestätigen."],
    ["3D-Schätzung · experimentell", "Drei bis vier Fotos und manuelle Markierungen erzeugen ein drehbares 3D-Modell und gegebenenfalls eine Mengenschätzung. Der Server braucht eine separat eingerichtete Python-/GPU-Umgebung; das Standard-Docker-Image enthält sie nicht. Die Genauigkeit ist nicht validiert. Ein Ergebnis kann ohne übernehmbare Menge bleiben."],
  ] : [
    ["Stock forecasting", "Set minimum stock, lead time and purchasing units. Planning uses consumption, current stock and outstanding receipts to show historical and projected balances and suggest replenishment quantities. Loans and transfers are not consumption. Suggestions do not place orders."],
    ["Bill-of-materials analysis", "Compare production quantities and variants by components, stock, costs and dependencies. Missing prices appear as unknown. Analysis does not book stock; components are consumed only when a build is confirmed."],
    ["Individual units", "Edit unit identifiers and print their own labels while keeping their UUIDs and QR links. Only units unlinked to orders, assignments or assemblies can be deleted; deletion is recorded in the movement history."],
    ["Quantities from photos", "In a stock movement or inventory count, open Quantity from photo. Alongside visible-part counting, an experimental mode estimates bin contents from three to five photos. Review the result and assumptions, copy the quantity into the form, then confirm the stock booking separately."],
    ["3D estimation · experimental", "Three to four photos and manual annotations produce a rotatable 3D model and, where possible, a quantity estimate. The server needs a separately configured Python/GPU runtime, absent from the standard Docker image. Accuracy is not validated; a result may provide no applicable count."],
  ];
  return <DocSection id="planning" title={de ? "Bestände planen und Mengen prüfen" : "Plan stock and review quantities"}>
    {entries.map(([title, text]) => <div key={title}><h3 className="text-lg font-semibold text-foreground">{title}</h3><p className="mt-2">{text}</p></div>)}
    <p>{de ? "GET /api/v1/stock/forecast liefert die Planungsdaten und historische Bestände; die Oberfläche berechnet daraus die Prognose. Die experimentellen Zählendpunkte /ai/count/bulk und /ai/count/3d benötigen ai.count und Artikelzugriff. Keiner dieser Aufrufe verändert den Bestand." : "GET /api/v1/stock/forecast returns planning inputs and historical balances; the interface calculates the forecast. The experimental /ai/count/bulk and /ai/count/3d endpoints require ai.count and item access. None of these requests changes stock."}</p>
    <DocLinks links={[[de ? "3D-Umgebung einrichten" : "Set up the 3D runtime", `${repositoryUrl}/tree/main/services/bulk-3d`], [de ? "Grenzen der Mengenschätzung" : "Quantity estimation limits", `${repositoryUrl}/blob/main/docs/bulk-quantity-estimation.md`]]} />
  </DocSection>;
}
