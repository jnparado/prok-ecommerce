import Image from "@/components/media-image";
import NextImage from "next/image";

import { cn } from "@/lib/utils";

export const catalogHeroFloatRight =
  "right-[4%] top-8 hidden h-[220px] w-[170px] lg:block xl:right-[8%] xl:h-[250px] xl:w-[190px]";
export const catalogHeroFloatLeft =
  "right-[18%] top-[42%] hidden h-[150px] w-[120px] xl:block";

export type CatalogHeroFloat = {
  src: string;
  alt: string;
  className?: string;
  delay?: string;
  local?: boolean;
};

export function CollectionBanner({
  title,
  description,
  eyebrow = "Prokrate Collection",
  floats,
  overlaySrc,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  floats?: readonly CatalogHeroFloat[];
  overlaySrc?: string;
}) {
  const showFloats = !overlaySrc && floats && floats.length > 0;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-8%] size-[420px] rounded-full bg-[#e8d5b8]/55 blur-3xl animate-soft-pulse" />
        <div className="absolute top-10 right-[-6%] size-[360px] rounded-full bg-[#c4a882]/25 blur-3xl animate-soft-pulse [animation-delay:1.2s]" />
        <div className="absolute bottom-0 left-[35%] size-[280px] rounded-full bg-[#1a7a72]/10 blur-3xl" />
      </div>

      {overlaySrc ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.2] transition-opacity duration-700">
          <Image
            src={overlaySrc}
            alt=""
            fill
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1e8]/65 via-[#f6f1e8]/90 to-[#f6f1e8]" />
        </div>
      ) : null}

      {showFloats
        ? floats.map((item, index) => {
            const ImageTag = item.local ? NextImage : Image;
            return (
              <div
                key={item.src}
                className={cn(
                  "pointer-events-none absolute animate-fade-up",
                  item.className ?? (index === 0 ? catalogHeroFloatRight : catalogHeroFloatLeft)
                )}
                style={{ animationDelay: item.delay ?? `${index * 180}ms` }}
              >
                <div className="relative h-full w-full animate-machine-float">
                  <ImageTag
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain drop-shadow-[0_24px_40px_rgba(80,50,20,0.18)]"
                    sizes="190px"
                    {...(item.local ? { preload: true } : {})}
                  />
                </div>
              </div>
            );
          })
        : null}

      <div className="relative mx-auto max-w-[1240px] px-5 pt-10 pb-6 md:px-8 md:pt-14 md:pb-8">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.28em] text-[#8b5a2b] uppercase">
          {eyebrow}
        </p>
        <h1
          key={title}
          className="mt-3 max-w-[20ch] animate-fade-up font-serif text-4xl font-bold tracking-tight text-[#3d2416] md:text-[3.25rem]"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-[52ch] animate-fade-up text-[15px] leading-7 text-zinc-600 [animation-delay:90ms]">
          {description}
        </p>
      </div>
    </section>
  );
}
