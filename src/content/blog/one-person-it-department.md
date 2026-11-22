---
title: "My One-Person IT Department: City Planning for a Harness Nobody Asked For"
description: "A mini PC, a GPU, a home server, two laptops, two phones, about ninety skills, seventeen hooks and seventeen routines, all run by one person and a few AI models. What the harness is, how it fails, what a local model is worth, and what a French enterprise-architecture word taught me about all of it."
pubDate: 2026-11-22
tags: ["AI", "Claude", "Workflow", "Satire"]
cover: "/blog/one-person-it-department.webp"
coverAlt: "A miniature city on a table whose buildings are computers, a phone, server boxes, a clock tower and a safe with a small warning flag, joined by little roads; a hard hat and a clipboard rest on the edge of the table."
tldr:
  - "My harness is a small company's IT department with a headcount of one: rules, memory, a dashboard, routines, browser agents, an inventory, monitoring and backups, on a handful of machines and a private network."
  - "A full audit found that everything I create is tracked and everything that changes is not. My backup had been dead for five weeks, and nothing had told me. The fix was a checker that compares the machine to its own registries every morning."
  - "A local 180B model is worth a lot for bulk work and privacy, and almost nothing as a way to save my Claude subscription. Measured, not guessed."
---

Large companies have a CIO, an enterprise architect, a change advisory board, a network operations center, an asset register and a compliance officer who sends emails about the asset register. I have all of that too. Every role is me, the meetings happen at four in the morning in a terminal, and the change advisory board is a Python hook that refuses my commits when they contain a password.

This morning I asked Claude a simple question about my setup: *who is supposed to feed what, and when?* It came back with a word I had last heard from a consultant billing by the day. The French call it ***urbanisation du SI***, "urbanizing the information system": treating your applications like a city, with districts, roads, zoning rules and a plan, so the whole thing stays livable as it grows. The English-speaking world calls it enterprise architecture and sells it in slides.

My information system has one user. It still needed the plan.

No project names in here. The screenshots show my real apps with fake data: the anonymizer rewrote every name before the capture, and refused to save the frame when a real one slipped through. It refused a lot.

## The org chart

The company, mapped to what runs:

| A real company has | I have |
|---|---|
| A CIO | Me, between two client calls |
| A policy handbook | One instruction file, 120 lines, enforced by a hook that refuses line 121 |
| A training department | About ninety skills, and a hook that tells the model which ones to read |
| Corporate memory | Every session of my two main machines, indexed and searchable |
| Staff | Three or four parallel Claude Code sessions, plus a 180B model in my office |
| Shift workers | Seventeen scheduled routines |
| A temp agency | Browser agents with twelve logged-in profiles |
| Facilities | A mini PC with an external GPU, a home server, two laptops, two phones, a VPS |
| An asset register | An inventory app: every project, host, email and renewal date |
| A network operations center | Twenty-six probes and alerts on my phone |
| A change advisory board | Tickets, and a pre-push hook with opinions |

The city plan. Roads are the private network, blocks are what each part owns. Watch the bottom right corner, that one is a true story from this morning.

[![Animated city plan of the harness: nine blocks named Instructions, Memory, Brains, Front desk, Clock, Hands, Ledger, Watchtower and Vault, on a grey road grid. Orange dots travel between blocks with labels such as "routine starts a browser task" and "task failed: ping the phone". Then the Vault block turns red with "last backup: 5 weeks ago, nobody was told", and finally green with "daily check at 08:40".](/blog/one-person-it-department/city-plan.gif)](/blog/one-person-it-department/city-plan.gif)

## The territory: the machines and a private road network

**The mini PC is the city center.** It runs everything permanent: the apps in this post, the routines, the browser agents and the local model on an RTX 3080 20 GB plugged in over OCuLink. I wrote about that setup in [A 180B Model in a Shoebox](/blog/a-180b-model-in-a-shoebox) and its sequel, [I Told You Not to Buy a GPU. Then I Bought One.](/blog/then-i-bought-a-gpu)

**The laptop is a window.** I work on it, and almost everything I open on it is served by the mini PC. A second laptop exists in theory. It has been offline for two days, which means every audit report this week contains the line "not verified" next to its name, like a colleague who is permanently on leave.

