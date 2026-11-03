"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeftRight, Boxes, Box, Braces, Camera, CalendarRange,
  ClipboardCheck, FileSpreadsheet, GitBranch, ImageIcon, Layers3, ListTree,
  MapPinned, MapPin, PackageSearch, QrCode, ScanLine, Search, Server,
  ShieldCheck, SlidersHorizontal, Sparkles, Store, TrendingUp, Users,
  Barcode, ChevronDown, CircleDollarSign, Database, FileText, Fingerprint,
  GitFork, Github, Globe2, Heart, History, KeyRound, Languages, Link2,
  ListChecks, PackageCheck, PackageOpen, Printer, ShoppingCart, Smartphone,
  Tags, Truck, WifiOff,
  type LucideIcon,
} from "lucide-react";

import type { FeatureSlug } from "@/app/features/features";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./feature-explorer.module.css";

type Localized = Record<MarketingLocale, string>;
type Feature = {
  id: string;
  group: FeatureSlug;
  icon: LucideIcon;
  title: Localized;
  description: Localized;
  detailGroup?: FeatureSlug;
};

const groups: { id: FeatureSlug; label: Localized }[] = [
  { id: "erfassen", label: { de: "Erfassen", en: "Capture" } },
  { id: "strukturieren", label: { de: "Organisieren", en: "Organise" } },
  { id: "bestand-ausleihe", label: { de: "Bestand & Ausleihe", en: "Stock & lending" } },
  { id: "orte-raeume", label: { de: "Orte & Räume", en: "Locations" } },
  { id: "labels-api", label: { de: "Drucken & Anbinden", en: "Print & connect" } },
  { id: "betrieb-sicherheit", label: { de: "Betrieb & Team", en: "Hosting & team" } },
];

