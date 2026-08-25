"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mediaPublicPath } from "@/lib/admin/utils";
import { createClient } from "@/lib/supabase/client";
import { mediaUrl } from "@/lib/supabase/media";

export function MediaPicker({
  label,
  value,
  onChange,
  assignedTo,
}: {
  label: string;
  value?: string | null;
  onChange: (src: string) => void;
  assignedTo?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    const supabase = createClient();
    const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
    const path = `cms/${Date.now()}-${safe}`;
    const upload = await supabase.storage.from("images").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (upload.error) {
      setBusy(false);
      setError(upload.error.message);
      return;
    }
    const src = mediaPublicPath(path);
    await supabase.from("media").insert({
      file_name: file.name,
      storage_path: path,
      assigned_to: assignedTo ?? null,
      alt: file.name.replace(/\.[^.]+$/, ""),
    });
    onChange(src);
    setBusy(false);
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="overflow-hidden rounded-lg border border-[#eadfce] bg-[#faf6ef]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(value)} alt="" className="h-36 w-full object-contain" />
        </div>
      ) : null}
      <Input type="text" value={value ?? ""} onChange={(event) => onChange(event.target.value)} placeholder="/images/..." />
      <Input type="file" accept="image/*" disabled={busy} onChange={(event) => void onFile(event.target.files?.[0])} />
      {busy ? <p className="text-xs text-zinc-500">Uploading…</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange("")}>
        Clear image
      </Button>
    </div>
  );
}
