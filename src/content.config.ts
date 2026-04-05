import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[!_]*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(['complete', 'in-progress', 'coming-soon']),
    featured: z.boolean().default(false),
    sortOrder: z.number(),
    heroImage: z.string(),
    techStack: z.array(z.string()),
    tags: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    demoEmbed: z.string().optional(),
    teamSize: z.number().optional(),
    duration: z.string().optional(),
  }),
});

export const collections = { projects };
