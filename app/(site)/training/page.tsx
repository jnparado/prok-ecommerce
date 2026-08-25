import type { Metadata } from "next";

import { TrainingPage } from "@/components/training/training-page";

export const metadata: Metadata = {
  title: "Barista Training | Prokrate International",
  description:
    "Marcafé Academy barista courses to advance your coffee expertise.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps<"/training">) {
  const params = await searchParams;

  return <TrainingPage query={firstParam(params.q) ?? ""} />;
}
