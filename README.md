# Metal Foil Inc. Website — v49

## Current release (v49)
- Display flashcard numbers as plain 1–8 on front, back, and carousel counter.
- Enlarge the photograph portion of each card by reducing interior margins and typography, while preserving card dimensions and automatic rotation.
- Animate the established US–India route with a restrained traveling light and gently pulsing location markers. The map illustration and India outline are unchanged.
- Respect reduced-motion preferences for the map and carousel.

- Removed the supplementary mill image gallery and the short manufacturing video. Opening hero photography and all product details remain.
- Added eight interactive, keyboard- and touch-accessible applications cards near the bottom of the page, ahead of Request for Quotation. Tap or click each card to reveal its details; arrow controls browse the horizontal row.
- Changed supply-chain terminology to **Manufacturing mill** for Jindal Metals & Alloys Limited.
- Updated the decorative world-map India highlight to include the northwest Kashmir region; the map is illustrative, not an official boundary reference.
- Replaced the small floating-style J icon with a header lockup reading **JINDAL SAW LTD. / TOTAL PIPE SOLUTIONS**, using the previously linked J graphic and a light hover effect. It links to jindalsaw.com.
- Styled **View Inventory** as an orange ribbon button, immediately to the left of the blue **Request a Quote** button. The navigation automatically collapses at narrower window sizes.
- Deployment: replace the contents of your existing GitHub project and deploy commit `main` to Vercel.

# Metal Foil Inc. Website

Static GitHub/Vercel website for Metal Foil Inc.

## Deployment
1. Create or use a GitHub repository.
2. Place all files in the repository root.
3. Import the repository into Vercel.
4. Use the **Other / Static** framework preset. No build command is required.

## Commercial content
- ASTM Grades: 321, 304, 309
- Roll lengths: 25', 50', 100', 900', and custom made
- Thickness: 0.002"
- Width: 20"
- Steel origin: U.S. and overseas
- Baytown stock:
  - Grade 321: 21 rolls, 100' × 20" × 0.002", DFARS Yes
  - Grade 304: 7 rolls, 100' × 20" × 0.002", DFARS No

## RFQ behavior
The **Prepare an RFQ** button creates a `mailto:` draft addressed to `sales@metalfoil.us`. Form data is not transmitted to or stored by the website.

## Certificates
Certificate cards display clean first-page previews. Selecting **View Original Document** opens the Jindal Metals & Alloys Limited document through the original manufacturer/Google document viewer workflow. The website does not represent those source files as downloadable PDFs.

## Visuals and attribution
Manufacturing imagery, Jindal Metals & Alloys Limited references, and third-party image attribution are documented in `SOURCES.md`. The final Houston office image includes its Wikimedia Commons attribution directly on the site.


## v17 hero refinement
The hero copy was rebalanced with stronger typographic presence, a restrained vertical accent, a more substantial facts panel, and a dark graphite secondary headline with no underline. Hero entrance animations now begin partially visible to avoid an empty left column during load. The two hero images and their imagery remain unchanged.

## v18 hero rebuild
The opening hero was rebuilt from a clean base for clarity: shorter copy, fully opaque static text, no glow/blur/mask effects, three compact product facts, and simple one-time image entrance motion. The two existing hero images remain unchanged.


## v19 — Who We Are and Jindal emblem
- Adds a new `Who We Are` section immediately under the hero with a unique, locally stored illustrative precision-foil image.
- The section identifies Metal Foil Inc. as the U.S.-based selling arm of Jindal Metals & Alloys Limited, a subsidiary of Jindal SAW Limited.
- Removes the manufacturer-name abbreviation from visible website content and links to the two official websites.
- Includes `assets/mfi-logo.png` (original MFI logo) for header/footer and `assets/jindal-j.png` (subtle floating branded-style emblem).
- All RFQ, certificate, inventory, and existing page components are retained.

### Important existing image dependencies
This package is an **update for the existing GitHub repository**, not a replacement of its entire asset history. The supplied site already referenced `assets/process-1.png` and `assets/process-2.png` but those two files were not included in the latest upload. **Keep those two existing images in your GitHub `assets/` folder.** Upload/replace only the files included here; do not delete other repository assets. If those images are absent from your repository, please supply them before publishing to avoid broken hero imagery.

The floating J graphic is a previously created stylized version of the Jindal mark, not a supplied master file from the brand's official identity system. Replace it with the official transparent emblem if required for brand compliance.


