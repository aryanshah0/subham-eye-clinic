// Single source of truth for clinic facts. Every value here is confirmed by Dr. Shah (docs/QUESTIONS.md, docs/INFO-AUDIT.md).
// Change a fact here and it changes on every page, in both languages, and in the structured data for Google.
export type Lang = "gu" | "en";
export type L<T = string> = Record<Lang, T>;

export const LANGS: Lang[] = ["en", "gu"];
export const DEFAULT_LANG: Lang = "en";

export const SITE = {
  // Canonical address of the public site. The dev copy keeps this canonical and adds noindex.
  origin: "https://subhameyeclinic.pages.dev",
  phone: "0288 256 3274",
  phoneTel: "+912882563274",
  phoneIntl: "+91-288-256-3274",
  email: "subhamiclinic@gmail.com",
  mapsCid: "3656070401854130553",
  mapsUrl: "https://maps.google.com/?cid=3656070401854130553",
  // Embed by coordinates: a plain pin, without Google's place card (which shows a star rating, not allowed under the NMC rules).
  mapEmbed: "https://maps.google.com/maps?q=22.465287,70.0573347&z=17&output=embed",
  geo: { lat: 22.465287, lng: 70.0573347 },
  regNo: "G-13342",
  openedYear: 2002,
  address: {
    street: "2 Shri Nivas Colony, Opp. Jay Cable, Summair Club Road",
    city: "Jamnagar",
    postal: "361005",
    region: "Gujarat",
    country: "IN",
  },
  // Photos shot at the clinic. Set to true after adding public/photos/portrait.jpg (4:5) or building.jpg (4:3);
  // until then the page simply has no empty slot for them.
  // ot and waiting are off too: the 2020 crops show a covered machine with a brand name, and an empty wall.
  photos: { portrait: false as boolean, building: false as boolean, ot: false as boolean, waiting: false as boolean },
  // OPD sessions, minutes after midnight, Monday–Saturday. Sunday closed. Emergencies 24×7 on the same number.
  sessions: [[9 * 60, 13 * 60], [17 * 60 + 30, 20 * 60 + 30]] as [number, number][],
  // Festival days when the OPD is closed (India dates, "YYYY-MM-DD"). Emergencies are still seen 24×7 on the same number.
  // Dates come from Dr. Shah; empty until he gives them.
  holidays: [] as string[],
  // Date the page text last changed (sitemap <lastmod>). Change it by hand when the content changes, not on every deploy.
  contentUpdated: "2026-11-25",
} as const;
