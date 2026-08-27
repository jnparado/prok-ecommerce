"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { CONSENT_OPEN_EVENT, CONSENT_STORAGE_KEY, type ConsentChoice } from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

let forceOpen = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function onOpen() {
  forceOpen = true;
  emit();
}

function readStored(): ConsentChoice | "unset" {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch {
    return "unset";
  }
  return "unset";
}

function getSnapshot() {
  return `${readStored()}|${forceOpen ? "open" : "closed"}`;
}

function applyConsent(choice: ConsentChoice) {
  const value = choice === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private browsing can block storage.
  }
  forceOpen = false;
  emit();
}

export function CookieBanner() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "granted|closed");
  const [stored, openState] = snapshot.split("|");
  const visible = stored === "unset" || openState === "open";

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-[#eadfce] bg-[#fffaf4]/97 px-4 py-4 shadow-[0_-12px_32px_rgba(80,50,20,0.12)] backdrop-blur-md md:px-6"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-copy"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-banner-title" className="text-sm font-semibold text-[#3d2416]">
            Cookies and ads
          </p>
          <p id="cookie-banner-copy" className="mt-1 text-sm leading-relaxed text-zinc-600">
            We use cookies and Google AdSense to show ads, measure traffic, and improve the site.
            Personalized ads need your consent. See our{" "}
            <Link href="/privacy-policy" className="underline decoration-[#c4a882] underline-offset-2 hover:text-[#8b5a2b]">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="underline decoration-[#c4a882] underline-offset-2 hover:text-[#8b5a2b]">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyConsent("denied")}
            className="h-10 rounded-full border border-[#eadfce] bg-white px-4 text-sm font-medium text-[#3d2416] transition-colors hover:border-[#c4a882]"
          >
            Reject ads cookies
          </button>
          <button
            type="button"
            onClick={() => applyConsent("granted")}
            className="h-10 rounded-full bg-[#82502a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6d4123]"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
