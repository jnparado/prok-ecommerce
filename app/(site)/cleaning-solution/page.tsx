import type { Metadata } from "next";

import { CleaningSolutionPage } from "@/components/cleaning-solution/cleaning-solution-page";

export const metadata: Metadata = {
  title: "Puly Caff Product | Prokrate International",
  description:
    "Professional espresso machine, milk system, and grinder cleaning products from puly CAFF.",
};

export default function Page() {
  return <CleaningSolutionPage />;
}
