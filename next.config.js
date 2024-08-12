/* eslint-disable require-await */
const redirects = async () => {
    return [
        {
            source: '/chrome',
            destination: 'https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd',
            permanent: true,
        },

        {
            source: '/firefox',
            destination: 'https://addons.mozilla.org/en-US/firefox/addon/notion-boost/',
            permanent: true,
        },
    ];
};

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
        staticPageGenerationTimeout: 120, // in seconds
        reactStrictMode: true,
        experimental: {
            largePageDataBytes: 500000,
            scrollRestoration: true,
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: '*',
                },
            ],
        },
        pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
        redirects,
    };
module.exports = nextConfig;
