---
title: "How I Built PDFold Solo: a Claude Workspace With a Feedback Loop, Tests, and Boring Infra"
description: "The setup behind PDFold: a Claude workspace I corrected after each miss, unit tests from day three, and a two-pass PDF-to-Markdown pipeline on Gemini, then gpt-5.6-luna through OpenRouter."
pubDate: 2026-07-24
tags: ["Engineering", "AI", "SaaS", "Claude"]
cover: "/blog/how-i-built-pdfold.webp"
coverAlt: "A messy scanned page goes into a small press and comes out as a clean, structured page, with three check marks above it."
---

*First published in July 2026, updated in November 2026 after PDFold was archived.*

PDFold converted PDFs into structured Markdown in 11 languages. I built it alone, ran it in production from March 2026 with Stripe in live mode, and archived it in November.

I wrote PDFold with Claude Code, from the first commit. Three things kept its output shippable: a workspace I corrected after each miss, a test suite that grew with the code, and infrastructure I didn't have to run.

## A workspace I corrected after each miss

I did the whole build inside a Claude workspace. When the output missed (wrong pattern, broken convention, a regression, an architectural decision it forgot), I wrote the correction into the workspace instructions as well as the chat.

On day one, that workspace was generic. A few weeks in, it held the naming conventions, the folder structure, a decisions log and the gotchas of my pipeline, and each new session started with all of it loaded. The instructions got better with each correction, the way a codebase gets better with each bug fix.

![Roll Safe meme: "Can't make the same mistake twice if the correction goes in the workspace, not the chat".](/blog/memes/how-i-built-pdfold-1.webp)

## Tests keep AI-assisted development sustainable

On day three I added 14 test files covering billing, quotas, prompts and the PDF pipeline, and since March CI runs them on every push to `main`. In October an agent-driven test campaign on the test environment turned what it found into ten tickets.

When a model writes most of the diffs, I can't hold every past behavior in my head while I review one. The test suite checks them on each push.

![Change My Mind meme: the sign reads "AI-written code needs more tests, not fewer".](/blog/memes/how-i-built-pdfold-2.webp)

## The pipeline: two passes, one provider at a time

Each page went to the model on its own, with a prompt chosen by page type (text, image or mixed). Until June, image pages went as PNG; from June, every page went as a one-page PDF, which the model reads as text and as image. A second pass merged the pages into one document, rebuilt its structure (headings, tables, lists), translated it into the chosen language when the source differed, and emitted the Markdown.

The provider changed twice. The first week ran on Gemini 2.5 Flash through OpenRouter. From late February I called Gemini directly with Google's SDK and added its context caching for long documents; the only fallback was the same call without the cache, at the same provider. In August I moved the whole pipeline back to OpenRouter, on gpt-5.6-luna, with the model name in a configuration variable and retries limited to the errors worth retrying.

## Payments early, in sandbox

Stripe went in on the second day, in sandbox mode: checkout, the customer portal and webhooks were built and tested against test mode, a month before launch.

Wiring payments while the codebase was small cost little, and going live came down to one configuration ticket: switch Stripe to live mode in production.

## Boring infra, on purpose

The rest of the stack is standard: Next.js and TypeScript, Vercel for deploys (Netlify from October 2026), Supabase for Postgres, auth and storage, Resend for transactional email.

Each of those services removes an ops job I would otherwise do alone. The time saved went into the quality of the conversion pipeline.

## What I'd keep

1. **Put each correction in the workspace instructions.**
2. **Grow the test suite with the code.** It lets you keep shipping code a model wrote.
3. **Decide what your product does when the model provider is down.** PDFold had no second provider, so an outage meant failed conversions. For the Piktechs card scanner I picked a fallback on another vendor by testing it ([case study](/blog/case-study-ai-card-scanner)).
4. **Pick managed infrastructure** and spend the time saved on the product.

If you're a founder shipping a product like this, this way of working is a big part of what I do for clients. [Get in touch](mailto:elmahdi@moubarak.dev).
