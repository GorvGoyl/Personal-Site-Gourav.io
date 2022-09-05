import { usePath } from "@/hooks/customHooks";
import Head from "next/head";

const defaultProps = {
  title: "Gourav Goyal - Personal site and blog",
  desc: "Personal site and blog of a tech guy",
  imgPath: "/og.png",
};
export default function Header(props: {
  type: "website" | "article";
  title?: string;
  desc?: string;
  imgPath?: string;
  date?: string;
}): JSX.Element {
  const title = props.title || defaultProps.title;
  const type = props.type;
  const description = props.desc || defaultProps.desc;
  const ogImgRelativePath = props.imgPath || defaultProps.imgPath;
  const local = "http://localhost:3000";
  const domain = "https://gourav.io";
  const date = props.date;
  // const siteURL = isProd ? "https://gourav.io" : local;
  const ogImageURL = `${domain}${ogImgRelativePath}`;

  // to get url for both fixed and dynamic([slug]) paths
  const relativeURL = usePath();

  const pageURL = relativeURL === "/" ? domain : domain + relativeURL;
  const twitterHandle = "@GorvGoyl";
  const siteName = "Gourav.io";
  const authorName = "Gourav Goyal";

  return (
    <Head>
      {/* meta tags start */}
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={authorName} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" name="image" content={ogImageURL} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={twitterHandle} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageURL} />
      <meta property="twitter:url" content={pageURL} />
      {date && <meta property="article:published_time" content={date} />}
      <meta name="author" content={authorName} />
      <meta property="author" content={authorName} />
      <meta property="monetization" content="$ilp.uphold.com/QaUmZpmzmDzA" />
      <meta name="theme-color" content="#ffffff" />
      {/* meta tags end */}
      <link rel="canonical" href={pageURL} />
      <link rel="icon" href={`${domain}/favicon.ico`} />
    </Head>
  );
}
