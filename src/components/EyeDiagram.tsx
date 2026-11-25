// Labelled cross-section of the eye. On the home page the treatment links highlight the part each treatment concerns;
// on a treatment page it shows that page's part. The drawing and its note are in the static HTML (no JS needed to read them).
import { useState } from "react";
import type { Lang } from "../content/site";
import { UI } from "../content/ui";
import { TREATMENTS, type Part } from "../content/treatments";

const C = { line: "#2F5D4A", gold: "#B8893A", cornea: "#F1EDE2", body: "#FAF6EE", lens: "#F6EBD5", hl: "#E9CB8F", hlDark: "#87621F", burn: "#A8642A" };
const CHIP_TREATMENTS = TREATMENTS.filter((t) => t.slug !== "eye-tests-contact-lenses");

export function EyeDiagram({ lang, start = "lens", interactive = true, compact = false, noteText }: { lang: Lang; start?: Part; interactive?: boolean; compact?: boolean; noteText?: string }) {
  const [part, setPart] = useState<Part>(start);
  const [touched, setTouched] = useState(false);
  const L = UI[lang];
  const note = noteText && !touched ? noteText : TREATMENTS.find((t) => t.part === part)?.partNote[lang];
  const dim = (p: Part | null) => (touched && p !== part ? 0.4 : 1);
  const hl = (p: Part) => part === p;
  const pick = (p: Part) => { setPart(p); setTouched(true); };
  const show = (p: Part) => !compact || start === p;

  return (
    <figure className="card fig">
      <svg className="eye" viewBox={compact ? "120 20 440 310" : "0 0 560 330"} role="img" aria-label={L.eyeAria}>
        <defs><marker id="dot" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6"><circle cx="3" cy="3" r="2.4" fill={C.line} /></marker></defs>
        {!compact && (
          <g stroke={C.gold} strokeWidth="1.6" strokeDasharray="5 5" fill="none" opacity={dim(null)}>
            <path d="M16 128H150L214 150L420 170" /><path d="M16 212H150L214 190L420 170" />
          </g>
        )}
        <circle cx="300" cy="170" r="120" fill={C.body} opacity={dim(null)} />
        <path d="M231 72A120 120 0 1 1 231 268" fill="none" strokeLinecap="round" stroke={hl("retina") ? C.burn : C.gold} strokeWidth={hl("retina") ? 9 : 5} opacity={dim("retina")} />
        <circle cx="300" cy="170" r="128" fill="none" stroke={C.line} strokeWidth="2.2" opacity={dim(null)} />
        <path d="M424 152C462 150 494 146 546 144V198C494 196 462 192 423 190Z" fill={hl("nerve") ? C.hl : C.cornea} stroke={C.line} strokeWidth="2.2" opacity={dim("nerve")} />
        <path d="M186 104C140 132 140 208 186 236" fill={hl("cornea") ? C.hl : C.cornea} stroke={hl("cornea") ? C.hlDark : C.line} strokeWidth={hl("cornea") ? 3 : 2.2} opacity={hl("surface") ? 1 : dim("cornea")} />
        {hl("surface") && <path d="M190 98C132 128 132 212 190 242" fill="none" stroke={C.burn} strokeWidth="7" strokeLinecap="round" />}
        <path d="M184 116L201 151M184 224L201 189" stroke={C.line} strokeWidth="5" strokeLinecap="round" opacity={dim(null)} />
        {hl("nerve") && (<><circle cx="186" cy="118" r="7" fill={C.hl} stroke={C.hlDark} strokeWidth="2" /><circle cx="186" cy="222" r="7" fill={C.hl} stroke={C.hlDark} strokeWidth="2" /></>)}
        <ellipse cx="214" cy="170" rx="13" ry="34" fill={hl("lens") ? C.hl : C.lens} stroke={hl("lens") ? C.hlDark : C.line} strokeWidth={hl("lens") ? 3 : 2} opacity={dim("lens")} />
        <path d="M214 136L204 122M214 204L204 218" stroke={C.line} strokeWidth="1.4" opacity={dim(null)} />
        <circle cx="420" cy="170" r="4" fill={C.gold} />
        {/* Full drawing: every label. Small drawing (treatment pages): only the label of the part that page is about. */}
        <g stroke={C.line} strokeWidth="1" fill="none">
          {!compact && <path d="M150 150L92 82" markerEnd="url(#dot)" />}
          {!compact && <path d="M194 135L194 44" markerEnd="url(#dot)" />}
          {show("lens") && <path d="M214 204L236 292" markerEnd="url(#dot)" />}
          {show("retina") && <path d="M372 70L414 40" markerEnd="url(#dot)" />}
          {show("nerve") && <path d="M500 199L500 266" markerEnd="url(#dot)" />}
          {compact && (start === "cornea" || start === "surface") && <path d="M168 214L176 292" markerEnd="url(#dot)" />}
        </g>
        {!compact && <text x="86" y="70" textAnchor="middle">{L.aCornea}</text>}
        {!compact && <text x="194" y="32" textAnchor="middle">{L.aIris}</text>}
        {show("lens") && <text x="236" y="318" textAnchor="middle">{L.aLens}</text>}
        {show("retina") && <text x="420" y="30" textAnchor={compact ? "middle" : "start"} dx={compact ? 40 : 0}>{L.aRetina}</text>}
        {show("nerve") && <text x="552" y="290" textAnchor="end">{L.aNerve}</text>}
        {compact && start === "cornea" && <text x="176" y="318" textAnchor="start" dx="-40">{L.aCornea}</text>}
        {compact && start === "surface" && <text x="176" y="318" textAnchor="start" dx="-40">{L.aSurface}</text>}
      </svg>
      {interactive && (
        <div className="parts" role="group" aria-label={L.partsAria}>
          {CHIP_TREATMENTS.map((t) => (
            <button key={t.slug} type="button" aria-pressed={part === t.part} onClick={() => pick(t.part)}>{t.chip[lang]}</button>
          ))}
        </div>
      )}
      <p className="info" aria-live="polite">{note}</p>
    </figure>
  );
}
