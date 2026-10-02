import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // optional header: a cover that explains, and three lines "in short"
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tldr: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
