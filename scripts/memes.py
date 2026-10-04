#!/usr/bin/env python3
"""Blog memes: generated through the meme-mcp server (Imgflip), from docs/blog-memes.json.

    ./scripts/memes.py [slug ...]            # missing memes only, every post by default
    ./scripts/memes.py --force <slug>        # regenerate a post's memes

Starts `meme-mcp` (npm i -g meme-mcp) with the Imgflip account from my-cv-secrets/imgflip.env, calls its
`generateMeme` tool over stdio, writes public/blog/memes/<slug>-<n>.webp (at most 900 px wide) and inserts
the image line after the paragraph containing `after` in the post, once. Imgflip is free.
"""
import base64, io, json, subprocess, sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SECRETS = ROOT / "my-cv-secrets/imgflip.env"
OUT = ROOT / "public/blog/memes"
cfg = json.loads((ROOT / "docs/blog-memes.json").read_text())["posts"]
args = sys.argv[1:]
force = "--force" in args
slugs = [a for a in args if a != "--force"] or list(cfg)


class Mcp:
    def __init__(self):
        self.p = subprocess.Popen(["bash", "-c", f"set -a; . {SECRETS}; exec meme-mcp"], stdin=subprocess.PIPE,
                                  stdout=subprocess.PIPE, text=True)
        self.n = 0
        self.call("initialize", {"protocolVersion": "2025-06-18", "capabilities": {},
                                 "clientInfo": {"name": "my-cv-memes", "version": "1"}})
        self.send({"jsonrpc": "2.0", "method": "notifications/initialized"})

    def send(self, msg):
        self.p.stdin.write(json.dumps(msg) + "\n")
        self.p.stdin.flush()

    def call(self, method, params):
        self.n += 1
        self.send({"jsonrpc": "2.0", "id": self.n, "method": method, "params": params})
        while True:
            msg = json.loads(self.p.stdout.readline())
            if msg.get("id") == self.n:
                if "error" in msg:
                    raise SystemExit(f"{method}: {msg['error']}")
                return msg["result"]

    def meme(self, template, text0, text1=None):
        a = {"templateNumericId": template, "text0": text0.upper()}
        if text1:
            a["text1"] = text1.upper()
        res = self.call("tools/call", {"name": "generateMeme", "arguments": a})
        if res.get("isError"):
            raise SystemExit(f"template {template}: {res['content'][0].get('text')} (check {SECRETS.name})")
        return base64.b64decode(res["content"][0]["data"])


OUT.mkdir(parents=True, exist_ok=True)
mcp = None
for slug in slugs:
    md = ROOT / "src/content/blog" / f"{slug}.md"
    lines = md.read_text().split("\n")
    for i, m in enumerate(cfg[slug], 1):
        out = OUT / f"{slug}-{i}.webp"
        if force or not out.exists():
            mcp = mcp or Mcp()
            im = Image.open(io.BytesIO(mcp.meme(m["template"], m["text0"], m.get("text1")))).convert("RGB")
            if im.width > 900:
                im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
            im.save(out, "WEBP", quality=85, method=6)
            print(f"{slug}-{i}: {m['name']}  {im.width}x{im.height}")
        ref = f"/blog/memes/{slug}-{i}.webp"
        if any(ref in l for l in lines):
            continue
        at = [j for j, l in enumerate(lines) if m["after"] in l]
        if len(at) != 1:
            sys.exit(f"{slug}-{i}: `after` matches {len(at)} lines in {md.name}")
        lines[at[0] + 1:at[0] + 1] = ["", f"![{m['alt']}]({ref})"]
    md.write_text("\n".join(lines))
if mcp:
    mcp.p.terminate()
