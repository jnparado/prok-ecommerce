import { siteContact } from "@/lib/site";

const pages = [
  "/",
  "/about-us",
  "/brands",
  "/espresso-machines",
  "/grinders",
  "/coffee",
  "/flavours",
  "/cleaning-solution",
  "/services",
  "/training",
  "/news-events",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-service",
] as const;

export default function sitemap() {
  const lastModified = new Date("2026-08-27");
  return pages.map((path) => ({
    url: `${siteContact.website}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
