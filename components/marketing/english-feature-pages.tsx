import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Container,
  Github,
  KeyRound,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import {
  featureGroups,
  getFeatureGroup,
  type FeatureGroup,
  type FeatureSlug,
} from "@/app/features/features";
import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import { marketingHref } from "@/lib/marketing-i18n";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";
const licenseUrl = `${githubUrl}/blob/main/LICENSE`;
const openApiUrl = `${githubUrl}/blob/main/public/openapi.yaml`;

export type EnglishFeatureCopy = Omit<
  FeatureGroup,
  "slug" | "items" | "screenshot"
> & {
  items: Array<Omit<FeatureGroup["items"][number], "icon">>;
  screenshot: Omit<FeatureGroup["screenshot"], "src">;
};

const englishFeatureCopy = {
  erfassen: {
    menuTitle: "Capture",
    eyebrow: "01 · Capture",
    title: "From photos to inventory records",
    intro:
      "Capture starts at the object. Original media is retained, generated suggestions remain reviewable, and background work is split into visible stages.",
    description:
      "Technical overview of batch capture, image analysis, photo counting, media handling and the native open-source iOS client in Open Inventory.",
    detailIntro:
      "Open Inventory separates the short interaction at the object from slower server-side processing. Type, location and optional processing settings can be set once for a batch. Resource creation, uploads, analysis and cover generation then run as separate jobs with their own states.",
    outcomes: [
      "Capture several objects without waiting for every upload and processing step",
      "Review and correct generated fields before treating them as inventory data",
      "Keep original media and structured fields on the same record",
    ],
    workflowTitle: "A staged queue instead of one long request",
    workflowIntro:
      "Shared context is set before the series. Each object then moves through explicit stages that can fail or be retried independently.",
    workflow: [
      {
        title: "Set batch context",
        copy: "Choose the type, location and optional analysis or cover settings once for the series.",
      },
      {
        title: "Take the photos",
        copy: "Capture a primary image and, when useful, additional views or a separate nameplate photo.",
      },
      {
        title: "Process in stages",
        copy: "Resource creation, media uploads, analysis and cover generation expose separate job states. Defined retries use stable idempotency keys.",
      },
      {
        title: "Review the result",
        copy: "Check name, type, tags, quantity, tracking mode and media before relying on the record.",
      },
    ],
    example: {
      eyebrow: "Example · Workshop shelf",
      title: "Twelve objects with one shared location",
      copy: "The batch sets Tool and Shelf B2 once. Each object then needs its own photos; serial number, condition and other exceptional fields are added only where required.",
      facts: [
        { label: "Shared context", value: "Tool · Shelf B2" },
        { label: "Captures", value: "12 objects" },
        { label: "Final action", value: "Review suggestions" },
      ],
    },
    screenshot: {
      alt: "Open Inventory batch capture with mock inventory records",
      caption:
        "Camera-first batch capture · all visible records are mock data from a German-configured demo instance",
    },
    ios: {
      title: "Capture at the shelf with the native client.",
      copy: "The SwiftUI app takes photos at the object and persists each operation in an Application Support outbox before upload. It connects to an Open Inventory instance selected by the operator.",
      points: [
        "Take or select up to twelve photos for one record",
        "Resume defined upload stages after a network interruption or restart",
        "Scan a code, open the matching record and verify it on site",
      ],
    },
    trustTitle: "Provider boundaries are visible in the code.",
    trustCopy:
      "Image analysis and cover generation are optional provider-backed operations. The repository shows when data leaves the instance. Original images, provider configuration and the final stored values remain under operator control.",
    trustPoints: [
      "MIT-licensed web application and native iOS client in one repository",
      "Optional external processing rather than a requirement for basic capture",
      "CSV export and a documented REST API for independent workflows",
    ],
    items: [
      {
        title: "Camera-first batch capture",
        copy: "Capture several objects in sequence. Persistent jobs continue processing earlier records while the camera is available for the next object.",
      },
      {
        title: "Image-derived draft fields",
        copy: "Optional OpenAI or compatible image analysis proposes a name, description, type, tags, alt text and confidence value. The draft is editable before it is accepted.",
      },
      {
        title: "Generated square covers",
        copy: "OpenAI or Google can generate a square cover from a source photo. The generated asset is stored separately and the original photo remains available.",
      },
      {
        title: "Count similar parts from a photo",
        copy: "Optional photo counting marks detected instances and returns a confidence value. The quantity can be corrected before a stock movement is written.",
      },
      {
        title: "Media attached to the record",
        copy: "JPG, PNG, WebP, AVIF, HEIC, MP4, MOV, WebM, PDF and USDZ can be ordered on a record. Images are optimized client-side and EXIF coordinates can be imported.",
      },
      {
        title: "Native iPhone capture",
        copy: "The open SwiftUI app captures photos, scans codes and persists upload stages. Stable operation IDs prevent defined retries from creating duplicate records.",
      },
    ],
  },
  strukturieren: {
    menuTitle: "Data model",
    eyebrow: "02 · Structure",
    title: "Model the inventory you actually have",
    intro:
      "Types, typed custom fields, directed relations and content languages let different inventories use one application without forcing one industry schema.",
    description:
      "Technical overview of inventory types, typed custom fields, relations, media, translated content, search and bulk editing in Open Inventory.",
    detailIntro:
      "A household store and an equipment lab need different fields. Open Inventory combines stable inventory types, custom fields, relations, locations and media instead of hard-coding an industry model. The same structure is available through the UI and API.",
    outcomes: [
      "Add domain-specific types and fields without changing application code",
      "Connect containers, rooms, devices, people and projects with explicit relations",
      "Maintain larger datasets through search, filters and bulk updates",
    ],
    workflowTitle: "Start with a small schema and extend it deliberately",
    workflowIntro:
      "A field is useful when it is searched, filtered, validated or automated. Additional structure can be introduced as those requirements become clear.",
    workflow: [
      {
        title: "Define inventory types",
        copy: "Use a bundled type or create a custom type with a stable key shared by the UI and API.",
      },
      {
        title: "Add typed fields",
        copy: "Add only the required text, number, choice, date or reference fields for that type.",
      },
      {
        title: "Create explicit relations",
        copy: "Represent containment, responsibility and spatial relationships as directed links rather than free text.",
      },
      {
        title: "Search and update in bulk",
        copy: "Filter records and apply shared fields or additional tags to a selected set in one operation.",
      },
    ],
    example: {
      eyebrow: "Example · Equipment catalog",
      title: "A measuring device is more than its name",
      copy: "The Measuring device type can add a serial number, calibration date and responsible person. Relations connect accessories and storage without flattening those facts into one notes field.",
      facts: [
        { label: "Type", value: "Measuring device" },
        { label: "Custom fields", value: "Calibration · Owner" },
        { label: "Relations", value: "Accessory · Location" },
      ],
    },
    screenshot: {
      alt: "Structured Open Inventory list with mock records",
      caption:
        "Types, states, tags and locations in one view · mock data from a German-configured demo instance",
    },
    ios: {
      title: "The same structure is available on iOS.",
      copy: "The native client searches the same records as the web application. Location and other fields can be added while capturing the physical object.",
      points: [
        "Search by name, SKU, tag or location",
        "Open and edit records with authenticated media requests",
        "Use map, detail and settings screens implemented in SwiftUI",
      ],
    },
    trustTitle: "The schema is inspectable and transferable.",
    trustCopy:
      "Types and fields are not hidden behind a proprietary vertical model. The MIT-licensed implementation, validated CSV paths and documented API provide several ways to inspect and reuse the data.",
    trustPoints: [
      "Stable API keys for custom inventory types",
      "Validated UTF-8 CSV import and export",
      "OpenAPI 3.1 contract checked into the repository",
    ],
    items: [
      {
        title: "Records with complete details",
        copy: "Store quantity, status, SKU, serial number, value, categories, tags, location, notes, priority, GPS or GeoJSON data and ordered media on each record.",
      },
      {
        title: "Custom inventory types",
        copy: "Use bundled types for tools, objects, furniture, vehicles, locations, people, clothing and projects, or define custom types with stable API keys.",
      },
      {
        title: "Typed custom fields",
        copy: "Add short or long text, numbers, booleans, dates, date-times, single or multiple choices, email, URL and dynamic references, including fields on serialized units.",
      },
      {
        title: "Relations and containment",
        copy: "Configurable directed relations connect records. Manual placement and point-in-polygon derivation can represent rooms, cabinets, machines or projects.",
      },
      {
        title: "Localized record content",
        copy: "A canonical language, per-field freshness, terminology guidance and queued regeneration keep generated translations reviewable and consistent.",
      },
      {
        title: "Search, filters and bulk editing",
        copy: "Use the responsive grid or table, filter records, and update shared fields or append tags across a selected set.",
      },
    ],
  },
  "bestand-ausleihe": {
    menuTitle: "Stock and lending",
    eyebrow: "03 · Store and move",
    title: "Stock with an append-only history",
    intro:
      "Bulk quantities and individually serialized devices use different invariants but share locations, movements, assignments and ordering workflows.",
    description:
      "Technical overview of bulk and serialized stock, append-only movements, inventory counts, lending, reservations, purchasing and assemblies.",
    detailIntro:
      "Screws need a quantity; a laptop needs an identity. Open Inventory supports both tracking modes and writes each change as a dated movement. Current availability can therefore be reconciled with the events that produced it.",
    outcomes: [
      "Use bulk tracking for interchangeable parts and serialized units for identifiable devices",
      "Record issues, returns, transfers and corrections without replacing their history",
      "Connect minimum stock, purchase orders, receipts and assembly consumption",
    ],
    workflowTitle: "Every stock change records its reason",
    workflowIntro:
      "A movement changes more than a displayed number. It records the operation, location and recipient context used to derive the new state.",
    workflow: [
      {
        title: "Choose a tracking mode",
        copy: "Use bulk quantities for interchangeable parts and serialized units for devices with their own identity.",
      },
      {
        title: "Assign stock locations",
        copy: "Distribute stock across rooms, cabinets or vehicles while retaining the global quantity and availability view.",
      },
      {
        title: "Write a movement",
        copy: "Receipt, issue, transfer, lending and return operations are validated and appended to the history.",
      },
      {
        title: "Review replenishment inputs",
        copy: "Minimum quantity, consumption and lead time expose low stock and provide inputs for reorder planning.",
      },
    ],
    example: {
      eyebrow: "Example · Makerspace",
      title: "Count screws, track oscilloscopes individually",
      copy: "M4 screws are stored as a quantity per shelf. Each oscilloscope has its own code, state and location and can be assigned to a person.",
      facts: [
        { label: "Bulk stock", value: "240 screws" },
        { label: "Serialized", value: "4 devices" },
        { label: "Current operation", value: "1 device issued" },
      ],
    },
    screenshot: {
      alt: "Open Inventory stock view with mock quantities and locations",
      caption:
        "Availability, minimum quantities and stock locations · mock data from a German-configured demo instance",
    },
    ios: {
      title: "Write stock movements at the shelf.",
      copy: "The iPhone scans a code where a receipt, issue or return happens. The native app uses the same server-side movement history as the web application.",
      points: [
        "Resolve the scanned record before selecting an operation",
        "Prepare a receipt with a short on-device flow",
        "Require explicit confirmation before executing an issue",
      ],
    },
    trustTitle: "The ledger lives on the operator's instance.",
    trustCopy:
      "Movements, units, purchase orders and bills of materials are stored in PostgreSQL. The open implementation makes booking rules inspectable, while scoped API tokens support custom scanner, purchasing and reporting integrations.",
    trustPoints: [
      "Append-only movements rather than silent quantity replacement",
      "Docker Compose and PostgreSQL for the self-operated core",
      "Scoped API tokens for narrowly defined integrations",
    ],
    items: [
      {
        title: "Bulk or serialized tracking",
        copy: "Track identical parts as a quantity or represent every physical unit with a UUID, readable code, state, location, metadata and acquisition date.",
      },
      {
        title: "Append-only movements",
        copy: "Receipts, issues, corrections and transfers are dated and appended. Stock cannot fall below zero, and corrections do not rewrite previous events.",
      },
      {
        title: "Quantity by stock location",
        copy: "Any suitable inventory record can be a structured stock location. Global quantity and distribution across rooms, cabinets or vehicles remain visible together.",
      },
      {
        title: "Inventory count cycles",
        copy: "Schedule recurring counts, process due checks and reconcile quantities by location. Serialized units retain individual traceability.",
      },
      {
        title: "Lending, assignments and reservations",
        copy: "Issue quantities or units to users, other inventory records or free-text recipients. Returns and cancellation restore availability through explicit operations.",
      },
      {
        title: "Minimum stock and forecast inputs",
        copy: "Minimum quantity, reorder amount, lead time and consumption rate produce warnings, an estimated stock-out date and a documented reorder suggestion.",
      },
      {
        title: "Purchase orders and receipts",
        copy: "Record expected quantities and partial deliveries. Receipts are applied through controlled stock movements rather than direct quantity edits.",
      },
      {
        title: "Bills of materials and assemblies",
        copy: "Define assembly components and consume them atomically during a build: either the complete operation succeeds or none of it is applied.",
      },
    ],
  },
  "labels-api": {
    menuTitle: "Codes, labels and API",
    eyebrow: "04 · Resolve and integrate",
    title: "From a printed code to an API operation",
    intro:
      "Labels and software integrations resolve the same records. Scan workflows add preview and confirmation before a stock operation is executed.",
    description:
      "Technical overview of QR and barcode resolution, label layouts, CSV exchange, public shares and the OpenAPI 3.1 REST API.",
    detailIntro:
      "A label should resolve an unambiguous record; an integration should use the same documented identifiers and operations. Open Inventory connects both paths with explicit lookup, preview, validation and idempotent execution.",
    outcomes: [
      "Resolve records by short link, QR code, barcode, UUID, SKU or serial number",
      "Create reusable print layouts in the browser",
      "Exchange data through validated CSV and scoped REST operations",
    ],
    workflowTitle: "Resolve first, mutate only after review",
    workflowIntro:
      "A scan starts as a lookup. A stock change is written only after the record and proposed operation have been resolved and reviewed.",
    workflow: [
      {
        title: "Choose an identifier",
        copy: "Use a short inventory link, UUID, SKU or serial number as the stable entry point to the record.",
      },
      {
        title: "Build a label layout",
        copy: "Combine a QR link, Code 128, text and an optional record image in a reusable print definition.",
      },
      {
        title: "Scan and resolve",
        copy: "Camera, image upload or hardware scanner reads the code. The matching record is displayed before any mutation.",
      },
      {
        title: "Execute the workflow",
        copy: "Run a reviewed stock action or call the same contract from an integration using a scoped token and idempotency key.",
      },
    ],
    example: {
      eyebrow: "Example · Tool issue",
      title: "The scan opens context before the action",
      copy: "A QR code on a tool case resolves the unique inventory record. The UI shows state and location before asking whether to write the issue movement.",
      facts: [
        { label: "Entry point", value: "Short QR link" },
        { label: "Resolved record", value: "TOOL-0042" },
        { label: "Operation", value: "Confirm issue" },
      ],
    },
    screenshot: {
      alt: "Mock Open Inventory records that can be resolved by codes and API",
      caption:
        "The same records are used by search, scan and API paths · mock data from a German-configured demo instance",
    },
    ios: {
      title: "Use the iPhone as an open scanner client.",
      copy: "The native app recognizes QR, EAN-8/13, UPC-E, Code 128, Data Matrix, PDF417 and Aztec and calls the operator's own Open Inventory instance.",
      points: [
        "Resolve an inventory link, UUID, SKU or serial number",
        "Display the matching record before a stock mutation",
        "Inspect scanner and server implementations in the same repository",
      ],
    },
    trustTitle: "The API contract is a checked-in project artifact.",
    trustCopy:
      "The OpenAPI 3.1 specification is stored as YAML in the repository. Tokens are stored as hashes and can carry expiry dates and scopes. They can be revoked without changing the underlying user account.",
    trustPoints: [
      "Checked-in OpenAPI document and interactive reference",
      "Hashed, revocable tokens with expiry and scopes",
      "Validated CSV as a simple open exchange path",
    ],
    items: [
      {
        title: "QR and barcode workflows",
        copy: "Scan from a camera or image, resolve inventory links, UUIDs, SKUs and serial numbers, and review configurable stock operations before idempotent execution.",
      },
      {
        title: "Reusable label layouts",
        copy: "Design layouts in the browser with a short QR link, Code 128, optional record image and presets including Brother 62 mm and 102 × 152 mm.",
      },
      {
        title: "CSV import and export",
        copy: "Import and export UTF-8 CSV. Row-level validation identifies invalid values, and repeated imports can use idempotent processing.",
      },
      {
        title: "Transactional duplicate merging",
        copy: "A score helps identify similar records. A merge applies related-data changes transactionally instead of leaving partially moved associations.",
      },
      {
        title: "Revocable public shares",
        copy: "Expose selected records through a revocable read-only share without opening the complete workspace.",
      },
      {
        title: "Documented REST API",
        copy: "The checked-in OpenAPI 3.1 specification, interactive reference and hashed tokens with expiry and scopes make integrations inspectable.",
      },
    ],
  },
  "orte-raeume": {
    menuTitle: "Locations, maps and rooms",
    eyebrow: "05 · Spatial data",
    title: "From a map point to a room model",
    intro:
      "Locations can be plain text, structured inventory records, map geometries or optional room captures. Each level is independent.",
    description:
      "Technical overview of points, polygons, derived spatial relations, RoomPlan scans and navigable room data in Open Inventory.",
    detailIntro:
      "A broad location such as Warehouse is often insufficient for retrieval. Open Inventory can combine text locations, structured containers, GeoJSON and optional room scans. Simple inventories can stop at text; spatial data is added only where it resolves a real navigation problem.",
    outcomes: [
      "Connect inventory with map points, polygons and structured stock locations",
      "Derive spatial relations from geometry while preserving manual overrides",
      "Use supported iPhones for optional RoomPlan capture and placement",
    ],
    workflowTitle: "Add spatial precision only where it is needed",
    workflowIntro:
      "Each layer is optional. A text location can be enough; map and room data extend it for larger sites and buildings.",
    workflow: [
      {
        title: "Create a location record",
        copy: "Represent a room, cabinet, vehicle or other structured container as an inventory record.",
      },
      {
        title: "Add geometry",
        copy: "Set a map point or draw a polygon and edit its geometry directly in the map interface.",
      },
      {
        title: "Derive containment",
        copy: "A point inside a container polygon can produce a spatial relation. Explicit manual placement keeps precedence.",
      },
      {
        title: "Capture a room when useful",
        copy: "Use a compatible iPhone to capture rooms and floors, then inspect the resulting structure in the web viewer.",
      },
    ],
    example: {
      eyebrow: "Example · Location chain",
      title: "Site, building, room, cabinet",
      copy: "A measuring device is not merely in the lab. A map point identifies the building, relations identify the room, and the stock location narrows it to Cabinet 3, Shelf B.",
      facts: [
        { label: "Map", value: "North building" },
        { label: "Room", value: "Electronics lab" },
        { label: "Storage", value: "Cabinet 3 · Shelf B" },
      ],
    },
    screenshot: {
      alt: "Open Inventory dashboard with mock records linked to locations",
      caption:
        "Inventory and locations in the same self-hosted application · mock data from a German-configured demo instance",
    },
    ios: {
      title: "Room capture is native and optional.",
      copy: "On LiDAR-capable iPhones the SwiftUI client can use RoomPlan to capture rooms, floors and connected structures. Map and normal location features do not require Pro hardware.",
      points: [
        "Capture RoomPlan structures on compatible hardware",
        "Add photos and codes to inventory at the physical location",
        "Search and navigate captured rooms later in the web viewer",
      ],
    },
    trustTitle: "Spatial artifacts remain part of the open dataset.",
    trustCopy:
      "Coordinates, GeoJSON, relations and RoomPlan artifacts are managed by the operator's instance. The iOS and web implementations are inspectable; external map or derivative providers remain explicit configuration choices.",
    trustPoints: [
      "Web viewer and native capture implementation in the repository",
      "Explicit separation of manual and derived placement",
      "Optional provider boundaries instead of hidden dependencies",
    ],
    items: [
      {
        title: "Interactive map editing",
        copy: "Edit points and polygons, drag geometry handles, change layers or satellite imagery and assign multiple records from the map.",
      },
      {
        title: "Derived spatial containment",
        copy: "When a map point lies inside a container polygon, Open Inventory can derive a relation. A manual placement deliberately takes precedence.",
      },
      {
        title: "Optional RoomPlan scans",
        copy: "A LiDAR-capable iPhone can capture rooms, floors and connected structures. This is an extension for supported hardware, not a requirement for the rest of the app.",
      },
      {
        title: "Navigable 3D room data",
        copy: "The web viewer displays measured RoomPlan geometry, searchable inventory markers and optional photorealistic derivatives with explicit coordinate-system transforms.",
      },
    ],
  },
  "betrieb-sicherheit": {
    menuTitle: "Operations and security",
    eyebrow: "06 · Operate and secure",
    title: "Open source still needs operational discipline",
    intro:
      "Roles, scoped tokens, persistent data and explicit provider boundaries turn inspectable code into a service that can be operated deliberately.",
    description:
      "Technical overview of self-hosting, roles and access rules, Docker Compose, PostgreSQL, persistent uploads and the MIT-licensed codebase.",
    detailIntro:
      "Self-hosting moves control and responsibility to the operator. Open Inventory provides Compose files, migrations, a health endpoint, PostgreSQL and persistent upload storage as a documented base. Backups, restore tests, TLS, network exposure and updates remain operational tasks.",
    outcomes: [
      "Run and inspect the web app, API and iOS client on infrastructure you control",
      "Define roles, granular permissions and content-dependent access rules",
      "Manage the database, files, secrets, backups and optional providers explicitly",
    ],
    workflowTitle: "An open stack still requires operating decisions",
    workflowIntro:
      "Starting Compose is the first step. Identity, persistence, recovery and controlled upgrades are required for a durable service.",
    workflow: [
      {
        title: "Start the instance",
        copy: "Use the checked-in Docker Compose services, PostgreSQL, migrations and health endpoint as the baseline.",
      },
      {
        title: "Restrict access",
        copy: "Configure accounts, roles and rules, then decide whether the instance is private or exposed through a hardened reverse proxy.",
      },
      {
        title: "Back up all persistent data",
        copy: "Back up PostgreSQL and the selected file store together, and verify restoration regularly.",
      },
      {
        title: "Apply updates deliberately",
        copy: "Review repository changes, update images and migrations in a controlled sequence, and monitor the health endpoint.",
      },
    ],
    example: {
      eyebrow: "Example · Self-hosted instance",
      title: "A stack with explicit boundaries",
      copy: "The web app and API run in a container, structured data lives in PostgreSQL and uploads live on persistent storage. External identity, AI or storage providers are present only when configured.",
      facts: [
        { label: "Application", value: "Web · API · jobs" },
        { label: "Persistent data", value: "PostgreSQL · uploads" },
        { label: "Optional", value: "Identity · AI · storage" },
      ],
    },
    screenshot: {
      alt: "Self-hosted Open Inventory web interface with mock records",
      caption:
        "The application running on the open self-hostable stack · mock data from a German-configured demo instance",
    },
    ios: {
      title: "The iOS client connects to the operator's instance.",
      copy: "The native SwiftUI app is built from the same repository and uses a configured server origin. Reachability, TLS and certificate validity are therefore part of the deployment model.",
      points: [
        "Configure the server origin for the target instance",
        "Inspect web, API and iOS code in one repository",
        "Use HTTPS for connections outside a trusted local network",
      ],
    },
    trustTitle: "Open source enables review; it does not secure deployment by itself.",
    trustCopy:
      "The MIT license permits inspection, modification, operation and redistribution. It does not replace upgrades, backups or secure network configuration. Those responsibilities remain with the operator.",
    trustPoints: [
      "MIT license and source for web, API and iOS",
      "Docker Compose, migrations, health endpoint and persistent volumes",
      "Public issues and pull requests with visible revision history",
    ],
    items: [
      {
        title: "Roles and conditional rules",
        copy: "Manage local accounts, custom roles, granular permissions and content-dependent access rules. Auth0 can be added as an optional identity provider.",
      },
      {
        title: "Docker Compose and PostgreSQL",
        copy: "Containers, migrations, a health endpoint and persistent volumes for PostgreSQL and local uploads are checked in. Configuration and secrets remain deployment concerns.",
      },
      {
        title: "Selectable file storage",
        copy: "Store uploads in a persistent local volume by default or configure Openinary. Database and file storage must be backed up as one recoverable dataset.",
      },
      {
        title: "MIT-licensed source",
        copy: "The web app, API and native iOS client are published in one repository. The MIT license permits inspection, modification, operation and redistribution.",
      },
    ],
  },
} satisfies Record<FeatureSlug, EnglishFeatureCopy>;

