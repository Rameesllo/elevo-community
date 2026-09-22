import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Elevo Community",
    template: "%s | Elevo Community",
  },
  description:
    "The official platform for the Elevo Community — connecting, empowering, and growing together.",
  keywords: ["Elevo", "youth", "community", "Kerala", "Elevo"],
  authors: [{ name: "Elevo Community" }],
  openGraph: {
    title: "Elevo Community",
    description:
      "Connecting, empowering, and growing together — the official Elevo platform.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
