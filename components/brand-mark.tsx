export function BrandMark({ name }: { name: string }) {
  if (name === "Catcher Gourmet") {
    return (
      <span className="text-center leading-tight">
        <span className="block text-sm font-semibold tracking-[0.18em] text-zinc-800">
          CATCHER
        </span>
        <span className="block text-[10px] tracking-[0.2em] text-zinc-500">gourmet</span>
      </span>
    );
  }

  if (name === "Casadio") {
    return (
      <span className="text-center leading-tight">
        <span className="mx-auto mb-1 flex size-8 items-center justify-center rounded-full border border-zinc-800 text-[10px]">
          ◯
        </span>
        <span className="block text-[11px] font-semibold tracking-[0.12em]">CASADIO</span>
        <span className="block text-[8px] tracking-wide text-zinc-500">BOLOGNA - 1958</span>
      </span>
    );
  }

  if (name === "Eureka 1920") {
    return (
      <span className="flex size-14 items-center justify-center bg-[#c1121f] text-center text-[9px] leading-tight font-bold tracking-wide text-white">
        EUREKA
        <br />
        1920
      </span>
    );
  }

  if (name === "Slayer") {
    return (
      <span className="text-center leading-tight">
        <span className="block text-sm font-bold tracking-[0.28em] text-zinc-900">SLAYER</span>
        <span className="block text-[8px] tracking-[0.18em] text-zinc-500">espresso machines</span>
      </span>
    );
  }

  if (name === "La Nuova Era") {
    return (
      <span className="text-center leading-tight">
        <span className="block text-[10px] font-semibold tracking-wide">La Nuova Era</span>
        <span className="block text-[8px] tracking-[0.12em] text-zinc-500">COFFEE MACHINES</span>
      </span>
    );
  }

  if (name === "Marcafé") {
    return (
      <span className="text-center leading-tight">
        <span className="block text-sm font-bold tracking-[0.12em] text-[#c1121f]">MARCAFÉ</span>
        <span className="block text-[9px] tracking-wide text-zinc-500">Gran Caffè</span>
      </span>
    );
  }

  if (name === "puly CAFF") {
    return (
      <span className="border border-[#1d4ed8] px-2 py-1 text-center leading-tight">
        <span className="block text-[9px] font-bold text-[#c1121f]">plus</span>
        <span className="block text-xs font-bold tracking-wide text-[#1d4ed8]">puly CAFF</span>
      </span>
    );
  }

  if (name === "didiesse") {
    return (
      <span className="text-center leading-tight">
        <span className="text-sm font-semibold tracking-wide text-[#2563eb]">
          didiesse<span className="text-pink-500">.</span>
        </span>
        <span className="mt-0.5 block text-[8px] text-zinc-400">l&apos;espresso in cialde</span>
      </span>
    );
  }

  if (name === "BeanXpress") {
    return <span className="text-sm font-semibold tracking-wide">BEANXPRESS</span>;
  }

  if (name === "Adelaar") {
    return (
      <span className="text-center leading-tight">
        <span className="block text-sm font-semibold tracking-[0.2em]">ADELAAR</span>
        <span className="block text-[9px] text-zinc-500">Coffee &amp; Beyond...</span>
      </span>
    );
  }

  if (name === "Doge") {
    return <span className="text-sm font-bold tracking-[0.2em]">DOGE</span>;
  }

  return <span className="text-sm font-semibold tracking-wide">{name}</span>;
}
