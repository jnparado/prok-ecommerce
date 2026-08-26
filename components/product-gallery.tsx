import Image from "@/components/media-image";
import Link from "next/link";

import { dreamCafeShopTiles, featuredProducts } from "@/lib/site";

function formatPeso(value: number) {
  return `₱${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function ProductGallery() {
  return (
    <section className="bg-[#f6f1e8] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900 md:text-[1.85rem]">
          Start your dream cafe business
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(200px,0.28fr)] lg:gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group flex flex-col border border-[#e6ddd0] bg-white p-3 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(80,50,20,0.14)] sm:p-4"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={product.src}
                    alt={product.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04] sm:p-3"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 22vw, 45vw"
                  />
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-snug text-neutral-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{product.brand}</p>
                <p className="mt-2 text-[15px] font-bold text-neutral-900">
                  {formatPeso(product.price)}
                </p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
            {dreamCafeShopTiles.map((tile) => (
              <Link
                key={tile.label}
                href={tile.href}
                className="group relative min-h-[180px] overflow-hidden lg:min-h-0"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/35" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                  <span className="text-sm font-medium tracking-wide">Shop</span>
                  <span className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
                    {tile.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
