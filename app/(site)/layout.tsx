import type { ReactNode } from "react";

import { AdSlot } from "@/components/ads/ad-slot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <AdSlot placement="header" className="px-3 py-3 md:px-5" />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <AdSlot placement="footer" className="px-3 py-3 md:px-5" />
      <SiteFooter />
    </>
  );
}
