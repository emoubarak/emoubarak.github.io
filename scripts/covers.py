#!/usr/bin/env python3
"""Blog covers: one illustration per article, generated on OpenRouter from docs/blog-covers.json.

    OPENROUTER_API_KEY=... ./scripts/covers.py <slug> [slug ...]   # one generation per slug
    ./scripts/covers.py --force <slug>                             # regenerate an existing cover

Writes public/blog/<slug>.webp (WebP q80). Skips a slug whose cover already exists, so a rerun never pays twice.
The prompt is the shared style followed by the article's scene; the cost of each call is printed.
"""
import base64, io, json, os, sys, urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
cfg = json.loads((ROOT / "docs/blog-covers.json").read_text())
args = sys.argv[1:]
force = "--force" in args
slugs = [a for a in args if a != "--force"]
if not slugs:
    sys.exit(__doc__)
key = os.environ.get("OPENROUTER_API_KEY") or sys.exit("OPENROUTER_API_KEY is not set")

total = 0.0
for slug in slugs:
    out = ROOT / "public/blog" / f"{slug}.webp"
    if out.exists() and not force:
        print(f"{slug}: exists, skipped (--force to regenerate)")
        continue
    body = {
        "model": cfg["model"], "quality": cfg["quality"], "aspect_ratio": cfg["aspect_ratio"], "n": 1,
        "prompt": cfg["style"] + "\n\nScene: " + cfg["covers"][slug]["scene"],
    }
    req = urllib.request.Request("https://openrouter.ai/api/v1/images", data=json.dumps(body).encode(),
                                 headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        res = json.load(r)
    im = Image.open(io.BytesIO(base64.b64decode(res["data"][0]["b64_json"]))).convert("RGB")
    im.save(out, "WEBP", quality=80, method=6)
    cost = (res.get("usage") or {}).get("cost") or 0
    total += cost
    print(f"{slug}: {im.width}x{im.height} -> {out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB  ${cost}")
print(f"total ${total:.3f}")
