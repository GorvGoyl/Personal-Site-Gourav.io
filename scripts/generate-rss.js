/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const path = require("path");
const { Feed } = require("feed");
const matter = require("gray-matter");
// const { webpackPath } = require("../lib/utils.ts");
const webpackPath = "/_next/static/media/pages";

const siteUrl = "https://gourav.io";
const postMediaPath = `${siteUrl}${webpackPath}/blog/`;

const author = {
  name: "Gourav Goyal",
  email: "hey@gourav.io",
  link: "https://twitter.com/GorvGoyl",
};

function generateRSS() {
  try {
    console.log("generating rss...");
    const feed = new Feed({
      title: "Gourav Goyal",
      description: "Blog - Gourav Goyal",
      id: siteUrl,
      link: siteUrl,
      language: "en",
      image: `${siteUrl}/favicon-32x32.png`,
      favicon: `${siteUrl}/favicon.ico`,
      generator: `Feed for ${siteUrl}`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Gourav Goyal`,
      feedLinks: {
        rss: `${siteUrl}/feed.xml`,
        json: `${siteUrl}/feed.json`,
        atom: `${siteUrl}/atom.xml`,
      },
      author,
    });

    const blogDir = path.join(__dirname, "..", "pages", "blog");
    const posts = fs.readdirSync(blogDir);

    posts.forEach((name) => {
      const file = path.join(
        __dirname,
        "..",
        "pages",
        "blog",
        name,
        "index.md"
      );
      const content = fs.readFileSync(file);
      const postSlug = `${name.replace(/\.mdx?/, "")}`;
      const frontmatter = matter(content);
      const postURL = `https://gourav.io/blog/${postSlug}`;

      feed.addItem({
        title: frontmatter.data.title,
        id: frontmatter.data.title,
        link: postURL,
        description: frontmatter.data.desc,
        // content: html + postText,
        author,
        date: new Date(frontmatter.data.date),
        image: `${postMediaPath}${postSlug}/og.png`,
      });
      // feed.addCategory("Technology");
    });

    fs.writeFileSync("./public/feed.xml", feed.rss2());
    fs.writeFileSync("./public/atom.xml", feed.atom1());
    fs.writeFileSync("./public/feed.json", feed.json1());
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

generateRSS();
