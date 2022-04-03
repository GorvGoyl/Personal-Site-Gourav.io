import { usePath } from "@/hooks/customHooks";
import { NextSeo } from "next-seo";

const defaultProps = {
  title: "Gourav Goyal",
  desc: "I'm a tech founder, digital nomad, and a fun guy to hang around with. I like to build things that others find helpful.",
  imgPath: "/og.png",
};
export default function Header(props: {
  type: "website" | "article";
  title?: string;
  desc?: string;
  imgPath?: string;
}): JSX.Element {
  const title = props.title || defaultProps.title;
  const description = props.desc || defaultProps.desc;
  const ogImgRelativePath = props.imgPath || defaultProps.imgPath;
  const local = "http://localhost:3000";
  const siteURL = "https://gourav.io";
  // const siteURL = isProd ? "https://gourav.io" : local;
  const ogImageURL = `${siteURL}${ogImgRelativePath}`;

  // to get url for both fixed and dynamic([slug]) paths
  const relativeURL = usePath();

  const pageURL = relativeURL === "/" ? siteURL : siteURL + relativeURL;
  const twitterHandle = "@GorvGoyl";
  const siteName = "Gourav.io";

  return (
    <>
      <NextSeo
        title={title}
        // description={description}
        // canonical={pageURL}
        openGraph={{
          type: props.type,
          locale: "en_US", //  Default is en_US
          url: pageURL,
          title,
          // description,
          images: [
            {
              url: ogImageURL,
              width: 1200,
              height: 630,
              alt: "Gourav.io - personal site and blog",
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          handle: twitterHandle,
          site: twitterHandle,
          cardType: "summary_large_image",
        }}
        // additionalMetaTags={
        //   [
        //     // linkedin takes both name and property
        //     {
        //       name: "title",
        //       property: "og:title",
        //       content: title,
        //     },
        //     {
        //       name: "image",
        //       property: "og:image",
        //       content: ogImageURL,
        //     },
        //     {
        //       name: "description",
        //       property: "og:description",
        //       content: description,
        //     },
        //     {
        //       property: "monetization",
        //       content: "$ilp.uphold.com/QaUmZpmzmDzA",
        //     },
        //     {
        //       property: "author",
        //       content: defaultProps.title,
        //     },
        //     {
        //       name: "author", // linkedin takes name instead of property
        //       content: defaultProps.title,
        //     },
        //     // {
        //     //   property: "og:url",
        //     //   content: pageURL,
        //     // },

        //     // {
        //     //   httpEquiv: "x-ua-compatible",
        //     //   content: "IE=edge; chrome=1",
        //     // },
        //   ] as any
        // }
        additionalLinkTags={[
          {
            rel: "icon",
            href: `${siteURL}/favicon.ico`,
          },

          // {
          //   rel: "apple-touch-icon",
          //   href: "https://www.test.ie/touch-icon-ipad.jpg",
          //   sizes: "76x76",
          // },
          // {
          //   rel: "manifest",
          //   href: "/site.manifest",
          // },
        ]}
      />
    </>
  );
}
