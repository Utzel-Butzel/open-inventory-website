export type UseCaseIcon =
  | "api"
  | "camera"
  | "csv"
  | "history"
  | "labels"
  | "languages"
  | "locations"
  | "orders"
  | "relations"
  | "roles"
  | "sharing"
  | "stock";

export type UseCaseFeature = {
  icon: UseCaseIcon;
  title: string;
  description: string;
};

export type UseCase = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  cardCopy: string;
  description: string;
  image?: string;
  imageAlt?: string;
  visual:
    | "makerspace"
    | "family"
    | "startup"
    | "club"
    | "collection"
    | "school"
    | "trades"
    | "lab";
  accent: string;
  softAccent: string;
  challenge: string;
  promises: string[];
  mockData: Array<{
    name: string;
    meta: string;
    status: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  features: UseCaseFeature[];
  iosTitle: string;
  iosCopy: string;
  iosPoints: string[];
  openSourceTitle: string;
  openSourceCopy: string;
};

export const useCaseIOSCaptures: Record<string, string> = {
  makerspace: "/marketing/screenshots/ios-stock-management.png",
  familie: "/marketing/screenshots/ios-search.png",
  startup: "/marketing/screenshots/ios-permissions.png",
  verein: "/marketing/screenshots/ios-inventory.png",
  sammlung: "/marketing/screenshots/ios-item-detail.png",
  schule: "/marketing/screenshots/ios-settings.png",
  handwerk: "/marketing/screenshots/ios-map.png",
  labor: "/marketing/screenshots/ios-system-status.png",
};

export const useCaseWebCaptures: Record<string, string> = {
  makerspace: "/marketing/screenshots/web-stock.png",
  familie: "/marketing/screenshots/web-label-designer.png",
  startup: "/marketing/screenshots/web-item-detail.png",
  verein: "/marketing/screenshots/web-stock.png",
  sammlung: "/marketing/screenshots/web-item-detail.png",
  schule: "/marketing/screenshots/web-stock.png",
  handwerk: "/marketing/screenshots/web-locations.png",
  labor: "/marketing/screenshots/web-locations.png",
};

