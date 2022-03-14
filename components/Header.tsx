import { usePath } from "@/hooks/customHooks";
import { NextSeo } from "next-seo";

const defaultProps = {
  title: "Gourav Goyal",
  desc: "I'm a tech founder, digital nomad, and a fun guy to hang around with. I like to build things that others find helpful.",
  imgPath: "/og.png",
};
export default function Header(Props: {
  title?: string;
  desc?: string;
  imgPath?: string;
}): JSX.Element {
  const title = Props.title || defaultProps.title;
  const description = Props.desc || defaultProps.desc;
  const ogImgRelativePath = Props.imgPath || defaultProps.imgPath;
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
        description={description}
        canonical={pageURL}
        openGraph={{
          type: "website",
          locale: "en_US", //  Default is en_US
          url: pageURL,
          title,
          description: description,
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
        additionalMetaTags={[
          {
            property: "monetization",
            content: "$ilp.uphold.com/QaUmZpmzmDzA",
          },
          {
            property: "author",
            content: defaultProps.title,
          },
          {
            name: "author", // linkedin takes name instead of property
            content: defaultProps.title,
          },
          {
            name: "image", // linkedin takes name instead of property
            content: ogImageURL,
          },
          {
            name: "description", // linkedin takes name instead of property
            content: description,
          },
          {
            name: "title", // linkedin takes name instead of property
            content: title,
          },
          // {
          //   httpEquiv: "x-ua-compatible",
          //   content: "IE=edge; chrome=1",
          // },
        ]}
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
