import { readableDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import scrollBtnCls from "./css/tags.module.scss";

export function Img(Props: {
  src: string;
  alt?: string;
  caption?: string;
  type?: string;
  className?: string;
}): JSX.Element {
  let cls = "rounded";
  if (Props.type === "ss") cls += " border-2";

  // add any more classes provided by prop
  if (Props.className) {
    cls += Props.className;
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
  return (
    <a href={Props.href} target={target} title={Props.href}>
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

export function TwitterIcon(Props: {
  class?: string;
  title?: string;
}): JSX.Element {
  const defaultCls = "inline w-3 h-3 align-baseline m-0 ml-1";
  const title = Props.title ? Props.title : "@GorvGoyl on twitter";
  const cls = Props.class ? Props.class : defaultCls;
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
            <a className="no-underline font-normal" target="blank">
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

export function ScrollTopBtn(): JSX.Element {
  return (
    <div
      className="scrollBtnCls"
      title="Scroll back to top"
      role="button"
      tabIndex={0}
    >
      ⭡
    </div>
  );
}
