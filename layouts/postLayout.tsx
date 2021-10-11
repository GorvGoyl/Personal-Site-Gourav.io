import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Links, Navbar } from "@/components/navbar";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { Author, AuthorImg, ShareComponent } from "@/components/tags";
import post from "@/layouts/css/post.module.scss";
import { webpackPath } from "@/lib/utils";
import { FrontMatter } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
  const img = Props.frontMatter.ogURL
    ? `${postMediaPath}/${Props.frontMatter.ogURL}`
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
            <Author date={Props.frontMatter.date} />
            {Props.children}
            <p>
              Thanks for reading. Would love to hear your thoughts about it.
              Connect with me on{" "}
              <a href="https://twitter.com/GorvGoyl">Twitter</a> and{" "}
              <a href="https://www.linkedin.com/in/gorvgoyl/">LinkedIn</a>.
            </p>
          </article>
          <ShareComponent />
          <SubscribeForm type={FORMTYPE.AfterArticle} />
        </main>
        <hr className="my-12" />
        <div className="flex justify-center">
          <AuthorImg />
        </div>
        <div className="text-center mt-8">
          <Link href="/blog">
            <a className="underline" title="View all posts">
              ← View all posts
            </a>
          </Link>
        </div>
      </Container>
    </>
  );
}
