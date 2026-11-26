---
title: "My One-Person IT Department: City Planning for My AI Agent Setup"
description: "I run my work on a mini PC with a GPU, a home server, scheduled routines and browser agents, like a small company's IT department with one employee. An audit borrowed from French enterprise architecture found a backup dead for five weeks, and a benchmark showed what a local 180B model is worth next to a Claude subscription."
pubDate: 2026-11-22
tags: ["AI", "Claude", "Workflow", "Satire"]
cover: "/blog/one-person-it-department.webp"
coverAlt: "A miniature city on a table whose buildings are computers, a phone, server boxes, a clock tower and a safe with a small warning flag, joined by little roads; a hard hat and a clipboard rest on the edge of the table."
tldr:
  - "My harness (the rules, tools and machines my AI agents work in) is a small company's IT department with a headcount of one: rules, memory, a dashboard, routines, browser agents, an inventory, monitoring and backups, on a handful of machines and a private network."
  - "A full audit found that hooks tracked everything I created and nothing that changed: my backup had been dead for five weeks without an alert. A checker now compares the machine with its own registries every morning."
  - "A local 180B model is worth a lot for bulk work and privacy, and almost nothing as a way to save my Claude subscription, on a benchmark of the same fixes done five ways."
---

Large companies have a CIO, an enterprise architect, a change advisory board, a network operations center, an asset register and a compliance officer who sends emails about the asset register. I have all of that too. Every role is me, the meetings happen at four in the morning in a terminal, and the change advisory board is a Python hook that refuses my pushes when they contain a password.

On Sunday 22 November I asked Claude a simple question about my setup: *who is supposed to feed what, and when?* It came back with a word I had last heard from a consultant billing by the day. The French call it ***urbanisation du SI***, "urbanizing the information system": treating your applications like a city, with districts, roads, zoning rules and a plan, so the whole thing stays livable as it grows. The English-speaking world calls it enterprise architecture and sells it in slides.

No project names in here. The screenshots show my real apps with fake data: the anonymizer rewrote every name before the capture, and refused to save the frame when a real one slipped through. It refused a lot.

## The org chart

The company, mapped to what runs:

| A real company has | I have |
|---|---|
| A CIO | Me, between two client calls |
| A policy handbook | One instruction file, 120 lines, enforced by a hook that refuses line 121 |
| A training department | Skills, one per kind of work I repeat, and a hook that tells the model which ones to read |
| Corporate memory | Every session of my two main machines, indexed and searchable |
| Staff | Three or four parallel Claude Code sessions, plus a 180B model in my office |
| Shift workers | Scheduled routines on the mini PC |
| A temp agency | Browser agents, one logged-in profile per account |
| Facilities | A mini PC with an external GPU, a home server, two laptops, two phones, a VPS |
| An asset register | An inventory app: every project, host, email and renewal date |
| A network operations center | Uptime probes and alerts on my phone |
| A change advisory board | Tickets, and a pre-push hook with opinions |

The city plan: roads are the private network, blocks are what each part owns, and the vault in the bottom right corner is the backup.

[![Animated city plan of the harness: nine blocks named Instructions, Memory, Brains, Front desk, Clock, Hands, Ledger, Watchtower and Vault, on a grey road grid. Orange dots travel between blocks with labels such as "routine starts a browser task" and "task failed: ping the phone". Then the Vault block turns red with "last backup: 5 weeks ago, nobody was told", and finally green with "daily check at 08:40".](/blog/one-person-it-department/city-plan.gif)](/blog/one-person-it-department/city-plan.gif)

## The territory: the machines and a private road network

**The mini PC is the city center.** It runs everything permanent: the apps in this post, the routines, the browser agents and the local model on an RTX 3080 20 GB plugged in over OCuLink. I wrote about that setup in [A 180B Model in a Shoebox](/blog/a-180b-model-in-a-shoebox) and its sequel, [I Told You Not to Buy a GPU. Then I Bought One.](/blog/then-i-bought-a-gpu)

**The laptop is a window.** I work on it, and almost everything I open on it is served by the mini PC. A second laptop exists in theory. It had been offline for two days, so every audit report put "not verified" next to its name, like a colleague on permanent leave.

