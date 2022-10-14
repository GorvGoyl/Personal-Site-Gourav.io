const redirects = async () => [
  {
    source: "/chrome",
    destination:
      "https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd",
    permanent: true,
  },

  {
    source: "/firefox",
    destination: "https://addons.mozilla.org/en-US/firefox/addon/notion-boost/",
    permanent: true,
  },
  {
    source: "/cv",
    destination:
      "https://docs.google.com/document/d/1DKDnTMPHXx5o9HE1cWZvChabRJxmI6N6OnFIflVOtQs/edit?usp=sharing",
    permanent: true,
  },
  {
    source: "/cover-letter",
    destination:
      "https://docs.google.com/document/d/1LxSXxMXmxN2zfCcqShWSvCCIWsrnH1zY5yKA3E6XZPk/edit?usp=sharing",
    permanent: true,
  },
];

const headers = async () => [
  {
    source: "/fonts/inter-var-latin.woff2",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ],
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig =
  // NextConfig
  {
    // disabling i18n due to mdx path error
    // i18n: {
    //   locales: ["en-US"],
    //   defaultLocale: "en-US",
    // },
    // swcMinify: true,
    reactStrictMode: true,
    experimental: {
      largePageDataBytes: 256000,
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    redirects,
    headers,
  };
module.exports = nextConfig;
