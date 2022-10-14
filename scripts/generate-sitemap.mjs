import { writeFileSync } from "fs";
import { globby } from "globby";
import { getPublishedPostsSlugs, homeUrl } from "./helper.mjs";

(async () => {
  try {
    console.log("generating sitemap..");

    const pages = await globby([
      "pages/**/*.tsx",
      "content/**/*.md",
      "!content/**/_*/**/*.md", // ignore folders that start with _
      "!pages/_*.tsx",
      "!pages/api",
      "!pages/404.tsx",
    ]);

    const publishedPostsSlugs = getPublishedPostsSlugs();

    pages.push(...publishedPostsSlugs);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                if (page.includes("[slug]") || page.includes("[...slug]")) {
                  return;
                }
                const path = page
                  .replace("pages/", "/")
                  .replace("content/projects/", "/")
                  .replace("content/", "/")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/index", "");
                const route = path === "/index" ? "" : path;
                const fullUrl = `${homeUrl}${route}`;
                console.log(fullUrl);
                return `
                        <url>
                            <loc>${fullUrl}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>`;

    writeFileSync("public/sitemap.xml", sitemap);
    console.log("sitemap generated");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
