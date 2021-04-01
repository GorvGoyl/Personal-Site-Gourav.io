import { useRouter } from "next/router";
import React from "react";
import { TwitterBtn } from "@/components/blocks";
import { webpackPath } from "@/lib/utils";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { FrontMatter } from "@/lib/getPost";
import project from "@/layouts/css/project.module.scss";
import { SubscribeForm, subscribeFormType } from "@/components/subscribe";

// This function must be named otherwise it disables Fast Refresh.
export default function Pos(Props: {
  children: JSX.Element | JSX.Element[];
  frontMatter: FrontMatter;
}): JSX.Element {
  // React hooks, for example `useState` or `useEffect`, go here.

  // to accomodate webpack file-loader path
  const postMediaPath = `${webpackPath}`;

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
        <Navbar />
        <main className="mx-auto prose prose-lg">
          <article className={`${project.css}`}>{Props.children}</article>
          <hr className="mb-8" />
          <SubscribeForm type={subscribeFormType.Generic} />
        </main>
        <TwitterBtn />
      </Container>
    </>
  );
}
