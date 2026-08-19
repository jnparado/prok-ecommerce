"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { brandPageHref, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavItem = (typeof navItems)[number];
type CatalogMega = Extract<NavItem, { mega: "catalog" }>;
type BrandsMega = Extract<NavItem, { mega: "brands" }>;

function hasChildren(
  item: NavItem
): item is NavItem & { children: readonly { label: string; href: string }[] } {
  return "children" in item;
}

function isCatalogMega(item: NavItem): item is CatalogMega {
  return "mega" in item && item.mega === "catalog";
}

function isBrandsMega(item: NavItem): item is BrandsMega {
  return "mega" in item && item.mega === "brands";
}

function CubeMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden="true">
      <polygon points="16,3 29,10.5 16,18 3,10.5" fill="#c0392b" />
      <polygon points="3,10.5 16,18 16,31 3,23.5" fill="#1e7a4a" />
      <polygon points="16,18 29,10.5 29,23.5 16,31" fill="#8b5a2b" />
    </svg>
  );
}

function NavPill({
  item,
  isOpen,
  onOpen,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const dropdown = hasChildren(item) || isCatalogMega(item) || isBrandsMega(item);

  return (
    <div onMouseEnter={onOpen} className="shrink-0">
      <Link
        href={item.href}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full border px-2.5 py-1 text-[12px] font-medium whitespace-nowrap transition-colors",
          isOpen
            ? "border-[#8b5a2b] bg-[#8b5a2b] text-white"
            : "border-zinc-300 bg-white/80 text-zinc-800 hover:bg-white"
        )}
      >
        {item.label}
        {dropdown ? (
          <ChevronDown className={cn("size-3 transition-transform", isOpen && "rotate-180")} />
        ) : null}
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const openItem = navItems.find((item) => item.label === mega);

  function close() {
    setMega(null);
    setMobileOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-50 bg-[#f0eee9]"
      onMouseLeave={() => setMega(null)}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <CubeMark />
          <span className="truncate text-[11px] leading-tight font-bold tracking-wide uppercase sm:text-xs">
            <span className="text-[#c0392b]">Prokrate International</span>{" "}
            <span className="text-zinc-800">Trading Corporation</span>
          </span>
          <span className="hidden shrink-0 text-lg font-bold tracking-tight lg:inline">
            <span className="text-[#c0392b]">P/T</span>
            <span className="text-zinc-800">corp</span>
          </span>
        </Link>

        <form
          className="hidden items-center sm:flex"
          onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("espresso-machines")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-9 w-44 rounded-l border border-zinc-300 bg-white px-3 text-sm outline-none lg:w-64"
          />
          <button
            type="submit"
            aria-label="Search"
            className="inline-flex size-9 items-center justify-center rounded-r bg-[#6b3e24] text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </form>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center text-zinc-800 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav className="hidden w-full px-3 pb-3 lg:block">
        <div className="mx-auto flex max-w-none flex-nowrap items-center gap-1.5 overflow-x-auto px-1 xl:justify-start">
          {navItems.map((item) => (
            <NavPill
              key={item.label}
              item={item}
              isOpen={mega === item.label || item.href === pathname}
              onOpen={() =>
                setMega(
                  hasChildren(item) || isCatalogMega(item) || isBrandsMega(item)
                    ? item.label
                    : null
                )
              }
            />
          ))}
        </div>
      </nav>

      {openItem && isBrandsMega(openItem) ? (
        <div className="absolute inset-x-0 top-full border-t border-zinc-200 bg-gradient-to-b from-white to-[#eee] shadow-sm">
          <div className="mx-auto flex max-w-[1280px] gap-3 overflow-x-auto px-4 py-6 lg:px-6">
            {openItem.brands.map((name) => (
              <Link
                key={name}
                href={brandPageHref(name)}
                onClick={close}
                className="flex h-28 w-[132px] shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white px-2"
              >
                <BrandMark name={name} />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {openItem && isCatalogMega(openItem) ? (
        <div className="absolute inset-x-0 top-full border-t border-zinc-200 bg-gradient-to-b from-white to-[#eee] shadow-sm">
          <div className="mx-auto grid max-w-[1100px] grid-cols-[1fr_1fr_auto] items-start gap-12 px-8 py-8">
            <ul className="space-y-3">
              {openItem.children.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    className="text-sm text-zinc-700 hover:text-[#8b5a2b]"
                    onClick={close}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {openItem.extras.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    className="text-sm text-zinc-700 hover:text-[#8b5a2b]"
                    onClick={close}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-8">
              {openItem.featured.map((brand) => (
                <div key={brand.cta} className="flex w-36 flex-col items-center">
                  <div className="flex h-24 w-36 items-center justify-center border border-zinc-200 bg-white">
                    {brand.src ? (
                      <div className="relative h-20 w-32">
                        <Image
                          src={brand.src}
                          alt={brand.alt}
                          fill
                          className="object-contain p-2"
                          sizes="144px"
                        />
                      </div>
                    ) : brand.name ? (
                      <BrandMark name={brand.name} />
                    ) : null}
                  </div>
                  <Link
                    href={brand.href}
                    className="mt-3 text-center text-sm text-[#8b5a2b] hover:underline"
                    onClick={close}
                  >
                    {brand.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {openItem && hasChildren(openItem) && !isCatalogMega(openItem) && !isBrandsMega(openItem) ? (
        <div className="absolute inset-x-0 top-full border-t border-zinc-200 bg-white py-3 shadow-sm">
          <div className="mx-auto flex max-w-[1280px] gap-6 px-6">
            {openItem.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="text-sm text-zinc-700 hover:text-[#8b5a2b]"
                onClick={close}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className={cn("border-t border-zinc-200 bg-white lg:hidden", mobileOpen ? "block" : "hidden")}>
        <div className="flex max-h-[70vh] flex-col overflow-y-auto px-4 py-3">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-zinc-100 last:border-b-0">
              <Link
                href={item.href}
                className="flex items-center justify-between py-3 text-sm font-medium"
                onClick={close}
              >
                {item.label}
                {hasChildren(item) || isCatalogMega(item) || isBrandsMega(item) ? (
                  <ChevronDown className="size-4 text-zinc-400" />
                ) : null}
              </Link>
              {hasChildren(item)
                ? item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2 pl-3 text-sm text-zinc-500"
                      onClick={close}
                    >
                      {child.label}
                    </Link>
                  ))
                : null}
              {isCatalogMega(item)
                ? item.extras.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2 pl-3 text-sm text-zinc-500"
                      onClick={close}
                    >
                      {child.label}
                    </Link>
                  ))
                : null}
              {isBrandsMega(item)
                ? item.brands.map((name) => (
                    <Link
                      key={name}
                      href={brandPageHref(name)}
                      className="block py-2 pl-3 text-sm text-zinc-500"
                      onClick={close}
                    >
                      {name}
                    </Link>
                  ))
                : null}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
