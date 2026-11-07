# moubarak.dev

Source of [moubarak.dev](https://moubarak.dev/), the personal site of El Mahdi Moubarak, founder and full-stack engineer (software, SaaS and AI): home page, [portfolio](https://moubarak.dev/portfolio), [CV](https://moubarak.dev/cv) in English and French with PDFs, [blog](https://moubarak.dev/blog) and a [profile kit](https://moubarak.dev/kit) of copy-ready bio and project blocks.

## Stack

- [Astro](https://astro.build) 6, static output
- Tailwind CSS 4 through its Vite plugin
- Node.js 22.12 or later

## Layout

```text
src/pages/           home, portfolio, cv, blog, kit, 404
src/content/blog/    blog posts (Markdown)
src/data/profile.js  the single source of profile facts, read by every page and the kit
src/components/      shared components; layouts and styles sit next to them
public/              files served as is: CV PDFs and their LaTeX sources, images, Open Graph cards
scripts/             image tooling: Open Graph cards, blog covers and memes, portfolio illustrations, LinkedIn banner
docs/                design notes and the inputs of the image scripts
```

## Commands

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the site into `dist/`             |
| `npm run preview` | Serve the build locally                 |

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): [withastro/action](https://github.com/withastro/action) builds the site with Node 22, then `actions/deploy-pages` publishes it to GitHub Pages on the custom domain `moubarak.dev`. The workflow can also be started by hand from the Actions tab.
