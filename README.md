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
The **Prepare an RFQ** button creates a `mailto:` draft addressed to `sales@metalfoilinc.us`. Form data is not transmitted to or stored by the website.

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

## v26 refinements
Original manufacturing hero photo restored; global map replaces only the first-pane Houston atmospheric backdrop. Jindal emblem moved into reserved header slot. Lower-section Jindal website link is not underlined by default. All Product Range data and three first-pane links remain.
