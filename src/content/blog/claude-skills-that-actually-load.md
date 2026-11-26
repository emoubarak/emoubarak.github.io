---
title: "Four in Ten Skills Missed: Making Claude Code Load the Right Ones"
description: "Replaying my own prompts showed Claude Code loaded only 57% of the skills a request needed. A hook in my own words took it to 84% on prompts it was never tuned on."
pubDate: 2026-11-20
tags: ["AI", "Claude", "Workflow"]
cover: "/blog/claude-skills-that-actually-load.webp"
coverAlt: "A cabinet of many closed drawers with three of them open, and a signpost pointing to all three at once."
tldr:
  - "With 90 skills, Claude loaded only 57% of the skills my requests needed, and all of them in half the requests. Good descriptions were not enough."
  - "A small hook that names the matching skills in my own words, and reminds Claude that a request often needs several, took that to 84% on held-out prompts."
  - "The bench, the hook and the weekly review are open source."
---

I write skills for everything I do more than twice: a skill for my static sites, one for my internal dashboards, one for SEO, one for TikTok carousels, one for bookkeeping, one for GitHub tickets. Some are mine, some come from plugins. Across my repos a session now sees between 80 and 95 of them.

I don't remember their names, and I don't want to. The whole point is that I say what I want and Claude picks the right playbook. Except my history kept showing messages like *"use our skills properly, we have good ones now"* and *"use as many of our skills as you can, especially the motion graphics"*, so I measured how often Claude loaded the right ones.

## The bench

I pulled every prompt I typed in the last 75 days, 4,370 of them, with the skills Claude loaded after each one. That shows what Claude did. The next step was a gold set: for each prompt, the skills that change how it should be handled. Several are allowed, because a real request is rarely one thing. *"Add a ticket to test the new research flow, then generate the two videos, use the motion graphics"* needs three. About a third of the set needs no skill at all, so that a router firing on everything can't look good.

Then I replayed those prompts through `claude -p`, same model, same skills, same hooks, each one in the directory it was typed in, against a copy of my config. A guard hook lets Claude choose skills and read files, and refuses everything else. The prompt that says "open a ticket and push" opens nothing and pushes nothing.

The baseline, on held-out prompts: **57% of the needed skills loaded, and every needed skill in only half the requests.**

## Two causes I ruled out

My first guess was the listing budget. Claude Code reserves a slice of the context for skill descriptions, and past it, the least used skills lose theirs and almost never fire again. It had bitten me twice, in October and November. With the budget raised, it was no longer the cause.

My second guess was bad descriptions. Partly true, and one finding was embarrassing: a project skill had a multi-line description with a colon inside, which is not valid YAML. Claude Code fell back to the title without a warning, so for a month that skill was announced to the model by its title alone.

But the clearest miss had a perfect description. *"Check the Search Console notifications for the agency site, I think there are things to fix"*: Claude loaded the browser skill and skipped the SEO skill, whose description contains "Search Console notifications" almost word for word. A matching description was not enough: on that prompt, Claude picked the browser skill.

## A hook in my own words

A `UserPromptSubmit` hook that adds one or two lines to each prompt:

1. **The skills that match, in my words.** One regex per skill, written from how I ask for things: "the GSC data", "make it a skill", "post it on X", "what were our benchmarks". Project skills are only suggested inside their repo. Each skill is named once per session.
2. **A reminder** that a request often needs several skills, so Claude doesn't stop at the first match.

| Held-out prompts (77 needing skills, 40 needing none, 2 passes) | Without | With |
|---|---|---|
| Needed skills loaded | 57% | **84%** |
| Requests with every needed skill | 52% | **82%** |
| No-skill prompts left clean | 99% | 95% |

A third set of 80 requests, drawn after the last round of fixes, gave 74% to 93%. Because a first message is the easy case, I also replayed 28 prompts in the middle of their real session, with the transcript cut right before the prompt and resumed: 43% to 80%. A last set of 50, drawn after the final rule fix: 82% to 94%.

It costs about 150 tokens per prompt and 20 milliseconds. No model call.

## One sentence, four points

On the tuning set, the rules alone and the reminder alone gave the same gain, 66% to 84%, and 89% together. Then I changed one sentence. The first version said *"load each one that really applies"*, and Claude used that "really" to argue its way out of suggestions. The second says *"before any other action, load them; skip one only if it is clearly off topic"*. That change alone moved recall from 89% to 93%.

Four targeted description fixes took it to 96%. The browser skill now opens with "any reading of Reddit, X or a logged-in site goes through this skill", because plain web search can't reach those, and Claude kept assuming it could. The writing-cleanup skill now says it is not for video scripts, which have their own taste guide.

## Tried and dropped

- **Hiding skills.** I set 17 overlapping third-party design and 3D skills to name-only. Same recall, more noise on the prompts that need nothing.
- **Renaming skills.** I considered it, since I can't remember the names. But the names were already explicit, renaming breaks every reference in my docs and hooks, and with the router I no longer need to remember them.

## The weekly review

My rules drift out of date: I start a new project, I phrase things differently. The hook logs what it suggested, and a weekly job compares that with what Claude loaded. It lists three things: suggestions taken, suggestions ignored (a pattern too wide), and skills loaded without a suggestion, quoting my prompt. That last list gives me the words to add. It also collects my own complaints about skills, and re-scores the rules against the gold set so an edit that hurts shows up. The report lands in my weekly learning pass, the same one that turns my corrections into rules.

## Caveats

One user, one language (I write to Claude in French), one model: Claude Opus 5.5 in Claude Code 2.1.328. A skill Claude would load later in a real session, or had already loaded earlier, counts as a miss on both sides. The labels were proposed by four labeling agents and reviewed in a second pass, and some are judgment calls. Extra loads roughly doubled. Most are defensible, like the design skill on a "this interface is ugly" prompt, but each costs context.

The hook, the bench and the weekly review are on GitHub as a Claude Code plugin: [emoubarak/claude-skill-router](https://github.com/emoubarak/claude-skill-router). Your rules will look nothing like mine, so start from your own transcripts.
