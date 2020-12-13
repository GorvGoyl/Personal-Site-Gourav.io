import Link from "next/link";
import Header from "@/components/Header";
import { Container } from "@/components/layout";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header />
      <Container>
        <div>
          <div className="flex items-center">
            <img
              className="w-32 rounded-full mr-8"
              src="/gourav.png"
              alt="Gourav Goyal"
            />
            <div className="prose prose-lg">
              <h1 className="">Gourav Goyal</h1>
            </div>
          </div>

          <div className="prose prose-lg">
            <nav className="flex justify-center space-x-20">
              {/* <Link href="https://twitter.com/GorvGoyl">
                <a target="blank">@GorvGoyl</a>
              </Link> */}
              {/* <Link href="/blog">
                <a>Blog</a>
              </Link>
              <Link href="/about">
                <a>About Me</a>
              </Link> */}
            </nav>
            <p>
              Namaste, My name is Gourav Goyal. I'm a tech founder, full-stack
              developer, and a fun guy to hang around with. For the past 6
              years, I've been building products that are being used by
              thousands of people. I love to build new products, create great
              user experiences, and contribute to the open-source software
              community. I welcome opportunities at hey@gourav.io
            </p>
            <div>
              <h2>Side Projects</h2>
              <ul>
                <li>
                  <p>
                    <Link href="/notion-boost">
                      <a title="Notion Boost browser extension">Notion Boost</a>
                    </Link>{" "}
                    <br />
                    Chrome & Firefox browser extension for Notion.so to add
                    features like outline (table of contents), bolder text, and
                    more.
                  </p>
                </li>
                <li>
                  <p>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar"
                      target="blank"
                      title="Shortcut Menubar VSCode extension"
                    >
                      Shortcut Menubar
                    </a>{" "}
                    <br />
                    VSCode Extension which adds useful buttons like beautify,
                    open files, undo, redo, etc to the editor in Visual Studio
                    Code.
                  </p>
                </li>
                <li>
                  <p>
                    <a
                      href="https://chrome.google.com/webstore/detail/popup-notes/pakngoacmndjaomplokegbepmohpfofb?hl=en"
                      target="blank"
                      title="Popup Notes chrome extension"
                    >
                      Popup Notes
                    </a>{" "}
                    <br />
                    Lightweight Chrome extension to take quick notes without
                    leaving current tab.
                  </p>
                </li>
                <li>
                  <p>
                    <a
                      href="https://jerrygoyal-firebase-project.web.app/"
                      target="blank"
                      title="Material design portfolio website"
                    >
                      Portfolio site
                    </a>{" "}
                    <br />
                    My old portfolio site built around material guidelines &
                    responsiveness without using any css framework or library.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="twitter mt-12  justify-center flex">
            <div>
              <a
                href="https://twitter.com/intent/follow?user_id=325435736"
                target="_blank"
                className="twitter-btn"
                title="Follow @GorvGoyl on Twitter"
              >
                <img
                  src="/twitter-light.svg"
                  className="inline w-4 m-0 mr-1"
                  alt="Twitter"
                />
                Follow @GorvGoyl
              </a>
            </div>
          </div>
          {/* disable below twitter widget */}
          {/* <div className="mt-12 justify-center flex">
            <a
              href="https://twitter.com/GorvGoyl?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-size="large"
              data-dnt="true"
              data-show-count="false"
            >
              Follow @GorvGoyl
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            />
          </div> */}
        </div>
      </Container>
    </div>
  );
}
