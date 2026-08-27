import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { getAdsenseClient } from "@/lib/ads";
import { consentBootScript } from "@/lib/consent";
import { siteContact } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const adsenseClient = getAdsenseClient();

export const metadata: Metadata = {
  metadataBase: new URL(siteContact.website),
  title: "Prokrate | Premium Coffee Collection",
  description:
    "Commercial espresso machines, grinders, flavoring, and barista training.",
  ...(adsenseClient
    ? { other: { "google-adsense-account": adsenseClient } }
    : {}),
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";
  const showAds = Boolean(adsenseClient) && !pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentBootScript }} />
        {showAds ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-[#f6f1e8]">{children}</body>
    </html>
  );
}
