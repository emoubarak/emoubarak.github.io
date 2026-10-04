#!/usr/bin/env python3
"""Extract the real paper-run equity curves of polymarket-updown-lab for the portfolio illustration.

    python3 scripts/illustrations/polymarket_runs.py [path/to/runs.json]

Writes polymarket-runs.json next to this file: one curve per archived paper run that actually traded,
equity as a fraction of its starting stake, time normalised to 0..1.
"""
import json, os, sys
from pathlib import Path

src = Path(sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/repos/polymarket-updown-lab/docs/results/runs.json"))
runs = []
for r in json.loads(src.read_text()):
    eq = r.get("equity") or []
    if len(eq) < 15 or (r.get("n_trades") or 0) < 10:
        continue
    t0, t1 = eq[0][0], eq[-1][0]
    pts = [((t - t0) / (t1 - t0), v / r["initial"] - 1) for t, v in eq]
    step = max(1, len(pts) // 60)
    pts = pts[::step] + [pts[-1]]
    runs.append({"name": r["strategy"], "peak": max(p[1] for p in pts), "final": pts[-1][1],
                 "pts": [[round(x, 4), round(y, 4)] for x, y in pts]})
out = Path(__file__).with_name("polymarket-runs.json")
out.write_text(json.dumps(runs, separators=(",", ":")))
print(f"{len(runs)} runs -> {out} ({sum(r['final'] < 0 for r in runs)} end below their stake)")
