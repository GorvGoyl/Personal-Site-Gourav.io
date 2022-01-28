export function Footer(): JSX.Element {
  return (
    <footer className="mt-10 text-center font-mono text-gray-600">
      • • •
      <div className="pb-8 pt-6 md:pb-10 md:pt-7 max-w-screen-md mx-auto">
        <div className=" text-xs ">
          Built with React 🖤{" "}
          <a
            target="_blank"
            rel="noopener"
            className="underline"
            title="See source-code on Github"
            href="https://github.com/GorvGoyl/Personal-Site-Gourav.io"
          >
            Open-source
          </a>{" "}
        </div>
      </div>
    </footer>
  );
}
