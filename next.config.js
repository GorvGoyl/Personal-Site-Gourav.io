const withMdxEnhanced = require("next-mdx-enhanced");
// const remarkPrism = require("remark-prism");
const rehypePrism = require("@mapbox/rehype-prism");
// const mdx = withMdxEnhanced({
//   defaultLayout: "layouts",
//   fileExtensions: ["mdx", "md"],
//   rehypePlugins: [],
//   // extendFrontMatter: {
//   //   process: (mdxContent, frontMatter) => {},
//   //   phase: "prebuild|loader|both",
//   // },
// });

const redirects = async () => {
  return [
    {
      source: "/chrome",
      destination:
        "https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd",
      permanent: true,
    },
    {
      source: "/notion-boost",
      destination: "/notion-boost/whats-new",
      permanent: true,
    },
    {
      source: "/firefox",
      destination:
        "https://addons.mozilla.org/en-US/firefox/addon/notion-boost/",
      permanent: true,
    },
  ];
};

module.exports = withMdxEnhanced({
  layoutPath: "layouts", // layout folder
  defaultLayout: true, //set layouts/index.tsx as default for mdx file lacking frontmatter 'layout'
  fileExtensions: ["mdx", "md"],
  remarkPlugins: [
    // require("remark-autolink-headings"),
    // require("remark-slug"),
    require("remark-code-titles"),
  ],
  rehypePlugins: [
    // needed both to add self-linking id to headings href
    require("rehype-slug"),
    require("rehype-autolink-headings"),
    rehypePrism,
  ],
  usesSrc: false, //checks for /pages folder
  // extendFrontMatter: {
  //   process: (mdxContent, frontMatter) => {},
  //   phase: "prebuild|loader|both",
  // },
  reExportDataFetching: false,
})(
  // NextConfig
  {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next",
              name: "static/media/[name].[hash].[ext]",
            },
          },
        ],
      });

      return config;
    },
    redirects,
  }
);
