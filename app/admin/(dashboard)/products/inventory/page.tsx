"use client";

import { useEffect, useState } from "react";

import { AdminThumb } from "@/components/admin/admin-thumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type Row = { id: string; name: string; sku: string | null; stock: number | null; image_src: string | null };

export default function InventoryPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("products")
      .select("id, name, sku, stock, image_src")
      .order("name");
    if (loadError) setError(loadError.message);
    setRows((data as Row[]) ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(id: string, stock: number) {
    const supabase = createClient();
    const { error: saveError } = await supabase.from("products").update({ stock }).eq("id", id);
    if (saveError) setError(saveError.message);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-[#3d2416]">Inventory</h1>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <div className="overflow-x-auto rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#eadfce]">
                <td className="px-4 py-3">
                  <AdminThumb src={row.image_src} alt={row.name} />
                </td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 text-zinc-500">{row.sku ?? "—"}</td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    className="h-8 w-24"
                    value={row.stock ?? 0}
                    onChange={(event) =>
                      setRows((value) =>
                        value.map((item) =>
                          item.id === row.id ? { ...item, stock: Number(event.target.value) } : item
                        )
                      )
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <Button type="button" size="sm" onClick={() => void save(row.id, row.stock ?? 0)}>
                    Save
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
