import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { LayoutType } from "@/components/layout";

export class FrontMatter {
  date: string;
  title: string;
  desc: string;
  layout: LayoutType;
  // below ones are auto retrieve at build time
  slug?: string;
  og?: string;
}

const postsDirectory = join(process.cwd(), "pages", "blog");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((slug) => !slug.startsWith("."));
}

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
  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
  return posts;
}
