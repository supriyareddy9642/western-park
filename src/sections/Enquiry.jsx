import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCompass, FaMoon, FaSun } from "react-icons/fa6";
import { GoldParticles } from "../components/Effects";
import heroVilla from "../assets/images/hero/western-park-hero.jpg";
import { TIME_SLOTS } from "../data/siteData";
import { submitVillaEnquiry } from "../utils/api";
import { isValidEmail, isValidMobile } from "../utils/helpers";
import { gsap, motionOk } from "../utils/gsapSetup";

const STEP_NAMES = ["Villa Preference", "Personal Details", "Private Site Visit"];

const FACING_OPTIONS = [
  { id: "east", title: "East-Facing Villa", desc: "Morning light over the living spaces.", Icon: FaSun },
  { id: "west", title: "West-Facing Villa", desc: "Evening sun and quiet garden views.", Icon: FaMoon },
  { id: "undecided", title: "Not Decided Yet", desc: "We'll walk you through both on a visit.", Icon: FaCompass },
];

const INITIAL = {
  facing: "",
  name: "",
  mobile: "",
  email: "",
  city: "",
  date: "",
  slot: "",
  message: "",
  consent: false,
};

export default function Enquiry() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [shake, setShake] = useState(false);
  const rootRef = useRef(null);
  const stepRef = useRef(null);
  const dirRef = useRef(1);

  /* section entrance */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".enq-lead > *",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".enquiry", start: "top 62%" } }
        );
        gsap.fromTo(
          ".enq-panel",
          { y: 44, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.05, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".enquiry", start: "top 62%" } }
        );
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  /* step transition */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(motionOk, () => {
      if (stepRef.current) {
        gsap.fromTo(
          stepRef.current,
          { x: 44 * dirRef.current, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }
        );
      }
    });
    return () => mm.revert();
  }, [step, done]);

  const set = (key) => (e) =>
    setData((d) => ({ ...d, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validateStep = (s) => {
    const errs = {};
    if (s === 0 && !data.facing) errs.facing = "Please choose a villa preference to continue.";
    if (s === 1) {
      if (data.name.trim().length < 2) errs.name = "Please enter your full name.";
      if (!isValidMobile(data.mobile)) errs.mobile = "Please enter a valid 10-digit mobile number.";
      if (!isValidEmail(data.email)) errs.email = "Please enter a valid email address.";
      if (data.city.trim().length < 2) errs.city = "Please enter your city.";
    }
    if (s === 2) {
      if (!data.date) errs.date = "Please choose a preferred date.";
      if (!data.slot) errs.slot = "Please choose a time slot.";
      if (!data.consent) errs.consent = "Please accept the privacy consent to submit your enquiry.";
    }
    return errs;
  };

  const fail = () => {
    setShake(true);
    setTimeout(() => setShake(false), 520);
  };

  const next = () => {
    const errs = validateStep(step);
    setErrors(errs);
    if (Object.keys(errs).length) return fail();
    dirRef.current = 1;
    setStep((s) => s + 1);
  };
  const prev = () => {
    dirRef.current = -1;
    setErrors({});
    setStep((s) => s - 1);
  };

  const submit = async () => {
    const errs = validateStep(2);
    setErrors(errs);
    if (Object.keys(errs).length) return fail();
    setSending(true);
    // MOCK SUBMISSION — Phase 1 frontend only; nothing leaves the browser.
    await submitVillaEnquiry(data);
    setSending(false);
    setDone(true);
  };

  const reset = () => {
    setData(INITIAL);
    setErrors({});
    setDone(false);
    setShowPrivacy(false);
    dirRef.current = -1;
    setStep(0);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="enquiry" id="enquiry" ref={rootRef}>
      <div className="enquiry-bg" aria-hidden="true">
        <img src={heroVilla} alt="" />
      </div>
      <div className="enq-radial" aria-hidden="true" />
      <GoldParticles density={22} />

      <div className="container-lux enq-grid">
        <div className="enq-lead">
          <p className="kicker">Exclusive Villa Enquiry</p>
          <h2 className="section-title">
            Your dream home <em>begins here</em>
          </h2>
          <p className="section-sub">
            Take the first step towards an extraordinary lifestyle. Share your preferences and our dedicated team will
            assist you with your villa selection and private site visit.
          </p>
          <ul className="enq-points">
            <li>Dedicated villa selection support</li>
            <li>Private site visit scheduling</li>
            <li>Brochure &amp; floor-plan walk-through</li>
          </ul>
          {/* <p className="enq-demo-note">
            Frontend phase — submissions are validated on-device only and are not transmitted or stored. Secure delivery
            arrives with Phase 2.
          </p> */}
        </div>

        <div className={`enq-panel ${shake ? "shake" : ""}`}>
          {done ? (
            <div className="success-view">
              <div className="success-ring" aria-hidden="true">
                <svg viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="41" />
                  <path d="M28 46 l11 11 l23 -24" />
                </svg>
              </div>
              <h4>Enquiry Preview Complete</h4>
              <p>
                Thank you, {data.name.split(" ")[0] || "future resident"}. Your selections passed the on-device preview.
                No site visit has been requested from the developer yet.
              </p>
              <button className="btn-lux btn-ghost" onClick={reset}>
                Submit Another Enquiry
              </button>
              <p className="demo-note">
                Demo phase — this submission was simulated on-device only. No details were sent to the developer or
                stored anywhere. Real enquiry handling is connected in Phase 2.
              </p>
            </div>
          ) : (
            <>
              <div className="enq-progress">
                <div className="enq-p-head">
                  <b>
                    Step {step + 1} of 3
                  </b>
                  <span>{STEP_NAMES[step]}</span>
                </div>
                <div className="enq-bar" aria-hidden="true">
                  <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
                </div>
              </div>

              <div className="enq-step" ref={stepRef} key={done ? "done" : `step-${step}`}>
                {step === 0 && (
                  <>
                    <h3 className="enq-step-title">
                      Select your <em>villa preference</em>
                    </h3>
                    <div className="facing-cards">
                      {FACING_OPTIONS.map((f) => {
                        const Icon = f.Icon;
                        return (
                          <label className={`fc ${data.facing === f.id ? "selected" : ""}`} key={f.id}>
                            <input type="radio" name="facing" value={f.id} checked={data.facing === f.id} onChange={set("facing")} />
                            <span className="fc-ico" aria-hidden="true">
                              <Icon />
                            </span>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                          </label>
                        );
                      })}
                    </div>
                    <p className="form-msgs">{errors.facing || ""}</p>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3 className="enq-step-title">
                      Tell us <em>about yourself</em>
                    </h3>
                    <div className="fields-grid">
                      <div className={`field ${errors.name ? "err" : ""}`}>
                        <label htmlFor="eq-name">Full Name</label>
                        <input id="eq-name" type="text" placeholder="Your full name" value={data.name} onChange={set("name")} autoComplete="name" />
                        <span className="err-msg">{errors.name || ""}</span>
                      </div>
                      <div className={`field ${errors.mobile ? "err" : ""}`}>
                        <label htmlFor="eq-mobile">Mobile Number</label>
                        <input id="eq-mobile" type="tel" placeholder="10-digit mobile number" value={data.mobile} onChange={set("mobile")} autoComplete="tel" />
                        <span className="err-msg">{errors.mobile || ""}</span>
                      </div>
                      <div className={`field ${errors.email ? "err" : ""}`}>
                        <label htmlFor="eq-email">Email Address</label>
                        <input id="eq-email" type="email" placeholder="you@example.com" value={data.email} onChange={set("email")} autoComplete="email" />
                        <span className="err-msg">{errors.email || ""}</span>
                      </div>
                      <div className={`field ${errors.city ? "err" : ""}`}>
                        <label htmlFor="eq-city">City</label>
                        <input id="eq-city" type="text" placeholder="Your city" value={data.city} onChange={set("city")} autoComplete="address-level2" />
                        <span className="err-msg">{errors.city || ""}</span>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="enq-step-title">
                      Plan your <em>private site visit</em>
                    </h3>
                    <div className="fields-grid">
                      <div className={`field ${errors.date ? "err" : ""}`}>
                        <label htmlFor="eq-date">Preferred Date</label>
                        <input id="eq-date" type="date" min={today} value={data.date} onChange={set("date")} />
                        <span className="err-msg">{errors.date || ""}</span>
                      </div>
                      <div className={`field ${errors.slot ? "err" : ""}`}>
                        <label htmlFor="eq-slot">Preferred Time Slot</label>
                        <select id="eq-slot" value={data.slot} onChange={set("slot")}>
                          <option value="">Choose a time slot</option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <span className="err-msg">{errors.slot || ""}</span>
                      </div>
                      <div className="field full">
                        <label htmlFor="eq-msg">Additional Message (Optional)</label>
                        <textarea id="eq-msg" placeholder="Anything you'd like our team to know…" value={data.message} onChange={set("message")} />
                      </div>
                    </div>

                    <label className={`consent ${errors.consent ? "err" : ""}`}>
                      <input type="checkbox" checked={data.consent} onChange={set("consent")} />
                      <span>
                        I have read and agree to the{" "}
                        <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowPrivacy((v) => !v); }}>
                          Privacy Policy
                        </a>{" "}
                        and consent to the use of my personal information for responding to my villa enquiry.
                      </span>
                    </label>
                    {errors.consent && <p className="err-msg">{errors.consent}</p>}
                    {showPrivacy && (
                      <div className="privacy-body">
                        Details shared through this form are used solely to respond to your Western Park villa enquiry —
                        villa selection, site-visit scheduling and related communications. They are never sold or shared
                        with third parties for marketing. You may request correction or deletion of your details at any
                        time by contacting the developer.
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="enq-nav">
                <button className="btn-lux btn-ghost" onClick={prev} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
                  <FaArrowLeft /> Previous
                </button>
                {step < 2 ? (
                  <button className="btn-lux btn-gold" onClick={next}>
                    Continue <FaArrowRight />
                  </button>
                ) : (
                  <button className="btn-lux btn-gold" onClick={submit} disabled={sending}>
                    {sending ? "Submitting…" : "Submit My Villa Enquiry"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
