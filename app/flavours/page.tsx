import type { Metadata } from "next";

import { FlavoursPage } from "@/components/flavours/flavours-page";

export const metadata: Metadata = {
  title: "Flavours | Prokrate International",
  description:
    "Catcher Gourmet syrups, sauces, and powdered mixes for cafes and beverage programs.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps<"/flavours">) {
  const params = await searchParams;

  return <FlavoursPage tab={firstParam(params.tab)} />;
}
