import Head from "next/head";

export default function Header(Props: { title: string }): JSX.Element {
  return (
    <Head>
      <title>{Props.title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
