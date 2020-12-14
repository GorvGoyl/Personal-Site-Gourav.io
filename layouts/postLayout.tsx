import { webpackPath } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Navbar, Links } from "@/components/navbar";
import { FrontMatter } from "@/lib/getPost";
import post from "./css/post.module.scss";

// This function must be named otherwise it disables Fast Refresh.
export default function Post(Props: {
  children: JSX.Element | JSX.Element[];
  frontMatter: FrontMatter;
}): JSX.Element {
  // React hooks, for example `useState` or `useEffect`, go here.

  // to accomodate webpack file-loader path
  const postMediaPath = `${webpackPath}${useRouter().asPath}`;

  // todo: directly search for og.png in blog folder instead of relying on frontmatter og tag
  // imp: import og.png is required in mdx file else webpack won't load it
  const img = Props.frontMatter.og
    ? `${postMediaPath}/${Props.frontMatter.og}`
    : "";
  return (
    <>
      <Header
        title={Props.frontMatter.title}
        desc={Props.frontMatter.desc}
        imgPath={img}
      />
      <Container layout={LayoutType.Blog}>
        <Navbar link={Links.Blog} />
        <main className="mx-auto prose prose-lg">
          <article className={`${post.code_block}`}>
            <header>
              <h1>{Props.frontMatter.title}</h1>
            </header>
            {Props.children}
          </article>
        </main>
      </Container>
    </>
  );
}
