export function TwitterBtn(): JSX.Element {
    return (
        <div className="twitter mt-12 flex justify-center">
            <div>
                <a
                    href="https://twitter.com/GorvGoyl"
                    target="_blank"
                    rel="noopener"
                    className="twitter-btn text-white no-underline hover:no-underline"
                    title="Follow 'Gourav Goyal' on Twitter">
                    <img
                        src="/twitter-light.svg"
                        className="m-0 mr-2 inline h-3 w-3"
                        alt="Twitter"
                    />
                    @GorvGoyl
                </a>
            </div>
        </div>
    );
}
