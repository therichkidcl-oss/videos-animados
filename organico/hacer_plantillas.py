# Genera org-plantillas.js desde las plantillas de TikTok Shop: cada escena se centra (X = CX) si no tiene foto y va a la
# derecha (X = XZ) si lleva lamina con foto (s.img). Agrega la plantilla 'venn' y el armador CLASE de este modulo.
import re
from pathlib import Path

R = Path(__file__).resolve().parent
src = (R.parent / "tiktokshop" / "tts-plantillas.js").read_text(encoding="utf-8")
a = src.index("const ESC_TIPOS = {};")
b = src.index("/* ---------- armador de la clase ---------- */")
cuerpo = src[a:b]
# cada plantilla calcula su X / ancho util
cuerpo = re.sub(r"(ESC_TIPOS\.(\w+) = s => \{)", r"\1\n  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;", cuerpo)
cuerpo = cuerpo.replace("ESC_TIPOS.lista = s => escenaPasos(s.t[0], s.t[1], { n: s.n, titulo: s.tit, items: s.items.map(it => [it[0], A(it[1], s.t[0]), it[2]]) });",
                        "ESC_TIPOS.lista = s => escenaPasos(s.t[0], s.t[1], { n: s.n, titulo: s.tit, x: s.img ? XZ : CX, items: s.items.map(it => [it[0], A(it[1], s.t[0]), it[2]]) });")
cuerpo = re.sub(r"\bXZ\b(?! :)", "X", cuerpo).replace("s.img ? X : CX", "s.img ? XZ : CX")
cuerpo = re.sub(r"\bZW\b", "ZX", cuerpo).replace("s.img ? ZX : 1500", "s.img ? ZW : 1500")
# tarjetas junto a una foto: en columna, a lo ancho (icono a la izquierda), para no montarse sobre la lamina
def cambia(a, b):
    global cuerpo
    assert a in cuerpo, "NO ENCONTRADO: " + a[:80]
    cuerpo = cuerpo.replace(a, b, 1)
cambia("W2 = n === 3 ? 318 : n === 1 ? 640 : 470;", "W2 = s.img ? 820 : n === 3 ? 318 : n === 1 ? 640 : 470;")
cambia("`<div class=\"L crd2${c.ok === false ? ' no' : ''}\"", "`<div class=\"L crd2${s.img ? ' h' : ''}${c.ok === false ? ' no' : ''}\"")
cambia("fitW(ct, W2 - 56);", "fitW(ct, W2 - (s.img ? 170 : 56));")
cambia("      if (n === 2) { x = X + (i ? 250 : -250); y = 650; }",
       "      if (s.img) { y = 470 + (3 - n) * 85 + i * 170; }\n      else if (n === 2) { x = X + (i ? 250 : -250); y = 650; }")
cab = src[:a].replace("CURSO TIKTOK SHOP · PLANTILLAS DE ESCENA + armador de clase (19/10/2026). Mismo diseno que el piloto (clase 2).",
                      "MODULO ORGANICO (curso NSFW) · PLANTILLAS (de TikTok Shop) + armador de clase (23/10/2026).")
