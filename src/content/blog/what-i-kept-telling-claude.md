---
title: "What I Kept Telling Claude: Four Months of My Own Corrections"
description: "Four months, two machines, about 4,000 prompts. The same few corrections came back in every project. What they were, why writing them down was not enough, and where each fix actually belongs."
pubDate: 2026-09-05
tags: ["AI", "Claude", "Workflow"]
cover: "/blog/what-i-kept-telling-claude.webp"
coverAlt: "The same chat message repeated four times, the last one pinned into a notebook of rules."
tldr:
  - "The corrections I repeated were the same handful in every project: check it, do it yourself, use the tool I named, be clear, look it up, don't sound like AI."
  - "My workspace leaked: lessons trapped in one project, stale contradictory memories, and prose rules where a hook was needed."
  - "Now each lesson goes in the narrowest place that works, and a weekly pass promotes or strengthens rules instead of piling them up."
---

In [the PDFold post](/blog/how-i-built-pdfold) I wrote that the value of an AI workspace compounds: correct the workspace, not the chat. Four months later I wanted to know whether that was actually working. So I had Claude read my entire history: every prompt I typed into Claude Code since May on my two machines, about 4,000 of them, plus the full transcripts of the last month, 118 sessions across a dozen projects.

A rough keyword filter says that around 5% of my messages correct the agent. It's a filter, not a measurement, so I only use it as a trend. The volume didn't surprise me. What did surprise me is that it was the same handful of corrections, coming back project after project, weeks after I had "taught" them.

## The six things I kept saying

### 1. "Did you actually check it?"

By far the most frequent. The agent says done, and it isn't: a page it never looked at at my screen width, a fix it never replayed with the account that had the bug, a backend change whose migration was never applied to the deployed database. One message from May sums it up: *"still a 503. Test it and verify, and don't stop until it works."*

![Futurama Fry meme: "Not sure if it's done, or the agent just said done".](/blog/memes/what-i-kept-telling-claude-1.webp)

What works: define done as "observed working where it will be used", and give the agent eyes. I now have a small tool that takes full-page screenshots at my real widths (1920, 1440, 1366, 768, 390) and reports overflow, broken or stretched images, and elements off screen. The agent has to open the PNGs and look at them. For clicks and flows, a browser agent. For code, the CI run, but only when the change can break something: a docs commit gets pushed and that's it, a migration gets watched to the end.

### 2. "You can do that yourself."

The agent hands back steps it could have done: run the migration, set the secret, open the console page, re-run the build. Some version of "the keys are in my .bashrc" appears dozens of times in my history.

This one is on me as much as on the model. When the boundary of autonomy isn't written down, a careful model defaults to asking. So I wrote it as a decision with its limits. In scope and done without asking: anything reversible, anything on a test environment, the obvious next step of the request. The real stop points, a short list: real money, production when it's gated by my go, publishing under my name, irreversible deletes, passwords, captchas and 2FA. Plus where credentials live, so "I need a token" starts with looking for it. And one sentence that changed a lot: don't end a turn on "shall I run it?" when the answer is obviously yes.

### 3. "I told you to use X."

My browser automation runs on an agent called jev. My coding agent kept reaching for a different browser integration it was primed toward. The rule was in my global instructions, in two project memories, and in a skill. I still counted something like fifteen repeats. One message just says: *"that's the fifteenth time you pull this on me."*

![Bernie Sanders meme, me to my coding agent: "I am once again asking you to use jev".](/blog/memes/what-i-kept-telling-claude-2.webp)

Written rules lose against strong defaults. When a rule fails twice, it should stop being prose. A twenty-line `PreToolUse` hook now denies that tool and explains which one to use instead, unless my message explicitly asks for it. I added it this week, so I can't claim a result yet. The point is that it no longer depends on the model remembering.

### 4. "I didn't understand."

