import Head from "next/head";

import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import MyBackground from "../../components/MyBackground";
// import MyButton from "../../components/MyButton";

type FrontMatter = {
  title: string;
  author: string;
  date: string;
};

const components = { MyBackground };

export default function Posts({
  source,
  frontMatter,
}: {
  source: string;
  frontMatter: FrontMatter;
}): JSX.Element {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <div>
        <div>
          <h1>{frontMatter.title}</h1>
          <div>
            {frontMatter.author}
            {" / "}
            <span>{frontMatter.date}</span>
          </div>
        </div>
        <div>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

type Params = {
  slug: string;
};

type Props = {
  params: {
    slug: string;
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const postContent = await getPostdata(slug);
  const { data, content } = matter(postContent);
  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
