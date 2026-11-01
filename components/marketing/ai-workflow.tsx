import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./ai-story.module.css";

export function AiWorkflow({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const tasks = de ? [
    ["Das Bild aufräumen", "Die KI entfernt den Hintergrund und stellt den Gegenstand frei. So wird aus dem schnellen Foto ein übersichtliches Inventarbild. Das Original bleibt erhalten."],
    ["Titel und Beschreibung erhalten", "Aus dem Foto entstehen Vorschläge für Titel, Beschreibung, Typ und Schlagwörter. Ein zusätzliches Foto vom Typenschild hilft bei Modellnamen und technischen Angaben."],
    ["Das nächste Teil fotografieren", "Für mehrere Gegenstände legst du den Standort einmal fest. Während Bilder und Angaben verarbeitet werden, kannst du mit der nächsten Aufnahme weitermachen."],
  ] : [
    ["Clean up the photo", "AI removes the background and isolates the object, turning a quick snapshot into a clear inventory image. The original stays available."],
    ["Get a title and description", "The photo becomes suggestions for a title, description, type and tags. An extra photo of the nameplate helps with model names and technical details."],
    ["Photograph the next item", "Set a shared location once for a batch of objects. While images and details are processed, you can move on to the next photo."],
  ];
  return (
    <section className={`site-section ${styles.aiSection}`} id="ki-werkzeuge">
      <div className="site-shell">
        <div className={styles.intro}>
          <div><p className="site-eyebrow">{de ? "KI-Werkzeuge" : "AI tools"}</p><h2 className="site-heading mt-4">{de ? "Foto aufnehmen, Eintrag vorbereiten lassen." : "Take a photo. Let AI draft the record."}</h2></div>
          <p>{de ? "Du stehst vor einem Regal voller Werkzeug. Statt für jedes Teil die Bilder zu bearbeiten und alle Angaben einzutippen, fotografierst du es. Die optionale KI bereitet Bild und Text vor. Vor dem Speichern prüfst du die Vorschläge und ergänzt etwa Standort und Menge." : "You’re standing in front of a shelf full of tools. Instead of editing each photo and typing every detail, photograph the items. Optional AI prepares the image and text. Before saving, review the suggestions and add details such as location and quantity."}</p>
        </div>
        <ol className={styles.tasks}>{tasks.map(([title, copy], i) => <li key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        <div className={styles.more}>
          <div><h3>{de ? "Auch nach dem ersten Foto" : "Beyond the first photo"}</h3><p>{de ? "Fehlende Produktangaben lassen sich per KI recherchieren. Über MCP können kompatible KI-Assistenten dein Inventar durchsuchen und – mit den passenden Berechtigungen – bearbeiten." : "AI research can help fill in missing product details. Through MCP, compatible AI assistants can search your inventory and, with the appropriate permissions, update it."}</p><Link href={marketingHref(locale, "/features/labels-api#mcp")} className="site-link">{de ? "Schnittstellen kennenlernen" : "Explore the integrations"}<ArrowRight aria-hidden="true" /></Link></div>
          <p className={styles.note}>{de ? "Du entscheidest, welche KI-Funktionen du aktivierst. Dafür brauchst du einen eingerichteten KI-Dienst; je nach Anbieter entstehen Nutzungskosten. Ohne KI kannst du dein Inventar ebenfalls vollständig verwalten." : "You choose which AI features to enable. They need a configured AI provider and may incur usage costs. You can also manage your inventory without AI."}</p>
        </div>
      </div>
    </section>
  );
}
