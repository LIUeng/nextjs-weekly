// Error boundaries must be Client Components
"use client"; 

import router from "next/router";
import { useEffect } from "react";

export default function Error({
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
    <div>
      <h2>发生错误！</h2>
      <button onClick={() => reset()}>刷新</button>
      <button onClick={() => router.back()}>返回</button>
    </div>
  );
}
