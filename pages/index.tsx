import { ChromeStars, ChromeUsers } from '../components/badge';
import Header from '../components/Header';
import { Hiring } from '../components/hiring';
import { Container } from '../components/layout';
import { SubstackForm } from '../components/substack';
import { TwitterIcon } from '../components/tags';
import { TwitterBtn } from '../components/twitterBtn';
// import author from "@/public/gourav.jpg";
import Link from 'next/link';

function LinkStyle({ children }: { children: React.ReactNode }) {
    return (
        <span className="hover:orange-underline inline-block cursor-pointer whitespace-pre text-left font-[400] underline focus:outline-none">
            {children}
        </span>
    );
}
export default function Home(): JSX.Element {
    return (
        <div>
            <Header type="website" />
            <Container>
                <div>
                    <div className="mb-10 flex items-center">
                        <img
                            className="mr-2 rounded-full md:mr-8"
                            width="180"
                            height="180"
                            src="/gourav_min_400.png"
                            alt="Gourav Goyal"
                        />
                        <div className="prose prose-lg">
                            <Link
                                href="/"
                                title="Homepage"
                                className="no-underline hover:no-underline">
                                <h1
                                    className="mb-4 bg-clip-text pb-3 text-3xl font-bold tracking-wide text-transparent md:text-5xl" // bg-gradient-to-r from-blue-500 to-emerald-400
                                    style={{
                                        backgroundImage: 'linear-gradient(90deg,#ff4d4d,#f9cb28)',
                                    }}>
                                    Gourav Goyal
                                </h1>
                            </Link>

                            <nav className="flex justify-between md:justify-around">
                                <a
                                    href="https://twitter.com/GorvGoyl"
                                    target="blank"
                                    title="Follow @GorvGoyl on Twitter">
                                    GorvGoyl
                                    <TwitterIcon class="m-0 ml-1 inline h-4 w-4" />
                                </a>

                                <Link
                                    href="/blog"
                                    title="Blog">
                                    Blog
                                </Link>
                                {/* <Link href="/about">
                <a>About Me</a>
              </Link> */}
                            </nav>
                        </div>
                    </div>

                    <div className="prose prose-lg">
                        <div>
                            Namaste 🙏, I am a tech startup founder who values delivering a great user experience. I am
                            currently building{' '}
                            <a
                                href="https://chatgptwriter.ai"
                                target="_blank"
                                rel="noopener">
                                <LinkStyle>ChatGPT Writer</LinkStyle>
                            </a>
                            , among other passion projects. Since 2015, I have been working in the software industry,
                            building end-to-end products and leading teams. And trust me, I've debugged more code than
                            most people have read their Terms of Service agreements. <br />I share my learnings on{' '}
                            <a
                                target="_blank"
                                href="https://twitter.com/GorvGoyl">
                                <LinkStyle>Twitter</LinkStyle>
                            </a>
                            ,{' '}
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/in/gorvgoyl/">
                                <LinkStyle>LinkedIn</LinkStyle>
                            </a>
                            , and my{' '}
                            <Link
                                href="/blog"
                                title="Blog">
                                <LinkStyle>blog</LinkStyle>
                            </Link>
                            .{/* Currently, I am  working for{" "} */}
                            {/* <a href="https://monadical.com" target="_blank" rel="noopener">
                Monadical
              </a>{" "} */}
                            {/* and building cool projects. */}
                            <div className="mt-5 rounded-lg bg-slate-200 p-3 text-base text-slate-700">
                                👋 For business inquiries reach out to me at <i>hey@gourav.io</i>
                            </div>
                            <ul>
                                {/* <li>
                                    Expertise: Web development (React, TS, Node.js), Chrome extension development, AI,
                                    startup consultation, and product management.
                                </li> */}
                                <li>
                                    My Startups:{' '}
                                    <a
                                        href="https://chatgptwriter.ai"
                                        target="_blank"
                                        rel="noopener">
                                        <LinkStyle>ChatGPT Writer</LinkStyle>
                                    </a>{' '}
                                    (AI powered writing tool),{' '}
                                    <a
                                        href="https://easypie.app"
                                        target="_blank"
                                        rel="noopener">
                                        <LinkStyle>Easypie App</LinkStyle>
                                    </a>{' '}
                                    (no-code automation tool),{' '}
                                    <a
                                        href="https://www.crunchbase.com/organization/evrcare"
                                        target="_blank"
                                        rel="noopener">
                                        <LinkStyle>EvrCare</LinkStyle>
                                    </a>{' '}
                                    (assistance platform for elderly people).
                                </li>
                                <li>
                                    Companies/clients I have worked for: YC-backed startups, individual clients, big
                                    tech corps like Samsung, Honeywell, etc.
                                </li>
                                <li>
                                    Checkout my open-source projects on{' '}
                                    <a
                                        target="_blank"
                                        href="https://github.com/gorvgoyl/">
                                        <LinkStyle>Github</LinkStyle>
                                    </a>
                                    .
                                </li>
                                <li>
                                    Technical Writing:{' '}
                                    <a
                                        target="_blank"
                                        href="https://stackoverflow.com/users/3073272/gorvgoyl">
                                        <LinkStyle>StackOverflow profile</LinkStyle>
                                    </a>{' '}
                                    and{' '}
                                    <Link
                                        href="/blog"
                                        title="Blog">
                                        <LinkStyle>blog</LinkStyle>
                                    </Link>
                                    .
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Hiring />
                        </div>
                        <div>
                            <a
                                className="no-underline"
                                href="#projects">
                                <h2 id="projects">Startups & Projects</h2>
                            </a>
                            <ul>
                                <li>
                                    <div>
                                        <a
                                            href="https://chatgptwriter.ai"
                                            target={'_blank'}
                                            title="Notion Boost browser extension">
                                            ChatGPT Writer
                                        </a>
                                        <span className="badge-wrapper">
                                            <ChromeUsers
                                                id="pdnenlnelpdomajfejgapbdpmjkfpjkp"
                                                link="https://chrome.google.com/webstore/detail/chatgpt-writer-email-writ/pdnenlnelpdomajfejgapbdpmjkfpjkp/"
                                            />
                                            <ChromeStars
                                                id="pdnenlnelpdomajfejgapbdpmjkfpjkp"
                                                link="https://chrome.google.com/webstore/detail/chatgpt-writer-email-writ/pdnenlnelpdomajfejgapbdpmjkfpjkp/"
                                            />
                                        </span>
                                        Free Chrome extension to generate entire emails and messages using ChatGPT AI.
                                        All sites are supported and enhanced support for Gmail.
                                        <br />
                                        {/* <i>Revenue: $3000+</i> */}
                                    </div>
                                </li>

                                <li>
                                    <div>
                                        <Link
                                            href="/notion-boost"
                                            title="Notion Boost browser extension">
                                            Notion Boost
                                        </Link>
                                        <span className="badge-wrapper">
                                            <a
                                                title="source code"
                                                href="https://github.com/GorvGoyl/Notion-Boost-browser-extension"
                                                target="_blank">
                                                <img
                                                    alt="source code"
                                                    loading="lazy"
                                                    src="https://flat.badgen.net/badge/code/code/555555/?icon=github&label"
                                                />
                                            </a>
                                            <ChromeUsers
                                                id={'eciepnnimnjaojlkcpdpcgbfkpcagahd'}
                                                link={
                                                    'https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd'
                                                }
                                            />
                                            <ChromeStars
                                                id={'eciepnnimnjaojlkcpdpcgbfkpcagahd'}
                                                link={
                                                    'https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd'
                                                }
                                            />
                                        </span>
                                        A popular browser extension to make Notion (<em>www.notion.so</em>) more
                                        productive.
                                        <br />
                                        {/* <i>Revenue: $3000+</i> */}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <a
                                            href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar"
                                            target="blank"
                                            rel="noopener"
                                            title="Shortcut Menubar VSCode extension">
                                            Shortcut Menubar
                                        </a>
                                        <span className="badge-wrapper">
                                            <a
                                                title="source code"
                                                href="https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension"
                                                target="_blank"
                                                rel="noopener">
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
                                                rel="noopener">
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
                                        VSCode extension which adds useful buttons like beautify, open files, undo,
                                        redo, etc to the editor in Visual Studio Code.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <Link
                                            href="/clone-wars"
                                            title="Clone Wars">
                                            Clone Wars
                                        </Link>
                                        <span className="badge-wrapper">
                                            <a
                                                title="GitHub repo stars"
                                                href="https://github.com/gorvgoyl/clone-wars"
                                                target="_blank"
                                                rel="noopener">
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
                                                rel="noopener">
                                                <img
                                                    alt="GitHub forks"
                                                    loading="lazy"
                                                    src="https://flat.badgen.net/github/forks/gorvgoyl/clone-wars?color=fb9836&icon=github"
                                                />
                                            </a>
                                        </span>
                                        List of 100+ open-source clones of popular sites like Airbnb, Spotify, Tiktok,
                                        Netflix, etc.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <Link
                                            href="/devtools"
                                            title="Devtools">
                                            Devtools
                                        </Link>
                                    </div>
                                    <div>
                                        Collection of useful tools for developers (Code Runner, Aspect Ratio Calculator,
                                        etc).
                                    </div>
                                </li>
                                <li>
                                    <p>
                                        <Link
                                            href="/"
                                            title="https://gourav.io">
                                            Gourav.io
                                        </Link>{' '}
                                        <span className="badge-wrapper">
                                            <a
                                                title="source code"
                                                href="https://github.com/GorvGoyl/Personal-Site-Gourav.io"
                                                target="_blank"
                                                rel="noopener">
                                                <img
                                                    alt="source code"
                                                    loading="lazy"
                                                    src="https://flat.badgen.net/badge/code/code/555555/?icon=github&label"
                                                />
                                            </a>
                                            <a
                                                title="GitHub repo stars"
                                                href="https://github.com/gorvgoyl/Personal-Site-Gourav.io"
                                                target="_blank"
                                                rel="noopener">
                                                <img
                                                    alt="GitHub repo stars"
                                                    loading="lazy"
                                                    src="https://flat.badgen.net/github/stars/gorvgoyl/Personal-Site-Gourav.io?color=fb9836&icon=github"
                                                />
                                            </a>
                                            <a
                                                title="Github repo forks"
                                                href="https://github.com/gorvgoyl/Personal-Site-Gourav.io"
                                                target="_blank"
                                                rel="noopener">
                                                <img
                                                    alt="GitHub forks"
                                                    loading="lazy"
                                                    src="https://flat.badgen.net/github/forks/gorvgoyl/Personal-Site-Gourav.io?color=fb9836&icon=github"
                                                />
                                            </a>
                                        </span>
                                        Open-source portfolio and blog built using React (Next.js), Typescript, Tailwind
                                        CSS, MDX and deployed on Vercel. <br />
                                        {/* <i>Total Views: 100,000+</i> */}
                                    </p>
                                </li>
                                <li>
                                    <div>
                                        <a
                                            href="https://easypie.app"
                                            target={'_blank'}
                                            title="Easypie App">
                                            Easypie App
                                        </a>{' '}
                                        (discontinued)
                                        <br />
                                        No-code automation tool.
                                        <br />
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <a
                                            href="https://chatgptmessage.ai"
                                            target={'_blank'}
                                            title="ChatGPT Message AI">
                                            ChatGPT Message AI
                                        </a>{' '}
                                        (discontinued)
                                        <br />
                                        Use ChatGPT AI inside WhatsApp. Interact with AI without ever leaving WhatsApp.
                                        <br />
                                        {/* <i>Revenue: $3000+</i> */}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <a
                                            href="https://gimmesummary.ai"
                                            target={'_blank'}
                                            title="Gimme Summary AI chrome extension">
                                            Gimme Summary AI
                                        </a>{' '}
                                        (discontinued)
                                        <br />
                                        Free chrome extension to summarize articles on the web using AI (ChatGPT).
                                        <br />
                                        {/* <i>Revenue: $3000+</i> */}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <a
                                            href="https://www.crunchbase.com/organization/evrcare"
                                            target={'_blank'}
                                            title="EvrCare">
                                            EvrCare
                                        </a>{' '}
                                        (discontinued)
                                        <br />
                                        Assistance platform for elderly people.
                                        <br />
                                    </div>
                                </li>
                                {/* <li>
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
                </li> */}
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
                        {/* <SubscribeForm type={FORMTYPE.Generic} /> */}
                    </div>
                    <div className="mt-10">
                        <SubstackForm />
                    </div>
                </div>
            </Container>
            <TwitterBtn />
        </div>
    );
}
