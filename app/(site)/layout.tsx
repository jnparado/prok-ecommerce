import type { ReactNode } from "react";

import { CookieBanner } from "@/components/ads/cookie-banner";
import { SiteChat } from "@/components/site-chat";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
      <CookieBanner />
      <SiteChat />
    </>
  );
}
