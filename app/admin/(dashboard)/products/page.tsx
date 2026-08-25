"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminThumb } from "@/components/admin/admin-thumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  category: string;
  price: number | null;
  sale_price: number | null;
  stock: number | null;
  status: string | null;
  is_featured: boolean;
  image_src: string | null;
};

export default function ProductsListPage() {
  const [rows, setRows] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("products")
      .select("id, name, sku, category, price, sale_price, stock, status, is_featured, image_src")
      .order("name");
    if (loadError) setError(loadError.message);
    setRows((data as Product[]) ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(id: string) {
    if (!window.confirm("Delete this product?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("products").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  const filtered = rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2416]">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">Name, pricing, inventory, images, and variants.</p>
        </div>
        <Link href="/admin/products/new">
          <Button type="button">Add product</Button>
        </Link>
      </div>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
        className="h-10 max-w-sm"
      />
      <div className="overflow-x-auto rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-[#eadfce]">
                <td className="px-4 py-3">
                  <AdminThumb src={row.image_src} alt={row.name} />
                </td>
                <td className="px-4 py-3">
                  {row.name}
                  {row.is_featured ? <span className="ml-2 text-xs text-[#82502a]">Featured</span> : null}
                </td>
                <td className="px-4 py-3 text-zinc-500">{row.sku ?? "—"}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">
                  {row.sale_price != null ? (
                    <>
                      <span className="text-[#82502a]">{row.sale_price}</span>
                      {row.price != null ? <span className="ml-2 text-zinc-400 line-through">{row.price}</span> : null}
                    </>
                  ) : (
                    (row.price ?? "—")
                  )}
                </td>
                <td className="px-4 py-3">{row.stock ?? 0}</td>
                <td className="px-4 py-3">{row.status ?? "published"}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${row.id}`} className="mr-3 text-[#82502a] hover:underline">
                    Edit
                  </Link>
                  <button type="button" className="text-red-700 hover:underline" onClick={() => void remove(row.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-zinc-400">
                  No products found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
