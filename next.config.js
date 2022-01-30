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

module.exports =
  // NextConfig
  {
    // disabling i18n due to mdx path error
    // i18n: {
    //   locales: ["en-US"],
    //   defaultLocale: "en-US",
    // },
    future: {
      strictPostcssConfiguration: true,
    },
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    webpack: (config, { dev, isServer }, options) => {
      // if (isServer) {
      //   if (!dev) {
      //     require("./scripts/generate-sitemap.js");
      //     require("./scripts/generate-rss.js");
      //   }
      // }

      // config.module.rules.push({
      //   test: /\.(png|jpe?g|gif|mp4|svg)$/i,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         publicPath: "/_next",
      //         // name: "static/media/[name].[hash].[ext]",
      //         // todo: remove redundant `pages` path from [path] https://github.com/webpack-contrib/file-loader#function-1
      //         name: "static/media/[path][name].[ext]",
      //       },
      //     },
      //   ],
      // });

      return config;
    },
    redirects,
    headers,
  };
