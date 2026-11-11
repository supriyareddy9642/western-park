import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import { GALLERY, GALLERY_CATS } from "../data/siteData";

export default function Gallery({ openLightbox }) {
  const [cat, setCat] = useState("All");
  const items = useMemo(() => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)), [cat]);

  return (
    <section className="gallery" id="gallery">
      <div className="container-wide">
        <SectionHeading
          kicker="Project Gallery"
          title={
            <>
              Moments from <em>Western Park</em>
            </>
          }
          sub="Original project-brochure renders of the villas, interior spaces, clubhouse and landscaped community."
        />

        <div className="g-filters" role="tablist" aria-label="Gallery categories">
          {GALLERY_CATS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              className={`g-filter ${cat === c ? "active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="g-grid" key={cat}>
          {items.map((g, i) => (
            <figure
              className="g-item"
              key={g.title}
              style={{ animationDelay: `${Math.min(i * 0.06, 0.6)}s` }}
              onClick={() => openLightbox(items, i)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${g.title} in full screen`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(items, i);
                }
              }}
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
              <span className="g-veil" aria-hidden="true" />
              <span className="g-frame" aria-hidden="true" />
              <figcaption className="g-cap">
                <h4>{g.title}</h4>
                <span>{g.cat}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
