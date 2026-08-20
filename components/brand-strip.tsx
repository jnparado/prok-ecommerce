import { BrandMark } from "@/components/brand-mark";
import { brandLogos } from "@/lib/site";

export function BrandStrip() {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section className="overflow-hidden border-y border-[#e8ddd0] bg-[#fff9f2] py-10">
      <div className="flex w-max animate-marquee items-center gap-16 pr-16 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <a
            key={`${brand.name}-${i}`}
            href={brand.href}
            className="flex h-32 shrink-0 items-center justify-center"
          >
            <BrandMark name={brand.name} size="lg" />
          </a>
        ))}
      </div>
    </section>
  );
}
