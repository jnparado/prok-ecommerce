import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function Tile({
  id,
  href,
  src,
  alt,
  title,
  caption,
  className,
  sizes,
  children,
}: {
  id?: string;
  href: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  className?: string;
  sizes: string;
  children?: ReactNode;
}) {
  return (
    <Link
      id={id}
      href={href}
      className={cn("group relative min-h-[220px] overflow-hidden", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black/45" />
      {children}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-white/90">{caption}</p>
      </div>
    </Link>
  );
}

export function FeaturedSection() {
  return (
    <section id="espresso-machines" className="bg-white p-3 md:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.55fr_1fr] lg:gap-4">
        <div className="grid grid-rows-2 gap-3 lg:min-h-[720px] lg:gap-4">
          <Tile
            id="cafe"
            href="/espresso-machines?use=cafe"
            src="/images/cafe-interior.png"
            alt="Modern cafe interior"
            title="Cafe"
            caption="Discover our premium collection of coffee machines >"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <Tile
            id="hotel"
            href="/espresso-machines?use=hotel"
            src="/images/for-hotel-machines.png"
            alt="Commercial espresso machines for hotels"
            title="For Hotel"
            caption="Indulge your guest exquisite coffee select from our machine selection >"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>

        <div className="grid grid-rows-3 gap-3 lg:min-h-[720px] lg:gap-4">
          <Tile
            id="restaurant"
            href="/espresso-machines?use=restaurant"
            src="/images/helios-grinder.png"
            alt="Helios 75 grinder for restaurants"
            title="Restaurant"
            caption="Evaluate coffee from Restaurant dinning experience >"
            sizes="(min-width: 1024px) 40vw, 100vw"
          >
            <div id="grinders" className="absolute top-5 right-5 max-w-[180px] text-right text-white">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase">
                Helios 75 Grinder
              </p>
              <p className="mt-2 hidden text-[11px] leading-relaxed text-white/80 lg:block">
                Commercial on-demand grinding built for high-volume service.
              </p>
            </div>
          </Tile>
          <Tile
            id="office"
            href="/espresso-machines?use=office"
            src="/images/for-office.png"
            alt="Office coffee machine"
            title="For Office"
            caption="Fuel productivity delight on your office >"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <Tile
            id="homes"
            href="/espresso-machines?use=home"
            src="/images/for-home.png"
            alt="Home espresso machine"
            title="For Homes"
            caption="Evaluate coffee from home >"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
