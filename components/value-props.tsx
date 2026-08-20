import { Heart, ShieldCheck, Truck } from "lucide-react";

import { valueProps } from "@/lib/site";

const icons = [ShieldCheck, Truck, Heart];

export function ValueProps() {
  return (
    <section className="bg-[#f6f1e8]">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 py-14 md:grid-cols-3 md:gap-8 md:py-16">
        {valueProps.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#d4b89a]">
                <Icon className="size-6 stroke-[1.4] text-[#c4a484]" />
              </div>
              <h2 className="mt-4 font-serif text-xl text-zinc-800">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
