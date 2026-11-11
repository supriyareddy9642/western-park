import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { gsap, motionOk } from "../utils/gsapSetup";

/** Premium full-screen image viewer. */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      gsap.fromTo(".lb img", { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" });
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      mm.revert();
    };
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button className="lb-close" aria-label="Close viewer" onClick={onClose}>
        <FaXmark />
      </button>
      <button
        className="lb-btn lb-prev"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + items.length) % items.length);
        }}
      >
        <FaChevronLeft />
      </button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt || item.title} />
        <figcaption>
          <span style={{ order: 2 }}>{item.tag || item.cat}</span>
          <em style={{ fontStyle: "normal", order: 1 }}>{item.title}</em>
        </figcaption>
      </figure>
      <button
        className="lb-btn lb-next"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % items.length);
        }}
      >
        <FaChevronRight />
      </button>
      <div className="lb-count">
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </div>
    </div>
  );
}
