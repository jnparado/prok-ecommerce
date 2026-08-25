"use client";

import { useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { CatalogAd } from "@/components/ads/catalog-ad";
import { CatalogProductCard } from "@/components/catalog-product-card";
import {
  flavourCatalogCopy,
  flavourCategories,
  flavourProducts,
  flavourTabCopy,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";
type FlavourTab = (typeof flavourCategories)[number]["slug"];

const heroFloats = [
  {
    src: "/images/syrup-irish-cream.jpg",
    alt: "Catcher Gourmet Irish Cream syrup",
    className:
      "right-[4%] top-8 hidden h-[220px] w-[170px] lg:block xl:right-[8%] xl:h-[250px] xl:w-[190px]",
    delay: "0ms",
  },
  {
    src: "/images/sauce-fruity-peach.png",
    alt: "Catcher Gourmet Peach Fruity Sauce",
    className: "right-[18%] top-[42%] hidden h-[150px] w-[120px] xl:block",
    delay: "180ms",
  },
] as const;

const tabNoun = {
  syrups: { one: "syrup", many: "syrups" },
  sauce: { one: "sauce", many: "sauces" },
  powder: { one: "mix", many: "mixes" },
} as const;

export function FlavoursPage({ tab }: { tab?: string }) {
  const [sort, setSort] = useState<SortKey>("default");
  const activeTab =
    tab === "syrups" || tab === "sauce" || tab === "powder" ? (tab as FlavourTab) : undefined;
  const activeCategory = flavourCategories.find((item) => item.slug === activeTab);
  const tabCopy = activeTab ? flavourTabCopy[activeTab] : undefined;

  const items = useMemo(() => {
    const next = flavourProducts.filter((item) => {
      if (activeTab && item.tab !== activeTab) return false;
      return true;
    });

    if (sort === "az") {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "za") {
      next.sort((a, b) => b.name.localeCompare(a.name));
    }
    return next;
  }, [activeTab, sort]);

  const title = tabCopy?.title ?? flavourCatalogCopy.title;
  const noun = activeTab ? tabNoun[activeTab] : { one: "flavour", many: "flavours" };

  return (
    <main className="flex-1 overflow-hidden bg-[#f6f1e8]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[-8%] size-[420px] rounded-full bg-[#e8d5b8]/55 blur-3xl animate-soft-pulse" />
          <div className="absolute top-10 right-[-6%] size-[360px] rounded-full bg-[#c4a882]/25 blur-3xl animate-soft-pulse [animation-delay:1.2s]" />
          <div className="absolute bottom-0 left-[35%] size-[280px] rounded-full bg-[#1a7a72]/10 blur-3xl" />
        </div>

        {activeCategory ? (
          <div className="pointer-events-none absolute inset-0 opacity-[0.2] transition-opacity duration-700">
            <Image
              src={activeCategory.src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1e8]/65 via-[#f6f1e8]/90 to-[#f6f1e8]" />
          </div>
        ) : (
          heroFloats.map((item) => (
            <div
              key={item.src}
              className={cn("pointer-events-none absolute animate-fade-up", item.className)}
              style={{ animationDelay: item.delay }}
            >
              <div className="relative h-full w-full animate-machine-float">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain drop-shadow-[0_24px_40px_rgba(80,50,20,0.18)]"
                  sizes="190px"
                />
              </div>
            </div>
          ))
        )}

        <div className="relative mx-auto max-w-[1240px] px-5 pt-10 pb-6 md:px-8 md:pt-14 md:pb-8">
          <p className="animate-fade-up text-xs font-semibold tracking-[0.28em] text-[#8b5a2b] uppercase">
            Prokrate Collection
          </p>
          <h1
            key={title}
            className="mt-3 max-w-[14ch] animate-fade-up font-serif text-4xl font-bold tracking-tight text-[#3d2416] md:text-[3.25rem]"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-[52ch] animate-fade-up text-[15px] leading-7 text-zinc-600 [animation-delay:90ms]">
            {tabCopy?.description ?? flavourCatalogCopy.description}
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="animate-scale-in rounded-[28px] bg-[#fff9f2]/95 px-4 py-8 shadow-[0_18px_40px_rgba(80,50,20,0.08)] ring-1 ring-[#eadfce] backdrop-blur-sm md:px-10 md:py-10 [animation-delay:140ms]">
          <h2 className="animate-fade-up text-center font-serif text-2xl font-bold text-[#1a7a72] md:text-[1.85rem] [animation-delay:200ms]">
            {flavourCatalogCopy.shopHeading}
          </h2>
          <p className="mt-2 animate-fade-up text-center text-sm text-zinc-500 [animation-delay:260ms]">
            {flavourCatalogCopy.shopCaption}
          </p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 md:gap-x-16">
            {flavourCategories.map((item, index) => {
              const active = activeTab === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={active ? "/flavours" : `/flavours?tab=${item.slug}`}
                  className="group flex w-[132px] animate-fade-up flex-col items-center gap-3 sm:w-[148px]"
                  style={{ animationDelay: `${280 + index * 70}ms` }}
                >
                  <span
                    className={cn(
                      "relative block size-[132px] overflow-hidden rounded-full bg-white shadow-[0_12px_28px_rgba(80,50,20,0.14)] ring-4 ring-white transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.05] group-hover:shadow-[0_18px_36px_rgba(80,50,20,0.2)] sm:size-[148px]",
                      active && "ring-[#c4783a] ring-offset-4 ring-offset-[#fff9f2]"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className={cn(
                        "transition-transform duration-700 group-hover:scale-110",
                        item.padded ? "object-contain p-4" : "object-cover"
                      )}
                      sizes="148px"
                    />
                    {item.padded ? null : (
                      <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    )}
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
              {tabCopy?.selection ?? "The collection"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {items.length} {items.length === 1 ? noun.one : noun.many}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="flavour-sort" className="sr-only">
              Sort by
            </label>
            <div className="relative">
              <select
                id="flavour-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-9 min-w-[170px] appearance-none rounded-full border border-[#eadfce] bg-white px-4 pr-9 text-sm text-zinc-600 outline-none transition-colors focus:border-[#c4a882]"
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
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <CatalogProductCard
                key={`${item.tab}-${item.name}`}
                name={item.name}
                src={item.src}
                brand="Catcher Gourmet"
                detail={flavourCategories.find((category) => category.slug === item.tab)?.label}
                preload={index < 4}
                index={index}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            ))}
          </div>
          </>
        ) : (
          <p className="mt-12 animate-fade-up text-sm text-zinc-400">
            No flavours listed for this selection yet.
          </p>
        )}
      </section>
    </main>
  );
}
