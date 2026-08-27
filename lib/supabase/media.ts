const BUCKET = "images";

export function mediaUrl(src: string) {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/i.test(src)) return src;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return src;

  const filename = src.replace(/^\/images\//, "").replace(/^\//, "");
  if (filename.includes("-cutout.")) return src.startsWith("/") ? src : `/${src}`;
  return `${base}/storage/v1/object/public/${BUCKET}/${filename}`;
}
