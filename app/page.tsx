import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Github, ScanLine, Server, ShieldCheck } from "lucide-react";

import { AiPhotoExample } from "@/components/marketing/ai-photo-example";
import { AudienceTicker } from "@/components/marketing/audience-ticker";
import { OpenSourceBadge } from "@/components/marketing/open-source-badge";
import { AppStoreBadges } from "@/components/marketing/app-store-badges";
import { RealWorldLabels } from "@/components/marketing/real-world-labels";
import { StockWalkthrough } from "@/components/marketing/stock-walkthrough";
import { MarketingFooter, MarketingHeader } from "@/components/marketing/site-chrome";
import { marketingHref, marketingOgLocale, marketingPathAlternates } from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { publicDemoUrl } from "@/lib/site-config";
import styles from "./page.module.css";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";

const content = {
  de: {
    title: "Open Inventory – Wissen, was da ist.",
    description: "Geräte und Material erfassen, Standorte finden und Bestände und Ausleihen nachvollziehen. Open Source, selbst hostbar und mit nativen Apps für iPhone und Android.",
    headline: ["Wissen, was da ist.", "Und wo."],
    aiTitle: "Dein Inventar beginnt mit einem Foto.",
    aiEyebrow: "Mit KI erfassen",
    aiLink: "Mehr zur Fotoerfassung",
    intro: "Geräte, Werkzeug und Material an einem Ort verwalten. Finde, was du brauchst, sieh den verfügbaren Bestand und behalte Ausleihen im Blick.",
    aiIntro: "Fotografiere Werkzeug, Geräte und Material. Die KI stellt Bilder frei und schlägt Titel und Beschreibungen vor. Du prüfst, ergänzt den Standort – und kannst die Dinge später wiederfinden und verleihen.",
    demo: "Live-Demo öffnen", host: "Selbst hosten", facts: ["Open Source · MIT-Lizenz", "Auf deinem Server", "Web, iPhone & Android"],
    photoAlt: "Eine Person lötet an einer Platine an einem benutzten Werkstatttisch",
    searchAlt: "Echte iPhone-App mit der Suche nach Löt: Lötstation Weller WE1010, verfügbar im Elektroniklabor an Bank 3",
    captureLabel: "Gefunden im Elektroniklabor.",
    strap: "Für alle Dinge.",
    audiences: ["Werkstätten", "Makerspaces", "Technikteams", "Vereine & Verleih", "Familien", "Sammlungen", "Schulen", "Labore", "Startups", "Büros", "Fotostudios", "Veranstaltungstechnik", "Repair-Cafés", "Hochschulen", "Sportvereine", "Musikstudios", "Gemeinschaftsgärten", "Museen"],
    workflowEyebrow: "Vom ersten Foto bis zur Rückgabe",
    workflowTitle: "Vom Foto zur dokumentierten Ausleihe",
    workflowIntro: "Foto, Standort und Bestand gehören zusammen. Damit dein Team beim Suchen, Ausgeben und Zurücknehmen auf dieselben Informationen zugreift.",
    steps: [
      { title: "Erfassen", copy: "Mit einem Foto oder vorhandenen Daten beginnen. Die optionale KI schlägt Angaben vor, die du prüfen und ergänzen kannst.", link: "Fotoerfassung ansehen", href: "/features/erfassen" },
      { title: "Wiederfinden", copy: "Nach Name, Stichwort oder Standort suchen. QR- und Barcodes führen direkt zum passenden Inventareintrag.", link: "Suche & Struktur", href: "/features/strukturieren" },
      { title: "Weitergeben", copy: "Ausleihen, Rückgaben und Bestandsbewegungen dokumentieren. So bleibt nachvollziehbar, was ausgegeben wurde.", link: "Bestand & Ausleihe", href: "/features/bestand-ausleihe" },
    ],
    stockEyebrow: "Geräte und Verbrauchsmaterial",
    stockTitle: "Der Bohrer wird verliehen. Die Schrauben werden weniger.",
    stockCopy: "Bei einem Gerät willst du wissen, wo es ist und wer es gerade nutzt. Bei Teilen zählt, wie viele noch da sind. Erfasse Lieferungen und Verbrauch, lege Mindestbestände fest und sieh, wann Nachschub nötig wird.",
    stockPoints: ["Menge je Lagerort nachsehen","Ausgaben und Rückgaben mit Datum sehen","Nachbestellungen anhand von Verbrauch und Lieferzeit planen"],
    stockLink: "Bestandsverwaltung kennenlernen",
    mobileEyebrow: "Direkt am Regal",
    mobileTitle: "Das Inventar kommt mit.",
    mobileCopy: "Ein Etikett scannen, den Standort nachsehen oder einen Zugang buchen. Mit den Apps für iPhone und Android verwaltest du dein Inventar direkt vor Ort.",
    mobileLink: "Apps und Verfügbarkeit",
    mobileAlt: "iPhone-Detailansicht der Lötstation mit Foto, Standort Elektroniklabor Bank 3 und Bestand zwei",
    scenariosEyebrow: "Im Einsatz gedacht",
    scenariosTitle: "Wo Open Inventory helfen kann",
    scenarios: [
      { title: "Werkstatt & Service", copy: "Werkzeug zwischen Regal, Fahrzeug und Einsatzort verfolgen.", href: "/use-cases/handwerk" },
      { title: "Makerspace", copy: "Nachsehen, welche Werkzeuge es überhaupt gibt und wo sie liegen.", href: "/use-cases/makerspace" },
      { title: "Technikteam", copy: "Prüfgeräte zuordnen und Material für die nächste Arbeit finden.", href: "/use-cases/startup" },
    ],
    scenarioLink: "Alle Einsatzbereiche", scenarioPhotoAlt: "Eine Person nimmt eine beschriftete blaue Teilebox mit Schrauben aus einem Werkstattregal",
    ownershipEyebrow: "Open Source",
    ownershipTitle: "Open Inventory auf deinem Server",
    ownershipCopy: "Der Quellcode steht auf GitHub unter der MIT-Lizenz. Du kannst die Anwendung auf deinem Server installieren, anpassen und weitergeben.",
    ownershipItems: [
      { title: "Selbst betreiben", copy: "Mit Docker Compose starten. Backups, Updates und Zugang verwaltest du selbst." },
      { title: "Daten mitnehmen", copy: "Vorhandene Listen importieren, Daten exportieren und eigene Systeme per API anbinden." },
      { title: "KI nach Bedarf", copy: "Die Inventarverwaltung funktioniert ohne KI. Externe Dienste aktivierst du bei Bedarf." },
    ],
    ownershipLink: "Mehr zu Betrieb und Daten", faqEyebrow: "Vor dem Start", faqTitle: "Gut zu wissen.",
    faqs: [
      { q: "Wie drucke ich Etiketten?", a: "Du kannst Etiketten für Artikel und Einzelgeräte erstellen, Vorlagen individuell gestalten und über den Browser ausdrucken. Drucklisten lassen sich für die spätere Verwendung speichern.", href: "/docs#printing", link: "Mehr zum Etikettendruck" },
      { q: "Ist Open Inventory kostenlos? (Open Source)", a: "Die Software ist unter der MIT-Lizenz kostenlos nutzbar. Kosten können für deinen Server und optional verwendete externe Dienste entstehen.", href: "/open-source", link: "Lizenz und Betrieb" },
      { q: "Was brauche ich zum Selbst-Hosting?", a: "Einen Server mit Docker Compose sowie Speicher für Datenbank und Bilder. Für den laufenden Betrieb gehören Backups, Updates und ein sicherer Zugang dazu. Die Dokumentation führt dich durch die Einrichtung.", href: "/docs#docker", link: "Zur Installationsanleitung" },
      { q: "Kann ich meine vorhandenen Listen übernehmen?", a: "Ja. Du kannst Inventar als CSV-Datei importieren. Verwende dafür die vorgesehenen Spaltennamen. Listen aus Excel kannst du zuerst als CSV speichern.", href: "/docs", link: "Dokumentation öffnen" },
      { q: "Funktioniert die Anwendung ohne KI?", a: "Ja. Inventar, Standorte und Bestände lassen sich ohne KI verwalten. Wenn du KI-Funktionen aktivierst, werden die dafür benötigten Inhalte an den konfigurierten Dienst gesendet.", href: "/open-source", link: "Datenfluss nachvollziehen" },
      { q: "Wie bekomme ich die Apps?", a: "Die Android-Vorabversion kannst du direkt als APK herunterladen (Android 8.0+). App Store und Google Play folgen. Die iPhone-App benötigt iOS 17+. Beide Apps verbinden sich mit deiner eigenen Open-Inventory-Instanz.", href: "/app#app-downloads", link: "Zu den App-Downloads" },
    ],
    closingTitle: "Open Inventory ausprobieren", closingCopy: "Öffne die Demo mit Beispieldaten oder richte Open Inventory auf deinem Server ein.", github: "Quellcode auf GitHub",
  },
  en: {
    title: "Open Inventory – Know what you have.",
    description: "Catalogue equipment and supplies, find locations and keep track of stock and loans. Open source, self-hosted and with native iPhone and Android apps.",
    headline: ["Know what you have.", "And where it is."],
    aiTitle: "Your inventory starts with a photo.",
    aiEyebrow: "Capture with AI",
    aiLink: "Explore photo capture",
    intro: "Keep equipment, tools and supplies in one place. Find what you need, check available stock and keep track of what is on loan.",
    aiIntro: "Photograph tools, equipment and supplies. AI removes backgrounds and suggests titles and descriptions. Review the draft, add a location, then find and lend the things you have.",
    demo: "Open live demo", host: "Host it yourself", facts: ["Open source · MIT license", "On your server", "Web, iPhone & Android"],
    photoAlt: "A person soldering a circuit board at a well-used workshop bench",
    searchAlt: "Actual iPhone app searching for a soldering station, showing availability and its location at electronics lab bench 3",
    captureLabel: "Found in the electronics lab.",
    strap: "For all things.", audiences: ["Workshops", "Makerspaces", "Technical teams", "Clubs & lending", "Families", "Collections", "Schools", "Labs", "Startups", "Offices", "Photo studios", "Event production", "Repair cafés", "Universities", "Sports clubs", "Music studios", "Community gardens", "Museums"],
    workflowEyebrow: "From the first photo to the return",
    workflowTitle: "From a photo to a recorded loan",
    workflowIntro: "Photos, locations and stock belong together. Your team works with the same information when finding, handing over and returning equipment.",
    steps: [
      { title: "Capture", copy: "Start with a photo or your existing data. Optional AI suggests details for you to review and complete.", link: "Explore photo capture", href: "/features/erfassen" },
      { title: "Find", copy: "Search by name, keyword or location. QR codes and barcodes take you straight to the right inventory record.", link: "Search & organise", href: "/features/strukturieren" },
      { title: "Hand over", copy: "Record loans, returns and stock movements. Keep a history of what was issued and what came back.", link: "Stock & lending", href: "/features/bestand-ausleihe" },
    ],
    stockEyebrow: "Equipment and consumables", stockTitle: "The drill goes on loan. The screws get used up.",
    stockCopy: "For a device, you need to know where it is and who is using it. For parts, you need the quantity left. Record deliveries and consumption, set minimum stock levels and see when more supplies are needed.",
    stockPoints: ["Check quantities by storage location","See dated records of issues and returns","Plan reorders using consumption and lead time"],
    stockLink: "Explore stock management",
    mobileEyebrow: "Right at the shelf", mobileTitle: "Take your inventory with you.",
    mobileCopy: "Scan a label, check a location or record incoming stock. Use the iPhone and Android apps to manage your inventory on site.",
    mobileLink: "Apps and availability",
    mobileAlt: "iPhone detail view of a soldering station with its photo, electronics lab location and two units in stock",
    scenariosEyebrow: "Everyday settings", scenariosTitle: "Where Open Inventory can help",
    scenarios: [
      { title: "Workshops & service", copy: "Follow tools between the shelf, the van and the job site.", href: "/use-cases/handwerk" },
      { title: "Makerspaces", copy: "See which tools the workshop has and where to find them.", href: "/use-cases/makerspace" },
      { title: "Technical teams", copy: "Assign test equipment and find supplies for the next job.", href: "/use-cases/startup" },
    ],
    scenarioLink: "All use cases", scenarioPhotoAlt: "A person taking a labelled blue bin of screws from a workshop shelf",
    ownershipEyebrow: "Open source", ownershipTitle: "Run Open Inventory on your server",
    ownershipCopy: "The source code is on GitHub under the MIT license. Install the application on your own server, adapt it and share it.",
    ownershipItems: [
      { title: "Run it yourself", copy: "Get started with Docker Compose. Manage your own backups, updates and access." },
      { title: "Keep your data portable", copy: "Import existing lists, export your data and connect your own systems through the API." },
      { title: "Choose when to use AI", copy: "Inventory management works without AI. Enable external services when you need them." },
    ],
    ownershipLink: "About hosting and data", faqEyebrow: "Before you start", faqTitle: "Good to know.",
    faqs: [
      { q: "How do I print labels?", a: "Create labels for items and individual units, customise templates and print from your browser. Save print lists to use again later.", href: "/docs#printing", link: "More about label printing" },
      { q: "What does Open Inventory cost?", a: "The software is free to use under the MIT license. Your server and any optional external services may have their own costs.", href: "/open-source", link: "License and hosting" },
      { q: "What do I need to self-host?", a: "A server with Docker Compose and storage for the database and images. Operating your instance includes backups, updates and secure access. The documentation walks you through setup.", href: "/docs#docker", link: "Read the installation guide" },
      { q: "Can I import my existing lists?", a: "Yes. You can import inventory from a CSV file using the supported column names. Save existing Excel lists as CSV before importing.", href: "/docs", link: "Open the documentation" },
      { q: "Does it work without AI?", a: "Yes. You can manage inventory, locations and stock without AI. If you enable AI features, the content they need is sent to the configured provider.", href: "/open-source", link: "Understand the data flow" },
      { q: "How do I get the apps?", a: "Download the Android preview directly as an APK (Android 8.0+). App Store and Google Play releases are coming soon. The iPhone app requires iOS 17+. Both apps connect to your own Open Inventory instance.", href: "/app#app-downloads", link: "App downloads" },
    ],
    closingTitle: "See how it fits your team.", closingCopy: "Explore the demo with example data, or set up Open Inventory on your own server.", github: "Source code on GitHub",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getMarketingLocale();
  const copy = content[locale];
  return {
    title: { absolute: copy.title }, description: copy.description,
    alternates: marketingPathAlternates(locale, "/"),
    openGraph: { title: copy.title, description: copy.description, url: marketingHref(locale, "/"), images: ["/og.png"], ...marketingOgLocale(locale) },
  };
}

export default async function HomePage() {
  const locale = await getMarketingLocale();
  const c = content[locale];
  const href = (path: string) => marketingHref(locale, path);
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main id="main-content">
        <section className={styles.hero}>
          <div className={`site-shell ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1 className={`site-title ${styles.heroTitle}`}>{c.headline[0]}<span>{c.headline[1]}</span></h1>
              <p className={styles.lead}>{c.intro}</p>
              <div className={styles.actions}>
                <a className="site-button site-button-primary" href={publicDemoUrl}>{c.demo}<ArrowUpRight aria-hidden="true" /></a>
                <Link className="site-button site-button-secondary" href={href("/docs#docker")}>{c.host}</Link>
              </div>
              <ul className={styles.facts}>{c.facts.map(fact => <li key={fact}><Check aria-hidden="true" />{fact}</li>)}</ul>
            </div>
            <figure className={styles.heroFigure}>
              <div className={styles.photoFrame}>
                <Image src="/marketing/photography/electronics-soldering.webp" alt={c.photoAlt} fill sizes="(max-width: 767px) 90vw, 45vw" loading="eager" fetchPriority="high" className={styles.heroPhoto} />
              </div>
              <div className={styles.searchCapture}>
                <div className={styles.captureBar}><ScanLine aria-hidden="true" /><span>{c.captureLabel}</span></div>
                <Image src="/marketing/screenshots/ios-search-home.png" alt={c.searchAlt} width={1206} height={980} sizes="(max-width: 767px) 75vw, 360px" loading="eager" className={styles.searchImage} />
              </div>
            </figure>
          </div>
        </section>

        <div className={styles.audienceStrip}>
          <div className={`site-shell ${styles.audienceInner}`}><p>{c.strap}</p><AudienceTicker items={c.audiences} locale={locale} /></div>
        </div>

        <section className={`site-section ${styles.stockSection}`}>
          <div className={`site-shell ${styles.stockGrid}`}>
            <StockWalkthrough locale={locale} />
            <div><p className="site-eyebrow">{c.stockEyebrow}</p><h2 className="site-heading mt-4">{c.stockTitle}</h2><p className={`${styles.bodyCopy} mt-6`}>{c.stockCopy}</p>
              <ul className={styles.checklist}>{c.stockPoints.map(point => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>
              <Link className="site-link mt-7" href={href("/features/bestand-ausleihe")}>{c.stockLink}<ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="site-section" id="ki-werkzeuge">
          <div className={`site-shell ${styles.photoExampleGrid}`}>
            <div>
              <p className="site-eyebrow">{c.aiEyebrow}</p>
              <h2 className="site-heading mt-4">{c.aiTitle}</h2>
              <p className={`${styles.bodyCopy} mt-6`}>{c.aiIntro}</p>
              <Link className="site-link mt-7" href={href("/features/erfassen")}>{c.aiLink}<ArrowRight aria-hidden="true" /></Link>
            </div>
            <AiPhotoExample locale={locale} animated />
          </div>
        </section>

        <RealWorldLabels locale={locale} />

        <section className={`site-section ${styles.mobileSection}`}>
          <div className={`site-shell ${styles.mobileGrid}`}>
            <figure className={styles.mobileFigure}>
              <Image src="/marketing/devices/iphone-in-hand-v3.png" alt={locale === "de" ? "Eine Hand hält ein iPhone mit der Open-Inventory-Detailansicht einer Lötstation" : "A hand holding an iPhone displaying a soldering station in Open Inventory"} width={1254} height={1254} sizes="(max-width: 767px) 112vw, (max-width: 1280px) 60vw, 700px" className={styles.handheldPhone} />
            </figure>
            <div className={styles.mobileCopy}><p className="site-eyebrow">{c.mobileEyebrow}</p><h2 className="site-heading mt-4">{c.mobileTitle}</h2><p className={`${styles.bodyCopy} mt-6`}>{c.mobileCopy}</p><Link href={href("/app")} className="site-link mt-7">{c.mobileLink}<ArrowRight aria-hidden="true" /></Link><AppStoreBadges locale={locale} /></div>
          </div>
        </section>

        <section className={`site-section ${styles.scenarioSection}`}>
          <div className={`site-shell ${styles.scenarioGrid}`}>
            <div><p className="site-eyebrow">{c.scenariosEyebrow}</p><h2 className="site-heading mt-4">{c.scenariosTitle}</h2>
              <div className={styles.scenarioList}>{c.scenarios.map(item => <Link key={item.href} href={href(item.href)}><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight aria-hidden="true" /></Link>)}</div>
              <Link className="site-link mt-6" href={href("/use-cases")}>{c.scenarioLink}<ArrowRight aria-hidden="true" /></Link>
            </div>
            <figure><div className={styles.scenarioPhoto}><Image src="/marketing/generated/workshop-parts-bin.webp" alt={c.scenarioPhotoAlt} fill sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /></div></figure>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell">
            <div className={styles.sectionIntro}><div><p className="site-eyebrow">{c.ownershipEyebrow}</p><h2 className="site-heading mt-4">{c.ownershipTitle}</h2></div><div><p className={styles.bodyCopy}>{c.ownershipCopy}</p><Link href={href("/open-source")} className="site-link mt-5">{c.ownershipLink}<ArrowRight aria-hidden="true" /></Link></div></div>
            <div className="mt-8"><OpenSourceBadge locale={locale} /></div>
            <div className={styles.ownershipGrid}>{c.ownershipItems.map((item, index) => { const Icon = [Server, ArrowUpRight, ShieldCheck][index]; return <div key={item.title}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.copy}</p></div>; })}</div>
          </div>
        </section>

        <section className="site-section">
          <div className={`site-shell ${styles.faqGrid}`}><div><p className="site-eyebrow">{c.faqEyebrow}</p><h2 className="site-heading mt-4">{c.faqTitle}</h2></div><div className={styles.faqList}>
            {c.faqs.map(faq => <details key={faq.q}><summary>{faq.q}<ChevronDown aria-hidden="true" /></summary><div><p>{faq.a}</p><Link className="site-link" href={href(faq.href)}>{faq.link}<ArrowRight aria-hidden="true" /></Link></div></details>)}
          </div></div>
        </section>

        <section className={styles.closing}>
          <div className={`site-shell ${styles.closingInner}`}><div><h2 className="site-heading">{c.closingTitle}</h2><p className={`${styles.bodyCopy} mt-4`}>{c.closingCopy}</p></div><div><div className={styles.actions}><a href={publicDemoUrl} className="site-button site-button-primary">{c.demo}<ArrowUpRight aria-hidden="true" /></a><Link href={href("/docs#docker")} className="site-button site-button-secondary">{c.host}</Link></div><a href={githubUrl} className={`${styles.githubLink} site-link`}><Github aria-hidden="true" />{c.github}</a></div></div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
