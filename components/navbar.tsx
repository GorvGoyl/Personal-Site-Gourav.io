import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MenuItem = (Props: { href: string; title: string; text: string }) => {
  return (
    <Link href={Props.href}>
      <a className="inline-block py-4 px-2" title={Props.title}>
        <div>{Props.text}</div>
      </a>
    </Link>
  );
};
export default function Navbar(): JSX.Element {
  const page = useRouter().pathname;
  return (
    <nav className="text-xl mb-12 flex border-b-2 justify-end">
      <div className="mr-auto">
        <MenuItem href="/" title="Home" text="Gourav Goyal" />
      </div>
      {page !== "/blog" && (
        <div>
          <MenuItem href="/blog" title="Blog" text="Blog" />
        </div>
      )}
    </nav>
  );
}
