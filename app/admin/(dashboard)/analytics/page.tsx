import { requireAdmin } from "@/lib/admin/auth";

export default async function AnalyticsPage() {
  const { supabase } = await requireAdmin();
  const [products, orders, media] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#3d2416]">Analytics</h1>
      <p className="mt-1 text-sm text-zinc-500">Catalog snapshot. Traffic analytics can be connected later.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#eadfce] bg-white p-5">
          <p className="text-sm text-zinc-500">Products</p>
          <p className="mt-2 font-serif text-3xl text-[#82502a]">{products.count ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[#eadfce] bg-white p-5">
          <p className="text-sm text-zinc-500">Orders</p>
          <p className="mt-2 font-serif text-3xl text-[#82502a]">{orders.count ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[#eadfce] bg-white p-5">
          <p className="text-sm text-zinc-500">Media files</p>
          <p className="mt-2 font-serif text-3xl text-[#82502a]">{media.count ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
