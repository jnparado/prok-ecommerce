"use client";

import { useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  coffeeCatalogCopy,
  coffeeCategories,
  coffeeProducts,
} from "@/lib/site";

type SortKey = "default" | "az" | "za";

export function CoffeePage({
  category,
  brew,
}: {
  category?: string;
  brew?: string;
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const activeCategory = category === "beans" || category === "pods" ? category : undefined;

  const items = useMemo(() => {
    const next = coffeeProducts.filter((item) => {
      if (activeCategory && item.category !== activeCategory) {
        return false;
      }
      if (brew && !item.brews.some((value) => value === brew)) {
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
  }, [activeCategory, brew, sort]);

  const showCatalog = Boolean(activeCategory || brew);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <h1 className="font-serif text-[2.35rem] font-bold tracking-tight text-[#3d2416] md:text-5xl">
          {coffeeCatalogCopy.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-zinc-400">
          {coffeeCatalogCopy.description}
        </p>

        <h2 className="mt-12 text-center text-2xl font-semibold text-[#1a9b8e] md:text-[1.65rem]">
          {coffeeCatalogCopy.shopHeading}
        </h2>

        {!showCatalog ? (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {coffeeCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/coffee?category=${item.slug}`}
                className="group relative min-h-[240px] overflow-hidden rounded-2xl md:min-h-[320px]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{item.caption}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label htmlFor="coffee-sort" className="text-sm text-zinc-700">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="coffee-sort"
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
                    key={item.name}
                    className="flex aspect-[3/4] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white"
                  >
                    <div className="relative min-h-0 flex-1">
                      <Image
                        src={item.src}
                        alt={item.name}
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
                No Marcafé products listed for this selection yet.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
