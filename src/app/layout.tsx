import { Inter } from "next/font/google";
import "./globals.css";
// import RouteLayoutProvider from "./provider/routLayoutProvider";

import React from "react";
import RouteLayoutProvider from "@/provider/routLayoutProvider";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="/scam1_icon.webp"></link>
        <title>Spam detector</title>
      </head>
      <body className={inter.className}>
        <RouteLayoutProvider>{children}</RouteLayoutProvider>
      </body>
    </html>
  );
}
