import type { Metadata } from "next";
import "./globals.css";
import "./mdx.css";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Weekly",
  description: "Generated by LIUeng",
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="light"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <div>{props.children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
