import type { BlogArticle } from "./articles";

import { githubUrl } from "./articles";

export const englishArticles: BlogArticle[] = [
  {
    slug: "serienerfassung-in-sekunden",
    category: "Workflow",
    title: "Batch capture: where the workflow saves time",
    shortTitle: "Capture inventory as a batch",
    excerpt:
      "Set location and type once. Each capture becomes a queued job; upload, analysis, and cover stages continue while you photograph the next object.",
    description:
      "A technical overview of batch capture, queue stages, and idempotency in the web client and native iOS app.",
    publishedAt: "2026-08-13",
    publishedLabel: "August 13, 2026",
    readingTime: "7 min read",
    accent: "from-[#665cff] to-[#9088ff]",
    accentSoft: "bg-brand-soft text-brand",
    cover: {
      src: "/marketing/photography/workshop-team.webp",
      alt: "Three people wearing safety glasses work together on a machine in a workshop.",
      width: 1800,
      height: 1200,
      caption:
        "Real contextual photography of a workshop team. It does not show Open Inventory or the batch workflow described here. Photo: Mikhail Nilov / Pexels.",
    },
    takeaways: [
      "Shared fields are reused for every item in a batch",
      "Resource, media, analysis, and cover work run as separate stages",
      "Stable idempotency keys prevent duplicates during defined retries",
    ],
    sections: [
      {
        id: "why-batch-capture",
        eyebrow: "The actual bottleneck",
        title: "Which inputs can be reused across a batch",
        paragraphs: [
          "During a capture run, repeated context switches cost more time than entering one text field. Type and location often stay unchanged within a shelf or room. The batch workflow therefore lets you set those values once and carry them into subsequent captures.",
          "The client creates a separate job for every item. The server creates the inventory resource first and attaches media afterwards. Analysis and cover generation are optional, independent stages. A cover failure therefore does not need to discard photos that have already been uploaded.",
          "“Inventory in seconds, not hours” describes the target for capture work on site; it is not a published benchmark. Processing can continue afterwards. Total duration and throughput depend on network conditions, server capacity, image size, and any enabled external services.",
        ],
      },
      {
        id: "workflow",
        eyebrow: "Execution",
        title: "The queue in five stages",
        steps: [
          {
            title: "Set the batch context",
            body: "Choose shared values such as type “Tool” and location “Workshop · Shelf B2”. Cover generation and analysis remain optional.",
          },
          {
            title: "Prepare captures locally",
            body: "Take one primary photo and add other angles when needed. Model numbers and rating plates should be separate, sharp images.",
          },
          {
            title: "Create the resource and media",
            body: "The client creates the inventory record and then uploads its images. Both stages have their own progress and error states.",
          },
          {
            title: "Let the queue keep working",
            body: "Start the next capture while earlier jobs continue. Defined retries reuse stable operation IDs and server-side idempotency keys.",
          },
          {
            title: "Review the result",
            body: "Check the name, tracking mode, location, and images. A usable photo does not replace serial numbers or required custom fields.",
          },
        ],
        note: {
          title: "A practical photo rule",
          body: "One clear image saves more time than three ambiguous ones. Use even light, fill the frame with the object, and photograph labels separately.",
          tone: "success",
        },
      },
      {
        id: "browser-or-ios",
        eyebrow: "Browser and iPhone",
        title: "Comparing the web client and iOS app",
        paragraphs: [
          "The web client combines the browser camera with existing files, which works well on a laptop or tablet at a workbench. The native SwiftUI app uses AVFoundation directly and adds code scanning and RoomPlan paths.",
          "On iOS, photos and stage status are persisted in a server-bound outbox under Application Support. After a restart, the app checks the last confirmed stage and continues there. This is not offline synchronization for the complete data model; it is a persistent upload queue.",
        ],
        bullets: [
          "Browser camera access requires HTTPS or localhost; existing photos can be uploaded instead.",
          "The native app needs network access to your self-hosted server. Public connections should use HTTPS.",
          "Optional AI stages leave your server: analysis uses OpenAI, covers can use OpenAI or Google, and photo counting can use Replicate.",
          "Barcode recognition does not replace review when several items share one code or have no code at all.",
        ],
      },
      {
        id: "after-processing",
        eyebrow: "After capture",
        title: "Review fields and images after processing",
        paragraphs: [
          "The queue first produces an editable record. You still need to verify that location, tracking mode, quantity, and images match the physical object. Serial numbers and safety-relevant information should never be accepted from a model proposal without review.",
          "The complete path lives in the MIT-licensed repository: web client, REST routes, and SwiftUI outbox are open source. Queue behavior and data flow can be inspected directly in code and changed where necessary.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Browse features",
        href: "/features",
        description: "Batch capture, media, locations, and stock in one overview",
      },
      {
        label: "Family use case",
        href: "/use-cases/familie",
        description: "Basements, shared belongings, and household inventory without spreadsheets",
      },
      {
        label: "Explore the iOS app",
        href: "/ios",
        description: "Native camera, scanners, and the persistent mobile queue",
      },
      {
        label: "Project on GitHub",
        href: githubUrl,
        description: "Read and contribute to the MIT-licensed source",
        external: true,
      },
    ],
  },
  {
    slug: "mengenbestand-oder-serialisiert",
    category: "Data model",
    title: "Bulk stock or serialized units: differences in the data model",
    shortTitle: "Bulk and serialized tracking",
    excerpt:
      "Bulk mode records quantities. In serialized mode, every unit has its own code, state, and location. Changing modes has technical preconditions.",
    description:
      "A technical comparison of bulk and serialized tracking in Open Inventory, including movements and mode conversion.",
    publishedAt: "2026-08-10",
    publishedLabel: "August 10, 2026",
    readingTime: "8 min read",
    accent: "from-[#1eaf82] to-[#8ff0cc]",
    accentSoft: "bg-success-soft text-success",
    cover: {
      src: "/marketing/photography/warehouse-scan.webp",
      alt: "A warehouse worker scans a packaged product on a shelf while holding a tablet.",
      width: 1800,
      height: 1200,
      caption:
        "Real contextual photography of a manual warehouse scan. It does not show an Open Inventory interface. Photo: Tiger Lily / Pexels.",
    },
    takeaways: [
      "`trackingMode: bulk` records quantities per resource and location",
      "`trackingMode: serialized` stores individually identified units",
      "A mode conversion validates stock, variants, assignments, and existing units",
    ],
    sections: [
      {
        id: "difference",
        eyebrow: "Two models",
        title: "trackingMode selects the booking model",
        paragraphs: [
          "The API calls the switch `trackingMode`; PostgreSQL stores it as `stock_settings.tracking_mode`. `bulk` permits quantity movements and balances per location. It fits bolts, cable ties, or interchangeable spare parts.",
          "With `serialized`, every physical unit receives its own record with a code, state, and location. Direct quantity movements are blocked. Instead, a specific unit is created, moved, or assigned a new state.",
          "Both models write movements to the history. The difference is the smallest addressable entity: a number in bulk mode and an identified object in serialized mode.",
        ],
      },
      {
        id: "decision",
        eyebrow: "Decision guide",
        title: "Questions to answer before choosing a mode",
        steps: [
          {
            title: "Is every unit interchangeable?",
            body: "If each unit serves the same purpose and needs no individual history, bulk tracking is usually sufficient.",
          },
          {
            title: "Does each unit need its own state?",
            body: "States such as `available`, `reserved`, `in-use`, `maintenance`, or `retired` require an identified unit.",
          },
          {
            title: "Do you need the location of one exact unit?",
            body: "Bulk mode stores quantities per location. A specific measuring instrument needs its own unit if it must remain individually findable.",
          },
          {
            title: "Are there unit-specific attributes?",
            body: "Serial number, warranty date, color, calibration, or assignment belong cleanly on a serialized unit.",
          },
          {
            title: "Is the maintenance cost justified?",
            body: "Registering and moving each unit takes attention. Serialize only where the additional information is actually used.",
          },
        ],
      },
      {
        id: "examples",
        eyebrow: "Examples",
        title: "Where both modes fit",
        bullets: [
          "Makerspace: M4 bolts as bulk stock; cordless drills with inventory labels as serialized units.",
          "Family: moving boxes as records or a quantity; bicycles serialized by frame number.",
          "Startup: USB-C adapters as bulk stock; company laptops and test phones serialized and assigned to people.",
          "Club: disposable cups as bulk stock; radios serialized with lending history and state.",
          "Collection: standard sleeves as bulk stock; each work serialized with provenance and individual condition.",
        ],
        note: {
          title: "Both modes can coexist",
          body: "`trackingMode` is stored per inventory resource. One workspace can track consumables in bulk and serialize equipment.",
          tone: "brand",
        },
      },
      {
        id: "conversion",
        eyebrow: "Constraints",
        title: "What a mode conversion validates",
        paragraphs: [
          "When converting bulk stock to serialized tracking, Open Inventory creates one unit for each item in the current quantity. Variant balances must be zero, active assignments and reservations must have ended, and the bulk balance must sit at the “Unassigned” location. A single conversion is also limited to 5,000 units.",
          "Converting back to bulk is blocked while identified units still exist. The mode is therefore not a presentation setting: it changes both valid operations and stored records.",
          "Before a large import, test receipt, withdrawal, transfer, lending, return, and stock count with a few physical objects. The rules are visible in `lib/stock.ts`, the Drizzle schema, and the OpenAPI specification in the MIT-licensed repository.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Inventory features",
        href: "/features",
        description: "Stock, movement history, locations, and inventory cycles",
      },
      {
        label: "Startup use case",
        href: "/use-cases/startup",
        description: "Devices, parts, and assignments in a growing team",
      },
      {
        label: "Documentation",
        href: "/docs",
        description: "Installation, configuration, and API details",
      },
      {
        label: "Open-source code",
        href: githubUrl,
        description: "Inspect the data model and MIT license on GitHub",
        external: true,
      },
    ],
  },
  {
    slug: "qr-etiketten-im-makerspace",
    category: "Makerspace",
    title: "QR labels in a makerspace: links, layout, and scan workflows",
    shortTitle: "QR labels in a makerspace",
    excerpt:
      "A resource label contains a compact link under /r/{code}. Layout, material, and the scan workflow determine whether it works in a workshop.",
    description:
      "A technical overview of compact resource links, label layout, printing, and transactional scan workflows.",
    publishedAt: "2026-08-07",
    publishedLabel: "August 7, 2026",
    readingTime: "9 min read",
    accent: "from-[#f09b32] to-[#f7c84d]",
    accentSoft: "bg-warning-soft text-warning",
    cover: {
      src: "/marketing/photography/qr-package-scan.webp",
      alt: "A person holds a smartphone above a QR label on a cardboard box.",
      width: 1800,
      height: 2700,
      caption:
        "Real contextual photography of a parcel scan. The visible QR code and phone screen do not come from Open Inventory. Photo: Kampus Production / Pexels.",
    },
    takeaways: [
      "Resource links use short codes under `/r/{code}`",
      "A resource label and an executable scan workflow are separate concepts",
      "Print size, contrast, material, and scan distance need physical testing",
    ],
    sections: [
      {
        id: "inside-the-code",
        eyebrow: "Before printing",
        title: "What the resource QR code contains",
        paragraphs: [
          "`lib/resource-short-link.ts` derives a short code from the resource UUID. The label encodes a URL under `/r/{code}`. That route resolves the code back to the UUID on the server and redirects to the record.",
          "The short link does not bypass access control. Without a valid session, the browser first opens sign-in and returns to the inventory record afterwards. Name, identifier, and location should still appear as readable text on the label.",
          "The label designer can place a QR code, image, name, identifier, Code 128, URL, and location. Dimensions are stored in millimeters. Presets are starting points; browser, printer driver, and physical medium remain part of the output path.",
        ],
      },
      {
        id: "workflow",
        eyebrow: "Workshop workflow",
        title: "Run a pilot with real tools",
        steps: [
          {
            title: "Define locations and permissions",
            body: "Create rooms, cabinets, and shelves as locations. Check separately who may edit records, manage label setups, and book stock.",
          },
          {
            title: "Inventory a pilot group",
            body: "Start with a manageable set such as handheld power tools. Use serialized units for individually tracked equipment and bulk stock for interchangeable consumables.",
          },
          {
            title: "Build the layout in millimeters",
            body: "Print the name, short identifier, location, and a sufficiently large QR code. Avoid decorative elements that do not improve readability or durability.",
          },
          {
            title: "Test print and scan",
            body: "Scan from a normal working distance, under workshop lighting, and with a label that is no longer pristine. Also test sign-in, the mobile view, and the route back to the shelf.",
          },
          {
            title: "Version and reuse the setup",
            body: "Adjust template and attachment method after the pilot. Saved setups carry a revision so concurrent changes cannot silently overwrite each other.",
          },
        ],
      },
      {
        id: "scan-workflows",
        eyebrow: "Two scan paths",
        title: "Resource links and scan execution are separate",
        paragraphs: [
          "A resource label only opens an existing record. Configurable scan workflows are a separate path: they read external codes, extract a relevant value, and can update a serialized unit after showing a preview.",
          "Before mutation, the server returns the target and a diff. Execution uses an idempotency key and runs in one transaction with the stock movement and audit entry. A stale preview must be reloaded. For a simple checkout, opening the record may still be the shorter path.",
        ],
        bullets: [
          "The visual browser scanner requires HTTPS or localhost plus camera permission.",
          "Alternatively, upload a QR photo or paste the decoded content.",
          "A scan workflow currently operates on serialized inventory because it identifies one concrete unit.",
          "Test external codes with physical examples first; not every printed code contains a stable unique identifier.",
        ],
      },
      {
        id: "material",
        eyebrow: "Physical constraints",
        title: "Printer and label material are part of the system",
        paragraphs: [
          "Dust, oil, abrasion, curved surfaces, and metal affect label lifetime. Clean the surface, choose material that matches it, and place the code away from normal grip areas. A tag may work better than an adhesive label on small, hot, or heavily used tools.",
          "The browser opens the system print dialog. A network printer must therefore be configured in the operating system, the correct media size selected, and page scaling disabled. Open Inventory can prepare print content; it cannot correct mechanical printer faults or unsuitable consumables.",
          "Open Inventory is MIT licensed and open source. With local storage, the application, PostgreSQL, and uploads run on your infrastructure. Configuring Openinary or optional AI providers introduces additional external data paths, which belong in the makerspace operating documentation.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Makerspace use case",
        href: "/use-cases/makerspace",
        description: "Tools, parts, rooms, and shared responsibility",
      },
      {
        label: "Club and lending use case",
        href: "/use-cases/verein",
        description: "Organize shared equipment with visible responsibilities",
      },
      {
        label: "All features",
        href: "/features",
        description: "QR, barcodes, labels, locations, and movements",
      },
      {
        label: "GitHub and issues",
        href: githubUrl,
        description: "Inspect and improve the MIT-licensed source",
        external: true,
      },
    ],
  },
  {
    slug: "warum-inventar-selbst-hosten",
    category: "Open source",
    title: "Self-hosting inventory: components and operational work",
    shortTitle: "Operating a self-hosted instance",
    excerpt:
      "Next.js, PostgreSQL, and upload storage can run on your infrastructure. Backups, TLS, upgrades, and external data paths still need explicit configuration.",
    description:
      "A technical overview of the self-hosted Open Inventory stack, external services, and recurring operational work.",
    publishedAt: "2026-08-04",
    publishedLabel: "August 4, 2026",
    readingTime: "8 min read",
    accent: "from-[#272936] to-[#665cff]",
    accentSoft: "bg-surface-muted text-foreground",
    cover: {
      src: "/marketing/photography/server-rack.webp",
      alt: "Close-up of cabled rack hardware with orange patch cables.",
      width: 1800,
      height: 2700,
      caption:
        "Real contextual photography of rack hardware and cabling. It is not a documented Open Inventory installation. Photo: Josh Sorenson / Pexels.",
    },
    takeaways: [
      "The application and PostgreSQL run in the Docker Compose stack",
      "Uploads can use local storage or Openinary",
      "Backups, restore tests, TLS, monitoring, and upgrades remain operator tasks",
    ],
    sections: [
      {
        id: "what-self-hosting-means",
        eyebrow: "Define the boundary",
        title: "Which components run on your infrastructure",
        paragraphs: [
          "The checked-in Compose stack starts PostgreSQL, runs migrations, and starts the Next.js application. Persistent volumes keep the database and local uploads outside container filesystems.",
          "The upload path is configurable. Local storage keeps media on your volume. Openinary sends files to its upload API. Self-hosting the application therefore does not automatically keep every blob local.",
          "Photos, field values, locations, and assignments are operational data. You need to define who can reach the host, where TLS terminates, where backups are stored, and how restore tests are documented.",
        ],
      },
      {
        id: "open-source",
        eyebrow: "Open source under MIT",
        title: "MIT license, source code, and API",
        paragraphs: [
          "Open Inventory is published under the MIT license. Server, web client, database schema, and iOS app live in the same public repository and can be inspected, modified, and distributed internally under the license terms.",
          "Open code is not a security audit. It does make permission checks, data paths, and migrations inspectable. Issues and pull requests are public, so technical changes do not need to be inferred from product copy.",
          "REST endpoints are documented in `public/openapi.yaml`. CSV covers core inventory fields but is not a complete backup of media, users, and workspace data. Recovery requires both the database and upload storage.",
        ],
      },
      {
        id: "start",
        eyebrow: "Practical start",
        title: "Start locally with Docker Compose",
        steps: [
          {
            title: "Prepare the host and persistent volumes",
            body: "You need Docker, sufficient storage, a domain or internal address, and a backup target for PostgreSQL and uploads.",
          },
          {
            title: "Prepare the repository and `.env`",
            body: "Clone the MIT-licensed repository, copy `.env.example`, and set your own secrets, hostnames, and storage configuration.",
          },
          {
            title: "Run migrations and start the application",
            body: "The checked-in stack starts PostgreSQL, applies the bundled migrations, and then starts the Next.js application with persistent volumes.",
          },
          {
            title: "Test TLS and roles",
            body: "Do not publish the application without protection. Test sign-in, roles, and a restore before importing real data.",
          },
          {
            title: "Verify with test data",
            body: "Exercise import, images, stock movements, and label printing in a small workspace first.",
          },
        ],
      },
      {
        id: "operations",
        eyebrow: "Operations",
        title: "Backups, upgrades, TLS, and monitoring",
        bullets: [
          "Backups: protect PostgreSQL and uploads together; restore them regularly to a separate target.",
          "Upgrades: read the diff and migrations; test new images against a copy of the database first.",
          "TLS and secrets: expose public hosts only through HTTPS; never commit secrets to Compose files or images.",
          "Monitoring: watch free space, database health, HTTP errors, and external image-processing jobs.",
        ],
        note: {
          title: "A note about AI features",
          body: "Self-hosting does not automatically make every processing step local. If you configure OpenAI, Google, or Replicate as an image-model provider, selected images are sent to that service according to your configuration. Review its terms and enable AI only where it fits your data.",
          tone: "warning",
        },
      },
      {
        id: "fit",
        eyebrow: "When it fits",
        title: "When self-hosting is a reasonable choice",
        paragraphs: [
          "Self-hosting fits teams that already operate Docker applications, need internal API integrations, or must document data flows themselves. A small home server can run a test instance; production still needs backups and upgrades.",
          "If nobody owns restore tests, TLS, and updates, operating the system yourself is not a shortcut. The MIT license permits changes; it does not operate the deployment for you.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Docker documentation",
        href: "/docs#docker",
        description: "Installation, configuration, and the first start",
      },
      {
        label: "API reference",
        href: "/api-docs",
        description: "OpenAPI endpoints for your integrations",
      },
      {
        label: "Collection use case",
        href: "/use-cases/sammlung",
        description: "Keep your own object and provenance data",
      },
      {
        label: "MIT project on GitHub",
        href: githubUrl,
        description: "Read the code, license, issues, and project history",
        external: true,
      },
    ],
  },
  {
    slug: "iphone-lidar-inventarisierung",
    category: "iOS app",
    title: "iOS app: camera, outbox, RoomPlan, and LiDAR",
    shortTitle: "iOS, RoomPlan, and LiDAR",
    excerpt:
      "The SwiftUI app uses AVFoundation for photos and codes, a persistent outbox for uploads, and RoomPlan for parametric room geometry.",
    description:
      "A technical overview of AVFoundation, persistent upload stages, RoomPlan, and ARKit in the open-source iOS app.",
    publishedAt: "2026-08-01",
    publishedLabel: "August 1, 2026",
    readingTime: "9 min read",
    accent: "from-[#409cff] to-[#8ff0cc]",
    accentSoft: "bg-brand-soft text-brand",
    cover: {
      src: "/marketing/photography/home-labels.webp",
      alt: "A person sorts printed category names beside labelled moving boxes and a printer.",
      width: 1800,
      height: 2700,
      caption:
        "Real contextual photography of labelling storage boxes. It does not show the Open Inventory app, RoomPlan, or LiDAR. Photo: Blue Bird / Pexels.",
    },
    takeaways: [
      "AVFoundation supplies photos plus QR and barcode recognition",
      "The outbox persists photos, IDs, and confirmed API stages",
      "RoomPlan supplies parametric geometry, not a photorealistic scan",
    ],
    sections: [
      {
        id: "native-app",
        eyebrow: "More than a web view",
        title: "Native components and supported codes",
        paragraphs: [
          "The MIT-licensed SwiftUI app lives under `ios/Inventory`. AVFoundation provides camera frames and metadata for QR, EAN-8/13, UPC-E, Code 128, Data Matrix, PDF417, and Aztec codes.",
          "The app resolves a UUID, Open Inventory link, exact SKU, or serial number against the server. An unknown code can become an identifier for a new record. The same REST stages as the web client follow: create the resource, upload media, optionally analyze it, and optionally create a cover.",
          "The bearer token is stored in the iOS Keychain. Photos, resource ID, media IDs, and stage status are stored under Application Support and bound to one server. Retries use stable idempotency keys per stage.",
        ],
      },
      {
        id: "capture-run",
        eyebrow: "Inventory in seconds",
        title: "Persistent outbox and staged API calls",
        steps: [
          {
            title: "Set origin and token",
            body: "The root URL binds queue entries to one server. Public hosts must use HTTPS before the app sends a bearer token.",
          },
          {
            title: "Resolve a code or prepare a resource",
            body: "Open an existing object by code or prepare a new record with up to twelve photos.",
          },
          {
            title: "Add request data",
            body: "Choose a location, optional GPS, and the spatial mode when prepared. Stock can optionally be received immediately or issued after confirmation.",
          },
          {
            title: "Persist the job in Application Support",
            body: "The app copies photos into the outbox and stores the current stage. Upload and optional AI stages can then run sequentially.",
          },
          {
            title: "Check server state",
            body: "After every stage, the app stores returned IDs. Following a restart it resumes from the last confirmed state; domain fields still require review.",
          },
        ],
      },
      {
        id: "lidar",
        eyebrow: "RoomPlan",
        title: "RoomPlan geometry and object positions",
        paragraphs: [
          "On a LiDAR-capable iPhone, RoomPlan captures walls, openings, floors, and recognized furnishings as a parametric scene. Rooms from the same run share an ARKit coordinate space and can be rendered together in the web client.",
          "For an inventory object, the app relocalizes within the saved AR space. Positioning prefers LiDAR depth and falls back to an estimated plane. Photo, room ID, transform, and reference frame then pass through the normal upload queue.",
          "RoomPlan does not store a photorealistic mesh. Geometry is simplified and can misclassify doors, mirrors, or unclear transitions. Manual room selection and tests on physical hardware remain necessary.",
        ],
        note: {
          title: "Hardware requirement",
          body: "For the current spatial workflow, the repository specifies iOS 17 or later, Xcode 26 or later for building, and a LiDAR-capable iPhone, typically a recent Pro model. Camera, RoomPlan, relocalization, and position accuracy must be tested on a physical device.",
          tone: "warning",
        },
      },
      {
        id: "limits",
        eyebrow: "Before deployment",
        title: "Network, hardware, and environment limits",
        bullets: [
          "The iPhone must reach the server; bearer tokens are not sent over unencrypted HTTP to public hosts.",
          "The simulator is useful for parts of the API and interface, not for accepting camera, scanner, LiDAR, or spatial accuracy behavior.",
          "Reflective, textureless, or moving scenes can make AR capture and visual relocalization less reliable.",
          "AI image recognition is an optional external processing stage when a corresponding provider is configured.",
          "A spatial marker supplements the inventory record; important physical locations should still have clear human-readable names.",
        ],
      },
      {
        id: "open-code",
        eyebrow: "Build on the open code",
        title: "Code paths in the public repository",
        paragraphs: [
          "Server routes, DTOs, `APIClient`, `IntakeQueue`, RoomPlan controllers, and SwiftUI screens live in the same open-source repository. The mobile request path can be followed directly from a photo to the database record.",
          "The MIT license permits custom builds and modifications. Signing, camera, LiDAR, and RoomPlan still require Apple tooling and tests on a physical device. The simulator does not cover those hardware paths.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "iOS features",
        href: "/ios",
        description: "Native camera, QR scanner, and room capture",
      },
      {
        label: "Makerspace use case",
        href: "/use-cases/makerspace",
        description: "Find tools and material where they are used",
      },
      {
        label: "Collection use case",
        href: "/use-cases/sammlung",
        description: "Connect objects, images, places, and individual details",
      },
      {
        label: "iOS source on GitHub",
        href: `${githubUrl}/tree/main/ios/Inventory`,
        description: "Inspect the native app in the public MIT repository",
        external: true,
      },
    ],
  },
];

export function getEnglishArticle(slug: string) {
  return englishArticles.find((article) => article.slug === slug);
}
