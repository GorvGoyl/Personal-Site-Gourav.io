import { TwitterBtn } from "@/components/twitterBtn";
import Header from "@/components/Header";
import { Icon } from "@/components/icons";
import { Container, LayoutType } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { getSlugViews, getReadableDate, roundUpViewCount } from "@/lib/utils";
import { FrontmatterBlogpost } from "@/types/types";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllPublishedAndPreviewPostsFrontmatterFromNotion } from "@/lib/notionUtils";
import { BannerChromeExtensionChatGPTWriter } from "@/components/banner";
const RELATIVE_PATH = "/blog/";

export default function Blog(props: {
  allPosts: FrontmatterBlogpost[];
}): JSX.Element {
  const [slugViews, setSlugViews] = useState({});

  useEffect(() => {
    if (props.allPosts.length > 0) {
      // add relative path to slug: /blog/nextjs-cheatsheet
      const slugPaths = props.allPosts.map((x) => RELATIVE_PATH + x.slug);
      // getSlugViews(slugPaths)
      //   .then((res) => {
      //     if (res.data) {
      //       setSlugViews(res.data);
      //     } else {
      //       console.error(res);
      //     }
      //     return;
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   });
    }
  }, [props.allPosts]);
  return (
    <>
      <Header type="website" title="Blog - Gourav Goyal" />

      <Container layout={LayoutType.Blog}>
        <BannerChromeExtensionChatGPTWriter />
        <Navbar />
        <main className="prose prose-lg">
          <header>
            <h2>Blog</h2>
          </header>
          <div className="flex flex-col space-y-11">
            {props.allPosts.map((post) => (
              <div
                className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0"
                key={post.slug}
              >
                <div>
                  <article>
                    <Link
                      href={`${RELATIVE_PATH}${post.slug}`}
                      className="no-underline hover:orange-underline"
                    >
                      <h5 className="my-0 leading-normal">{post.title}</h5>
                    </Link>
                  </article>
                </div>
                <div className="text-gray-500 text-xs font-medium flex space-x-2 justify-end items-center">
                  <div className="flex items-center ml-5 mr-5">
                    {slugViews[RELATIVE_PATH + post.slug] && (
                      <div
                        className="flex items-center"
                        title={`Total views: ${
                          slugViews[RELATIVE_PATH + post.slug]
                        }`}
                      >
                        <Icon type="views" size="14" />

                        <div className="whitespace-nowrap ml-1 ">
                          {roundUpViewCount(
                            slugViews[RELATIVE_PATH + post.slug]
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="flex items-center"
                    title={`${post.date ? "Published date: " + post.date : ""}`}
                  >
                    <Icon
                      type="calendar"
                      size="11"
                      // className="inline-block"
                    />

                    <div className="whitespace-nowrap ml-2">
                      {getReadableDate(post.date || "")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="mb-8" />
          <SubscribeForm type={FORMTYPE.Slim} />
        </main>
      </Container>
      <TwitterBtn />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const previewAndPublishedPostsMatter =
    await getAllPublishedAndPreviewPostsFrontmatterFromNotion();
  const publishedPostsMatter = previewAndPublishedPostsMatter.filter(
    (x) => x.published && x.date && x.date <= new Date().toISOString()
  );
  return {
    props: { allPosts: publishedPostsMatter },
  };
};
