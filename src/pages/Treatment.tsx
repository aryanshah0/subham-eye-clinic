import type { Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS, type Treatment as T } from "../content/treatments";
import { href, homePath, treatmentPath } from "../routes";
import { CallButton, DirectionsButton, Faq, Icon } from "../components/ui";
import { OpenStatus } from "../components/OpenStatus";
import { EyeDiagram } from "../components/EyeDiagram";

const base = import.meta.env.BASE_URL;

export function Treatment({ lang, t }: { lang: Lang; t: T }) {
  const L = UI[lang];
  const others = TREATMENTS.filter((o) => o.slug !== t.slug);
  return (
    <>
      <nav aria-label={lang === "gu" ? "તમે અહીં છો" : "Breadcrumb"}>
        <ol className="crumbs">
          <li><a href={href(homePath(lang))}>{L.home}</a></li>
          <li><a href={href(homePath(lang)) + "#tx"}>{L.navTx}</a></li>
          <li aria-current="page">{t.name[lang]}</li>
        </ol>
      </nav>

      <div className="art-wrap">
        <article className="art">
          <div>
            <p className="kicker" style={{ marginTop: 14 }}>{L.kicker}</p>
            <h1>{t.title[lang]}</h1>
            <p className="lede" style={{ marginTop: 12 }}>{t.intro[lang]}</p>
          </div>

          {t.photo === "ot" && (
            <figure className="ph" style={{ aspectRatio: "16/8" }}>
              <img src={`${base}photos/ot.jpg`} alt={L.altOT} width="1152" height="440" decoding="async" /><figcaption>{L.phOT}</figcaption>
            </figure>
          )}

          {t.sections.map((s, i) => (
            <section key={i} style={{ padding: 0 }}>
              <h2>{s.h[lang]}</h2>
              {s.p && <p>{s.p[lang]}</p>}
              {s.list && <ul className="signs">{s.list[lang].map((x) => <li key={x}>{x}</li>)}</ul>}
              {s.lenses && (
                <div className="lenses">
                  {s.lenses.map((l) => <div key={l.name.en} className="card lens"><b>{l.name[lang]}</b><p>{l.d[lang]}</p></div>)}
                </div>
              )}
              {s.note && <p className="note">{s.note[lang]}</p>}
            </section>
          ))}

          <section style={{ padding: 0 }}>
            <h2>{L.faqTitle}</h2>
            <Faq items={t.faqs} lang={lang} />
          </section>
        </article>

        <aside className="art-side">
          <EyeDiagram lang={lang} start={t.part} interactive={false} compact noteText={t.partNote[lang]} />
          <div className="card side-box">
            <OpenStatus lang={lang} className="sidestatus">
              <div className="acts"><CallButton lang={lang} /><DirectionsButton lang={lang} /></div>
              <p className="emline"><b>{L.emLabel}</b> {L.emText}</p>
            </OpenStatus>
          </div>
        </aside>
      </div>

      <div className="card cta-band">
        <b>{L.ctaQ}</b>
        <CallButton lang={lang} long />
      </div>

      <section>
        <div className="sec-head"><h2 className="t">{L.otherTx}</h2></div>
        <div className="g3 txg others">
          {others.map((o) => (
            <a key={o.slug} className="card" href={href(treatmentPath(lang, o))}><Icon id={o.icon} className="ico" /><span>{o.name[lang]}</span></a>
          ))}
        </div>
      </section>
    </>
  );
}
