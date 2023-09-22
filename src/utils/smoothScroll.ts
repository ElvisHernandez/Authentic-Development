import React from "react";

const isSamePathName = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const { pathname } = e.currentTarget;

  return pathname === window.location.pathname;
};

export const smoothScroll = (elementId: string) => {
  const targetElement = document.querySelector(`#${elementId}`);

  if (!targetElement) {
    console.error(`element ${elementId} does not exist`);
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
  window.scrollTo({ top: targetPosition, behavior: "smooth" });
};

export const handleLinkClickSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  elementId: string
) => {
  e.preventDefault();

  if (!isSamePathName(e)) {
    const { pathname } = e.currentTarget;

    window.location.href = pathname === "/" ? `/#${elementId}` : `${pathname}/#${elementId}`;
  }

  smoothScroll(elementId);
};
