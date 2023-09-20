import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { BlitzLayout } from "@blitzjs/next";

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
              <a>Blog</a>
            </li>
            <li>
              <a>Home</a>
              <ul className="p-2">
                <li>
                  <a>Services</a>
                </li>
                <li>
                  <a>Process</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <a className="normal-case lg:pl-[40px] text-2xl sm:text-4xl font-yellowtail">AD</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Blog</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Home</summary>
              <ul className="p-2">
                <li>
                  <a>Services</a>
                </li>
                <li>
                  <a>Process</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-info normal-case">Free Consult</a>
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
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
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
        <title>{title || "authentic-development-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
