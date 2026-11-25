// Hydrates the pre-rendered page so the live status and the eye-drawing links work.
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { routes } from "./routes";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
let path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
if (!path.endsWith("/")) path += "/";
// Unknown address: this is a 404 page; use the language of the 404 page the host served, so hydration matches.
const nfLang = document.documentElement.lang === "gu" ? "gu" : "en";
const route = routes.find((r) => r.path === path) ?? routes.find((r) => r.kind === "notfound" && r.lang === nfLang)!;
hydrateRoot(document.getElementById("root")!, <App route={route} />);

// Smooth scrolling for links inside the page, only once this page has settled (see components.css).
const ready = () => setTimeout(() => document.documentElement.classList.add("ready"), 300);
if (document.readyState === "complete") ready(); else addEventListener("load", ready);

if (import.meta.env.DEV) import("./styles/fonts.css");
