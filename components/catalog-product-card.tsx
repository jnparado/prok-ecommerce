import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CatalogProductCard({
  name,
  src,
  alt,
  brand,
  detail,
  preload,
  index = 0,
  sizes = "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw",
}: {
  name: string;
  src: string;
  alt?: string;
  brand?: string;
  detail?: string;
  preload?: boolean;
  index?: number;
  sizes?: string;
}) {
  return (
    <Card
      className={cn(
        "group aspect-[3/4] gap-0 border-0 py-0 ring-[#eadfce] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_40px_rgba(80,50,20,0.16)] hover:ring-[#c4a882] animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#faf6ef]">
        <Image
          src={src}
          alt={alt ?? name}
          fill
          preload={preload}
          className="object-contain p-4 pt-6 transition-transform duration-700 ease-out group-hover:scale-110"
          sizes={sizes}
        />
      </div>
      <CardContent className="px-4 pt-3 pb-5">
        {brand ? (
          <p className="text-[11px] font-medium tracking-[0.16em] text-[#8b5a2b] uppercase">
            {brand}
          </p>
        ) : null}
        <p className="mt-1 text-[15px] font-medium text-[#3d2416]">{name}</p>
        {detail ? <p className="mt-1 text-xs text-zinc-500">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
