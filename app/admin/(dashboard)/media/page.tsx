"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mediaPublicPath } from "@/lib/admin/utils";
import { createClient } from "@/lib/supabase/client";
import { mediaUrl } from "@/lib/supabase/media";

type MediaRow = {
  id: string;
  file_name: string;
  storage_path: string;
  alt: string | null;
  assigned_to: string | null;
  sort_order: number;
};

const filters = [
  "all",
  "homepage",
  "about",
  "services",
  "products",
  "contact",
  "brands",
  "training",
  "news",
  "events",
  "category",
  "promotional",
] as const;

function MediaLibrary() {
  const searchParams = useSearchParams();
  const assigned = searchParams.get("assigned");
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>(
    assigned && filters.includes(assigned as (typeof filters)[number]) ? (assigned as (typeof filters)[number]) : "all"
  );
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<MediaRow | null>(null);
  const [usedOn, setUsedOn] = useState<Record<string, string[]>>({});

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    setRows((data as MediaRow[]) ?? []);

    const usage: Record<string, string[]> = {};
    const sources: { table: string; column: string; label: string }[] = [
      { table: "hero_slides", column: "image_src", label: "Homepage slider" },
      { table: "homepage_sections", column: "image_src", label: "Homepage section" },
      { table: "products", column: "image_src", label: "Product" },
      { table: "brands", column: "logo_src", label: "Brand" },
      { table: "services", column: "image_src", label: "Services" },
      { table: "training_courses", column: "image_src", label: "Training" },
      { table: "news", column: "image_src", label: "News" },
      { table: "events", column: "image_src", label: "Events" },
    ];
    await Promise.all(
      sources.map(async (source) => {
        const result = await supabase.from(source.table).select("*");
        for (const row of (result.data ?? []) as unknown as Record<string, string | null>[]) {
          const src = row[source.column];
          if (!src) continue;
          (usage[src] ??= []).push(source.label);
        }
      })
    );
    setUsedOn(usage);
  }

  useEffect(() => {
    void load();
  }, []);

  async function upload(file: File | undefined) {
    if (!file) return;
    const supabase = createClient();
    const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
    const path = `cms/${Date.now()}-${safe}`;
    const { error: uploadError } = await supabase.storage.from("images").upload(path, file, { upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { error: insertError } = await supabase.from("media").insert({
      file_name: file.name,
      storage_path: path,
      alt: file.name.replace(/\.[^.]+$/, ""),
      assigned_to: filter === "all" ? "homepage" : filter,
    });
    if (insertError) setError(insertError.message);
    await load();
  }

  async function saveMeta(row: MediaRow) {
    const supabase = createClient();
    const { error: saveError } = await supabase
      .from("media")
      .update({ alt: row.alt, assigned_to: row.assigned_to, sort_order: row.sort_order, file_name: row.file_name })
      .eq("id", row.id);
    if (saveError) setError(saveError.message);
    else await load();
  }

  async function replaceFile(row: MediaRow, file: File | undefined) {
    if (!file) return;
    const supabase = createClient();
    const { error: uploadError } = await supabase.storage.from("images").upload(row.storage_path, file, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    await supabase.from("media").update({ file_name: file.name }).eq("id", row.id);
    await load();
  }

  async function remove(row: MediaRow) {
    if (!window.confirm("Delete this image?")) return;
    const supabase = createClient();
    await supabase.storage.from("images").remove([row.storage_path]);
    const { error: deleteError } = await supabase.from("media").delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    await load();
  }

  const visible = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = `${row.file_name} ${row.alt ?? ""}`.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter === "all" || row.assigned_to === filter;
        return matchesQuery && matchesFilter;
      }),
    [filter, query, rows]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2416]">Media Library</h1>
          <p className="mt-1 text-sm text-zinc-500">Central images for homepage, products, services, training, news, and events.</p>
        </div>
        <label className="inline-flex h-9 cursor-pointer items-center rounded-lg bg-[#82502a] px-3 text-sm text-white">
          + Upload image
          <input type="file" accept="image/*" className="hidden" onChange={(event) => void upload(event.target.files?.[0])} />
        </label>
      </div>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search images" className="h-9 max-w-xs" />
        <select
          className="h-9 rounded-lg border border-[#eadfce] bg-white px-2 text-sm"
          value={filter}
          onChange={(event) => setFilter(event.target.value as (typeof filters)[number])}
        >
          {filters.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "Filter: all pages" : item}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">File name</th>
              <th className="px-4 py-3 font-medium">Used on</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id} className="border-t border-[#eadfce]">
                <td className="px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaUrl(mediaPublicPath(row.storage_path))}
                    alt={row.alt ?? ""}
                    className="size-14 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    className="h-8"
                    value={row.file_name}
                    onChange={(event) =>
                      setRows((value) => value.map((item) => (item.id === row.id ? { ...item, file_name: event.target.value } : item)))
                    }
                  />
                  <Input
                    className="mt-1 h-8"
                    value={row.alt ?? ""}
                    placeholder="Alt text"
                    onChange={(event) =>
                      setRows((value) => value.map((item) => (item.id === row.id ? { ...item, alt: event.target.value } : item)))
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    className="h-8 rounded border border-[#eadfce] px-2"
                    value={row.assigned_to ?? "homepage"}
                    onChange={(event) =>
                      setRows((value) =>
                        value.map((item) => (item.id === row.id ? { ...item, assigned_to: event.target.value } : item))
                      )
                    }
                  >
                    {filters.filter((item) => item !== "all").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <Input
                    className="mt-1 h-8 w-24"
                    type="number"
                    value={row.sort_order}
                    onChange={(event) =>
                      setRows((value) =>
                        value.map((item) => (item.id === row.id ? { ...item, sort_order: Number(event.target.value) } : item))
                      )
                    }
                  />
                  <p className="mt-1 text-xs text-zinc-400">
                    {(usedOn[mediaPublicPath(row.storage_path)] ?? usedOn[row.storage_path] ?? []).join(", ") || "Unreferenced"}
                  </p>
                </td>
                <td className="space-x-2 px-4 py-3">
                  <button type="button" className="text-[#82502a] hover:underline" onClick={() => setPreview(row)}>
                    Preview
                  </button>
                  <button type="button" className="text-[#82502a] hover:underline" onClick={() => void saveMeta(row)}>
                    Edit
                  </button>
                  <label className="cursor-pointer text-[#82502a] hover:underline">
                    Replace
                    <input type="file" accept="image/*" className="hidden" onChange={(event) => void replaceFile(row, event.target.files?.[0])} />
                  </label>
                  <button type="button" className="text-red-700 hover:underline" onClick={() => void remove(row)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" onClick={() => setPreview(null)}>
          <div className="max-w-3xl rounded-xl bg-white p-4" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(mediaPublicPath(preview.storage_path))} alt={preview.alt ?? ""} className="max-h-[70vh] w-full object-contain" />
            <p className="mt-2 text-sm text-zinc-500">Used on: {preview.assigned_to ?? "unassigned"}</p>
            <Button type="button" className="mt-3" onClick={() => setPreview(null)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function MediaLibraryPage() {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading media…</p>}>
      <MediaLibrary />
    </Suspense>
  );
}
