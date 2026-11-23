// Single source of truth for clinic facts. Every value here is confirmed by Dr. Shah (docs/QUESTIONS.md, docs/INFO-AUDIT.md).
// Change a fact here and it changes on every page, in both languages, and in the structured data for Google.
export type Lang = "gu" | "en";
export type L<T = string> = Record<Lang, T>;

export const LANGS: Lang[] = ["gu", "en"];
export const DEFAULT_LANG: Lang = "gu";

export const SITE = {
  // Canonical address of the public site. Staging builds keep this canonical and add noindex.
  origin: "https://subhameyeclinic.pages.dev",
  phone: "0288 256 3274",
  phoneTel: "+912882563274",
  phoneIntl: "+91-288-256-3274",
  email: "subhamiclinic@gmail.com",
  mapsCid: "3656070401854130553",
  mapsUrl: "https://maps.google.com/?cid=3656070401854130553",
  mapEmbed: "https://maps.google.com/maps?q=Subham%20Eye%20Clinic%2C%20Summair%20Club%20Road%2C%20Jamnagar&z=16&output=embed",
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
  // OPD sessions, minutes after midnight, Monday–Saturday. Sunday closed. Emergencies 24×7 on the same number.
  sessions: [[9 * 60, 13 * 60], [17 * 60 + 30, 20 * 60 + 30]] as [number, number][],
} as const;
