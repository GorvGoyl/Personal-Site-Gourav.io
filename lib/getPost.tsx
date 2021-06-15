import { LayoutType } from "@/components/layout";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export class FrontMatter {
  date: string;
  title: string;
  desc: string;
  layout: LayoutType;
  preview?: boolean;
  // below ones are auto retrieve at build time
  slug?: string;
  og?: string;
}

const postsDirectory = join(process.cwd(), "pages", "blog");

// get path name of posts
export function getPostSlugs(): string[] {
  const slugs = fs.readdirSync(postsDirectory).filter((slug) => {
    if (slug.includes(" ")) {
      throw new Error(`space not allowed in path name: ${slug}`);
    }
    return !slug.startsWith(".");
  });

  return slugs;
}

// get post by path name
export function getPostBySlug(slug: string, fields: string[]): FrontMatter {
  const pathToPost = join(postsDirectory, slug);
  const files = fs.readdirSync(pathToPost);
  const indexFile = files.find(
    (file) => file.substr(0, file.lastIndexOf(".")) === "index"
  );

  if (!indexFile) return new FrontMatter();
  // const ogImg =
  //   files.find((file) => file.substr(0, file.lastIndexOf(".")) === "og") || "";
  const fullPath = join(pathToPost, indexFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontMatter /* content */ } = matter(fileContents);

  const post = frontMatter as FrontMatter;
  post.slug = slug;
  // post.og = ogImg;

  return post;
}

export function getAllPosts(fields: string[]): FrontMatter[] {
  const slugs = getPostSlugs();
  let posts = slugs.map((slug) => {
    const post = getPostBySlug(slug, fields);
    return post;
  });

  // filter empty posts
  posts = posts.filter((x) => x.title);

  // filter preview posts
  posts = posts.filter((x) => !x.preview);

  // sort posts by date in descending order
  try {
    posts.sort((post1, post2) => {
      const y1 = Number(post1.date.split("-")[0]);
      const m1 = Number(post1.date.split("-")[1]);
      const d1 = Number(post1.date.split("-")[2]);

      const y2 = Number(post2.date.split("-")[0]);
      const m2 = Number(post2.date.split("-")[1]);
      const d2 = Number(post2.date.split("-")[2]);

      if (y1 > y2) return -1;
      if (y1 < y2) return 1;
      if (m1 > m2) return -1;
      if (m1 < m2) return 1;
      if (d1 > d2) return -1;
      if (d1 < d2) return 1;
      return 0;
    });
  } catch (e) {
    console.log(`Error: ${JSON.stringify(e)}`);
  }

  return posts;
}
