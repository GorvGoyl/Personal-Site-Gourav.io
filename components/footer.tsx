export function Footer() {
    return (
        <footer className="mt-10 text-center font-mono text-gray-600">
            <div className="select-none">• • •</div>
            <div className="mx-auto max-w-(--breakpoint-md) pt-6 pb-8 md:pt-7 md:pb-10">
                <div className="text-center text-xs">
                    Built with React &{' '}
                    <a
                        target="_blank"
                        rel="noopener"
                        className="underline"
                        title="See source-code on Github"
                        href="https://github.com/GorvGoyl/Personal-Site-Gourav.io">
                        Open-source
                    </a>{' '}
                    🖤
                </div>
                {/* <div className="mt-5">
          <a
            href="https://vercel.com?utm_source=gorv&utm_campaign=oss"
            target="_blank"
            rel="noopener"
            className="inline-block"
          >
            <img
              alt="Powered by Vercel"
              loading="lazy"
              src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
            />
          </a>
        </div> */}
            </div>
        </footer>
    );
}
