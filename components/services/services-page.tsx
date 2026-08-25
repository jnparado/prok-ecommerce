"use client";

import { useEffect, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { Headset, Heart, Sun } from "lucide-react";

import { isPublished, mapServiceRow, type ServiceCard } from "@/lib/cms/public";
import { machineServicesCopy, serviceFeatures, servicePillars } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const pillarIcons = [Headset, Sun, Heart];
const fallbackServices: ServiceCard[] = serviceFeatures.map((item, index) => ({
  id: `fallback-service-${index}`,
  title: item.title,
  body: item.body,
  src: item.src,
  alt: item.alt,
}));

export function ServicesPage() {
  const [features, setFeatures] = useState<ServiceCard[]>(fallbackServices);

  useEffect(() => {
    const supabase = createClient();
    void (async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order");
      const rows = ((data ?? []) as Record<string, unknown>[]).filter(isPublished);
      if (rows.length) setFeatures(rows.map(mapServiceRow));
    })();
  }, []);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-[0_8px_28px_rgba(80,50,20,0.18)] md:min-h-[420px]">
          <Image
            src="/images/machine-services-hero.png"
            alt="Espresso machine in a service workshop"
            fill
            preload
            className="object-cover"
            sizes="(min-width: 1180px) 1180px, 100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[420px]">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{machineServicesCopy.title}</h1>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-7 text-white/95">{machineServicesCopy.body}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#efe8dc] px-6 py-10 md:px-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {servicePillars.map((item, index) => {
              const Icon = pillarIcons[index];
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#d4b89a]">
                    <Icon className="size-6 stroke-[1.4] text-[#8b5a2b]" />
                  </div>
                  <h2 className="mt-4 font-serif text-xl text-[#6b3e24]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          {features.map((item, index) => (
            <article key={item.id} className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
              <div
                className={cn(
                  "relative min-h-[220px] overflow-hidden rounded-2xl md:min-h-[280px]",
                  index % 2 === 1 && "md:order-2"
                )}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className={cn(index % 2 === 1 && "md:order-1")}>
                {item.category ? (
                  <p className="text-xs tracking-[0.14em] text-[#8b5a2b] uppercase">{item.category}</p>
                ) : null}
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#6b3e24] md:text-4xl">{item.title}</h2>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-[#6b3e24]/80">{item.body}</p>
                {item.price != null ? (
                  <p className="mt-3 text-sm font-medium text-[#82502a]">₱ {item.price.toLocaleString("en-PH")}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/#contact"
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#8b5a2b] px-6 text-sm font-medium text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
