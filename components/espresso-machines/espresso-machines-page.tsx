"use client";

import { useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { CatalogAd } from "@/components/ads/catalog-ad";
import { BrandStrip } from "@/components/brand-strip";
import { CatalogProductCard } from "@/components/catalog-product-card";
import {
  catalogHeroFloatLeft,
  catalogHeroFloatRight,
  CollectionBanner,
} from "@/components/collection-banner";
import { EspressoDirectory } from "@/components/espresso-machines/espresso-directory";
import { HomeReveal } from "@/components/home-reveal";
import {
  brandSlug,
  espressoBrandCategories,
  espressoCatalogCopy,
  espressoMachines,
  espressoShopUses,
  espressoUseLabels,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "default" | "az" | "za";

const heroMachines = [
  {
    src: "/images/hero-espresso-slayer.png",
    alt: "Slayer EP espresso machine",
    className: catalogHeroFloatRight,
    delay: "0ms",
    local: true,
  },
  {
    src: "/images/hero-espresso-compact.png",
    alt: "Casadio Compact espresso machine",
    className: catalogHeroFloatLeft,
    delay: "180ms",
    local: true,
  },
] as const;

function catalogHref({
  use,
  group,
  brand,
}: {
  use?: string;
  group?: string;
  brand?: string;
}) {
  const params = new URLSearchParams();
  if (use) params.set("use", use);
  if (group) params.set("group", group);
  if (brand) params.set("brand", brand);
  const query = params.toString();
  return query ? `/espresso-machines?${query}` : "/espresso-machines";
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
  const router = useRouter();
  const groupCount = group === "1" || group === "2" ? Number(group) : undefined;
  const useLabel = use ? espressoUseLabels[use] : undefined;
  const activeShop = espressoShopUses.find((item) => item.slug === use);
  const brandLabel = espressoBrandCategories.find((item) => item.slug === brand)?.label;
  const activeBrand = brandLabel ? brand : undefined;

  const items = useMemo(() => {
    const next = espressoMachines.filter((item) => {
      if (use && !item.uses.some((value) => value === use)) {
        return false;
      }
      if (groupCount && item.groups !== groupCount) {
        return false;
      }
      if (activeBrand && brandSlug(item.brand) !== activeBrand) {
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
  }, [activeBrand, groupCount, sort, use]);

  const title = useLabel
    ? `Machines for ${useLabel}`
    : groupCount
      ? `${groupCount === 1 ? "Single" : "Double"} Group Machines`
      : espressoCatalogCopy.title;

  return (
    <main className="flex-1 overflow-hidden bg-[#f6f1e8]">
      <CollectionBanner
        title={title}
        description={
          useLabel
            ? `Professional espresso machines chosen for ${useLabel.toLowerCase()} service — built for flavor, steam, and a counter that looks the part.`
            : espressoCatalogCopy.description
        }
        floats={heroMachines}
        overlaySrc={activeShop?.src}
      />

      <section className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="animate-scale-in rounded-[28px] bg-[#fff9f2]/95 px-4 py-8 shadow-[0_18px_40px_rgba(80,50,20,0.08)] ring-1 ring-[#eadfce] backdrop-blur-sm md:px-10 md:py-10 [animation-delay:140ms]">
          <h2 className="animate-fade-up text-center font-serif text-2xl font-bold text-[#1a7a72] md:text-[1.85rem] [animation-delay:200ms]">
            Shop Machine
          </h2>
          <p className="mt-2 animate-fade-up text-center text-sm text-zinc-500 [animation-delay:260ms]">
            Choose where the machine will live
          </p>
          <div className="-mx-1 mt-8 flex flex-nowrap items-start justify-start gap-x-6 overflow-x-auto px-1 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-8 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-x-12">
            {espressoShopUses.map((item, index) => {
              const active = use === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={
                    active
                      ? catalogHref({ brand: activeBrand })
                      : catalogHref({ use: item.slug, brand: activeBrand })
                  }
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

      <HomeReveal>
      <section className="mx-auto max-w-[1240px] px-4 py-8 sm:px-5 md:px-8 md:py-14">
        <div className="flex flex-col gap-4 border-b border-[#eadfce] pb-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3d2416] sm:text-2xl md:text-3xl">
              {useLabel ? `${useLabel} selection` : "The collection"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {items.length} {items.length === 1 ? "machine" : "machines"}
              {brandLabel ? ` · ${brandLabel}` : ""}
              {groupCount ? ` · ${groupCount === 1 ? "single" : "double"} group` : ""}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:contents">
            <Link
              href={catalogHref({ use, group: groupCount === 1 ? undefined : "1", brand: activeBrand })}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full px-3 text-center text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:px-4",
                groupCount === 1
                  ? "bg-[#8b5a2b] text-white"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Single Group
            </Link>
            <Link
              href={catalogHref({ use, group: groupCount === 2 ? undefined : "2", brand: activeBrand })}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full px-3 text-center text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:px-4",
                groupCount === 2
                  ? "bg-[#8b5a2b] text-white"
                  : "bg-white text-[#5c3a22] ring-1 ring-[#eadfce] hover:bg-[#eadfce]"
              )}
            >
              Double Group
            </Link>
            </div>
            <label htmlFor="espresso-brand" className="sr-only">
              Category
            </label>
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select
                id="espresso-brand"
                value={activeBrand ?? ""}
                onChange={(event) =>
                  router.push(catalogHref({ use, group, brand: event.target.value || undefined }))
                }
                className="h-9 w-full min-w-0 appearance-none rounded-full border border-[#eadfce] bg-white px-4 pr-9 text-sm text-zinc-600 outline-none focus:border-[#c4a882] sm:w-[170px]"
              >
                <option value="">Category</option>
                {espressoBrandCategories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-500" />
            </div>
            <label htmlFor="espresso-sort" className="sr-only">
              Sort by
            </label>
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select
                id="espresso-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-9 w-full min-w-0 appearance-none rounded-full border border-[#eadfce] bg-white px-4 pr-9 text-sm text-zinc-600 outline-none focus:border-[#c4a882] sm:w-[170px]"
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
          </>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">
            No espresso machines listed for this selection yet.
          </p>
        )}
      </section>
      </HomeReveal>

      <HomeReveal delay={80}>
      <section className="relative mx-auto max-w-[1240px] px-4 pb-8 sm:px-5 md:px-8 md:pb-14">
        <EspressoDirectory />
      </section>
      </HomeReveal>

      <BrandStrip />
    </main>
  );
}
