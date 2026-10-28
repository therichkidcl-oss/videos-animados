/* =====================================================================
   NOVA PROFIT · TRADING EN FORMATO CINE (26/10/2026)
   Lenguaje de cine que Reimo aprobo el 24/10 (VIDEOS DEVELOPER/docs/ESTILO-CINE.md), adaptado a la serie: personajes
   y objetos con cara, mapa desde arriba, ambientes que la camara recorre y una camara que entra de un plano al
   siguiente. Se carga despues de comun.js (usa nrm, tw, ini, finF, ocultar, rng...). Todo es funcion pura de t.
   - Plano: capa de 1080x1920 con camara propia (zoom, paneo, giro y desenfoque cuando se mueve rapido).
   - iris(), atravesar(): transiciones de cine · Bokeh, luz(), etalonaje(), sacudon().
   - Caras: dOjos()/dCarita() + cara(): ojos con brillo, parpados del color del objeto, ceno y 6 bocas.
   - Luchador('toro' | 'oso'): velas con cara (cuernos u orejas, brazos y piernas de goma, guantes o garras).
   - dMoneda(): tu dinero, una moneda con cara.
   - SubViral: subtitulos arriba (y 360) palabra por palabra: las dichas en gris, la ultima en blanco y negrita, y las
     claves con caja dorada de seleccion (como en los reels virales que aprobo).
   ===================================================================== */
css(`.z9{z-index:9}.z10{z-index:10}
.tuTag{font:400 46px/1 'Bebas Neue',sans-serif;letter-spacing:.06em;color:#1a1208;background:linear-gradient(180deg,#ffe27a,#f4c430);padding:9px 18px 5px;
  border-radius:14px;box-shadow:0 10px 26px rgba(0,0,0,.55),0 0 24px rgba(244,196,48,.45);white-space:nowrap}
.tuTag::after{content:'';position:absolute;left:50%;bottom:-13px;margin-left:-11px;border:11px solid transparent;border-top-color:#f4c430;border-bottom:0}
.cchip{display:flex;align-items:center;gap:12px;height:66px;padding:0 26px 0 20px;border-radius:999px;font:700 30px 'Outfit',sans-serif;white-space:nowrap;
  background:rgba(12,12,18,.84);border:2px solid rgba(255,255,255,.16);color:#fff;box-shadow:0 18px 40px rgba(0,0,0,.5)}
.cchip.v{border-color:rgba(34,211,154,.85);color:#c9ffe9}.cchip.v svg{color:#3fe0aa}
.cchip.r{border-color:rgba(255,77,106,.9);color:#ffd3da}.cchip.r svg{color:#ff6b83}
.cchip.o{border-color:rgba(244,196,48,.9);color:#fff1c2}.cchip.o svg{color:#f4c430}
.cet{font:700 25px 'JetBrains Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:#e9e4d8;white-space:nowrap;text-shadow:0 2px 10px rgba(0,0,0,.85)}
.cfuente{font:500 23px 'Outfit',sans-serif;color:rgba(255,255,255,.45);white-space:nowrap}`);

