/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Icon } from "@/components/icons";
import { readableDate, roundUpViewCount } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export function CopyLink(): JSX.Element {
  const [pageURL, setPageURL] = useState("");
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
    <>
      <button
        onClick={handleCopy}
        title={pageURL}
        // onBlur={handleBlur}
        className=" underline outline-none   cursor-pointer"
        style={{ fontWeight: "inherit" }}
        type="button"
      >
        {/* <Icon type={TYPE.link} size="16" className="m-0 mr-4" /> */}
        {isCopied === 0 ? "Copy link" : "Copied"}
      </button>
    </>
  );
}

export function Video(props: {
  src: string;
  className?: string;
  disableZoom?: boolean;
}): JSX.Element {
  let cls = "";
  cls += " border-solid border-gray-300 shadow border mx-auto";
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
}): JSX.Element {
  let cls = "";
  if (props.type === "ss")
    cls +=
      " rounded border-solid border-gray-300 border mx-auto text-center shadow";
  if (props.type === "badge") cls += "m-0 inline mx-2";

  // add any more classes provided by prop
  if (props.className) {
    cls = `${cls} ${props.className}`;
  }

  // set alt text from alt or caption
  const altText = props.alt ? props.alt : props.caption;

  let imgTag = <img src={props.src} alt={altText} className={cls} />;

  if (!props.disableZoom) {
    imgTag = <Zoom wrapStyle={{ display: "flex" }}>{imgTag}</Zoom>; //display: "flex" to center align image
  }

  if (props.caption) {
    return (
      <figure className={props.type === "ss" && "text-center"}>
        {imgTag}
        <figcaption className="text-center -mt-4">{props.caption}</figcaption>
      </figure>
    );
  }
  return imgTag;
}

export function A(Props: {
  href: string;
  text: string;
  new: boolean;
  title?: string;
}): JSX.Element {
  const target = Props.new ? "_blank" : "";
  const title = Props.title ? Props.title : Props.href;
  return (
    <a href={Props.href} rel="noopener" target={target} title={title}>
      {Props.text}
    </a>
  );
}

function Date(Props: { date: string }): JSX.Element {
  const date = readableDate(Props.date);

  return (
    <div className="text-gray-500 flex items-center space-x-3 text-sm">
      <Icon type={"calendar"} size="14" />
      <p className="m-0">{date}</p>
    </div>
  );
}

function openWindowHandler(url: string, title: string, style: string) {
  const popup = window.open(url, title, style);

  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    window.location.href = url;
  }
}
export function ShareButton(props: {
  children: any;
  position: "top" | "bottom";
}): JSX.Element {
  const [isPopupShown, setPopup] = useState(false);
  const [isCopied, setCopy] = useState(0);
  const [pageURL, setPageURL] = useState("");
  const [isNativeShare, setNativeShare] = useState(false);
  const shareMenuRef = useRef(null);
  const shareBtnRef = useRef(null);
  useEffect(() => {
    setPageURL(window.location.href);
    if (navigator.share) {
      setNativeShare(true);
    }
  }, []);

  function handleClickOutside(e: any) {
    if (
      shareMenuRef.current &&
      !shareMenuRef.current.contains(e.target) &&
      shareBtnRef.current &&
      !shareBtnRef.current.contains(e.target)
    ) {
      document.removeEventListener("click", handleClickOutside);
      setPopup(false);
    }
  }

  const toggleShareMenuHandler = (e) => {
    if (!isPopupShown) {
      setCopy(0);
      document.addEventListener("click", handleClickOutside);
      setPopup(true);
    } else {
      document.removeEventListener("click", handleClickOutside);
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
          className="outline-none no-underline font-normal inline-block select-none"
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
        className={` ${isPopupShown ? "absolute" : "hidden"}  ${
          props.position === "bottom" && "!bottom-[-190px] z-50"
        } bg-white bottom-full focus:outline-none origin-top-right border-gray-300 border rounded shadow`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        ref={shareMenuRef}
      >
        <div className="py-1" role="none">
          <button
            // onBlur={handleBlur}
            className="flex items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openWindowHandler(
                `https://twitter.com/intent/tweet?text=${document.title} - by @GorvGoyl&url=${pageURL}`,
                "twitter-share",
                "width=550,height=626"
              );
            }}
          >
            <Icon type={"twitter"} size="16" className="m-0 mr-4" />
            Twitter
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              openWindowHandler(
                `https://www.linkedin.com/shareArticle?url=${pageURL}&title=${document.title}&mini=true&source=Gourav-Goyal`,
                "linkedin-share-dialog",
                "width=626,height=626"
              );
            }}
            className="flex items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            type="button"
          >
            <Icon type={"linkedin"} size="16" className="m-0 mr-4" />
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
            className="flex  items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            type="button"
          >
            <Icon type={"link"} size="16" className="m-0 mr-4" />
            <span className="whitespace-nowrap">
              {isCopied === 0 ? "Copy link" : "Copied"}
            </span>
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
              className="flex items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Icon type={"link"} size="16" className="invisible m-0 mr-4" />
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

