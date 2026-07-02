import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const siteUrl = new URL(import.meta.env.BASE_URL, context.site);

  return rss({
    title: `${SITE.name} — Tudásbázis`,
    description: 'Szakmai cikkek épületgépészetről, BIM-tervezésről és energetikai felülvizsgálatról.',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `${import.meta.env.BASE_URL}blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>hu-hu</language>`,
  });
}
