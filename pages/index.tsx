import { ChromeStars, ChromeUsers } from "@/components/badge";
import { TwitterBtn } from "@/components/twitterBtn";
import Header from "@/components/Header";
import { Container } from "@/components/layout";
import { FORMTYPE, SubscribeForm } from "@/components/subscribe";
import { TwitterIcon } from "@/components/tags";
// import author from "@/public/gourav.jpg";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div>
      <Header type="website" />
      <Container>
        <div>
          <div className="flex items-center mb-10">
            <img
              className="rounded-full mr-2 md:mr-8"
              width="180"
              height="180"
              src="/gourav_min_400.png"
              alt="Gourav Goyal"
            />
            <div className="prose prose-lg">
              <Link href="/">
                <a title="Homepage" className="no-underline hover:no-underline">
                  <h1
                    className="bg-clip-text text-transparent pb-3 mb-4 tracking-wide font-bold text-3xl md:text-5xl" // bg-gradient-to-r from-blue-500 to-emerald-400
                    style={{
                      backgroundImage: "linear-gradient(90deg,#ff4d4d,#f9cb28)",
                    }}
                  >
                    Gourav Goyal
                  </h1>
                </a>
              </Link>

              <nav className="flex justify-between md:justify-around ">
                <Link href="https://twitter.com/GorvGoyl">
                  <a
                    target="blank"
                    rel="noopener"
                    title="Follow @GorvGoyl on Twitter"
                  >
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
              Namaste, I'm a web developer, founder, and a fun guy to hang out
              with. I like to build things that others find helpful.{" "}
              <i>(Hire me!)</i>
              <br />
              {/* Currently, I am  working for{" "} */}
              {/* <a href="https://monadical.com" target="_blank" rel="noopener">
                Monadical
              </a>{" "} */}
              {/* and building cool projects. */}
              {/* <br /> */}I founded{" "}
              <a href="https://easypie.app" target="_blank" rel="noopener">
                Easypie App
              </a>{" "}
              (no-code automation tool),{" "}
              <a
                href="https://www.crunchbase.com/organization/evrcare"
                target="_blank"
                rel="noopener"
              >
                EvrCare
              </a>{" "}
              (assistance platform for elderly people), built multiple side
              projects, and worked for other tech companies.
              <br />I share my learnings on{" "}
              <a rel="noopener" href="https://twitter.com/GorvGoyl">
                Twitter
              </a>
              ,{" "}
              <a rel="noopener" href="https://www.linkedin.com/in/gorvgoyl/">
                LinkedIn
              </a>
              , and{" "}
              <Link href="/blog">
                <a title="Blog">blog</a>
              </Link>
              . You can reach out to me on social media or at{" "}
              <i>hey@gourav.io</i>
            </p>
            <div>
              <h2>Side Projects</h2>
              <ul>
                <li>
                  <p>
                    <a
                      href="https://chatgptwriter.ai"
                      target={"_blank"}
                      title="Notion Boost browser extension"
                    >
                      ChatGPT Writer
                    </a>
                    <br />
                    Free Chrome extension that crafts personalized email replies
                    in no time using AI (ChatGPT).
                    <br />
                    {/* <i>Revenue: $3000+</i> */}
                  </p>
                </li>
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
                          loading="lazy"
                          src="https://flat.badgen.net/badge/code/code/555555/?icon=github&label"
                        />
                      </a>
                      <ChromeUsers />
                      <ChromeStars />
                    </span>
                    A popular browser extension to make Notion (
                    <em>www.notion.so</em>) more productive.
                    <br />
                    {/* <i>Revenue: $3000+</i> */}
                  </p>
                </li>
                <li>
                  <p>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar"
                      target="blank"
                      rel="noopener"
                      title="Shortcut Menubar VSCode extension"
                    >
                      Shortcut Menubar
                    </a>
                    <span className="badge-wrapper">
                      <a
                        title="source code"
                        href="https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension"
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          alt="source code"
                          loading="lazy"
                          src="https://flat.badgen.net/badge/code/code/555555/?icon=github&label"
                        />
                      </a>
                      <a
                        title="VSCode Marketplace link"
                        href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar"
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          alt="Visual Studio Marketplace Downloads"
                          loading="lazy"
                          src="https://flat.badgen.net/vs-marketplace/d/jerrygoyal.shortcut-menu-bar?color=fb9836&icon=visualstudio"
                        />
                      </a>
                      {/* <img
                        alt="Visual Studio Marketplace Rating (Stars)"
                        loading="lazy"
                        src="https://img.shields.io/visual-studio-marketplace/stars/jerrygoyal.shortcut-menu-bar?style=flat-square&color=fb9836"
                      /> */}
                    </span>
                    VSCode extension which adds useful buttons like beautify,
                    open files, undo, redo, etc to the editor in Visual Studio
                    Code.
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="/clone-wars">
                      <a title="Clone Wars">Clone Wars</a>
                    </Link>
                    <span className="badge-wrapper">
                      <a
                        title="GitHub repo stars"
                        href="https://github.com/gorvgoyl/clone-wars"
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          alt="GitHub repo stars"
                          loading="lazy"
                          src="https://flat.badgen.net/github/stars/gorvgoyl/clone-wars?color=fb9836&icon=github"
                        />
                      </a>
                      <a
                        title="Github repo forks"
                        href="https://github.com/gorvgoyl/clone-wars"
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          alt="GitHub forks"
                          loading="lazy"
                          src="https://flat.badgen.net/github/forks/gorvgoyl/clone-wars?color=fb9836&icon=github"
                        />
                      </a>
                    </span>
                    List of 100+ open-source clones of popular sites like
                    Airbnb, Spotify, Tiktok, Netflix, etc.
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="/">
                      <a title="https://gourav.io">Gourav.io</a>
                    </Link>
                    <span className="badge-wrapper">
                      <a
                        title="source code"
                        href="https://github.com/GorvGoyl/Personal-Site-Gourav.io"
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          alt="source code"
                          loading="lazy"
                          src="https://flat.badgen.net/badge/code/code/555555/?icon=github&label"
                        />
                      </a>
                    </span>
                    Open-source portfolio and blog built using React (Next.js),
                    Typescript, Tailwind CSS, MDX and deployed on Vercel. <br />
                    <i>Total Views: 100,000+</i>
                  </p>
                </li>
                <li>
                  <p>
                    <a
                      href="https://chrome.google.com/webstore/detail/popup-notes/pakngoacmndjaomplokegbepmohpfofb?hl=en"
                      target="blank"
                      rel="noopener"
                      title="Popup Notes chrome extension"
                    >
                      Popup Notes
                    </a>{" "}
                    <br />
                    Lightweight Chrome extension to take quick notes without
                    leaving current tab.
                  </p>
                </li>
                {/* <li>
                  <p>
                    <a
                      href="https://jerrygoyal-firebase-project.web.app/"
                      target="blank"
                      rel="noopener"
                      title="Material design portfolio website"
                    >
                      Portfolio site (old)
                    </a>{" "}
                    <br />
                    My old portfolio site built around material guidelines &
                    responsiveness without using any css framework or library.
                  </p>
                </li> */}
              </ul>
            </div>
            <SubscribeForm type={FORMTYPE.Generic} />
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
      <TwitterBtn />
    </div>
  );
}
