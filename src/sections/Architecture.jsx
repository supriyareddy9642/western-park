import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import villaWest from "../assets/images/villas/villa-west.jpg";
import livingRoom from "../assets/images/interiors/living-room.jpg";
import kitchen from "../assets/images/interiors/kitchen.jpg";
import { scrollToId } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";

const ROWS = [
  {
    n: "01",
    img: villaWest,
    alt: "West-facing villa elevation from the Western Park brochure",
    title: "Orientation, composed",
    copy:
      "Every villa is offered in an east-facing or west-facing configuration, so that morning and evening light move through your home the way you want it to. Private landscaped frontage greets each elevation.",
    facts: ["East-Facing", "West-Facing", "Private Frontage"],
  },
  {
    n: "02",
    img: livingRoom,
    alt: "Living area from the Western Park project brochure",
    title: "Three levels of space",
    copy:
      "1,260 square feet on the ground floor opens into 1,195 square feet on the first and 745 square feet on the second — 3,200 square feet in all, arranged so each generation has room to breathe.",
    facts: ["1,260 Sft · Ground", "1,195 Sft · First", "745 Sft · Second"],
  },
  {
    n: "03",
    img: kitchen,
    alt: "Kitchen interior from the Western Park project brochure",
    title: "Crafted to last",
    copy:
      "A composition of quality, restraint and warm detail — the same care shown across Concrete Infra and Developers' completed projects, carried into every Western Park villa.",
    facts: ["Premium Finishes", "Detail-First Craft", "Developer Track Record"],
  },
];

export default function Architecture({ onBrochure }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray(".arch-row").forEach((row) => {
          const media = row.querySelector(".arch-media img");
          gsap.fromTo(
            row.querySelector(".arch-copy"),
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 75%" },
            }
          );
          gsap.to(media, {
            yPercent: -9,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.fromTo(
          ".arch-ctas > *",
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".arch-ctas", start: "top 90%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="arch" id="architecture" ref={ref}>
      <div className="container-lux">
        <SectionHeading
          center
          kicker="Architectural Excellence"
          title={
            <>
              Designed around the <em>life</em> inside it
            </>
          }
          sub="The Western Park villa is a study in proportion — three levels, two orientations, one uncompromising standard."
        />

        <div className="arch-rows">
          {ROWS.map((r) => (
            <div className="arch-row" key={r.n}>
              <div className="arch-media">
                <img src={r.img} alt={r.alt} loading="lazy" />
              </div>
              <div className="arch-copy">
                <div className="arch-num" aria-hidden="true">
                  {r.n}
                </div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
                <div className="arch-facts">
                  {r.facts.map((f) => (
                    <span className="arch-fact" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arch-ctas">
          <button className="btn-lux btn-gold" onClick={() => scrollToId("villas")}>
            Explore the Villas
          </button>
          <button className="btn-lux btn-ghost" onClick={onBrochure}>
            Download Project Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
