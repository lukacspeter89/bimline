import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Blog / Tudásbázis ---
// Új cikk hozzáadása: elég egy .md/.mdx fájlt bemásolni a content/blog mappába
// (fájlnév = slug). A rendszer automatikusan felismeri, oldalt generál hozzá,
// megjeleníti a blog listában, bekerül a sitemap-be és az RSS-be — nincs
// szükség kézi route létrehozására.
const blogSchema = ({ image }: { image: () => z.ZodType<{ src: string }> }) => z.object({
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
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: blogSchema,
});

// --- English blog / knowledge base ---
// Same idea as `blog`, but the English translations of each article live here,
// in content/blog-en/, using the SAME filename (= id) as the Hungarian original,
// so the language switcher can link straight to the translated counterpart.
const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog-en' }),
  schema: blogSchema,
});

export const collections = { blog, blogEn };
