# Stock walkthrough

`equipment-consumables.mp4` is a real browser recording of Open Inventory,
captured on 2026-11-01 from the public, read-only workshop at
https://demo.openinventory.polyxo.de/demo/inventory. The interface is German
and uses dark mode. The existing demo item photos are AI-generated sample
photos; the interface itself is captured directly.

The 35-second silent H.264 video (1440 × 1100, 30 fps) shows:

1. Opening the cordless drill from the inventory cards.
2. Inspecting its available and issued units, then expanding the issue to
   “Projekt Lastenrad” in the movement history.
3. Searching for screws, opening their stock view and expanding the recorded
   consumption of 74 screws, leaving 126 of the original 200.

For the recording only, capture CSS hides the Live-Demo banner, the temporary
view notice and the demo account block at the bottom of the sidebar. The
header is repositioned to avoid a gap where the banner was. No application
source, permissions or inventory records were changed. Playwright adds the
visible pointer and click feedback. The video is a continuous recording,
with only the beginning and end trimmed; no interface screens were rebuilt.

`equipment-consumables.webp` is the starting view from the same capture, with
the same hidden notices, compressed as a WebP poster. A large centered play
button starts playback on click at 2× speed, so the full walkthrough takes
17.5 seconds. There is no autoplay. After starting, native video controls
provide pause, seeking and fullscreen; playback stops while the video or page
is out of view and resumes only when the visitor presses play. On desktop,
the video sits to the left of the explanatory text; on mobile it sits above it.

The local capture scripts, original WebM and QA frames are in the inventory
application's ignored `output/playwright/stock-video/` directory. The public
demo login requires no credentials. Recording used Playwright CLI's
`video-start --size=1440x1100 --fps=30 --cursor` and `video-stop`, followed by
an H.264 encode with CRF 22, `yuv420p`, no audio and `+faststart`.
