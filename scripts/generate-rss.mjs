import { Feed } from "feed";
import { writeFileSync } from "fs";
import { join } from "path";
import { getPublishedPostsFrontmatter, homeUrl } from "./helper.mjs";

const imgOutputPath = `${homeUrl}/img/blog/`;

const author = {
  name: "Gourav Goyal",
  email: "hey@gourav.io",
  link: "https://gourav.io/blog",
};

function generateRSS() {
  try {
    console.log("generating blog feed...");
    const feed = new Feed({
      title: "Gourav Goyal",
      description: "Gourav's Blog - Tech | Productivity | Life",
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

    const postsFrontmatter = getPublishedPostsFrontmatter();

    // don't add posts to rss feed: preview posts, posts that starts with _folder
    postsFrontmatter.forEach((frontmatter) => {
      try {
        const postURL = `https://gourav.io/blog/${frontmatter.slug}`;

        const postDir = join(
          process.cwd(),
          "content",
          "blog",
          frontmatter.slug
        );

        // use default og image if no image is provided
        let ogImgFullPath = `${homeUrl}/og.png`;
        if (frontmatter.ogImage) {
          ogImgFullPath = `${postURL}/${frontmatter.ogImage}`;
        }

        feed.addItem({
          title: frontmatter.title,
          id: frontmatter.title,
          link: postURL,
          description: frontmatter.desc,
          // content: html + postText,
          author: [author],
          date: new Date(frontmatter.date),
          image: ogImgFullPath,
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