export function getEnglishFeatureCopy(
  slug: string,
): EnglishFeatureCopy | undefined {
  return Object.prototype.hasOwnProperty.call(englishFeatureCopy, slug)
    ? englishFeatureCopy[slug as FeatureSlug]
    : undefined;
}

function EnglishInventoryPreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_28px_80px_rgba(24,20,38,0.14)]">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <span className="size-2.5 rounded-full bg-[#ff6a64]" />
        <span className="size-2.5 rounded-full bg-[#f7c84d]" />
        <span className="size-2.5 rounded-full bg-[#67d68c]" />
        <span className="ml-3 rounded-lg bg-surface-muted px-3 py-1.5 font-mono text-[9px] text-muted">
          Workshop · Inventory
        </span>
        <span className="ml-auto rounded-full bg-success-soft px-2.5 py-1 text-[9px] font-semibold text-success">
          248 records
        </span>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_0.72fr] sm:p-5">
        <div className="rounded-2xl border border-border bg-surface-subtle p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-warning-soft text-warning">
              <Boxes className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                18 V cordless drill
              </p>
              <p className="mt-0.5 text-[10px] text-muted">
                Tool · TOOL-0042
              </p>
            </div>
            <span className="ml-auto rounded-full bg-success-soft px-2 py-1 text-[9px] font-semibold text-success">
              Available
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              ["Stock", "6 units"],
              ["Location", "Shelf B · 2"],
              ["Last count", "12 Aug"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-surface p-2.5">
                <p className="text-[8px] uppercase tracking-[0.12em] text-muted">
                  {label}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["18 V", "Power tool", "Battery system A"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-soft px-2.5 py-1 text-[8px] font-medium text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#17181d] p-4 text-white">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Captured today
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.06em]">17</p>
          <div className="mt-5 space-y-2">
            {[
              ["Photo analyzed", "Work light"],
              ["Code resolved", "Cable reel"],
              ["Movement written", "+24 screws"],
            ].map(([action, item]) => (
              <div
                key={item}
                className="flex gap-2 rounded-xl bg-white/[0.06] p-2.5"
              >
                <Check
                  className="mt-0.5 size-3 shrink-0 text-[#8ff0cc]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[9px] font-semibold">{item}</p>
                  <p className="mt-0.5 text-[8px] text-white/45">{action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-border px-5 py-3 text-[9px] text-muted">
        Illustrative interface with mock records · no real inventory data
      </p>
    </div>
  );
}

export function EnglishFeaturesPage() {
  const href = (path: string) => marketingHref("en", path);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-55 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="pointer-events-none absolute -left-20 top-28 size-[340px] rounded-full bg-[#8ff0cc]/25 blur-[110px]" />
          <div className="pointer-events-none absolute right-0 top-16 size-[430px] rounded-full bg-[#8175ff]/18 blur-[130px]" />

          <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-soft px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-brand">
                <Github className="size-3.5" aria-hidden="true" />
                MIT-licensed source
              </div>
              <h1 className="mt-6 text-[clamp(3.3rem,6.5vw,6rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
                Features and
                <span className="block text-brand">implementation details.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-8 text-muted">
                Open Inventory combines photo capture, typed records, stock
                movements, labels, spatial data and an API. The sections below
                describe the data flow, provider boundaries and known operating
                responsibilities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={href("/docs#docker")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand shadow-[0_12px_30px_rgba(102,92,255,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  <Container className="size-[17px]" aria-hidden="true" />
                  Read the Docker setup
                </Link>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-border-strong"
                >
                  Inspect the source
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-muted">
                {["MIT license", "Self-hostable", "Web + native iOS client"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <Check
                        className="size-3 text-success"
                        strokeWidth={2.6}
                        aria-hidden="true"
                      />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
            <EnglishInventoryPreview />
          </div>
        </section>

        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:grid-cols-3 sm:px-8">
            {[
              ["One capture queue", "with separate resource, media and optional processing stages"],
              ["Two stock models", "for bulk quantities and individually serialized units"],
              ["One open contract", "shared by the web app, native iOS client and integrations"],
            ].map(([value, label]) => (
              <div key={value} className="border-l-2 border-brand-border pl-5">
                <p className="text-2xl font-semibold tracking-[-0.04em]">
                  {value}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Interface examples
                </p>
                <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[58px]">
                  Mock records in the actual web interface.
                </h2>
              </div>
              <p className="text-[15px] leading-7 text-muted">
                These screenshots use deliberately created example records. The
                captured demo instance is configured in German, so embedded UI
                labels are not an English translation of the page around them.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[
                {
                  src: "/marketing/inventory-mock-data.jpg",
                  title: "Search inventory records",
                  copy: "Inspect records, states, tags and locations in one list.",
                },
                {
                  src: "/marketing/stock-mock-data.jpg",
                  title: "Review stock state",
                  copy: "See availability, minimum quantities and replenishment context.",
                },
                {
                  src: "/marketing/batch-mock-data.jpg",
                  title: "Process a capture batch",
                  copy: "Keep capture separate from queued uploads and optional analysis.",
                },
              ].map((screenshot, index) => (
                <figure
                  key={screenshot.src}
                  className={`overflow-hidden rounded-[24px] border border-border bg-surface shadow-[var(--shadow-md)] ${
                    index === 2
                      ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.625rem)]"
                      : ""
                  }`}
                >
                  <div className="relative overflow-hidden border-b border-border bg-surface-muted">
                    <Image
                      src={screenshot.src}
                      alt={`${screenshot.title} in Open Inventory with mock records`}
                      width={1440}
                      height={960}
                      sizes={
                        index === 2
                          ? "(max-width: 1024px) 100vw, 600px"
                          : "(max-width: 1024px) 100vw, 50vw"
                      }
                      className="h-auto w-full"
                    />
                    <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-[#17181d]/85 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                      Mock data
                    </span>
                  </div>
                  <figcaption className="p-5">
                    <p className="text-[17px] font-semibold tracking-[-0.025em]">
                      {screenshot.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-muted">
                      {screenshot.copy}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Feature reference
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[60px]">
                Six areas, with their constraints explained.
              </h2>
              <p className="mt-6 text-[17px] leading-8 text-muted">
                Every item below belongs to the open project. External AI,
                identity, map and storage providers remain optional deployment
                choices.
              </p>
            </div>

            <div className="mt-20 space-y-24 sm:mt-24">
              {featureGroups.map((source) => {
                const group = englishFeatureCopy[source.slug];
                return (
                  <section
                    id={source.slug}
                    key={source.slug}
                    className="scroll-mt-28"
                  >
                    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                          {group.eyebrow}
                        </p>
                        <h3 className="mt-4 text-[32px] font-semibold leading-[1.05] tracking-[-0.05em] sm:text-[42px]">
                          {group.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
                          {group.intro}
                        </p>
                        <Link
                          href={href(`/features/${source.slug}`)}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
                        >
                          Open the technical detail
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {group.items.map((item, index) => {
                          const Icon = source.items[index]?.icon ?? Boxes;
                          return (
                            <article
                              key={item.title}
                              className="rounded-[22px] border border-border bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
                            >
                              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                                <Icon
                                  className="size-[18px]"
                                  strokeWidth={1.9}
                                  aria-hidden="true"
                                />
                              </span>
                              <h4 className="mt-5 text-[17px] font-semibold tracking-[-0.025em]">
                                {item.title}
                              </h4>
                              <p className="mt-2 text-[13px] leading-6 text-muted">
                                {item.copy}
                              </p>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Open implementation
              </p>
              <h2 className="mt-4 text-[38px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[52px]">
                Inspect the code and the operating boundaries.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-muted">
                The web app, native iOS client, database migrations and OpenAPI
                document are published together under the MIT license.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={href("/open-source")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-strong px-5 text-sm font-semibold text-on-strong transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Open-source details
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={href("/ios")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border px-5 text-sm font-semibold transition hover:bg-surface-muted"
              >
                Native iOS architecture
                <Smartphone className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

function EnglishProductScreenshot({
  source,
  copy,
}: {
  source: FeatureGroup;
  copy: EnglishFeatureCopy;
}) {
  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_34px_100px_rgba(23,23,35,0.18)]">
      <div className="flex h-11 items-center gap-1.5 border-b border-border bg-surface px-4">
        <span className="size-2 rounded-full bg-[#ff6a64]" />
        <span className="size-2 rounded-full bg-[#f7c84d]" />
        <span className="size-2 rounded-full bg-[#67d68c]" />
        <span className="ml-3 font-mono text-[8px] text-muted">
          app.open-inventory.local
        </span>
        <span className="ml-auto rounded-full bg-brand-soft px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] text-brand">
          Mock data
        </span>
      </div>
      <Image
        src={source.screenshot.src}
        alt={copy.screenshot.alt}
        width={1440}
        height={960}
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-border px-5 py-3 text-[9px] text-muted">
        {copy.screenshot.caption}
      </figcaption>
    </figure>
  );
}

function EnglishExamplePanel({ copy }: { copy: EnglishFeatureCopy }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#1a1b21] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="size-2 rounded-full bg-[#ff6a64]" />
        <span className="size-2 rounded-full bg-[#f7c84d]" />
        <span className="size-2 rounded-full bg-[#67d68c]" />
        <span className="ml-3 font-mono text-[9px] text-white/35">
          concrete example
        </span>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ff0cc]">
          {copy.example.eyebrow}
        </p>
        <h3 className="mt-4 text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[38px]">
          {copy.example.title}
        </h3>
        <p className="mt-4 max-w-xl text-[14px] leading-7 text-white/55">
          {copy.example.copy}
        </p>
        <div className="mt-8 grid gap-2 sm:grid-cols-3">
          {copy.example.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {fact.label}
              </p>
              <p className="mt-3 text-[12px] font-semibold leading-5 text-white/90">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnglishFeatureDetailPage({ slug }: { slug: string }) {
  const source = getFeatureGroup(slug);
  const copy = getEnglishFeatureCopy(slug);
  if (!source || !copy) return null;

  const href = (path: string) => marketingHref("en", path);
  const currentIndex = featureGroups.findIndex(
    (item) => item.slug === source.slug,
  );
  const nextSource =
    featureGroups[(currentIndex + 1) % featureGroups.length] ?? featureGroups[0];
  const nextCopy = nextSource ? englishFeatureCopy[nextSource.slug] : undefined;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
          <div className="pointer-events-none absolute -left-24 top-24 size-[380px] rounded-full bg-[#8ff0cc]/24 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-12 size-[460px] rounded-full bg-[#8175ff]/18 blur-[135px]" />

          <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-12">
            <Link
              href={href("/features")}
              className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-muted transition hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              All features
            </Link>

            <div className="mt-10 grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
              <div className="relative z-10 max-w-[650px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(3.15rem,6.2vw,5.9rem)] font-semibold leading-[0.91] tracking-[-0.068em]">
                  {copy.title}
                </h1>
                <p className="mt-7 text-[17px] leading-7 text-muted sm:text-[19px] sm:leading-8">
                  {copy.intro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={href("/docs#docker")}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand shadow-[0_12px_30px_rgba(102,92,255,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-hover"
                  >
                    <Container className="size-4" aria-hidden="true" />
                    Read the self-hosting setup
                  </Link>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-border-strong"
                  >
                    <Github className="size-4" aria-hidden="true" />
                    Inspect on GitHub
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-muted">
                  {["MIT license", "Self-hostable", "Native iOS client"].map(
                    (item) => (
                      <span key={item} className="flex items-center gap-1.5">
                        <Check
                          className="size-3 text-success"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <EnglishProductScreenshot source={source} copy={copy} />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Scope
              </p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[56px]">
                What this area changes in the data flow.
              </h2>
              <p className="mt-6 text-[16px] leading-8 text-muted">
                {copy.detailIntro}
              </p>
            </div>
            <div className="grid content-start gap-3">
              {copy.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="flex gap-4 rounded-[20px] border border-border bg-surface p-5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-success-soft text-success">
                    <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Result {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-[15px] font-medium leading-6">
                      {outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface-subtle py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Included implementation
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[60px]">
                Individual capabilities and constraints.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-muted">
                These components are part of the MIT-licensed project. Optional
                providers are identified where they take part in a workflow.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {copy.items.map((item, index) => {
                const Icon = source.items[index]?.icon ?? Boxes;
                return (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-border bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                        <Icon
                          className="size-5"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-mono text-[9px] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-9 text-[21px] font-semibold tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-6 text-muted">
                      {item.copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Sequence
                </p>
                <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                  {copy.workflowTitle}
                </h2>
                <p className="mt-5 text-[15px] leading-7 text-muted">
                  {copy.workflowIntro}
                </p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {copy.workflow.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative rounded-[22px] border border-border bg-surface p-5"
                  >
                    <span className="grid size-9 place-items-center rounded-xl bg-strong font-mono text-[10px] font-semibold text-on-strong">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-8 text-[18px] font-semibold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      {step.copy}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#121318] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                Worked example
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[60px]">
                Concrete records, states and decisions.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/55">
                The values are mock data, but the workflow and state changes
                correspond to operations implemented by Open Inventory.
              </p>
            </div>
            <EnglishExamplePanel copy={copy} />
          </div>
        </section>

        <section className="border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div className="relative mx-auto grid aspect-square w-full max-w-[340px] place-items-center rounded-[34px] border border-border bg-[radial-gradient(circle_at_30%_20%,var(--color-brand-soft),var(--color-surface)_62%)] shadow-[var(--shadow-md)]">
              <div className="absolute inset-8 rounded-[28px] border border-border/70" />
              <span className="relative grid size-24 place-items-center rounded-[28px] bg-brand-solid text-on-brand shadow-[0_22px_50px_rgba(102,92,255,0.28)]">
                <Smartphone className="size-11" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="absolute bottom-8 rounded-full border border-border bg-surface px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand shadow-sm">
                Native SwiftUI client
              </span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-soft px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Smartphone className="size-3.5" aria-hidden="true" />
                Open-source iOS implementation
              </div>
              <h2 className="mt-6 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[60px]">
                {copy.ios.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-muted">
                {copy.ios.copy}
              </p>
              <div className="mt-7 grid gap-3">
                {copy.ios.points.map((point) => (
                  <p key={point} className="flex gap-3 text-sm leading-6">
                    <Check
                      className="mt-1 size-4 shrink-0 text-success"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {point}
                  </p>
                ))}
              </div>
              <Link
                href={href("/ios")}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
              >
                Read the native iOS architecture
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="overflow-hidden rounded-[30px] border border-border bg-surface shadow-[var(--shadow-md)]">
              <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:p-14">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-success">
                    <Github className="size-3.5" aria-hidden="true" />
                    MIT-licensed source
                  </div>
                  <h2 className="mt-6 text-[38px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[52px]">
                    {copy.trustTitle}
                  </h2>
                  <p className="mt-5 text-[15px] leading-7 text-muted">
                    {copy.trustCopy}
                  </p>
                </div>
                <div>
                  <div className="grid gap-3">
                    {copy.trustPoints.map((point) => (
                      <div
                        key={point}
                        className="flex gap-3 rounded-2xl border border-border bg-surface-subtle p-4"
                      >
                        <ShieldCheck
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <p className="text-[13px] leading-6">{point}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-3.5 text-xs font-semibold transition hover:bg-surface-muted"
                    >
                      MIT license
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={openApiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-3.5 text-xs font-semibold transition hover:bg-surface-muted"
                    >
                      <KeyRound className="size-3.5" aria-hidden="true" />
                      OpenAPI 3.1
                    </a>
                    <Link
                      href={href("/open-source")}
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-strong px-3.5 text-xs font-semibold text-on-strong transition hover:opacity-90"
                    >
                      Open-source architecture
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface-subtle py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              {nextSource && nextCopy ? (
                <Link
                  href={href(`/features/${nextSource.slug}`)}
                  className="group rounded-[28px] border border-border bg-surface p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)] sm:p-9"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-brand">
                    Next feature area
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <h2 className="text-[32px] font-semibold leading-none tracking-[-0.05em] sm:text-[42px]">
                        {nextCopy.menuTitle}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                        {nextCopy.intro}
                      </p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition group-hover:translate-x-1">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ) : null}

              <div className="rounded-[28px] bg-[#121318] p-7 text-white shadow-sm sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8ff0cc]">
                  Operate your own instance
                </p>
                <h2 className="mt-5 text-[32px] font-semibold leading-none tracking-[-0.05em] sm:text-[42px]">
                  Start from the documented stack.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/50">
                  Review the Compose services, persistence requirements and
                  provider configuration before exposing an instance to a
                  network.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={href("/docs#docker")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-[#17181d] transition hover:-translate-y-0.5"
                  >
                    <Container className="size-4" aria-hidden="true" />
                    Docker setup
                  </Link>
                  <Link
                    href={href("/use-cases")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-xs font-semibold transition hover:bg-white/10"
                  >
                    Use-case notes
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
