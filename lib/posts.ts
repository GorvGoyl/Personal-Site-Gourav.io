import fs from "fs";
import path from "path";
import matter from "gray-matter";
// Finding directory named "blog" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), "pages/blog/post");

export const getSortedPosts: any = () => {
  // Reads all the files in the post directory
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const fullPath = path.join(postDirectory, filename);
    // Extracts contents of the MDX file
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(data.date).toLocaleDateString(
      "en-IN",
      options
    );
    const frontmatter = {
      ...data,
      date: formattedDate,
    };
    return {
      slug,
      ...frontmatter,
    };
  });
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }
    return -1;
  });
};

// Get Slugs ie filename
export const getAllPostSlugs: any = () => {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((filename) => {
    return {
      params: {
        slug: filename.replace(".mdx", ""),
      },
    };
  });
};
// Get Post based on Slug
// eslint-disable-next-line @typescript-eslint/require-await
export const getPostdata: any = async (slug: any) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const fullPath = path.join(postDirectory, `${slug}.mdx`);
  const postContent = fs.readFileSync(fullPath, "utf8");
  return postContent;
};
