import React from "react";
import { Container, LayoutType } from "../components/layout";
import Navbar from "../components/navbar";
import { PostType } from "../lib/getPost";
import post from "./css/post.module.scss";

// This function must be named otherwise it disables Fast Refresh.
export default function Post(Props: {
  children: JSX.Element | JSX.Element[];
  frontMatter: PostType;
}): JSX.Element {
  // React hooks, for example `useState` or `useEffect`, go here.
  return (
    <Container layout={LayoutType.Blog}>
      <Navbar />
      <main className="mx-auto prose prose-lg">
        <article className={`${post.code_block}`}>
          <header>
            <h1>{Props.frontMatter.title}</h1>
          </header>
          {Props.children}
        </article>
      </main>
    </Container>
  );
}
