import Image from "next/image";
import Link from "next/link";

export function ServicesBanner() {
  return (
    <section id="service" className="relative min-h-[240px] overflow-hidden md:min-h-[300px]">
      <Image
        src="/images/services-banner.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative flex min-h-[240px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[300px]">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Services</h2>
        <Link
          href="#homes"
          className="mt-4 text-sm text-white/95 transition-colors hover:text-white md:text-base"
        >
          Evaluate coffee from home <span aria-hidden="true">&gt;</span>
        </Link>
      </div>
    </section>
  );
}
