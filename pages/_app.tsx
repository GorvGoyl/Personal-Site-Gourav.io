import { isProd } from "@/lib/envVar";
import * as gtag from "@/lib/gtag";
import "@/styles/tailwind.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProd) gtag.pageview(url, document.title);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    if (isProd) {
      console.log(
        "%cBuilt with Next.js (React), Typescript, Tailwind CSS | Blog content using Markdown (MDX) | Deployed on Vercel",
        "color: #6af549; font-size: 14px; background: #282c34;"
      );
      console.log(
        "%cSource-code: https://github.com/GorvGoyl/Personal-Site-Gourav.io",
        "color: #6af549; font-size: 14px;"
      );
    }

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default App;
