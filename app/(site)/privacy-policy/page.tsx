import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Prokrate International",
  description:
    "How Prokrate International Trading Corporation collects, uses, and shares information, including Google AdSense advertising cookies.",
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="August 27, 2026">
      <p>
        {siteContact.legalName} (“Prokrate”, “we”, “us”) operates {siteContact.website}. This
        policy explains what information we collect, how we use it, and the choices you have. It
        is written to meet Google AdSense publisher requirements and the Philippines Data Privacy
        Act of 2012.
      </p>

      <h2>Who we are</h2>
      <p>
        {siteContact.legalName}
        <br />
        {siteContact.address}
        <br />
        Tel. {siteContact.phones.join(" · ")}
        <br />
        Website: <a href={siteContact.website}>{siteContact.domain}</a>
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Information you send us when you inquire, request a quote, train, or buy equipment.</li>
        <li>Technical data such as browser type, device, referring URL, and pages viewed.</li>
        <li>Cookies and similar identifiers used for site function, analytics, and advertising.</li>
      </ul>

      <h2>How we use information</h2>
      <p>
        We use information to operate this website, answer inquiries, fulfill orders, improve our
        catalog, keep the site secure, and show advertising that helps fund the site.
      </p>

      <h2>Google AdSense and advertising cookies</h2>
      <p>
        This site uses Google AdSense to display ads. Google and its partners use cookies to serve
        ads based on your prior visits to this site or other sites. Google’s use of advertising
        cookies enables it and its partners to serve ads based on your visit to this and/or other
        sites on the Internet.
      </p>
      <p>
        You may opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" rel="noreferrer" target="_blank">
          Google Ads Settings
        </a>
        . You can also opt out of some third-party cookies at{" "}
        <a href="https://www.aboutads.info/choices/" rel="noreferrer" target="_blank">
          aboutads.info/choices
        </a>
        .
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads. We implement Google Consent
        Mode so advertising cookies are not used for personalized ads until you accept them. You can
        change that choice later from our <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We share data with service providers who host this
        site, process payments if you buy through us, and with Google for advertising as described
        above. We may disclose information if required by law.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep inquiry and customer records only as long as needed for the purpose collected, then
        delete or anonymize them. We use reasonable technical and organizational measures to protect
        information, but no website is completely secure.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of personal data we hold about you, subject
        to law. Contact us using the details above. You may also lodge a complaint with the National
        Privacy Commission of the Philippines.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for café, restaurant, hotel, office, and home buyers of coffee
        equipment. It is not directed at children under 13, and we do not knowingly collect personal
        information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The “Last updated” date at the top will change when we do. Continued
        use of the site after an update means you accept the revised policy.
      </p>

      <h2>Related</h2>
      <p>
        <Link href="/cookie-policy">Cookie Policy</Link>
        {" · "}
        <Link href="/terms-of-service">Terms of Service</Link>
      </p>
    </LegalPage>
  );
}
