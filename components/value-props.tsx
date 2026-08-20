import { Heart, ShieldCheck, Truck } from "lucide-react";

import { valueProps } from "@/lib/site";

const icons = [ShieldCheck, Truck, Heart];

export function ValueProps() {
  return (
    <section className="bg-[#5c3d2e] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {valueProps.map((item, i) => {
          const Icon = icons[i];
          return (
            <article
              key={item.title}
              className="rounded-2xl border border-[#e8c9a4]/45 bg-[#3d2416] px-6 py-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-[#e8c9a4]">
                <Icon className="size-6 stroke-[1.6] text-[#f6ead8]" />
              </div>
              <h2 className="mt-4 font-serif text-xl text-[#fff8ef] md:text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#ead9c4]">{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
