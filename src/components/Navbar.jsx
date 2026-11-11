import { useEffect, useState } from "react";
import logo from "../assets/images/brand/western-park-logo.webp";
import { NAV_LINKS } from "../data/siteData";
import { scrollToId } from "../utils/helpers";

export default function Navbar({ onBrochure }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
        <div className="nav-inner">
          <a
            className="brand"
            href="#home"
            aria-label="Western Park — home"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToId("home");
            }}
          >
            <img className="brand-logo" src={logo} alt="Western Park" />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                className="nav-link"
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href.slice(1));
                }}
              >
                {l.label}
              </a>
            ))}
            <span className="nav-cta-group">
              <button className="btn-lux btn-ghost" onClick={onBrochure}>
                Download Brochure
              </button>
              <button className="btn-lux btn-gold" onClick={() => go("enquiry")}>
                Reserve Your Villa
              </button>
            </span>
          </nav>

          <button
            className={`hamburger ${open ? "open" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav className="mm-links" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: `${0.08 * i + 0.12}s` }}
              aria-hidden={!open}
              tabIndex={open ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                go(l.href.slice(1));
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#brochure"
            style={{ transitionDelay: "0.55s" }}
            aria-hidden={!open}
            tabIndex={open ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onBrochure();
            }}
          >
            Download Brochure <small>PDF</small>
          </a>
          <a
            href="#enquiry"
            style={{ transitionDelay: "0.62s" }}
            aria-hidden={!open}
            tabIndex={open ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              go("enquiry");
            }}
          >
            Reserve Your Villa <small>ENQUIRY</small>
          </a>
        </nav>
        <p className="mm-foot">Concrete Infra and Developers — Shankarpally, Hyderabad</p>
      </div>
    </>
  );
}