const features: Feature[] = [
  { id: "photo", group: "erfassen", icon: Camera,
    title: { de: "KI-Fotoerfassung", en: "AI photo capture" },
    description: { de: "Fotografiere einen Gegenstand und lass die optionale KI Titel und Beschreibung vorschlagen. Du prüfst und ergänzt den Entwurf.", en: "Photograph an item and let optional AI suggest a title and description. Review and complete the draft." } },
  { id: "labels", group: "labels-api", icon: QrCode,
    title: { de: "QR-Etiketten", en: "QR labels" },
    description: { de: "Gestalte eigene Etiketten für Artikel und Einzelgeräte. Ein Scan führt direkt zum passenden Inventareintrag.", en: "Design labels for items and individual units. Scan a code to open the matching inventory record." } },
  { id: "loans", group: "bestand-ausleihe", icon: ArrowLeftRight,
    title: { de: "Ausleihen & Rückgaben", en: "Loans & returns" },
    description: { de: "Verwalte Ausleihen mit mehreren Positionen, Kontakten und Fälligkeiten und dokumentiere auch Teilrückgaben.", en: "Manage multi-item loans with contacts and due dates, and record partial returns too." } },
  { id: "locations", group: "orte-raeume", icon: MapPin,
    title: { de: "Lagerorte", en: "Storage locations" },
    description: { de: "Ordne Dinge einem Raum, Schrank oder Fahrzeug zu. So wird aus „irgendwo im Lager“ ein konkreter Fundort.", en: "Assign items to a room, cabinet or vehicle. Turn ‘somewhere in storage’ into a location you can find." } },
  { id: "fields", group: "strukturieren", icon: SlidersHorizontal,
    title: { de: "Eigene Felder", en: "Custom fields" },
    description: { de: "Ergänze die Angaben, die dein Bestand braucht: etwa Zustand, technische Daten oder interne Kennungen.", en: "Add the details your inventory needs, such as condition, technical specifications or internal identifiers." } },
  { id: "counts", group: "bestand-ausleihe", icon: ClipboardCheck,
    title: { de: "Inventur", en: "Stocktaking" },
    description: { de: "Zähle Bestände in Inventurzyklen und gleiche die erfassten Mengen mit dem tatsächlichen Bestand ab.", en: "Count stock in inventory cycles and reconcile recorded quantities with what is actually on the shelf." } },
  { id: "forecast", group: "bestand-ausleihe", icon: TrendingUp,
    title: { de: "Bestandsprognosen", en: "Stock forecasts" },
    description: { de: "Plane Nachbestellungen anhand von Verbrauch, Lieferzeit und Mindestbestand, bevor Material knapp wird.", en: "Plan reorders using consumption, lead times and minimum stock levels before supplies run low." } },
  { id: "api", group: "labels-api", icon: Braces,
    title: { de: "REST-API", en: "REST API" },
    description: { de: "Verbinde eigene Systeme über die dokumentierte API. Zugriffe lassen sich mit widerrufbaren, eingeschränkten Tokens steuern.", en: "Connect your own systems through the documented API. Control access with revocable, scoped tokens." } },
  { id: "rooms", group: "orte-raeume", icon: ScanLine,
    title: { de: "3D-Raumscans", en: "3D room scans" },
    description: { de: "Erfasse Räume mit einem LiDAR-fähigen iPhone und erkunde die Raumstruktur anschließend im Web-Viewer.", en: "Scan rooms with a LiDAR-equipped iPhone, then explore the room structure in the web viewer." } },
  { id: "shop", group: "labels-api", icon: Store,
    title: { de: "WooCommerce", en: "WooCommerce" },
    description: { de: "Gleiche Shop-Bestellungen per SKU mit deinem Mengenbestand ab – einschließlich Rückerstattungen und Stornos.", en: "Reconcile shop orders with your stock by SKU, including refunds and cancellations." } },
  { id: "assemblies", group: "bestand-ausleihe", icon: ListTree,
    title: { de: "Stücklisten", en: "Bills of materials" },
    description: { de: "Bilde Baugruppen mit ihren Bestandteilen ab und behalte die zugehörigen Mengen und Materialkosten im Blick.", en: "Model assemblies and their components, keeping track of quantities and material costs." } },
  { id: "permissions", group: "betrieb-sicherheit", icon: ShieldCheck,
    title: { de: "Rollen & Rechte", en: "Roles & permissions" },
    description: { de: "Lege fest, wer Inventar ansehen, bearbeiten oder verwalten darf. Rechte gelten im jeweiligen Arbeitsbereich.", en: "Define who can view, edit or manage inventory. Permissions apply within each workspace." } },
  { id: "batch", group: "erfassen", icon: Layers3,
    title: { de: "Serienerfassung", en: "Batch capture" },
    description: { de: "Fotografiere mehrere Dinge nacheinander. Standort und Typ legst du einmal für die ganze Serie fest.", en: "Photograph items in sequence. Set the location and type once for the whole batch." } },
  { id: "cutout", group: "erfassen", icon: ImageIcon,
    title: { de: "Bilder freistellen", en: "Background removal" },
    description: { de: "Lass die optionale KI aus einem Werkstattfoto ein klares Titelbild machen. Das Original bleibt erhalten.", en: "Let optional AI turn a workshop photo into a clear cover image. The original stays available." } },
  { id: "research", group: "erfassen", icon: Sparkles,
    title: { de: "Produktrecherche", en: "Product research" },
    description: { de: "Lass die KI fehlende Produktdetails recherchieren und prüfe die Ergebnisse, bevor du sie übernimmst.", en: "Let AI research missing product details and review the findings before adding them to the record." } },
  { id: "variants", group: "strukturieren", icon: GitBranch,
    title: { de: "Varianten & Optionen", en: "Variants & options" },
    description: { de: "Verbinde Einträge zu Variantenfamilien oder erstelle Konfigurationen aus Optionen – mit eigenem Bestand je Variante.", en: "Connect records into variant families or build configurations from options, with separate stock for each variant." } },
  { id: "search", group: "strukturieren", icon: Search,
    title: { de: "Suche & Filter", en: "Search & filters" },
    description: { de: "Finde Dinge über Name, Stichwort oder Standort und bearbeite mehrere passende Einträge gemeinsam.", en: "Find items by name, keyword or location and edit multiple matching records together." } },
  { id: "calendar", group: "bestand-ausleihe", icon: CalendarRange,
    title: { de: "Anfragen & Kalender", en: "Requests & calendar" },
    description: { de: "Plane Bedarf, genehmige Anfragen und reserviere Geräte. Der Kalender zeigt kommende Belegungen.", en: "Plan demand, approve requests and reserve equipment. See upcoming bookings in the calendar." } },
  { id: "map", group: "orte-raeume", icon: MapPinned,
    title: { de: "Karten & Flächen", en: "Maps & areas" },
    description: { de: "Markiere Standorte auf einer Karte und zeichne Flächen für Gebäude oder Lagerbereiche ein.", en: "Mark locations on a map and draw areas for buildings or storage zones." } },
  { id: "containers", group: "orte-raeume", icon: Box,
    title: { de: "Räume & Behälter", en: "Rooms & containers" },
    description: { de: "Verbinde Gebäude, Räume, Schränke und Kisten zu einer nachvollziehbaren Standortstruktur.", en: "Connect buildings, rooms, cabinets and bins into a location structure you can follow." } },
  { id: "csv", group: "labels-api", icon: FileSpreadsheet,
    title: { de: "CSV-Import & -Export", en: "CSV import & export" },
    description: { de: "Übernimm vorhandene Listen als CSV und exportiere deinen Bestand für die Weiterverarbeitung in anderen Programmen.", en: "Bring in existing lists as CSV and export your inventory for use in other applications." } },
  { id: "hosting", group: "betrieb-sicherheit", icon: Server,
    title: { de: "Selbst hosten", en: "Self-hosting" },
    description: { de: "Betreibe Open Inventory mit Docker auf deinem eigenen Server und verwalte Daten, Backups und Updates selbst.", en: "Run Open Inventory with Docker on your own server and manage your data, backups and updates." } },
  { id: "organisations", group: "betrieb-sicherheit", icon: Users,
    title: { de: "Mehrere Organisationen", en: "Multiple organisations" },
    description: { de: "Trenne Bestände, Mitgliedschaften und Berechtigungen in eigenen Arbeitsbereichen innerhalb einer Installation.", en: "Separate inventories, memberships and permissions into workspaces within a single installation." } },
  { id: "ai-control", group: "betrieb-sicherheit", icon: PackageSearch,
    title: { de: "KI nach Bedarf", en: "AI on your terms" },
    description: { de: "Nutze die Inventarverwaltung auch ohne KI. Bei aktivierter KI kannst du geschätzte Kosten verfolgen und ein Monatslimit setzen.", en: "Use inventory management without AI, or enable it with estimated cost tracking and a monthly spending limit." } },
  { id: "photo-count", group: "erfassen", icon: ScanLine,
    title: { de: "Mengen aus Fotos zählen", en: "Count parts from photos" },
    description: { de: "Die optionale Fotozählung markiert gleichartige Teile und schlägt eine Menge vor. Du prüfst und korrigierst sie vor der Bestandsbuchung.", en: "Optional photo counting marks similar parts and suggests a quantity. Review and correct it before recording a stock movement." } },
  { id: "attachments", group: "erfassen", icon: FileText,
    title: { de: "Fotos & Anleitungen", en: "Photos & manuals" },
    description: { de: "Hinterlege weitere Fotos, Videos, PDF-Anleitungen und 3D-Dateien direkt am Gegenstand.", en: "Keep additional photos, videos, PDF manuals and 3D files directly with the item." } },
  { id: "iphone-capture", group: "erfassen", icon: Smartphone,
    title: { de: "Mobile Erfassung", en: "Mobile capture" },
    description: { de: "Fotografiere und scanne mit der nativen iPhone-App direkt am Regal. Unterbrochene Uploads lassen sich fortsetzen.", en: "Photograph and scan at the shelf with the native iPhone app. Interrupted uploads can resume." } },
  { id: "bin-estimates", group: "erfassen", icon: Boxes,
    title: { de: "Kistenschätzung · experimentell", en: "Bin estimates · experimental" },
    description: { de: "Schätze Mengen aus mehreren Fotos. Die Genauigkeit ist nicht validiert; Buchungen bestätigst du separat. Der optionale 3D-Modus benötigt eine eigene GPU-Umgebung.", en: "Estimate quantities from multiple photos. Accuracy is not validated and stock bookings require separate confirmation. Optional 3D mode needs a dedicated GPU runtime." } },
  { id: "types", group: "strukturieren", icon: Tags,
    title: { de: "Eigene Inventartypen", en: "Custom inventory types" },
    description: { de: "Nutze vorhandene Typen für Werkzeug, Möbel, Fahrzeuge oder Projekte und ergänze eigene Typen für deinen Bestand.", en: "Use built-in types for tools, furniture, vehicles or projects and add your own inventory types." } },
  { id: "relations", group: "strukturieren", icon: Link2,
    title: { de: "Inhalt & Zubehör", en: "Contents & accessories" },
    description: { de: "Verknüpfe eine Kiste mit ihrem Inhalt oder eine Maschine mit Zubehör und Ersatzteilen. Die Beziehungen bleiben direkt am Eintrag sichtbar.", en: "Link a bin to its contents or a machine to accessories and spare parts. Keep those relationships with the record." } },
  { id: "languages", group: "strukturieren", icon: Languages,
    title: { de: "Mehrsprachige Inhalte", en: "Multilingual content" },
    description: { de: "Pflege Titel und Beschreibungen in mehreren Sprachen. Optionale KI-Übersetzungen kannst du anschließend bearbeiten.", en: "Maintain titles and descriptions in multiple languages. Review and edit optional AI translations." } },
  { id: "favorites", group: "strukturieren", icon: Heart,
    title: { de: "Favoriten", en: "Favourites" },
    description: { de: "Markiere häufig benötigte Einträge als Favoriten und rufe sie in deiner persönlichen Übersicht wieder auf.", en: "Mark frequently used records as favourites and find them in your personal overview." } },
  { id: "bulk-edit", group: "strukturieren", icon: ListChecks,
    title: { de: "Mehrfachbearbeitung", en: "Bulk editing" },
    description: { de: "Wähle mehrere Einträge aus und ändere gemeinsame Felder oder Schlagwörter in einem Schritt.", en: "Select multiple records and update shared fields or tags in one step." } },
  { id: "duplicates", group: "strukturieren", detailGroup: "labels-api", icon: Fingerprint,
    title: { de: "Dubletten zusammenführen", en: "Merge duplicates" },
    description: { de: "Finde ähnliche Inventareinträge und führe sie gemeinsam mit ihren zugehörigen Daten zusammen.", en: "Find similar inventory records and merge them together with their associated data." } },
  { id: "purchases", group: "bestand-ausleihe", icon: ShoppingCart,
    title: { de: "Einkäufe & Bestellungen", en: "Purchases & orders" },
    description: { de: "Erfasse Bestellungen mit Lieferanten, Positionen, Mengen und Preisen und behalte offene Lieferungen im Blick.", en: "Record orders with suppliers, line items, quantities and prices, and track outstanding deliveries." } },
  { id: "sales", group: "bestand-ausleihe", icon: Store,
    title: { de: "Verkäufe", en: "Sales" },
    description: { de: "Verwalte Verkäufe mit Kunden, Positionen und Preisen als zusammenhängenden Vorgang mit Bestandsbuchungen.", en: "Manage sales with customers, line items and prices in one operation with associated stock movements." } },
  { id: "receipts", group: "bestand-ausleihe", icon: Truck,
    title: { de: "Wareneingang & Teillieferung", en: "Receipts & partial deliveries" },
    description: { de: "Buche eingetroffene Mengen, auch wenn eine Bestellung nur teilweise geliefert wird. Offene Mengen bleiben nachvollziehbar.", en: "Record received quantities even when an order arrives in parts. Keep track of what is still outstanding." } },
  { id: "serials", group: "bestand-ausleihe", icon: Barcode,
    title: { de: "Seriennummern & Einzelgeräte", en: "Serial numbers & units" },
    description: { de: "Führe Geräte einzeln mit Seriennummer, Zustand und Standort. Jedes Gerät kann ein eigenes Etikett erhalten.", en: "Track each device by serial number, condition and location. Give individual units their own labels." } },
  { id: "movements", group: "bestand-ausleihe", icon: History,
    title: { de: "Bewegungshistorie", en: "Movement history" },
    description: { de: "Verfolge Zugänge, Abgänge, Korrekturen und Transfers mit Datum. Auch Bestandskorrekturen bleiben in der Historie sichtbar.", en: "Track dated receipts, issues, corrections and transfers. Stock adjustments remain visible in the history." } },
  { id: "transfers", group: "bestand-ausleihe", icon: ArrowLeftRight,
    title: { de: "Umlagerungen", en: "Stock transfers" },
    description: { de: "Sieh Mengen je Raum, Schrank oder Fahrzeug und buche einen Transfer, wenn Material den Lagerort wechselt.", en: "See quantities per room, cabinet or vehicle and record transfers when supplies change location." } },
  { id: "costs", group: "bestand-ausleihe", icon: CircleDollarSign,
    title: { de: "Bestands- & Materialkosten", en: "Stock & material costs" },
    description: { de: "Speichere Preise an Warenbewegungen und verfolge die damit verbundenen Bestands- und Materialkosten.", en: "Store prices on stock movements and track the associated inventory and material costs." } },
  { id: "packaging", group: "bestand-ausleihe", icon: PackageOpen,
    title: { de: "Verpackungseinheiten", en: "Packaging units" },
    description: { de: "Rechne eingekaufte Rollen, Kartons oder Kanister in die Basiseinheit um, in der du Material verbrauchst.", en: "Convert purchased rolls, boxes or canisters into the base unit you use to track consumption." } },
  { id: "assembly-planning", group: "bestand-ausleihe", icon: PackageCheck,
    title: { de: "Baugruppenplanung", en: "Assembly planning" },
    description: { de: "Prüfe Komponentenbedarf, Produktionsmengen, Varianten und Kosten vor der Montage. Fehlende Preise werden als unbekannt ausgewiesen.", en: "Check component requirements, production quantities, variants and costs before assembly. Missing prices remain marked as unknown." } },
  { id: "spatial-assignment", group: "orte-raeume", icon: GitFork,
    title: { de: "Automatische Ortszuordnung", en: "Automatic location mapping" },
    description: { de: "Ordne Gegenstände anhand ihres Kartenpunkts automatisch einem eingezeichneten Bereich zu. Manuelle Zuordnungen haben Vorrang.", en: "Assign items to a mapped area based on their coordinates. Manual assignments take priority." } },
  { id: "room-viewer", group: "orte-raeume", icon: Box,
    title: { de: "Räume in 3D erkunden", en: "Explore rooms in 3D" },
    description: { de: "Öffne gescannte Räume im Browser und suche darin nach Inventareinträgen. Optional sind fotorealistisch aufbereitete Ansichten möglich.", en: "Open scanned rooms in the browser and find inventory within them. Photorealistic views are optionally available." } },
  { id: "room-photos", group: "orte-raeume", icon: ImageIcon,
    title: { de: "Raumfotos & Platzierung", en: "Room photos & placement" },
    description: { de: "Lass ausgewählte Raumfotos optional analysieren. Erkannte Objekte und geschätzte Positionen prüfst du vor der Übernahme.", en: "Optionally analyse selected room photos. Review detected objects and estimated positions before adding them." } },
  { id: "label-templates", group: "labels-api", icon: SlidersHorizontal,
    title: { de: "Eigene Etikettenvorlagen", en: "Custom label templates" },
    description: { de: "Gestalte Etiketten mit Namen, Codes und weiteren Angaben im Browser und speichere die Vorlage für spätere Druckaufträge.", en: "Design labels with names, codes and other details in the browser and save templates for future print jobs." } },
  { id: "print-lists", group: "labels-api", icon: ListChecks,
    title: { de: "Gespeicherte Drucklisten", en: "Saved print lists" },
    description: { de: "Sammle Artikel, Einzelgeräte, Vorlagen und Kopien in einer persönlichen Druckliste, die je Organisation gespeichert bleibt.", en: "Collect items, individual units, templates and copy counts in a personal print list saved per organisation." } },
  { id: "direct-print", group: "labels-api", icon: Printer,
    title: { de: "Direkter Etikettendruck", en: "Direct label printing" },
    description: { de: "Drucke über den Browser oder per USB am Brother PT-P710BT mit QZ Tray. Der gewählte Druckweg bestimmt die Einrichtung.", en: "Print through the browser or over USB to a Brother PT-P710BT with QZ Tray. Setup depends on the chosen print method." } },
  { id: "shared-print", group: "labels-api", icon: Printer,
    title: { de: "Gemeinsamer Drucker", en: "Shared printer" },
    description: { de: "Nutze einen gemeinsamen Etikettendrucker über einen Windows-Agent. Die dokumentierte Einrichtung verwendet 24-mm-Band.", en: "Use a shared label printer through a Windows agent. The documented setup uses 24 mm tape." } },
  { id: "scan-flows", group: "labels-api", icon: ScanLine,
    title: { de: "Scan-Abläufe", en: "Scan workflows" },
    description: { de: "Verbinde QR- und Barcodes mit konfigurierbaren Aktionen. Vorschau, Eingaben und eine Bestätigung begleiten die Ausführung.", en: "Connect QR codes and barcodes to configurable actions, with a preview, inputs and confirmation before execution." } },
  { id: "public-sharing", group: "labels-api", icon: Globe2,
    title: { de: "Öffentliche Freigaben", en: "Public sharing" },
    description: { de: "Teile ausgewählte Inhalte über widerrufbare öffentliche Links, ohne den gesamten Arbeitsbereich freizugeben.", en: "Share selected content using revocable public links without opening up the entire workspace." } },
  { id: "sso", group: "betrieb-sicherheit", icon: KeyRound,
    title: { de: "Single Sign-on", en: "Single sign-on" },
    description: { de: "Ergänze die Anmeldung um Auth0 oder einen standardkonformen OpenID-Connect-Anbieter.", en: "Connect authentication to Auth0 or a standards-compliant OpenID Connect provider." } },
  { id: "access-rules", group: "betrieb-sicherheit", icon: ShieldCheck,
    title: { de: "Bedingte Zugriffsregeln", en: "Conditional access rules" },
    description: { de: "Ergänze Rollen um inhaltsabhängige Regeln und steuere Berechtigungen gezielt für deinen Arbeitsbereich.", en: "Extend roles with content-based rules and tailor permissions within your workspace." } },
  { id: "offline", group: "betrieb-sicherheit", icon: WifiOff,
    title: { de: "Offline-Ansichten", en: "Offline views" },
    description: { de: "Halte ausgewählte Ansichten auf einem vertrauenswürdigen Gerät offline verfügbar. Beim Abmelden oder Deaktivieren werden lokale Kopien entfernt.", en: "Keep selected views available offline on a trusted device. Local copies are removed when you sign out or disable the feature." } },
  { id: "storage", group: "betrieb-sicherheit", icon: Database,
    title: { de: "Wählbarer Dateispeicher", en: "Configurable file storage" },
    description: { de: "Speichere Uploads lokal in einem persistenten Volume oder binde optional Openinary als Dateispeicher an.", en: "Store uploads in a persistent local volume or optionally connect Openinary for file storage." } },
  { id: "opensource", group: "betrieb-sicherheit", icon: Github,
    title: { de: "Offener Quellcode", en: "Open source code" },
    description: { de: "Prüfe, verändere und betreibe den Quellcode selbst. Die MIT-Lizenz erlaubt auch die Weitergabe deiner Anpassungen.", en: "Inspect, modify and run the source code yourself. The MIT license also allows you to share your changes." } },
];

