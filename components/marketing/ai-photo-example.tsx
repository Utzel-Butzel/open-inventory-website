import Image from "next/image";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import { AiEntryDraft } from "./ai-entry-draft";
import { AiPhotoAnimation } from "./ai-photo-animation";
import styles from "./ai-story.module.css";

export function AiPhotoExample({ locale, eager = false, animated = false }: { locale: MarketingLocale; eager?: boolean; animated?: boolean }) {
  const de = locale === "de";
  return (
    <figure className={styles.example}>
      {animated ? <AiPhotoAnimation locale={locale} /> : <div className={styles.photos}>
        <div>
          <p className={styles.photoLabel}>{de ? "01 · Dein Foto" : "01 · Your photo"}</p>
          <div className={styles.original}>
            <Image src="/marketing/ai-example/drill-before.png" alt={de ? "Beispiel: gebrauchter Akkuschrauber auf einer Werkbank" : "Example: a used cordless drill on a workbench"} width={1254} height={1254} sizes="(max-width: 600px) 44vw, (max-width: 767px) 28vw, 220px" loading={eager ? "eager" : "lazy"} />
          </div>
        </div>
        <div>
          <p className={styles.photoLabel}>{de ? "02 · Freigestellt" : "02 · Background removed"}</p>
          <div className={styles.cutout}>
            <Image src="/marketing/ai-example/drill-after.png" alt={de ? "Derselbe Akkuschrauber mit entferntem Hintergrund" : "The same cordless drill with its background removed"} width={1254} height={1254} sizes="(max-width: 600px) 44vw, (max-width: 767px) 28vw, 220px" loading={eager ? "eager" : "lazy"} />
          </div>
        </div>
        <div className={styles.productStep}>
          <p className={styles.photoLabel}>{de ? "03 · Produktfoto" : "03 · Product photo"}</p>
          <div className={styles.productPhoto}>
            <Image src="/marketing/ai-example/drill-product-clean.png" alt={de ? "KI-Produktfoto des gereinigten Akkuschraubers: Dreiviertelperspektive, weiches Studiolicht und transparenter Hintergrund" : "AI product photo of the cleaned drill: three-quarter view, soft studio lighting and a transparent background"} width={1254} height={1254} sizes="(max-width: 600px) 90vw, (max-width: 767px) 28vw, 220px" loading={eager ? "eager" : "lazy"} />
          </div>
        </div>
      </div>}
      <p className={styles.productNote}>{de ? "Produktfoto: mit KI gereinigt, neu ausgeleuchtet und freigestellt." : "Product photo: cleaned, relit and isolated with AI."}</p>
      <AiEntryDraft locale={locale} animated={animated} />
    </figure>
  );
}
