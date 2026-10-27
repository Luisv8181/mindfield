import sys, pathlib, time
from playwright.sync_api import sync_playwright

slug = sys.argv[1]
w = int(sys.argv[2]) if len(sys.argv) > 2 else 1280
h = int(sys.argv[3]) if len(sys.argv) > 3 else 760
hovers = sys.argv[4:]  # "chapterId=selector"
out = pathlib.Path(__file__).resolve().parent / "shots"
out.mkdir(exist_ok=True)
url = f"http://localhost:8770/{slug}.html"

with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"])
    pg = b.new_page(viewport={"width": w, "height": h})
    logs = []
    pg.on("console", lambda m: logs.append(f"{m.type}: {m.text}") if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: logs.append(f"pageerror: {e}"))
    pg.goto(url, wait_until="networkidle")
    time.sleep(2.5)
    ids = pg.eval_on_selector_all(".chapter", "els => els.map(e => e.id)")
    if not hovers:
        for i, cid in enumerate(ids):
            pg.evaluate(f"""() => {{ const s=document.getElementById('{cid}'); window.scrollTo(0, s.offsetTop + Math.min(s.offsetHeight*0.5 - innerHeight*0.5 + 80, 200)); }}""")
            time.sleep(3.2)
            pg.screenshot(path=str(out / f"{slug}-{i}-{cid}.png"))
    else:
        for hv in hovers:
            cid, sel = hv.split("=", 1)
            pg.evaluate(f"""() => {{ const s=document.getElementById('{cid}'); window.scrollTo(0, s.offsetTop + Math.min(s.offsetHeight*0.5 - innerHeight*0.5 + 80, 200)); }}""")
            time.sleep(2.8)
            pg.hover(sel)
            time.sleep(1.4)
            name = sel.replace("[", "").replace("]", "").replace('"', "").replace("=", "-").replace(":", "-").replace(" ", "")
            pg.screenshot(path=str(out / f"{slug}-hover-{cid}-{name}.png"))
    print("chapters:", ids)
    print("logs:", logs[:10])
    b.close()
