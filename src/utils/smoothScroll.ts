import React from "react";

const isSamePathName = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const { pathname } = e.currentTarget;

  return pathname === window.location.pathname;
};

export const smoothScroll = (elementId: string, scrollOffset: number) => {
  const targetElement = document.querySelector(`#${elementId}`);

  if (!targetElement) {
    console.error(`element ${elementId} does not exist`);
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset;
  window.scrollTo({ top: targetPosition, behavior: "smooth" });
};

export const handleLinkClickSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  elementId: string,
  scrollOffset = 50
) => {
  e.preventDefault();

  if (!isSamePathName(e)) {
    const { pathname } = e.currentTarget;

    window.location.href = pathname === "/" ? `/#${elementId}` : `${pathname}/#${elementId}`;
  }

  smoothScroll(elementId, scrollOffset);
};
