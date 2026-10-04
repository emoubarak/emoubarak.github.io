#!/usr/bin/env python3
"""Project thumbnails: every image shown whole on a tinted field, same frame for all.

  python3 scripts/thumbs.py            # rebuilds public/work/*.webp from the sources below

The field colour is taken from the image's own border, so a dark capture sits on a deep field and a
light one on a pale field. Nothing is cropped: the capture is scaled to fit inside the frame.
"""
import colorsys, os, statistics, sys
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get("THUMB_SRC", os.path.join(ROOT, "public"))
OUT = os.path.join(ROOT, "public", "work")
W, H = 1600, 1000  # 16:10, shown at most ~800 CSS px wide

# slug -> source image (relative to SRC, or absolute). *-illustration.webp come from scripts/illustrate.py
SOURCES = {
    "piktechs": "portfolio/piktechs-devices.webp",
    "pdfold": "portfolio/pdfold-illustration.webp",
    "ai-visibility": "portfolio/ai-visibility-illustration.webp",
    "jev-check": "portfolio/jev-check-audit.webp",
    "ksur": "portfolio/ksur-home.webp",
    "polymarket": "portfolio/polymarket-illustration.webp",
    "atandem": "portfolio/atandem-home.webp",
    "montessori": "portfolio/montessori-og.webp",
    "deuspi": "portfolio/deuspi-og.webp",
    "altao": "portfolio/altao-og.webp",
    "worldline": "portfolio/worldline-og.webp",
}


def border_colour(im):
    im = im.convert("RGB").resize((200, int(200 * im.height / im.width)) or (200, 200))
    w, h = im.size
    px = [im.getpixel((x, y)) for x in range(w) for y in (0, 1, h - 2, h - 1)]
    px += [im.getpixel((x, y)) for y in range(h) for x in (0, 1, w - 2, w - 1)]
    return tuple(int(statistics.median(p[i] for p in px)) for i in range(3))


def field_for(rgb):
    r, g, b = (c / 255 for c in rgb)
    hue, light, sat = colorsys.rgb_to_hls(r, g, b)
    if light > 0.5:  # pale tinted field under a light capture
        return tuple(int(c * 255) for c in colorsys.hls_to_rgb(hue, 0.87, min(max(sat, 0.10), 0.38))), True
    # neutral graphite under a dark capture, so loud edge colours do not tint the whole card
    return tuple(int(c * 255) for c in colorsys.hls_to_rgb(hue, 0.15, min(sat, 0.08))), False


def rounded(im, radius):
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.width - 1, im.height - 1), radius, fill=255)
    return mask


def build(slug, path):
    path = path if os.path.isabs(path) else os.path.join(SRC, path)
    im = Image.open(path).convert("RGBA")
    field, light = field_for(border_colour(im))
    canvas = Image.new("RGBA", (W, H), field + (255,))
    scale = min(W * 0.84 / im.width, H * 0.80 / im.height)
    tw, th = int(im.width * scale), int(im.height * scale)
    shot = im.resize((tw, th), Image.LANCZOS)
    x, y = (W - tw) // 2, (H - th) // 2 + 8
    radius = 18
    mask = rounded(shot, radius)
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = Image.new("RGBA", (tw, th), (0, 0, 0, 90 if light else 150))
    shadow.paste(sd, (x, y + 22), mask)
    shadow = shadow.filter(ImageFilter.GaussianBlur(34))
    canvas = Image.alpha_composite(canvas, shadow)
    canvas.paste(shot, (x, y), mask)
    edge = ImageDraw.Draw(canvas)
    edge.rounded_rectangle((x, y, x + tw - 1, y + th - 1), radius, outline=(0, 0, 0, 26) if light else (255, 255, 255, 30), width=2)
    os.makedirs(OUT, exist_ok=True)
    dst = os.path.join(OUT, f"{slug}.webp")
    canvas.convert("RGB").save(dst, "WEBP", quality=82, method=6)
    print(f"{slug:14} field {field}  {os.path.getsize(dst) // 1024} KB")


if __name__ == "__main__":
    for slug, src in SOURCES.items():
        if len(sys.argv) == 1 or slug in sys.argv[1:]:
            build(slug, src)
