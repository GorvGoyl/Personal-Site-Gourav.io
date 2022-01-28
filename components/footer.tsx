export function Footer(): JSX.Element {
  return (
    <div className="mt-10">
      <div className="py-10 max-w-screen-md mx-auto border-t border-gray-300">
        <footer className="">
          <div className="text-center text-xs font-mono text-gray-600">
            🖤 Built with React |{" "}
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
        </footer>
      </div>
    </div>
  );
}
