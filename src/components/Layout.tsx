// Page frame: header with language switch, footer, and the phone call bar.
import type { ReactNode } from "react";
import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { href, homePath, treatmentPath, type Route } from "../routes";
import { Icon, Sprite, Tx } from "./ui";

const Logo = () => (
  <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M3 24C9 14.5 16 10 24 10s15 4.5 21 14c-6 9.5-13 14-21 14S9 33.5 3 24Z" fill="none" stroke="#2F5D4A" strokeWidth="2.6" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="8.5" fill="#2F5D4A" /><circle cx="27" cy="21" r="2.4" fill="#fff" />
  </svg>
);

function Header({ route }: { route: Route }) {
  const lang = route.lang, L = UI[lang], home = href(homePath(lang));
  const onHome = route.kind === "home";
  const sec = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  return (
    <header className="top"><div className="wrap">
      <a className="homelink" href={home}>
        <Logo />
        <span className="brand">{L.brand}<small>{L.doctor} · {L.place}</small></span>
      </a>
      <nav className="nav" aria-label={lang === "gu" ? "મુખ્ય" : "Main"}>
        <a href={sec("tx")}>{L.navTx}</a><a href={sec("clinic")}>{L.navClinic}</a><a href={sec("doc")}>{L.navDoc}</a><a href={sec("visit")}>{L.navVisit}</a>
      </nav>
      <div className="lang" role="group" aria-label="ભાષા / Language">
        {(["gu", "en"] as Lang[]).map((l) => (
          <a key={l} href={href(route.alt[l])} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined} aria-label={UI[l].langName}>{l === "gu" ? "ગુ" : "EN"}</a>
        ))}
      </div>
    </div></header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const L = UI[lang];
  return (
    <footer><div className="wrap">
      <div className="cols">
        <div><b>{L.brand}</b><br /><Tx k="address" lang={lang} /><br /><a href={`tel:${SITE.phoneTel}`}><b>{SITE.phone}</b></a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        <div><p className="fh">{L.visitTitle}</p>{L.monSat}<br />{L.morning}<br />{L.evening}<br />{L.sunday}: {L.closed}</div>
        <div><p className="fh">{L.emergency}</p>{L.always}<br /><a href={`tel:${SITE.phoneTel}`}><b>{SITE.phone}</b></a></div>
        <div className="list"><p className="fh">{L.navTx}</p>
          {TREATMENTS.map((t) => <a key={t.slug} href={href(treatmentPath(lang, t))}>{t.name[lang]}</a>)}
        </div>
      </div>
      <div className="legal"><b>{L.doctor}</b>, MBBS, DOMS · {L.regV} · {L.footNote}</div>
    </div></footer>
  );
}

const Dock = ({ lang }: { lang: Lang }) => (
  <nav className="dock" aria-label={lang === "gu" ? "ઝડપી ક્રિયાઓ" : "Quick actions"}>
    <a className="c" href={`tel:${SITE.phoneTel}`}><Icon id="i-phone" /><span>{UI[lang].call}</span></a>
    <a className="d" href={SITE.mapsUrl} rel="noopener"><Icon id="i-pin" /><span>{UI[lang].dir}</span></a>
  </nav>
);

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <>
      <Sprite />
      <a className="skip" href="#main">{UI[route.lang].skip}</a>
      <Header route={route} />
      <main className="wrap" id="main">{children}</main>
      <Footer lang={route.lang} />
      <Dock lang={route.lang} />
    </>
  );
}
