import { usePath } from "@/hooks/customHooks";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function Banner(): JSX.Element {
  const [isVisible, setVisibility] = useState(true);
  const pathName = usePath().slice(1); // replace first "/"

  const handleClick = () => {
    setVisibility((x) => false);
  };

  return (
    isVisible && (
      <div className=" text-base bg-gradient-to-r from-gray-700 to-gray-900 text-gray-100  rounded-none md:rounded-b -mt-2 -mx-5 md:mx-0 px-4 py-4 flex justify-between">
        <div className="flex justify-between w-full">
          <div className="">
            <p>🎉 Notion ⇋ Google Calendar 2-way Sync</p>
          </div>
          <div className="ml-4 text-center text-sm">
            <a
              href={`https://easypie.app?ref=${pathName}`}
              target="_blank"
              className={`whitespace-nowrap inline-block hover:opacity-80 cursor-pointer leading-none hover:bg-opacity-80 border border-gray-400 focus:outline-none px-3 py-2 rounded-2xl  text-gray-200 `}
            >
              Try for Free
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
