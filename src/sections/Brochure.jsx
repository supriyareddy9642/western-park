import { useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import brochureCover from "../assets/images/brand/brochure-cover.jpg";
import { gsap, motionOk } from "../utils/gsapSetup";

export default function Brochure({ onBrochure }) {
  const wrapRef = useRef(null);
  const bookRef = useRef(null);

  /* 3D book reveal + pointer tilt */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".book",
          { autoAlpha: 0, y: 60, rotationY: -32 },
          {
            autoAlpha: 1,
            y: 0,
            rotationY: -8,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: ".book-wrap", start: "top 78%" },
          }
        );
        gsap.fromTo(
          ".brochure-cta > *",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".brochure-cta", start: "top 90%" } }
        );
      }, wrapRef);
      return () => ctx.revert();
    });
    mm.add(`${motionOk} and (hover: hover)`, () => {
      const wrap = wrapRef.current;
      const book = bookRef.current;
      if (!wrap || !book) return;
      const xTo = gsap.quickTo(book, "rotationY", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(book, "rotationX", { duration: 0.7, ease: "power3.out" });
      const onMove = (e) => {
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xTo(px * 26 - 6);
        yTo(py * -16 + 4);
      };
      const onLeave = () => {
        xTo(-8);
        yTo(4);
      };
      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="brochure" id="brochure" ref={wrapRef}>
      <div className="container-lux">
        <p className="kicker kicker-center">Exclusive Brochure</p>
        <h2 className="section-title">
          Discover the <em>art</em> of elevated living
        </h2>
        <p className="section-sub" style={{ margin: "1.4rem auto 0" }}>
          Explore the architecture, lifestyle, amenities and exceptional details of Western Park through our exclusive
          project brochure.
        </p>
        <div className="gold-line" aria-hidden="true" style={{ margin: "1.8rem auto 0" }} />

        <div className="book-wrap">
          <div className="book" ref={bookRef} aria-hidden="true">
            <div className="book-spine" />
            <div className="book-cover">
              <img src={brochureCover} alt="" />
            </div>
            <div className="book-pages" />
          </div>
        </div>

        <div className="brochure-cta">
          <button className="btn-lux btn-gold" onClick={onBrochure}>
            <FaDownload /> Download Exclusive Brochure
          </button>
          <p className="brochure-meta">Architecture · Floor Plans · Amenities · Specifications</p>
        </div>
      </div>
    </section>
  );
}