**The home server keeps what must survive**: accounting, a self-hosted photo library, shared files. **The phone became a node** this morning: an agent installed the photo library app and the file sync app over the private network, connected both to the home server, then looked at the phone's screen to confirm they worked, because "the API said OK" is not the same thing as "it works". It deliberately installed an old version of the photo app, because the current one may not talk to the server I never upgraded. Backward compatibility, the enterprise way: by freezing everything. **An offsite storage box** holds the backups, and a small VPS sits outside the house.

Everything sits on one Tailscale network. This morning I got tired of approving SSH logins between my own machines every few hours, so the trust between them is now explicit and one-way. Which machine trusts which is the kind of detail a public page keeps to itself. The Claude workspace itself (rules, hooks, skills) is a git repository, synced at the start of every session on every machine. Correct a rule on the laptop, and the mini PC knows it the next time a session opens there.

## District one: Instructions

This district is covered in two earlier posts, so I'll keep it short.

The global instruction file is capped at **120 lines**, and the cap is not a guideline: a hook counts the lines after every edit and refuses the write past the limit. Each rule says the behavior, its limit and why. How I got there is in [What I Kept Telling Claude](/blog/what-i-kept-telling-claude).

Around it, **seventeen hooks**. Each of them exists because the model did something at least twice. One refuses new files at the root of my home directory. One refuses a browser integration I don't use. One blocks a push that contains a secret. One closes the browser tabs an agent opened and no longer needs. One catches a reply that ends with "shall I run it?" and sends the model back to work, once, unless it names a real reason to ask. Its natural enemy is a memory note saying that when I write "there's no way to do X?", I am thinking out loud, not giving an order. The two coexist like most corporate policies: each one correct, together a coin flip.

Then **about ninety skills**, one per kind of work I repeat, and a router hook that names the matching ones in my own words. It took the share of needed skills loaded from 57% to 84%, measured on prompts it was never tuned on: [Ninety Skills, Half of Them Used](/blog/claude-skills-that-actually-load).

Two smaller pieces of plumbing pay for themselves every day: a router that classifies each prompt and sends it to the cheapest model that can handle it, and a proxy that compresses shell output before the model reads it.

## District two: Memory

Every Claude Code session of the mini PC and the laptop is collected, indexed and searchable by meaning (the second laptop is left out, which says a lot about the second laptop): about **13,900 entries** today, from sessions, project memories, rules and docs. When I type "do you remember" or "we already did that", the model searches before answering. When I say "where were we", it reads the sessions instead of guessing.

On top of it sits a weekly learning pass. Every Sunday evening it reads the week's corrections, turns the repeated ones into rules or hooks, and commits the result.

This morning's audit found that this pass had not succeeded since November 1. On November 15 its login had expired. It exited with code 0 every time, so nothing ever alerted. The module whose entire job is learning from failures had failed, silently, for three weeks, and reported success. I have worked in companies. This is the most realistic thing in my whole setup.

It is now a routine like the others, so its failure lands on my phone like the others.

## District three: the front desk

The dashboard is where my day starts. Every open issue across my six GitHub accounts, the pull requests whose CI is red, my day's calendar, web terminals into running sessions, the commits waiting to be pushed, and a gauge of how much of my Claude plan is left this week.

[![Dashboard in dark mode, list view: a sidebar with GitHub organisations and repositories (lab, local-inference, inventory, browser-agents, routines, dashboard), a "My day" panel with one issue in progress and seven pull requests with failing CI, and a "Today" calendar column with events such as "Weekly ticket triage (local model)" and "Domain renewal". Project names and issue titles are placeholders.](/blog/one-person-it-department/dashboard.webp)](/blog/one-person-it-department/dashboard.webp)

The board view is a kanban across every repository. The header of the real one said "last 7 days: 90 closed, 258 created" when I took this capture. I'll come back to that ratio, because it is the plot of the second half of this post.

[![The dashboard switching from the list view to the kanban board (To do, In progress, To review, Done) and back. Issue titles are fake, for example "Hero is 101% of the screen height. Again." and "Backup silently dead since October".](/blog/one-person-it-department/dashboard-list-board.gif)](/blog/one-person-it-department/dashboard-list-board.gif)

