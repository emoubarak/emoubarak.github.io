#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["websockets", "pillow"]
# ///
"""LinkedIn cover image: scripts/banner.html rendered at 2x into public/linkedin-banner.png (3168x792)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from shoot import ROOT, shoot

out = ROOT / "public" / "linkedin-banner.png"
shoot([("/scripts/banner.html", out, None)], 1584, 396, scale=2)
print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")
