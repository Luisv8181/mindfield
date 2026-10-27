import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const template = fs.readFileSync(path.join(root, "template.html"), "utf8");
const engine = fs.readFileSync(path.join(root, "engine.js"), "utf8");
const out = path.join(root, "site");
fs.mkdirSync(out, { recursive: true });

export const TOPICS = [
  { slug: "anxiety", name: "Anxiety", line: "When the alarm gets loud. A protective signal that can become too sensitive, and how to slow it.", color: "#d9431c" },
  { slug: "ocd", name: "OCD", line: "More than neatness. How doubt, rituals, and relief form a loop, and how ERP helps.", color: "#e5482e" },
  { slug: "ptsd", name: "PTSD", line: "A trauma response pattern. Intrusions, avoidance, hyperarousal, and widening the present.", color: "#c23c1a" },
  { slug: "bipolar", name: "Bipolar I and II", line: "When the frequency shifts. Mania, hypomania, depression, mixed states, and the circadian anchor.", color: "#2f3fb8" },
  { slug: "psychosis", name: "Psychosis", line: "When reality breaches. Salience, symptoms, how to support someone, and grounding.", color: "#d6246e" },
  { slug: "eating", name: "Eating disorders", line: "More than food. Patterns, the cycle, warning signs, and recovery.", color: "#3f7351" }
];

const footer = (current) => `<footer class="sitefoot">
  <span class="sf-label">More topics</span>
  <ul class="sf-list">
${TOPICS.filter(t => t.slug !== current).map(t => `    <li><a href="${t.slug}.html"><b>${t.name}</b><span>${t.line}</span></a></li>`).join("\n")}
  </ul>
  <p class="sf-fine"><a href="index.html">All topics</a> · If you are in immediate danger, contact local emergency services. In the USA and Canada, call or text 988.</p>
</footer>`;
const brand = (name) => `<a class="brand" href="index.html">Mind Field</a><span class="brand-sub">/ ${name}</span>`;

const only = process.argv[2];
for (const slug of fs.readdirSync(path.join(root, "sites"))) {
  if (only && only !== slug) continue;
  const dir = path.join(root, "sites", slug);
  const c = (await import(pathToFileURL(path.join(dir, "content.mjs")).href)).default;
  const scenes = fs.readFileSync(path.join(dir, "scenes.js"), "utf8");
  const vars = Object.entries(c.vars).map(([k, v]) => `  --${k}:${v};`).join("\n");
  const nav = c.chapters.filter(ch => ch.nav).map(ch => `    <a href="#${ch.id}" data-i="${ch.index}">${ch.nav}</a>`).join("\n");
  const chapters = c.chapters.map((ch, i) => `  <section class="chapter${ch.short ? " short" : ""}" id="${ch.id}" data-scene="${i}">
    <div class="col">
      <span class="label">${ch.label}</span>
${ch.html}
    </div>
  </section>`).join("\n\n");
  const site = { count: c.count, size: c.size, seed: c.seed, palette: c.palette, fontLoad: c.fontLoad, displayFont: c.displayFont, pacers: c.pacers || null };
  const html = template
    .replace("{{SCHEME}}", c.scheme || "dark").replace("{{TITLE}}", c.title).replace("{{FONTS_HREF}}", c.fontsHref)
    .replace("{{VARS}}", vars).replace("{{BRAND}}", () => brand(c.brand))
    .replace("{{NAV}}", nav).replace("{{CHAPTERS}}", chapters).replace("{{FOOTER}}", () => footer(slug))
    .replace("{{SITE_JSON}}", () => JSON.stringify(site))
    .replace("{{ENGINE}}", () => engine).replace("{{SCENES}}", () => scenes);
  fs.writeFileSync(path.join(out, `${slug}.html`), html);
  console.log("built", slug, (html.length / 1024).toFixed(1) + " KB");
}

/* hand-built pages: PTSD and the hub */
if (!only || only === "ptsd") {
  let p = fs.readFileSync(path.join(root, "custom", "ptsd.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "custom", "sitefoot.css"), "utf8");
  p = p.replace('<a class="brand" href="#home">PTSD</a>', brand("PTSD"))
    .replace("</style>", css + "\n</style>")
    .replace("</main>", "</main>\n" + footer("ptsd").replace('<footer class="sitefoot">', '<footer class="sitefoot" style="position:relative;z-index:2">'));
  fs.writeFileSync(path.join(out, "ptsd.html"), p);
  console.log("built ptsd", (p.length / 1024).toFixed(1) + " KB");
}
if (!only || only === "index") {
  const hub = fs.readFileSync(path.join(root, "custom", "index.html"), "utf8")
    .replace("{{TOPICS}}", TOPICS.map((t, i) => `      <li><a href="${t.slug}.html" data-k="${i + 1}" style="--c:${t.color}"><span class="n">${String(i + 1)}</span><span class="tx"><b>${t.name}</b><span>${t.line}</span></span><span class="go" aria-hidden="true">Open</span></a></li>`).join("\n"))
    .replace("{{TOPIC_JSON}}", () => JSON.stringify(TOPICS.map(t => t.color)));
  fs.writeFileSync(path.join(out, "index.html"), hub);
  console.log("built index", (hub.length / 1024).toFixed(1) + " KB");
}
