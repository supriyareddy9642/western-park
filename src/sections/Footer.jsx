import { FaGlobe, FaLocationDot, FaPhone } from "react-icons/fa6";
import logo from "../assets/images/brand/western-park-logo.webp";
import { CONTACT, NAV_LINKS } from "../data/siteData";
import { scrollToId } from "../utils/helpers";

export default function Footer({ onBrochure }) {
  const year = new Date().getFullYear();

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#home" aria-label="Western Park, back to top" onClick={go("home")}>
              <img className="brand-logo" src={logo} alt="Western Park" />
            </a>
            <p className="f-tagline">Where Aspirations Reside!</p>
            <p className="f-blurb">
              Three-level luxury villas by {CONTACT.developer} — 3,200 Sq. Ft. of considered living on 204 Sq. Yd. plots
              in Shankarpally, Hyderabad.
            </p>
          </div>

          <nav aria-label="Footer">
            <h4 className="f-h">Explore</h4>
            {NAV_LINKS.map((l) => (
              <a key={l.href} className="f-link" href={l.href} onClick={go(l.href.slice(1))}>
                {l.label}
              </a>
            ))}
            <a className="f-link" href="#specifications" onClick={go("specifications")}>
              Specifications
            </a>
            <a className="f-link" href="#developer" onClick={go("developer")}>
              Developer
            </a>
            <a className="f-link" href="#brochure" onClick={onBrochure}>
              Download Brochure
            </a>
          </nav>

          <div>
            <h4 className="f-h">Reserve</h4>
            <a className="f-link" href="#enquiry" onClick={go("enquiry")}>
              Villa Enquiry
            </a>
            <a className="f-link" href="#enquiry" onClick={go("enquiry")}>
              Book a Private Site Visit
            </a>
            <a className="f-link" href="#floor-plans" onClick={go("floor-plans")}>
              Floor Plans
            </a>
            <div className="footer-cta">
              <button className="btn-lux btn-gold" onClick={() => scrollToId("enquiry")}>
                Reserve Your Villa
              </button>
            </div>
          </div>

          <div>
            <h4 className="f-h">Contact</h4>
            <ul className="f-contact">
              <li>
                <FaPhone aria-hidden="true" />
                <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}>{CONTACT.phone}</a>
              </li>
              <li>
                <FaPhone aria-hidden="true" />
                <a href={`tel:${CONTACT.secondaryPhone.replace(/\D/g, "")}`}>{CONTACT.secondaryPhone}</a>
              </li>
              <li>
                <FaGlobe aria-hidden="true" />
                <a href={CONTACT.website} target="_blank" rel="noreferrer">Developer Website</a>
              </li>
              <li>
                <FaLocationDot aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <p className="rera-note">{CONTACT.rera}.</p>
          <p>
            Disclaimer: Architectural renders and images are for illustrative purposes and may not represent the actual
            size, features, specifications, fittings or furnishings. Areas, materials and drawings are approximate and
            subject to change at the developer's discretion. Refer to the official brochure and approved documents for
            final details. This frontend demonstration does not transmit or store enquiry information.
          </p>
          <div className="f-copy">
            <p>© {year} {CONTACT.developer}. All rights reserved.</p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
