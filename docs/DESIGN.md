# Design du site

Refonte du 2026-10-04. Ce fichier dit ce qui est voulu, pour qu'une retouche reste dans le ton.

## Direction

- **Un champ orange** (`--orange: #fc7b42`) porte le haut de chaque page : même structure partout (`PageHero.astro`),
  texte à gauche, un vrai objet à droite. Encre `#14161a` sur l'orange (contraste 7:1), jamais de blanc.
- Accueil : hero `100svh` collant, la page glisse par-dessus (son « parallax »). À droite, l'animation des trois
  services (`ServicesMotion.astro`) ; pas de photo de lui dans le hero (demande du 2026-10-04).
- Pages intérieures : à droite, un objet réel qui sert à quelque chose. Portfolio : les captures Piktechs, KSUR et
  Altao, chacune ouvre l'aperçu du projet. CV : les deux pages du PDF, chacune le télécharge. Blog : une carte cliquable
  du dernier article, couverture et titre seulement. Article : sa couverture, moitié-moitié avec le titre, ouvre
  l'image en grand. Règle : rien qui soit trop petit pour être lu sans rien faire au clic.
- Tous les heros font 100svh. Sur mobile l'objet passe sous le texte ; le hero d'un article s'arrête alors à la
  couverture au lieu de remplir l'écran (page plus courte, demande du 2026-10-04).
- Corps de page sur papier `#fafaf8`, mode sombre complet (`.dark` sur `<html>`, tokens dans `global.css`).

## Typographie

- Titres : **Bricolage Grotesque** 700-800, interlettrage serré. Texte : **Geist** 17-18 px, interligne 1,65-1,75.
- Métadonnées, dates, étiquettes : **JetBrains Mono** 12-13 px, en casse normale (pas de capitales espacées).
- Échelle dans `global.css` : `.t-display`, `.t-page`, `.t-h2`, `.t-h3`, `.t-h4`, `.t-lede`, `.t-statement`, `.t-meta`.

## Mise en page

- Conteneur `--wrap: 1320px`, marges `--gutter`, sections espacées par `--section` (80 à 150 px).
- Jamais deux sections au même traitement d'affilée : manifeste, liste de services, rangées projet alternées,
  bandeau encre (confiance), liste d'articles, bandeau orange (contact).
- Grille portfolio : si le nombre de cartes visibles est impair, la première passe en large (pas d'orpheline).
- Mobile : burger sous 860 px, filtres du portfolio sur une ligne défilante, sommaires latéraux masqués.

## Animation

- Apparitions au scroll : `data-reveal` (+ `--i` pour décaler). Animations à remplissage `backwards` : une fois
  jouées elles ne laissent aucun style, donc les survols marchent. Déclenchées par l'événement scroll (pas
  `requestAnimationFrame`, suspendu dans les onglets en arrière-plan).
- Manifeste de l'accueil : les mots s'allument au fil du défilement (`.scrub`).
- Transitions entre pages : View Transitions natives (`@view-transition`), fondu court.
- `prefers-reduced-motion` : tout s'affiche directement, l'animation des services ne défile plus seule.

## Images

- Vignettes projet : `python3 scripts/thumbs.py` construit `public/work/<slug>.webp` (1600×1000) à partir des
  sources listées dans le script. Capture entière, coins arrondis, ombre, fond teinté tiré du bord de l'image
  (graphite sous une capture sombre). Jamais rognée.
- Illustrations projet (Polymarket, PDFold, AI Search Visibility Tracker) : ce que fait le projet, sans son
  interface. HTML/SVG dans `scripts/illustrations/`, rendus par `./scripts/illustrate.py` en 1440×900 @2x vers
  `public/portfolio/<nom>-illustration.webp`, puis encadrés par `thumbs.py`. Les courbes Polymarket sont les vrais
  runs papier du projet (`scripts/illustrations/polymarket_runs.py` lit `docs/results/runs.json` du repo
  polymarket-updown-lab). « Acme » et les chiffres du tableau PDFold sont des exemples.
- Captures sources (`public/portfolio/*-home.webp`, `ai-visibility-store.webp`) : prises en Chrome headless à
  1440×900 @2x, bandeaux cookies retirés du DOM avant la capture.
- Logos clients : `public/logos/*.png`, silhouettes en alpha affichées en `mask-image` (une seule couleur, suit le thème).
- Images de partage (Open Graph 1200×630) : `./scripts/og.py` génère `public/og/portfolio.png`, `cv.png`, `blog.png`
  et `public/og/blog/<slug>.png` pour chaque article (titre, temps de lecture, sa couverture) à partir de
  `scripts/og-card.html`. À relancer après un nouvel article. La carte de l'accueil (`public/og/home.png`) vient de
  `scripts/og.html`. Une image modifiée prend une nouvelle URL (nouveau nom de fichier, ou le `?v=` des pages blog incrémenté) : les plateformes la gardent en cache par URL. Chaque page passe la sienne au layout (`ogImage`). LinkedIn garde l'ancienne en cache :
  la rafraîchir dans le Post Inspector (https://www.linkedin.com/post-inspector/).
- Bannière LinkedIn : `./scripts/banner.py` rend `scripts/banner.html` en 3168×792 (2× de la taille recommandée par
  LinkedIn, 1584×396) vers `public/linkedin-banner.png`. Le quart gauche du bas reste vide : la photo de profil le couvre.
- Couvertures d'articles : une illustration de la scène de l'article, sans aucun texte (les anciens schémas SVG
  très écrits « piquaient les yeux », 2026-10-04). Aplats, contours encre, orange du site, fond papier, 16:9
  (1536×864). `./scripts/covers.py <slug>` les génère sur OpenRouter (`openai/gpt-image-2.5-sunburst`, medium,
  ≈ 0,01 $ l'image, une génération par image) vers `public/blog/<slug>.webp` ; style commun, scène et texte
  alternatif de chaque article dans `docs/blog-covers.json`. Nouvel article : ajouter sa scène, lancer le script,
  puis `./scripts/og.py`.
- Le rendu HTML vers PNG (images de partage, illustrations) passe par `scripts/shoot.py` (Chrome headless).
- Portrait HD (`public/portrait.webp`, 1024 px) : restauration OpenRouter `openai/gpt-image-2.5-sunburst`,
  qualité medium, 0,019 $, à partir de `profile-picture.webp`. Prompt : « Restore and upscale this exact
  photograph to high resolution. It must remain the same photo of the same real person […] Only recover natural
  photographic detail, skin texture and sharpness. » Fond aplati à `#fc7b42`. Utilisé seulement dans `/kit`.
