/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts, FrontMatter } from "@/lib/getPost";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Tweet } from "@/components/tweet";
import { Navbar } from "@/components/navbar";
import { readableDate } from "@/lib/utils";
import React from "react";
import { SubscribeForm, FORMTYPE } from "@/components/subscribe";
import { TwitterBtn } from "@/components/blocks";
import { getTweets } from "@/lib/twitter";
import getCMSStaticProps from "../lib/get-cms-static-props";

export default function Tweets({ tweets }) {
  return (
    <>
      <Header title="Blog - Gourav Goyal" />
      <Container layout={LayoutType.Blog}>
        <main className="prose prose-lg">
          <header>
            <h1>Blog</h1>
          </header>
          <Tweet key={tweets[0].id} {...tweets[0]} />
          {/* <div>
            {Props.allPosts.map((post) => (
              <div key={post.slug}>
                <div>
                  <article>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="no-underline">
                        <h3>{post.title}</h3>
                      </a>
                    </Link>
                  </article>
                </div>
                <div className="text-gray-500 text-base text-right">
                  — {readableDate(post.date)}
                </div>
              </div>
            ))}
          </div> */}
          <hr className="mb-8" />
          <SubscribeForm type={FORMTYPE.Slim} />
          <TwitterBtn />
        </main>

        {/* <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Tweets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a collection of tweets I've enjoyed. I use Twitter quite a
            bit, so I wanted a place to publicly share what inspires me, makes
            me laugh, and makes me think.
          </p>
          <Tweet key={tweets[0].id} {...tweets[0]} />
          {/* {tweets.map((tweet) => (
          <Tweet key={tweets[0].id} {...tweet[0]} />
        ))} */}
      </Container>
    </>
  );
}

// export async function getStaticProps() {
//   const tweets = await getTweets([
//     "935857414435495937",
//     "1334528781139259400",
//     "1334334544598740994",
//     "826528907381739520",
//     "1308509070140162048",
//     "997895977179721728",
//     "1341090253864542208",
//     "1026872652290379776",
//     "1346113149112619016",
//     "1340107217970683906",
//     "992629481578745856",
//     "989142253468708864",
//     "807626710350839808",
//     "1341962177272537089",
//     "1342869937841266688",
//     "1116362674319908864",
//     "1331380003716681728",
//     "1002104154737684480",
//   ]);

//   return { props: { tweets } };
// }

export async function getStaticProps() {
  const props = await getCMSStaticProps(Page);
  return { props, revalidate: 5 };
}
