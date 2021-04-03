import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts, FrontMatter } from "@/lib/getPost";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { readableDate } from "@/lib/utils";
import React from "react";
import { SubscribeForm, FORMTYPE } from "@/components/subscribe";
import { TwitterBtn } from "@/components/blocks";

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
              <div key={post.slug}>
                <div>
                  <article>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="no-underline">
                        <h3>{post.title}</h3>
                      </a>
                    </Link>
                  </article>
                </div>
                <div className="text-gray-500 text-base text-right">
                  — {readableDate(post.date)}
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
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { allPosts },
  };
};
