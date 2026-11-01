import type { LucideIcon } from "lucide-react";
import {
  Barcode,
  Boxes,
  Braces,
  Camera,
  CalendarRange,
  CircleDollarSign,
  ClipboardCheck,
  Container,
  Database,
  FileSpreadsheet,
  Fingerprint,
  Github,
  Globe2,
  History,
  Heart,
  ImageIcon,
  Languages,
  Layers3,
  Link2,
  ListChecks,
  MapPinned,
  PackageCheck,
  PackageOpen,
  Printer,
  QrCode,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tags,
  Users,
  WandSparkles,
  WifiOff,
} from "lucide-react";

export type FeatureSlug =
  | "erfassen"
  | "strukturieren"
  | "bestand-ausleihe"
  | "labels-api"
  | "orte-raeume"
  | "betrieb-sicherheit";

export const featureIOSCaptures: Record<FeatureSlug, string> = {
  erfassen: "/marketing/screenshots/ios-inventory.png",
  strukturieren: "/marketing/screenshots/ios-item-detail.png",
  "bestand-ausleihe": "/marketing/screenshots/ios-stock-management.png",
  "labels-api": "/marketing/screenshots/ios-search.png",
  "orte-raeume": "/marketing/screenshots/ios-map.png",
  "betrieb-sicherheit": "/marketing/screenshots/ios-permissions.png",
};

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export type FeatureGroup = {
  slug: FeatureSlug;
  menuTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  detailIntro: string;
  items: FeatureItem[];
  outcomes: string[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: Array<{
    title: string;
    copy: string;
  }>;
  example: {
    eyebrow: string;
    title: string;
    copy: string;
    facts: Array<{
      label: string;
      value: string;
    }>;
  };
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  ios: {
    title: string;
    copy: string;
    points: string[];
  };
  trustTitle: string;
  trustCopy: string;
  trustPoints: string[];
};

export const featureGroups: FeatureGroup[] = [
  {
    slug: "erfassen",
    menuTitle: "Schnell erfassen",
    eyebrow: "01 · Erfassen",
    title: "Vom Foto zum Datensatz",
    intro:
      "Ein Foto genügt für den Anfang. Die KI kann den Hintergrund entfernen und Titel, Beschreibung und Schlagwörter vorschlagen. Du prüfst den Entwurf, statt jedes Feld selbst auszufüllen.",
    description:
      "Inventar mit KI erfassen: Bilder freistellen, Titel und Beschreibung vorschlagen lassen, Produktdetails recherchieren und mehrere Gegenstände nacheinander aufnehmen.",
    detailIntro:
      "Ein volles Regal soll keinen Nachmittag Schreibarbeit bedeuten. Lege einen gemeinsamen Standort fest, fotografiere die Gegenstände und lass die optionale KI Bilder und Angaben vorbereiten. Danach prüfst und ergänzt du die Einträge.",
    outcomes: [
      "Mehrere Gegenstände nacheinander aufnehmen, ohne auf jeden Verarbeitungsschritt zu warten",
      "KI-Vorschläge prüfen und korrigieren, bevor sie zum verlässlichen Datensatz werden",
      "Originalfotos und strukturierte Angaben gemeinsam am Eintrag behalten",
    ],
    workflowTitle: "Fotografieren, prüfen, speichern",
    workflowIntro:
      "Wähle den Standort einmal für die ganze Serie. Fotografiere die Gegenstände nacheinander und sieh dir anschließend die Vorschläge an.",
    workflow: [
      {
        title: "Serie vorbereiten",
        copy: "Lege Typ, Standort und optionale Verarbeitung einmal fest. Diese Vorgaben begleiten alle folgenden Aufnahmen.",
      },
      {
        title: "Fotografieren",
        copy: "Nimm ein Hauptfoto und bei Bedarf weitere Ansichten oder ein Typenschild auf. Die Kamera ist nach dem Absenden sofort wieder frei.",
      },
      {
        title: "Im Hintergrund verarbeiten",
        copy: "Die Bilder werden hochgeladen, während die KI Angaben und auf Wunsch ein freigestelltes Bild vorbereitet. Den Fortschritt kannst du verfolgen und fehlgeschlagene Schritte erneut starten.",
      },
      {
        title: "Gesammelt prüfen",
        copy: "Sieh dir die vorgeschlagenen Angaben und Bilder an. Ergänze Menge und Standort und korrigiere, was die KI falsch erkannt hat.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Werkstattregal",
      title: "Zwölf Gegenstände, ein gemeinsamer Standort",
      copy: "Für eine Serie werden „Werkzeug“ und „Regal B2“ einmal gesetzt. Danach braucht jedes Objekt nur sein Foto; besondere Angaben wie Seriennummer oder Zustand ergänzt du gezielt.",
      facts: [
        { label: "Gemeinsame Vorgabe", value: "Werkzeug · Regal B2" },
        { label: "Aufnahmen", value: "12 Objekte" },
        { label: "Entscheidung", value: "Vorschlag prüfen" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-batch.png",
      alt: "Echte Open-Inventory-Serienerfassung mit einem realen Werkstattfoto in der Fotoablage",
      caption: "Fotoerfassung mit einem Werkstattbild · Beispieldaten",
    },
    ios: {
      title: "Die Kamera ist dort, wo die Dinge sind.",
      copy: "Mit der iPhone-App fotografierst du direkt am Regal. Aufnahmen und ausstehende Uploads bleiben auch bei einer Unterbrechung erhalten. Die App verbindet sich mit deiner eigenen Open-Inventory-Instanz.",
      points: [
        "Bis zu zwölf Fotos aufnehmen oder aus der Mediathek wählen",
        "Uploads nach einer unterbrochenen Verbindung fortsetzen",
        "Code scannen, Datensatz öffnen und Ergebnis vor Ort prüfen",
      ],
    },
    trustTitle: "Automatisierung, deren Grenzen sichtbar bleiben.",
    trustCopy:
      "Bildanalyse und Cover-Erstellung sind optionale Provider-Funktionen. Der offene Code zeigt, wann externe Verarbeitung stattfindet; Originalbilder, Provider-Konfiguration und die endgültige Entscheidung bleiben unter Kontrolle der betreibenden Instanz.",
    trustPoints: [
      "MIT-lizenzierte Web-App und native iOS-App in einem Repository",
      "Optionale KI-Funktionen statt einer Pflicht zur externen Bildverarbeitung",
      "CSV-Export und dokumentierte REST-API für eigene Abläufe",
    ],
    items: [
      {
        icon: Camera,
        title: "Mehrere Gegenstände erfassen",
        copy: "Nimm mehrere Gegenstände nacheinander auf. Dauerhafte Hintergrundaufträge verarbeiten die Einträge weiter, während du schon das nächste Objekt fotografierst.",
      },
      {
        icon: Sparkles,
        title: "Titel und Beschreibung vorschlagen",
        copy: "Die KI liest sichtbare Merkmale und Beschriftungen aus deinen Fotos und schlägt Titel, Beschreibung, Typ und Schlagwörter vor.",
      },
      {
        icon: WandSparkles,
        title: "Bilder freistellen",
        copy: "Aus dem Werkstattfoto wird ein übersichtliches Vorschaubild mit weißem oder transparentem Hintergrund. Das Originalfoto bleibt daneben erhalten.",
      },
      {
        icon: Search,
        title: "Produktdetails recherchieren",
        copy: "Die KI sucht im Web nach fehlenden Produktangaben, etwa zu einem Modell auf dem Typenschild. Die Ergebnisse kannst du in den Eintrag übernehmen.",
      },
      {
        icon: ScanLine,
        title: "Mengen aus einem Foto",
        copy: "Die optionale Fotozählung erkennt gleichartige Teile, markiert Treffer und liefert eine Konfidenz. Die Menge lässt sich korrigieren, bevor sie als Zu- oder Abgang gebucht wird.",
      },
      {
        icon: ImageIcon,
        title: "Fotos und Anleitungen am Gegenstand",
        copy: "Weitere Fotos, Videos, Anleitungen als PDF und 3D-Dateien lassen sich am Eintrag ablegen. So bleiben die hilfreichen Details beim Gegenstand.",
      },
      {
        icon: Smartphone,
        title: "Native iPhone-Erfassung",
        copy: "Fotografieren, Codes scannen und direkt vor Ort weiterarbeiten. Nach einer unterbrochenen Verbindung lassen sich Uploads fortsetzen.",
      },
      {
        icon: Boxes,
        title: "Kisteninhalt schätzen · experimentell",
        copy: "Schätze Mengen aus mehreren Fotos. Der optionale 3D-Modus ergänzt ein drehbares Modell mit manuellen Markierungen und benötigt eine eigene GPU-Umgebung. Die Genauigkeit ist nicht validiert; die Buchung bestätigst du separat.",
      },
    ],
  },
  {
    slug: "strukturieren",
    menuTitle: "Inventar strukturieren",
    eyebrow: "02 · Strukturieren",
    title: "So flexibel wie dein Bestand",
    intro:
      "Nicht jedes Inventar denkt in denselben Kategorien. Typen, Felder, Beziehungen und Sprachen passen sich deinem Modell an.",
    description:
      "Inventar flexibel strukturieren: eigene Typen und Felder, Variantenfamilien, Optionen, Beziehungen, Medien, Favoriten und Sammelbearbeitung.",
    detailIntro:
      "Ein Familienkeller braucht andere Angaben als ein Gerätepark. Open Inventory gibt deshalb kein starres Branchenschema vor: Du kombinierst stabile Typen, eigene Felder, Beziehungen, Standorte und Medien zu einem Modell, das verständlich bleibt und per API nutzbar ist.",
    outcomes: [
      "Eigene Begriffe und Felder abbilden, ohne den Anwendungscode ändern zu müssen",
      "Kisten, Räume, Geräte, Personen und Projekte nachvollziehbar verbinden",
      "Auch große Bestände über Suche, Filter und Sammelaktionen pflegen",
    ],
    workflowTitle: "Eigene Felder und Ablageorte einrichten",
    workflowIntro:
      "Für ein Messgerät brauchst du vielleicht einen Kalibriertermin, für eine Kiste nur den Inhalt und einen Standort. Lege die Felder an, die du tatsächlich verwendest.",
    workflow: [
      {
        title: "Inventartypen festlegen",
        copy: "Wähle einen vorhandenen Typ wie Werkzeug oder Möbel. Für andere Gegenstände kannst du einen eigenen Typ anlegen.",
      },
      {
        title: "Felder ergänzen",
        copy: "Füge nur die fachlich nötigen Text-, Zahlen-, Auswahl-, Datums- oder Referenzfelder hinzu.",
      },
      {
        title: "Zusammenhänge verbinden",
        copy: "Lege fest, in welcher Kiste ein Gerät liegt und welches Zubehör dazugehört.",
      },
      {
        title: "Suchen und gemeinsam ändern",
        copy: "Nutze Filter und Sammelbearbeitung, um Tags oder gemeinsame Angaben konsistent auf mehrere Einträge anzuwenden.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Gerätekatalog",
      title: "Ein Messgerät ist mehr als ein Name",
      copy: "Der Typ „Messgerät“ kann Seriennummer, Kalibriertermin und verantwortliche Person ergänzen. Beziehungen zeigen Zubehör und Aufbewahrungsort, ohne alles in ein Freitextfeld zu pressen.",
      facts: [
        { label: "Typ", value: "Messgerät" },
        { label: "Eigene Felder", value: "Kalibrierung · Verantwortlich" },
        { label: "Beziehungen", value: "Zubehör · Lagerort" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-item-detail.png",
      alt: "Echte Open-Inventory-Detailansicht mit Objektfoto, strukturierten Feldern und Demo-Daten",
      caption: "Fotos, Angaben und Bestand am Eintrag · Beispieldaten",
    },
    ios: {
      title: "Am Gegenstand nachsehen und Angaben ergänzen.",
      copy: "Die native iOS-App sucht und filtert dieselben Inventareinträge wie die Web-App. Beim Erfassen lassen sich Standort und weitere Angaben direkt am Gegenstand ergänzen.",
      points: [
        "Nach Name, SKU, Tag oder Ort suchen",
        "Fotos und Angaben zu einem Eintrag öffnen und bearbeiten",
        "Den Standort auf der Karte nachsehen",
      ],
    },
    trustTitle: "Dein Datenmodell bleibt lesbar und übertragbar.",
    trustCopy:
      "Typen und Felder werden nicht hinter einem proprietären Branchenmodell versteckt. Der MIT-lizenzierte Code, CSV-Import und -Export sowie die dokumentierte API geben dir mehrere Wege, Daten zu prüfen und weiterzuverwenden.",
    trustPoints: [
      "Stabile API-Schlüssel für eigene Inventartypen",
      "Validierter UTF-8-CSV-Import und -Export",
      "OpenAPI-3.1-Vertrag direkt im Repository",
    ],
    items: [
      {
        icon: Boxes,
        title: "Angaben zum Gegenstand",
        copy: "Speichere Seriennummer, Zustand, Wert und Standort direkt am Eintrag. Fotos und Notizen helfen dabei, ähnliche Geräte auseinanderzuhalten.",
      },
      {
        icon: Tags,
        title: "Eigene Inventartypen",
        copy: "Nutze mitgelieferte Typen für Werkzeuge, Objekte, Möbel, Fahrzeuge, Orte, Personen, Kleidung und Projekte oder definiere eigene Typen mit stabilen API-Schlüsseln.",
      },
      {
        icon: ListChecks,
        title: "Eigene Felder hinzufügen",
        copy: "Ergänze zum Beispiel ein Kaufdatum, einen Kalibriertermin oder eine Auswahl für den Zustand. Du bestimmst, ob ein Feld Text, eine Zahl, ein Datum oder eine Auswahl enthält.",
      },
      {
        icon: Link2,
        title: "Inhalt und Zubehör zuordnen",
        copy: "Verbinde eine Kiste mit ihrem Inhalt oder eine Maschine mit ihrem Zubehör. So kannst du vom Gerät zum passenden Koffer oder Ersatzteil wechseln.",
      },
      {
        icon: Languages,
        title: "Mehrsprachige Inhalte",
        copy: "Hinterlege Titel und Beschreibungen in mehreren Sprachen. Die optionale KI übersetzt die Ausgangstexte; du kannst die Übersetzungen bearbeiten.",
      },
      {
        icon: Heart,
        title: "Suchen, filtern, bearbeiten",
        copy: "Durchsuche die responsive Raster- oder Tabellenansicht, markiere häufig benötigte Einträge als Favoriten und ändere gemeinsame Felder oder Tags gesammelt.",
      },
      {
        icon: Layers3,
        title: "Variantenfamilien & Optionen",
        copy: "Verbinde vorhandene Einträge als Varianten oder erzeuge Konfigurationen aus Optionsgruppen. Jede Variante bleibt ein vollständiger Eintrag mit eigener SKU, eigenem Barcode und Bestand.",
      },
      {
        icon: Link2,
        title: "Beziehungs- & Kostenstruktur",
        copy: "Visualisiere Familien, Stücklisten, Enthaltensein und weitere Verbindungen über mehrere Ebenen. Die optionale Kostenansicht macht Materialanteile entlang der Struktur sichtbar.",
      },
    ],
  },
  {
    slug: "bestand-ausleihe",
    menuTitle: "Bestand & Vorgänge",
    eyebrow: "03 · Lagern & bewegen",
    title: "Bestände buchen und vorausplanen",
    intro:
      "Buche Lieferungen, Verbrauch und Ausleihen. Im Verlauf steht, wann sich der Bestand geändert hat und was ausgegeben oder zurückgenommen wurde.",
    description:
      "Bestände und Vorgänge verwalten: Mengen- und Einzelbestand, Bewegungen, Inventur, interne Anfragen, Einkauf, Verkauf, Ausleihe, Kosten und Stücklisten.",
    detailIntro:
      "Schrauben brauchen eine Menge, ein Laptop eine eigene Identität. Open Inventory führt beides im selben System und schreibt jede Veränderung als datierte Bewegung fort. So bleiben aktueller Bestand und sein Zustandekommen gemeinsam nachvollziehbar.",
    outcomes: [
      "Verbrauchsmaterial als Menge und einzelne Geräte mit Seriennummer führen",
      "Ausgabe, Rückgabe, Transfer und Korrektur ohne überschriebene Historie buchen",
      "Anfragen, Bestellungen, Verkäufe, Ausleihen, Kosten und Baugruppen zusammen denken",
    ],
    workflowTitle: "Eine Lieferung einbuchen und Teile entnehmen",
    workflowIntro:
      "Am Beispiel einer Kiste Schrauben: Halte Lieferungen und Entnahmen fest, damit der angezeigte Bestand zum Lager passt.",
    workflow: [
      {
        title: "Artikel anlegen",
        copy: "Lege die Schrauben als Mengenbestand an und wähle die Einheit Stück.",
      },
      {
        title: "Lieferung einbuchen",
        copy: "Zähle die gelieferten Schrauben und buche sie als Zugang in das passende Lagerfach.",
      },
      {
        title: "Entnahme buchen",
        copy: "Wer Schrauben entnimmt, bucht die Menge als Abgang. Im Verlauf stehen Datum, Menge und Lagerort.",
      },
      {
        title: "Nachbestellung planen",
        copy: "Hinterlege Mindestbestand und Lieferzeit. Sieh anhand des bisherigen Verbrauchs nach, wann Nachschub nötig wird.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Makerspace",
      title: "Schrauben zählen, Oszilloskope einzeln verfolgen",
      copy: "M4-Schrauben werden je Regal als Menge geführt. Jedes Messgerät hat dagegen einen eigenen Code, Status und Standort und kann einer Person zugewiesen werden.",
      facts: [
        { label: "Mengenbestand", value: "240 Schrauben" },
        { label: "Serialisiert", value: "4 Messgeräte" },
        { label: "Aktueller Vorgang", value: "1 Gerät ausgegeben" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-stock.png",
      alt: "Echte Open-Inventory-Bestandsverwaltung mit Buchungsformular, Lagerorten und Bewegungshistorie",
      caption: "Bestandsbuchung und Verlauf · Beispieldaten",
    },
    ios: {
      title: "Bestand direkt am Regal buchen.",
      copy: "Mit dem iPhone wird ein Code dort gescannt, wo Zugang, Ausgabe oder Rückgabe tatsächlich stattfindet. Die App nutzt dieselbe Bewegungshistorie wie die Weboberfläche.",
      points: [
        "Gescannten Eintrag eindeutig auflösen",
        "Zugang mit einem Tipp vorbereiten",
        "Abgang vor der Ausführung bewusst bestätigen",
      ],
    },
    trustTitle: "Die Historie gehört deiner Instanz.",
    trustCopy:
      "Bewegungen, Einheiten, Bestellungen und Stücklisten liegen in deiner PostgreSQL-Datenbank. Der offene Code macht die Buchungsregeln prüfbar; die API ermöglicht eigene Scanner-, Einkaufs- oder Reporting-Abläufe.",
    trustPoints: [
      "Append-only Bewegungen statt stiller Bestandsüberschreibung",
      "Docker Compose und PostgreSQL für den selbst betriebenen Kern",
      "Scoped API-Tokens für gezielte Integrationen",
    ],
    items: [
      {
        icon: History,
        title: "Verbrauch und Lieferungen vorausplanen",
        copy: "Vergleiche Bestandshistorie und Prognose. Verbrauch, Lieferzeiten und offene Wareneingänge ergeben Vorschläge für Nachbestellzeitpunkt und Menge. Bestellungen werden weiterhin von dir ausgelöst.",
      },
      {
        icon: Layers3,
        title: "Stücklistenanalyse",
        copy: "Prüfe Produktionsmengen, Varianten, Komponentenbedarf, Kosten und Abhängigkeiten vor dem Bauen. Fehlende Preise bleiben als unbekannt sichtbar.",
      },
      {
        icon: Barcode,
        title: "Kennungen einzelner Geräte ändern",
        copy: "Passe die Kennung einer serialisierten Einheit an und drucke ihr eigenes Etikett. Die Geräte-ID und ihr QR-Link bleiben erhalten.",
      },
      {
        icon: PackageOpen,
        title: "Sammel- oder Einzelbestand",
        copy: "Zähle gleiche Teile wie Schrauben als Menge. Geräte mit eigener Seriennummer führst du einzeln, jeweils mit Zustand und Standort.",
      },
      {
        icon: History,
        title: "Lückenlose Bewegungen",
        copy: "Zugänge, Abgänge, Korrekturen und Transfers werden datiert protokolliert. Die Organisationsrichtlinie entscheidet, ob Negativbestand erlaubt ist; Korrekturen bleiben in der Historie sichtbar.",
      },
      {
        icon: MapPinned,
        title: "Bestand je Lagerort",
        copy: "Sieh die Gesamtmenge eines Artikels und wie sie sich auf Räume, Schränke oder Fahrzeuge verteilt. Buche einen Transfer, wenn Material den Ort wechselt.",
      },
      {
        icon: ClipboardCheck,
        title: "Inventurzyklen",
        copy: "Plane wiederkehrende Zählungen, arbeite fällige Prüfungen ab und gleiche Mengen je Standort ab. Serialisierte Einheiten behalten dabei ihre individuelle Nachverfolgbarkeit.",
      },
      {
        icon: Users,
        title: "Ausleihen & mehrteilige Vorgänge",
        copy: "Gib mehrere Geräte oder Materialmengen gemeinsam an einen Kontakt aus. Du siehst, was bis wann zurückkommen soll und welche Teile schon zurückgegeben wurden.",
      },
      {
        icon: PackageCheck,
        title: "Bestandsprognose & Nachbestellung",
        copy: "Lege Mindestbestand und Lieferzeit fest. Aus Bestand, Verbrauch und offenen Lieferungen berechnet die Anwendung, wann die Teile voraussichtlich ausgehen und wann du nachbestellen solltest.",
      },
      {
        icon: ShoppingCart,
        title: "Einkauf & Verkauf",
        copy: "Erfasse Bestellungen mit Artikeln, Mengen, Preisen und Lieferanten oder Kunden. Trifft nur ein Teil der Bestellung ein, buchst du diese Menge und siehst, was noch aussteht.",
      },
      {
        icon: CalendarRange,
        title: "Interne Anfragen & Kalender",
        copy: "Plane zukünftigen Bedarf, genehmige oder lehne Anfragen ab und reserviere Bestand bis zur Erfüllung. Der Kalender macht kommende Belegungen sichtbar.",
      },
      {
        icon: CircleDollarSign,
        title: "Kosten & Verpackungseinheiten",
        copy: "Speichere Preise an Bewegungen, verfolge Bestands- und Materialkosten und rechne gekaufte Rollen, Kartons oder Kanister in die jeweilige Basiseinheit um.",
      },
      {
        icon: Layers3,
        title: "Stücklisten & Baugruppen",
        copy: "Hinterlege die benötigten Teile einer Baugruppe. Bei der Montage werden alle Komponenten zusammen vom Bestand abgezogen; schlägt die Buchung fehl, bleibt der Bestand unverändert.",
      },
    ],
  },
  {
    slug: "labels-api",
    menuTitle: "Etiketten, Drucken & API",
    eyebrow: "04 · Finden & automatisieren",
    title: "Vom Etikett bis zur API",
    intro:
      "Gestalte Etiketten für Artikel und Einzelgeräte. Drucke im Browser, direkt am P-touch oder über den gemeinsamen Bürodrucker und verbinde weitere Systeme per API.",
    description:
      "Etiketten gestalten, Drucklisten speichern und per Browser, QZ Tray oder gemeinsamem Bürodrucker ausgeben. QR-Scans, CSV und REST-API verbinden die Abläufe.",
    detailIntro:
      "Wähle Artikel oder einzelne Geräte, passe die Vorlage an und bereite eine Druckserie vor. Ein Scan führt später zum passenden Eintrag. CSV und API verbinden dein Inventar mit anderen Systemen.",
    outcomes: [
      "Artikel und einzelne Geräte mit eigenen QR-Etiketten kennzeichnen",
      "Lokal oder am gemeinsamen Bürodrucker drucken; persönliche Drucklisten speichern",
      "Daten per CSV oder scoped REST-API kontrolliert austauschen",
    ],
    workflowTitle: "Vom Artikel zum gedruckten Etikett",
    workflowIntro:
      "Einzelne Etiketten sofort drucken oder mehrere Artikel und Vorlagen zu einer Serie sammeln.",
    workflow: [
      {
        title: "Artikel oder Gerät wählen",
        copy: "Wähle einen Artikel oder eine serialisierte Einheit. Ihr QR-Link bleibt auch nach einer Änderung der Gerätekennung gültig.",
      },
      {
        title: "Label gestalten",
        copy: "Kombiniere QR-Code, Barcode, Bilder und Text. Passe Titel, Untertitel und Kopien für den Druck an und prüfe die Vorschau.",
      },
      {
        title: "Druckziel wählen",
        copy: "Nutze den Browser-Druckdialog, QZ Tray am lokalen PT-P710BT oder den gemeinsamen Windows-Drucker. Gesammelte Etiketten lassen sich als Serie senden.",
      },
      {
        title: "Scannen und weiterarbeiten",
        copy: "Öffne den Eintrag per Scan, prüfe den Vorgang und bestätige die gewünschte Bestandsaktion.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Werkzeugausgabe",
      title: "Ein Scan öffnet erst den Kontext, dann die Aktion",
      copy: "Der QR-Code auf einem Werkzeugkoffer führt zum eindeutigen Eintrag. Die Oberfläche zeigt Status und Standort und fragt anschließend, ob die Ausgabe wirklich gebucht werden soll.",
      facts: [
        { label: "Einstieg", value: "Kurzer QR-Link" },
        { label: "Auflösung", value: "WERK-0042" },
        { label: "Aktion", value: "Ausgabe bestätigen" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-label-designer.png",
      alt: "Echter Open-Inventory-Labeldesigner mit QR- und Code-128-Vorschau",
      caption: "QR- und Barcode-Etiketten im Designer · Beispieldaten",
    },
    ios: {
      title: "Etiketten mit dem iPhone scannen.",
      copy: "Die native App erkennt QR, EAN-8/13, UPC-E, Code 128, Data Matrix, PDF417 und Aztec und verbindet sich direkt mit deiner eigenen Instanz.",
      points: [
        "Inventarlink, UUID, SKU oder Seriennummer auflösen",
        "Gefundenen Eintrag vor einer Lageraktion anzeigen",
        "Scanner-Code und Server-API gemeinsam im Repository prüfen",
      ],
    },
    trustTitle: "API mit begrenzbaren Zugriffsrechten",
    trustCopy:
      "Die OpenAPI-3.1-Spezifikation liegt als YAML im Repository. Tokens werden gehasht gespeichert, können Ablaufdatum und Scopes tragen und lassen sich widerrufen. So bleiben Integrationen dokumentiert und begrenzbar.",
    trustPoints: [
      "Eingecheckter OpenAPI-Vertrag und interaktive Referenz",
      "Gehasht gespeicherte, widerrufbare Tokens mit Scopes",
      "Validierter CSV-Austausch als einfacher, offener Datenweg",
    ],
    items: [
      {
        icon: Printer,
        title: "Drei Druckwege",
        copy: "Browser-Druckdialog für vorhandene Drucker, direkter USB-Druck am Brother PT-P710BT mit QZ Tray oder ein gemeinsamer Bürodrucker mit Windows-Agent. Die gemeinsame Einrichtung nutzt derzeit 24-mm-Band.",
      },
      {
        icon: ListChecks,
        title: "Gespeicherte Drucklisten",
        copy: "Sammle Artikel, Einzelgeräte, Vorlagen und Kopien. Deine persönliche Druckliste bleibt je Organisation gespeichert. Pro P-touch-Serie sind bis zu 100 Etiketten mit derselben Bandbreite möglich.",
      },
      {
        icon: QrCode,
        title: "QR- und Barcode-Workflows",
        copy: "Scanne mit Kamera oder Foto, löse Inventarlinks, UUIDs, SKUs und Seriennummern auf und gestalte konfigurierbare Aktionsabläufe mit Vorschau, Eingaben und bestätigter Ausführung.",
      },
      {
        icon: Barcode,
        title: "Eigene Etiketten",
        copy: "Gestalte Etiketten mit Name, Code und weiteren Angaben im Browser. Speichere die Vorlage für den nächsten Druck.",
      },
      {
        icon: FileSpreadsheet,
        title: "CSV-Import & -Export",
        copy: "Importiere vorhandene Listen als CSV und exportiere deinen Bestand für andere Programme. Bei fehlerhaften Werten zeigt der Import die betroffene Zeile.",
      },
      {
        icon: Fingerprint,
        title: "Dubletten sicher zusammenführen",
        copy: "Finde ähnliche Einträge und führe sie mit ihren zugehörigen Daten zusammen.",
      },
      {
        icon: Globe2,
        title: "Gezielt öffentlich teilen",
        copy: "Erstelle widerrufbare öffentliche Freigaben für ausgewählte Inhalte, ohne dafür den gesamten Arbeitsbereich zu öffnen.",
      },
      {
        icon: Braces,
        title: "Dokumentierte REST-API",
        copy: "Lies und ändere Inventar über die interaktive OpenAPI-Referenz. API-Token sind widerrufbar und auf Scopes begrenzbar; Druckverwaltung benötigt eine Browsersitzung.",
      },
      {
        icon: Store,
        title: "WooCommerce-Bestandssync",
        copy: "Ordne Shop-Positionen per exakter SKU dem Mengenbestand zu. Webhooks buchen Bestellungen aus und gleichen Rückerstattungen oder Stornos mit nachvollziehbaren Gegenbuchungen ab.",
      },
    ],
  },
  {
    slug: "orte-raeume",
    menuTitle: "Orte, Karten & Räume",
    eyebrow: "05 · Orte & Räume",
    title: "Vom Kartenpunkt bis zum 3D-Raum",
    intro:
      "Standorte sind mehr als Freitext: Sie können geografisch, hierarchisch und auf kompatiblen Geräten räumlich erfasst werden.",
    description:
      "Inventar räumlich organisieren: Kartenpunkte und Polygone, automatische Zuordnung, optionale RoomPlan-Scans und navigierbare 3D-Räume.",
    detailIntro:
      "„Im Lager“ reicht selten, wenn ein Gegenstand schnell gefunden werden soll. Open Inventory verbindet Textorte, strukturierte Lagerorte, Kartenkoordinaten und optionale Raumscans. Einfache Bestände bleiben einfach; räumliche Tiefe kommt nur dort hinzu, wo sie wirklich hilft.",
    outcomes: [
      "Inventar mit Kartenpunkten, Flächen und strukturierten Lagerorten verbinden",
      "Gegenstände auf der Karte einem Raum oder Lagerbereich zuordnen",
      "Kompatible iPhones optional für RoomPlan-Scans und Platzierung nutzen",
    ],
    workflowTitle: "Vom groben Ort zum konkreten Fundplatz",
    workflowIntro:
      "Jede Ebene ist optional. Ein Textort kann genügen; Karten- und Raumdaten erweitern ihn, wenn Gelände oder Gebäude komplexer werden.",
    workflow: [
      {
        title: "Standort anlegen",
        copy: "Nutze einen Inventareintrag als Raum, Schrank, Fahrzeug oder andere strukturierte Ablage.",
      },
      {
        title: "Geometrie ergänzen",
        copy: "Setze einen Kartenpunkt oder zeichne ein Polygon und bearbeite dessen Geometrie direkt in der Karte.",
      },
      {
        title: "Räumlich zuordnen",
        copy: "Liegt ein Punkt in einem Container-Polygon, kann daraus eine Beziehung entstehen. Manuelle Platzierung behält Vorrang.",
      },
      {
        title: "Raum optional erfassen",
        copy: "Vermesse mit einem LiDAR-fähigen iPhone Räume und Etagen und navigiere die Struktur anschließend im Web-Viewer.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Standortkette",
      title: "Gelände, Gebäude, Raum, Schrank",
      copy: "Ein Messgerät liegt nicht nur „im Labor“. Kartenpunkt und Raumstruktur führen zum Gebäude, Beziehungen zum Raum und der konkrete Lagerort schließlich zu Schrank 3, Fach B.",
      facts: [
        { label: "Karte", value: "Gebäude Nord" },
        { label: "Raum", value: "Elektroniklabor" },
        { label: "Fundplatz", value: "Schrank 3 · Fach B" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-locations.png",
      alt: "Echte Open-Inventory-Ansicht mit Beständen an drei angelegten Demo-Lagerorten",
      caption: "Bestände an drei Lagerorten · Beispieldaten",
    },
    ios: {
      title: "Raumerfassung ist nativ – und bewusst optional.",
      copy: "Auf LiDAR-fähigen iPhones kann die SwiftUI-App RoomPlan nutzen, um Räume, Etagen und zusammenhängende Strukturen zu vermessen. Die übrigen Karten- und Standortfunktionen benötigen kein Pro-Gerät.",
      points: [
        "RoomPlan-Strukturen auf kompatibler Hardware aufnehmen",
        "Inventar mit mobilen Fotos und Codes am Ort ergänzen",
        "Erfasste Räume später im Web durchsuchen und navigieren",
      ],
    },
    trustTitle: "Räumliche Daten bleiben Teil deines offenen Inventars.",
    trustCopy:
      "Kartenkoordinaten, GeoJSON, Beziehungen und RoomPlan-Artefakte werden von deiner Instanz verwaltet. Die iOS- und Web-Implementierung ist einsehbar; externe Karten- oder Derivat-Provider bleiben explizite Konfigurationsentscheidungen.",
    trustPoints: [
      "Web-Viewer und native Raumerfassung offen im Repository",
      "Explizite Trennung manueller und automatisch abgeleiteter Platzierung",
      "Zusätzliche Dienste für Karten oder 3D-Funktionen bei Bedarf einrichten",
    ],
    items: [
      {
        icon: MapPinned,
        title: "Interaktive Karten",
        copy: "Bearbeite Punkte und Polygone, ziehe Geometriegriffe, wechsle Ebenen und Satellitenbild und ordne mehrere Einträge direkt auf der Karte zu.",
      },
      {
        icon: Layers3,
        title: "Automatische räumliche Zuordnung",
        copy: "Zeichne einen Bereich auf der Karte ein. Gegenstände mit einem Kartenpunkt darin können diesem Bereich automatisch zugeordnet werden. Eine von Hand gesetzte Zuordnung hat Vorrang.",
      },
      {
        icon: Smartphone,
        title: "Optionale RoomPlan-Scans",
        copy: "Ein LiDAR-fähiges iPhone kann Räume, Etagen und zusammenhängende Strukturen vermessen. Das ist eine Pro-Geräte-Erweiterung, keine Voraussetzung für die übrige App.",
      },
      {
        icon: Search,
        title: "Navigierbare Räume 3D",
        copy: "Öffne einen gescannten Raum im Browser und suche darin nach Inventareinträgen. Optional lassen sich auch fotorealistisch aufbereitete Ansichten anzeigen.",
      },
      {
        icon: WandSparkles,
        title: "Raumfotos & geschätzte Platzierung",
        copy: "Wähle gezielt Raumfotos für die optionale Analyse. Erkannte Objekte und geschätzte Positionen bleiben überprüfbare Vorschläge, bevor sie in die Raumstruktur übernommen werden.",
      },
    ],
  },
  {
    slug: "betrieb-sicherheit",
    menuTitle: "Betrieb & Sicherheit",
    eyebrow: "06 · Betreiben & absichern",
    title: "Open Source, aber nicht sorglos",
    intro:
      "Der offene Code gibt Kontrolle. Rollen, Tokens, persistente Daten und explizite Provider-Grenzen machen daraus einen betreibbaren Dienst.",
    description:
      "Open Inventory kontrolliert betreiben: Organisationen, Rollen, OIDC, Offline-Kopien, KI-Kostenlimits, Docker Compose, PostgreSQL und MIT-lizenzierter Quellcode.",
    detailIntro:
      "Self-hosting verlagert Kontrolle und Verantwortung zur betreibenden Organisation. Open Inventory liefert dafür einen nachvollziehbaren Stack mit Compose-Dateien, Migrationen, Healthcheck, PostgreSQL und persistenten Uploads. Backups, Updates, TLS und Zugriffswege bleiben bewusste Betriebsaufgaben.",
    outcomes: [
      "Web-App, API und iOS-App auf eigener Infrastruktur betreiben und prüfen",
      "Rollen, granulare Berechtigungen und bedingte Zugriffsregeln festlegen",
      "Datenbank, Dateien, Secrets, Backups und optionale Provider bewusst verwalten",
    ],
    workflowTitle: "Server, Zugang und Backups einrichten",
    workflowIntro:
      "Der schnelle Compose-Start ist der Anfang. Für einen dauerhaft erreichbaren Dienst gehören Identität, Datensicherung und Updates zum gewählten Betriebsmodell.",
    workflow: [
      {
        title: "Instanz starten",
        copy: "Starte die Anwendung mit Docker Compose. Die Installationsanleitung beschreibt Datenbank, Speicher und die Prüfung, ob der Dienst läuft.",
      },
      {
        title: "Zugriff begrenzen",
        copy: "Lege Konten, Rollen und Regeln fest und entscheide bewusst, ob die Instanz intern oder öffentlich erreichbar sein soll.",
      },
      {
        title: "Daten sichern",
        copy: "Sichere PostgreSQL und den gewählten Dateispeicher gemeinsam und teste die Wiederherstellung regelmäßig.",
      },
      {
        title: "Updates pflegen",
        copy: "Lies vor einem Update die Änderungen und sichere deine Daten. Aktualisiere die Installation nach Anleitung und prüfe anschließend, ob sie erreichbar ist.",
      },
    ],
    example: {
      eyebrow: "Beispiel · Eigene Instanz",
      title: "Was auf deinem Server gespeichert wird",
      copy: "Web-App und API laufen im Container, strukturierte Daten liegen in PostgreSQL und Uploads im persistenten Volume. Externe Auth-, KI- oder Speicheranbieter kommen nur hinzu, wenn du sie konfigurierst.",
      facts: [
        { label: "Anwendung", value: "Web · API · Jobs" },
        { label: "Daten", value: "PostgreSQL · Uploads" },
        { label: "Optional", value: "Auth · KI · Storage" },
      ],
    },
    screenshot: {
      src: "/marketing/screenshots/web-settings-access.png",
      alt: "Echte Open-Inventory-Zugriffsverwaltung mit Rollen und Mitgliedern einer Demo-Organisation",
      caption: "Rollen und Mitglieder im Arbeitsbereich · Beispieldaten",
    },
    ios: {
      title: "Auch die iOS-App spricht mit deiner Instanz.",
      copy: "Die native SwiftUI-App wird aus demselben offenen Repository gebaut und verbindet sich mit der von dir konfigurierten Server-URL. Erreichbarkeit und TLS gehören damit zu deinem Betriebsmodell.",
      points: [
        "Server-URL der eigenen Instanz konfigurieren",
        "Web, API und iOS gemeinsam im Quellcode nachvollziehen",
        "Öffentliche Verbindungen über HTTPS absichern",
      ],
    },
    trustTitle: "Open Source schafft Prüfbarkeit – nicht automatisch Betriebssicherheit.",
    trustCopy:
      "Die MIT-Lizenz erlaubt Prüfung, Anpassung, Betrieb und Weitergabe. Sie ersetzt keine Updates, Backups oder sichere Netzkonfiguration. Open Inventory benennt diese Grenze bewusst und liefert die technischen Bausteine offen aus.",
    trustPoints: [
      "MIT-Lizenz und vollständiger Quellcode für Web, API und iOS",
      "Docker Compose, Migrationen, Healthcheck und persistente Volumes",
      "Fehler melden und Änderungen über GitHub vorschlagen",
    ],
    items: [
      {
        icon: ShieldCheck,
        title: "Rollen & bedingte Regeln",
        copy: "Verwalte lokale Konten, eigene Rollen, granulare Berechtigungen und inhaltsabhängige Zugriffsregeln. Für die Anmeldung lassen sich Auth0 oder ein standardkonformer OpenID-Connect-Provider ergänzen.",
      },
      {
        icon: Container,
        title: "Docker Compose & PostgreSQL",
        copy: "Container, Migrationen, Healthcheck sowie stabile Volumes für PostgreSQL und lokale Uploads sind eingecheckt. Konfiguration und Secrets bleiben bei der betreibenden Instanz.",
      },
      {
        icon: Database,
        title: "Wählbarer Dateispeicher",
        copy: "Speichere Uploads standardmäßig im persistenten lokalen Volume oder binde optional Openinary an. Datenbank und Dateien werden gemeinsam gesichert.",
      },
      {
        icon: Users,
        title: "Mehrere Organisationen",
        copy: "Trenne Arbeitsbereiche, Daten und Mitgliedschaften innerhalb einer Bereitstellung. Rollen und Rechte gelten jeweils in der ausgewählten Organisation.",
      },
      {
        icon: CircleDollarSign,
        title: "KI-Nutzung & Monatslimit",
        copy: "Sieh geschätzte Kosten nach Aktion, Provider und Status. Ein Organisationslimit wird vor jedem kostenpflichtigen KI-Aufruf geprüft und kann KI-Ausgaben vollständig stoppen.",
      },
      {
        icon: WifiOff,
        title: "Kontrollierte Offline-Kopien",
        copy: "Halte ausgewählte Ansichten auf einem vertrauenswürdigen Gerät offline verfügbar. Beim Deaktivieren oder Abmelden werden die lokal gespeicherten Kopien entfernt.",
      },
      {
        icon: Github,
        title: "MIT Open Source",
        copy: "Web-App, API und native iOS-App liegen offen in einem Repository. Unter der MIT-Lizenz darfst du den Code prüfen, anpassen, betreiben und weitergeben.",
      },
    ],
  },
];

export function getFeatureGroup(slug: string) {
  return featureGroups.find((group) => group.slug === slug);
}
