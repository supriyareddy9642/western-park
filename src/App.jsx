import { useCallback, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import BrochureModal from "./components/BrochureModal";
import { CursorGlow } from "./components/Effects";
import Lightbox from "./components/Lightbox";
import Navbar from "./components/Navbar";
import { CONTACT } from "./data/siteData";
import Amenities from "./sections/Amenities";
import Architecture from "./sections/Architecture";
import BlueprintReveal from "./sections/BlueprintReveal";
import Brochure from "./sections/Brochure";
import Clubhouse from "./sections/Clubhouse";
import Developer from "./sections/Developer";
import Enquiry from "./sections/Enquiry";
import FloorPlanExplorer from "./sections/FloorPlanExplorer";
import Footer from "./sections/Footer";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import LocationSection from "./sections/LocationSection";
import Specifications from "./sections/Specifications";
import Story from "./sections/Story";
import VillaOverview from "./sections/VillaOverview";
import { AMENITIES } from "./data/siteData";
import { ScrollTrigger } from "./utils/gsapSetup";

const WA_TEXT = encodeURIComponent(
  "Hello! I would like to enquire about the villas at Western Park, Shankarpally, Hyderabad."
);

export default function App() {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const openBrochure = useCallback(() => setBrochureOpen(true), []);
  const closeBrochure = useCallback(() => setBrochureOpen(false), []);
  const openLightbox = useCallback((items, index) => setLightbox({ items, index }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const navLightbox = useCallback(
    (index) => setLightbox((s) => (s ? { ...s, index } : s)),
    []
  );

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="wp-root">
      <CursorGlow />
      <Navbar onBrochure={openBrochure} />

      <main>
        <Hero onBrochure={openBrochure} />
        <BlueprintReveal />
        <Story />

        {/* amenity marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <span className="mq-item" key={dup}>
                {AMENITIES.map((a) => (
                  <span key={`${dup}-${a}`} style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {a}
                    <span className="mq-diamond" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <Architecture onBrochure={openBrochure} />
        <VillaOverview onBrochure={openBrochure} />
        <FloorPlanExplorer openLightbox={openLightbox} />
        <Amenities />
        <Clubhouse onBrochure={openBrochure} />
        <Specifications onBrochure={openBrochure} />
        <LocationSection />
        <Developer />
        <Gallery openLightbox={openLightbox} />
        <Enquiry />
        <Brochure onBrochure={openBrochure} />
      </main>

      <Footer onBrochure={openBrochure} />

      <a
        className="wp-fab"
        href={`https://wa.me/${CONTACT.whatsapp}?text=${WA_TEXT}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <BrochureModal open={brochureOpen} onClose={closeBrochure} />
      {lightbox && (
        <Lightbox items={lightbox.items} index={lightbox.index} onClose={closeLightbox} onNavigate={navLightbox} />
      )}
    </div>
  );
}
