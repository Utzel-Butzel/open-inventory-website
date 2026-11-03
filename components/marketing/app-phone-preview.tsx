"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const serverSnapshot = () => false;

export function AppPhonePreview({
  name, screenshot, artwork, alt, locale, eager = false,
}: {
  name: string;
  screenshot: string;
  artwork?: string;
  alt: string;
  locale: "de" | "en";
  eager?: boolean;
}) {
  const desktop = useSyncExternalStore(subscribe, desktopSnapshot, serverSnapshot);
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = desktop && visible && !failed;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const update = () => {
      if (paused || document.hidden) element.pause();
      else void element.play().catch(() => setPlaying(false));
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [paused, showVideo]);

  return (
    <div ref={container} className="group/phone relative aspect-[388/800] drop-shadow-[0_18px_24px_rgba(28,25,45,0.22)]">
      {artwork && !showVideo ? (
        <Image src={artwork} alt={alt} fill sizes="(max-width: 639px) 45vw, 260px" loading={eager ? "eager" : "lazy"} className="object-contain" />
      ) : (
        <>
          <Image src="/marketing/devices/iphone-16-pro-max-frame.png" alt="" aria-hidden="true" fill sizes="260px" loading={eager ? "eager" : "lazy"} className="pointer-events-none z-10 object-contain" />
          {/* Source frame: 388×800; screen inset 16×13 px and radius 59 px. */}
          <div className="absolute inset-x-[4.1237%] inset-y-[1.625%] overflow-hidden rounded-[16.573%/7.623%] bg-white">
            <Image src={screenshot} alt={alt} fill sizes="244px" loading={eager ? "eager" : "lazy"} className="object-fill" />
            {showVideo && (
              <video
                ref={video}
                src={`/marketing/videos/app/${name}.mp4`}
                poster={`/marketing/videos/app/${name}.webp`}
                aria-label={alt}
                muted loop playsInline preload="none"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={() => setFailed(true)}
                className="absolute inset-0 h-full w-full object-fill"
              />
            )}
          </div>
        </>
      )}
      {showVideo && (
        <button
          type="button"
          onClick={() => {
            setPaused(playing);
            if (!playing) void video.current?.play().catch(() => setPlaying(false));
          }}
          aria-label={`${locale === "de" ? (playing ? "Video pausieren" : "Video abspielen") : (playing ? "Pause video" : "Play video")}: ${alt}`}
          className="absolute -right-3 top-1/2 z-20 flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 shadow-sm opacity-0 pointer-events-none transition group-hover/phone:opacity-100 group-hover/phone:pointer-events-auto hover:bg-zinc-100 focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
