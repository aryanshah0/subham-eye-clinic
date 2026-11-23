import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Treatment } from "./pages/Treatment";
import { UI } from "./content/ui";
import { href, type Route } from "./routes";
import "./styles/index.css";

function NotFound() {
  return (
    <div className="nf">
      <h1>{UI.gu.notFoundTitle}</h1>
      <p>{UI.gu.notFoundBody}</p>
      <p lang="en">{UI.en.notFoundTitle}. {UI.en.notFoundBody}</p>
      <p style={{ marginTop: 20 }}><a className="btn call" href={href("/")}>{UI.gu.home}</a> <a className="btn dir" href={href("/en/")}>Home (English)</a></p>
    </div>
  );
}

export function App({ route }: { route: Route }) {
  return (
    <Layout route={route}>
      {route.kind === "home" && <Home lang={route.lang} />}
      {route.kind === "treatment" && route.treatment && <Treatment lang={route.lang} t={route.treatment} />}
      {route.kind === "notfound" && <NotFound />}
    </Layout>
  );
}
