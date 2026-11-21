// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://moubarak.dev',
  // The site was served under /my-cv from March to July 2026; that address still circulates (LinkedIn export)
  redirects: {
    '/my-cv': '/',
    '/my-cv/cv': '/cv',
    '/my-cv/kit': '/kit',
    '/my-cv/portfolio': '/portfolio',
    '/my-cv/blog': '/blog',
    '/my-cv/blog/[slug]': '/blog/[slug]',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});