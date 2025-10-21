import { ChromeStars, ChromeUsers } from '../components/badge';
import Header from '../components/Header';
import { Container } from '../components/layout';
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
export default function Home() {
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
                                href="https://jetwriter.ai"
                                target="_blank"
                                title="Jetwriter AI">
                                <LinkStyle>Jetwriter AI</LinkStyle>
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
                            . Checkout my open-source projects on{' '}
                            <a
                                target="_blank"
                                href="https://github.com/gorvgoyl/">
                                <LinkStyle>Github</LinkStyle>
                            </a>
                            .{/* Currently, I am  working for{" "} */}
                            {/* <a href="https://monadical.com" target="_blank" rel="noopener">
                Monadical
              </a>{" "} */}
                            {/* and building cool projects. */}
                            <div className="mt-5 rounded-lg bg-slate-200 p-3 text-base text-slate-700">
                                👋 For business inquiries reach out to me at <i>hey@gourav.io</i>
                            </div>
                        </div>
                        <div>{/* <Hiring /> */}</div>
                        <div>
                            <a
                                className="no-underline"
                                href="#projects">
                                <h2 id="projects">Startups & Projects</h2>
                            </a>
                            <div className="not-prose space-y-6">
                                {/* Jetwriter AI */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <a
                                            href="https://jetwriter.ai"
                                            target={'_blank'}
                                            title="Jetwriter AI browser extension"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Jetwriter AI
                                        </a>
                                        <div className="flex flex-wrap gap-2 md:justify-end">
                                            <ChromeUsers
                                                id="pdnenlnelpdomajfejgapbdpmjkfpjkp"
                                                link="https://chrome.google.com/webstore/detail/chatgpt-writer-email-writ/pdnenlnelpdomajfejgapbdpmjkfpjkp/"
                                            />
                                            <ChromeStars
                                                id="pdnenlnelpdomajfejgapbdpmjkfpjkp"
                                                link="https://chrome.google.com/webstore/detail/chatgpt-writer-email-writ/pdnenlnelpdomajfejgapbdpmjkfpjkp/"
                                            />
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        AI-powered browser extension and web app for all your writing needs. Free to
                                        Try. Users can also use their own API key.
                                    </p>
                                    {/* <i>Revenue: $3000+</i> */}
                                </div>

                                {/* Notion Boost */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <Link
                                            href="/notion-boost"
                                            title="Notion Boost browser extension"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Notion Boost
                                        </Link>
                                        <div className="flex flex-wrap gap-2 md:justify-end">
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
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        A popular browser extension to make Notion (<em>www.notion.so</em>) more
                                        productive.
                                    </p>
                                    {/* <i>Revenue: $3000+</i> */}
                                </div>

                                {/* Shortcut Menubar */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <a
                                            href="https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar"
                                            target="blank"
                                            rel="noopener"
                                            title="Shortcut Menubar VSCode extension"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Shortcut Menubar
                                        </a>
                                        <div className="flex flex-wrap gap-2 md:justify-end">
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
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        VSCode extension which adds useful buttons like beautify, open files, undo,
                                        redo, etc to the editor in Visual Studio Code.
                                    </p>
                                </div>

                                {/* Clone Wars */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <Link
                                            href="/clone-wars"
                                            title="Clone Wars"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Clone Wars
                                        </Link>
                                        <div className="flex flex-wrap gap-2 md:justify-end">
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
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        List of 100+ open-source clones of popular sites like Airbnb, Spotify, Tiktok,
                                        Netflix, etc.
                                    </p>
                                </div>

                                {/* Devtools */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <Link
                                            href="/devtools"
                                            title="Devtools"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Devtools
                                        </Link>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Collection of handy tools for devs (Code Runner, UUID Generator, Aspect Ratio
                                        Calculator, LLM Token Counter, etc).
                                    </p>
                                </div>

                                {/* Todo App */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <Link
                                            href="/todo"
                                            title="Todo App"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Todo App
                                        </Link>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        A simple and fast todo app with sections. Perfect for organizing tasks like
                                        groceries, bills, etc on mobile. No signup required.
                                    </p>
                                </div>

                                {/* Gourav.io */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                                        <Link
                                            href="/"
                                            title="https://gourav.io"
                                            className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                            Gourav.io
                                        </Link>
                                        <div className="flex flex-wrap gap-2 md:justify-end">
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
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Open-source portfolio and blog built using React (Next.js), Typescript, Tailwind
                                        CSS, MDX and deployed on Vercel.
                                    </p>
                                    {/* <i>Total Views: 100,000+</i> */}
                                </div>

                                {/* Easypie App */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href="https://easypie.app"
                                                target={'_blank'}
                                                title="Easypie App"
                                                className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                                Easypie App
                                            </a>
                                            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                discontinued
                                            </span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">No-code automation tool.</p>
                                </div>

                                {/* ChatGPT Message AI */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <div
                                                title="ChatGPT Message AI"
                                                className="text-xl font-semibold text-slate-900">
                                                ChatGPT Message AI
                                            </div>
                                            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                discontinued
                                            </span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Use ChatGPT AI inside WhatsApp. Interact with AI without ever leaving WhatsApp.
                                    </p>
                                    {/* <i>Revenue: $3000+</i> */}
                                </div>

                                {/* Gimme Summary AI */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <div
                                                title="Gimme Summary AI chrome extension"
                                                className="text-xl font-semibold text-slate-900">
                                                Gimme Summary AI
                                            </div>
                                            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                discontinued
                                            </span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Free chrome extension to summarize articles on the web using AI (ChatGPT).
                                    </p>
                                    {/* <i>Revenue: $3000+</i> */}
                                </div>

                                {/* EvrCare */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href="https://www.crunchbase.com/organization/evrcare"
                                                target={'_blank'}
                                                title="EvrCare"
                                                className="text-xl font-semibold text-slate-900 transition-colors hover:text-orange-500">
                                                EvrCare
                                            </a>
                                            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                discontinued
                                            </span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Assistance platform for elderly people.
                                    </p>
                                </div>
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
                            </div>
                        </div>
                        {/* <SubscribeForm type={FORMTYPE.Generic} /> */}
                    </div>
                    {/* <div className="mt-10">
                        <SubstackForm />
                    </div> */}
                </div>
            </Container>
            <TwitterBtn />
        </div>
    );
}
