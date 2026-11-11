/** Smoothly scroll to a section id (respects reduced-motion). */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Indian-format number. */
export const fmt = (n) => n.toLocaleString("en-IN");

/** Basic 10-digit Indian mobile check (allows +91 / 91 prefixes). */
export function isValidMobile(value) {
  const digits = String(value).replace(/\D/g, "");
  return (digits.length === 10 && /^[6-9]/.test(digits)) || (digits.length === 12 && digits.startsWith("91"));
}

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
