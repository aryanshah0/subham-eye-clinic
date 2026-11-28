import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { doctorPath, href, treatmentPath } from "../routes";
import { CallButton, DirectionsButton, Icon, Phones, Photo, Section, Tx } from "../components/ui";
import { OpenStatus } from "../components/OpenStatus";
import { EyeDiagram } from "../components/EyeDiagram";

export function Home({ lang }: { lang: Lang }) {
  const L = UI[lang], on = SITE.photos;
  const photos = [
    ...(on.tests ? [{ file: "tests", alt: L.altTests, caption: L.phTests }] : []),
    ...(on.ot ? [{ file: "ot", alt: L.altOT, caption: L.phOT }] : []),
    ...(on.waiting ? [{ file: "waiting", alt: L.altWait, caption: L.phWait }] : []),
    ...(on.building ? [{ file: "building", alt: L.altBldg, caption: L.phBldg }] : []),
  ];
  return (
    <>
      <div className="hero">
        <div className="hero-l">
          <div>
            <p className="kicker"><span>{L.kicker.split("\u00a0· ").map((x) => <span key={x}>{x}</span>)}</span></p>
            <h1>{L.brand}</h1>
            <p className="hero-k">{L.heroTitle}</p>
            <p className="lede">{L.heroSub}</p>
          </div>
          <OpenStatus lang={lang}>
            <div className="acts"><CallButton lang={lang} /><DirectionsButton lang={lang} /></div>
            <p className="emline"><b>{L.emLabel}</b> <Phones>{L.emText}</Phones></p>
          </OpenStatus>
        </div>
        <EyeDiagram lang={lang} />
      </div>

      <Section id="tx" title={L.txTitle} sub={L.txSub}>
        <TxRows lang={lang} />
      </Section>

      <Section id="doc" title={L.doctor} sub={L.docRole}>
        <div className={"card doc-card" + (SITE.photos.portrait ? " has-photo" : "")}>
          {SITE.photos.portrait && <Photo file="portrait" alt={L.doctor} className="portrait" />}
          <div className="doc-body">
            <p className="doc-q">{L.qualsV}</p>
            <p className="doc-line">{L.docShort}</p>
            <p className="doc-more"><a href={href(doctorPath(lang))}>{L.docMore}</a></p>
          </div>
        </div>
      </Section>

      <Section id="clinic" title={L.galTitle} sub={L.galSub}>
        <Photo file="consult" alt={L.altConsult} caption={L.phConsult} className="lead" />
        {photos.length > 1
          ? <div className={photos.length === 3 ? "g3" : photos.length === 4 ? "g4" : "g2"}>{photos.map((x) => <Photo key={x.file} {...x} className="tall" />)}</div>
          : photos.map((x) => <Photo key={x.file} {...x} />)}
        <div className="card facil" style={{ marginTop: 28 }}>
          {([["i-microscope", "eq1", "eq1d"], ["i-scan", "eq2", "eq2d"], ["i-laser", "eq3", "eq3d"]] as const).map(([ic, k, d]) => (
            <div key={k}><Icon id={ic} className="ico" /><p><b>{L[k]}</b><span>{L[d]}</span></p></div>
          ))}
        </div>
      </Section>

      <Section id="your-visit" title={L.visTitle}>
        <ol className="card steps">
          {([["v1t", "v1d"], ["v2t", "v2d"], ["v3t", "v3d"], ["eq4", "eq4d"]] as const).map(([h, d]) => (
            <li key={h}><h3>{L[h]}</h3><p><Phones>{L[d]}</Phones></p></li>
          ))}
        </ol>
      </Section>

      <Visit lang={lang} />
    </>
  );
}

/** The six treatments as rows in one card (icon, name, one line). `brief` leaves out the line. */
export function TxRows({ lang, brief = false }: { lang: Lang; brief?: boolean }) {
  return (
    <div className={"card txrows" + (brief ? " brief" : "")}>
      {TREATMENTS.map((t) => (
        <a key={t.slug} className="txrow" href={href(treatmentPath(lang, t))}>
          <Icon id={t.icon} className="ico" />
          <span><b>{t.name[lang]}</b>{!brief && <span>{t.card[lang]}</span>}</span>
        </a>
      ))}
    </div>
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
          </tbody></table>
          <p className="fest em"><b>{L.emLabel}</b> <Phones>{L.emText}</Phones></p>
          <p className="fest"><b>{L.festK}:</b> {L.festV}</p>
          <Tx k="address" lang={lang} as="p" className="addr" />
          <ul className="contact-list">
            <li>{L.appt} <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>
        <div className="card mapcard">
          <iframe className="mapframe" title={L.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`${SITE.mapEmbed}&hl=${lang}`} />
          <DirectionsButton lang={lang} label="openMaps" />
        </div>
      </div>
    </Section>
  );
}
