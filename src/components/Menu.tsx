// Phone menu. A native <details>, so it opens without JavaScript; the panel floats over the page and moves nothing.
import { useEffect, useRef } from "react";
import type { Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { href, treatmentPath, type Route } from "../routes";

export function Menu({ route, lang, links }: { route: Route; lang: Lang; links: { label: string; to: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const L = UI[lang];
  const close = () => { if (ref.current) ref.current.open = false; };
  useEffect(() => {
    const out = (e: Event) => { if (ref.current?.open && !ref.current.contains(e.target as Node)) close(); };
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !ref.current?.open) return;
      close();
      ref.current.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <details className="menu" ref={ref}>
      <summary aria-label={L.menu}><span className="bars" aria-hidden="true" /></summary>
      <nav className="panel" aria-label={L.menu}>
        <p className="label">{L.navTx}</p>
        {TREATMENTS.map((t) => (
          <a key={t.slug} href={href(treatmentPath(lang, t))} aria-current={route.treatment?.slug === t.slug ? "page" : undefined} onClick={close}>{t.name[lang]}</a>
        ))}
        <hr />
        {links.map((l) => <a key={l.to} href={l.to} onClick={close}>{l.label}</a>)}
      </nav>
    </details>
  );
}
