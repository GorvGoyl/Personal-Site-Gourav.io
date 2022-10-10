import { FrontMatter } from "@/types/types";
import toc from "@jsdevtools/rehype-toc";
import fs from "fs";
import matter from "gray-matter";
import { h } from "hastscript";
import { bundleMDX } from "mdx-bundler";
import path, { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";

function getMDFoldersList(baseDir: string) {
  const folders = [];

  const getFilesRecursively = (dir: string) => {
    const filesInDirectory = fs.readdirSync(dir);
    for (const file of filesInDirectory) {
      const absolute = path.join(dir, file);
      if (
        fs.statSync(absolute).isDirectory() &&
        !file.startsWith("_") &&
        fs.existsSync(join(absolute, "index.md"))
      ) {
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
    console.error(`Error: ${JSON.stringify(e)}`);
  }

  return posts;
}

/**
input: base md folder, md file name, output dir for images  
output: frontmatter, JSX content  
(og image will be picked from md base folder. store it as og.jpg / og.png in base md folder)
*/
export async function getPost(
  mdRelativeDir: string,
  mdFile: string,
  imgOutputRelativeDir: string
): Promise<{ matter: { [key: string]: any }; source: string }> {
  // create full path from relative paths
  const mdFilePath = join(process.cwd(), mdRelativeDir, mdFile);
  const imgOutDir = path.join(process.cwd(), "public", imgOutputRelativeDir);
  const mdDir = join(process.cwd(), mdRelativeDir);

  const fileContents = fs.readFileSync(mdFilePath, "utf8");

  const { data } = matter(fileContents);

  const frontmatter = data as FrontMatter;
  const shouldAddToc = frontmatter.toc;
  const shouldAddMobileToc = frontmatter.mobileToc;

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
    source: fileContents,
    cwd: mdDir,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMdxImages,
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
              toc: `page-outline ${shouldAddMobileToc && "mobile"}`, // Change the CSS class for the TOC
              link: `page-link ${shouldAddMobileToc && "mobile"}`, // Change the CSS class for links in the TOC
            },
            customizeTOC: (toc: any) => {
              // whether to show toc based on frontmatter value
              if (shouldAddToc === true) return true;
              return false;
            },
          },
        ],
      ] as any;

      return options;
    },
    esbuildOptions: (options) => ({
      ...options,
      outdir: imgOutDir,
      loader: {
        ...options.loader,
        ".png": "file",
        ".jpeg": "file",
        ".jpg": "file",
        ".gif": "file",
        ".svg": "file",
        ".mp4": "file",
      },
      publicPath: imgOutputRelativeDir,
      write: true,
    }),
  });

  const { code } = result;
  let ogImgWithRelativePath: string;
  let ogFileName: string;

  if (fs.existsSync(`${mdRelativeDir}/og.png`)) {
    ogFileName = "og.png";
  }

  if (fs.existsSync(`${mdRelativeDir}/og.jpg`)) {
    if (ogFileName) {
      console.error(`found 2 og files, overriding og.jpg over ${ogFileName}`);
    }
    ogFileName = "og.jpg";
  }

  if (ogFileName) {
    ogImgWithRelativePath = `${mdRelativeDir}/${ogFileName}`;

    fs.copyFileSync(
      ogImgWithRelativePath,
      `${imgOutDir}/${ogFileName}`,
      fs.constants.COPYFILE_FICLONE
    );
    frontmatter.ogURL = `${imgOutputRelativeDir}/${ogFileName}`;
  } else {
    console.error("no og file found, site default will be used");
  }

  return {
    matter: frontmatter,
    source: code,
  };
}

const headingLink = h(
  "svg",
  {
    ariaHidden: true,
    role: "img",
    class: "heading-link",
    viewBox: "0 0 16 16",
    width: "16",
    height: "16",
    fill: "currentColor",
    style:
      "display:inline-block;visibility: hidden;user-select:none;vertical-align:middle",
  },
  [
    h("path", {
      fillRule: "evenodd",
      d: "M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z",
    }),
  ]
);
