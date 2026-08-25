"use client";

import { useMemo } from "react";
import Link from "next/link";

import { CatalogProductCard } from "@/components/catalog-product-card";
import {
  cleaningCatalogCopy,
  cleaningCategories,
  cleaningProducts,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function CleaningSolutionPage({ category }: { category?: string }) {
  const activeCategory = cleaningCategories.some((item) => item.slug === category)
    ? category
    : undefined;

  const items = useMemo(() => {
    if (!activeCategory) return [...cleaningProducts];
    return cleaningProducts.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <p className="text-xs font-semibold tracking-[0.28em] text-[#8b5a2b] uppercase">
          Care & Maintenance
        </p>
        <h1 className="mt-3 font-serif text-[2.35rem] font-bold tracking-tight text-[#3d2416] md:text-5xl">
          {cleaningCatalogCopy.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-zinc-500">
          {cleaningCatalogCopy.description}
        </p>

        <div className="mt-12 rounded-[28px] bg-[#fff9f2] px-4 py-8 shadow-[0_18px_40px_rgba(80,50,20,0.06)] ring-1 ring-[#eadfce] md:px-10 md:py-10">
          <h2 className="text-center font-serif text-2xl font-bold text-[#1a7a72] md:text-[1.85rem]">
            Shop by use
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Keep machines, milk systems, grinders, and the bar tasting clean
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cleaning-solution"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                !activeCategory
                  ? "bg-[#8b5a2b] text-white"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              All Products
            </Link>
            {cleaningCategories.map((item) => {
              const active = activeCategory === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={
                    active
                      ? "/cleaning-solution"
                      : `/cleaning-solution?category=${item.slug}`
                  }
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[#8b5a2b] text-white"
                      : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-b border-[#eadfce] pb-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3d2416] md:text-3xl">
              {activeCategory
                ? cleaningCategories.find((item) => item.slug === activeCategory)?.label
                : "The collection"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {items.length} {items.length === 1 ? "product" : "products"} · puly CAFF
            </p>
          </div>
        </div>

        {items.length ? (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <CatalogProductCard
                key={item.name}
                name={item.name}
                src={item.src}
                brand={item.brand}
                detail={item.detail}
                preload={index < 4}
                index={index}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">
            No cleaning products listed for this selection yet.
          </p>
        )}
      </section>
    </main>
  );
}