## v20 corporate identity refinement
- The Who We Are section is now **first under the header**, followed by the unchanged original hero.
- The section uses a new, official Jindal Metals & Alloys Limited-hosted banner (live URL; third-party hosting).
- The floating icon now crops the **manufacturer's official logo asset** to its J mark; not an AI-generated/stylized letter.
- Both official assets rely on the manufacturer's CDN: check their current use permission and continued availability before production.
- Retain existing `assets/process-1.png` and `assets/process-2.png` from your repository: they were not in the uploaded files.


## v21 design and certificate fix
- Who We Are remains the first section, now with a refined editorial headline, two-location trustline, graphic photo label, subtle motion and framing. Existing palette and hero remain unchanged.
- Manufacturer-hosted Who We Are image unchanged; see SOURCES.md for attribution.
- ISSDA certificate is a one-page PDF, despite its filename. Replaced the broken <img> preview with the same PDF.js canvas renderer used for the other certificates. The original document link is unchanged.
- Keep existing hero photos `assets/process-1.png` and `assets/process-2.png` in GitHub.

## v22 editorial update
- New editorial, asymmetric Who We Are first section using the Jindal Metals & Alloys Limited Technical Specifications product photo, with scroll-safe responsive layout, image reveal, hover motion and accessible reduced-motion fallback.
- ISSDA certificate retains the v21 PDF preview fix.
- Preserve process-1.png and process-2.png already in the existing repository.


## v23 visual cleanup
- The opening Who We Are section has no corner tile, numbered kicker or "Material in motion" tagline on the photograph.
- The floating J is decorative and cannot be clicked; no hover or link behavior.
- The symbol is a precise server-side crop of the official manufacturer logo, with the wordmark completely excluded.
- Source and crop: https://res.cloudinary.com/dpvbgv6nw/image/upload/c_crop,x_0,y_0,w_125,h_153/f_png/v1782797426/jindal/settings/1782797425949-logo-logo.png
- The ISSDA PDF certificate thumbnail fix remains intact.


## v24 Houston Dusk / Satin Steel background trial
- Keeps the v23 content, real manufacturer photo, branding, logo and complete site functionality intact.
- Adds an atmospheric, slowly moving sunset-inspired Pearl Silver backdrop to the first "Who We Are" section.
- Uses a lightly masked photograph of the actual Houston skyline for local identity, plus bundled `assets/houston-horizon.svg` so the sky still has depth if the external photo is unavailable.
- Gives the existing hero a subtle brushed satin-steel surface, without changing the hero images or copy.
- All background motion supports `prefers-reduced-motion` and is pointer-event transparent.
- Adds the required Houston photo credit on the page and in SOURCES.md.
- The manufacturer-hosted product photograph, official J mark and ISSDA PDF preview remain unchanged.
- As with earlier versions, **retain `assets/process-1.png` and `assets/process-2.png` from the current GitHub repository.**
- The Houston photo is remotely loaded; there is an SVG fallback if unavailable.


## v25 — World connection and product range
- Preserved both opening company links; added a separate link on "subsidiary" to Jindal SAW's subsidiary profile.
- Updated Houston positioning to "from the energy capital of the world, Houston, TX".
- Replaced introductory Houston skyline with an original SVG world map connecting Houston and India.
- Moved the persistent J mark to the top-right.
- Added complete product capability matrix to the second pane; kept all other site sections.

## v27 corrections
- Removed animated pseudo-element underline from the lower about sentence (not just the anchor style).
- Restored Version 24 foil photograph at the top; retained global map only as the clearly visible atmospheric backdrop replacing the Houston skyline.
- Restored small floating/hovering J at top right rather than adding it to the navigation.


## v29 — experience refinement
- Restrained hover and entrance animations; accessibility and reduced-motion fallbacks.
- Flat rustic copper-toned US–India backdrop with subtle scroll reveal; original manufacturer photograph retained.
- Clearer product specification rows without interactive explorer.
- RFQ mailto workflow preserved, with optional validated copy-to-clipboard fallback. No backend/storage added.
- Mobile responsiveness and keyboard focus improvements.

## v30 — larger and clearer typography
Increased the opening company introduction from 16px to up to 20px, the supporting paragraph from 14px to up to 18px, and improved line height, contrast and reading measure. Proportionally enlarged smaller text throughout the website, including technical specifications, process descriptions, navigation, supporting labels, inventory, certifications and RFQ controls. Responsive sizes tuned for phones. All copy, hyperlinks and imagery remain unchanged.


