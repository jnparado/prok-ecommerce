import Image from "@/components/media-image";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Truck } from "lucide-react";

import { diyCleaningProducts, machineServicesCopy, valueProps } from "@/lib/site";

const highlightIcons = [ShieldCheck, Truck, Heart];

export function ServicesPage() {
  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        <div className="relative min-h-[340px] overflow-hidden rounded-2xl md:min-h-[440px]">
          <Image
            src="/images/machine-services-hero.jpg"
            alt="Commercial espresso machines on the workshop bench for service"
            fill
            preload
            className="object-cover object-center"
            sizes="(min-width: 1180px) 1180px, 100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative flex min-h-[340px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[440px] md:px-16">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {machineServicesCopy.title}
            </h1>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-white/95 md:text-base">
              {machineServicesCopy.body}
            </p>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl">
          <Image
            src="/images/the-importance-of-coffee-shops-in-communities-782577.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1180px) 1180px, 100vw"
          />
          <div className="absolute inset-0 bg-[#3d2416]/78" />
          <div className="relative grid grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-3 sm:gap-5 md:px-8 md:py-14">
            {valueProps.map((item, index) => {
              const Icon = highlightIcons[index];
              return (
                <article
                  key={item.title}
                  className="flex min-h-[170px] flex-col items-center justify-center rounded-[28px] border border-white bg-white/10 px-5 py-8 text-center backdrop-blur-[2px] md:min-h-[210px] md:px-6"
                >
                  <Icon className="size-8 stroke-[1.4] text-white" />
                  <h2 className="mt-4 font-serif text-2xl text-white md:text-[1.65rem]">{item.title}</h2>
                  <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-white/90">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-16">
        <h2 className="text-center font-serif text-[1.85rem] text-[#6b3e24] md:text-[2.1rem]">
          Do It Yourself Cleaning
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {diyCleaningProducts.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col rounded-xl border border-[#e4e0da] bg-white p-4 transition-colors hover:border-[#d2c4b2]"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[180px]">
                <NextImage
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="180px"
                />
              </div>
              <h3 className="mt-4 font-serif text-[17px] leading-snug text-[#4a4038] transition-colors group-hover:text-[#8b5a2b]">
                {item.name}
              </h3>
              <p className="mt-1 text-[13px] text-zinc-400">{item.brand}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[13px] text-zinc-500 transition-colors group-hover:text-[#8b5a2b]">
                Learn more
                <span className="flex size-6 items-center justify-center rounded-full bg-[#d9d5d1] text-white transition-colors group-hover:bg-[#8b5a2b]">
                  <ArrowRight className="size-3.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
