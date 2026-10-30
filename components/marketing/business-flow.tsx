"use client";

import Link from "next/link";
import {
  BellRing,
  Boxes,
  Camera,
  ClipboardCheck,
  ClipboardList,
  ContactRound,
  Factory,
  History,
  MapPinned,
  PackageCheck,
  PackageOpen,
  QrCode,
  ScanLine,
  ShoppingCart,
  Store,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  marketingHref,
  type MarketingLocale,
} from "@/lib/marketing-i18n";

type FlowNodeId =
  | "capture"
  | "demand"
  | "commerce"
  | "resource"
  | "variants"
  | "context"
  | "purchase"
  | "requests"
  | "loans"
  | "sales"
  | "assembly"
  | "scans"
  | "stock"
  | "movements"
  | "units"
  | "counts"
  | "alerts"
  | "integrations"
  | "audit";

type ScenarioId = "all" | "procure" | "operate" | "sell" | "build" | "audit";

type FlowNode = {
  id: FlowNodeId;
  phase: number;
  row: number;
  title: string;
  kicker: string;
  detail: string;
  href: string;
  icon: LucideIcon;
};

type FlowEdge = {
  from: FlowNodeId;
  to: FlowNodeId;
};

type DiagramCopy = {
  eyebrow: string;
  title: string;
  description: string;
  phases: Array<{ title: string; description: string }>;
  scenariosLabel: string;
  scenarios: Array<{
    id: ScenarioId;
    label: string;
    description: string;
    nodes: FlowNodeId[];
  }>;
  selectedLabel: string;
  connectedLabel: string;
  linkLabel: string;
  loopLabel: string;
  diagramLabel: string;
  nodes: FlowNode[];
};

const edges: FlowEdge[] = [
  { from: "capture", to: "resource" },
  { from: "capture", to: "context" },
  { from: "demand", to: "purchase" },
  { from: "demand", to: "requests" },
  { from: "commerce", to: "resource" },
  { from: "commerce", to: "sales" },
  { from: "resource", to: "purchase" },
  { from: "resource", to: "requests" },
  { from: "resource", to: "loans" },
  { from: "resource", to: "sales" },
  { from: "resource", to: "assembly" },
  { from: "variants", to: "sales" },
  { from: "variants", to: "assembly" },
  { from: "context", to: "purchase" },
  { from: "context", to: "requests" },
  { from: "context", to: "loans" },
  { from: "context", to: "sales" },
  { from: "purchase", to: "stock" },
  { from: "purchase", to: "movements" },
  { from: "requests", to: "stock" },
  { from: "loans", to: "units" },
  { from: "loans", to: "movements" },
  { from: "sales", to: "stock" },
  { from: "sales", to: "movements" },
  { from: "assembly", to: "stock" },
  { from: "assembly", to: "movements" },
  { from: "scans", to: "movements" },
  { from: "stock", to: "counts" },
  { from: "stock", to: "alerts" },
  { from: "stock", to: "integrations" },
  { from: "movements", to: "counts" },
  { from: "movements", to: "audit" },
  { from: "units", to: "counts" },
  { from: "units", to: "audit" },
  { from: "sales", to: "integrations" },
];

