import Image from "@/components/media-image";
import Link from "next/link";

import { espressoDirectory } from "@/lib/site";

export function EspressoDirectory() {
  return (
    <div className="animate-fade-up rounded-[22px] bg-[#fff9f2] px-3 py-6 shadow-[0_18px_40px_rgba(80,50,20,0.06)] ring-1 ring-[#eadfce] sm:rounded-[28px] sm:px-4 sm:py-8 md:px-10 md:py-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
        {espressoDirectory.map((group, index) => (
          <article
            key={group.title}
            className="group flex items-center gap-3 animate-fade-up sm:gap-5 md:gap-6"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <Link
              href={group.href}
              className="relative size-[76px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_12px_28px_rgba(80,50,20,0.14)] ring-2 ring-white transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.05] group-hover:shadow-[0_18px_32px_rgba(80,50,20,0.2)] sm:size-[120px] sm:ring-4 md:size-[140px]"
            >
              <Image
                src={group.src}
                alt={group.alt}
                fill
                className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110 sm:p-3"
                sizes="140px"
              />
            </Link>
            <div className="min-w-0">
              <Link
                href={group.href}
                className="block text-base font-bold tracking-tight text-[#3d2416] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8b5a2b] sm:text-[1.2rem] md:text-[1.35rem]"
              >
                {group.title}
              </Link>
              <ul className="mt-1 space-y-0.5 sm:mt-2 sm:space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-medium text-[#c4783a] transition-colors duration-300 hover:text-[#8b5a2b] group-hover:text-[#8b5a2b] sm:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
