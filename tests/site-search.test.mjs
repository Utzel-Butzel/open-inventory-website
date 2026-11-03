import assert from "node:assert/strict";
import { test } from "node:test";
import { searchDocuments, documentationQueries, documentationResults, searchHighlights, searchExcerpt, searchFallbackImage } from "../lib/site-search.ts";

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

test("highlights preserve original text, accents, sharp s and overlapping matches", () => {
  const value = "Räume, Maße und Straße. RÄUME. Cafe\u0301 😀";
  const parts = searchHighlights(value, "raume masse strasse cafe rau");
  assert.equal(parts.map((part) => part.text).join(""), value);
  assert.deepEqual(parts.filter((part) => part.match).map((part) => part.text), ["Räume", "Maße", "Straße", "RÄUME", "Cafe\u0301"]);
  assert.deepEqual(searchHighlights("<script> label label", "[label]*").filter((part) => part.match).map((part) => part.text), ["label", "label"]);
  assert.deepEqual(searchHighlights("No matches", ""), [{ text: "No matches", match: false }]);
});

test("body-only results show the matching passage and retain the article image", () => {
  const body = `${"Introduction without the keyword. ".repeat(30)}Connect the Bluetooth printer here. ${"More details. ".repeat(30)}`;
  const [result] = searchDocuments([{ title: "Printing guide", description: "Set up labels", body, url: "/guide", image: "/cover.webp" }], "Bluetooth");
  assert.match(result.description, /Bluetooth/);
  assert.ok(result.description.length < 180);
  assert.equal(result.image, "/cover.webp");
  assert.match(searchExcerpt(body, "Bluetooth"), /^… /);
});

test("documentation excerpts prefer the matching section and translated terms", () => {
  const [result] = documentationResults([[
    { type: "page", content: "Printing guide", url: "/printing" },
    { type: "text", content: "Start here", url: "/printing#start" },
    { type: "text", content: `${"Background. ".repeat(25)}Connect your printer to QZ Tray.`, url: "/printing#qz" },
  ]], "Drucker");
  assert.equal(result.url, "https://docs.openinventory.polyxo.de/printing#qz");
  assert.match(result.description, /printer/);
  assert.equal(searchFallbackImage(result.url), "/marketing/screenshots/web-label-designer.png");
});
