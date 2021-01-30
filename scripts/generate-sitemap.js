/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */

// https:// github.com/leerob/leerob.io/blob/6354c95b98/scripts/generate-sitemap.js

const fs = require("fs");
const globby = require("globby");
// const prettier = require("prettier");

(async () => {
  //   const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/**/*.mdx",
    "pages/**/*.tsx",
    "pages/**/*.md",
    "!pages/_*.tsx",
    "!pages/api",
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  // .replace("data", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/index", "");
                const route = path === "/index" ? "" : path;
                return `
                        <url>
                            <loc>${`https://gourav.io${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>`;

  // const formatted = prettier.format(sitemap, {
  //   ...prettierConfig,
  //   parser: "html",
  // });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
