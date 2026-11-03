"use client";

import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import { documentationQueries, searchFallbackImage, searchHighlights, type SearchResponse, type SearchResult } from "@/lib/site-search";
import styles from "./site-search.module.css";

function Highlight({ text, query }: { text: string; query: string }) {
  return searchHighlights(text, query).map((part, index) => part.match
    ? <mark key={index} className={styles.highlight}>{part.text}</mark>
    : part.text);
}

function ResultImage({ item }: { item: SearchResult }) {
  const source = item.image ?? searchFallbackImage(item.url);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const image = failedSource === source ? "/og.png" : source;
  return <Image className={styles.thumbnail} src={image} alt="" width={96} height={72} sizes="(max-width: 639px) 64px, 96px" style={image === "/og.png" ? { objectFit: "contain" } : undefined} onError={() => setFailedSource(source)} />;
}

export function SiteSearch({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const titleId = useId();
  const inputId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [retry, setRetry] = useState(0);
  const [response, setResponse] = useState<{ query: string; data?: SearchResponse; error?: boolean } | null>(null);
  const [lastSuccess, setLastSuccess] = useState<{ query: string; data: SearchResponse } | null>(null);
  const term = query.trim();
  const active = response?.query === term ? response : null;
  const searching = term.length >= 2;
  const pending = searching && !active;
  const displayed = active?.data ?? lastSuccess?.data;
  const title = de ? "Webseite und Doku durchsuchen" : "Search website and docs";

  function showSearch() {
    if (!dialog.current?.open) {
      dialog.current?.showModal();
      setOpen(true);
      input.current?.focus();
    }
  }

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else showSearch();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    if (!open || term.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: term, locale });
        const result = await fetch(`/api/search?${params}`, { signal: controller.signal });
        if (!result.ok) throw new Error("Search failed");
        const data: SearchResponse = await result.json();
        if (!controller.signal.aborted) {
          setResponse({ query: term, data });
          setLastSuccess({ query: term, data });
        }
      } catch {
        if (!controller.signal.aborted) setResponse({ query: term, error: true });
      }
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [open, term, locale, retry]);

  function retrySearch() { setResponse(null); setRetry((value) => value + 1); }

  function resultGroup(label: string, items: SearchResult[], docs = false) {
    const highlightQuery = searching ? (docs ? documentationQueries(term).join(" ") : term) : "";
    return <section className={styles.group} aria-label={label}>
      <h3>{docs ? <BookOpen aria-hidden="true" /> : <Search aria-hidden="true" />}{label}</h3>
      {items.length ? <ul>{items.map((item) => <li key={item.url}>
        <a href={item.url} onClick={() => dialog.current?.close()} className={styles.result}>
          <ResultImage item={item} />
          <span className={styles.resultCopy}><strong><Highlight text={item.title} query={highlightQuery} /></strong>{item.description && <span className={styles.description}><Highlight text={item.description} query={highlightQuery} /></span>}</span>
          {docs && <ArrowUpRight aria-hidden="true" />}
        </a>
      </li>)}</ul> : <p className={styles.empty}>{de ? "Keine Treffer in diesem Bereich." : "No results in this section."}</p>}
    </section>;
  }

  const suggestions: SearchResult[] = de ? [
    { title: "Funktionen entdecken", description: "Erfassung, Bestand und Etiketten", url: marketingHref(locale, "/features") },
    { title: "Installation", description: "Open Inventory selbst betreiben", url: "https://docs.openinventory.polyxo.de/installation" },
    { title: "Etiketten und Drucker", description: "Vorlagen, QZ Tray und gemeinsame Drucker", url: "https://docs.openinventory.polyxo.de/printing" },
  ] : [
    { title: "Explore features", description: "Capture, stock and labels", url: "/features" },
    { title: "Installation", description: "Run Open Inventory on your own server", url: "https://docs.openinventory.polyxo.de/installation" },
    { title: "Labels and printers", description: "Templates, QZ Tray and shared printers", url: "https://docs.openinventory.polyxo.de/printing" },
  ];
  const total = (displayed?.website.length ?? 0) + (displayed?.documentation.length ?? 0);

  return <>
    <button type="button" className={`site-control ${styles.trigger}`} onClick={showSearch} aria-label={title} title={`${title} (Ctrl/⌘ K)`} aria-haspopup="dialog">
      <Search aria-hidden="true" /><span>{de ? "Suche" : "Search"}</span>
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => setOpen(false)} onClick={(event) => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}>
      <div className={styles.panel}>
        <div className={styles.heading}><h2 id={titleId}>{title}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label={de ? "Suche schließen" : "Close search"}><X aria-hidden="true" /></button></div>
        <div className={styles.field}>
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor={inputId}>{de ? "Suchbegriff" : "Search term"}</label>
          <input id={inputId} ref={input} value={query} onChange={(event) => setQuery(event.target.value)} maxLength={100} autoComplete="off" spellCheck={false} placeholder={de ? "z. B. Etiketten, Docker, Ausleihe …" : "Try labels, Docker, lending …"} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); results.current?.querySelector<HTMLAnchorElement>("a")?.focus(); }
          }} />
        </div>
        <div className={styles.results} ref={results} aria-busy={pending} onKeyDown={(event) => {
          if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
          const links = Array.from(event.currentTarget.querySelectorAll("a"));
          const current = links.indexOf(document.activeElement as HTMLAnchorElement);
          if (current < 0) return;
          event.preventDefault();
          const next = current + (event.key === "ArrowDown" ? 1 : -1);
          if (next < 0) input.current?.focus(); else links[Math.min(next, links.length - 1)]?.focus();
        }}>
          <p className={styles.status} role="status" aria-live="polite">
            {!searching ? (de ? "Suche in Funktionen, Anleitungen, Blog und API-Referenz. Mindestens 2 Zeichen eingeben." : "Search features, guides, blog and API reference. Enter at least 2 characters.")
              : pending ? (displayed ? (de ? `${total} Treffer · Wird aktualisiert …` : `${total} results · Updating …`) : (de ? "Webseite und Dokumentation werden durchsucht …" : "Searching website and documentation …"))
              : active?.error ? (displayed ? (de ? "Aktualisierung fehlgeschlagen. Bisherige Treffer bleiben sichtbar." : "Could not update. Previous results are still shown.") : (de ? "Die Suche ist gerade nicht erreichbar." : "Search is currently unavailable."))
              : total ? (de ? `${total} Treffer` : `${total} results`)
              : (de ? "Keine Treffer. Versuche einen anderen oder kürzeren Suchbegriff." : "No results. Try a different or shorter search term.")}
          </p>
          {!searching && resultGroup(de ? "Direkt öffnen" : "Quick links", suggestions)}
          {active?.error && <button className={styles.retry} onClick={retrySearch}>{de ? "Erneut versuchen" : "Try again"}</button>}
          {searching && displayed && <>
            {resultGroup(de ? "Webseite" : "Website", displayed.website)}
            {displayed.documentationUnavailable ? <section className={styles.group}>
              <h3>{de ? "Dokumentation" : "Documentation"}</h3>
              <p className={styles.empty}>{de ? "Die Doku-Suche ist gerade nicht erreichbar. Die Webseitentreffer sind weiterhin verfügbar." : "Documentation search is unavailable. Website results are still available."}</p>
              <button className={styles.retry} onClick={retrySearch}>{de ? "Erneut versuchen" : "Try again"}</button>
              <a className={styles.result} href="https://docs.openinventory.polyxo.de">{de ? "Dokumentation öffnen" : "Open documentation"}<ArrowUpRight aria-hidden="true" /></a>
            </section> : resultGroup(de ? "Dokumentation · Englisch" : "Documentation", displayed.documentation, true)}
          </>}
        </div>
        <div className={styles.footer}><span>{de ? "↑ ↓ Navigieren · Enter Öffnen" : "↑ ↓ Navigate · Enter Open"}</span><span>Esc {de ? "Schließen" : "Close"}</span></div>
      </div>
    </dialog>
  </>;
}
