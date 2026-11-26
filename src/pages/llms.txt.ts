// llms.txt (https://llmstxt.org): who I am, the pages and every article, rebuilt at each build.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { identity, projects } from '../data/profile.js';

const site = 'https://moubarak.dev';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const lines = [
    '# El Mahdi Moubarak',
    '',
    `> ${identity.title.en}. ${identity.headline.en}`,
    '',
    '## Pages',
    '',
    `- [Home](${site}/): services, selected work, testimonials`,
    `- [CV](${site}/cv): experience, skills, how I work with AI; PDF in English (${site}/cv-en.pdf) and French (${site}/cv-fr.pdf)`,
    `- [Portfolio](${site}/portfolio): ${projects.length} projects with screenshots`,
    `- [Harness](${site}/harness): the agent setup I work with and how each part is checked`,
    `- [Blog](${site}/blog): case studies and articles`,
    '',
    '## Articles',
    '',
    ...posts.map((p) => `- [${p.data.title}](${site}/blog/${p.id}): ${p.data.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
