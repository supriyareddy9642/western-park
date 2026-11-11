import { useEffect, useRef } from "react";
import { gsap, motionOk } from "../utils/gsapSetup";

/**
 * Shared luxury section heading — kicker, Playfair title, glowing gold line.
 * Self-animating; honours prefers-reduced-motion.
 */
export default function SectionHeading({ kicker, title, sub, center = false, light = false, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current.querySelectorAll(".sh-anim"),
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 82%" },
          }
        );
        gsap.fromTo(
          ref.current.querySelector(".sh-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.2,
            scrollTrigger: { trigger: ref.current, start: "top 82%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={`sh ${center ? "sh-center" : ""} ${light ? "sh-light" : ""} ${className}`}>
      <p className="kicker sh-anim">{kicker}</p>
      <h2 className="section-title sh-anim">{title}</h2>
      <div className="gold-line sh-line" aria-hidden="true" />
      {sub && <p className="section-sub sh-anim" style={center ? { marginInline: "auto" } : undefined}>{sub}</p>}
    </div>
  );
}
