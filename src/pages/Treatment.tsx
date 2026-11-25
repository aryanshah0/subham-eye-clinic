import type { ReactNode } from "react";
import type { Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS, type Treatment as T } from "../content/treatments";
import { href, homePath, treatmentPath } from "../routes";
import { CallButton, DirectionsButton, Icon, Photo } from "../components/ui";
import { Faq } from "../components/Faq";
import { OpenStatus } from "../components/OpenStatus";
import { EyeDiagram } from "../components/EyeDiagram";
import { Visit } from "./Home";

const Row = ({ h, children }: { h: string; children: ReactNode }) => (
  <section className="row"><h2>{h}</h2><div className="row-b">{children}</div></section>
);
const List = ({ items }: { items: string[] }) => <ul className="signs">{items.map((x) => <li key={x}>{x}</li>)}</ul>;

export function Treatment({ lang, t }: { lang: Lang; t: T }) {
  const L = UI[lang];
  const photos = { ot: { file: "ot", alt: L.altOT, caption: L.phOT }, consult: { file: "consult", alt: L.altConsult, caption: L.phConsult } };
  return (
    <>
      <nav className="crumbs" aria-label={lang === "gu" ? "તમે અહીં છો" : "Breadcrumb"}>
        <ol>
          <li><a href={href(homePath(lang))}>{L.home}</a></li>
          <li><a href={href(homePath(lang)) + "#tx"}>{L.navTx}</a></li>
          <li aria-current="page">{t.name[lang]}</li>
        </ol>
      </nav>

      <div className="hero hero-t">
        <div className="hero-l">
          <div>
            <p className="kicker">{L.kicker}</p>
            <h1>{t.name[lang]}</h1>
            <p className="lede">{t.intro[lang]}</p>
          </div>
          <OpenStatus lang={lang} emergency={t.slug === "eye-injuries"}>
            <div className="acts"><CallButton lang={lang} long={t.slug !== "eye-injuries"} /><DirectionsButton lang={lang} /></div>
            <p className="emline"><b>{L.emLabel}</b> {L.emText}</p>
          </OpenStatus>
        </div>
        <EyeDiagram lang={lang} start={t.part} interactive={false} noteText={t.partNote[lang]} />
      </div>

      <dl className="card glance">
        {t.facts.map((f) => <div key={f.k.en}><dt className="label">{f.k[lang]}</dt><dd>{f.v[lang]}</dd></div>)}
      </dl>

      <div className="rows">
        {t.sections.map((s) => (
          <Row key={s.h.en} h={s.h[lang]}>
            {s.p && <p>{s.p[lang]}</p>}
            {s.list && <List items={s.list[lang]} />}
            {s.lenses && (
              <div className="lenses">
                {s.lenses.map((l) => <div key={l.name.en} className="card lens"><h3>{l.name[lang]}</h3><p>{l.d[lang]}</p></div>)}
              </div>
            )}
            {s.note && <p className="note">{s.note[lang]}</p>}
            {s.photo && <Photo {...photos[s.photo]} />}
          </Row>
        ))}
        <Row h={L.v2t}>
          <List items={t.bring[lang]} />
          {t.drops && <p className="note">{L.v3d}</p>}
          {t.slug === "eye-injuries" && <p className="note">{L.injNote}</p>}
        </Row>
        <Row h={L.faqTitle}><Faq items={t.faqs} lang={lang} /></Row>
      </div>

      <Visit lang={lang} />

      <section>
        <div className="sec-head"><h2 className="t">{L.otherTx}</h2></div>
        <div className="others">
          {TREATMENTS.filter((o) => o.slug !== t.slug).map((o) => (
            <a key={o.slug} className="card" href={href(treatmentPath(lang, o))}><Icon id={o.icon} className="ico" /><span>{o.name[lang].replace(/-/g, "\u2011")}</span></a>
          ))}
        </div>
      </section>
    </>
  );
}
