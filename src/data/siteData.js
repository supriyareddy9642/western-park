/* Western Park project information and imagery from the developer's published brochure. */

import groundPlan from "../assets/images/floor-plans/ground-floor-plan.jpg";
import firstPlan from "../assets/images/floor-plans/first-floor-plan.jpg";
import secondPlan from "../assets/images/floor-plans/second-floor-plan.jpg";
import westGroundPlan from "../assets/images/floor-plans/west-ground-floor.jpg";
import westFirstPlan from "../assets/images/floor-plans/west-first-floor.jpg";
import westSecondPlan from "../assets/images/floor-plans/west-second-floor.jpg";
import heroVilla from "../assets/images/hero/western-park-hero.jpg";
import villaEast from "../assets/images/villas/villa-east.jpg";
import villaWest from "../assets/images/villas/villa-west.jpg";
import communityView from "../assets/images/villas/community-view.jpg";
import livingRoom from "../assets/images/interiors/living-room.jpg";
import drawingRoom from "../assets/images/interiors/drawing-room.jpg";
import kitchen from "../assets/images/interiors/kitchen.jpg";
import diningRoom from "../assets/images/interiors/dining-room.jpg";
import masterBedroom from "../assets/images/interiors/master-bedroom.jpg";
import childrensBedroom from "../assets/images/interiors/childrens-bedroom.jpg";
import homeTheatre from "../assets/images/interiors/home-theatre.jpg";
import masterPlan from "../assets/images/master-plan/master-plan.jpg";
import landscapedLawn from "../assets/images/amenities/landscaped-lawn.jpg";
import walkways from "../assets/images/amenities/walkways.jpg";
import amphitheatre from "../assets/images/amenities/amphitheatre.jpg";
import skatingRink from "../assets/images/amenities/skating-rink.jpg";
import seatingAreas from "../assets/images/amenities/seating-areas.jpg";
import childrensPlay from "../assets/images/amenities/childrens-play.jpg";
import basketballCourt from "../assets/images/amenities/basketball-court.jpg";
import clubhouseExterior from "../assets/images/clubhouse/clubhouse-exterior.webp";
import reception from "../assets/images/clubhouse/reception.jpg";
import conferenceRoom from "../assets/images/clubhouse/conference-room.jpg";
import banquetHall from "../assets/images/clubhouse/banquet-hall.jpg";
import multipurposeHall from "../assets/images/clubhouse/multipurpose-hall.jpg";
import gym from "../assets/images/clubhouse/gym.jpg";
import yoga from "../assets/images/clubhouse/yoga.jpg";
import completed1 from "../assets/images/developer/completed-1.jpg";
import completed2 from "../assets/images/developer/completed-2.jpg";
import completed3 from "../assets/images/developer/completed-3.jpg";
import completed4 from "../assets/images/developer/completed-4.jpg";

export const CONTACT = {
  developer: "Concrete Infra and Developers",
  phone: "+91 881 881 23 24",
  secondaryPhone: "+91 888 599 95 12",
  whatsapp: "918818812324",
  website: "https://www.concreteinfradevelopers.com",
  address: "Sansai Marvel Building, 4th Floor, Plot No. 23, Narsingh, Gandipet, RR Dist. 500075. Opposite Rockwell International School, Kokapet.",
  rera: "RERA No.: subject to verification by the developer prior to publication",
};

