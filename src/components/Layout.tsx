// Page frame: header with language switch, footer, and the phone call bar.
import type { MouseEvent, ReactNode } from "react";
import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS } from "../content/treatments";
import { doctorPath, href, homePath, treatmentPath, type Route } from "../routes";
import { Icon, Sprite, Tx } from "./ui";
import { Menu } from "./Menu";

const Logo = () => (
  <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M3 24C9 14.5 16 10 24 10s15 4.5 21 14c-6 9.5-13 14-21 14S9 33.5 3 24Z" fill="none" stroke="#2F5D4A" strokeWidth="2.6" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="8.5" fill="#2F5D4A" /><circle cx="27" cy="21" r="2.4" fill="#fff" />
  </svg>
);

// Switching language part-way down the page opens the other language at the same section.
function keepPlace(e: MouseEvent<HTMLAnchorElement>) {
  const here = [...document.querySelectorAll("main section[id]")].filter((s) => s.getBoundingClientRect().top < 160).pop();
  if (here && scrollY > 200) e.currentTarget.hash = here.id;
}

function Header({ route }: { route: Route }) {
  const lang = route.lang, L = UI[lang], home = href(homePath(lang));
  const onHome = route.kind === "home";
  // Sections on this page are plain anchors; the rest go to the home page. Treatment pages have their own timings section.
  const sec = (id: string) => (onHome || (id === "visit" && (route.kind === "treatment" || route.kind === "doctor")) ? `#${id}` : `${home}#${id}`);
  const links = [["tx", L.navTx], ["doc", L.navDoc], ["clinic", L.navClinic], ["visit", L.navVisit]]
    .map(([id, label]) => ({ to: id === "doc" ? href(doctorPath(lang)) : sec(id), label }));
  return (
    <header className="top"><div className="wrap">
      <a className="homelink" href={home}>
        <Logo />
        <span className="brand">{L.brand}<small>{L.doctor} · {L.place}</small></span>
      </a>
      <nav className="nav" aria-label={lang === "gu" ? "મુખ્ય" : "Main"}>
        {links.map((l) => <a key={l.to} href={l.to}>{l.label}</a>)}
      </nav>
      <a className="hcall" href={`tel:${SITE.phoneTel}`}><Icon id="i-phone" />{SITE.phone}</a>
      <div className="lang" role="group" aria-label="Language / ભાષા">
        {(["en", "gu"] as Lang[]).map((l) => (
          <a key={l} href={href(route.alt[l])} hrefLang={l} lang={l} aria-current={l === lang ? "page" : undefined} aria-label={UI[l].langName} onClick={keepPlace}>{l === "gu" ? "ગુજરાતી" : <><span className="lg">English</span><span className="sm">EN</span></>}</a>
        ))}
      </div>
      <Menu route={route} lang={lang} links={links.slice(1)} />
    </div></header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const L = UI[lang];
  return (
    <footer><div className="wrap">
      <div className="cols">
        <div className="contact"><b>{L.brand}</b><Tx k="address" lang={lang} /><a href={`tel:${SITE.phoneTel}`}><b>{SITE.phone}</b></a><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href={href(doctorPath(lang))}>{L.navDoc}</a></div>
        <div className="list two"><p className="fh">{L.navTx}</p>
          {TREATMENTS.map((t) => <a key={t.slug} href={href(treatmentPath(lang, t))}>{t.name[lang]}</a>)}
        </div>
        <div className="list"><p className="fh">{L.footVisit}</p>
          {[["your-visit", L.visTitle], ["visit", L.navVisit]].map(([id, label]) => <a key={id} href={href(homePath(lang)) + "#" + id}>{label}</a>)}
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
