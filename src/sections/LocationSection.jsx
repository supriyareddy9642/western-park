import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { LANDMARKS } from "../data/siteData";
import { gsap, motionOk } from "../utils/gsapSetup";

export default function LocationSection() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".loc-li",
          { x: -26, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.09,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: ".loc-list", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".radar-node",
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "back.out(2)",
            scrollTrigger: { trigger: ".loc-radar", start: "top 75%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="loc" id="location" ref={ref}>
      <div className="container-lux loc-grid">
        <div>
          <SectionHeading
            kicker="Location Advantages"
            title={
              <>
                In the middle of <em>everything</em>
              </>
            }
            sub="Shankarpally places Western Park within easy reach of the city's leading schools, campuses, retail districts and green space."
          />
          <div className="loc-list">
            {LANDMARKS.map((l) => (
              <div className="loc-li" key={l.name}>
                <span className="loc-dot" aria-hidden="true" />
                <div>
                  <h4>{l.name}</h4>
                  <p>{l.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="loc-note">
            Landmarks as referenced in the project brochure. Distances and travel times are not stated here — your site
            visit team will walk you through the site and its surroundings.
          </p>
        </div>

        <div className="loc-radar" role="img" aria-label="Illustrative map of Western Park with nearby landmarks">
          <span className="radar-ring r1" aria-hidden="true" />
          <span className="radar-ring r2" aria-hidden="true" />
          <span className="radar-ring r3" aria-hidden="true" />
          <div className="radar-sweep" aria-hidden="true" />
          <div className="radar-center">
            <b aria-hidden="true">WP</b>
            <span>Western Park</span>
          </div>
          {LANDMARKS.map((l) => (
            <span
              key={l.name}
              className={`radar-node ${l.side === "left" ? "left" : ""}`}
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
            >
              <span>{l.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
