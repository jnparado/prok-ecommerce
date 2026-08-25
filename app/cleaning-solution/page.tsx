import type { Metadata } from "next";

import { CleaningSolutionPage } from "@/components/cleaning-solution/cleaning-solution-page";

export const metadata: Metadata = {
  title: "Cleaning Solution | Prokrate International",
  description:
    "Professional espresso machine, milk system, and grinder cleaning products from puly CAFF.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({
  searchParams,
}: PageProps<"/cleaning-solution">) {
  const params = await searchParams;

  return <CleaningSolutionPage category={firstParam(params.category)} />;
}
