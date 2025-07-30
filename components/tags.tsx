import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { roundUpViewCount } from '../lib/utils';
import { Icon } from './icons';
import { ReadableDate } from './ReadableDate';

export function CopyLink() {
    const [pageURL, setPageURL] = useState('');
    const [isCopied, setCopy] = useState(0);
    useEffect(() => {
        setPageURL(window.location.href);
    }, []);

    const handleCopy = (e: any) => {
        e.preventDefault();
        void navigator.clipboard.writeText(pageURL);
        setCopy(1);
        setTimeout(() => {
            setCopy(0);
        }, 1000);
    };

    return (
        <button
            onClick={handleCopy}
            title={pageURL}
            // onBlur={handleBlur}
            className="cursor-pointer underline outline-none"
            style={{ fontWeight: 'inherit' }}
            type="button">
            {/* <Icon type={TYPE.link} size="16" className="m-0 mr-4" /> */}
            {isCopied === 0 ? <span>Copy link</span> : <span>Copied</span>}
        </button>
    );
}

export function Video(props: { src: string; className?: string; disableZoom?: boolean }) {
    let cls = '';
    cls += ' border-solid border-gray-300 shadow border mx-auto';
    // add any more classes provided by prop
    if (props.className) {
        cls = `${cls} ${props.className}`;
    }

    let VideoTag = (
        <video
            src={props.src}
            className={cls}
            controls={props.disableZoom === true}
            autoPlay={true}
            muted={true}
            loop={true}
        />
    );
    if (!props.disableZoom) {
        VideoTag = <Zoom>{VideoTag}</Zoom>;
    }
    return VideoTag;
}

export function Img(props: {
    src: string;
    alt?: string;
    caption?: string;
    type: string;
    className?: string;
    disableZoom?: boolean;
    loading?: 'lazy' | 'eager'; // lazy loading
}) {
    let cls = '';
    if (props.type === 'ss') {
        cls += ' rounded border-solid border-gray-300 border mx-auto text-center shadow';
    }
    if (props.type === 'badge') {
        cls += 'm-0 inline mx-2';
    }

    // add any more classes provided by prop
    if (props.className) {
        cls = `${cls} ${props.className}`;
    }

    // set alt text from alt or caption
    const altText = props.alt ? props.alt : props.caption;

    let imgTag = (
        <img
            src={props.src}
            alt={altText}
            loading={props.loading}
            className={cls}
        />
    );

    if (!props.disableZoom) {
        // imgTag = <Zoom wrapStyle={{ display: "flex" }}>{imgTag}</Zoom>; //display: "flex" to center align image
        imgTag = <Zoom>{imgTag}</Zoom>; //display: "flex" to center align image
    }

    if (props.caption) {
        return (
            <figure className={props.type === 'ss' ? 'text-center' : undefined}>
                {imgTag}
                <figcaption className="-mt-4 text-center">{props.caption}</figcaption>
            </figure>
        );
    }
    return imgTag;
}

export function A(Props: { href: string; text: string; new: boolean; title?: string }) {
    const target = Props.new ? '_blank' : '';
    const title = Props.title ? Props.title : Props.href;
    return (
        <a
            href={Props.href}
            rel="noopener"
            target={target}
            title={title}>
            {Props.text}
        </a>
    );
}

