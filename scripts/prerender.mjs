// Build step 3: render every route to static HTML with its full <head> for search engines and link previews:
// title, description, canonical, hreflang (en/gu/x-default = English), Open Graph, JSON-LD; plus sitemap.xml, robots.txt and 404.html.
// DEV=1 builds the development copy (GitHub Pages): noindex everywhere, crawlers blocked, and a visible strip saying so.
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const DEV = process.env.DEV === "1";
// Google Search Console ownership check (HTML-tag method): GSC_VERIFY=<content value> at production build time.
const GSC = !DEV && process.env.GSC_VERIFY ? `<meta name="google-site-verification" content="${process.env.GSC_VERIFY}" />` : "";
const { render, routes, SITE, UI } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const O = SITE.origin;
const tpl = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// The font is in a small blocking script per script (cached for a year) that hands its bytes to the browser before the page
// is laid out, so the page is drawn once, in the right font, also on a first visit. A font in CSS, even embedded, is decoded
// a frame later and makes the first view jump. English pages don't load the Gujarati file. Without JavaScript: system font.
const FONT_DIR = path.join(root, "src/fonts"); // built by tools/build-fonts.py
const RANGE = {
  latin: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-200B,U+200E-206F,U+20AC,U+2122,U+2191-2193,U+2212,U+2215",
  gujarati: "U+0951-0952,U+0964-0965,U+0A80-0AFF,U+200C-200D,U+20B9,U+25CC,U+A830-A839",
};
const fontJs = (name, faces) => {
  const add = faces.map(([family, file, weight, range]) => {
    const data = fs.readFileSync(path.join(FONT_DIR, file)).toString("base64");
    return `f("${family}","${data}","${weight}","${range}")`;
  });
  const js = `(function(){function f(n,d,w,r){try{document.fonts.add(new FontFace(n,Uint8Array.from(atob(d),function(c){return c.charCodeAt(0)}).buffer,{weight:w,display:"block",unicodeRange:r}))}catch(e){}}${add.join(";")}})();`;
  const out = `font-${name}-${createHash("sha256").update(js).digest("hex").slice(0, 8)}.js`;
  fs.writeFileSync(path.join(dist, "assets", out), js);
  return out;
};
const faces = (script) => ["400", "600"].map((w) => ["Anek", `anek-${script}-${w}.woff2`, w, RANGE[script]]);
const latinJs = fontJs("latin", [...faces("latin"), ["Anek Switch", "anek-switch-600.woff2", "600", RANGE.gujarati]]);
const guJs = fontJs("gujarati", faces("gujarati"));
const FONTS = { en: [latinJs], gu: [guJs, latinJs] };
const BASE = (process.env.BASE || "/").replace(/\/$/, "");
const OG_ALT = {
  en: "Subham Eye Clinic, Jamnagar — Dr. Rajeev Shah, MBBS, DOMS. 0288 256 3274",
  gu: "સુભમ્ આઈ ક્લિનિક, જામનગર — ડૉ. રાજીવ શાહ, MBBS, DOMS. 0288 256 3274",
};
// What each treatment page offers, named and typed for search engines (the page titles are written for patients).
const SERVICES = {
  "cataract-surgery": [["MedicalProcedure", "Phaco cataract surgery"]],
  glaucoma: [["MedicalTherapy", "Glaucoma treatment"], ["MedicalProcedure", "Glaucoma surgery"]],
  "diabetic-eye-checkup": [["MedicalTest", "Diabetic eye examination"]],
  "eye-injuries": [["MedicalProcedure", "Eye injury and corneal injury repair"]],
  "pterygium-chalazion": [["MedicalProcedure", "Pterygium surgery"], ["MedicalProcedure", "Chalazion surgery"]],
  "eye-tests-contact-lenses": [["MedicalTest", "Eye examination"]],
};
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
  image: [O + "/og-image.png", O + "/photos/consult.jpg"],
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
  availableService: routes.filter((r) => r.kind === "treatment" && r.lang === "en")
    .flatMap((r) => SERVICES[r.treatment.slug].map(([type, name]) => ({ "@type": type, name, url: O + r.path }))),
  // Emergencies are seen 24×7 on the clinic number (QUESTIONS.md).
  contactPoint: { "@type": "ContactPoint", contactType: "emergency", telephone: SITE.phoneIntl, availableLanguage: ["en", "gu", "hi"],
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" } },
  areaServed: { "@type": "City", name: "Jamnagar" },
  employee: { "@id": O + "/#rajeev-shah" },
};
// Treatment pages refer to the clinic by @id; this short copy makes each page's data complete on its own.
const clinicRef = { "@type": "MedicalClinic", "@id": O + "/#clinic", name: "Subham Eye Clinic", url: O + "/", telephone: SITE.phoneIntl, address: clinic.address };
const doctor = {
  "@type": "Person",
  "@id": O + "/#rajeev-shah",
  name: "Dr. Rajeev Shah",
  alternateName: ["Dr. Rajiv Shah", "ડૉ. રાજીવ શાહ"],
  url: O + "/dr-rajeev-shah/",
  jobTitle: "Ophthalmologist and eye surgeon",
  worksFor: { "@id": O + "/#clinic" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "M.P. Shah Medical College, Jamnagar" },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "DOMS (Diploma in Ophthalmic Medicine and Surgery)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "Gujarat Medical Council registration", identifier: SITE.regNo,
      recognizedBy: { "@type": "Organization", name: "Gujarat Medical Council" } },
  ],
  knowsLanguage: ["en", "gu", "hi"],
};
// alternateName ends with our own address: Google's documented remedy when it shows the parent domain's name
// ("Cloudflare", because of pages.dev) as the site name in search results.
const SITE_ALT = ["સુભમ્ આઈ ક્લિનિક", "Shubham Eye Clinic", new URL(O).hostname];
const website = { "@type": "WebSite", "@id": O + "/#website", url: O + "/", name: "Subham Eye Clinic", alternateName: SITE_ALT, inLanguage: ["en", "gu"], publisher: { "@id": O + "/#clinic" } };

