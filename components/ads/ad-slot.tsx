"use client";

import { useEffect, useRef } from "react";

import { getAdsenseClient, getAdsenseSlot, type AdPlacement } from "@/lib/ads";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const minHeight: Record<AdPlacement, string> = {
  header: "min-h-[90px]",
  footer: "min-h-[90px]",
  home: "min-h-[120px]",
  infeed: "min-h-[250px]",
  article: "min-h-[250px]",
};

export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const pushed = useRef(false);
  const client = getAdsenseClient();
  const slot = getAdsenseSlot(placement);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blockers and missing scripts are expected.
    }
  }, [client, slot]);

  return (
    <aside
      className={cn("w-full", className)}
      aria-label="Advertisement"
    >
      <p className="mb-1.5 text-center text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
        Advertisement
      </p>
      {client ? (
        <ins
          className={cn("adsbygoogle block overflow-hidden rounded-xl", minHeight[placement])}
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot || undefined}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-xl border border-dashed border-[#be9f79] bg-[#fff9f2] px-4 text-center text-sm text-[#8b5a2b]",
            minHeight[placement]
          )}
        >
          Ad space ready — add <code className="mx-1">NEXT_PUBLIC_ADSENSE_CLIENT</code> to start earning
        </div>
      )}
    </aside>
  );
}
