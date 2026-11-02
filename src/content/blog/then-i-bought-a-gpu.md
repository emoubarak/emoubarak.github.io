---
title: "I Told You Not to Buy a GPU. Then I Bought One."
description: "Same mini PC, same cable, an RTX 3080 with 20 GB: Qwen3.8-Flash-Next 180B now reads about 2,000 tokens per second and writes 110 to 204. My settings and benchmarks."
pubDate: 2026-11-02
tags: ["AI", "Local inference", "Satire", "Hardware"]
cover: "/blog/then-i-bought-a-gpu.webp"
coverAlt: "A tiny mini PC connected by one cable to a much bigger graphics card, whose robot arms pull dozens of glowing drawers at once from a wall of thousands."
tldr:
  - "A 180B model reads prompts at about 2,000 tokens per second and writes at 110 to 204 tokens per second on a mini PC with an RTX 3080 20 GB over one cable."
  - "Same mini PC, same cable, same model as before: the card and a handful of settings did the work."
  - "Full config, dated benchmarks and reproduce scripts: github.com/emoubarak/strata-flash-next-rtx3080-20gb."
---

Two weeks ago I [ran a 180B model on a mini PC with an 8 GB card](/blog/a-180b-model-in-a-shoebox) and ended with some advice: if you have a similar setup and a GPU in your shopping cart, try this first.

Then I bought a GPU.

**The machine:** the same Minisforum mini PC (Ryzen 7 8845HS, 64 GB of RAM), the same OCuLink cable (PCIe Gen 4 x4). The RTX 3060 Ti 8 GB is gone. In its place: an **RTX 3080 whose memory was upgraded to 20 GB**, which is what happens when a workshop decides NVIDIA's spec sheet was more of a suggestion.

**The model:** still Qwen3.8-Flash-Next, **180 billion parameters**, 2-bit, run with [Strata](https://github.com/Niko1221/Strata) 0.2.9.

**The speed:**

| Test | 8 GB card (October) | 20 GB card (today) |
|---|---:|---:|
| Reading a long prompt | ~390 tokens/s | **~2,000 tokens/s** |
| Reading 162,000 tokens | did not fit | **2,395 tokens/s** (68 s) |
| Writing prose (short poem, then 600-word essay) | 52-57 tokens/s | **110 tokens/s** |
| Writing new code | not measured | **166 tokens/s** |
| Rewriting a file (same prompt) | 82 tokens/s | **187-204 tokens/s** |
| Context window | 64k tokens | **262k tokens** |

The first turn of a Claude Code session is about 36,000 tokens of instructions and files. The 8 GB card needed about a minute and a half to read it. The 20 GB card reads it in **18 seconds**, then writes faster than my terminal scrolls.

Everything is documented, with the exact config, dated benchmark files and the scripts to reproduce it: **[emoubarak/strata-flash-next-rtx3080-20gb](https://github.com/emoubarak/strata-flash-next-rtx3080-20gb)**.

![Two Buttons meme: "Follow my own advice" / "Buy the GPU"](/blog/memes/then-i-bought-a-gpu-1.webp)

## Why 12 more gigabytes change everything

Qwen3.8-Flash-Next is a committee of 24,576 small experts, and each token only consults a handful. The whole game is having the right experts on the card when they are needed.

The 8 GB card held about 800 of them. The 20 GB card holds **about 9,700**. While writing, the expert the model wants is already on the card more than 9 times out of 10, so the CPU barely helps anymore. While reading a long prompt, far fewer experts cross the cable, and the card holds the speed as the prompt grows: 15,000 tokens or 162,000, it stays around 2,000 tokens per second.

The rest is memory bandwidth: 721 GB/s measured on this card, which is what writing speed actually depends on.

## My settings

Strata's calibration on the new card kept its own defaults, so the settings I tuned for the 8 GB card went in the bin. What I kept, each one measured on this machine:

| Setting | What it does | Gain |
|---|---|---|
| `--prefill 16384` | reads the prompt in chunks of 16,384 tokens | reading +28 to +47% |
| `--spec 4` + the MTP head | guesses 4 tokens ahead, keeps the right ones | writing +37 to +51% |
| `--kv-resident 32768` | 262k context: 32k tokens of memory on the card, the rest in RAM | −5 to −9% reading, 2× the window |
| `--conversation-cache-slots 4` | parks up to 4 conversations in 8 GB of RAM | Claude Code with sub-agents twice as fast (68 s → 35 s) |
| `STRATA_KV_PREFETCH=1` | uploads the next layer's memory while the current one computes | reading +2.5 to +4.8% |
| `STRATA_PREFILL_CPU_SHARE=1` | lets the CPU compute the experts that are not on the card | writing +2 to +8% |
| `STRATA_ROUTE_TAIL_SKIP=4` | skips an absent expert when every token ranks it 4th or worse | writing +7 to +16% |
| [gpu-unlock](https://github.com/Zagitta/gpu-unlock) | kernel module that lifts the half-speed FP16 limit on GeForce cards | reading +16 to +19% |

Two of those deserve a note. `ROUTE_TAIL_SKIP` is a dial, not a switch: lower values skip more experts and write faster, and 4 is the lowest value that still scored exactly like the default on a freshly started server. And gpu-unlock is a kernel module that removes a speed limit NVIDIA put on its gaming cards. Same accuracy, a sixth faster reading, one reboot.

![Success Kid meme: "Bought 12 more GB" / "Deleted two weeks of tuning"](/blog/memes/then-i-bought-a-gpu-2.webp)

## Fast, and still right

Speed settings that skip work are only worth it if the answers survive, so I checked on the final config:

- 40 two-digit multiplications, right after start, no thinking: **38/40**, the same two misses as with the default settings.
- My agent's 20-decision exam, 4 runs: **36/40**, the same single case missed every time.
- Tool calls in both the OpenAI and Anthropic formats, the two formats Claude Code and OpenCode speak.

## What you need to try it

- **RAM:** 64 GB. Strata keeps about 41-45 GB of experts in memory.
- **GPU:** an NVIDIA card with 20 GB or more. Inside the case or on an eGPU; Gen 4 x4 is enough.
- **Disk:** about 66 GB for the model files.
- **Time:** one download, one build, one calibration, four environment variables. The repo lists the commands in order.

## So, should you buy the GPU?

In my defense, the software kept its promise. In two weeks: about twenty Strata releases, one kernel module and a few environment variables, on top of the card. The same mini PC now reads five times faster and writes twice as fast as when I told you not to upgrade.

So the advice stands, with an update: try the config first. Then buy the card. Then [try the config again](https://github.com/emoubarak/strata-flash-next-rtx3080-20gb).
