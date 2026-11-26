---
title: "Case Study: Piktechs, from a Two-Week Prototype to a Production SaaS with Claude Code"
description: "How I took a two-week prototype to a production B2B SaaS as the only engineer: multi-tenant workspaces, live billing, an Android app and an AI feature, with Claude Code as the main engineering environment. How I work with the agent, and four mistakes I corrected."
pubDate: 2026-09-12
tags: ["Case Study", "SaaS", "Claude"]
featured: true
cover: "/blog/case-study-piktechs.webp"
coverAlt: "A taped-together paper prototype of an app on the left, the same app solid on a laptop and a phone on the right."
tldr:
  - "As the only engineer, I took a two-week prototype to a production B2B SaaS with Claude Code as the main engineering environment."
  - "Fast by default, strict in the silent-failure zone (billing, row-level security, webhooks), reviewed by a different model."
  - "Done means the whole chain: migration applied, function deployed, ticket closed with before/after proof."
---

## Context

[Piktechs](https://piktechs.com) is a B2B SaaS for professionals at events: digital business cards shared over NFC or QR, lead capture, a light CRM, and team workspaces. I co-founded it in March 2026; I'm the CTO and the only engineer. In April 2026, the product existed as a two-week prototype.

## The problem

Turning it into a product that bills meant multi-tenant data with real permissions, subscriptions that stay in sync with Stripe, Android and iOS apps, and a way to keep shipping fast without breaking billing or showing one account's data to another.

![Drake meme: rejecting "A prototype that demos well", approving "A product that bills".](/blog/memes/case-study-piktechs-1.webp)

## What I built, in under six months

| Area | What shipped |
|---|---|
| App | React, TypeScript, Vite, TanStack Query, Tailwind and shadcn/ui, French and English |
| Data | Supabase Postgres with row-level security, role-based permissions per workspace (groups, a rights matrix, deny by default) |
| Backend | Edge Functions in Deno: billing, CRM sync, vCards, social preview images, team analytics |
| Billing | Stripe checkout, customer portal, webhooks, per-seat team plans with a shared card pool, a nightly reconciliation job |
| Mobile | An Android app built from the same codebase with Capacitor, on Google Play |
| AI | A vision-model business-card scanner ([its own case study](/blog/case-study-ai-card-scanner)) |
| Integrations | CRM sync, Zapier |
| Delivery | App and marketing site split into two repositories, each with a test and a production environment |

## How I work on it

**An engineering guide for the agent.** It holds the decisions and constraints that the code doesn't show. Project skills cover recurring jobs (issue creation, release checks, a regression guard, agentic QA).

**Extra checks where a bug would go unnoticed.** Every code change runs the unit and Playwright tests in CI; the checks grow with what can break. Billing, row-level security, public reads and payment webhooks are different: a bug there raises no error; it charges the wrong amount or shows one account's data to another. Every change in that zone gets its checks plus a review by a dedicated reviewer agent pinned to a different model from the one that wrote the code.

**Agents by size of task.** Small edits stay in the main session, since starting an agent costs time. Subagents take work that spans several files, run in parallel only when their file sets don't overlap, and unrelated tasks get their own git worktree.

**Two environments.** `develop` deploys to the test environment, with test payments. `main` deploys to production, only on my explicit go. Migrations are rehearsed on the test database against real data shapes, with scripts that roll back. Code, migration and deployment changes go through CI, and the agent follows each run to the end and reads the failing logs when it goes red; documentation-only changes skip the pipeline.

**Bug tickets with a reproduction.** Every bug ticket has a Reproduce section: one command, links, code permalinks pinned to a commit, and the check that goes green once it's fixed. A visible bug gets a screenshot, and closing it takes a before/after pair, so a fix can be checked at a glance.

**A browser check on the deployed test app.** A browser agent signs in as an account in a specific state, and a SQL query on the database decides pass or fail. I open-sourced it as [account-state-check](/blog/case-study-jev-check).

## Where it stands in September 2026

The product is in production with live billing, team workspaces, the AI scanner and CRM integrations. The Android app builds and releases from CI and is [live on Google Play](https://play.google.com/store/apps/details?id=com.piktechs.app). The iOS app is not published yet.

Four mistakes, and what I changed after each:

- **I accepted "done" too early.** Changes to what a screen shows reached production verified only by unit and database tests, and visual bugs got through. Since then, any visible change gets a real browser check before it counts as done.
- **Pushing after every small fix had a cost.** CI minutes are a budget, and running out once blocked a production deploy. I batch commits now.
- **Two components for one thing.** The card preview in the editor and the public card were separate. Every change had to be made twice, and they drifted until I merged them into one shared component.
- **The same rule, asked for three times.** A navigation rule kept coming back because each fix patched one caller. It stopped once I moved the rule to one central place and covered it with an end-to-end test.

![UNO Draw 25 meme: the card says "Use one component or draw 25", the agent draws 25.](/blog/memes/case-study-piktechs-2.webp)

## What I'd tell anyone taking over an AI-generated prototype

1. **Start with data access.** Who can read and write what, where secrets live, what runs without authentication. Features come after.
2. **Name your silent-failure zone** and spend most of your review time there.
3. **Review with a different model** from the one that wrote the code.
4. **Make "done" mean the whole chain:** migration applied, function deployed, ticket closed with proof.
5. **Add tests as fast as the agent adds code.** Its speed is only safe if the suite catches what it breaks.
6. **Keep the agent's instructions small, and audit them for rot** (rules that restate the infrastructure, mandatory steps nobody needs, permission patterns that match nothing).
