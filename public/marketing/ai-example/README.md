# AI photo example

Created 2026-10-31 using the built-in Imagegen tool. All images depict fictional inventory. They illustrate supported photo-analysis and background-removal functions; they are not screenshots or measured results from a running Open Inventory instance. The title/description shown beside them are illustrative editorial examples, not a recorded model response.

Original generated PNGs are kept here. The after image has a transparent alpha channel. The current product photo (`drill-product-clean.png`) has genuine alpha transparency and depicts a cleaned, polished version of the object with studio lighting. The earlier opaque version (`drill-product.png`) is archived and no longer displayed. Product photos are illustrative reinterpretations, not faithful background-only edits. Public pages label the assets as an AI-generated example. Do not present them as real inventory or as a benchmark.

## drill-before.png

Use case: photorealistic-natural
Asset type: Open Inventory website, illustrative before photo for a photo-to-inventory workflow.
Primary request: A believable ordinary phone snapshot of ONE used cordless drill standing upright on its battery on a real plywood workshop workbench.
Subject: unbranded dark teal cordless drill, black rubber grip and black battery, silver torque ring and black chuck pointing left, no drill bit. Light scratches, sawdust and signs of normal use.
Scene/backdrop: worn plywood bench, a few screws and a pencil away from the drill, blurred workshop shelving behind. No people.
Composition/framing: square photo, entire drill visible, centered with generous space around every edge, eye-level three-quarter side view. Drill occupies about 65 percent of image height.
Lighting/mood: ordinary uneven workshop daylight, slightly warm, candid phone photograph, natural detail, not a studio or glossy advertising photo.
Constraints: mechanically plausible tool; no logos, no readable brand names, no text overlays, no watermarks. This will be clearly labeled as an illustrative generated example.

## drill-after.png

Use case: background-extraction
Asset type: Open Inventory website, after image paired with the supplied workshop snapshot.
Input image: edit target, the exact cordless drill to preserve.
Primary request: Isolate only the cordless drill and attached battery on a genuinely transparent background. Remove the workbench, screws, pencil and shelving. Make the tool clearly visible with gently balanced exposure, like a careful inventory catalogue photograph.
Constraints: preserve the exact tool identity, silhouette, proportions, perspective, orientation, framing, teal and black colours, torque ring, scratches and signs of use. Do not repair or beautify damage, invent parts, add text, logos, shadows or accessories. Keep the object in exactly the same location and scale within the square canvas. Clean accurate edges. All pixels outside the tool must have zero alpha.

## drill-product.png (superseded)

Created with the built-in Imagegen tool, using `drill-after.png` as the edit target. Final prompt:

Use case: style-transfer
Asset type: third step in an Open Inventory website comparison: snapshot, background removal, premium product photograph.
Input image: edit target and product identity reference — the teal and black used cordless drill with attached black battery.
Primary request: Re-photograph this same drill as an exceptionally refined studio product photograph, with a more flattering camera perspective and the meticulous soft lighting associated with Apple hardware photography.
Scene/backdrop: opaque seamless very pale neutral grey studio background and floor, subtle gradient, a delicate realistic contact shadow under the battery. No pedestal or other props.
Composition/framing: square canvas, complete drill standing naturally upright on its battery, centered, about 76 percent of frame height, comfortable margins. Change the camera from the broad side view to a strong three-quarter front view: see the circular front of the metal chuck clearly, with the teal motor housing receding toward the right. Use an 85mm product-photography lens look, natural proportions, full object in focus.
Lighting: large soft key light above and to the front left, controlled fill, elegant rim light along the teal body, precise broad highlights on metal, deep but readable black rubber, neutral colour balance, high-end photographic realism.
Invariants: same unbranded teal body, black rubber grip, silver torque ring, black chuck without a drill bit, attached rectangular black battery, same design and materials. Retain visible scratches, dust marks and signs of use: improve the photograph, not the condition of the object. Do not add accessories or logos; do not redesign the drill.
Avoid: text overlays, watermarks, packaging, decorative effects, floating object, excessive gloss, exaggerated reflections, plastic CGI appearance.

## drill-product-clean.png (current)

Regenerated with the built-in Imagegen tool at the user's request: clean product, transparent background. Edit target: `drill-product.png`. Final prompt:

Use case: precise-object-edit
Asset type: clean premium product photograph for the final step of an inventory website comparison.
Input image: edit target — the existing three-quarter studio photograph of the teal and black cordless drill.
Primary request: Regenerate this product photograph as an immaculate, professionally cleaned product on a genuinely transparent background. Remove ALL dirt, dust, sawdust, stains, beige speckles, grime and distracting surface scuffs from the entire drill, including chuck, grip and battery. Show pristine clean teal polymer, clean textured black rubber and clean brushed metal.
Keep unchanged: the same drill design, silhouette, proportions, three-quarter front camera perspective, attached battery, teal and black colours, material types, no drill bit, whole object fully visible.
Lighting: refined Apple-style product photography with a large soft key, controlled fill, subtle edge highlights and readable black surfaces. Photorealistic, no plastic CGI look.
Background: genuine alpha transparency everywhere outside the drill. Remove the grey backdrop, floor, contact shadow and all cast shadows. No solid background, no checkerboard baked into the image, no halo. Square canvas with comfortable transparent margin.
Constraints: clean and polish the depicted object without adding or redesigning components. No logos, text overlays, accessories or watermarks.