The issue titles in the capture are invented. They are also, I regret to say, all based on real tickets.

## District four: the clock

Routines is the shift-work office: everything scheduled on the mini PC, what is running, what waits for my approval, what failed.

[![Routines, "Today" page: 1 running, 0 drafts to review, 5 failures in 7 days. The running task is "Tickets: weekly triage". The next 24 hours list content stats collection, approved replies, a /tmp cleanup and a browser cookies backup.](/blog/one-person-it-department/routines-today.webp)](/blog/one-person-it-department/routines-today.webp)

Each task says what it runs on, and the order of preference is the whole philosophy:

1. **A script**, when no model is needed. Most of the schedule is plain code: collecting stats, sending replies I already approved, cleaning up, backing up cookies.
2. **The local model**, when it is good enough. Triage, summaries, first drafts.
3. **The Claude subscription**, through `claude -p`, when quality matters.

No internal tool of mine has an API key for a model. Keys with spending caps exist for projects that serve other people. My own plumbing runs on the subscription or on the GPU in the room.

[![Routines, "Schedule" page: seventeen tasks with their timing, next run and last result, such as "Claude workspace: weekly learning pass" every Sunday at 21:00 and "Weekly channel report" every Monday at 11:00, with filters for the source of the task (Routines, PC timers, browser agents).](/blog/one-person-it-department/routines-schedule.webp)](/blog/one-person-it-department/routines-schedule.webp)

Reports arrive on Telegram: the night's ticket fixes in the morning, a failed routine the moment it fails. Two scheduling bugs died today. The Monday report on my channels used to start at 11:00 sharp, whether or not the three stats collections it summarizes had finished; it now waits for them. And a browser task left "running" with no worker behind it now fails after 24 hours instead of running forever. Five such zombies were cleaned up on the spot, and up to three "failed" notifications may have reached my phone at breakfast to celebrate.

Anything a routine writes for the outside world lands in "To review" first. Replies, comments, posts: drafted by a model, sent by a script, approved by me. The routine that sends replies runs every fifteen minutes and only sends what I approved.

## District five: the hands

Browser agents do the work that has no API: web consoles, dashboards behind a login, platforms that hate scripts. I wrote about the agent itself in [Browser Agents at Work](/blog/browser-agents-at-work-jev). What changed since is the organization around it.

[![browser-agents back office, "Profiles" page: twelve profiles shown as cards (channel-a, channel-b, partner-fr, channel-c, partner-en, calculator-site, agency, research, console, subcontractor, shop, sandbox) with their task count and last activity. Avatars are blanked.](/blog/one-person-it-department/browser-profiles.webp)](/blog/one-person-it-department/browser-profiles.webp)

**One profile per identity, fed as projects come.** A new rule from this morning: when a project needs an account on some platform, the account goes into a profile once. Cookies are copied from my own browser, and for the sites that refuse copied cookies, a "log in again" task opens a real browser where I only type the password, the captcha or the 2FA code. Then the account is declared, monitored, and tested with a silent read. From then on, every task on that account goes through the agents, not through my personal browser. My own browser keeps the bank, taxes, payments and anything that moves money. The temp agency does not get the company card.

**Every task now says who created it.** A routine, a scheduled job, a Claude session or me in the back office. Before today, nobody knew. The 890 tasks that existed before this change are labeled "Unknown", which is also the honest answer.

[![The tasks page of the back office filtering by source: from "All sources" to "Claude session (1)", then back. Task goals are fake, such as "Read the 20 newest comments and draft replies for review".](/blog/one-person-it-department/browser-tasks-source.gif)](/blog/one-person-it-department/browser-tasks-source.gif)

Also today: the small tool that drives my real browser kept bringing its window to the front while I was typing. I asked it to stop at four in the morning, with a lot of exclamation marks and one very long "a". The fix makes it refuse to open a tab in another profile, turn "open in new tab" links into navigation in the same background tab, and block anything that raises a window. The agent fixing it closed my browser by mistake while testing. Later, the same tool closed a tab I had opened myself, twice, in two different sessions. It now closes only the tabs it opened. It took two incidents and a ticket, the standard number of incidents a real IT department needs before writing a procedure.

