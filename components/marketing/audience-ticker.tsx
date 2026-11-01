"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./audience-ticker.module.css";

export function AudienceTicker({ items, locale }: { items: string[]; locale: MarketingLocale }) {
  const [paused, setPaused] = useState(false);
  const label = locale === "de"
    ? (paused ? "Animation fortsetzen" : "Animation pausieren")
    : (paused ? "Resume animation" : "Pause animation");

  return (
    <div className={styles.root} data-paused={paused}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <ul className={styles.list} aria-label={locale === "de" ? "Einsatzbereiche" : "Use cases"}>
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
          <ul className={`${styles.list} ${styles.copy}`} aria-hidden="true">
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <button type="button" className={styles.toggle} onClick={() => setPaused(value => !value)} aria-label={label} title={label}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
