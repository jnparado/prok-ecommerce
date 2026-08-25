import type { Metadata } from "next";

import { EspressoMachinesPage } from "@/components/espresso-machines/espresso-machines-page";

export const metadata: Metadata = {
  title: "Espresso Machines | Prokrate International",
  description:
    "Commercial and home espresso machines for cafes, restaurants, hotels, offices, and homes.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({
  searchParams,
}: PageProps<"/espresso-machines">) {
  const params = await searchParams;

  return (
    <EspressoMachinesPage
      use={firstParam(params.use)}
      group={firstParam(params.group)}
      brand={firstParam(params.brand)}
    />
  );
}
