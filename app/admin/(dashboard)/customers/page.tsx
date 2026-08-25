import { requireAdmin } from "@/lib/admin/auth";

export default async function CustomersPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("customers").select("id, name, email, phone, created_at").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#3d2416]">Customers</h1>
      <p className="mt-1 text-sm text-zinc-500">Customer records from inquiries and orders.</p>
      <div className="mt-6 overflow-hidden rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).length ? (
              (data ?? []).map((row) => (
                <tr key={row.id} className="border-t border-[#eadfce]">
                  <td className="px-4 py-3">{row.name ?? "—"}</td>
                  <td className="px-4 py-3">{row.email ?? "—"}</td>
                  <td className="px-4 py-3">{row.phone ?? "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-zinc-400">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
