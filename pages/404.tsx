import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Links, Navbar } from "@/components/navbar";
import Link from "next/link";
import React from "react";

export default function Blog(): JSX.Element {
  return (
    <>
      <Header type="article" title="Gourav Goyal - Page not found" />

      <Container layout={LayoutType.Blog}>
        <Navbar link={Links.Blog} />
        <main className="prose">
          <header>
            <h1>Oops, Page not found :(</h1>
            <h3>
              <Link href="/" title="gourav.io">
                Go to Homepage
              </Link>
            </h3>
            <h3>
              Or <br /> Let me know at hey@gourav.io
            </h3>
          </header>
          <div />
        </main>
      </Container>
    </>
  );
}
