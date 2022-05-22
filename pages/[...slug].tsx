import { Banner } from "@/components/banner";
import { Comments } from "@/components/commentBox";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import MDXComponents from "@/components/mdxComponents";
import { Links, Navbar } from "@/components/navbar";
import { ScrollTopBtn } from "@/components/scrollTop";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { AuthorImg, ShareComponent } from "@/components/tags";
import project from "@/layouts/css/project.module.scss";
import { getMdPostSlugs } from "@/lib/getPost";
import { getPost } from "@/lib/mdx";
import md from "@/styles/md.module.scss";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths } from "next";
import { join } from "path";
import React, { useMemo } from "react";

export default function Project(props: { matter: any; source: string }) {
  const MDX = useMemo(() => getMDXComponent(props.source), [props.source]);

  return (
    <>
      <Header
        type="website"
        title={props.matter.title}
        desc={props.matter.desc}
        imgPath={props.matter.ogURL}
      />

      <Container layout={LayoutType.Blog}>
        {/* <Banner /> */}
        <Navbar link={Links.Blog} />
        <main className="mx-auto prose">
          <article className={`${project.css} ${md.css}`}>
            <MDX components={MDXComponents as any} />
          </article>
          <ShareComponent />
          <hr className="mb-8" />
          <SubscribeForm type={FORMTYPE.Generic} />
        </main>
        {props.matter.comments && <Comments></Comments>}
        <ScrollTopBtn />
      </Container>
      <div className="flex justify-center">
        <AuthorImg />
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async (props: { params: { slug: [string] } }) => {
  const slugArr = props.params.slug;
  const slug = slugArr.join("/");
  const mdRelativeDir = `content/misc/${slug}`;

  const mdFileName = "index.md";

  // store all images (including og image) to the base markdown folder even in case of md sub-folders
  const imgOutputRelativeDir = `/img/${slugArr[0]}`;

  const { matter, source } = await getPost(
    mdRelativeDir,
    mdFileName,
    imgOutputRelativeDir
  );

  return {
    props: {
      matter: matter,
      source: source,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsDirectory = join(process.cwd(), "content", "misc");

  const slugsArr = getMdPostSlugs(postsDirectory);

  const paths = [];

  for (const slug of slugsArr) {
    paths.push({
      params: {
        slug: slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};