## v33 — Original site, elevated (not the v31/v32 redesign)

Based on the v30 light site the user preferred. Original pages, content, product tables, corporate links, certifications, navigation and RFQ are intact. Updates: 1560 px desktop content width, porcelain/stone/slate/brass palette, more confident typography, stronger hierarchy, improved whitespace and multi-device layout, introductory entrance motion, image hover sweeps, improved technical-product typography, and accessible reduced-motion fallback. Removed the distracting global-map backdrop from the first pane without removing the manufacturer's original photograph. Fixed two references to absent `assets/process-*.png` with the already-referenced manufacturer-hosted production images; added silver-toned fallback treatment if those external files cannot load. No new JavaScript frameworks or interactive product explorer.


## Version 34 — Porcelain White & Global Connection

- Built on the original elevated Version 33 (not the experimental Version 32 redesign).
- Pure white section backgrounds, cool silver dividers, Porsche-*inspired* typography with freely available Plus Jakarta Sans (not proprietary Porsche fonts), and corporate blue/orange animated buttons.
- Custom-designed flat-world-map illustration inspired by the client reference used as a quiet inset at the bottom of the first pane, with US/India manufacturing-connection labels and reduced-motion support.
- Original foil photographs, existing hyperlinks, Jindal mark, certifications and RFQ remain intact.

### Mill media / production integration
The client also supplied five original mill photographs and seven video clips in the conversation. Their raw bytes could not be materialized into this build environment, so they **are not embedded in this ZIP**. Do not claim that these originals are present. Once a ZIP of the media is supplied or made accessible as files in the working directory, optimize them to WebP and MP4/WebM, then integrate selected, accurately labeled photographs into the manufacturing section. A hero video is optional and should be added only after reviewing suitability, optimizing filesize, adding poster/fallback, muted autoplay, and reduced-motion handling.


## v35 — Contact, map proportions, and authentic mill visuals
- Sales email updated throughout markup and RFQ JavaScript to **sales@metalfoil.us**. The RFQ remains a mailto workflow, not a submitted web form.
- Flat geographic map redrawn at an equal coordinate aspect (rather than the previous vertically compressed artwork). The map stage is taller on desktop and mobile.
- Three manufacturing-gallery images now use optimized on-site Jindal Metals & Alloys Limited photographs supplied by the user.
- Added two more on-site mill photographs and an optional, user-controlled short native video below the Manufacturing process overview; the existing hero is unchanged.
- Five optimized photos + one short compressed video are included under `assets/`, with local fallbacks, no new external asset dependencies.


## v36 — Scroll choreography, editorial mill-photo presentation, header polish
- The original v35 content, corporate hyperlinks, local inventory, email `sales@metalfoil.us`, flat map, and manual-play mill video are unchanged.
- Header content width is tightened on large screens, and the J emblem floats within the header ribbon with mobile-aware positioning.
- All five on-site user photos are displayed **uncropped** within aspect-aware frames. The originals are untouched; the visual cleanup is applied only in reversible CSS (gentle desaturation, a cool light overlay, and contrast balancing).
- Manufacturing photographs are given portrait-aware frames so coils, equipment and packing remain legible.
- Lightweight IntersectionObserver one-time fade/slide/scale introductions now cover section headings, product information, image galleries and other sections when entering view from above or below. Honors reduced-motion and degrades to visible content when JS is unavailable.
- Each mill photograph provides a **View full photograph** link opening the uncropped local web image in a new tab.


## v37 — Graded media, full frames, distinct photography
- Preserve the original bright website, links, navigation, forms, hover J and scroll animations.
- Physically color-grade three photographic assets and the existing 4-second rolling clip with restrained contrast, clearer details and a reduced yellow cast; the captured scene remains authentic.
- Exactly three visually distinct still photographs: overall rolling line, packed material, and close-up coil; no alternative angles repeated. The machine gallery has one short motion clip.
- Native 4:3, 3:4 and 16:9 media frames scale responsively and fill their frames without pillarboxing.
- "View full photograph" is now a quiet text link in the caption **below** each photo. No floating button covers the mill.
- Original, unedited source assets remain separately in the uploaded MFI.zip, not overwritten.


