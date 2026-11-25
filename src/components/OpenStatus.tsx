// "Open now / Closed now" line. The static HTML shows the plain timings; the browser then adds the live status
// (Indian time) above them, so search engines and no-JS visitors always see correct, unchanging information.
// The status line is rendered empty on the server so the layout doesn't jump when it fills in.
import { useEffect, useState } from "react";
import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";

const GU = "૦૧૨૩૪૫૬૭૮૯";
const toGu = (s: string) => s.replace(/[0-9]/g, (d) => GU[+d]);

/** 13*60 → "1 PM" / "બપોરે ૧"; 17*60+30 → "5:30 PM" / "સાંજે ૫:૩૦". */
export function fmt(m: number, lang: Lang) {
  const h = Math.floor(m / 60), mm = m % 60;
  const t = `${((h + 11) % 12) + 1}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
  if (lang === "gu") return `${h < 12 ? "સવારે" : h < 16 ? "બપોરે" : "સાંજે"} ${toGu(t)}`;
  return `${t} ${h >= 12 ? "PM" : "AM"}`;
}

/** Day of week, minutes since midnight and the date ("YYYY-MM-DD"), in India. */
export function nowInIndia(at = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(at).map((x) => [x.type, x.value]),
  );
  const day = ({ Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as Record<string, number>)[p.weekday];
  return { day, min: (+p.hour % 24) * 60 + +p.minute, date: `${p.year}-${p.month}-${p.day}` };
}

/** The date `n` days after an India date, "YYYY-MM-DD" (calendar arithmetic only, no time zone involved). */
const addDays = (date: string, n: number) => new Date(Date.parse(date + "T00:00:00Z") + n * 86400000).toISOString().slice(0, 10);
// "opens Monday 9 AM" / "સોમવારે સવારે ૯ વાગ્યે ખુલશે", Sunday first.
const DAYS: Record<Lang, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  gu: ["રવિવારે", "સોમવારે", "મંગળવારે", "બુધવારે", "ગુરુવારે", "શુક્રવારે", "શનિવારે"],
};
const isOpenDay = (day: number, date: string) => day !== 0 && !(SITE.holidays as readonly string[]).includes(date);

export function status(lang: Lang, at = new Date(), emergency = false) {
  const L = UI[lang], { day, min, date } = nowInIndia(at);
  const today = isOpenDay(day, date);
  if (today) {
    for (const [a, b] of SITE.sessions) if (min >= a && min < b) return { open: true, text: L.stOpen.replace("{t}", fmt(b, lang)) };
  }
  // On the eye-injuries page the useful answer outside OPD hours is that emergencies are still seen.
  if (emergency) return { open: true, text: L.stEm };
  if (today) {
    for (const [a] of SITE.sessions) if (min < a) return { open: false, text: L.stLater.replace("{t}", fmt(a, lang)) };
  }
  // Next day the OPD opens: skip Sundays and festival days.
  let n = 1;
  while (n < 14 && !isOpenDay((day + n) % 7, addDays(date, n))) n++;
  const d = n === 1 ? L.tomorrow : DAYS[lang][(day + n) % 7];
  const text = (today || day === 0 ? L.stNext : L.stHoliday).replace("{d}", d).replace("{t}", fmt(SITE.sessions[0][0], lang));
  return { open: false, text };
}

export function OpenStatus({ lang, children, className = "now", emergency = false }: { lang: Lang; children?: React.ReactNode; className?: string; emergency?: boolean }) {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const tick = () => setS(status(lang, new Date(), emergency));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [lang, emergency]);
  return (
    <div className={className + (s?.open ? " is-open" : "")}>
      <p className={"st" + (s ? "" : " pending")} aria-live="polite">{s ? s.text : " "}</p>
      <p className="hrs">{UI[lang].hoursShort}</p>
      {children}
    </div>
  );
}
