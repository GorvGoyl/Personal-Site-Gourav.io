import Link from "next/link";
import Header from "@/components/Header";
import { Container, LayoutType } from "@/components/layout";
import { Links, Navbar } from "@/components/navbar";
import React from "react";

export default function Blog(): JSX.Element {
  return (
    <>
      <Header title="Gourav Goyal - Page not found" />

      <Container layout={LayoutType.Blog}>
        <Navbar link={Links.Blog} />
        <main className="prose prose-lg">
          <header>
            <h1>Oops, Page not found :(</h1>
            <h3>
              <Link href="/">
                <a title="gourav.io">Go to Homepage</a>
              </Link>
            </h3>
            <h3>
              Or <br /> Inform me at hey@gourav.io
            </h3>
          </header>
          <div />
        </main>
      </Container>
    </>
  );
}
