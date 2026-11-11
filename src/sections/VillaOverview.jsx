import { useEffect, useRef } from "react";
import { FaArrowRight, FaMoon, FaSun } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading";
import heroVilla from "../assets/images/hero/western-park-hero.jpg";
import { VILLA } from "../data/siteData";
import { fmt, scrollToId } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";

const BARS = [
  { label: "Ground Floor", value: VILLA.ground },
  { label: "First Floor", value: VILLA.first },
  { label: "Second Floor", value: VILLA.second },
];

const SPECS = [
  { label: "Plot Area", value: VILLA.plotArea },
  { label: "Total Built-up", value: `${fmt(VILLA.total)} Sft.` },
  { label: "Levels", value: "Three" },
  { label: "Configurations", value: "East & West Facing" },
  { label: "Location", value: VILLA.location },
];

export default function VillaOverview({ onBrochure }) {
  const ref = useRef(null);
  const max = Math.max(...BARS.map((b) => b.value));

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".villa-media img",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: ".villa-media", start: "top 75%" },
          }
        );
        gsap.fromTo(
          ".fb-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: { trigger: ".floor-bars", start: "top 82%" },
          }
        );
        gsap.fromTo(
          ".spec-row",
          { x: -22, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ".spec-rows", start: "top 85%" },
          }
        );
        gsap.fromTo(
          ".facing-card",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".villa-facings", start: "top 88%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="villa" id="villas" ref={ref}>
      <div className="container-lux villa-grid">
        <div className="villa-media">
          <img src={heroVilla} alt="Western Park villa exterior from the developer's brochure" />
          <div className="villa-media-cap">
            <b>3,200</b>
            <span>Sq. Ft. Built-up</span>
          </div>
        </div>

        <div className="villa-lead">
          <SectionHeading
            kicker="Villa Overview"
            title={
              <>
                The Western Park <em>villa</em>
              </>
            }
          />
          <p className="section-sub">
            A complete three-level home on a 204 square yard plot in Shankarpally, Hyderabad — measured for the way
            families actually live.
          </p>

          <div className="floor-bars" aria-label="Built-up area by floor">
            {BARS.map((b) => (
              <div className="fb-row" key={b.label}>
                <div className="fb-head">
                  <span>{b.label}</span>
                  <span className="fb-val">{fmt(b.value)} Sft.</span>
                </div>
                <div className="fb-track" role="presentation">
                  <i className="fb-fill" style={{ width: `${(b.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="spec-rows">
            {SPECS.map((s) => (
              <div className="spec-row" key={s.label}>
                <span>{s.label}</span>
                <b>{s.value}</b>
              </div>
            ))}
          </div>

          <div className="villa-facings">
            <div className="facing-card">
              <FaSun aria-hidden="true" />
              <div>
                <b>East-Facing</b>
                <small>Morning light, garden &amp; street presence</small>
              </div>
            </div>
            <div className="facing-card">
              <FaMoon aria-hidden="true" />
              <div>
                <b>West-Facing</b>
                <small>Evening sun &amp; courtyard calm</small>
              </div>
            </div>
          </div>

          <div className="villa-ctas">
            <button className="btn-lux btn-gold" onClick={() => scrollToId("floor-plans")}>
              Explore Floor Plans <FaArrowRight />
            </button>
            <button className="btn-lux btn-ghost" onClick={onBrochure}>
              Download Project Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
