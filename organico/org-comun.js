/* =====================================================================
   CURSO NSFW · MODULO ESCALANDO REDES SOCIALES (crecimiento organico) — piezas comunes (23/10/2026).
   Clases dobladas al espanol con la voz v3 de Reimo y recreadas en animaciones (sin la camara del profesor).
   Fondo: malla 3D ondulada naranjo (la del promo IA HUB CLUB) + halos IA HUB. Las fotos de ejemplo de la pizarra
   original (perfiles, modelos) van COMPLETAS en laminas a la izquierda; sin foto, la escena va centrada.
   Anclas por TIEMPO de la transcripcion de la voz doblada: tp('palabra', desde_segundos).
   ===================================================================== */
HALO = ['255,106,26', '255,70,110', '160,80,255'];
const NEON = { p: '#c084fc', o: '#ff7a1a', b: '#3fa9ff', v: '#2fd47a', r: '#ff4d5e', a: '#ffc23d' };
function tp(p, desde = 0, k = 1) {
  const n = nrm(p); let c = 0;
  for (const x of PALS) if (x[2] >= desde - .05 && x[1] === n && ++c === k) return x[2];
  console.error('No encuentro «' + p + '» desde ' + desde); return desde;
}
function corteEn(t) {
  if (t >= FR[FR.length - 1][1] - .05) return t;
  let best = t, d = 1e9;
  for (let i = 0; i < FR.length - 1; i++) { const m = (FR[i][1] + FR[i + 1][0]) / 2; if (Math.abs(m - t) < d) { d = Math.abs(m - t); best = m; } }
  return best;
}
function escenaT(t0, t1, html, pintar = () => {}) {
  const el = mk('div', 'L esc z5', WORLDF, html);
  el.style.width = CONFIG.ancho + 'px'; el.style.height = CONFIG.alto + 'px';
  const e = { a: t0 <= 0 ? 0 : corteEn(t0), b: t1 >= CONFIG.dur ? CONFIG.dur + 1 : corteEn(t1), el, pintar };
  e.q = s => el.querySelector(s); e.qa = s => [...el.querySelectorAll(s)];
  e.$ = [...el.children];
  ESCENAS.push(e);
  if (e.a > .1) sfx(e.a + .03, 'aire', { vol: .4 });
  return e;
}
const neo = (ico, c = 'o', tam = 120, txt = '', dentro = false) => `<div class="${dentro ? '' : 'L '}neo" style="--c:${NEON[c]};width:${tam}px;height:${tam}px">${ico.startsWith('logo:') ? logo(ico.slice(5), Math.round(tam * .5)) : icon(ico, Math.round(tam * .46), 2.2)}${txt ? `<span>${txt}</span>` : ''}</div>`;

