---
title: "A 180B Model in a Shoebox: Local Inference on a Mini PC and an 8 GB Card"
description: "Qwen3.8-Flash-Next, 180B parameters, running with Strata on a mini PC and an RTX 3060 Ti 8 GB over OCuLink: about 390 tokens per second reading, 55 writing. The numbers, and how they got there."
pubDate: 2026-10-15
tags: ["AI", "Local inference", "Satire", "Hardware"]
cover: "/blog/a-180b-model-in-a-shoebox.webp"
coverAlt: "A tiny mini PC and an external graphics card connected by one cable, feeding from a wall of thousands of small drawers that reaches the ceiling."
tldr:
  - "A 180B model reads prompts at about 390 tokens per second and writes at 50-57 tokens per second on a mini PC with an 8 GB card."
  - "The engine is Strata; the gains came from its calibration, two updates and a better cable."
  - "Full config, dated benchmarks and reproduce scripts: github.com/emoubarak/strata-flash-next-egpu."
---

Every year someone announces that you can run a frontier-class model at home. Every year "at home" turns out to mean four GPUs, a 1,600 W power supply and a spouse who no longer asks questions. So here is the version for people who own normal hardware.

**The machine:** a Minisforum mini PC the size of a shoebox (Ryzen 7 8845HS, 64 GB of RAM) and an RTX 3060 Ti with **8 GB of VRAM**, sitting outside the case in an eGPU dock, connected by one OCuLink cable (PCIe Gen 4 x4).

**The model:** Qwen3.8-Flash-Next, **180 billion parameters**, 2-bit, run with [Strata](https://github.com/Niko1221/Strata).

**The speed:**

| Test | Reading the prompt | Writing |
|---|---:|---:|
| Short chat (a poem) | instant | **52-57 tokens/s** |
| Long document, 7,900 tokens | **~390 tokens/s** (about 20 s) | **about 50 tokens/s** |
| Rewriting code, 930 tokens | ~210 tokens/s | **82 tokens/s** |

For comparison, a person reads at roughly 5 tokens per second. The model writes about ten times faster than you can read it, and gets through a 12-page document in the time it takes you to find your glasses.

Everything is documented, with the exact config, dated benchmark files and the scripts to reproduce it on your own machine: **[emoubarak/strata-flash-next-egpu](https://github.com/emoubarak/strata-flash-next-egpu)**.

## Why 180B fits on an 8 GB card

It doesn't, and it doesn't need to. Qwen3.8-Flash-Next is a mixture-of-experts model: a committee of **24,576 small specialists**, and each token only consults 10 of them. About 6B parameters do the work for any given word. The rest wait in RAM like interns hoping to be useful.

The 8 GB card holds roughly **800 of those experts**. Strata keeps the most used ones on the GPU, lets the CPU compute the others, and adapts the cache as you talk to it. The whole performance story is logistics: the right expert in the right place at the right time. Strata also predicts several tokens ahead with a small draft head, and on code rewrites 97% of those guesses are right, which is where the 82 tokens per second come from.

## How it got there: one week, three steps

| Step | Reading | Writing |
|---|---:|---:|
| Day one, default settings, link limited to PCIe Gen 3 | 85 tokens/s | 19-23 tokens/s |
| After Strata's calibration | 85 tokens/s | 37-55 tokens/s |
| New cable, PCIe Gen 4 | ~390 tokens/s | 51-62 tokens/s |
| Today, Strata 0.1.44.1 | ~390 tokens/s | 52-57 tokens/s |

1. **Calibration.** Strata ships a step that tries settings on your machine and keeps the fastest. One command, about 35 minutes, and writing went from ~21 to **37-55 tokens per second**. I skipped it the first day, because nobody reads the README on day one.
2. **The cable.** Reading a long prompt moves experts across the eGPU link, so the link sets the reading speed. With a cable running stable at Gen 4 (6.7 GB/s measured), reading went from 85 to **about 390 tokens per second**, ×4.7.
3. **Updates.** Two Strata releases in one week. Writing settled at 52-57 tokens per second.

![Ancient Aliens meme: "I'm not saying it was the cable. But it was the cable."](/blog/memes/a-180b-model-in-a-shoebox-1.webp)

For scale: in May, on the same card, a 35B model wrote at 37 tokens per second. A model five times larger now writes faster.

![Leonardo DiCaprio Cheers meme: "When the 180B model writes faster than the 35B did in May."](/blog/memes/a-180b-model-in-a-shoebox-2.webp)

## Fast, and still smart at 2 bits

Compressing a model to 2 bits sounds like sanding off half its memory, so I checked. On the 20 hardest MATH-500 problems it scores **16/20**, against 13/20 for the 35B model I was using before. Driving my [browser agent](/blog/browser-agents-at-work-jev), it takes a decision in about 5 seconds and finished 3 out of 3 real tasks.

## What you need to try it

- **RAM:** 64 GB. Strata keeps about 41-45 GB of experts in memory.
- **GPU:** an 8 GB NVIDIA card is enough. Inside the case or on an eGPU; the faster the link, the faster it reads.
- **Disk:** about 66 GB for the model files.
- **Time:** one download, one build, one calibration. The repo lists the commands in order.

## Local inference had a real year

A year ago, "a local model on a gaming card" meant a 7B model that apologized a lot. In 2026, several things landed at the same time: mixture-of-experts models where only 6B of 180B parameters work per token, 2-bit quantization that still scores well, draft heads that predict several tokens at once, and engines like Strata that treat RAM, VRAM and PCIe as one budget.

And it keeps moving. Strata ships a release every few days and gets dozens of pull requests from people with stranger hardware than mine. The software is improving faster than the hardware I could buy to replace it.

So if you have a similar setup and a 3,000 euro GPU in your shopping cart: try this first. The config is [on GitHub](https://github.com/emoubarak/strata-flash-next-egpu).
