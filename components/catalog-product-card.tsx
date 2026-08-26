import Image from "@/components/media-image";
import NextImage from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CatalogProductCard({
  name,
  src,
  alt,
  brand,
  detail,
  preload,
  local,
  index = 0,
  sizes = "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw",
}: {
  name: string;
  src: string;
  alt?: string;
  brand?: string;
  detail?: string;
  preload?: boolean;
  local?: boolean;
  index?: number;
  sizes?: string;
}) {
  const ImageTag = local ? NextImage : Image;

  return (
    <Card
      className={cn(
        "group aspect-[3/4] gap-0 border-0 py-0 ring-[#eadfce] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_40px_rgba(80,50,20,0.16)] hover:ring-[#c4a882] animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index, 12) * 70}ms` }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#faf6ef]">
        <ImageTag
          src={src}
          alt={alt ?? name}
          fill
          preload={preload}
          className={cn(
            "object-contain p-2 pt-4 transition-transform duration-700 ease-out group-hover:scale-110 sm:p-4 sm:pt-6",
            local && "drop-shadow-[0_16px_22px_rgba(80,50,20,0.14)]"
          )}
          sizes={sizes}
        />
      </div>
      <CardContent className="px-2 pt-2 pb-4 sm:px-4 sm:pt-3 sm:pb-5">
        {brand ? (
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#8b5a2b] uppercase sm:text-[11px]">
            {brand}
          </p>
        ) : null}
        <p className="mt-1 text-[13px] font-medium text-[#3d2416] transition-colors duration-300 group-hover:text-[#8b5a2b] sm:text-[15px]">{name}</p>
        {detail ? <p className="mt-1 text-xs text-zinc-500">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
