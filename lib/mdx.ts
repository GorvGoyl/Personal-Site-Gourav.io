import { FrontMatter } from "@/types/types";
import toc from "@jsdevtools/rehype-toc";
import fs, { constants } from "fs";
import matter from "gray-matter";
import { h } from "hastscript";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import path, { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkMdxImages } from "remark-mdx-images";

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

  const result = await bundleMDX(fileContents, {
    cwd: mdDir,
    xdmOptions: (options) => {
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
              toc: "page-outline", // Change the CSS class for the TOC
              link: "page-link", // Change the CSS class for links in the TOC
            },
            customizeTOC: (toc: any) => {
              // whether to show toc based on frontmatter value
              if (shouldAddToc) return true;
              else return false;
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
