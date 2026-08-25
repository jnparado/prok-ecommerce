"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { CatalogProductCard } from "@/components/catalog-product-card";
import {
  brandSlug,
  espressoCatalogCopy,
  espressoMachines,
  espressoShopUses,
  espressoUseLabels,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";

function hrefForUse(slug: string) {
  return `/espresso-machines?use=${slug}`;
}

export function EspressoMachinesPage({
  use,
  group,
  brand,
}: {
  use?: string;
  group?: string;
  brand?: string;
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const groupCount = group === "1" || group === "2" ? Number(group) : undefined;
  const useLabel = use ? espressoUseLabels[use] : undefined;
  const activeShop = espressoShopUses.find((item) => item.slug === use);

  const items = useMemo(() => {
    const next = espressoMachines.filter((item) => {
      if (use && !item.uses.some((value) => value === use)) {
        return false;
      }
      if (groupCount && item.groups !== groupCount) {
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
  }, [brand, groupCount, sort, use]);

  const title = useLabel
    ? `Machines for ${useLabel}`
    : groupCount
      ? `${groupCount === 1 ? "Single" : "Double"} Group Machines`
      : espressoCatalogCopy.title;

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="relative overflow-hidden">
        {activeShop ? (
          <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <Image
              src={activeShop.src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1e8]/70 via-[#f6f1e8]/92 to-[#f6f1e8]" />
          </div>
        ) : null}

        <div className="relative mx-auto max-w-[1240px] px-5 pt-10 pb-6 md:px-8 md:pt-14">
          <p className="animate-fade-up text-xs font-semibold tracking-[0.28em] text-[#8b5a2b] uppercase">
            Prokrate Collection
          </p>
          <h1 className="mt-3 animate-fade-up font-serif text-4xl font-bold tracking-tight text-[#3d2416] md:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-[54ch] animate-fade-up text-[15px] leading-7 text-zinc-600 [animation-delay:80ms]">
            {useLabel
              ? `Professional espresso machines chosen for ${useLabel.toLowerCase()} service — built for flavor, steam, and a counter that looks the part.`
              : espressoCatalogCopy.description}
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="animate-fade-up rounded-[28px] bg-[#fff9f2] px-4 py-8 shadow-[0_18px_40px_rgba(80,50,20,0.06)] ring-1 ring-[#eadfce] md:px-10 md:py-10 [animation-delay:120ms]">
          <h2 className="text-center font-serif text-2xl font-bold text-[#1a7a72] md:text-[1.85rem]">
            Shop Machine
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Choose where the machine will live
          </p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 md:gap-x-12">
            {espressoShopUses.map((item) => {
              const active = use === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={active ? "/espresso-machines" : hrefForUse(item.slug)}
                  className="group flex w-[132px] flex-col items-center gap-3 sm:w-[148px]"
                >
                  <span
                    className={cn(
                      "relative block size-[132px] overflow-hidden rounded-full shadow-[0_12px_28px_rgba(80,50,20,0.14)] ring-4 ring-white transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04] sm:size-[148px]",
                      active && "ring-[#c4783a] ring-offset-4 ring-offset-[#fff9f2]"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="148px"
                    />
                    <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </span>
                  <span
                    className={cn(
                      "text-[15px] font-bold tracking-wide",
                      active ? "text-[#8b5a2b]" : "text-[#c4783a]"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#eadfce] pb-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3d2416] md:text-3xl">
              {useLabel ? `${useLabel} selection` : "The collection"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {items.length} {items.length === 1 ? "machine" : "machines"}
              {groupCount ? ` · ${groupCount === 1 ? "single" : "double"} group` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={use ? `/espresso-machines?use=${use}&group=1` : "/espresso-machines?group=1"}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                groupCount === 1
                  ? "bg-[#8b5a2b] text-white"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Single Group
            </Link>
            <Link
              href={use ? `/espresso-machines?use=${use}&group=2` : "/espresso-machines?group=2"}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                groupCount === 2
                  ? "bg-[#8b5a2b] text-white"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Double Group
            </Link>
            <label htmlFor="espresso-sort" className="sr-only">
              Sort by
            </label>
            <div className="relative">
              <select
                id="espresso-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-9 min-w-[170px] appearance-none rounded-full border border-[#eadfce] bg-white px-4 pr-9 text-sm text-zinc-600 outline-none focus:border-[#c4a882]"
              >
                <option value="default">Featured</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-500" />
            </div>
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
                detail={item.groups === 1 ? "Single group" : "Double group"}
                preload={index < 4}
                index={index}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">
            No espresso machines listed for this selection yet.
          </p>
        )}
      </section>
    </main>
  );
}
