"use client";

import { useEffect, useRef } from "react";
import showdown from "showdown";

const converter = new showdown.Converter();

function _blank(e: MouseEvent) {
  let target = e.target as HTMLAnchorElement;
  if (target?.nodeName === "A") {
    e.preventDefault();
    let href = target.getAttribute("href");
    if (href) {
      window.open(href);
    }
  }
}

export default function MarkdownHtml(props: { data: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = containerRef.current;
    node?.addEventListener("click", _blank, { capture: true });
    return () => {
      node?.removeEventListener("click", _blank, {
        capture: true,
      });
    };
  }, [containerRef]);
  return (
    <div
      ref={containerRef}
      className="markdown-html"
      dangerouslySetInnerHTML={{
        __html: converter.makeHtml(props?.data || ""),
      }}
    />
  );
}
