// Error boundaries must be Client Components
"use client";

import router from "next/router";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>发生错误!</h2>
        <button onClick={() => reset()}>刷新</button>
        <button onClick={() => router.back()}>返回</button>
      </body>
    </html>
  );
}
