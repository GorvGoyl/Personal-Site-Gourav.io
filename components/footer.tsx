export function Footer(): JSX.Element {
  return (
    <footer className="mt-10 text-center font-mono text-gray-600">
      <div className="select-none">• • •</div>
      <div className="pb-8 pt-6 md:pb-10 md:pt-7 max-w-screen-md mx-auto">
        <div className=" text-xs text-center">
          Built with React &{" "}
          <a
            target="_blank"
            rel="noopener"
            className="underline"
            title="See source-code on Github"
            href="https://github.com/GorvGoyl/Personal-Site-Gourav.io"
          >
            Open-source
          </a>{" "}
          🖤
        </div>
        <div className="mt-5">
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
        </div>
      </div>
    </footer>
  );
}
