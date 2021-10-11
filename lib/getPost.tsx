import { FrontMatter } from "@/types/types";
import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";

// const postsDirectory = join(process.cwd(), "content", "blog");

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((path) => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [
    srcpath,
    ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive)),
  ];
}

function getMDFoldersList(baseDir: string) {
  const folders = [];

  const getFilesRecursively = (dir: string) => {
    const filesInDirectory = fs.readdirSync(dir);
    for (const file of filesInDirectory) {
      const absolute = path.join(dir, file);
      if (
        fs.statSync(absolute).isDirectory() &&
        fs.existsSync(join(absolute, "index.md"))
      ) {
        console.log(path.sep);
        const tt = absolute
          .replace(`${baseDir}${path.sep}`, "")
          .split(path.sep);
        folders.push(tt);
        getFilesRecursively(absolute);
      }
    }
  };

  getFilesRecursively(baseDir);

  return folders;
}

/**
get folder names (slug) of all md posts
input base dir: content/misc
output: [["clone-wars"],["notion-boost"],["notion-boost","whats-new"]]
https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
*/
export function getMdPostSlugs(postsDirectory: string): string[] {
  const dir = getMDFoldersList(postsDirectory);

  const slugs = dir.filter((slug) => {
    if (slug.includes(" ")) {
      console.error(`space isnot allowed in path name: ${slug}`);
    } else {
      return slug;
    }
  });

  return slugs;
}

// get post by path name
export function getPostBySlug(
  slug: string,
  fields: string[],
  postsDirectory: string
): FrontMatter {
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

export function getAllPosts(
  fields: string[],
  postsDirectory: string
): FrontMatter[] {
  const allSlugs = getMdPostSlugs(postsDirectory);
  let posts = allSlugs.map((slugArr) => {
    const post = getPostBySlug(slugArr[0], fields, postsDirectory);
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
