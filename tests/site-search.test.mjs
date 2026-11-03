import assert from "node:assert/strict";
import { test } from "node:test";
import { searchDocuments, documentationQueries, documentationResults } from "../lib/site-search.ts";

test("search ranks titles first, searches body text and requires all terms", () => {
  const pages = [
    { title: "Installation", description: "Docker einrichten", body: "Drucker mit USB verbinden", url: "/de/docs" },
    { title: "USB-Drucker", description: "Drucken und Etiketten", body: "", url: "/de/features/labels-api" },
  ];
  assert.equal(searchDocuments(pages, "drucker USB")[0].url, "/de/features/labels-api");
  assert.equal(searchDocuments(pages, "Docker USB").length, 1);
  assert.deepEqual(searchDocuments(pages, "unbekannt"), []);
  assert.deepEqual(searchDocuments(pages, "  ... "), []);
});

test("German accents and sharp s normalize without treating queries as regex", () => {
  const pages = [{ title: "Räume und Maße", description: "", body: "", url: "/de/features/orte-raeume" }];
  assert.equal(searchDocuments(pages, "raume masse").length, 1);
  assert.deepEqual(searchDocuments(pages, "[unbekannt]*"), []);
});

test("German documentation searches keep the original and add English terminology", () => {
  assert.deepEqual(documentationQueries("Etiketten"), ["Etiketten", "labels"]);
  assert.deepEqual(documentationQueries("Drucker einrichten"), ["Drucker einrichten", "printer setup"]);
  assert.deepEqual(documentationQueries("printing"), ["printing"]);
});

test("documentation results group matching sections, retain anchors and reject foreign URLs", () => {
  const results = documentationResults([[
    { type: "page", content: "Print labels", url: "/printing" },
    { type: "text", content: "Set up QZ Tray.", url: "/printing#qz-tray" },
    { type: "text", content: "Another section", url: "/printing#other" },
    { type: "page", content: "External", url: "https://example.com" },
    { type: "page", content: "Script", url: "javascript:alert(1)" },
    { type: "page", content: "Credentials", url: "https://user:password@docs.openinventory.polyxo.de/printing" },
    null, { content: "No URL" },
  ], [{ type: "page", content: "Print labels", url: "/printing" }]]);
  assert.deepEqual(results, [{ title: "Print labels", description: "Set up QZ Tray.", url: "https://docs.openinventory.polyxo.de/printing#qz-tray" }]);
});

test("section matches can precede the page title and payloads are bounded", () => {
  const results = documentationResults([[{ type: "text", content: "First section", url: "/api#first" }, { type: "page", content: "API guide", url: "/api" }, ...Array.from({ length: 20 }, (_, i) => ({ type: "page", content: `Page ${i}`, url: `/page-${i}` }))], null, { error: "upstream unavailable" }]);
  assert.equal(results[0].title, "API guide");
  assert.equal(results[0].url, "https://docs.openinventory.polyxo.de/api#first");
  assert.equal(results.length, 6);
});
