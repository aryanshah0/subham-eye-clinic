import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Treatment } from "./pages/Treatment";
import { Doctor } from "./pages/Doctor";
import { UI } from "./content/ui";
import { TREATMENTS } from "./content/treatments";
import { href, homePath, treatmentPath, type Route } from "./routes";
import { CallButton, Icon } from "./components/ui";
import type { Lang } from "./content/site";
import "./styles/index.css";

// 404 in the language of the address (Cloudflare serves /gu/404.html for missing /gu/… pages), with a line in the other language.
function NotFound({ lang }: { lang: Lang }) {
  const L = UI[lang], other: Lang = lang === "en" ? "gu" : "en", O = UI[other];
  return (
    <div className="nf">
      <h1>{L.notFoundTitle}</h1>
      <p>{L.notFoundBody}</p>
      <p lang={other}>{O.notFoundTitle}. {O.notFoundBody}</p>
      <div className="acts">
        <a className="btn dir" href={href(homePath(lang))}>{L.home}</a>
        <a className="btn dir" href={href(homePath(other))} lang={other}>{O.home} ({O.langName})</a>
        <CallButton lang={lang} />
      </div>
      <div className="others">
        {TREATMENTS.map((t) => <a key={t.slug} className="card" href={href(treatmentPath(lang, t))}><Icon id={t.icon} className="ico" /><span>{t.name[lang]}</span></a>)}
      </div>
    </div>
  );
}

export function App({ route }: { route: Route }) {
  return (
    <Layout route={route}>
      {route.kind === "home" && <Home lang={route.lang} />}
      {route.kind === "treatment" && route.treatment && <Treatment lang={route.lang} t={route.treatment} />}
      {route.kind === "doctor" && <Doctor lang={route.lang} />}
      {route.kind === "notfound" && <NotFound lang={route.lang} />}
    </Layout>
  );
}
