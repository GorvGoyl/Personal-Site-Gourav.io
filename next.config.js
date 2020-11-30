module.exports = {
  // Uncomment the line below to enable basePath, pages and
  // redirects will then have a path prefix (`/app` in this case)
  //
  // basePath: '/app',

  async redirects() {
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
  },
};
