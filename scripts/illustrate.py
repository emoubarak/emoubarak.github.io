#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["websockets", "pillow"]
# ///
"""Portfolio illustrations: what a project does, drawn in HTML/SVG, rendered at 1440×900 @2x.

    ./scripts/illustrate.py [name ...]      # names: files in scripts/illustrations/*.html

Writes public/portfolio/<name>-illustration.webp; scripts/thumbs.py then frames it like the other cards.
The Polymarket curves are real: refresh them with scripts/illustrations/polymarket_runs.py.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from PIL import Image
from shoot import ROOT, shoot

# each page sets window.ready once drawn; give up after 10 s so a broken page fails instead of hanging
WAIT = ("new Promise(r => { const s = Date.now(); const t = setInterval(() => {"
        " if (window.ready || Date.now() - s > 10000) { clearInterval(t); r(!!window.ready); } }, 50); })")

names = sys.argv[1:] or [p.stem for p in sorted((ROOT / "scripts/illustrations").glob("*.html"))]
tmp = ROOT / "scripts/illustrations/.render"
jobs = [(f"/scripts/illustrations/{n}.html", tmp / f"{n}.png", WAIT) for n in names]
ready = shoot(jobs, 1440, 900, scale=2)
for n, ok in zip(names, ready):
    if not ok:
        sys.exit(f"{n}: the page never set window.ready (open it in a browser and read the console)")
for n in names:
    dst = ROOT / "public/portfolio" / f"{n}-illustration.webp"
    Image.open(tmp / f"{n}.png").convert("RGB").save(dst, "WEBP", quality=86, method=6)
    (tmp / f"{n}.png").unlink()
    print(f"{n:16} -> {dst.relative_to(ROOT)}  {dst.stat().st_size // 1024} KB")
tmp.rmdir()