/* ---------- dibujo: utilidades SVG ---------- */
let _dn = 0;
const dId = p => `${p}${++_dn}`;
const dSvg = (vb, w, h, cuerpo, extra = '') => `<svg viewBox="${vb}" width="${w}" height="${h}" style="display:block;overflow:visible" ${extra}>${cuerpo}</svg>`;
const dGrad = (id, paradas, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${paradas.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const dRadial = (id, paradas, cx = .5, cy = .5, r = .5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${paradas.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
const dSombra = (cx, cy, rx, ry = rx * .16, a = .4) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(0,0,0,${a})" style="filter:blur(6px)"/>`;
const dEl = (padre, cls, html, z = 6) => mk('div', `L ${cls} z${z}`, padre, html);
const hashC = (i, k = 0) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };   // 0..1 sin correlacion

/* entra con rebote y sale con fundido: devuelve el progreso (> 0 = visible) */
function ap(el, t, t0, t1, { x = CX, y = CY, s0 = .6, s = 1, dy = 40, dx = 0, r = 0, r0 = 0, d = .45, e = E.back, b0 = 0, o = 1 } = {}) {
  const p = P(t, t0, d, e), q = t1 == null ? 0 : P(t, t1 - .3, .3, E.in3);
  if (!(p > 0) || q >= 1) { off(el); return 0; }
  put(el, { x: x + (1 - clamp(p)) * dx, y: y + (1 - clamp(p)) * dy, s: lerp(s0, 1, p) * s, r: lerp(r0, r, clamp(p)), o: clamp(p * 2) * (1 - q) * o, b: (1 - clamp(p)) * b0 + q * 6 });
  return p;
}
function escribir(el, txt, t, t0, t1) {
  const k = Math.round(txt.length * clamp((t - t0) / (t1 - t0)));
  if (el._k !== k) { el._k = k; el.textContent = txt.slice(0, k) + (k > 0 && k < txt.length ? '▍' : ''); }
}

/* ---------- PLANO: una capa-mundo con camara propia ---------- */
class Plano {
  constructor(z = 5, padre = WORLDF) { this.el = mk('div', `L z${z}`, padre); this.el.style.width = W + 'px'; this.el.style.height = H + 'px'; }
  /* (fx, fy) = punto del mundo que queda al centro, s = zoom, r = giro (grados), b = desenfoque, br = brillo */
  ver({ s = 1, fx = CX, fy = CY, r = 0, o = 1, b = 0, br = 1 } = {}) {
    if (!(o > .002)) { off(this.el); return false; }
    put(this.el, { x: CX, y: CY, ax: fx / W * 100, ay: fy / H * 100, s, r, o, b, br }); return true;
  }
  /* donde cae en pantalla un punto del mundo con la camara c */
  static aPantalla([x, y], { s = 1, fx = CX, fy = CY, r = 0 } = {}) {
    const a = r * Math.PI / 180, dx = (x - fx) * s, dy = (y - fy) * s;
    return [CX + dx * Math.cos(a) - dy * Math.sin(a), CY + dx * Math.sin(a) + dy * Math.cos(a)];
  }
}
/* camara por tramos [[t, { s, fx, fy, r }, curva?], ...] -> la del momento + desenfoque segun lo rapido que se mueve */
function camaraEn(t, tramos, { desenfoque = 6 } = {}) {
  const k = tramos._n || (tramos._n = norm(tramos)), c = KF(t, k), c2 = KF(t - 1 / 30, k);
  const vel = Math.abs(Math.log((c.s || 1) / (c2.s || 1))) * 30 + Math.hypot((c.fx ?? CX) - (c2.fx ?? CX), (c.fy ?? CY) - (c2.fy ?? CY)) * (c.s || 1) / 30;
  return { s: c.s ?? 1, fx: c.fx ?? CX, fy: c.fy ?? CY, r: c.r ?? 0, b: Math.min(desenfoque * 2, vel * desenfoque) };
}
/* iris: k 0 -> 1 abre un circulo desde (x, y) de pantalla; cerrar = true lo achica hasta (x, y) */
function iris(el, k, x = CX, y = CY, { cerrar = false } = {}) {
  k = clamp(k);
  if (!cerrar && k >= 1) { if (el._ir) { el._ir = 0; el.style.clipPath = ''; } return; }
  const r = (cerrar ? 1 - k : k) * Math.hypot(Math.max(x, W - x), Math.max(y, H - y));
  el._ir = 1; el.style.clipPath = `circle(${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
}
/* «entrar en» un punto: A se acerca a (px, py) y se va; B llega desde chica. Corte centrado en tc, dura d. */
function atravesar(t, tc, px, py, d = .7, zoom = 5, fx0 = CX, fy0 = CY, s0 = 1) {
  const k = clamp((t - (tc - d / 2)) / d), a = E.in3(clamp(k * 1.25)), b = E.out3(clamp((k - .3) / .7));
  return { a: { s: s0 * lerp(1, zoom, a), fx: lerp(fx0, px, E.io3(clamp(k * 1.4))), fy: lerp(fy0, py, E.io3(clamp(k * 1.4))), o: 1 - clamp((k - .35) * 2.6), b: a * 10 },
           b: { s: lerp(.35, 1, b), fx: CX, fy: CY, o: clamp((k - .3) * 2.6), b: (1 - b) * 10 }, k };
}
/* barrido entre dos planos: A sale hacia la izquierda con desenfoque y B entra por la derecha (corte en tc).
   Se aplica moviendo la camara: A.ver({ fx: fx - a.dx / s, b: a.b }) */
function barrido(t, tc, d = .55, dir = 1) {
  const k = clamp((t - (tc - d / 2)) / d), e = E.io3(k), b = 16 * Math.sin(Math.PI * k);
  return { k, a: { dx: -dir * W * e, b, o: k < 1 ? 1 : 0 }, b: { dx: dir * W * (1 - e), b, o: k > 0 ? 1 : 0 } };
}
/* bokeh: circulos de luz desenfocados que suben lento (semilla fija) */
class Bokeh {
  constructor(padre, { n = 26, colores = ['#f4c430', '#ffffff', '#6ea8ff'], z = 3, semilla = 3, tam = [30, 120], ancho = W, alto = H } = {}) {
    this.cv = mk('canvas', `L z${z}`, padre); this.w = ancho / 2; this.h = alto / 2;
    this.cv.width = this.w; this.cv.height = this.h; this.cv.style.width = ancho + 'px'; this.cv.style.height = alto + 'px';
    this.x = this.cv.getContext('2d'); let s = semilla * 9301 + 49297; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    this.p = Array.from({ length: n }, () => ({ x: r() * this.w, y: r() * this.h, r: (tam[0] + r() * (tam[1] - tam[0])) / 2, c: colores[Math.floor(r() * colores.length)], v: 4 + r() * 10, f: r() * 6.28, a: .12 + r() * .25 }));
  }
  pintar(t, o = 1, { x = W / 2, y = H / 2 } = {}) {
    if (!(o > .002)) { off(this.cv); return; }
    const c = this.x; c.clearRect(0, 0, this.w, this.h);
    for (const p of this.p) {
      const yy = ((p.y - p.v * t) % (this.h + 100) + this.h + 100) % (this.h + 100) - 50, xx = p.x + 12 * Math.sin(t * .4 + p.f);
      const g = c.createRadialGradient(xx, yy, 0, xx, yy, p.r);
      g.addColorStop(0, p.c); g.addColorStop(.7, p.c); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.globalAlpha = p.a * (.7 + .3 * Math.sin(t * 1.3 + p.f)); c.fillStyle = g; c.beginPath(); c.arc(xx, yy, p.r, 0, 6.283); c.fill();
    }
    c.globalAlpha = 1; put(this.cv, { x, y, o });
  }
}
/* brillo que se suma (foco, pantalla, lampara) */
function luz(padre, color = '#ffe7a0', z = 8, tam = 1000) {
  const el = mk('div', `L z${z}`, padre); el.style.width = tam + 'px'; el.style.height = tam + 'px'; el.style.borderRadius = '50%';
  el.style.background = `radial-gradient(closest-side, ${color}, transparent)`; el.style.mixBlendMode = 'screen'; el.style.pointerEvents = 'none';
  return el;
}
/* etalonaje: capa de color que tine lo de abajo (multiply = noche, soft-light = calido) */
function etalonaje(padre, color, modo = 'multiply', z = 9) {
  const el = mk('div', `L z${z}`, padre); el.style.width = W + 'px'; el.style.height = H + 'px'; el.style.background = color; el.style.mixBlendMode = modo; el.style.pointerEvents = 'none';
  return el;
}
const vineta = (padre, fuerza = .72, z = 9) => dEl(padre, '', `<div style="width:${W}px;height:${H}px;background:radial-gradient(ellipse 72% 58% at 50% 48%,transparent 50%,rgba(0,0,8,${fuerza}))"></div>`, z);
/* golpe de camara: [dx, dy] que se apagan en dur segundos */
const sacudon = (t, t0, amp = 14, dur = .35) => { const k = (t - t0) / dur; if (k < 0 || k > 1) return [0, 0]; const a = amp * (1 - k) * (1 - k); return [a * Math.sin(t * 90), a * Math.cos(t * 77)]; };
const sacudones = (t, lista) => lista.reduce((acc, [t0, amp, dur]) => { const [x, y] = sacudon(t, t0, amp, dur); return [acc[0] + x, acc[1] + y]; }, [0, 0]);
/* «de a dos»: el tiempo de los personajes avanza a 15 cuadros por segundo (como los dibujos animados) */
const deADos = t => Math.floor(t * 15) / 15;

/* ---------- caras: ojos con brillo, parpados del color del objeto, ceno y bocas ----------
   cara(el, t, { mira: [-1..1, -1..1], boca: feliz|euforia|triste|seria|o|mueca, cierre: 0..1, ceno: -1..1, semilla }) */
const BOCAS_OBJ = { feliz: ['M-28 -4 Q0 28 28 -4 Q0 8 -28 -4 Z', 1], euforia: ['M-32 -8 Q0 46 32 -8 Q0 0 -32 -8 Z', 1], triste: ['M-22 14 Q0 -8 22 14', 0],
  seria: ['M-18 6 Q0 3 18 6', 0], o: ['M-11 4 a11 13 0 1 0 22 0 a11 13 0 1 0 -22 0 Z', 1], mueca: ['M-24 6 Q-10 -4 0 6 Q10 16 24 4', 0],
  grito: ['M-26 -10 Q0 -16 26 -10 Q30 30 0 38 Q-30 30 -26 -10 Z', 1], dientes: ['M-30 -6 Q0 2 30 -6 Q26 22 0 24 Q-26 22 -30 -6 Z', 2] };
function dOjos(color, { x = 0, y = 0, e = 1, sep = 46 } = {}) {
  const ojo = lado => { const id = dId('cj');
    return `<g transform="translate(${lado === 'I' ? -sep : sep} 0)"><clipPath id="${id}"><ellipse rx="21" ry="25"/></clipPath>
      <ellipse rx="21" ry="25" fill="#fff"/><g class="pu"><circle r="11.5" fill="#17120e"/><circle cx="-4" cy="-5" r="4" fill="#fff"/></g>
      <g clip-path="url(#${id})"><g class="pa" data-l="${lado}"><rect x="-30" y="-34" width="60" height="6" fill="${color}"/></g></g>
      <ellipse rx="21" ry="25" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="3.5"/></g>`; };
  return `<g class="ojos" transform="translate(${x} ${y}) scale(${e})">${ojo('I')}${ojo('D')}</g>`;
}
const dBoca = (x, y, e = 1) => `<g transform="translate(${x} ${y}) scale(${e})"><path class="boca" d="${BOCAS_OBJ.feliz[0]}" fill="#4a1616" stroke="#17120e" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path class="dien" d="M-22 -2 Q0 4 22 -2 L20 6 Q0 10 -20 6 Z" fill="#fff" opacity="0"/></g>`;
function dCarita(color, { x = 0, y = 0, e = 1, sep = 46 } = {}) {
  return `<g class="cara" transform="translate(${x} ${y}) scale(${e})">${dOjos(color, { sep })}${dBoca(0, 34)}</g>`;
}
function cara(el, t, { mira = [0, 0], boca = 'feliz', cierre = 0, ceno = 0, semilla = 0 } = {}) {
  const c = el._cara || (el._cara = { pu: [...el.querySelectorAll('.pu')], pa: [...el.querySelectorAll('.pa')], bo: el.querySelector('.boca'), di: el.querySelector('.dien'), b: '' });
  const ph = (t + semilla * 1.37) % 3.3, parp = ph < .16 ? Math.sin(Math.PI * ph / .16) : 0, k = Math.max(cierre, parp);
  const pu = `translate(${(mira[0] * 8).toFixed(1)} ${(mira[1] * 9).toFixed(1)})`;
  c.pu.forEach(p => p.setAttribute('transform', pu));
  c.pa.forEach(p => { const izq = p.dataset.l === 'I';
    p.firstElementChild.setAttribute('height', (6 + 56 * k + 16 * Math.abs(ceno) * (1 - k)).toFixed(1));
    p.setAttribute('transform', `rotate(${((izq ? 1 : -1) * ceno * 16).toFixed(1)})`); });
  if (c.bo && c.b !== boca) { c.b = boca; const [d, relleno] = BOCAS_OBJ[boca] || BOCAS_OBJ.feliz; c.bo.setAttribute('d', d); c.bo.setAttribute('fill', relleno ? '#4a1616' : 'none');
    if (c.di) c.di.setAttribute('opacity', relleno === 2 ? '1' : '0'); }
}

/* ---------- objetos chicos ---------- */
const dChispa = (w = 60, c = '#fff5c2') => dSvg('0 0 60 60', w, w, `<path d="M30 0 C33 20 40 27 60 30 C40 33 33 40 30 60 C27 40 20 33 0 30 C20 27 27 20 30 0 Z" fill="${c}" style="filter:drop-shadow(0 0 8px ${c})"/>`);
const dEstrella = (w = 60, c = '#f4c430') => dSvg('0 0 100 100', w, w, `<path d="M50 6 L62 36 L94 38 L69 59 L77 91 L50 73 L23 91 L31 59 L6 38 L38 36 Z" fill="${c}" stroke="rgba(0,0,0,.35)" stroke-width="4" stroke-linejoin="round" style="filter:drop-shadow(0 0 10px rgba(244,196,48,.6))"/>`);
/* tu dinero: moneda de oro con cara (cara(el, t, {...}) la anima) */
function dMoneda(w = 200, { cara: conCara = true, signo = false } = {}) {
  const g = dId('mon');
  return dSvg('-110 -110 220 230', w, w * 230 / 220, `<defs><radialGradient id="${g}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#f2b81f"/><stop offset="1" stop-color="#a86f06"/></radialGradient></defs>
    ${dSombra(0, 112, 70, 12, .45)}<circle r="100" fill="#9c6c06"/><circle r="94" fill="url(#${g})"/><circle r="78" fill="none" stroke="#c48a0b" stroke-width="6"/>
    <path d="M-62 -48 A78 78 0 0 1 18 -76" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="10" stroke-linecap="round"/>
    ${signo ? `<text y="34" text-anchor="middle" fill="#a86f06" style="font:400 120px 'Bebas Neue'">$</text>` : ''}
    ${conCara ? dCarita('#e0a80f', { y: -6, e: .8, sep: 40 }) : ''}`);
}
/* boton de arcade sobre un pedestal (.tapa baja al pulsarlo): COMPRAR / VENDER */
function dBoton(texto, c = ['#5ff2c0', '#22d39a', '#0b875d'], w = 260) {
  const g = dId('bt'), p = dId('bp');
  return dSvg('-130 -170 260 330', w, w * 330 / 260, `<defs>${dGrad(g, [[0, c[0]], [.5, c[1]], [1, c[2]]])}${dGrad(p, [[0, '#2a3146'], [1, '#121725']])}</defs>
    ${dSombra(0, 156, 120, 16, .5)}
    <path d="M-92 20 L92 20 L110 150 L-110 150 Z" fill="url(#${p})"/><rect x="-118" y="132" width="236" height="22" rx="8" fill="#0c101b"/>
    <rect x="-80" y="58" width="160" height="44" rx="10" fill="#0b0f1a" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
    <text y="90" text-anchor="middle" fill="${c[0]}" style="font:400 34px 'Bebas Neue';letter-spacing:.08em">${texto}</text>
    <ellipse cx="0" cy="18" rx="100" ry="28" fill="#0c101b"/>
    <g class="tapa"><ellipse cx="0" cy="8" rx="84" ry="26" fill="${c[2]}"/><rect x="-84" y="-30" width="168" height="38" fill="${c[2]}"/>
      <ellipse cx="0" cy="-30" rx="84" ry="26" fill="url(#${g})"/><ellipse cx="-24" cy="-38" rx="34" ry="9" fill="rgba(255,255,255,.45)"/></g>`);
}
/* lupa (.vidrio) */
function dLupa(w = 200) {
  const g = dId('lup');
  return dSvg('0 0 200 200', w, w, `<defs><radialGradient id="${g}" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="rgba(255,255,255,.45)"/><stop offset="1" stop-color="rgba(160,220,255,.08)"/></radialGradient></defs>
  <rect x="118" y="112" width="26" height="78" rx="12" fill="#2b2f36" transform="rotate(-45 131 151)"/>
  <circle class="vidrio" cx="82" cy="82" r="58" fill="url(#${g})" stroke="#dfe4ea" stroke-width="14"/>
  <path d="M52 66 C58 50 72 42 88 42" stroke="rgba(255,255,255,.85)" stroke-width="8" fill="none" stroke-linecap="round"/>`);
}
/* gota de sudor */
const dGota = (w = 34) => dSvg('-20 -30 40 52', w, w * 52 / 40, `<path d="M0 -28 Q16 -2 14 8 A14 14 0 1 1 -14 8 Q-16 -2 0 -28 Z" fill="#9fd8ff" stroke="#3d7fb8" stroke-width="3"/><ellipse cx="-5" cy="6" rx="4" ry="6" fill="rgba(255,255,255,.7)"/>`);
/* corona dorada */
const dCorona = (w = 120) => dSvg('-60 -50 120 90', w, w * 90 / 120, `<path d="M-52 30 L-56 -30 L-26 -2 L0 -44 L26 -2 L56 -30 L52 30 Z" fill="#f4c430" stroke="#a8801c" stroke-width="5" stroke-linejoin="round"/>
  <rect x="-54" y="26" width="108" height="16" rx="5" fill="#d9a520"/>${[-30, 0, 30].map(x => `<circle cx="${x}" cy="34" r="5" fill="#fff4c2"/>`).join('')}`);
/* sello de goma (texto con borde, girado) */
const dSello = (texto, color = '#ff4d6a') => `<span style="display:inline-block;padding:8px 22px 4px;border:6px solid ${color};border-radius:14px;font:400 64px/1 'Bebas Neue',sans-serif;letter-spacing:.08em;color:${color};
  background:rgba(14,8,10,.55);transform:rotate(-8deg);white-space:nowrap;box-shadow:0 0 30px ${color}66">${texto}</span>`;
function dMonedita(w = 74) {
  const g = dId('mni');
  return dSvg('-40 -40 80 84', w, w * 84 / 80, `<defs><radialGradient id="${g}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0a8"/><stop offset=".55" stop-color="#f2b81f"/><stop offset="1" stop-color="#a86f06"/></radialGradient></defs>
    <circle r="36" fill="#9c6c06"/><circle r="33" fill="url(#${g})"/><text y="13" text-anchor="middle" fill="#a86f06" style="font:400 40px 'Bebas Neue'">$</text>`);
}

/* =====================================================================
   LUCHADORES: el Toro (vela verde, compra) y el Oso (vela roja, vende)
   Coordenadas del dibujo: (0,0) = el piso entre los pies, mirando hacia +x (flip: true lo da vuelta). El cuerpo es la
   vela (y -445 a -105) con su mecha arriba; brazos y piernas de goma; manos: guantes (toro) o zarpas con garras (oso).
   pose = { dy, rot, bI, bD, pI, pD }: salto, inclinacion y la posicion de cada mano y pie.
   ===================================================================== */
const POSES_L = {
  guardia:  { dy: 0, rot: 0, bI: [-112, -388], bD: [138, -378], pI: [-64, 0], pD: [78, 0] },
  golpe:    { dy: 0, rot: 7, bI: [-108, -392], bD: [352, -350], pI: [-78, 0], pD: [104, 0] },
  gancho:   { dy: 0, rot: 4, bI: [262, -416], bD: [146, -396], pI: [-64, 0], pD: [84, 0] },
  parado:   { dy: 0, rot: 0, bI: [-156, -196], bD: [156, -196], pI: [-58, 0], pD: [58, 0] },
  festeja:  { dy: -46, rot: 0, bI: [-178, -566], bD: [178, -566], pI: [-72, -12], pD: [72, -12] },
  cuernos:  { dy: -18, rot: -12, bI: [-166, -246], bD: [164, -246], pI: [-58, 0], pD: [72, 0] },
  agacha:   { dy: 24, rot: 10, bI: [-158, -226], bD: [170, -268], pI: [-74, 0], pD: [92, 0] },
  zarpaArr: { dy: -12, rot: -8, bI: [-140, -300], bD: [120, -640], pI: [-62, 0], pD: [74, 0] },
  zarpaAba: { dy: 8, rot: 12, bI: [-140, -300], bD: [330, -150], pI: [-62, 0], pD: [86, 0] },
  susto:    { dy: -96, rot: -10, bI: [-196, -520], bD: [196, -520], pI: [-96, -34], pD: [96, -46] },
  carga:    { dy: 0, rot: 18, bI: [-40, -320], bD: [190, -300], pI: [-70, 0], pD: [92, 0] },
  cansado:  { dy: 18, rot: 4, bI: [-150, -150], bD: [150, -150], pI: [-70, 0], pD: [70, 0] },
  sentado:  { dy: 84, rot: -5, bI: [-168, -150], bD: [158, -150], pI: [70, -6], pD: [156, -6] },
  pulsa:    { dy: 6, rot: -8, bI: [-282, -180], bD: [140, -360], pI: [-70, 0], pD: [74, 0] },
  empuja:   { dy: -8, rot: 2, bI: [20, -600], bD: [90, -600], pI: [-64, 0], pD: [74, 0] },
  presiona: { dy: 20, rot: 10, bI: [110, -500], bD: [180, -500], pI: [-74, 0], pD: [92, 0] },
  zarpaFin: { dy: 10, rot: 12, bI: [-140, -300], bD: [112, -228], pI: [-62, 0], pD: [86, 0] },
};
/* tramos [[t, 'pose', dur?], ...]: cada cambio dura dur (.22 s) con rebote */
function poseL(t, tramos) {
  let a = POSES_L[tramos[0][1]], b = a, k = 1;
  for (let i = 1; i < tramos.length; i++) {
    const [t0, n, d = .22] = tramos[i];
    if (t >= t0) { a = POSES_L[tramos[i - 1][1]]; b = POSES_L[n]; k = E.back(clamp((t - t0) / d)); }
  }
  if (b === a) return a;
  const L = (x, y) => lerp(x, y, k), LL = (x, y) => [L(x[0], y[0]), L(x[1], y[1])];
  return { dy: L(a.dy, b.dy), rot: L(a.rot, b.rot), bI: LL(a.bI, b.bI), bD: LL(a.bD, b.bD), pI: LL(a.pI, b.pI), pD: LL(a.pD, b.pD) };
}
class Luchador {
  constructor(padre, tipo = 'toro', { z = 6, semilla = 1 } = {}) {
    this.tipo = tipo; this.seed = semilla;
    const T = tipo === 'toro';
    const C = this.C = T ? { c0: '#7ff7cc', c1: '#22d39a', c2: '#0b875d', lim: '#0d6f4c', osc: '#053b28', hoc: '#c8f6e1', par: '#1fc28e' }
      : { c0: '#ffadbd', c1: '#ff4d6a', c2: '#b81c40', lim: '#9b1634', osc: '#4a0918', hoc: '#ffd9d1', par: '#f2445f' };
    const g = dId('lg'), h = dId('lh'), m = dId('lm'), sn = dId('ls');
    const cuernos = `<g class="cuernos">${[1, -1].map(s => `<g transform="scale(${s} 1)">
        <path d="M-104 -404 C-158 -414 -196 -470 -184 -566 C-168 -512 -134 -476 -76 -448 Z" fill="url(#${h})" stroke="#a5813a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M-124 -412 C-128 -424 -116 -440 -104 -446" fill="none" stroke="rgba(165,129,58,.75)" stroke-width="5" stroke-linecap="round"/>
        <path d="M-146 -432 C-150 -446 -140 -462 -128 -466" fill="none" stroke="rgba(165,129,58,.6)" stroke-width="4" stroke-linecap="round"/></g>`).join('')}</g>`;
    const orejasOso = [1, -1].map(s => `<g transform="scale(${s} 1)"><circle cx="-90" cy="-436" r="46" fill="${C.c2}"/><circle cx="-90" cy="-436" r="25" fill="#ffb8c6"/></g>`).join('');
    const orejasToro = [1, -1].map(s => `<g transform="scale(${s} 1)"><path d="M-110 -398 Q-176 -414 -194 -368 Q-152 -352 -110 -366 Z" fill="${C.c2}"/>
        <path d="M-118 -390 Q-164 -398 -176 -372 Q-148 -366 -118 -374 Z" fill="#ff9fb3" opacity=".7"/></g>`).join('');
    const hocico = T ? `<ellipse cx="0" cy="-258" rx="88" ry="52" fill="url(#${sn})"/>
        <ellipse cx="-30" cy="-264" rx="10" ry="14" fill="${C.osc}"/><ellipse cx="30" cy="-264" rx="10" ry="14" fill="${C.osc}"/>
        <ellipse cx="-36" cy="-282" rx="22" ry="8" fill="rgba(255,255,255,.35)"/>
        <circle class="aro" cx="0" cy="-221" r="15" fill="none" stroke="#f4c430" stroke-width="7"/>`
      : `<ellipse cx="0" cy="-262" rx="72" ry="52" fill="url(#${sn})"/>
        <path d="M-24 -300 Q0 -312 24 -300 Q18 -278 0 -273 Q-18 -278 -24 -300 Z" fill="#2a1418"/><ellipse cx="-8" cy="-302" rx="7" ry="4" fill="rgba(255,255,255,.55)"/>`;
    const mano = T ? `<g class="mano"><ellipse cx="10" cy="0" rx="44" ry="38" fill="url(#${m})"/><ellipse cx="2" cy="-30" rx="18" ry="12" fill="${C.c1}"/>
        <ellipse cx="22" cy="-10" rx="16" ry="9" fill="rgba(255,255,255,.35)"/><rect x="-40" y="-26" width="20" height="52" rx="9" fill="#f4f1ea"/></g>`
      : `<g class="mano"><circle r="36" fill="url(#${m})"/>${[-18, 0, 18].map(y => `<path d="M26 ${y - 7} Q50 ${y - 4} 58 ${y + 3} Q44 ${y + 6} 26 ${y + 7} Z" fill="#fff6ee" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`).join('')}
        <circle cx="-8" cy="-12" r="9" fill="rgba(255,255,255,.25)"/></g>`;
    const pie = T ? `<g class="pie"><path d="M-34 0 Q-36 -30 0 -30 Q36 -30 40 0 Z" fill="#2c3138"/><path d="M4 -28 L4 0" stroke="#111418" stroke-width="5"/><rect x="-36" y="-4" width="78" height="8" rx="4" fill="#1b1e23"/></g>`
      : `<g class="pie"><ellipse cx="4" cy="-14" rx="40" ry="20" fill="${C.lim}"/>${[-18, 2, 22].map(x => `<circle cx="${x}" cy="-26" r="8" fill="#ffb8c6"/>`).join('')}</g>`;
    this.el = mk('div', `L z${z}`, padre, `<svg viewBox="-280 -660 560 680" width="560" height="680" style="display:block;overflow:visible">
      <defs>${dGrad(g, [[0, C.c0], [.42, C.c1], [1, C.c2]], .4, 1)}${dGrad(h, [[0, '#fffaf0'], [.55, '#f1ddb0'], [1, '#c8a45c']], 1, 1)}
        ${dRadial(m, [[0, C.c1], [1, C.lim]], .35, .3, .75)}${dGrad(sn, [[0, '#ffffff'], [1, C.hoc]])}</defs>
      <ellipse class="sombra" cx="0" cy="8" rx="150" ry="22" fill="rgba(0,0,0,.45)" style="filter:blur(7px)"/>
      <g class="raiz">
        ${['pI', 'pD'].map(c => `<g class="${c}"><path class="pierna" fill="none" stroke="${C.lim}" stroke-width="32" stroke-linecap="round"/>${pie}</g>`).join('')}
        <g class="cuerpo">
          ${T ? cuernos : orejasOso}
          <line x1="0" y1="-440" x2="0" y2="-512" stroke="${C.osc}" stroke-width="12" stroke-linecap="round"/>
          <rect x="-118" y="-446" width="236" height="342" rx="56" fill="url(#${g})"/>
          <rect x="-118" y="-446" width="236" height="342" rx="56" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="4"/>
          <path d="M-90 -414 Q-104 -300 -94 -170" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="15" stroke-linecap="round"/>
          <path d="M96 -200 Q104 -150 80 -118" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="12" stroke-linecap="round"/>
          ${T ? orejasToro : ''}
          <ellipse cx="-80" cy="-300" rx="22" ry="12" fill="rgba(255,120,150,.32)"/><ellipse cx="80" cy="-300" rx="22" ry="12" fill="rgba(255,120,150,.32)"/>
          ${dOjos(C.par, { y: -352, e: 1.16, sep: 46 })}
          <path class="cjI" d="M-84 -404 Q-56 -420 -28 -408" fill="none" stroke="${C.osc}" stroke-width="13" stroke-linecap="round"/>
          <path class="cjD" d="M28 -408 Q56 -420 84 -404" fill="none" stroke="${C.osc}" stroke-width="13" stroke-linecap="round"/>
          ${hocico}
          ${T ? dBoca(0, -186, .9) : dBoca(0, -246, .74)}
        </g>
        ${['bI', 'bD'].map(c => `<g class="${c}"><path class="brazo" fill="none" stroke="${C.lim}" stroke-width="28" stroke-linecap="round"/>${mano}</g>`).join('')}
      </g></svg>`);
    const q = s => this.el.querySelector(s);
    this.r = { raiz: q('.raiz'), cuerpo: q('.cuerpo'), sombra: q('.sombra'), cI: q('.cjI'), cD: q('.cjD'),
      ext: ['bI', 'bD', 'pI', 'pD'].map(c => { const gg = q('.' + c); return { c, p: gg.querySelector('.brazo,.pierna'), m: gg.querySelector('.mano,.pie') }; }) };
  }
  /* (x, y) = el piso entre los pies en la capa padre · corre: 0..1 mezcla un ciclo de carrera (fase en radianes) */
  pintar(t, { x = CX, y = 1300, s = 1, flip = false, o = 1, b = 0, r = 0, br = 1, pose = POSES_L.guardia, mira = [0, 0], boca = 'seria', ceno = 0, cierre = 0,
    corre = 0, fase = 0, rebote = 1, aplasta = 0 } = {}) {
    if (!(o > .002)) { off(this.el); return; }
    const R = this.r, sd = this.seed;
    let { dy, rot, bI, bD, pI, pD } = pose;
    dy += -Math.abs(Math.sin(t * 5.2 + sd)) * 10 * rebote;                     // saltito de boxeador
    if (corre > 0) {
      const sI = Math.sin(fase), cI = Math.cos(fase);
      pI = [lerp(pI[0], -40 + 92 * sI, corre), lerp(pI[1], -Math.max(0, 62 * cI), corre)];
      pD = [lerp(pD[0], 46 - 92 * sI, corre), lerp(pD[1], -Math.max(0, -62 * cI), corre)];
      dy -= Math.abs(Math.sin(fase)) * 26 * corre;
      bI = [lerp(bI[0], -30 - 80 * sI, corre), bI[1]]; bD = [lerp(bD[0], 170 + 80 * sI, corre), bD[1]];
    }
    R.raiz.setAttribute('transform', `translate(0 ${dy.toFixed(1)}) rotate(${rot.toFixed(2)} 0 -110)`);
    // aplastarse / estirarse (golpes): el cuerpo se ensancha y baja desde los pies
    R.cuerpo.setAttribute('transform', aplasta ? `translate(0 -110) scale(${(1 + .14 * aplasta).toFixed(3)} ${(1 - .14 * aplasta).toFixed(3)}) translate(0 110)` : '');
    const sh = [[-112, -318], [112, -318]], cad = [[-56, -112], [56, -112]];
    R.ext.forEach((e, i) => {
      const brazo = i < 2, [x0, y0] = brazo ? sh[i] : cad[i - 2], [x1, y1] = [bI, bD, pI, pD][i];
      const dx = x1 - x0, dy2 = y1 - y0, L = Math.hypot(dx, dy2) || 1;
      let nx = -dy2 / L, ny = dx / L; if (ny < 0) { nx = -nx; ny = -ny; }                // el codo/rodilla cae hacia abajo
      const doble = brazo ? 30 * clamp(1 - L / 260) + 10 : 8 * (i === 2 ? -1 : 1);
      const cx = (x0 + x1) / 2 + nx * doble, cy = (y0 + y1) / 2 + ny * doble;
      e.p.setAttribute('d', `M${x0} ${y0} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
      const ang = Math.atan2(y1 - cy, x1 - cx) * 180 / Math.PI;
      e.m.setAttribute('transform', brazo ? `translate(${x1.toFixed(1)} ${y1.toFixed(1)}) rotate(${ang.toFixed(1)})` : `translate(${x1.toFixed(1)} ${y1.toFixed(1)})`);
    });
    cara(this.el, t, { mira, boca, cierre, ceno, semilla: sd });
    const ca = ceno * 20, cy = ceno > 0 ? 6 * ceno : -10 * -ceno;
    R.cI.setAttribute('transform', `translate(0 ${cy.toFixed(1)}) rotate(${ca.toFixed(1)} -56 -410)`);
    R.cD.setAttribute('transform', `translate(0 ${cy.toFixed(1)}) rotate(${(-ca).toFixed(1)} 56 -410)`);
    R.sombra.setAttribute('transform', `scale(${(1 - clamp(-dy / 300) * .5).toFixed(3)} 1)`);
    put(this.el, { x, y, s, sx: flip ? -1 : 1, o, b, r, br, ax: 50, ay: 660 / 680 * 100 });
  }
  /* un punto del dibujo (local) en la capa padre, con la misma colocacion que pintar */
  punto([lx, ly], { x = CX, y = 1300, s = 1, flip = false } = {}) { return [x + (flip ? -lx : lx) * s, y + ly * s]; }
}

/* =====================================================================
   SUBTITULOS VIRALES (arriba): palabra por palabra; dichas en gris, la ultima en blanco y negrita; las claves con
   caja dorada de seleccion. resaltar = [[frase, 'palabra'], ...] (palabra sin tildes).
   ===================================================================== */
css(`.subv{width:980px;text-align:center;font:500 64px/1.18 'Outfit',sans-serif;letter-spacing:-.012em;color:#fff;text-shadow:0 3px 16px rgba(0,0,0,.75)}
.subv .w{display:inline-block;position:relative;height:1.18em;margin:0 .12em;vertical-align:top;opacity:0}
.subv .w i{display:block;height:0;overflow:hidden;visibility:hidden;font-style:normal;font-weight:700;white-space:nowrap}
.subv .w b{position:absolute;left:0;right:0;top:0;text-align:center;font-weight:500;color:rgba(255,255,255,.52);white-space:nowrap}
.subv .w.ult b,.subv .w.res b{font-weight:700;color:#fff}
.subv .caja{position:absolute;left:-.15em;right:-.15em;top:.04em;bottom:.02em;border:3px solid #f4c430;border-radius:7px;background:rgba(244,196,48,.14);
  box-shadow:0 0 22px rgba(244,196,48,.38);opacity:0;transform-origin:50% 50%}
.subv .caja::before,.subv .caja::after{content:'';position:absolute;width:15px;height:15px;border-radius:50%;background:#f4c430;border:3px solid #0d0a06}
.subv .caja::before{left:-10px;top:-10px}.subv .caja::after{right:-10px;bottom:-10px}`);
class SubViral {
  constructor({ y = 360, resaltar = [], ocultar = null, sonido = true } = {}) {
    this.y = y; this.ocultar = ocultar; this.res = new Set(resaltar.map(([f, p]) => f + '|' + nrm(p))); this.G = null;
    NECESITA.palabras = true;                                           // el motor carga trabajo/tiempos.json antes del primer cuadro
    if (sonido) resaltar.forEach(([f, p]) => { const x = PALS.find(q => q[0] === f && q[1] === nrm(p)); if (x) sfx(x[2] + .02, 'tick-suave', { vol: .32 }); });
  }
  armar() {
    const G = []; let g = null, prev = '';
    for (const p of PALABRAS) {
      const tx = String(p.w || '').replace(/\{[^}]*\}/g, ''); if (!tx) continue;
      const corta = !g || g.f !== p.frase || g.pal.length >= 5 || g.ch + tx.length > 28 || /[.:;?!»]$/.test(prev) || (/,$/.test(prev) && g.pal.length >= 2);
      if (corta) { g = { f: p.frase, pal: [], ch: 0 }; G.push(g); }
      g.pal.push({ s: p.s, e: p.e, tx, res: this.res.has(p.frase + '|' + nrm(tx)) }); g.ch += tx.length + 1; prev = tx;
    }
    G.forEach((g, i) => {
      g.el = mk('div', 'L subv', STAGE); g.el.style.zIndex = 65;
      g.el.innerHTML = g.pal.map(p => `<span class="w${p.res ? ' res' : ''}"><i>${p.tx}</i><b>${p.tx}</b>${p.res ? '<span class="caja"></span>' : ''}</span>`).join(' ');
      g.ws = [...g.el.querySelectorAll('.w')]; g.t0 = g.pal[0].s - .05;
      const sig = G[i + 1], fin = g.pal[g.pal.length - 1].e + 1.2;
      g.t1 = sig ? Math.min(sig.pal[0].s - .05, fin) : fin;
    });
    this.G = G;
  }
  pintar(t) {
    if (!this.G) { if (!PALABRAS.length) return; this.armar(); }
    const oc = this.ocultar && this.ocultar(t);
    for (const g of this.G) {
      if (oc || t < g.t0 || t >= g.t1) { if (g._v !== 0) { off(g.el); g._v = 0; } continue; }
      g._v = 1;
      put(g.el, { x: CX, y: this.y, o: 1 - P(t, g.t1 - .1, .1, E.lin) });
      let ult = -1; g.pal.forEach((p, k) => { if (t >= p.s - .03) ult = k; });
      g.ws.forEach((w, k) => {
        const p = g.pal[k], a = P(t, p.s - .03, .14, E.out3), b = p.res ? P(t, p.s + .02, .22, E.back) : 0;
        const est = `${a.toFixed(3)}|${b.toFixed(3)}|${k === ult ? 1 : 0}`;
        if (w._e === est) return; w._e = est;
        w.style.opacity = a.toFixed(3); w.style.transform = `translateY(${((1 - a) * 12).toFixed(1)}px)`;
        w.style.filter = a < .99 ? `blur(${((1 - a) * 7).toFixed(1)}px)` : 'none';
        w.classList.toggle('ult', k === ult);
        if (p.res) { const c = w.querySelector('.caja'); c.style.opacity = clamp(b * 2).toFixed(3); c.style.transform = `scale(${lerp(.7, 1, b).toFixed(3)})`; }
      });
    }
  }
}

/* =====================================================================
   CIERRE del formato cine: fondo dorado con rayos y confeti, la caja de comentario que escribe TRADING y el aviso de
   riesgo. Cada reel pinta sus personajes alrededor con personajes(t, k) (k = progreso de entrada 0..1).
   ===================================================================== */
function ctaCine({ a, tEscribe, tEnvia, palabra = 'TRADING', personajes = () => {}, yCaja = 1000, aviso = 'El trading conlleva riesgo · Contenido educativo' }) {
  const PL = new Plano(6);
  const fon = dEl(PL.el, '', `<div style="width:${W}px;height:${H}px;background:radial-gradient(ellipse 85% 55% at 50% 50%,#33260c,#120d06 58%,#050403)"></div>`, 1);
  const ray = dEl(PL.el, '', '<div style="width:2400px;height:2400px;border-radius:50%;background:repeating-conic-gradient(rgba(244,196,48,.12) 0 7deg,rgba(244,196,48,0) 7deg 18deg);-webkit-mask:radial-gradient(closest-side,#000 30%,transparent)"></div>', 2);
  const bok = new Bokeh(PL.el, { colores: ['#f4c430', '#fff1c2', '#ffd36b'], z: 3, semilla: 21, n: 22 });
  const CON = Array.from({ length: 28 }, (_, i) => dEl(PL.el, '', `<div style="width:${12 + (i % 3) * 5}px;height:${20 + (i % 4) * 6}px;border-radius:3px;background:${['#f4c430', '#22d39a', '#ff4d6a', '#fff1c2'][i % 4]}"></div>`, 6));
  const av = dEl(PL.el, 'aviso', aviso, 8);
  const com = new Comentario({ palabra, etiqueta: 'COMENTA', marcador: 'Añade un comentario…', t0: a + .15, tEscribe, tEnvia, textoEnviado: '✓ Te envío la información', ancho: 880, padre: PL.el, z: 'z7' });
  return { PL, pintar(t) {
    if (t < a - .4) { off(PL.el); return; }
    const k = P(t, a - .35, .7, E.out3);
    PL.ver({ s: lerp(1.15, 1, k) * (1 + .015 * Math.sin(t * .8)), o: clamp(k * 1.6), b: (1 - k) * 8 });
    iris(PL.el, P(t, a - .35, .6, E.io3), CX, yCaja);
    put(fon, { x: CX, y: CY }); put(ray, { x: CX, y: yCaja, r: t * 6, o: .9 }); bok.pintar(t, .8);
    com.pintar(t, { x: CX, y: yCaja, rx: 4 });
    ent(av, t, a + .5, CX, 1508, { dy: 10 });
    CON.forEach((c, i) => { const t0 = tEnvia + .02 + (i % 7) * .025, kk = (t - t0) / 1.6;
      if (kk > 0 && kk < 1) { const ang = (i / CON.length) * Math.PI * 2 + hashC(i, 1), v = 520 + hashC(i, 2) * 380;
        put(c, { x: CX + Math.cos(ang) * v * kk, y: yCaja - 60 + Math.sin(ang) * v * kk * .7 + 900 * kk * kk, r: kk * 720 * (i % 2 ? 1 : -1), o: 1 - kk * kk }); } else off(c); });
    personajes(t, k);
  } };
}
