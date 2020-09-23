import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header title="Gourav Goyal" />
      <main className=" my-20 mx-auto max-w-screen-md">
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
              <Link href="https://twitter.com/GorvGoyl">
                <a target="blank">@GorvGoyl</a>
              </Link>
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
              community.
            </p>
            <div>
              <h2>Side Projects</h2>
              <ul>
                <li>
                  <p>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar">
                      <a target="blank">Shortcut Menubar</a>
                    </Link>{" "}
                    VSCode Extension <br />
                    Add useful buttons like beautify, open files, undo, redo,
                    etc to the editor in Visual Studio Code.
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="https://chrome.google.com/webstore/detail/popup-notes/pakngoacmndjaomplokegbepmohpfofb?hl=en">
                      <a target="blank">Popup Notes</a>
                    </Link>{" "}
                    Chrome Extension <br />
                    Lightweight extension to take quick notes without leaving
                    current tab.
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="https://Gourav.io">
                      <a target="blank">Material Design Portfolio</a>
                    </Link>{" "}
                    <br />
                    My old portfolio site built around material guidelines &
                    responsiveness without using any css framework.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="twitter mt-12">
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
          </div>
        </div>
      </main>

      <footer />
    </div>
  );
}
