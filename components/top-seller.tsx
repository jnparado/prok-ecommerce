"use client";

import { useMemo, useState } from "react";
import Image from "@/components/media-image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { topSellers } from "@/lib/site";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "amount" | "name";
type FilterKey = "all" | "Espresso Machines" | "Grinder";

export function TopSeller() {
  const [sort, setSort] = useState<SortKey>("newest");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [newOnly, setNewOnly] = useState(false);
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState<string[]>([]);

  const results = useMemo(() => {
    let items = topSellers.filter((item) => {
      if (newOnly && !item.isNew) return false;
      if (filter !== "all" && item.category !== filter) return false;
      return true;
    });

    items = [...items].sort((a, b) => {
      if (sort === "amount") return a.price - b.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return items;
  }, [filter, newOnly, sort]);

  const visible = Math.min(2, results.length);
  const maxIndex = Math.max(0, results.length - visible);
  const page = results.slice(index, index + visible);

  function go(direction: -1 | 1) {
    if (results.length === 0) return;
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  }

  function updateFilter(value: FilterKey) {
    setFilter(value);
    setIndex(0);
  }

  function updateSort(value: SortKey) {
    setSort(value);
    setIndex(0);
  }

  function toggleNew() {
    setNewOnly((value) => !value);
    setIndex(0);
  }

  function addToCart(name: string) {
    setCart((current) => (current.includes(name) ? current : [...current, name]));
  }

  return (
    <section id="top-seller" className="bg-[#fff9f2] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-medium text-zinc-700">Top Seller</h2>
            <p className="mt-1 text-sm text-zinc-400">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(event) => updateSort(event.target.value as SortKey)}
                className="h-9 appearance-none rounded-md border border-zinc-300 bg-white py-1.5 pr-8 pl-3 text-sm text-zinc-600"
              >
                <option value="newest">Sort</option>
                <option value="newest">Newest</option>
                <option value="amount">Amount</option>
                <option value="name">Number</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-zinc-400" />
            </label>

            <label className="relative">
              <span className="sr-only">Filter</span>
              <select
                value={filter}
                onChange={(event) => updateFilter(event.target.value as FilterKey)}
                className="h-9 appearance-none rounded-md border border-zinc-300 bg-white py-1.5 pr-8 pl-3 text-sm text-zinc-600"
              >
                <option value="all">Filter</option>
                <option value="Espresso Machines">Espresso Machines</option>
                <option value="Grinder">Grinder</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-zinc-400" />
            </label>

            <button
              type="button"
              onClick={toggleNew}
              className={cn(
                "h-9 rounded-md px-4 text-sm font-medium text-white",
                newOnly ? "bg-[#1557b0]" : "bg-[#1a73e8] hover:bg-[#1557b0]"
              )}
            >
              New
            </button>
          </div>
        </div>

        <div className="relative mt-8 flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous top sellers"
            className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-[#eadfce] text-[#6b3e24] hover:bg-[#e0d2bc] sm:inline-flex"
          >
            <ChevronLeft className="size-6 stroke-[1.5]" />
          </button>

          <div className="grid min-h-[420px] flex-1 grid-cols-1 gap-5 md:grid-cols-2">
            {page.length === 0 ? (
              <p className="col-span-full py-20 text-center text-sm text-zinc-400">
                No products match these filters.
              </p>
            ) : (
              page.map((product) => {
                const added = cart.includes(product.name);
                return (
                  <article
                    key={product.name}
                    className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
                      <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(min-width: 768px) 28vw, 80vw"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-bold tracking-wide text-zinc-800 uppercase">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs tracking-wide text-zinc-400 uppercase">
                      {product.brand}
                    </p>
                    <p className="mt-3 text-base font-bold text-[#a32020]">
                      ₱ {product.price.toLocaleString("en-US")}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <a
                        href="/espresso-machines"
                        className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-[#0d6b3f] text-sm font-medium text-white hover:bg-[#095533]"
                      >
                        View Details
                      </a>
                      <button
                        type="button"
                        onClick={() => addToCart(product.name)}
                        className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-[#0d6b3f] text-sm font-medium text-white hover:bg-[#095533]"
                      >
                        {added ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next top sellers"
            className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-[#eadfce] text-[#6b3e24] hover:bg-[#e0d2bc] sm:inline-flex"
          >
            <ChevronRight className="size-6 stroke-[1.5]" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous top sellers"
            className="inline-flex size-11 items-center justify-center rounded-lg bg-[#eadfce] text-[#6b3e24]"
          >
            <ChevronLeft className="size-6 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next top sellers"
            className="inline-flex size-11 items-center justify-center rounded-lg bg-[#eadfce] text-[#6b3e24]"
          >
            <ChevronRight className="size-6 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
