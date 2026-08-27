"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="h-10 rounded-full bg-[#82502a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6d4123]"
    >
      Update cookie preferences
    </button>
  );
}
