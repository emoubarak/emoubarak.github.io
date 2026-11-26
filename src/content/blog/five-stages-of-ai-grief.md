---
title: "The Five Stages of AI Grief: A Developer's Obituary"
description: "Denial, anger, bargaining, depression, acceptance. Kübler-Ross described patients facing their own death. Developers used it to describe a GitHub Copilot subscription."
pubDate: 2026-03-18
tags: ["AI", "Career", "Satire", "Engineering"]
cover: "/blog/five-stages-of-ai-grief.webp"
coverAlt: "A developer with a laptop in a rollercoaster cart at the bottom of the curve, the track climbing back up toward the sun."
---

If you've spent the last decade building a personality around your ability to debug a race condition at 3 AM, the era of intelligence on tap feels like a personal insult. I'm a developer too, so read this as a group selfie.

The industry is going through the five stages of grief, mostly in public, mostly on LinkedIn.

---

## 1. Denial: The "Glorified T9" Cope
> *"It's just a stochastic parrot. It's spicy autocomplete. It doesn't 'know' anything."*

Yes, it predicts the next token. Your brain predicts what comes next all day, to keep you from walking into traffic, and nobody calls it autocomplete.

Calling AI "spicy autocomplete" is like calling a nuclear reactor "a fancy way to boil water": factually true and strategically useless. It hurts your sense of being special: you thought your creative spark was a proprietary API, and then someone published the endpoint.

![Mocking SpongeBob meme: "It's just spicy autocomplete", repeated in a mocking voice.](/blog/memes/five-stages-of-ai-grief-1.webp)

## 2. Anger: The LinkedIn Rant
> *"These 'vibe coders' are going to burn the world down. Hallucinations! Security risks! Theft!"*

When the cope fails, the moral framework comes out. This is where senior architects start posting threads about the death of craftsmanship. They're mad that the proof-of-work they did for twenty years can be skipped by a kid with a $20/month subscription and a "let's see what happens" attitude.

The security paragraph of the thread is right, which is annoying. Generated code does leak keys and skip auth checks, and someone has to read the diff. That paragraph sits under six others about learning C on a borrowed laptop, so it gets skimmed. Meanwhile, if a junior ships a working MVP in a weekend while you argue over the linter config, the market will not wait for you. You're shouting at a server that was decommissioned last quarter.

## 3. Bargaining: The "AI-Augmented" Rebrand
> *"I'll just become a 'Prompt Engineer.' I'm the pilot, the AI is the engine."*

This is the middle-management maneuver: you try to negotiate a peace treaty with a force that doesn't sign anything. The cheapest move is the title. Overnight, every profile in your network has "AI" in it somewhere, and I'm in no position to laugh, because mine does too.

Changing the title takes a minute. Reading a 600-line diff that a model wrote in four minutes, and catching the one line that drops a permission check, takes months to learn. That second skill is the job now, and it never makes the headline.

![They Don't Know meme: a guy alone at a party thinking "They don't know my LinkedIn title says AI Pilot now".](/blog/memes/five-stages-of-ai-grief-2.webp)

## 4. Depression: The Existential Blue Screen
> *"Why even open VS Code? The machine already wrote the solution 4 seconds before I finished the prompt."*

The quietest stage. You realize that typing code is no longer the scarce part of the job.

It's a Dark Night of the Soul for people who use Jira. If the "what" is automated and the "how" is instant, who are you? If your only answer is "I write React", this stage lasts a while. I recommend a walk, then a long look at your test suite, which is now the most valuable code you own.

![This Is Fine meme: a dog in a burning room, "The AI shipped my ticket. This is fine."](/blog/memes/five-stages-of-ai-grief-3.webp)

## 5. Acceptance: Becoming the Ghost in the Machine
> *"I solve problems, and code is one of my tools. Next question."*

Acceptance is a change of scoreboard. The developers who make it through judge the result: does it work, is it tested, is it safe. "Developer" was a job description all along, and job descriptions get updated.

They treat code like supermarket chicken: a pre-packaged ingredient. You don't need to raise the bird to cook a good dinner. You still check the date on the pack.

My own days look like this now: I write instructions for an agent, read its diffs, and send back the ones that skipped a test. My younger self would call that middle management, and he would have a point.

---

### The obituary

The obituary is for the ego of the 21st-century nerd, and the job outlives it. The code was the physical layer of your intent, and that layer got a large hardware upgrade in the last two years. Adapt, or become legacy code: the module everyone depends on, nobody understands, and someone rewrites with an agent over a weekend.
