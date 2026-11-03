import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Camera,
  Check,
  Container,
  Github,
  ScanLine,
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
  | "example"
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
    eyebrow: "Makerspace · Konglomerat e.V.",
    title: "What’s in the Rosenwerk?",
    cardCopy:
      "Konglomerat e.V.: finding tools and equipment across shared workshops.",
    description:
      "At Konglomerat e.V.’s Rosenwerk in Dresden, people work with wood, textiles and electronics, among other things. New arrivals don’t know every machine or where it belongs. That problem helped inspire Open Inventory.",
    imageAlt:
      "Staff working in a used community workshop with labelled tools and machines",
    challenge:
      "A shared catalogue makes equipment from each workshop discoverable. Someone who has only used the wood workshop can look up a device for their next electronics project.",
    promises: [
      "Find tools by name, QR code or barcode",
      "Count consumables and track individual machines",
      "Keep a history of loans, returns and location changes",
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
        title: "Record the tool",
        description: "Photograph the drill and add its model, serial number and place on the tool wall.",
      },
      {
        title: "Attach a label",
        description: "Print a QR label for this device. Scanning it will open the record.",
      },
      {
        title: "Record the loan",
        description: "Select the recipient when issuing the tool and record which device they take.",
      },
      {
        title: "Record its return",
        description: "Book the tool back in. Update its location if it now belongs on a different shelf.",
      }
    ],
    features: [
      {
        icon: "camera",
        title: "Start with a photo",
        description: "Photograph a tool, check the suggested details and save it. Build the catalogue a few items at a time alongside regular workshop activity.",
      },
      {
        icon: "locations",
        title: "Record where it belongs",
        description: "Add the workshop, shelf and compartment to the record. A QR label on the device opens its details.",
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
    example: {
      name: "Konglomerat e.V.",
      url: "https://konglomerat.org",
      sectionTitle: "Get to know the workshop without opening every drawer.",
    },
  },
  familie: {
    name: "Family",
    eyebrow: "Household and shared belongings",
    title: "Know what you own and which box it is in.",
    cardCopy:
      "Document boxes, rooms, manuals, and warranties without turning a household inventory into permanent spreadsheet work.",
    description:
      "Photograph what you pack and add the box and storage location. Later, search for the camping stove without opening every box. You can also keep track of things you lend out.",
    imageAlt:
      "Two family members sorting labelled storage boxes in a real basement storage room",
    challenge:
      "After a trip, the stove goes back into the outdoor box in the basement. A photo and a storage location on its record help you find it before the next trip.",
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
        title: "Photograph the contents",
        description: "Photograph the stove and accessories before packing them. The photos stay with the record.",
      },
      {
        title: "Add the box and location",
        description: "Link the stove to the outdoor box and record its location: basement, shelf 2.",
      },
      {
        title: "Label the box",
        description: "A QR label opens the box record. Design and print labels in the browser.",
      },
      {
        title: "Search before the trip",
        description: "Search for camping stove to find its photos and the storage location you recorded.",
      }
    ],
    features: [
      {
        icon: "camera",
        title: "Photos of your belongings",
        description:
          "Keep photos of the item, its nameplate and its receipt together. If you enable AI suggestions, review them before accepting them.",
      },
      {
        icon: "relations",
        title: "Boxes and relationships",
        description:
          "Record which box an item belongs in and link it to its accessories or spare parts.",
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
          "Import an existing list as a CSV file. Export your records to continue working with them in a spreadsheet.",
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
    eyebrow: "Hardware startup · paperlesspaper",
    title: "Enough parts for the next batch of picture frames?",
    cardCopy:
      "paperlesspaper: tracking parts for E-Paper picture frames and knowing when to reorder.",
    description:
      "At paperlesspaper, we build E-Paper picture frames using displays, circuit boards and enclosure parts. We needed to know how many parts were left and when to reorder. That need also helped shape Open Inventory.",
    imageAlt:
      "Paperlesspaper circuit boards with USB-C ports and buttons",
    challenge:
      "For the next assembly run, every component counts. Having enough displays doesn’t help if the matching circuit boards are missing. Open Inventory brings together quantities and outstanding orders for those parts.",
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
    steps: [{"title":"Record the laptop","description":"Photograph the device and add its serial number. Attach the purchase receipt to its record."},{"title":"Link the accessories","description":"Link the charger and dock to the laptop so you know what belongs in the handover."},{"title":"Issue it to a team member","description":"Select the recipient and record the issue. The history shows when the device was handed over."},{"title":"Record the return","description":"Book returned devices back in and note their condition. See what is ready for the next handover."}],
    features: [
      {
        icon: "stock",
        title: "Track each component",
        description: "Displays and circuit boards get separate records, with variants for different versions. Parts taken for assembly are booked against the relevant stock.",
      },
      {
        icon: "orders",
        title: "Keep track of incoming parts",
        description: "Minimum stock levels flag shortages. Open orders and partial deliveries show what’s still on its way and what has arrived.",
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
    example: {
      name: "paperlesspaper",
      url: "https://paperlesspaper.de",
      sectionTitle: "From components to the next order.",
      photoCaption: "Circuit boards for our picture frames. Photo: paperlesspaper",
    },
  },
  verein: {
    name: "Club and lending group",
    eyebrow: "Shared material and volunteers",
    title: "Make lending understandable when responsibilities rotate.",
    cardCopy:
      "Catalogue shared equipment, document issues and returns, and split permissions between members and maintainers.",
    description:
      "For the next event you need a gazebo, cables and microphones. Check what is in club storage, reserve the equipment and record who takes it.",
    imageAlt:
      "Volunteers checking shared equipment in a busy club storage room",
    challenge:
      "The summer event is over, but one microphone case is still missing. The loan shows the recipient and which items have come back. Record the last return when it arrives.",
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
    steps: [{"title":"Gather the equipment","description":"Find the gazebo, cables and microphones in the catalogue. Photos identify the cases and sets."},{"title":"Reserve for the date","description":"Reserve the equipment for the event. Check other bookings in the calendar."},{"title":"Issue to the event team","description":"Record the recipient. Several items can be grouped in one loan."},{"title":"Record what comes back","description":"Book returned items back in. If the team still has one case, that line remains open."}],
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
      "A collection piece needs more than a name and a photo. Keep its provenance, purchase date, condition and location together, even when it moves to another display case.",
    imageAlt:
      "A collection manager photographing an object at a practical documentation table",
    challenge:
      "An analogue camera joins the collection. Later, you want to know where it came from, which lens belongs to it and which signs of wear were already there when you bought it.",
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
      "Teachers can see which room holds the projector and whether it is available. Keep its cables and remote linked to the record and record who is using it.",
    imageAlt:
      "Two school staff members checking a well-used cart of shared tablets",
    challenge:
      "A projector is needed for the next lesson. Its record shows where it belongs and whether it has been issued. Linked accessories help you check for the cable before reaching the classroom.",
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
    steps: [{"title":"Record the projector","description":"Photograph it and add its serial number and place in the media cupboard."},{"title":"Link the accessories","description":"Link the remote, cable and carry bag. A photo shows what belongs in the set."},{"title":"Record the loan","description":"Scan the label and issue the device to the borrower."},{"title":"Record return and condition","description":"Book the projector back in. Add a note if a cable is missing or the device is damaged."}],
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
      "Find tools in the van, record parts used and plan replenishment for storage.",
    description:
      "Before driving to a job, check which van holds the hammer drill and how many connectors are left. Record withdrawals and deliveries; minimum quantities help you plan reorders.",
    imageAlt:
      "A service technician documenting tool cases in the used shelving of a work vehicle",
    challenge:
      "The hammer drill is in the other van, and connectors are running low. Track tools and supplies by vehicle to see what is missing before leaving.",
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
    steps: [{"title":"Create a vehicle storage location","description":"Assign tools and supplies to the vehicle. Add the compartment so another team member can find them."},{"title":"Record a transfer","description":"When the hammer drill moves to another van, record the location change."},{"title":"Record parts used","description":"Deduct installed connectors from the vehicle’s stock."},{"title":"Plan replenishment","description":"Set a minimum quantity and lead time. Review the reorder suggestion alongside outstanding deliveries."}],
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
      "Keep an instrument, its probes and power supply easy to find together. Link accessories, record the bench and add fields such as inspection date or revision.",
    imageAlt:
      "An engineer documenting a used test instrument at a realistic electronics bench",
    challenge:
      "The oscilloscope has moved to another bench, but the probes are still in the cupboard. The instrument record shows its location and which accessories belong to it.",
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
          "Photograph the instrument and nameplate so the model and serial number remain readable.",
      },
      {
        title: "Add typed fields",
        description:
          "Represent calibration date, manufacturer data, revision, or responsible group with explicit inventory types and fields.",
      },
      {
        title: "Connect the assembly",
        description:
          "Link the oscilloscope to its probes and mount. Record where each is stored.",
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
          "Link instruments and accessories. For prototypes, keep a bill of materials and deduct the components used from stock.",
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
          "The history shows when equipment changed benches and which quantities were recorded during stock counts.",
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

type EnglishOverviewPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type EnglishOverviewGalleryItem = EnglishOverviewPhoto & {
  caption: string;
  kind: "photo" | "capture";
  layout: string;
  sizes: string;
};

const englishOverviewPhotographyBySlug: Record<string, EnglishOverviewPhoto> = {
  makerspace: {
    src: "/marketing/photography/workshop-team.webp",
    alt: "A team working together at a real workshop bench",
  },
  familie: {
    src: "/marketing/photography/home-labels.webp",
    alt: "A man checking printed labels on moving boxes",
  },
  startup: {
    src: "/marketing/photography/office-device-audit.webp",
    alt: "A laptop, smartphone, payment terminal, calculator, and documents on a real office desk",
  },
  verein: {
    src: "/marketing/photography/parts-storage-bins.webp",
    alt: "Sorted small-parts containers in a real workshop",
  },
  sammlung: {
    src: "/marketing/photography/camera-collection.webp",
    alt: "Several cameras arranged on a real collection shelf",
    objectPosition: "50% 42%",
  },
  schule: {
    src: "/marketing/photography/school-tablet-cart.webp",
    alt: "Several tablets on desks in a real classroom",
    objectPosition: "50% 35%",
  },
  handwerk: {
    src: "/marketing/photography/trades-tool-case.webp",
    alt: "A person opening or closing a robust tool case",
  },
  labor: {
    src: "/marketing/photography/lab-pipette.webp",
    alt: "A person using a pipette at a real laboratory bench",
  },
};

const englishOverviewGallery: EnglishOverviewGalleryItem[] = [
  {
    src: "/marketing/photography/electronics-soldering.webp",
    alt: "A real electronics workbench with a soldering iron and circuit board",
    caption: "Electronics workbench",
    kind: "photo",
    layout:
      "min-h-[420px] sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-0",
    sizes: "(max-width: 1024px) 100vw, 58vw",
  },
  {
    src: "/marketing/screenshots/web-batch.png",
    alt: "Direct capture of batch entry in the Open Inventory web application with demo content",
    caption: "Batch entry in the web application",
    kind: "capture",
    layout:
      "min-h-[300px] sm:col-span-2 lg:col-span-5 lg:min-h-0",
    sizes: "(max-width: 1024px) 100vw, 42vw",
  },
  {
    src: "/marketing/photography/parcel-inspection.webp",
    alt: "A person checking parcels in a real warehouse setting",
    caption: "Parcel inspection in a warehouse",
    kind: "photo",
    layout: "min-h-[280px] lg:col-span-5 lg:min-h-0",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw",
  },
  {
    src: "/marketing/screenshots/web-item-detail.png",
    alt: "Direct capture of an inventory detail page in the Open Inventory web application with demo content",
    caption: "Inventory detail with stock and location",
    kind: "capture",
    layout:
      "min-h-[360px] sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:min-h-0",
    sizes: "(max-width: 1024px) 100vw, 67vw",
  },
  {
    src: "/marketing/photography/service-van-tools.webp",
    alt: "Tools arranged inside a real service vehicle",
    caption: "Tools in a service vehicle",
    kind: "photo",
    layout: "min-h-[280px] lg:col-span-4 lg:min-h-0",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw",
    objectPosition: "50% 52%",
  },
  {
    src: "/marketing/photography/parts-storage-bins.webp",
    alt: "Sorting boxes containing screws, nails, and wall plugs in a real workshop",
    caption: "Organised parts storage",
    kind: "photo",
    layout: "min-h-[280px] lg:col-span-4 lg:min-h-0",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw",
  },
];

function EnglishOverviewVisual({ useCase }: { useCase: UseCase }) {
  const photo = englishOverviewPhotographyBySlug[useCase.slug];

  return (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
        className="object-cover transition duration-700 group-hover:scale-[1.025]"
        style={
          photo.objectPosition
            ? { objectPosition: photo.objectPosition }
            : undefined
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
    </>
  );
}

export function EnglishUseCasesPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-border">

          <div className="site-shell relative pb-20 pt-16 sm:pb-28 sm:pt-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  For physical inventory that is actually used
                </p>
                <h1 className="site-title mt-5">
                  Capture quickly.
                  <span className="block text-brand">Keep the model explicit.</span>
                </h1>
                <p className="mt-7 max-w-[760px] text-[17px] leading-7 text-muted sm:text-[20px] sm:leading-8">
                  Eight examples of how the same open inventory system can model
                  tools, household objects, company assets, lending equipment,
                  collections, school devices, vehicle stock, and lab hardware.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/90 p-5 shadow-[var(--shadow-md)] backdrop-blur sm:p-6">
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

        <section className="overflow-hidden bg-[#121318] py-20 text-white sm:py-28">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-inverse">
                  Real-world views
                </p>
                <h2 className="mt-4 text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[60px]">
                  Physical context. Actual interface.
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-xl text-[16px] leading-7 text-white/60 sm:text-[18px]">
                  The photographs show real working environments. The interface
                  images are direct captures from the running web application
                  with purpose-made demo content — no generated scenes and no
                  recreated mockups.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    Real photography
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    Real capture · demo content
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-12">
              {englishOverviewGallery.map((item) => (
                <figure
                  key={item.src}
                  className={`group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#1b1c22] shadow-[var(--shadow-md)] ${item.layout}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={item.sizes}
                    className={`transition duration-700 group-hover:scale-[1.015] ${
                      item.kind === "photo"
                        ? "object-cover"
                        : "bg-[#eef0f3] object-contain p-2 sm:p-3"
                    }`}
                    style={
                      item.objectPosition
                        ? { objectPosition: item.objectPosition }
                        : undefined
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {item.kind === "photo"
                      ? "Real photography"
                      : "Real capture · demo content"}
                  </span>
                  <figcaption className="absolute inset-x-5 bottom-5 text-sm font-semibold text-white">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="site-shell">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Eight concrete operating contexts
              </p>
              <h2 className="mt-4 text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[60px]">
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
                  className={`group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:border-border-strong hover:shadow-[var(--shadow-md)] ${cardSpans[index]}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <EnglishOverviewVisual useCase={useCase} />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      Real photography
                    </span>
                    <span className="absolute bottom-4 left-4 right-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/85">
                      {useCase.eyebrow}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-[28px] font-semibold tracking-[-0.035em]">
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
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Shared technical basis
                </p>
                <h2 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[54px]">
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
                    <article key={feature.title} className="rounded-2xl border border-border bg-surface p-6">
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
          <div className="site-shell">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2">
                    {["MIT licensed", "Self-hosted", "No industry-specific black box"].map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-white/65">
                        <Check className="size-3 text-brand-inverse" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-6 text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[62px]">
                    Your records, your server, and inspectable code.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/65">
                    Clone the repository, run the Docker stack, inspect the API
                    contract, and decide which optional external services are
                    appropriate for your installation.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link href={enHref("/docs#docker")} className="site-button site-button-primary">
                    <Container className="size-4" aria-hidden="true" />
                    Start with Docker
                  </Link>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="site-button site-button-secondary">
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