One more, from a batch of map searches: between 12% and 90% of the pages came back blank and were counted as read. A page is now read only once its text is displayed, reloaded if it stays empty, and reported as empty otherwise. The rerun: zero blank pages, for eight cents of proxy.

## District six: the ledger

The inventory exists because I got lost. Too many hosts, registrars, mailboxes, services and links across too many projects. So I asked for one page that lists everything.

The first version listed my repositories. My correction is now the first line of the app's own instructions: *a project is not a repo*. A project is a thing that exists in the world (a SaaS, a client site, a channel) and owns several repositories, a domain, a mailbox, a host and some bills.

[![Inventory, "Projects" page: seventeen project cards with a status (Live, Archived, In progress, Paused), a description, a link and the services behind them (Cloudflare, Supabase, Hetzner, Vercel, GitHub Pages). Names and links are fake, for example "Crypto Regret: web game on serverless workers" and "Coinflip Lab: trading bots that turned every edge back into lead".](/blog/one-person-it-department/inventory.webp)](/blog/one-person-it-department/inventory.webp)

It is also kept up to date by the work itself: a hook at the end of every Claude session records any new repository the session created, so the inventory no longer depends on me remembering it exists. It collects every six hours, checks about 180 links, reads expiry dates from the registries, and flags problems. While filling it in, the agent found a contact address displayed on one of my sites that had never existed as a mailbox. Every email sent to it had been lost, for as long as the site had been online. The app paid for itself before I finished configuring it, which in IT terms means it will now be forgotten for a year.

## Districts seven and eight: the watchtower and the vault

Uptime Kuma watches twenty-six endpoints and pushes alerts to my phone. Systemd services restart themselves and send an alert when they give up. Every night at four, the mini PC backs itself up to an offsite storage box, prunes, checks the repository, and on Sundays restores a sample to prove that the backup is more than a ritual.

That was the theory. Then I asked who feeds what.

## Urbanisation du SI: walking the streets

The audit ran as five parallel agents, one per layer:

- **scheduled tasks and services**;
- **the Claude harness**: hooks, rules, sync, memory;
- **shared storage and the links between apps**;
- **couplings**: what breaks when something is renamed or moved;
- **business flows**: money, forms, data collection.

Each agent produced the same table for its layer: *producer, data, consumer, trigger, who notices a failure, enforced or on honor, last real result, proof*. That last column was mandatory. "It should work" was not an accepted value.

![Disaster Girl meme: a girl smiling in front of a burning house, "Monitoring: all green" and "The backup: dead since October".](/blog/memes/one-person-it-department-1.webp)

The verdict fit in one sentence, and I think it applies to most systems, not only mine:

**Everything that gets created is tracked. Everything that changes is not.**

A new repository, a new skill, a new inventory entry: hooks catch those at the moment of writing. A rename, a new service, a new kind of data, a deadline: nothing. The lists were copied by hand, and nothing compared the machine with its own registries.

A slice of the event table, anonymized:

| When this happens | It must update | Guaranteed by (before) | State found |
|---|---|---|---|
| A new repository or project | Index, inventory, project instructions | A hook, for the inventory entry only | The rest on honor |
| A new service or timer | Versioned unit, failure alert, monitor, backup list, inventory | An installer with a hard-coded list | Four registries, sixteen units without an alert |
| A rename or a move | Paths in units, hooks, skills, links, backups, docs | A list of renamed pairs | About thirty dead paths |
| A deadline (domain, plan, key) | Calendar, alert | Nothing | Forty-three deadlines without a reminder |
| A scheduled task fails | My phone | A per-unit flag, when someone remembered it | The learning pass exited 0 for three weeks |

And the findings, in the order that hurt:

