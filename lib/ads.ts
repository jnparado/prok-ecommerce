export type AdPlacement = "header" | "home" | "infeed" | "article" | "footer";

export function getAdsenseClient() {
  const value = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";
  return value.startsWith("ca-pub-") ? value : "";
}

export function getAdsenseSlot(placement: AdPlacement) {
  const envKey = {
    header: "NEXT_PUBLIC_ADSENSE_SLOT_HEADER",
    home: "NEXT_PUBLIC_ADSENSE_SLOT_HOME",
    infeed: "NEXT_PUBLIC_ADSENSE_SLOT_INFEED",
    article: "NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE",
    footer: "NEXT_PUBLIC_ADSENSE_SLOT_FOOTER",
  }[placement];
  return process.env[envKey]?.trim() ?? "";
}
