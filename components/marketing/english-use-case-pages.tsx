import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Braces,
  Camera,
  Check,
  CircleDot,
  Container,
  FileSpreadsheet,
  Github,
  History,
  Languages,
  MapPinned,
  Network,
  PackageCheck,
  PackageSearch,
  ScanLine,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import { marketingHref } from "@/lib/marketing-i18n";
import {
  useCases as germanUseCases,
  type UseCase,
  type UseCaseIcon,
} from "@/app/use-cases/use-cases";

const githubUrl = "https://github.com/Utzel-Butzel/inventory";
const enHref = (path: string) => marketingHref("en", path);

export type EnglishUseCaseSlug =
  | "makerspace"
  | "familie"
  | "startup"
  | "verein"
  | "sammlung"
  | "schule"
  | "handwerk"
  | "labor";

type EnglishUseCaseCopy = Pick<
  UseCase,
  | "name"
  | "eyebrow"
  | "title"
  | "cardCopy"
  | "description"
  | "imageAlt"
  | "challenge"
  | "promises"
  | "mockData"
  | "steps"
  | "features"
  | "iosTitle"
  | "iosCopy"
  | "iosPoints"
  | "openSourceTitle"
  | "openSourceCopy"
>;

const englishCopyBySlug = {
  makerspace: {
    name: "Makerspace",
    eyebrow: "Workshop and shared equipment",
    title: "Find tools, record checkouts, and get complete kits back.",
    cardCopy:
      "Track machines, hand tools, and consumables with codes, locations, and an append-only movement history.",
    description:
      "Open Inventory combines a tool catalogue, stock records, and checkout workflows in one self-hosted system. A new item can start with a photo; members can later resolve its location, status, and available quantity by search or code.",
    imageAlt:
      "Staff working in a used community workshop with labelled tools and machines",
    challenge:
      "Machines, individual tools, and bulk material move between benches and members every day. A spreadsheet rarely identifies which serialised unit was issued, which accessories belong to it, or whether consumables have reached their reorder point.",
    promises: [
      "Resolve a tool through search, QR code, barcode, or inventory identifier",
      "Track bulk consumables and serialised machines with different stock models",
      "Record checkout, return, reservation, and location changes without replacing history",
    ],
    mockData: [
      {
        name: "18 V cordless drill",
        meta: "Tool wall A · 7 available",
        status: "Available",
      },
      {
        name: "Laser cutter safety glasses",
        meta: "Safety shelf · 18 units",
        status: "In stock",
      },
      {
        name: "Rigol DS1054Z oscilloscope",
        meta: "Electronics bench · SN 043918",
        status: "Checked out",
      },
    ],
    steps: [
      {
        title: "Capture the item",
        description:
          "Photograph the tool and its nameplate. Any generated title, tags, or description remain a draft until someone reviews them.",
      },
      {
        title: "Choose the stock model",
        description:
          "Use quantity tracking for interchangeable material and serialised units for machines or tools that need an individual state.",
      },
      {
        title: "Attach a code",
        description:
          "Print a QR or Code 128 label that resolves to the item through the documented short-link route.",
      },
      {
        title: "Record each movement",
        description:
          "Confirm checkout, return, transfer, or consumption at the shelf so the current state and its history stay connected.",
      },
    ],
    features: [
      {
        icon: "stock",
        title: "Quantity and serial tracking",
        description:
          "Keep screws and cable ties as quantities while machines receive their own serial number, code, state, and assignment history.",
      },
      {
        icon: "labels",
        title: "QR and barcode labels",
        description:
          "Build physical labels in millimetres and link them to inventory records or configured scan actions.",
      },
      {
        icon: "history",
        title: "Checkout history",
        description:
          "Reservations, issues, returns, and transfers are dated events rather than a single overwritten status field.",
      },
      {
        icon: "locations",
        title: "Shelves and work areas",
        description:
          "Model storage locations and map positions so a search result describes where an item should actually be found.",
      },
      {
        icon: "orders",
        title: "Reordering and assemblies",
        description:
          "Combine stock thresholds, purchase orders, and bills of materials for workshop kits and repeatable builds.",
      },
      {
        icon: "roles",
        title: "Task-specific permissions",
        description:
          "Separate browsing, editing, stock operations, and administration for members, maintainers, and workshop staff.",
      },
    ],
    iosTitle: "Run a checkout at the shelf, not at a desk.",
    iosCopy:
      "The native SwiftUI app is part of the same MIT-licensed repository. It scans codes, captures photos, and sends authenticated requests to your own Open Inventory server.",
    iosPoints: [
      "Open a record from a QR code, barcode, SKU, or serial number",
      "Review stock changes before submitting them",
      "Resume persisted capture jobs after an interrupted upload",
    ],
    openSourceTitle: "Workshop knowledge stays with the workshop.",
    openSourceCopy:
      "The web application, PostgreSQL migrations, OpenAPI contract, and iOS source are published under the MIT license. Self-hosting also means the operator remains responsible for backups, updates, TLS, and any optional external AI or storage provider.",
  },
  familie: {
    name: "Family",
    eyebrow: "Household and shared belongings",
    title: "Know what you own and which box it is in.",
    cardCopy:
      "Document boxes, rooms, manuals, and warranties without turning a household inventory into permanent spreadsheet work.",
    description:
      "Open Inventory gives a household a searchable catalogue with photos, containers, locations, and optional read-only shares. It is self-hosted and does not require storing the family archive in a proprietary inventory service.",
    imageAlt:
      "Two family members sorting labelled storage boxes in a real basement storage room",
    challenge:
      "Seasonal equipment, spare parts, documents, and inherited objects often disappear into nested boxes. The useful question is usually not whether something exists, but where it is, what belongs with it, and whether a manual or receipt was kept.",
    promises: [
      "Start with photos and add only the structure that is useful",
      "Represent rooms, shelves, boxes, and relationships between objects",
      "Share selected records without exposing the complete inventory",
    ],
    mockData: [
      {
        name: "Camping stove and fuel adapter",
        meta: "Basement · Box Outdoor 2",
        status: "Stored",
      },
      {
        name: "Cordless vacuum receipt",
        meta: "Household documents · PDF",
        status: "Attached",
      },
      {
        name: "Winter decorations",
        meta: "Attic · Box A-14",
        status: "Complete",
      },
    ],
    steps: [
      {
        title: "Take a photo",
        description:
          "Capture an object or a box while it is already in your hand. Suggested fields remain editable before saving.",
      },
      {
        title: "Add the location",
        description:
          "Assign a room, shelf, or container. Containers can themselves be inventory records, so nested storage remains searchable.",
      },
      {
        title: "Attach context",
        description:
          "Keep manuals, receipts, related accessories, and notes with the record instead of spreading them across different apps.",
      },
      {
        title: "Find it later",
        description:
          "Search by name, description, tag, code, or location and open the relevant record on the web or iPhone.",
      },
    ],
    features: [
      {
        icon: "camera",
        title: "Photo-first capture",
        description:
          "Use several views and keep original media with the structured record. AI assistance is optional and reviewable.",
      },
      {
        icon: "relations",
        title: "Boxes and relationships",
        description:
          "Link an item to its container, accessories, replacement parts, or other records without flattening everything into tags.",
      },
      {
        icon: "locations",
        title: "Rooms and storage places",
        description:
          "Describe the physical hierarchy from building and room down to shelf or box.",
      },
      {
        icon: "sharing",
        title: "Selective read-only sharing",
        description:
          "Publish a deliberately selected view instead of giving another person access to the full workspace.",
      },
      {
        icon: "csv",
        title: "Portable core data",
        description:
          "Validated CSV import and export support common inventory fields. A complete restore still requires the database and uploaded media.",
      },
      {
        icon: "roles",
        title: "Controlled collaboration",
        description:
          "Give household members only the read or edit permissions they need for the shared catalogue.",
      },
    ],
    iosTitle: "Capture an item while unpacking the box.",
    iosCopy:
      "The native iOS app connects directly to the household's server. Camera capture, code lookup, search, and editing use the same records as the web interface.",
    iosPoints: [
      "Take several photos before putting an object away",
      "Scan an existing label to open the correct record",
      "Keep interrupted capture jobs in a persistent local outbox",
    ],
    openSourceTitle: "A family archive without a proprietary exit gate.",
    openSourceCopy:
      "Open Inventory is MIT-licensed and can run on infrastructure you choose. Database backups and the upload directory remain the authoritative recovery path; CSV is useful for exchange, but it is not presented as a full backup.",
  },
  startup: {
    name: "Startup",
    eyebrow: "Assets and growing teams",
    title: "Track devices and prototype parts without another spreadsheet workflow.",
    cardCopy:
      "Assign equipment, count prototype parts, receive purchase orders, and integrate the inventory through a scoped REST API.",
    description:
      "Open Inventory provides an open asset and stock layer for a growing team. It covers physical records, assignments, stock movements, purchasing, and integration, but does not claim to replace device management or accounting software.",
    imageAlt:
      "A small engineering team checking laptops and prototype equipment in a working office",
    challenge:
      "A young company can outgrow its first asset sheet quickly: laptops need assignments, prototypes consume parts, and purchasing changes expected stock. Those workflows need one identifier model without forcing the company into a closed platform.",
    promises: [
      "Assign serialised assets to people while keeping a dated return history",
      "Track bulk parts, purchase orders, receipts, and minimum stock",
      "Connect internal tools through documented endpoints and revocable scoped tokens",
    ],
    mockData: [
      {
        name: "MacBook Pro 14 · ENG-023",
        meta: "Assigned to Sam · SN C02X…",
        status: "Assigned",
      },
      {
        name: "Controller board Rev D",
        meta: "Prototype shelf · 32 units",
        status: "In stock",
      },
      {
        name: "Thermal camera",
        meta: "Hardware lab · Return 19 Aug",
        status: "Reserved",
      },
    ],
    steps: [
      {
        title: "Import or capture",
        description:
          "Validate an existing CSV before importing it, or create new assets from photos and reviewed suggestions.",
      },
      {
        title: "Define the model",
        description:
          "Use types, custom fields, locations, and quantity or serial tracking to represent devices and parts explicitly.",
      },
      {
        title: "Assign and receive",
        description:
          "Record equipment assignments and receive ordered quantities into the correct stock location.",
      },
      {
        title: "Integrate deliberately",
        description:
          "Issue expiring API tokens with only the required scopes and build against the checked-in OpenAPI 3.1 contract.",
      },
    ],
    features: [
      {
        icon: "stock",
        title: "Assets and component stock",
        description:
          "Use serialised units for devices and quantity tracking for interchangeable parts within the same data model.",
      },
      {
        icon: "history",
        title: "Assignment and return",
        description:
          "Keep the current assignee and previous assignments as dated records rather than editing history away.",
      },
      {
        icon: "orders",
        title: "Purchasing and receipts",
        description:
          "Track ordered and received quantities and apply receipts to stock through explicit transactions.",
      },
      {
        icon: "roles",
        title: "Granular access",
        description:
          "Separate viewing, editing, stock, token, and administrative permissions and apply conditional access where needed.",
      },
      {
        icon: "api",
        title: "OpenAPI and scoped tokens",
        description:
          "Use revocable bearer tokens for scripts and integrations instead of sharing an administrator session.",
      },
      {
        icon: "csv",
        title: "Validated CSV exchange",
        description:
          "Preview validation errors before import and export core inventory data for further processing.",
      },
    ],
    iosTitle: "Register equipment where onboarding happens.",
    iosCopy:
      "The native app can photograph a new device, scan its code, and assign it against the team's own server. It is source-available in the same MIT-licensed repository as the web application.",
    iosPoints: [
      "Capture serial numbers and several equipment photos",
      "Look up and edit an existing asset from its code",
      "Retry create, media, analysis, and cover stages with stable idempotency keys",
    ],
    openSourceTitle: "An asset layer the company can inspect and operate.",
    openSourceCopy:
      "The deployment uses Next.js, PostgreSQL, migrations, and persistent media storage. The source and API contract are open; operations, backups, upgrades, and any optional provider remain explicit responsibilities rather than hidden service behaviour.",
  },
  verein: {
    name: "Club and lending group",
    eyebrow: "Shared material and volunteers",
    title: "Make lending understandable when responsibilities rotate.",
    cardCopy:
      "Catalogue shared equipment, document issues and returns, and split permissions between members and maintainers.",
    description:
      "Open Inventory supports equipment catalogues, reservations, checkouts, locations, and public read-only views. It is not membership-management software; it focuses on the physical items a club or lending group operates.",
    imageAlt:
      "Volunteers checking shared equipment in a busy club storage room",
    challenge:
      "Volunteers change, equipment moves between events, and knowledge about incomplete kits can live with one person. A useful system must make the next checkout quick while preserving enough history for maintainers to resolve problems.",
    promises: [
      "Publish selected equipment records without exposing administrative data",
      "Record reservation, issue, return, and current responsibility",
      "Give members, volunteers, and administrators distinct permissions",
    ],
    mockData: [
      {
        name: "PA speaker set",
        meta: "Event store · 2 speakers + cables",
        status: "Reserved",
      },
      {
        name: "Folding table 180 cm",
        meta: "Hall B · 12 units",
        status: "Available",
      },
      {
        name: "Camera kit 02",
        meta: "Media cabinet · Due Sunday",
        status: "Checked out",
      },
    ],
    steps: [
      {
        title: "Catalogue existing material",
        description:
          "Photograph equipment and review its structured fields. Existing identifiers can be retained as SKU or serial data.",
      },
      {
        title: "Describe storage",
        description:
          "Assign each record to a room, cabinet, shelf, or kit so the return destination is visible.",
      },
      {
        title: "Scan at handover",
        description:
          "Open the record from its label and confirm the reservation, checkout, or return with the actual person present.",
      },
      {
        title: "Review exceptions",
        description:
          "Use history, status, and stock counts to find missing items or incomplete kits without rewriting earlier events.",
      },
    ],
    features: [
      {
        icon: "sharing",
        title: "Public equipment catalogue",
        description:
          "Expose a deliberately selected read-only view for members or borrowers while keeping management routes protected.",
      },
      {
        icon: "history",
        title: "Reservations and returns",
        description:
          "Store reservation, assignment, checkout, return, and cancellation as explicit workflow records.",
      },
      {
        icon: "labels",
        title: "Scannable labels",
        description:
          "Use QR or barcode labels to resolve the correct item before changing its state.",
      },
      {
        icon: "roles",
        title: "Volunteer-friendly roles",
        description:
          "Separate catalogue access, lending operations, record maintenance, and full administration.",
      },
      {
        icon: "stock",
        title: "Units or quantities",
        description:
          "Track an individual camera kit separately while keeping identical tables or consumables as quantity stock.",
      },
      {
        icon: "orders",
        title: "Demand and purchasing",
        description:
          "Use low-stock information and open purchase orders to make replenishment visible to the next maintainer.",
      },
    ],
    iosTitle: "Scan equipment during setup and teardown.",
    iosCopy:
      "The native iPhone app talks to the club's own instance. It supports camera capture, code recognition, search, and authenticated stock or assignment operations.",
    iosPoints: [
      "Resolve equipment from a label during handover",
      "Capture damage or missing accessories with photos",
      "Resume locally persisted upload jobs after poor connectivity",
    ],
    openSourceTitle: "Maintainable when the next volunteer takes over.",
    openSourceCopy:
      "MIT-licensed code, versioned migrations, Docker deployment files, and a documented API reduce dependence on one vendor or one volunteer's spreadsheet. The operator still owns maintenance, backups, and access policy.",
  },
  sammlung: {
    name: "Collection",
    eyebrow: "Objects and documented provenance",
    title: "Keep images, provenance, and physical location connected.",
    cardCopy:
      "Document objects with ordered media, custom fields, relationships, locations, translations, and portable data access.",
    description:
      "Open Inventory provides an open inventory layer for private, research, or working collections. It can document objects and their locations, but it is not presented as a complete museum collection-management or digital-preservation system.",
    imageAlt:
      "A collection manager photographing an object at a practical documentation table",
    challenge:
      "A useful catalogue needs more than a title and one image. Views, identifiers, provenance notes, related objects, containers, and the current physical location have to remain connected without locking the material into an opaque platform.",
    promises: [
      "Keep ordered images, documents, and accessible alt text with each object",
      "Model containers, related works, components, and precise locations",
      "Expose selected records and reuse core data through CSV or the API",
    ],
    mockData: [
      {
        name: "Field camera No. 18",
        meta: "Shelf C2 · Accession 1987.14",
        status: "Catalogued",
      },
      {
        name: "Workshop notebook 1964",
        meta: "Archive box 7 · 42 pages",
        status: "Digitised",
      },
      {
        name: "Ceramic study object",
        meta: "Cabinet 3 · Tray B",
        status: "On display",
      },
    ],
    steps: [
      {
        title: "Photograph each view",
        description:
          "Capture the object, marks, and relevant details as ordered media rather than collapsing documentation into one cover image.",
      },
      {
        title: "Apply a schema",
        description:
          "Use inventory types and typed custom fields for identifiers, dates, material, provenance, or review state.",
      },
      {
        title: "Connect the context",
        description:
          "Link containers, parts, related objects, and spatial locations while retaining the object's own record.",
      },
      {
        title: "Publish or export",
        description:
          "Share selected read-only records or process core data through CSV and the documented REST API.",
      },
    ],
    features: [
      {
        icon: "camera",
        title: "Ordered media",
        description:
          "Store several images, PDFs, and captions with explicit ordering and a separate cover selection.",
      },
      {
        icon: "relations",
        title: "Relationships and containers",
        description:
          "Represent parts, sets, source objects, and nested storage without encoding every relation in free text.",
      },
      {
        icon: "locations",
        title: "Precise physical locations",
        description:
          "Combine structured locations, maps, and optional room data where that level of spatial detail is useful.",
      },
      {
        icon: "languages",
        title: "Translated descriptive fields",
        description:
          "Keep canonical content languages and review translated titles or descriptions field by field.",
      },
      {
        icon: "sharing",
        title: "Readable public records",
        description:
          "Publish a selected subset as a read-only catalogue without exposing the internal workspace.",
      },
      {
        icon: "csv",
        title: "Open data paths",
        description:
          "Use CSV for supported core fields and OpenAPI for structured integrations; retain database and media backups for recovery.",
      },
    ],
    iosTitle: "Document the object while it is on the table.",
    iosCopy:
      "The native app captures several views, scans identifiers, and writes to the same self-hosted API as the web interface. Suggestions and translations remain reviewable.",
    iosPoints: [
      "Capture object, mark, label, and condition views in one job",
      "Resolve existing records by code or identifier",
      "Continue a persisted upload after an interruption",
    ],
    openSourceTitle: "Keep the catalogue open to future research.",
    openSourceCopy:
      "Open Inventory publishes its application code, schema migrations, API contract, and iOS app under MIT. It offers practical export and integration paths, while long-term preservation policy remains a responsibility of the collection operator.",
  },
  schule: {
    name: "School",
    eyebrow: "Loan devices and specialist rooms",
    title: "Manage shared devices without slowing down a lesson.",
    cardCopy:
      "Capture tablets, experiment kits, and room equipment, then record lending and recurring inventory checks.",
    description:
      "Open Inventory connects device records, carts, labels, assignments, and count cycles in a self-hosted application. It tracks physical inventory; it does not replace mobile-device management, identity management, or safeguarding systems.",
    imageAlt:
      "Two school staff members checking a well-used cart of shared tablets",
    challenge:
      "Devices move between classrooms, carts, and borrowers. When serial numbers, condition notes, and returns live in separate lists, staff lose a reliable view during handover and scheduled inventory checks.",
    promises: [
      "Capture carts and individual devices by photo or existing code",
      "Record issue, return, location, and the next due inventory count",
      "Separate permissions for teaching staff, technicians, and administrators",
    ],
    mockData: [
      {
        name: "Tablet 8 · North cart",
        meta: "SN EDU-208 · Room 2.14",
        status: "Available",
      },
      {
        name: "Student microscope 12",
        meta: "Biology · Cabinet B",
        status: "Check due",
      },
      {
        name: "Electricity experiment kit",
        meta: "Physics · Issued to class 9B",
        status: "Checked out",
      },
    ],
    steps: [
      {
        title: "Capture at the cart",
        description:
          "Photograph new equipment in the room and review any suggested title, type, or tags before saving.",
      },
      {
        title: "Serialise devices",
        description:
          "Give each tablet or measuring device its own identifier and state while cables and sensors can remain quantity stock.",
      },
      {
        title: "Scan the handover",
        description:
          "Resolve the correct device from its code and confirm the recipient, room, issue, or return.",
      },
      {
        title: "Run count cycles",
        description:
          "Schedule recurring checks and reconcile counted quantities by location without deleting the previous result.",
      },
    ],
    features: [
      {
        icon: "stock",
        title: "Devices and quantity stock",
        description:
          "Track tablets individually and keep cables, sensors, or classroom consumables as quantities.",
      },
      {
        icon: "labels",
        title: "QR and barcode labels",
        description:
          "Connect devices, carts, and cabinets to the corresponding record or approved scan workflow.",
      },
      {
        icon: "history",
        title: "Issue and return history",
        description:
          "Keep lending, reservation, return, and cancellation events instead of replacing the previous assignee.",
      },
      {
        icon: "locations",
        title: "Rooms, carts, and cabinets",
        description:
          "Represent where equipment belongs and where it is currently recorded.",
      },
      {
        icon: "roles",
        title: "Roles by responsibility",
        description:
          "Separate read, capture, lending, stock, and administrative access for different school roles.",
      },
      {
        icon: "csv",
        title: "Documented data exchange",
        description:
          "Validate CSV imports and use CSV or the REST API for supported inventory data.",
      },
    ],
    iosTitle: "Run inventory checks at the device cart.",
    iosCopy:
      "The native SwiftUI app scans identifiers, captures condition photos, and performs authorised actions against the school's own instance.",
    iosPoints: [
      "Resolve a device by inventory code or serial number",
      "Add photos and condition notes where the device is stored",
      "Retry upload stages without creating duplicate records",
    ],
    openSourceTitle: "Keep device records under the school's operational control.",
    openSourceCopy:
      "Open Inventory is MIT-licensed and deployable with Docker. Source, migrations, API, and iOS code are inspectable; the school still defines hosting, account policy, retention, backups, and any optional external services.",
  },
  handwerk: {
    name: "Trades",
    eyebrow: "Vehicles and job sites",
    title: "Record tools where they are actually being used.",
    cardCopy:
      "Track vehicle stock, power tools, and consumables from a phone, with explicit transfers and replenishment data.",
    description:
      "Open Inventory treats service vehicles, stores, and job sites as inventory locations. It can track tools and material movements, but it is not a field-service ERP, route planner, or accounting package.",
    imageAlt:
      "A service technician documenting tool cases in the used shelving of a work vehicle",
    challenge:
      "Tools and material are distributed across a workshop, vehicles, and job sites. Without a quick transaction at the point of use, the central list cannot explain which team has a tool or what must be replenished before the next job.",
    promises: [
      "View quantity by vehicle, central store, and temporary job location",
      "Assign serialised tools to a person, team, or project with history",
      "Combine consumption, minimum stock, and open orders in replenishment decisions",
    ],
    mockData: [
      {
        name: "18 V rotary hammer",
        meta: "Service van 4 · Compartment C",
        status: "In use",
      },
      {
        name: "WAGO 221 connectors",
        meta: "Central store · 86 units",
        status: "Reorder",
      },
      {
        name: "Cable tester",
        meta: "SN CT-1048 · North team",
        status: "Assigned",
      },
    ],
    steps: [
      {
        title: "Capture on site",
        description:
          "Start from a photo or existing code and review the proposed record before it becomes inventory data.",
      },
      {
        title: "Assign the location",
        description:
          "Treat each van, store, and relevant job site as a structured location with its own stock distribution.",
      },
      {
        title: "Book the movement",
        description:
          "Assign serialised tools and record quantity increases, decreases, or transfers as dated transactions.",
      },
      {
        title: "Plan replenishment",
        description:
          "Review minimum stock, observed consumption, lead time, and open orders instead of relying on an unexplained number.",
      },
    ],
    features: [
      {
        icon: "locations",
        title: "Stock by vehicle",
        description:
          "Keep each service vehicle and store as a location while retaining a workspace-wide quantity view.",
      },
      {
        icon: "stock",
        title: "Bulk and serialised stock",
        description:
          "Track connectors and cable by quantity and measuring or power tools as identifiable units.",
      },
      {
        icon: "history",
        title: "Assignment history",
        description:
          "Assign a tool to a team, user, or project and retain transfer and return records.",
      },
      {
        icon: "orders",
        title: "Minimum stock and purchasing",
        description:
          "Use consumption, delivery time, and purchase orders to support a reviewable reorder quantity.",
      },
      {
        icon: "labels",
        title: "Code-based workflows",
        description:
          "Resolve an item or a configured stock action from QR, Code 128, and other supported codes.",
      },
      {
        icon: "api",
        title: "Open integration",
        description:
          "Connect inventory data to an internal purchasing or job system through OpenAPI 3.1 and scoped tokens.",
      },
    ],
    iosTitle: "The iPhone is already at the job site.",
    iosCopy:
      "The native app uses camera capture, code recognition, and a resumable local outbox. It connects over HTTPS to the operator's own Open Inventory instance.",
    iosPoints: [
      "Open tools and materials directly from their code",
      "Review quantity changes before committing them",
      "Capture a new device at the vehicle with several photos",
    ],
    openSourceTitle: "Inventory infrastructure without a mandatory vendor service.",
    openSourceCopy:
      "The MIT-licensed code, Docker/PostgreSQL deployment, and documented API support custom workflows. Hosting, backups, upgrades, and optional providers remain visible operational choices.",
  },
  labor: {
    name: "Lab",
    eyebrow: "Test equipment and prototyping",
    title: "Find test equipment, parts, and experimental assemblies again.",
    cardCopy:
      "Organise instruments, components, and prototype parts with serial data, locations, relationships, and an open API.",
    description:
      "Open Inventory is an open inventory component for technical labs and prototyping spaces. It is not a LIMS: it does not manage samples, analytical results, or regulated laboratory processes.",
    imageAlt:
      "An engineer documenting a used test instrument at a realistic electronics bench",
    challenge:
      "Shared instruments, components, and prototype assemblies move between benches. Serial data, accessories, revision, and current location need to stay connected without forcing the lab into a closed specialist inventory product.",
    promises: [
      "Connect instruments, probes, fixtures, and parts through relationships or bills of materials",
      "Use typed custom fields for calibration, procurement, revision, or ownership data",
      "Process inventory records through CSV and the checked-in OpenAPI contract",
    ],
    mockData: [
      {
        name: "100 MHz digital oscilloscope",
        meta: "Electronics bench 3 · SN LAB-021",
        status: "Available",
      },
      {
        name: "Sensor board Revision C",
        meta: "Prototype box P-08 · 14 units",
        status: "In stock",
      },
      {
        name: "0–30 V bench supply",
        meta: "Test bench 1 · Check due 11/2026",
        status: "Assigned",
      },
    ],
    steps: [
      {
        title: "Photograph the instrument",
        description:
          "Capture the device, nameplate, accessories, and condition in several ordered images, then review suggested fields.",
      },
      {
        title: "Add typed fields",
        description:
          "Represent calibration date, manufacturer data, revision, or responsible group with explicit inventory types and fields.",
      },
      {
        title: "Connect the assembly",
        description:
          "Use relationships or bills of materials to link instruments, probes, fixtures, and consumed prototype parts.",
      },
      {
        title: "Record use and movement",
        description:
          "Keep assignments, transfers, and count results as dated records and expose supported data to further analysis.",
      },
    ],
    features: [
      {
        icon: "camera",
        title: "Several documented views",
        description:
          "Keep instrument, nameplate, accessory, and condition images in a deliberate order with accessible alt text.",
      },
      {
        icon: "stock",
        title: "Instruments and part quantities",
        description:
          "Use serial numbers for instruments and quantity tracking for sensors, connectors, and interchangeable parts.",
      },
      {
        icon: "relations",
        title: "Relationships and bills of materials",
        description:
          "Link accessories and prototype components; assembly transactions can consume component stock atomically.",
      },
      {
        icon: "locations",
        title: "Benches and rooms",
        description:
          "Use structured locations and optional room data for equipment shared across work areas.",
      },
      {
        icon: "history",
        title: "Movements and count cycles",
        description:
          "Retain transfers, assignments, and recurring reconciliation results rather than overwriting the previous state.",
      },
      {
        icon: "api",
        title: "Checked-in API contract",
        description:
          "Build internal analysis or automation against the versioned OpenAPI file and revocable scoped tokens.",
      },
    ],
    iosTitle: "Capture equipment at the test bench.",
    iosCopy:
      "The native iOS app photographs equipment, recognises codes, and uses the same API as the web client. The server remains the lab's own instance.",
    iosPoints: [
      "Prepare up to twelve photos in one capture job",
      "Resolve codes and serial numbers at the instrument",
      "Retry interrupted stages without duplicating the inventory record",
    ],
    openSourceTitle: "Technical documentation needs an open way out.",
    openSourceCopy:
      "Open Inventory publishes the web application, API, migrations, and iOS app under MIT. CSV and OpenAPI support reuse; external AI, map, authentication, or storage providers are optional configuration, not a hidden requirement.",
  },
} satisfies Record<EnglishUseCaseSlug, EnglishUseCaseCopy>;

