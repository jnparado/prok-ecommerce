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
    <section className="relative overflow-hidden bg-[#eadfce] px-3 pt-6 pb-8 md:px-5 md:pt-8">
      <div className="pointer-events-none absolute -top-24 left-[-8%] size-[420px] rounded-full bg-[#c4a882]/35 blur-3xl animate-soft-pulse" />
      <div className="pointer-events-none absolute top-16 right-[-10%] size-[360px] rounded-full bg-[#8b5a2b]/20 blur-3xl animate-soft-pulse [animation-delay:1.4s]" />
      <div className="relative mx-auto h-[52vh] min-h-[320px] max-h-[860px] w-full max-w-[1440px] overflow-hidden rounded-2xl border border-black/5 bg-black shadow-[0_18px_50px_rgba(80,50,20,0.28)] sm:h-[60vh] sm:min-h-[400px] md:h-[78vh] md:min-h-[460px]">
        {slides.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
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
                item.fit === "contain" ? "object-contain brightness-110" : "object-cover",
                i === index && "animate-ken-burns"
              )}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex flex-col items-center px-4 text-center sm:bottom-[14%]">
          <h1
            key={`${slide.title}-${index}`}
            className="animate-hero-copy font-serif text-3xl font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {slide.title}
          </h1>
          <p
            key={`${slide.brand}-${index}`}
            className="mt-2 animate-hero-copy font-serif text-2xl font-bold tracking-[0.12em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-4xl sm:tracking-[0.28em] md:text-5xl [animation-delay:120ms]"
          >
            {slide.brand}
          </p>
          {slide.subtitle ? (
            <p
              key={`${slide.subtitle}-${index}`}
              className="mt-2 max-w-[40ch] animate-hero-copy text-sm text-white/90 [animation-delay:200ms]"
            >
              {slide.subtitle}
            </p>
          ) : null}
          <Link
            href={slide.button_href || "/espresso-machines"}
            className="pointer-events-auto relative mt-5 inline-flex h-11 items-center justify-center overflow-hidden bg-[#7a4f32] px-8 text-sm font-medium tracking-wide text-white shadow-[0_10px_28px_rgba(122,79,50,0.45)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#643f28] hover:shadow-[0_14px_36px_rgba(122,79,50,0.55)] sm:mt-6 sm:h-14 sm:px-14 sm:text-lg"
          >
            <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-cta-shine" />
            <span className="relative">{slide.button_label || "Shop Now"}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-orange-500 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/35 hover:text-orange-600 sm:left-5"
        >
          <ChevronLeft className="size-8 stroke-[1.5] sm:size-14" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-orange-500 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/35 hover:text-orange-600 sm:right-5"
        >
          <ChevronRight className="size-8 stroke-[1.1] sm:size-14" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((item, i) => (
            <button
              key={`${item.src}-dot-${i}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 overflow-hidden rounded-full transition-all duration-300",
                i === index ? "w-10 bg-white/35" : "w-3 bg-white/45 hover:bg-white/70"
              )}
            >
              {i === index ? (
                <span className="block h-full origin-left rounded-full bg-white animate-slide-progress" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
