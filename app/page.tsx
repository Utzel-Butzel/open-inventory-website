import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Github, ScanLine, Server, ShieldCheck } from "lucide-react";

import { MarketingFooter, MarketingHeader } from "@/components/marketing/site-chrome";
import { marketingHref, marketingOgLocale, marketingPathAlternates } from "@/lib/marketing-i18n";
import { getMarketingLocale } from "@/lib/marketing-locale";
import { publicDemoUrl } from "@/lib/site-config";
import styles from "./page.module.css";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";

const content = {
  de: {
    title: "Open Inventory – Wissen, was da ist.",
    description: "Geräte und Material erfassen, Standorte finden und Bestände und Ausleihen nachvollziehen. Open Source, selbst hostbar und mit nativer iPhone-App.",
    headline: ["Wissen, was da ist.", "Und wo."],
    intro: "Geräte, Werkzeug und Material an einem Ort verwalten. Finde, was du brauchst, sieh den verfügbaren Bestand und behalte Ausleihen im Blick.",
    demo: "Live-Demo öffnen", host: "Selbst hosten", facts: ["Open Source · MIT-Lizenz", "Auf deinem Server", "Web & iPhone"],
    photoAlt: "Eine Person lötet an einer Platine an einem benutzten Werkstatttisch",
    searchAlt: "Echte iPhone-App mit der Suche nach Löt: Lötstation Weller WE1010, verfügbar im Elektroniklabor an Bank 3",
    captureLabel: "Gefunden im Elektroniklabor.", captureNote: "iPhone-App · Beispieldaten",
    strap: "Für die Dinge, mit denen ihr arbeitet.",
    audiences: ["Werkstätten", "Makerspaces", "Technikteams", "Vereine & Verleih"],
    workflowEyebrow: "Vom ersten Foto bis zur Rückgabe",
    workflowTitle: "Ein Eintrag. Im Alltag immer dabei.",
    workflowIntro: "Foto, Standort und Bestand gehören zusammen. Damit dein Team beim Suchen, Ausgeben und Zurücknehmen auf dieselben Informationen zugreift.",
    steps: [
      { title: "Erfassen", copy: "Mit einem Foto oder vorhandenen Daten beginnen. Die optionale KI schlägt Angaben vor, die du prüfen und ergänzen kannst.", link: "Fotoerfassung ansehen", href: "/features/erfassen" },
      { title: "Wiederfinden", copy: "Nach Name, Stichwort oder Standort suchen. QR- und Barcodes führen direkt zum passenden Inventareintrag.", link: "Suche & Struktur", href: "/features/strukturieren" },
      { title: "Weitergeben", copy: "Ausleihen, Rückgaben und Bestandsbewegungen dokumentieren. So bleibt nachvollziehbar, was ausgegeben wurde.", link: "Bestand & Ausleihe", href: "/features/bestand-ausleihe" },
    ],
    stockEyebrow: "Geräte und Verbrauchsmaterial",
    stockTitle: "Der Bohrer wird verliehen. Die Schrauben werden weniger.",
    stockCopy: "Einzelne Geräte und Mengenbestände brauchen unterschiedliche Abläufe. Open Inventory führt beides mit Standorten, Verfügbarkeit und einer nachvollziehbaren Historie.",
    stockPoints: ["Bestände auf mehrere Lagerorte verteilen", "Reservierungen und Ausleihen nachvollziehen", "Verbrauch und Lieferungen für Nachbestellungen planen"],
    stockLink: "Bestandsverwaltung kennenlernen",
    stockAlt: "Bestandsübersicht der Web-App mit Mengen, erwarteten Lieferungen und Artikeln mit niedrigem Bestand",
    webCaption: "Open Inventory im Browser · Beispieldaten",
    mobileEyebrow: "Direkt am Regal",
    mobileTitle: "Das Inventar kommt mit.",
    mobileCopy: "Ein Etikett scannen, den Standort nachsehen oder einen Zugang buchen. Die native iPhone-App verbindet die Arbeit vor Ort mit deiner eigenen Instanz.",
    mobileLink: "Die iPhone-App ansehen", mobileNote: "iOS 17+ · App-Store-Veröffentlichung in Vorbereitung",
    mobileAlt: "iPhone-Detailansicht der Lötstation mit Foto, Standort Elektroniklabor Bank 3 und Bestand zwei",
    scenariosEyebrow: "Im Einsatz gedacht",
    scenariosTitle: "Jeder Ort hat sein eigenes Inventar.",
    scenarios: [
      { title: "Werkstatt & Service", copy: "Werkzeug zwischen Regal, Fahrzeug und Einsatzort verfolgen.", href: "/use-cases/handwerk" },
      { title: "Makerspace", copy: "Gemeinsame Maschinen, Leihgeräte und Kleinteile organisieren.", href: "/use-cases/makerspace" },
      { title: "Technikteam", copy: "Prüfgeräte zuordnen und Material für die nächste Arbeit finden.", href: "/use-cases/startup" },
    ],
    scenarioLink: "Alle Einsatzbereiche", scenarioPhotoAlt: "Hände an einem gebrauchten Werkzeugkoffer auf einem Holztisch",
    scenarioCaption: "Werkzeug im Arbeitsalltag · Foto: Anete Lusina / Pexels",
    ownershipEyebrow: "Offene Software. Eigener Betrieb.",
    ownershipTitle: "Dein Inventar. Deine Infrastruktur.",
    ownershipCopy: "Open Inventory läuft auf deinem Server. Quellcode, Dokumentation und Schnittstellen sind offen – damit du selbst entscheiden kannst, wie dein Inventar verwaltet wird.",
    ownershipItems: [
      { title: "Selbst betreiben", copy: "Mit Docker Compose starten. Backups, Updates und Zugang verwaltest du selbst." },
      { title: "Daten mitnehmen", copy: "Vorhandene Listen importieren, Daten exportieren und eigene Systeme per API anbinden." },
      { title: "KI nach Bedarf", copy: "Die Inventarverwaltung funktioniert ohne KI. Externe Dienste aktivierst du bei Bedarf." },
    ],
    ownershipLink: "Mehr zu Betrieb und Daten", faqEyebrow: "Vor dem Start", faqTitle: "Gut zu wissen.",
    faqs: [
      { q: "Wie drucke ich Etiketten?", a: "Im Browser-Druckdialog, per QZ Tray am lokalen Brother PT-P710BT oder über einen gemeinsamen Bürodrucker mit Windows-Agent. Du kannst Artikel und Einzelgeräte auswählen, Vorlagen gestalten und Drucklisten speichern.", href: "/docs#printing", link: "Drucker einrichten" },
      { q: "Was kostet Open Inventory?", a: "Die Software ist unter der MIT-Lizenz kostenlos nutzbar. Kosten können für deinen Server und optional verwendete externe Dienste entstehen.", href: "/open-source", link: "Lizenz und Betrieb" },
      { q: "Was brauche ich zum Selbst-Hosting?", a: "Einen Server mit Docker Compose sowie Speicher für Datenbank und Bilder. Für den laufenden Betrieb gehören Backups, Updates und ein sicherer Zugang dazu. Die Dokumentation führt dich durch die Einrichtung.", href: "/docs#docker", link: "Zur Installationsanleitung" },
      { q: "Kann ich meine vorhandenen Listen übernehmen?", a: "Ja. Du kannst Inventar als CSV-Datei importieren. Verwende dafür die vorgesehenen Spaltennamen. Listen aus Excel kannst du zuerst als CSV speichern.", href: "/docs", link: "Dokumentation öffnen" },
      { q: "Funktioniert die Anwendung ohne KI?", a: "Ja. Inventar, Standorte und Bestände lassen sich ohne KI verwalten. Wenn du KI-Funktionen aktivierst, werden die dafür benötigten Inhalte an den konfigurierten Dienst gesendet.", href: "/open-source", link: "Datenfluss nachvollziehen" },
      { q: "Wie bekomme ich die iPhone-App?", a: "Der Quellcode der nativen App ist öffentlich. Die App-Store-Veröffentlichung ist in Vorbereitung. Die App benötigt iOS 17 oder neuer und eine erreichbare Open-Inventory-Instanz.", href: "/ios", link: "Zur iPhone-App" },
    ],
    closingTitle: "Mach dir selbst ein Bild.", closingCopy: "Öffne die Demo mit Beispieldaten oder richte Open Inventory auf deinem Server ein.", github: "Quellcode auf GitHub",
  },
  en: {
    title: "Open Inventory – Know what you have.",
    description: "Catalogue equipment and supplies, find locations and keep track of stock and loans. Open source, self-hosted and with a native iPhone app.",
    headline: ["Know what you have.", "And where it is."],
    intro: "Keep equipment, tools and supplies in one place. Find what you need, check available stock and keep track of what is on loan.",
    demo: "Open live demo", host: "Host it yourself", facts: ["Open source · MIT license", "On your server", "Web & iPhone"],
    photoAlt: "A person soldering a circuit board at a well-used workshop bench",
    searchAlt: "Actual iPhone app searching for a soldering station, showing availability and its location at electronics lab bench 3",
    captureLabel: "Found in the electronics lab.", captureNote: "iPhone app · Demo data · German interface",
    strap: "For the things your team works with.", audiences: ["Workshops", "Makerspaces", "Technical teams", "Clubs & lending"],
    workflowEyebrow: "From the first photo to the return",
    workflowTitle: "One record. Part of every working day.",
    workflowIntro: "Photos, locations and stock belong together. Your team works with the same information when finding, handing over and returning equipment.",
    steps: [
      { title: "Capture", copy: "Start with a photo or your existing data. Optional AI suggests details for you to review and complete.", link: "Explore photo capture", href: "/features/erfassen" },
      { title: "Find", copy: "Search by name, keyword or location. QR codes and barcodes take you straight to the right inventory record.", link: "Search & organise", href: "/features/strukturieren" },
      { title: "Hand over", copy: "Record loans, returns and stock movements. Keep a history of what was issued and what came back.", link: "Stock & lending", href: "/features/bestand-ausleihe" },
    ],
    stockEyebrow: "Equipment and consumables", stockTitle: "The drill goes on loan. The screws get used up.",
    stockCopy: "Individual equipment and bulk supplies need different workflows. Open Inventory tracks both, with locations, availability and a clear history.",
    stockPoints: ["Distribute stock across storage locations", "Keep track of reservations and loans", "Use consumption and deliveries to plan replenishment"],
    stockLink: "Explore stock management", stockAlt: "Web stock overview with quantities, expected deliveries and low-stock items",
    webCaption: "Open Inventory in the browser · Demo data · German interface",
    mobileEyebrow: "Right at the shelf", mobileTitle: "Take your inventory with you.",
    mobileCopy: "Scan a label, check a location or record incoming stock. The native iPhone app connects work in the field to your own instance.",
    mobileLink: "Explore the iPhone app", mobileNote: "iOS 17+ · App Store release in preparation",
    mobileAlt: "iPhone detail view of a soldering station with its photo, electronics lab location and two units in stock",
    scenariosEyebrow: "Everyday settings", scenariosTitle: "Every place has its own inventory.",
    scenarios: [
      { title: "Workshops & service", copy: "Follow tools between the shelf, the van and the job site.", href: "/use-cases/handwerk" },
      { title: "Makerspaces", copy: "Organise shared machines, loan equipment and small parts.", href: "/use-cases/makerspace" },
      { title: "Technical teams", copy: "Assign test equipment and find supplies for the next job.", href: "/use-cases/startup" },
    ],
    scenarioLink: "All use cases", scenarioPhotoAlt: "Hands opening a used tool case on a wooden workbench",
    scenarioCaption: "Tools in everyday work · Photo: Anete Lusina / Pexels",
    ownershipEyebrow: "Open software. Your own infrastructure.", ownershipTitle: "Your inventory. Your server.",
    ownershipCopy: "Open Inventory runs on your server. The source code, documentation and interfaces are open, so you can decide how to manage your inventory.",
    ownershipItems: [
      { title: "Run it yourself", copy: "Get started with Docker Compose. Manage your own backups, updates and access." },
      { title: "Keep your data portable", copy: "Import existing lists, export your data and connect your own systems through the API." },
      { title: "Choose when to use AI", copy: "Inventory management works without AI. Enable external services when you need them." },
    ],
    ownershipLink: "About hosting and data", faqEyebrow: "Before you start", faqTitle: "Good to know.",
    faqs: [
      { q: "How do I print labels?", a: "Use the browser print dialog, QZ Tray on a local Brother PT-P710BT or a shared Office printer with a Windows agent. Choose items or individual units, design templates and save print lists.", href: "/docs#printing", link: "Set up printing" },
      { q: "What does Open Inventory cost?", a: "The software is free to use under the MIT license. Your server and any optional external services may have their own costs.", href: "/open-source", link: "License and hosting" },
      { q: "What do I need to self-host?", a: "A server with Docker Compose and storage for the database and images. Operating your instance includes backups, updates and secure access. The documentation walks you through setup.", href: "/docs#docker", link: "Read the installation guide" },
      { q: "Can I import my existing lists?", a: "Yes. You can import inventory from a CSV file using the supported column names. Save existing Excel lists as CSV before importing.", href: "/docs", link: "Open the documentation" },
      { q: "Does it work without AI?", a: "Yes. You can manage inventory, locations and stock without AI. If you enable AI features, the content they need is sent to the configured provider.", href: "/open-source", link: "Understand the data flow" },
      { q: "How do I get the iPhone app?", a: "The native app’s source code is public. The App Store release is in preparation. The app requires iOS 17 or later and access to an Open Inventory instance.", href: "/ios", link: "About the iPhone app" },
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
              <figcaption className={styles.heroCaption}>{c.captureNote}</figcaption>
            </figure>
          </div>
        </section>

        <div className={styles.audienceStrip}>
          <div className={`site-shell ${styles.audienceInner}`}><p>{c.strap}</p><ul>{c.audiences.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>

        <section className="site-section" id="workflow">
          <div className="site-shell">
            <div className={styles.sectionIntro}>
              <div><p className="site-eyebrow">{c.workflowEyebrow}</p><h2 className="site-heading mt-4">{c.workflowTitle}</h2></div>
              <p className={styles.bodyCopy}>{c.workflowIntro}</p>
            </div>
            <ol className={styles.steps}>{c.steps.map((step, index) => (
              <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p><Link className="site-link" href={href(step.href)}>{step.link}<ArrowRight aria-hidden="true" /></Link></li>
            ))}</ol>
          </div>
        </section>

        <section className={`site-section ${styles.stockSection}`}>
          <div className={`site-shell ${styles.stockGrid}`}>
            <div><p className="site-eyebrow">{c.stockEyebrow}</p><h2 className="site-heading mt-4">{c.stockTitle}</h2><p className={`${styles.bodyCopy} mt-6`}>{c.stockCopy}</p>
              <ul className={styles.checklist}>{c.stockPoints.map(point => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>
              <Link className="site-link mt-7" href={href("/features/bestand-ausleihe")}>{c.stockLink}<ArrowRight aria-hidden="true" /></Link>
            </div>
            <figure className="site-product-frame"><Image src="/marketing/screenshots/web-stock-home.png" alt={c.stockAlt} width={1148} height={735} sizes="(max-width: 900px) 90vw, 58vw" className="h-auto w-full" /><figcaption className={styles.productCaption}>{c.webCaption}</figcaption></figure>
          </div>
        </section>

        <section className="site-section">
          <div className={`site-shell ${styles.mobileGrid}`}>
            <figure className={styles.mobileFigure}>
              <div className={styles.phone}><Image src="/marketing/screenshots/ios-item-detail.png" alt={c.mobileAlt} width={1206} height={2622} sizes="280px" className="h-auto w-full" /></div>
              <figcaption>{c.captureNote}</figcaption>
            </figure>
            <div className={styles.mobileCopy}><p className="site-eyebrow">{c.mobileEyebrow}</p><h2 className="site-heading mt-4">{c.mobileTitle}</h2><p className={`${styles.bodyCopy} mt-6`}>{c.mobileCopy}</p><Link href={href("/ios")} className="site-link mt-7">{c.mobileLink}<ArrowRight aria-hidden="true" /></Link><p className={styles.availability}>{c.mobileNote}</p></div>
          </div>
        </section>

        <section className={`site-section ${styles.scenarioSection}`}>
          <div className={`site-shell ${styles.scenarioGrid}`}>
            <figure><div className={styles.scenarioPhoto}><Image src="/marketing/photography/trades-tool-case.webp" alt={c.scenarioPhotoAlt} fill sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /></div><figcaption className={styles.photoCaption}>{c.scenarioCaption}</figcaption></figure>
            <div><p className="site-eyebrow">{c.scenariosEyebrow}</p><h2 className="site-heading mt-4">{c.scenariosTitle}</h2>
              <div className={styles.scenarioList}>{c.scenarios.map(item => <Link key={item.href} href={href(item.href)}><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight aria-hidden="true" /></Link>)}</div>
              <Link className="site-link mt-6" href={href("/use-cases")}>{c.scenarioLink}<ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell">
            <div className={styles.sectionIntro}><div><p className="site-eyebrow">{c.ownershipEyebrow}</p><h2 className="site-heading mt-4">{c.ownershipTitle}</h2></div><div><p className={styles.bodyCopy}>{c.ownershipCopy}</p><Link href={href("/open-source")} className="site-link mt-5">{c.ownershipLink}<ArrowRight aria-hidden="true" /></Link></div></div>
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
