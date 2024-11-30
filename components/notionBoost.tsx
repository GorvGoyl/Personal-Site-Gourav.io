import Link from 'next/link';
import { usePath } from '../hooks/customHooks';
import { ChromeStars, ChromeUsers, ChromeVersion, FirefoxUsers, FirefoxVersion } from './badge';
import { CopyLink } from './tags';

const Page = {
    Home: '/notion-boost',
    WhatsNew: '/notion-boost/whats-new',
    AllFeatures: '/notion-boost/#-currently-added-features',
};

export function NavbarNotion(): JSX.Element {
    const page = usePath();
    const relativePath = page === Page.WhatsNew ? '/notion-boost/' : '';
    return (
        <nav className={`flex flex-wrap justify-between ${page === Page.WhatsNew ? 'mt-5' : ''}`}>
            <a
                href={`${relativePath}#chrome--brave--chromium`}
                className="mr-5 break-normal"
                title="Download for Chrome/Edge/Brave">
                Chrome / Edge
            </a>
            <a
                href={`${relativePath}#firefox`}
                className="mr-5 break-normal"
                title="Download for Firefox">
                Firefox
            </a>
            {page === Page.Home && (
                <a
                    href="#-currently-added-features"
                    className="mr-5 break-normal"
                    title="View all features">
                    Features
                </a>
            )}
            {page === Page.WhatsNew && (
                <Link
                    href={Page.AllFeatures}
                    className="mr-5 break-normal"
                    title="View all features">
                    Features
                </Link>
            )}
            {page === Page.Home && (
                <a
                    href="#privacy-policy"
                    className="break-normal"
                    title="Privacy policy">
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

export function Badges() {
    return (
        <div className="flex flex-wrap gap-3">
            <ChromeVersion />

            <ChromeUsers
                id={'eciepnnimnjaojlkcpdpcgbfkpcagahd'}
                link={'https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd'}
            />

            <ChromeStars
                id={'eciepnnimnjaojlkcpdpcgbfkpcagahd'}
                link={'https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd'}
            />

            <FirefoxVersion />

            <FirefoxUsers />
        </div>
    );
}

export function Title(Props: { txt: string; homeURL: string; logo?: string }): JSX.Element {
    return (
        <div className="flex items-start">
            <div className="">
                <div className="">
                    <Link
                        href={Props.homeURL}
                        className="inline-flex items-center no-underline hover:no-underline"
                        title={Props.txt}>
                        {Props.logo && (
                            <img
                                className="m-0 -ml-1 mr-8"
                                width="96"
                                height="96"
                                src={Props.logo}
                                alt={Props.txt}
                            />
                        )}
                        <header>
                            <h1 className="m-0">{Props.txt}</h1>
                        </header>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function TagDate(props: { children: any }): JSX.Element {
    return <sup className="rounded bg-gray-200 px-1 text-gray-500">{props.children}</sup>;
}

export function Social(): JSX.Element {
    // 👍 Liked this extension? express your love by rating [★★★★★](https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd) on chrome/firefox store.
    const pathName = usePath();

    function PatreonLogo() {
        return (
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FA5252"
                    viewBox="0 0 50 50"
                    width="20"
                    height="20">
                    <path d="M15 7H9C8.447 7 8 7.447 8 8v33c0 .553.447 1 1 1h6c.553 0 1-.447 1-1V8C16 7.447 15.553 7 15 7zM31 7A13 13 0 1031 33 13 13 0 1031 7z" />
                </svg>
            </span>
        );
    }

    return (
        <div>
            {pathName === Page.WhatsNew && (
                <>
                    <p>
                        👍 Liked these updates? Share the news on{' '}
                        <span>
                            <a
                                href="https://twitter.com/intent/tweet?url=What%27s%20new%20in%20Notion%20Boost%0A%40NotionBoost%20%20https%3A%2F%2Fgourav.io%2Fnotion-boost%2Fwhats-new"
                                target="_blank"
                                rel="noopener"
                                title="Share on Twitter">
                                Twitter
                                <span />
                            </a>
                        </span>
                        ,
                        <span>
                            {' '}
                            <a
                                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgourav.io%2Fnotion-boost%2Fwhats-new"
                                target="_blank"
                                rel="noopener"
                                title="Share on Facebook">
                                Facebook
                                <span />
                            </a>
                        </span>
                        ,{' or '}
                        <span className="font-medium">
                            <CopyLink />
                        </span>
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
            {/* <p>
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
      </p> */}

            <p className="flex items-center gap-1">
                <span>
                    ❤️ Support my work,{' '}
                    <a
                        target={'_blank'}
                        href="https://www.patreon.com/user?u=86740203">
                        Become my patron
                    </a>
                </span>
                <PatreonLogo />
            </p>

            {/* <div>
        🙏 Help others by sharing this project &nbsp; <ShareInlineBtn />
      </div> */}
            <p>
                👋 Connect with me on{' '}
                <span>
                    <a
                        href="https://twitter.com/GorvGoyl"
                        title="Connect with @GorvGoyl on Twitter">
                        Twitter
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://www.linkedin.com/in/gorvgoyl/"
                        title="Connect with @GorvGoyl on linkedIn">
                        LinkedIn
                    </a>
                </span>
            </p>

            <p>
                🎁 Checkout my other cool projects:{' '}
                <span>
                    <a
                        href="https://gourav.io"
                        title="Gourav's Portfolio">
                        https://gourav.io
                    </a>{' '}
                </span>
            </p>
            {/* <p>
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
      </p> */}
        </div>
    );
}
