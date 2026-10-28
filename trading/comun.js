/* =====================================================================
   NOVA PROFIT · SERIE DE TRADING — base comun de los reels (vertical 1080x1920, voz reimo-v3, 26/10/2026)
   - Paleta Nova Profit: obsidiana calida + oro (#d4af37 / #f4c430), velas verde esmeralda y rojo coral.
   - Fondo limpio (negro + halo dorado que respira). Cero emojis, cero B-roll: todo dibujado con codigo.
   - Grafico de velas en canvas: cada fotograma es funcion pura de t (las velas se forman "en vivo").
   - Escenas ancladas a la voz: tw(frase, 'palabra'); el corte entre escenas cae a mitad de la pausa.
   - Zonas seguras de Instagram/TikTok: nada importante arriba de y=250 ni abajo de y=1540; abajo a la derecha
     (x > 940, y > 1100) van los botones de la app.
   ===================================================================== */
const ORO = '212,175,55', ORO2 = '244,196,48', ORO3 = '232,200,122', CREMA = '232,227,216';
const VERDE = '34,211,154', ROJO = '255,77,106', AZUL = '110,168,255', GRIS = '150,142,128';
const W = CONFIG.ancho, H = CONFIG.alto;

css(`
.tt{font-family:'Bebas Neue',sans-serif;font-size:150px;line-height:.92;letter-spacing:.01em;color:#efe9dc;text-align:center;white-space:nowrap}
.tt .ln{display:block}
.tt .w{display:inline-block;margin:0 .09em;will-change:transform}
.tt .oro,.tt .verde,.tt .rojo{display:inline-block}
.tt .oro{padding-top:.16em;margin-top:-.16em}   /* el degradado recortado al texto cubre tambien tildes y la virgulilla de la Ñ */
.fuga{position:absolute;left:-30%;top:-20%;width:160%;height:140%;pointer-events:none;mix-blend-mode:screen;opacity:0;z-index:40;
  background:radial-gradient(ellipse 40% 30% at 50% 50%,rgba(255,214,120,.75),rgba(212,175,55,.28) 45%,rgba(212,175,55,0) 75%)}
.oro{background-image:linear-gradient(180deg,#fff7da 0%,#f8dc80 26%,#e2b93f 52%,#a8801c 74%,#f3d77a 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 26px rgba(244,196,48,.32))}
.tt .verde{color:#3fe0aa;filter:drop-shadow(0 0 22px rgba(34,211,154,.35))}
.tt .rojo{color:#ff6b83;filter:drop-shadow(0 0 22px rgba(255,77,106,.35))}
.ey{font:600 30px 'JetBrains Mono',monospace;letter-spacing:.3em;color:#e8c87a;display:flex;align-items:center;gap:18px;white-space:nowrap}
.ey i{display:block;width:46px;height:2px;background:linear-gradient(90deg,rgba(212,175,55,0),#d4af37)}
.ey i.d{background:linear-gradient(90deg,#d4af37,rgba(212,175,55,0))}
.sr{font:italic 400 70px 'Instrument Serif',serif;color:#efe9dc;white-space:nowrap;letter-spacing:-.005em}
.sr b{font-weight:400;color:#f4c430}
.chn{height:68px;padding:0 30px 0 24px;border-radius:999px;background:rgba(16,12,8,.86);border:1.5px solid rgba(212,175,55,.45);font:600 29px 'JetBrains Mono',monospace;
  color:#efe9dc;display:flex;align-items:center;gap:14px;white-space:nowrap;box-shadow:0 18px 44px -18px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.08)}
.chn b{color:#f4c430;font-weight:700}
.chn.xl{height:86px;padding:0 36px 0 28px;font-size:37px;gap:16px;border-width:2px}
.chn .pt{width:14px;height:14px;border-radius:50%;background:#f4c430;box-shadow:0 0 14px rgba(244,196,48,.8)}
.chn.v{border-color:rgba(34,211,154,.55)} .chn.v .pt{background:#22d39a;box-shadow:0 0 14px rgba(34,211,154,.8)} .chn.v b{color:#3fe0aa}
.chn.r{border-color:rgba(255,77,106,.55)} .chn.r .pt{background:#ff4d6a;box-shadow:0 0 14px rgba(255,77,106,.8)} .chn.r b{color:#ff6b83}
.num{font-family:'Bebas Neue',sans-serif;font-size:220px;line-height:.86;color:#efe9dc;white-space:nowrap;text-align:center}
.num small{font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.2em;color:#e8c87a;display:block;margin-top:14px}
.tarj{width:900px;padding:34px 40px;border-radius:36px;background:linear-gradient(180deg,rgba(24,18,11,.92),rgba(12,9,6,.94));border:1.5px solid rgba(212,175,55,.3);
  box-shadow:0 40px 90px -40px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.07)}
.tarj h3{margin:0;font:400 72px/1 'Bebas Neue',sans-serif;letter-spacing:.01em;color:#efe9dc}
.tarj p{margin:14px 0 0;font:500 34px/1.3 'Inter',sans-serif;color:#cfc6b6}
.tarj p b{color:#f4c430;font-weight:700}
.subt{font:800 60px/1.12 'Inter',sans-serif !important;letter-spacing:-.012em;color:#f5f1e8;text-shadow:0 4px 0 rgba(0,0,0,.65),0 10px 34px rgba(0,0,0,.75)}
.subt span{margin:0 .12em}
.subt span.on{color:#f6c935}
.graf,.vgig{display:block}
.pcard{width:180px;height:292px;border-radius:28px;background:linear-gradient(180deg,rgba(28,21,12,.96),rgba(12,9,6,.96));border:1.5px solid rgba(212,175,55,.32);
  display:flex;flex-direction:column;align-items:center;padding-top:16px;box-shadow:0 30px 60px -30px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.07)}
.pcard b{font:400 46px/1 'Bebas Neue',sans-serif;color:#f4c430;letter-spacing:.02em}
.pcard canvas{display:block;margin-top:8px}
.pcard.on{border-color:rgba(244,196,48,.9);box-shadow:0 0 0 1px rgba(244,196,48,.4),0 0 44px rgba(244,196,48,.3)}
.sino{width:128px;height:128px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid}
.sino.ok{color:#22d39a;border-color:rgba(34,211,154,.85);background:rgba(10,30,22,.9);box-shadow:0 0 44px rgba(34,211,154,.4)}
.sino.no{color:#ff4d6a;border-color:rgba(255,77,106,.85);background:rgba(34,10,14,.9);box-shadow:0 0 44px rgba(255,77,106,.4)}
.nlogo{width:300px;height:300px;filter:drop-shadow(0 18px 40px rgba(0,0,0,.7)) drop-shadow(0 0 40px rgba(244,196,48,.25))}
.nlogo img{width:100%;height:100%;object-fit:contain;display:block}
.aviso{font:500 24px 'JetBrains Mono',monospace;letter-spacing:.05em;color:rgba(232,227,216,.58);white-space:nowrap;text-align:center}
.coment .cab{color:#f4c430 !important}
.coment .av{background:linear-gradient(135deg,#f8dc80,#a8801c) !important;color:#1a1208 !important}
.coment .tx .w{font-family:'Bebas Neue',sans-serif !important;font-weight:400 !important;font-size:104px !important;letter-spacing:.04em !important;color:#f4c430 !important}
.coment .ok span{background:#f4c430 !important;color:#1a1208 !important}
`);

/* ---------- tiempo: frases de la voz (FR = [inicio, fin] de cada frase; PALS = [frase, palabra, inicio]) ---------- */
const NF = FR.length, SAL = .28;
const CORTE = i => (FR[i][1] + FR[i + 1][0]) / 2;
const XC = i => i < 0 ? 0 : i >= NF - 1 ? CONFIG.dur + 1 : CORTE(i);          // fin del tramo de la frase i
const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9-]/g, '');
function tw(f, p, k = 1) {                                                   // cuando la voz dice esa palabra (k-esima vez)
  const n = nrm(p); let c = 0;
  for (const x of PALS) if (x[0] === f && x[1] === n && ++c === k) return x[2];
  console.error('No encuentro «' + p + '» en la frase ' + f); return FR[f] ? FR[f][0] : 0;
}
const ini = f => FR[f][0], finF = f => FR[f][1];
const en = (t, a, b) => t >= a && t < b;
const ocultar = (...els) => els.flat().forEach(e => e && off(e));
const flota = (t, i = 0, a = 5) => a * Math.sin(t * 1.1 + i * 1.9);

