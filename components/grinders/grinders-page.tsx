"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  brandSlug,
  grinderCatalogCopy,
  grinderShopUses,
  grinders,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";
type SeriesKey = "default" | "mignon" | "commercial";

function hrefForUse(slug: string) {
  return `/grinders?use=${slug}`;
}

export function GrindersPage({
  use,
  series,
  brand,
}: {
  use?: string;
  series?: string;
  brand?: string;
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const [seriesSort, setSeriesSort] = useState<SeriesKey>(
    series === "mignon" || series === "commercial" ? series : "default"
  );

  useEffect(() => {
    setSeriesSort(series === "mignon" || series === "commercial" ? series : "default");
  }, [series]);

  const items = useMemo(() => {
    const next = grinders.filter((item) => {
      if (use && !item.uses.some((value) => value === use)) {
        return false;
      }
      if (seriesSort !== "default" && item.series !== seriesSort) {
        return false;
      }
      if (brand && brandSlug(item.brand) !== brand) {
        return false;
      }
      return true;
    });

    if (sort === "az") {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "za") {
      next.sort((a, b) => b.name.localeCompare(a.name));
    }
    return next;
  }, [brand, seriesSort, sort, use]);

  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <h1 className="font-serif text-[2.35rem] font-bold tracking-tight text-[#3d2416] md:text-5xl">
          {grinderCatalogCopy.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-zinc-400">
          {grinderCatalogCopy.description}
        </p>

        <div className="mt-12">
          <h2 className="text-center text-2xl font-semibold text-[#1a9b8e] md:text-[1.65rem]">
            Shop Grinders
          </h2>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-6 md:gap-10">
            {grinderShopUses.map((item) => {
              const active = use === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={active ? "/grinders" : hrefForUse(item.slug)}
                  className="flex w-[108px] flex-col items-center gap-3 sm:w-[120px]"
                >
                  <span
                    className={cn(
                      "relative block size-[108px] overflow-hidden rounded-full sm:size-[120px]",
                      active && "ring-2 ring-[#c4783a] ring-offset-2"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </span>
                  <span className="text-sm font-bold text-[#c4783a]">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="grinder-sort-by" className="text-sm text-zinc-600">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="grinder-sort-by"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-10 min-w-[200px] appearance-none rounded-md border border-zinc-300 bg-white px-3 pr-9 text-sm text-zinc-500 outline-none focus:border-zinc-400"
              >
                <option value="default">Choose an option...</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="grinder-sort-series" className="text-sm text-zinc-600">
              Sort
            </label>
            <div className="relative">
              <select
                id="grinder-sort-series"
                value={seriesSort}
                onChange={(event) => setSeriesSort(event.target.value as SeriesKey)}
                className="h-10 min-w-[200px] appearance-none rounded-md border border-zinc-300 bg-white px-3 pr-9 text-sm text-zinc-500 outline-none focus:border-zinc-400"
              >
                <option value="default">Choose an option...</option>
                <option value="mignon">Mignon Series</option>
                <option value="commercial">Commercial Series</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>
        </div>

        {items.length ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {items.map((item, index) => (
              <article
                key={item.name}
                className="flex aspect-[3/4] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white"
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    preload={index < 6}
                    className="object-contain p-3 pt-6"
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                  />
                </div>
                <p className="px-3 pb-4 text-[14px] text-[#b08968]">{item.name}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">
            No grinders listed for this selection yet.
          </p>
        )}
      </section>
    </main>
  );
}
