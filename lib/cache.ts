
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import type { FrontmatterBlogpost } from "../types/types";

const cacheFilePath = path.join(
  process.cwd(),
  "frontmatterOfPublishedAndPreviewPosts.json"
);

export const frontmatterCache = {
  getBySlug: (postSlug: string): FrontmatterBlogpost | undefined => {
    let data = "" as string | Buffer;
    let frontmatter = undefined as FrontmatterBlogpost | undefined;

    try {
      data = readFileSync(cacheFilePath);
    } catch (e) {
      // console.warn(e);
    }
    if (data) {
      const FrontmatterBlogpostsArr: FrontmatterBlogpost[] = JSON.parse(
        data as unknown as string
      );

      frontmatter = FrontmatterBlogpostsArr.find((fm) => {return fm.slug === postSlug});
    }

    return frontmatter;
  },
  get: (): FrontmatterBlogpost[] | undefined => {
    let data = "" as string | Buffer;
    let FrontmatterBlogpostsArr = undefined as
      | FrontmatterBlogpost[]
      | undefined;

    try {
      data = readFileSync(cacheFilePath);
    } catch (e) {
      console.warn(e);
    }
    if (data) {
      FrontmatterBlogpostsArr = JSON.parse(data as unknown as string);
    }

    return FrontmatterBlogpostsArr;
  },
  set: (frontmatterOfPublishedAndPreviewPosts: FrontmatterBlogpost[]) => {
    writeFileSync(
      cacheFilePath,
      JSON.stringify(frontmatterOfPublishedAndPreviewPosts)
    );
  },
  addOGImage: (pageId: string, ogImageName: string) => {
    const frontmatterBlogpostsArr = frontmatterCache.get();
    if (frontmatterBlogpostsArr) {
      frontmatterBlogpostsArr.forEach((fm) => {
        if (fm.postId === pageId) {
          fm.ogImage = ogImageName;
        }
      });
      frontmatterCache.set(frontmatterBlogpostsArr);
    } else {
      throw new Error("no frontmatter cache found");
    }
  },
};
