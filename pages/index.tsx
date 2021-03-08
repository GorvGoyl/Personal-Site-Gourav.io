import Link from "next/link";
import Header from "@/components/Header";
import { Container } from "@/components/layout";
import { TwitterIcon } from "@/components/tags";
import { TwitterBtn } from "@/components/blocks";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header />
      <Container>
        <div>
          <div className="flex items-center mb-10">
            <img
              className="w-32 rounded-full mr-8"
              src="/gourav.png"
              alt="Gourav Goyal"
            />
            <div className="prose prose-lg">
              <h1 className="">Gourav Goyal</h1>
              <nav className="flex space-x-14">
                <Link href="https://twitter.com/GorvGoyl">
                  <a target="blank" title="Follow @GorvGoyl on Twitter">
                    GorvGoyl
                    <TwitterIcon class="inline w-4 h-4 m-0 ml-1" />
                  </a>
                </Link>
                <Link href="/blog">
                  <a title="Blog">Blog</a>
                </Link>
                {/* <Link href="/about">
                <a>About Me</a>
              </Link> */}
              </nav>
            </div>
          </div>

          <div className="prose prose-lg">
            <p>
              Namaste, My name is Gourav Goyal. I'm a tech founder, full-stack
              developer, and a fun guy to hang around with. For the past 6
              years, I've been building products that are being used by
              thousands of people. I love to build new products, create great
              user experiences, and contribute to the open-source software
              community. I welcome opportunities at hey@gourav.io
            </p>
            <div>
              <h2>Projects</h2>
              <ul>
                <li>
                  <p>
                    <Link href="/notion-boost">
                      <a title="Notion Boost browser extension">Notion Boost</a>
                    </Link>
                    <span className="badge-wrapper">
                      <a
                        title="source code"
                        href="https://github.com/GorvGoyl/Notion-Boost-browser-extension"
                        target="_blank"
                      >
                        <img
                          alt="source code"
                          src="https://img.shields.io/static/v1?label=&message=code&logo=github&style=flat-square&color=555555"
                        />
                      </a>
                      <img
                        alt="Chrome Web Store downloads"
                        src="https://img.shields.io/chrome-web-store/users/eciepnnimnjaojlkcpdpcgbfkpcagahd?label=downloads&style=flat-square"
                      />
                      <img
                        alt="Chrome Web Store rating"
                        src="https://img.shields.io/chrome-web-store/stars/eciepnnimnjaojlkcpdpcgbfkpcagahd?style=flat-square"
                      />
                    </span>
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
                    </a>
                    <span className="badge-wrapper">
                      <a
                        title="source code"
                        href="https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension"
                        target="_blank"
                      >
                        <img
                          alt="source code"
                          src="https://img.shields.io/static/v1?label=&message=code&logo=github&style=flat-square&color=555555"
                        />
                      </a>
                      <img
                        alt="Visual Studio Marketplace Downloads"
                        src="https://img.shields.io/visual-studio-marketplace/d/jerrygoyal.shortcut-menu-bar?style=flat-square"
                      />
                      <img
                        alt="Visual Studio Marketplace Rating (Stars)"
                        src="https://img.shields.io/visual-studio-marketplace/stars/jerrygoyal.shortcut-menu-bar?style=flat-square"
                      />
                    </span>
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
                <li>
                  <p>
                    <Link href="/clone-wars">
                      <a title="Clone Wars">Clone Wars</a>
                    </Link>
                    <br />
                    List of 70+ open-source clones of sites like Airbnb,
                    Spotify, Tiktok, Netflix, etc.
                  </p>
                </li>
              </ul>
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
        <TwitterBtn />
      </Container>
    </div>
  );
}
