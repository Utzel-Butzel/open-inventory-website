import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";

export function RealWorldLabels({ locale, printingLink = false }: { locale: MarketingLocale; printingLink?: boolean }) {
  const de = locale === "de";

  return (
    <section className="site-section scroll-mt-20 border-y border-border" id="etiketten-im-einsatz">
      <div className="site-shell">
        <div className="grid gap-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="site-eyebrow">{de ? "Aus unserem Lager" : "From our storage room"}</p>
            <h2 className="site-heading mt-4">{de ? "Am Regal lesen. Zum Eintrag scannen." : "Read the label. Scan for the details."}</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-muted">{de ? "So nutzen wir die neuen Etiketten: direkt am Regalfach und an der Teilebox. Name und Artikelbild helfen beim Zuordnen. Der QR-Code verbindet den Platz im Lager mit dem Eintrag in Open Inventory." : "Our new labels go straight on the shelf and the parts bin. A name and item photo help identify what belongs there. The QR code connects the physical storage location to its record in Open Inventory."}</p>
            <Link className="site-link mt-5" href={marketingHref(locale, printingLink ? "/docs#printing" : "/features/labels-api")}>
              {printingLink ? (de ? "Etiketten gestalten und drucken" : "Design and print labels") : (de ? "Mehr zu Etiketten und QR-Codes" : "Explore labels and QR codes")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="mt-9 grid items-start gap-7 sm:grid-cols-[16fr_9fr] sm:gap-5">
          <figure>
            <Image src="/marketing/real-world/shelf-labels.webp" alt={de ? "Neue Etiketten für AA- und AAA-Batterien am Regal, mit QR-Code, Namen, Artikelbild und farbiger Kennzeichnung" : "New shelf labels for AA and AAA batteries with QR codes, names, item photos and coloured markers"} width={1280} height={960} sizes="(max-width: 639px) 92vw, (max-width: 1280px) 58vw, 760px" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-3 text-xs leading-6 text-muted">{de ? "Am Regalfach: Batterien mit Namen, Bild und QR-Code." : "On the shelf: batteries identified by name, photo and QR code."}</figcaption>
          </figure>
          <figure>
            <Image src="/marketing/real-world/parts-bin-label.webp" alt={de ? "Blaue Teilebox mit Abstandshaltern und einem neuen Spacer-Etikett mit QR-Code, Artikelbild und gelbem L" : "Blue bin of spacers with a new label showing a QR code, item photo and yellow L marker"} width={960} height={1280} sizes="(max-width: 639px) 92vw, (max-width: 1280px) 33vw, 428px" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-3 text-xs leading-6 text-muted">{de ? "An der Teilebox: das passende Etikett direkt am Material." : "On the parts bin: the matching label stays with the material."}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