**The home server keeps what must survive**: accounting, a self-hosted photo library, shared files. **The phone became a node**: an agent installed the photo library app and the file sync app over the private network, connected both to the home server, then looked at the phone's screen to confirm they worked instead of trusting the API's OK. It installed the version of the photo app that matches the server, because the newest one may not talk to it. The file sync app got its own app password, revocable from the server without touching mine; its automatic photo upload stays off so the same pictures are not stored twice; only the camera album backs up, 86 photos and 1.5 GB on the first run. The server's admin password on record turned out to be out of date, and a ticket tracks it. **An offsite storage box** holds the backups, and a small VPS sits outside the house.

Everything sits on one Tailscale network. Approving SSH logins between my own machines by hand every few hours did not scale, so the trust between them is now written down, explicit and one-way. The Claude workspace itself (rules, hooks, skills) is a git repository, synced at the start of every session on every machine. Correct a rule on the laptop, and the mini PC knows it the next time a session opens there.

## District one: Instructions

The global instruction file is capped at **120 lines**: a hook counts the lines after every edit and refuses the write past the limit. Each rule says the behavior, its limit and why. How I got there is in [What I Kept Telling Claude](/blog/what-i-kept-telling-claude).

Around it sit the hooks, each written because the model did something at least twice. One refuses new files at the root of my home directory. One refuses a browser integration I don't use. One blocks a push that contains a secret. One closes the browser tabs an agent opened and no longer needs. One catches a reply that ends with "shall I run it?" and sends the model back to work, once, unless it names a real reason to ask. Its natural enemy is a memory note saying that "there's no way to do X?" from me is a question to answer, without running off to do X. When the two collide, the hook still sends the model back once, and the model keeps its question if it says why it needs me.

Then the skills, one per kind of work I repeat, and a router hook that names the matching ones in my own words. It took the share of needed skills loaded from 57% to 84% on held-out prompts: [Ninety Skills, Four in Ten Missed](/blog/claude-skills-that-actually-load).

Two smaller pieces of plumbing: a model router that sends each prompt to Haiku, Sonnet or Opus depending on the task, and a proxy that compresses shell output before the model reads it.

## District two: Memory

Every Claude Code session of the mini PC and the laptop is collected, indexed and searchable by meaning (the second laptop is left out, which says a lot about the second laptop): about **13,900 entries** on November 22, from sessions, project memories, rules and docs. When I type "do you remember" or "we already did that", the model searches before answering. When I say "where were we", it reads the sessions instead of guessing.

On top of it sits a weekly learning pass. Every Sunday evening it reads the week's corrections, turns the repeated ones into rules or hooks, and commits the result.

The audit found that this pass had not succeeded since November 1, and on November 15 its login had expired on top of that. It exited with code 0 every time, so nothing alerted. The module whose job is learning from failures had failed for three weeks and reported success. I have worked in companies. This is the most realistic thing in my whole setup.

It is now a routine like the others, so its failure lands on my phone like the others.

## District three: the front desk (dashboard)

The dashboard is where my day starts. Every open issue across my GitHub account and the organizations I work in, the pull requests whose CI is red, my day's calendar, web terminals into running sessions, the commits waiting to be pushed, and a gauge of how much of my Claude plan is left this week.

[![Dashboard in dark mode, list view: a sidebar with GitHub organizations and repositories (lab, local-inference, inventory, browser-agents, routines, dashboard), a "My day" panel with one issue in progress and seven pull requests with failing CI, and a "Today" calendar column with events such as "Weekly ticket triage (local model)" and "Domain renewal". Project names and issue titles are placeholders.](/blog/one-person-it-department/dashboard.webp)](/blog/one-person-it-department/dashboard.webp)

The board view is a kanban across every repository. The header of the real one said "last 7 days: 90 closed, 258 created" when I took this capture.

[![The dashboard switching from the list view to the kanban board (To do, In progress, To review, Done) and back. Issue titles are fake, for example "Hero is 101% of the screen height. Again." and "Backup silently dead since October".](/blog/one-person-it-department/dashboard-list-board.gif)](/blog/one-person-it-department/dashboard-list-board.gif)

The issue titles in the capture are invented. They are also, I regret to say, all based on real tickets.

## District four: the clock (scheduled routines)

Routines is the shift-work office: everything scheduled on the mini PC, what is running, what waits for my approval, what failed.

[![Routines, "Today" page: 1 running, 0 drafts to review, 5 failures in 7 days. The running task is "Tickets: weekly triage". The next 24 hours list content stats collection, approved replies, a /tmp cleanup and a browser cookies backup.](/blog/one-person-it-department/routines-today.webp)](/blog/one-person-it-department/routines-today.webp)