- **The home server's backup had been dead since October 14.** The script crashed every night on the database of a service I had uninstalled. No alert reached me. Five weeks. The monitoring dashboard was green the entire time, because the monitoring watched whether services were up, and the backup was not a service, it was a hope.
- **Four registries described "what runs"**, each slightly different: a services page, the monitoring config, the routines app and the inventory. Ask four departments for the headcount, get four numbers.
- **About thirty dead paths** after renames: broken links in `~/.local/bin`, scripts pointing at old folders, backups still dumping databases from paths that no longer existed. The tool meant to detect couplings skipped JSON files and only looked inside repositories, so it found two.
- **Hooks that failed silently.** `|| true` and `except: pass`, written in a hurry to never block a session. They never blocked anything, including the alarm.
- **The monitoring tool itself** wrote 1.7 million log lines in a day, so the system journal only kept six days of history. The evidence for anything weekly had been rotated away by the tool collecting evidence.

![Buzz Lightyear showing Woody the horizon: "Registries" and "Registries everywhere".](/blog/memes/one-person-it-department-2.webp)

### What changed

The remedy is boring: **one source per subject, and a checker that compares reality to that source and complains.**

- **Failure alerts became the default.** Every service and timer alerts when it fails, without a list to maintain. Before, a new unit was covered only if I remembered to rerun an installer. Opt-out, not opt-in.
- **A check every morning at 08:40** compares what is running with the registries and alerts on any difference. On its first run it caught a service that another Claude session had added an hour earlier, without telling anyone. It is the first employee in this company who reads other people's changes.
- **Deadlines flow into the calendar.** The inventory computes renewals, and now pushes them as reminders: 19 created on the first run, no duplicates.
- **API keys left the services' environment.** They had been inherited by every service from my shell profile, so twenty-one services were restarted and checked one by one without them.
- **The backup was repaired**, and a new check alerts at 09:00 and 21:00 if any backup is older than 26 hours. That is the check that would have caught October 14 on October 15. The restore test got louder too: a failure in any step now fails the whole run.
- **Dead paths are scanned every morning at 08:30**, JSON files and `~/.local/bin` included.
- **The journal can keep about fifty days.** The first proof comes on December 22, at thirty days, and the ticket stays open until then. Yes, I have a ticket whose only job is to wait.

The fixes ran as seven parallel workstreams: three on Opus for infrastructure, backups and the harness, four on Sonnet for the apps, the browser agents, content plumbing and the sites. Each closed its tickets with proof or left them open with a reason. Around nine in the morning I asked whether this would take much longer, because I was getting close to my daily limit. The answer was an estimate, a proposal to stop the two least important workstreams, and a reminder that every finished fix was already pushed.

## Evolvability: the great rename

Half my tooling used to be named after the browser agent it started with. The agent's wrapper, my personal-browser driver, the QA harness, the voice interface, the back office: all variations of one three-letter name. Last night I decided this was misleading and asked for names that say what each thing does. Two sessions and a few hours later, everything had a descriptive name: browser agents, my browser, account state check, voice browser.

Even my CV PDFs had to be rebuilt, because they named the old tools. A rename is the cleanest test of evolvability there is, and mine failed it: the thirty dead paths above are its debris. The lesson made it into the event table. A rename is an event, and every event needs something that checks its consequences.

Same week, same idea: every app of the harness now speaks English, interface and notifications included. The apps tied to a client project keep the client's language. One rule, one line in the instructions, and a test that searches the rendered text for words in the other language rather than trusting a screenshot. A screenshot proves the layout. It doesn't prove the last French button is gone. Clicking through every screen to check the translation, I also noticed that a status badge stayed yellow after I answered a yes-or-no question. Translation is the best bug hunt I know, because it makes someone read every string.

## Tickets: the backlog that ate itself

Remember the ratio: 90 closed, 258 created in a week.

One of my oldest rules says *everything becomes a ticket*: any problem found along the way, any leftover, any missing piece. I forget things, tickets don't. It worked. It worked so well that this morning I had **301 open tickets across six accounts, 242 of them created in November**, almost none with a priority, and no way to tell what had been fixed indirectly and never closed.

I am not alone. One Reddit thread from this month is titled *"The harder I use CC, the larger the backlog gets"*, and its best answer is the rule I took: agents may create cards, but **only a human moves a card to "ready"**, and "ready" stays short. Next.js published the other half when they closed about 1,500 issues with agents: one agent scores how closable each ticket is, and a second one argues to keep it open.

![Two astronauts in space: "Wait, it's all agent tickets?" "Always has been".](/blog/memes/one-person-it-department-3.webp)

So now:

