import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";

import {
  featureIOSCaptures,
  featureGroups,
  getFeatureGroup,
  type FeatureGroup,
  type FeatureSlug,
} from "@/app/features/features";
import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import { marketingHref, type MarketingLocale } from "@/lib/marketing-i18n";
import { publicDemoUrl } from "@/lib/site-config";
import { BusinessFlow } from "@/components/marketing/business-flow";

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
      {
        title: "Bin estimates · experimental",
        copy: "Estimate quantities from several photos. The optional 3D mode adds a rotatable model with manual annotations and needs a dedicated GPU runtime. Accuracy is not validated; stock booking remains a separate confirmation.",
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
      "Technical overview of inventory types, typed custom fields, variant families, options, relations, media, favorites, search and bulk editing.",
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
      alt: "Actual Open Inventory item detail with an object photo, structured fields, and demo data",
      caption:
        "Media, master data, and stock information on an actual demo record",
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
        copy: "Use the responsive grid or table, favorite frequently needed records, filter inventory, and update shared fields or tags across a selected set.",
      },
      {
        title: "Variant families and options",
        copy: "Connect existing records as variants or generate configurations from option groups. Every variant remains a complete record with its own SKU, barcode, and stock.",
      },
      {
        title: "Relationship and cost structure",
        copy: "Visualize families, bills of materials, containment, and other links across several levels. The optional cost view exposes material contributions through the structure.",
      },
    ],
  },
  "bestand-ausleihe": {
    menuTitle: "Stock and operations",
    eyebrow: "03 · Store and move",
    title: "Stock with an append-only history",
    intro:
      "Bulk quantities and serialized devices use different invariants but share locations, movements, purchasing, sales, lending, and request workflows.",
    description:
      "Technical overview of bulk and serialized stock, movements, inventory counts, internal requests, purchasing, sales, lending, costs, and assemblies.",
    detailIntro:
      "Screws need a quantity; a laptop needs an identity. Open Inventory supports both tracking modes and writes each change as a dated movement. Current availability can therefore be reconciled with the events that produced it.",
    outcomes: [
      "Use bulk tracking for interchangeable parts and serialized units for identifiable devices",
      "Record issues, returns, transfers and corrections without replacing their history",
      "Connect requests, purchases, sales, loans, costs, and assembly consumption",
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
      alt: "Actual Open Inventory stock management with a booking form, locations, and movement history",
      caption:
        "Stock, incoming and outgoing movements, and history in the running web app · demo data",
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
        title: "Plan consumption and deliveries",
        copy: "Compare stock history and forecasts. Consumption, lead times and outstanding receipts inform suggested reorder dates and quantities. You still decide when to place an order.",
      },
      {
        title: "Bill-of-materials analysis",
        copy: "Review production quantities, variants, component needs, costs and dependencies before building. Missing prices remain visibly unknown.",
      },
      {
        title: "Edit individual device codes",
        copy: "Change a serialized unit’s code and print its own label. The unit ID and QR link stay the same.",
      },
      {
        title: "Bulk or serialized tracking",
        copy: "Track identical parts as a quantity or represent every physical unit with a UUID, readable code, state, location, metadata and acquisition date.",
      },
      {
        title: "Append-only movements",
        copy: "Receipts, issues, corrections, and transfers are dated and recorded. Organization policy decides whether negative stock is allowed; corrections remain visible in the history.",
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
        title: "Loans and multi-line operations",
        copy: "Bundle several quantities or serialized units per contact. Issue, due date, partial returns, and cancellation remain traceable for every line.",
      },
      {
        title: "Minimum stock and forecast inputs",
        copy: "Minimum quantity, reorder amount, lead time and consumption rate produce warnings, an estimated stock-out date and a documented reorder suggestion.",
      },
      {
        title: "Purchasing and sales",
        copy: "Create multi-line purchase and sales orders with contacts, prices, and partial quantities. Receipts and issues are applied through controlled stock movements.",
      },
      {
        title: "Internal requests and calendar",
        copy: "Plan future demand, approve or reject requests, and reserve stock until fulfilment. The calendar exposes upcoming allocations before approval.",
      },
      {
        title: "Costs and purchase units",
        copy: "Store prices on movements, review inventory and material costs, and convert purchased rolls, boxes, or canisters into the corresponding base unit.",
      },
      {
        title: "Bills of materials and assemblies",
        copy: "Define assembly components and consume them atomically during a build: either the complete operation succeeds or none of it is applied.",
      },
    ],
  },
  "labels-api": {
    menuTitle: "Labels, printing and API",
    eyebrow: "04 · Resolve and integrate",
    title: "From a printed code to an API operation",
    intro:
      "Design labels for items and individual devices. Print through the browser, a local P-touch or a shared Office printer, and connect other systems through the API.",
    description:
      "Design labels, save print lists and use browser printing, QZ Tray or a shared Office printer. QR scans, CSV and the REST API connect your workflows.",
    detailIntro:
      "Choose items or individual units, adjust a template and prepare a print series. Scan the label later to open the matching record. CSV and the API connect your inventory to other systems.",
    outcomes: [
      "Label items and individual devices with their own QR codes",
      "Print locally or on the shared Office printer and save personal print lists",
      "Exchange data through CSV and a scoped REST API",
    ],
    workflowTitle: "From an item to a printed label",
    workflowIntro:
      "Print a single label or collect multiple items and templates into a series.",
    workflow: [
      { title: "Choose an item or device", copy: "Select an item or serialized unit. Its QR link stays valid when the device code changes." },
      { title: "Design the label", copy: "Combine QR codes, barcodes, images and text. Adjust print-only titles, subtitles and copies, then check the preview." },
      { title: "Choose a destination", copy: "Use the browser dialog, QZ Tray on a local PT-P710BT or a shared Windows printer. Send prepared labels as a series." },
      { title: "Scan and continue", copy: "Open the record by scanning, review the operation and confirm the stock action." },
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
      alt: "Open Inventory label designer with QR and barcode preview",
      caption:
        "Label designer in the web app · German demo data",
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
    trustTitle: "API access with scoped permissions",
    trustCopy:
      "The OpenAPI 3.1 specification is stored as YAML in the repository. Tokens are stored as hashes and can carry expiry dates and scopes. They can be revoked without changing the underlying user account.",
    trustPoints: [
      "Checked-in OpenAPI document and interactive reference",
      "Hashed, revocable tokens with expiry and scopes",
      "Validated CSV as a simple open exchange path",
    ],
    items: [
      {
        title: "Three printing options",
        copy: "Use the browser print dialog, direct USB printing on a Brother PT-P710BT through QZ Tray, or a shared Office printer with a Windows agent. Shared setup currently uses 24 mm tape.",
      },
      {
        title: "Saved print lists",
        copy: "Collect items, individual units, templates and copies. Your personal list is saved per organization. A P-touch series supports up to 100 labels using the same tape width.",
      },
      {
        title: "QR and barcode workflows",
        copy: "Scan from a camera or image, resolve inventory links, UUIDs, SKUs and serial numbers, and design configurable action flows with previews, inputs, and confirmed execution.",
      },
      {
        title: "Reusable label layouts",
        copy: "Design QR codes, barcodes, multiple text fields, subtitles and custom images. Adjust typography and cropping, use inverted printing or automatic label length, test-print drafts and save copies.",
      },
      {
        title: "CSV import and export",
        copy: "Import and export UTF-8 CSV. Row-level validation identifies invalid values, and repeated imports can use idempotent processing.",
      },
      {
        title: "Transactional duplicate merging",
        copy: "Find similar records and merge them together with their related data.",
      },
      {
        title: "Revocable public shares",
        copy: "Expose selected records through a revocable read-only share without opening the complete workspace.",
      },
      {
        title: "Documented REST API",
        copy: "Read and update inventory through the interactive OpenAPI reference. API tokens are revocable and scoped; print management requires a browser session.",
      },
      {
        title: "WooCommerce stock sync",
        copy: "Map store line items to bulk stock by exact SKU. Webhooks issue order quantities and reconcile refunds or cancellations with traceable reversal movements.",
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
      alt: "Actual Open Inventory stock-locations view with quantities distributed across three demo locations",
      caption:
        "Stock distributed across configured locations in the running web app · demo data",
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
      {
        title: "Room photos and estimated placement",
        copy: "Select specific room photos for optional analysis. Recognized objects and estimated positions remain reviewable suggestions before they are added to the room structure.",
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
      "Technical overview of organizations, roles, OIDC, controlled offline copies, AI cost limits, Docker Compose, PostgreSQL, and the MIT-licensed codebase.",
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
      alt: "Actual Open Inventory access settings with roles and members in a demo organization",
      caption:
        "Roles, members, and access rules in the running self-hosted web app",
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
        copy: "Manage local accounts, custom roles, granular permissions and content-dependent access rules. Auth0 or a standards-based OpenID Connect provider can be added for sign-in.",
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
        title: "Multiple organizations",
        copy: "Separate workspaces, data, and memberships within one deployment. Roles and permissions are evaluated in the currently selected organization.",
      },
      {
        title: "AI usage and monthly limit",
        copy: "Review estimated cost by action, provider, and status. An organization limit is checked before every paid AI call and can stop paid AI completely.",
      },
      {
        title: "Controlled offline copies",
        copy: "Keep selected views available offline on a trusted device. Disabling offline access or signing out removes the locally stored copies.",
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

const presentationCopy = {
  de: {
    erfassen: { title: "Gegenstände mit Fotos erfassen", intro: "Fotografiere Geräte und Material direkt vor Ort. Ergänze die Angaben selbst oder prüfe optionale KI-Vorschläge, bevor du sie übernimmst." },
    strukturieren: { title: "Ein Platz für alle Angaben", intro: "Fotos, Seriennummern, Dokumente und eigene Felder gehören zum selben Eintrag. Suche und Filter helfen dir, ihn wiederzufinden." },
    "bestand-ausleihe": { title: "Bestände und Ausleihen verfolgen", intro: "Verfolge Ausleihen, Verbrauch und Lieferungen. Bestandsprognosen helfen beim Nachbestellen; die Stücklistenanalyse zeigt Materialbedarf und Kosten vor der Fertigung." },
    "labels-api": { title: "Etiketten gestalten. Gemeinsam drucken.", intro: "Kennzeichne Artikel und einzelne Geräte mit QR-Etiketten. Drucke lokal oder am gemeinsamen Bürodrucker und speichere vorbereitete Drucklisten für später." },
    "orte-raeume": { title: "Vom Standort zum richtigen Regal", intro: "Ordne Gegenstände Räumen, Schränken und Lagerorten zu. Karten und Raumansichten ergänzen den Standort, wenn du sie brauchst." },
    "betrieb-sicherheit": { title: "Auf deinem Server. Mit klaren Zugriffsrechten.", intro: "Betreibe Open Inventory auf deiner Infrastruktur, verwalte Rollen und sichere deine Daten. Quellcode und Dokumentation sind öffentlich." },
  },
  en: {
    erfassen: { title: "Capture objects with photos", intro: "Photograph equipment and supplies where you find them. Enter the details yourself or review optional AI suggestions before accepting them." },
    strukturieren: { title: "One place for every detail", intro: "Keep photos, serial numbers, documents and custom fields on the same record. Search and filters help you find it again." },
    "bestand-ausleihe": { title: "Keep track of stock and loans", intro: "Track loans, consumption and deliveries. Stock forecasts inform replenishment; bill-of-materials analysis shows component needs and costs before production." },
    "labels-api": { title: "Design labels. Share a printer.", intro: "Label items and individual devices with QR codes. Print locally or on the shared Office printer and save prepared lists for later." },
    "orte-raeume": { title: "Find the location. Find the shelf.", intro: "Assign objects to rooms, cabinets and storage locations. Add maps and room views when you need more spatial context." },
    "betrieb-sicherheit": { title: "Your server. Clear access controls.", intro: "Run Open Inventory on your infrastructure, manage roles and back up your data. The source and documentation are public." },
  },
} satisfies Record<MarketingLocale, Record<FeatureSlug, { title: string; intro: string }>>;

function featureCopy(locale: MarketingLocale, group: FeatureGroup): EnglishFeatureCopy {
  return locale === "en" ? englishFeatureCopy[group.slug] : group;
}

function ProductScreenshot({
  group,
  copy,
  eager = false,
}: {
  group: FeatureGroup;
  copy: EnglishFeatureCopy;
  eager?: boolean;
}) {
  return (
    <figure className="min-w-0">
      <div className="site-product-frame">
        <Image
          src={group.screenshot.src}
          alt={copy.screenshot.alt}
          width={1440}
          height={960}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted">
        {copy.screenshot.caption}
      </figcaption>
    </figure>
  );
}

function FeatureActions({ locale }: { locale: MarketingLocale }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={publicDemoUrl} className="site-button site-button-primary">
        {locale === "de" ? "Live-Demo öffnen" : "Open live demo"}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
      <Link href={marketingHref(locale, "/docs#docker")} className="site-button site-button-secondary">
        {locale === "de" ? "Selbst hosten" : "Self-host"}
      </Link>
    </div>
  );
}

export function FeatureOverviewPage({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const href = (path: string) => marketingHref(locale, path);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main id="main-content">
        <section className="site-section border-b border-border">
          <div className="site-shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="site-eyebrow">{de ? "Die Funktionen" : "The features"}</p>
              <h1 className="site-title mt-5">{de ? "Wissen, was da ist. Und wo es bleibt." : "Know what you have. And where it goes."}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                {de ? "Erfasse Geräte und Material, finde ihren Standort und behalte Ausleihen und Bestände im Blick. Vom ersten Gegenstand bis zum gemeinsamen Lager." : "Capture equipment and supplies, find their location and keep track of loans and stock. From your first item to a shared storeroom."}
              </p>
              <FeatureActions locale={locale} />
              <p className="mt-6 text-sm text-muted">{de ? "MIT-Lizenz · Selbst gehostet · Web und iOS" : "MIT license · Self-hosted · Web and iOS"}</p>
            </div>
            <figure className="min-w-0">
              <div className="site-product-frame">
                <Image src="/marketing/screenshots/web-inventory.png" alt={de ? "Inventarübersicht mit Objektfotos, Namen und Standorten in Open Inventory" : "Open Inventory records with object photos, names and locations"} width={1440} height={960} loading="eager" sizes="(max-width: 1024px) 100vw, 58vw" className="h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-xs leading-5 text-muted">{de ? "Die Web-App mit Beispieldaten. Alle Produktansichten zeigen die tatsächliche Oberfläche." : "The web app with demo data. All product captures show the actual interface; this demo instance is in German."}</figcaption>
            </figure>
          </div>
        </section>

        <nav aria-label={de ? "Funktionsbereiche" : "Feature areas"} className="border-b border-border bg-surface">
          <div className="site-shell grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureGroups.map((group, index) => (
              <a key={group.slug} href={`#${group.slug}`} className="flex min-h-16 items-center gap-3 py-4 text-sm font-medium transition-colors hover:text-brand">
                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                {featureCopy(locale, group).menuTitle}
                <ArrowRight className="ml-auto size-4 text-muted" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>

        <section className="border-b border-border py-10">
          <div className="site-shell">
            <h2 className="site-eyebrow">{de ? "Aktuell ergänzt" : "Recently added"}</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-3">
              {(de ? [
                ["Gemeinsam drucken", "Etiketten für Einzelgeräte, gespeicherte Listen und ein Bürodrucker für das Team.", "/features/labels-api"],
                ["Bestände vorausplanen", "Verbrauch, Lieferungen und Bestandsverläufe für Nachbestellungen nutzen.", "/docs#planning"],
                ["Fertigung durchrechnen", "Varianten, Materialbedarf, Kosten und Abhängigkeiten in der Stücklistenanalyse vergleichen.", "/features/bestand-ausleihe"],
              ] : [
                ["Share a printer", "Individual unit labels, saved print lists and an Office printer for the team.", "/features/labels-api"],
                ["Plan ahead", "Use consumption, deliveries and stock history to plan replenishment.", "/docs#planning"],
                ["Plan production", "Compare variants, material needs, costs and dependencies in the BOM analysis.", "/features/bestand-ausleihe"],
              ]).map(([title, text, path]) => <Link key={path} href={href(path)} className="group border-l-2 border-brand pl-5"><h3 className="font-semibold group-hover:text-brand">{title} →</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></Link>)}
            </div>
          </div>
        </section>

        <div className="site-shell">
          {featureGroups.map((group, index) => {
            const copy = featureCopy(locale, group);
            const presentation = presentationCopy[locale][group.slug];
            return (
              <section id={group.slug} key={group.slug} className="site-section scroll-mt-28 border-b border-border last:border-b-0">
                <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                  <div>
                    <p className="site-eyebrow">{String(index + 1).padStart(2, "0")} / {copy.menuTitle}</p>
                    <h2 className="site-heading mt-4">{presentation.title}</h2>
                    <p className="mt-5 text-base leading-7 text-muted">{presentation.intro}</p>
                    <ul className="mt-6 space-y-3">
                      {copy.outcomes.slice(0, 2).map((outcome) => (
                        <li key={outcome} className="flex gap-3 text-sm leading-6">
                          <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <Link href={href(`/features/${group.slug}`)} className="site-link mt-7 inline-flex items-center gap-2">
                      {de ? "Funktionen und Ablauf ansehen" : "Explore features and workflow"}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <ProductScreenshot group={group} copy={copy} />
                </div>
              </section>
            );
          })}
        </div>

        <section className="site-section border-y border-border bg-surface">
          <div className="site-shell">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="site-eyebrow">{de ? "Für größere Abläufe" : "For more involved workflows"}</span>
                  <span className="site-heading mt-4 block">{de ? "Wie die Bereiche zusammenarbeiten" : "How the pieces work together"}</span>
                  <span className="mt-4 block max-w-2xl text-base leading-7 text-muted">{de ? "Einkauf, Lager, Ausleihe und Verkauf nutzen dieselben Daten. Öffne die interaktive Übersicht, um einen Ablauf zu verfolgen." : "Purchasing, stock, lending and sales use the same records. Open the interactive overview to follow a workflow."}</span>
                </span>
                <ChevronDown className="mt-3 size-6 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-8 border-t border-border">
                <BusinessFlow locale={locale} />
              </div>
            </details>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="site-eyebrow">{de ? "Offen für deinen Betrieb" : "Open for your setup"}</p>
              <h2 className="site-heading mt-4">{de ? "Erst ausprobieren. Dann selbst betreiben." : "Try it first. Then make it yours."}</h2>
              <p className="mt-5 text-base leading-7 text-muted">{de ? "Web-App, iOS-App und API sind MIT-lizenziert. Für den eigenen Betrieb findest du die Installation, Konfiguration und Hinweise zu Backups in der Dokumentation." : "The web app, iOS app and API are MIT-licensed. The documentation covers installation, configuration and backups for your own instance."}</p>
              <Link href={href("/open-source")} className="site-link mt-6 inline-flex items-center gap-2">{de ? "Mehr zum offenen Projekt" : "About the open-source project"}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
            <FeatureActions locale={locale} />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

export function EnglishFeaturesPage() {
  return <FeatureOverviewPage locale="en" />;
}

export function FeatureDetailContent({ locale, group }: { locale: MarketingLocale; group: FeatureGroup }) {
  const de = locale === "de";
  const copy = featureCopy(locale, group);
  const presentation = presentationCopy[locale][group.slug];
  const href = (path: string) => marketingHref(locale, path);
  const nextGroup = featureGroups[(featureGroups.findIndex((item) => item.slug === group.slug) + 1) % featureGroups.length];
  const nextCopy = featureCopy(locale, nextGroup);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main id="main-content">
        <section className="border-b border-border pb-16 pt-8 sm:pb-24 sm:pt-10">
          <div className="site-shell">
            <Link href={href("/features")} className="site-link inline-flex items-center gap-2 text-sm"><ArrowLeft className="size-4" aria-hidden="true" />{de ? "Alle Funktionen" : "All features"}</Link>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="site-eyebrow">{copy.eyebrow}</p>
                <h1 className="site-title mt-5">{presentation.title}</h1>
                <p className="mt-6 text-lg leading-8 text-muted">{presentation.intro}</p>
                <FeatureActions locale={locale} />
              </div>
              <ProductScreenshot group={group} copy={copy} eager />
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="site-eyebrow">{de ? "Im Arbeitsalltag" : "In everyday use"}</p>
              <h2 className="site-heading mt-4">{de ? "Was du damit erledigen kannst" : "What you can do with it"}</h2>
              <p className="mt-5 text-base leading-8 text-muted">{copy.detailIntro}</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {copy.outcomes.map((outcome) => <li key={outcome} className="flex gap-4 py-6 text-base leading-7"><Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />{outcome}</li>)}
            </ul>
          </div>
        </section>

        <section className="site-section border-y border-border bg-surface">
          <div className="site-shell">
            <p className="site-eyebrow">{de ? "Funktionen im Detail" : "Features in detail"}</p>
            <h2 className="site-heading mt-4">{copy.menuTitle}</h2>
            <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {copy.items.map((item, index) => {
                const Icon = group.items[index]?.icon;
                return <article key={item.title} className="border-t border-border pt-6">
                  {Icon && <Icon className="size-6 text-brand" strokeWidth={1.6} aria-hidden="true" />}
                  <h3 className="mt-4 text-xl font-semibold leading-7">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.copy}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="site-eyebrow">{de ? "Schritt für Schritt" : "Step by step"}</p>
              <h2 className="site-heading mt-4">{copy.workflowTitle}</h2>
              <p className="mt-5 text-base leading-7 text-muted">{copy.workflowIntro}</p>
              {group.slug === "labels-api" && <Link href={href("/docs#printing")} className="site-link mt-5 inline-block">{de ? "Drucker einrichten und erste Etiketten drucken →" : "Set up a printer and print your first labels →"}</Link>}
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {copy.workflow.map((step, index) => <li key={step.title} className="flex gap-5 py-6"><span className="pt-1 font-mono text-sm text-brand">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-7 text-muted">{step.copy}</p></div></li>)}
            </ol>
          </div>
          <div className="site-shell mt-14">
            <aside className="rounded-xl border border-border bg-surface-muted p-6 sm:p-10">
              <p className="site-eyebrow">{copy.example.eyebrow}</p>
              <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-14">
                <div><h3 className="text-2xl font-semibold leading-8">{copy.example.title}</h3><p className="mt-3 text-base leading-7 text-muted">{copy.example.copy}</p></div>
                <dl className="grid content-start gap-5 sm:grid-cols-3">{copy.example.facts.map((fact) => <div key={fact.label} className="border-t border-border-strong pt-4"><dt className="text-xs leading-5 text-muted">{fact.label}</dt><dd className="mt-2 text-sm font-semibold leading-6">{fact.value}</dd></div>)}</dl>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-section border-y border-border bg-surface">
          <div className="site-shell grid items-center gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
            <figure className="mx-auto w-full max-w-[248px]">
              <div className="overflow-hidden rounded-[36px] border-[6px] border-[#242722] bg-[#242722]">
                <Image src={featureIOSCaptures[group.slug]} width={1206} height={2622} sizes="248px" alt={de ? `Open Inventory auf dem iPhone: ${copy.menuTitle}` : `Open Inventory on iPhone: ${copy.menuTitle}`} className="h-auto w-full" />
              </div>
              <figcaption className="mt-4 text-center text-xs leading-5 text-muted">{de ? "Native iOS-App · Beispieldaten" : "Native iOS app · German demo data"}</figcaption>
            </figure>
            <div>
              <p className="site-eyebrow">{de ? "Auch vor Ort" : "On site, too"}</p>
              <h2 className="site-heading mt-4">{copy.ios.title}</h2>
              <p className="mt-5 text-base leading-7 text-muted">{copy.ios.copy}</p>
              <ul className="mt-6 space-y-3">{copy.ios.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />{point}</li>)}</ul>
              <Link href={href("/ios")} className="site-link mt-7 inline-flex items-center gap-2">{de ? "Die iOS-App kennenlernen" : "Explore the iOS app"}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div><p className="site-eyebrow">{de ? "Einrichtung und Details" : "Setup and details"}</p><h2 className="mt-4 text-2xl font-semibold">{de ? "So richtest du es ein" : "Set it up"}</h2><Link href={href(group.slug === "labels-api" ? "/docs#printing" : group.slug === "bestand-ausleihe" ? "/docs#planning" : "/docs")} className="site-link mt-5 inline-block">{de ? "Zur Anleitung →" : "Read the guide →"}</Link></div>
            <div><ul className="space-y-5">{copy.trustPoints.map((point) => <li key={point} className="flex gap-3 text-sm leading-7"><Check className="mt-1.5 size-4 shrink-0 text-brand" aria-hidden="true" />{point}</li>)}</ul>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm">
                <a href={licenseUrl} className="site-link inline-flex items-center gap-2">{de ? "MIT-Lizenz" : "MIT license"}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
                <a href={openApiUrl} className="site-link inline-flex items-center gap-2">OpenAPI 3.1<ArrowUpRight className="size-4" aria-hidden="true" /></a>
                <Link href={href("/open-source")} className="site-link">Open Source</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section border-t border-border bg-surface">
          <div className="site-shell grid gap-10 lg:grid-cols-2 lg:gap-20">
            <Link href={href(`/features/${nextGroup.slug}`)} className="group block">
              <p className="site-eyebrow">{de ? "Nächster Funktionsbereich" : "Next feature area"}</p>
              <h2 className="mt-4 flex items-center gap-4 text-3xl font-semibold leading-tight">{nextCopy.menuTitle}<ArrowRight className="size-6 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" /></h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted">{presentationCopy[locale][nextGroup.slug].intro}</p>
            </Link>
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"><p className="site-eyebrow">{de ? "Selbst ausprobieren" : "Try it yourself"}</p><h2 className="mt-4 text-3xl font-semibold leading-tight">{de ? "Ein erster Blick in dein neues Inventar." : "Take a look at your next inventory."}</h2><FeatureActions locale={locale} /></div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

export function EnglishFeatureDetailPage({ slug }: { slug: string }) {
  const group = getFeatureGroup(slug);
  if (!group || !getEnglishFeatureCopy(slug)) return null;
  return <FeatureDetailContent locale="en" group={group} />;
}