css(`
:root{--grad1:#ffd2b0;--grad2:#FF6A1A}
.neo{border-radius:50%;border:3px solid var(--c);background:radial-gradient(circle,rgba(14,10,10,.6),rgba(10,8,8,.92));color:var(--c);display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 26px color-mix(in srgb,var(--c) 70%,transparent),inset 0 0 22px color-mix(in srgb,var(--c) 45%,transparent)}
.neo span{position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%);font:800 26px var(--sans);color:#fff;white-space:nowrap;text-align:center}
.crd .neo{position:absolute}
.phd{display:flex;align-items:center;gap:18px}
.phd .pn{display:flex;align-items:center;justify-content:center;height:56px;padding:0 22px;border-radius:999px;background:linear-gradient(180deg,#ff8a3d,#ff6a1a);
  font:800 24px var(--mono);letter-spacing:.12em;color:#fff;white-space:nowrap;box-shadow:0 0 30px rgba(255,106,26,.45)}
.phd .pt{font:400 64px/1 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#fff;white-space:nowrap;letter-spacing:.01em}
.lst{display:flex;flex-direction:column;gap:14px;width:900px}
.lst .it{position:relative;display:flex;align-items:center;gap:20px;min-height:86px;padding:14px 26px;border-radius:22px;background:linear-gradient(180deg,rgba(24,20,20,.9),rgba(12,10,10,.92));
  border:1.5px solid rgba(255,255,255,.08);font:700 30px/1.25 var(--sans);color:#8e8a96;opacity:0}
.lst .it i{display:flex;align-items:center;justify-content:center;flex:none;width:50px;height:50px;border-radius:50%;background:#2a2426;font:800 24px var(--sans);color:#c9c2c4;font-style:normal}
.lst .it.on{color:#fff;border-color:rgba(255,122,26,.9);box-shadow:0 0 0 1px rgba(255,122,26,.4),0 0 40px rgba(255,122,26,.25);background:rgba(34,18,12,.94)}
.lst .it.on i{background:linear-gradient(180deg,#ff8a3d,#ff6a1a);color:#fff}
.lst .it.ok{color:#ddd6d8}
.lst .it.ok i{background:#2e9e5b;color:#fff}
.lst .it small{display:block;font:600 22px var(--sans);color:#ffb27a;margin-top:4px}
.tag3{display:flex;align-items:center;gap:12px;height:62px;padding:0 26px 0 18px;border-radius:999px;background:rgba(18,14,14,.92);border:1.5px solid var(--c,rgba(255,255,255,.2));
  font:700 27px var(--sans);color:#fff;white-space:nowrap;box-shadow:0 0 24px color-mix(in srgb,var(--c,#000) 35%,transparent)}
.tag3 svg{color:var(--c,#fff)}
.lam{display:flex;flex-direction:column;align-items:center;gap:18px}
.lam .mrc{position:relative;border-radius:24px;padding:3px;background:linear-gradient(160deg,#ff9a4a,rgba(255,106,26,.35) 40%,rgba(255,255,255,.12) 60%,#ff6a1a);
  box-shadow:0 50px 110px -30px rgba(0,0,0,.95),0 0 70px rgba(255,106,26,.25)}
.lam .mrc .in{border-radius:21px;overflow:hidden;background:#000;line-height:0}
.lam .mrc img{display:block}
.lam .mrc .shn{position:absolute;inset:3px;border-radius:21px;pointer-events:none;background:linear-gradient(105deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.22) 50%,rgba(255,255,255,0) 60%);background-size:280% 100%;background-position:120% 0}
.lam .cap{display:flex;align-items:center;gap:10px;height:52px;padding:0 22px 0 16px;border-radius:999px;background:rgba(18,14,14,.92);border:1.5px solid rgba(255,122,26,.6);
  font:700 23px var(--sans);color:#fff;white-space:nowrap;box-shadow:0 0 24px rgba(255,106,26,.25)}
.lam .cap svg{color:#ff8a3d}
`);

/* ---------- fondo: malla 3D ondulada (HackerBg de la landing Developer IA) en tonos IA HUB ---------- */
const MALLA = document.createElement('canvas');
MALLA.width = CONFIG.ancho; MALLA.height = CONFIG.alto;
MALLA.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none';
document.getElementById('fondo').appendChild(MALLA);
const MCTX = MALLA.getContext('2d');
function pintarMalla(t) {
  const w = CONFIG.ancho, h = CONFIG.alto;
  const COLS = 44, FILAS = 34, horizonte = h * .36, f = Math.max(w, h) * .95, cam = 1.7, zCerca = 2.6, zLejos = 30, ancho = 21;
  const alto = (x, z) => .42 * Math.sin(x * .42 + t * .55) * Math.cos(z * .3 - t * .7) + .22 * Math.sin((x + z) * .55 - t * .45);
  const pts = [];
  for (let r = 0; r <= FILAS; r++) {
    const z = zCerca + (zLejos - zCerca) * (r / FILAS), fila = new Float32Array((COLS + 1) * 2);
    for (let k = 0; k <= COLS; k++) { const x = (k / COLS - .5) * 2 * ancho; fila[k * 2] = w / 2 + (x * f) / z; fila[k * 2 + 1] = horizonte + ((cam - alto(x, z)) * f) / z; }
    pts.push(fila);
  }
  MCTX.clearRect(0, 0, w, h);
  const g = MCTX.createLinearGradient(0, horizonte, 0, h);
  g.addColorStop(0, 'rgba(255,214,192,0)'); g.addColorStop(.18, 'rgba(255,214,192,.07)'); g.addColorStop(.6, 'rgba(255,226,210,.15)'); g.addColorStop(1, 'rgba(255,232,220,.22)');
  MCTX.strokeStyle = g; MCTX.lineWidth = 1.4; MCTX.beginPath();
  for (const fila of pts) { MCTX.moveTo(fila[0], fila[1]); for (let k = 1; k <= COLS; k++) MCTX.lineTo(fila[k * 2], fila[k * 2 + 1]); }
  for (let k = 0; k <= COLS; k++) { MCTX.moveTo(pts[0][k * 2], pts[0][k * 2 + 1]); for (let r = 1; r <= FILAS; r++) MCTX.lineTo(pts[r][k * 2], pts[r][k * 2 + 1]); }
  MCTX.stroke();
  MALLA.style.opacity = P(t, 0, 1.5, E.io3).toFixed(3);
}

