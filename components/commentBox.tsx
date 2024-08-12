import { useEffect } from 'react';

export function Comments() {
    useEffect(() => {
        const script = document.createElement('script');

        script.setAttribute('src', 'https://giscus.app/client.js');
        script.setAttribute('data-repo', 'GorvGoyl/Personal-Site-Gourav.io');
        script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyOTAyNjQ4MTU');
        script.setAttribute('data-category', 'Announcements');
        script.setAttribute('data-category-id', 'DIC_kwDOEU0W784CAvcn');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-reactions-enabled', '0');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-theme', 'light');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('crossOrigin', 'anonymous');

        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="giscus mt-16">
            {/* <Script
          src="https://giscus.app/client.js"
          data-repo="GorvGoyl/Personal-Site-Gourav.io"
          data-repo-id="MDEwOlJlcG9zaXRvcnkyOTAyNjQ4MTU="
          data-category="Announcements"
          data-category-id="DIC_kwDOEU0W784CAvcn"
          data-mapping="pathname"
          data-reactions-enabled="0"
          data-emit-metadata="0"
          data-theme="light"
          data-lang="en"
          crossOrigin="anonymous"
          strategy="lazyOnload"
          onError={(e) => {
            console.error("giscus script failed to load", e);
          }}
        ></Script> */}
        </div>
    );
}
