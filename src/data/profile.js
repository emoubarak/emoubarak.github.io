// ─────────────────────────────────────────────────────────────────────────────
//  THE MOTHER SOURCE
//  Every surface (this site, /kit copy blocks, LinkedIn, Malt, Upwork) is a
//  projection of this file. Change a fact here, then propagate, never the
//  other way round. /kit keeps the hand-written EN/FR prose used to paste into
//  each platform; the structured facts below are what the prose must agree with.
// ─────────────────────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// One title on every surface since 2026-11-26 (site, CV, share images, LinkedIn banner). Never "Senior".
// Roles stay per position (Co-Founder & CTO of Piktechs, etc.).
const title = { en: 'Software & AI Engineer · Full-Stack, LLM Systems, Agents', fr: 'Ingénieur logiciel et IA · full-stack, systèmes LLM, agents' };

export const identity = {
  name: 'El Mahdi Moubarak',
  // deliberately different on Fiverr and Upwork, where the public first name is "Adam"
  publicNames: { site: 'El Mahdi Moubarak', linkedin: 'El Mahdi MOUBARAK', malt: 'El Mahdi M.', upwork: 'Adam M.', fiverr: 'Adam' },
  title,
  // same as `title`; kept as its own key because /cv and the knowledge base read it
  cvTitle: title,
  // no trailing period: the home hero adds it
  headline: { en: 'I build SaaS products, LLM features and browser agents, and ship them to production', fr: 'Je conçois des SaaS, des fonctionnalités LLM et des agents navigateur, et je les mets en production' },
  // no public city since 2026-11-26: the site shows the country only (he no longer lives in Lille).
  // Kept as a key because the knowledge base reads it; past places (IMT Nord Europe, ALTAO, Worldline) stay on their entries.
  city: null,
  location: { en: 'France · Remote across Europe', fr: 'France · télétravail partout en Europe' },
  email: 'elmahdi@moubarak.dev',
  website: 'https://moubarak.dev/',
  linkedin: 'https://linkedin.com/in/el-mahdi-moubarak',
  github: 'https://github.com/emoubarak',
  calendly: 'https://calendly.com/moubarakelmahdipro/',
  languages: { en: 'French (native) · English (C1, TOEIC) · Spanish (professional)', fr: 'Français (natif) · Anglais (C1, TOEIC) · Espagnol (professionnel)' },
  // first production work in 2019 (Worldline internship); internships and work alongside the 2022 degree included.
  // Public copy says "since 2019", never a year count a reader would recompute from the degree date.
  experienceSince: 2019,
  domains: { en: 'healthcare, fintech and cybersecurity', fr: 'santé, fintech et cybersécurité' },
  rates: { maltDaily: '550 €/day', upworkHourly: '$55/hr' },
  // his words of 2026-11-15: no longer in Lille; on-site in mainland France or Belgium means a flight, for a grouped trip
  availability: { en: 'more than 30 h/week · remote; on-site only for a planned, grouped trip (mainland France, Belgium)', fr: 'plus de 30 h/semaine · télétravail ; présentiel seulement sur un déplacement groupé et planifié (France métropolitaine, Belgique)' },
  clientSectors: { en: 'IT & digital services · software publishers · healthcare providers · banking & financial services', fr: 'services numériques et IT · édition de logiciels · fournisseurs de soins de santé · banques et services financiers' },
  entryOffer: { en: 'a paid audit or a 5-10 day proof of concept with one measurable deliverable', fr: 'un audit payant ou une preuve de concept de 5 à 10 jours, avec un livrable mesurable' },
};

// Measured, verifiable numbers, never rounded up. Two are estimates from tests run before rollout (ALTAO, Worldline):
// the tools then went to production and the companies' own figures are not available to him. They say so.
export const proof = [
  { claim: { en: 'Medical platform for hospitals, sole engineer: 5,000+ documents processed; tests on past documents before rollout estimated €700,000 in savings for hospitals.', fr: "Plateforme médicale pour hôpitaux, seul ingénieur : 5 000+ documents traités ; 700 000 € d'économies estimées pour les hôpitaux lors des tests sur des documents passés, avant la mise en production." }, source: 'ALTAO Santé' },
  { claim: { en: 'Security Rating®, a cyber-rating SaaS used by 200+ organizations.', fr: 'Security Rating®, SaaS de cyber-notation utilisé par 200+ organisations.' }, source: 'Board of Cyber' },
  { claim: { en: "Agentic QA with jev, Browser Use's browser agent: 16 permanent checks on what each plan unlocks and who can do what, each one decided by a SQL query on the database; its screenshots on closed tickets found 3 bugs the fixes had missed or introduced.", fr: "QA par agent navigateur avec jev, l'agent navigateur de Browser Use : 16 vérifications permanentes sur ce que débloque chaque offre et qui a le droit de faire quoi, chacune tranchée par une requête SQL sur la base ; ses captures sur des tickets clos ont révélé 3 bugs que les correctifs avaient manqués ou introduits." }, source: 'Piktechs' },
  { claim: { en: 'AI card scanner: of four candidate vision models, two obeyed a prompt-injection card and one errored; the fallback is the one that resisted.', fr: "Scanner de cartes IA : sur quatre modèles de vision candidats, deux ont obéi à une carte piégée par injection de prompt et un a planté ; le repli est celui qui a résisté." }, source: 'Piktechs' },
  { claim: { en: "Internal R&D tool to create, store and replay payment test sets; tests before rollout measured the team's development speed 70% higher.", fr: "Outil interne de R&D pour créer, stocker et rejouer des jeux de tests de paiement ; les tests avant la mise en production ont mesuré une vitesse de développement de l'équipe 70 % plus élevée." }, source: 'Worldline' },
  { claim: { en: '~12,000 paper trades across 60 paper-trading runs in parallel (7 strategy variants × 6 coins × 2 window lengths), settled against the Chainlink oracle.', fr: "~12 000 trades simulés sur 60 sessions de paper trading en parallèle (7 variantes de stratégie × 6 cryptos × 2 durées de fenêtre), réglés contre l'oracle Chainlink." }, source: 'Polymarket Up/Down Lab' },
  { claim: { en: 'PDFs into structured Markdown, in 11 languages.', fr: 'Des PDF en Markdown structuré, en 11 langues.' }, source: 'PDFold' },
  { claim: { en: 'Shopify store built, grown through SEO and marketing, and sold.', fr: 'Boutique Shopify créée, développée par le SEO et le marketing, puis vendue.' }, source: 'Mon Jouet Montessori' },
  { claim: { en: 'Corporate AI training: two sessions, in French and English.', fr: 'Formation IA en entreprise : deux sessions, en français et en anglais.' }, source: 'DRIVECO' },
];

