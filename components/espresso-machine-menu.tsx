import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { brandSlug } from "@/lib/site";
import { cn } from "@/lib/utils";

const uses = [
  { label: "Cafe", href: "/espresso-machines?use=cafe", slug: "cafe" },
  { label: "Restaurant", href: "/espresso-machines?use=restaurant", slug: "restaurant" },
  { label: "Hotel", href: "/espresso-machines?use=hotel", slug: "hotel" },
  { label: "Office", href: "/espresso-machines?use=office", slug: "office" },
  { label: "Home", href: "/espresso-machines?use=home", slug: "home" },
] as const;

const groups = [
  { label: "Single Group", href: "/espresso-machines?group=1", value: 1 },
  { label: "Double Group", href: "/espresso-machines?group=2", value: 2 },
] as const;

const brands = ["La Nuova Era", "Slayer", "Casadio", "didiesse"] as const;

export function EspressoMachineMenu({
  use,
  group,
  onNavigate,
  className,
}: {
  use?: string;
  group?: number;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("bg-[#fffaf4]", className)}>
      <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap gap-16 lg:gap-28">
          <ul className="space-y-1">
            {uses.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md py-1.5 text-[15px] transition-colors hover:text-[#165c38]",
                    use === item.slug
                      ? "font-medium text-[#165c38]"
                      : "text-zinc-700"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-1">
            {groups.map((item) => (
              <li key={item.value}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md py-1.5 text-[15px] transition-colors hover:text-[#165c38]",
                    group === item.value
                      ? "font-medium text-[#165c38]"
                      : "text-zinc-700"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-1">
            <li>
              <Link
                href="/#packages"
                onClick={onNavigate}
                className="block rounded-md py-1.5 text-[15px] font-medium text-[#165c38] transition-colors hover:text-[#124c2e]"
              >
                Package Deals
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-3">
          {brands.map((name) => (
            <Link
              key={name}
              href={`/espresso-machines?brand=${brandSlug(name)}`}
              onClick={onNavigate}
              className="flex h-[100px] min-w-0 flex-1 items-center justify-center rounded-xl bg-white px-2 ring-1 ring-[#eadfce] transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_10px_20px_rgba(80,50,20,0.12)]"
            >
              <BrandMark name={name} size="lg" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
