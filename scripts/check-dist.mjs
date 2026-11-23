// Build step 4: fail the build if any page is missing what search engines and patients need.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const base = (process.env.BASE || "/").replace(/\/$/, "");
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") && files.push(p); } })(dist);

const errors = [], titles = new Map();
const exists = (url) => {
  let p = url.split("#")[0].split("?")[0];
  if (!p.startsWith(base + "/")) return true; // external or other origin
  p = p.slice(base.length);
  const f = path.join(dist, p.endsWith("/") ? p + "index.html" : p);
  return fs.existsSync(f);
};
for (const f of files) {
  const rel = path.relative(dist, f), h = fs.readFileSync(f, "utf8"), nf = rel === "404.html";
  const need = (cond, msg) => { if (!cond) errors.push(`${rel}: ${msg}`); };
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1];
  need(title, "no <title>");
  if (title) { need(!titles.has(title), `duplicate title with ${titles.get(title)}`); titles.set(title, rel); }
  need((h.match(/<h1[\s>]/g) || []).length === 1, "must have exactly one <h1>");
  if (!nf) {
    need(/<meta name="description" content="[^"]{50,}"/.test(h), "description missing or too short");
    need(/<link rel="canonical"/.test(h), "no canonical");
    need((h.match(/hreflang=/g) || []).length >= 3, "missing hreflang links");
    need(/application\/ld\+json/.test(h), "no JSON-LD");
    need(/<html lang="(gu|en)"/.test(h), "no html lang");
  }
  for (const m of h.matchAll(/<img[^>]*>/g)) need(/alt="[^"]+"/.test(m[0]), `image without alt: ${m[0].slice(0, 60)}`);
  for (const m of h.matchAll(/href="([^"]+)"/g)) if (m[1].startsWith("/")) need(exists(m[1]), `broken internal link ${m[1]}`);
  need(!/laser cataract/i.test(h), 'says "laser cataract" (it is phaco)');
}
if (errors.length) { console.error("check-dist FAILED:\n  " + errors.join("\n  ")); process.exit(1); }
console.log(`check-dist OK: ${files.length} pages, ${titles.size} unique titles, all internal links resolve`);
