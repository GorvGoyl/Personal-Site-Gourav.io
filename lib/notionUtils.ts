import { FrontmatterBlogpostSchema, FrontmatterBlogpost } from "@/types/types";
import { Client } from "@notionhq/client";
import {
  ImageBlockObjectResponse,
  PageObjectResponse,
  VideoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NOTION_API_KEY, NOTION_BLOGPOSTS_DB } from "./envVar";
import path, { join } from "path";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { headingLink } from "./localContentUtils";
import remarkGfm from "remark-gfm";
import { bundleMDX } from "mdx-bundler";
import toc from "@jsdevtools/rehype-toc";
import { NotionToMarkdown } from "notion-to-md";
import { downloadFile } from "./fileUtils";
import { ListBlockChildrenResponseResult } from "notion-to-md/build/types";
import { hashCode } from "./utils";
import { frontmatterCache } from "./cache";
const notionClient = new Client({ auth: NOTION_API_KEY });
export async function getAllPublishedPostsFrontmatterFromNotion(): Promise<
  FrontmatterBlogpost[]
> {
  const response = await notionClient.databases.query({
    database_id: NOTION_BLOGPOSTS_DB,
    filter: {
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
}

export async function getPostIdFromSlugFromNotion(
  postSlug: string
): Promise<FrontmatterBlogpost> {
  const response = await notionClient.databases.query({
    database_id: NOTION_BLOGPOSTS_DB,
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
}

// /**
// return: ["my-first-blog-post", "my-second-blog-post"]
// https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
// */
// export async function geAllPostsSlugsFromNotion(): Promise<string[]> {
//   const blogIndex = await getAllPostsFrontmatterFromNotion();

//   const slugs = blogIndex.map((x) => {
//     if (!x.slug) {
//       throw new Error(`slug is not present for ${x.title}`);
//     }
//     if (x.slug.includes(" ")) {
//       throw new Error(
//         `space is not allowed in slug. title: ${x.title}, slug: ${x.slug}`
//       );
//     }
//     return x.slug;
//   });

//   return slugs;
// }

/** Returns content of page Id.
 * - It also handle images by saving them in public/blog/post/file.png \
 * - It also saves og image name in frontmatter cache file for faster feed generation
 * @param  frontmatter - use postId, toc, slug
 * @return {*}  post content and frontmatter
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
  const n2m = new NotionToMarkdown({ notionClient });

  n2m.setCustomTransformer("image", (block) =>
    imgTransformer(block, slugLowercase, setOgImageURLcallback)
  );
  n2m.setCustomTransformer("video", (block) =>
    videoTransformer(block, slugLowercase)
  );

  n2m.setCustomTransformer("column_list", async (block) => {
    const mdBlocks = await n2m.pageToMarkdown(block.id);
    const mdString = n2m.toMarkdownString(mdBlocks);
    return `
    <div style={{display:"flex",columnGap:"10px"}}>
   ${mdString}
    </div>
    `;
  });

  n2m.setCustomTransformer("column", (block) => {
    // avoid rendering columns twice
    return "";
  });

  const mdBlocks = await n2m.pageToMarkdown(frontmatter.postId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  const postContent = await convertMdxStringToCode(mdString, frontmatter);

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
    title: page.properties["Title"]["title"][0]?.["plain_text"],
    desc: page.properties["Description"]["rich_text"][0]?.["plain_text"],
    slug: page.properties["Slug"]["rich_text"][0]?.["plain_text"],
    date: page.properties["Published date"]["date"]["start"],
    postId: page.id,
    preview: page.properties["Preview"]["checkbox"],
    published: page.properties["Published"]["checkbox"],
    desktopOutline: page.properties["Desktop outline"]["checkbox"],
    mobileOutline: page.properties["Mobile outline"]["checkbox"],
  };

  const fmParsed = FrontmatterBlogpostSchema.parse(frontMatter);

  return fmParsed;
};

const imgTransformer = async (
  block: ListBlockChildrenResponseResult,
  slugLowercase: string,
  setOgImageURLcallback: (url: string, ogImgName: string) => void
) => {
  const imgBlock = block as ImageBlockObjectResponse;
  if (imgBlock.has_children) {
    throw new Error("unhandled case: imgBlock has children");
  }
  let mediaUrl = "",
    caption = "";
  let src: "external" | "aws-s3" = "aws-s3";
  if (imgBlock.image.type === "external") {
    mediaUrl = imgBlock.image.external.url; //ends with filename.png
    console.warn(
      "❗️ external image url found, it's better to store it in Notion instead",
      mediaUrl
    );
    src = "external";
  }

  if (imgBlock.image.type === "file") {
    mediaUrl = imgBlock.image.file.url;
    src = "aws-s3";
  }

  if (
    imgBlock.image.caption.length > 1 &&
    imgBlock.image.caption[1].plain_text !== ""
  )
    throw new Error(
      "unhandled case: image caption has more than 1 element" +
        JSON.stringify(imgBlock.image.caption, null, 2)
    );

  caption = (imgBlock.image.caption?.[0]?.plain_text || "").trim();

  const { mediaDestination, mediaRelativePath, destFileName } =
    getDestMediaInfoFromURL(mediaUrl, slugLowercase, src);

  // copy images to public/blog/git-cheatsheet/*
  await downloadFile(mediaUrl, mediaDestination, "overwrite");

  // image with below caption is considered og:image and not shown in post
  if (caption === "og:image") {
    setOgImageURLcallback(mediaRelativePath, destFileName);
    return "";
  } else {
    const imgComponent = `<Img src="${mediaRelativePath}" type="ss" caption="${caption}" />`;
    return imgComponent;
  }
};

const videoTransformer = async (
  block: ListBlockChildrenResponseResult,
  slugLowercase: string
) => {
  const videoBlock = block as VideoBlockObjectResponse;
  if (videoBlock.has_children) {
    throw new Error("unhandled case: videoBlock has children");
  }
  let mediaUrl = "",
    caption = "";
  let src: "external" | "aws-s3" = "aws-s3";
  if (videoBlock.video.type === "external") {
    mediaUrl = videoBlock.video.external.url; //ends with filename.mp4
    src = "external";
    console.warn(
      "❗️ external video url found, it's better to store it in Notion instead",
      mediaUrl
    );
  }

  if (videoBlock.video.type === "file") {
    mediaUrl = videoBlock.video.file.url;
    src = "aws-s3";
  }

  if (
    videoBlock.video.caption.length > 1 &&
    videoBlock.video.caption[1].plain_text !== ""
  )
    throw new Error(
      "unhandled case: video caption has more than 1 element" +
        JSON.stringify(videoBlock.video.caption, null, 2)
    );
  caption = (videoBlock.video.caption?.[0]?.plain_text || "").trim();

  if (caption) {
    throw new Error("captions are not yet handled for videos: " + caption);
  }
  const { mediaDestination, mediaRelativePath } = getDestMediaInfoFromURL(
    mediaUrl,
    slugLowercase,
    src
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
  src: "aws-s3" | "external"
) => {
  let destFileName = "";
  if (src == "aws-s3") {
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
    destFileName = `${srcFileName}--${hash}.${fileExt}`;
  } else if (src == "external") {
    /** ex: ['Untitled', 'png'] */
    const srcFile = mediaUrl
      .split("/")
      .at(-1)
      ?.split(".") as unknown as string[];
    /** ex: Untitled */
    const srcFileName = decodeURIComponent(srcFile?.[0]);
    /** ex: png */
    const fileExt = srcFile?.[1];
    const hash = hashCode(mediaUrl.split("?")[0]).toString();
    destFileName = `${srcFileName}--${hash}.${fileExt}`;
  }

  if (!destFileName) {
    throw new Error("destFileName is empty for img url: " + mediaUrl);
  }

  const mediaRelativePath = `/blog/${slugLowercase}/${destFileName}`;
  /**
   * ex: Users/gogo/Documents/github/Personal-Site-Gourav.io/public/blog/git-cheatsheet/Untitled--1163d970-85c3-462c-ac0d-b2b86495539b.png
   */
  const mediaDestination = join(process.cwd(), "public", mediaRelativePath);

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
        [
          toc,
          {
            headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
            cssClasses: {
              toc: `page-outline ${frontmatter.desktopOutline && "mobile"}`, // Change the CSS class for the TOC
              link: `page-link ${frontmatter.mobileOutline && "mobile"}`, // Change the CSS class for links in the TOC
            },
            customizeTOC: (toc: any) => {
              // whether to show toc based on frontmatter value
              return frontmatter.desktopOutline;
            },
          },
        ],
      ] as any;

      return options;
    },
    esbuildOptions: (options) => ({
      ...options,
      target: ["es2020"],
    }),
  });

  const { code } = result;
  return code;
};