export const NAV_LINKS = [
  { label: "Explore Villas", href: "#villas" },
  { label: "Floor Plans", href: "#floor-plans" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export const VILLA = {
  name: "Western Park",
  tagline: "Where Aspirations Reside!",
  location: "Shankarpally, Hyderabad",
  plotArea: "204 Sq. Yds.",
  ground: 745,
  first: 1195,
  second: 1260,
  total: 3200,
  facings: ["East-facing", "West-facing"],
};

export const FLOORS = [
  { id: "ground", label: "Ground Floor", area: "745 Sft.", images: { east: groundPlan, west: westGroundPlan } },
  { id: "first", label: "First Floor", area: "1,195 Sft.", images: { east: firstPlan, west: westFirstPlan } },
  { id: "second", label: "Second Floor", area: "1,260 Sft.", images: { east: secondPlan, west: westSecondPlan } },
];

export const PROJECT_MEDIA = {
  clubhouseExterior,
  reception,
  conferenceRoom,
  banquetHall,
  multipurposeHall,
  gym,
  yoga,
};

export const AMENITIES = [
  "Amphitheatre",
  "Landscaped Lawn",
  "Children's Play Area",
  "Outdoor Gym",
  "Skating Rink",
  "Sand Pit",
  "Badminton Court",
  "Tennis Court",
  "Half Basketball Court",
  "Water Feature",
  "Swimming Pool",
  "Walkways & Seating Areas",
];

export const MOSAIC = [
  { img: landscapedLawn, name: "Landscaped Lawn", sub: "Open space to unwind", alt: "Western Park landscaped lawn render" },
  { img: amphitheatre, name: "Amphitheatre", sub: "A place to gather", alt: "Western Park amphitheatre render" },
  { img: skatingRink, name: "Skating Rink", sub: "Space to move", alt: "Western Park skating area render" },
  { img: childrensPlay, name: "Children's Play Area", sub: "Made for little explorers", alt: "Western Park children's play area render" },
  { img: basketballCourt, name: "Half Basketball Court", sub: "Play every day", alt: "Western Park basketball court render" },
  { img: seatingAreas, name: "Walkway & Seating", sub: "A pause along the way", alt: "Western Park landscaped seating area render" },
];

export const CLUB_FACILITIES = [
  { icon: "concierge", name: "Reception", desc: "A courteous first impression as you arrive at the residents' clubhouse." },
  { icon: "users", name: "Conference Room", desc: "A considered space for family meetings, work and private gatherings." },
  { icon: "music", name: "Multipurpose Hall", desc: "Flexible halls that adapt to celebrations, classes and community events." },
  { icon: "champagne", name: "Banquet Hall", desc: "An elegant venue for weddings, receptions and milestone evenings." },
  { icon: "dumbbell", name: "Gym", desc: "A fully equipped fitness floor for residents of every age." },
  { icon: "spa", name: "Yoga", desc: "A quiet, light-filled studio for morning practice and mindfulness." },
];

export const CLUB_THUMBS = [
  { img: banquetHall, cap: "Banquet Hall" },
  { img: gym, cap: "Gym" },
  { img: yoga, cap: "Yoga" },
  { img: conferenceRoom, cap: "Conference Room" },
];

export const SPECS = [
  {
    n: "01",
    cat: "Structure & Plastering",
    items: [
      "RCC framed structure with red clay brick",
      "Internal: sand faced cement plastering",
      "External: double coat cement plastering",
    ],
  },
  {
    n: "02",
    cat: "Flooring & Dado",
    items: [
      "Drawing, living, dining, dry kitchen and common areas: imported natural marble flooring as per selection",
      "All bedrooms: superior quality large-size vitrified tiles of reputed make / laminated wooden flooring of reputed make",
      "Staircase: imported natural marble flooring as per approved design",
      "Wet kitchen: anti-skid superior quality vitrified tiles; toilets: anti-skid large-size vitrified tile",
    ],
  },
  {
    n: "03",
    cat: "Toilets",
    items: [
      "Sanitary ware: Toto / Villeroy & Boch / reputed European make washbasins and wall-hung EWC with concealed flush tank",
      "Faucets: Hansgrohe / Toto or equivalent in all toilets",
      "Counters: granite or imported marble in all toilets",
    ],
  },
  {
    n: "04",
    cat: "Doors & Windows",
    items: [
      "Main door: teakwood frame with designer wooden main door and premium designer hardware fittings",
      "Internal doors: teakwood frame with flush shutter in veneer finish and hardware of reputed make",
      "Door hardware: Hafele / Yale / Dorma or equivalent",
      "Windows and French doors: aluminium frame with toughened glass of reputed make",
    ],
  },
  {
    n: "05",
    cat: "Utility & Wet Kitchen",
    items: [
      "Provision for washing machine / dishwasher (subject to design)",
      "Granite counter with single-bowl stainless steel sink",
      "Provision for water purifier / RO unit",
      "Two-foot vitrified tile dado above granite counter",
    ],
  },
  {
    n: "06",
    cat: "Paint & Finishes",
    items: [
      "Exterior: two coats of exterior emulsion paint with textured finish as per approved design",
      "Interior: two coats of premium emulsion paint over smooth putty finish",
    ],
  },
  {
    n: "07",
    cat: "Plumbing & Water",
    items: [
      "Hydro-pneumatic system for water supply",
      "Water treatment to potable water standards",
      "Recycling and reuse of sewage water for gardening",
      "Rainwater recharge system / water metering",
    ],
  },
  {
    n: "08",
    cat: "Electrical & Power",
    items: [
      "Fire-retardant low-smoke wires of reputed make (Finolex / RR Kabel or equivalent)",
      "Modular switches of reputed make (Schneider / Legrand or equivalent)",
      "LED light fixtures in common areas; power distribution through underground cabling",
      "100% backup with DG sets; normal and DG power metered through energy meters",
    ],
  },
  {
    n: "09",
    cat: "Elevator & Connectivity",
    items: [
      "Provision for lift / home elevators",
      "Clubhouse and common areas with Wi-Fi connectivity",
    ],
  },
  {
    n: "10",
    cat: "Security & Landscaping",
    items: [
      "CCTV in identified common areas and clubhouse with monitoring from security / maintenance office",
      "Boom barriers with long-range readers at entry and exit",
      "Barbed-wire security fence on the compound wall",
      "Professionally planned landscape and designer streetlights as per approved design",
    ],
  },
];

export const LANDMARKS = [
  { name: "Indus International School", note: "Education for the younger generation", x: 50, y: 12, side: "right" },
  { name: "Outer Ring Road", note: "City-wide connectivity", x: 83, y: 31, side: "right" },
  { name: "Neopolis", note: "Resident & retail district", x: 83, y: 69, side: "right" },
  { name: "Gandipet Eco Park", note: "Green open space nearby", x: 50, y: 88, side: "right" },
  { name: "ICFAI Business School", note: "A distinguished academic address", x: 17, y: 69, side: "left" },
  { name: "Gandipet Lake", note: "A serene natural landmark", x: 17, y: 31, side: "left" },
];

export const PROJECTS = [
  { name: "Concrete Palazzo", city: "Nacharam", status: "Completed", mono: "CP", image: completed1 },
  { name: "Maithry Signature", city: "Lingampalli", status: "Completed", mono: "MS", image: completed2 },
  { name: "Concrete Sangeeth", city: "Manikonda", status: "Completed", mono: "CS", image: completed3 },
  { name: "Concrete Melody", city: "Chandanagar", status: "Completed", mono: "CM", image: completed4 },
  { name: "Citadel", city: "Visakhapatnam", status: "Ongoing", mono: "CI" },
];

export const GALLERY = [
  { src: heroVilla, title: "Villa Exterior", cat: "Villas", alt: "Western Park east-facing villa exterior render" },
  { src: villaEast, title: "East-Facing Elevation", cat: "Villas", alt: "Western Park east-facing villa perspective" },
  { src: villaWest, title: "West-Facing Elevation", cat: "Villas", alt: "Western Park west-facing villa perspective" },
  { src: communityView, title: "Villa Avenue", cat: "Villas", alt: "Western Park villa avenue render" },
  { src: livingRoom, title: "Living Area", cat: "Interiors", alt: "Western Park living area render" },
  { src: drawingRoom, title: "Drawing Area", cat: "Interiors", alt: "Western Park drawing room render" },
  { src: kitchen, title: "Kitchen", cat: "Interiors", alt: "Western Park kitchen render" },
  { src: diningRoom, title: "Dining Area", cat: "Interiors", alt: "Western Park dining area render" },
  { src: masterBedroom, title: "Master Bedroom", cat: "Interiors", alt: "Western Park master bedroom render" },
  { src: childrensBedroom, title: "Children's Bedroom", cat: "Interiors", alt: "Western Park children's bedroom render" },
  { src: homeTheatre, title: "Home Theatre", cat: "Interiors", alt: "Western Park home theatre render" },
  { src: clubhouseExterior, title: "The Clubhouse", cat: "Clubhouse", alt: "Western Park clubhouse exterior render" },
  { src: reception, title: "Reception", cat: "Clubhouse", alt: "Western Park clubhouse reception render" },
  { src: banquetHall, title: "Banquet Hall", cat: "Clubhouse", alt: "Western Park banquet hall render" },
  { src: gym, title: "Gym", cat: "Clubhouse", alt: "Western Park clubhouse gym render" },
  { src: yoga, title: "Yoga", cat: "Clubhouse", alt: "Western Park yoga room render" },
  { src: landscapedLawn, title: "Landscaped Lawn", cat: "Amenities", alt: "Western Park lawn render" },
  { src: amphitheatre, title: "Amphitheatre", cat: "Amenities", alt: "Western Park amphitheatre render" },
  { src: childrensPlay, title: "Children's Play Area", cat: "Amenities", alt: "Western Park children's play area render" },
  { src: basketballCourt, title: "Basketball Court", cat: "Amenities", alt: "Western Park half basketball court render" },
  { src: walkways, title: "Walkways", cat: "Amenities", alt: "Western Park landscaped walkway render" },
  { src: masterPlan, title: "Community Master Plan", cat: "Architectural", alt: "Community master plan illustration" },
  { src: groundPlan, title: "East-Facing Ground Plan", cat: "Architectural", alt: "East-facing ground floor plan from the project brochure" },
  { src: westGroundPlan, title: "West-Facing Ground Plan", cat: "Architectural", alt: "West-facing ground floor plan from the project brochure" },
];

export const GALLERY_CATS = ["All", "Villas", "Interiors", "Clubhouse", "Amenities", "Architectural"];

export const TIME_SLOTS = [
  "Morning · 9:00 – 11:00",
  "Midday · 11:00 – 1:00",
  "Afternoon · 2:00 – 4:00",
  "Evening · 5:00 – 7:00",
];
