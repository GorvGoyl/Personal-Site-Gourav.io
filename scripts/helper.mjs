import { readFileSync } from "fs";
import path from "path";

export const homeUrl = "https://gourav.io";
export const getPublishedPostsFrontmatter = () => {
  const cacheFilePath = path.join(
    process.cwd(),
    "frontmatterOfPublishedAndPreviewPosts.json"
  );
  const data = readFileSync(cacheFilePath);

  // @ts-ignore
  const FrontmatterBlogIndexArr = JSON.parse(data);
  const publishedPostsFrontmatter = FrontmatterBlogIndexArr.filter(
    (fm) => fm.published && fm.date <= new Date().toISOString()
  );

  return publishedPostsFrontmatter;
};

export const getPublishedPostsSlugs = () => {
  const FrontmatterBlogIndexArr = getPublishedPostsFrontmatter();
  const publishedPostsSlugs = FrontmatterBlogIndexArr.map(
    (fm) => "/blog/" + fm.slug
  );

  return publishedPostsSlugs;
};
