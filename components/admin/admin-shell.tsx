"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  {
    label: "Homepage",
    icon: Home,
    children: [
      { href: "/admin/homepage/sliders", label: "Sliders" },
      { href: "/admin/homepage/sections", label: "Sections" },
      { href: "/admin/homepage/images", label: "Images" },
    ],
  },
  {
    label: "Products",
    icon: ShoppingBag,
    children: [
      { href: "/admin/products", label: "All Products" },
      { href: "/admin/products/new", label: "Add Product" },
      { href: "/admin/products/categories", label: "Categories" },
      { href: "/admin/products/inventory", label: "Inventory" },
    ],
  },
  { href: "/admin/brands", label: "Brands", icon: Tag },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/training", label: "Barista Training", icon: BookOpen },
  {
    label: "News & Events",
    icon: Newspaper,
    children: [
      { href: "/admin/news", label: "News" },
      { href: "/admin/events", label: "Events" },
    ],
  },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<Record<string, boolean>>({
    Homepage: true,
    Products: true,
    "News & Events": true,
  });

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-full bg-[#efe6d8]">
      <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col bg-[#3d2416] text-[#f6efe6]">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[11px] tracking-[0.18em] text-[#e7dbc8] uppercase">Prokrate</p>
          <p className="mt-1 font-serif text-xl">Admin Dashboard</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 text-sm">
          {nav.map((item) => {
            if ("children" in item) {
              const expanded = open[item.label] ?? false;
              const childActive = item.children.some((child) => isActive(pathname, child.href));
              return (
                <div key={item.label} className="mb-1">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-white/10",
                      childActive && "bg-white/10"
                    )}
                    onClick={() => setOpen((value) => ({ ...value, [item.label]: !expanded }))}
                  >
                    <item.icon className="size-4" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronDown className={cn("size-3.5 transition", expanded && "rotate-180")} />
                  </button>
                  {expanded ? (
                    <div className="mt-1 ml-4 space-y-0.5 border-l border-white/15 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-md px-2 py-1.5 text-[#e7dbc8] hover:bg-white/10 hover:text-white",
                            isActive(pathname, child.href) && "bg-[#82502a] text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mb-1 flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10",
                  isActive(pathname, item.href, "exact" in item && item.exact) && "bg-[#82502a] text-white"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-4 py-4">
          <p className="truncate text-xs text-[#e7dbc8]">{email}</p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-2 inline-flex items-center gap-2 text-sm text-[#e7dbc8] hover:text-white"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[#eadfce] bg-white px-6 py-4">
          <p className="text-sm text-[#6b3e24]">Website content management</p>
          <Link href="/" className="text-sm font-medium text-[#82502a] hover:underline">
            View site
          </Link>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
