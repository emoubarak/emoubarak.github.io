// ─────────────────────────────────────────────────────────────────────────────
//  THE MOTHER SOURCE
//  Every surface (this site, /kit copy blocks, LinkedIn, Malt, Upwork) is a
//  projection of this file. Change a fact here, then propagate — never the
//  other way round. /kit keeps the hand-written EN/FR prose used to paste into
//  each platform; the structured facts below are what the prose must agree with.
// ─────────────────────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const identity = {
  name: 'El Mahdi Moubarak',
  // deliberately different on Fiverr and Upwork, where the public first name is "Adam"
  publicNames: { site: 'El Mahdi Moubarak', linkedin: 'El Mahdi MOUBARAK', malt: 'El Mahdi M.', upwork: 'Adam M.', fiverr: 'Adam' },
  title: { en: 'Founder & Full-Stack Engineer · Software, SaaS & AI', fr: 'Fondateur & Ingénieur Full-Stack · Logiciel, SaaS & IA' },
  headline: { en: 'I ship software & AI products to production', fr: 'Je livre des logiciels et des produits IA en production' },
  city: 'Lille',
  location: { en: 'Lille, France · Remote across Europe', fr: 'Lille, France · Remote partout en Europe' },
  email: 'elmahdi@moubarak.dev',
  website: 'https://moubarak.dev/',
  linkedin: 'https://linkedin.com/in/el-mahdi-moubarak',
  github: 'https://github.com/emoubarak',
  calendly: 'https://calendly.com/moubarakelmahdipro/',
  languages: { en: 'French (native) · English (C1, TOEIC) · Spanish (professional)', fr: 'Français (natif) · Anglais (C1, TOEIC) · Espagnol (professionnel)' },
  yearsExperience: 6,
  domains: { en: 'healthcare, fintech and cybersecurity', fr: 'santé, fintech et cybersécurité' },
  rates: { maltDaily: '550 €/day', upworkHourly: '$55/hr' },
  availability: { en: 'more than 30 h/week · remote, on-site possible (Lille 50 km, Paris)', fr: 'plus de 30 h/semaine · remote, présentiel possible (Lille 50 km, Paris)' },
  clientSectors: { en: 'IT & digital services · software publishers · healthcare providers · banking & financial services', fr: 'services numériques et IT · édition de logiciels · fournisseurs de soins de santé · banques et services financiers' },
  entryOffer: { en: 'a paid audit or a 5-10 day proof of concept with one measurable deliverable', fr: 'un audit ou un POC de 5 à 10 jours, avec un livrable mesurable' },
};

// Measured, verifiable numbers. Nothing here is rounded up or estimated.
export const proof = [
  { claim: { en: 'Medical AI platform for hospitals, sole engineer: 5,000+ documents processed, €700,000 saved.', fr: 'Plateforme médicale IA pour hôpitaux, seul ingénieur : 5 000+ documents traités, 700 000 € économisés.' }, source: 'ALTAO Santé' },
  { claim: { en: 'Security Rating®, a cyber-rating SaaS used by 200+ organisations: 700+ tickets delivered over 3 years.', fr: 'Security Rating®, SaaS de cyber-notation utilisé par 200+ organisations : 700+ tickets livrés en 3 ans.' }, source: 'Board of Cyber' },
  { claim: { en: "Internal R&D tool that improved the team's development speed by 70%.", fr: "Outil interne de R&D qui a amélioré la vitesse de développement de l'équipe de 70 %." }, source: 'Worldline' },
  { claim: { en: '~12,000 trades journaled across 60 concurrent runners, settled against the Chainlink oracle.', fr: '~12 000 trades journalisés sur 60 runners concurrents, réglés contre l\'oracle Chainlink.' }, source: 'Polymarket Up/Down Lab' },
  { claim: { en: 'Any PDF into structured Markdown, in 11 languages.', fr: "N'importe quel PDF en Markdown structuré, en 11 langues." }, source: 'PDFold' },
  { claim: { en: 'Shopify store built, grown to real revenue, and sold.', fr: "Boutique Shopify créée, montée jusqu'à un vrai chiffre d'affaires, puis vendue." }, source: 'Mon Jouet Montessori' },
  { claim: { en: 'Corporate AI training delivered: two tailored FR/EN sessions.', fr: 'Formation IA en entreprise livrée : deux sessions FR/EN sur mesure.' }, source: 'DRIVECO' },
];

