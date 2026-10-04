#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["websockets", "pillow"]
# ///
"""Share images (Open Graph, 1200×630) for every page and article.

    ./scripts/og.py            # rebuilds public/og/home.png, public/og/*.png and public/og/blog/<slug>.png

Each card is scripts/og-card.html filled with the page's title and its real images (captures, CV pages, the
article's cover), rendered in headless Chrome. The home card (public/og/home.png) comes from scripts/og.html.
A changed image should get a new file name: platforms cache share images by URL.
Run it again after adding or renaming an article.
"""
import json, re, sys
from pathlib import Path
from urllib.parse import quote

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from shoot import shoot

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"


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
            {"src": f"{p}/portfolio/ksur-home.webp", "w": 400, "x": 760, "y": 70, "r": 5},
            {"src": f"{p}/portfolio/altao-og.webp", "w": 410, "x": 655, "y": 160, "r": -5},
            {"src": f"{p}/portfolio/piktechs-og.webp", "w": 430, "x": 725, "y": 330, "r": 2},
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


def render(items):
    jobs = [(f"/scripts/og-card.html#" + quote(json.dumps(card)), OUT / f"{name}.png", "fit()") for name, card in items]
    # the home card has its own layout (name, headline, the services illustration)
    jobs.append(("/scripts/og.html", OUT / "home.png", None))
    items = items + [("home", None)]
    for (name, _), size in zip(items, shoot(jobs, 1200, 630)):
        dst = OUT / f"{name}.png"
        print(f"{name:42} " + (f"title {size}px  " if size else "") + f"{dst.stat().st_size // 1024} KB")


def main():
    render(list(cards()))


if __name__ == "__main__":
    main()
