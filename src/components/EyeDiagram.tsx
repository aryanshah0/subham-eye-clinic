// Labelled cross-section of the eye. On the home page the treatment links highlight the part each treatment concerns;
// on a treatment page it shows that page's part. The drawing and its note are in the static HTML (no JS needed to read them).
import { useState } from "react";
import type { Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS, type Part } from "../content/treatments";
import { href, treatmentPath } from "../routes";

// Resting colours, the highlighted part, and lighter (opaque) tints for the parts that step back once a treatment is tapped.
const C = { line: "#2F5D4A", lineDim: "#B4C2B6", gold: "#B8893A", goldDim: "#E7D8B8", cornea: "#F1EDE2", body: "#FAF6EE", lens: "#F6EBD5", hl: "#E9CB8F", hlDark: "#87621F", burn: "#A8642A" };
const CHIP_TREATMENTS = TREATMENTS.filter((t) => t.slug !== "eye-tests-contact-lenses");

export function EyeDiagram({ lang, start = "lens", interactive = true, noteText }: { lang: Lang; start?: Part; interactive?: boolean; noteText?: string }) {
  const [part, setPart] = useState<Part>(start);
  const [touched, setTouched] = useState(false);
  const L = UI[lang];
  const line = (p: Part | null) => (touched && p !== part ? C.lineDim : C.line);
  const gold = touched ? C.goldDim : C.gold;
  const hl = (p: Part) => part === p;
  const pick = (p: Part) => { setPart(p); setTouched(true); };
  const front = hl("cornea") || hl("surface");
  const cls = (on: boolean) => (on ? "on" : undefined);

  return (
    <figure className="card fig">
      <svg className="eye" viewBox="0 0 560 346" role="img" aria-label={L.eyeAria}>
        <defs><marker id="dot" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6"><circle cx="3" cy="3" r="2.6" fill={C.line} /></marker></defs>
        {/* fills */}
        <circle cx="300" cy="170" r="127" fill={C.body} />
        <path d="M189 106C137 130 137 210 189 234C151 207 151 133 189 106Z" fill={hl("cornea") ? C.hl : C.cornea} />
        {/* retina */}
        <path d="M231 72A120 120 0 1 1 231 268" fill="none" strokeLinecap="round" stroke={hl("retina") ? C.burn : gold} strokeWidth={hl("retina") ? 9 : 5} />
        {/* optic nerve: open at its far end, leaving the eye just below the point of sharpest sight */}
        <path d="M413 188L427 184C462 190 505 200 541 206L535 246C500 238 455 226 418 219L409 216Z" fill={hl("nerve") ? C.hl : C.cornea} />
        {/* one continuous outline: the globe opens into the nerve, the front curve is the cornea */}
        <g fill="none" stroke={line(null)} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M427 184A128 128 0 0 0 189 106C137 130 137 210 189 234A128 128 0 0 0 418 219" />
          <path d="M189 106C151 133 151 207 189 234" strokeWidth="1.4" />
        </g>
        <g fill="none" stroke={line("nerve")} strokeWidth={hl("nerve") ? 2.8 : 2.2} strokeLinecap="round"><path d="M427 184C462 190 505 200 541 206" /><path d="M418 219C455 226 500 238 535 246" /></g>
        {hl("cornea") && <path d="M189 106C137 130 137 210 189 234C151 207 151 133 189 106Z" fill="none" stroke={C.hlDark} strokeWidth="2.6" strokeLinejoin="round" />}
        {hl("surface") && <path d="M197 240C167 224 152 198 150 172" fill="none" stroke={C.burn} strokeWidth="8" strokeLinecap="round" />}
        {/* iris, lens and the threads that hold it */}
        <path d="M193 113L206 149M193 227L206 191" stroke={line(null)} strokeWidth="5" strokeLinecap="round" />
        <path d="M216 137L203 119M216 203L203 221" stroke={line(null)} strokeWidth="1.4" />
        <ellipse cx="216" cy="170" rx="13" ry="33" fill={hl("lens") ? C.hl : C.lens} stroke={hl("lens") ? C.hlDark : line("lens")} strokeWidth={hl("lens") ? 3 : 2} />
        {hl("nerve") && (<><circle cx="192" cy="112" r="7" fill={C.hl} stroke={C.hlDark} strokeWidth="2" /><circle cx="192" cy="228" r="7" fill={C.hl} stroke={C.hlDark} strokeWidth="2" /></>)}
        {/* light: bent by the cornea and lens to one point on the retina */}
        <g stroke={gold} strokeWidth="1.6" strokeDasharray="5 5" fill="none"><path d="M16 138H155L216 150L418 170" /><path d="M16 202H155L216 190L418 170" /></g>
        <circle cx="419" cy="170" r="4" fill={gold} />
        {/* leaders: the dot sits on the part itself */}
        <g stroke={C.line} strokeWidth="1" fill="none">
          <path d="M160 135L94 84" markerStart="url(#dot)" />
          <path d="M198 128L194 46" markerStart="url(#dot)" />
          <path d="M219 192L239 308" markerStart="url(#dot)" />
          <path d="M380 81L414 44" markerStart="url(#dot)" />
          <path d="M492 218L500 264" markerStart="url(#dot)" />
        </g>
        <text x={hl("surface") ? 92 : 86} y="72" textAnchor="middle" className={cls(front)}>{hl("surface") ? L.aSurface : L.aCornea}</text>
        <text x="194" y="32" textAnchor="middle">{L.aIris}</text>
        <text x="240" y="336" textAnchor="middle" className={cls(hl("lens"))}>{L.aLens}</text>
        <text x="412" y="32" textAnchor="start" className={cls(hl("retina"))}>{L.aRetina}</text>
        <text x="552" y="290" textAnchor="end" className={cls(hl("nerve"))}>{L.aNerve}</text>
      </svg>
      {interactive ? (
        <>
          <div className="parts" role="group" aria-label={L.partsAria}>
            {CHIP_TREATMENTS.map((t) => (
              <button key={t.slug} type="button" aria-pressed={part === t.part} onClick={() => pick(t.part)}>{t.chip[lang]}</button>
            ))}
          </div>
          {/* Every note sits in the same grid cell, so the card always has the height of the longest one and never grows. */}
          <div className="info">
            {CHIP_TREATMENTS.map((t) => <p key={t.slug} aria-hidden={part !== t.part}>{t.partNote[lang]} <a href={href(treatmentPath(lang, t))} aria-label={`${L.more}: ${t.name[lang]}`}>{L.more}</a></p>)}
          </div>
        </>
      ) : noteText ? <div className="info one"><p>{noteText}</p></div> : null}
    </figure>
  );
}
