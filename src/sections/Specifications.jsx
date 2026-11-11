import { useEffect, useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import { SPECS } from "../data/siteData";

export default function Specifications({ onBrochure }) {
  const [openIdx, setOpenIdx] = useState(0);
  const bodyRefs = useRef([]);

  useEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (el) el.style.maxHeight = i === openIdx ? `${el.scrollHeight}px` : "0px";
    });
  }, [openIdx]);

  return (
    <section className="specs" id="specifications">
      <div className="container-lux specs-cols">
        <div className="specs-aside">
          <SectionHeading
            kicker="Premium Specifications"
            title={
              <>
                Built on <em>substance</em>
              </>
            }
            sub="Structural integrity, premium finishes and considered provisions — the specification sheet that sits behind every Western Park villa."
          />
          <button className="btn-lux btn-ghost" onClick={onBrochure}>
            Full Specifications in Brochure
          </button>
        </div>

        <div className="spec-acc">
          {SPECS.map((s, i) => (
            <div className={`spec-item ${openIdx === i ? "open" : ""}`} key={s.n}>
              <button
                className="spec-head"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <span className="n" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.cat}</h3>
                <span className="spec-plus" aria-hidden="true" />
              </button>
              <div className="spec-body" ref={(el) => (bodyRefs.current[i] = el)}>
                <div className="spec-inner">
                  <div className="spec-chips">
                    {s.items.map((it) => (
                      <span className="spec-chip" key={it}>
                        {it}
                      </span>
                    ))}
                  </div>
                  <p className="spec-note">As per the official brochure — final finishes subject to developer's approval.</p>
                </div>
              </div>
            </div>
          ))}
          <p className="specs-footnote">
            Specifications are presented as per the project brochure and are indicative. Where the brochure states "or
            equivalent", the developer may supply an equivalent material or brand. This section is a frontend preview of the
            brochure's specification sheet.
          </p>
        </div>
      </div>
    </section>
  );
}