const copy = {
  de: {
    eyebrow: "Funktionen entdecken", title: "Da steckt noch mehr drin.",
    intro: "Entdecke, was Open Inventory für deinen Alltag mitbringt.",
    all: "Alle", categories: "Funktionen nach Kategorie filtern", selection: "Eine Auswahl zum Entdecken",
    hint: "Wähle eine Funktion und erfahre mehr.", more: "Mehr erfahren",
    overview: "Alle Funktionen entdecken",
    expand: "Mehr anzeigen", collapse: "Weniger anzeigen", count: "Funktionen zum Entdecken",
  },
  en: {
    eyebrow: "Explore the features", title: "There’s more inside.",
    intro: "Discover what Open Inventory can do for your everyday work.",
    all: "All", categories: "Filter features by category", selection: "A selection to explore",
    hint: "Choose a feature to find out more.", more: "Learn more",
    overview: "Explore all features",
    expand: "Show more", collapse: "Show less", count: "features to explore",
  },
};

export function FeatureExplorer({ locale }: { locale: MarketingLocale }) {
  const id = useId();
  const [category, setCategory] = useState<FeatureSlug | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const firstExtraRef = useRef<HTMLButtonElement>(null);
  const c = copy[locale];
  const matching = features.filter(feature => category === "all" || feature.group === category);
  const limit = category === "all" ? 12 : 8;
  const visible = expanded ? matching : matching.slice(0, limit);
  const selected = visible.find(feature => feature.id === selectedId);

  useEffect(() => {
    if (expanded) firstExtraRef.current?.focus({ preventScroll: true });
  }, [expanded]);

  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`} id="feature-explorer">
      <div className="site-shell">
        <div className={styles.header}>
          <div>
            <p className="site-eyebrow">{features.length} {c.count}</p>
            <h2 id={`${id}-heading`} className={`site-heading ${styles.title}`}>{c.title}</h2>
            <p className={styles.intro}>{c.intro}</p>
          </div>
          <Link href={marketingHref(locale, "/features")} className={`site-link ${styles.overview}`}>
            {c.overview}<ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.filters} role="group" aria-label={c.categories}>
          {[{ id: "all" as const, label: { de: c.all, en: c.all } }, ...groups].map(group => (
            <button key={group.id} type="button" aria-pressed={category === group.id} aria-controls={`${id}-features`}
              onClick={() => { setCategory(group.id); setSelectedId(null); setExpanded(false); }}>
              {group.label[locale]} <span className={styles.count}>{group.id === "all" ? features.length : features.filter(feature => feature.group === group.id).length}</span>
            </button>
          ))}
        </div>

        <ul id={`${id}-features`} className={styles.grid}
          aria-label={category === "all" ? c.selection : groups.find(group => group.id === category)?.label[locale]}>
          {visible.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <li key={feature.id}>
                <button ref={index === limit ? firstExtraRef : undefined} type="button" className={styles.feature} aria-expanded={selectedId === feature.id}
                  aria-controls={`${id}-preview`} onClick={() => setSelectedId(selectedId === feature.id ? null : feature.id)}>
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                  <span>{feature.title[locale]}</span>
                  <ArrowRight className={styles.tileArrow} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>

        {matching.length > limit && <button type="button" className={styles.expand}
          aria-expanded={expanded} aria-controls={`${id}-features`}
          onClick={() => { setExpanded(!expanded); if (expanded) setSelectedId(null); }}>
          {expanded ? c.collapse : `${c.expand} (+${matching.length - limit})`}
          <ChevronDown aria-hidden="true" />
        </button>}

        <div id={`${id}-preview`} className={styles.preview} data-open={Boolean(selected)}>
          <div aria-live="polite" aria-atomic="true" className={styles.previewCopy}>
            {selected ? <><h3>{selected.title[locale]}</h3><p>{selected.description[locale]}</p></> :
              <p className={styles.hint}><Boxes aria-hidden="true" strokeWidth={1.5} />{c.hint}</p>}
          </div>
          {selected && <Link href={marketingHref(locale, `/features/${selected.detailGroup ?? selected.group}`)} className="site-link"
            aria-label={`${c.more}: ${selected.title[locale]}`}>
            {c.more}<ArrowRight aria-hidden="true" />
          </Link>}
        </div>
      </div>
    </section>
  );
}
