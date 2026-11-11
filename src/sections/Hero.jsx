import { useEffect, useRef } from "react";
import heroVilla from "../assets/images/hero/western-park-hero.jpg";
import heroVideo from "../assets/videos/western-park-video.mp4";
import emblem from "../assets/images/brand/western-park-emblem.png";
import { GoldParticles } from "../components/Effects";
import { VILLA } from "../data/siteData";
import { scrollToId } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";

export default function Hero({ onBrochure }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(".hero-img", { scale: 1.18 }, { scale: 1.02, duration: 3.4, ease: "power2.out" })
          .fromTo(".hero-emblem, .hero-kicker", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.14, duration: 0.8 }, 0.35)
          .fromTo(
            ".hero-title .line > span",
            { yPercent: 112 },
            { yPercent: 0, duration: 1.2, stagger: 0.14, ease: "power4.out" },
            0.5
          )
          .fromTo(".hero-tagline", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 1.25)
          .fromTo(".hero-ctas > *", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.8 }, 1.5)
          .fromTo(".hero-scroll, .hero-side", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 2.1);
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={ref} aria-label="Western Park — where aspirations reside">
      <div className="hero-media">
        <img className="hero-img" src={heroVilla} alt="Western Park luxury villa exterior from the official project brochure" fetchPriority="high" />
      </div>
      {/* <video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
>
  <source src={heroVideo} type="video/mp4" />
</video> */}
      <div className="hero-veil" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <GoldParticles density={34} />

      <div className="hero-content">
        <img className="hero-emblem" src={emblem} alt="" aria-hidden="true" />
        <p className="kicker hero-kicker">Concrete Infra &amp; Developers Presents</p>
        <h1 className="hero-title">
          <span className="line">
            <span>WESTERN</span>
          </span>
          <span className="line">
            <span>PARK</span>
          </span>
        </h1>
        <p className="hero-tagline">“{VILLA.tagline}”</p>
        <div className="hero-ctas">
          <button className="btn-lux btn-gold" onClick={() => scrollToId("villas")}>
            Explore the Villas
          </button>
          <button className="btn-lux btn-ghost" onClick={onBrochure}>
            Download Project Brochure
          </button>
          {/* <button className="btn-link" onClick={() => scrollToId("enquiry")}>
            Book a Private Site Visit
          </button> */}
        </div>
      </div>

      <div className="hero-side" aria-hidden="true">
        {VILLA.location}
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
