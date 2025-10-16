import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { BannerChromeExtension } from '../components/banner';
import Header from '../components/Header';
import { Icon } from '../components/icons';
import { Container, LayoutType } from '../components/layout';
import { Navbar } from '../components/navbar';
import { ReadableDate } from '../components/ReadableDate';
import { TwitterBtn } from '../components/twitterBtn';
import { getAllPublishedAndPreviewPostsFrontmatterFromNotion } from '../lib/notionUtils';
import type { FrontmatterBlogpost } from '../types/types';

const RELATIVE_PATH = '/blog/';

export default function Blog(props: { allPosts: FrontmatterBlogpost[] }) {
    return (
        <>
            <Header
                type="website"
                title="Blog - Gourav Goyal"
            />

            <Container layout={LayoutType.Blog}>
                <BannerChromeExtension />
                <Navbar />
                <main className="prose prose-lg">
                    <header>
                        <h2>Blog</h2>
                    </header>
                    <div className="flex flex-col space-y-11">
                        {props.allPosts.map((post) => {
                            return (
                                <div
                                    className="flex flex-col space-x-0 space-y-2 md:flex-row md:justify-between md:space-x-2 md:space-y-0"
                                    key={post.slug}>
                                    <div>
                                        <article>
                                            <Link
                                                href={`${RELATIVE_PATH}${post.slug}`}
                                                className="hover:orange-underline no-underline">
                                                <h5 className="my-0 leading-normal">{post.title}</h5>
                                            </Link>
                                        </article>
                                    </div>
                                    <div className="flex items-center justify-end space-x-2 text-xs font-medium text-gray-500">
                                        <div
                                            className="flex items-center"
                                            title={`${post.date ? 'Published date: ' + post.date : ''}`}>
                                            <Icon
                                                type="calendar"
                                                size="11"
                                                // className="inline-block"
                                            />

                                            {post.date && (
                                                <div className="ml-2 whitespace-nowrap">
                                                    <ReadableDate date={post.date} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* <SubscribeForm type={FORMTYPE.Slim} /> */}
                    {/* <div className="mt-20">
                        <SubstackForm />
                    </div> */}
                </main>
            </Container>
            <TwitterBtn />
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const previewAndPublishedPostsMatter = await getAllPublishedAndPreviewPostsFrontmatterFromNotion();
    const publishedPostsMatter = previewAndPublishedPostsMatter.filter((x) => {
        return x.published && x.date && x.date <= new Date().toISOString();
    });
    return {
        props: { allPosts: publishedPostsMatter },
    };
};
