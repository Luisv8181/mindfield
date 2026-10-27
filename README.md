# Mind Field

Interactive guides to how anxiety, OCD, PTSD, bipolar disorder, psychosis, and eating disorders work, what keeps them going, and what helps. Each page pairs its text with a Three.js particle field that changes shape to match the content.

## Pages

| Page | File | Notes |
|---|---|---|
| Home | site/index.html | Hub page; the field morphs to each topic's shape on hover. |
| Anxiety | site/anxiety.html | Includes a 4-4-6-2 guided breath pacer. |
| OCD | site/ocd.html | Ink-on-paper style with engraved line work. |
| PTSD | site/ptsd.html | Hand-built page; moves from night to dawn as you scroll; hold-to-ground interaction. |
| Bipolar I and II | site/bipolar.html | Circadian and down-shift pacers. |
| Psychosis | site/psychosis.html | 5-4-3-2-1 grounding and vagus pacers. |
| Eating disorders | site/eating.html | Abstract forms only; no bodies, food, or numbers. |
| A Mind That Found Itself, Chapter I | site/beers.html | Trial page for Clifford Beers's 1908 book (public domain); not yet linked from the home page. |

## View it locally

The pages link to each other, so serve the site folder over HTTP rather than opening the files directly. Opened as plain files, links between pages may not work.

```bash
python -m http.server 8770 --directory site
```

Then open http://localhost:8770 in a browser.

The pages load Three.js from the jsDelivr CDN and fonts from Google Fonts, so an internet connection is needed.

## Build

The topic pages are generated. Run this from the repository root (needs Node.js):

```bash
node build.mjs
```

It writes all pages into site/. To build one page, pass its folder name. For example: `node build.mjs ocd`.

## Project layout

- engine.js: shared particle engine (scroll-driven scenes, hover targets, pacers, line layer).
- template.html: page shell and shared CSS for generated pages.
- lib.mjs: HTML helpers used by the content files.
- sites/<topic>/content.mjs: a topic's text, palette, fonts, and pacer settings.
- sites/<topic>/scenes.js: a topic's particle scenes, one per chapter.
- custom/: hand-built pages (index.html hub, ptsd.html) and the shared footer CSS.
- build.mjs: builds everything into site/.
- shoot.py: optional Playwright screenshot script for checking pages (needs a local server on port 8770 and the playwright Python package).

## Adding a topic

1. Create sites/<slug>/ with content.mjs and scenes.js. The number of scenes must equal the number of chapters.
2. Add the topic to the TOPICS list in build.mjs so it appears on the home page and in footers.
3. Run node build.mjs and check the page over a local server.

## Content and safety

- The pages are educational and are not a diagnosis tool or a substitute for care from a qualified professional.
- Clinical content was adapted from the original microsite source files and has not been reviewed by a clinician.
- Crisis lines shown on some pages (988 in the USA and Canada, 741741 Crisis Text Line, 111 in the UK, 13 11 14 in Australia) should be checked before publishing.
- Calm motion reduces animation and is on by default when the system asks for reduced motion.
