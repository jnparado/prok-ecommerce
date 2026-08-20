"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Shield } from "lucide-react";

import { packageDeals } from "@/lib/site";
import { cn } from "@/lib/utils";

function peso(value: number) {
  return `₱ ${value.toLocaleString("en-PH")}`;
}

const featured = packageDeals.find((deal) => deal.featured)!;
const bundles = packageDeals.filter((deal) => !deal.featured);

export function PackageDeals() {
  const [selected, setSelected] = useState(0);
  const chosen =
    "packages" in featured ? featured.packages[selected] : undefined;

  return (
    <section id="packages" className="bg-[#f6f1e8] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#8b5a2b] uppercase">
            Café starter bundles
          </p>
          <h2 className="mt-2 font-serif text-3xl text-zinc-800 md:text-[2.35rem]">
            Package Deals
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-zinc-500">
            Machine, grinder, training, and freebies — real packages you can inquire on today.
          </p>
        </div>

        <article className="mt-10 overflow-hidden rounded-2xl bg-white shadow-[8px_18px_40px_rgba(80,50,20,0.12)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[280px] bg-zinc-100 lg:min-h-[520px]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>

            <div className="flex flex-col px-6 py-8 md:px-8 md:py-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#8b5a2b] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                  {featured.brand}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-[#8b5a2b] uppercase">
                  <Shield className="size-3.5" />
                  {featured.warranty}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-3xl text-zinc-800">{featured.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{featured.subtitle}</p>

              <p className="mt-5 text-sm text-zinc-500">
                Machine only{" "}
                <span className="ml-1 text-zinc-400 line-through">
                  {peso(featured.machineBefore)}
                </span>
                <span className="ml-2 font-semibold text-[#a32020]">
                  {peso(featured.machineOnly)}
                </span>
              </p>

              <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                Choose a grinder package
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {featured.packages.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelected(index)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-colors",
                      index === selected
                        ? "border-[#8b5a2b] bg-[#8b5a2b] text-white"
                        : "border-zinc-200 bg-[#fff9f2] text-zinc-700 hover:border-[#c4a484]"
                    )}
                  >
                    <span className="block text-xs font-semibold">{item.name}</span>
                    <span
                      className={cn(
                        "mt-1 block text-sm font-bold",
                        index === selected ? "text-white" : "text-[#a32020]"
                      )}
                    >
                      {peso(item.price)}
                    </span>
                  </button>
                ))}
              </div>

              {chosen ? (
                <p className="mt-5 font-serif text-2xl text-zinc-800">
                  {peso(chosen.price)}
                  <span className="ml-2 text-sm font-sans font-normal text-zinc-400">
                    with {chosen.name}
                  </span>
                </p>
              ) : null}

              <ul className="mt-5 space-y-1.5">
                {featured.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#8b5a2b]" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-zinc-400">
                Add-ons: {featured.addons.map((item) => `${item.name} ${peso(item.price)}`).join(" · ")}
              </p>

              <Link
                href="/#contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#8b5a2b] px-6 text-sm font-medium text-white hover:bg-[#6b3e24]"
              >
                Inquire about this package
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {bundles.map((deal) => (
            <article
              key={deal.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[6px_12px_28px_rgba(80,50,20,0.08)]"
            >
              <div className="relative aspect-square bg-zinc-100">
                <Image
                  src={deal.src}
                  alt={deal.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <span className="w-fit rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
                  {deal.brand}
                </span>
                <h3 className="mt-3 font-serif text-xl text-zinc-800">{deal.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{deal.subtitle}</p>
                <p className="mt-4 text-xs text-zinc-400">
                  Machine only {peso(deal.machineOnly)}
                </p>
                <p className="mt-1 text-sm text-zinc-400 line-through">{peso(deal.before)}</p>
                <p className="text-2xl font-bold text-[#a32020]">{peso(deal.after)}</p>
                <p className="mt-1 text-xs font-medium text-[#8b5a2b]">
                  Includes {deal.grinder} · ₱{deal.freebiesWorth.toLocaleString("en-PH")}+ freebies
                </p>
                <ul className="mt-4 line-clamp-4 space-y-1 text-xs text-zinc-500">
                  {deal.inclusions.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#8b5a2b]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-[#8b5a2b] px-4 text-sm font-medium text-white hover:bg-[#6b3e24]"
                >
                  Inquire now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
