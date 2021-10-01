import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function usePath(): string {
  const router = useRouter();
  const [relativeURL, setRelativeURL] = useState("");
  useEffect(() => {
    // to get url for both fixed and dynamic([slug]) paths
    const slug = router?.query?.slug;
    if (router?.pathname) {
      if (slug) {
        setRelativeURL(
          router.pathname
            .replace("[slug]", slug as string)
            .replace("[...slug]", (slug as [string]).join("/"))
        );
      } else {
        setRelativeURL(router.pathname);
      }
    }
  }, [router, router?.query?.slug]);

  return relativeURL;
}
