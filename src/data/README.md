# `profile.js` — la source mère

Toute surface publique est une **projection** de ce fichier : ce site (`/`, `/cv`, `/portfolio`),
les blocs copiables de `/kit`, puis LinkedIn, Malt, Upwork et Fiverr.

**Règle : on modifie un fait ici, puis on propage. Jamais l'inverse.**

## Qui consomme quoi

| Page | Importe |
|---|---|
| `pages/index.astro` | `services` (toutes sauf Shopify), `projects` (4 en vedette) |
| `pages/cv.astro` | `experiences`, `education`, `techGroups`, `interests`, `projects` |
| `pages/portfolio.astro` | `projects`, `projectCategories` |
| `pages/kit.astro` | `identity`, `education`, `certifications` — et garde sa prose EN/FR propre |

`kit.astro` conserve les textes rédigés à la main (EN + FR) destinés au copier-coller sur chaque
plateforme : ils ne sont pas dérivables des données. En revanche ils **doivent s'accorder** avec les
faits structurés ci-dessus. Quand les deux divergent, c'est `profile.js` qui a raison.

## Décisions de positionnement encodées ici

- **Angle IA d'abord.** EMM est « Founder & AI / Full-Stack Engineer » et ALTAO « Full-Stack & AI
  Engineer » : les deux missions les plus IA du parcours doivent le dire dans leur intitulé, pas
  seulement dans leur description.
- **Lille** est la ville officielle. LinkedIn la dérive d'un code postal, Upwork d'une adresse postale.
- **« Adam »** est délibérément le prénom public sur Fiverr et Upwork — voir `identity.publicNames`.
- Les termes CMS legacy (Grav CMS, AngularJS) sont retirés des stacks : ils tiraient le matching vers
  du travail CMS.
- **Shopify** est hors de la page d'accueil et hors des titres : segmenté, c'est le pool le moins
  rémunérateur ($22-32/h de médiane contre $120 pour le SaaS full-stack).
