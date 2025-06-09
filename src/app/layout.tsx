import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Sánchez | Full-Stack Developer",
  description:
    "Portfolio of Christian Sánchez, a Full-Stack Developer specializing in .net Javascript and React, Next.js and Node.js.",
  keywords: [
    "Christian Sánchez",
    "Full-Stack Developer",
    ".NET CORE",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Christian Sánchez" }],
  creator: "Christian Sánchez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "#",
    title: "Christian Sánchez | Full-Stack Developer",
    description:
      "Portfolio of Christian Sánchez, a Full-Stack Developer specializing in .net Javascript and React, Next.js and Node.js.",
    siteName: "Christian Sánchez Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Sánchez | Full-Stack Developer",
    description:
      "Portfolio of Christian Sánchez, a Full-Stack Developer specializing in .net Javascript and React, Next.js and Node.js.",
    creator: "@christiandt1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
