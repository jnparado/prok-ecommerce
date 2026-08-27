import Image from "@/components/media-image";
import { Award, Headset, Heart } from "lucide-react";

import { machineServicesCopy, servicePillars } from "@/lib/site";

const pillarIcons = [Headset, Award, Heart];

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

        <div className="mt-8 rounded-2xl bg-[#eeeae4] px-6 py-12 shadow-[0_8px_24px_rgba(80,50,20,0.06)] md:px-10 md:py-14">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {servicePillars.map((item, index) => {
              const Icon = pillarIcons[index];
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#f3ddc8]">
                    <Icon className="size-7 stroke-[1.5] text-[#8b5a2b]" />
                  </div>
                  <h2 className="mt-5 font-serif text-[1.65rem] text-[#6b3e24]">{item.title}</h2>
                  <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-[#8a6a52]">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
