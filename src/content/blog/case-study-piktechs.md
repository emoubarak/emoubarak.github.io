---
title: "Case Study: Piktechs, from a Two-Week Prototype to a Production SaaS with Claude Code"
description: "How I took a Lovable prototype to a production B2B SaaS as the only engineer: multi-tenant workspaces, live billing, mobile apps and an AI feature, with Claude Code as the main engineering environment. The workflow, the mistakes, the lessons."
pubDate: 2026-09-12
tags: ["Case Study", "SaaS", "Claude"]
featured: true
cover: "/blog/case-study-piktechs.webp"
coverAlt: "A taped-together paper prototype of an app on the left, the same app solid on a laptop and a phone on the right."
tldr:
  - "As the only engineer, I took a two-week Lovable prototype to a production B2B SaaS with Claude Code as the main engineering environment."
  - "Fast by default, strict in the silent-failure zone (billing, row-level security, webhooks), reviewed by a different model."
  - "Done means the whole chain: migration applied, function deployed, ticket closed with before/after proof."
---

## Context

[Piktechs](https://piktechs.com) is a B2B SaaS for professionals at events: digital business cards shared over NFC or QR, lead capture, a light CRM, and team workspaces. I co-founded it in March 2026; I'm the CTO and the only engineer. In April 2026, the product existed as a two-week Lovable prototype.

## The problem

A prototype that demos well is not a product that bills. Piktechs needed multi-tenant data with real permissions, subscriptions that never drift from Stripe, Android and iOS apps, and a way to keep shipping fast without ever breaking billing or leaking one account's data into another. With one engineer.

![Drake meme: rejecting "A prototype that demos well", approving "A product that bills".](/blog/memes/case-study-piktechs-1.webp)

## What I built, in under six months

| Area | What shipped |
|---|---|
| App | React, TypeScript, Vite, TanStack Query, Tailwind and shadcn/ui, French and English |
| Data | Supabase Postgres with row-level security, role-based permissions per workspace (groups, a rights matrix, deny by default) |
| Backend | 27 Edge Functions in Deno: billing, CRM sync, wallet passes, vCards, social preview images, team analytics |
| Billing | Stripe checkout, customer portal, webhooks, per-seat team plans with a shared card pool, a nightly reconciliation job |
| Mobile | Android and iOS from the same codebase with Capacitor, Apple and Google Wallet passes |
| AI | A vision-model business-card scanner ([its own case study](/blog/case-study-ai-card-scanner)) |
| Integrations | CRM sync, Zapier |
| Delivery | App and marketing site split into two repositories, each with a test and a production environment |

## How I work on it

**Claude Code is the main engineering environment.** The project has an engineering guide written for the agent: decisions and constraints, not descriptions it could read from the code. Project skills cover recurring jobs (issue creation, release checks, a regression guard, agentic QA).

**Fast by default, strict in the silent-failure zone.** Most changes ship without ceremony, with checks proportional to what can break. Billing, row-level security, public reads and payment webhooks are different: a bug there doesn't crash, it quietly costs money or exposes data. Every change in that zone gets its checks plus a review by a dedicated reviewer agent pinned to a different model from the one that wrote the code. A second opinion from the same model is weaker than one from another.

**Models and agents by risk.** Small edits stay inline, since spawning an agent has a cold-start cost. Subagents take genuinely multi-file work, run in parallel only when their file sets don't overlap, and unrelated tasks get their own git worktree.

**A push is a deploy.** `develop` deploys to the test environment, with test payments. `main` deploys to production, only on my explicit go. Migrations are rehearsed on the test database against real data shapes, with scripts that roll back. CI gets watched when it can tell me something; documentation changes skip the pipeline entirely.

**Tickets are contracts.** Every bug ticket has a Reproduce section: one command, links, code permalinks pinned to a commit, and the check that goes green once it's fixed. A visible bug gets a screenshot, and closing it takes a before/after pair, so a fix can be checked at a glance.

**The agent gets eyes.** A browser agent signs in to the deployed test app as a specific account state and the database gives the verdict. I open-sourced it as [jev-check](/blog/case-study-jev-check).

## Where it stands, honestly

The product is in production with live billing, team workspaces, the AI scanner and CRM integrations. The Android app builds and releases from CI, and its first store release is going through review; iOS comes after.

It didn't go smoothly, and the mistakes are the useful part:

- **I accepted "done" too early.** Changes to what a screen shows reached production verified only by unit and database tests, and visual bugs got through. Since then, any visible change gets a real browser check before it counts as done.
- **Pushing after every small fix had a cost.** CI minutes are a budget, and running out once blocked a production deploy. Commits are batched now, and documentation-only changes skip the pipeline.
- **Two components for one thing.** The card preview in the editor and the public card were separate. Every change had to be made twice, and they drifted until I merged them into one shared component. The agent will happily copy-paste between them for weeks if you let it.
- **The same rule, asked for three times.** A navigation rule kept coming back because each fix patched one caller. It only stopped when it moved to one central place with an end-to-end test.

![UNO Draw 25 meme: the card says "Use one component or draw 25", the agent draws 25.](/blog/memes/case-study-piktechs-2.webp)

## What I'd tell anyone taking over an AI-generated prototype

1. **Start with data access.** Who can read and write what, where secrets live, what runs without authentication. Features come after.
2. **Name your silent-failure zone** and spend your review budget there, not everywhere.
3. **Review with a different model** from the one that wrote the code.
4. **Make "done" mean the whole chain:** migration applied, function deployed, ticket closed with proof.
5. **AI-written code needs more tests, not fewer.** The agent's speed is only safe if the suite catches what it breaks.
6. **Keep the agent's instructions small, and audit them for rot** (rules that restate the infrastructure, mandatory steps nobody needs, permission patterns that match nothing).
