# Product screenshot provenance

These files are unaltered captures of the Open Inventory applications. They are
not generated or reconstructed marketing artwork.

## Web application

Captured from the locally running application at 1440 × 960 with Playwright on
2026-08-15. The first capture set used eight purpose-built inventory records and
four licensed real photographs. The expanded set used the same isolated preview
organisation after it had been extended to 19 consistent demo records, 13
photo-backed records, 13 stock-tracked items, six roles, six members, three
access rules, three purchase orders and four standalone integration tokens. The
photos are licensed real-world photography documented in
[`../photography/README.md`](../photography/README.md). No production, customer
or personal inventory data is shown.

| File | Captured view |
| --- | --- |
| `web-dashboard.png` | Dashboard with metrics and recent photo-backed records |
| `web-inventory.png` | Photo-rich inventory grid |
| `web-item-detail.png` | Item detail for the warehouse barcode scanner |
| `web-label-designer.png` | Label designer with real QR and Code 128 previews |
| `web-batch.png` | Batch capture tray with an uploaded real workshop photograph |
| `web-stock.png` | Populated stock overview with availability, incoming quantities and reorder signals |
| `web-locations.png` | Per-item stock distribution across three demo location records |
| `web-settings-access.png` | Roles, members and item-level access rules |
| `web-inventory-types.png` | Inventory type configuration for the populated preview workspace |
| `web-custom-fields.png` | Custom-field management with a field created through the real application UI |
| `web-data-transfer.png` | Import and export controls for moving inventory data |
| `web-api-tokens.png` | Scoped API-token management showing prefixes only, never token secrets |
| `web-orders.png` | Three open purchase orders with line items, quantities and receiving actions |
| `web-notifications.png` | Deduplicated attention inbox with maintenance and low-stock events |

### Homepage crops

The homepage uses three pixel-preserving crops so the product task is legible at
landing-page sizes. They contain no reconstructed UI or generated pixels.

| File | Source crop |
| --- | --- |
| `web-stock-home.png` | `web-stock.png`, 1148 × 735 from x=268, y=145 |
| `web-batch-home.png` | `web-batch.png`, 1148 × 640 from x=268, y=100 |
| `ios-search-home.png` | `ios-search.png`, 1206 × 980 from x=0, y=0 |

## Native iOS application

Captured directly with `simctl` from the repository's signed SwiftUI app running
on an iPhone 16 Pro simulator at 1206 × 2622. The app was connected to the same
temporary local preview organisation on port 3107 and displayed the expanded
demo dataset. These are real native app captures with demo data, not generated
device artwork.

| File | Captured view |
| --- | --- |
| `ios-inventory.png` | Native inventory list with real thumbnails |
| `ios-item-detail.png` | Native item detail with photograph, location and stock actions |
| `ios-search.png` | Native search results across the populated demo inventory |
| `ios-stock-management.png` | Native stock management with balances and purchasing context |
| `ios-map.png` | Native map populated from the demo records' GPS coordinates |
| `ios-settings.png` | Native app settings connected to the preview deployment |
| `ios-permissions.png` | Native account permissions and available capabilities |
| `ios-system-status.png` | Native system and service status for the preview deployment |

The source PNG files are kept at their original capture dimensions. Apart from
the documented homepage crops, CSS supplies only the surrounding browser or
device frame where a page design needs one.
