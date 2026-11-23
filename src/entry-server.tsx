// Used only at build time by scripts/prerender.mjs: renders one route to static HTML.
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { routes } from "./routes";

export { routes };
export { SITE } from "./content/site";
export { UI } from "./content/ui";

export function render(path: string): string {
  const route = routes.find((r) => r.path === path);
  if (!route) throw new Error("no route " + path);
  return renderToString(<App route={route} />);
}
