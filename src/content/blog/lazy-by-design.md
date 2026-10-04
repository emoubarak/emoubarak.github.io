---
title: "Lazy by Design: How I Make My Computers Work While I'm Away"
description: "My engineering philosophy fits in one sentence: if I do something twice, a machine does it the third time. How that turns into autonomous agent runs, scheduled jobs and single sources of truth, and what it takes for an agent to work safely while nobody is watching."
pubDate: 2026-10-03
tags: ["AI", "Workflow"]
cover: "/blog/lazy-by-design.webp"
coverAlt: "An empty desk at night: the chair is free, the monitor keeps running a task and the phone shows a notification."
tldr:
  - "If I do something twice, a machine does it the third time: autonomous runs, scheduled jobs, single sources of truth."
  - "Autonomy is safe when \"done\" is checkable, spending is capped, and the stop points are written down."
  - "The work is not starting the agent. It's making it safe to walk away."
---

Larry Wall listed laziness as the first virtue of a programmer: the drive to write the thing that saves you from doing the work again. I take it literally. If I do something twice, a machine does it the third time. With AI agents, the definition of "something a machine can do" has moved a long way, and my working day has changed with it. Most of the time, at least one of my computers is working on something I'm not watching.

![Tuxedo Winnie the Pooh meme: plain Pooh is "Doing it by hand a third time", tuxedo Pooh is "Writing the thing that does it forever".](/blog/memes/lazy-by-design-1.webp)

## What "the machine works alone" looks like on a normal day

**Long autonomous runs with an end condition.** I start Claude Code with a goal and a condition that defines done, then go do something else. Not "improve the site", but "every service page has a full-height hero with a real image, checked in screenshots at 1920 and 390, committed". A separate check verifies the condition before the run is allowed to stop. A typical prompt before I leave the desk: *"I have to go away from my computer, work autonomously until it's done."*

**Budgets instead of permission.** When a run spends money, I give it a ceiling rather than asking it to ask me. One run produced a 30-second motion-design video for a product page on its own, generating, reviewing and re-cutting, with a hard cap of $5. It spent $0.64 and wrote a README so I could edit the result later.

**Parallel sessions.** Three or four Claude Code sessions at once is normal: one on the SaaS, one on a client site, one on tooling. They sometimes share a repository, which is why my instructions say that changes you didn't make belong to another session at work, and you never revert, stash or check out over them.

**Scheduled jobs that report back.** A GitHub Actions job reconciles subscription state with Stripe every night. A weekly job on one of my sites searches public Q&A for questions its calculators answer and opens a GitHub issue with what it found. A systemd timer on my desktop runs a weekly pass over my own Claude Code history and turns repeated corrections into rules (more on that in [this post](/blog/what-i-kept-telling-claude)). A research project ran 60 paper-trading runners on a VPS for weeks, journaling every decision.

**Browser work without me.** A browser agent does admin in web consoles that have no API, and a small task runner keeps dedicated browsers alive for longer jobs. It only calls me for a password, a captcha or a 2FA code. Details in [Browser Agents at Work](/blog/browser-agents-at-work-jev).

**One source, many projections.** My CV, this site's portfolio and the copy I paste into LinkedIn, Malt and Upwork all derive from one data file. I change a fact once. The same instinct produced a shared Search Console script used by four projects instead of four copies, and an invoicing tool for my company that commits its own data to git so it syncs itself across machines.

**Reachable from anywhere.** All my machines sit on one Tailscale network. I check on a long run from my laptop over remote desktop, and I talk to Claude with push-to-talk when typing is slower than thinking.

## What it takes for an agent to work safely alone

Laziness only works if nothing breaks while you're not looking. After a lot of runs that stalled, wandered or asked permission for hours, here's what I give every autonomous run.

1. **An end condition you can check.** "Done" has to be observable: a test that passes, a screenshot at a given width, a database row, a green pipeline. Vague goals produce runs that stop early, or never.
2. **A budget.** Money, time or both. A run that knows its ceiling doesn't need to ask.
3. **Eyes.** A way to verify its own work without me: screenshots, a browser agent, the CI logs, a query on the database.
4. **Written stop points.** The short list of things it must not do alone: spend real money beyond the cap, deploy to production without my go, publish under my name, delete what can't be recreated, type a password. Everything else is in scope.
5. **A way to call me.** A notification when a human is genuinely needed, and the exact screen left open for me. Not a question at the end of a turn.
6. **Reversibility by default.** Work on branches and test environments, commit often, and only promote to production on a gate. When everything is reversible, autonomy is cheap.

## The failure modes I hit

- **Stalling on a solvable blocker.** I came back to runs that had stopped on something the agent could have solved by searching for a key or trying another route. The rule now: timebox an approach, switch, and stop only for blockers that truly need a human.
- **Asking instead of doing.** "Shall I run the migration?" at 11pm, read at 9am, is eight lost hours. That's why the stop points are written down: everything not on the list is a yes.

![Waiting skeleton meme: "Shall I run the migration?", then "The agent, still waiting at 9am".](/blog/memes/lazy-by-design-2.webp)
- **Claiming done without looking.** The most common failure of all. The fix is #1 and #3 above, not a sterner prompt.
- **Doing too much.** Laziness is not scope creep. A retouch request gets the smallest change that answers it, and everything else goes in a "worth flagging" list.

## The point

Laziness, done properly, is mostly about verification. Anyone can start an agent and walk away. The work is in making it safe to walk away: clear end conditions, budgets, eyes, stop points, a way back. Get those right and the computer becomes the teammate that works nights.
