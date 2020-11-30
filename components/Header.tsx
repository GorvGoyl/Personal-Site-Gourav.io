import Head from "next/head";
import { useRouter } from "next/router";

const defaultProps = {
  title: "Gourav Goyal",
  desc:
    "I'm a tech founder, full-stack developer, and a fun guy to hang around with.",
  imgPath: "/og.jpg",
};
export default function Header(Props: {
  title?: string;
  desc?: string;
  imgPath?: string;
}): JSX.Element {
  const {
    title = defaultProps.title,
    desc = defaultProps.desc,
    imgPath = defaultProps.imgPath,
  } = Props;

  const site = "https://gourav.io";
  const imageURL = site + imgPath;
  const canURL = site + useRouter().pathname;
  const handle = "@GorvGoyl";

  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content={defaultProps.title} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="description" content={desc} />
      <meta httpEquiv="content-language" content="en-us" />
      <meta name="image" content={imageURL} />
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={desc} />
      <meta itemProp="image" content={imageURL} />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta name="og:site_name" content={title} />
      <meta property="og:url" content={canURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageURL} />
      {/* <!-- Twitter --> */}
      {/* content="summary" */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={canURL} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={imageURL} />
      <meta name="twitter:site" content={handle} />
      <meta name="twitter:creator" content={handle} />
      {/* icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={canURL} />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
    </Head>
  );
}