/* ---------- lamina con la(s) foto(s) de ejemplo de la pizarra original (completas, sin recorte) ---------- */
const LAMINAS = [];
function lamina(esc, imgs, caps = []) {
  const n = imgs.length;
  const html = imgs.map((src, i) => `<div class="L lam"><div class="mrc"><div class="in"><img alt="" src="assets/img/${src}.png"></div><i class="shn"></i></div>` +
    (caps[i] ? `<div class="cap">${icon('scanFace', 26, 2.4)}${caps[i]}</div>` : '') + '</div>').join('');
  const wrap = mk('div', 'L z5', WORLDF, html);
  wrap.style.width = CONFIG.ancho + 'px'; wrap.style.height = CONFIG.alto + 'px';
  const L = { esc, els: [...wrap.children], wrap, n };
  LAMINAS.push(L);
  sfx(esc.a + .12, 'transicion', { vol: .45 });
  return L;
}
// medidas de la lamina segun la forma de las fotos: 1 foto grande; 2 fotos apaisadas = una sobre otra; 2 verticales = lado a lado
function medirLamina(L) {
  const ims = L.els.map(e => e.querySelector('img'));
  const ar = (ims[0].naturalWidth / ims[0].naturalHeight) || 1;
  const tam = (mw, mh) => ims.forEach(im => { im.style.maxWidth = mw + 'px'; im.style.maxHeight = mh + 'px'; });
  if (L.n === 1) { tam(700, 760); L.pos = [[500, 548]]; }
  else if (ar > .9) { tam(620, 380); L.pos = [[500, 300], [500, 785]]; }
  else { tam(370, 700); L.pos = [[280, 548], [660, 548]]; }
}
function pintarLaminas(t) {
  for (const L of LAMINAS) {
    const { a, b } = L.esc;
    if (t < a - .05 || t > b + .05) { off(L.wrap); continue; }
    if (!L.pos) medirLamina(L);
    put(L.wrap, { x: CX, y: CY });
    L.els.forEach((el, i) => {
      const p = P(t, a + .1 + i * .18, .7, E.out4), q = P(t, b - .45, .4, E.in3);
      const [x, y] = L.pos[i], kb = 1 + .025 * clamp((t - a) / Math.max(1, b - a));
      put(el, { x: x - (1 - p) * 70, y: y + flota(t, i, 4), s: lerp(.92, 1, p) * kb * (1 - .04 * q), o: clamp(p * 1.8) * (1 - q), b: (1 - p) * 12 + q * 10 });
      const sw = P(t, a + .55 + i * .18, 1.1, E.io3);
      el.querySelector('.shn').style.backgroundPosition = `${lerp(120, -20, sw).toFixed(1)}% 0`;
    });
  }
}

/* ---------- pasos que se encienden con la voz ---------- */
function escenaPasos(t0, t1, { n, titulo, items, x = 1330, y0 = 250, extra }) {
  const e = escenaT(t0, t1, `<div class="L phd">${n ? `<span class="pn">${n}</span>` : ''}<span class="pt">${titulo}</span></div>` +
    `<div class="L lst">${items.map((it, i) => `<div class="it"><i>${i + 1}</i><span>${it[0]}${it[2] ? `<small>${it[2]}</small>` : ''}</span></div>`).join('')}</div>` + (extra ? extra.html : ''),
    (t, { a, b }) => {
      const [hd, lst] = e.$;
      if (typeof fitW === 'function') fitW(hd, 940);
      const y = 590 - items.length * 50;                                        // bloque centrado en vertical
      ent(hd, t, a + .05, x, y - 90, { ax: 50, dy: 0, dx: 40 });
      ent(lst, t, a + .15, x, y, { ax: 50, ay: 0, dy: 20 });
      const its = [...lst.children];
      items.forEach((it, i) => {
        const ti = it[1], tn = i < items.length - 1 ? items[i + 1][1] : b + 1;
        const p = P(t, ti - .25, .35);
        its[i].style.opacity = p.toFixed(3); its[i].style.transform = `translateX(${((1 - p) * 40).toFixed(1)}px)`;
        its[i].classList.toggle('on', t >= ti - .1 && t < tn - .1);
        its[i].classList.toggle('ok', t >= tn - .1);
        const ic = its[i].querySelector('i'), st = t >= tn - .1 ? 'ok' : 'n';
        if (ic._st !== st) { ic._st = st; if (st === 'ok') ic.innerHTML = icon('check', 26, 3.2); else ic.textContent = i + 1; }
      });
      if (extra) extra.pintar(t, e);
    });
  items.forEach(it => sfx(it[1] - .2, 'tick', { vol: .4 }));
  return e;
}
