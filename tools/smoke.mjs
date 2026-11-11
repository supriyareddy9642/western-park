// Mounts the full component tree (effects excluded) to catch render-time crashes.
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true }, logLevel: "error" });
try {
  const mod = await vite.ssrLoadModule("/src/App.jsx");
  const App = mod.default;
  const html = renderToString(createElement(App));
  const checks = {
    "hero title": html.includes("WESTERN"),
    "tagline": html.includes("Where Aspirations Reside"),
    "blueprint": html.includes("bp-stage"),
    "story stats": html.includes("stat-num"),
    "floor tabs": html.includes("floor-tab"),
    "amenities index": html.includes("amen-li"),
    "clubhouse": html.includes("club-li"),
    "specs accordion": html.includes("spec-item"),
    "radar": html.includes("radar-node"),
    "developer cards": html.includes("dev-card"),
    "gallery": html.includes("g-item"),
    "enquiry steps": html.includes("enq-panel"),
    "brochure book": html.includes("book-cover"),
    "footer": html.includes("footer-legal"),
    "whatsapp fab": html.includes("wp-fab"),
  };
  let fail = 0;
  for (const [k, v] of Object.entries(checks)) {
    console.log(v ? `  ok  ${k}` : `FAIL  ${k}`);
    if (!v) fail++;
  }
  console.log(fail === 0 ? "SMOKE PASS — tree renders, " + html.length + " chars" : `SMOKE FAIL (${fail})`);
  process.exitCode = fail === 0 ? 0 : 1;
} finally {
  await vite.close();
}