// How I work with AI: principles, each with the place where a reader can check it.
// No vanity numbers here on purpose: the proof is the linked work, not a count.
// /cv renders it; /kit generates its EN copy block from it.
export const aiApproach = {
  intro: { en: "I build AI into products, and I build with AI every day. These are the principles I work by, each with a place where you can check it." },
  principles: [
    {
      title: 'Done means observed, not claimed',
      text: "An agent saying \"done\" is a claim. I give it ways to check its work against reality: screenshots at real screen widths, a browser agent that uses the deployed app as a given kind of user, and a database query as the final judge.",
      proof: { label: 'Case study: jev-check', href: '/blog/case-study-jev-check' },
    },
    {
      title: 'An AI feature starts with its threat model',
      text: "Anything a model reads can be written by an attacker. Before writing the prompt, I decide what the feature must never do, then choose models by testing them against that, not by price or reputation.",
      proof: { label: 'Case study: the AI card scanner', href: '/blog/case-study-ai-card-scanner' },
    },
    {
      title: 'Fast where it is safe, strict where failures are silent',
      text: "Most changes ship without ceremony. Billing, permissions and anything touching money or another account's data get mandatory checks, and a review by a different model from the one that wrote the code.",
      proof: { label: 'Case study: Piktechs', href: '/blog/case-study-piktechs' },
    },
    {
      title: 'Measure before believing',
      text: "Models are non-deterministic and backtests flatter. I ask the same question many times, test out of sample, and try to break my own results before I trust them. Sometimes the honest verdict is that there was nothing there.",
      proof: { label: 'Polymarket Up/Down Lab', href: 'https://github.com/emoubarak/polymarket-updown-lab' },
    },
    {
      title: 'Correct the workspace, not the chat',
      text: "When an agent gets something wrong, the fix goes where the next session will find it, in the narrowest place that works. A rule that fails twice stops being a sentence and becomes a check the tooling enforces.",
      proof: { label: 'Article: what I kept correcting', href: '/blog/what-i-kept-telling-claude' },
    },
    {
      title: 'Lazy, on purpose',
      text: "If I do something twice, a machine does it the third time. An agent can work alone when it has an end condition, a budget, a way to check itself and a way to call me. The work is making it safe to walk away.",
      proof: { label: 'Article: lazy by design', href: '/blog/lazy-by-design' },
    },
  ],
};

// Published publicly by the people quoted. Never paraphrased, never anonymised upward.
export const testimonials = [
  {
    quote: { en: 'Learning how to use AI effectively is becoming a real lever for efficiency and impact. During our ChatGPT Workshop, "Make AI work for you", we explored how AI can support us from the very first question to the automation of a complete business process. A big thank you to El Mahdi MOUBARAK for leading this insightful and energizing session. He brought both technical depth and a very practical mindset.' },
    author: 'Bérénice Harfouf-Ponthus', role: { en: 'Chief People Officer', fr: 'DRH' }, org: 'DRIVECO',
    source: 'LinkedIn', public: true,
  },
  {
    quote: { en: 'We trusted El Mahdi with the mobile app for our delivery service. He taught himself what he needed and built the app autonomously. I recommend him strongly.', fr: "Nous avons fait confiance à El Mahdi pour notre projet de développement de l'application mobile d'un service de livraison. Il a su se former et développer l'application mobile en autonomie. Je vous le recommande fortement !" },
    author: 'Leo Durfort', role: { en: 'CEO', fr: 'CEO' }, org: 'Deuspi',
    source: 'Malt', public: true,
  },
];

// The offer, as stated on Malt and Upwork. The homepage shows the first three.
export const services = [
  {
    title: "SaaS & Web Apps",
    description: "Your product built end-to-end: specs, architecture, code, deploy. From idea to a production v1 your users can actually use. I handle the whole stack.",
    audience: "For founders who need a v1 shipped properly",
  },
  {
    title: "AI Automation & Agents",
    description: "LLM-powered workflows, AI agents, RAG and OCR/Vision pipelines that remove manual work from your operations, built on your real processes, not demos.",
    audience: "For teams drowning in repetitive work",
  },
  {
    title: "LLM & RAG Integration",
    description: "Chat over your documents, OCR + LLM pipelines, RAG with memory, OpenAI / Claude / Gemini inside your existing product — with rate limits, fallbacks and evaluation handled.",
    audience: "For products that need AI features that hold in production",
  },
  {
    title: "AI-Generated MVP Rescue",
    description: "An app built with Lovable, Bolt, Cursor or Claude Code that breaks in production: audit, security (auth, Supabase RLS, exposed API keys), refactoring, tests, deployment.",
    audience: "For founders whose prototype cannot ship",
  },
  {
    title: "Self-Hosted AI Agents",
    description: "Installing and securing agent runtimes on your own server or VPS — OpenClaw, Hermes Agent, GPT- and Claude-based agents, or a custom stack — wired into Slack, WhatsApp, Telegram, your CRM and Google Workspace, with custom skills and MCP.",
    audience: "For teams who want their agents on their own infrastructure",
  },
  {
    title: "Shopify Where It Gets Technical",
    description: "Custom apps, Liquid, checkout work, and order-to-fulfilment automation connecting Shopify to your factory, ERP, CRM or AI workflows.",
    audience: "For stores past what themes and plugins can do",
  },
  {
    title: "Corporate AI Training",
    description: "Hands-on AI sessions (FR/EN) built on your company's real workflows, from the first prompt to automating a complete business process.",
    audience: "For companies onboarding their teams to AI",
  },
];

