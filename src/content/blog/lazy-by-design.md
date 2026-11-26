---
title: "Lazy by Design: What an Agent Needs Before I Leave It Alone"
description: "If I do something twice, a machine does it the third time. How that becomes agent runs with a checkable end condition and a spending cap, scheduled jobs that report back, and one source for each fact."
pubDate: 2026-10-03
tags: ["AI", "Workflow"]
cover: "/blog/lazy-by-design.webp"
coverAlt: "An empty desk at night: the chair is free, the monitor keeps running a task and the phone shows a notification."
tldr:
  - "Autonomy is safe when \"done\" is checkable, spending is capped, and the stop points are written down."
  - "Runs that spend money get a hard cap: one video run had $5 and spent $0.64."
  - "Most of my work goes into the checks that let me leave a run alone, and into the notification that calls me back."
---

Larry Wall listed laziness as the first virtue of a programmer: the drive to write the thing that saves you from doing the work again. I take it literally. If I do something twice, a machine does it the third time. With AI agents, that now includes a 30-second product video and an admin change in a web console. Most of the time, at least one of my computers is running a task with a written end condition, and it reports to my phone when it finishes or needs me.

![Tuxedo Winnie the Pooh meme: plain Pooh is "Doing it by hand a third time", tuxedo Pooh is "Writing the thing that does it forever".](/blog/memes/lazy-by-design-1.webp)

## A normal day of agent runs

**Long autonomous runs with an end condition.** I start Claude Code with a goal and a condition that defines done. The goal comes with its test: "every service page has a full-height hero with a real image, checked in screenshots at 1920 and 390, committed". A separate check verifies the condition before the run is allowed to stop.

**A spending cap, set before the run.** When a run spends money, I give it a ceiling up front. One run produced a 30-second motion-design video for a product page on its own, generating, reviewing and re-cutting, with a hard cap of $5. It spent $0.64 and wrote a README so I could edit the result later.

**Parallel sessions.** Three or four Claude Code sessions at once is normal: one on the SaaS, one on a client site, one on tooling. They sometimes share a repository, which is why my instructions say that changes you didn't make belong to another session at work, and you never revert, stash or check out over them.

**Scheduled jobs that report back.** A GitHub Actions job reconciles subscription state with Stripe every night. A weekly job on one of my sites searches public Q&A for questions its calculators answer and opens a GitHub issue with what it found. A systemd timer on my mini PC runs a weekly pass over my own Claude Code history and turns repeated corrections into rules (more on that in [this post](/blog/what-i-kept-telling-claude)). A research project ran 60 paper-trading runners on a VPS for weeks, journaling every decision.

**Browser work in web consoles.** A browser agent does admin in web consoles that have no API, and a small task runner keeps dedicated browsers alive for longer jobs. It calls me for a password, a captcha, a 2FA code or the final click. Details in [Browser Agents at Work](/blog/browser-agents-at-work-jev).

**One data file behind the CV and the portfolio.** My CV, this site's portfolio and the copy I paste into LinkedIn, Malt and Upwork all come from it. I change a fact once. The same instinct produced a shared Search Console script used by four projects instead of four copies, and an invoicing tool for my company that commits its own data to a private repository, so it syncs across machines.

**Reachable from anywhere.** All my machines sit on one Tailscale network. I check on a long run from my laptop over remote desktop, and I talk to Claude with push-to-talk when typing is slower than thinking.

## Before an agent works alone

After runs that stalled, wandered or waited hours for an answer, every autonomous run gets six things:

1. **An end condition you can check.** "Done" has to be observable: a test that passes, a screenshot at a given width, a database row, a green pipeline. Vague goals produce runs that stop early, or never.
2. **A budget.** Money, time or both. A run that knows its ceiling doesn't need to ask.
3. **Eyes.** A way to verify its own work without me: screenshots, a browser agent, the CI logs, a query on the database.
4. **Written stop points.** The short list of things it must not do alone: spend real money beyond the cap, deploy the SaaS to production without my go, publish under my name, delete what can't be recreated, type a password. Anything reversible that is not on this list is in scope.
5. **A way to call me.** A notification when a human is needed, with the exact screen left open for me, instead of a question at the end of a turn.
6. **Reversibility by default.** Work on branches and test environments, commit often, and only promote to production on a gate. Reversible work keeps autonomy cheap.

## The failure modes I hit

- **Stalling on a solvable blocker.** I came back to runs that had stopped on something the agent could have solved by searching for a key or trying another route. The rule now: timebox an approach, switch, and stop only for blockers that need a human.
- **Asking instead of doing.** "Shall I run the migration on the test database?" at 11pm, read at 9am, is ten lost hours. That's why the stop points are written down: anything reversible and not on the list is a yes.

![Waiting skeleton meme: "Shall I run the migration?", then "The agent, still waiting at 9am".](/blog/memes/lazy-by-design-2.webp)
- **Claiming done without looking.** The most frequent correction in my history (see [What I Kept Telling Claude](/blog/what-i-kept-telling-claude)). The fix is #1 and #3 above.
- **Doing too much.** A retouch request gets the smallest change that answers it, and everything else goes in a "worth flagging" list.

## Summary

Most of the setup is verification: an end condition a check can confirm, a budget, screenshots or queries to look with, written stop points, and a way back. With those in place, a run can continue overnight and report in the morning.
