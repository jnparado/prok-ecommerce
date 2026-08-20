import Image from "next/image";

import { cn } from "@/lib/utils";

function CatcherMark({ large }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center text-center leading-none">
      <span
        className={cn(
          "font-serif font-black tracking-[0.08em] text-zinc-900",
          large ? "text-[22px]" : "text-[15px]"
        )}
      >
        CATCHER
      </span>
      <span
        className={cn(
          "mt-0.5 font-medium tracking-[0.18em] text-[#8b1a1a]",
          large ? "text-[13px]" : "text-[9px]"
        )}
      >
        -gourmet-
      </span>
      <svg
        viewBox="0 0 80 10"
        className={cn("mt-1 text-[#c4a574]", large ? "w-16" : "w-11")}
        aria-hidden="true"
      >
        <path
          d="M4 6c8-6 16 4 24 0 8-4 12 4 20 0 8-4 16 6 24 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M36 2h8l-4 6z" fill="currentColor" />
      </svg>
      <span className={cn("mt-0.5 tracking-[0.2em] text-zinc-700", large ? "text-[9px]" : "text-[7px]")}>
        SINCE 1991
      </span>
    </span>
  );
}

function SlayerMark({ large }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center text-center leading-none">
      <span
        className={cn(
          "font-black tracking-[0.12em] text-zinc-900",
          large ? "text-[22px]" : "text-[15px]"
        )}
      >
        SLAYER
      </span>
      <span
        className={cn(
          "mt-1 tracking-[0.28em] text-zinc-700 uppercase",
          large ? "text-[9px]" : "text-[7px]"
        )}
      >
        espresso machines
      </span>
    </span>
  );
}

function LaNuovaEraMark({ large }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center text-center leading-none">
      <span className={cn("font-semibold text-zinc-900", large ? "text-[19px]" : "text-[13px]")}>
        La
        <span className="mx-px inline-block font-black text-[#6b3fa0]">N</span>
        uovaera
      </span>
      <span
        className={cn(
          "mt-1 tracking-[0.22em] text-[#8a6bb8] uppercase",
          large ? "text-[9px]" : "text-[7px]"
        )}
      >
        Coffee Machines
      </span>
    </span>
  );
}

function MarcafeMark({ large }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center text-center leading-none">
      <Image
        src="/images/brand-marcafe-mark.png"
        alt=""
        width={477}
        height={434}
        className={cn("w-auto object-contain", large ? "h-12" : "h-8")}
      />
      <span className={cn("mt-1 font-bold tracking-[0.12em] text-zinc-900", large ? "text-base" : "text-xs")}>
        MARCAFÈ
      </span>
      <span className={cn("mt-0.5 text-[#d0121a]", large ? "text-xs" : "text-[9px]")}>
        Gran Caffè
      </span>
    </span>
  );
}

function DidiesseMark({ large }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center leading-none">
      <span className={cn("font-semibold tracking-wide text-[#1d4ed8]", large ? "text-[20px]" : "text-[14px]")}>
        didiesse
      </span>
      <span className="mt-1 flex items-center gap-1">
        <span className={cn("rounded-full bg-[#1d4ed8]", large ? "size-1.5" : "size-1")} />
        <span className={cn("rounded-full bg-[#e11d8f]", large ? "size-1.5" : "size-1")} />
        <span className={cn("rounded-full bg-[#1d4ed8]", large ? "size-1.5" : "size-1")} />
        <span
          className={cn(
            "ml-0.5 font-medium tracking-wide text-[#e11d8f]",
            large ? "text-[9px]" : "text-[7px]"
          )}
        >
          l&apos;espresso in cialde
        </span>
      </span>
    </span>
  );
}

const rasterLogos: Record<string, { src: string; width: number; height: number }> = {
  "Eureka 1920": { src: "/images/brand-eureka.png", width: 891, height: 906 },
  "puly CAFF": { src: "/images/brand-pulycaff.png", width: 329, height: 227 },
};

export function BrandMark({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const large = size === "lg";

  if (name === "Catcher Gourmet") return <CatcherMark large={large} />;
  if (name === "Slayer") return <SlayerMark large={large} />;
  if (name === "La Nuova Era") return <LaNuovaEraMark large={large} />;
  if (name === "Marcafé") return <MarcafeMark large={large} />;
  if (name === "didiesse") return <DidiesseMark large={large} />;

  const logo = rasterLogos[name];
  if (logo) {
    return (
      <span className={cn("inline-flex items-center justify-center", className)}>
        <Image
          src={logo.src}
          alt={name}
          width={logo.width}
          height={logo.height}
          className={cn(
            "max-h-[88%] w-auto max-w-[88%] object-contain",
            large ? "h-[5.25rem]" : "h-16"
          )}
        />
      </span>
    );
  }

  return <span className="text-sm font-semibold tracking-wide">{name}</span>;
}
