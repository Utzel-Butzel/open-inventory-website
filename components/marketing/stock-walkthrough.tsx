"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./stock-walkthrough.module.css";

const copy = {
  de: {
    title: "Geräte und Verbrauchsmaterial in Open Inventory",
    description: "Bedienvideo: Den Bohrschrauber öffnen, verfügbare und ausgegebene Einzelgeräte ansehen und die Ausgabe an das Projekt Lastenrad nachverfolgen. Danach nach Schrauben suchen und den Verbrauch prüfen: Von 200 Stück wurden 74 entnommen, 126 sind noch verfügbar.",
    download: "Bedienvideo öffnen",
    play: "Video mit doppelter Geschwindigkeit abspielen",
  },
  en: {
    title: "Equipment and consumables in Open Inventory",
    description: "Walkthrough of the German interface: open the drill, inspect available and issued units, and review the loan to the cargo bike project. Then search for screws and check consumption: 74 of the original 200 screws were used, leaving 126 available.",
    download: "Open walkthrough video",
    play: "Play video at double speed",
  },
};

export function StockWalkthrough({ locale }: { locale: MarketingLocale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const c = copy[locale];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultPlaybackRate = 2;
    video.playbackRate = 2;
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.25) video.pause();
    }, { threshold: 0.25 });

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, []);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = 2;
    video.playbackRate = 2;
    void video.play().then(() => video.focus({ preventScroll: true })).catch(() => {});
  };

  return (
    <figure className={`site-product-frame ${styles.root}`}>
      <video
        id="stock-walkthrough-video"
        ref={videoRef}
        className="block h-auto w-full"
        width={1440}
        height={1100}
        poster="/marketing/videos/equipment-consumables.webp"
        controls={hasStarted}
        tabIndex={hasStarted ? 0 : -1}
        onPlay={() => setHasStarted(true)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={c.title}
        aria-describedby="stock-walkthrough-description"
      >
        <source src="/marketing/videos/equipment-consumables.mp4" type="video/mp4" />
        <a href="/marketing/videos/equipment-consumables.mp4">{c.download}</a>
      </video>
      {!hasStarted && (
        <button
          type="button"
          className={styles.playButton}
          onClick={startPlayback}
          aria-label={c.play}
          aria-controls="stock-walkthrough-video"
          title={c.play}
        >
          <Play aria-hidden="true" />
        </button>
      )}
      <figcaption id="stock-walkthrough-description" className="sr-only">{c.description}</figcaption>
    </figure>
  );
}