export const experiences = [
  {
    company: "EMM",
    role: "Founder & AI / Full-Stack Engineer",
    period: "Mar 2026 – Present",
    location: "Lille, France · Remote",
    summary: "Independent software engineering practice: web apps, SaaS and AI automation for founders, SMEs and agencies, from requirements to production.",
    achievements: [
      "Self-hosted AI agents: installing, configuring and securing agent runtimes on a client's own server or VPS (OpenClaw, Hermes Agent, GPT- and Claude-based agents, or a custom stack), connected to their tools (Slack, WhatsApp, Telegram, CRM, Google Workspace), with custom skills and MCP.",
      "AI browser automation on jev-ultrafast (Browser Use): my own task runner drives dedicated browsers from the terminal to enter, extract and update data in back-offices that have no API, hands over to a human for logins, captchas and 2FA, and logs every step with a screenshot and its cost.",
      "Rescuing AI-generated MVPs (Lovable, Bolt, Cursor, Claude Code): code audit, security (auth, Supabase RLS, exposed API keys), refactoring, tests and deployment.",
      "LLM and RAG integration into existing products: OCR + LLM pipelines, chatbots over documents, OpenAI / Claude / Gemini in production.",
      "Corporate AI training for DRIVECO: two tailored FR/EN sessions with live use cases built on the company's real workflows and OpenAI ecosystem.",
    ],
  },
  {
    company: "Piktechs",
    role: "Co-Founder & CTO",
    period: "Mar 2026 – Present",
    location: "France",
    summary: "B2B SaaS for events & networking: digital business cards (NFC/QR), lead capture and CRM, team workspaces (React, TypeScript, Supabase, Stripe).",
    achievements: [
      "Sole engineer: took the product over from a two-week prototype in April 2026 and turned it into a production SaaS in under six months, with Claude Code as the main engineering environment.",
      "Shipped an AI business-card scanner: vision model with a cross-provider fallback selected by prompt-injection testing, strict JSON output, a per-user quota and on-device OCR as the last resort.",
      "Live Stripe billing (checkout, customer portal, webhooks, per-seat team plans, scheduled reconciliation) and multi-tenant workspaces secured with Postgres row-level security and role-based permissions.",
      "Android and iOS apps from the same codebase (Capacitor), Apple and Google Wallet passes, CRM sync and a Zapier integration.",
      "Agentic QA with jev (Browser Use's jev-ultrafast): a browser agent signs in to the test app as each account state (free, Pro, lapsed, team member, frozen team), follows a plain-English goal, and the database gives the verdict. Bug tickets get a one-command reproduction and before/after screenshots taken by the agent. Open-sourced as jev-check.",
      "Unit and Playwright tests as the deterministic gate, CI/CD with separate test and production environments, and a reviewer agent on a different model for billing and permission code.",
    ],
  },
  {
    company: "KSUR Services",
    role: "CTO",
    period: "Mar 2026 – Present",
    location: "France · Morocco",
    summary: "Agence-KSUR is a digital agency building tailor-made web and mobile applications, e-commerce platforms, and AI-driven automation workflows for SMEs and enterprises.",
    achievements: [
      "Own the agency's full technical stack and delivery, from architecture to production.",
      "Design and build tailored web & mobile applications from the ground up.",
      "Architect and deploy AI-powered automation workflows to streamline internal and client operations.",
    ],
  },
  {
    company: "DRIVECO",
    role: "AI Trainer",
    period: "Jul 2026",
    location: "Paris (Hybrid)",
    summary: "Corporate AI training for DRIVECO teams, an operator of electric-vehicle charging infrastructure.",
    achievements: [
      "Designed and delivered two tailored AI training sessions (FR/EN), with live hands-on use cases built on the company's real workflows and OpenAI ecosystem.",
    ],
  },
  {
    company: "Board of Cyber",
    role: "Full-Stack Engineer",
    period: "Mar 2023 – Feb 2026",
    location: "Paris (Remote)",
    summary: "Core contributor to Security Rating®, a SaaS cyber-rating platform used by 200+ organizations (Angular, TypeScript, Python).",
    achievements: [
      "Solved 700+ tickets across platform, back office and manager office in a high-cadence release cycle.",
      "Engineered a Python-based nmap vulnerability scanning probe automating attack surface data collection.",
      "Implemented test coverage with Spectator and optimized CI/CD pipelines for regression-free deployments.",
      "Contributed to Angular migration and major library upgrades, reducing technical debt incrementally.",
    ],
  },
  {
    company: "ALTAO Santé",
    role: "Full-Stack & AI Engineer",
    period: "Sep 2021 – Sep 2022",
    location: "Lille (On-site)",
    summary: "Sole engineer on a greenfield medical platform for hospital discharge summary correction, replacing a fragmented multi-tool legacy workflow (Vue.js, Django, PostgreSQL).",
    achievements: [
      "Processed 5,000+ documents through the platform, saving hospitals €700,000.",
      "Ran requirement sessions directly with doctors, wrote specs, integrated ML algorithms from the Data Science team.",
      "Deployed and monitored the full AWS infrastructure autonomously (EC2, Route53, Amplify).",
    ],
  },
  {
    company: "Deuspi",
    role: "Mobile Software Engineer",
    period: "Mar 2021 – Jun 2021",
    location: "Lille (Remote)",
    summary: "Sole mobile engineer on the first version of a React Native grocery delivery app, transitioning the product from web-only to native mobile.",
    achievements: [
      "Owned the full frontend from designer wireframes to production-ready interface.",
      "Implemented a gamified UX direction defined by the product team to drive customer retention.",
      "Co-defined API contracts with the backend developer for real-time order tracking and inventory sync.",
    ],
  },
  {
    company: "Worldline",
    role: "Full-Stack Engineer",
    period: "Apr 2019 – Aug 2019",
    location: "Seclin (On-site)",
    summary: "Built an internal R&D debugging tool (Vue.js, Spring Boot, MQTT) improving team development speed by 70%.",
    achievements: [
      "Designed and built a centralized dashboard automating the creation, storage and replay of complex payment test sets.",
    ],
  },
];

