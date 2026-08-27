"use client";

import { CatalogAd } from "@/components/ads/catalog-ad";
import { CatalogProductCard } from "@/components/catalog-product-card";
import { CollectionBanner } from "@/components/collection-banner";
import { cleaningCatalogCopy, cleaningProducts } from "@/lib/site";

export function CleaningSolutionPage() {
  return (
    <main className="flex-1 overflow-hidden bg-[#f6f1e8]">
      <CollectionBanner
        title={cleaningCatalogCopy.title}
        description={cleaningCatalogCopy.description}
        eyebrow="Care & Maintenance"
      />

      <section className="mx-auto max-w-[1180px] px-5 pb-10 md:px-8 md:pb-12">
        <CatalogAd />
        <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {cleaningProducts.map((item, index) => (
            <CatalogProductCard
              key={item.name}
              name={item.name}
              src={item.src}
              brand={item.brand}
              detail={item.detail}
              preload={index < 4}
              local
              index={index}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
