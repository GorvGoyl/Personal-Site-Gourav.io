/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readableDate } from "@/lib/utils";
import { Icon, TYPE } from "@/components/icons";
import Link from "next/link";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

export function Img(Props: {
  src: string;
  alt?: string;
  caption?: string;
  type: string;
  className?: string;
}): JSX.Element {
  let cls = "";
  if (Props.type === "ss") cls += "rounded border-2 mx-auto";
  if (Props.type === "badge") cls += "m-0 inline mx-2";

  // add any more classes provided by prop
  if (Props.className) {
    cls = `${cls} ${Props.className}`;
  }

  // set alt text from alt or caption
  const altText = Props.alt ? Props.alt : Props.caption;

  const imgTag = <img src={Props.src} alt={altText} className={cls} />;

  if (Props.caption) {
    return (
      <figure>
        {imgTag}
        <figcaption className="text-center">{Props.caption}</figcaption>
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
    <div className="text-gray-500">
      <p>{date}</p>
    </div>
  );
}

function openWindowHandler(url: string, title: string, style: string) {
  const popup = window.open(url, title, style);

  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    window.location.href = url;
  }
}
export function ShareIcon(): JSX.Element {
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
    <div className="relative flex justify-center my-8">
      <div>
        <a
          ref={shareBtnRef}
          className="outline-none no-underline font-normal inline-block"
          title="Share"
          tabIndex={0}
          role="button"
          onClick={toggleShareMenuHandler}
          // onBlur={handleBlur}
        >
          <img
            src="/share.svg"
            className="mx-auto m-0"
            width="30"
            height="30"
            alt="Share"
          />
          Share
        </a>
      </div>
      <div
        className={` ${
          isPopupShown ? "absolute" : "hidden"
        } bg-white bottom-16 focus:outline-none origin-top-right  ring-1 ring-black ring-opacity-5 rounded-md shadow-lg`}
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
                `https://twitter.com/intent/tweet?text=${document.title} - @GorvGoyl&url=${pageURL}`,
                "twitter-share",
                "width=550,height=626"
              );
            }}
          >
            <Icon type={TYPE.twitter} size="16" className="m-0 mr-4" />
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
            <Icon type={TYPE.linkedin} size="16" className="m-0 mr-4" />
            LinkedIn
          </button>
          <button
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
          </button>
          <button
            onClick={handleCopy}
            title={pageURL}
            // onBlur={handleBlur}
            className="flex items-center w-full no-underline outline-none px-4 py-2   hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            type="button"
          >
            <Icon type={TYPE.link} size="16" className="m-0 mr-4" />
            {isCopied === 0 ? "Copy link" : "Copied"}
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
              <Icon type={TYPE.link} size="16" className="invisible m-0 mr-4" />
              More...
            </button>
          )}
        </div>
      </div>
    </div>

    // <div className="flex justify-center my-8">

    // </div>
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
      <img
        className="w-14 rounded-full mr-4 my-3"
        src="/gourav.png"
        alt="Gourav Goyal"
      />
      <div className="">
        <p className="m-0 font-medium">Gourav Goyal</p>
        <div className="">
          <Link href="https://twitter.com/GorvGoyl">
            <a className="font-normal" rel="noopener" target="blank">
              GorvGoyl
              <TwitterIcon class="inline w-3 h-3 align-baseline m-0 ml-1" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export function Author(Props: { date: string }): JSX.Element {
  const date = readableDate(Props.date);
  return (
    <div className="flex items-center justify-between text-base">
      <AuthorImg />
      <Date date={Props.date} />
    </div>
  );
}