function openWindowHandler(url: string, title: string, style: string) {
    const popup = window.open(url, title, style);

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = url;
    }
}
export function ShareButton(props: { children: any; position: 'top' | 'bottom' }) {
    const [isPopupShown, setPopup] = useState(false);
    const [isCopied, setCopy] = useState(0);
    const [pageURL, setPageURL] = useState('');
    const [isNativeShare, setNativeShare] = useState(false);
    const shareMenuRef = useRef(null);
    const shareBtnRef = useRef(null);
    useEffect(() => {
        setPageURL(window.location.href);
        if (typeof navigator.share === 'function') {
            setNativeShare(true);
        }
    }, []);

    function handleClickOutside(e: any) {
        if (
            shareMenuRef.current &&
            !(shareMenuRef.current as HTMLElement).contains(e.target) &&
            shareBtnRef.current &&
            !(shareBtnRef.current as HTMLElement).contains(e.target)
        ) {
            document.removeEventListener('click', handleClickOutside);
            setPopup(false);
        }
    }

    const toggleShareMenuHandler = (e: any) => {
        if (!isPopupShown) {
            setCopy(0);
            document.addEventListener('click', handleClickOutside);
            setPopup(true);
        } else {
            document.removeEventListener('click', handleClickOutside);
            setPopup(false);
        }
    };

    const handleCopy = (e: any) => {
        e.preventDefault();
        void navigator.clipboard.writeText(pageURL);
        setCopy(1);
    };

    return (
        <>
            <div>
                <a
                    ref={shareBtnRef}
                    className="inline-block select-none font-normal no-underline outline-none hover:no-underline"
                    title="Share"
                    tabIndex={0}
                    role="button"
                    onClick={toggleShareMenuHandler}
                    // onBlur={handleBlur}
                >
                    {props.children}
                </a>
            </div>
            <div
                className={` ${isPopupShown ? 'absolute' : 'hidden'} ${
                    props.position === 'bottom' && '!bottom-[-190px]'
                } bottom-full z-50 origin-top-right rounded border border-gray-300 bg-white shadow focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                ref={shareMenuRef}>
                <div
                    className="py-1"
                    role="none">
                    <button
                        // onBlur={handleBlur}
                        className="flex w-full items-center px-4 py-2 no-underline outline-none hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            openWindowHandler(
                                `https://twitter.com/intent/tweet?text=${document.title} - by @GorvGoyl&url=${pageURL}`,
                                'twitter-share',
                                'width=550,height=626',
                            );
                        }}>
                        <Icon
                            type={'twitter'}
                            size="16"
                            className="m-0 mr-4"
                        />
                        Twitter
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            openWindowHandler(
                                `https://www.linkedin.com/shareArticle?url=${pageURL}&title=${document.title}&mini=true&source=Gourav-Goyal`,
                                'linkedin-share-dialog',
                                'width=626,height=626',
                            );
                        }}
                        className="flex w-full items-center px-4 py-2 no-underline outline-none hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        type="button">
                        <Icon
                            type={'linkedin'}
                            size="16"
                            className="m-0 mr-4"
                        />
                        LinkedIn
                    </button>
                    {/* <button
            onClick={(e) => {
              e.preventDefault();
              openWindowHandler(
                `https://www.facebook.com/sharer/sharer.php?u=${pageURL}`,
                "facebook-share-dialog",
                "width=626,height=626"
              );
            }}
            className="flex items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            type="button"
          >
            <Icon type={TYPE.facebook} size="16" className="m-0 mr-4" />
            Facebook
          </button> */}
                    <button
                        onClick={handleCopy}
                        title={pageURL}
                        // onBlur={handleBlur}
                        className="flex w-full items-center px-4 py-2 no-underline outline-none hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        type="button">
                        <Icon
                            type={'link'}
                            size="16"
                            className="m-0 mr-4"
                        />
                        <span className="whitespace-nowrap">{isCopied === 0 ? 'Copy link' : 'Copied'}</span>
                    </button>
                    {isNativeShare && (
                        <button
                            type="button"
                            // onBlur={handleBlur}
                            onClick={() => {
                                void navigator.share({
                                    title: document.title,
                                    url: pageURL,
                                });
                            }}
                            className="flex w-full items-center px-4 py-2 no-underline outline-none hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem">
                            <Icon
                                type={'link'}
                                size="16"
                                className="invisible m-0 mr-4"
                            />
                            More...
                        </button>
                    )}
                </div>
            </div>
        </>

        // <div className="flex justify-center my-8">

        // </div>
    );
}