Long answers, jargon, fixture names I had never seen (*"wait, what are the three lapsed accounts?"*). The fix is a format, not a tone: the first line is the answer or the status (done or not, where to check, which account), then a few lines in plain language, every technical or tax term explained in a few words, a concrete example rather than a diagram. Anything I have to do by hand: numbered steps, with button labels in the language my interface shows.

### 5. "Look it up."

Prices, tax rules, platform policies, console procedures, all stated from memory. Sometimes wrong in a way that costs money: an assumed VAT regime produced a wrong amount to pay. The rule now: anything time-sensitive, legal or financial comes from a source fetched in the session, cited, and labeled "verified" or "estimated". My own documents come before any assumption about my situation. And when I push back, the agent re-checks. It shouldn't cave, and it shouldn't dig in.

### 6. "That sounds like AI."

For client websites: em dashes, sentences that justify themselves (*"company deliberately left unnamed"*), filler labels in stat cards, vague taglines that could belong to anyone. These are now explicit bans, each with its reason, inside a skill that also carries my design taste. Plus one process rule: flagged once means fixed on every page, not just the one I pointed at.

## Why the workspace alone didn't stop it

The feedback loop from the PDFold post works. But reading four months of history showed me three leaks in it.

**Lessons trapped in one project.** Claude Code's auto memory is per project and per machine. A correction made while working on my agency site lived in that project's memory, and the same mistake happened the next week in another repo. Some of my most universal preferences existed in four different project memories and nowhere global. On my second machine, a whole set of lessons simply didn't exist.

**Contradictions.** One project memory, written from an outdated skill, said the browser agent "can't type". Another one said it can. The agent believed the wrong one at the wrong moment. A stale fact is worse than a missing one, because it sounds authoritative.

**Prose where enforcement was needed.** See #3. Some rules are really checks, and checks belong in code.

## Where each fix belongs now

The narrowest place that works:

| If the lesson is... | It goes in... | Example |
|---|---|---|
| checkable by a machine | a hook or a script | the browser-tool guard, the screenshot tool |
| about one kind of task | a skill | building client sites, filling admin forms |
| true in every session | global instructions, kept short | autonomy and its stop points, answer format |
| about one project | that project's instructions | deploy flow, environment quirks |

The global file stays under about 120 lines. Each rule states the behavior, its limit, and why, in a sentence or two. No capitals or "CRITICAL": the reason does the work, and recent models over-apply rules that shout.

Around it there's now a loop. A hook flags messages that look like corrections, and the agent stores the lesson with its scope (this project or everywhere). Once a week, a scheduled pass reads the new corrections from both machines, promotes what applies everywhere, and handles the most important case differently: when a correction hits a rule that already existed, it doesn't add a duplicate. It makes that rule more concrete, moves it closer to where the mistake happens, or turns it into a hook. Every change is a git commit I can read or revert. The number I watch is the share of my messages that correct the agent, week by week. I'll report back on whether it goes down.

## The bad habits were mine too

- **Correcting in the chat and moving on.** The fix dies with the session.
- **Letting instruction files grow unreviewed.** A long file dilutes the five rules that matter.
- **Never looking across projects.** The expensive repeats were cross-project.
- **Asking for options when I wanted a decision.** "Give me variants" produced variants. "Pick the best one and tell me why in one line" produced a finished site.
- **Not saying what I'd accept as done.** "Fix the hero" is a different task from "fix the hero and show me 1920 and 390".

## What I'd tell anyone using Claude Code daily

1. Read your own history once. The corrections you repeat are your real instructions.
2. Write autonomy as a decision with explicit stop points, not as a vibe.
3. Define done as observed, and give the agent the tools to observe.
4. When a written rule fails twice, enforce it with a hook.
5. Put each lesson in the narrowest place that works, and promote what's universal.
6. Hunt stale facts in memory. They do more damage than gaps.
7. Measure your correction rate. If you can't see the trend, you can't tell whether your setup is learning.
