import { BrandMark } from "@/components/brand-mark";
import { brandLogos } from "@/lib/site";

export function BrandStrip() {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section className="overflow-hidden border-y border-zinc-100 bg-[#f7f7f7] py-6">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <a
            key={`${brand.name}-${i}`}
            href={brand.href}
            className="flex h-16 shrink-0 items-center grayscale transition hover:grayscale-0"
          >
            <BrandMark name={brand.name} />
          </a>
        ))}
      </div>
    </section>
  );
}
