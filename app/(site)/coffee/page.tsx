import type { Metadata } from "next";

import { CoffeePage } from "@/components/coffee/coffee-page";

export const metadata: Metadata = {
  title: "Marcafé Coffee | Prokrate International",
  description:
    "Marcafé roasted coffee beans, pods, and capsules for espresso, brew, and office service.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps<"/coffee">) {
  const params = await searchParams;

  return (
    <CoffeePage
      category={firstParam(params.category)}
      brew={firstParam(params.brew)}
    />
  );
}
