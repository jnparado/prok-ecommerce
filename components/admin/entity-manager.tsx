"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { AdminThumb } from "@/components/admin/admin-thumb";
import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/admin/utils";
import { createClient } from "@/lib/supabase/client";

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select" | "image" | "date";
  options?: { value: string; label: string }[];
  hint?: string;
};

export function EntityManager({
  table,
  title,
  description,
  fields,
  assignedTo,
  defaults,
  labelKey = "title",
  extraPrepare,
}: {
  table: string;
  title: string;
  description?: string;
  fields: Field[];
  assignedTo?: string;
  defaults?: Record<string, unknown>;
  labelKey?: string;
  extraPrepare?: (values: Record<string, unknown>) => Record<string, unknown>;
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const blank = useMemo(() => {
    const next: Record<string, unknown> = { ...(defaults ?? {}) };
    for (const field of fields) {
      if (next[field.name] !== undefined) continue;
      next[field.name] = field.type === "checkbox" ? false : field.type === "number" ? 0 : "";
    }
    return next;
  }, [defaults, fields]);

  async function load() {
    const supabase = createClient();
    const query = supabase.from(table).select("*");
    const { data, error: loadError } = await query.order("sort_order", { ascending: true });
    if (loadError) {
      const fallback = await supabase.from(table).select("*");
      setRows((fallback.data as Record<string, unknown>[]) ?? []);
      if (fallback.error) setError(fallback.error.message);
      return;
    }
    setRows((data as Record<string, unknown>[]) ?? []);
  }

  useEffect(() => {
    void load();
  }, [table]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setError("");
    setMessage("");
    const supabase = createClient();
    const payload = extraPrepare ? extraPrepare({ ...editing }) : { ...editing };
    delete payload.id;
    delete payload.created_at;
    if ("slug" in payload && !payload.slug && typeof payload.name === "string") {
      payload.slug = slugify(payload.name);
    }
    if ("slug" in payload && !payload.slug && typeof payload.title === "string") {
      payload.slug = slugify(payload.title);
    }
    if (editing.id) {
      const { error: saveError } = await supabase.from(table).update(payload).eq("id", editing.id);
      if (saveError) {
        setError(saveError.message);
        return;
      }
    } else {
      const { error: saveError } = await supabase.from(table).insert(payload);
      if (saveError) {
        setError(saveError.message);
        return;
      }
    }
    setEditing(null);
    setMessage("Saved.");
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2416]">{title}</h1>
          {description ? <p className="mt-1 text-sm text-zinc-500">{description}</p> : null}
        </div>
        <Button type="button" onClick={() => setEditing({ ...blank })}>
          Add
        </Button>
      </div>

      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-[#165c38]">{message}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-[#eadfce] bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[#faf6ef] text-[#6b3e24]">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const imageSrc = String(row.image_src || row.logo_src || "");
              const label = String(row[labelKey] ?? row.name ?? row.title ?? row.file_name ?? row.id);
              return (
              <tr key={String(row.id)} className="border-t border-[#eadfce]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <AdminThumb src={imageSrc || null} alt={label} />
                    <span>{label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {row.enabled === false || row.status === "draft" ? "Hidden" : "Published"}
                </td>
                <td className="px-4 py-3">{String(row.sort_order ?? "—")}</td>
                <td className="px-4 py-3">
                  <button type="button" className="mr-3 text-[#82502a] hover:underline" onClick={() => setEditing(row)}>
                    Edit
                  </button>
                  <button type="button" className="text-red-700 hover:underline" onClick={() => void remove(String(row.id))}>
                    Delete
                  </button>
                </td>
              </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                  No items yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <form onSubmit={(event) => void save(event)} className="grid gap-4 rounded-xl border border-[#eadfce] bg-white p-5 md:grid-cols-2">
          <h2 className="md:col-span-2 font-serif text-xl text-[#3d2416]">
            {editing.id ? "Edit" : "Add"} {title.replace(/s$/, "")}
          </h2>
          {fields.map((field) => (
            <FieldControl
              key={field.name}
              field={field}
              value={editing[field.name]}
              assignedTo={assignedTo}
              onChange={(value) => setEditing((current) => ({ ...current, [field.name]: value }))}
            />
          ))}
          <div className="md:col-span-2 flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
  assignedTo,
}: {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  assignedTo?: string;
}) {
  if (field.type === "textarea") {
    return (
      <label className="md:col-span-2 block space-y-1.5">
        <Label>{field.label}</Label>
        <textarea
          className="min-h-28 w-full rounded-lg border border-[#eadfce] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#c4a882]"
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 pt-6 text-sm">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <label className="block space-y-1.5">
        <Label>{field.label}</Label>
        <select
          className="h-9 w-full rounded-lg border border-[#eadfce] bg-white px-2 text-sm"
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
        >
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (field.type === "image") {
    return (
      <div className="md:col-span-2">
        <MediaPicker
          label={field.label}
          value={typeof value === "string" ? value : ""}
          assignedTo={assignedTo}
          onChange={onChange}
        />
      </div>
    );
  }
  return (
    <label className="block space-y-1.5">
      <Label>{field.label}</Label>
      <Input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        value={value === null || value === undefined ? "" : String(value)}
        onChange={(event) =>
          onChange(field.type === "number" ? Number(event.target.value) : event.target.value)
        }
      />
    </label>
  );
}
