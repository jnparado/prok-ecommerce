import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
  showPitcorp = true,
}: {
  className?: string;
  showPitcorp?: boolean;
}) {
  return (
    <Link href="/" className={cn("flex min-w-0 items-center", className)}>
      {showPitcorp ? (
        <Image
          src="/images/logo-lockup.png"
          alt="Prokrate International Trading Corporation"
          width={654}
          height={124}
          priority
          className="h-11 w-auto sm:h-12 lg:h-[52px]"
        />
      ) : (
        <Image
          src="/images/logo-prokrate.png"
          alt="Prokrate International"
          width={457}
          height={124}
          className="h-11 w-auto sm:h-12"
        />
      )}
    </Link>
  );
}
