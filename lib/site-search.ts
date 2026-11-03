export type SearchResult = { title: string; description: string; url: string; image?: string };
export type SearchDocument = SearchResult & { body: string };
export type SearchResponse = {
  website: SearchResult[];
  documentation: SearchResult[];
  documentationUnavailable: boolean;
};

export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

// Preserve original character offsets even when normalization expands ß or removes accents.
export function searchHighlights(text: string, query: string): { text: string; match: boolean }[] {
  const words = [...new Set(normalizeSearch(query).match(/[\p{L}\p{N}_-]+/gu) ?? [])];
  let normalized = "";
  const offsets: { start: number; end: number }[] = [];
  let position = 0;
  for (const character of text) {
    const value = normalizeSearch(character);
    for (let i = 0; i < value.length; i++) offsets.push({ start: position, end: position + character.length });
    normalized += value;
    position += character.length;
    if (!value && offsets.length) offsets[offsets.length - 1].end = position;
  }
  const ranges: { start: number; end: number }[] = [];
  for (const word of words) {
    let index = normalized.indexOf(word);
    while (index !== -1) {
      ranges.push({ start: offsets[index].start, end: offsets[index + word.length - 1].end });
      index = normalized.indexOf(word, index + 1);
    }
  }
  const merged: typeof ranges = [];
  for (const range of ranges.sort((a, b) => a.start - b.start)) {
    const previous = merged.at(-1);
    if (previous && range.start <= previous.end) previous.end = Math.max(previous.end, range.end);
    else merged.push({ ...range });
  }
  const parts: { text: string; match: boolean }[] = [];
  let cursor = 0;
  for (const range of merged) {
    if (range.start > cursor) parts.push({ text: text.slice(cursor, range.start), match: false });
    parts.push({ text: text.slice(range.start, range.end), match: true });
    cursor = range.end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
  return parts;
}

export function searchExcerpt(text: string, query: string, length = 170) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  const parts = searchHighlights(clean, query);
  const first = parts.findIndex((part) => part.match);
  const matchStart = first < 0 ? 0 : parts.slice(0, first).reduce((sum, part) => sum + part.text.length, 0);
  let start = Math.max(0, matchStart - 35);
  if (start > 0) {
    const space = clean.indexOf(" ", start);
    if (space < matchStart && space !== -1) start = space + 1;
  }
  let end = Math.min(clean.length, start + length);
  if (end < clean.length) {
    const space = clean.lastIndexOf(" ", end);
    if (space > start + length * .6) end = space;
  }
  return `${start ? "… " : ""}${clean.slice(start, end).trim()}${end < clean.length ? " …" : ""}`;
}

export function searchFallbackImage(url: string) {
  const path = url.replace(/^https:\/\/docs\.openinventory\.polyxo\.de/, "");
  if (/printing|label|qz/.test(path)) return "/marketing/screenshots/web-label-designer.png";
  if (/planning|stock|lending|order/.test(path)) return "/marketing/screenshots/web-stock.png";
  if (/location|room|map/.test(path)) return "/marketing/screenshots/web-locations.png";
  if (/capture|\/ai\//.test(path)) return "/marketing/screenshots/web-batch.png";
  if (/configuration|environment|access|authentication|security/.test(path)) return "/marketing/screenshots/web-settings-access.png";
  if (/installation|setup|self-host/.test(path)) return "/marketing/photography/server-rack.webp";
  return "/og.png";
}

export function searchDocuments(documents: SearchDocument[], query: string): SearchResult[] {
  const words = normalizeSearch(query).match(/[\p{L}\p{N}_-]+/gu) ?? [];
  if (!words.length) return [];
  return documents.map((document) => {
    const title = normalizeSearch(document.title);
    const description = normalizeSearch(document.description);
    const body = normalizeSearch(document.body);
    const score = words.every((word) => `${title} ${description} ${body}`.includes(word))
      ? words.reduce((sum, word) => sum + (title.includes(word) ? 10 : 0) + (description.includes(word) ? 4 : 0) + 1, 0)
      : 0;
    return { document, score };
  }).filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ document: { title, description, body, url, image } }) => {
      // Body-only matches need a relevant excerpt so the matched text is visible too.
      const excerpt = words.every((word) => normalizeSearch(`${title} ${description}`).includes(word)) ? description : body;
      return { title, description: searchExcerpt(excerpt, query), url, ...(image ? { image } : {}) };
    });
}

// The documentation is English. Also search its terminology for common German queries.
const documentationTerms: Record<string, string> = {
  etikett: "label", etiketten: "labels", etikettendruck: "printing", drucken: "printing", druck: "printing", drucker: "printer",
  vorlage: "template", vorlagen: "templates", einrichten: "setup", einrichtung: "setup", installation: "installation",
  anmeldung: "authentication", anmelden: "authentication", passwort: "password", benutzer: "users", berechtigungen: "permissions", rollen: "roles",
  ausleihe: "lending", ausleihen: "lending", ruckgabe: "return", bestand: "stock", bestande: "stock", bestandsprognose: "forecast", nachbestellung: "replenishment",
  sicherung: "backup", datensicherung: "backup", datenbank: "database", konfigurieren: "configuration", konfiguration: "configuration",
  umgebungsvariablen: "environment variables", schnittstelle: "API", schnittstellen: "API", bilder: "images", fotos: "photos", raume: "rooms", standorte: "locations",
};

export function documentationQueries(query: string) {
  const translated = normalizeSearch(query).replace(/[\p{L}\p{N}_-]+/gu, (word) => documentationTerms[word] ?? word);
  return [...new Set([query, translated])];
}

export function documentationResults(payloads: unknown[], query = ""): SearchResult[] {
  const origin = "https://docs.openinventory.polyxo.de";
  const groups = new Map<string, SearchResult>();
  const scores = new Map<string, number>();
  const terms = documentationQueries(query).join(" ");
  for (const payload of payloads) {
    if (!Array.isArray(payload)) continue;
    for (const entry of payload) {
      if (!entry || typeof entry.url !== "string" || typeof entry.content !== "string") continue;
      let url: URL;
      try { url = new URL(entry.url, origin); } catch { continue; }
      if (url.origin !== origin || url.username || url.password) continue;
      const key = url.pathname;
      const existing = groups.get(key);
      const content = entry.content.replace(/\s+/g, " ").trim();
      if (!content) continue;
      if (!existing) {
        groups.set(key, { title: content.slice(0, 120), description: "", url: url.href });
      } else if (entry.type === "page") {
        existing.title = content.slice(0, 120);
      }
      if (entry.type !== "page") {
        const result = groups.get(key)!;
        const score = new Set(searchHighlights(content, terms).filter((part) => part.match).map((part) => normalizeSearch(part.text))).size;
        if (!result.description || score > (scores.get(key) ?? -1)) {
          result.description = searchExcerpt(content, terms);
          result.url = url.href;
          scores.set(key, score);
        }
      }
    }
  }
  return [...groups.values()].slice(0, 6);
}