Each task says what it runs on, in this order of preference:

1. **A script**, when no model is needed. Most of the schedule is plain code: collecting stats, sending replies I already approved, cleaning up, backing up cookies.
2. **The local model**, when it is good enough. Triage, summaries, first drafts.
3. **The Claude subscription**, through `claude -p`, when quality matters.

My scheduled routines hold no model API key of their own: they run on the Claude subscription or the local GPU. The browser agents and the projects that serve other people have their own keys, and each project's OpenRouter key has a spending cap.

[![Routines, "Schedule" page: seventeen tasks with their timing, next run and last result, such as "Claude workspace: weekly learning pass" every Sunday at 21:00 and "Weekly channel report" every Monday at 11:00, with filters for the source of the task (Routines, PC timers, browser agents).](/blog/one-person-it-department/routines-schedule.webp)](/blog/one-person-it-department/routines-schedule.webp)

Reports arrive on Telegram: the night's ticket fixes in the morning, a failed routine the moment it fails. I fixed two scheduling bugs that day. The Monday report on my channels used to start at 11:00 sharp, whether or not the three stats collections it summarizes had finished; it now waits for them. And a browser task left "running" with no worker behind it now fails after 24 hours instead of running forever. Five such zombies were cleaned up on the spot, and up to three "failed" notifications may have reached my phone at breakfast to celebrate.

Anything a routine writes for the outside world lands in "To review" first. Replies, comments, posts: drafted by a model, sent by a script, approved by me. The routine that sends replies runs every fifteen minutes and only sends what I approved.

## District five: the hands (browser agents)

Browser agents do the work that has no API: web consoles and dashboards behind a login, on my own accounts. I wrote about the agent itself in [Browser Agents at Work](/blog/browser-agents-at-work-jev). What changed since is the organization around it.

[![browser-agents back office, "Profiles" page: twelve profiles shown as cards (channel-a, channel-b, partner-fr, channel-c, partner-en, calculator-site, agency, research, console, subcontractor, shop, sandbox) with their task count and last activity. Avatars are blanked.](/blog/one-person-it-department/browser-profiles.webp)](/blog/one-person-it-department/browser-profiles.webp)

**One profile per identity, fed as projects come.** A new rule: when a project needs an account on some platform, the account goes into a profile once. Cookies are copied from my own browser, and for the sites that refuse copied cookies, a "log in again" task opens a real browser where I only type the password, the captcha or the 2FA code. Then the account is declared, monitored, and tested with a silent read. From then on, every task on that account goes through the agents instead of my personal browser. My own browser keeps the bank, taxes, payments and anything that moves money. The temp agency does not get the company card.

**Every task now says who created it.** A routine, a scheduled job, a Claude session or me in the back office. Before, nothing recorded it. The 890 tasks that existed before this change are labeled "Unknown", which is also the honest answer.

[![The tasks page of the back office filtering by source: from "All sources" to "Claude session (1)", then back. Task goals are fake, such as "Read the 20 newest comments and draft replies for review".](/blog/one-person-it-department/browser-tasks-source.gif)](/blog/one-person-it-department/browser-tasks-source.gif)

The same day, the small tool that drives my real browser kept bringing its window to the front while I was typing. I asked it to stop at four in the morning, with a lot of exclamation marks and one very long "a". The fix makes it refuse to open a tab in another profile, turn "open in new tab" links into navigation in the same background tab, and block anything that raises a window. The agent fixing it closed my browser by mistake while testing. Later, the same tool closed a tab I had opened myself, twice, in two different sessions. Those two incidents got a ticket and a rule: it closes only the tabs it opened, and like every agent here it stops before a payment and leaves passwords to me.

When a task needs a human (a password, a captcha, a 2FA code), Telegram pings my phone and opens a page where I take over the remote browser. The night before, that page failed me on a marketplace login built for desktop: cropped on the side, captcha slider half off screen, impossible to drag. Desktop pages now keep their width and shrink to fit the phone, pinch to zoom works, and the fix was tested by dragging a real captcha slider by touch on a simulated 448-pixel phone before anyone told me it was done.

One more, from a batch of map searches: between 12% and 90% of the pages came back blank and were counted as read. A page is now read only once its text is displayed, reloaded if it stays empty, and reported as empty otherwise. The rerun: zero blank pages, for eight cents of proxy.

