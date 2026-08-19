import type { Metadata } from "next";

import { BrandsPage } from "@/components/brands/brands-page";

export const metadata: Metadata = {
  title: "Brands | Prokrate International",
  description:
    "Discover our premium collection of coffee machines, grinders, and specialty coffee selections.",
};

export default async function Page({ searchParams }: PageProps<"/brands">) {
  const params = await searchParams;
  const brand = Array.isArray(params.brand) ? params.brand[0] : params.brand;

  return <BrandsPage brand={brand} />;
}
