/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/require-await */
import { AppProps } from "next/dist/next-server/lib/router/router";
import Link from "next/link";
import { getSortedPosts } from "../../lib/posts";

type AllPostsData = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};
const BlogIndex = ({
  allPostsData,
}: {
  allPostsData: AllPostsData[];
}): JSX.Element => {
  // const { allPostsData } = Props;
  return (
    <div>
      {allPostsData.map(({ slug, date, title, excerpt }) => (
        <div key={slug}>
          <li>
            <div>
              <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                <a>
                  <div>{title}</div>
                </a>
              </Link>
              <div>{excerpt}</div>
              <div>{date}</div>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
};

export default BlogIndex;

export async function getStaticProps() {
  const allPostsData = getSortedPosts();
  return {
    props: {
      allPostsData,
    },
  };
}