## District six: the ledger (inventory)

The inventory exists because I got lost. Too many hosts, registrars, mailboxes, services and links across too many projects. So I asked for one page that lists everything.

The first version listed my repositories. My correction is now the first line of the app's own instructions: *a project is not a repo*. A project is a thing that exists in the world (a SaaS, a client site, a channel) and owns several repositories, a domain, a mailbox, a host and some bills.

[![Inventory, "Projects" page: seventeen project cards with a status (Live, Archived, In progress, Paused), a description, a link and the services behind them (Cloudflare, Supabase, Hetzner, Vercel, GitHub Pages). Names and links are fake, for example "Crypto Regret: web game on serverless workers" and "Coinflip Lab: trading bots that turned every edge back into lead".](/blog/one-person-it-department/inventory.webp)](/blog/one-person-it-department/inventory.webp)

A hook keeps it up to date: at the end of every Claude session, it records any new repository the session created, so the inventory no longer depends on me remembering it exists. The app collects every six hours, checks about 180 links, reads expiry dates from the registries, and flags problems. While filling it in, the agent found a contact address displayed on one of my sites that had never existed as a mailbox. Every email sent to it had been lost, for as long as the site had been online. The site now shows the one mailbox that exists. The app paid for itself before I finished configuring it.

## Districts seven and eight: the watchtower and the vault (monitoring and backups)

Uptime Kuma watches twenty-six endpoints and pushes alerts to my phone. Systemd services restart themselves and send an alert when they give up. Every night at four, the mini PC backs itself up to an offsite storage box, prunes, checks the repository, and on Sundays restores a sample to prove that the backup is more than a ritual.

## Urbanisation du SI: walking the streets

The audit ran as five parallel agents, one per layer:

- **scheduled tasks and services**;
- **the Claude harness**: hooks, rules, sync, memory;
- **shared storage and the links between apps**;
- **couplings**: what breaks when something is renamed or moved;
- **business flows**: money, forms, data collection.

Each agent produced the same table for its layer: *producer, data, consumer, trigger, who notices a failure, enforced or on honor, last real result, proof*. That last column was mandatory. "It should work" was not an accepted value.

![Disaster Girl meme: a girl smiling in front of a burning house, "Monitoring: all green" and "The backup: dead since October".](/blog/memes/one-person-it-department-1.webp)

The audit found one pattern. Hooks catch what I create at the moment of writing: a new repository, a new skill, a new inventory entry. Nothing caught what changes: a rename, a new service, a new kind of data, a deadline. The lists were copied by hand, and nothing compared the machine with its own registries.

A slice of the event table, anonymized:

| When this happens | It must update | Guaranteed by (before) | State found |
|---|---|---|---|
| A new repository or project | Index, inventory, project instructions | A hook, for the inventory entry only | The rest on honor |
| A new service or timer | Versioned unit, failure alert, monitor, backup list, inventory | An installer with a hard-coded list | Four registries, sixteen units without an alert |
| A rename or a move | Paths in units, hooks, skills, links, backups, docs | A list of renamed pairs | About thirty dead paths |
| A deadline (domain, plan, key) | Calendar, alert | Nothing | Forty-three deadlines without a reminder |
| A scheduled task fails | My phone | A per-unit flag, when someone remembered it | The learning pass exited 0 for three weeks |

And the findings, in the order that hurt:

- **The home server's backup had been dead since October 14.** The script crashed every night on the database of a service I had uninstalled. No alert reached me for five weeks. The monitoring dashboard stayed green the whole time, because it watched whether services were up, and the backup was a nightly script with no alert of its own.
- **Four registries described "what runs"**, each slightly different: a services page, the monitoring config, the routines app and the inventory.
- **About thirty dead paths** after renames: broken links in `~/.local/bin`, scripts pointing at old folders, backups still dumping databases from paths that no longer existed. The tool meant to detect couplings skipped JSON files and only looked inside repositories, so it found two.
- **Hooks that failed silently.** `|| true` and `except: pass`, written in a hurry to never block a session. They never blocked anything, including the alarm.
- **The monitoring tool itself** wrote 1.7 million log lines in a day, so the system journal kept only six days of history, too short to prove anything weekly.

![Buzz Lightyear showing Woody the horizon: "Registries" and "Registries everywhere".](/blog/memes/one-person-it-department-2.webp)

