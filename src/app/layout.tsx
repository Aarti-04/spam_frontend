import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import RouteLayoutProvider from '@/provider/routLayoutProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/scam1_icon.webp" />
        <title>Spam detector</title>
      </head>
      <body className={inter.className}>
        <RouteLayoutProvider>{children}</RouteLayoutProvider>
      </body>
    </html>
  );
}
