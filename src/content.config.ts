import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Blog / Tudásbázis ---
// Új cikk hozzáadása: elég egy .md/.mdx fájlt bemásolni a content/blog mappába
// (fájlnév = slug). A rendszer automatikusan felismeri, oldalt generál hozzá,
// megjeleníti a blog listában, bekerül a sitemap-be és az RSS-be — nincs
// szükség kézi route létrehozására.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('BIMLine Gépész Kft.'),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
