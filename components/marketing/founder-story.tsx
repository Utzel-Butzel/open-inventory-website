import Image from "next/image";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import { OldStoragePhotos } from "@/components/marketing/old-storage-photos";
import styles from "./ai-story.module.css";

export function FounderStory({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  return (
    <section className={`site-section ${styles.storySection}`} id="geschichte">
      <div className={`site-shell ${styles.story}`}>
        <div>
          <p className="site-eyebrow">{de ? "Warum ich Open Inventory baue" : "Why I am building Open Inventory"}</p>
          <h2 className="site-heading mt-4">{de ? "Wir wussten oft gar nicht, was wir schon haben." : "We often didn’t even know what we already had."}</h2>
          <div className={styles.founderIdentity}>
            <Image src="/marketing/people/robert.jpg" alt={de ? "Robert, Entwickler von Open Inventory" : "Robert, creator of Open Inventory"} width={800} height={800} sizes="96px" className={styles.founderPortrait} />
            <p className={styles.signature}>Robert <span>{de ? "Entwickler von Open Inventory" : "Creator of Open Inventory"}</span></p>
          </div>
        </div>
        <div className={styles.storyText}>
          <p>{de ? "Ich bin Robert. Im Makerspace von " : "I’m Robert. At the makerspace at "}<a href="https://konglomerat.org">konglomerat.org</a>{de ? " war es schwierig, den Überblick zu behalten. Die Leute wussten oft nicht, welche Werkzeuge und Geräte es überhaupt gibt – und wo sie liegen." : ", it was hard to keep track of everything. People often didn’t know which tools and equipment we had, or where to find them."}</p>
          <p>{de ? "Bei " : "At "}<a href="https://paperlesspaper.de">paperlesspaper.de</a>{de ? " hatte ich ein anderes Problem: Wie viele Teile sind gerade noch da? Und wann müssen wir nachbestellen? Auch dafür fehlte mir die Übersicht." : ", I had a different problem: how many parts do we have left, and when do we need to reorder? I needed a way to see that, too."}</p>
          <p>{de ? "Deshalb baue ich Open Inventory. Ich wollte ein System, das für beides passt. Das Erfassen war mir bisher aber zu umständlich: jedes Teil anlegen, ein Bild bearbeiten, Titel und Beschreibung schreiben. Jetzt soll ein Foto den Anfang machen. Die KI übernimmt das Freistellen und schlägt die Angaben vor." : "That’s why I’m building Open Inventory. I wanted one system that could handle both. Recording everything had been too much work: adding each item, editing its photo, writing a title and description. Now I want to start with a photo. AI removes the background and suggests the details."}</p>
          <a className="site-link" href="https://github.com/Utzel-Butzel/inventory">{de ? "Zum Projekt auf GitHub →" : "View the project on GitHub →"}</a>
        </div>
      </div>
      <OldStoragePhotos locale={locale} />
      <div className={`site-shell ${styles.storyPhotos}`}>
        <figure>
          <a href="https://paperlesspaper.de/buy-7-inch-epaper-picture-frame">
            <Image
              src="/marketing/paperlesspaper/circuit-boards.jpg"
              alt={de ? "Platinen von paperlesspaper mit USB-C-Anschluss, Tastern und weiteren Bauteilen" : "Paperlesspaper circuit boards with USB-C ports, buttons and other components"}
              width={1920}
              height={1280}
              sizes="(max-width: 767px) 92vw, 580px"
            />
          </a>
          <figcaption>{de ? "Die Elektronik für die Bilderrahmen." : "The electronics inside the picture frames."}</figcaption>
        </figure>
        <figure>
          <a href="https://paperlesspaper.de">
            <Image
              src="/marketing/paperlesspaper/epaper-frame.jpg"
              alt={de ? "Ein ePaper-Bilderrahmen von paperlesspaper neben einem grünen Sofa" : "A paperlesspaper ePaper picture frame beside a green sofa"}
              width={868}
              height={579}
              sizes="(max-width: 767px) 92vw, 580px"
            />
          </a>
          <figcaption>{de ? "Der fertige ePaper-Bilderrahmen." : "The finished ePaper picture frame."}</figcaption>
        </figure>
        <p className={styles.photoCredit}>{de ? "Fotos: " : "Photos: "}<a href="https://paperlesspaper.de">paperlesspaper.de ↗</a></p>
      </div>
    </section>
  );
}
