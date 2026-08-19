import type { Metadata } from "next";

import { GrindersPage } from "@/components/grinders/grinders-page";

export const metadata: Metadata = {
  title: "Grinders | Prokrate International",
  description:
    "Commercial and home coffee grinders for cafes, restaurants, hotels, offices, and homes.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps<"/grinders">) {
  const params = await searchParams;

  return (
    <GrindersPage
      use={firstParam(params.use)}
      series={firstParam(params.series)}
      brand={firstParam(params.brand)}
    />
  );
}
