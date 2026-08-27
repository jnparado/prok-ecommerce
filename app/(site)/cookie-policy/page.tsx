import type { Metadata } from "next";
import Link from "next/link";

import { CookiePreferencesButton } from "@/components/ads/cookie-preferences-button";
import { LegalPage } from "@/components/legal-page";
import { siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy | Prokrate International",
  description:
    "Cookies used on the Prokrate site, including Google AdSense advertising cookies and how to control them.",
};

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" updated="August 27, 2026">
      <p>
        {siteContact.legalName} uses cookies and similar technologies on {siteContact.website}. This
        page describes those cookies and how you can control them.
      </p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small text files stored on your device. They help pages load, remember choices,
        measure visits, and show ads.
      </p>

      <h2>Cookies we use</h2>
      <ul>
        <li>
          <strong>Necessary.</strong> Keep the site working, including storing your cookie choice.
          These do not require consent.
        </li>
        <li>
          <strong>Advertising (Google AdSense).</strong> Google and partners set cookies to serve and
          measure ads, limit how often you see an ad, and — if you consent — personalize ads. See{" "}
          <a href="https://policies.google.com/technologies/ads" rel="noreferrer" target="_blank">
            Google advertising cookies
          </a>
          .
        </li>
        <li>
          <strong>Analytics.</strong> Help us understand which pages are used. These run only if you
          accept advertising/analytics cookies.
        </li>
      </ul>

      <h2>Consent</h2>
      <p>
        Personalized ads and non-essential cookies stay off until you tap Accept all. If you reject
        ads cookies, we still load AdSense with Google Consent Mode so ads may appear in a limited,
        non-personalized form where allowed.
      </p>
      <p>
        <CookiePreferencesButton />
      </p>

      <h2>How to opt out</h2>
      <ul>
        <li>Use the button above, or the cookie banner, to accept or reject ads cookies.</li>
        <li>
          Visit{" "}
          <a href="https://www.google.com/settings/ads" rel="noreferrer" target="_blank">
            Google Ads Settings
          </a>{" "}
          to opt out of personalized Google ads.
        </li>
        <li>
          Use{" "}
          <a href="https://www.aboutads.info/choices/" rel="noreferrer" target="_blank">
            aboutads.info/choices
          </a>{" "}
          for some other advertising cookies.
        </li>
        <li>Block cookies in your browser. Some site features may then stop working.</li>
      </ul>

      <h2>More information</h2>
      <p>
        Details about how we handle personal data are in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. Contact {siteContact.legalName} at{" "}
        {siteContact.address}, tel. {siteContact.phones.join(" · ")}.
      </p>
    </LegalPage>
  );
}
