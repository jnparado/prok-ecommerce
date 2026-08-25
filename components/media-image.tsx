import Image, { type ImageProps } from "next/image";

import { mediaUrl } from "@/lib/supabase/media";

export default function MediaImage({ src, ...props }: ImageProps) {
  const resolved = typeof src === "string" ? mediaUrl(src) : src;
  return <Image src={resolved} {...props} />;
}
