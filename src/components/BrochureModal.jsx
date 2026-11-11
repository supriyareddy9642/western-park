import { useEffect, useRef, useState } from "react";
import { FaDownload, FaXmark } from "react-icons/fa6";
import brochureCover from "../assets/images/brand/brochure-cover.jpg";
import { submitBrochureLead } from "../utils/api";
import { isValidEmail, isValidMobile } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";
import { BROCHURE_PDF_URL, BROCHURE_DOWNLOAD_NAME } from "../utils/brochurePdf";

const INITIAL = { name: "", mobile: "", email: "", city: "", consent: false, promo: false };

export default function BrochureModal({ open, onClose }) {
  const [step, setStep] = useState("form");
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const panelRef = useRef(null);

  /* reset + scroll lock */
  useEffect(() => {
    if (open) {
      setStep("form");
      setData(INITIAL);
      setErrors({});
      setShowPrivacy(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* esc to close + entrance animation */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      gsap.fromTo(".modal-ov .backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
      gsap.fromTo(panelRef.current, { autoAlpha: 0, y: 36, scale: 0.97 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
      });
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      mm.revert();
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const errs = {};
    if (data.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!isValidMobile(data.mobile)) errs.mobile = "Please enter a valid 10-digit mobile number.";
    if (!isValidEmail(data.email)) errs.email = "Please enter a valid email address.";
    if (!data.consent) errs.consent = "Consent is required to process your brochure request.";
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    // MOCK SUBMISSION — no data leaves the browser in Phase 1.
    await submitBrochureLead(data);
    setSending(false);
    setStep("success");
  };

  return (
    <div className="modal-ov" role="dialog" aria-modal="true" aria-label="Western Park exclusive brochure">
      <div className="backdrop" onClick={onClose} />
      <div className="modal-panel" ref={panelRef}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FaXmark />
        </button>

        <div className="modal-left">
          <p className="kicker">Exclusive Brochure</p>
          <h3 className="modal-title">Your Exclusive Western Park Brochure</h3>
          <p className="modal-sub">Please share your details to receive the complete project brochure.</p>
          <ul className="modal-bullets">
            <li>Architecture &amp; villa orientations</li>
            <li>Ground, First &amp; Second floor plans</li>
            <li>Community amenities &amp; clubhouse</li>
            <li>Specifications &amp; location</li>
          </ul>
          <div className="modal-cover" aria-hidden="true">
            <img src={brochureCover} alt="" />
          </div>
        </div>

        <div className="modal-right">
          {step === "form" ? (
            <form onSubmit={submit} noValidate>
              <div className="fields-grid">
                <div className="field full">
                  <label htmlFor="bm-name">Full Name</label>
                  <input id="bm-name" type="text" placeholder="Your full name" value={data.name} onChange={set("name")} autoComplete="name" />
                  <span className="err-msg">{errors.name || ""}</span>
                </div>
                <div className="field">
                  <label htmlFor="bm-mobile">Mobile Number</label>
                  <input id="bm-mobile" type="tel" placeholder="10-digit mobile number" value={data.mobile} onChange={set("mobile")} autoComplete="tel" />
                  <span className="err-msg">{errors.mobile || ""}</span>
                </div>
                <div className="field">
                  <label htmlFor="bm-email">Email Address</label>
                  <input id="bm-email" type="email" placeholder="you@example.com" value={data.email} onChange={set("email")} autoComplete="email" />
                  <span className="err-msg">{errors.email || ""}</span>
                </div>
                <div className="field full">
                  <label htmlFor="bm-city">City (Optional)</label>
                  <input id="bm-city" type="text" placeholder="Your city" value={data.city} onChange={set("city")} autoComplete="address-level2" />
                </div>
              </div>

              <label className={`consent ${errors.consent ? "err" : ""}`}>
                <input type="checkbox" checked={data.consent} onChange={set("consent")} />
                <span>
                  I agree to share my contact details with Concrete Infra and Developers so they can process my brochure
                  request and contact me regarding Western Park. By continuing, you also acknowledge our{" "}
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowPrivacy((v) => !v); }}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.consent && <p className="err-msg">{errors.consent}</p>}
              {showPrivacy && (
                <div className="privacy-body">
                  Details shared through this form are used solely to respond to your Western Park enquiry and schedule
                  communications about the project. They are never sold or shared with third parties for marketing.
                  You may request correction or deletion of your details at any time by contacting the developer.
                </div>
              )}

              <label className="consent" style={{ marginTop: "1rem" }}>
                <input type="checkbox" checked={data.promo} onChange={set("promo")} />
                <span>
                  (Optional) I would also like to receive updates about launches and offers from Concrete Infra and
                  Developers.
                </span>
              </label>

              <button className="btn-lux btn-gold" type="submit" style={{ width: "100%", marginTop: "1.8rem" }} disabled={sending}>
                {sending ? "Preparing your brochure…" : "Receive My Brochure"}
              </button>
              <p className="modal-footnote">
                Frontend demonstration — in this phase your details are validated on-device only and are not transmitted or
                stored. Secure lead capture and email delivery arrive in Phase 2.
              </p>
            </form>
          ) : (
            <div className="success-view">
              <div className="success-ring" aria-hidden="true">
                <svg viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="41" />
                  <path d="M28 46 l11 11 l23 -24" />
                </svg>
              </div>
              <h4>Your Western Park Brochure Is Ready</h4>
              <p>Thank you for your interest. Your exclusive project brochure is ready to explore.</p>
              <a className="btn-lux btn-gold" href={BROCHURE_PDF_URL} download={BROCHURE_DOWNLOAD_NAME}>
                <FaDownload /> Download PDF Now
              </a>
              <p className="demo-note">
                This is the official project brochure. Your details were validated locally and were not sent or stored.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
