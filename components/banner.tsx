import { useState } from 'react';
import { usePath } from '../hooks/customHooks';

export function Banner() {
    const [isVisible, setVisibility] = useState(true);
    const pathName = usePath().slice(1); // replace first "/"

    const handleClick = () => {
        setVisibility((x) => {
            return false;
        });
    };

    return isVisible ? (
        <div className="-mx-5 -mt-2 flex justify-between rounded-none bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-4 text-base text-gray-100 md:mx-0 md:rounded-b">
            <div className="flex w-full justify-between">
                <div className="">
                    <p>🎉 Notion ⇋ Google Calendar 2-way Sync</p>
                </div>
                <div className="ml-4 text-center text-sm">
                    <a
                        href={`https://easypie.app?ref=${pathName}`}
                        target="_blank"
                        className={`hover:bg-current/80 inline-block cursor-pointer whitespace-nowrap rounded-2xl border border-gray-400 px-3 py-2 leading-none text-gray-200 hover:opacity-80 focus:outline-none`}>
                        Try for Free
                    </a>
                </div>
            </div>

            <div className="ml-4">
                <button
                    type="button"
                    onClick={handleClick}
                    className="hover:bg-current/80 cursor-pointer leading-snug text-gray-200 hover:opacity-80">
                    {/* <p>✖</p> */}
                    <svg
                        viewBox="0 0 24 24"
                        width={18}
                        height={18}>
                        <path
                            fill="currentColor"
                            d="M19.8 5.8l-1.6-1.6-6.2 6.2-6.2-6.2-1.6 1.6 6.2 6.2-6.2 6.2 1.6 1.6 6.2-6.2 6.2 6.2 1.6-1.6-6.2-6.2 6.2-6.2z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    ) : (
        <></>
    );
}

export function BannerChromeExtension() {
    const [isVisible, setVisibility] = useState(true);
    const pathName = usePath().slice(1); // replace first "/"

    const handleClick = () => {
        setVisibility((x) => {
            return false;
        });
    };

    return isVisible ? (
        <div className="-mx-5 -mt-2 flex justify-between rounded-none bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-4 text-base text-gray-100 md:mx-0 md:rounded-b">
            <div className="flex w-full justify-between">
                <div className="">
                    <p>Let AI write emails and messages for you 🔥</p>
                </div>
                <div className="ml-4 text-center text-sm">
                    <a
                        href={`https://jetwriter.ai?ref=${pathName}`}
                        target="_blank"
                        className={
                            'inline-block cursor-pointer whitespace-nowrap rounded-full border border-gray-400 px-3 py-2 text-sm leading-none text-gray-200 hover:border-transparent hover:bg-white hover:text-black hover:no-underline focus:outline-none'
                        }>
                        Try for Free
                    </a>
                </div>
            </div>

            <div className="ml-4">
                <button
                    type="button"
                    onClick={handleClick}
                    className="hover:bg-current/80 cursor-pointer leading-snug text-gray-200 hover:opacity-80">
                    {/* <p>✖</p> */}
                    <svg
                        viewBox="0 0 24 24"
                        width={18}
                        height={18}>
                        <path
                            fill="currentColor"
                            d="M19.8 5.8l-1.6-1.6-6.2 6.2-6.2-6.2-1.6 1.6 6.2 6.2-6.2 6.2 1.6 1.6 6.2-6.2 6.2 6.2 1.6-1.6-6.2-6.2 6.2-6.2z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    ) : (
        <></>
    );
}
