import fs, { constants } from "fs";
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

  const { code, frontmatter } = result;
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
