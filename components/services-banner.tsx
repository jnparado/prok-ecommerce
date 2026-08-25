import Image from "@/components/media-image";

import { machineServicesCopy } from "@/lib/site";

export function ServicesBanner() {
  return (
    <section id="service" className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
      <Image
        src="/images/machine-services-hero.png"
        alt="Espresso machine in a service workshop"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[420px]">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {machineServicesCopy.title}
        </h2>
        <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-white/95 md:text-base">
          {machineServicesCopy.body}
        </p>
      </div>
    </section>
  );
}
