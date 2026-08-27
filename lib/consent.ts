export const CONSENT_STORAGE_KEY = "prokrate-cookie-consent";
export const CONSENT_OPEN_EVENT = "prokrate-open-consent";

export type ConsentChoice = "granted" | "denied";

export const consentBootScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  var choice = localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
  if (choice === 'granted' || choice === 'denied') {
    var value = choice === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value
    });
  }
} catch (e) {}
`.trim();