export const education = [
  {
    degree: "Engineering Degree in CS, Networks & Telecoms",
    school: "IMT Nord Europe",
    period: "2017 – 2022",
    detail: "Lille, France.",
  },
  {
    degree: "Scientific Baccalaureate, Math Major",
    school: "Lycée Français Louis-Massignon",
    period: "2017",
    detail: "AEFE network · Casablanca, Morocco.",
  },
];

export const certifications = [
  { name: 'TOEIC', provider: 'ETS', issued: 'December 2020' },
];

export const techGroups = [
  { label: "Web & Mobile Dev", items: ["TypeScript", "JavaScript", "Next.js", "React", "React Native", "Capacitor", "Angular", "Vue.js", "Node.js", "Python", "Django", "Flask", "PostgreSQL", "Supabase"] },
  { label: "Cloud & DevOps", items: ["AWS (EC2, Route53, Amplify)", "Docker", "Git", "CI/CD", "Vercel"] },
  { label: "AI & Automation", items: ["AI Agents", "Agentic Dev", "Claude Code (skills, hooks, subagents)", "MCP", "Browser agents (Browser Use)", "LLM APIs (OpenAI, Claude, Gemini, OpenRouter)", "LLM evaluation & prompt-injection testing", "Local LLMs (llama.cpp, ExLlamaV2)", "RAG", "Vectorization", "OCR & Vision pipelines", "ElevenLabs", "Voice AI"] },
  { label: "E-commerce", items: ["Shopify API", "Liquid", "Stripe", "SEO"] },
  { label: "Languages", items: ["French (Native)", "English (C1, TOEIC)", "Spanish"] },
];

export const interests = [
  { title: "Guitar", detail: "17 years. Former VP of the Music Club at IMT Nord Europe." },
  { title: "Philosophy", detail: "Perception, reality, and applied metaphysics." },
  { title: "Strength Training", detail: "Consistency and physical resilience." },
];

