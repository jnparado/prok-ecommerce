"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { CatalogAd } from "@/components/ads/catalog-ad";
import { CatalogProductCard } from "@/components/catalog-product-card";
import {
  catalogHeroFloatLeft,
  catalogHeroFloatRight,
  CollectionBanner,
} from "@/components/collection-banner";
import {
  brandSlug,
  grinderCatalogCopy,
  grinderShopUses,
  grinderUseLabels,
  grinders,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";
type SeriesKey = "default" | "mignon" | "commercial";

const heroGrinders = [
  {
    src: "/images/hero-grinder-firenze.png",
    alt: "Eureka Firenze 75 grinder",
    className: catalogHeroFloatRight,
    delay: "0ms",
    local: true,
  },
  {
    src: "/images/hero-grinder-silenzio.png",
    alt: "Eureka Mignon Silenzio grinder",
    className: catalogHeroFloatLeft,
    delay: "180ms",
    local: true,
  },
] as const;

function hrefForUse(slug: string) {
  return `/grinders?use=${slug}`;
}

function seriesHref(use: string | undefined, value: SeriesKey) {
  const params = new URLSearchParams();
  if (use) params.set("use", use);
  if (value !== "default") params.set("series", value);
  const query = params.toString();
  return query ? `/grinders?${query}` : "/grinders";
}

function grinderDetail(item: (typeof grinders)[number]) {
  if ("detail" in item && item.detail) {
    return item.detail;
  }
  return item.series === "mignon" ? "Mignon Series" : "Commercial Series";
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

  const useLabel = use ? grinderUseLabels[use] : undefined;
  const activeShop = grinderShopUses.find((item) => item.slug === use);

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

  const title = useLabel
    ? `Grinders for ${useLabel}`
    : seriesSort === "mignon"
      ? "Mignon Series"
      : seriesSort === "commercial"
        ? "Commercial Series"
        : grinderCatalogCopy.title;

  return (
    <main className="flex-1 overflow-hidden bg-[#f6f1e8]">
      <CollectionBanner
        title={title}
        description={
          useLabel
            ? `Professional grinders chosen for ${useLabel.toLowerCase()} service — built for dose consistency, quiet operation, and a counter that looks the part.`
            : grinderCatalogCopy.description
        }
        floats={heroGrinders}
        overlaySrc={activeShop?.src}
      />

      <section className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="animate-scale-in rounded-[28px] bg-[#fff9f2]/95 px-4 py-8 shadow-[0_18px_40px_rgba(80,50,20,0.08)] ring-1 ring-[#eadfce] backdrop-blur-sm md:px-10 md:py-10 [animation-delay:140ms]">
          <h2 className="animate-fade-up text-center font-serif text-2xl font-bold text-[#1a7a72] md:text-[1.85rem] [animation-delay:200ms]">
            Shop Grinders
          </h2>
          <p className="mt-2 animate-fade-up text-center text-sm text-zinc-500 [animation-delay:260ms]">
            Choose where the grinder will live
          </p>
          <div className="-mx-1 mt-8 flex flex-nowrap items-start justify-start gap-x-6 overflow-x-auto px-1 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-8 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-x-12">
            {grinderShopUses.map((item, index) => {
              const active = use === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={active ? "/grinders" : hrefForUse(item.slug)}
                  className="group flex w-[132px] shrink-0 animate-fade-up flex-col items-center gap-3 sm:w-[148px]"
                  style={{ animationDelay: `${280 + index * 80}ms` }}
                >
                  <span
                    className={cn(
                      "relative block size-[132px] overflow-hidden rounded-full shadow-[0_12px_28px_rgba(80,50,20,0.14)] ring-4 ring-white transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.05] group-hover:shadow-[0_18px_36px_rgba(80,50,20,0.22)] sm:size-[148px]",
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
                    <span className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <span
                    className={cn(
                      "text-[15px] font-bold tracking-wide transition-colors duration-300",
                      active ? "text-[#8b5a2b]" : "text-[#c4783a] group-hover:text-[#8b5a2b]"
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
        <div className="flex animate-fade-up flex-wrap items-end justify-between gap-4 border-b border-[#eadfce] pb-5 [animation-delay:320ms]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3d2416] md:text-3xl">
              {useLabel ? `${useLabel} selection` : "The collection"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {items.length} {items.length === 1 ? "grinder" : "grinders"}
              {seriesSort !== "default"
                ? ` · ${seriesSort === "mignon" ? "Mignon" : "Commercial"} Series`
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={seriesHref(use, "mignon")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                seriesSort === "mignon"
                  ? "bg-[#8b5a2b] text-white shadow-[0_8px_18px_rgba(80,50,20,0.18)]"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Mignon Series
            </Link>
            <Link
              href={seriesHref(use, "commercial")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                seriesSort === "commercial"
                  ? "bg-[#8b5a2b] text-white shadow-[0_8px_18px_rgba(80,50,20,0.18)]"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Commercial Series
            </Link>
            <label htmlFor="grinder-sort" className="sr-only">
              Sort by
            </label>
            <div className="relative">
              <select
                id="grinder-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-9 w-full min-w-0 appearance-none rounded-full border border-[#eadfce] bg-white px-4 pr-9 text-sm text-zinc-600 outline-none transition-colors focus:border-[#c4a882] sm:w-[170px]"
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
          <>
          <CatalogAd />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {items.map((item, index) => (
              <CatalogProductCard
                key={`${item.name}-${seriesSort}-${use ?? "all"}`}
                name={item.name}
                src={item.src}
                brand={item.brand}
                detail={grinderDetail(item)}
                preload={index < 4}
                index={index}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            ))}
          </div>
          </>
        ) : (
          <p className="mt-12 animate-fade-up text-sm text-zinc-400">
            No grinders listed for this selection yet.
          </p>
        )}
      </section>
    </main>
  );
}
