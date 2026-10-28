/* =====================================================================
   KIT DE REELS ANIMADOS · base comun (vertical 1080x1920, voz de Reimo, cualquier nicho)
   - Colores de la marca en MARCA (reels/marcas/<marca>.json, lo inyecta armar.py --marca): ACENTO/ACENTO2 (ORO/ORO2
     son los mismos, nombres de la serie de trading), CREMA, VERDE, ROJO.
   - Titulos palabra a palabra, eyebrow, chips, tarjetas; escenas ancladas a la voz (escena(f0, f1, html, pintar) +
     tw(frase, 'palabra')); el corte entre escenas cae a mitad de la pausa.
   - Cierre ctaComentar() (pregunta + caja de comentario que escribe la PALABRA + aviso), FondoMarca y render().
   - Zonas seguras de Instagram/TikTok: nada importante arriba de y=250 ni abajo de y=1540; abajo a la derecha
     (x > 940, y > 1100) van los botones de la app.
   ===================================================================== */
const M = MARCA;
const ACENTO = M.acento2RGB, ACENTO2 = M.acentoRGB, ACENTO3 = M.acento3RGB, CREMA = '232,227,216';
const ORO = ACENTO, ORO2 = ACENTO2, ORO3 = ACENTO3;            // nombres de la serie de trading (son los colores de la marca)
const VERDE = '34,211,154', ROJO = '255,77,106', AZUL = '110,168,255', GRIS = '150,142,128';
const W = CONFIG.ancho, H = CONFIG.alto;