### The fixes

The remedy is boring: **one source per subject, and a checker that compares reality to that source and complains.**

- **Failure alerts are the default.** Every service and timer alerts when it fails, without a list to maintain. Before, a new unit was covered only if I remembered to rerun an installer.
- **Hook errors are logged.** A broken hook writes one line to a log, and the next session shows it to me, at most once a day per error.
- **A check every morning at 08:40** compares what is running with the registries and alerts on any difference. On its first run it caught a service that another Claude session had added an hour earlier, without telling anyone.
- **Deadlines flow into the calendar.** The inventory computes renewals, and now pushes them as reminders: 19 created on the first run, no duplicates.
- **API keys left the services' environment.** Every service had inherited them from my shell profile; twenty-one services now run without them, each restarted and checked.
- **The backup was repaired**, and a new check alerts at 09:00 and 21:00 if any backup is older than 26 hours. That is the check that would have caught October 14 on October 15. The restore test changed too: a failure in any step now fails the whole run.
- **Dead paths are scanned every morning at 08:30**, JSON files and `~/.local/bin` included.
- **The journal can keep about fifty days.** The first proof comes on December 22, at thirty days, and the ticket stays open until then. Yes, I have a ticket whose only job is to wait.

The fixes ran as seven parallel workstreams: three on Opus for infrastructure, backups and the harness, four on Sonnet for the apps, the browser agents, content plumbing and the sites. Each closed its tickets with proof or left them open with a reason. Around nine in the morning I asked whether this would take much longer, because I was getting close to my daily limit. The answer was an estimate, a proposal to stop the two least important workstreams, and a reminder that every finished fix was already pushed.

## Evolvability: the great rename

Half my tooling used to be named after the browser agent it started with. The agent's wrapper, my personal-browser driver, the QA harness, the voice interface, the back office: all variations of one three-letter name. The evening before the audit, I decided this was misleading and asked for names that say what each thing does: "browser agents", "my browser", "account state check", "voice browser".

I renamed half a dozen lab repositories at the same time, for the same reason: a stranger should guess what a repository does from its name. This website followed, in two commits: the profile data, the copy-ready profile kit, three older blog posts and both LaTeX sources of my CV got the new names, the English and French CV PDFs and their preview images were rebuilt, and old CV links now redirect instead of ending on a 404. Renaming two tools in public took fifty lines. The pre-push guard that stops my public repositories from leaking private names then refused this very site, because of the file name of a client screenshot. It got a one-line exception, with its reason written next to it.

Zoning works the same way. A client's repository had slowly grown my own documentation and sales dashboard inside it. I moved them to their own repository in my company's organization, because in this city a building belongs to one district. The rename came with redirects for old links, and the audit still found the thirty dead paths it had left behind. A rename is an event, so it now has a row in the event table, and dead paths are scanned every morning.

Same week, same idea: every app of the harness now speaks English, interface and notifications included. The apps tied to a client project keep the client's language. One rule, one line in the instructions, and a test that searches the rendered text for words in the other language, since a screenshot shows the layout and can still hide a French button. Clicking through every screen to check the translation, I also found a status badge that stayed yellow after I answered a yes-or-no question.

## Tickets: 301 open, and the rule that sorted them

One of my oldest rules says *everything becomes a ticket*: any problem found along the way, any leftover, any missing piece. I forget things, tickets don't. It worked so well that on the morning of the audit I had **301 open tickets across my GitHub account and its organizations, 242 of the open ones created in November**, almost none with a priority, and no way to tell what had been fixed indirectly and never closed.

