import { Feed } from "feed";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

const homeUrl = "https://gourav.io";
const imgOutputPath = `${homeUrl}/img/blog/`;

const author = {
  name: "Gourav Goyal",
  email: "hey@gourav.io",
  link: "https://twitter.com/GorvGoyl",
};

// picks stored og.jpg/og.png in blogpost folder, if not found use default site og.png
function getOgPublicPath(postDir, slug) {
  let ogFileName = "";
  let ogPublicPath = "";

  if (existsSync(`${postDir}/og.png`)) {
    ogFileName = "og.png";
  }

  if (existsSync(`${postDir}/og.jpg`)) {
    if (ogFileName) {
      console.error(`found 2 og files, overriding og.jpg over ${ogFileName}`);
    }
    ogFileName = "og.jpg";
  }
  if (ogFileName) {
    ogPublicPath = `${imgOutputPath}${slug}/${ogFileName}`;
  } else {
    ogPublicPath = `${homeUrl}/og.png`;
  }

  return ogPublicPath;
}

function generateRSS() {
  try {
    console.log("generating blog feed...");
    const feed = new Feed({
      title: "Gourav Goyal",
      description: "Blog - Gourav Goyal",
      id: homeUrl,
      link: homeUrl,
      language: "en",
      image: `${homeUrl}/favicon-32x32.png`,
      favicon: `${homeUrl}/favicon.ico`,
      generator: `Feed for ${homeUrl}`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Gourav Goyal`,
      feedLinks: {
        rss: `${homeUrl}/feed.xml`,
        json: `${homeUrl}/feed.json`,
        atom: `${homeUrl}/atom.xml`,
      },
      author,
    });

    const blogDir = join(process.cwd(), "content", "blog");
    const postSlugs = readdirSync(blogDir);

    // don't add posts to rss feed: preview posts, posts that starts with _folder
    postSlugs.forEach((slug) => {
      try {
        if (slug.startsWith("_")) {
          return;
        }
        const file = join(process.cwd(), "content", "blog", slug, "index.md");
        if (!file) {
          return;
        }
        const content = readFileSync(file);
        const frontmatter = matter(content);

        if (frontmatter.data.preview === true) {
          return;
        }

        const postURL = `https://gourav.io/blog/${slug}`;

        const postDir = join(process.cwd(), "content", "blog", slug);
        const ogPublicPath = getOgPublicPath(postDir, slug);

        feed.addItem({
          title: frontmatter.data.title,
          id: frontmatter.data.title,
          link: postURL,
          description: frontmatter.data.desc,
          // content: html + postText,
          author,
          date: new Date(frontmatter.data.date),
          image: ogPublicPath,
        });
        // feed.addCategory("Technology");
      } catch (e) {
        console.error("Error: ", e);
      }
    });

    writeFileSync("./public/feed.xml", feed.rss2());
    writeFileSync("./public/atom.xml", feed.atom1());
    writeFileSync("./public/feed.json", feed.json1());
    console.log("feed generated");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

generateRSS();
