import Image from "@/components/media-image";
import Link from "next/link";
import {
  Coffee,
  Globe,
  GraduationCap,
  Headset,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Utensils,
  Wrench,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { CollectionBanner } from "@/components/collection-banner";
import { aboutCopy, brandLogos } from "@/lib/site";

const serviceIcons = [
  Coffee,
  GraduationCap,
  Wrench,
  Utensils,
  Package,
  ShoppingBag,
  Headset,
];

export function AboutPage() {
  return (
    <main className="flex-1 overflow-hidden bg-[#f6f1e8]">
      <CollectionBanner
        title="Our Company"
        description={aboutCopy.company}
        eyebrow="About"
      />

      <section className="mx-auto max-w-[860px] space-y-8 px-4 py-8 md:px-6 md:py-10">
        <article className="animate-scale-in rounded-[15px] bg-white px-5 py-8 text-center shadow-[8px_12px_28px_rgba(0,0,0,0.12)] sm:px-10 sm:py-12 md:px-16 md:py-14">
          <h2 className="flex flex-wrap items-baseline justify-center gap-x-2 text-2xl font-bold tracking-tight text-black uppercase md:text-[1.85rem]">
            Your Coffee Essentials
            <span className="text-sm font-normal tracking-[0.08em] text-[#800000] md:text-base">
              In One Stop
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-[15px] leading-7 text-zinc-700">
            {aboutCopy.company}
          </p>
        </article>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-start gap-10 px-4 pb-12 md:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[8px_12px_28px_rgba(0,0,0,0.12)]">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="flex size-12 items-center justify-center rounded-full bg-white shadow">
              <Coffee className="size-5 text-[#8b5a2b]" />
            </span>
            <span className="flex size-12 items-center justify-center rounded-full border-2 border-[#8b5a2b] bg-white text-center text-[8px] leading-tight font-bold text-[#8b5a2b]">
              SCA
              <br />
              MEMBER
            </span>
          </div>

          <div className="relative h-56 bg-[#f6efe6] sm:h-64">
            <Image
              src="/images/about-services.png"
              alt="Espresso machine and coffee grinder"
              fill
              className="object-contain object-bottom p-4 pt-10"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="relative -mt-8 bg-white px-6 pt-10 pb-6 text-center">
            <div className="pointer-events-none absolute -top-10 right-0 left-0 h-12 overflow-hidden">
              <svg viewBox="0 0 500 48" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 48 C 125 0 375 0 500 48 L 500 48 L 0 48 Z" fill="white" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-wide text-[#4a2c1a] uppercase">
              Our Services
            </h2>
            <p className="mt-1 text-[11px] tracking-[0.08em] text-zinc-500 uppercase">
              Your one stop shop coffee &amp; beverage supplies
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3 text-left text-[13px] text-zinc-700 sm:grid-cols-2">
              {aboutCopy.services.map((service, i) => {
                const Icon = serviceIcons[i];
                return (
                  <li key={service} className="flex items-start gap-2">
                    <Icon className="mt-0.5 size-4 shrink-0 text-[#8b5a2b]" />
                    <span>{service}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative bg-[#b08d75] px-5 pt-8 pb-4 text-white">
            <div className="pointer-events-none absolute -top-8 right-0 left-0 h-8 overflow-hidden">
              <svg viewBox="0 0 500 32" preserveAspectRatio="none" className="h-full w-full">
                <path d="M0 32 C 125 0 375 0 500 32 L 500 32 L 0 32 Z" fill="#b08d75" />
              </svg>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 text-[11px] leading-snug">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" />
                  Unit 112 GF Goldwin Bldg., Quirino Avenue, Davao City
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-3.5 shrink-0" />
                  082-322 3478 · 0917 703 1653
                </p>
                <p className="flex items-start gap-2">
                  <Globe className="mt-0.5 size-3.5 shrink-0" />
                  www.prokrate.com
                </p>
              </div>
              <Link
                href="/espresso-machines"
                className="inline-flex h-8 shrink-0 items-center justify-center rounded border border-white px-3 text-[11px] font-semibold tracking-wide"
              >
                ORDER NOW &gt;
              </Link>
              <p className="hidden text-right text-[10px] font-bold tracking-[0.12em] uppercase sm:block">
                Prokrate
                <br />
                International
              </p>
            </div>
          </div>
        </div>

        <div className="py-2 lg:pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#4a2c1a] uppercase">
            Our Objectives
          </h2>
          <div className="mt-3 mb-6 h-px w-full bg-[#4a2c1a]/40" />
          <ul className="list-disc space-y-5 pl-5 text-[15px] leading-7 text-zinc-700">
            {aboutCopy.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#fff9f2]">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-4 py-12 md:gap-16 md:px-6 md:py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-[340px]">
            <Image
              src="/images/about-latte.png"
              alt="Latte art and pouring milk"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center text-white md:min-h-[340px]">
              <p className="text-[10px] tracking-[0.22em] uppercase">
                Espresso Machines · Coffee Beans · Beverages · Syrups
              </p>
              <p className="mt-4 font-serif text-3xl italic md:text-4xl">
                &ldquo;Together with Passion&rdquo;
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex h-9 items-center justify-center rounded-sm border border-white px-5 text-xs font-medium tracking-wide text-white hover:bg-white hover:text-zinc-900"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#3d2a1e] uppercase">
              Our Mission
            </h2>
            <ul className="mt-6 list-disc space-y-5 pl-5 text-[15px] leading-7 text-zinc-800">
              {aboutCopy.mission.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="our-brand" className="px-4 pb-16 md:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-[0.14em] text-[#6b3e24] uppercase">
          Our Brand
        </h2>
        <div className="mx-auto mt-8 grid max-w-[1280px] grid-cols-2 gap-3 sm:grid-cols-4 xl:flex xl:items-stretch">
          {brandLogos.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="flex min-h-[120px] items-center justify-center rounded-xl bg-[#e6e6e6] px-2 py-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-[1.05] hover:bg-[#f3f3f3] hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)] sm:min-h-[140px] xl:h-[160px] xl:min-w-0 xl:flex-1"
            >
              <BrandMark name={brand.name} size="lg" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
