export function TwitterBtn(): JSX.Element {
  return (
    <div className="twitter mt-12  justify-center flex">
      <div>
        <a
          href="https://twitter.com/GorvGoyl"
          target="_blank"
          rel="noopener"
          className="twitter-btn text-white no-underline hover:no-underline"
          title="Follow 'Gourav Goyal' on Twitter"
        >
          <img
            src="/twitter-light.svg"
            className="inline w-3 h-3 m-0 mr-2"
            alt="Twitter"
          />
          @GorvGoyl
        </a>
      </div>
    </div>
  );
}
