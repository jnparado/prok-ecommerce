import { AdSlot } from "@/components/ads/ad-slot";
import { getAdsenseClient } from "@/lib/ads";

export function CatalogAd() {
  if (!getAdsenseClient()) return null;
  return (
    <div className="mt-8">
      <AdSlot placement="infeed" />
    </div>
  );
}
