"""Build the site's font files from @fontsource-variable/anek-gujarati (SIL Open Font License, see src/fonts/OFL.txt).

Why: the variable file draws each Gujarati stem as two overlapping shapes, which show as notches on screen, and its vertical
metrics put text about 2px too high in buttons. This makes fixed weights (400, 600) with the shapes merged and the line box
centred on the capitals. Run once; the results are committed in src/fonts.
  python3 -m venv /tmp/ft && /tmp/ft/bin/pip install fonttools brotli skia-pathops && /tmp/ft/bin/python tools/build-fonts.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/@fontsource-variable/anek-gujarati/files"
OUT = ROOT / "src/fonts"
ASC, DESC = 2140, -900  # 3040 units of line box, centred on the capitals

def build(script, wght):
    f = TTFont(SRC / f"anek-gujarati-{script}-wght-normal.woff2")
    f = instancer.instantiateVariableFont(f, {"wght": wght}, overlap=instancer.OverlapMode.REMOVE)
    f["hhea"].ascent, f["hhea"].descent, f["hhea"].lineGap = ASC, DESC, 0
    o = f["OS/2"]; o.sTypoAscender, o.sTypoDescender, o.sTypoLineGap = ASC, DESC, 0
    o.usWinAscent, o.usWinDescent = max(o.usWinAscent, ASC), max(o.usWinDescent, -DESC); o.fsSelection |= 1 << 7
    f.flavor = "woff2"; return f

for script in ("latin", "gujarati"):
    for w in (400, 600):
        f = build(script, w); p = OUT / f"anek-{script}-{w}.woff2"; f.save(p); print(p.name, p.stat().st_size)
# "ગુજરાતી" for the language switch on English pages
f = build("gujarati", 600); f.flavor = None
opt = subset.Options(); opt.layout_features = ["*"]; opt.flavor = "woff2"
s = subset.Subsetter(opt); s.populate(text="ગુજરાતી"); s.subset(f)
p = OUT / "anek-switch-600.woff2"; f.flavor = "woff2"; f.save(p); print(p.name, p.stat().st_size)
