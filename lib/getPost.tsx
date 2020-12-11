import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { LayoutType } from "../components/layout";

export class PostType {
  date: string;
  title: string;
  layout: LayoutType;
  slug?: string;
}

const postsDirectory = join(process.cwd(), "pages", "blog");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((slug) => !slug.startsWith("."));
}

export function getPostBySlug(slug: string, fields: string[]): PostType {
  const pathToPost = join(postsDirectory, slug);
  const files = fs.readdirSync(pathToPost);
  const indexFile = files.find(
    (file) => file.substr(0, file.lastIndexOf(".")) === "index"
  );

  const fullPath = join(pathToPost, indexFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data /* content */ } = matter(fileContents);

  const post = data as PostType;
  post.slug = slug;

  return post;
}

export function getAllPosts(fields: string[]): PostType[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
  return posts;
}
