"use client";

import { useState } from "react";
import Image from "@/components/media-image";

import { newArrivals } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NewArrival({
  title,
  description,
}: {
  title?: string | null;
  description?: string | null;
}) {
  const [index, setIndex] = useState(0);
  const item = newArrivals[index];

  return (
    <section className="bg-[#fff9f2] px-4 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#8b5a2b] md:text-4xl">{title || "New Arrival"}</h2>
          <p className="mt-2 text-sm text-zinc-500">
            {description || "Our most loved selections by coffee connoisseurs"}
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-center md:px-4">
            <h3 className="font-serif text-2xl text-[#8b5a2b] md:text-[1.75rem]">
              {item.name}
            </h3>
            <p className="mt-4 text-sm text-zinc-400">{item.heading}</p>
            <p className="mt-3 text-sm font-medium text-zinc-600">{item.tagline}</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-500">
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#c4b0d4]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {newArrivals.map((arrival, i) => (
            <button
              key={arrival.src}
              type="button"
              aria-label={`Show new arrival ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                i === index ? "bg-[#8b5a2b]" : "bg-zinc-300 hover:bg-zinc-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