I am not alone. One [r/ClaudeCode thread](https://www.reddit.com/r/ClaudeCode/comments/1xwvu9e/) from this month is titled *"The harder I use CC, the larger the backlog gets"*, and one reply gave me the rule I took: agents may create cards, but **only a human moves a card to "ready"**, and "ready" stays short. Next.js [described the other half](https://nextjs.org/blog/how-we-closed-1500-github-issues) when they closed about 1,500 issues with agents: one agent scores how closable each issue is, and above 80 a second one looks for evidence that it should stay open.

![Two astronauts in space: "Wait, it's all agent tickets?" "Always has been".](/blog/memes/one-person-it-department-3.webp)

The new rules:

- **Every ticket gets a priority**, P0 to P3, with the same labels and colors in every repository, so one search covers everything. Problems found along the way default to P3.
- **Duplicates are searched among open and closed tickets** before creating one. A problem that comes back after a fix links to the old ticket.
- **`agent-ok`** marks a ticket a local model can do alone. **`ready` is mine.** No agent sets it.
- **The local model triages the whole backlog.** Two passes of a 27B model over the 303 tickets open by the time it ran, about 1 h 20 each, for zero euros. 160 not started, 99 partial, 33 unclear. I expected tickets done but never closed. Most of them are real work.
- **A night loop** runs from 01:00 to 07:00, takes `ready` and `agent-ok` tickets, and opens at most twelve pull requests labeled `agent-local`. Nothing reaches `main` without me.

The triage proposed eleven tickets as done or obsolete. A Claude session checked them: eight could be closed, three could not. Among the three, the local model had rated an untouched bug **"done, confidence 95"**, and a second agent, whose only job is to argue for keeping tickets open, had blocked it.

The rule is now written down: **the local model proposes, it never closes.** In the dry run of the night loop, the local reviewer also rejected the local fixer's pull request because the test it added proved nothing.

## The local model next to a Claude subscription

I run Qwen3.8-Flash-Next, a 180B mixture-of-experts model (about 6B active per token), with the [Strata](https://github.com/Niko1221/Strata) inference engine on an RTX 3080 20 GB and 64 GB of RAM. It writes 110 to 204 tokens per second and reads about 2,000 per second on long prompts ([benchmarks](https://github.com/emoubarak/strata-flash-next-rtx3080-20gb)).

[![Services page of the mini PC: RTX 3080 eGPU at 93% memory with the 180B model loaded, RAM at 84%, processor at 19%, and a "Local AI" section with the model switcher, the RTX arbiter ("Target: Strata, default") and the list of models that can be loaded on the GPU.](/blog/one-person-it-department/services.webp)](/blog/one-person-it-department/services.webp)

### One name, several brains

No caller in my harness names a model. Routines, the agent gateway (the entry point for bots that must run without my Claude plan) and the browser agents all ask for one alias. Behind it, a small arbiter decides: the 180B model by default, and when RAM runs short, a 27B model that fits almost entirely on the GPU. The callers keep the same alias and get a smaller model for a while.

The same day I asked whether I should move my whole Claude infrastructure to a VPS and keep the PC for compute, because a video render next to the 180B model made everything crawl. The answer was no, and the reasoning was better than my question: the fight is between the model and the render, both of which stay on the PC, so a VPS would change nothing. The render needed to ask for memory before starting. Now it reserves RAM, the arbiter swaps to the 27B, and the RAM comes back when the render ends. In a dry run, available memory went from 4 GB to 44 GB and back.

### Where it wins

- **Bulk work at zero marginal cost.** Triaging 303 tickets twice on the 27B costs nothing but electricity and patience. Same for summaries, classification, first drafts of routine reports.
- **Judgment in a loop, with code checking it.** For a list of about 500 companies, the agents ran some 1,500 map searches; the local model picked which listing was the company, and plain code then re-read the phone number on the listing itself, never in the model's answer, and kept it only if the official address or the name matched. The model chooses, and the code verifies.
- **Privacy.** A separate instance of my browser agents handles confidential tasks. It runs under its own Linux user whose files my Claude sessions cannot read, and its code accepts only the local model for planning; the browser agent's step decisions still go to its remote model. Voice notes are transcribed on the CPU, and a group chat bot runs on a 4B model; neither leaves the house.
- **Always on.** Routines don't care about my weekly limit, and the arbiter keeps a model answering even when I steal the GPU.

### Where it doesn't

I wanted the local model to save my Claude subscription by doing fixes that Claude would only review. I measured it on three real fixes from my dashboard, each done five ways, two to five runs per way, scored blind by Sonnet against the reference fix.

| Who fixes it | Quality (judge, /10) | Share of my weekly limit | My wait |
|---|---|---|---|
| Opus alone | **7.2** | 0.024% | 2 min 50 |
| Sonnet alone | 5.5 | **0.0075%** | **1 min** |
| Opus reads the code, then delegates to the 27B | 6.6 | 0.025% (nothing saved) | 4 min |
| Opus delegates without reading (27B) | 4.7 | 0.015% (40% saved) | 8 min 30 |
| Opus delegates without reading (180B) | 6.5 | 0.021% | 7 min |

The local coding agent passed the tests 13 times out of 13. It missed what the tests didn't check: a function written correctly and never wired where it was needed. Only Opus, reading the code, thought of it. On the 180B model, the agent also tried to download the real source code from GitHub instead of fixing the bug. I discarded that run. It was, to be fair, the most senior-engineer move of the whole benchmark.

My week had used 39% of my plan, worth about $2,350 at API prices counting the mini PC's sessions alone, so one percent is worth about $60 (an estimate: the plan's accounting is not published). Twenty delegated fixes a week would save about 0.2 points, when a normal week uses about 80% of the plan. Sonnet alone is cheaper than any delegation, and faster.

The rule changed: delegating code to the local model is for weeks when the limit is nearly gone, or for code that must not leave the machine.

### New models, same exam

Every week, someone on X announces a model that changes everything. That day I looked at two. The first, a new small model, ran on two community engines. One writes 116 tokens per second, up to twice my 27B fallback, and scored 21 out of 40 on the 40-decision web-agent exam where my main model scores 36. The other engine never stopped thinking, even with reasoning effort set to zero, and produced no answer within the budget. The second model was ruled out without downloading anything, from what people who ran it reported: about four times slower, and rereading the whole conversation at every turn under my engine. The next day, a replay that kept every raw answer showed the 21 was my own parser's fault: 30 of 55 answers were a valid JSON object followed by one extra brace, which my browser agents rejected. With the parser fixed, the small model scored 35.

## A normal day of maintenance

The rest of the day's tickets:

- **A tweet** promised faster browsing by changing DNS servers. The agent checked my ISP's box: it does not allow changing them, there is no such field in its interface code, and it already caches answers (0 ms for a site already visited, 81 ms the first time, against about 50 ms for a public resolver). Taking over DHCP from the mini PC would make the whole house lose internet when it reboots, to save 30 ms on sites I have never visited. Verdict: the tweet helps in a city where the local DNS is slow, which mine isn't, so nothing changed.
- **A one-pixel line** appeared at the top of my laptop screen whenever a maximized browser sat on the portable monitor next to it. The suspect is the browser drawing one pixel outside its own window, in a layer the window manager doesn't clip. Two logouts and one precise question later ("how exactly do you maximize it?"), a fix in a small window-manager extension is waiting for my next logout. Not verified, so not fixed.
- **Statistics files** had been rewritten every three hours but never committed since Thursday: 750 lines waiting. They now commit and push themselves.
- **The accounting app** now records payouts from the platforms I sell on, which until then had no path into the books at all. It also shows a warning when the last bank statement it holds is more than seven days old (the one on file was eight days old, so the warning fired on day one), and drops a reminder in the calendar every Monday at 14:00 to fetch a new one. Statements still come in by hand, through my own browser, because money stays out of the temp agency's reach. An independent review found two defects in the payout code before anything changed in the books. Every existing number stayed the same. Two decisions came back to me instead of being taken for me: whether to pay for the bank plan that has an API (an automatic statement feed against a monthly fee, price not verified), and asking my tax office how platform sales should be declared before the first return that includes them.
- **A paused project** was reported as "broken" by three different apps. It is now "paused" everywhere, because a system that can't tell a pause from a failure trains you to ignore red.

## Eight rules for a one-person IT department

1. **Track changes as well as creations.** Every registry needs a checker that compares it with reality and complains.
2. **Make failure alerts the default.** Opt-in alerting covers what you remembered. And don't trust exit code 0 from a script that swallows its own errors.
3. **Give your models one name.** Callers ask for "the model", an arbiter decides which one answers. Swapping brains becomes an operations detail.
4. **Use local models for bulk work and privacy.** As a discount on a subscription, mine saved 0.01 points per fix and tripled the wait. Measure before you believe.
5. **Local proposes, a stronger model or a human closes.**
6. **Only a human sets "ready".** Agents fill any backlog you let them. The scarce resource is your attention, so guard the column that spends it.
7. **Name things for what they do.** Then plan the rename like a migration, because it is one.
8. **Ask "who feeds what, and when?" once a quarter.** It costs one question and a table.

Somewhere a CIO is approving a budget for an enterprise-architecture program, with a steering committee and a twelve-month roadmap. Mine took a Sunday, five audit agents and seven repair workstreams, and found that my most important safety net had been failing for five weeks while every dashboard said green. The plan is now a ticket with a priority, and only I can mark it ready.
