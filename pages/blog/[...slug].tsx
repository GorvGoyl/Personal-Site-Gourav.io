import { Comments } from "@/components/commentBox";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import MDXComponents from "@/components/mdxComponents";
import { Links, Navbar } from "@/components/navbar";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { Author, AuthorImg, ShareComponent } from "@/components/tags";
import post from "@/layouts/css/post.module.scss";
import { getMdPostSlugs } from "@/lib/getPost";
import { getPost } from "@/lib/mdx";
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
  useEffect(() => {
    if (props.slug) {
      // add relative path to slug: /blog/nextjs-cheatsheet
      const slugPath = `${RELATIVE_PATH}${props.slug}`;
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
          console.log(e);
        });
    }
  }, [props.slug]);

  const MDX = useMemo(() => getMDXComponent(props.source), [props.source]);

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
        <main className="mx-auto prose">
          <article className={`${post.code_block} ${md.css}`}>
            <header>
              <h1 className="text-2xl md:text-4xl md:leading-tight">
                {props.matter.title}
              </h1>
            </header>
            <Author date={props.matter.date} views={slugViews} />
            <MDX components={MDXComponents as any} />
            <blockquote className="mt-14 font-normal">
              <p>
                Thanks for reading. Would love to hear your thoughts about it.
                Connect with me on{" "}
                <a href="https://twitter.com/GorvGoyl">Twitter</a>.
                {/* and{" "}
                <a href="https://www.linkedin.com/in/gorvgoyl/">LinkedIn</a>. */}
              </p>
            </blockquote>
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
        {props.matter.comments && <Comments></Comments>}
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
