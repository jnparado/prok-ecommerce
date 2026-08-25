import { requireAdmin } from "@/lib/admin/auth";

export default async function OrdersPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("orders").select("id, status, total, created_at").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#3d2416]">Orders</h1>
      <p className="mt-1 text-sm text-zinc-500">Orders appear here when checkout is connected.</p>
      <div className="mt-6 overflow-hidden rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).length ? (
              (data ?? []).map((row) => (
                <tr key={row.id} className="border-t border-[#eadfce]">
                  <td className="px-4 py-3 font-mono text-xs">{row.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">{row.status}</td>
                  <td className="px-4 py-3">{row.total}</td>
                  <td className="px-4 py-3">{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
