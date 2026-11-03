# Native app screencasts

Recorded on 2026-11-03 from the actual SwiftUI Open Inventory app (1.4) in
Apple's iPhone simulator, at 1206 × 2622. Exported as silent H.264 MP4,
604 × 1312, 30 fps, exactly 150 frames / five seconds, with fast-start metadata.
The WebP files are the opening video frames.

| Clip | Demonstrated action |
| --- | --- |
| inventory | Open the soldering station from the inventory list |
| detail | Inspect the item's photos/tags, then open its relationships |
| search | Enter “Löt” and show the matching records |
| stock | Switch between incoming and outgoing stock; no booking is submitted |
| map | Select shelf and compartment markers and show their item cards |

The recordings use the established synthetic workshop demo dataset. Stock was
captured in the Store Review demo workspace. The other final clips use a local,
read-only preview of the public demo. That preview adds illustrative Berlin GPS
coordinates to demo records for the map; no remote inventory data was modified.

These are edited screencasts, not real-time performance measurements: waiting,
network delay and blank intermediate scroll frames are cut out; action segments
are retimed to fit five seconds. The application UI itself is not reconstructed.
Device artwork is supplied separately by the existing licensed iPhone frame;
see ../../devices/README.md.

AppPhonePreview mounts videos only on desktop (at least 1024 CSS pixels, a fine
pointer and hover support), with reduced motion disabled, while the mockup is
visible. Mobile and reduced-motion visitors retain the existing screenshots.
Clips loop silently, have individual pause/play controls, and pause when the
browser tab is hidden. The server HTML contains no video/source elements.
