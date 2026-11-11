import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { AMENITIES, MOSAIC } from "../data/siteData";
import masterPlan from "../assets/images/master-plan/master-plan.jpg";
import { gsap, motionOk } from "../utils/gsapSetup";

export default function Amenities() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".mplan-band", { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".mplan-band", start: "top 85%" },
        });
        gsap.fromTo(
          ".m-item",
          { autoAlpha: 0, y: 40, scale: 1.04 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".amen-mosaic", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".amen-li",
          { x: -18, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: ".amen-index", start: "top 85%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="amen" id="amenities" ref={ref}>
      <div className="container-lux">
        <SectionHeading
          center
          kicker="Lifestyle Amenities"
          title={
            <>
              A park that <em>gives back</em>
            </>
          }
          sub="Discover the gardens, play spaces, sports courts and gathering places pictured in the Western Park brochure."
        />

        <div className="mplan-band">
          <img src={masterPlan} alt="Western Park community master plan — villas arranged around parks, courts and the clubhouse" loading="lazy" />
          <div className="mplan-band-veil" aria-hidden="true" />
          <div className="mplan-cap">
            <b>The Community, From Above</b>
            <span>Villas arranged around parks, courts and the clubhouse</span>
          </div>
        </div>

        <div className="amen-mosaic">
          {MOSAIC.map((m) => (
            <figure className="m-item" key={m.name}>
              <img src={m.img} alt={m.alt} loading="lazy" />
              <figcaption className="m-label">
                <b>{m.name}</b>
                <span>{m.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="amen-index">
          {AMENITIES.map((a, i) => (
            <div className="amen-li" key={a}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
