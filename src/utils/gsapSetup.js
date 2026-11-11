import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** GSAP matchMedia condition for all motion (honours reduced-motion). */
export const motionOk = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
