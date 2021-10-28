import { TwitterBtn } from "@/components/blocks";
import Header from "@/components/Header";
import { Icon, TYPE } from "@/components/icons";
import { Container, LayoutType } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { getAllPosts as getAllPostsMatter } from "@/lib/getPost";
import { readableDate } from "@/lib/utils";
import { FrontMatter } from "@/types/types";
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
            <h2>Blog</h2>
          </header>
          <div className="flex flex-col space-y-10">
            {Props.allPosts.map((post) => (
              <div
                className="flex flex-col md:flex-row md:justify-between"
                key={post.slug}
              >
                <div>
                  <article>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="no-underline ">
                        <h4 className="my-0 ">{post.title}</h4>
                      </a>
                    </Link>
                  </article>
                </div>
                <div className="text-gray-500 text-sm flex space-x-2 justify-end items-center">
                  <Icon type={TYPE.calendar} size="12" />
                  <div className="whitespace-nowrap">
                    {readableDate(post.date)}
                  </div>
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
