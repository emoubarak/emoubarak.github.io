---
title: "A 180B Model in a Shoebox: Field Notes From My Local Inference Week"
description: "A mini PC, a 2020 gaming card on a cable and a 180-billion-parameter model. What it ran at, what it crashed, and why local inference took a real step up this year."
pubDate: 2026-10-15
tags: ["AI", "Local inference", "Satire", "Hardware"]
cover: "/blog/a-180b-model-in-a-shoebox.webp"
coverAlt: "A tiny mini PC and an external graphics card connected by one cable, feeding from a wall of thousands of small drawers that reaches the ceiling."
tldr:
  - "A 180B mixture-of-experts model now writes at 55 tokens per second on a mini PC with an 8 GB card plugged in over a cable."
  - "Most of the gains came from software released this year, and from replacing one cable."
  - "Local inference moved a lot in 2026, and the open pull requests say it isn't done."
---

Every year someone announces that you can run a frontier-class model at home. Every year "at home" turns out to mean four GPUs, a 1,600 W power supply and a spouse who no longer asks questions. This year I tried it on the hardware I actually own: a Minisforum mini PC the size of a shoebox, 64 GB of RAM, and an RTX 3060 Ti with **8 GB of VRAM**, sitting outside the case in an eGPU dock and talking to the PC through a single OCuLink cable.

The model: **Qwen3.8-Flash-Next**, 180 billion parameters, compressed to 2 bits. The engine: **Strata**, an open-source runtime built for exactly this kind of bad idea.

## The trick: you only need 6 billion of them at a time

A mixture-of-experts model is a committee of **24,576 small specialists**, and each token only consults 10 of them. About 6B parameters do the work for any given word. The rest wait in RAM like interns hoping to be useful.

My 8 GB card holds roughly **800 of those 24,576 experts**. Strata keeps the most popular ones on the GPU, lets the CPU compute the others, and streams experts over the cable when that's cheaper. In other words, the whole performance story of this machine is a logistics problem.

## Day one: 20 tokens per second and a haunted cable

First run: **19 to 23 tokens per second** when writing, and **85 tokens per second** when reading a prompt. A 7,900-token document took a minute and a half to read. Usable for chat, painful for anything agentic.

The cable was the problem. The OCuLink link kept collecting errors and freezing the PC, so I had capped it to PCIe Gen 3. Reading a long prompt means moving most of the experts across that link, again and again, at about 1 GB/s.

![Ancient Aliens meme: "I'm not saying it was the cable. But it was the cable."](/blog/memes/a-180b-model-in-a-shoebox-1.webp)

Meanwhile the BIOS was quietly reserving **16 GB of my RAM** for the integrated GPU. I found the setting's address in the firmware, wrote the UEFI variable by hand from Linux, rebooted twice and verified the value. The firmware ignored it completely. What worked in the end was rebooting into the setup screen and clicking the option with a mouse, like a person from 2009.

## The upgrades, ranked by how stupid they feel

1. **Calibration.** Strata ships a calibration step that tries settings and keeps the fastest. One command took writing from ~21 to **37-55 tokens per second**. I hadn't run it in the first week because I don't read READMEs either.
2. **A new cable.** One replacement OCuLink cable later, the link ran stable at PCIe Gen 4: prompt reading went from 85 to **about 390 tokens per second**. The same 7,900-token prompt now reads in 20 seconds.
3. **Updates.** Two engine releases in one week. Today's numbers: **54-57 tokens per second** writing, **389** reading.

For scale: in May, on the same card, a 35B model wrote at 37 tokens per second. Now a model five times larger writes faster.

![Leonardo DiCaprio Cheers meme: "When the 180B model writes faster than the 35B did in May."](/blog/memes/a-180b-model-in-a-shoebox-2.webp)

## Is it actually smart, or just big?

Fair question, because a 2-bit model is a model with its memory partially sanded off. On 20 hard math problems (MATH-500, level 5) it scored **16/20**, against 13/20 for the 35B model I was using before. On three real agent tasks run through the pi coding agent with a browser, it finished **3 out of 3**; the 35B finished 2 and, on the third, invented commands that don't exist. As a decision engine for my [browser agent](/blog/browser-agents-at-work-jev), it now answers in about 5 seconds per decision, four times faster than the week before.

Nobody will mistake it for Claude: a first Claude Code turn with 31,000 tokens of context still takes about two minutes. It is, however, a model that runs offline, on my desk, without a subscription and without asking anyone for permission.

## What didn't work, for balance and humility

- **The integrated GPU.** Strata can also run on the Radeon 780M inside the mini PC. The latest version made it 50% faster at writing (10 to 15 tokens per second), then hit a long prompt, hung the GPU and took the whole desktop down with it. Third crash. The integrated GPU is now retired from this hobby.
- **DFlash**, the new diffusion-based speculative decoding everyone was excited about. On this setup it made the 35B model slower (25 vs 37 tokens per second). It shines when the base model is slow; mine wasn't slow enough.
- **Community patches.** Strata gets a ridiculous number of pull requests: around **60 opened in a single day**. I built and benchmarked the three that looked relevant. One made writing slightly slower, one switched itself off because my experts already live in RAM, and one refused my 2-bit format. That's how open source testing goes: most patches are for someone else's machine.

![Disaster Girl meme: "One quick iGPU benchmark. The desktop it was also displaying."](/blog/memes/a-180b-model-in-a-shoebox-3.webp)

## Why this year was different

A year ago, "local LLM on a consumer card" meant a 7B model that apologized a lot. What changed in 2026 is a pile of improvements landing at the same time:

- **Mixture-of-experts models with tiny active sizes.** 180B of knowledge, 6B of work per token.
- **Aggressive quantization that holds up.** 2-bit formats that still score well on math and agent tasks.
- **Speculative decoding that pays.** Models now ship with multi-token prediction heads, and DFlash landed in llama.cpp in June.
- **Engines that treat RAM, VRAM and PCIe as one budget.** Strata's whole design is expert logistics, and it shows.

## And it isn't finished

The bottleneck on my machine is now a cable with four PCIe lanes. Every new release moves a few more experts to the right place at the right time, and every day brings another batch of pull requests from people with stranger hardware than mine. The software is improving faster than the hardware I could buy to replace it.

So my advice, if you're about to spend €3,000 on a GPU to run models locally: run the calibration first. Then replace your cable. Then wait a month. The people writing the engines are doing the rest for free.
