import Image from "next/image";
import type { MarketingLocale } from "@/lib/marketing-i18n";

const photos = [
  { src: "old-shelf-boxes", de: "Lose Kartons und Teile im alten Regal.", en: "Loose boxes and parts on the old shelves.", altDe: "Altes Metallregal mit offenen Kartons und lose gelagerten Bauteilen", altEn: "Old metal shelves holding open boxes and loose components" },
  { src: "old-blue-shelves", de: "Regalfächer vor der neuen Beschriftung.", en: "Shelves before the new labels.", altDe: "Weitgehend leere blaue Lagerregale mit vereinzelten alten Markierungen und Paletten davor", altEn: "Mostly empty blue storage shelves with a few old markings and pallets in front" },
  { src: "old-storage-room", de: "Viele Lagerplätze, noch ohne einheitliche Etiketten.", en: "Plenty of storage space, without consistent labels yet.", altDe: "Reihen alter Metallregale mit wenigen Beschriftungen und grauen Lagerboxen im Vordergrund", altEn: "Rows of old metal shelves with sparse labelling and grey storage bins in the foreground" },
];

export function OldStoragePhotos({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  return (
    <div className="site-shell mt-12 border-t border-border pt-10">
      <p className="site-eyebrow">{de ? "Die Ausgangssituation" : "The starting point"}</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight">{de ? "Regale allein schaffen noch keine Übersicht." : "Shelves alone don’t tell you what you have."}</h3>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{de ? "Diese älteren Aufnahmen zeigen die Situation vor der neuen Beschriftung: lose Kartons, einzelne Markierungen und viele Regalfächer ohne einheitliche Zuordnung. Genau da sollen die neuen Etiketten und ein gemeinsames Inventar helfen." : "These older photos show the situation before the new labels: loose boxes, scattered markings and many shelves without consistent identification. This is where the new labels and a shared inventory are meant to help."}</p>
      <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3">
        {photos.map((photo, index) => (
          <figure key={photo.src} className={index === 0 ? "col-span-2 md:col-span-1" : undefined}>
            <Image src={`/marketing/real-world/${photo.src}.webp`} alt={de ? photo.altDe : photo.altEn} width={960} height={1280} sizes={index === 0 ? "(max-width: 767px) 92vw, (max-width: 1280px) 30vw, 390px" : "(max-width: 767px) 44vw, (max-width: 1280px) 30vw, 390px"} className="h-auto w-full rounded-lg" />
            <figcaption className="mt-3 text-xs leading-6 text-muted">{de ? photo.de : photo.en}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
