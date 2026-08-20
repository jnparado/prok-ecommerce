"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { flavourCategories, flavourProducts } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FlavoursPage({ tab }: { tab?: string }) {
  const activeTab =
    tab === "syrups" || tab === "sauce" || tab === "powder" ? tab : undefined;

  const items = useMemo(() => {
    if (!activeTab) return [...flavourProducts];
    return flavourProducts.filter((item) => item.tab === activeTab);
  }, [activeTab]);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <h1 className="text-center text-2xl font-semibold text-[#1a9b8e] md:text-[1.65rem]">
          Beverages
        </h1>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-10 md:gap-16">
          {flavourCategories.map((item) => {
            const active = activeTab === item.slug;
            return (
              <Link
                key={item.slug}
                href={active ? "/flavours" : `/flavours?tab=${item.slug}`}
                className="flex w-[140px] flex-col items-center gap-3 sm:w-[160px]"
              >
                <span
                  className={cn(
                    "relative block size-[140px] overflow-hidden rounded-full bg-white sm:size-[160px]",
                    active && "ring-2 ring-[#c4783a] ring-offset-2"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-contain p-4"
                    sizes="160px"
                  />
                </span>
                <span className="text-sm font-bold text-[#c4783a]">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/flavours"
          className="mt-10 inline-flex h-9 items-center justify-center rounded-sm border border-[#8b5a2b] px-4 text-sm text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white"
        >
          All Products
        </Link>

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
      </section>
    </main>
  );
}
