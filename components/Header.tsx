import Head from "next/head";

export default function Header(Props: { title: string }): JSX.Element {
  const { title } = Props;
  const desc =
    "I'm a tech founder, full-stack developer, and a fun guy to hang around with.";
  const site = "https://gourav.io";
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content={title} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="description" content={desc} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="/og.jpg" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={site} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content="/og.jpg" />
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

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={site} />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
    </Head>
  );
}