/* generador determinista (las mismas velas en cada fotograma y en cada render) */
function rng(s = 7) { return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const fmt = (p, d = 2) => p.toFixed(d);

/* ---------- entrada/salida de una pieza dentro de su escena ---------- */
function ent(el, t, t0, x, y, o = {}) {
  const p = P(t, t0, o.dur ?? .5, o.ease ?? E.out4), q = o.t1 != null ? P(t, o.t1, .3, E.in3) : 0;
  if (p <= 0 || q >= 1) { off(el); return 0; }
  put(el, { x: x + (1 - p) * (o.dx ?? 0), y: y + (1 - p) * (o.dy ?? 40), s: lerp(o.s0 ?? .92, 1, p) * (o.s ?? 1) * (1 + (o.pulso != null ? .05 * bump(t, o.pulso, .32) : 0)),
    r: (o.r ?? 0), ax: o.ax, ay: o.ay, o: clamp(p * 1.8) * (1 - q) * (o.o ?? 1), b: (1 - p) * (o.bl ?? 10) + q * 6 });
  return p;
}
const brote = (el, t, t0, x, y, o = {}) => ent(el, t, t0, x, y, { dur: .5, ease: E.back, dy: 0, s0: .5, bl: 6, ...o });

/* titulo Bebas Neue palabra a palabra: lineas = ['LA VELA', '*JAPONESA*'] (*...* = oro, +...+ = verde, ~...~ = rojo) */
function titulo(lineas, cls = '', tam = 150) {
  const CL = { '*': 'oro', '+': 'verde', '~': 'rojo' };
  const w = s => {
    const m = s.match(/^([¿¡]?)([*+~])(.+)\2([?!.,:]*)$/);                  // ¿*TRADING*? -> signos fuera del color
    return m ? `<span class="w">${m[1]}<span class="${CL[m[2]]}">${m[3]}</span>${m[4]}</span>` : `<span class="w">${s}</span>`;
  };
  return `<div class="L tt ${cls}" style="font-size:${tam}px">${lineas.map(l => `<span class="ln">${l.split(' ').map(w).join(' ')}</span>`).join('')}</div>`;
}
/* maqueta vertical comun: eyebrow, titulo (2 lineas), grafico, subtitulos (zona segura de Reels/TikTok) */
const LAY = { ey: 262, tit: 440, graf: 1000, grafH: 790, sub: 1480 };
/* revela las palabras de un titulo: tiempos = [t de cada palabra] o un numero (todas escalonadas desde ahi) */
function palabras(el, t, tiempos, o = {}) {
  const ws = el._ws || (el._ws = [...el.querySelectorAll('.w')]);
  ws.forEach((w, i) => {
    const t0 = Array.isArray(tiempos) ? (tiempos[i] ?? tiempos[tiempos.length - 1] + (i - tiempos.length + 1) * .12) : tiempos + i * (o.paso ?? .1);
    const p = P(t, t0 - .04, o.dur ?? .45, E.out4);
    w.style.opacity = clamp(p * 1.6).toFixed(3);
    w.style.transform = `translateY(${((1 - p) * (o.dy ?? 46)).toFixed(1)}px) scale(${lerp(o.s0 ?? 1.12, 1, p).toFixed(3)})`;
    w.style.filter = p < 1 ? `blur(${((1 - p) * 10).toFixed(2)}px)` : (w.classList.contains('oro') ? '' : 'none');
  });
}
/* golpe de luz y escala en las palabras de color del titulo (oro/verde/rojo) cuando la voz las dice */
function acento(el, t, ts) {
  const ws = el._ac || (el._ac = [...el.querySelectorAll('.oro,.verde,.rojo')]), L = Array.isArray(ts) ? ts : [ts];
  ws.forEach((w, i) => {
    const b = bump(t, L[Math.min(i, L.length - 1)] - .06, .5);
    w.style.transform = `scale(${(1 + .1 * b).toFixed(3)})`;
    w.style.filter = b > .01 ? `brightness(${(1 + .45 * b).toFixed(3)}) drop-shadow(0 0 ${(34 * b).toFixed(1)}px rgba(244,196,48,.55))` : '';
  });
}
/* titulo de escena: entra entero al empezar (palabra por palabra en 0,3 s) y su palabra de color golpea en tAcento */
function titular(el, t, a, tAcento = null, y = LAY.tit) {
  ent(el, t, a - .02, CX, y, { dy: 0, s0: 1, dur: .3, bl: 0 });
  palabras(el, t, a, { paso: .07, dur: .38 });
  if (tAcento != null) acento(el, t, tAcento);
}
/* tarjeta numerada con un patron de velas dibujado (estatico): para listas ("estas son cinco...") */
function tarjetaPatron(n, velas, w = 150, h = 200) {
  const el = mk('div', 'L pcard', null, `<b>${String(n).padStart(2, '0')}</b>`);
  const c = document.createElement('canvas'); c.width = w; c.height = h; el.appendChild(c);
  const x = c.getContext('2d');
  let lo = 1e9, hi = -1e9; for (const v of velas) { lo = Math.min(lo, v[2]); hi = Math.max(hi, v[1]); }
  const pad = (hi - lo) * .12, Y = p => 10 + (hi + pad - p) / (hi - lo + 2 * pad) * (h - 20), slot = w / velas.length;
  velas.forEach((v, i) => velaCanvas(x, slot * (i + .5), Math.min(46, slot * .55), Y(v[0]), Y(v[3]), Y(v[1]), Y(v[2]), v[3] >= v[0], 1, .5));
  return el;
}
const sino = ok => `<div class="L sino z7 ${ok ? 'ok' : 'no'}">${icon(ok ? 'check' : 'x', 70, 3)}</div>`;
const eyebrow = (txt) => `<div class="L ey"><i></i>${txt}<i class="d"></i></div>`;
const chip = (txt, cls = '') => `<div class="L chn ${cls}"><span class="pt"></span>${txt}</div>`;

/* ---------- escenas: cada una cubre las frases f0..f1 y sale entera antes del corte ---------- */
const ESCENAS = [];
function escenaT(a, b, html, pintar = () => {}, o = {}) {
  const el = mk('div', 'L esc z5', WORLDF, html);
  el.style.width = W + 'px'; el.style.height = H + 'px';
  const e = { a, b, el, pintar, sinEntrada: !!o.sinEntrada };
  e.q = s => el.querySelector(s); e.qa = s => [...el.querySelectorAll(s)];
  e.$ = [...el.children];
  ESCENAS.push(e);
  if (!o.mudo) sfx(a + .03, 'aire', { vol: .45 });
  return e;
}
const escena = (f0, f1, html, pintar, o) => escenaT(XC(f0 - 1), XC(f1), html, pintar, o);
function pintarEscenas(t) {
  for (const e of ESCENAS) {
    if (!en(t, e.a, e.b)) { if (e._on !== false) { off(e.el); e._on = false; } continue; }
    e._on = true;
    const p = e.sinEntrada ? 1 : P(t, e.a, .4, E.out3), q = P(t, e.b - SAL - .02, SAL, E.in3);
    put(e.el, { x: CX, y: CY + (1 - p) * 50 - q * 60, s: lerp(.975, 1, p) * (1 + .04 * q), o: clamp(p * 2.2) * (1 - q), b: (1 - p) * 8 + q * 12 });
    e.pintar(t, { p, q, a: e.a, b: e.b });
  }
}

/* =====================================================================
   VELAS: datos y formacion "en vivo"
   ===================================================================== */
/* serie de velas desde una lista de pasos:
   { mover: n, hasta: precio, vol: ruido (0..1 del paso), mecha: tamano de mechas } -> n velas de tendencia
   { vela: [o, h, l, c] } o { velas: [[o,h,l,c], ...] } -> velas exactas (patrones)
   { rel: [dO, dH, dL, dC] } -> vela relativa al cierre anterior */
function serie(pasos, semilla = 11, p0 = 100) {
  const r = rng(semilla), out = [];
  let p = p0;
  for (const s of pasos) {
    if (s.desde != null) p = s.desde;
    if (s.vela) { out.push(s.vela.slice()); p = s.vela[3]; continue; }
    if (s.velas) { for (const v of s.velas) out.push(v.slice()); p = s.velas[s.velas.length - 1][3]; continue; }
    if (s.rel) { const [a, b, c, d] = s.rel; out.push([p + a, p + b, p + c, p + d]); p = p + d; continue; }
    const n = s.mover, inicio = p, paso = (s.hasta - inicio) / n, vol = s.vol ?? .9, mecha = s.mecha ?? Math.abs(paso) * .6 + .15;
    const lim = Math.abs(paso) * 1.9 + .2, cs = [];
    for (let k = 0; k < n; k++) {
      let c = inicio + paso * (k + 1) + (r() - .5) * 2 * vol * Math.max(Math.abs(paso), .25);
      // de vez en cuando una vela contra la tendencia (se ve real)
      if (s.contra && r() < s.contra && k < n - 2) c = (k ? cs[k - 1] : inicio) - paso * (.4 + r() * .5);
      cs.push(c);
    }
    cs[n - 1] = s.hasta;
    // ningun cuerpo mas grande que ~2 pasos: se acota hacia adelante y hacia atras (la ultima vela llega a "hasta" sin saltar)
    for (let pasada = 0; pasada < 2; pasada++) {
      for (let k = 0; k < n - 1; k++) { const prev = k ? cs[k - 1] : inicio; cs[k] = clamp(cs[k], prev - lim, prev + lim); }
      for (let k = n - 2; k >= 0; k--) cs[k] = clamp(cs[k], cs[k + 1] - lim, cs[k + 1] + lim);
    }
    for (let k = 0; k < n; k++) {
      const o = p, c = cs[k];
      const h = Math.max(o, c) + r() * mecha, l = Math.min(o, c) - r() * mecha;
      out.push([o, h, l, c]); p = c;
    }
  }
  return out;
}
/* ondas: serie que pasa por estos giros [[n velas, precio destino], ...]; devuelve { V, giros: [[indice, precio], ...] }
   (el indice/precio de cada giro sale de la mecha real: maximo en los techos, minimo en los pisos) */
function ondas(desde, tramos, semilla = 11, vol = .55) {
  const V = serie([{ desde, mover: tramos[0][0], hasta: tramos[0][1], vol }, ...tramos.slice(1).map(([n, h]) => ({ mover: n, hasta: h, vol, contra: .15 }))], semilla);
  const giros = [[0, V[0][0]]]; let i = 0, prev = desde;
  for (const [n, h] of tramos) {
    i += n; const sube = h > prev;
    giros.push(extremo(V, Math.max(0, i - 2), Math.min(V.length - 1, i + 1), sube ? 'max' : 'min')); prev = h;
  }
  return { V, giros };
}
/* indice y precio del maximo (o minimo) de las velas i0..i1 */
function extremo(V, i0, i1, tipo = 'max') {
  let k = i0, p = tipo === 'max' ? -1e9 : 1e9;
  for (let i = i0; i <= i1; i++) { const v = V[i]; if (!v) continue; if (tipo === 'max' ? v[1] > p : v[2] < p) { p = tipo === 'max' ? v[1] : v[2]; k = i; } }
  return [k, p];
}
/* precio de una vela mientras se forma: f 0..1 -> { p: precio actual, hi, lo: extremos alcanzados }.
   Recorre apertura -> extremo contrario -> extremo a favor -> cierre (como se forma una vela de verdad). */
function caminoVela(v, f, temblor = .05) {
  const [o, h, l, c] = v;
  if (f >= 1) return { p: c, hi: h, lo: l };
  const pts = c >= o ? [o, l, h, c] : [o, h, l, c];
  const L = [Math.abs(pts[1] - pts[0]), Math.abs(pts[2] - pts[1]), Math.abs(pts[3] - pts[2])];
  let d = clamp(f) * (L[0] + L[1] + L[2] || 1), p = o, hi = o, lo = o;
  for (let k = 0; k < 3; k++) {
    const a = pts[k], b = pts[k + 1];
    if (d >= L[k]) { p = b; d -= L[k]; } else { p = a + (b - a) * (L[k] ? d / L[k] : 1); hi = Math.max(hi, p); lo = Math.min(lo, p); break; }
    hi = Math.max(hi, p); lo = Math.min(lo, p);
  }
  const tb = (h - l) * temblor * Math.sin(f * 37) * Math.sin(f * Math.PI);
  p = clamp(p + tb, lo, hi);
  return { p, hi, lo };
}

/* =====================================================================
   GRAFICO DE VELAS (canvas). Se crea una vez y se pinta en cada fotograma:
     const G = new Grafico({ velas, w, h });
     G.vista = norm([[t, { i0, i1, pmin, pmax }], ...])   ventana visible (indices de vela y precios); pmin/pmax null = auto
     G.rev = [[t0, n0], [t1, n1], ...]                    cuantas velas hay formadas (lineal entre puntos; la ultima se forma)
     G.zona({...}), G.linea({...}), G.marca({...}) ...    dibujos sobre el grafico (cada uno con su t0 / t1)
     G.foco(i0, i1, t0, t1)                               resalta esas velas y apaga las demas
     G.pintar(t, { x, y, s, o })
   ===================================================================== */
class Grafico {
  constructor(o = {}) {
    this.o = { velas: [], w: 960, h: 820, eje: 124, cab: 78, padre: WORLD, z: 'z3', dec: 2, marco: true, tf: 'H1', titulo: 'GRÁFICO DE VELAS',
      precioVivo: true, rejilla: true, ...o };
    const O = this.o;
    this.c = mk('canvas', 'L graf ' + O.z, O.padre);
    this.c.width = O.w; this.c.height = O.h;
    this.x = this.c.getContext('2d');
    this.V = O.velas;
    this.vista = norm([[0, { i0: -.5, i1: 30, pmin: null, pmax: null }]]);
    this.rev = [[0, this.V.length]];
    this.ov = []; this.focos = [];
    this.area = { x0: 26, y0: O.marco ? O.cab : 20, x1: O.w - O.eje, y1: O.h - 26 };
  }
  nVelas(t) {                                                          // velas formadas en t (decimal: la ultima a medias)
    const R = this.rev;
    if (t <= R[0][0]) return R[0][1];
    for (let k = 1; k < R.length; k++) if (t < R[k][0]) return lerp(R[k - 1][1], R[k][1], (t - R[k - 1][0]) / (R[k][0] - R[k - 1][0]));
    return R[R.length - 1][1];
  }
  estadoVela(i, n) {                                                   // { o, p, hi, lo, f } de la vela i con n velas formadas
    const v = this.V[i];
    if (!v || i >= n) return null;
    const f = clamp(n - i);
    const c = caminoVela(v, f);
    return { o: v[0], p: c.p, hi: c.hi, lo: c.lo, f };
  }
  rangoAuto(t, i0, i1) {
    const n = this.nVelas(t);
    let lo = 1e9, hi = -1e9;
    for (let i = Math.max(0, Math.floor(i0)); i <= Math.min(this.V.length - 1, Math.ceil(i1)); i++) {
      const e = this.estadoVela(i, n); if (!e) continue;
      lo = Math.min(lo, e.lo); hi = Math.max(hi, e.hi);
    }
    if (lo > hi) { const v = this.V[0]; lo = v[2]; hi = v[1]; }
    const pad = (hi - lo) * .14 + 1e-6;
    return [lo - pad, hi + pad];
  }
  ventana(t) {
    const k = KF(t, this.vista);
    let { i0, i1, pmin, pmax } = k;
    if (this.o.seguir) { const n = this.nVelas(t), w = i1 - i0; const fin = Math.max(i1, n + (this.o.margen ?? 2.5)); i1 = fin; i0 = fin - w; }
    if (pmin == null || pmax == null || this.o.auto) {
      // rango automatico suavizado: promedio de los rangos de los ultimos 0,5 s (sigue siendo funcion pura de t)
      let a = 0, b = 0, m = 6;
      for (let j = 0; j < m; j++) { const r = this.rangoAuto(t - j * .09, i0, i1); a += r[0]; b += r[1]; }
      const ra = [a / m, b / m];
      if (pmin == null || this.o.auto) pmin = ra[0];
      if (pmax == null || this.o.auto) pmax = ra[1];
    }
    return { i0, i1, pmin, pmax };
  }
  X(i) { const A = this.area, v = this.v; return A.x0 + (i - v.i0) / (v.i1 - v.i0) * (A.x1 - A.x0); }
  Y(p) { const A = this.area, v = this.v; return A.y0 + (v.pmax - p) / (v.pmax - v.pmin) * (A.y1 - A.y0); }
  /* posicion en el escenario (para colgar piezas DOM sobre el grafico): requiere el put del ultimo pintar */
  aEscena(i, p) { const k = this.k || { x: CX, y: CY, s: 1 }; return { x: k.x + (this.X(i) - this.o.w / 2) * (k.s ?? 1), y: k.y + (this.Y(p) - this.o.h / 2) * (k.s ?? 1) }; }

  /* ---- dibujos (todos aceptan t0, t1 = salida, dur) ---- */
  add(o) { this.ov.push({ dur: .6, ...o }); return this; }
  zona(o) { return this.add({ tipo: 'zona', atras: true, rgb: ORO, ...o }); }          // {p0, p1, i0, i1|'fin', etiqueta, lado}
  linea(o) { return this.add({ tipo: 'linea', atras: true, rgb: ORO, ...o }); }        // {p, i0, i1, dash, etiqueta}
  segmento(o) { return this.add({ tipo: 'seg', rgb: ORO, ...o }); }                   // {i0, p0, i1, p1, ext}
  marca(o) { return this.add({ tipo: 'marca', rgb: ORO, ...o }); }                    // {i, p, texto, lado: 1 arriba / -1 abajo}
  flecha(o) { return this.add({ tipo: 'flecha', rgb: VERDE, ...o }); }               // {i, p, dir: 1 sube / -1 baja, largo}
  caja(o) { return this.add({ tipo: 'caja', rgb: ORO, ...o }); }                      // {i0, i1, p0?, p1?, etiqueta}
  zigzag(o) { return this.add({ tipo: 'zig', rgb: ORO, ...o }); }                     // {pts: [[i, p], ...], t1Dibujo}
  fibo(o) { return this.add({ tipo: 'fibo', atras: true, rgb: ORO, ...o }); }         // {iA, pA, iB, pB, niveles, zona}
  posicion(o) { return this.add({ tipo: 'pos', atras: true, ...o }); }                // {i0, i1, entrada, sl, tp, ratio}
  texto(o) { return this.add({ tipo: 'texto', rgb: CREMA, ...o }); }                  // {i, p, texto, tam}
  liquidez(o) { return this.add({ tipo: 'liq', rgb: ORO2, ...o }); }                  // {p, i0, i1, texto}
  foco(i0, i1, t0, t1 = 1e9, o = {}) { this.focos.push({ i0, i1, t0, t1, ...o }); return this; }

  alfaVela(t, i) {
    let a = 1;
    for (const f of this.focos) {
      const p = P(t, f.t0, .45, E.out3) * (1 - P(t, f.t1, .45, E.in3));
      if (p <= 0) continue;
      if (i < f.i0 || i > f.i1) a = Math.min(a, 1 - (1 - (f.min ?? .22)) * p);
    }
    return a;
  }
  brilloVela(t, i) {
    let g = 0;
    for (const f of this.focos) if (i >= f.i0 && i <= f.i1) g = Math.max(g, P(t, f.t0, .45, E.out3) * (1 - P(t, f.t1, .45, E.in3)));
    return g;
  }

  pintar(t, k = {}) {
    const O = this.o, x = this.x, Wc = O.w, Hc = O.h, A = this.area;
    this.k = { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1 };
    if ((k.o ?? 1) <= .002) { off(this.c); return; }
    this.v = this.ventana(t);
    const v = this.v, n = this.nVelas(t);
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, Wc, Hc);
    // marco (panel oscuro con filo dorado)
    if (O.marco) {
      const g = x.createLinearGradient(0, 0, 0, Hc);
      g.addColorStop(0, 'rgba(22,17,11,.88)'); g.addColorStop(1, 'rgba(10,8,5,.92)');
      x.fillStyle = g; rr(x, 1, 1, Wc - 2, Hc - 2, 34); x.fill();
      x.strokeStyle = 'rgba(212,175,55,.26)'; x.lineWidth = 1.5; rr(x, 1, 1, Wc - 2, Hc - 2, 34); x.stroke();
      // cabecera: punto en vivo + titulo + temporalidad
      const vivo = .55 + .45 * Math.sin(t * 5);
      x.fillStyle = `rgba(${ROJO},${(.5 + .5 * vivo).toFixed(3)})`; x.beginPath(); x.arc(44, 40, 7, 0, 6.2832); x.fill();
      x.fillStyle = `rgba(${ROJO},${(.18 * vivo).toFixed(3)})`; x.beginPath(); x.arc(44, 40, 15, 0, 6.2832); x.fill();
      x.font = "600 22px 'JetBrains Mono'"; x.textBaseline = 'middle'; x.textAlign = 'left';
      x.fillStyle = 'rgba(232,227,216,.78)'; x.fillText('EN VIVO', 62, 41);
      x.fillStyle = 'rgba(232,200,122,.85)'; x.fillText(O.titulo, 182, 41);
      x.textAlign = 'right'; x.fillStyle = 'rgba(232,227,216,.55)';
      rr(x, Wc - 96, 22, 70, 38, 12); x.strokeStyle = 'rgba(232,227,216,.2)'; x.lineWidth = 1.2; x.stroke();
      x.textAlign = 'center'; x.fillStyle = 'rgba(232,227,216,.8)'; x.fillText(O.tf, Wc - 61, 42);
      x.strokeStyle = 'rgba(232,227,216,.07)'; x.beginPath(); x.moveTo(20, O.cab - 10); x.lineTo(Wc - 20, O.cab - 10); x.stroke();
    }
    // rejilla y eje de precios
    if (O.rejilla) {
      const paso = pasoBonito((v.pmax - v.pmin) / 6);
      x.font = "500 21px 'JetBrains Mono'"; x.textAlign = 'left'; x.textBaseline = 'middle';
      for (let p = Math.ceil(v.pmin / paso) * paso; p <= v.pmax; p += paso) {
        const y = this.Y(p);
        if (y < A.y0 + 6 || y > A.y1 - 6) continue;
        x.strokeStyle = 'rgba(232,227,216,.055)'; x.lineWidth = 1; x.beginPath(); x.moveTo(A.x0, y); x.lineTo(A.x1, y); x.stroke();
        x.fillStyle = 'rgba(232,227,216,.4)'; x.fillText(fmt(p, O.dec), A.x1 + 16, y);
      }
    }
    x.save(); x.beginPath(); x.rect(A.x0 - 4, A.y0, A.x1 - A.x0 + 8, A.y1 - A.y0); x.clip();
    this._diferidas = [];
    for (const d of this.ov) if (d.atras) this.dibujo(t, d);
    // velas
    const slot = (A.x1 - A.x0) / (v.i1 - v.i0), bw = Math.max(3, slot * (O.anchoVela ?? .62));
    const iA = Math.max(0, Math.floor(v.i0 - 1)), iB = Math.min(this.V.length - 1, Math.ceil(v.i1 + 1));
    let ultima = null;
    for (let i = iA; i <= iB; i++) {
      const e = this.estadoVela(i, n); if (!e) continue;
      const a = this.alfaVela(t, i), g = this.brilloVela(t, i), viva = e.f < 1;
      velaCanvas(x, this.X(i), bw, this.Y(e.o), this.Y(e.p), this.Y(e.hi), this.Y(e.lo), e.p >= e.o, a, (viva ? .9 : 0) + g, O.relleno);
      ultima = e;
    }
    for (const [al, fn] of this._diferidas) { x.save(); x.globalAlpha = al; fn(); x.restore(); }
    this._diferidas = null;
    for (const d of this.ov) if (!d.atras) this.dibujo(t, d);
    x.restore();
    // precio en vivo: linea punteada + etiqueta en el eje
    if (O.precioVivo && ultima) {
      const y = this.Y(ultima.p), sube = ultima.p >= ultima.o, rgb = sube ? VERDE : ROJO;
      x.setLineDash([6, 7]); x.strokeStyle = `rgba(${rgb},.55)`; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(A.x0, y); x.lineTo(A.x1, y); x.stroke(); x.setLineDash([]);
      x.fillStyle = `rgb(${rgb})`; rr(x, A.x1 + 6, y - 19, O.eje - 14, 38, 9); x.fill();
      x.font = "700 21px 'JetBrains Mono'"; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillStyle = '#0b0805'; x.fillText(fmt(ultima.p, O.dec), A.x1 + 6 + (O.eje - 14) / 2, y + 1);
    }
    put(this.c, { x: this.k.x, y: this.k.y, s: this.k.s, o: k.o ?? 1, b: k.b ?? 0, rx: k.rx, ry: k.ry });
  }

  dibujo(t, d) {
    const p = P(t, d.t0, d.dur, d.ease ?? E.out3), q = d.t1 != null ? P(t, d.t1, .4, E.in3) : 0, al = p * (1 - q);
    if (al <= .002) return;
    const x = this.x, A = this.area, rgb = d.rgb;
    const Xi = i => i === 'fin' ? A.x1 : i === 'ini' ? A.x0 : this.X(i);
    // las etiquetas de los dibujos de fondo esperan a que esten las velas (asi no quedan debajo)
    const pildora = (...a) => this._diferidas ? this._diferidas.push([al, () => pildoraCanvas(...a)]) : pildoraCanvas(...a);
    x.save(); x.globalAlpha = al;
    if (d.tipo === 'zona') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.15)));
      const ya = this.Y(d.p1), yb = this.Y(d.p0);
      const g = x.createLinearGradient(0, ya, 0, yb);
      g.addColorStop(0, `rgba(${rgb},.26)`); g.addColorStop(.5, `rgba(${rgb},.12)`); g.addColorStop(1, `rgba(${rgb},.26)`);
      x.fillStyle = g; x.fillRect(xa, ya, xb - xa, yb - ya);
      x.strokeStyle = `rgba(${rgb},.75)`; x.lineWidth = 2;
      x.beginPath(); x.moveTo(xa, ya); x.lineTo(xb, ya); x.moveTo(xa, yb); x.lineTo(xb, yb); x.stroke();
      if (d.etiqueta) pildora(x, d.lado === 'der' ? xb - 14 : xa + 14, (ya + yb) / 2, d.etiqueta, rgb, d.lado === 'der' ? 'der' : 'izq', clamp(p * 1.5), d.tam);
    } else if (d.tipo === 'linea') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.1))), y = this.Y(d.p);
      x.strokeStyle = `rgba(${rgb},.9)`; x.lineWidth = d.ancho ?? 2.5; if (d.dash) x.setLineDash(d.dash);
      x.shadowColor = `rgba(${rgb},.6)`; x.shadowBlur = 10;
      x.beginPath(); x.moveTo(xa, y); x.lineTo(xb, y); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      if (d.etiqueta) pildora(x, d.lado === 'izq' ? xa + 14 : xb - 14, y + (d.dy ?? -30), d.etiqueta, rgb, d.lado === 'izq' ? 'izq' : 'der', clamp(p * 1.5), d.tam);
    } else if (d.tipo === 'seg') {
      const xa = this.X(d.i0), ya = this.Y(d.p0);
      let xb = this.X(d.i1), yb = this.Y(d.p1);
      if (d.ext) { const xe = this.X(d.i1 + d.ext), ye = this.Y(d.p1 + (d.p1 - d.p0) / (d.i1 - d.i0) * d.ext); xb = xe; yb = ye; }
      const k = E.io3(clamp(p * 1.05));
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = d.ancho ?? 3; if (d.dash) x.setLineDash(d.dash);
      x.shadowColor = `rgba(${rgb},.7)`; x.shadowBlur = 12;
      x.beginPath(); x.moveTo(xa, ya); x.lineTo(lerp(xa, xb, k), lerp(ya, yb, k)); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      if (d.puntos !== false) for (const [px, py] of [[xa, ya]]) { x.fillStyle = `rgb(${rgb})`; x.beginPath(); x.arc(px, py, 6, 0, 6.2832); x.fill(); }
      if (d.etiqueta && k > .6) pildora(x, Math.min(lerp(xa, xb, k), A.x1 - 8), lerp(ya, yb, k) + (d.dy ?? -30), d.etiqueta, rgb, 'der', clamp((k - .6) * 3), d.tam);
    } else if (d.tipo === 'marca') {
      const px = this.X(d.i), py = this.Y(d.p), lado = d.lado ?? 1, pb = E.back(clamp(p));
      x.fillStyle = `rgb(${rgb})`; x.shadowColor = `rgba(${rgb},.9)`; x.shadowBlur = 14;
      x.beginPath(); x.arc(px, py, 7 * pb, 0, 6.2832); x.fill(); x.shadowBlur = 0;
      pildora(x, px, py - lado * (d.sep ?? 48), d.texto, rgb, 'centro', clamp(p * 1.4), d.tam ?? 26, pb, d.solida);
    } else if (d.tipo === 'flecha') {
      // dir 1 = flecha alcista: nace debajo del precio y apunta hacia arriba; dir -1 = bajista, encima apuntando abajo
      const px = this.X(d.i), py = this.Y(d.p), dir = d.dir ?? 1, L = (d.largo ?? 110) * E.out3(clamp(p * 1.2));
      const punta = py + dir * (d.sep ?? 24), base = punta + dir * 28;
      x.strokeStyle = `rgb(${rgb})`; x.fillStyle = `rgb(${rgb})`; x.lineWidth = 7; x.lineCap = 'round';
      x.shadowColor = `rgba(${rgb},.8)`; x.shadowBlur = 16;
      x.beginPath(); x.moveTo(px, base + dir * L); x.lineTo(px, base - dir * 4); x.stroke();
      x.beginPath(); x.moveTo(px, punta); x.lineTo(px - 18, base); x.lineTo(px + 18, base); x.closePath(); x.fill();
      x.shadowBlur = 0; x.lineCap = 'butt';
    } else if (d.tipo === 'caja') {
      const xa = this.X(d.i0) - (d.pad ?? 26), xb = this.X(d.i1) + (d.pad ?? 26);
      let p0 = d.p0, p1 = d.p1;
      if (p0 == null || p1 == null) { p0 = 1e9; p1 = -1e9; for (let i = d.i0; i <= d.i1; i++) { const v = this.V[i]; if (v) { p0 = Math.min(p0, v[2]); p1 = Math.max(p1, v[1]); } } }
      const ya = this.Y(p1) - 22, yb = this.Y(p0) + 22, pb = E.back(clamp(p));
      const cx0 = (xa + xb) / 2, cy0 = (ya + yb) / 2, sw = (xb - xa) * lerp(1.25, 1, pb), sh = (yb - ya) * lerp(1.25, 1, pb);
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = 3; x.setLineDash(d.dash || []);
      x.shadowColor = `rgba(${rgb},.75)`; x.shadowBlur = 18;
      rr(x, cx0 - sw / 2, cy0 - sh / 2, sw, sh, 18); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      x.fillStyle = `rgba(${rgb},.07)`; rr(x, cx0 - sw / 2, cy0 - sh / 2, sw, sh, 18); x.fill();
      if (d.etiqueta) pildora(x, cx0, d.abajo ? cy0 + sh / 2 + 34 : cy0 - sh / 2 - 34, d.etiqueta, rgb, 'centro', clamp(p * 1.4), d.tam ?? 28, 1, true);
    } else if (d.tipo === 'zig') {
      const pts = d.pts.map(([i, pp]) => [this.X(i), this.Y(pp)]);
      const tot = pts.reduce((s, c, j) => j ? s + Math.hypot(c[0] - pts[j - 1][0], c[1] - pts[j - 1][1]) : 0, 0);
      const k = d.t1Dibujo != null ? clamp((t - d.t0) / (d.t1Dibujo - d.t0)) : E.io3(clamp(p));
      let rest = tot * k;
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = d.ancho ?? 4; x.lineJoin = 'round';
      x.shadowColor = `rgba(${rgb},.7)`; x.shadowBlur = 14;
      x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
      for (let j = 1; j < pts.length && rest > 0; j++) {
        const L = Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]), f = Math.min(1, rest / L);
        x.lineTo(lerp(pts[j - 1][0], pts[j][0], f), lerp(pts[j - 1][1], pts[j][1], f)); rest -= L;
      }
      x.stroke(); x.shadowBlur = 0;
    } else if (d.tipo === 'fibo') {
      const niv = d.niveles ?? [0, .382, .5, .618, 1], xa = this.X(d.iA), xb = Xi(d.i1 ?? 'fin');
      const nivelP = r => d.pB - (d.pB - d.pA) * r;      // 0 = extremo B (maximo del impulso), 1 = extremo A
      if (d.zona) {
        const ya = this.Y(nivelP(d.zona[0])), yb = this.Y(nivelP(d.zona[1])), pz = P(t, d.tZona ?? d.t0, .6, E.out3);
        const g = x.createLinearGradient(0, ya, 0, yb);
        g.addColorStop(0, `rgba(${ORO2},${(.30 * pz).toFixed(3)})`); g.addColorStop(1, `rgba(${ORO},${(.16 * pz).toFixed(3)})`);
        x.fillStyle = g; x.fillRect(xa, ya, (xb - xa) * pz, yb - ya);
        if (d.etiquetaZona && pz > .2) pildora(x, xa + 16, (ya + yb) / 2, d.etiquetaZona, ORO2, 'izq', clamp((pz - .2) * 2), 26, 1, true);
      }
      niv.forEach((r, j) => {
        const pj = P(t, d.tiempos ? d.tiempos[j] : d.t0 + j * (d.paso ?? .12), .5, E.out3), y = this.Y(nivelP(r));   // tiempos: uno por nivel (cuando la voz lo dice)
        if (pj <= 0) return;
        const clave = r === .618 || r === .5;
        x.globalAlpha = al * pj;
        x.strokeStyle = clave ? `rgba(${ORO2},.95)` : 'rgba(232,227,216,.45)'; x.lineWidth = clave ? 2.5 : 1.6; x.setLineDash(clave ? [] : [8, 8]);
        x.beginPath(); x.moveTo(xa, y); x.lineTo(lerp(xa, xb, E.io3(pj)), y); x.stroke(); x.setLineDash([]);
        x.font = `${clave ? 700 : 500} 22px 'JetBrains Mono'`; x.textAlign = 'right'; x.textBaseline = 'bottom';
        x.fillStyle = clave ? `rgb(${ORO2})` : 'rgba(232,227,216,.7)';
        x.fillText((r * 100).toFixed(r === .382 || r === .618 ? 1 : 0).replace('.', ',') + ' %', xb - 10, y - 6);
      });
      x.globalAlpha = al;
    } else if (d.tipo === 'pos') {
      const xa = this.X(d.i0), xb = lerp(xa, this.X(d.i1), E.io3(clamp(p * 1.1))), ye = this.Y(d.entrada), ys = this.Y(d.sl), yt = this.Y(d.tp);
      const pt = d.tTp != null ? P(t, d.tTp, .5, E.out3) : 1, ps = d.tSl != null ? P(t, d.tSl, .5, E.out3) : 1;
      x.fillStyle = `rgba(${VERDE},${(.2 * pt).toFixed(3)})`; x.fillRect(xa, Math.min(ye, yt), xb - xa, Math.abs(yt - ye));
      x.fillStyle = `rgba(${ROJO},${(.2 * ps).toFixed(3)})`; x.fillRect(xa, Math.min(ye, ys), xb - xa, Math.abs(ys - ye));
      x.lineWidth = 2;
      x.strokeStyle = `rgba(${VERDE},${(.8 * pt).toFixed(3)})`; x.beginPath(); x.moveTo(xa, yt); x.lineTo(xb, yt); x.stroke();
      x.strokeStyle = `rgba(${ROJO},${(.8 * ps).toFixed(3)})`; x.beginPath(); x.moveTo(xa, ys); x.lineTo(xb, ys); x.stroke();
      x.strokeStyle = 'rgba(232,227,216,.9)'; x.beginPath(); x.moveTo(xa, ye); x.lineTo(xb, ye); x.stroke();
      const xl = xa + 14;
      if (pt > .3) pildora(x, xl, yt + (yt < ye ? 28 : -28), d.etiquetaTp ?? 'OBJETIVO', VERDE, 'izq', clamp((pt - .3) * 2), 24, 1, true);
      if (ps > .3) pildora(x, xl, ys + (ys > ye ? -28 : 28), d.etiquetaSl ?? 'STOP LOSS', ROJO, 'izq', clamp((ps - .3) * 2), 24, 1, true);
      pildora(x, xl, ye + (yt < ye ? 28 : -28), d.etiquetaEntrada ?? 'ENTRADA', CREMA, 'izq', clamp(p * 1.5), 24, 1, true);
      if (d.ratio && d.tRatio != null) { const pr = P(t, d.tRatio, .5, E.back); if (pr > 0) pildora(x, xb - 16, (yt + ye) / 2, d.ratio, VERDE, 'der', clamp(pr * 1.5), 30, lerp(.6, 1, pr), true); }
    } else if (d.tipo === 'texto') {
      x.font = `${d.peso ?? 400} ${d.tam ?? 40}px ${d.fuente ?? "'Bebas Neue'"}`; x.textAlign = d.al ?? 'center'; x.textBaseline = 'middle';
      x.fillStyle = `rgb(${rgb})`; x.shadowColor = `rgba(${rgb},.5)`; x.shadowBlur = 12;
      x.fillText(d.texto, this.X(d.i), this.Y(d.p) + (1 - E.out3(clamp(p))) * 16); x.shadowBlur = 0;
    } else if (d.tipo === 'liq') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.1))), y = this.Y(d.p);
      x.strokeStyle = `rgba(${rgb},.85)`; x.lineWidth = 2; x.setLineDash([4, 8]);
      x.beginPath(); x.moveTo(xa, y); x.lineTo(xb, y); x.stroke(); x.setLineDash([]);
      const nn = d.n ?? 3;
      for (let j = 0; j < nn; j++) {
        const pj = P(t, d.t0 + .25 + j * .15, .4, E.back);
        if (pj > 0) pildora(x, lerp(xa, Xi(d.i1 ?? 'fin'), (j + 1) / (nn + 1)), y + (d.lado ?? 1) * 34, d.texto ?? '$$$', rgb, 'centro', clamp(pj * 1.6), 24, pj, false);
      }
    }
    x.restore();
  }
}
/* rectangulo redondeado (camino) */
function rr(x, a, b, w, h, r) { r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
function pasoBonito(r) { const e = Math.pow(10, Math.floor(Math.log10(r))), m = r / e; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * e; }
/* pildora con texto: anclada a la izquierda ('izq'), derecha ('der') o centro */
function pildoraCanvas(x, px, py, txt, rgb, ancla = 'izq', al = 1, tam = 26, esc = 1, solida = false) {
  if (al <= .002) return;
  x.save(); x.globalAlpha *= al;
  x.font = `700 ${tam}px 'JetBrains Mono'`; x.textBaseline = 'middle';
  const tw0 = x.measureText(txt).width, w = (tw0 + tam * 1.1) * esc, h = tam * 1.62 * esc;
  const x0 = ancla === 'izq' ? px : ancla === 'der' ? px - w : px - w / 2;
  x.fillStyle = solida ? `rgb(${rgb})` : 'rgba(14,11,7,.9)'; rr(x, x0, py - h / 2, w, h, h / 2); x.fill();
  x.strokeStyle = `rgba(${rgb},.85)`; x.lineWidth = 1.6; rr(x, x0, py - h / 2, w, h, h / 2); x.stroke();
  x.fillStyle = solida ? (rgb === CREMA ? '#14100a' : '#0b0805') : `rgb(${rgb})`; x.textAlign = 'center';
  x.save(); x.translate(x0 + w / 2, py + 1); x.scale(esc, esc); x.fillText(txt, 0, 0); x.restore();
  x.restore();
}
/* una vela: x centro, ancho, y de apertura, y del precio actual, y de maximo y minimo; alfa y brillo (glow) */
function velaCanvas(x, xc, bw, yo, yp, yhi, ylo, sube, alfa = 1, brillo = 0, relleno) {
  const rgb = sube ? VERDE : ROJO;
  x.save(); x.globalAlpha = alfa;
  if (brillo > 0) { x.shadowColor = `rgba(${rgb},${(.85 * Math.min(1, brillo)).toFixed(3)})`; x.shadowBlur = 10 + 26 * Math.min(1, brillo); }
  x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = Math.max(2, Math.min(5, bw * .12)); x.lineCap = 'round';
  x.beginPath(); x.moveTo(xc, yhi); x.lineTo(xc, ylo); x.stroke();
  const top = Math.min(yo, yp), alto = Math.max(3, Math.abs(yp - yo));
  const g = x.createLinearGradient(0, top, 0, top + alto);
  if (sube) { g.addColorStop(0, '#7cf3c8'); g.addColorStop(1, '#14b886'); } else { g.addColorStop(0, '#ff8fa1'); g.addColorStop(1, '#e0244a'); }
  x.fillStyle = relleno === false && sube ? '#0b0805' : g;
  rr(x, xc - bw / 2, top, bw, alto, Math.min(5, bw / 4)); x.fill();
  if (relleno === false && sube) { x.strokeStyle = 'rgba(124,243,200,.95)'; x.lineWidth = 2; rr(x, xc - bw / 2, top, bw, alto, Math.min(5, bw / 4)); x.stroke(); }
  x.restore();
}

/* =====================================================================
   VELA GIGANTE con su anatomia (apertura, cierre, maximo, minimo, cuerpo, mechas)
     const VG = new VelaGigante({ v: [o, h, l, c] });
     VG.pintar(t, { x, y, s, o, f (formacion 0..1), baja (0 verde -> 1 roja), et: { max: [t0, t1], cierre: ..., ... } })
   ===================================================================== */
class VelaGigante {
  constructor(o = {}) {
    this.o = { v: [100, 132, 72, 122], w: 1000, h: 1060, ancho: 210, padre: WORLD, z: 'z4', ...o };
    this.c = mk('canvas', 'L vgig ' + this.o.z, this.o.padre);
    this.c.width = this.o.w; this.c.height = this.o.h; this.x = this.c.getContext('2d');
  }
  pintar(t, k = {}) {
    if ((k.o ?? 1) <= .002) { off(this.c); return; }
    const O = this.o, x = this.x, [o, h, l, c] = O.v, Wc = O.w, Hc = O.h, cx = k.cx ?? Wc / 2;
    const pad = (h - l) * .1, Y = p => 60 + (h + pad - p) / (h - l + 2 * pad) * (Hc - 120);
    const f = k.f ?? 1, baja = k.baja ?? 0;
    // vela bajista = la misma forma con apertura y cierre invertidos
    const vv = baja > .5 ? [c, h, l, o] : [o, h, l, c];
    const e = caminoVela(vv, f, .03);
    const sube = f < 1 ? e.p >= vv[0] : baja <= .5;                  // mientras se forma, el color sigue al precio (la batalla)
    this.Y = Y; this.kk = { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1 };
    x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, Wc, Hc);
    // al pasar de verde a roja (baja) el color se funde en vez de saltar
    const m = f < 1 ? (sube ? 0 : 1) : E.io3(clamp(baja));
    const rgb = mixRGB(VERDE, ROJO, m), bw = O.ancho;
    // halo
    const gh = x.createRadialGradient(cx, Y((e.hi + e.lo) / 2), 0, cx, Y((e.hi + e.lo) / 2), 420);
    gh.addColorStop(0, `rgba(${rgb},.20)`); gh.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = gh; x.fillRect(0, 0, Wc, Hc);
    x.save(); x.shadowColor = `rgba(${rgb},.75)`; x.shadowBlur = 50;
    x.strokeStyle = `rgb(${rgb})`; x.lineWidth = 12; x.lineCap = 'round';
    x.beginPath(); x.moveTo(cx, Y(e.hi)); x.lineTo(cx, Y(e.lo)); x.stroke();
    const top = Y(Math.max(vv[0], e.p)), bot = Y(Math.min(vv[0], e.p)), alto = Math.max(6, bot - top);
    const g = x.createLinearGradient(0, top, 0, top + alto);
    g.addColorStop(0, `rgb(${mixRGB('154,247,212', '255,163,178', m)})`); g.addColorStop(.5, `rgb(${mixRGB('46,224,164', '255,83,114', m)})`);
    g.addColorStop(1, `rgb(${mixRGB('15,158,114', '196,24,60', m)})`);
    x.fillStyle = g; rr(x, cx - bw / 2, top, bw, alto, 22); x.fill();
    x.shadowBlur = 0;
    // brillo interior (cristal)
    const gi = x.createLinearGradient(cx - bw / 2, 0, cx + bw / 2, 0);
    gi.addColorStop(0, 'rgba(255,255,255,.28)'); gi.addColorStop(.35, 'rgba(255,255,255,.06)'); gi.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gi; rr(x, cx - bw / 2 + 8, top + 8, bw * .4, Math.max(0, alto - 16), 16); x.fill();
    x.restore();
    // etiquetas: a la derecha precios (max, cierre/apertura, min); a la izquierda corchetes (mecha, cuerpo, mecha)
    const et = k.et || {}, yA = Y(o), yC = Y(c);
    const yTopCuerpo = Y(Math.max(o, c)), yBotCuerpo = Y(Math.min(o, c));
    const yCierre = lerp(yC, yA, E.io3(baja)), yApertura = lerp(yA, yC, E.io3(baja));
    const der = [['max', 'MÁXIMO', Y(h), CREMA], ['cierre', 'CIERRE', yCierre, ORO2], ['apertura', 'APERTURA', yApertura, ORO2], ['min', 'MÍNIMO', Y(l), CREMA]];
    for (const [id, txt, y, col] of der) {
      const w = et[id]; if (!w) continue;
      const p = P(t, w[0], .45, E.out3) * (w[1] != null ? 1 - P(t, w[1], .35, E.in3) : 1); if (p <= 0) continue;
      x.save(); x.globalAlpha = p;
      const x0 = cx + (id === 'max' || id === 'min' ? 22 : bw / 2 + 10), x1 = cx + bw / 2 + 74;
      x.strokeStyle = `rgba(${col},.85)`; x.lineWidth = 2.5; x.setLineDash([7, 7]);
      x.beginPath(); x.moveTo(x0, y); x.lineTo(lerp(x0, x1, E.out3(p)), y); x.stroke(); x.setLineDash([]);
      x.fillStyle = `rgb(${col})`; x.beginPath(); x.arc(x0, y, 7, 0, 6.2832); x.fill();
      x.font = "400 66px 'Bebas Neue'"; x.textAlign = 'left'; x.textBaseline = 'middle';
      x.fillStyle = `rgb(${col})`; x.shadowColor = `rgba(${col},.45)`; x.shadowBlur = 16;
      x.fillText(txt, x1 + 16 - (1 - p) * 20, y + 3); x.restore();
    }
    const izq = [['mechaArriba', 'MECHA', Y(h), yTopCuerpo], ['cuerpo', 'CUERPO', yTopCuerpo, yBotCuerpo], ['mechaAbajo', 'MECHA', yBotCuerpo, Y(l)]];
    for (const [id, txt, ya, yb] of izq) {
      const w = et[id]; if (!w) continue;
      const p = P(t, w[0], .45, E.out3) * (w[1] != null ? 1 - P(t, w[1], .35, E.in3) : 1); if (p <= 0) continue;
      const col = id === 'cuerpo' ? ORO2 : CREMA, xb = cx - bw / 2 - 40, ym = (ya + yb) / 2, hh = (yb - ya) / 2 * E.out3(p);
      x.save(); x.globalAlpha = p; x.strokeStyle = `rgba(${col},.9)`; x.lineWidth = 3;
      x.beginPath(); x.moveTo(xb + 16, ym - hh + 4); x.lineTo(xb, ym - hh + 4); x.lineTo(xb, ym + hh - 4); x.lineTo(xb + 16, ym + hh - 4); x.stroke();
      x.font = "400 58px 'Bebas Neue'"; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = `rgb(${col})`;
      x.shadowColor = `rgba(${col},.4)`; x.shadowBlur = 14;
      x.fillText(txt, xb - 22 + (1 - p) * 20, ym + 3); x.restore();
    }
    put(this.c, { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1, o: k.o ?? 1, b: k.b ?? 0, r: k.r ?? 0 });
  }
  /* punto del escenario a la altura del precio p (dx px a la derecha del centro de la vela): para colgar chips */
  aEscena(p, dx = 0) { const k = this.kk || { x: CX, y: CY, s: 1 }; return { x: k.x + dx * k.s, y: k.y + (this.Y(p) - this.o.h / 2) * k.s }; }
}
/* mezcla de dos colores 'r,g,b' (p 0..1) -> 'r,g,b' */
function mixRGB(a, b, p) { const A = a.split(',').map(Number), B = b.split(',').map(Number); return A.map((v, i) => Math.round(lerp(v, B[i], p))).join(','); }

