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
