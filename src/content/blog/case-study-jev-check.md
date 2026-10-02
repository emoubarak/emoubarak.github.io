---
title: "Case Study: jev-check, Browser-Agent QA Where the Database Gives the Verdict"
description: "Unit tests and mocked end-to-end suites miss the bugs where the deployed front, the backend and the permissions disagree. I built a browser-agent harness that signs in as a real account state and lets the database decide, then open-sourced it as an agent skill."
pubDate: 2026-10-03
tags: ["Case Study", "AI", "QA"]
cover: "/blog/jev-check-audit.svg"
coverAlt: "Terminal output of jevcheck audit: the agent clicked Publish and said done, the database check failed"
tldr:
  - "An agent's \"done\" is a claim. The verdict comes from a SQL query on the real database."
  - "Accounts are created in exact states (free, paid, lapsed, team member, stranger), used once, and deleted, even when a run fails."
  - "It runs on demand as the coding agent's eyes, never in CI: browser agents are non-deterministic and billed per decision."
---

## Context

[Piktechs](/blog/case-study-piktechs) sells plans: free, Pro, Team, with seats, workspaces and roles. Most of its scariest bugs are not crashes. They are a screen that shows the wrong thing to the wrong account: a paywall that lets something through, a member who sees an owner's controls, a lapsed team that still publishes. My unit tests and mocked Playwright suite were green through several of them.

## The problem

Those bugs live where three things meet on the deployed app: the front end, the backend, and the permissions in the database. Mocks replace exactly the part that's wrong. Screenshots show the surface but not whether the data changed. And an AI agent that says "done" after clicking a button proves nothing: in my first runs, zero actions and "done" happened together more than once.

## What I built

A harness that asks the real app, as a real account state.

1. **Pick a state.** Free, Pro, lapsed, team member, frozen team, stranger. The harness creates a throw-away account in exactly that state, through the app's own code paths, so the data has the shape production writes.
2. **Sign in without a password.** The session is injected over the DevTools protocol. The agent never sees or types a credential.
3. **Give one plain-English goal.** "Publish the second card." A fast browser agent ([jev-ultrafast](https://github.com/browser-use/jev-ultrafast)) follows it on the deployed test environment and reports every control the account could click.
4. **Let the database decide.** A check is a path, a goal, and SQL assertions. The agent's opinion is not part of the verdict.
5. **Clean up, always.** Accounts are deleted at the end of every run, on failure too, with a time-based sweep for anything a killed run left behind.

On top: before/after screenshots cropped to one element for tickets, a host allow-list that fails closed, a guard that refuses a local front end wired to anything but staging, and a dedicated throw-away browser that never touches my real sessions.

![A free account that never paid, told by the billing page that its payment went through](/blog/piktechs-ticket-353-free-account-billing.webp)
*One ticket from these sweeps: the billing page trusted a URL parameter, so a free account that never paid was told its payment was being activated. Reproduced in one command, as a fresh free account.*

## What made an LLM browser agent usable on a real app

The harness is mostly the fixes nobody tells you about:

- **Kill animations.** Dialogs animating in a background tab are invisible to the agent.
- **Wait for the app's own spinner**, not just for the page load.
- **Observe twice.** The toast that explained a refusal is gone a second later.
- **Treat "0 actions" as proof of nothing.**
- **One narrow goal per run.** Long goals loop.

## What it changed

- Plan gates and workspace permissions have standing checks, run on demand against the test environment rather than in CI.
- A bug ticket starts with a one-line reproduction as a given account, and closes with a before/after pair of screenshots.
- Taking the "after" shots for a batch of closed tickets surfaced three follow-up bugs that the fixes had introduced or missed.
- I open-sourced it as [jev-check](https://github.com/emoubarak/jev-check) (MIT), an agent skill for Claude Code, Codex and OpenClaw. It ships with a tiny demo app with a free-plan gate, plus the same app with a silent billing regression, so you can watch the agent say "done" and the database say no:

```text
FAIL  free_publish_blocked   as free   1 act   2 calls   1.3s  ← draft_still_unpublished,
      live_one_untouched, user_saw_the_paywall, paywall_states_the_reason
```

## Lessons

1. **Separate the actor from the judge.** The agent acts; your data judges.
2. **Build states, don't hunt for them.** Throw-away accounts in exact states beat a shared "test user" that drifts.
3. **Keep humans and agents off passwords.** Inject sessions instead.
4. **Keep it out of CI.** Deterministic mocked tests stay the gate; the browser agent is how your coding agent sees the real app during a task.
