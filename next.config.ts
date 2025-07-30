import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
    // disabling i18n due to mdx path error
    // i18n: {
    //   locales: ["en-US"],
    //   defaultLocale: "en-US",
    // },
    // swcMinify: true,
    output: 'standalone',
    outputFileTracingExcludes: {
        '**/*': [
            './.pnpm-store/v3/files/**/*',
            './**/*.map',
            './**/node_modules/webpack/**/*',
            './**/node_modules/terser/**/*',
        ],
    },
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
    // eslint-disable-next-line require-await, @typescript-eslint/require-await
    async redirects() {
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
    },
};
module.exports = nextConfig;
