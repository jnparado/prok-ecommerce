import Link from "next/link";

import { requireAdmin } from "@/lib/admin/auth";

const cards = [
  { href: "/admin/homepage/sliders", label: "Homepage sliders", key: "hero_slides" },
  { href: "/admin/products", label: "Products", key: "products" },
  { href: "/admin/brands", label: "Brands", key: "brands" },
  { href: "/admin/services", label: "Services", key: "services" },
  { href: "/admin/training", label: "Training courses", key: "training_courses" },
  { href: "/admin/news", label: "News", key: "news" },
  { href: "/admin/events", label: "Events", key: "events" },
  { href: "/admin/media", label: "Media files", key: "media" },
] as const;

export default async function AdminHomePage() {
  const { supabase } = await requireAdmin();
  const counts = await Promise.all(
    cards.map(async (card) => {
      const { count } = await supabase.from(card.key).select("*", { count: "exact", head: true });
      return { ...card, count: count ?? 0 };
    })
  );

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#3d2416]">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">Manage the public website without editing code.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {counts.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-[#eadfce] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(80,50,20,0.1)]"
          >
            <p className="text-sm text-zinc-500">{card.label}</p>
            <p className="mt-2 font-serif text-3xl text-[#82502a]">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