// How I work with AI: principles, each with the place where a reader can check it.
// No vanity numbers here on purpose: the proof is the linked work, not a count.
// /cv renders it; /kit generates its EN copy block from it.
export const aiApproach = {
  intro: { en: "Six rules I follow when I build with AI, each with a link to the work that shows it." },
  // /cv shows these next to the Piktechs entry, which carries the "SQL query decides pass or fail" wording:
  // principle 1 describes the same check without repeating it.
  principles: [
    {
      title: 'Done means I saw it work',
      text: "Before I call a task done, I check it on the product: screenshots at the screen widths people use, and a browser agent that signs in to the test app as a given kind of user. A query on the database then checks the result.",
      proof: { label: 'Case study: account-state-check', href: '/blog/case-study-jev-check' },
    },
    {
      title: 'An AI feature starts with its threat model',
      text: "A model can read text written by an attacker: a business card, an email, a web page. Before writing the prompt, I list what the feature must never do, then pick the model that passes those tests.",
      proof: { label: 'Case study: the AI card scanner', href: '/blog/case-study-ai-card-scanner' },
    },
    {
      title: 'Extra checks where a bug would go unnoticed',
      text: "On Piktechs, every change runs the unit and Playwright tests in CI, and only I approve a release to production. Billing, permissions and anything touching another account's data also get mandatory checks and a review by a different model from the one that wrote the code.",
      proof: { label: 'Case study: Piktechs', href: '/blog/case-study-piktechs' },
    },
    {
      title: 'Measure before believing',
      text: "Models give different answers to the same prompt, and backtests overstate results. I repeat each test many times, test out of sample and try to break a result before I trust it. My Polymarket research found no tradable edge; the repository publishes the method and the results.",
      proof: { label: 'Polymarket Up/Down Lab', href: 'https://github.com/emoubarak/polymarket-updown-lab' },
    },
    {
      title: 'Put each correction where the next session reads it',
      text: "I write each correction into a file the next agent session reads (a CLAUDE.md rule, a skill or a project memory), the narrowest one that works. If a written rule fails twice, I replace it with a hook that blocks the mistake.",
      proof: { label: 'Article: what I kept telling Claude', href: '/blog/what-i-kept-telling-claude' },
    },
    {
      title: 'Automate what I do twice',
      text: "I automate any task I have done twice. An agent runs alone only with an end condition, a budget, a way to check its own work and a way to reach me, and it stops to ask before money, passwords, publishing, a production release or a deletion that cannot be undone.",
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
    description: "Your product from the spec to a first version in production: architecture, code and deployment, with one engineer on the whole stack.",
    audience: "For founders starting a product",
  },
  {
    title: "AI Automation & Agents",
    description: "AI agents and LLM workflows that take a manual task off your team: sorting incoming requests, updating the client record, drafting replies for you to review.",
    audience: "For teams that repeat the same task every day",
  },
  {
    title: "LLM & RAG Integration",
    description: "Chat over your documents, data extraction from scans and PDFs, and OpenAI, Claude or Gemini inside your existing product, with rate limits, fallbacks and evaluation in place.",
    audience: "For products that already have users and need an AI feature",
  },
  {
    title: "AI-Generated MVP Rescue",
    description: "An app built with Lovable, Bolt, Cursor or Claude Code that breaks in production: audit, security (auth, Supabase RLS, exposed API keys), refactoring, tests, deployment.",
    audience: "For founders whose prototype cannot ship",
  },
  {
    title: "Self-Hosted AI Agents",
    description: "Installing and securing agent runtimes on your own server or VPS (OpenClaw, Hermes Agent, GPT- and Claude-based agents, or a custom stack), wired into Slack, WhatsApp, Telegram, your CRM and Google Workspace, with custom skills and MCP.",
    audience: "For teams who want their agents on their own infrastructure",
  },
  {
    title: "Shopify Where It Gets Technical",
    description: "Custom apps, Liquid, checkout work, and order-to-fulfilment automation connecting Shopify to your factory, ERP, CRM or AI workflows.",
    audience: "For stores past what themes and plugins can do",
  },
  {
    title: "Corporate AI Training",
    description: "Hands-on AI sessions in French or English, built on your company's own processes, from the first prompt to automating a complete business process.",
    audience: "For companies onboarding their teams to AI",
  },
];

// Experiences, in the CV's order. Light markup, rendered on /cv: **bold** for a key phrase,
// ==text== for a result (accent colour). The knowledge base keeps ** and drops ==.
// `url` links the company name; `links` are the proofs shown under the role (case studies, store, testimonial).
export const experiences = [
  {
    company: "Piktechs",
    url: "https://piktechs.com",
    role: "Co-Founder & CTO",
    period: "Mar 2026 – Present",
    location: "France",
    summary: "B2B SaaS for events & networking: digital business cards (NFC/QR), lead capture and CRM, team workspaces.",
    achievements: [
      "**Sole engineer:** took a two-week prototype to a **B2B SaaS in production** for event lead capture.",
      "**Agentic QA with jev**, Browser Use's browser agent: it signs in to the test app as a user in each account state (free, Pro, lapsed, team member, frozen team) and follows a plain-English goal; **a SQL query on the database then decides pass or fail**. ==16 permanent checks== on what each plan unlocks and who can do what; its before/after screenshots on closed tickets found ==3 bugs== that the fixes had missed or introduced. Open-sourced as account-state-check.",
      "Shipped an **AI business-card scanner**: vision LLM with strict JSON output, a per-user quota and on-device OCR as the last resort; chose the cross-provider fallback by **prompt-injection testing** (==2 of 4== candidate models obeyed an injected card).",
      "**Live Stripe billing** (checkout, customer portal, webhooks, per-seat team plans, scheduled reconciliation) and multi-tenant workspaces secured by **Postgres row-level security** and role-based permissions; every billing or permission change gets a **second review by a different model** from the one that wrote it.",
      "**Android app live on Google Play** and iOS build from the same codebase (Capacitor), Apple and Google Wallet passes, CRM sync and a Zapier integration.",
      "Unit and Playwright tests gate CI/CD across separate test and production environments.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase (Postgres, RLS, Edge Functions)", "Stripe", "Capacitor", "OpenRouter", "Resend", "Playwright", "Vitest", "jev (Browser Use)", "GitHub Actions", "Cloudflare Pages", "Claude Code"],
    links: [
      { label: "Case study: Piktechs", href: "/blog/case-study-piktechs" },
      { label: "Case study: account-state-check", href: "/blog/case-study-jev-check" },
      { label: "Case study: the AI card scanner", href: "/blog/case-study-ai-card-scanner" },
      { label: "Android app on Google Play", href: "https://play.google.com/store/apps/details?id=com.piktechs.app&hl=en" },
      { label: "account-state-check on GitHub", href: "https://github.com/emoubarak/account-state-check" },
    ],
  },
  {
    company: "EMM",
    role: "Founder & AI / Full-Stack Engineer",
    period: "Mar 2026 – Present",
    location: "France · Remote",
    summary: "My own company, a French SASU, through which I invoice freelance work. The offer: self-hosted AI agents, rescue of AI-generated MVPs (Lovable, Bolt, Cursor, Claude Code), and LLM and RAG features in existing products.",
    achievements: [
      "**AI browser automation with jev:** my own task runner drives dedicated browsers from the terminal to enter, extract and update data in back-offices that have no API, hands over to me for logins, captchas and 2FA, and logs every step with a screenshot and its cost.",
      "**My own agent harness:** skills, hooks that turn repeated corrections into enforced checks, scheduled routines with failure alerts, semantic search over past sessions, and a 180B mixture-of-experts model (about 6B active per token) running locally on an RTX 3080 20 GB. A weekly job scans my sessions for corrections I keep repeating.",
    ],
    stack: ["TypeScript", "Python", "Next.js", "Node.js", "Supabase", "Docker", "OpenAI, Claude, Gemini APIs", "MCP", "Browser Use", "Claude Code"],
    // the two articles already linked from "How I work with AI" on /cv are not repeated here
    links: [
      { label: "Tour of the harness", href: "/harness" },
      { label: "Article: browser agents at work", href: "/blog/browser-agents-at-work-jev" },
    ],
  },
  {
    company: "KSUR",
    url: "https://www.agence-ksur.com/",
    role: "CTO",
    period: "Mar 2026 – Present",
    location: "France · Morocco",
    summary: "Web agency (agence-ksur.com): websites, e-commerce and web apps for small businesses.",
    achievements: [
      "Run the **technical stack and delivery** for ==about ten client companies== in France, Belgium, Morocco and La Réunion.",
      "**Partnership with THE ICON** (the-icon.be), a Belgian marketing and sales agency: KSUR builds the websites of its clients.",
      "Run the agency's hosting: one VPS serving the agency site, its demo sites and four client sites, with deployment on every push to GitHub and an email check per client site in CI.",
    ],
  },
  {
    company: "DRIVECO",
    url: "https://www.driveco.com",
    role: "AI Trainer",
    period: "Jul 2026",
    location: "Paris (Hybrid)",
    summary: "AI training for the teams of DRIVECO, an electric-vehicle charging operator.",
    achievements: [
      "Designed and delivered **two AI training sessions**, in French and English, including the ChatGPT workshop \"Make AI work for you\", with exercises built on the company's own processes and its OpenAI tools.",
    ],
    links: [
      { label: "Public testimonial on LinkedIn", href: "https://www.linkedin.com/posts/el-mahdi-moubarak_merci-%C3%A0-toute-l%C3%A9quipe-driveco-de-mavoir-share-7480266785208926210-AIX7/" },
    ],
  },
  {
    company: "Board of Cyber",
    url: "https://www.boardofcyber.io",
    role: "Full-Stack Engineer",
    period: "Mar 2023 – Feb 2026",
    location: "Paris (Remote)",
    summary: "Mostly front-end, in a **team of 20 developers**, on Security Rating®, a SaaS cyber-rating platform used by ==200+ organizations==: client platform, back office and manager office.",
    achievements: [
      "Built **Angular components**, worked on the Angular version upgrades, added Spectator test coverage and fixed bugs.",
      "Built a Python **vulnerability-scanning probe** on nmap that automated attack-surface data collection for the ratings.",
    ],
    stack: ["Angular", "TypeScript", "Python", "nmap", "Spectator", "Docker", "CI/CD"],
  },
  {
    company: "ALTAO Santé",
    url: "https://www.linkedin.com/company/altao---recherche-developpement-marketing-sante",
    role: "Full-Stack & AI Engineer",
    period: "Sep 2021 – Sep 2022",
    location: "Lille (On-site)",
    summary: "**Sole engineer** on a new medical platform that corrects hospital discharge summaries, replacing a workflow split across several tools.",
    achievements: [
      "Processed ==5,000+ documents== through the platform; tests on past documents before rollout estimated the savings for hospitals at ==€700,000==.",
      "Ran requirement sessions with doctors, wrote specs, and integrated the Data Science team's **ML prediction models** and rule engines.",
      "Deployed and monitored the AWS infrastructure (EC2, Route53, Amplify).",
    ],
    stack: ["Vue.js", "Django", "Python", "PostgreSQL", "AWS (EC2, Route53, Amplify)"],
  },
  {
    company: "Deuspi",
    url: "https://www.linkedin.com/company/deuspi/",
    role: "Mobile Software Engineer",
    period: "Mar 2021 – Jun 2021",
    location: "Lille (Remote)",
    summary: "**Sole mobile engineer** on the first version of a React Native grocery delivery app, transitioning the product from web-only to native mobile.",
    achievements: [
      "Built the whole front end from the designer's wireframes.",
      "Implemented a gamified UX direction defined by the product team to drive customer retention.",
      "Co-defined API contracts with the backend developer for real-time order tracking and inventory sync.",
    ],
    stack: ["React Native", "JavaScript", "REST APIs"],
  },
  {
    company: "Worldline",
    url: "https://worldline.com",
    role: "Full-Stack Engineer",
    period: "Apr 2019 – Aug 2019 · Internship",
    location: "Seclin (On-site)",
    summary: "Internal tool for the R&D team to create, store and replay payment test sets over MQTT.",
    achievements: [
      "Designed and built the tool, which replaced test requests written by hand; tests before rollout measured the team's development speed ==70%== higher.",
    ],
    stack: ["Vue.js", "Spring Boot", "Java", "MQTT", "Docker"],
  },
];

export const education = [
  {
    degree: "Engineering Degree (Master's level) in CS, Networks & Telecoms",
    school: "IMT Nord Europe",
    period: "2017 – 2022",
    detail: "Lille, France.",
  },
  {
    degree: "Scientific Baccalaureate, Math Major",
    school: "Lycée Français International Louis-Massignon",
    period: "2017",
    detail: "AEFE network · Casablanca, Morocco.",
  },
];

export const certifications = [
  { name: 'TOEIC', provider: 'ETS', issued: 'December 2020' },
];

export const techGroups = [
  { label: "AI & Automation", items: ["AI Agents", "Claude Code (skills, hooks, subagents)", "MCP", "Browser agents & agentic QA (jev, Browser Use)", "LLM APIs (OpenAI, Claude, Gemini, OpenRouter)", "LLM evaluation & prompt-injection testing", "Local LLMs (llama.cpp, ExLlamaV2)", "RAG", "Embeddings & vector search", "OCR & Vision pipelines", "ElevenLabs", "Voice AI"] },
  { label: "Web & Mobile Dev", items: ["TypeScript", "JavaScript", "Next.js", "React", "React Native", "Capacitor", "Angular", "Vue.js", "Node.js", "Python", "Django", "Flask", "PostgreSQL", "Supabase"] },
  { label: "Cloud & DevOps", items: ["AWS (EC2, Route53, Amplify)", "Docker", "Git", "CI/CD", "Vercel"] },
  { label: "E-commerce", items: ["Shopify API", "Liquid", "Stripe", "SEO"] },
  // spoken languages are in identity.languages, shown once in the /cv header
];

export const interests = [
  { title: "Guitar", detail: "17 years. Former VP of the Music Club at IMT Nord Europe." },
  { title: "Philosophy", detail: "Perception and the theory of knowledge." },
  { title: "Strength training", detail: "Weight training on a regular schedule." },
];

export const projectCategories = [
  { key: 'all', label: 'All' },
  { key: 'saas', label: 'SaaS' },
  { key: 'web-app', label: 'Web Apps' },
  // every card labelled "Open source" sits under this filter; "Research" keeps the two write-ups
  { key: 'open-source', label: 'Open source' },
  { key: 'research', label: 'Research' },
  { key: 'tool', label: 'Tools' },
  { key: 'e-commerce', label: 'E-commerce' },
  { key: 'website', label: 'Websites' },
  { key: 'agency', label: 'Agency' },
  { key: 'mobile', label: 'Mobile' },
];

// `thumb` is the uniform card image (public/work/, built by scripts/thumbs.py) and `thumbAlt` describes it;
// `previews` are the tabs of the preview modal.
const allProjects = [
  {
    title: 'Piktechs',
    thumb: `${base}/work/piktechs.webp`,
    thumbAlt: 'Piktechs on a laptop and a phone: the events page of the web app and the mobile dashboard',
    subtitle: 'piktechs.com',
    category: 'saas',
    categoryLabel: 'SaaS',
    role: 'Co-Founder & CTO',
    description: 'B2B SaaS for digital business cards (NFC and QR) at professional events: lead capture with an AI card scanner, a CRM and team workspaces. I am its only engineer, from the web app to the Android app on Google Play.',
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
    thumbAlt: 'PDFold diagram: a scanned PDF goes through OCR, layout and Gemini passes and comes out as Markdown',
    subtitle: 'Archived project',
    category: 'saas',
    categoryLabel: 'SaaS',
    role: 'Founder',
    description: 'SaaS that converted PDFs to structured Markdown with a multi-pass OCR pipeline and Gemini, in 11 languages.',
    previews: [
      { label: 'How it works', src: `${base}/portfolio/pdfold-illustration.webp` },
      { label: 'Motion design', src: `${base}/portfolio/pdfold-motion.mp4`, poster: `${base}/portfolio/pdfold-motion-poster.webp` },
      { label: 'Landing page', src: `${base}/portfolio/pdfold.png` },
    ],
    url: null,
    archived: true,
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Stripe'],
  },
  {
    title: 'AI Search Visibility Tracker',
    thumb: `${base}/work/ai-visibility.webp`,
    thumbAlt: 'Tracker diagram: one prompt asked five times to ChatGPT, Perplexity, Gemini and AI Overviews, with mention counts and a weekly trend',
    subtitle: 'apify.com/emoubarak',
    // an Actor published on the Apify store, not a SaaS
    category: 'tool',
    categoryLabel: 'Apify Actor',
    role: 'Author',
    description: 'Apify Actor that measures how ChatGPT, Perplexity, Gemini and Google AI Overviews describe a brand. Each prompt is sampled several times per engine, with localized results, week-over-week tracking and an MCP endpoint for AI agents.',
    // apify.com sets frame-ancestors 'self', so it cannot be previewed in an iframe.
    previews: [
      { label: 'How it works', src: `${base}/portfolio/ai-visibility-illustration.webp` },
      { label: 'Store page', src: `${base}/portfolio/ai-visibility.webp` },
    ],
    url: 'https://apify.com/emoubarak/ai-search-visibility-tracker',
    tags: ['TypeScript', 'Node.js', 'MCP', 'GEO / AEO'],
  },
  {
    title: 'account-state-check',
    thumb: `${base}/work/jev-check.webp`,
    thumbAlt: 'Terminal output of an account-state-check audit: the agent reports done, the database check fails',
    subtitle: 'github.com/emoubarak/account-state-check',
    category: 'open-source',
    categoryLabel: 'Open source',
    role: 'Author · MIT',
    description: 'Open-source agent skill for Claude Code, Codex and OpenClaw: an AI browser agent signs in to a staging app as an account in a given state (free, paid, lapsed, team member, stranger) and follows a plain-English goal, then a SQL query on the database decides pass or fail. Built to catch what mocks miss: paywalls, roles and cross-account isolation disagreeing on a deployed app.',
    previews: [
      { label: 'What it catches', src: `${base}/portfolio/jev-check-audit.webp` },
      { label: 'Repository', src: `${base}/portfolio/jev-check.webp` },
    ],
    url: 'https://github.com/emoubarak/account-state-check',
    tags: ['Python', 'Browser agents', 'Agent skill', 'QA'],
  },
  {
    title: 'Hindsight',
    thumb: `${base}/work/hindsight.webp`,
    thumbAlt: 'Claude Code session where Hindsight recalls a deploy command from an earlier session',
    subtitle: 'github.com/emoubarak/hindsight',
    category: 'open-source',
    categoryLabel: 'Open source',
    role: 'Author · MIT',
    description: 'Claude Code plugin that gives the agent a memory of every past session. Ask "do you remember how we deployed this?" and a hook searches the old transcripts by meaning and puts the best matches in context. Corrections you keep repeating are logged, and the plugin proposes each one as a hook, a skill or a CLAUDE.md rule; nothing is written before you say yes. Runs on your machine, with no server and no account.',
    // github.com sets X-Frame-Options: DENY, so the repo cannot be previewed in an iframe.
    previews: [
      { label: 'Recall in action', src: `${base}/portfolio/hindsight-demo.webp` },
      { label: 'How it works', src: `${base}/portfolio/hindsight-how.webp` },
      { label: 'Repository', src: `${base}/portfolio/hindsight-repo.webp` },
    ],
    url: 'https://github.com/emoubarak/hindsight',
    tags: ['Python', 'Claude Code plugin', 'Hooks', 'Semantic search'],
  },
  {
    title: 'Claude Skill Router',
    thumb: `${base}/work/skill-router.webp`,
    thumbAlt: 'Skill Router summary: the skills loaded for a prompt, and the share of needed skills rising from 57% to 84%',
    subtitle: 'github.com/emoubarak/claude-skill-router',
    category: 'open-source',
    categoryLabel: 'Open source',
    role: 'Author · MIT',
    description: 'A Claude Code hook that names the skills a prompt needs, from rules written in your own words, and a bench that replays your own sessions to measure it. On my setup, the share of needed skills loaded went from 57% to 84% on prompts the rules were never tuned on, for about 150 tokens and 20 ms per prompt.',
    previews: [
      { label: 'What it does', src: `${base}/portfolio/skill-router-illustration.webp` },
      { label: 'The write-up', src: `${base}/blog/claude-skills-that-actually-load.webp` },
    ],
    url: 'https://github.com/emoubarak/claude-skill-router',
    tags: ['Python', 'Claude Code hooks', 'Evaluation'],
  },
  {
    title: 'Voice Browser',
    thumb: `${base}/work/jev-voice.webp`,
    thumbAlt: 'Voice Browser: a spoken Wikipedia request, the steps it runs and the extension panel with the answer',
    subtitle: 'github.com/emoubarak/voice-browser',
    category: 'open-source',
    categoryLabel: 'Open source',
    role: 'Author · MIT',
    description: 'Browser extension that carries out a spoken task in your own Chromium profile, already signed in to your accounts. Claude turns the sentence into one or two narrow goals, then jev, Browser Use\'s browser agent, acts one click or keystroke at a time, with no chrome.debugger and no remote-debugging port. A Wikipedia lookup takes 12 to 19 seconds from command to answer.',
    previews: [
      { label: 'How it works', src: `${base}/portfolio/jev-voice-illustration.webp` },
      { label: 'Architecture', src: `${base}/portfolio/jev-voice-arch.webp` },
      { label: 'Repository', src: `${base}/portfolio/jev-voice-repo.webp` },
    ],
    url: 'https://github.com/emoubarak/voice-browser',
    tags: ['Browser extension', 'Speech to text', 'Browser agents', 'Claude'],
  },
  {
    title: 'browser-agents',
    thumb: `${base}/work/browser-agents.webp`,
    thumbAlt: 'browser-agents back-office: a grid of browser profiles with their task counts',
    subtitle: 'Private project',
    // his own tool, not client work: /cv labels it "Private" rather than "Confidential"
    private: true,
    category: 'tool',
    categoryLabel: 'Internal tool',
    role: 'Author',
    description: 'Task runner for browser agents. Each of my accounts gets its own persistent browser profile, logged in once by me. Tasks are written in plain English from the terminal or a back-office and run on Claude, OpenRouter models or a local Qwen. When a site asks for a login, a captcha or a 2FA code, the task pauses and a phone notification opens the live browser; the agent resumes once I have done that step.',
    previews: [
      { label: 'Profiles', src: `${base}/harness/browser-profiles.webp` },
      { label: 'How it works', src: `${base}/portfolio/jev-administrator-illustration.webp` },
    ],
    url: null,
    tags: ['Python', 'Browser agents', 'Containers', 'Multi-model'],
  },
  {
    title: 'KSUR',
    thumb: `${base}/work/ksur.webp`,
    thumbAlt: 'Home page of the KSUR agency site, in French, with its services menu and quote button',
    subtitle: 'agence-ksur.com',
    category: 'agency',
    categoryLabel: 'Agency',
    role: 'CTO',
    description: 'Web agency where I am CTO: websites, e-commerce and web apps for about ten client companies in France, Belgium, Morocco and La Réunion, several of them clients of THE ICON, a Belgian marketing agency. I run the technical stack, the delivery and the hosting.',
    // agence-ksur.com sets frame-ancestors 'self', so it cannot be previewed in an iframe.
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/ksur-home.webp` },
      { label: 'Showreel', src: `${base}/portfolio/ksur-showreel.mp4`, poster: `${base}/portfolio/ksur-showreel-poster.webp` },
    ],
    url: 'https://www.agence-ksur.com/',
    tags: ['Websites', 'E-commerce', 'Web apps', 'Hosting'],
  },
  {
    title: 'Polymarket Up/Down Lab',
    thumb: `${base}/work/polymarket.webp`,
    thumbAlt: 'Polymarket research summary: a Bitcoin up-or-down market and the equity curves of the paper-trading runs',
    subtitle: 'github.com/emoubarak/polymarket-updown-lab',
    category: 'research',
    categoryLabel: 'Research',
    role: 'Solo',
    description: 'A search for a trading edge on Polymarket\'s 5 and 15 minute binary crypto markets: hypothesis, out-of-sample backtest, live paper trading, then falsification. ~12,000 paper trades across 60 paper-trading runs in parallel (7 strategy variants × 6 coins × 2 window lengths), settled against the Chainlink oracle. Result: the market is efficient, and nearly every edge I found came from a measurement artifact.',
    // github.com sets X-Frame-Options: DENY, so the repo cannot be previewed in an iframe.
    previews: [
      { label: 'What it found', src: `${base}/portfolio/polymarket-illustration.webp` },
      { label: 'Live dashboard', src: `${base}/portfolio/polymarket-dashboard.webp` },
    ],
    url: 'https://github.com/emoubarak/polymarket-updown-lab',
    tags: ['Python', 'Go', 'Backtesting', 'Market making'],
  },
  {
    title: 'A 180B Model on an eGPU',
    thumb: `${base}/work/strata.webp`,
    thumbAlt: 'Benchmark summary: a 180B model on a mini PC with an eGPU dock, with speeds on an RTX 3060 Ti 8 GB and an RTX 3080 20 GB',
    subtitle: 'github.com/emoubarak/strata-flash-next-rtx3080-20gb',
    category: 'research',
    categoryLabel: 'Research',
    role: 'Solo · MIT',
    description: 'Dated benchmarks and the full working config for running Qwen3.8-Flash-Next 180B (about 6B active per token) with Strata on a mini PC whose only strong GPU sits in an OCuLink dock. With an RTX 3080 20 GB: about 2,000 tokens/s prompt read and 110 to 204 tokens/s generation, up to 262k context. Two public repos, one per GPU, with frozen prompts and the scripts to reproduce every number.',
    previews: [
      { label: 'What it measures', src: `${base}/portfolio/strata-illustration.webp` },
      { label: '8 GB vs 20 GB', src: `${base}/portfolio/strata-8gb-vs-20gb.webp` },
      { label: 'Repository', src: `${base}/portfolio/strata-repo.webp` },
    ],
    url: 'https://github.com/emoubarak/strata-flash-next-rtx3080-20gb',
    tags: ['Local LLM', 'CUDA', 'Benchmarks', 'eGPU'],
  },
  {
    title: 'Signal LLM Bot',
    thumb: `${base}/work/signal-bot.webp`,
    thumbAlt: 'Signal group chat where the bot answers when called by name, next to the list of what it can do',
    subtitle: 'github.com/emoubarak/signal-bot',
    category: 'open-source',
    categoryLabel: 'Open source',
    role: 'Author',
    description: 'Bot for Signal group chats, called by name in plain language. It summarizes what was said, explains a message, transcribes voice notes, makes and edits images, searches the web, does exact maths and posts reminders at the time you set. Runs in Docker on OpenRouter models, or on a local model with nothing leaving the machine.',
    previews: [
      { label: 'In a group', src: `${base}/portfolio/signal-bot-illustration.webp` },
      { label: 'Repository', src: `${base}/portfolio/signal-bot-repo.webp` },
    ],
    url: 'https://github.com/emoubarak/signal-bot',
    tags: ['Python', 'OpenRouter', 'Tool use', 'Docker'],
  },
  {
    title: 'CalcPit',
    // archived product, hidden from the site on 2026-11-25 (kept here for the kit and the knowledge base)
    hidden: true,
    thumb: `${base}/work/calcpit.webp`,
    subtitle: 'Archived project',
    category: 'web-app',
    categoryLabel: 'Web App',
    role: 'Founder',
    description: '87 free calculators for construction and landscaping (concrete, framing, roofing, electrical, HVAC) that give the quantity to order. Static site with no framework, every formula tested against hand-worked cases, and a link that shares each result with its numbers.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/calcpit-home.webp` },
      { label: 'Concrete slab', src: `${base}/portfolio/calcpit-slab.webp` },
    ],
    url: null,
    archived: true,
    tags: ['JavaScript', 'Static site', 'SEO', 'Cloudflare'],
  },
  {
    title: 'Lumber Calculator',
    // archived product, hidden from the site on 2026-11-25 (kept here for the kit and the knowledge base)
    hidden: true,
    thumb: `${base}/work/lumber.webp`,
    subtitle: 'Archived project',
    category: 'mobile',
    categoryLabel: 'Android App',
    role: 'Founder',
    description: 'Android app with nine framing and sheet-goods calculators, built from the same tested formulas as the CalcPit calculators. It reads feet and inches as people type them (8\' 6 1/2"), saves results into jobs that export a material list, and works offline with no account and no network request.',
    previews: [
      { label: 'Screens', src: `${base}/portfolio/lumber-screens.webp` },
      { label: 'Job material list', src: `${base}/portfolio/lumber-job.webp` },
    ],
    url: null,
    archived: true,
    tags: ['React Native', 'Expo', 'Android', 'Offline'],
  },
  {
    title: 'Atandem Agency',
    thumb: `${base}/work/atandem.webp`,
    thumbAlt: 'Atandem home page: a dark scene with a tandem bike and the question: transformation or empathy?',
    subtitle: 'atandemagency.com',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work',
    description: 'Website for T&EM, an integrated agency in Vienna: a scroll-driven horizontal journey on the home page, five service panels, an interactive 3D tandem bike on the contact page, and a small admin to add, hide or back up languages.',
    previews: [{ label: 'Live site', src: 'https://atandemagency.com' }],
    url: 'https://atandemagency.com',
    tags: ['Astro', 'Three.js', 'Scroll-driven', 'i18n'],
  },
  {
    title: 'Vyrion International Consulting',
    thumb: `${base}/work/vyrion.webp`,
    thumbAlt: 'Vyrion home page: Your business in China, from setup to execution, over a dark map of southern China',
    subtitle: 'vyrioncapital.com',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work',
    description: 'On the existing trilingual site (English, French, Chinese) of a consultancy that helps companies set up and operate in China, I added a short quiz on each service page that emails a checklist PDF, lead delivery through Resend, six guides and the SEO work.',
    // vyrioncapital.com sends X-Frame-Options: DENY, so it cannot be previewed in an iframe.
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/vyrion-home.webp` },
      { label: 'Quiz & checklist', src: `${base}/portfolio/vyrion-quiz.webp` },
      { label: 'CINA directory', src: `${base}/portfolio/vyrion-cina.webp` },
    ],
    url: 'https://www.vyrioncapital.com',
    tags: ['Next.js', 'TypeScript', 'EN · FR · ZH', 'Lead magnets'],
  },
  {
    title: 'THE ICON',
    thumb: `${base}/work/the-icon.webp`,
    thumbAlt: 'THE ICON home page in black and white, headline in French: sell more online and in the field',
    subtitle: 'the-icon.be',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work',
    description: 'Website for THE ICON, a digital marketing and sales support agency: 22 pages covering their services, three offer tiers, method and results, plus two calculators (ad ROI, lost leads). Swiss brutalist design in static HTML, CSS and JS, with no build step.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/the-icon-home.webp` },
      { label: 'Offers', src: `${base}/portfolio/the-icon-offres.webp` },
      { label: 'Live site', src: 'https://the-icon.be' },
    ],
    url: 'https://the-icon.be',
    tags: ['HTML / CSS / JS', 'Lead generation', 'Calculators'],
  },
  {
    title: 'Group BW Invest',
    thumb: `${base}/work/groupbw.webp`,
    thumbAlt: 'Group BW Invest home page: a building under construction at sunset, headline in French: build, strengthen, raise',
    subtitle: 'groupbw.be',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work · with THE ICON',
    description: 'Website for a Belgian construction company (structural work, steel structures, building extensions), in French, English and Dutch, with a quote request that accepts building plans. Built for a client of THE ICON.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/groupbw-home.webp` },
      { label: 'Live site', src: 'https://www.groupbw.be' },
    ],
    url: 'https://www.groupbw.be',
    tags: ['HTML / CSS / JS', 'FR · EN · NL', 'Quote form'],
  },
  {
    title: 'ID Advise',
    thumb: `${base}/work/idadvise.webp`,
    thumbAlt: 'ID Advise home page: a modern house, headline in French: every trade of a project, one direction',
    subtitle: 'idadvise.com',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work · with THE ICON',
    description: 'Website for a Belgian general contractor that coordinates every trade on a building site, in French, English and Dutch: one page per trade, maintenance, job offers and a contact form. Built for a client of THE ICON.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/idadvise-home.webp` },
      { label: 'Live site', src: 'https://www.idadvise.com' },
    ],
    url: 'https://www.idadvise.com',
    tags: ['HTML / CSS / JS', 'FR · EN · NL', 'Careers'],
  },
  {
    title: 'Prestige Auto Ecoservice',
    thumb: `${base}/work/prestige-auto.webp`,
    thumbAlt: 'Prestige Auto Ecoservice home page: BMW cars in the workshop, headline in French: car repair workshop',
    subtitle: 'prestige-auto-ecoservices.com',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work · KSUR',
    description: 'One-page site for a BMW and Mini repair workshop in Casablanca: services, customer reviews, opening hours and one-tap call.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/prestige-auto-home.webp` },
      { label: 'Live site', src: 'https://prestige-auto-ecoservices.com' },
    ],
    url: 'https://prestige-auto-ecoservices.com',
    tags: ['HTML / CSS / JS', 'Local business'],
  },
  {
    title: 'Central Garage',
    thumb: `${base}/work/central-garage.webp`,
    thumbAlt: 'Central Garage home page: the garage front in Le Port, headline in French: general mechanics in Le Port',
    subtitle: 'central-garage.re',
    category: 'website',
    categoryLabel: 'Website',
    role: 'Client work · KSUR',
    description: 'Website for a multi-brand garage in Le Port, La Réunion: services, opening hours, directions and appointment booking.',
    previews: [
      { label: 'Homepage', src: `${base}/portfolio/central-garage-home.webp` },
      { label: 'Live site', src: 'https://central-garage.re' },
    ],
    url: 'https://central-garage.re',
    tags: ['HTML / CSS / JS', 'Appointments'],
  },
  {
    title: 'Mon Jouet Montessori',
    thumb: `${base}/work/montessori.webp`,
    thumbAlt: 'Mon Jouet Montessori home page: a wooden activity cube and the headline Toys that awaken your children',
    subtitle: 'mon-jouet-montessori.com',
    category: 'e-commerce',
    categoryLabel: 'E-commerce',
    role: 'Founder · sold',
    description: 'Online store of Montessori toys and games that I built on Shopify with custom Liquid themes, grew through SEO and marketing, and sold.',
    previews: [{ label: 'Landing page', src: `${base}/portfolio/montessori.png` }],
    url: 'https://mon-jouet-montessori.com',
    tags: ['Shopify', 'Liquid', 'SEO'],
  },
  {
    title: 'Deuspi',
    thumb: `${base}/work/deuspi.webp`,
    thumbAlt: 'Mock-up of the delivery app: its landing page and the catalogue screen on a phone',
    subtitle: 'Confidential project',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    role: 'Mobile Software Engineer',
    description: 'Grocery delivery mobile app with real-time geolocation, on the Uber model. I was the only mobile engineer on the first version, built in React Native from the designer\'s wireframes.',
    previews: [{ label: 'App screenshot', src: `${base}/portfolio/deuspi.png` }],
    url: null,
    tags: ['React Native', 'JavaScript'],
  },
  {
    title: 'Altao Discharge Summary Tool',
    thumb: `${base}/work/altao.webp`,
    thumbAlt: 'Mock-up of the recoding tool: a hospital stay with its diagnosis codes and the tariff before and after',
    subtitle: 'Confidential project',
    category: 'web-app',
    categoryLabel: 'Web App',
    role: 'Full-Stack Engineer',
    description: 'Web application that corrects discharge summaries (RSS, the French standardized format) for French hospitals, with ML models from ALTAO\'s data-science team. Built solo; 5,000+ documents processed; tests on past documents before rollout estimated €700,000 in savings for hospitals.',
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
    thumbAlt: 'Mock-up of the MQTT tool: a console to publish a message on a topic and trigger quick actions',
    subtitle: 'Confidential project',
    category: 'web-app',
    categoryLabel: 'Web App',
    role: 'Full-Stack Engineer',
    description: 'Web tool for an R&D team to create, store and replay payment test sets over MQTT, with message visualization, payload publishing and logging. Tests before rollout measured the team\'s development speed 70% higher.',
    previews: [
      { label: 'MQTT debugger', src: `${base}/portfolio/worldline-devices.webp` },
      { label: 'Full app', src: `${base}/portfolio/worldline-mockup.webp` },
    ],
    url: null,
    tags: ['Vue.js', 'Spring Boot', 'MQTT'],
  },
];

// What the site shows: archived products flagged hidden stay in the data, out of the pages.
export const projects = allProjects.filter((p) => !p.hidden);
