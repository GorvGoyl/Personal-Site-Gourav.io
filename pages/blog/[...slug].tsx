import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import MDXComponents from "@/components/mdxComponents";
import { Links, Navbar } from "@/components/navbar";
import { ScrollTopBtn } from "@/components/scrollTop";

import { Author, AuthorImg, ShareComponent } from "@/components/tags";
import post from "@/layouts/css/post.module.scss";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

import { initOutlinePosition } from "@/lib/mdx";
import {
  getAllPublishedAndPreviewPostsFrontmatterFromNotion,
  getPostContentFromNotion,
  getPostIdFromSlugFromNotion,
} from "@/lib/notionUtils";
import { getSlugViews } from "@/lib/utils";
import md from "@/styles/md.module.scss";
import { FrontmatterBlogpost } from "@/types/types";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { frontmatterCache } from "@/lib/cache";
const RELATIVE_PATH = "/blog/";

export default function Post(props: Post) {
  const [slugViews, setSlugViews] = useState("");
  const [slugPath, setSlugPath] = useState("");
  // show views
  useEffect(() => {
    if (props.frontmatter.slug) {
      // add relative path to slug: /blog/nextjs-cheatsheet
      setSlugPath(`${RELATIVE_PATH}${props.frontmatter.slug}`);

      // getSlugViews([slugPath])
      //   .then((res) => {
      //     if (res.data[slugPath]) {
      //       setSlugViews(res.data[slugPath]);
      //     } else {
      //       console.error(res);
      //     }
      //     return;
      //   })
      //   .catch((e) => {
      //     console.error("getSlugViews", e);
      //   });
    }
  }, [props.frontmatter.slug, slugPath]);

  // handle outline (move up on scroll down event)
  useEffect(() => {
    const controller = initOutlinePosition();

    // remove eventlistener
    return () => {
      controller.abort();
    };
  }, []);

  const MDX = useMemo(
    () => getMDXComponent(props.postContent),
    [props.postContent]
  );

  return (
    <>
      <Header
        type="article"
        title={props.frontmatter.title}
        desc={props.frontmatter.desc || props.frontmatter.title}
        imgPath={props.ogImageURL}
        date={
          props.frontmatter.date
            ? new Date(props.frontmatter.date).toISOString()
            : undefined
        }
      />

      <Container layout={LayoutType.Blog}>
        <Navbar link={Links.Blog} />
        <main className="mx-auto prose max-w-screen-md">
          <article className={`${post.code_block} ${md.css}`}>
            <header>
              <h1 className="text-2xl md:text-4xl md:leading-tight">
                {props.frontmatter.title}
              </h1>
            </header>
            <Author date={props.frontmatter.date} views={slugViews} />
            <MDX components={MDXComponents as any} />

            <ThatsAll />

            <DiscussArticle matter={props.frontmatter} />
            {/* <EditArticle articleEditLink={articleEditLink} /> */}
          </article>
          <ShareComponent />
          {/* <SubscribeForm type={FORMTYPE.AfterArticle} /> */}
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
        <ScrollTopBtn />
      </Container>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async (props: Path) => {
  const postSlug = props.params.slug[0];
  let frontmatter = frontmatterCache.getBySlug(postSlug);
  if (!frontmatter) {
    console.log("empty cache, fetching from notion");
    frontmatter = await getPostIdFromSlugFromNotion(postSlug);
  }
  const { ogImageURL, postContent } = await getPostContentFromNotion(
    frontmatter
  );

  const postParams: Post = {
    frontmatter: frontmatter,
    postContent: postContent,
    ogImageURL: ogImageURL,
  };
  return {
    props: postParams,
  };
};

type Post = {
  frontmatter: FrontmatterBlogpost;
  postContent: string;
  ogImageURL: string | null;
};
type Path = {
  params: {
    slug: [string]; //should be same as filename i.e. [...slug]
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsFrontmatter =
    await getAllPublishedAndPreviewPostsFrontmatterFromNotion();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    console.log("saving to cache");
    frontmatterCache.set(allPostsFrontmatter);
  }

  const paths = [] as Path[];

  for (const frontmatter of allPostsFrontmatter) {
    paths.push({
      params: {
        slug: [frontmatter.slug],
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

const DiscussArticle = (props: { matter: FrontmatterBlogpost }) => {
  const Link = (props: { link: string; text: string }) => {
    return (
      <div className="my-2">
        💬{" "}
        <a target="_blank" href={props.link}>
          {props.text}
        </a>
      </div>
    );
  };

  return (
    <div className="my-5">
      {props.matter.twitter && (
        <Link link={props.matter.twitter} text="Discuss on Twitter" />
      )}
      {props.matter.linkedin && (
        <Link link={props.matter.linkedin} text="Discuss on LinkedIn" />
      )}
      {props.matter.hackernews && (
        <Link link={props.matter.hackernews} text="Discuss on Hacker News" />
      )}
      {props.matter.reddit && (
        <Link link={props.matter.reddit} text="Discuss on Reddit" />
      )}
      {props.matter.github && (
        <Link link={props.matter.github} text="Discuss on Github" />
      )}
    </div>
  );
};

const EditArticle = (props: { articleEditLink: string }) => {
  return (
    <div className="my-5">
      ✍️{" "}
      <a
        title="Edit this post on Github"
        className="inline-block"
        target="_blank"
        href={props.articleEditLink}
      >
        Improve this article
      </a>
    </div>
  );
};

const ConnectOnTwitter = () => {
  return (
    <blockquote className="mt-14 font-normal">
      <p>
        Thanks for reading. Would love to hear your thoughts about it. Connect
        with me on <a href="https://twitter.com/GorvGoyl">Twitter</a>.
        {/* and{" "}
    <a href="https://www.linkedin.com/in/gorvgoyl/">LinkedIn</a>. */}
      </p>
    </blockquote>
  );
};

const ThatsAll = () => {
  return (
    <div className="mt-10">
      <i
        className="pr-1"
        style={{
          backgroundImage:
            "linear-gradient(to left, violet, indigo, blue, green, #d2d20f, #eb9c0b, red)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        That's all, folks!
      </i>
      {/* <img
        className="mx-auto"
        alt="That's all, folks!"
        loading="lazy"
        src="../thats_all_folks.gif"
      /> */}
    </div>
  );
};
