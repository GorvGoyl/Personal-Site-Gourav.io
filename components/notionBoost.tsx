import { usePath } from "@/hooks/customHooks";
import Link from "next/link";
import {
  ChromeStars,
  ChromeUsers,
  ChromeVersion,
  FirefoxUsers,
  FirefoxVersion,
} from "./badge";
import { A, CopyLink, ShareInlineBtn, TwitterIcon } from "./tags";

enum Page {
  Home = "/notion-boost",
  WhatsNew = "/notion-boost/whats-new",
  AllFeatures = "/notion-boost/#-currently-added-features",
}

export function NavbarNotion(): JSX.Element {
  const page = usePath();
  const relativePath = page === Page.WhatsNew ? "/notion-boost/" : "";
  return (
    <nav
      className={`flex flex-wrap justify-between  ${
        page === Page.WhatsNew ? "mt-5" : ""
      }`}
    >
      <a
        href={`${relativePath}#chrome--brave--chromium`}
        className="break-normal  mr-5"
        title="Download for Chrome/Edge/Brave"
      >
        Chrome / Edge
      </a>
      <a
        href={`${relativePath}#firefox`}
        className="break-normal  mr-5"
        title="Download for Firefox"
      >
        Firefox
      </a>
      {page === Page.Home && (
        <a
          href="#-currently-added-features"
          className="break-normal  mr-5"
          title="View all features"
        >
          Features
        </a>
      )}
      {page === Page.WhatsNew && (
        <Link href={Page.AllFeatures}>
          <a className="break-normal  mr-5" title="View all features">
            Features
          </a>
        </Link>
      )}
      {page === Page.Home && (
        <a
          href="#privacy-policy"
          className="break-normal"
          title="Privacy policy"
        >
          Privacy
        </a>
      )}
      {/* <a
        href="https://github.com/GorvGoyl/Notion-Boost-browser-extension"
        target="_black"
        rel="noopener"
        className="break-normal"
        title="View source code on Github"
      >
        Source code
      </a> */}
    </nav>
  );
}

export const Badges = () => {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <ChromeVersion />

        <ChromeUsers />

        <ChromeStars />

        <FirefoxVersion />

        <FirefoxUsers />
      </div>
    </>
  );
};

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
              className="no-underline hover:no-underline inline-flex items-center"
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

export function TagDate(props: { children: any }): JSX.Element {
  return (
    <sup className="bg-gray-200 text-gray-500 px-1 rounded">
      {props.children}
    </sup>
  );
}

export function Social(): JSX.Element {
  // 👍 Liked this extension? express your love by rating [★★★★★](https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd) on chrome/firefox store.
  const pathName = usePath();
  return (
    <div>
      {pathName === Page.WhatsNew && (
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
            </span>
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
            ,{" or "}
            <span className="font-medium">
              <CopyLink />
            </span>
            .
          </p>

          {/* <p>
            ❓ Missing something?{" "}
            <span>
              <a
                href="https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues"
                target="_blank"
                rel="noopener"
                title="Create Github issue"
              >
                suggest / feedback.
              </a>
            </span>
          </p> */}
        </>
      )}
      <p>
        ❤ Support Notion Boost by rating ★★★★★ on{" "}
        <A
          href="https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd"
          text="Chrome"
          new
          title="Add review on Chrome store"
        />{" "}
        or{" "}
        <A
          href="https://addons.mozilla.org/en-US/firefox/addon/notion-boost/reviews/"
          text="Firefox"
          new
          title="Add review on Firefox store"
        />{" "}
        store
      </p>

      <p>
        🙏 Help others by sharing this project &nbsp; <ShareInlineBtn />
      </p>
      <p>
        👋 Connect with maker behind this project on{" "}
        <span>
          <a
            href="https://twitter.com/GorvGoyl"
            title="Connect with @GorvGoyl on Twitter"
          >
            Twitter
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/gorvgoyl/"
            title="Connect with @GorvGoyl on linkedIn"
          >
            LinkedIn
          </a>
        </span>
      </p>
      <p>
        ✨ Follow{" "}
        <span>
          <a
            href="https://twitter.com/NotionBoost"
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
        for Notion tips, tricks, and free goodies
      </p>
    </div>
  );
}
