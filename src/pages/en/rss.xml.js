import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';

export async function GET(context) {
  const posts = (await getCollection('blogEn', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const siteUrl = new URL(`${import.meta.env.BASE_URL}en/`, context.site);

  return rss({
    title: `${SITE.name} — Knowledge Base`,
    description: 'Professional articles on MEP engineering, BIM design and energy audits.',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `${import.meta.env.BASE_URL}en/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
