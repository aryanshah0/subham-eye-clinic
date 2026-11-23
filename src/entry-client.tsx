// Hydrates the pre-rendered page so the live status and the eye-drawing links work.
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { routes } from "./routes";
import { initAnalytics } from "./lib/analytics";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
let path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
if (!path.endsWith("/")) path += "/";
const route = routes.find((r) => r.path === path) ?? routes.find((r) => r.kind === "notfound")!;
hydrateRoot(document.getElementById("root")!, <App route={route} />);

// Analytics after the page is interactive (production builds with VITE_GA_ID only).
if ("requestIdleCallback" in window) requestIdleCallback(() => initAnalytics()); else setTimeout(initAnalytics, 1500);
