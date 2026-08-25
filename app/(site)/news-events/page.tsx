import type { Metadata } from "next";

import { NewsEventsPage } from "@/components/news-events/news-events-page";

export const metadata: Metadata = {
  title: "News & Events | Prokrate International",
  description: "Trade shows, barista academy dates, and stories from Prokrate.",
};

export default function Page() {
  return <NewsEventsPage />;
}