- **Every ticket gets a priority**, P0 to P3, with the same labels and colors in every repository, so one search covers everything. Problems found along the way default to P3.
- **Duplicates are searched among open and closed tickets** before creating one. A problem that comes back after a fix links to the old ticket.
- **`agent-ok`** marks a ticket a local model can do alone. **`ready` is mine.** No agent sets it.
- **The local model triages the whole backlog for free.** Two passes of the 27B over 303 tickets, about 1 h 20 each, zero euros, zero errors. 160 not started, 99 partial, 33 unclear. My fear was "done but never closed". The truth was worse: it is mostly real work.
- **A night loop** runs from 01:00 to 07:00, takes `ready` and `agent-ok` tickets, and opens at most twelve pull requests labeled `agent-local`. Nothing reaches `main` without me.

The triage proposed eleven tickets as done or obsolete. A Claude session checked them: eight could be closed, three could not. One of the three is the best result of the day. The local model rated an untouched bug **"done, confidence 95"**. A second agent, whose only job is to argue for keeping tickets open, blocked it.

So the rule is written down: **the local model proposes, it never closes.** And in the dry run of the night loop, the local reviewer rejected the local fixer's pull request because the test it added proved nothing. The system rejecting its own work on the first night is the most reassuring thing it could have done.

## The local model: leverage, measured

The part everyone asks about. I run Qwen3.8-Flash-Next, a 180B model, on Strata, on an RTX 3080 20 GB and 64 GB of RAM. It writes 110 to 210 tokens per second and reads 1,000 to 3,000, depending on the length of the prompt. What is that worth in a harness that also has a Claude subscription?

[![Services page of the mini PC: RTX 3080 eGPU at 93% memory with the 180B model loaded, RAM at 84%, processor at 19%, and a "Local AI" section with the model switcher, the RTX arbiter ("Target: Strata, default") and the list of models that can be loaded on the GPU.](/blog/one-person-it-department/services.webp)](/blog/one-person-it-department/services.webp)

### One name, several brains

No caller in my harness names a model. Routines, the agent gateway and the browser agents all ask for one alias. Behind it, a small arbiter decides: the 180B model by default, and when RAM runs short, a 27B model that fits almost entirely on the GPU. The callers never know, and never fail. They just get a slightly less brilliant colleague for a while.

Last night I asked whether I should move my whole Claude infrastructure to a VPS and keep the PC for compute, because a video render next to the 180B model made everything crawl. The answer was no, and the reasoning was better than my question: the fight is between the model and the render, both of which stay on the PC. A VPS would change nothing. What was missing was the render asking for memory before starting. Now it reserves RAM, the arbiter swaps to the 27B, and the RAM comes back when the render ends. In a dry run, available memory went from 4 GB to 44 GB and back. Cost of the fix: zero. Cost of the VPS I didn't rent: also zero, every month.

### Where it wins

- **Bulk work at zero marginal cost.** Triaging 303 tickets twice on the 27B costs nothing but electricity and patience. Same for summaries, classification, first drafts of routine reports.
- **Privacy.** A separate instance of my browser agents handles confidential tasks with the local model only. Claude has no access to it, by construction, not by promise. Voice notes are transcribed on the CPU. A group chat bot runs on a 4B model. None of that leaves the house.
- **Always on.** Routines don't care about my weekly limit, and the arbiter keeps a model answering even when I steal the GPU.

### Where it doesn't

I wanted the local model to save my Claude subscription by doing fixes that Claude would only review. So I measured it: the same bug fixes done five ways, scored by a judge model.

| Who fixes it | Quality (judge, /10) | Share of my weekly limit | My wait |
|---|---|---|---|
| Opus alone | **7.2** | 0.024% | 2 min 50 |
| Sonnet alone | 5.5 | **0.0075%** | **1 min** |
| Opus reads the code, then delegates to the 27B | 6.6 | 0.025% (nothing saved) | 4 min |
| Opus delegates without reading (27B) | 4.7 | 0.015% (40% saved) | 8 min 30 |
| Opus delegates without reading (180B) | 6.5 | 0.021% | 7 min |