/* =====================================================================
   CIERRE (CTA): logo, pregunta, caja de comentario que escribe la palabra y aviso de riesgo
   ===================================================================== */
function ctaNova({ a, b = CONFIG.dur + 1, tPregunta, tClave = null, tSenales, tEscribe, tEnvia, palabra = 'TRADING', logo = false, lineas = ['¿QUIERES APRENDER', '*TRADING*?'],
  sub = 'y recibir <b>señales gratis</b>', textoEnviado = '✓ Te envío la información', aviso = 'El trading conlleva riesgo · Contenido educativo' }) {
  const e = escenaT(a, b,
    (logo ? `<div class="L nlogo"><img alt="" src="assets/img/nova-logo-sm.png"></div>` : '') +
    titulo(lineas, '', 132) + `<div class="L sr">${sub}</div>` + `<div class="L aviso">${aviso}</div>`,
    (t, s) => {
      const $ = e.$; let j = 0;
      if (logo) brote($[j++], t, a + .1, CX, 480, { s0: .6, dur: .7 });
      // sin logo: el titulo entra entero al empezar el cierre y "TRADING" golpea cuando la voz lo dice
      const tt = $[j++];
      if (logo) { ent(tt, t, tPregunta - .1, CX, 790, { dy: 30, s0: 1 }); palabras(tt, t, tPregunta, { paso: .14 }); }
      else titular(tt, t, a, tClave ?? tPregunta + .35, 640);
      ent($[j++], t, tSenales - .05, CX, logo ? 950 : 830, { dy: 26 });
      ent($[j++], t, a + .6, CX, 1490, { dy: 10 });
      void s;
    });
  const com = new Comentario({ palabra, etiqueta: 'COMENTA', marcador: 'Añade un comentario…', t0: tEscribe - .5, tEscribe, tEnvia, textoEnviado, ancho: 900 });
  sfx(tPregunta, 'golpe', { vol: .7 });
  sfx(tSenales, 'nota', { vol: .6 });
  return { e, pintar: t => { if (en(t, a, b)) com.pintar(t, { x: CX, y: logo ? 1235 : 1135 }); else off(com.el); } };
}

