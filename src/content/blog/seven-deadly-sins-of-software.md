---
title: "The Seven Deadly Sins of Software Development"
description: "Pride, sloth, greed: two early Christian writers listed the sins, and your codebase commits all seven."
pubDate: 2026-03-25
tags: ["Engineering", "Career", "Satire"]
cover: "/blog/seven-deadly-sins-of-software.webp"
coverAlt: "A code editor covered in seven sticky notes, each with a pictogram for one sin: crown, hoarded boxes, heart, green grass, overflowing bowl, lightning bolt, snail."
---
In the late fourth century, the monk Evagrius Ponticus listed eight evil thoughts. In 590, Pope Gregory the Great trimmed them into seven deadly sins. Neither had GitHub. Both would recognize your codebase, and mine.

I've committed all seven, some of them in the same pull request, so the stack traces below include mine.

---

## I. Pride (*Superbia*): The "God Object" Delusion
> *"I don't need tests. I am the test."*

Pride is a logic error: you mistake your mental model for reality. It's the senior dev who builds a proprietary framework because "nothing else is good enough", becomes the only person who can debug it, and calls that job security.

The God Object in your code mirrors the one in your head: everything routes through you. If your code can't survive a junior dev's curiosity, your genius is technical fragility with a nice README. The penance is boring: write the tests you claim you don't need, and let someone else try to break it.

## II. Greed (*Avaritia*): Architectural Hoarding
> *"Abstractions today, Scale tomorrow."*

This is premature optimization as a spiritual sickness. You hoard possibility and deliver no utility. You build a Kubernetes cluster for a landing page because you're greedy for a future that hasn't happened yet, and the landing page still has a typo in the hero.

Greed is an anxiety loop: you buy insurance against change by adding layers. Complexity is the highest tax in the universe, and every "just in case" abstraction is a debt trap for your future self, who already has enough problems.

## III. Lust (*Luxuria*): The Hype-Cycle Thirst
> *"Ooh, a new JS runtime. My current stack is so... 2025."*

Shiny Object Syndrome, elevated to a fetish. You chase the dopamine of a `Hello World` in a new language and call it innovation. You're looking for a magic bullet to solve a discipline problem. Don't ask how many abandoned `hello-world` folders I have.

Lust is distraction as a defense mechanism: you avoid the boring work on the existing debt by flirting with a new repo. Every framework starts as a honeymoon and ends as a marriage. If you can't commit to a boring stack, you'll never ship anything old enough to be called legacy.

![Meme: she thinks "I bet he's thinking about our deadline", he thinks "A new JS runtime shipped yesterday".](/blog/memes/seven-deadly-sins-of-software-1.webp)

## IV. Envy (*Invidia*): The "Green-Grass" Psyop
> *"Look at the Vercel stack. Why are we still using this legacy garbage?"*

Envy is external validation gone rogue. You compare your behind-the-scenes footage to everyone else's highlight reel. You read one blog post about a zero-downtime migration and conclude your team is a circus.

It makes you resent the tools that pay your rent. Every perfect architecture is held together by duct tape and prayers that never make it into the Medium article.

## V. Gluttony (*Gula*): Dependency Bloat
> *"There's an NPM package for that. Let's add it."*

Gluttony is the consumption of convenience. You won't write 10 lines of vanilla code, so you import 10,000 lines of someone else's risk. Your `node_modules` is a digital heart attack waiting to happen.

You trade long-term stability for short-term fullness. Every dependency is code you now have to trust and update. Add one when it saves more than it costs, and read what it drags in with it.

![Y'all Got Any More Of That meme: "Y'all got any more of them npm packages".](/blog/memes/seven-deadly-sins-of-software-2.webp)

## VI. Wrath (*Ira*): The `git blame` Witch Hunt
> *"Who wrote this trash? I'm going to flame them in the PR."*

Wrath is ego protection that calls itself quality control. You use code review as a weapon to keep your rank, and the comment thread reads like a sentence for whoever offended your aesthetic.

It turns a team into a zero-sum war. Today's "idiotic code" is tomorrow's "necessary compromise", and `git blame` keeps the receipts. If you can't refactor with empathy, you're a highly paid bully with a linter.

![Batman slapping Robin meme: Robin says "Who wrote this trash?", Batman answers "git blame says you did".](/blog/memes/seven-deadly-sins-of-software-3.webp)

## VII. Sloth (*Acedia*): Spiritual Dead-Ends
> *"Meh, it's 'Good Enough' for government work."*

Sloth is the refusal to care. You merge the PR with the broken linter because you checked out emotionally sometime around the last reorg.

Once you stop caring, every shortcut stays in the codebase, and entropy does the rest. If you don't give a damn about the "why", the "how" will bury you.

---

### The Final Patch
Skip the confessional and open a refactor branch. Each sin has a fix you can ship this week: a test for Pride, one layer fewer for Greed, a boring stack for Lust, a closed Medium tab for Envy, one dependency fewer for Gluttony, a kinder review for Wrath. Sloth gets fixed last, as tradition demands.
