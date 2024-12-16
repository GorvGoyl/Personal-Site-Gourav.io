import Head from 'next/head';
import { usePath } from '../hooks/customHooks';

const defaultProps = {
    title: 'Gourav Goyal - Personal site and blog',
    desc: 'Gourav - Personal site and blog',
    imgPath: '/og.png',
};
export default function Header(props: {
    type: 'website' | 'article';
    title?: string;
    desc?: string;
    imgPath?: string | null;
    date?: string;
}): JSX.Element {
    const title = props.title || defaultProps.title;
    const type = props.type;
    const description = props.desc || defaultProps.desc;
    const ogImgRelativePath = props.imgPath || defaultProps.imgPath;
    const liveDomain = 'https://gourav.io';
    const date = props.date;
    // const siteURL = isProd ? "https://gourav.io" : local;
    const currentDomain = typeof window == 'undefined' ? liveDomain : window.location.origin;
    const ogImageURL = `${liveDomain}${ogImgRelativePath}`;

    // to get url for both fixed and dynamic([slug]) paths
    const relativeURL = usePath();

    const pageURL = relativeURL === '/' ? liveDomain : liveDomain + relativeURL;
    const twitterHandle = '@GorvGoyl';
    const authorName = 'Gourav Goyal';

    return (
        <Head>
            {/* meta tags start */}
            <title>{title}</title>
            <meta
                name="robots"
                content="follow, index"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta
                name="title"
                content={title}
            />
            <meta
                name="description"
                content={description}
            />
            <meta
                property="og:locale"
                content="en_US"
            />
            <meta
                property="og:url"
                content={pageURL}
            />
            <meta
                property="og:type"
                content={type}
            />
            <meta
                property="og:site_name"
                content={authorName}
            />
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:title"
                content={title}
            />
            <meta
                property="og:image"
                name="image"
                content={ogImageURL}
            />
            <meta
                property="twitter:card"
                content="summary_large_image"
            />
            <meta
                property="twitter:site"
                content={twitterHandle}
            />
            <meta
                property="twitter:title"
                content={title}
            />
            <meta
                property="twitter:description"
                content={description}
            />
            <meta
                property="twitter:image"
                content={ogImageURL}
            />
            <meta
                property="twitter:url"
                content={pageURL}
            />
            {date && (
                <meta
                    property="article:published_time"
                    content={date}
                />
            )}
            <meta
                name="author"
                content={authorName}
            />
            <meta
                property="author"
                content={authorName}
            />
            <meta
                property="monetization"
                content="$ilp.uphold.com/QaUmZpmzmDzA"
            />
            <meta
                name="theme-color"
                content="#ffffff"
            />
            <meta
                name="msapplication-TileColor"
                content="#da532c"
            />
            {/* meta tags end */}
            <link
                rel="canonical"
                href={pageURL}
            />
            <link
                rel="icon"
                href={`${currentDomain}/favicon.ico`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={`${currentDomain}/favicon-32x32.png`}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={`${currentDomain}/favicon-16x16.png`}
            />
        </Head>
    );
}
