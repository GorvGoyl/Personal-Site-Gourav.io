import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export enum Links {
  Blog,
}
const NavItem = (Props: { href: string; title: string; text: string }) => (
  <Link href={Props.href}>
    <a className="inline-block py-4 px-2" title={Props.title}>
      {Props.text === "Gourav Goyal" ? (
        <div
          className="bg-clip-text text-transparent font-semibold tracking-wide"
          style={{
            backgroundImage: "linear-gradient(90deg,#007CF0,#00DFD8)",
          }}
        >
          {Props.text}
        </div>
      ) : (
        <div>{Props.text}</div>
      )}
    </a>
  </Link>
);
export function Navbar(Props: { link?: Links }): JSX.Element {
  const page = useRouter().pathname;
  // page !== "/blog"
  return (
    <nav className="text-xl mb-12 flex border-b-2 justify-end">
      <div className="mr-auto">
        <NavItem href="/" title="Home" text="Gourav Goyal" />
      </div>
      {Props.link === Links.Blog && (
        <div>
          <NavItem href="/blog" title="Blog" text="Blog" />
        </div>
      )}
    </nav>
  );
}
