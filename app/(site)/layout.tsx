import type { ReactNode } from "react";

import { AdsenseLoader } from "@/components/ads/adsense-loader";
import { AdSlot } from "@/components/ads/ad-slot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdsenseLoader />
      <SiteHeader />
      <div className="bg-[#f6f1e8] px-3 py-3 md:px-5">
        <AdSlot placement="header" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <div className="bg-[#f6f1e8] px-3 py-3 md:px-5">
        <AdSlot placement="footer" />
      </div>
      <SiteFooter />
    </>
  );
}
