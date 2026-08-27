import { siteContact } from "@/lib/site";

export default function robots() {
  const host = siteContact.website;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
