import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts, PostType } from "../lib/getPost";
import Header from "../components/header";
import { Container, LayoutType } from "../components/layout";
import Navbar from "../components/navbar";

export default function Blog(Props: { allPosts: PostType[] }): JSX.Element {
  return (
    <>
      <Header title="Blog - Gourav Goyal" />

      <Container layout={LayoutType.Blog}>
        <Navbar />
        <main className="prose prose-lg">
          <header>
            <h1>Blog</h1>
          </header>
          <div>
            {Props.allPosts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <a className="no-underline">
                    <h3>{post.title}</h3>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </Container>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { allPosts },
  };
};
