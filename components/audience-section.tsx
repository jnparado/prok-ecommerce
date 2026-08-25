import Image from "@/components/media-image";
import Link from "next/link";

import { audienceTiles } from "@/lib/site";

export function AudienceSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {audienceTiles.map((tile) => (
        <Link
          key={tile.id}
          id={tile.id}
          href={tile.href}
          className="group relative min-h-[240px] overflow-hidden lg:min-h-[280px]"
        >
          <Image
            src={tile.src}
            alt={tile.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
            <h2 className="text-3xl font-semibold tracking-tight">{tile.title}</h2>
            <p className="mt-2 text-sm text-white/90">{tile.caption}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
