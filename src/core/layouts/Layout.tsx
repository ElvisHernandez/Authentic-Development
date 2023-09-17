import Head from "next/head";
import React, { FC } from "react";
import { BlitzLayout } from "@blitzjs/next";

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "authentic-development-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-yellowtail top-[48px] left-[48px] text-4xl absolute">AD</div>

      <div id="home-nav-link-1">Home</div>
      <div id="home-nav-link-2">About</div>
      <div id="home-nav-link-3">Contact</div>
      <div id="home-nav-link-4">Blog</div>
      <div id="home-nav-link-5"></div>
      <div id="home-nav-link-6"></div>
      <div id="home-nav-link-7"></div>
      <div id="home-nav-link-8"></div>
      <div id="home-nav-link-9"></div>

      {children}
    </>
  );
};

export default Layout;