const diagramCopy: Record<MarketingLocale, DiagramCopy> = {
  de: {
    eyebrow: "Der gesamte Kreislauf",
    title: "Ein Bestand. Jeder Geschäftsvorgang.",
    description:
      "Vom ersten Foto oder Bedarf über Einkauf, Reservierung, Ausleihe, Verkauf und Montage bis zu Inventur, Warnungen und Integrationen. Wähle einen Ablauf oder einen Baustein, um seine Verbindungen zu sehen.",
    phases: [
      { title: "Auslöser", description: "Etwas wird erfasst oder benötigt" },
      { title: "Datenbasis", description: "Der gemeinsame digitale Kern" },
      { title: "Vorgänge", description: "Menschen und Aufträge handeln" },
      { title: "Bestandskern", description: "Jede Änderung wird gebucht" },
      { title: "Rückkopplung", description: "Prüfen, melden, verbinden" },
    ],
    scenariosLabel: "Ablauf hervorheben",
    scenarios: [
      {
        id: "all",
        label: "Gesamtsystem",
        description: "Alle Wege und Rückkopplungen der Anwendung.",
        nodes: [],
      },
      {
        id: "procure",
        label: "Beschaffen",
        description: "Bedarf wird zum Einkauf, Wareneingang und neuen verfügbaren Bestand.",
        nodes: ["demand", "resource", "context", "purchase", "stock", "movements", "alerts", "audit"],
      },
      {
        id: "operate",
        label: "Nutzen & verleihen",
        description: "Anfrage, Reservierung, Ausgabe und Rückgabe bleiben am Gerät nachvollziehbar.",
        nodes: ["capture", "resource", "context", "requests", "loans", "scans", "stock", "movements", "units", "audit"],
      },
      {
        id: "sell",
        label: "Verkaufen",
        description: "Shop- oder Direktaufträge reservieren, versenden und reduzieren den Bestand kontrolliert.",
        nodes: ["commerce", "resource", "variants", "context", "sales", "scans", "stock", "movements", "integrations", "audit"],
      },
      {
        id: "build",
        label: "Montieren",
        description: "Stücklisten verbrauchen Komponenten atomar und erzeugen nachvollziehbare Baugruppen.",
        nodes: ["resource", "variants", "context", "assembly", "scans", "stock", "movements", "units", "audit"],
      },
      {
        id: "audit",
        label: "Inventur",
        description: "Zählung und Korrektur gleichen reale Mengen mit der vollständigen Historie ab.",
        nodes: ["capture", "resource", "context", "scans", "stock", "movements", "units", "counts", "alerts", "audit"],
      },
    ],
    selectedLabel: "Aktiver Baustein",
    connectedLabel: "Direkt verbunden",
    linkLabel: "Funktion im Detail",
    loopLabel: "Mindestbestand und Prognose stoßen den nächsten Einkauf an",
    diagramLabel: "Interaktiver Geschäftsprozess von Open Inventory",
    nodes: [
      {
        id: "capture",
        phase: 0,
        row: 0,
        title: "Foto, Scan & Import",
        kicker: "Erfassen",
        detail: "Fotos, Codes, CSV und die iOS-App erzeugen prüfbare Inventareinträge – einzeln oder als Serie.",
        href: "/features/erfassen",
        icon: Camera,
      },
      {
        id: "demand",
        phase: 0,
        row: 2,
        title: "Bedarf & Anfrage",
        kicker: "Planen",
        detail: "Interne Bedarfe werden beantragt, genehmigt, terminiert und bis zur Erfüllung reserviert.",
        href: "/features/bestand-ausleihe",
        icon: ClipboardList,
      },
      {
        id: "commerce",
        phase: 0,
        row: 4,
        title: "Shop, API & Auftrag",
        kicker: "Verbinden",
        detail: "Externe Systeme, WooCommerce und direkte Aufträge bringen Nachfrage in denselben Prozess.",
        href: "/features/labels-api",
        icon: Store,
      },
      {
        id: "resource",
        phase: 1,
        row: 0,
        title: "Inventareintrag",
        kicker: "Stammdaten",
        detail: "Ein zentraler Datensatz bündelt Name, Typ, Medien, Felder, Status, SKU und Beziehungen.",
        href: "/features/strukturieren",
        icon: PackageOpen,
      },
      {
        id: "variants",
        phase: 1,
        row: 2,
        title: "Varianten & Stücklisten",
        kicker: "Struktur",
        detail: "Varianten, Optionen und Stücklisten verbinden verkaufbare Konfigurationen mit ihren Komponenten.",
        href: "/features/strukturieren",
        icon: Boxes,
      },
      {
        id: "context",
        phase: 1,
        row: 4,
        title: "Orte & Kontakte",
        kicker: "Kontext",
        detail: "Räume, Schränke, Fahrzeuge, Lieferanten, Kunden und Personen geben jedem Vorgang Kontext.",
        href: "/features/orte-raeume",
        icon: MapPinned,
      },
      {
        id: "purchase",
        phase: 2,
        row: 0,
        title: "Einkauf & Wareneingang",
        kicker: "Beschaffen",
        detail: "Mehrteilige Bestellungen und Teilwareneingänge buchen Mengen, Einheiten und Preise kontrolliert ein.",
        href: "/features/bestand-ausleihe",
        icon: ShoppingCart,
      },
      {
        id: "requests",
        phase: 2,
        row: 1,
        title: "Freigabe & Reservierung",
        kicker: "Koordinieren",
        detail: "Anfragen durchlaufen Freigaben und blocken verfügbaren Bestand für einen geplanten Zeitraum.",
        href: "/features/bestand-ausleihe",
        icon: ClipboardCheck,
      },
      {
        id: "loans",
        phase: 2,
        row: 2,
        title: "Ausleihe & Rückgabe",
        kicker: "Übergeben",
        detail: "Ausgaben, Fälligkeiten, Teilrückgaben und Stornos bleiben je Position und Seriennummer sichtbar.",
        href: "/features/bestand-ausleihe",
        icon: ContactRound,
      },
      {
        id: "sales",
        phase: 2,
        row: 3,
        title: "Verkauf & Versand",
        kicker: "Erfüllen",
        detail: "Verkaufsaufträge, Reservierung, Kommissionierung und Versand greifen auf denselben Bestand zu.",
        href: "/features/bestand-ausleihe",
        icon: PackageCheck,
      },
      {
        id: "assembly",
        phase: 2,
        row: 4,
        title: "Montage",
        kicker: "Produzieren",
        detail: "Baugruppen verbrauchen ihre Stücklisten vollständig oder gar nicht und erzeugen eine gemeinsame Historie.",
        href: "/features/bestand-ausleihe",
        icon: Factory,
      },
      {
        id: "scans",
        phase: 2,
        row: 5,
        title: "Labels & Scan-Abläufe",
        kicker: "Vor Ort handeln",
        detail: "QR- und Barcodes öffnen sichere Vorschau-, Prüf- und Buchungsschritte direkt am Gegenstand.",
        href: "/features/labels-api",
        icon: QrCode,
      },
      {
        id: "stock",
        phase: 3,
        row: 0,
        title: "Verfügbarer Bestand",
        kicker: "Wahrheit",
        detail: "Globale Menge, Verfügbarkeit und Verteilung auf Lagerorte werden aus den Buchungen abgeleitet.",
        href: "/features/bestand-ausleihe",
        icon: PackageCheck,
      },
      {
        id: "movements",
        phase: 3,
        row: 2,
        title: "Bewegungen & Kosten",
        kicker: "Ledger",
        detail: "Zugang, Abgang, Transfer, Korrektur und Kosten bleiben als datierte, unveränderliche Spur erhalten.",
        href: "/features/bestand-ausleihe",
        icon: History,
      },
      {
        id: "units",
        phase: 3,
        row: 4,
        title: "Mengen & Einzelgeräte",
        kicker: "Bestandsmodell",
        detail: "Austauschbare Teile laufen als Mengenbestand; Geräte behalten Code, Status und Standort pro Einheit.",
        href: "/features/bestand-ausleihe",
        icon: Boxes,
      },
      {
        id: "counts",
        phase: 4,
        row: 0,
        title: "Inventur & Korrektur",
        kicker: "Prüfen",
        detail: "Wiederkehrende Zählungen gleichen Soll und Ist je Lagerort ab, ohne die Historie zu überschreiben.",
        href: "/features/bestand-ausleihe",
        icon: ScanLine,
      },
      {
        id: "alerts",
        phase: 4,
        row: 2,
        title: "Prognose & Meldungen",
        kicker: "Reagieren",
        detail: "Mindestbestand, Verbrauch und Lieferzeit machen Engpässe sichtbar und begründen Nachbestellungen.",
        href: "/features/bestand-ausleihe",
        icon: BellRing,
      },
      {
        id: "integrations",
        phase: 4,
        row: 4,
        title: "API, Shop & Webhooks",
        kicker: "Synchronisieren",
        detail: "OpenAPI, WooCommerce, Webhooks und CSV verbinden freigegebene Daten mit anderen Systemen.",
        href: "/features/labels-api",
        icon: Webhook,
      },
      {
        id: "audit",
        phase: 4,
        row: 5,
        title: "Historie, Rechte & Audit",
        kicker: "Nachvollziehen",
        detail: "Rollen, Ereignisse und Zustellversuche zeigen, wer was ausgelöst hat und was daraus wurde.",
        href: "/features/betrieb-sicherheit",
        icon: History,
      },
    ],
  },
  en: {
    eyebrow: "The complete loop",
    title: "One inventory. Every business operation.",
    description:
      "From the first photo or demand through purchasing, reservations, lending, sales, and assembly to counting, alerts, and integrations. Choose a flow or building block to reveal its connections.",
    phases: [
      { title: "Triggers", description: "Something is captured or needed" },
      { title: "Data foundation", description: "The shared digital core" },
      { title: "Operations", description: "People and orders take action" },
      { title: "Stock ledger", description: "Every change is recorded" },
      { title: "Feedback", description: "Check, notify, and connect" },
    ],
    scenariosLabel: "Highlight a flow",
    scenarios: [
      { id: "all", label: "Complete system", description: "Every path and feedback loop in the application.", nodes: [] },
      { id: "procure", label: "Procure", description: "Demand becomes a purchase, receipt, and newly available stock.", nodes: ["demand", "resource", "context", "purchase", "stock", "movements", "alerts", "audit"] },
      { id: "operate", label: "Use & lend", description: "Requests, reservations, handover, and returns remain traceable on each device.", nodes: ["capture", "resource", "context", "requests", "loans", "scans", "stock", "movements", "units", "audit"] },
      { id: "sell", label: "Sell", description: "Store or direct orders reserve, ship, and reduce stock in a controlled process.", nodes: ["commerce", "resource", "variants", "context", "sales", "scans", "stock", "movements", "integrations", "audit"] },
      { id: "build", label: "Assemble", description: "Bills of materials consume components atomically and create traceable assemblies.", nodes: ["resource", "variants", "context", "assembly", "scans", "stock", "movements", "units", "audit"] },
      { id: "audit", label: "Count", description: "Counts and corrections reconcile physical quantities with the complete history.", nodes: ["capture", "resource", "context", "scans", "stock", "movements", "units", "counts", "alerts", "audit"] },
    ],
    selectedLabel: "Active building block",
    connectedLabel: "Directly connected",
    linkLabel: "Explore the feature",
    loopLabel: "Minimum stock and forecasts trigger the next purchase",
    diagramLabel: "Interactive Open Inventory business process",
    nodes: [
      { id: "capture", phase: 0, row: 0, title: "Photo, scan & import", kicker: "Capture", detail: "Photos, codes, CSV, and the iOS app create reviewable inventory records individually or in batches.", href: "/features/erfassen", icon: Camera },
      { id: "demand", phase: 0, row: 2, title: "Demand & request", kicker: "Plan", detail: "Internal demand is requested, approved, scheduled, and reserved until it is fulfilled.", href: "/features/bestand-ausleihe", icon: ClipboardList },
      { id: "commerce", phase: 0, row: 4, title: "Store, API & order", kicker: "Connect", detail: "External systems, WooCommerce, and direct orders bring demand into the same process.", href: "/features/labels-api", icon: Store },
      { id: "resource", phase: 1, row: 0, title: "Inventory record", kicker: "Master data", detail: "One central record combines name, type, media, fields, status, SKU, and relationships.", href: "/features/strukturieren", icon: PackageOpen },
      { id: "variants", phase: 1, row: 2, title: "Variants & bills of materials", kicker: "Structure", detail: "Variants, options, and bills of materials connect sellable configurations with their components.", href: "/features/strukturieren", icon: Boxes },
      { id: "context", phase: 1, row: 4, title: "Locations & contacts", kicker: "Context", detail: "Rooms, cabinets, vehicles, suppliers, customers, and people give every operation its context.", href: "/features/orte-raeume", icon: MapPinned },
      { id: "purchase", phase: 2, row: 0, title: "Purchasing & receipts", kicker: "Procure", detail: "Multi-line orders and partial receipts book quantities, units, and prices in a controlled process.", href: "/features/bestand-ausleihe", icon: ShoppingCart },
      { id: "requests", phase: 2, row: 1, title: "Approval & reservation", kicker: "Coordinate", detail: "Requests pass through approvals and hold available stock for a planned period.", href: "/features/bestand-ausleihe", icon: ClipboardCheck },
      { id: "loans", phase: 2, row: 2, title: "Lending & returns", kicker: "Hand over", detail: "Checkouts, due dates, partial returns, and cancellations remain visible per line and serial number.", href: "/features/bestand-ausleihe", icon: ContactRound },
      { id: "sales", phase: 2, row: 3, title: "Sales & shipping", kicker: "Fulfil", detail: "Sales orders, reservations, picking, and shipments operate on the same stock.", href: "/features/bestand-ausleihe", icon: PackageCheck },
      { id: "assembly", phase: 2, row: 4, title: "Assembly", kicker: "Produce", detail: "Assemblies consume their bill of materials completely or not at all and create a shared history.", href: "/features/bestand-ausleihe", icon: Factory },
      { id: "scans", phase: 2, row: 5, title: "Labels & scan flows", kicker: "Act in place", detail: "QR and barcodes open safe preview, review, and booking steps at the physical item.", href: "/features/labels-api", icon: QrCode },
      { id: "stock", phase: 3, row: 0, title: "Available stock", kicker: "Truth", detail: "Global quantity, availability, and distribution across locations are derived from bookings.", href: "/features/bestand-ausleihe", icon: PackageCheck },
      { id: "movements", phase: 3, row: 2, title: "Movements & costs", kicker: "Ledger", detail: "Receipts, issues, transfers, corrections, and costs remain as a dated, immutable trail.", href: "/features/bestand-ausleihe", icon: History },
      { id: "units", phase: 3, row: 4, title: "Bulk & serialized units", kicker: "Stock model", detail: "Interchangeable parts use bulk stock; devices keep a code, status, and location per unit.", href: "/features/bestand-ausleihe", icon: Boxes },
      { id: "counts", phase: 4, row: 0, title: "Counts & corrections", kicker: "Verify", detail: "Recurring counts reconcile expected and actual stock per location without overwriting history.", href: "/features/bestand-ausleihe", icon: ScanLine },
      { id: "alerts", phase: 4, row: 2, title: "Forecasts & alerts", kicker: "Respond", detail: "Minimum stock, consumption, and lead times expose shortages and justify replenishment.", href: "/features/bestand-ausleihe", icon: BellRing },
      { id: "integrations", phase: 4, row: 4, title: "API, store & webhooks", kicker: "Synchronize", detail: "OpenAPI, WooCommerce, webhooks, and CSV connect approved data with other systems.", href: "/features/labels-api", icon: Webhook },
      { id: "audit", phase: 4, row: 5, title: "History, access & audit", kicker: "Trace", detail: "Roles, events, and delivery attempts show who triggered what and what happened next.", href: "/features/betrieb-sicherheit", icon: History },
    ],
  },
};

