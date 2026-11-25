// Build step 3: render every route to static HTML with its full <head> for search engines and link previews:
// title, description, canonical, hreflang (en/gu/x-default = English), Open Graph, JSON-LD; plus sitemap.xml, robots.txt and 404.html.
// STAGING=1 adds noindex everywhere and blocks crawlers (GitHub Pages staging copy).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const STAGING = process.env.STAGING === "1";
// Google Search Console ownership check (HTML-tag method): GSC_VERIFY=<content value> at production build time.
const GSC = !STAGING && process.env.GSC_VERIFY ? `<meta name="google-site-verification" content="${process.env.GSC_VERIFY}" />` : "";
const { render, routes, SITE, UI } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const O = SITE.origin;
const tpl = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const today = new Date().toISOString().slice(0, 10);
const LOCALE = { gu: "gu_IN", en: "en_IN" };

const clinic = {
  "@type": "MedicalClinic",
  "@id": O + "/#clinic",
  name: "Subham Eye Clinic",
  // Google rewrites "Subham" to "Shubham"; list both spellings so searches for either find this clinic.
  alternateName: ["સુભમ્ આઈ ક્લિનિક", "Shubham Eye Clinic", "શુભમ્ આઈ ક્લિનિક"],
  url: O + "/",
  telephone: SITE.phoneIntl,
  email: SITE.email,
  image: [O + "/og-image.png", O + "/photos/consult.jpg", O + "/photos/ot.jpg"],
  logo: { "@type": "ImageObject", url: O + "/icon-192.png", width: 192, height: 192 },
  foundingDate: "2002-06",
  medicalSpecialty: "Ophthalmology",
  address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.postal, addressRegion: SITE.address.region, addressCountry: SITE.address.country },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "17:30", closes: "20:30" },
  ],
  availableService: routes.filter((r) => r.kind === "treatment" && r.lang === "en").map((r) => ({ "@type": "MedicalProcedure", name: r.treatment.name.en, url: O + r.path })),
  employee: { "@id": O + "/#rajeev-shah" },
};
const doctor = {
  "@type": "Person",
  "@id": O + "/#rajeev-shah",
  name: "Dr. Rajeev Shah",
  jobTitle: "Eye surgeon (ophthalmologist)",
  worksFor: { "@id": O + "/#clinic" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "M.P. Shah Medical College, Jamnagar" },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "DOMS (Diploma in Ophthalmic Medicine and Surgery)" },
  ],
  knowsLanguage: ["en", "gu", "hi"],
};
const website = { "@type": "WebSite", "@id": O + "/#website", url: O + "/", name: "Subham Eye Clinic", inLanguage: ["en", "gu"], publisher: { "@id": O + "/#clinic" } };

function jsonLd(r) {
  const url = O + r.path;
  if (r.kind === "home") {
    return [website, clinic, doctor, { "@type": "WebPage", "@id": url, url, name: r.title, description: r.description, inLanguage: r.lang, isPartOf: { "@id": O + "/#website" }, about: { "@id": O + "/#clinic" } }];
  }
  const t = r.treatment, L = UI[r.lang], home = O + (r.lang === "en" ? "/" : "/gu/");
  return [
    { "@type": "MedicalWebPage", "@id": url, url, name: r.title, description: r.description, inLanguage: r.lang, isPartOf: { "@id": O + "/#website" },
      about: { "@type": "MedicalProcedure", name: t.name[r.lang] }, publisher: { "@id": O + "/#clinic" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: L.home, item: home },
      { "@type": "ListItem", position: 2, name: L.navTx, item: home + "#tx" },
      { "@type": "ListItem", position: 3, name: t.name[r.lang], item: url } ] },
    { "@type": "FAQPage", inLanguage: r.lang, mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q[r.lang], acceptedAnswer: { "@type": "Answer", text: f.a[r.lang] } })) },
  ];
}

function head(r) {
  const url = O + r.path, nf = r.kind === "notfound";
  const tags = [
    `<title>${esc(r.title)}</title>`,
    r.description && `<meta name="description" content="${esc(r.description)}" />`,
    (STAGING || nf) && `<meta name="robots" content="noindex, nofollow" />`,
    GSC,
  ];
  if (!nf) {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" hreflang="en" href="${O + r.alt.en}" />`,
      `<link rel="alternate" hreflang="gu" href="${O + r.alt.gu}" />`,
      `<link rel="alternate" hreflang="x-default" href="${O + r.alt.en}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Subham Eye Clinic" />`,
      `<meta property="og:title" content="${esc(r.title)}" />`,
      `<meta property="og:description" content="${esc(r.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:locale" content="${LOCALE[r.lang]}" />`,
      `<meta property="og:locale:alternate" content="${LOCALE[r.lang === "gu" ? "en" : "gu"]}" />`,
      `<meta property="og:image" content="${O}/og-image.png" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Subham Eye Clinic, Jamnagar — Dr. Rajeev Shah, MBBS, DOMS. 0288 256 3274" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd(r) }).replace(/</g, "\\u003c")}</script>`,
    );
  }
  return tags.filter(Boolean).join("\n    ");
}

let n = 0;
for (const r of routes) {
  const html = tpl
    .replace(/<html lang="en" data-lang="en">/, `<html lang="${r.lang}" data-lang="${r.lang}">`)
    .replace("<!--head-->", head(r))
    .replace("<!--app-->", render(r.path));
  const out = r.kind === "notfound" ? path.join(dist, "404.html") : path.join(dist, r.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  n++;
}

const pages = routes.filter((r) => r.kind !== "notfound");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((r) => `  <url>
    <loc>${O + r.path}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${O + r.alt.en}"/>
    <xhtml:link rel="alternate" hreflang="gu" href="${O + r.alt.gu}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${O + r.alt.en}"/>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), STAGING ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${O}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
console.log(`prerendered ${n} pages (${STAGING ? "STAGING: noindex" : "production"}), sitemap with ${pages.length} URLs`);
