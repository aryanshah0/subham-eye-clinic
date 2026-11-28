// Dr. Rajeev Shah's own page (/dr-rajeev-shah/ and /gu/dr-rajeev-shah/), for people who search for him by name.
// Only facts that are already confirmed and shown on the home page (docs/QUESTIONS.md). No superlatives,
// no surgery counts (NMC rules). The portrait appears once SITE.photos.portrait is switched on.
import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { href, homePath, treatmentPath } from "../routes";
import { CallButton, DirectionsButton, Icon, Photo, Section } from "../components/ui";
import { OpenStatus } from "../components/OpenStatus";
import { Visit } from "./Home";

export function Doctor({ lang }: { lang: Lang }) {
  const L = UI[lang], portrait = SITE.photos.portrait;
  // Languages and experience are in the intro paragraph; the operations are the treatment cards below.
  const facts = [[L.qualsK, L.qualsV], [L.regK, L.regV], [L.memK, L.memV], [L.campsK, L.campsV]];
  return (
    <div className="t-page doc-page">
      <nav className="crumbs" aria-label={lang === "gu" ? "તમે અહીં છો" : "Breadcrumb"}>
        <ol>
          <li><a href={href(homePath(lang))}>{L.home}</a></li>
          <li aria-current="page">{L.doctor}</li>
        </ol>
      </nav>

      <div className="hero hero-t">
        <div className="hero-l">
          <div>
            <p className="kicker"><span><span>{L.quals}</span><span>{L.docRole}</span></span></p>
            <h1>{L.doctor}</h1>
            <p className="lede">{L.docBody}</p>
          </div>
          <OpenStatus lang={lang}>
            <div className="acts"><CallButton lang={lang} /><DirectionsButton lang={lang} /></div>
            <p className="emline"><b>{L.emLabel}</b> {L.emText}</p>
          </OpenStatus>
        </div>
        {portrait
          ? <Photo file="portrait" alt={L.doctor} w={706} h={706} className="portrait" />
          : <div className="card doc-facts"><dl className="facts">{facts.map(([k, v]) => <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>)}</dl></div>}
      </div>

      {portrait && <dl className="card glance">{facts.map(([k, v]) => <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>)}</dl>}

      <Section id="tx" title={L.txTitle} sub={L.opsNote}>
        <div className="g3 txg">
          {TREATMENTS.map((t) => (
            <a key={t.slug} className="card tcard" href={href(treatmentPath(lang, t))}>
              <Icon id={t.icon} className="ico" />
              <div><h3>{t.name[lang]}</h3><p>{t.card[lang]}</p></div>
            </a>
          ))}
        </div>
      </Section>

      <Visit lang={lang} />
    </div>
  );
}