export function ShareComponent(): JSX.Element {
  return (
    <div className="relative flex justify-center my-12">
      <ShareButton position="top">
        <>
          <Icon type={"share"} className="mx-auto" size="26" />
          Share
        </>
      </ShareButton>
    </div>
  );
}

export function TwitterIcon(Props: {
  class?: string;
  title?: string;
}): JSX.Element {
  const defaultCls = "inline w-3 h-3 align-baseline m-0 ml-1";
  const title = Props.title ?? "@GorvGoyl on twitter";
  const cls = Props.class ?? defaultCls;
  return <img src="/twitter.svg" className={cls} width="" alt={title} />;
}
export function AuthorImg(): JSX.Element {
  return (
    <div className="flex items-center text-base">
      <Link href="/">
        <a>
          <img
            className="w-14 rounded-full mr-4 my-3"
            src="/gourav.jpg"
            alt="Gourav Goyal"
          />
        </a>
      </Link>
      <div className="">
        <p className="m-0 font-medium text-[17px] tracking-normal text-gray-700">
          Gourav Goyal
        </p>
        <div className="text-gray-700 text-[14px]">
          <a
            title="Connect with @GorvGoyl on Twitter"
            className="no-underline font-normal hover:underline text-current"
            href="https://twitter.com/GorvGoyl"
            rel="noopener"
            target="blank"
          >
            Twitter
          </a>
          {" · "}
          <a
            title="Connect with @GorvGoyl on linkedIn"
            className="no-underline font-normal hover:underline text-current"
            href="https://www.linkedin.com/in/gorvgoyl"
            rel="noopener"
            target="blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
export function Author(props: { date: string; views: string }): JSX.Element {
  const date = readableDate(props.date);
  return (
    <div className="flex items-center justify-between text-base">
      <AuthorImg />
      <div className="flex flex-col text-gray-500 text-sm space-y-1">
        {props.views && (
          <div
            className="text-gray-500 flex items-center space-x-3 text-sm"
            title={`Total views: ${props.views}`}
          >
            <Icon type="views" size="15" />
            <p className="m-0">{roundUpViewCount(props.views)}</p>
          </div>
        )}
        <div
          className="text-gray-500 flex items-center space-x-3 text-sm"
          title={`Published date: ${props.date}`}
        >
          <Icon type={"calendar"} size="14" />
          <p className="m-0">{date}</p>
        </div>

        <div className="relative">
          <ShareButton position="top">
            <div
              title="See options to share"
              className="text-gray-500 flex items-center space-x-3 text-sm"
            >
              <Icon type={"share"} className="stroke-current" size="14" />
              <p className="m-0 no-underline hover:underline">Share</p>
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
  const Arrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <>
      <div className="relative inline-block">
        <ShareButton position="bottom">
          <div
            title="See options to share"
            className=" flex items-center space-x-1 border px-1 rounded border-gray-400 hover:bg-gray-100 hover:opacity-80"
          >
            <div>Share</div>
            <Arrow />
            {/* <Icon type={"share"} className="stroke-current" size="14" /> */}
          </div>
        </ShareButton>
      </div>
    </>
  );
}

export function ShareLink() {
  return (
    <>
      <div className="relative">
        <ShareButton position="bottom">
          <div
            title="See options to share"
            className=" flex items-center space-x-1 "
          >
            <div className="underline mr-1 font-medium">Share</div>♥
          </div>
        </ShareButton>
      </div>
    </>
  );
}
