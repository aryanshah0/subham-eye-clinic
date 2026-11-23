// Google Analytics 4: production only (VITE_GA_ID set at build time), no cookie banner by the owner's decision.
// Privacy-light: Google Signals and ad personalisation off. Loaded after the page is interactive so it never slows it down.
// Events: call_click, directions_click, language_switch (all from data attributes / link targets, no personal data).
declare global { interface Window { dataLayer: unknown[]; gtag: (...a: unknown[]) => void } }

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function initAnalytics() {
  if (!GA_ID || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a");
    if (!a) return;
    const h = a.getAttribute("href") || "";
    const lang = document.documentElement.lang;
    if (h.startsWith("tel:")) window.gtag("event", "call_click", { page_lang: lang, link_location: where(a) });
    else if (h.includes("maps.google.com")) window.gtag("event", "directions_click", { page_lang: lang, link_location: where(a) });
    else if (a.closest(".lang")) window.gtag("event", "language_switch", { to_lang: a.getAttribute("hreflang") });
  });
}

const where = (a: Element) => (a.closest(".dock") ? "phone_bar" : a.closest("footer") ? "footer" : a.closest(".hero, .art-side") ? "top" : "page");