/* =====================================================================
   FONDO (obsidiana + halo dorado que respira; tinte verde/rojo segun el mercado), CAMARA Y RENDER
   ===================================================================== */
let CAMK = norm([[0, { x: CX, y: CY, s: 1 }]]);
let TINTE = norm([[0, { v: 0, r: 0 }]]);                 // r: 1 verde (alcista), -1 rojo (bajista); v: intensidad 0..1
function layout() {}
function estadoVideo(t) { return { fondo: 1, persona: 0, halo: 0 }; }
class FondoNova extends FondoBase {
  pintar(t, { dx = 0, dy = 0 } = {}) {
    const x = this.preparar(), Wf = this.W, Hf = this.H, br = KF(t, this.k).brillo * (1 + .3 * this.onda(t));
    const gb = x.createLinearGradient(0, 0, 0, Hf);
    gb.addColorStop(0, '#0d0a06'); gb.addColorStop(.5, '#070504'); gb.addColorStop(1, '#030202');
    x.globalCompositeOperation = 'source-over'; x.fillStyle = gb; x.fillRect(0, 0, Wf, Hf);
    const halo = (gx, gy, r, rgb, al) => {
      if (al <= .002) return;
      const g = x.createRadialGradient(gx, gy, 0, gx, gy, r);
      g.addColorStop(0, `rgba(${rgb},${al.toFixed(3)})`); g.addColorStop(.55, `rgba(${rgb},${(al * .3).toFixed(3)})`); g.addColorStop(1, `rgba(${rgb},0)`);
      x.fillStyle = g; x.fillRect(gx - r, gy - r, 2 * r, 2 * r);
    };
    x.globalCompositeOperation = 'lighter';
    halo(Wf * .5 + dx * .05, Hf * .45 + dy * .04, 1050, ORO, .085 * (.86 + .14 * Math.sin(t * .7)) * br);
    halo(Wf * .06, Hf * .05, 620, ORO2, .05 * br);
    halo(Wf * .95, Hf * .96, 800, '150,110,40', .05);
    const ti = KF(t, TINTE);
    if (ti.v > .002) halo(Wf * .5, Hf * .62, 1100, ti.r >= 0 ? VERDE : ROJO, .07 * ti.v * Math.abs(ti.r));
    x.globalCompositeOperation = 'source-over';
  }
}
let ESPACIO = null, SUBS = null;
const PINTAR = [];                                       // piezas que se pintan en cada fotograma (graficos, velas, cta)
const PEND = [];
function render(t) {
  PEND.length = 0;
  let cam = KF(t, CAMK);
  for (const e of ESCENAS) if (!e.sinEntrada && t >= e.a && t < e.a + .6) cam = { ...cam, s: cam.s * (1 + .025 * (1 - P(t, e.a, .55, E.out4))) };
  const dx = -(cam.x - CX) * cam.s, dy = -(cam.y - CY) * cam.s;
  WORLD.style.transform = WORLDF.style.transform = `translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px) scale(${cam.s.toFixed(5)})`;
  pintarCapas(t, estadoVideo(t));
  if (!ESPACIO) ESPACIO = new FondoNova(norm([[0, { vel: 26, brillo: 1 }]]), { ondas: ESCENAS.filter(e => !e.sinEntrada).map(e => e.a) });
  ESPACIO.pintar(t, { dx, dy });
  grid.style.opacity = 0; glowN.style.opacity = 0; glowA.style.opacity = 0; glowB.style.opacity = 0;
  pintarFuga(t);
  for (const f of PINTAR) f(t);
  pintarEscenas(t);
  if (SUBS) SUBS.pintar(t);
  for (const p of PULSES) {
    const k = (t - p.t0) / p.dur;
    if (k <= 0 || k >= 1) off(p.e);
    else put(p.e, { x: p.x, y: p.y, s: lerp(1, p.to, E.out3(k)), o: .8 * (1 - E.out2(k)) });
  }
}
const grid = $('grid'), glowN = $('glowN'), glowA = $('glowA'), glowB = $('glowB');
let FUGA = null;
function pintarFuga(t) {
  if (!FUGA) FUGA = mk('div', 'fuga', STAGE, '');
  let o = 0, k = 0;
  ESCENAS.forEach((e, i) => { if (e.sinEntrada || e.a < .5) return; const b = bump(t, e.a - .26, .56); if (b > o) { o = b; k = i; } });
  FUGA.style.opacity = (o * .5).toFixed(3);
  FUGA.style.transform = `translate(${((k % 2 ? 1 : -1) * (10 + 16 * (1 - o))).toFixed(1)}%,${((k % 3) - 1) * 9}%)`;
}
/* subtitulos palabra a palabra (solo con voz): debajo del grafico, en la zona segura */
function subtitulos(o = {}) { SUBS = new Subtitulos({ y: LAY.sub, max: 4, tam: 60, ...o }); return SUBS; }
