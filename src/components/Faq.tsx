// Questions and answers: native <details>, so they work and are indexed without JavaScript.
// With JavaScript the answer slides open and closed, so the rows below glide instead of jumping.
import type { MouseEvent } from "react";
import type { Lang } from "../content/site";
import { Phones } from "./ui";

function toggle(e: MouseEvent<HTMLElement>) {
  const d = e.currentTarget.parentElement as HTMLDetailsElement;
  const body = d.querySelector<HTMLElement>(".ans")!;
  if (!body.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return; // plain native toggle
  e.preventDefault();
  const opening = !d.open || d.hasAttribute("data-closing");
  const from = d.open ? body.getBoundingClientRect().height : 0;
  body.getAnimations().forEach((a) => a.cancel());
  d.toggleAttribute("data-closing", !opening);
  if (opening) d.open = true;
  const to = opening ? body.getBoundingClientRect().height : 0;
  const run = body.animate([{ height: from + "px" }, { height: to + "px" }], { duration: 240, easing: "cubic-bezier(.2,.7,.3,1)" });
  run.onfinish = () => {
    if (opening) return;
    d.open = false;
    d.removeAttribute("data-closing");
  };
}

export function Faq({ items, lang }: { items: { q: Record<Lang, string>; a: Record<Lang, string> }[]; lang: Lang }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary onClick={toggle}>{f.q[lang]}</summary>
          <div className="ans"><p><Phones>{f.a[lang]}</Phones></p></div>
        </details>
      ))}
    </div>
  );
}
