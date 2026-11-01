"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./ai-story.module.css";

export function AiEntryDraft({ locale, animated = false }: { locale: MarketingLocale; animated?: boolean }) {
  const de = locale === "de";
  const fields = de ? [
    ["Titel", "Akkuschrauber mit Akku"],
    ["Beschreibung", "Türkis-schwarzes Gehäuse, Schnellspannbohrfutter und eingesetzter Akku. Sichtbare Gebrauchsspuren."],
    ["Schlagwörter", "werkzeug · bohren · schrauben"],
  ] : [
    ["Title", "Cordless drill with battery"],
    ["Description", "Teal and black body, keyless chuck and attached battery. Visible signs of use."],
    ["Tags", "tool · drilling · fastening"],
  ];
  const total = fields.reduce((length, [, text]) => length + text.length, 0);
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const complete = count >= total;

  useEffect(() => {
    const element = root.current;
    if (!animated || !element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.5), { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!animated || !inView || complete) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!motion.matches && document.visibilityState === "visible") {
        setCount(current => Math.min(current + 1, total));
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [animated, inView, complete, total]);

  return (
    <div ref={root} className={`${styles.draft} ${animated ? styles.animatedDraft : ""}`}>
      <div className={styles.draftHeading}>
        <p className={styles.photoLabel}>{de ? "04 · Vorschlag für deinen Eintrag" : "04 · A draft for your record"}</p>
        {animated && <button type="button" className={styles.replayDraft} onClick={() => setCount(0)} aria-label={de ? "Schreibanimation wiederholen" : "Replay typing animation"} title={de ? "Noch einmal schreiben" : "Type again"}><RotateCcw size={14} aria-hidden="true" /></button>}
      </div>
      <dl>
        {fields.map(([label, text], index) => {
          const offset = fields.slice(0, index).reduce((length, [, value]) => length + value.length, 0);
          const length = Math.max(0, Math.min(text.length, count - offset));
          const typing = count >= offset && count < offset + text.length;
          return <div key={label}><dt>{label}</dt><dd>
            {animated ? <>
              <span className={styles.draftAccessible}>{text}</span>
              <span className={styles.draftReserve} aria-hidden="true">{text}</span>
              <span className={styles.draftTyped} aria-hidden="true">{text.slice(0, length)}{typing && <span className={styles.typingCursor}>_</span>}</span>
            </> : text}
          </dd></div>;
        })}
      </dl>
    </div>
  );
}
