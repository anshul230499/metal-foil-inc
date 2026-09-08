# Metal Foil Inc. Website

Static GitHub/Vercel website for Metal Foil Inc.

## Deploy
1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. Import the repository into Vercel.
4. Framework preset: **Other / Static**. No build command is required.

## Current commercial content
- ASTM Grades: 321, 304, 309
- Roll lengths: 25', 50', 100', 900', and custom made
- Thickness: 0.002"
- Width: 20"
- Steel origin: U.S. and overseas
- Baytown stock:
  - Grade 321: 21 rolls, 100' x 20" x 0.002", DFARS Yes
  - Grade 304: 7 rolls, 100' x 20" x 0.002", DFARS No

## RFQ behavior
The **Prepare an RFQ** button uses a `mailto:` link generated in JavaScript. It opens the visitor's default mail client addressed to `sales@metalfoilinc.us`. No form data is transmitted or stored by the website.

Edge condition is optional and is omitted from the email body when left blank. Surface Finish has been removed. The Origin / Compliance selector offers No Preference, US, and DFARS.

## Certificates
Certificate cards use embedded Google document viewer frames in full certificate-page proportions so the complete first page is visible rather than cropped. The original document can be opened from each card.


## Visual identity / motion
- Original folded-foil MFI mark in the header and footer
- MFI-specific hero collage using credited alternate JMA manufacturing banners
- Scroll-in reveals, floating hero imagery, card lift effects, and animated CTA/certificate buttons
- Motion respects the visitor's reduced-motion accessibility preference
