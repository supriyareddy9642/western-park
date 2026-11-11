import { useEffect, useRef, useState } from "react";
import { FaExpand, FaMinus, FaPlus } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading";
import { FLOORS } from "../data/siteData";
import { gsap, motionOk } from "../utils/gsapSetup";

const ZOOM_STEPS = [1, 1.4, 1.8, 2.3];

/** East- and west-facing floor drawings extracted from the developer's brochure. */
export default function FloorPlanExplorer({ openLightbox }) {
  const [facing, setFacing] = useState("east");
  const [floorIdx, setFloorIdx] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(0);
  const stageRef = useRef(null);
  const imgRef = useRef(null);

  const floor = FLOORS[floorIdx];

  /* plan change transition */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { autoAlpha: 0, y: 16, scale: 1.03 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
        );
      }
    });
    return () => mm.revert();
  }, [floorIdx, facing]);

  /* heading reveal */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".ex-stage",
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ex-stage", start: "top 82%" },
          }
        );
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const onStageMove = (e) => {
    const stage = stageRef.current;
    if (!stage || zoomIdx === 0) return;
    const r = stage.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    stage.style.setProperty("--ox", `${x}%`);
    stage.style.setProperty("--oy", `${y}%`);
  };

  const openFull = () => {
    openLightbox(
      FLOORS.map((f) => ({
        src: f.images[facing],
        title: `${f.label} Plan — ${f.area}`,
        tag: `Western Park · ${facing === "east" ? "East" : "West"}-Facing`,
        alt: `${facing}-facing villa ${f.label.toLowerCase()} plan`,
      })),
      floorIdx
    );
  };

  return (
    <section className="explorer" id="floor-plans">
      <div className="container-wide">
        <SectionHeading
          kicker="Floor Plan Explorer"
          title={
            <>
              Every level, <em>illuminated</em>
            </>
          }
          sub="Explore the original brochure drawings floor by floor. Select the east- or west-facing villa, then zoom in or view each level full screen."
        />

        <div className="ex-controls">
          <div className="facing-toggle" role="tablist" aria-label="Villa orientation">
            {["east", "west"].map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={facing === f}
                className={`facing-btn ${facing === f ? "active" : ""}`}
                onClick={() => setFacing(f)}
              >
                {f === "east" ? "East-Facing" : "West-Facing"}
              </button>
            ))}
          </div>

          <div className="floor-tabs" role="tablist" aria-label="Floor level">
            {FLOORS.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={floorIdx === i}
                className={`floor-tab ${floorIdx === i ? "active" : ""}`}
                onClick={() => setFloorIdx(i)}
              >
                {f.label}
                <small>{f.area}</small>
              </button>
            ))}
          </div>
        </div>

        <div
          className="ex-stage"
          ref={stageRef}
          style={{ "--zoom": ZOOM_STEPS[zoomIdx] }}
          onMouseMove={onStageMove}
          onClick={openFull}
          role="button"
          tabIndex={0}
          aria-label={`View ${floor.label} plan full screen`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFull();
            }
          }}
        >
          <span className="ex-corner tl" aria-hidden="true" />
          <span className="ex-corner tr" aria-hidden="true" />
          <span className="ex-corner bl" aria-hidden="true" />
          <span className="ex-corner br" aria-hidden="true" />

          <div className="ex-imgwrap">
            <img ref={imgRef} src={floor.images[facing]} alt={`Western Park ${facing}-facing villa — ${floor.label} plan`} />
          </div>

          <div className="ex-meta">
            <b>{floor.label}</b>
            <span>{floor.area} · Original Brochure Plan</span>
          </div>
          <div className="ex-badge">
            {facing[0].toUpperCase()}
            {facing.slice(1)}-FACING
          </div>

          <div className="ex-zoom" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Zoom out"
              disabled={zoomIdx === 0}
              onClick={() => setZoomIdx((z) => Math.max(0, z - 1))}
            >
              <FaMinus />
            </button>
            <button
              aria-label="Reset zoom"
              disabled={zoomIdx === 0}
              onClick={() => setZoomIdx(0)}
            >
              {ZOOM_STEPS[0]}
            </button>
            <button
              aria-label="Zoom in"
              disabled={zoomIdx === ZOOM_STEPS.length - 1}
              onClick={() => setZoomIdx((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))}
            >
              <FaPlus />
            </button>
            <button aria-label="View full screen" onClick={openFull}>
              <FaExpand />
            </button>
          </div>
        </div>

        <div className="ex-foot">
          <span>
            <i>◆</i> Original floor plans from the developer's brochure. Final approved drawings prevail.
          </span>
          <span>Click the plan to view full screen · Move cursor to pan while zoomed</span>
        </div>
      </div>
    </section>
  );
}
