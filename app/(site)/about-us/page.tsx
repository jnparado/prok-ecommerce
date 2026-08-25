import type { Metadata } from "next";

import { AboutPage } from "@/components/about-us/about-page";

export const metadata: Metadata = {
  title: "About Us | Prokrate International",
  description:
    "Prokrate International Trading Corporation — premium coffee machines, grinders, beans, and barista support.",
};

export default function Page() {
  return <AboutPage />;
}
