"use client";

import { useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import {
  brandCatalog,
  brandCatalogCopy,
  brandPageHref,
  brandSlug,
  navItems,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";

const brandNames = navItems.find(
  (item): item is Extract<(typeof navItems)[number], { mega: "brands" }> =>
    "mega" in item && item.mega === "brands"
)?.brands ?? [];

function brandLabelFromSlug(slug?: string) {
  if (!slug) return undefined;
  return brandNames.find((name) => brandSlug(name) === slug);
}

export function BrandsPage({ brand }: { brand?: string }) {
  const [sort, setSort] = useState<SortKey>("default");
  const selectedBrand = brandLabelFromSlug(brand);

  const items = useMemo(() => {
    const next = brand
      ? brandCatalog.filter((item) => brandSlug(item.brand) === brand)
      : [...brandCatalog];

    if (sort === "az") {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "za") {
      next.sort((a, b) => b.name.localeCompare(a.name));
    }
    return next;
  }, [brand, sort]);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <h1 className="font-serif text-[2.35rem] font-bold tracking-tight text-[#3d2416] md:text-5xl">
          {selectedBrand ?? brandCatalogCopy.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-zinc-400">
          {selectedBrand
            ? `All ${selectedBrand} products in the Prokrate catalog.`
            : brandCatalogCopy.description}
        </p>

        <div className="mt-8 flex items-stretch gap-2 overflow-x-auto pb-1">
          {brandNames.map((name) => {
            const slug = brandSlug(name);
            const active = brand === slug;
            return (
              <Link
                key={name}
                href={active ? "/brands" : brandPageHref(name)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[120px] min-w-[108px] flex-1 items-center justify-center rounded-xl bg-white px-2 py-4 ring-1 ring-[#eadfce] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(80,50,20,0.12)]",
                  active && "ring-2 ring-[#8b5a2b] shadow-[0_12px_24px_rgba(80,50,20,0.12)]"
                )}
              >
                <BrandMark name={name} size="lg" />
                <span className="sr-only">{name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <label htmlFor="brand-sort" className="text-sm text-zinc-700">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="brand-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-10 min-w-[220px] appearance-none rounded-md border border-zinc-300 bg-white px-3 pr-9 text-sm text-zinc-500 outline-none focus:border-zinc-400"
            >
              <option value="default">Choose an option...</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-500" />
          </div>
        </div>

        {items.length ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((item, index) => (
              <article
                key={`${item.brand}-${item.name}`}
                className="flex aspect-[3/4] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white"
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={item.src}
                    alt={`${item.name} from ${item.brand}`}
                    fill
                    preload={index < 5}
                    className="object-contain p-3 pt-6"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                  />
                </div>
                <p className="px-4 pb-5 text-[15px] text-[#b08968]">{item.name}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">
            No products listed for {selectedBrand ?? "this brand"} yet.
          </p>
        )}
      </section>
    </main>
  );
}
