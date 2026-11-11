# Western Park — Local Asset Inventory

All project imagery in this React build is extracted from the user-provided
`A4 Broucher V4_compressed.pdf`. No stock photography or AI-generated property
images are used. The brochure PDF is also bundled locally at
`public/documents/Western-Park-Brochure.pdf`.

## Local image folders

- `src/assets/images/brand/`
  - `brochure-cover.jpg` — rendered from brochure page 1
  - `western-park-logo.webp` and `western-park-emblem.png` — cropped from the
    original Western Park mark on brochure page 1
- `src/assets/images/hero/`
  - `western-park-hero.jpg` — villa exterior, brochure page 8
- `src/assets/images/villas/`
  - `villa-east.jpg`, `villa-west.jpg` — villa elevations, brochure pages 8 and 10
  - `community-view.jpg` — villa avenue, brochure page 10
- `src/assets/images/floor-plans/`
  - `ground-floor-plan.jpg`, `first-floor-plan.jpg`, `second-floor-plan.jpg` — east-facing plans, page 9
  - `west-ground-floor.jpg`, `west-first-floor.jpg`, `west-second-floor.jpg` — west-facing plans, page 11
- `src/assets/images/master-plan/master-plan.jpg` — master plan, page 3
- `src/assets/images/interiors/`
  - living, drawing, kitchen, dining, master-bedroom, children's-bedroom and home-theatre images, pages 12–15
- `src/assets/images/amenities/`
  - landscaped lawn, walkways, amphitheatre, skating rink, seating, children's play area and basketball court, pages 4–7
- `src/assets/images/clubhouse/`
  - clubhouse exterior, reception, conference room, multipurpose hall, banquet hall, gym and yoga, pages 16–19
- `src/assets/images/developer/`
  - four completed-project images, brochure page 23

## Brochure limitations

The brochure does not contain separate photographs/renders for a guest bedroom
or an indoor-games room, so those two unsupported gallery entries were omitted
rather than filled with unrelated or generated imagery. The brochure also does
not provide dedicated images for every amenity named in its master-plan legend
(e.g. pool, tennis and badminton courts); those remain represented by text.
