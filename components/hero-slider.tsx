"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroSlides } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => goTo(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [goTo, index]);

  return (
    <section className="relative bg-[#eadfce] px-3 pt-6 pb-8 md:px-5 md:pt-8">
      <div className="relative mx-auto h-[68vh] min-h-[460px] max-h-[860px] w-full max-w-[1440px] overflow-hidden rounded-2xl border border-black/5 bg-black shadow-[0_10px_32px_rgba(0,0,0,0.18)] md:h-[78vh]">
        {heroSlides.map((item, i) => (
          <div
            key={item.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              preload={i === 0}
              className={cn(
                "object-center",
                "fit" in item && item.fit === "contain"
                  ? "object-contain brightness-110"
                  : "object-cover"
              )}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex flex-col items-center px-4 text-center sm:bottom-[14%]">
          <h1 className="font-serif text-4xl font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl lg:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-2 font-serif text-3xl font-bold tracking-[0.28em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-4xl md:text-5xl">
            {slide.brand}
          </p>
          <Link
            href="/espresso-machines"
            className="pointer-events-auto mt-6 inline-flex h-12 items-center justify-center bg-[#7a4f32] px-12 text-base font-medium tracking-wide text-white transition-colors hover:bg-[#643f28] sm:h-14 sm:px-14 sm:text-lg"
          >
            Shop Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 p-2 text-orange-500 transition-colors hover:text-orange-600 sm:left-5"
        >
          <ChevronLeft className="size-12 stroke-[1.5] sm:size-14" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 p-2 text-orange-500 transition-colors hover:text-orange-600 sm:right-5"
        >
          <ChevronRight className="size-12 stroke-[1.1] sm:size-14" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
          {heroSlides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "size-3 rounded-full transition-colors sm:size-3.5",
                i === index ? "bg-white" : "bg-white/45 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
