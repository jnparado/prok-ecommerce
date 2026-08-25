"use client";

import { useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { CoffeeMenu } from "@/components/coffee-menu";
import { EspressoMachineMenu } from "@/components/espresso-machine-menu";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  brandPageHref,
  headerNavLayout,
  headerNavOrder,
  navDisplayLabel,
  navItems,
  navItemsByLabels,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type NavItem = (typeof navItems)[number];
type CatalogMega = Extract<NavItem, { mega: "catalog" }>;
type BrandsMega = Extract<NavItem, { mega: "brands" }>;

const row1Left = navItemsByLabels(headerNavLayout.row1Left);
const row1Right = navItemsByLabels(headerNavLayout.row1Right);
const row2Left = navItemsByLabels(headerNavLayout.row2Left);
const row2Right = navItemsByLabels(headerNavLayout.row2Right);
const mobileNav = navItemsByLabels(headerNavOrder);

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

function hasDropdown(item: NavItem) {
  return hasChildren(item) || isCatalogMega(item) || isBrandsMega(item);
}

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("?")[0].split("#")[0];
  // Homepage anchors like /#news are not dedicated pages
  if (!path || path === "/") return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavLink({
  item,
  isOpen,
  isActive,
  onOpen,
}: {
  item: NavItem;
  isOpen: boolean;
  isActive: boolean;
  onOpen: () => void;
}) {
  const dropdown = hasDropdown(item);
  const highlighted = isOpen || isActive;

  return (
    <div onMouseEnter={onOpen} className="shrink-0">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-4 py-[7px] text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors",
          highlighted
            ? "border-[#82502a] bg-[#82502a] text-white"
            : "border-[#be9f79] bg-[#e7dbc8] text-[#222222] hover:border-[#82502a] hover:bg-[#82502a] hover:text-white"
        )}
      >
        {navDisplayLabel(item.label)}
        {dropdown ? (
          <ChevronDown
            className={cn(
              "size-3.5 text-current transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        ) : null}
      </Link>
    </div>
  );
}

function NavCluster({
  items,
  mega,
  pathname,
  onOpen,
}: {
  items: NavItem[];
  mega: string | null;
  pathname: string;
  onOpen: (item: NavItem) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-nowrap items-center gap-x-2">
      {items.map((item) => (
        <NavLink
          key={item.label}
          item={item}
          isOpen={mega === item.label}
          isActive={pathMatches(pathname, item.href)}
          onOpen={() => onOpen(item)}
        />
      ))}
    </div>
  );
}

function SearchForm({ className }: { className?: string }) {
  const [query, setQuery] = useState("");

  return (
    <form
      className={cn("flex min-w-0 overflow-hidden rounded-lg", className)}
      onSubmit={(event) => {
        event.preventDefault();
        document.getElementById("espresso-machines")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      <label className="flex min-w-0 flex-1">
        <span className="sr-only">Search</span>
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What are you looking for?"
          className="h-11 min-w-0 flex-1 rounded-none border-0 bg-white px-4 text-[15px] shadow-none placeholder:text-neutral-400 focus-visible:border-transparent focus-visible:ring-0"
        />
      </label>
      <Button
        type="submit"
        aria-label="Search"
        className="size-11 shrink-0 rounded-none border-0 bg-[#1a633a] text-white hover:bg-[#164f2e]"
      >
        <Search className="size-5" />
      </Button>
    </form>
  );
}

function useFromHref(href: string) {
  const query = href.split("?")[1];
  if (!query) return null;
  return new URLSearchParams(query).get("use");
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [catalogUse, setCatalogUse] = useState("cafe");
  const pathname = usePathname();

  const openItem = navItems.find((item) => item.label === mega);

  function close() {
    setMega(null);
    setMobileOpen(false);
  }

  function openNavItem(item: NavItem) {
    setMega(hasDropdown(item) ? item.label : null);
    if (item.label === "Espresso Machines") {
      setCatalogUse("cafe");
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-[#d3b99b] text-neutral-900 shadow-[0_8px_24px_rgba(80,50,20,0.08)]"
      onMouseLeave={() => setMega(null)}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:gap-8 lg:px-10 lg:py-5">
        <SiteLogo className="min-w-0 shrink-0 [&_img]:h-10 sm:[&_img]:h-11 lg:[&_img]:h-12" />

        <SearchForm className="hidden max-w-[760px] flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/admin/login"
            className="hidden items-center gap-2 text-[13px] font-medium text-[#222222] hover:text-[#82502a] md:inline-flex"
          >
            <User className="size-[22px] stroke-[1.6]" />
            Admin Login
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-neutral-800 hover:text-[#165c38] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchForm />
      </div>

      <nav className="hidden lg:block">
        <div className="mx-auto max-w-[1440px] px-4 pb-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-10">
            <NavCluster items={row1Left} mega={mega} pathname={pathname} onOpen={openNavItem} />
            <NavCluster items={row1Right} mega={mega} pathname={pathname} onOpen={openNavItem} />
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-10">
            <NavCluster items={row2Left} mega={mega} pathname={pathname} onOpen={openNavItem} />
            <NavCluster items={row2Right} mega={mega} pathname={pathname} onOpen={openNavItem} />
          </div>
        </div>
      </nav>

      {openItem && isBrandsMega(openItem) ? (
        <div className="absolute inset-x-0 top-full border-t border-[#cbb392] bg-[#fffaf4] shadow-[0_18px_40px_rgba(80,50,20,0.12)]">
          <div className="mx-auto flex max-w-[1440px] items-stretch gap-2 overflow-visible px-3 py-6 sm:gap-3 sm:px-6 lg:px-10 lg:py-7">
            {openItem.brands.map((name) => (
              <Link
                key={name}
                href={brandPageHref(name)}
                onClick={close}
                className="flex min-h-[140px] min-w-0 flex-1 items-center justify-center rounded-xl bg-white px-1.5 py-4 ring-1 ring-[#eadfce] transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-[0_12px_24px_rgba(80,50,20,0.12)] sm:min-h-[160px] sm:px-2"
              >
                <BrandMark name={name} size="lg" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {openItem && isCatalogMega(openItem) && openItem.label === "Coffee" ? (
        <div className="absolute inset-x-0 top-full shadow-[0_18px_40px_rgba(80,50,20,0.12)]">
          <CoffeeMenu onNavigate={close} />
        </div>
      ) : null}

      {openItem && isCatalogMega(openItem) && openItem.label === "Espresso Machines" ? (
        <div className="absolute inset-x-0 top-full border-t border-[#cbb392] shadow-[0_18px_40px_rgba(80,50,20,0.12)]">
          <EspressoMachineMenu onNavigate={close} />
        </div>
      ) : null}

      {openItem &&
      isCatalogMega(openItem) &&
      openItem.label !== "Espresso Machines" &&
      openItem.label !== "Coffee" ? (
        <div className="absolute inset-x-0 top-full border-t border-[#cbb392] bg-[#fffaf4] shadow-[0_18px_40px_rgba(80,50,20,0.12)]">
          <div className="mx-auto max-w-[1440px] px-8 py-8 lg:px-10 lg:py-10">
            <div className="flex flex-wrap gap-16 lg:gap-28">
              <ul className="space-y-1">
                {openItem.children.map((child) => {
                  const childUse = useFromHref(child.href);
                  const active = Boolean(childUse && childUse === catalogUse);

                  return (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className={cn(
                          "block rounded-md px-1 py-1.5 text-[15px] transition-colors hover:text-[#165c38]",
                          active ? "font-medium text-[#165c38]" : "text-zinc-700"
                        )}
                        onMouseEnter={() => {
                          if (childUse) setCatalogUse(childUse);
                        }}
                        onClick={close}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {openItem.extras.length > 0 ? (
                <ul className="space-y-1">
                  {openItem.extras.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="block rounded-md px-1 py-1.5 text-[15px] text-zinc-700 transition-colors hover:text-[#165c38]"
                        onClick={close}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              {!("brands" in openItem) && openItem.featured.length > 0 ? (
                <div className="ml-auto flex gap-6">
                  {openItem.featured.map((brand) => (
                    <div key={brand.cta} className="flex w-36 flex-col items-center">
                      <div className="flex h-[100px] w-36 items-center justify-center rounded-xl bg-white ring-1 ring-[#eadfce]">
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
                          <BrandMark name={brand.name} size="lg" />
                        ) : null}
                      </div>
                      <Link
                        href={brand.href}
                        className="mt-3 text-center text-sm text-[#165c38] hover:underline"
                        onClick={close}
                      >
                        {brand.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {openItem && hasChildren(openItem) && !isCatalogMega(openItem) && !isBrandsMega(openItem) ? (
        <div className="absolute inset-x-0 top-full border-t border-[#cbb392] bg-[#fffaf4] py-3 shadow-[0_18px_40px_rgba(80,50,20,0.12)]">
          <div className="mx-auto flex max-w-[1440px] gap-6 px-10">
            {openItem.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                className="text-sm text-zinc-700 hover:text-[#165c38]"
                onClick={close}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "border-t border-[#be9f79] bg-[#d3b99b] lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="flex max-h-[70vh] flex-col overflow-y-auto px-4 py-3">
          <div className="mb-2 flex flex-col gap-3 border-b border-[#be9f79] pb-3">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#222222]"
              onClick={close}
            >
              <User className="size-5 stroke-[1.6]" />
              Admin Login
            </Link>
          </div>
          {mobileNav.map((item) => (
            <div key={item.label} className="py-1.5">
              <Link
                href={item.href}
                aria-current={pathMatches(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-full border px-4 py-2.5 text-sm font-medium",
                  pathMatches(pathname, item.href)
                    ? "border-[#82502a] bg-[#82502a] text-white"
                    : "border-[#be9f79] bg-[#e7dbc8] text-[#222222]"
                )}
                onClick={close}
              >
                {navDisplayLabel(item.label)}
                {hasDropdown(item) ? (
                  <ChevronDown className="size-4 text-current" />
                ) : null}
              </Link>
              {hasChildren(item)
                ? item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2 pl-3 text-sm text-neutral-600"
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
                      className="block py-2 pl-3 text-sm text-neutral-600"
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
                      className="block py-2 pl-3 text-sm text-neutral-600"
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