export const useCases: UseCase[] = [
  {
    slug: "makerspace",
    name: "Makerspace",
    eyebrow: "Werkstatt & geteilte Technik",
    title: "Werkzeug finden, ausleihen und vollständig zurückbekommen.",
    cardCopy:
      "Nachsehen, welche Werkzeuge es gibt, wo sie liegen und ob sie gerade ausgeliehen sind.",
    description:
      "Nicht alle kennen jede Schublade. In einem gemeinsamen Katalog kann auch ein neues Mitglied nachsehen, welche Werkzeuge vorhanden sind und wo sie liegen. Ausleihen stehen direkt am Gerät.",
    image: "/marketing/photography/workshop-team.webp",
    imageAlt:
      "Ein Team arbeitet gemeinsam an einem realen Werkstatttisch",
    visual: "makerspace",
    accent: "text-[#5f55e8]",
    softAccent: "bg-[#eeedff] text-[#5147d9]",
    challenge:
      "Jemand sucht einen Akkuschrauber und weiß nicht, ob es überhaupt einen gibt. Die Suche zeigt das Gerät, seinen Platz an der Werkzeugwand und ob es ausgeliehen ist. Ein Foto hilft, das richtige Modell zu erkennen.",
    promises: [
      "Werkzeug per Suche, QR-Code oder Barcode direkt finden",
      "Mengenware und einzelne Maschinen getrennt nachverfolgen",
      "Ausgabe, Rückgabe, Reservierung und Standortwechsel dokumentieren",
    ],
    mockData: [
      {
        name: "Akkuschrauber 18 V",
        meta: "Werkzeugwand A · 7 verfügbar",
        status: "Verfügbar",
      },
      {
        name: "Lasercutter Schutzbrille",
        meta: "Sicherheitsregal · 18 Stück",
        status: "Auf Lager",
      },
      {
        name: "Oszilloskop Rigol DS1054Z",
        meta: "Elektronikbank · SN 043918",
        status: "Ausgegeben",
      },
    ],
    steps: [
      {
        title: "Werkzeug aufnehmen",
        description: "Fotografiere den Akkuschrauber und ergänze Modell, Seriennummer und den Platz an der Werkzeugwand.",
      },
      {
        title: "Etikett aufkleben",
        description: "Drucke ein QR-Etikett für das Gerät. Ein Scan öffnet später den Eintrag.",
      },
      {
        title: "Ausleihe buchen",
        description: "Wähle bei der Ausgabe den Empfänger aus und halte fest, welches Gerät mitgenommen wird.",
      },
      {
        title: "Rückgabe eintragen",
        description: "Buche das Werkzeug zurück. Falls es jetzt an einem anderen Platz liegt, ändere auch den Standort.",
      }
    ],
    features: [
      {
        icon: "stock",
        title: "Mengen & Einzelgeräte",
        description:
          "Schrauben zählst du als Menge. Für jede Fräse oder jedes Messgerät kannst du Zustand, Seriennummer und Standort einzeln festhalten.",
      },
      {
        icon: "labels",
        title: "QR- und Barcode-Etiketten",
        description:
          "Gestalte Druckvorlagen im Browser und scanne Codes per Kamera, Foto oder Handscanner. Änderungen werden vor dem Buchen geprüft.",
      },
      {
        icon: "history",
        title: "Ausgabe mit Verlauf",
        description:
          "Halte fest, an wen ein Werkzeug ausgegeben wurde. Ausgabe und Rückgabe bleiben mit Datum im Verlauf sichtbar.",
      },
      {
        icon: "locations",
        title: "Standorte & Karten",
        description:
          "Ordne Dinge Werkstätten und Lagerorten zu. Karten, Beziehungen und die iOS-Raumerfassung helfen bei komplexeren Räumen.",
      },
      {
        icon: "orders",
        title: "Nachschub & Baugruppen",
        description:
          "Mindestbestände, Bestellungen und Teilwareneingänge machen Nachschub sichtbar; Stücklisten dokumentieren verbautes Material.",
      },
      {
        icon: "roles",
        title: "Präzise Zugriffsrechte",
        description:
          "Lege fest, wer Werkzeuge ausgeben, Einträge bearbeiten oder Einstellungen ändern darf.",
      },
    ],
    iosTitle: "Die Werkzeugausgabe passt in die Hosentasche.",
    iosCopy:
      "Die native SwiftUI-App liegt direkt im Open-Source-Repository. Sie nutzt die iPhone-Kamera für Fotos und Code-Erkennung und arbeitet gegen deine eigene Open-Inventory-Instanz.",
    iosPoints: [
      "QR, EAN, Code 128, Data Matrix, PDF417 und Aztec erkennen",
      "Gescannten Bestand einbuchen oder nach Bestätigung ausgeben",
      "Fehlgeschlagene Uploads mit stabilen Idempotenzschlüsseln wiederholen",
    ],
    openSourceTitle: "Werkstattwissen gehört der Werkstatt.",
    openSourceCopy:
      "Open Inventory ist MIT-lizenziert und selbst hostbar. Datenmodell, API und native iOS-App sind einsehbar; eigene Integrationen können auf der dokumentierten OpenAPI aufbauen.",
  },
  {
    slug: "familie",
    name: "Familie",
    eyebrow: "Haushalt & gemeinsames Eigentum",
    title: "Wissen, was da ist — und in welchem Karton es liegt.",
    cardCopy:
      "Keller, Dachboden, Dokumente und geteilte Dinge ohne komplizierte Listen gemeinsam übersichtlich halten.",
    description:
      "Fotografiere, was du einpackst, und ergänze Kiste und Standort. Später findest du den Campingkocher über die Suche, ohne alle Kartons zu öffnen. Auch verliehene Dinge kannst du festhalten.",
    image: "/marketing/photography/home-labels.webp",
    imageAlt:
      "Ein Mann prüft gedruckte Beschriftungen an Umzugskartons",
    visual: "family",
    accent: "text-[#08765e]",
    softAccent: "bg-[#e0f8ef] text-[#08765e]",
    challenge:
      "Der Campingkocher kommt nach dem Urlaub in die Outdoor-Kiste im Keller. Ein Foto und der Standort am Eintrag reichen, um ihn vor der nächsten Reise wiederzufinden.",
    promises: [
      "Vom Foto zum prüfbaren Eintrag, ohne lange Formulare",
      "Kisten, Räume und enthaltene Gegenstände miteinander verknüpfen",
      "Ausgewählte Bestände per schreibgeschütztem Link teilen",
    ],
    mockData: [
      {
        name: "Campingkocher",
        meta: "Keller · Regal 2 · Kiste Outdoor",
        status: "Zuhause",
      },
      {
        name: "Kinder-Skijacke Größe 128",
        meta: "Dachboden · Winterkleidung",
        status: "Verliehen",
      },
      {
        name: "Heimwerker-Bohrmaschine",
        meta: "Abstellraum · Fach links",
        status: "Verfügbar",
      },
    ],
    steps: [
      {
        title: "Inhalt fotografieren",
        description: "Fotografiere Kocher und Zubehör, bevor sie in die Kiste wandern. Die Bilder bleiben am Eintrag.",
      },
      {
        title: "Kiste und Standort ergänzen",
        description: "Ordne den Kocher der Outdoor-Kiste zu und hinterlege Keller, Regal 2 als Standort.",
      },
      {
        title: "Kiste beschriften",
        description: "Ein QR-Etikett an der Kiste öffnet den zugehörigen Eintrag. Du kannst Etiketten im Browser gestalten und drucken.",
      },
      {
        title: "Vor der Reise suchen",
        description: "Suche nach Campingkocher. Am Eintrag findest du die Fotos und den hinterlegten Lagerort.",
      }
    ],
    features: [
      {
        icon: "camera",
        title: "Fotos statt Tipparbeit",
        description:
          "Lege mehrere Fotos am Gegenstand ab, etwa eine Gesamtansicht, das Typenschild und den Kaufbeleg.",
      },
      {
        icon: "relations",
        title: "Kisten, Räume, Zusammenhänge",
        description:
          "Konfigurierbare Beziehungen bilden ab, dass ein Gegenstand in einer Box liegt oder zu einem anderen Objekt gehört.",
      },
      {
        icon: "locations",
        title: "Standorte & Karten",
        description:
          "Ergänze den Raum, das Regal oder die Kiste am Eintrag. Auch ein Standort auf der Karte lässt sich hinterlegen.",
      },
      {
        icon: "sharing",
        title: "Gezielt teilen",
        description:
          "Erstelle öffentliche Links mit Lesezugriff für ausgewählte Sammlungen, ohne dafür Bearbeitungsrechte zu vergeben.",
      },
      {
        icon: "csv",
        title: "Daten mitnehmen",
        description:
          "Übernimm eine vorhandene Liste als CSV-Datei. Deine Einträge kannst du auch wieder exportieren und in einer Tabelle weiterverwenden.",
      },
      {
        icon: "roles",
        title: "Gemeinsam, aber kontrolliert",
        description:
          "Lokale Konten und eigene Rollen legen fest, wer nur ansehen, neue Dinge erfassen oder Einstellungen verwalten darf.",
      },
    ],
    iosTitle: "Erfassen, während du die Kiste ohnehin in der Hand hast.",
    iosCopy:
      "Mit der nativen iOS-App nimmst du Fotos auf, liest vorhandene Codes und findest Einträge direkt am Regal. Die App verbindet sich per HTTPS mit deiner eigenen Instanz.",
    iosPoints: [
      "Bis zu zwölf Fotos aufnehmen oder auswählen",
      "Bekannte SKU, Seriennummer oder Inventarlink exakt auflösen",
      "Upload-Aufträge nach einem App-Neustart sicher fortsetzen",
    ],
    openSourceTitle: "Kein Familienarchiv in einer geschlossenen Plattform.",
    openSourceCopy:
      "Open Inventory ist Open Source unter der MIT-Lizenz. Du kannst es mit Docker selbst betreiben, prüfen, anpassen und deine Daten jederzeit per API oder CSV weiterverwenden.",
  },
  {
    slug: "startup",
    name: "Startup",
    eyebrow: "Assets & wachsende Teams",
    title: "Assets sauber verwalten, bevor die erste Tabelle kippt.",
    cardCopy:
      "Vor dem nächsten Arbeitsstart sehen, welcher Laptop frei ist und ob Netzteil und Dock vorhanden sind.",
    description:
      "Wer nutzt welchen Laptop? Welches Testgerät liegt noch im Schrank? Halte Seriennummer, Zubehör und Empfänger zusammen fest, damit die nächste Ausgabe oder Rückgabe nicht mit einer Suche beginnt.",
    image: "/marketing/photography/server-rack.webp",
    imageAlt:
      "Reale Netzwerkverkabelung in einem bestückten Serverschrank",
    visual: "startup",
    accent: "text-[#aa4b08]",
    softAccent: "bg-[#fff1df] text-[#9a4308]",
    challenge:
      "Ein neues Teammitglied braucht einen Laptop mit Netzteil und Dock. Du suchst ein verfügbares Gerät, stellst das Zubehör zusammen und hältst fest, an wen es ausgegeben wird.",
    promises: [
      "Seriennummer, Nutzer, Zustand und Standort pro Gerät sehen",
      "Wareneingänge und offene Bestellungen nachvollziehen",
      "Mit OpenAPI und scoped Tokens an bestehende Abläufe anbinden",
    ],
    mockData: [
      {
        name: "MacBook Pro 14\" · M4",
        meta: "SN C02X-41K · Zugewiesen an Mira",
        status: "In Benutzung",
      },
      {
        name: "iPhone Testgerät 03",
        meta: "Mobile Lab · iOS Testpool",
        status: "Verfügbar",
      },
      {
        name: "USB-C Dock Gen 2",
        meta: "12 auf Lager · 8 im Einsatz",
        status: "Nachbestellen",
      },
    ],
    steps: [{"title":"Laptop erfassen","description":"Fotografiere das Gerät und ergänze seine Seriennummer. Hänge den Kaufbeleg an den Eintrag."},{"title":"Zubehör zuordnen","description":"Verknüpfe Netzteil und Dock mit dem Laptop, damit bei der Übergabe klar ist, was dazugehört."},{"title":"An Teammitglied ausgeben","description":"Wähle den Empfänger und buche die Ausgabe. Der Verlauf zeigt, wann das Gerät übergeben wurde."},{"title":"Rückgabe festhalten","description":"Buche zurückgegebene Geräte und ergänze ihren Zustand. So siehst du, was für die nächste Ausgabe bereitliegt."}],
    features: [
      {
        icon: "stock",
        title: "Asset- und Bestandsmodell",
        description:
          "Erfasse jedes Gerät mit seiner Seriennummer. Zubehör führst du als Menge; Standort und Buchungen bleiben am Eintrag sichtbar.",
      },
      {
        icon: "history",
        title: "Zuweisung & Rückgabe",
        description:
          "Geräte lassen sich Nutzern, anderen Assets oder Freitext-Empfängern zuweisen, reservieren oder zeitweise ausgeben.",
      },
      {
        icon: "orders",
        title: "Bestellungen & Wareneingang",
        description:
          "Offene Bestellmengen fließen in die Prognose ein; Teilwareneingänge reduzieren sie und erzeugen nachvollziehbare Zugänge.",
      },
      {
        icon: "roles",
        title: "Rollen bis auf Aktionsebene",
        description:
          "Konfiguriere Rollen für IT, Operations und Mitarbeitende mit granularen Rechten und bedingten Regeln auf Inventardaten.",
      },
      {
        icon: "api",
        title: "OpenAPI & scoped Tokens",
        description:
          "Die eingecheckte OpenAPI-Spezifikation dokumentiert die REST-API; Tokens sind gehasht, widerrufbar, befristbar und einschränkbar.",
      },
      {
        icon: "csv",
        title: "CSV ohne Blindflug",
        description:
          "Importe werden zeilenweise validiert und überschreiben bestehende Einträge nicht stillschweigend. Exporte halten die Daten portabel.",
      },
    ],
    iosTitle: "Onboarding direkt am ausgepackten Gerät.",
    iosCopy:
      "Die iOS-App fotografiert neue Assets, scannt Hersteller- oder eigene Inventarcodes und kann denselben Analyse- und Cover-Ablauf wie die Browser-Erfassung anstoßen.",
    iosPoints: [
      "Neue Assets aus unbekannten Codes anlegen",
      "Bestand direkt nach einem Scan ein- oder ausbuchen",
      "Zugangstoken geschützt im iOS-Keychain speichern",
    ],
    openSourceTitle: "Eine Asset-Basis, die das Team kontrolliert.",
    openSourceCopy:
      "Open Inventory ist MIT-lizenzierte Open-Source-Software. Self-Hosting mit Docker, offenes Datenmodell und dokumentierte API verhindern, dass der frühe Prozess zur späteren Sackgasse wird.",
  },
  {
    slug: "verein",
    name: "Verein",
    eyebrow: "Material & Ehrenamt",
    title: "Gemeinsames Material ohne Übergabe-Chaos verwalten.",
    cardCopy:
      "Vom Veranstaltungskabel bis zum Trikot: Ausgabe, Lagerorte und Berechtigungen so dokumentieren, dass Ehrenamt einfach bleibt.",
    description:
      "Für das nächste Fest braucht ihr Pavillon, Kabel und Mikrofone. Seht nach, was im Vereinslager liegt, reserviert die Ausrüstung und haltet fest, wer sie mitnimmt.",
    image: "/marketing/photography/qr-package-scan.webp",
    imageAlt:
      "Ein Mann fotografiert das Etikett eines realen Pakets mit seinem Smartphone",
    visual: "club",
    accent: "text-[#08765e]",
    softAccent: "bg-[#e0f8ef] text-[#08765e]",
    challenge:
      "Das Sommerfest ist vorbei, aber ein Mikrofonkoffer fehlt noch. Im Ausleihvorgang seht ihr den Empfänger und welche Sachen schon zurück sind. Die letzte Rückgabe könnt ihr später ergänzen.",
    promises: [
      "Materialkatalog lesbar teilen, Bearbeitung gezielt vergeben",
      "Ausgaben und Rückgaben mit Empfänger dokumentieren",
      "Verbrauchsmaterial und einzelne Geräte passend führen",
    ],
    mockData: [
      {
        name: "Funkmikrofon Set A",
        meta: "Techniklager · Koffer 4",
        status: "Reserviert",
      },
      {
        name: "Markierungsleibchen Gelb",
        meta: "Sporthalle · 24 Stück",
        status: "Auf Lager",
      },
      {
        name: "Pavillon 3 × 6 m",
        meta: "Außenlager · Ausgabe an Sommerfest-Team",
        status: "Ausgegeben",
      },
    ],
    steps: [{"title":"Ausrüstung zusammenstellen","description":"Suche Pavillon, Kabel und Mikrofone im Katalog. Fotos zeigen, welche Koffer und Sets gemeint sind."},{"title":"Für den Termin reservieren","description":"Reserviere die benötigten Geräte für die Veranstaltung. Im Kalender siehst du weitere Belegungen."},{"title":"An das Veranstaltungsteam ausgeben","description":"Buche die Ausgabe mit Empfänger. Mehrere Gegenstände lassen sich in einem Vorgang zusammenfassen."},{"title":"Rückläufer abhaken","description":"Buche zurückgegebene Teile ein. Bleibt ein Koffer beim Team, ist diese Position weiter offen."}],
    features: [
      {
        icon: "sharing",
        title: "Öffentlicher Materialkatalog",
        description:
          "Ausgewählte Bestände können über einen öffentlichen Link mit Lesezugriff veröffentlicht werden, ohne den Arbeitsbereich zu öffnen.",
      },
      {
        icon: "history",
        title: "Ausgabe & Reservierung",
        description:
          "Buche Material an Nutzer oder Freitext-Empfänger aus, reserviere es für Termine und behalte den Bewegungsverlauf im Blick.",
      },
      {
        icon: "labels",
        title: "Scannbare Etiketten",
        description:
          "Eigene Etikettenvorlagen kombinieren QR-Link, Barcode, Text und Objektbild für Kisten, Geräte oder Materialsets.",
      },
      {
        icon: "roles",
        title: "Rollen fürs Ehrenamt",
        description:
          "Trenne Leserechte, Inventarpflege, Ausgabe, Einkauf und Administration — auch mit bedingten Regeln für bestimmte Einträge.",
      },
      {
        icon: "stock",
        title: "Stückzahl oder Einzelstück",
        description:
          "Verwalte Trikots als Menge und teure Technik als einzelne Einheit mit Seriennummer, Status und eigenem Lagerort.",
      },
      {
        icon: "orders",
        title: "Bedarf & Beschaffung",
        description:
          "Mindestmengen, Verbrauchsraten, Bestellungen und Teilwareneingänge unterstützen die Planung für Training und Veranstaltung.",
      },
    ],
    iosTitle: "Beim Aufbau scannen, nicht später nachtragen.",
    iosCopy:
      "Mit der nativen iPhone-App lässt sich Material dort erfassen und bewegen, wo es genutzt wird. Die Kamera bleibt derselbe Einstieg für Foto, Code und Bestandsaktion.",
    iosPoints: [
      "Material per Code, SKU oder Seriennummer aufrufen",
      "Fotos direkt am Lagerort aufnehmen und hochladen",
      "Buchungen vor der Bestätigung noch einmal prüfen",
    ],
    openSourceTitle: "Offen genug für wechselnde Verantwortliche.",
    openSourceCopy:
      "Als MIT-lizenziertes Open-Source-Projekt lässt sich Open Inventory unabhängig betreiben und dokumentiert übergeben. Verein und Daten bleiben nicht an einen Anbieter gebunden.",
  },
  {
    slug: "sammlung",
    name: "Sammlung",
    eyebrow: "Objekte & dokumentierte Herkunft",
    title: "Eine Sammlung, die mehr weiß als ihre Regalfächer.",
    cardCopy:
      "Fotos, Zustand, Standort, Beziehungen und eigene Metadaten in einem offenen, durchsuchbaren Katalog bewahren.",
    description:
      "Zu einem Sammlungsstück gehören mehr als ein Name und ein Foto. Bewahre Herkunft, Kaufdatum, Zustand und Fundort am selben Eintrag auf – auch wenn das Stück später in eine andere Vitrine wandert.",
    image: "/marketing/photography/home-labels.webp",
    imageAlt:
      "Ein Mann ordnet gedruckte Beschriftungen für reale Aufbewahrungsboxen",
    visual: "collection",
    accent: "text-[#aa4b08]",
    softAccent: "bg-[#fff1df] text-[#9a4308]",
    challenge:
      "Eine analoge Kamera kommt zur Sammlung. Du möchtest später noch wissen, woher sie stammt, welches Objektiv dazugehört und welche Gebrauchsspuren schon beim Kauf vorhanden waren.",
    promises: [
      "Mehrere Fotos und strukturierte Metadaten pro Objekt bewahren",
      "Objekte über Orte, Behälter und Beziehungen erschließen",
      "Kataloge lesen lassen, ohne Bearbeitung freizugeben",
    ],
    mockData: [
      {
        name: "Analoge Kamera · 1978",
        meta: "Vitrine Nord · Erwerb 2019",
        status: "Dokumentiert",
      },
      {
        name: "Sonderdruck Bauhaus",
        meta: "Archivbox P-14 · Zustand sehr gut",
        status: "Nicht ausgestellt",
      },
      {
        name: "Keramikvase · Werkstattmarke AB",
        meta: "Wohnraum · Regal oben",
        status: "Ausgestellt",
      },
    ],
    steps: [
      {
        title: "Ansichten fotografieren",
        description:
          "Hinterlege mehrere Bilder, Alt-Texte und geordnete Medien. Eine optionale KI-Analyse kann beschreibende Felder zur Prüfung vorschlagen.",
      },
      {
        title: "Schema anpassen",
        description:
          "Eigene Inventartypen und typisierte Felder erfassen Epoche, Material, Provenienz, Zustand oder beliebige weitere Merkmale.",
      },
      {
        title: "Kontext verbinden",
        description:
          "Beziehungen verknüpfen Sets, Serien und Behälter. Standorte reichen vom Regalfach bis zur GPS-Position oder Kartenfläche.",
      },
      {
        title: "Katalog nutzen",
        description:
          "Suche und filtere die Sammlung, exportiere sie als CSV oder veröffentliche eine ausgewählte Ansicht als schreibgeschützten Link.",
      },
    ],
    features: [
      {
        icon: "camera",
        title: "Geordnete Medien",
        description:
          "Speichere mehrere Fotos und weitere unterstützte Medien, bestimme das Titelbild und pflege zugängliche Alt-Texte.",
      },
      {
        icon: "relations",
        title: "Beziehungen & Behälter",
        description:
          "Konfigurierbare gerichtete Beziehungen verbinden Serien, Bestandteile, Gegenstücke oder die Box, in der ein Objekt liegt.",
      },
      {
        icon: "locations",
        title: "Präzise Fundorte",
        description:
          "Textorte, Inventarlager, GPS-Koordinaten und GeoJSON-kompatible Kartenobjekte halten physische Fundorte nachvollziehbar.",
      },
      {
        icon: "languages",
        title: "Mehrsprachige Inhalte",
        description:
          "Schreibe Beschreibungen in deiner Sprache und ergänze bei Bedarf KI-Übersetzungen, die du vor dem Übernehmen prüfst.",
      },
      {
        icon: "sharing",
        title: "Lesbarer Online-Katalog",
        description:
          "Öffentliche Freigaben zeigen ausgewählte Inhalte schreibgeschützt; der interne Arbeitsbereich und seine Rechte bleiben getrennt.",
      },
      {
        icon: "csv",
        title: "Offener Export",
        description:
          "CSV-Export und REST-API machen die Katalogdaten für Backups, Auswertungen oder eine spätere Weiterverwendung erreichbar.",
      },
    ],
    iosTitle: "Dokumentieren, solange das Objekt vor dir liegt.",
    iosCopy:
      "Die native iOS-App nimmt mehrere Fotos auf, ergänzt optional den GPS-Ort und lädt den Datensatz über eine wiederaufnehmbare Warteschlange in deine Instanz.",
    iosPoints: [
      "Bis zu zwölf Fotos pro Erfassung vorbereiten",
      "Optional eine saubere quadratische Cover-Version erzeugen lassen",
      "Vorhandene Objekte über eigene Etiketten wiederfinden",
    ],
    openSourceTitle: "Der Katalog bleibt so offen wie die Forschung daran.",
    openSourceCopy:
      "Open Inventory ist Open Source und MIT-lizenziert. Self-Hosting, CSV und OpenAPI geben dir Kontrolle über Bilder, Metadaten und die langfristige Weiterverwendung.",
  },
  {
    slug: "schule",
    name: "Schule",
    eyebrow: "Leihgeräte & Fachräume",
    title: "Gemeinsame Geräte verwalten, ohne den Unterricht auszubremsen.",
    cardCopy:
      "Tablets, Experimentierkoffer und Fachraumausstattung schnell erfassen, ausgeben und regelmäßig prüfen.",
    description:
      "Lehrkräfte können nachsehen, in welchem Raum der Beamer steht und ob er verfügbar ist. Kabel und Fernbedienung gehören zum Eintrag; Ausgabe und Rückgabe halten fest, wer das Gerät gerade nutzt.",
    image: "/marketing/photography/workshop-team.webp",
    imageAlt:
      "Mehrere Personen arbeiten gemeinsam an einem Werkstattprojekt",
    visual: "school",
    accent: "text-[#3f5fc7]",
    softAccent: "bg-[#e8edff] text-[#3955b8]",
    challenge:
      "Für die nächste Stunde wird ein Beamer gebraucht. Am Eintrag steht, wo er liegt und ob er ausgegeben ist. Das Zubehör ist verknüpft, damit nicht erst im Klassenraum auffällt, dass das Kabel fehlt.",
    promises: [
      "Gerätewagen und Einzelgeräte per Foto oder Code erfassen",
      "Ausgabe, Rückgabe und nächsten Inventurtermin nachvollziehen",
      "Rollen für Lehrkräfte, Technik und Verwaltung sauber trennen",
    ],
    mockData: [
      { name: "Tablet 8 · Wagen Nord", meta: "SN EDU-208 · Raum 2.14", status: "Verfügbar" },
      { name: "Mikroskop Schülerplatz 12", meta: "Biologie · Schrank B", status: "Zu prüfen" },
      { name: "Experimentierkoffer Elektrik", meta: "Physik · Ausgabe an 9b", status: "Ausgegeben" },
    ],
    steps: [{"title":"Beamer aufnehmen","description":"Fotografiere das Gerät und halte Seriennummer sowie den Platz im Medienschrank fest."},{"title":"Zubehör verknüpfen","description":"Ordne Fernbedienung, Kabel und Transporttasche zu. Ein Foto zeigt, was zum Set gehört."},{"title":"Ausgabe eintragen","description":"Scanne das Etikett und buche das Gerät auf die ausleihende Person."},{"title":"Rückgabe und Zustand notieren","description":"Buche den Beamer zurück. Ergänze einen Hinweis, wenn ein Kabel fehlt oder das Gerät beschädigt ist."}],
    features: [
      { icon: "stock", title: "Geräte & Mengenbestand", description: "Verwalte Tablets als einzelne Einheiten und Kabel, Sensoren oder Verbrauchsmaterial als Mengenbestand im selben System." },
      { icon: "labels", title: "QR- und Barcode-Etiketten", description: "Eigene Vorlagen verbinden Geräte, Wagen und Schränke mit dem passenden offenen Datensatz." },
      { icon: "history", title: "Ausgabe & Rückgabe", description: "Dokumentiere Ausleihen, Reservierungen und Rückgaben, ohne ältere Bewegungen zu überschreiben." },
      { icon: "locations", title: "Fachräume & Schränke", description: "Ordne Geräte Räumen, Wagen und Lagerorten zu und finde sie über Suche oder Scan wieder." },
      { icon: "roles", title: "Rollen nach Aufgabe", description: "Trenne Lesen, Erfassen, Ausgeben und Administration für Lehrkräfte, Technik und Verwaltung." },
      { icon: "csv", title: "Offener Datenaustausch", description: "Validierte CSV-Importe erleichtern den Einstieg; CSV und REST-API halten die Daten portabel." },
    ],
    iosTitle: "Inventur direkt am Gerätewagen.",
    iosCopy:
      "Die native SwiftUI-App liegt im selben Open-Source-Repository. Mit der iPhone-Kamera lassen sich Codes prüfen, Geräte fotografieren und Bestandsaktionen gegen die eigene Instanz ausführen.",
    iosPoints: [
      "Geräte per Inventarcode oder Seriennummer auflösen",
      "Fotos und Zustand dort ergänzen, wo das Gerät steht",
      "Wiederholbare Upload-Aufträge ohne doppelte Einträge",
    ],
    openSourceTitle: "Schuldaten und Gerätebestand bleiben in eigener Verantwortung.",
    openSourceCopy:
      "Open Inventory ist MIT-lizenziert und mit Docker selbst betreibbar. Web-App, API, Migrationen und iOS-Code sind einsehbar; externe Provider bleiben bewusste, konfigurierbare Entscheidungen.",
  },
  {
    slug: "handwerk",
    name: "Handwerk",
    eyebrow: "Fahrzeuge & Baustellen",
    title: "Werkzeug dort buchen, wo es gerade eingesetzt wird.",
    cardCopy:
      "Werkzeug im Fahrzeug finden, verbrauchte Teile abbuchen und Nachschub fürs Lager planen.",
    description:
      "Vor der Fahrt zur Baustelle nachsehen, in welchem Fahrzeug der Bohrhammer liegt und wie viele Klemmen noch da sind. Entnahmen und Lieferungen aktualisieren den Bestand; Mindestmengen helfen beim Nachbestellen.",
    image: "/marketing/photography/warehouse-scan.webp",
    imageAlt:
      "Ein Lagermitarbeiter scannt einen realen Artikel direkt am Regal",
    visual: "trades",
    accent: "text-[#a54c0b]",
    softAccent: "bg-[#fff0df] text-[#914108]",
    challenge:
      "Der Bohrhammer liegt im anderen Fahrzeug, die Klemmen sind fast aufgebraucht. Wenn ihr Werkzeug und Teile je Fahrzeug führt, könnt ihr vor dem Losfahren nachsehen, was fehlt.",
    promises: [
      "Bestand je Fahrzeug, Lager und Baustelle sehen",
      "Werkzeuge serialisieren und Mitarbeitenden zuweisen",
      "Verbrauch und offene Bestellungen in der Prognose verbinden",
    ],
    mockData: [
      { name: "Akku-Bohrhammer 18 V", meta: "Servicewagen 4 · Fach C", status: "Im Einsatz" },
      { name: "WAGO-Klemmen 221", meta: "Zentrallager · 86 Stück", status: "Nachbestellen" },
      { name: "Kabelprüfgerät", meta: "SN KP-1048 · Team Nord", status: "Zugewiesen" },
    ],
    steps: [{"title":"Fahrzeug als Lagerort anlegen","description":"Ordne Werkzeug und Material dem Fahrzeug zu. Ergänze das Fach, damit auch Vertretungen es finden."},{"title":"Umladen buchen","description":"Wechselt der Bohrhammer in ein anderes Fahrzeug, buche den Standortwechsel."},{"title":"Verbrauch eintragen","description":"Buche verbaute Klemmen als Abgang aus dem Fahrzeugbestand."},{"title":"Nachschub planen","description":"Hinterlege Mindestbestand und Lieferzeit. Prüfe den Bestellvorschlag zusammen mit den noch offenen Lieferungen."}],
    features: [
      { icon: "locations", title: "Bestand je Fahrzeug", description: "Führe jeden Servicewagen und jedes Lager als eigenen Standort, ohne die Gesamtmenge aus dem Blick zu verlieren." },
      { icon: "stock", title: "Mengen und Einzelgeräte", description: "Schrauben und Kabel als Menge, Mess- und Elektrowerkzeuge als einzelne Einheit mit Status und Code." },
      { icon: "history", title: "Zuweisung mit Verlauf", description: "Buche Werkzeuge an Teams, Nutzer oder Projekte und dokumentiere Rückgabe oder Transfer append-only." },
      { icon: "orders", title: "Mindestbestand & Einkauf", description: "Verbrauch, Lieferzeit und Bestellungen fließen in Warnungen und begründete Nachbestellmengen ein." },
      { icon: "labels", title: "Robuste Scan-Abläufe", description: "QR, Code 128 und weitere Codes öffnen den passenden Gegenstand oder eine vorkonfigurierte Lageraktion." },
      { icon: "api", title: "Offene Integration", description: "OpenAPI 3.1 und scoped Tokens verbinden Bestandsdaten mit eigenen Einsatz- oder Einkaufssystemen." },
    ],
    iosTitle: "Das iPhone ist schon auf der Baustelle.",
    iosCopy:
      "Die native App nutzt Kamera, Code-Erkennung und eine wiederaufnehmbare Warteschlange. Sie verbindet sich per HTTPS mit der eigenen Open-Inventory-Instanz.",
    iosPoints: [
      "Werkzeug und Material per Code sofort öffnen",
      "Zu- und Abgänge vor der Buchung prüfen",
      "Fotos neuer Geräte direkt am Fahrzeug aufnehmen",
    ],
    openSourceTitle: "Ein Betriebssystem für Dinge – ohne Anbieterzwang.",
    openSourceCopy:
      "Der MIT-lizenzierte Code, Docker/PostgreSQL und die dokumentierte API erlauben eigene Prozesse und Integrationen. Backups, Updates und externe Provider bleiben transparent in der Hand des Betriebs.",
  },
  {
    slug: "labor",
    name: "Labor",
    eyebrow: "Messgeräte & Prototyping",
    title: "Messgeräte, Teile und Aufbauten verlässlich wiederfinden.",
    cardCopy:
      "Geräte, Komponenten und Prototypteile mit Seriennummer, Standort, Stückliste und offenen Schnittstellen organisieren.",
    description:
      "Messgerät, Tastköpfe und Netzteil sollen zusammen auffindbar sein. Verknüpfe das Zubehör, halte den Arbeitsplatz fest und ergänze eigene Felder etwa für Prüfdatum oder Revision.",
    image: "/marketing/photography/lab-pipette.webp",
    imageAlt:
      "Nahaufnahme einer Person bei der Arbeit mit realer Laborausstattung",
    visual: "lab",
    accent: "text-[#08765e]",
    softAccent: "bg-[#e0f8ef] text-[#08765e]",
    challenge:
      "Das Oszilloskop wurde an einen anderen Messplatz gebracht, die Tastköpfe liegen noch im Schrank. Am Geräteeintrag seht ihr den Standort und welches Zubehör dazugehört.",
    promises: [
      "Messgeräte und Zubehör als Beziehungen oder Stückliste verbinden",
      "Eigene Felder für Prüf- und Beschaffungsdaten nutzen",
      "Daten über CSV und dokumentierte OpenAPI weiterverarbeiten",
    ],
    mockData: [
      { name: "Digitaloszilloskop 100 MHz", meta: "Elektronikplatz 3 · SN LAB-021", status: "Verfügbar" },
      { name: "Sensorboard Revision C", meta: "Prototypenbox P-08 · 14 Stück", status: "Auf Lager" },
      { name: "Netzteil 0–30 V", meta: "Messplatz 1 · Prüfung 11/2026", status: "Zugewiesen" },
    ],
    steps: [
      { title: "Gerät fotografieren", description: "Fotografiere Gerät und Typenschild, damit Modell und Seriennummer später lesbar bleiben." },
      { title: "Felder ergänzen", description: "Eigene Typen und Felder bilden Prüfdatum, Herstellerdaten, Revision oder Verantwortungsbereich passend zum Labor ab." },
      { title: "Aufbau verbinden", description: "Verknüpfe das Oszilloskop mit seinen Tastköpfen und der Halterung. Speichere den jeweiligen Aufbewahrungsort." },
      { title: "Nutzung dokumentieren", description: "Zuweisung, Standortwechsel und Inventur werden datiert gespeichert; offene Datenwege ermöglichen weitere Auswertung." },
    ],
    features: [
      { icon: "camera", title: "Mehrere Ansichten", description: "Dokumentiere Gerät, Typenschild, Zubehör und Zustand mit geordneten Fotos und zugänglichen Alt-Texten." },
      { icon: "stock", title: "Geräte & Teilemengen", description: "Seriennummern für Messgeräte, Mengenbestand für Sensoren, Stecker und andere gleichartige Teile." },
      { icon: "relations", title: "Beziehungen & Stücklisten", description: "Verknüpfe Gerät und Zubehör. Für Prototypen kannst du eine Stückliste hinterlegen und die verbauten Teile vom Bestand abbuchen." },
      { icon: "locations", title: "Arbeitsplätze & Räume", description: "Strukturierte Orte und optional räumliche Erfassung helfen bei gemeinsam genutzten Arbeitsbereichen." },
      { icon: "history", title: "Bewegungen & Inventur", description: "Im Verlauf siehst du, wann Geräte den Arbeitsplatz gewechselt haben und welche Mengen bei der Inventur gezählt wurden." },
      { icon: "api", title: "OpenAPI-Vertrag", description: "Die eingecheckte Spezifikation und widerrufbare Tokens machen eigene Auswertungen und Automationen planbar." },
    ],
    iosTitle: "Erfassen direkt am Messplatz.",
    iosCopy:
      "Die native iOS-App fotografiert Geräte, erkennt Codes und nutzt dieselbe offene API wie die Web-App. Der Server bleibt die eigene Instanz.",
    iosPoints: [
      "Bis zu zwölf Fotos pro Erfassung vorbereiten",
      "Codes und Seriennummern direkt am Gerät auflösen",
      "Übertragungen nach Unterbrechungen sicher wiederholen",
    ],
    openSourceTitle: "Technische Dokumentation braucht einen offenen Ausgang.",
    openSourceCopy:
      "Open Inventory veröffentlicht Web-App, API, Migrationen und iOS-App unter MIT. Daten lassen sich per CSV und OpenAPI weiterverwenden; externe KI- oder Speicheranbieter sind optionale Konfigurationen.",
  },
];

export function getUseCase(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
