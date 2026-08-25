import { mediaUrl } from "@/lib/supabase/media";

export function AdminThumb({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return (
      <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-lg border border-[#eadfce] bg-[#faf6ef] text-[10px] text-zinc-400">
        No image
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl(src)}
      alt={alt}
      className="size-14 shrink-0 rounded-lg border border-[#eadfce] bg-white object-contain p-1"
    />
  );
}
