export type SearchResult = { title: string; description: string; url: string };
export type SearchDocument = SearchResult & { body: string };
export type SearchResponse = {
  website: SearchResult[];
  documentation: SearchResult[];
  documentationUnavailable: boolean;
};

export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/\p{Diacritic}/gu, "");
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
    .map(({ document: { title, description, url } }) => ({ title, description, url }));
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

export function documentationResults(payloads: unknown[]): SearchResult[] {
  const origin = "https://docs.openinventory.polyxo.de";
  const groups = new Map<string, SearchResult>();
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
      } else if (!existing.description) {
        existing.description = content.length > 180 ? `${content.slice(0, 177)}…` : content;
        existing.url = url.href;
      }
    }
  }
  return [...groups.values()].slice(0, 6);
}
