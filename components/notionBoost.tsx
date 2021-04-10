import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TwitterIcon, A } from "./tags";

enum Page {
  Home = "/notion-boost",
  WhatsNew = "/notion-boost/whats-new",
  AllFeatures = "/notion-boost/#-currently-added-features",
}

export function NavbarNotion(): JSX.Element {
  const page = useRouter().pathname;
  return (
    <nav
      className={`flex justify-between  ${
        page === Page.WhatsNew ? "mt-5" : ""
      }`}
    >
      <a
        href="https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd"
        target="_black"
        rel="noopener"
        title="Download for Chrome"
      >
        Chrome
      </a>
      <a
        href="https://addons.mozilla.org/en-US/firefox/addon/notion-boost/"
        target="_black"
        rel="noopener"
        title="Download for Firefox"
      >
        Firefox
      </a>
      {page === Page.Home && (
        <a href="#-currently-added-features" title="View all features">
          All features
        </a>
      )}
      {page === Page.WhatsNew && (
        <Link href={Page.AllFeatures}>
          <a title="View all features">All features</a>
        </Link>
      )}
      <a
        href="https://github.com/GorvGoyl/Notion-Boost-browser-extension"
        target="_black"
        rel="noopener"
        title="View source code on Github"
      >
        Source code
      </a>
    </nav>
  );
}

export function Title(Props: {
  txt: string;
  homeURL: string;
  logo?: string;
}): JSX.Element {
  return (
    <div className="flex items-start">
      <div className="">
        <div className="">
          <Link href={Props.homeURL}>
            <a
              className="no-underline inline-flex items-center"
              title={Props.txt}
            >
              {Props.logo && (
                <img
                  className="m-0 mr-8 -ml-1"
                  width="96"
                  height="96"
                  src={Props.logo}
                  alt={Props.txt}
                />
              )}
              <header>
                <h1 className="m-0">{Props.txt}</h1>
              </header>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export function Social(): JSX.Element {
  // console.log(`useRouter().pathname: ${useRouter().basePath}`);
  // 👍 Liked this extension? express your love by rating [★★★★★](https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd) on chrome/firefox store.
  return (
    <div>
      {useRouter().pathname === Page.WhatsNew && (
        <>
          <p>
            👍 Liked these updates? Share the news on{" "}
            <span>
              <a
                href="https://twitter.com/intent/tweet?url=What%27s%20new%20in%20Notion%20Boost%0A%40NotionBoost%20%20https%3A%2F%2Fgourav.io%2Fnotion-boost%2Fwhats-new"
                target="_blank"
                rel="noopener"
                title="Share on Twitter"
              >
                Twitter
                <span />
              </a>
            </span>{" "}
            ,
            <span>
              {" "}
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgourav.io%2Fnotion-boost%2Fwhats-new"
                target="_blank"
                rel="noopener"
                title="Share on Facebook"
              >
                Facebook
                <span />
              </a>
            </span>
          </p>
          <p>
            ❤ Support Notion Boost by rating{" "}
            <A
              href="https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd"
              text="★★★★★"
              new
              title="Add review"
            />{" "}
            on Chrome/Firefox store.
          </p>
          <p>
            ❓ Missing any feature? Suggest on{" "}
            <span>
              <a
                href="https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues/new"
                target="_blank"
                rel="noopener"
                title="Create Github issue"
              >
                Github
              </a>
            </span>
          </p>
        </>
      )}
      <p>
        ✨ Follow{" "}
        <span>
          <a
            href="https://twitter.com/intent/follow?user_id=1312809481240154112"
            target="_blank"
            rel="noopener"
            title="Follow @NotionBoost on Twitter"
          >
            NotionBoost
            <TwitterIcon
              class="inline w-4 h-4 m-0 ml-1 "
              title="@NotionBoost on Twitter"
            />
          </a>
        </span>{" "}
        for upcoming features and other Notion tips & tricks.
      </p>
      <p>
        👨‍💻 Follow the maker behind this extension:{" "}
        <span>
          <a
            href="https://twitter.com/intent/follow?user_id=325435736"
            target="_blank"
            rel="noopener"
            title="Follow @GorvGoyl on Twitter"
          >
            GorvGoyl
            <TwitterIcon class="inline w-4 h-4 m-0 ml-1 " />
          </a>
        </span>
      </p>
    </div>
  );
}
