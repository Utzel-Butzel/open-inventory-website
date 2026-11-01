"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MarketingLocale } from "@/lib/marketing-i18n";
import styles from "./ai-photo-animation.module.css";

const duration = 2200;
const images = ["drill-before.png", "drill-after.png", "drill-product-clean.png"];
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getVisible = () => document.visibilityState === "visible";
const serverReducedMotion = () => true;
const serverVisible = () => false;

export function AiPhotoAnimation({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const labels = de ? ["Dein Foto", "Freigestellt", "Produktfoto"] : ["Your photo", "Cutout", "Product photo"];
  const descriptions = de
    ? ["Akkuschrauber auf einer Werkbank", "Derselbe Akkuschrauber ohne Hintergrund", "Gereinigter Akkuschrauber aus neuer Perspektive mit Studiolicht"]
    : ["Cordless drill on a workbench", "The same drill with its background removed", "Cleaned drill from a new angle with studio lighting"];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>([false, false, false]);
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverReducedMotion);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, serverVisible);
  const running = playing && inView && visible && !reducedMotion && loaded.every(Boolean);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStep(current => (current + 1) % images.length), duration);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  return (
    <div ref={root} className={styles.animation} data-step={step}>
      <div className={styles.stage}>
        <div className={styles.scene} role="img" aria-label={descriptions[step]}>
          {images.map((file, index) => (
            <div key={file} className={`${styles.layer} ${styles[`layer${index}`]}`} aria-hidden="true">
              <Image src={`/marketing/ai-example/${file}`} alt="" fill sizes="(max-width: 420px) 90vw, 380px" loading="eager" onLoad={() => setLoaded(current => current.map((value, i) => i === index ? true : value))} />
            </div>
          ))}
          <div className={styles.revealEdge} aria-hidden="true" />
        </div>
        <div className={styles.stageLabel} aria-hidden="true"><span>0{step + 1}</span>{labels[step]}</div>
        {!reducedMotion && <button type="button" className={styles.playback} onClick={() => setPlaying(current => !current)} aria-label={playing ? (de ? "Animation pausieren" : "Pause animation") : (de ? "Animation abspielen" : "Play animation")} title={playing ? (de ? "Pausieren" : "Pause") : (de ? "Abspielen" : "Play")}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>}
      </div>
      <div className={styles.steps} role="group" aria-label={de ? "Bildbearbeitung vergleichen" : "Compare image editing steps"}>
        {labels.map((label, index) => <button key={label} type="button" aria-pressed={step === index} className={styles.step} onClick={() => { setPlaying(false); setStep(index); }}>
          <span className={styles.stepNumber}>0{index + 1}</span><span>{label}</span>
          <span className={styles.track} aria-hidden="true">{step === index && <span key={`${step}-${running}`} className={running ? styles.progress : styles.selected} />}</span>
        </button>)}
      </div>
    </div>
  );
}
