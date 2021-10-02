import { TwitterBtn } from "@/components/blocks";
import Header from "@/components/Header";
import { Icon, TYPE } from "@/components/icons";
import { Container, LayoutType } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { FrontMatter, getAllPosts as getAllPostsMatter } from "@/lib/getPost";
import { readableDate } from "@/lib/utils";
import { GetStaticProps } from "next";
import Link from "next/link";
import { join } from "path";
import React from "react";

export default function Blog(Props: { allPosts: FrontMatter[] }): JSX.Element {
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
              <div className="mb-14" key={post.slug}>
                <article>
                  <Link href={`/blog/${post.slug}`}>
                    <a className="no-underline">
                      <h3 className="mb-0">{post.title}</h3>
                    </a>
                  </Link>
                </article>
                <div className="text-gray-500 text-base flex items-center space-x-3 justify-end">
                  <Icon type={TYPE.calendar} size="14" />
                  <div>{readableDate(post.date)}</div>
                </div>
              </div>
            ))}
          </div>
          <hr className="mb-8" />
          <SubscribeForm type={FORMTYPE.Slim} />
          <TwitterBtn />
        </main>
      </Container>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const postsDirectory = join(process.cwd(), "content", "blog");

  const allPostsMatter = getAllPostsMatter(
    ["title", "date", "slug"],
    postsDirectory
  );

  return {
    props: { allPosts: allPostsMatter },
  };
};
