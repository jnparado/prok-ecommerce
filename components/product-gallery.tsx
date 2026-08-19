import Image from "next/image";
import Link from "next/link";

import { featuredProducts } from "@/lib/site";

function formatPeso(value: number) {
  return `₱ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function ProductGallery() {
  return (
    <section className="bg-white px-4 pb-16 md:px-8">
      <div className="mx-auto max-w-[1180px] rounded-2xl bg-[#f3eee6] px-5 py-12 sm:px-8 md:px-10 md:py-16">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-zinc-800 md:text-[2.15rem]">
            Start your dream cafe business
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Our most loved selections by coffee connoisseurs
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.name}
              href="/espresso-machines"
              className="group flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
              <span className="mx-auto mt-3 inline-flex items-center rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-white">
                {product.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-zinc-800">{product.name}</h3>
              <p className="mt-1 text-xs text-zinc-400">{product.brand}</p>
              <p className="mt-2 text-sm font-semibold text-zinc-800">
                {formatPeso(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
