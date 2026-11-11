import { useEffect, useRef } from "react";
import {
  FaBellConcierge,
  FaChampagneGlasses,
  FaDumbbell,
  FaMusic,
  FaSpa,
  FaUserGroup,
} from "react-icons/fa6";
import { CLUB_FACILITIES, CLUB_THUMBS, PROJECT_MEDIA } from "../data/siteData";
import { scrollToId } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";

const ICONS = {
  concierge: FaBellConcierge,
  users: FaUserGroup,
  music: FaMusic,
  champagne: FaChampagneGlasses,
  dumbbell: FaDumbbell,
  spa: FaSpa,
};

export default function Clubhouse({ onBrochure }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.to(".club-band img", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: ".club-band", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.fromTo(
          ".club-li",
          { x: 30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.09,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".club-list", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".club-thumbs figure",
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".club-thumbs", start: "top 82%" },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="club" id="clubhouse" ref={ref}>
      <div className="club-band">
        <img src={PROJECT_MEDIA.clubhouseExterior} alt="Western Park clubhouse exterior from the project brochure" loading="lazy" />
        <div className="club-band-veil" aria-hidden="true" />
        <div className="container-lux club-band-cap">
          <h2>The Clubhouse</h2>
          <p>Where the community gathers — and celebrates</p>
        </div>
      </div>

      <div className="container-lux club-content">
        <div className="club-grid">
          <div>
            <p className="kicker">Clubhouse Experience</p>
            <h3 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
              Six spaces, one <em>address</em>
            </h3>
            <div className="club-list">
              {CLUB_FACILITIES.map((f) => {
                const Icon = ICONS[f.icon];
                return (
                  <div className="club-li" key={f.name}>
                    <span className="club-ico" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h4>{f.name}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="club-thumbs">
              {CLUB_THUMBS.map((t) => (
                <figure key={t.cap}>
                  <img src={t.img} alt={`${t.cap} at the Western Park clubhouse`} loading="lazy" />
                  <figcaption>{t.cap}</figcaption>
                </figure>
              ))}
            </div>
            <div className="club-cta">
              <button className="btn-lux btn-gold" onClick={() => scrollToId("enquiry")}>
                Book a Private Site Visit
              </button>
              <button className="btn-lux btn-ghost" onClick={onBrochure}>
                Download Project Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
