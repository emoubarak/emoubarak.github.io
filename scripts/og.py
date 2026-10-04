#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["websockets", "pillow"]
# ///
"""Share images (Open Graph, 1200×630) for every page and article.

    ./scripts/og.py            # rebuilds public/og/*.png and public/og/blog/<slug>.png

Each card is scripts/og-card.html filled with the page's title and its real images (captures, CV pages, the
article's cover), rendered in headless Chrome. The home card (public/og.png) comes from scripts/og.html.
Run it again after adding or renaming an article.
"""
import asyncio, base64, functools, glob, http.server, json, os, re, shutil, subprocess, sys, tempfile, threading, time
from pathlib import Path
from urllib.parse import quote

import websockets
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"


def chrome():
    for c in sorted(glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell"))) or []:
        return c
    for b in ("google-chrome-stable", "google-chrome", "chromium", "chromium-browser"):
        if shutil.which(b):
            return shutil.which(b)
    sys.exit("no Chrome found (set CHROME=/path)")


def aspect(public_path):
    """height / width of an image under public/ (SVG: from its viewBox)."""
    f = ROOT / "public" / public_path.lstrip("/")
    if f.suffix == ".svg":
        w, h = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', f.read_text()).groups())
        return h / w
    with Image.open(f) as im:
        return im.height / im.width


def frontmatter(md):
    head, body = md.split("---", 2)[1:]
    get = lambda k: (m.group(1) if (m := re.search(rf'^{k}:\s*"?(.*?)"?\s*$', head, re.M)) else None)
    return {"title": get("title"), "cover": get("cover"), "draft": get("draft") == "true",
            "tags": re.findall(r'"([^"]+)"', get("tags") or ""), "minutes": max(2, round(len(body.split()) / 230))}


def cards():
    p = "/public"
    yield "portfolio", {
        "eyebrow": "moubarak.dev/portfolio", "title": "Built and shipped",
        "sub": "SaaS products, web apps, e-commerce stores and mobile apps I designed, built and shipped.",
        "foot": "El Mahdi Moubarak",
        "images": [
            {"src": f"{p}/portfolio/ai-visibility-store.webp", "w": 400, "x": 760, "y": 70, "r": 5},
            {"src": f"{p}/portfolio/pdfold-home.webp", "w": 400, "x": 660, "y": 150, "r": -5},
            {"src": f"{p}/portfolio/piktechs-home.webp", "w": 420, "x": 730, "y": 300, "r": 2},
        ],
    }
    yield "cv", {
        "eyebrow": "moubarak.dev/cv", "title": "Curriculum vitae",
        "sub": "Founder & Full-Stack Engineer · Software, SaaS & AI. PDF in English and French.",
        "foot": "El Mahdi Moubarak",
        "images": [
            {"src": f"{p}/cv-fr-page.webp", "w": 290, "x": 730, "y": 70, "r": -7},
            {"src": f"{p}/cv-en-page.webp", "w": 310, "x": 860, "y": 50, "r": 4},
        ],
    }
    yield "blog", {
        "eyebrow": "moubarak.dev/blog", "title": "Notes from the work",
        "sub": "Case studies from real projects, and what building with AI every day taught me.",
        "foot": "El Mahdi Moubarak",
        "images": [
            {"src": f"{p}/blog/scanner-pipeline.svg", "w": 480, "x": 670, "y": 90, "r": -5},
            {"src": f"{p}/blog/fix-ladder.svg", "w": 480, "x": 700, "y": 300, "r": 4},
        ],
    }
    for f in sorted((ROOT / "src/content/blog").glob("*.md")):
        fm = frontmatter(f.read_text())
        if fm["draft"]:
            continue
        case = "Case Study" in fm["tags"]
        card = {
            "eyebrow": ("Case study" if case else "Article") + " · moubarak.dev",
            "title": re.sub(r"^Case Study:\s*", "", fm["title"]).replace('\\"', '"'),
            "foot": f"El Mahdi Moubarak · {fm['minutes']} min read",
            "titleSize": 70,
            "textWidth": 560,
            "images": [],
        }
        if fm["cover"]:
            w = 470
            h = w * aspect(fm["cover"])
            card["images"].append({"src": p + fm["cover"], "w": w, "x": 680, "y": round((630 - h) / 2), "r": -3})
        yield f"blog/{f.stem}", card


async def render(items, port):
    prof = tempfile.mkdtemp()
    proc = subprocess.Popen([os.environ.get("CHROME") or chrome(), "--headless=new", "--remote-debugging-port=0", f"--user-data-dir={prof}",
                             "--no-first-run", "--hide-scrollbars", "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        pf = Path(prof) / "DevToolsActivePort"
        for _ in range(100):
            if pf.exists() and pf.read_text().strip():
                break
            time.sleep(0.1)
        dport, path = pf.read_text().split()[:2]
        async with websockets.connect(f"ws://127.0.0.1:{dport}{path}", max_size=None) as ws:
            n = 0

            async def call(method, params=None, session=None):
                nonlocal n
                n += 1
                msg = {"id": n, "method": method, "params": params or {}}
                if session:
                    msg["sessionId"] = session
                await ws.send(json.dumps(msg))
                while True:
                    d = json.loads(await ws.recv())
                    if d.get("id") == n:
                        if "error" in d:
                            raise RuntimeError(d["error"])
                        return d.get("result", {})

            target = (await call("Target.createTarget", {"url": "about:blank"}))["targetId"]
            s = (await call("Target.attachToTarget", {"targetId": target, "flatten": True}))["sessionId"]
            await call("Emulation.setDeviceMetricsOverride", {"width": 1200, "height": 630, "deviceScaleFactor": 1, "mobile": False}, s)
            await call("Page.enable", {}, s)
            for name, card in items:
                url = f"http://127.0.0.1:{port}/scripts/og-card.html?{time.time()}#" + quote(json.dumps(card))
                await call("Page.navigate", {"url": url}, s)
                await asyncio.sleep(0.4)
                await call("Runtime.evaluate", {"expression": "document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode().catch(() => 0))))", "awaitPromise": True}, s)
                size = (await call("Runtime.evaluate", {"expression": "fit()", "returnByValue": True}, s))["result"]["value"]
                await asyncio.sleep(0.2)
                shot = await call("Page.captureScreenshot", {"format": "png"}, s)
                dst = OUT / f"{name}.png"
                dst.parent.mkdir(parents=True, exist_ok=True)
                dst.write_bytes(base64.b64decode(shot["data"]))
                print(f"{name:42} title {size}px  {dst.stat().st_size // 1024} KB")
    finally:
        proc.terminate()
        shutil.rmtree(prof, ignore_errors=True)


def main():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    handler = functools.partial(Quiet, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        asyncio.run(render(list(cards()), server.server_address[1]))
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
