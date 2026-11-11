import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { FLOORS } from "../data/siteData";
import heroVilla from "../assets/images/hero/western-park-hero.jpg";
import { gsap, motionOk, ScrollTrigger } from "../utils/gsapSetup";

/**
 * Cinematic "blueprint to villa" sequence.
 * Desktop (no reduced-motion): pinned ScrollTrigger scrub —
 * ground plan appears, structure rises, first & second plans align,
 * then the completed villa is revealed with a golden flash.
 * Mobile / reduced motion: graceful stacked layout.
 */
export default function BlueprintReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${motionOk} and (min-width: 900px)`, () => {
      const section = ref.current;
      const stage = section.querySelector(".bp-stage");
      const label = section.querySelector(".bp-hud-label");
      const fill = section.querySelector(".bp-hud-track i");
      stage.classList.add("is-pinned");
      section.classList.add("is-live");

      const hud = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=340%",
        onUpdate: (self) => {
          const p = self.progress;
          const text =
            p < 0.16
              ? "01 — The Blueprint"
              : p < 0.4
              ? "02 — Structure Rises"
              : p < 0.66
              ? "03 — Floors Align"
              : "04 — The Residence, Complete";
          if (label.dataset.t !== text) {
            label.dataset.t = text;
            label.textContent = text;
          }
          fill.style.width = `${Math.min(100, p * 100).toFixed(1)}%`;
        },
      });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=340%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set([".bp-first", ".bp-second", ".bp-villa"], { autoAlpha: 0 });
        gsap.set(".bp-villa", { scale: 1.06 });

        tl.fromTo(".bp-ground", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1 })
          .to({}, { duration: 0.35 })
          .to(".bp-ground", { yPercent: 26, autoAlpha: 0.55, duration: 0.9 })
          .fromTo(".bp-first", { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 1.1 }, "<")
          .to({}, { duration: 0.3 })
          .fromTo(".bp-second", { autoAlpha: 0, yPercent: -40 }, { autoAlpha: 1, yPercent: -26, duration: 1.1 })
          .to({}, { duration: 0.45 })
          .to(".bp-tower", { scale: 0.6, yPercent: -36, autoAlpha: 0, duration: 1.1 })
          .fromTo(".bp-villa", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<")
          .to(".bp-villa", { scale: 1, duration: 1.6, ease: "power2.out" }, "<")
          .to({}, { duration: 0.6 });
      }, section);

      return () => {
        ctx.revert();
        hud.kill();
        stage.classList.remove("is-pinned");
        section.classList.remove("is-live");
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="bp" ref={ref} aria-label="From blueprint to residence">
      <div className="container-lux bp-head">
        <div>
          <SectionHeading
            kicker="The Transformation"
            title={
              <>
                From <em>blueprint</em> to residence
              </>
            }
          />
        </div>
        <p className="bp-note">
          An artistic sequence using the original east-facing brochure plans — ground, first and second level — followed
          by the original villa render. It is not a 3D reconstruction.
        </p>
      </div>

      <div className="container-lux">
        <div className="bp-stage">
          <div className="bp-tower">
            <div className="bp-plan bp-ground">
              <img src={FLOORS[0].images.east} alt="East-facing ground floor plan — 1,260 square feet" />
              <p className="bp-caption">Ground Floor · 745 Sft.</p>
            </div>
            <div className="bp-plan bp-first">
              <img src={FLOORS[1].images.east} alt="East-facing first floor plan — 1,195 square feet" />
              <p className="bp-caption">First Floor · 1,195 Sft.</p>
            </div>
            <div className="bp-plan bp-second">
              <img src={FLOORS[2].images.east} alt="East-facing second floor plan — 745 square feet" />
              <p className="bp-caption">Second Floor · 1,260 Sft.</p>
            </div>
          </div>

          <div className="bp-villa">
            <img src={heroVilla} alt="Western Park east-facing villa render from the project brochure" />
            <div className="bp-villa-veil" aria-hidden="true" />
            <div className="bp-villa-caption">
              <h3>WESTERN PARK</h3>
              <p>Where Aspirations Reside!</p>
            </div>
          </div>

          <div className="bp-hud" aria-hidden="true">
            <div className="bp-hud-track">
              <i />
            </div>
            <span className="bp-hud-label">01 — The Blueprint</span>
          </div>
        </div>
      </div>
    </section>
  );
}
