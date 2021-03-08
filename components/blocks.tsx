import Link from "next/link";
import React from "react";
import css from "./css/tags.module.scss";

export function TwitterBtn(): JSX.Element {
  return (
    <div className="twitter mt-12  justify-center flex">
      <div>
        <a
          href="https://twitter.com/GorvGoyl"
          target="_blank"
          className="twitter-btn"
          title="Follow 'Gourav Goyal' on Twitter"
        >
          <img
            src="/twitter-light.svg"
            className="inline w-4 h-4 m-0 mr-1"
            alt="Twitter"
          />
          Follow @GorvGoyl
        </a>
      </div>
    </div>
  );
}
