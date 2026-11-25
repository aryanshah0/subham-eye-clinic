import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { href, treatmentPath } from "../routes";
import { CallButton, DirectionsButton, Icon, Photo, Section, Tx } from "../components/ui";
import { OpenStatus } from "../components/OpenStatus";
import { EyeDiagram } from "../components/EyeDiagram";

export function Home({ lang }: { lang: Lang }) {
  const L = UI[lang];
  return (
    <>
      <div className="hero">
        <div className="hero-l">
          <div>
            <p className="kicker">{L.kicker}</p>
            <h1>{L.heroTitle}</h1>
            <p className="lede">{L.heroSub}</p>
          </div>
          <OpenStatus lang={lang}>
            <div className="acts"><CallButton lang={lang} long /><DirectionsButton lang={lang} /></div>
            <p className="emline"><b>{L.emLabel}</b> {L.emText}</p>
          </OpenStatus>
        </div>
        <EyeDiagram lang={lang} />
      </div>

      <Section id="tx" title={L.txTitle} sub={L.txSub}>
        <div className="g3 txg">
          {TREATMENTS.map((t) => (
            <a key={t.slug} className="card tcard" href={href(treatmentPath(lang, t))}>
              <Icon id={t.icon} className="ico" />
              <div><h3>{t.name[lang]}</h3><p>{t.card[lang]}</p></div>
            </a>
          ))}
        </div>
      </Section>

      <Section id="clinic" title={L.galTitle} sub={L.galSub}>
        <div className={SITE.photos.building ? "g4" : "g3"}>
          <Photo file="consult" alt={L.altConsult} caption={L.phConsult} className="tall" />
          <Photo file="ot" alt={L.altOT} caption={L.phOT} className="tall" />
          <Photo file="waiting" alt={L.altWait} caption={L.phWait} className="tall" />
          {SITE.photos.building && <Photo file="building" alt={L.phBldg} caption={L.phBldg} className="tall" />}
        </div>
        <div className="card facil" style={{ marginTop: 28 }}>
          {([["i-microscope", "eq1", "eq1d"], ["i-scan", "eq2", "eq2d"], ["i-laser", "eq3", "eq3d"], ["i-bag", "eq4", "eq4d"]] as const).map(([ic, k, d]) => (
            <div key={k}><Icon id={ic} className="ico" /><p><b>{L[k]}</b><span>{L[d]}</span></p></div>
          ))}
        </div>
      </Section>

      <Section id="doc" title={L.doctor} sub={L.docRole}>
        <div className={"doc" + (SITE.photos.portrait ? " has-photo" : "")}>
          {SITE.photos.portrait && <Photo file="portrait" alt={L.doctor} w={800} h={1000} className="portrait" />}
          <div className="card doc-card">
            <p>{L.docBody}</p>
            <dl className="facts">
              <div><dt className="label">{L.qualsK}</dt><dd>{L.qualsV}</dd></div>
              <div><dt className="label">{L.regK}</dt><dd>{L.regV}</dd></div>
              <div><dt className="label">{L.campsK}</dt><dd>{L.campsV}</dd></div>
            </dl>
          </div>
        </div>
      </Section>

      <Section id="your-visit" title={L.visTitle}>
        <ol className="card steps">
          {([["v1t", "v1d"], ["v2t", "v2d"], ["v3t", "v3d"]] as const).map(([h, d], i) => (
            <li key={h}><span className="n" aria-hidden="true">{lang === "gu" ? "૧૨૩"[i] : i + 1}</span><div><h3>{L[h]}</h3><p>{L[d]}</p></div></li>
          ))}
        </ol>
      </Section>

      <Visit lang={lang} />
    </>
  );
}

export function Visit({ lang }: { lang: Lang }) {
  const L = UI[lang];
  return (
    <Section id="visit" title={L.visitTitle}>
      <div className="g2 visit">
        <div className="card">
          <table className="hours"><tbody>
            <tr><th scope="row">{L.monSat}</th><td>{L.morning}<br />{L.evening}</td></tr>
            <tr><th scope="row">{L.sunday}</th><td>{L.closed}</td></tr>
            <tr className="em"><th scope="row">{L.emergency}</th><td>{L.always}</td></tr>
          </tbody></table>
          <Tx k="address" lang={lang} as="p" className="addr" />
          <p className="small">{L.appt} <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />{L.mediclaim}</p>
        </div>
        <div className="card mapcard">
          <iframe className="mapframe" title={L.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={SITE.mapEmbed} />
          <DirectionsButton lang={lang} label="openMaps" />
        </div>
      </div>
    </Section>
  );
}
