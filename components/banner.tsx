import { useRouter } from "next/router";
import React, { useState } from "react";

export function Banner(): JSX.Element {
  const [isVisible, setVisibility] = useState(true);
  const pathName = useRouter().pathname.slice(1); // replace first "/"

  const handleClick = () => {
    setVisibility((x) => false);
  };

  return (
    isVisible && (
      <div className=" text-base bg-gradient-to-r from-gray-700 to-gray-900 text-gray-100  rounded-none md:rounded-b -mt-2 -mx-5 md:mx-0 px-4 py-4 flex justify-between">
        <div className="">
          <div className="inline-block">
            <p>
              🎉 Automate Notion - 2-way calendar sync, schedule social media,
              etc.
            </p>
          </div>
          <div className="ml-5 text-center md:inline-block mt-2 md:mt-0 text-sm">
            <a
              href={`https://easypie.app?ref=${pathName}`}
              className={` inline-block hover:opacity-80 cursor-pointer leading-none hover:bg-opacity-80 border border-gray-400 focus:outline-none px-3 py-2 rounded-2xl  text-gray-200 `}
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="ml-4">
          <button
            type="button"
            onClick={handleClick}
            className="hover:opacity-80 cursor-pointer leading-snug hover:bg-opacity-80  text-gray-200"
          >
            {/* <p>✖</p> */}
            <svg viewBox="0 0 24 24" width={18} height={18}>
              <path
                fill="currentColor"
                d="M19.8 5.8l-1.6-1.6-6.2 6.2-6.2-6.2-1.6 1.6 6.2 6.2-6.2 6.2 1.6 1.6 6.2-6.2 6.2 6.2 1.6-1.6-6.2-6.2 6.2-6.2z"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}
