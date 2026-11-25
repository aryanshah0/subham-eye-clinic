// Small building blocks shared by every page.
import { Fragment, type ReactNode } from "react";
import sprite from "./icons.svg?raw";
import { SITE, type Lang } from "../content/site";
import { UI, type UIKey } from "../content/ui";

/** The icon sprite, inlined once per page so icons work in static HTML without extra requests. */
export const Sprite = () => <div hidden dangerouslySetInnerHTML={{ __html: sprite }} />;

export const Icon = ({ id, className = "i" }: { id: string; className?: string }) => (
  <svg className={className} aria-hidden="true"><use href={`#${id}`} /></svg>
);

/** Text from the UI dictionary. Some entries contain a line break (<br>), so they are inserted as HTML. */
export function Tx({ k, lang, as: As = "span", className }: { k: UIKey; lang: Lang; as?: "span" | "p" | "h2" | "h3" | "dd" | "dt" | "b"; className?: string }) {
  const v = UI[lang][k];
  return v.includes("<") ? <As className={className} dangerouslySetInnerHTML={{ __html: v }} /> : <As className={className}>{v}</As>;
}

export const CallButton = ({ lang, long = false }: { lang: Lang; long?: boolean }) => (
  <a className="btn call" href={`tel:${SITE.phoneTel}`}><Icon id="i-phone" /><span>{UI[lang][long ? "callLong" : "call"]}</span></a>
);

export const DirectionsButton = ({ lang, label = "dir" }: { lang: Lang; label?: UIKey }) => (
  <a className="btn dir" href={SITE.mapsUrl} rel="noopener"><Icon id="i-pin" /><span>{UI[lang][label]}</span></a>
);

export const Section = ({ id, title, sub, children }: { id?: string; title: ReactNode; sub?: ReactNode; children: ReactNode }) => (
  <section id={id}>
    <div className="sec-head"><h2 className="t">{title}</h2>{sub && <p className="sub">{sub}</p>}</div>
    {children}
  </section>
);

/** A photo of the clinic with its caption underneath. */
export const Photo = ({ file, alt, caption, w = 1152, h = 440, className = "" }: { file: string; alt: string; caption?: string; w?: number; h?: number; className?: string }) => (
  <figure className={`photo ${className}`}>
    <img src={`${import.meta.env.BASE_URL}photos/${file}.jpg`} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

/** Text in which the clinic's phone number can be tapped. */
export function Phones({ children }: { children: string }) {
  const parts = children.split(SITE.phone);
  return <>{parts.map((x, i) => <Fragment key={i}>{i > 0 && <a className="tel" href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>}{x}</Fragment>)}</>;
}
