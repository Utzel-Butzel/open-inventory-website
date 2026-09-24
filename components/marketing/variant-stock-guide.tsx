import Link from "next/link";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";

const buildExample = `POST /api/v1/resources/{primaryId}/stock/builds
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
Idempotency-Key: <unique-build-key>

{
  "quantity": 1,
  "outputResourceId": "<whiteVariantId>"
}`;
const issueExample = `POST /api/v1/resources/{whiteVariantId}/stock/movements
Authorization: Bearer <API_TOKEN>
Content-Type: application/json
Idempotency-Key: <unique-issue-key>

{
  "delta": -1,
  "type": "issue",
  "note": "Order #1234"
}`;

const copy = {
  de: {
    eyebrow: "Anwendung · Varianten & Fertigung",
    title: "Fertigbestand je Variante führen",
    intro:
      "Jede Variante ist ein eigener Inventareintrag mit eigener Ressourcen-ID, SKU, Barcode und eigenem Bestand. Die Varianten sind mit einem Hauptartikel zu einer Produktfamilie verbunden. So bleiben etwa OpenPaper L Weiß und Schwarz auch nach der Fertigung getrennt buchbar.",
    steps: [
      [
        "1. Varianten und Stücklisten vorbereiten",
        "Lege die Varianten am Hauptartikel an, verbinde vorhandene Einträge oder erzeuge sie aus Optionsgruppen. Varianten übernehmen die Stückliste des Hauptartikels; abweichende Komponenten legst du in der jeweiligen Variante fest, zum Beispiel einen weißen statt eines schwarzen Rahmens.",
      ],
      [
        "2. Zielvariante bauen",
        "Wähle beim Bauen am Hauptartikel unter „Fertigartikel / Zielvariante“ die gewünschte Variante. Das Formular lädt deren Stückliste und Bestandsdaten. Ein Build von einem weißen Gerät verbraucht dessen Platine und weißen Rahmen und erhöht nur den Fertigbestand der weißen Variante. Komponentenverbrauch und Fertigungszugang werden gemeinsam gebucht oder vollständig zurückgerollt.",
      ],
      [
        "3. Fertigartikel ausbuchen",
        "Öffne den Bestand der verkauften Variante und buche dort den Warenausgang. Nur diese Variante verliert Bestand; die Familiensumme sinkt entsprechend. Platine und Rahmen werden dabei nicht noch einmal abgebucht.",
      ],
    ],
    stockTitle: "Einzelbestände, Freibestand und Gesamtsumme",
    stockIntro:
      "Am Hauptartikel siehst du die Varianten mit ihren Einzelbeständen. Die Bestandsansicht zeigt zusätzlich den unzugeordneten Bestand des Hauptartikels und die Summe der Familie. Beispiel nach einem Build der weißen Variante:",
    columns: ["Bestand", "Menge"],
    rows: [
      ["OpenPaper L Weiß", "1"],
      ["OpenPaper L Schwarz", "0"],
      ["Unzugeordnet am Hauptartikel", "2"],
      ["Gesamtbestand", "3"],
    ],
    formula:
      "Gesamtbestand = Summe aller Variantenbestände + unzugeordneter Bestand",
    stockApi:
      "GET /api/v1/resources/{primaryId}/stock liefert family.variants mit quantity je Variante und family.summary mit totalQuantity, variantQuantity und primaryQuantity. resource.quantity bleibt der eigene, unzugeordnete Bestand des Hauptartikels. Zähle ihn nicht erneut zur Familiensumme hinzu. Alle Werte dieser Antwort stammen aus demselben Datenbank-Snapshot. Zum Lesen der Familie brauchst du stock.read-Zugriff auf alle Mitglieder.",
    buildTitle: "Build per API",
    placeholders:
      "Ersetze die Platzhalter durch deine Ressourcen-UUIDs und dein API-Token. Verwende für jeden neuen Vorgang einen eigenen Idempotency-Key; bei einer Wiederholung desselben Requests bleibt der Schlüssel gleich. Beim Build ist dieser Header erforderlich.",
    buildApi:
      "outputResourceId muss die aufgerufene Ressource oder eine ihrer direkten Varianten sein. Alternativ kannst du direkt POST /api/v1/resources/{whiteVariantId}/stock/builds mit quantity aufrufen. Für bewusst unzugeordneten Fertigbestand gibst du die ID des Hauptartikels als outputResourceId an.",
    automatic:
      "Bei einem Aufruf über den Hauptartikel kannst du outputResourceId weglassen, wenn componentResourceSelections die stabile Stücklisten-Slot-ID auf die gewählte Komponenten-ID abbildet und die gesamte resultierende Stückliste genau einer Endproduktvariante entspricht. Gewählte Komponenten müssen die jeweilige Stücklistenkomponente oder eine ihrer direkten Varianten sein. Gibt es keinen oder mehrere Treffer, antwortet die API mit HTTP 422; wähle dann die Zielvariante ausdrücklich.",
    issueTitle: "Warenausgang per API",
    issueApi:
      "Die Varianten-ID steht im Ressourcenpfad. Der Request verwendet delta und type; ein zusätzliches variant_id-Feld oder ein separater Legacy-Varianten-Endpunkt wird nicht verwendet. Ein negativer delta-Wert reduziert den Bestand.",
    policyTitle: "Negativbestand folgt der Organisationseinstellung",
    policy:
      "Ist „Negativbestand erlauben“ ausgeschaltet (allowNegativeStock = false), lehnt die API eine Ausbuchung unter null mit HTTP 409 ab. Ist die Einstellung eingeschaltet, darf Mengenbestand unter null sinken; auch die Familienübersicht zeigt diese negativen Werte. Serialisierte Einheiten benötigen weiterhin konkrete verfügbare Einheiten. Ein bereits negativer Bestand kann bei aktiviertem Schutz durch Zugänge wieder ausgeglichen werden.",
    reference: "Vollständige API-Referenz öffnen",
  },
  en: {
    eyebrow: "Using the app · Variants & assembly",
    title: "Track finished stock per variant",
    intro:
      "Each variant is a full inventory record with its own resource ID, SKU, barcode, and stock. Variants belong to a product family with a primary item. OpenPaper L White and Black therefore remain independently bookable after assembly.",
    steps: [
      [
        "1. Prepare variants and recipes",
        "Create variants on the primary item, connect existing records, or generate configurations from option groups. Variants inherit the primary bill of materials. Define differing components on each variant, such as a white frame replacing the black frame.",
      ],
      [
        "2. Build the output variant",
        "On the primary item’s build form, choose the finished item / output variant. The form loads its bill of materials and stock. Building one white device consumes its PCB and white frame and credits only the white variant’s finished stock. Component consumption and finished output either commit together or roll back completely.",
      ],
      [
        "3. Issue the finished item",
        "Open the sold variant’s stock and book an issue there. Only that variant loses stock, and the family total decreases accordingly. The PCB and frame are not consumed a second time.",
      ],
    ],
    stockTitle: "Variant balances, unassigned stock, and the family total",
    stockIntro:
      "The primary item lists variants with their individual balances. Its stock view also shows unassigned primary stock and the family total. Example after building one white variant:",
    columns: ["Stock", "Quantity"],
    rows: [
      ["OpenPaper L White", "1"],
      ["OpenPaper L Black", "0"],
      ["Unassigned on the primary item", "2"],
      ["Total stock", "3"],
    ],
    formula:
      "Total stock = sum of all variant balances + unassigned primary stock",
    stockApi:
      "GET /api/v1/resources/{primaryId}/stock returns family.variants with each variant’s quantity, plus family.summary containing totalQuantity, variantQuantity, and primaryQuantity. resource.quantity remains the primary item’s own unassigned balance. Do not add it to the family total again. All values in this response use the same database snapshot. Reading the family requires stock.read access to every member.",
    buildTitle: "Build through the API",
    placeholders:
      "Replace placeholders with your resource UUIDs and API token. Use a new Idempotency-Key for each new operation; reuse the same key when retrying the identical request. Builds require this header.",
    buildApi:
      "outputResourceId must identify the requested resource or one of its direct variants. Alternatively, call POST /api/v1/resources/{whiteVariantId}/stock/builds directly with quantity. To deliberately produce unassigned stock, explicitly set outputResourceId to the primary item’s ID.",
    automatic:
      "When calling through the primary item, you may omit outputResourceId if componentResourceSelections maps stable BOM slot IDs to selected component IDs and the complete resulting recipe matches exactly one output variant. Each selected component must be the slot’s component or one of its direct variants. No match or multiple matches return HTTP 422; choose the output explicitly in that case.",
    issueTitle: "Issue through the API",
    issueApi:
      "The resource path contains the variant’s ID. The body uses delta and type; it does not use an additional variant_id field or a separate legacy variant endpoint. A negative delta reduces stock.",
    policyTitle: "Negative stock follows organization policy",
    policy:
      "With “Allow negative stock” off (allowNegativeStock = false), an issue below zero returns HTTP 409. With it on, bulk stock may fall below zero, and the family view includes those negative balances. Serialized stock still requires actual available units. Receipts can recover an existing negative balance even when protection is enabled.",
    reference: "Open the full API reference",
  },
};

