import Image from "@/components/media-image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function MachinePlate({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <span
      className="absolute top-5 left-5 animate-fade-up border border-white/85 px-3 py-1.5 text-[11px] font-medium tracking-[0.32em] text-white uppercase transition-[letter-spacing,background-color] duration-500 group-hover:bg-white/10 group-hover:tracking-[0.4em] md:top-6 md:left-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      {label}
    </span>
  );
}

function Tile({
  id,
  href,
  src,
  alt,
  title,
  caption,
  className,
  sizes,
  fit = "cover",
  plate,
  delay = 0,
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
  fit?: "cover" | "contain";
  plate?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const captionText = caption.replace(/\s*>\s*$/, "").trim();

  return (
    <Link
      id={id}
      href={href}
      className={cn(
        "group relative min-h-[220px] overflow-hidden",
        fit === "contain" && "bg-[#1a1a1a]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "transition-transform duration-700 group-hover:scale-[1.04]",
          fit === "contain" ? "object-contain p-6 md:p-8" : "object-cover"
        )}
        sizes={sizes}
      />
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          fit === "contain"
            ? "bg-gradient-to-t from-black/80 via-black/20 to-black/35 group-hover:from-black/88"
            : "bg-black/45 group-hover:bg-black/55"
        )}
      />
      {plate ? <MachinePlate label={plate} delay={delay} /> : null}
      {children}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        <h2 className="overflow-hidden text-3xl font-bold tracking-tight md:text-4xl">
          <span
            className="block animate-text-reveal"
            style={{ animationDelay: `${delay + 80}ms` }}
          >
            <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-1">
              {title}
            </span>
          </span>
        </h2>
        <p
          className="mt-2 flex max-w-md items-center text-sm text-white/90 animate-fade-up"
          style={{ animationDelay: `${delay + 180}ms` }}
        >
          <span className="transition-colors duration-500 group-hover:text-white">
            {captionText}
          </span>
          <span
            aria-hidden
            className="ml-1 inline-block transition-transform duration-500 ease-out group-hover:translate-x-2"
          >
            &gt;
          </span>
        </p>
        <span className="mt-3 block h-px w-0 bg-white/85 transition-all duration-500 ease-out group-hover:w-16" />
      </div>
    </Link>
  );
}

export function FeaturedSection() {
  return (
    <section id="espresso-machines" className="bg-[#f6f1e8] p-3 md:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.55fr_1fr] lg:gap-4">
        <div className="grid grid-rows-2 gap-3 lg:min-h-[720px] lg:gap-4">
          <Tile
            id="cafe"
            href="/espresso-machines?use=cafe"
            src="/images/product-la-nuova-era-anniversario.png"
            alt="La Nuova Era Anniversario espresso machine for cafes"
            title="Cafe"
            plate="Cafe"
            caption="Discover our premium collection of coffee machines >"
            sizes="(min-width: 1024px) 60vw, 100vw"
            fit="contain"
            delay={0}
          />
          <Tile
            id="hotel"
            href="/espresso-machines?use=hotel"
            src="/images/for-hotel-machines.png"
            alt="Commercial espresso machines for hotels"
            title="For Hotel"
            caption="Indulge your guest exquisite coffee select from our machine selection >"
            sizes="(min-width: 1024px) 60vw, 100vw"
            delay={120}
          />
        </div>

        <div className="grid grid-rows-3 gap-3 lg:min-h-[720px] lg:gap-4">
          <Tile
            id="restaurant"
            href="/espresso-machines?use=restaurant"
            src="/images/product-casadio-nettuno-a3.jpg"
            alt="Casadio Nettuno A3 espresso machine for restaurants"
            title="Restaurant"
            plate="Restaurant"
            caption="Evaluate coffee from Restaurant dinning experience >"
            sizes="(min-width: 1024px) 40vw, 100vw"
            fit="contain"
            delay={60}
          />
          <Tile
            id="office"
            href="/espresso-machines?use=office"
            src="/images/for-office.png"
            alt="Office coffee machine"
            title="For Office"
            caption="Fuel productivity delight on your office >"
            sizes="(min-width: 1024px) 40vw, 100vw"
            delay={180}
          />
          <Tile
            id="homes"
            href="/espresso-machines?use=home"
            src="/images/for-home.png"
            alt="Home espresso machine"
            title="For Homes"
            caption="Evaluate coffee from home >"
            sizes="(min-width: 1024px) 40vw, 100vw"
            delay={240}
          />
        </div>
      </div>
    </section>
  );
}
