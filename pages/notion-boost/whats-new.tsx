import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header
        title="Notion Boost - What's new?"
        desc="Browser extension to make Notion more productive"
        imgPath="/nb-meta.png"
      />
      <main className="py-20 px-5 mx-auto max-w-screen-md">
        <div className="prose prose-lg">
          <div className="flex items-start">
            <div className="">
              <div className="flex items-center">
                <img
                  className="w-24 m-0 mr-8"
                  src="/nb.svg"
                  alt="Notion Boost"
                />
                <h1 className="m-0">Notion Boost</h1>
              </div>
              <p className="lead">
                Browser extension to make Notion more productive
              </p>
              <nav className="flex space-x-12">
                <a
                  href="https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd"
                  target="_black"
                  title="Download for Chrome"
                >
                  Chrome
                </a>
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/notion-boost/"
                  target="_black"
                  title="Download for Firefox"
                >
                  Firefox
                </a>
                <a
                  href="https://github.com/GorvGoyl/Notion-Boost-browser-extension#-currently-added-features"
                  target="_black"
                  title="View all features"
                >
                  Features
                </a>
                <a
                  href="https://github.com/GorvGoyl/Notion-Boost-browser-extension"
                  target="_black"
                  title="View source code on Github"
                >
                  Source code
                </a>
              </nav>
            </div>
          </div>

          <div className="">
            <h2>What's new in v1.6</h2>
            Added 3 new features 🎉 <br />
            <ul>
              <li>
                'Scroll to top' button: <br />
                Added button at the bottom-right corner of page for scrolling
                back to top. Quite useful for lengthy pages. The button will be
                visible only when the page has scrolled down a bit.
              </li>
              <li>
                Close Slash command menu after space: <br />
                Slash command menu which appears when pressing '/' key will be
                closed back by pressing the space key.
              </li>
              <li>
                Don't show Slash command menu when pressing '/': <br />
                Don't show the Slash command menu when pressing '/' key. Slash
                command menu will still be shown by clicking + ⁝⁝ icon. This
                setting can't be enabled along with 'Close Slash command menu
                after space' and vice-versa.
              </li>
              <li>
                Fixed bug where the outline wasn't visible for 2 column
                headings.
              </li>
            </ul>
            <hr />
            <div>
              <p>
                Like these updates? Share the news:{" "}
                <span>
                  <a
                    href="https://twitter.com/intent/tweet?url=What%27s%20new%20in%20Notion%20Boost%0A%40NotionBoost%20%20https%3A%2F%2Fgourav.io%2Fnotion-boost%2Fwhats-new"
                    target="_blank"
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
                    title="Share on Facebook"
                  >
                    Facebook
                    <span />
                  </a>
                </span>
              </p>
              <p>
                Missing any feature? Suggest here:{" "}
                <span>
                  <a
                    href="https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues/"
                    target="_blank"
                    title="Create Github issue"
                  >
                    Github
                  </a>
                </span>
              </p>
              <p>
                Follow{" "}
                <span>
                  <a
                    href="https://twitter.com/intent/follow?user_id=1312809481240154112"
                    target="_blank"
                    title="Follow @NotionBoost on Twitter"
                  >
                    @NotionBoost
                    <img
                      src="/twitter.svg"
                      className="inline w-4 m-0 ml-1"
                      width=""
                      alt=""
                    />
                  </a>
                </span>{" "}
                for upcoming features and other Notion tips.
              </p>
              <p>
                Follow the maker behind this extension:{" "}
                <span>
                  <a
                    href="https://twitter.com/intent/follow?user_id=325435736"
                    target="_blank"
                    title="Follow @GorvGoyl on Twitter"
                  >
                    @GorvGoyl
                    <img
                      src="/twitter.svg"
                      className="inline w-4 m-0 ml-1"
                      width=""
                      alt=""
                    />
                  </a>
                </span>
              </p>
            </div>
            <hr />
            <h2>Previous updates</h2>
            <div>
              <h3>v1.5</h3>

              <ul>
                <li>
                  Small text & Full width for all pages: <br />
                  Option to set small text and full width for all pages by
                  default. This locally adjusts the text and width without
                  clicking on the Notion page toggles. So no page change is
                  saved to the server.
                </li>
                <li>
                  Hide comments section from all pages. Useful when working
                  solo.
                </li>
              </ul>
            </div>
            <div>
              <h3>v1.0</h3>
              Birth of this extension 🐣
              <ul>
                <li>
                  Show Outline: <br />
                  Show sticky outline (table of contents) for pages that have
                  headings or sub-headings. The outline will be shown on the
                  right side of the page. Very useful for navigating a page with
                  lots of content.
                </li>
                <li>
                  Hide floating help button from all pages. This button is
                  located on the bottom-right corner of pages.
                </li>
                <li>
                  Bolder text in dark mode: <br />
                  Fix poorly recognizable bold text when using Notion in dark
                  mode
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer />
    </div>
  );
}
