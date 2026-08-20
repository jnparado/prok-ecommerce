import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export function CatalogProductCard({
  name,
  src,
  alt,
  preload,
  sizes = "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw",
}: {
  name: string;
  src: string;
  alt?: string;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <Card className="aspect-[3/4] gap-0 py-0">
      <div className="relative min-h-0 flex-1">
        <Image
          src={src}
          alt={alt ?? name}
          fill
          preload={preload}
          className="object-contain p-3 pt-6"
          sizes={sizes}
        />
      </div>
      <CardContent className="px-4 pb-5">
        <p className="text-[15px] text-[#b08968]">{name}</p>
      </CardContent>
    </Card>
  );
}
