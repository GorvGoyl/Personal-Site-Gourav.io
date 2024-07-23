
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
import type { FrontmatterProject } from "../types/types";

function getMDFoldersList(baseDir: string): string[][] {
  const folders = [] as string[][];

  const getFilesRecursively = (dir: string) => {
    const filesInDirectory = fs.readdirSync(dir);
    for (const file of filesInDirectory) {
      const absolutePath = path.join(dir, file);
      if (
        fs.statSync(absolutePath).isDirectory() &&
        !file.startsWith("_") &&
        fs.existsSync(join(absolutePath, "index.md"))
      ) {
        const tt = absolutePath
          .replace(`${baseDir}${path.sep}`, "")
          .split(path.sep);
        folders.push(tt);
        getFilesRecursively(absolutePath);
      }
    }
  };

  getFilesRecursively(baseDir);

  return folders;
}

/**
get folder names (slug) of all md posts
input base dir: content/projects
output: [["clone-wars"],["notion-boost"],["notion-boost","whats-new"]]
https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
*/
export function getMdPostSlugs(postsDirectory: string): string[][] {
  const slugs = getMDFoldersList(postsDirectory);

  slugs.forEach((slug: string[]) => {
    slug.forEach((x: string) => {
      if (x.includes(" ")) {
        throw new Error(`space is not allowed in path name: ${x}`);
      }
    });
  });

  return slugs;
}

// get post by path name
export function getPostBySlug(
  slug: string,
  fields: string[],
  postsDirectory: string
): FrontmatterProject {
  const pathToPost = join(postsDirectory, slug);
  const files = fs.readdirSync(pathToPost);
  const indexFile = files.find(
    (file) => {return file.substr(0, file.lastIndexOf(".")) === "index"}
  );

  if (!indexFile) {throw new Error("index file not found for slug: " + slug);}
  // const ogImg =
  //   files.find((file) => file.substr(0, file.lastIndexOf(".")) === "og") || "";
  const fullPath = join(pathToPost, indexFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontMatter /* content */ } = matter(fileContents);

  const post = frontMatter as FrontmatterProject;
  post.slug = slug;
  // post.og = ogImg;

  return post;
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

  const frontmatter = data as FrontmatterProject;
  const shouldAddToc = frontmatter.desktopOutline;
  const shouldAddMobileToc = frontmatter.mobileOutline;

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
              if (shouldAddToc === true) {return true;}
              return false;
            },
          },
        ],
      ] as any;

      return options;
    },
    esbuildOptions: (options) => {return {
      ...options,
      outdir: imgOutDir, //blog/git-cheatsheet/
      target: ["es2020"],
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
    }},
  });

  const { code } = result;
  let ogImgWithRelativePath: string;
  let ogFileName = "";

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
    frontmatter.ogImgURL = `${imgOutputRelativeDir}/${ogFileName}`;
  } else {
    console.error("no og file found, site default will be used");
  }

  return {
    matter: frontmatter,
    source: code,
  };
}

export const headingLink = h(
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
