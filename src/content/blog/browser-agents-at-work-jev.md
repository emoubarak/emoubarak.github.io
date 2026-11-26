---
title: "Browser Agents at Work: QA, Web Consoles and Password Handoffs with jev"
description: "I use jev, Browser Use's browser agent, every day: to QA my own SaaS as each kind of account, to work inside web consoles that have no API, and to hand me the keyboard when a password is needed. The use cases, the architecture, and ten setup lessons."
pubDate: 2026-09-26
tags: ["AI", "Browser Agents"]
cover: "/blog/browser-agents-at-work-jev.webp"
coverAlt: "A browser form filled by a cursor moving on its own, and a human hand taking over on the padlocked field."
tldr:
  - "Start by using a browser agent to QA your own app as each kind of account; a SQL query on the database decides pass or fail."
  - "Humans type passwords. Design the handoff on purpose: injected sessions, a tab left open, or a WebRTC takeover."
  - "Most \"the agent is slow\" or \"the agent can't\" moments were my setup: narrow goals, the right profile, one tab, the real viewport."
---

My coding agent writes UI it cannot see, and half of my admin work happens in web consoles that have no API. A browser agent handles both. Mine is [jev-ultrafast](https://github.com/browser-use/jev-ultrafast), Browser Use's agent built for speed. It reads the page as a table of elements plus text, makes one model call per decision, acts, and returns a status, the final URL, the actions it took and the page text. I run it every day.

## What I use it for

**QA of my own app, as each kind of user.** On [Piktechs](https://piktechs.com), a browser agent signs in to the test environment as an account in a given state (free, Pro, lapsed, team member, frozen team), follows a one-line goal, and a SQL query on the database checks the result; the agent's "done" counts only as a claim. Sixteen standing checks cover plan gates and workspace permissions. I open-sourced the approach as [account-state-check](https://github.com/emoubarak/account-state-check), and it gets [its own case study](/blog/case-study-jev-check).

**Screenshots that prove things.** A visible bug gets a screenshot in its ticket. A fixed one gets a before/after pair in the closing comment, so I can check the fix at a glance without running anything. One responsive audit produced a single ticket listing every mobile layout defect with its screenshot, ready to fix in one pass. Taking the "after" shots of a batch of closed tickets also found three follow-up bugs. A screenshot is a claim about the product, so it gets looked at before it gets published.

**Admin in my own logged-in browser.** Adding an administrator in the OVHcloud manager, configuring GA4 and Google Tag Manager, filling Play Console declarations, moving a domain's mail between providers, editing my own Malt and Upwork profiles field by field. The agent attaches to my running Brave through the DevTools protocol, works in the profile that already has the site open, and stops for me at logins, captchas, 2FA and the final click.

**Reading forums and Reddit threads.** In a visible window, one page per call, the way I would read them, keeping the text the agent returns.

**A task runner for longer jobs.** For work that takes many steps across sites, I built a small runner around jev: tasks are launched from the terminal only, each runs in a dedicated, persistent browser in a container, and every step is logged with a screenshot, its duration and its model cost. When a task hits a login, a captcha or a 2FA prompt, it stops, notifies me, and I take over through a WebRTC session in my own browser, with a real clipboard in both directions. Then the agent continues.

![Architecture of the task runner: Claude Code and a CLI on the terminal side, a SQLite state file, a reconciler, and containerized Chromium workers streamed over WebRTC, with a read-only back-office](/blog/jev-administrator-architecture.webp)
*The runner's architecture, from its own documentation page. The purple path is the human: login, captcha, 2FA, final click.*

## Humans type passwords

jev never sees password fields, and I keep it that way. In account-state-check, accounts sign in over the DevTools protocol, so the agent never needs a password. In my own browser, the agent leaves the tab in front of me at the login screen. The runner hands over through WebRTC. In all three cases the agent does the clicking and the human does the credentials.

![One Does Not Simply meme: "One does not simply let the agent type your password".](/blog/memes/browser-agents-at-work-jev-1.webp)

## Ten setup lessons

1. **One narrow goal per call.** "Open the menu", then "fill the form", then "read the confirmation". A long multi-step goal loops, sometimes on the same button ten times.
2. **Use `127.0.0.1`, not `localhost`.** In my setup, `localhost` made the agent refuse immediately with zero actions. The IP works.
3. **It sees only the viewport.** A target below the fold, or a long goal, gives an instant "blocked". Bring the element into view or shorten the goal.
4. **Text in, text out.** The agent does not judge visuals. Pair it with a screenshot tool for anything visual. I use one that captures full pages at my real widths and flags overflow and broken images.
5. **Enterprise consoles hide in iframes and web components.** OVHcloud renders each app in a same-origin iframe, with shadow-DOM components inside. The default page snapshot misses them, so I patched the snapshot (frames, open shadow roots, labels hidden from accessibility) rather than switching tools.
6. **The wrong browser profile looks like a logged-out site.** Brave runs all its profiles in one process. If the agent opens a tab in the default profile, the site says "please sign in", and a naive agent asks you to log in. The fix is picking the profile that already has the site open.
7. **Batch, don't spawn.** I once had the agent edit a profile one field per command. Each command reloaded a heavy single-page app, around thirty seconds of hydration per edit, and it looked like jev was slow. One tab, one hydration and a list of operations made it fast.
8. **Iterate on demo pages.** Loop against a local page or a demo site, then do one real check at human pace. Whatever you run shares your IP.
9. **Not in CI.** Agent runs are non-deterministic and billed per decision. My deterministic, mocked end-to-end suite stays the gate. The agent is the coding agent's eyes during a task, on demand.
10. **Show the cost.** Every step logs its model cost. Read-only looks are cheap, and seeing the numbers keeps you from guessing.

![Spider-Man pointing at Spider-Man meme: one is "localhost", the other "127.0.0.1".](/blog/memes/browser-agents-at-work-jev-2.webp)

## "jev can't do that"

It's usually wrong. The most frequent version in my history was "jev can't type", which came from an outdated note (the story is in [What I Kept Telling Claude](/blog/what-i-kept-telling-claude)). The other was switching to a different browser tool when jev stalled, without saying so. Both are now handled outside the model: the stale note is fixed, and a hook denies the other browser tool and points back to jev. If jev blocks on a page, the right move is to observe why the element is missing from its table, patch, and retry.

## Before you start

- Start with QA of your own app as different users.
- Read the verdict from your database.
- Keep humans on credentials, and design the handoff on purpose.
- Measure speed and cost per step before blaming the agent.