## v38 — Equipment-only mill footage
- Replaced the v37 manufacturing video and poster with a distinct user-supplied clip: `WhatsApp Video 2026-10-20 at 2.42.07 PM (1).mp4`.
- Selected only the first 2.72 seconds, which show the rolling equipment without any people visible in the reviewed frames, and gently slowed the excerpt to approximately 3.73 seconds. The later portion showing a person was excluded.
- Kept the original landscape frame, manual-play controls, optimized MP4 and poster, and the rest of the v37 design unchanged.
- Applied mild contrast and color balancing to match the site's existing industrial treatment.

## v40 — Clean white + landscape rolling-line footage
- Removed all v39 water-contour, sun-glow and sky-gradient styling, divider markup and `nature-wave-lines.svg`; the original white/light website and its separate flat world map remain intact.
- Replaced the previous portrait video with a different landscape clip from the user's original `WhatsApp Video 2026-10-20 at 2.42.07 PM.mp4`, excerpt ~2.35–3.93s, presented at 1024×576 16:9. Only a machinery close-up is included, with right-edge areas of the source excluded to avoid background workers. Playback is user controlled and muted.
- Improved color and contrast; generated a matching 16:9 poster. No changes to the company copy, links, product range, RFQ, photographs, or layout beyond the video itself.


## Version 42 — header symbol
The Jindal J is now an integral right-hand item of the sticky header, not a floating overlay. It links to the Jindal SAW Limited site and has a restrained hover lift, blue lighting, visible keyboard focus, and reduced-motion support. At mobile widths the J is adjacent to the Menu control. All other website sections remain unchanged.


## Version 43 — Responsive navigation and opening spacing
- Fluid logo, navigation spacing, button sizes, and Jindal symbol on large browser windows.
- At 1180px and below, full navigation switches to a generous dropdown menu to avoid cramped/overlapping links; the emblem remains rightmost.
- Sticky header height matches each breakpoint (92 / 80 / 72 / 68px), with correct anchor offsets and menu placement.
- Reduced the top padding above “Who We Are” and the gap underneath that label; existing content, photography and map remain untouched.
- Menu closes on Escape, on outside pointer clicks, and after returning to a wide display.


## Version 45 — 21 October 2026
- Moved **Industries & Applications** into the position of the former Supply Chain section and deleted Supply Chain entirely.
- Added eight distinct Pexels-licensed image links (hosted by Pexels) to interactive industry cards; visual content is illustrative, not MFI manufacturer photography. Photo credits are disclosed in the collapsible source list. Images require an internet connection to display.
- Cards now appear in a calm staggered sequence upon reaching the section, with further cards animating as they scroll into view. Flip remains keyboard/touch accessible, with reduced-motion fallback.
- Positioned **View Inventory** immediately after **Certificates** and before **Request a Quote** in the top ribbon.
- Increased the map's vertical display area and replaced the former rounded northern India accent with a narrow, more naturally contoured schematic accent. Official geographic reference: https://surveyofindia.gov.in/pages/outline-maps-of-india. Our simplified world map is illustrative and must not be used as official border data.
- Manufacturing text identifies Jindal Metals & Alloys Limited as the manufacturing mill, not as a separate partner.


## Version 47 — northern India map refinement

Replaced only the crude, bulbous northwest India vector extension with a finer single connected outline, using the Survey of India official boundary map as visual reference. All other sections and styles follow Version 46.


## Version 48 — White industry carousel
- Restored a pure white backdrop to Industries & Applications.
- The eight large photo cards now cycle from left to center with 3D depth, advancing automatically every 3.6 seconds while onscreen.
- Cards retain clickable flip-to-read details. Arrow controls and a visible Pause/Play button work with the moving deck.
- Automatic animation stops when out of view or the browser tab is hidden, and respects reduced-motion preferences.
- Retains the Version 47 India outline and all previous sections and links.


## Version 50 fixes
- Electronics card: new licensed Pexels electronics manufacturing image, alternative licensed Pexels photo and local SVG fallback if external photos fail to load. The click-to-flip behavior stays in place.
- Map: newly rendered from Natural Earth geographic boundaries in Robinson projection to avoid disproportionate continental shapes and screen stretching. India and the U.S. retain the original orange/blue treatment. A schematic northwest India extension remains illustrative only.
- All animations are removed from the map (traveling pulse, location ripples, animated line and hover movement). The flashcard carousel still rotates automatically.
