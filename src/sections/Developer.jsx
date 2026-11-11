import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { PROJECTS } from "../data/siteData";
import { gsap, motionOk } from "../utils/gsapSetup";

export default function Developer() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".dev-card",
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".dev-grid", start: "top 80%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="dev" id="developer" ref={ref}>
      <div className="container-lux">
        <div className="dev-head-row">
          <SectionHeading
            kicker="Developer Profile"
            title={
              <>
                Concrete Infra <em>&amp; Developers</em>
              </>
            }
          />
          <p className="section-sub dev-intro">
            A developer known for completing what it promises — with four landmark projects delivered and one flagship in
            progress in Visakhapatnam.
          </p>
        </div>

        <div className="dev-grid">
          {PROJECTS.map((p) => (
            <article className="dev-card" key={p.name}>
              <span className={`dev-badge ${p.status === "Completed" ? "done" : "ongoing"}`}>{p.status}</span>
              {p.image ? (
                <img className="dev-project-image" src={p.image} alt={`${p.name} in ${p.city}`} loading="lazy" />
              ) : (
                <div className="dev-mono" aria-hidden="true">{p.mono}</div>
              )}
              <h4>{p.name}</h4>
              <p className="dev-city">{p.city}</p>
            </article>
          ))}
        </div>

        <p className="dev-note">Completed-project images are from the developer's brochure. Citadel imagery is not included in the brochure.</p>
      </div>
    </section>
  );
}
