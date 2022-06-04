import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import MDXComponents from "@/components/mdxComponents";
import { Links, Navbar } from "@/components/navbar";
import { ScrollTopBtn } from "@/components/scrollTop";

import { Author, AuthorImg, ShareComponent } from "@/components/tags";
import post from "@/layouts/css/post.module.scss";
import { getMdPostSlugs, getPost } from "@/lib/getPost";
import { initTocPosition } from "@/lib/mdx";
import { getSlugViews } from "@/lib/utils";
import md from "@/styles/md.module.scss";
import { FrontMatter } from "@/types/types";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { join } from "path";
import React, { useEffect, useMemo, useState } from "react";
const RELATIVE_PATH = "/blog/";

export default function Post(props: {
  matter: FrontMatter;
  source: string;
  slug: string;
}) {
  const [slugViews, setSlugViews] = useState("");
  const [slugPath, setSlugPath] = useState("");
  useEffect(() => {
    if (props.slug) {
      // add relative path to slug: /blog/nextjs-cheatsheet
      setSlugPath(`${RELATIVE_PATH}${props.slug}`);

      getSlugViews([slugPath])
        .then((res) => {
          if (res.data[slugPath]) {
            setSlugViews(res.data[slugPath]);
          } else {
            console.error(res);
          }
          return;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [props.slug, slugPath]);

  useEffect(() => {
    const controller = initTocPosition();

    // remove eventlistener
    return () => {
      controller.abort();
    };
  }, []);

  const MDX = useMemo(() => getMDXComponent(props.source), [props.source]);

  const articleEditLink = `https://github.com/GorvGoyl/Personal-Site-Gourav.io/blob/main/content/${slugPath}/index.md`;

  return (
    <>
      <Header
        type="article"
        title={props.matter.title}
        desc={props.matter.desc}
        imgPath={props.matter.ogURL}
        date={
          props.matter.date
            ? new Date(props.matter.date).toISOString()
            : undefined
        }
      />

      <Container layout={LayoutType.Blog}>
        <Navbar link={Links.Blog} />
        <main className="mx-auto prose max-w-screen-md">
          <article className={`${post.code_block} ${md.css}`}>
            <header>
              <h1 className="text-2xl md:text-4xl md:leading-tight">
                {props.matter.title}
              </h1>
            </header>
            <Author date={props.matter.date} views={slugViews} />
            <MDX components={MDXComponents as any} />

            <ThatsAll />

            <DiscussArticle matter={props.matter} />
            <EditArticle articleEditLink={articleEditLink} />
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
export const getStaticProps = async (props: { params: { slug: [string] } }) => {
  const slugArr = props.params.slug;
  const slug = slugArr.join("/");

  const mdRelativeDir = `content/blog/${slug}`;

  const mdFileName = "index.md";

  const imgOutputRelativeDir = `/img/blog/${slugArr[0]}`;

  const { matter, source } = await getPost(
    mdRelativeDir,
    mdFileName,
    imgOutputRelativeDir
  );

  return {
    props: {
      matter: matter,
      source: source,
      slug: slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsDirectory = join(process.cwd(), "content", "blog");
  const slugsArr = getMdPostSlugs(postsDirectory);

  const paths = [];

  for (const slug of slugsArr) {
    paths.push({
      params: {
        slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

const DiscussArticle = (props: { matter: FrontMatter }) => {
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
    <div className="mt-7">
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
