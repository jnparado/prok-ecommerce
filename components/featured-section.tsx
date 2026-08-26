import Image from "@/components/media-image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function MachinePlate({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <span
      className="absolute top-5 left-5 z-10 animate-fade-up border border-white/85 px-3 py-1.5 text-[11px] font-medium tracking-[0.32em] text-white uppercase transition-[letter-spacing,background-color,border-color,color] duration-300 group-hover:border-[#f0c27a] group-hover:bg-[#82502a]/35 group-hover:tracking-[0.4em] group-hover:text-[#f0c27a] md:top-6 md:left-6"
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
        "group relative min-h-[180px] overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(80,50,20,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(80,50,20,0.18)] sm:min-h-[220px]",
        fit === "contain" && "bg-[#1a1a1a]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "transition-transform duration-700 ease-out group-hover:scale-[1.08]",
          fit === "contain" ? "object-contain p-6 md:p-8" : "object-cover"
        )}
        sizes={sizes}
      />
      <div
        className={cn(
          "absolute inset-0",
          fit === "contain"
            ? "bg-gradient-to-t from-black/80 via-black/20 to-black/35"
            : "bg-black/45"
        )}
      />
      {plate ? <MachinePlate label={plate} delay={delay} /> : null}
      {children}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
        <h2 className="overflow-hidden text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f0c27a] sm:text-3xl md:text-4xl">
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
          className="mt-2 flex max-w-md items-center text-sm text-white/90 transition-colors duration-300 group-hover:text-[#e7dbc8] animate-fade-up"
          style={{ animationDelay: `${delay + 180}ms` }}
        >
          <span>{captionText}</span>
          <span
            aria-hidden
            className="ml-1 inline-block transition-transform duration-500 ease-out group-hover:translate-x-2"
          >
            &gt;
          </span>
        </p>
        <span className="mt-3 block h-px w-0 bg-white/85 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-[#f0c27a]" />
      </div>
    </Link>
  );
}

export function FeaturedSection({
  cafeSrc,
  hotelSrc,
  restaurantSrc,
  officeSrc,
  homesSrc,
}: {
  cafeSrc?: string | null;
  hotelSrc?: string | null;
  restaurantSrc?: string | null;
  officeSrc?: string | null;
  homesSrc?: string | null;
} = {}) {
  return (
    <section id="espresso-machines" className="bg-[#f6f1e8] p-3 md:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.55fr_1fr] lg:gap-4">
        <div className="grid grid-rows-2 gap-3 lg:min-h-[720px] lg:gap-4">
          <Tile
            id="cafe"
            href="/espresso-machines?use=cafe"
            src={cafeSrc || "/images/the-importance-of-coffee-shops-in-communities-782577.jpg"}
            alt="Cafe interior with espresso bar and community seating"
            title="For Cafe"
            plate="Cafe"
            caption="Discover our premium collection of coffee machines >"
            sizes="(min-width: 1024px) 60vw, 100vw"
            delay={0}
          />
          <Tile
            id="hotel"
            href="/espresso-machines?use=hotel"
            src={hotelSrc || "/images/journeyman-cafe-supplied-3.jpg"}
            alt="Hotel and hospitality cafe with commercial espresso machines"
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
            src={restaurantSrc || "/images/feature_-_Main_hall_1.jpg"}
            alt="Restaurant dining room ready for coffee service"
            title="For Restaurant"
            plate="Restaurant"
            caption="Evaluate coffee from Restaurant dinning experience >"
            sizes="(min-width: 1024px) 40vw, 100vw"
            delay={60}
          />
          <Tile
            id="office"
            href="/espresso-machines?use=office"
            src={officeSrc || "/images/office-room.jpg"}
            alt="Modern office workspace for coffee service"
            title="For Office"
            caption="Fuel productivity delight on your office >"
            sizes="(min-width: 1024px) 40vw, 100vw"
            delay={180}
          />
          <Tile
            id="homes"
            href="/espresso-machines?use=home"
            src={homesSrc || "/images/home.jpg"}
            alt="Home kitchen with espresso machine"
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