function nodeKey(id: FlowNodeId) {
  return `flow-node-${id}`;
}

export function BusinessFlow({ locale }: { locale: MarketingLocale }) {
  const copy = diagramCopy[locale];
  const boardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<FlowNodeId, HTMLButtonElement>());
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("all");
  const [selectedNodeId, setSelectedNodeId] = useState<FlowNodeId>("stock");
  const [hoveredNodeId, setHoveredNodeId] = useState<FlowNodeId | null>(null);
  const [paths, setPaths] = useState<Array<FlowEdge & { d: string }>>([]);

  const activeScenarioCopy = copy.scenarios.find(
    (scenario) => scenario.id === activeScenario,
  ) ?? copy.scenarios[0];
  const selectedNode = copy.nodes.find((node) => node.id === selectedNodeId) ?? copy.nodes[0];
  const nodeById = useMemo(
    () => new Map(copy.nodes.map((node) => [node.id, node])),
    [copy.nodes],
  );
  const scenarioNodeIds = useMemo(
    () => new Set(activeScenarioCopy.nodes),
    [activeScenarioCopy.nodes],
  );
  const connectedNodeIds = useMemo(() => {
    const ids = new Set<FlowNodeId>();
    edges.forEach((edge) => {
      if (edge.from === selectedNode.id) ids.add(edge.to);
      if (edge.to === selectedNode.id) ids.add(edge.from);
    });
    return Array.from(ids);
  }, [selectedNode.id]);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const draw = () => {
      const bounds = board.getBoundingClientRect();
      const nextPaths = edges.flatMap((edge) => {
        const fromElement = nodeRefs.current.get(edge.from);
        const toElement = nodeRefs.current.get(edge.to);
        if (!fromElement || !toElement) return [];

        const from = fromElement.getBoundingClientRect();
        const to = toElement.getBoundingClientRect();
        const x1 = from.right - bounds.left;
        const y1 = from.top + from.height / 2 - bounds.top;
        const x2 = to.left - bounds.left;
        const y2 = to.top + to.height / 2 - bounds.top;
        const bend = Math.max(28, (x2 - x1) * 0.48);
        return [{ ...edge, d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}` }];
      });
      setPaths(nextPaths);
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(board);
    nodeRefs.current.forEach((node) => resizeObserver.observe(node));
    return () => resizeObserver.disconnect();
  }, [copy.nodes]);

  const isNodeActive = (id: FlowNodeId) => {
    if (hoveredNodeId) {
      return (
        hoveredNodeId === id ||
        edges.some(
          (edge) =>
            (edge.from === hoveredNodeId && edge.to === id) ||
            (edge.to === hoveredNodeId && edge.from === id),
        )
      );
    }
    return activeScenario === "all" || scenarioNodeIds.has(id);
  };

  const isEdgeActive = (edge: FlowEdge) => {
    if (hoveredNodeId) return edge.from === hoveredNodeId || edge.to === hoveredNodeId;
    return (
      activeScenario === "all" ||
      (scenarioNodeIds.has(edge.from) && scenarioNodeIds.has(edge.to))
    );
  };

  const renderNode = (node: FlowNode, compact = false) => {
    const Icon = node.icon;
    const active = isNodeActive(node.id);
    const selected = selectedNode.id === node.id;
    return (
      <button
        key={node.id}
        ref={compact ? undefined : (element) => {
          if (element) nodeRefs.current.set(node.id, element);
          else nodeRefs.current.delete(node.id);
        }}
        id={compact ? undefined : nodeKey(node.id)}
        type="button"
        aria-pressed={selected}
        onClick={() => setSelectedNodeId(node.id)}
        onPointerEnter={() => setHoveredNodeId(node.id)}
        onPointerLeave={() => setHoveredNodeId(null)}
        onFocus={() => setHoveredNodeId(node.id)}
        onBlur={() => setHoveredNodeId(null)}
        className={`group relative z-10 flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors duration-200 ${
          compact ? "min-h-[76px]" : "min-h-[92px]"
        } ${
          selected
            ? "border-brand bg-brand-soft text-foreground"
            : active
              ? "border-border bg-surface text-foreground hover:border-brand-border hover:bg-surface-muted"
              : "border-border bg-surface-subtle text-muted"
        }`}
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full ${
            selected ? "bg-brand-soft text-brand" : "bg-surface-muted text-brand"
          }`}
        >
          <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span
            className={`block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${
              selected ? "text-brand" : "text-muted"
            }`}
          >
            {node.kicker}
          </span>
          <span className="mt-1 block text-[13px] font-semibold leading-[1.2]">
            {node.title}
          </span>
        </span>
      </button>
    );
  };

  return (
    <section className="overflow-hidden bg-surface py-10 text-foreground">
      <div className="mx-auto w-full">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.68fr)] lg:items-end lg:gap-16">
          <div className="max-w-4xl">
            <p className="site-eyebrow">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em]">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-3xl text-[16px] leading-7 text-muted sm:text-[18px] sm:leading-8">
              {copy.description}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              {copy.scenariosLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2" aria-label={copy.scenariosLabel}>
              {copy.scenarios.map((scenario) => {
                const active = scenario.id === activeScenario;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`min-h-10 rounded-lg border px-3 py-2 text-[12px] font-semibold transition-colors ${
                      active
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-border bg-surface text-muted hover:border-border-strong hover:bg-surface-muted hover:text-foreground"
                    }`}
                  >
                    {scenario.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 min-h-10 text-[13px] leading-5 text-muted" aria-live="polite">
              {activeScenarioCopy.description}
            </p>
          </div>
        </div>

        <div
          className="mt-12 hidden grid-cols-5 gap-6 lg:grid"
          aria-hidden="true"
        >
          {copy.phases.map((phase, index) => (
            <div key={phase.title} className="border-t border-border pt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[14px] font-semibold">{phase.title}</h3>
              </div>
              <p className="mt-1 text-[11px] leading-4 text-muted">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={boardRef}
          className="relative mt-5 hidden min-h-[760px] grid-cols-5 grid-rows-6 gap-x-6 gap-y-4 lg:grid"
          role="group"
          aria-label={copy.diagramLabel}
        >
          <svg
            className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <marker id="flow-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-border-strong)" />
              </marker>
              <marker id="flow-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-brand)" />
              </marker>
            </defs>
            {paths.map((path) => {
              const active = isEdgeActive(path);
              return (
                <path
                  key={`${path.from}-${path.to}`}
                  d={path.d}
                  fill="none"
                  stroke={active ? "var(--color-brand)" : "var(--color-border)"}
                  strokeWidth={active ? 1.75 : 1}
                  markerEnd={`url(#flow-arrow-${active ? "active" : "muted"})`}
                />
              );
            })}
          </svg>

          {copy.nodes.map((node) => (
            <div
              key={node.id}
              className="self-center"
              style={{ gridColumn: node.phase + 1, gridRow: node.row + 1 }}
            >
              {renderNode(node)}
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-8 lg:hidden">
          {copy.phases.map((phase, phaseIndex) => (
            <div key={phase.title}>
              <div className="flex items-baseline gap-3 border-t border-border pt-4">
                <span className="font-mono text-[11px] text-brand">
                  {String(phaseIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold">{phase.title}</h3>
                  <p className="mt-1 text-[11px] text-muted">{phase.description}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {copy.nodes.filter((node) => node.phase === phaseIndex).map((node) => renderNode(node, true))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 border-y border-border py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          <span className="h-px flex-1 bg-border" />
          <span className="text-center">↺ {copy.loopLabel}</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div
          className="mt-8 grid gap-6 border border-border bg-surface-muted p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          aria-live="polite"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <selectedNode.icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-brand">
                {copy.selectedLabel}
              </p>
              <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.025em]">
                {selectedNode.title}
              </h3>
              <p className="mt-2 max-w-3xl text-[13px] leading-6 text-muted">
                {selectedNode.detail}
              </p>
              <p className="mt-3 text-[11px] text-muted">
                {copy.connectedLabel}: {connectedNodeIds.map((id) => nodeById.get(id)?.title).filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
          <Link
            href={marketingHref(locale, selectedNode.href)}
            className="site-button site-button-secondary"
          >
            {copy.linkLabel}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
