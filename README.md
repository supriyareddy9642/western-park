# Western Park - Luxury Villa Frontend

Western Park by Concrete Infra and Developers, Shankarpally, Hyderabad.

This is a frontend-only React site. It uses the official gold Western Park logo, the exact villa render shown by the client,
and the original imagery, east/west floor plans and master plan extracted from the developer's published brochure.
The visual system is based on the logo's deep navy (`#272D4B`) and warm gold (`#DFBB65`), with tonal variations of those
two colours only for website UI. Architectural and lifestyle images retain their original colours.

Source: [Developer's published brochure](https://westernpark.in/wp-content/uploads/2026/03/Western-Park-web-brochure.pdf).
It contains 25 pages, including its back cover. `ASSET_INVENTORY.md` documents each source image and any missing assets.

## Run it

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build     # outputs dist/
npm run preview   # serve the build locally
```

## Stack

- React 19 (JavaScript / JSX)
- Vite 7
- Bootstrap 5 (base utilities) + custom CSS design system
- GSAP 3 + ScrollTrigger (all animation, reduced-motion aware)
- React Icons (Font Awesome 6 set)
- Google Fonts - Playfair Display, Montserrat, Cormorant Garamond

## Structure

```
src/
  components/     Navbar, BrochureModal, Lightbox, SectionHeading, Effects (cursor glow, gold particles)
  sections/       Hero, BlueprintReveal, Story, Architecture, VillaOverview, FloorPlanExplorer,
                  Amenities, Clubhouse, Specifications, LocationSection, Developer, Gallery,
                  Enquiry, Brochure, Footer
  assets/images/  brand/ hero/ villas/ floor-plans/ interiors/ amenities/
                  clubhouse/ master-plan/ developer/
  data/           siteData.js - brochure copy, figures, gallery, contact
  utils/          api.js (MOCK service layer), gsapSetup.js, helpers.js, brochurePdf.js
public/documents/ Western-Park-Brochure.pdf (official PDF)
public/favicon.png - gold Western Park monogram on navy
```

## Source-Of-Truth Note

The published PDF labels the floor areas Ground **1,260 Sft.**, First **1,195 Sft.**, Second **745 Sft.**. The earlier
project brief swapped the ground and second-floor figures. The website follows the brochure's labels and original floor
drawings; confirm those figures with the developer before publication. The brochure does not print a RERA number, so the
website keeps that detail marked for verification. The brochure does not provide an email address, so none is invented.

## Phase 2 Integration

| File | What to replace |
| --- | --- |
| `src/utils/api.js` | Connect `submitVillaEnquiry()` / `submitBrochureLead()` to real API endpoints |
| `src/data/siteData.js` | Add developer-verified RERA number only after approval |
| `public/documents/Western-Park-Brochure.pdf` | Already the official download; replace only if the developer supplies a newer revision |

## Verified interactions

- Sticky transparent-to-navy navigation with official logo and full-screen mobile menu
- Cinematic hero (title reveal, slow zoom, gold glow, particles, scroll cue)
- Pinned blueprint → floor-stack → villa reveal (desktop; stacked fallback on mobile / reduced motion)
- Floor-plan explorer: separate brochure plans for East/West, 3 floor tabs, click-zoom panning, full-screen lightbox
- Gallery: category filters, masonry, hover zoom, premium lightbox with keyboard navigation
- Three-step enquiry: progress bar, animated step transitions, per-field validation, consent gate,
  mock submit, cinematic success state
- Brochure: original navy/gold cover, lead-capture modal, mock submit, working download of the official PDF
- Floating WhatsApp button using the phone number printed in the brochure
- `prefers-reduced-motion` respected across GSAP and CSS

The two lead forms only validate and simulate success locally. Nothing is sent, stored or emailed in Phase 1.
