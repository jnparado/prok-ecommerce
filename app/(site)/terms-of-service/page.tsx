import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Prokrate International",
  description:
    "Terms for using the Prokrate International website, catalog, and related services.",
};

export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="August 27, 2026">
      <p>
        These terms govern use of {siteContact.website} and related pages operated by{" "}
        {siteContact.legalName}. By using the site you agree to them.
      </p>

      <h2>The site</h2>
      <p>
        The site is a catalog and information service for coffee machines, grinders, beans,
        flavours, cleaning products, training, and related services. Product photos, names, and
        descriptions are for information. Availability, specification, and price can change, and
        quotes are confirmed by Prokrate before an order is accepted.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the site, attempt to break security, or scrape it in a way that harms service.</li>
        <li>Do not use the site for unlawful activity or to infringe others’ rights.</li>
        <li>Do not click ads repeatedly or ask others to click ads. Invalid clicks violate Google AdSense policy and these terms.</li>
      </ul>

      <h2>Advertising</h2>
      <p>
        The site displays third-party ads through Google AdSense. Ads are labeled. We do not control
        every advertiser destination. See our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> for cookies used for advertising.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content, branding, and layout are owned by Prokrate or our licensors. You may browse and
        share links. You may not copy the catalog for a competing site without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided as is. To the extent allowed by Philippine law, Prokrate is not liable
        for indirect loss arising from use of the site. Product warranties, if any, follow the
        manufacturer and your purchase agreement with us.
      </p>

      <h2>Contact</h2>
      <p>
        {siteContact.legalName}
        <br />
        {siteContact.address}
        <br />
        Tel. {siteContact.phones.join(" · ")}
      </p>
    </LegalPage>
  );
}