function Example({ children }: { children: string }) {
  return (
    <pre className="my-5 overflow-x-auto rounded-2xl bg-[#17181d] p-5 text-xs leading-6 text-white/80">
      <code>{children}</code>
    </pre>
  );
}

export function VariantStockGuide({ locale }: { locale: MarketingLocale }) {
  const text = copy[locale];
  return (
    <section
      id="variant-stock"
      className="min-w-0 scroll-mt-24 border-b border-border py-16"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
        {text.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {text.title}
      </h2>
      <p className="mt-5 text-[15px] leading-7 text-muted">{text.intro}</p>
      <ol className="mt-8 space-y-6">
        {text.steps.map(([title, description]) => (
          <li key={title}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
          </li>
        ))}
      </ol>
      <h3 className="mt-10 text-xl font-semibold">{text.stockTitle}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{text.stockIntro}</p>
      <div className="my-5 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              {text.columns.map((label) => (
                <th key={label} scope="col" className="px-4 py-3">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {text.rows.map(([name, quantity], index) => (
              <tr
                key={name}
                className={`border-t border-border ${index === text.rows.length - 1 ? "font-semibold" : ""}`}
              >
                <th scope="row" className="px-4 py-3 font-[inherit]">
                  {name}
                </th>
                <td className="px-4 py-3 tabular-nums">{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rounded-xl bg-brand-soft p-4 text-sm font-medium">
        {text.formula}
      </p>
      <p className="mt-4 break-words text-sm leading-7 text-muted">
        {text.stockApi}
      </p>
      <h3 className="mt-10 text-xl font-semibold">{text.buildTitle}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{text.placeholders}</p>
      <Example>{buildExample}</Example>
      <p className="text-sm leading-7 text-muted">{text.buildApi}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{text.automatic}</p>
      <h3 className="mt-10 text-xl font-semibold">{text.issueTitle}</h3>
      <Example>{issueExample}</Example>
      <p className="text-sm leading-7 text-muted">{text.issueApi}</p>
      <h3 className="mt-10 text-xl font-semibold">{text.policyTitle}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{text.policy}</p>
      <Link
        href={marketingHref(locale, "/api-docs")}
        className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
      >
        {text.reference}
      </Link>
    </section>
  );
}
