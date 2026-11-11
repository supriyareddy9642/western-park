import { useEffect, useRef } from "react";
import villaEast from "../assets/images/villas/villa-east.jpg";
import { gsap, motionOk } from "../utils/gsapSetup";

const STATS = [
  { end: 204, unit: "Sq. Yds · Plot" },
  { end: 3200, unit: "Sq. Ft · Built-up" },
  { end: 3, unit: "Levels of Living" },
  { end: 12, unit: "Community Amenities" },
];

export default function Story() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".story-statement, .story-copy p, .story-sign",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: ".story-grid", start: "top 78%" },
          }
        );
        gsap.fromTo(
          ".story-figure img",
          { clipPath: "inset(14% 10% 14% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { trigger: ".story-figure", start: "top 75%" },
          }
        );
        gsap.fromTo(
          ".stat",
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".stats", start: "top 85%" },
          }
        );
        gsap.utils.toArray(".stat-num").forEach((el) => {
          const target = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString("en-IN");
            },
          });
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="story" id="story" ref={ref}>
      <div className="container-lux">
        <div className="story-grid">
          <div className="story-lead">
            <p className="kicker">The Western Park Story</p>
            <h2 className="story-statement">
              A place crafted not just for living, but for the way you <em>imagine</em> living.
            </h2>
            <div className="story-copy">
              <p>
                Western Park rises in Shankarpally, Hyderabad — a considered address of three-level private villas by
                Concrete Infra and Developers. Every line, level and opening is composed around a single intention: that
                a family's aspirations find their true address.
              </p>
              <p>
                Three full levels of 3,200 square feet unfold across a 204 square yard plot — offered in both east-facing
                and west-facing orientations — within a landscaped community of parks, courts and a private clubhouse.
              </p>
            </div>
            <p className="story-sign">— Concrete Infra and Developers</p>
          </div>
          <figure className="story-figure">
            <img src={villaEast} alt="East-facing Western Park villa from the project brochure" />
            <figcaption>East-Facing Villa · Brochure Render</figcaption>
          </figure>
        </div>

        <div className="stats" role="list" aria-label="Western Park at a glance">
          {STATS.map((s) => (
            <div className="stat" role="listitem" key={s.unit}>
              <span className="stat-num" data-count={s.end}>
                {s.end.toLocaleString("en-IN")}
              </span>
              <span className="stat-unit">{s.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
