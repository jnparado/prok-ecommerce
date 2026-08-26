import Image from "@/components/media-image";
import { Heart, ShieldCheck, Truck } from "lucide-react";

import { valueProps } from "@/lib/site";

const icons = [ShieldCheck, Truck, Heart];

export function ValueProps({ imageSrc }: { imageSrc?: string | null }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={imageSrc || "/images/training-hero.png"}
        alt=""
        fill
        className="object-cover animate-ken-burns"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#3d2416]/72" />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-3 px-4 py-6 sm:px-6 md:grid-cols-3 md:gap-4 md:py-8 lg:px-8">
        {valueProps.map((item, i) => {
          const Icon = icons[i];
          return (
            <article
              key={item.title}
              className="flex h-[100px] flex-col items-center justify-center rounded-xl border border-white px-4 text-center transition-transform duration-500 hover:-translate-y-1 hover:bg-white/10"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Icon className="size-5 stroke-[1.4] text-white" />
              <h2 className="mt-1 font-serif text-base leading-tight text-white">{item.title}</h2>
              <p className="mt-0.5 line-clamp-2 max-w-[42ch] text-[11px] leading-snug text-white/90">
                {item.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
