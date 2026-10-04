"""Headless Chrome screenshots of pages served from the repo. Shared by og.py and illustrate.py.

    from shoot import shoot
    shoot([("/scripts/og-card.html#...", "public/og/x.png", "fit()")], 1200, 630)

Each job is (path under the repo, output PNG, optional JS evaluated once fonts and images are ready; its value
is returned). Needs `websockets` (run the callers with uv).
"""
import asyncio, base64, functools, glob, http.server, json, os, shutil, subprocess, sys, tempfile, threading, time
from pathlib import Path

import websockets

ROOT = Path(__file__).resolve().parent.parent
READY = "document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode().catch(() => 0))))"


def _chrome():
    if os.environ.get("CHROME"):
        return os.environ["CHROME"]
    found = sorted(glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell")))
    if found:
        return found[-1]
    for b in ("google-chrome-stable", "google-chrome", "chromium", "chromium-browser"):
        if shutil.which(b):
            return shutil.which(b)
    sys.exit("no Chrome found (set CHROME=/path)")


async def _run(jobs, port, width, height, scale):
    prof = tempfile.mkdtemp()
    proc = subprocess.Popen([_chrome(), "--headless=new", "--remote-debugging-port=0", f"--user-data-dir={prof}",
                             "--no-first-run", "--hide-scrollbars", "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    values = []
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
            await call("Emulation.setDeviceMetricsOverride", {"width": width, "height": height, "deviceScaleFactor": scale, "mobile": False}, s)
            await call("Page.enable", {}, s)
            for page, out, js in jobs:
                sep = "&" if "?" in page.split("#")[0] else "?"
                base, _, frag = page.partition("#")
                await call("Page.navigate", {"url": f"http://127.0.0.1:{port}{base}{sep}t={time.time()}" + (f"#{frag}" if frag else "")}, s)
                await asyncio.sleep(0.5)
                await call("Runtime.evaluate", {"expression": READY, "awaitPromise": True}, s)
                value = None
                if js:
                    value = (await call("Runtime.evaluate", {"expression": js, "returnByValue": True, "awaitPromise": True}, s))["result"].get("value")
                await asyncio.sleep(0.3)
                shot = await call("Page.captureScreenshot", {"format": "png"}, s)
                out = Path(out)
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_bytes(base64.b64decode(shot["data"]))
                values.append(value)
    finally:
        proc.terminate()
        shutil.rmtree(prof, ignore_errors=True)
    return values


def shoot(jobs, width, height, scale=1):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        return asyncio.run(_run(jobs, server.server_address[1], width, height, scale))
    finally:
        server.shutdown()
