
import { Client, isFullDatabase } from "@notionhq/client";

import type { ImageBlockObjectResponse, PageObjectResponse, RichTextItemResponse, VideoBlockObjectResponse } from "@notionhq/client";
import { bundleMDX } from "mdx-bundler";
import path, { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { z } from "zod";
import { type FrontmatterBlogpost, FrontmatterBlogpostSchema } from "../types/types";
import { frontmatterCache } from "./cache";
import { NOTION_API_KEY, NOTION_BLOGPOSTS_DB } from "./envVar";
import { downloadFile } from "./fileUtils";
import { headingLink } from "./localContentUtils";
import { notionPageToMarkdown } from "./notionToMarkdown";
import { rehypeOutline } from "./rehypeOutline";
import { hashCode, retryWithExponentialBackoff } from "./utils";
const notionClient = new Client({ auth: NOTION_API_KEY });

const maxRetries = 3;
const initialDelayInMs = 1000;

let blogpostsDataSourceId = "";

/** Posts are queried through the database's data source, whose id differs from the database id.
 * https://developers.notion.com/docs/upgrade-guide-2025-09-03
 */
async function getBlogpostsDataSourceId(): Promise<string> {
  if (!blogpostsDataSourceId) {
    const database = await notionClient.databases.retrieve({ database_id: NOTION_BLOGPOSTS_DB });
    if (!isFullDatabase(database) || database.data_sources.length !== 1) {
      throw new Error("unhandled case: blog posts database doesn't have exactly one data source");
    }
    blogpostsDataSourceId = database.data_sources[0].id;
  }
  return blogpostsDataSourceId;
}

export async function getAllPublishedAndPreviewPostsFrontmatterFromNotion(): Promise<
  FrontmatterBlogpost[]
> {
  return await retryWithExponentialBackoff(
    async () => {
      const response = await notionClient.dataSources.query({
        data_source_id: await getBlogpostsDataSourceId(),
        filter: {
          or: [
            {
              property: "Preview",
              checkbox: {
                equals: true,
              },
            },
            {
              and: [
                {
                  property: "Published",
                  checkbox: {
                    equals: true,
                  },
                },
                {
                  property: "Published date",
                  date: {
                    on_or_before: new Date().toISOString(),
                  },
                },
              ],
            },
          ],
        },
        sorts: [
          {
            property: "Published date",
            direction: "descending",
          },
        ],
      });

      if (response.has_more) {
        throw new Error("unhandled case when more than 100 articles are present");
      }

      const allPostsFrontmatter: FrontmatterBlogpost[] = [];
      response.results.forEach((p) => {
        const page = p as PageObjectResponse;

        const frontMatter = parseFrontmatterFromPost(page);
        allPostsFrontmatter.push(frontMatter);
      });

      if (allPostsFrontmatter.length === 0) {
        throw new Error("whelp! no posts found. This shouldn't suppose to happen");
      }

      return allPostsFrontmatter;
    },
    maxRetries, 
    initialDelayInMs 
  );
}

export async function getPostIdFromSlugFromNotion(
  postSlug: string
): Promise<FrontmatterBlogpost> {
  return await retryWithExponentialBackoff(
    async () => {
      const response = await notionClient.dataSources.query({
        data_source_id: await getBlogpostsDataSourceId(),
        filter: {
          and: [
            {
              property: "Slug",
              rich_text: {
                equals: postSlug,
              },
            },
          ],
        },
      });

      if (response.results.length === 0) {
        throw new Error(`article not found for slug: ${postSlug}`);
      }
      if (response.results.length > 1) {
        throw new Error(`multiple articles with same slug found: ${postSlug}`);
      }

      const page = response.results[0] as PageObjectResponse;

      const frontMatter = parseFrontmatterFromPost(page);

      return frontMatter;
    },
    maxRetries, 
    initialDelayInMs 
  );
}

/** Returns content of page Id.
 * - It also handle images by saving them in public/blog/post/file.png \
 * - It also saves og image name in frontmatter cache file for faster feed generation
 * @param  frontmatter - use postId, toc, slug
 * @return {*}  post content and frontmatter
 * https://developers.notion.com/reference/block
 */
export async function getPostContentFromNotion(
  frontmatter: FrontmatterBlogpost
): Promise<{ ogImageURL: string | null; postContent: string }> {
  const slugLowercase = frontmatter.slug.toLowerCase();
  let ogImageURL = null as null | string;
  let ogImageName = null as null | string;

  const setOgImageURLcallback = (url: string, ogImgName: string) => {
    ogImageURL = url;
    ogImageName = ogImgName;
  };
  const mdString = await retryWithExponentialBackoff(
      async () => {
          return await notionPageToMarkdown(notionClient, frontmatter.postId, {
            image: (block) => {return imgTransformer(block, slugLowercase, setOgImageURLcallback)},
            video: (block) => {return videoTransformer(block, slugLowercase)},
            // don't render inline databases as they are internally used to track progress of articles
            child_database: () => {return ""},
          });
      },
      maxRetries,
      initialDelayInMs
  );

  const postContent = await convertMdxStringToCode(
    mdString,
    frontmatter
  );

  // save og image name in cache
  if (ogImageName) {
    frontmatterCache.addOGImage(frontmatter.postId, ogImageName);
  }
  return {
    ogImageURL: ogImageURL,
    postContent: postContent,
  };
}

const parseFrontmatterFromPost = (page: PageObjectResponse) => {
  const frontMatter: FrontmatterBlogpost = {
    title: (page.properties['Title'] as PostMetaDatatitleType)["title"][0]?.["plain_text"],
    desc: (page.properties['Description'] as PostMetaDataDescriptionType)["rich_text"][0]?.["plain_text"],
    slug: (page.properties['Slug'] as PostMetaDataSlugType)["rich_text"][0]?.["plain_text"],
    date: (page.properties['Published date'] as PostMetaDataDateType)["date"]?.["start"] || null,
    postId: page.id,
    preview: (page.properties['Preview'] as PostMetaDataCheckboxType).checkbox,
    published: (page.properties['Published'] as PostMetaDataCheckboxType).checkbox,
    desktopOutline: (page.properties['Desktop outline'] as PostMetaDataCheckboxType).checkbox,
  };

  const fmParsed = FrontmatterBlogpostSchema.parse(frontMatter);

  return fmParsed;
};

const imgTransformer = async (
  imgBlock: ImageBlockObjectResponse,
  slugLowercase: string,
  setOgImageURLcallback: (url: string, ogImgName: string) => void
) => {
  if (imgBlock.has_children) {
    throw new Error("unhandled case: imgBlock has children");
  }
  const src = "aws-s3";
  if (imgBlock.image.type === "external") {
    throw new Error(`External Image found! URL: ${imgBlock.image.external.url} on article: ${slugLowercase}`)
  }

  const mediaUrl = imgBlock.image.file.url;

  const captionPlain = imgBlock.image.caption
    .map((item) => {return item.plain_text})
    .join("")
    .trim();

  const { mediaDestination, mediaRelativePath, destFileName } =
    getDestMediaInfoFromURL(mediaUrl, slugLowercase);

  // copy images to public/blog/git-cheatsheet/*
  await downloadFile(mediaUrl, mediaDestination, "overwrite");

  // image with below caption is considered og:image and not shown in post
  if (captionPlain === "og:image") {
    setOgImageURLcallback(mediaRelativePath, destFileName);
    return "";
  } 
    const imgComponent = `<Img src="${mediaRelativePath}" type="ss" caption="${captionPlain}" />`;
    return imgComponent;
  
};

const videoTransformer = async (
  videoBlock: VideoBlockObjectResponse,
  slugLowercase: string
) => {
  if (videoBlock.has_children) {
    throw new Error("unhandled case: videoBlock has children");
  }
  const src = "aws-s3";
  if (videoBlock.video.type === "external") {
    throw new Error(`External Video found! URL: ${videoBlock.video.external.url} on article: ${slugLowercase}`);
  }

  const mediaUrl = videoBlock.video.file.url;

  const captionPlain = videoBlock.video.caption
    .map((item) => {return item.plain_text})
    .join("")
    .trim();
  if (captionPlain) {
    throw new Error("captions are not yet handled for videos: " + captionPlain);
  }

  const { mediaDestination, mediaRelativePath } = getDestMediaInfoFromURL(
    mediaUrl,
    slugLowercase
  );

  // copy images to public/blog/git-cheatsheet/*
  await downloadFile(mediaUrl, mediaDestination, "overwrite");

  const videoComponent = `<Video disableZoom={true} src="${mediaRelativePath}" />`;

  return videoComponent;
};

/**
 * @param mediaUrl
 * aws-s3 ex: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1163d970-85c3-462c-ac0d-b2b86495539b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-SignedHeaders=host&x-id=GetObject \
 * external ex: https://gourav.io/blog/sync-fastmail-calendar-with-google-calendar/Untitled-GUMPZY6G.png
 * @param slugLowercase ex: my-first-post
 * @returns
 * `mediaRelativePath`: ex: /blog/my-first-post/Untitled--1163d970-85c3-462c-ac0d-b2b86495539b.png \
 * `mediaDestination`: ex: Users/gogo/Documents/github/Personal-Site-Gourav.io/public/blog/my-first-post/Untitled--1163d970-85c3-462c-ac0d-b2b86495539b.png
 */
const getDestMediaInfoFromURL = (
  mediaUrl: string,
  slugLowercase: string,
) => {
    /** ex: ['Untitled', 'png'] */
    const srcFile = mediaUrl
      .split("?")[0]
      .split("/")
      .at(-1)
      ?.split(".") as unknown as string[];
    /** ex: Untitled */
    const srcFileName = decodeURIComponent(srcFile?.[0]);
    /** ex: png */
    const fileExt = srcFile?.[1];
    /** calc hash from url ending with file. ex: 749325831 */
    const hash = hashCode(mediaUrl.split("?")[0]).toString();
    /** ex: Untitled--1163d970-85c3-462c-ac0d-b2b86495539b.png */
    const destFileName = `${srcFileName}--${hash}.${fileExt}`;
  

  if (!destFileName) {
    throw new Error("destFileName is empty for img url: " + mediaUrl);
  }

  const mediaRelativePath = `/blog/${slugLowercase}/${destFileName}`;
  /**
   * ex: Users/gogo/Documents/github/Personal-Site-Gourav.io/public/blog/git-cheatsheet/Untitled--1163d970-85c3-462c-ac0d-b2b86495539b.png
   */
  const mediaDestination = join(/*turbopackIgnore: true*/ process.cwd(), "public", mediaRelativePath);

  return { mediaRelativePath, mediaDestination, destFileName };
};

const convertMdxStringToCode = async (
  mdString: string,
  frontmatter: FrontmatterBlogpost
) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const result = await bundleMDX({
    source: mdString,
    // cwd: mdDir,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        // remarkMdxImages,
      ] as any;

      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
            content: headingLink,
          },
        ],
        // whether to show toc based on frontmatter value
        [rehypeOutline, { show: frontmatter.desktopOutline }],
      ] as any;

      return options;
    },
    esbuildOptions: (options) => {return {
      ...options,
      target: ["es2020"],
    }},
  });

  const { code } = result;
  return code;
};

export type BlogPostMetaDataType = z.infer<typeof FrontmatterBlogpostSchema>;

type PostMetaDatatitleType = {
    type: 'title';
    title: Array<RichTextItemResponse>;
    id: string;
};

type PostMetaDataDescriptionType = {
    type: 'rich_text';
    rich_text: Array<RichTextItemResponse>;
    id: string;
};

type PostMetaDataSlugType = {
    type: 'rich_text';
    rich_text: Array<RichTextItemResponse>;
    id: string;
};

type PostMetaDataDateType = {
    type: 'date';
    date: {
        start: string;
    };
    id: string;
};

type PostMetaDataImagesArrayType =
    | {
          name: string;
          type: 'external';
          external: {
              url: string;
          };
      }[]
    | {
          name: string;
          type: 'file';
          file: {
              url: string;
              expiry_time: string;
          };
      }[]
    | [];

type PostMetaDataCheckboxType = {
    type: 'checkbox';
    checkbox: boolean;
};