VENN = r'''
/* venn: { tit, a:{t, s, at}, b:{t, s, at}, centro:{t, at}, ejemplos:[[izq, der, at], ...] } nicho (producto) x publico (cliente) */
ESC_TIPOS.venn = s => {
  const X = s.img ? XZ : CX, P0 = s.t[0], ej = s.ejemplos || [];
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') +
    `<div class="L vn a"><b>${s.a.t}</b><span>${s.a.s}</span></div><div class="L vn b"><b>${s.b.t}</b><span>${s.b.s}</span></div>` +
    `<div class="L vnc">${icon('coins', 64, 2.2)}</div><div class="L vnt">${s.centro.t}</div>` +
    ej.map(x => `<div class="L vej"><span>${x[0]}</span><i>×</i><span>${x[1]}</span></div>`).join(''), (t, { a }) => {
    const [tit, ca, cb, cc, ct, ...es] = e.$;
    fitW(tit, 1500); ent(tit, t, a + .15, X, 190, { s0: .85 });
    const ta = A(s.a.at, P0), tb = A(s.b.at, P0), tc = A(s.centro.at, P0);
    const junta = P(t, tc - .5, .8, E.io3), sep = 150 - 60 * junta;
    ent(ca, t, ta - .3, X - sep, 520, { ease: E.back, s0: .5, dy: 0 });
    ent(cb, t, tb - .3, X + sep, 520, { ease: E.back, s0: .5, dy: 0 });
    ent(cc, t, tc - .2, X, 520, { ease: E.back, s0: .3, dy: 0, pulso: tc + .2 });
    ent(ct, t, tc, X, 790, { dy: 20 });
    es.forEach((el, i) => { const t0 = A(ej[i][2], P0), t1 = i < es.length - 1 ? A(ej[i + 1][2], P0) - .3 : 1e9;
      ent(el, t, t0 - .3, X, 900, { t1, dy: 26 }); });
  });
  sfx(A(s.a.at, P0) - .3, 'pop', { vol: .45 }); sfx(A(s.b.at, P0) - .3, 'pop', { vol: .45 }); sfx(A(s.centro.at, P0) - .2, 'golpe', { vol: .7 });
  ej.forEach(x => sfx(A(x[2], P0) - .3, 'tick', { vol: .4 }));
  return e;
};
css(`
.vn{width:420px;height:420px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;mix-blend-mode:screen}
.vn.a{border:4px solid #ff7a1a;background:radial-gradient(circle,rgba(255,106,26,.22),rgba(255,106,26,.05));box-shadow:0 0 50px rgba(255,106,26,.35)}
.vn.b{border:4px solid #c084fc;background:radial-gradient(circle,rgba(192,132,252,.22),rgba(192,132,252,.05));box-shadow:0 0 50px rgba(192,132,252,.35)}
.vn b{font:400 64px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em}
.vn span{font:600 26px var(--mono);letter-spacing:.14em;color:#e6dfe2;text-transform:uppercase}
.vn.a b,.vn.a span{transform:translateX(-100px)}.vn.b b,.vn.b span{transform:translateX(100px)}
.vnc{display:flex;align-items:center;justify-content:center;width:110px;height:110px;border-radius:50%;color:#ffd36b;background:rgba(20,14,6,.85);
  border:2px solid rgba(255,211,107,.7);box-shadow:0 0 40px rgba(255,200,60,.55)}
.vnt{font:400 46px/1 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#ffd36b;white-space:nowrap;letter-spacing:.02em;text-shadow:0 0 26px rgba(255,200,60,.5)}
.crd2.h{display:grid;grid-template-columns:auto 1fr;column-gap:26px;row-gap:6px;align-items:center;padding:22px 30px}
.crd2.h .neo{grid-row:1/3}
.crd2.h .ct{grid-column:2;align-self:end}
.crd2.h .cs{grid-column:2;align-self:start}
.vej{display:flex;align-items:center;gap:22px;height:70px;padding:0 30px;border-radius:999px;background:rgba(18,14,14,.92);border:1.5px solid rgba(255,255,255,.14);
  font:700 30px var(--sans);color:#fff;white-space:nowrap;box-shadow:0 20px 50px -20px rgba(0,0,0,.9)}
.vej i{font-style:normal;color:#ffd36b;font-size:34px}
`);
'''
CLASE = r'''
/* ---------- armador de la clase: escenas + laminas con fotos (s.img) + malla de fondo + cierre ---------- */
function CLASE(spec) {
  FIN_VOZ = spec.finVoz ?? +(FR[FR.length - 1][1] + .25).toFixed(2);
  (spec.escenas || []).forEach(s => {
    const T = s.t.map(v => v === 'fin' ? FIN_VOZ : v);
    if (!ESC_TIPOS[s.tipo]) { console.error('tipo de escena desconocido: ' + s.tipo); return; }
    const lst = (s.items || []).map(i => i[1]).concat((s.cards || s.nodos || s.tags || s.logos || s.pills || []).map(c => c.at)).filter(v => v != null);
    let prev = -1;
    lst.forEach(v => { const x = A(v, T[0]); if (x < T[0] - .6 || x > T[1] + .6) console.error(`ANCLA fuera de escena [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`);
      if (x < prev - .05) console.error(`ANCLA desordenada en [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`); prev = x; });
    const esc = ESC_TIPOS[s.tipo]({ ...s, t: T });
    if (s.img && esc) lamina(esc, [].concat(s.img), [].concat(s.cap || []));
  });
  window.extra = t => { pintarMalla(t); pintarLaminas(t); };
  const SF = escenaT(FIN_VOZ, CONFIG.dur, H.tit(`Clase ${spec.num}`, 'completada', 'c') +
    (spec.siguiente ? `<div class="L tag3" style="--c:${NEON.o}">${icon('arrowRight', 28, 2.6)}Siguiente: ${spec.siguiente}</div>` : ''), (t, { a }) => {
    const [tit, sig] = SF.$;
    ent(tit, t, a + .55, CX, 470, { s0: .85 });
    if (sig) { fitW(sig, 1500); ent(sig, t, a + 1.05, CX, 700, { ease: E.back, s0: .6, dy: 0 }); }
  });
  sfx(FIN_VOZ + .2, 'golpe', { vol: .7 });
  activarPro(ESCENAS.slice(0, -1).map(e => e.b), { grano: .05 });
}
'''
# anclas y tiempos por numero de frase del guion: 'f12' (inicio de la frase 12) y 'palabra@f12' (buscar desde esa frase)
cab = cab.replace(r"  const m1 = w.match(/@([\d.]+)$/); if (m1) { d = +m1[1]; w = w.slice(0, m1.index); }",
                  r"  const mf = w.match(/@f(\d+)$/); if (mf) { d = FR[+mf[1]][0]; w = w.slice(0, mf.index); }" + "\n" +
                  r"  const m1 = w.match(/@([\d.]+)$/); if (m1) { d = +m1[1]; w = w.slice(0, m1.index); }")
cab = cab.replace("  if (typeof v === 'number') return v;", "  if (typeof v === 'number') return v;\n" +
                  r"  if (/^f\d+$/.test(v)) return FR[+v.slice(1)][0];")
assert "@f(" in cab and "^f" in cab, "no se pudo parchar A()"
CLASE = CLASE.replace("const T = s.t.map(v => v === 'fin' ? FIN_VOZ : v);",
                      r"const T = s.t.map(v => v === 'fin' ? FIN_VOZ : (typeof v === 'string' && /^f\d+$/.test(v)) ? FR[+v.slice(1)][0] - .05 : v);")
(R / "org-plantillas.js").write_text(cab + cuerpo + VENN + CLASE, encoding="utf-8")
print("org-plantillas.js listo")
