// Hydrates the pre-rendered page so the live status and the eye-drawing links work.
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { routes } from "./routes";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
let path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
if (!path.endsWith("/")) path += "/";
// Unknown address: this is a 404 page; pick the one in the address's language (same as the server-rendered HTML).
const nfLang = path.startsWith("/gu/") ? "gu" : "en";
const route = routes.find((r) => r.path === path) ?? routes.find((r) => r.kind === "notfound" && r.lang === nfLang)!;
hydrateRoot(document.getElementById("root")!, <App route={route} />);
