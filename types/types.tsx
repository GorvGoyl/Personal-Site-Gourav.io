import { z } from 'zod';

export const FrontmatterBlogpostSchema = z.object({
    date: z.string().nullable(),
    title: z.string().trim().min(3),
    desc: z.string().trim(),
    slug: z.string().min(2), //don't trim/modify slug as it is used to fetch page id again
    postId: z.string().min(3),
    preview: z.boolean(),
    published: z.boolean(),
    desktopOutline: z.boolean(),
    mobileOutline: z.boolean(),
    ogImage: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    hackernews: z.string().optional(),
    reddit: z.string().optional(),
    github: z.string().optional(),
});

export type FrontmatterBlogpost = z.infer<typeof FrontmatterBlogpostSchema>;

export const FrontmatterProjectSchema = z.object({
    title: z.string().trim().min(3),
    desc: z.string().trim(),
    slug: z.string().min(2),
    ogImgURL: z.string().min(3),
    preview: z.boolean(),
    desktopOutline: z.boolean(),
    mobileOutline: z.boolean(),
});

export type FrontmatterProject = z.infer<typeof FrontmatterProjectSchema>;
