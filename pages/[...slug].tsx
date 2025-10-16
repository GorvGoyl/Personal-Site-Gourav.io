import { getMDXComponent } from 'mdx-bundler/client';
import type { GetStaticPaths } from 'next';
import { join } from 'path';
import { useEffect, useMemo } from 'react';
import { BannerChromeExtension } from '../components/banner';
import Header from '../components/Header';
import { Container, LayoutType } from '../components/layout';
import MDXComponents from '../components/mdxComponents';
import { Links, Navbar } from '../components/navbar';
import { ScrollTopBtn } from '../components/scrollTop';
import { AuthorImg, ShareComponent } from '../components/tags';
import project from '../layouts/css/project.module.scss';
import { getMdPostSlugs, getPost } from '../lib/localContentUtils';
import { initOutlinePosition } from '../lib/mdx';
import md from '../styles/md.module.scss';
import type { FrontmatterProject } from '../types/types';

export default function Project(props: { matter: FrontmatterProject; source: string }) {
    const MDX = useMemo(() => {
        return getMDXComponent(props.source);
    }, [props.source]);

    useEffect(() => {
        const controller = initOutlinePosition();

        // remove eventlistener
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <Header
                type="website"
                title={props.matter.title}
                desc={props.matter.desc}
                imgPath={props.matter.ogImgURL}
            />

            <Container layout={LayoutType.Blog}>
                <BannerChromeExtension />
                <Navbar link={Links.Blog} />
                <main className="prose mx-auto max-w-screen-md">
                    <article className={`${project.css} ${md.css}`}>
                        <MDX components={MDXComponents as any} />
                    </article>
                    <ShareComponent />
                    <hr className="mb-8" />
                    {/* <SubscribeForm type={FORMTYPE.Generic} /> */}
                </main>
                <ScrollTopBtn />
            </Container>
            <div className="flex justify-center">
                <AuthorImg />
            </div>
        </>
    );
}

export const getStaticProps = async (props: Path) => {
    const slugArr = props.params.slug;
    const slug = slugArr.join('/');
    const mdRelativeDir = `content/projects/${slug}`;

    const mdFileName = 'index.md';

    // store all images (including og image) to the base markdown folder even in case of md sub-folders
    const imgOutputRelativeDir = `/projects/${slugArr[0]}`;

    const { matter, source } = await getPost(mdRelativeDir, mdFileName, imgOutputRelativeDir);

    return {
        props: {
            matter: matter,
            source: source,
        },
    };
};

type Path = {
    params: {
        slug: string[]; //should be same as filename i.e. [...slug]
    };
};
export const getStaticPaths: GetStaticPaths = () => {
    const postsDirectory = join(process.cwd(), 'content', 'projects');

    const slugsArr = getMdPostSlugs(postsDirectory);

    const paths = [] as Path[];

    for (const slug of slugsArr) {
        paths.push({
            params: {
                slug: slug,
            },
        });
    }

    return {
        paths,
        fallback: false,
    };
};