export const projectCategories = [
  { key: 'all', label: 'All' },
  { key: 'saas', label: 'SaaS' },
  { key: 'web-app', label: 'Web Apps' },
  { key: 'research', label: 'R&D' },
  { key: 'tool', label: 'Tools' },
  { key: 'e-commerce', label: 'E-commerce' },
  { key: 'website', label: 'Websites' },
  { key: 'agency', label: 'Agency' },
  { key: 'mobile', label: 'Mobile' },
];

// `thumb` is the uniform card image (public/work/, built by scripts/thumbs.py); `previews` are the tabs of the preview modal.
export const projects = [
  {
    title: 'Piktechs',
    thumb: `${base}/work/piktechs.webp`,
    subtitle: 'piktechs.com',
    category: 'saas',
    categoryLabel: 'SaaS',
    role: 'Founder',
    description: 'B2B SaaS platform for digital business cards at professional events: connection, lead capture with an AI card scanner, CRM and team workspaces. Designed, built and operated end to end.',
    previews: [
      { label: 'Dashboard', src: `${base}/portfolio/piktechs-devices.webp` },
      { label: 'Live site', src: 'https://piktechs.com' },
    ],
    url: 'https://piktechs.com',
    tags: ['React', 'TypeScript', 'Supabase', 'Stripe', 'Vision LLM'],
  },
  {
    title: 'PDFold',
    thumb: `${base}/work/pdfold.webp`,
    subtitle: 'pdfold.com',
    category: 'saas',
    categoryLabel: 'SaaS',
    role: 'Founder',
    description: 'SaaS converting PDFs to structured Markdown through a multi-pass OCR pipeline combined with Gemini. Understands and transforms documents of any size, in 11 languages.',
    previews: [
      { label: 'How it works', src: `${base}/portfolio/pdfold-illustration.webp` },
      { label: 'Motion design', src: `${base}/portfolio/pdfold-motion.mp4`, poster: `${base}/portfolio/pdfold-motion-poster.webp` },
      { label: 'Landing page', src: `${base}/portfolio/pdfold.png` },
    ],
    url: 'https://pdfold.com',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Stripe'],
  },
  {
    title: 'AI Search Visibility Tracker',
    thumb: `${base}/work/ai-visibility.webp`,
    subtitle: 'apify.com/emoubarak',
    // an Actor published on the Apify store, not a SaaS
    category: 'tool',
    categoryLabel: 'Apify Actor',
    role: 'Author',
    description: 'Self-service tool measuring how AI answer engines describe a brand across ChatGPT, Perplexity, Gemini and Google AI Overviews. Statistical sampling per prompt, real geo-localization and week-over-week tracking.',
    // apify.com sets frame-ancestors 'self', so it cannot be previewed in an iframe.
    previews: [
      { label: 'How it works', src: `${base}/portfolio/ai-visibility-illustration.webp` },
      { label: 'Store page', src: `${base}/portfolio/ai-visibility.webp` },
    ],
    url: 'https://apify.com/emoubarak/ai-search-visibility-tracker',
    tags: ['TypeScript', 'Node.js', 'MCP', 'GEO / AEO'],
  },
  {
    title: 'jev-check',
    thumb: `${base}/work/jev-check.webp`,
    subtitle: 'github.com/emoubarak/jev-check',
    category: 'research',
    categoryLabel: 'Open source',
    role: 'Author · MIT',
    description: 'Open-source agent skill for Claude Code, Codex and OpenClaw: an AI browser agent signs in to a staging app as a real account state (free, paid, lapsed, team member, stranger) and follows a plain-English goal, then the database gives the verdict. Built to catch what mocks miss: paywalls, roles and cross-account isolation disagreeing on a deployed app.',
    previews: [
      { label: 'What it catches', src: `${base}/portfolio/jev-check-audit.webp` },
      { label: 'Repository', src: `${base}/portfolio/jev-check.webp` },
    ],
    url: 'https://github.com/emoubarak/jev-check',
    tags: ['Python', 'Browser agents', 'Agent skill', 'QA'],
  },
  {
    title: 'Agence KSUR',
    thumb: `${base}/work/ksur.webp`,
    subtitle: 'agence-ksur.com',
    category: 'agency',
    categoryLabel: 'Agency',
    role: 'CTO',
    description: 'Digital agency building tailor-made web & mobile applications, e-commerce platforms and AI automation workflows for SMEs. I own the full technical stack, from architecture to production.',
    // agence-ksur.com sets frame-ancestors 'self', so it cannot be previewed in an iframe.
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/ksur-home.webp` },
      { label: 'Showreel', src: `${base}/portfolio/ksur-showreel.mp4`, poster: `${base}/portfolio/ksur-showreel-poster.webp` },
    ],
    url: 'https://www.agence-ksur.com/',
    tags: ['Web', 'E-commerce', 'AI Automation', 'SEO'],
  },
  {
    title: 'Polymarket Up/Down Lab',
    thumb: `${base}/work/polymarket.webp`,
    subtitle: 'github.com/emoubarak/polymarket-updown-lab',
    category: 'research',
    categoryLabel: 'Research',
    role: 'Solo research',
    description: 'An honest hunt for a trading edge on Polymarket\'s 5 and 15 minute binary crypto markets: hypothesis, out-of-sample backtest, live paper trading, then falsification. ~12,000 paper trades across 60 concurrent runners, settled against the Chainlink oracle. The verdict: the market is efficient and nearly every edge turns out to be a measurement artifact.',
    // github.com sets X-Frame-Options: DENY, so the repo cannot be previewed in an iframe.
    previews: [
      { label: 'What it found', src: `${base}/portfolio/polymarket-illustration.webp` },
      { label: 'Live dashboard', src: `${base}/portfolio/polymarket-dashboard.webp` },
    ],
    url: 'https://github.com/emoubarak/polymarket-updown-lab',
    tags: ['Python', 'Go', 'Backtesting', 'Market making'],
  },
  {
    title: 'Atandem Agency',
    thumb: `${base}/work/atandem.webp`,
    subtitle: 'atandemagency.com',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work',
    description: 'Immersive landing page for T&EM, a new-generation integrated agency balancing transformation and empathy. Kinetic, scroll-led design.',
    previews: [{ label: 'Live site', src: 'https://atandemagency.com' }],
    url: 'https://atandemagency.com',
    tags: ['Landing page', 'Kinetic design'],
  },
  {
    title: 'Mon Jouet Montessori',
    thumb: `${base}/work/montessori.webp`,
    subtitle: 'mon-jouet-montessori.com',
    category: 'e-commerce',
    categoryLabel: 'E-commerce',
    role: 'Founder · sold',
    description: 'Online store of Montessori educational toys and games, built end to end, grown to real revenue, and successfully sold: SEO, marketing and custom Liquid themes.',
    previews: [{ label: 'Landing page', src: `${base}/portfolio/montessori.png` }],
    url: 'https://mon-jouet-montessori.com',
    tags: ['Shopify', 'Liquid', 'SEO'],
  },
  {
    title: 'Deuspi',
    thumb: `${base}/work/deuspi.webp`,
    subtitle: 'Confidential project',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    role: 'Mobile Software Engineer',
    description: 'Grocery delivery mobile app with real-time geolocation, on the Uber model. Sole mobile engineer on the first version, from wireframes to production-ready interface.',
    previews: [{ label: 'App screenshot', src: `${base}/portfolio/deuspi.png` }],
    url: null,
    tags: ['React Native', 'JavaScript'],
  },
  {
    title: 'Altao RSS Tool',
    thumb: `${base}/work/altao.webp`,
    subtitle: 'Confidential project',
    category: 'web-app',
    categoryLabel: 'Web App',
    role: 'Full-Stack Engineer',
    description: 'AI web application for automatic correction of hospital discharge summaries for French hospitals. Built solo, 5,000+ documents processed, €700,000 saved.',
    previews: [
      { label: 'Recoding tool', src: `${base}/portfolio/altao-devices.webp` },
      { label: 'Full app', src: `${base}/portfolio/altao-mockup.webp` },
    ],
    url: null,
    tags: ['Vue.js', 'Django', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Worldline MQTT Tool',
    thumb: `${base}/work/worldline.webp`,
    subtitle: 'Confidential project',
    category: 'web-app',
    categoryLabel: 'Web App',
    role: 'Full-Stack Engineer',
    description: 'MQTT debugging web tool for an R&D team: message visualization, payload publishing and logging. Improved team development speed by 70%.',
    previews: [
      { label: 'MQTT debugger', src: `${base}/portfolio/worldline-devices.webp` },
      { label: 'Full app', src: `${base}/portfolio/worldline-mockup.webp` },
    ],
    url: null,
    tags: ['Vue.js', 'Spring Boot', 'MQTT'],
  },
];