export const englishUseCases: UseCase[] = germanUseCases.map((useCase) => {
  const copy = englishCopyBySlug[useCase.slug as EnglishUseCaseSlug];
  if (!copy) {
    throw new Error(`Missing English use-case copy for ${useCase.slug}`);
  }
  return { ...useCase, ...copy };
});

export function getEnglishUseCase(slug: string) {
  return englishUseCases.find((useCase) => useCase.slug === slug);
}

const featureIcons: Record<UseCaseIcon, LucideIcon> = {
  api: Braces,
  camera: Camera,
  csv: FileSpreadsheet,
  history: History,
  labels: ScanLine,
  languages: Languages,
  locations: MapPinned,
  orders: PackageCheck,
  relations: Network,
  roles: ShieldCheck,
  sharing: Share2,
  stock: Boxes,
};

const cardSpans = [
  "md:col-span-2 lg:col-span-7",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-1 lg:col-span-4",
  "md:col-span-2 lg:col-span-4",
];

function EnglishOverviewVisual({ useCase }: { useCase: UseCase }) {
  if (useCase.image) {
    return (
      <Image
        src={useCase.image}
        alt={useCase.imageAlt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
        className="object-cover transition duration-700 group-hover:scale-[1.025]"
      />
    );
  }

  return (
    <div
      className="grid h-full min-h-[260px] place-items-center bg-[linear-gradient(145deg,#253735,#111d1c)] text-white"
      aria-hidden="true"
    >
      <PackageSearch className="size-12 text-[#8ff0cc]" />
    </div>
  );
}

export function EnglishUseCasesPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="pointer-events-none absolute left-[8%] top-12 size-80 rounded-full bg-[#8ff0cc]/25 blur-[110px]" />
          <div className="pointer-events-none absolute right-[8%] top-24 size-96 rounded-full bg-[#8175ff]/20 blur-[125px]" />

          <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  For physical inventory that is actually used
                </p>
                <h1 className="mt-5 text-[clamp(3.25rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                  Capture quickly.
                  <span className="block text-brand">Keep the model explicit.</span>
                </h1>
                <p className="mt-7 max-w-[760px] text-[17px] leading-7 text-muted sm:text-[20px] sm:leading-8">
                  Eight examples of how the same open inventory system can model
                  tools, household objects, company assets, lending equipment,
                  collections, school devices, vehicle stock, and lab hardware.
                </p>
              </div>

              <div className="rounded-[28px] border border-border bg-surface/90 p-5 shadow-[var(--shadow-md)] backdrop-blur sm:p-6">
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4">
                  {[
                    [Camera, "Capture at the object", "photos and codes reduce later transcription"],
                    [Boxes, "Choose the stock model", "quantity and serial tracking stay distinct"],
                    [ShieldCheck, "Operate it yourself", "MIT-licensed code, Docker, PostgreSQL, and OpenAPI"],
                  ].map(([Icon, title, copy]) => {
                    const ItemIcon = Icon as typeof Camera;
                    return (
                      <div key={title as string} className="contents">
                        <span className="grid size-10 place-items-center rounded-2xl bg-brand-soft text-brand">
                          <ItemIcon className="size-[18px]" aria-hidden="true" />
                        </span>
                        <div className="pt-0.5">
                          <p className="text-sm font-semibold">{title as string}</p>
                          <p className="mt-0.5 text-xs leading-5 text-muted">{copy as string}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Eight concrete operating contexts
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[60px]">
                One codebase, different inventory rules.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-muted sm:text-[18px]">
                Each page describes data choices, a capture workflow, relevant
                features, iPhone use, and the limits of the use case. The
                examples use mock data and do not imply a separate industry edition.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
              {englishUseCases.map((useCase, index) => (
                <Link
                  key={useCase.slug}
                  href={enHref(`/use-cases/${useCase.slug}`)}
                  className={`group overflow-hidden rounded-[28px] border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)] ${cardSpans[index]}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <EnglishOverviewVisual useCase={useCase} />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                      {useCase.eyebrow}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-[28px] font-semibold tracking-[-0.045em]">
                        {useCase.name}
                      </h3>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition group-hover:border-brand-border group-hover:bg-brand-soft group-hover:text-brand">
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                      {useCase.cardCopy}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface-subtle py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Shared technical basis
                </p>
                <h2 className="mt-4 text-[40px] font-semibold leading-none tracking-[-0.055em] sm:text-[54px]">
                  Start with capture. Add structure when it earns its place.
                </h2>
                <p className="mt-5 text-[16px] leading-7 text-muted">
                  Camera capture lowers the cost of the first record. Typed
                  fields, stock transactions, assignments, labels, and APIs are
                  available when the workflow needs more precision.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Sparkles,
                    title: "Reviewable assistance",
                    copy: "Image analysis can propose titles, descriptions, types, and tags. A user reviews the result before relying on it.",
                  },
                  {
                    icon: ScanLine,
                    title: "Codes and transaction history",
                    copy: "QR, barcodes, quantity stock, serialised units, and dated movements resolve to the same inventory model.",
                  },
                  {
                    icon: Smartphone,
                    title: "Native iOS client",
                    copy: "The SwiftUI app covers camera capture, lookup, scanning, stock operations, and optional RoomPlan workflows.",
                  },
                  {
                    icon: Github,
                    title: "MIT Open Source",
                    copy: "Application code, iOS source, migrations, and OpenAPI live in the repository. Docker runs them on infrastructure you control.",
                  },
                ].map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <article key={feature.title} className="rounded-[24px] border border-border bg-surface p-6">
                      <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-8 text-xl font-semibold tracking-[-0.035em]">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{feature.copy}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#121318] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,#1a1b21,#22202f)] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full bg-[#8175ff]/25 blur-[100px]" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2">
                    {["MIT licensed", "Self-hosted", "No industry-specific black box"].map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-white/65">
                        <Check className="size-3 text-[#8ff0cc]" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-6 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[62px]">
                    Your records, your server, and inspectable code.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/55">
                    Clone the repository, run the Docker stack, inspect the API
                    contract, and decide which optional external services are
                    appropriate for your installation.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link href={enHref("/docs#docker")} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#675ee5] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#756de8]">
                    <Container className="size-4" aria-hidden="true" />
                    Start with Docker
                  </Link>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                    <Github className="size-4" aria-hidden="true" />
                    Browse the code
                  </a>
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

function EnglishHeroVisual({ useCase }: { useCase: UseCase }) {
  return (
    <Image
      src={useCase.image ?? "/og.png"}
      alt={useCase.imageAlt ?? `${useCase.name} inventory workflow`}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 52vw"
      className="object-cover"
    />
  );
}

function EnglishMockInventory({ useCase }: { useCase: UseCase }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-[#17181d] p-2.5 shadow-[0_30px_80px_rgba(18,20,28,0.2)]">
      <div className="flex h-9 items-center gap-1.5 px-3">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
          Mock data · no production records
        </span>
      </div>
      <div className="rounded-[20px] bg-background p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">
              {useCase.name} inventory
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.035em]">Recently updated</p>
          </div>
          <span className="rounded-full bg-success-soft px-2.5 py-1.5 text-[8px] font-semibold text-success">
            3 records
          </span>
        </div>
        <div className="mt-3 grid gap-2">
          {useCase.mockData.map((row, index) => (
            <div key={row.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className={`grid size-10 place-items-center rounded-xl ${
                index === 0
                  ? "bg-brand-soft text-brand"
                  : index === 1
                    ? "bg-success-soft text-success"
                    : "bg-warning-soft text-warning"
              }`}>
                <Boxes className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{row.name}</p>
                <p className="mt-1 truncate text-[9px] text-muted">{row.meta}</p>
              </div>
              <span className="hidden rounded-full bg-surface-muted px-2 py-1 text-[8px] font-semibold text-muted-strong sm:block">
                {row.status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <span className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-solid text-[9px] font-semibold text-on-brand">
            <Camera className="size-3" aria-hidden="true" /> New photo
          </span>
          <span className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-[9px] font-semibold">
            <ScanLine className="size-3" aria-hidden="true" /> Scan code
          </span>
        </div>
      </div>
    </div>
  );
}

function EnglishIosPhone({ useCase }: { useCase: UseCase }) {
  const item = useCase.mockData[0];

  return (
    <div className="relative mx-auto w-[260px] rounded-[46px] border-[7px] border-[#090a0c] bg-[#090a0c] p-2 shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#090a0c]" />
      <div className="min-h-[510px] overflow-hidden rounded-[35px] bg-[#f4f5f7] text-[#17181d]">
        <div className="px-4 pb-4 pt-10">
          <div className="flex items-center justify-between">
            <Image src="/marketing/ios-app-icon-current.png" width={34} height={34} alt="Open Inventory app icon" className="rounded-[9px]" />
            <span className="rounded-full bg-[#e7e5ff] px-2.5 py-1 text-[8px] font-semibold text-[#5147d9]">Connected</span>
          </div>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#777b84]">{useCase.name}</p>
          <h3 className="mt-1 text-[24px] font-semibold leading-none tracking-[-0.05em]">Quick capture</h3>
          <div className="relative mt-5 aspect-[3/4] overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#292c32,#17191d)] p-4 text-white">
            <div className="absolute inset-x-0 top-1/3 h-px bg-white/10" />
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
            <div className="absolute inset-y-0 right-1/3 w-px bg-white/10" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-white/15 bg-white/10">
              <PackageSearch className="size-7 text-[#8ff0cc]" aria-hidden="true" />
            </span>
            <span className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur">
              <span className="block truncate text-[10px] font-semibold">{item?.name}</span>
              <span className="mt-1 block truncate text-[8px] text-white/50">{item?.meta}</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-around">
            {[Camera, ScanLine, Boxes].map((Icon, index) => (
              <span key={index} className={`grid size-10 place-items-center rounded-full ${index === 0 ? "bg-[#675ee5] text-white" : "bg-white text-[#6d717a]"}`}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EnglishUseCaseDetailPage({ useCase }: { useCase: UseCase }) {
  const currentIndex = englishUseCases.findIndex((item) => item.slug === useCase.slug);
  const nextUseCase = englishUseCases[(currentIndex + 1) % englishUseCases.length];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-12">
            <Link href={enHref("/use-cases")} className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-muted transition hover:text-foreground">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              All use cases
            </Link>

            <div className="mt-10 grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
              <div className="relative z-10 max-w-[660px]">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${useCase.accent}`}>
                  Open Inventory for {useCase.name}
                </p>
                <h1 className="mt-5 text-[clamp(3.15rem,6.2vw,6rem)] font-semibold leading-[0.91] tracking-[-0.068em]">
                  {useCase.title}
                </h1>
                <p className="mt-7 text-[17px] leading-7 text-muted sm:text-[19px] sm:leading-8">{useCase.description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={enHref("/docs#docker")} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand shadow-[0_12px_30px_rgba(102,92,255,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-hover">
                    <Container className="size-4" aria-hidden="true" />
                    Self-host the open-source stack
                  </Link>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-border-strong">
                    <Github className="size-4" aria-hidden="true" />
                    Browse GitHub
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-muted">
                  {["MIT license", "Self-hosted", "Native iOS app"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="size-3 text-success" strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute -left-12 top-16 size-52 rounded-full bg-[#8ff0cc]/30 blur-[80px]" />
                <div className="pointer-events-none absolute -right-10 bottom-8 size-64 rounded-full bg-[#8175ff]/25 blur-[90px]" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-border bg-surface shadow-[0_36px_100px_rgba(23,23,35,0.2)]">
                  <EnglishHeroVisual useCase={useCase} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 p-3.5 text-white backdrop-blur-md">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#8ff0cc]/20 text-[#8ff0cc]">
                      <Sparkles className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">Capture path</p>
                      <p className="mt-0.5 text-xs font-semibold">Take a photo · review the draft · save the record</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${useCase.accent}`}>Operational problem</p>
              <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[56px]">Less reconstruction, more traceable state.</h2>
              <p className="mt-6 text-[16px] leading-7 text-muted">{useCase.challenge}</p>
              <ul className="mt-8 grid gap-3">
                {useCase.promises.map((promise) => (
                  <li key={promise} className="flex items-start gap-3 text-sm leading-6 text-muted-strong">
                    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${useCase.softAccent}`}>
                      <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
            </div>

            <EnglishMockInventory useCase={useCase} />
          </div>
        </section>

        <section className="border-y border-border bg-surface-subtle py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${useCase.accent}`}>A workflow at the point of use</p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[60px]">From a physical object to a usable record.</h2>
              <p className="mt-5 text-[16px] leading-7 text-muted sm:text-[18px]">
                Capture starts with a camera or an existing code. Structured fields and deeper workflows are added without hiding the transaction being made.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {useCase.steps.map((step, index) => (
                <article key={step.title} className="relative overflow-hidden rounded-[24px] border border-border bg-surface p-6">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">0{index + 1}</span>
                  <h3 className="mt-10 text-xl font-semibold tracking-[-0.035em]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
                  {index < useCase.steps.length - 1 ? <ArrowRight className="absolute right-5 top-5 hidden size-4 text-border-strong lg:block" aria-hidden="true" /> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${useCase.accent}`}>Relevant capabilities</p>
                <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[60px]">The data model behind this use case.</h2>
              </div>
              <p className="max-w-2xl text-[16px] leading-7 text-muted lg:justify-self-end">
                These capabilities are part of the same MIT-licensed application. Open Inventory does not split them into closed industry editions.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {useCase.features.map((feature) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <article key={feature.title} className="group rounded-[26px] border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7">
                    <span className={`grid size-11 place-items-center rounded-2xl ${useCase.softAccent}`}>
                      <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <h3 className="mt-10 text-[22px] font-semibold tracking-[-0.04em]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#121318] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1120px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8175ff]/25 blur-[100px]" />
              <EnglishIosPhone useCase={useCase} />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <Image src="/marketing/ios-app-icon-current.png" width={48} height={48} alt="Open Inventory app icon" className="rounded-[13px] shadow-lg" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">Native iOS app</p>
                  <p className="mt-1 text-xs text-white/45">SwiftUI · included in the repository</p>
                </div>
              </div>
              <h2 className="mt-7 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[62px]">{useCase.iosTitle}</h2>
              <p className="mt-6 text-[16px] leading-7 text-white/55 sm:text-[18px] sm:leading-8">{useCase.iosCopy}</p>
              <ul className="mt-8 grid gap-3">
                {useCase.iosPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-6 text-white/70">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#8ff0cc]/15 text-[#8ff0cc]">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold text-white/50">
                <CircleDot className="size-3 text-[#8ff0cc]" aria-hidden="true" />
                Camera and scanner operations run on a physical iPhone
              </div>
              <Link href={enHref("/ios")} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8ff0cc]">
                Read the iOS implementation notes
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[32px] border border-brand-border bg-brand-soft px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="relative grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Open source is part of the operating model</p>
                  <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[58px]">{useCase.openSourceTitle}</h2>
                  <p className="mt-6 max-w-3xl text-[16px] leading-7 text-muted-strong">{useCase.openSourceCopy}</p>
                </div>
                <div className="grid gap-3 rounded-[24px] border border-brand-border bg-surface/65 p-5 backdrop-blur sm:p-6">
                  {[
                    [Github, "MIT-licensed source"],
                    [Container, "Docker setup with PostgreSQL"],
                    [Braces, "Checked-in OpenAPI 3.1 contract"],
                    [Smartphone, "Native iOS source included"],
                  ].map(([Icon, label]) => {
                    const ItemIcon = Icon as LucideIcon;
                    return (
                      <div key={label as string} className="flex items-center gap-3 text-sm font-semibold">
                        <span className="grid size-9 place-items-center rounded-xl bg-brand-solid text-on-brand">
                          <ItemIcon className="size-4" aria-hidden="true" />
                        </span>
                        {label as string}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface-subtle py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Run it on your infrastructure</p>
                <h2 className="mt-4 text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-[64px]">Start with one reviewed record.</h2>
                <p className="mt-5 text-[16px] leading-7 text-muted">
                  Start the Docker stack, photograph one real object, and inspect the resulting fields and media before choosing a wider rollout.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={enHref("/docs#docker")} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand-solid px-5 text-sm font-semibold text-on-brand transition hover:-translate-y-0.5 hover:bg-brand-hover">
                  <Container className="size-4" aria-hidden="true" /> Docker guide
                </Link>
                <Link href={enHref(`/use-cases/${nextUseCase.slug}`)} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-border bg-surface px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-border-strong">
                  Next use case: {nextUseCase.name}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
