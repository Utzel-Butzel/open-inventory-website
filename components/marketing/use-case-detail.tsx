import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MarketingFooter, MarketingHeader } from "./site-chrome";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import { publicDemoUrl } from "@/lib/site-config";
import { useCaseWebCaptures, type UseCase } from "@/app/use-cases/use-cases";
import { AiPhotoExample } from "./ai-photo-example";
import styles from "./use-case-detail.module.css";

// These are example workflows, not customer testimonials or usage claims.
const contexts: Record<string, { de: string[]; en: string[] }> = {
  makerspace: {
    de: ["Wer hat den Akkuschrauber?", "Ein Werkzeug von der Aufnahme bis zur Rückgabe", "Werkzeugausgabe und Materiallager", "Bestände und Buchungen im Browser"],
    en: ["Who has the cordless drill?", "A tool from its first photo to its return", "Tool lending and workshop supplies", "Stock and movements in the browser"],
  },
  familie: {
    de: ["In welcher Kiste liegt der Campingkocher?", "Eine Kiste für den nächsten Campingurlaub", "Kisten, Erinnerungsstücke und geliehene Dinge", "Etiketten im Browser gestalten"],
    en: ["Which box is the camping stove in?", "Packing a box for the next camping trip", "Storage boxes, keepsakes and borrowed items", "Designing labels in the browser"],
  },
  startup: {
    de: ["Welches Gerät ist noch frei?", "Einen Laptop an ein Teammitglied ausgeben", "Geräte im Team verwalten", "Angaben, Fotos und Standort am Eintrag"],
    en: ["Which device is available?", "Assigning a laptop to a team member", "Managing team equipment", "Details, photos and location in an item record"],
  },
  verein: {
    de: ["Ist das Material für Samstag noch da?", "Die Ausrüstung für eine Veranstaltung vorbereiten", "Ausleihe im Verein organisieren", "Materialbestand und Verfügbarkeit"],
    en: ["Is the equipment available for Saturday?", "Preparing equipment for an event", "Organising club loans", "Stock and availability"],
  },
  sammlung: {
    de: ["Was weißt du über dieses Stück?", "Ein neues Sammlungsstück dokumentieren", "Fotos und Angaben zur Sammlung", "Fotos und Angaben an einem Eintrag"],
    en: ["What do you know about this piece?", "Documenting a new addition to a collection", "Collection photos and records", "Photos and details in one record"],
  },
  schule: {
    de: ["Wo ist der Beamer für den Unterricht?", "Ein Leihgerät für die nächste Stunde erfassen", "Unterrichtsmaterial gemeinsam nutzen", "Bestände im Überblick"],
    en: ["Where is the classroom projector?", "Recording equipment for the next lesson", "Sharing teaching equipment", "Stock overview"],
  },
  handwerk: {
    de: ["Liegt das Werkzeug im Lager oder im Fahrzeug?", "Werkzeug für einen Einsatz vorbereiten", "Werkzeug und Material unterwegs", "Bestände an mehreren Lagerorten"],
    en: ["Is the tool in storage or in the van?", "Preparing tools for a job", "Tools and supplies on site", "Stock across storage locations"],
  },
  labor: {
    de: ["An welchem Arbeitsplatz steht das Messgerät?", "Ein Messgerät im Labor zuordnen", "Geräte, Proben und Verbrauchsmaterial", "Bestände an mehreren Standorten"],
    en: ["Which bench is the instrument on?", "Assigning an instrument in the lab", "Instruments, samples and consumables", "Stock across locations"],
  },
};

