// Content of /harness: the setup behind the work, in one place so the numbers are easy to recount.
// Public page: no client names, no hostnames, no amounts, no private repository content beyond what it does.

const ic = (d) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export const icons = {
  rules: ic('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'),
  memory: ic('<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5M8.5 11h5M11 8.5v5"/>'),
  brains: ic('<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'),
  desk: ic('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 9h18M8 21h8M12 17v4"/>'),
  clock: ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>'),
  hands: ic('<path d="M5 4l5 15 2.5-6.5L19 10z"/><path d="m13 13 5 5"/>'),
  ledger: ic('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6"/>'),
  watch: ic('<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>'),
  vault: ic('<rect x="3.5" y="4" width="17" height="15" rx="2"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8v1M12 14v1M7 19v2M17 19v2"/>'),
  type: ic('<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h1M9.5 10h1M13 10h1M16.5 10h1M7 14h10"/>'),
  route: ic('<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>'),
  shield: ic('<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>'),
  eye: ic('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
  site: ic('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5"/>'),
  ticket: ic('<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 5v12"/>'),
  globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"/>'),
  key: ic('<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14.5 8.5l2 2"/>'),
  video: ic('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>'),
  slides: ic('<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 17h6"/><path d="M3 6v12M21 6v12"/>'),
  chart: ic('<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>'),
  form: ic('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>'),
  devil: ic('<circle cx="12" cy="13" r="7"/><path d="M6.5 6.5 5 3l4 2M17.5 6.5 19 3l-4 2M9 12h.01M15 12h.01M9.5 16c1.5 1 3.5 1 5 0"/>'),
  star: ic('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
  money: ic('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>'),
};

export const harness = {
  counted: '25 November 2026',

  stats: [
    { n: '57% → 84%', label: 'of the skills a prompt needs, loaded once a router hook picks them (held-out prompts)' },
    { n: '180B', label: 'parameter mixture-of-experts model (about 6B active per token) on an RTX 3080 20 GB in my office' },
    { n: '303', label: 'open tickets triaged by the local model with no API bill; a Claude session checked the 11 closures it proposed and kept 3 open' },
    { n: '3 bugs', label: 'that fixes had introduced or missed, found while a browser agent took the “after” screenshots of closed tickets' },
  ],

  journey: [
    { icon: icons.type, title: 'I answer in a few words', text: 'In French, often just “go” (run the plan you showed me) or “pousse” (commit and push). The plan, the ticket and my earlier messages are already in the session.' },
    { icon: icons.route, title: 'A router picks the skills', text: 'A hook names the skills that fit the prompt, from rules written in my own words.' },
    { icon: icons.rules, title: 'The rules load', text: 'One instruction file, capped by a hook, versioned and synced to every machine.' },
    { icon: icons.brains, title: 'The right model answers', text: 'A router picks Haiku, Sonnet or Opus for each prompt. The local 180B model takes bulk jobs (triage, summaries, first drafts) and work that must stay on the machine.' },
    { icon: icons.shield, title: 'Hooks guard the exits', text: 'A secret in a push, or a new file at the root of my home folder: refused. A “shall I run it?” about something I already asked for: sent back to work once, unless it involves money, a password, publishing, a Piktechs release or a deletion.' },
    { icon: icons.eye, title: 'Done means observed', text: 'Screenshots at the widths I use, a browser agent acting as a real user, and a SQL query on the database that decides pass or fail.' },
    { icon: icons.memory, title: 'It becomes memory', text: 'The session is indexed. Next time I say “do you remember”, the answer quotes the old session.' },
  ],

  districts: [
    {
      id: 'rules', name: 'Rules', title: 'Instruction files', tag: 'capped by a hook', icon: icons.rules, layout: 'flip',
      what: 'Every correction I make more than once ends up written down, in the narrowest place that works: a global file, a project file, a skill or a hook.',
      points: [
        'One global file, <b>capped at 120 lines by a hook</b> that counts after every edit.',
        'Each rule says the behavior, its limit and why, so the model can apply it to cases I never listed.',
        'The workspace is a <b>git repository</b>: correct a rule on the laptop, the mini PC knows it at its next session.',
        'A <b>weekly pass reads my sessions</b> for corrections I repeat and commits new rules to that repository. Its summary opens my next session, and each change is one revert away.',
        'opencode, a second coding agent, reads <b>the same files</b> and runs the same hooks through a plugin.',
      ],
      incident: 'The weekly learning pass exited with code 0 for three weeks while doing nothing: its login had expired. It now runs as a routine like the others, so a failure reaches my phone.',
      visual: {
        kind: 'rules',
        lines: [
          '“Done” = seen working where he uses it.',
          'Search before claiming: prices, law, specs.',
          'Reversible and in scope: do it, then report.',
          'Ask before money, passwords, 2FA, publishing, a Piktechs release or deleting data that can\'t be recovered.',
          'Every leftover becomes a ticket, so nothing depends on memory.',
          'Answer first, in plain French.',
        ],
      },
    },
    {
      id: 'memory', name: 'Memory', title: 'Searchable past sessions', tag: 'every past session', icon: icons.memory, layout: 'wide',
      what: 'Every Claude Code session of my two main machines is collected and indexed by meaning, with project notes, rules and docs.',
      points: [
        '“Do you remember”, “where were we”, “like last time”: <b>the model searches before it answers</b>.',
        'Before writing a new memory note, it checks that the note does not exist already.',
        'About <b>one message in twenty</b> I type corrects the model; those corrections feed the weekly pass.',
        'Packaged as an open-source plugin: <b>hindsight</b>.',
      ],
      visual: { kind: 'image', src: '/portfolio/hindsight-demo.webp', w: 1800, h: 840, alt: 'Terminal: "do you remember how we deploy the api to staging?" A hook finds the session of September 1st and Claude answers with the exact command.' },
    },
    {
      id: 'brains', name: 'Brains', title: 'Models', tag: 'local and Claude', icon: icons.brains, layout: 'flip',
      what: 'Claude models answer from the cloud on my subscription. The local model runs on a GPU plugged into the mini PC over OCuLink.',
      points: [
        'Every local tool asks for the same model name, and <b>a small arbiter service</b> picks which model answers: the 180B by default, a 27B when memory runs short.',
        'A video render <b>reserves RAM before it starts</b>: the arbiter switches to the 27B, and the RAM comes back when the render ends.',
        'Confidential tasks run on a separate browser-agent instance that <b>plans with the local model only</b>; the browser agent’s step decisions still go to its remote model.',
      ],
      visual: { kind: 'image', src: '/harness/services.webp', w: 2200, h: 1760, alt: 'Services page of the mini PC: RTX 3080 eGPU and RAM gauges, the RTX arbiter with its default target, and the local models that can be loaded on the GPU or the integrated graphics.' },
    },
    {
      id: 'desk', name: 'Front desk', title: 'The dashboard', tag: 'one dashboard', icon: icons.desk, layout: 'wide',
      what: 'Where my day starts: every open issue in my GitHub account and the organizations I work in, red CI, today\'s calendar, web terminals into running sessions, unpushed commits, and how much of my Claude plan is left this week.',
      points: [
        'List view for the day, <b>kanban across every repository</b> for the week.',
        'Tickets carry a priority, P0 to P3, with the same labels everywhere.',
        '<b>Only I move a ticket to “ready”</b>. Agents may create tickets, never promote them.',
        'The local model <b>proposes closures and never closes</b> a ticket itself. A second agent argues for keeping each one open: it blocked an untouched bug the local model had rated “done, confidence 95”.',
      ],
      visual: { kind: 'image', src: '/harness/dashboard.webp', w: 2880, h: 1800, alt: 'Dashboard in dark mode: repositories grouped by account, a "My day" panel with one issue in progress and seven pull requests with failing CI, and today\'s calendar. Project names and event titles are placeholders.' },
    },
    {
      id: 'clock', name: 'Clock', title: 'Scheduled jobs', tag: 'scheduled work', icon: icons.clock, layout: 'flip',
      what: 'Everything scheduled runs on the mini PC, in this order of preference: a plain script, then the local model, then the Claude subscription when quality matters.',
      points: [
        'Routines run <b>on the Claude subscription or the local GPU</b> and hold no model key of their own. A job that needs an OpenRouter model uses its project\'s key, which has a spending cap.',
        'Anything written for the outside world <b>lands in “to review” first</b>. A script sends only what I approved.',
        'Reports reach Telegram: the night\'s fixes in the morning, a failed routine the moment it fails.',
      ],
      visual: { kind: 'clock', src: '/harness/routines-schedule.webp', w: 2880, h: 1800, alt: 'Routines, Schedule page: each task with its timing, next run, last result and what runs it (a script, the local model or Claude). Project names are placeholders.' },
    },
    {
      id: 'hands', name: 'Hands', title: 'Browser agents', tag: 'browser agents', icon: icons.hands, layout: 'wide',
      what: 'Browser agents handle web work that has no API: admin consoles and dashboards behind a login.',
      points: [
        '<b>One profile per account</b>, logged in once. Every later task on that account goes through the agents.',
        'One isolated worker per task. Every task records <b>who created it</b>: a routine, a session or me.',
        'Password, captcha or 2FA: <b>Telegram pings my phone</b> and I take over the remote browser by touch.',
        'Money stays out of reach: bank, taxes and payments only happen in my own browser.',
        'Each task runs with the model that fits it: Sonnet, Haiku, DeepSeek or a local Qwen.',
      ],
      incident: 'In a batch of searches, 12% to 90% of the pages came back blank and were counted as read. A page now counts only once its text is on screen, and is reloaded if it stays empty. The rerun had zero blank pages.',
      visual: { kind: 'image', src: '/harness/browser-profiles.webp', w: 2880, h: 1720, alt: 'browser-agents back office, Profiles page: one card per account with its state (asleep or stopped), task count, last activity and purpose. Names and purposes are placeholders.' },
    },
    {
      id: 'ledger', name: 'Ledger', title: 'Inventory', tag: 'inventory', icon: icons.ledger, layout: 'flip',
      what: 'One page that lists every project, host, mailbox, domain and renewal date, built once I could no longer keep track of them across projects. Its first rule: a project is a thing in the world that owns repositories, a domain, a mailbox and bills.',
      points: [
        'A hook at the end of every session <b>records any repository the session created</b>.',
        'Every six hours it <b>checks about 180 links</b> and reads expiry dates from the registries.',
        'Renewals flow into my calendar as reminders: <b>19 created on the first run</b>.',
      ],
      incident: 'While filling it in, the agent found a contact address shown on one of my sites that had never existed as a mailbox. Every email sent to it had been lost since the site went live.',
      visual: { kind: 'project', parts: ['Repos', 'A domain', 'A mailbox', 'A host', 'Accounts', 'Renewals and bills'] },
    },
    {
      id: 'watch', name: 'Watchtower', tag: 'probes & alerts', icon: icons.watch, anchor: 'vault', hidden: true,
    },
    {
      id: 'vault', name: 'Vault', kicker: 'Watchtower and Vault', title: 'Monitoring and backups', tag: 'nightly backup', icon: icons.vault, layout: 'wide',
      what: 'Monitoring watches every public endpoint and alerts my phone. Every night at four the mini PC backs itself up offsite, and on Sundays a sample is restored to prove the backup works.',
      points: [
        'An audit by <b>five parallel agents</b> traced, layer by layer, which part feeds which and when.',
        'It found that hooks recorded <b>what I created</b> (a repository, a skill), and that nothing recorded a rename, a new service or a deadline.',
        'Now <b>one source per subject</b>, and a morning check that compares the machine with it and alerts on any difference.',
        'Every new service gets a failure alert by default, with no list to maintain.',
      ],
      visual: {
        kind: 'backup',
        steps: [
          { date: '14 Oct', text: 'The home server backup crashes on the database of an app I had uninstalled.', state: 'bad' },
          { date: '15 Oct to 21 Nov', text: 'It crashes every night. Monitoring stays green, because it only watches services that answer.', state: 'silent' },
          { date: '22 Nov', text: 'The audit finds it. Five weeks without a backup, and nothing had told me.', state: 'bad' },
          { date: 'Since', text: 'An alert at 09:00 and 21:00 if any backup is older than 26 hours.', state: 'good' },
        ],
      },
    },
  ],

  agents: {
    intro: 'Claude Code is the main agent. opencode reads the same instruction files and runs the same hooks through a plugin. The other agents follow the rules on their card.',
    hub: { title: 'Shared by Claude Code and opencode', items: ['Global and project instructions', 'The same hooks', 'Skills', 'Permission rules'] },
    list: [
      { name: 'Claude Code', icon: icons.type, role: 'Main engineering agent, three or four sessions in parallel.', brains: 'Haiku, Sonnet or Opus, picked per prompt by a router', rules: 'Rules, hooks, skills, memory' },
      { name: 'opencode', icon: icons.route, role: 'Second coding agent, on the local model.', brains: 'Local 180B or 27B', rules: 'Same instruction files; same hooks through a plugin' },
      { name: 'pi', icon: icons.shield, role: 'Small fixes delegated when code must stay on the machine, in a copy of the repository.', brains: 'Local model', rules: 'A short set of rules that protect the machine; Claude reviews the diff before anything is applied' },
      { name: 'browser-agents', icon: icons.hands, role: 'Web work with no API, one dedicated browser per account.', brains: 'Sonnet, Haiku, DeepSeek or local Qwen', rules: 'Human hand-off for passwords; every task closed with its result' },
      { name: 'Hermes gateway', icon: icons.brains, role: 'An agent gateway that lets routines and bots run on the local model instead of my Claude plan.', brains: 'The local model', rules: 'Runs as a service with a restart limit and a failure alert' },
      { name: 'Routines', icon: icons.clock, role: 'Scheduled jobs on the mini PC, each with its run history.', brains: 'Script, local model or Claude', rules: 'Outside-facing text waits in “To review”' },
    ],
  },

  skills: {
    intro: 'A skill is a written procedure the model loads when a task matches: the expected result, the tools to use, the traps I already fell into. Below, the eight my sessions loaded most.',
    maxUses: 207,
    items: [
      { name: 'web-access', icon: icons.globe, uses: 207, text: 'Which road to take to read or act on the web: an open data API first, a dedicated agent browser next, my own logged-in browser last.' },
      { name: 'site-vitrine', icon: icons.site, uses: 125, text: 'Websites from brief to live URL: layout rules, images, forms, SEO, and screenshots at the widths people use before anyone says done.' },
      { name: 'create-issue', icon: icons.ticket, uses: 83, text: 'A GitHub ticket with a working reproduction, a screenshot for a bug, a priority and no duplicate.' },
      { name: 'model-router', icon: icons.route, uses: 57, text: 'Classifies each prompt and sends it to the cheapest model and effort that can handle it. The model only ever goes up during a conversation.' },
      { name: 'interface-outil', icon: icons.desk, uses: 52, text: 'Interfaces of my own tools: filters, sorting, statuses, empty states, one language per app, checked by searching the rendered text.' },
      { name: 'video', icon: icons.video, uses: 28, text: 'A video studio: script, voice, music, footage, editing and render, with live price checks and a hard spending cap. Pilots before any batch.' },
      { name: 'agenda', icon: icons.clock, uses: 18, text: 'Reads and writes my self-hosted calendar, the one the dashboard shows and the inventory feeds with renewals.' },
      { name: 'cles-api', icon: icons.key, uses: 10, text: 'One capped API key per project, and a table of who spends what. Scheduled jobs use the subscription or the local model first.' },
    ],
    note: 'Sessions that loaded each skill, on two machines, from late August to 22 November 2026. Also mine, used less: a devil\'s-advocate review, an SEO and AI-citation audit, and tools for social-media content. Borrowed skills (Anthropic, Emil Kowalski, Hardik Pandya\'s stop-slop and others) are credited in their folders and left off this list.',
  },

  sourcing: {
    intro: 'New models, tools and practices often show up on X and Reddit before their documentation does. I read there first, and I treat every tip as a hypothesis. It reaches a skill only after it passes the same checks as code.',
    steps: [
      { icon: icons.globe, title: 'Spot it early', text: 'X and Reddit, read through a data API or a dedicated research browser, never my personal accounts.', check: 'Several independent reports, a source for each' },
      { icon: icons.eye, title: 'Cross-check', text: 'Every claim goes back to the official source: docs, pricing page, model card, repository.', check: 'Each fact marked verified or estimated' },
      { icon: icons.chart, title: 'Test on my data', text: 'A new model sits the same exam as my current one. A new method runs as a pilot before any batch.', check: 'Measured result, or it stays out' },
      { icon: icons.rules, title: 'Write the skill', text: 'Through Anthropic\'s skill-creator, with test prompts, versioned in git like everything else.', check: 'Reviewed, and one revert away' },
      { icon: icons.clock, title: 'Keep it fresh', text: 'Each skill has a card: what can go stale, where to check, how often. Copied skills are watched upstream.', check: 'Checked again 21 days after the last check, if I used it since' },
    ],
    examples: [
      { from: 'A Reddit thread', title: '“The harder I use Claude Code, the larger the backlog gets”', text: 'One reply became the “ready” rule of my dashboard. A local model then triaged the whole backlog, and a Claude session checked the closures it proposed.' },
      { from: 'A model launch on X', title: 'A new small model, up to twice as fast as my fallback', text: 'It first scored 21 out of 40 on my web-agent exam; a replay showed my parser rejected valid answers, and with the fix it scored 35, against 36 for my main model.' },
      { from: 'My own sessions', title: 'The router behind the skills', text: 'Every Monday a routine compares the skills it suggested with the ones Claude loaded, and scores it on a fixed test set to catch a regression.' },
    ],
  },

  hooks: [
    { when: 'Before every push', before: 'My public repositories sit next to private client work. One wrong file and a key or a client name is public.', after: 'Scans the push for secrets, the real values of my keys and private names, and refuses it. Exceptions are one line each, with their reason.' },
    { when: 'After every reply', before: 'Replies kept ending with “shall I run it?” for things I had already asked for.', after: 'Sends the model back to work, once, unless the question is about money, a password, publishing, a Piktechs release or a deletion. The model can also keep its question by naming the reason.' },
    { when: 'Before writing a file', before: 'Sessions kept dropping reports, scripts and screenshots at the root of my home folder.', after: 'Refuses any new file there and says where it belongs: the project, or a scratch folder emptied after 30 days.' },
    { when: 'After editing the rules', before: 'The instruction file kept growing, and long files get skimmed by models too.', after: 'Counts the lines and refuses the edit that goes past the cap. A new rule has to replace an old one or move to a project.' },
    { when: 'When I submit a prompt', before: 'Claude often skipped skills a request needed, and I don\'t remember all their names either.', after: 'Names the matching skills from rules written in my own words.' },
    { when: 'Before creating a timer', before: 'Sessions scheduled jobs with hand-written cron lines that no page showed and no alert covered.', after: 'Refuses the cron line and asks for a job in Routines, my scheduler app, which keeps its history and sends a failure alert.' },
  ],

  clock: [
    { h: 1, time: '01:00-07:00', what: 'Night loop: the local model fixes tickets I marked ready, at most twelve pull requests, none merged without my review' },
    { h: 4, time: '04:00', what: 'Offsite backup, prune, integrity check; a restore test on Sundays' },
    { h: 8.5, time: '08:30', what: 'Scan for dead paths left behind by renames' },
    { h: 8.67, time: '08:40', what: 'Compare what runs with the registries, alert on any difference' },
    { hs: [9, 21], time: '09:00, 21:00', what: 'Alert if any backup is older than 26 hours' },
    { h: 11, time: 'Mon 11:00', what: 'Weekly report on my content channels, after the three stats collections it summarizes' },
    { h: 14, time: 'Mon 14:00', what: 'Freshness check on my accounting data, with a reminder if it is stale' },
    { h: 21, time: 'Sun 21:00', what: 'Weekly learning pass over my corrections' },
    { ring: true, time: 'Every 15 min', what: 'Send the replies I approved, nothing else (the dotted ring)' },
  ],

  bench: {
    intro: 'I wanted the local model to save my Claude plan by writing fixes that Claude would only review. So I took three real bug fixes from my dashboard, ran them five ways (2 to 5 runs per way), and had Sonnet score every result blind against the reference fix.',
    verdict: 'Sonnet alone used an estimated 0.0075% of my weekly limit per fix, half the cheapest delegation, and finished in a minute, but it scored 5.5 against 7.2 for Opus alone. Delegating code to the local model is now for weeks when my plan is nearly used up, or for code that must stay on the machine.',
    note: 'The local agent passed the tests 13 times out of 13 and still missed a function that was never wired in. Only Opus, reading the code, caught it.',
    rows: [
      { who: 'Opus alone', q: 7.2, wait: '2 min 50', best: true },
      { who: 'Opus reads, the local 27B writes', q: 6.6, wait: '4 min' },
      { who: 'Opus delegates blind to the 180B', q: 6.5, wait: '7 min' },
      { who: 'Sonnet alone', q: 5.5, wait: '1 min' },
      { who: 'Opus delegates blind to the 27B', q: 4.7, wait: '8 min 30' },
    ],
  },

  openSource: [
    { name: 'claude-skill-router', url: 'https://github.com/emoubarak/claude-skill-router', text: 'Helps Claude Code load the skills a prompt needs, with a bench that replays your own sessions to measure it.', stack: 'Python · Claude Code hooks' },
    { name: 'hindsight', url: 'https://github.com/emoubarak/hindsight', text: 'Memory for Claude Code: search every past session by meaning, turn your corrections into rules.', stack: 'Python · BM25 + embeddings · plugin' },
    { name: 'account-state-check', url: 'https://github.com/emoubarak/account-state-check', text: 'A browser agent tests your staging app as each kind of user, then reads the database to check the state of each account.', stack: 'Python · CDP · agent skill' },
    { name: 'voice-browser', url: 'https://github.com/emoubarak/voice-browser', text: 'Talk to your browser: Claude plans the command, a browser agent clicks, with no debugger port open.', proof: '12 to 19 s for a Wikipedia lookup, from command to answer', stack: 'Chrome extension · Python' },
    { name: 'strata-flash-next-rtx3080-20gb', url: 'https://github.com/emoubarak/strata-flash-next-rtx3080-20gb', text: 'Settings and benchmark scripts for a 180B model on a mini PC with an RTX 3080 20 GB over OCuLink.', proof: '≈2,000 tok/s read, 110-204 tok/s write', stack: 'Strata · llama-swap · benchmarks' },
    { name: 'sunshine-gnome-virtual-display', url: 'https://github.com/emoubarak/sunshine-gnome-virtual-display', text: 'Streams a GNOME desktop to Moonlight on a virtual monitor at the client\'s exact resolution, then puts the desktop back.', proof: 'Network latency 42 ms → 5-9 ms', stack: 'Bash · Python · Mutter' },
    { name: 'signal-bot', url: 'https://github.com/emoubarak/signal-bot', text: 'An LLM bot for Signal groups: summaries, voice-note transcripts, images, reminders. OpenRouter or a local model.', stack: 'Python · SQLite · Docker' },
    { name: 'polymarket-updown-lab', url: 'https://github.com/emoubarak/polymarket-updown-lab', text: 'Trading research with out-of-sample backtests. Result: no tradable edge after fees.', proof: '≈12,000 paper trades, 75 runners', stack: 'Python · Go' },
  ],

  workshop: [
    { name: 'Phone remote', icon: icons.desk, text: 'Drives my Android phones from a browser tab: H.264 decoded in the page, touch, keyboard, clipboard.', tag: 'private' },
    { name: 'A 16 KB watchdog app', icon: icons.shield, text: 'Android keeps turning off wireless debugging. A tiny app turns it back on, built and signed without Gradle.', tag: 'private' },
    { name: 'Live dictation', icon: icons.type, text: 'Speech to text at the cursor, French or English, about one second behind, on the CPU. Nothing leaves the house.', tag: 'private' },
    { name: 'Phone-sized screenshots', icon: icons.eye, text: 'Emulates my phone screen with real touch events and flags tap targets under 40 px before I see them.', tag: 'private' },
    { name: 'Hooks in other agents', icon: icons.route, text: 'A plugin that runs the same Claude Code hooks inside opencode, so a second agent obeys the same rules.', tag: 'private' },
    { name: 'prompter', icon: icons.slides, url: 'https://github.com/emoubarak/prompter', text: 'A Markdown script becomes a full-screen teleprompter on the second monitor. 81 lines of Python.', tag: 'open source' },
  ],

  lessons: [
    { title: 'Name things for what they do.', text: 'Renaming later touches paths, docs, links and backups, so I plan a rename like a migration, and a scan every morning catches the dead paths it leaves.' },
    { title: 'Ask who feeds each registry, and when.', text: 'Once a quarter, one layer at a time. Asking it found my dead backup.' },
  ],
};
