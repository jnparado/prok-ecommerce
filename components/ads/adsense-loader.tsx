import Script from "next/script";

import { getAdsenseClient } from "@/lib/ads";

export function AdsenseLoader() {
  const client = getAdsenseClient();
  if (!client) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