export function UseCaseDetail({ useCase, locale }: { useCase: UseCase; locale: MarketingLocale }) {
  const de = locale === "de";
  const [question, workflow, features, caption] = contexts[useCase.slug][locale];
  const href = (path: string) => marketingHref(locale, path);
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main id="main-content" className={styles.page}>
        <section className={`site-shell ${styles.hero}`}>
          <Link href={href("/use-cases")} className="site-link"><ArrowLeft aria-hidden="true" />{de ? "Alle Einsatzbereiche" : "All use cases"}</Link>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.label}>{useCase.eyebrow}</p>
              <h1>{question}</h1>
              <p className={styles.intro}>{useCase.description}</p>
              <div className={styles.actions}>
                <a href={publicDemoUrl} className="site-button site-button-primary">{de ? "Demo ausprobieren" : "Try the demo"}<ArrowRight className="size-4" aria-hidden="true" /></a>
                <Link href={href("/docs#docker")} className="site-link">{de ? "Selbst hosten" : "Host it yourself"}</Link>
              </div>
              <p className={styles.note}>{de ? "Kostenlose Software · MIT-Lizenz · Eigener Server erforderlich" : "Free software · MIT license · Requires your own server"}</p>
            </div>
            {useCase.slug === "makerspace" ? <AiPhotoExample locale={locale} eager /> : (
            <figure className={styles.product}>
              <Image src={useCaseWebCaptures[useCase.slug]} alt={caption} width={1440} height={960} preload sizes="(max-width: 900px) 92vw, 650px" className="h-auto w-full" />
              <figcaption>{caption} · {de ? "Beispieldaten" : "Demo data, German interface"}</figcaption>
            </figure>
            )}
          </div>
        </section>

        <section className={styles.workflow}>
          <div className={`site-shell ${styles.workflowGrid}`}>
            <div>
              <p className={styles.label}>{de ? "Ein Beispiel aus dem Alltag" : "An everyday example"}</p>
              <h2>{workflow}</h2>
              <p className={styles.body}>{useCase.challenge}</p>
            </div>
            <ol className={styles.steps}>
              {useCase.steps.map((step, index) => <li key={step.title}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>)}
            </ol>
          </div>
        </section>

        <section className={`site-shell ${styles.features}`}>
          <p className={styles.label}>{de ? "Im Detail" : "In detail"}</p>
          <h2>{features}</h2>
          <dl className={styles.featureList}>
            {useCase.features.map(feature => <div key={feature.title}><dt>{feature.title}</dt><dd>{feature.description}</dd></div>)}
          </dl>
          <Link href={href("/features")} className="site-link">{de ? "Alle Funktionen ansehen" : "Explore all features"}<ArrowRight aria-hidden="true" /></Link>
        </section>

        <section className={styles.closing}>
          <div className={`site-shell ${styles.workflowGrid}`}>
            <div><h2>{de ? "Passt das zu eurem Alltag?" : "Does it fit your day-to-day work?"}</h2><p className={styles.body}>{de ? "In der Demo kannst du Einträge, Standorte und Bestände ansehen. Für eigene Daten installierst du Open Inventory auf deinem Server." : "Explore records, locations and stock in the demo. To manage your own data, install Open Inventory on your server."}</p><div className={styles.actions}><a href={publicDemoUrl} className="site-button site-button-primary">{de ? "Live-Demo öffnen" : "Open live demo"}</a><Link className="site-link" href={href("/docs#docker")}>{de ? "Installationsanleitung" : "Installation guide"}<ArrowRight aria-hidden="true" /></Link></div></div>
            <div className={styles.related}><p className={styles.label}>{de ? "Betrieb und Apps" : "Hosting and apps"}</p><p>{de ? "Du kümmerst dich um Zugang, Updates und Backups. Die mobilen Apps verbinden sich mit derselben Installation." : "You manage access, updates and backups. The mobile apps connect to the same installation."}</p><Link className="site-link" href={href("/open-source")}>{de ? "Lizenz und eigener Betrieb" : "License and self-hosting"}<ArrowRight aria-hidden="true" /></Link><Link className="site-link" href={href("/app#app-downloads")}>{de ? "Apps und Verfügbarkeit" : "Apps and availability"}<ArrowRight aria-hidden="true" /></Link></div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
