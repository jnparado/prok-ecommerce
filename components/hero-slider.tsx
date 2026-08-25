"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroSlides as fallbackSlides } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  alt: string;
  title: string;
  brand: string;
  subtitle?: string;
  fit?: string;
  button_label?: string;
  button_href?: string;
};

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([...fallbackSlides]);
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    const supabase = createClient();
    void (async () => {
      const query = await supabase
        .from("hero_slides")
        .select("title, brand, subtitle, image_src, alt, fit, button_label, button_href, enabled, sort_order")
        .order("sort_order");
      const rows = (query.data ?? []).filter((row) => row.enabled !== false && row.image_src);
      if (rows.length) {
        setSlides(
          rows.map((row) => ({
            src: row.image_src,
            alt: row.alt,
            title: row.title,
            brand: row.brand,
            subtitle: row.subtitle ?? undefined,
            fit: row.fit,
            button_label: row.button_label ?? "Shop Now",
            button_href: row.button_href ?? "/espresso-machines",
          }))
        );
      }
    })();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!slides.length) return;
    const timer = window.setInterval(() => goTo(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [goTo, index, slides.length]);

  if (!slide) return null;

  return (
    <section className="relative bg-[#eadfce] px-3 pt-6 pb-8 md:px-5 md:pt-8">
      <div className="relative mx-auto h-[68vh] min-h-[460px] max-h-[860px] w-full max-w-[1440px] overflow-hidden rounded-2xl border border-black/5 bg-black shadow-[0_10px_32px_rgba(0,0,0,0.18)] md:h-[78vh]">
        {slides.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
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
                item.fit === "contain" ? "object-contain brightness-110" : "object-cover"
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
          {slide.subtitle ? (
            <p className="mt-2 max-w-[40ch] text-sm text-white/90">{slide.subtitle}</p>
          ) : null}
          <Link
            href={slide.button_href || "/espresso-machines"}
            className="pointer-events-auto mt-6 inline-flex h-12 items-center justify-center bg-[#7a4f32] px-12 text-base font-medium tracking-wide text-white transition-colors hover:bg-[#643f28] sm:h-14 sm:px-14 sm:text-lg"
          >
            {slide.button_label || "Shop Now"}
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
          {slides.map((item, i) => (
            <button
              key={`${item.src}-dot-${i}`}
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