The local coding agent passed the tests 13 times out of 13. It missed what the tests didn't check: a function written correctly and never wired where it was needed. Only Opus, reading the code, thought of it. On the 180B model, the agent also tried to download the real source code from GitHub instead of fixing the bug. I discarded that run. It was, to be fair, the most senior-engineer move of the whole benchmark.

The order of magnitude settles it. My week had used 39% of my plan for the equivalent of about $2,350 at API prices, so one percent is worth about $60 (an estimate: the plan's accounting is not published). Twenty delegated fixes a week would save about 0.2 points of a normal week's 80. Sonnet alone is cheaper than any delegation, and faster.

So the rule changed: delegating code to the local model is for weeks when the limit is nearly gone, or for code that must not leave the machine. Not a savings plan.

### New models, same exam

Every week, X announces a model that changes everything. Today I looked at two. The first, a new small model, ran on two community engines. One writes 116 tokens per second, up to twice my 27B fallback, and scored 21 out of 40 on the web-agent exam my main model passes at 36. It also clicked "Contact" in a task explicitly marked read-only, a trap my main model falls into as well, so I can't even be smug about it. The other engine never stopped thinking, even with reasoning effort set to zero, and produced no answer within the budget. The second model was ruled out without downloading anything, from what people who ran it reported: about four times slower, and rereading the whole conversation at every turn under my engine. Speed gets a model into my benchmark. The exam decides whether it gets a job.

## A normal day of maintenance

For completeness, the rest of today's tickets, because a real IT department is mostly this:

- **A tweet** promised faster browsing by changing DNS servers. The agent checked my ISP's box: it does not allow changing them, there is no such field in its interface code, and it already caches answers (0 ms for a site already visited, 81 ms the first time, against about 50 ms for a public resolver). Taking over DHCP from the mini PC would make the whole house lose internet when it reboots, to save 30 ms on sites I have never visited. Verdict: the tweet works in a city where the local DNS is slow. Mine isn't. Nothing changed.
- **A one-pixel line** appeared at the top of my laptop screen whenever a maximized browser sat on the portable monitor next to it. The suspect is the browser drawing one pixel outside its own window, in a layer the window manager doesn't clip. Two logouts and one precise question later ("how exactly do you maximize it?"), a fix in a small window-manager extension is waiting for my next logout. Not verified, so not fixed.
- **Statistics files** had been rewritten every three hours but never committed since Thursday: 750 lines waiting. They now commit and push themselves.
- **The accounting app** now records payouts from the platforms I sell on, warns when the last bank statement is more than seven days old, and drops a reminder in the calendar every Monday at 14:00 to fetch a new one. An independent review found two defects in the payout code before anything changed in the books. Every existing number stayed the same, which in accounting is the only acceptable kind of excitement.
- **A paused project** was reported as "broken" by three different apps. It is now "paused" everywhere, because a system that can't tell a pause from a failure trains you to ignore red.

## What I'd tell anyone running a one-person IT department

1. **Track changes, not only creations.** Every registry needs a checker that compares it with reality and complains. Mine runs at 08:40 and has already caught another session's undeclared service.
2. **Make failure alerts the default.** Opt-in alerting covers what you remembered. And never trust exit code 0 from something that wraps its own errors.
3. **Give your models one name.** Callers ask for "the model", an arbiter decides which one answers. Swapping brains becomes an operations detail, not a refactor.
4. **Use local models for bulk and privacy, not as a discount on your subscription.** Measure before you believe. Mine saved 0.01 points per fix and cost three times the wait.
5. **Local proposes, a stronger model or a human closes.** A confident 95 on an untouched bug is what a second opinion is for.
6. **Only a human sets "ready".** Agents will happily fill any backlog. The scarce resource is your attention, so guard the column that spends it.
7. **Name things for what they do.** Then plan the rename like a migration, because it is one.
8. **Ask "who feeds what, and when?" once a quarter.** It's the cheapest audit there is, and the only one that finds the backup that died in October.

Somewhere a CIO is approving a budget for an enterprise-architecture program, with a steering committee and a twelve-month roadmap. Mine took a Sunday, five agents, one table, and the humbling discovery that my most important safety net had been failing for five weeks while every dashboard said green. The city has a plan now. The plan has a ticket. The ticket has a priority. Only I can mark it ready.
