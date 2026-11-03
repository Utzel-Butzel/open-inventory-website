import { documentationQueries, documentationResults, searchDocuments, searchFallbackImage } from "@/lib/site-search";
import { websiteSearchDocuments } from "@/lib/site-search-content";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = (params.get("q") ?? "").trim();
  const locale = params.get("locale") === "de" ? "de" : "en";
  if (query.length > 100) return Response.json({ error: "Query too long" }, { status: 400 });
  if (query.length < 2) return Response.json({ website: [], documentation: [], documentationUnavailable: false });

  const website = searchDocuments(websiteSearchDocuments(locale), query);
  const responses = await Promise.allSettled(documentationQueries(query).map(async (term) => {
    const url = new URL("https://docs.openinventory.polyxo.de/api/search");
    url.searchParams.set("query", term);
    const response = await fetch(url, { signal: AbortSignal.timeout(4000), cache: "no-store" });
    if (!response.ok) throw new Error("Documentation search unavailable");
    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error("Invalid documentation search response");
    return payload;
  }));
  const available = responses.filter((response) => response.status === "fulfilled");
  return Response.json({
    website,
    documentation: documentationResults(available.map((response) => response.value), query).map((result) => ({ ...result, image: searchFallbackImage(result.url) })),
    documentationUnavailable: available.length === 0,
  }, { headers: { "Cache-Control": "no-store" } });
}