function jsonLd(r) {
  const url = O + r.path;
  if (r.kind === "home") {
    return [website, clinic, doctor, { "@type": "WebPage", "@id": url, url, name: r.title, description: r.description, inLanguage: r.lang, isPartOf: { "@id": O + "/#website" }, about: { "@id": O + "/#clinic" } }];
  }
  const L = UI[r.lang], home = O + (r.lang === "en" ? "/" : "/gu/");
  if (r.kind === "doctor") {
    return [
      { "@type": "WebSite", "@id": O + "/#website", url: O + "/", name: "Subham Eye Clinic", alternateName: SITE_ALT },
      clinicRef,
      doctor,
      { "@type": "ProfilePage", "@id": url, url, name: r.title, description: r.description, inLanguage: r.lang, isPartOf: { "@id": O + "/#website" },
        mainEntity: { "@id": O + "/#rajeev-shah" }, publisher: { "@id": O + "/#clinic" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: L.home, item: home },
        { "@type": "ListItem", position: 2, name: L.doctor, item: url } ] },
    ];
  }
  const t = r.treatment;
  return [
    { "@type": "WebSite", "@id": O + "/#website", url: O + "/", name: "Subham Eye Clinic", alternateName: SITE_ALT },
    clinicRef,
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
    (DEV || nf) && `<meta name="robots" content="noindex, nofollow" />`,
    ...FONTS[r.lang].map((f) => `<script src="${BASE}/assets/${f}"></script>`),
    // Paint only once the page is parsed, so a half-arrived header is never drawn and then moved.
    `<link rel="expect" href="#main" blocking="render" />`,
    // Chrome fetches a page as the visitor is about to tap its link, so it opens at once.
    `<script type="speculationrules">{"prerender":[{"where":{"href_matches":"${BASE}/*"},"eagerness":"moderate"}]}</script>`,
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
      `<meta property="og:image" content="${O}/og-image${r.lang === "gu" ? "-gu" : ""}.png" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(OG_ALT[r.lang])}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd(r) }).replace(/</g, "\\u003c")}</script>`,
    );
  }
  return tags.filter(Boolean).join("\n    ");
}

// Development copy only: a plain strip above the page, so nobody shares this copy by mistake.
const DEV_STRIP = `<p style="margin:0;padding:8px 16px;background:#24483A;color:#fff;font:600 14px/1.4 system-ui,sans-serif;text-align:center">Development copy, not the clinic's website. The real site is <a href="${O}/" style="color:#fff">${new URL(O).host}</a></p>`;
let n = 0;
for (const r of routes) {
  const html = tpl
    .replace(/<html lang="en" data-lang="en">/, `<html lang="${r.lang}" data-lang="${r.lang}">`)
    .replace("<!--head-->", head(r))
    .replace("<!--app-->", render(r.path))
    .replace('<div id="root">', DEV ? `${DEV_STRIP}<div id="root">` : '<div id="root">');
  const out = r.kind === "notfound" ? path.join(dist, r.lang === "gu" ? "gu" : "", "404.html") : path.join(dist, r.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  n++;
}

const pages = routes.filter((r) => r.kind !== "notfound");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((r) => `  <url>
    <loc>${O + r.path}</loc>
    <lastmod>${SITE.contentUpdated}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${O + r.alt.en}"/>
    <xhtml:link rel="alternate" hreflang="gu" href="${O + r.alt.gu}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${O + r.alt.en}"/>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), DEV ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${O}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
console.log(`prerendered ${n} pages (${DEV ? "DEV: noindex" : "production"}), sitemap with ${pages.length} URLs`);
