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
        src={imageSrc || "/images/machine-services-hero.png"}
        alt="Espresso machine in a service workshop"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[420px]">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title || machineServicesCopy.title}
        </h2>
        <p className="mt-5 max-w-[54ch] text-[15px] leading-7 text-white/95 md:text-base">
          {description || machineServicesCopy.body}
        </p>
        {buttonLabel && buttonHref ? (
          <Link
            href={buttonHref}
            className="mt-8 inline-flex h-10 items-center justify-center rounded-full border border-white px-6 text-sm font-medium text-white hover:bg-white hover:text-[#3d2416]"
          >
            {buttonLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
