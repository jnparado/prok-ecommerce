import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { coffeeCategories } from "@/lib/site";

export function CoffeeMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="bg-[#fffaf4]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-3 items-center px-8 py-10 lg:px-12 lg:py-12">
        <ul className="space-y-1">
          {coffeeCategories.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/coffee?category=${item.slug}`}
                onClick={onNavigate}
                className="block py-1 text-[15px] text-[#333333] transition-colors hover:text-[#82502a]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-center gap-3">
          <BrandMark name="Marcafé" size="lg" />
          <Link
            href="/coffee?category=beans"
            onClick={onNavigate}
            className="text-[15px] text-[#bda68a] transition-colors hover:underline"
          >
            View Roasted Coffee
          </Link>
        </div>

        <div />
      </div>
    </div>
  );
}