export function ShareComponent() {
    return (
        <div className="relative my-12 flex justify-center">
            <ShareButton position="top">
                <>
                    <Icon
                        type={'share'}
                        className="mx-auto"
                        size="26"
                    />
                    Share
                </>
            </ShareButton>
        </div>
    );
}

export function TwitterIcon(Props: { class?: string; title?: string }) {
    const defaultCls = 'inline w-3 h-3 align-baseline m-0 ml-1';
    const title = Props.title ?? '@GorvGoyl on twitter';
    const cls = Props.class ?? defaultCls;
    return (
        <img
            src="/twitter.svg"
            className={cls}
            width=""
            alt={title}
        />
    );
}
export function AuthorImg() {
    return (
        <div className="flex items-center text-base">
            <Link href="/">
                <img
                    className="my-3 mr-3 w-20 rounded-full"
                    src="/gourav_min_400.png"
                    alt="Gourav Goyal"
                />
            </Link>
            <div className="">
                <p className="m-0 text-[17px] font-medium tracking-normal text-gray-700">Gourav Goyal</p>
                <div className="text-[13px] text-gray-700">
                    <a
                        title="Connect with @GorvGoyl on Twitter"
                        className="hover:orange-underline font-normal text-current no-underline"
                        href="https://twitter.com/GorvGoyl"
                        rel="noopener"
                        target="blank">
                        Twitter
                    </a>
                    {' · '}
                    <a
                        title="Connect with @GorvGoyl on linkedIn"
                        className="hover:orange-underline font-normal text-current no-underline"
                        href="https://www.linkedin.com/in/gorvgoyl"
                        rel="noopener"
                        target="blank">
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
}
export function Author(props: { date: string | null; views: string }) {
    const dateHover = `${props.date ? 'Published date: ' + props.date : ''}`;
    return (
        <div className="flex items-center justify-between text-base">
            <AuthorImg />
            <div className="flex flex-col space-y-1 text-sm text-gray-500">
                {props.views && (
                    <div
                        className="flex items-center space-x-3 text-sm text-gray-500"
                        title={`Total views: ${props.views}`}>
                        <Icon
                            type="views"
                            size="15"
                        />
                        <p className="m-0">{roundUpViewCount(props.views)}</p>
                    </div>
                )}
                <div
                    className="flex items-center space-x-3 text-sm text-gray-500"
                    title={dateHover}>
                    <Icon
                        type={'calendar'}
                        size="14"
                    />
                    {props.date && <p className="m-0">{<ReadableDate date={props.date} />}</p>}
                </div>

                <div className="relative">
                    <ShareButton position="top">
                        <div
                            title="See options to share"
                            className="flex items-center space-x-3 text-sm text-gray-500">
                            <Icon
                                type={'share'}
                                className="stroke-current"
                                size="14"
                            />
                            <p className="hover:orange-underline m-0 no-underline">Share</p>
                        </div>
                    </ShareButton>
                </div>
                {/* <div className="text-gray-500 flex items-center space-x-3 text-sm">
          <ShareIcon />
        </div> */}
            </div>
        </div>
    );
}

export function ShareInlineBtn() {
    function Arrow() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        );
    }

    return (
        <div className="relative inline-block">
            <ShareButton position="bottom">
                <div
                    title="See options to share"
                    className="flex items-center space-x-1 rounded border border-gray-400 px-1 text-sm hover:bg-gray-100 hover:opacity-80">
                    <div>Share</div>
                    <Arrow />
                    {/* <Icon type={"share"} className="stroke-current" size="14" /> */}
                </div>
            </ShareButton>
        </div>
    );
}

export function ShareLink() {
    return (
        <div className="relative">
            <ShareButton position="bottom">
                <div
                    title="See options to share"
                    className="flex items-center space-x-1">
                    <div className="mr-1 font-medium underline">Share</div>♥
                </div>
            </ShareButton>
        </div>
    );
}
