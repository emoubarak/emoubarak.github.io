---
title: "How I Built PDFold Solo: a Self-Improving AI Workspace, Tests, and Boring Infra"
description: "The actual setup behind PDFold — a Claude workspace with a feedback loop on every prompt, tests that grew with the code, and a multi-pass OCR pipeline on Gemini with OpenRouter as fallback."
pubDate: 2026-07-24
tags: ["Engineering", "AI", "SaaS", "Claude"]
---

PDFold converts PDFs into structured Markdown in 11 languages. I built it alone, and it's in production with real users at [pdfold.com](https://pdfold.com).

This is not another "I prompted an app into existence" post. The interesting part of building PDFold wasn't the AI writing code — it was the system I built *around* the AI so that its output stayed shippable week after week. Here's that system.

## The workspace, not the prompts

I did the whole build inside a Claude workspace, and the core mechanic was a feedback loop on every prompt: each time the output missed — wrong pattern, broken convention, a regression, an architectural decision it forgot — the correction went back into the workspace instructions, not just into the chat.

On day one, that workspace was generic. A few weeks in, it had become the project's brain: naming conventions, the folder structure, the decisions log, the gotchas specific to my pipeline. The practical effect is compounding: the assistant doesn't get smarter, but the workspace does, and every session starts from everything the previous sessions learned instead of from zero.

If you take one thing from this post, take that. The value isn't in any single clever prompt. It's in treating your AI workspace like code: versioned, corrected, accumulated.

## Tests are what make AI-assisted development sustainable

AI writes code fast, and fast code lies. My rule for PDFold: features land with unit tests, and the flows that matter get end-to-end coverage as they stabilize. Not a big testing phase at the end — tests written progressively, as the code grew.

That's not testing dogma, it's a practical requirement of the workflow. When a model touches your codebase daily, you can't personally re-verify every diff against every past behavior. The test suite is what catches the regression surface for you. It's the difference between "AI-assisted development" and "AI-assisted debt creation."

## The pipeline: Gemini, with a fallback

The core of the product is a multi-pass OCR + Vision pipeline: pages go through OCR, then vision passes rebuild the document's structure — headings, tables, lists — before it's emitted as clean Markdown.

Gemini does the heavy lifting. But when your core feature *is* an API call to a model provider, that provider is a single point of failure. So PDFold routes through OpenRouter as a fallback: if Gemini is down or degraded, the pipeline fails over instead of the product going dark. Boring resilience decision, disproportionate payoff the first time you need it.

## Payments early, in sandbox

Stripe went in early, in sandbox mode: the full checkout and billing flows were implemented and tested against test mode long before launch, then switched over.

I've seen the opposite pattern kill solo projects: the product is "done" and payment gets bolted on at the end, which is exactly when you have the least energy for webhook edge cases. Wire it early against the sandbox — it costs little when the codebase is small, and it means launch day is a config change, not an integration project.

## Boring infra, on purpose

The rest of the stack is deliberately unexciting: Next.js and TypeScript, Vercel for deploys, Supabase for Postgres, auth and storage, Resend for transactional email.

Every one of those choices removes an ops problem I'd otherwise own alone. As a solo founder, infrastructure heroics are a tax on the only scarce resource you have. The time saved went where it actually matters for this product: the quality of the conversion pipeline.

## What I'd keep

1. **The feedback loop is the multiplier.** Correct the workspace, not the chat.
2. **Tests are the enabler, not the chore.** They're what let you keep shipping AI-written code with confidence.
3. **Fallbacks for your core dependency.** If your product is an API call, have a second route for it.
4. **Boring infra.** Spend your novelty budget on the product, not the plumbing.

PDFold is live at [pdfold.com](https://pdfold.com). If you're a founder trying to ship something like this — this workflow is a big part of what I do for clients. [Get in touch](mailto:elmahdi@moubarak.dev).
