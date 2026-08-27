import Image from "@/components/media-image";
import Link from "next/link";

import { machineServicesCopy } from "@/lib/site";

export function ServicesBanner({
  title,
  description,
  imageSrc,
  buttonLabel,
  buttonHref,
}: {
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
}) {
  return (
    <section id="service" className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
      <Image
        src={imageSrc || "/images/machine-services-hero.jpg"}
        alt="Commercial espresso machines on the workshop bench for service"
        fill
        className="object-cover animate-ken-burns"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[420px]">
        <h2 className="animate-hero-copy text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title || machineServicesCopy.title}
        </h2>
        <p className="mt-5 max-w-[54ch] animate-hero-copy text-[15px] leading-7 text-white/95 md:text-base [animation-delay:140ms]">
          {description || machineServicesCopy.body}
        </p>
        {buttonLabel && buttonHref ? (
          <Link
            href={buttonHref}
            className="relative mt-8 inline-flex h-11 items-center justify-center overflow-hidden rounded-full border border-white px-8 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.04] hover:bg-white hover:text-[#3d2416]"
          >
            <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-cta-shine" />
            <span className="relative">{buttonLabel}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
