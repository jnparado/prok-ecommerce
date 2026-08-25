import type { Metadata } from "next";

import { ServicesPage } from "@/components/services/services-page";

export const metadata: Metadata = {
  title: "Machine Services | Prokrate International",
  description:
    "Internationally trained service specialists for espresso machines, grinders, and after-sales care.",
};

export default function Page() {
  return <ServicesPage />;
}