css(`
.tt{font-family:'Bebas Neue',sans-serif;font-size:150px;line-height:.92;letter-spacing:.01em;color:#efe9dc;text-align:center;white-space:nowrap}
.tt .ln{display:block}
.tt .w{display:inline-block;margin:0 .09em;will-change:transform}
.tt .oro,.tt .verde,.tt .rojo{display:inline-block}
.tt .oro{padding-top:.16em;margin-top:-.16em}   /* el degradado recortado al texto cubre tambien tildes y la virgulilla de la Ñ */
.fuga{position:absolute;left:-30%;top:-20%;width:160%;height:140%;pointer-events:none;mix-blend-mode:screen;opacity:0;z-index:40;
  background:radial-gradient(ellipse 40% 30% at 50% 50%,rgba(${M.luzRGB},.75),rgba(${M.acento2RGB},.28) 45%,rgba(${M.acento2RGB},0) 75%)}
.oro{background-image:${M.degradado};-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 26px rgba(${M.acentoRGB},.32))}
.tt .verde{color:#3fe0aa;filter:drop-shadow(0 0 22px rgba(34,211,154,.35))}
.tt .rojo{color:#ff6b83;filter:drop-shadow(0 0 22px rgba(255,77,106,.35))}
.ey{font:600 30px 'JetBrains Mono',monospace;letter-spacing:.3em;color:${M.acentoClaro};display:flex;align-items:center;gap:18px;white-space:nowrap}
.ey i{display:block;width:46px;height:2px;background:linear-gradient(90deg,rgba(${M.acento2RGB},0),${M.acento2})}
.ey i.d{background:linear-gradient(90deg,${M.acento2},rgba(${M.acento2RGB},0))}
.sr{font:italic 400 70px 'Instrument Serif',serif;color:#efe9dc;white-space:nowrap;letter-spacing:-.005em}
.sr b{font-weight:400;color:${M.acento}}
.chn{height:68px;padding:0 30px 0 24px;border-radius:999px;background:rgba(16,12,8,.86);border:1.5px solid rgba(${M.acento2RGB},.45);font:600 29px 'JetBrains Mono',monospace;
  color:#efe9dc;display:flex;align-items:center;gap:14px;white-space:nowrap;box-shadow:0 18px 44px -18px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.08)}
.chn b{color:${M.acento};font-weight:700}
.chn.xl{height:86px;padding:0 36px 0 28px;font-size:37px;gap:16px;border-width:2px}
.chn .pt{width:14px;height:14px;border-radius:50%;background:${M.acento};box-shadow:0 0 14px rgba(${M.acentoRGB},.8)}
.chn.v{border-color:rgba(34,211,154,.55)} .chn.v .pt{background:#22d39a;box-shadow:0 0 14px rgba(34,211,154,.8)} .chn.v b{color:#3fe0aa}
.chn.r{border-color:rgba(255,77,106,.55)} .chn.r .pt{background:#ff4d6a;box-shadow:0 0 14px rgba(255,77,106,.8)} .chn.r b{color:#ff6b83}
.num{font-family:'Bebas Neue',sans-serif;font-size:220px;line-height:.86;color:#efe9dc;white-space:nowrap;text-align:center}
.num small{font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.2em;color:${M.acentoClaro};display:block;margin-top:14px}
.tarj{width:900px;padding:34px 40px;border-radius:36px;background:linear-gradient(180deg,rgba(24,18,11,.92),rgba(12,9,6,.94));border:1.5px solid rgba(${M.acento2RGB},.3);
  box-shadow:0 40px 90px -40px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.07)}
.tarj h3{margin:0;font:400 72px/1 'Bebas Neue',sans-serif;letter-spacing:.01em;color:#efe9dc}
.tarj p{margin:14px 0 0;font:500 34px/1.3 'Inter',sans-serif;color:#cfc6b6}
.tarj p b{color:${M.acento};font-weight:700}
.subt{font:800 60px/1.12 'Inter',sans-serif !important;letter-spacing:-.012em;color:#f5f1e8;text-shadow:0 4px 0 rgba(0,0,0,.65),0 10px 34px rgba(0,0,0,.75)}
.subt span{margin:0 .12em}
.subt span.on{color:${M.acento}}
.graf,.vgig{display:block}
.pcard{width:180px;height:292px;border-radius:28px;background:linear-gradient(180deg,rgba(28,21,12,.96),rgba(12,9,6,.96));border:1.5px solid rgba(${M.acento2RGB},.32);
  display:flex;flex-direction:column;align-items:center;padding-top:16px;box-shadow:0 30px 60px -30px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,240,200,.07)}
.pcard b{font:400 46px/1 'Bebas Neue',sans-serif;color:${M.acento};letter-spacing:.02em}
.pcard canvas{display:block;margin-top:8px}
.pcard.on{border-color:rgba(${M.acentoRGB},.9);box-shadow:0 0 0 1px rgba(${M.acentoRGB},.4),0 0 44px rgba(${M.acentoRGB},.3)}
.sino{width:128px;height:128px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid}
.sino.ok{color:#22d39a;border-color:rgba(34,211,154,.85);background:rgba(10,30,22,.9);box-shadow:0 0 44px rgba(34,211,154,.4)}
.sino.no{color:#ff4d6a;border-color:rgba(255,77,106,.85);background:rgba(34,10,14,.9);box-shadow:0 0 44px rgba(255,77,106,.4)}
.nlogo{width:300px;height:300px;filter:drop-shadow(0 18px 40px rgba(0,0,0,.7)) drop-shadow(0 0 40px rgba(${M.acentoRGB},.25))}
.nlogo img{width:100%;height:100%;object-fit:contain;display:block}
.aviso{font:500 24px 'JetBrains Mono',monospace;letter-spacing:.05em;color:rgba(232,227,216,.58);white-space:nowrap;text-align:center}
.coment .cab{color:${M.acento} !important}
.coment .av{background:linear-gradient(135deg,${M.acentoClaro},${M.acento2}) !important;color:${M.tinta} !important}
.coment .tx .w{font-family:'Bebas Neue',sans-serif !important;font-weight:400 !important;font-size:104px !important;letter-spacing:.04em !important;color:${M.acento} !important}
.coment .ok span{background:${M.acento} !important;color:${M.tinta} !important}
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
    w.style.filter = b > .01 ? `brightness(${(1 + .45 * b).toFixed(3)}) drop-shadow(0 0 ${(34 * b).toFixed(1)}px rgba(${M.acentoRGB},.55))` : '';
  });
}
/* titulo de escena: entra entero al empezar (palabra por palabra en 0,3 s) y su palabra de color golpea en tAcento */
function titular(el, t, a, tAcento = null, y = LAY.tit) {
  ent(el, t, a - .02, CX, y, { dy: 0, s0: 1, dur: .3, bl: 0 });
  palabras(el, t, a, { paso: .07, dur: .38 });
  if (tAcento != null) acento(el, t, tAcento);
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
function mixRGB(a, b, p) { const A = a.split(',').map(Number), B = b.split(',').map(Number); return A.map((v, i) => Math.round(lerp(v, B[i], p))).join(','); }

/* =====================================================================
   CIERRE (CTA): logo, pregunta, caja de comentario que escribe la palabra y aviso de riesgo
   ===================================================================== */
function ctaComentar({ a, b = CONFIG.dur + 1, tPregunta, tClave = null, tSenales, tEscribe, tEnvia, palabra = 'TRADING', logo = false, lineas = ['¿QUIERES APRENDER', '*TRADING*?'],
  sub = 'y recibir <b>señales gratis</b>', textoEnviado = '✓ Te envío la información', aviso = 'El trading conlleva riesgo · Contenido educativo' }) {
  const e = escenaT(a, b,
    (logo ? `<div class="L nlogo"><img alt="" src="assets/img/${M.logo || 'logo.png'}"></div>` : '') +
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
class FondoMarca extends FondoBase {
  pintar(t, { dx = 0, dy = 0 } = {}) {
    const x = this.preparar(), Wf = this.W, Hf = this.H, br = KF(t, this.k).brillo * (1 + .3 * this.onda(t));
    const gb = x.createLinearGradient(0, 0, 0, Hf);
    gb.addColorStop(0, M.fondo[0]); gb.addColorStop(.5, M.fondo[1]); gb.addColorStop(1, M.fondo[2]);
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
    halo(Wf * .95, Hf * .96, 800, M.haloRGB, .05);
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
  if (!ESPACIO) ESPACIO = new FondoMarca(norm([[0, { vel: 26, brillo: 1 }]]), { ondas: ESCENAS.filter(e => !e.sinEntrada).map(e => e.a) });
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

const ctaNova = ctaComentar, FondoNova = FondoMarca;                // nombres de la serie de trading
