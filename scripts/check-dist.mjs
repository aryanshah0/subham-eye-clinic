// Build step 4: fail the build if any page is missing what search engines and patients need.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const base = (process.env.BASE || "/").replace(/\/$/, "");
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") && files.push(p); } })(dist);

// Numbers that must never appear on the site (the doctor's personal mobile). They live in .private-numbers,
// one per line, which is git-ignored so they never reach the public repo; in GitHub Actions they come from the
// PRIVATE_NUMBERS secret. Without either, the check is skipped with a warning.
const privFile = path.join(dist, "..", ".private-numbers");
const privText = process.env.PRIVATE_NUMBERS ?? (fs.existsSync(privFile) ? fs.readFileSync(privFile, "utf8") : "");
const privateNumbers = privText.split(/[\n,]/).map((l) => l.replace(/\D/g, "")).filter((n) => n.length >= 8);
if (!privateNumbers.length) console.warn("check-dist: no private numbers given (.private-numbers or PRIVATE_NUMBERS), private-number check skipped");
const errors = [], titles = new Map();
const exists = (url) => {
  let p = url.split("#")[0].split("?")[0];
  if (!p.startsWith(base + "/")) return true; // external or other origin
  p = p.slice(base.length);
  const f = path.join(dist, p.endsWith("/") ? p + "index.html" : p);
  return fs.existsSync(f);
};
for (const f of files) {
  const rel = path.relative(dist, f), h = fs.readFileSync(f, "utf8"), nf = rel === "404.html" || rel === path.join("gu", "404.html");
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
  // Project rules (docs/NMC-RULES.md, owner's decisions): never the doctor's personal mobile, no superlatives, no tracking.
  for (const n of privateNumbers) need(!h.replace(/\D/g, "").includes(n), "contains a private phone number from .private-numbers");
  need(!/\b(best|leading|no\.\s?1|testimonials?)\b/i.test(h.replace(/<script[\s\S]*?<\/script>/g, "")), "superlative or testimonial wording");
  need(!/googletagmanager|google-analytics|gtag\(/.test(h), "analytics tag");
}
if (errors.length) { console.error("check-dist FAILED:\n  " + errors.join("\n  ")); process.exit(1); }
console.log(`check-dist OK: ${files.length} pages, ${titles.size} unique titles, all internal links resolve`);
