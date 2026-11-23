// "Open now / Closed now" line. The static HTML shows the plain timings; the browser then replaces them with the
// live status (Indian time), so search engines and no-JS visitors always see correct, unchanging information.
import { useEffect, useState } from "react";
import { SITE, type Lang } from "../content/site";
import { UI } from "../content/ui";

const GU = "૦૧૨૩૪૫૬૭૮૯";
const toGu = (s: string) => s.replace(/[0-9]/g, (d) => GU[+d]);

function fmt(m: number, lang: Lang) {
  const h = Math.floor(m / 60), mm = m % 60;
  const t = `${((h + 11) % 12) + 1}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
  return lang === "gu" ? toGu(t) : `${t} ${h >= 12 ? "PM" : "AM"}`;
}

function nowInIndia() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).map((x) => [x.type, x.value]),
  );
  const day = ({ Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as Record<string, number>)[p.weekday];
  return { day, min: (+p.hour % 24) * 60 + +p.minute };
}

export function status(lang: Lang) {
  const L = UI[lang], { day, min } = nowInIndia();
  if (day !== 0) {
    for (const [a, b] of SITE.sessions) if (min >= a && min < b) return { open: true, text: L.stOpen.replace("{t}", fmt(b, lang)) };
    for (const [a] of SITE.sessions) if (min < a) return { open: false, text: L.stLater.replace("{t}", fmt(a, lang)) };
  }
  return { open: false, text: L.stNext.replace("{d}", day === 6 || day === 0 ? L.monday : L.tomorrow) };
}

export function OpenStatus({ lang, children, className = "now" }: { lang: Lang; children?: React.ReactNode; className?: string }) {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const tick = () => setS(status(lang));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [lang]);
  return (
    <div className={className + (s?.open ? " is-open" : "")}>
      <p className="st">{s ? s.text : UI[lang].hoursShort}</p>
      {s && <p className="hrs">{UI[lang].hoursShort}</p>}
      {children}
    </div>
  );
}
