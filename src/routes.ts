// Every page of the site, in both languages. English lives at "/", Gujarati mirrors it under "/gu/" (Dr. Shah's choice, 2026-11-25).
import { LANGS, type L, type Lang } from "./content/site";
import { TREATMENTS, type Treatment } from "./content/treatments";

export type Route = {
  path: string; // without the deploy base, always starts and ends with "/" (404 is "/404/")
  lang: Lang;
  kind: "home" | "treatment" | "notfound";
  treatment?: Treatment;
  title: string;
  description: string;
  alt: L; // the same page in each language
};

const pathFor = (lang: Lang, slug = "") => (lang === "en" ? "/" : "/gu/") + (slug ? slug + "/" : "");

const HOME_TITLE: L = {
  gu: "સુભમ્ આઈ ક્લિનિક, જામનગર — ડૉ. રાજીવ શાહ, આંખના સર્જન",
  en: "Subham Eye Clinic, Jamnagar — Dr. Rajeev Shah, Eye Surgeon",
};
const HOME_DESC: L = {
  gu: "જામનગરમાં ડૉ. રાજીવ શાહ (MBBS, DOMS)નું આંખનું ક્લિનિક, ૨૦૦૨થી: મોતિયાનું ઓપરેશન, ઝામર, ડાયાબિટીસમાં આંખની તપાસ અને ૨૪×૭ આંખની ઇમરજન્સી. ફોન 0288 256 3274.",
  en: "Eye clinic of Dr. Rajeev Shah (MBBS, DOMS) in Jamnagar since 2002: cataract surgery, glaucoma, diabetic eye check-ups and 24×7 eye emergencies. Call 0288 256 3274.",
};
const BRAND: L = { gu: "સુભમ્ આઈ ક્લિનિક", en: "Subham Eye Clinic" };

export const routes: Route[] = [
  ...LANGS.map((lang): Route => ({
    path: pathFor(lang),
    lang,
    kind: "home",
    title: HOME_TITLE[lang],
    description: HOME_DESC[lang],
    alt: { gu: pathFor("gu"), en: pathFor("en") },
  })),
  ...TREATMENTS.flatMap((t) =>
    LANGS.map((lang): Route => ({
      path: pathFor(lang, t.slug),
      lang,
      kind: "treatment",
      treatment: t,
      title: `${t.title[lang]} — ${BRAND[lang]}`,
      description: t.description[lang],
      alt: { gu: pathFor("gu", t.slug), en: pathFor("en", t.slug) },
    })),
  ),
  {
    path: "/404/",
    lang: "en",
    kind: "notfound",
    title: "Page not found / આ પાનું મળ્યું નથી — Subham Eye Clinic",
    description: "",
    alt: { en: "/", gu: "/gu/" },
  },
];

export const treatmentPath = (lang: Lang, t: Treatment) => pathFor(lang, t.slug);
export const homePath = (lang: Lang) => pathFor(lang);

// The deploy base ("/" in production, "/subham-eye-clinic/" on the staging copy) is added to every internal link.
export const href = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + path;
