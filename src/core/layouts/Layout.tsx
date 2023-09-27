import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { BlitzLayout, Routes } from "@blitzjs/next";
import Link from "next/link";
import { handleLinkClickSmoothScroll } from "src/utils/smoothScroll";
import Script from "next/script";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      handleNavDisplay();
      window.addEventListener("scroll", handleNavDisplay);
      window.addEventListener("resize", handleNavDisplay);
    } else {
      setVisible(true);
    }

    return () => {
      window.removeEventListener("scroll", handleNavDisplay);
      window.removeEventListener("resize", handleNavDisplay);
    };
  }, []);

  const handleNavDisplay = () => {
    if (window.scrollY >= window.innerHeight || window.innerWidth < 1280) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      className="navbar bg-base-100 text-white fixed z-20"
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className="navbar-start ">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-100"
          >
            <li>
              <Link href={Routes.BlogPage()}>Blog</Link>
            </li>
            <li>
              <Link href={Routes.Home()}>Home</Link>
              <ul className="p-2">
                <li>
                  <Link
                    href={`/#services`}
                    onClick={(e) => handleLinkClickSmoothScroll(e, "services")}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#process" onClick={(e) => handleLinkClickSmoothScroll(e, "process")}>
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}>
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/#about" onClick={(e) => handleLinkClickSmoothScroll(e, "about")}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="normal-case lg:pl-[40px] text-2xl sm:text-4xl font-yellowtail">
          AD
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={Routes.BlogPage()}>Blog</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Home</summary>
              <ul className="p-2">
                <li>
                  <Link
                    href={`/#services`}
                    onClick={(e) => handleLinkClickSmoothScroll(e, "services")}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#process" onClick={(e) => handleLinkClickSmoothScroll(e, "process")}>
                    Process
                  </Link>{" "}
                </li>
                <li>
                  <Link href="/#contact" onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}>
                    Contact
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/#about" onClick={(e) => handleLinkClickSmoothScroll(e, "about")}>
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          href="/#contact"
          className="btn btn-info normal-case"
          onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}
        >
          Free Consult
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-base-100 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link
          className="bg-white"
          target="_blank"
          href="https://www.linkedin.com/company/98932015/admin/feed/posts/"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </Link>
      </nav>
    </footer>
  );
};

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Authentic Development"}</title>
        <link rel="icon" href="/authentic-development-favicon.png" />
      </Head>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-EV7XES0GQF"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-EV7XES0GQF');
            `}
          </Script>
        </>
      )}

      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
