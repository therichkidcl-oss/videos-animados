/* =====================================================================
   KIT DE REELS ANIMADOS · FORMATO CINE (26/10/2026)
   Lenguaje de cine que Reimo aprobo el 24/10 (VIDEOS DEVELOPER/docs/ESTILO-CINE.md), adaptado a la serie: personajes
   y objetos con cara, mapa desde arriba, ambientes que la camara recorre y una camara que entra de un plano al
   siguiente. Se carga despues de base.js (usa nrm, tw, ini, finF, ocultar, rng...). Todo es funcion pura de t.
   - Plano: capa de 1080x1920 con camara propia (zoom, paneo, giro y desenfoque cuando se mueve rapido).
   - iris(), atravesar(): transiciones de cine · Bokeh, luz(), etalonaje(), sacudon().
   - Caras: dOjos()/dCarita() + cara(): ojos con brillo, parpados del color del objeto, ceno y 6 bocas.
   - Personajes por nicho en reels/nichos/ (ej. Luchador toro/oso en trading.js): marioneta por partes con poses.
   - dMoneda(): tu dinero, una moneda con cara.
   - SubViral: subtitulos arriba (y 360) palabra por palabra: las dichas en gris, la ultima en blanco y negrita, y las
     claves con caja dorada de seleccion (como en los reels virales que aprobo).
   ===================================================================== */
css(`.z9{z-index:9}.z10{z-index:10}
.tuTag{font:400 46px/1 'Bebas Neue',sans-serif;letter-spacing:.06em;color:${MARCA.tinta};background:linear-gradient(180deg,${MARCA.acentoClaro},${MARCA.acento});padding:9px 18px 5px;
  border-radius:14px;box-shadow:0 10px 26px rgba(0,0,0,.55),0 0 24px rgba(${MARCA.acentoRGB},.45);white-space:nowrap}
.tuTag::after{content:'';position:absolute;left:50%;bottom:-13px;margin-left:-11px;border:11px solid transparent;border-top-color:${MARCA.acento};border-bottom:0}
.cchip{display:flex;align-items:center;gap:12px;height:66px;padding:0 26px 0 20px;border-radius:999px;font:700 30px 'Outfit',sans-serif;white-space:nowrap;
  background:rgba(12,12,18,.84);border:2px solid rgba(255,255,255,.16);color:#fff;box-shadow:0 18px 40px rgba(0,0,0,.5)}
.cchip.v{border-color:rgba(34,211,154,.85);color:#c9ffe9}.cchip.v svg{color:#3fe0aa}
.cchip.r{border-color:rgba(255,77,106,.9);color:#ffd3da}.cchip.r svg{color:#ff6b83}
.cchip.o{border-color:rgba(${MARCA.acentoRGB},.9);color:#fff8e0}.cchip.o svg{color:${MARCA.acento}}
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
   SUBTITULOS VIRALES (arriba): palabra por palabra; dichas en gris, la ultima en blanco y negrita; las claves con
   caja dorada de seleccion. resaltar = [[frase, 'palabra'], ...] (palabra sin tildes).
   ===================================================================== */
css(`.subv{width:980px;text-align:center;font:500 64px/1.18 'Outfit',sans-serif;letter-spacing:-.012em;color:#fff;text-shadow:0 3px 16px rgba(0,0,0,.75)}
.subv .w{display:inline-block;position:relative;height:1.18em;margin:0 .12em;vertical-align:top;opacity:0}
.subv .w i{display:block;height:0;overflow:hidden;visibility:hidden;font-style:normal;font-weight:700;white-space:nowrap}
.subv .w b{position:absolute;left:0;right:0;top:0;text-align:center;font-weight:500;color:rgba(255,255,255,.52);white-space:nowrap}
.subv .w.ult b,.subv .w.res b{font-weight:700;color:#fff}
.subv .caja{position:absolute;left:-.15em;right:-.15em;top:.04em;bottom:.02em;border:3px solid ${MARCA.acento};border-radius:7px;background:rgba(${MARCA.acentoRGB},.14);
  box-shadow:0 0 22px rgba(${MARCA.acentoRGB},.38);opacity:0;transform-origin:50% 50%}
.subv .caja::before,.subv .caja::after{content:'';position:absolute;width:15px;height:15px;border-radius:50%;background:${MARCA.acento};border:3px solid ${MARCA.fondo[0]}}
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
  const fon = dEl(PL.el, '', `<div style="width:${W}px;height:${H}px;background:radial-gradient(ellipse 85% 55% at 50% 50%,${MARCA.ctaFondo[0]},${MARCA.ctaFondo[1]} 58%,${MARCA.ctaFondo[2]})"></div>`, 1);
  const ray = dEl(PL.el, '', '<div style="width:2400px;height:2400px;border-radius:50%;background:repeating-conic-gradient(rgba(${MARCA.acentoRGB},.12) 0 7deg,rgba(${MARCA.acentoRGB},0) 7deg 18deg);-webkit-mask:radial-gradient(closest-side,#000 30%,transparent)"></div>', 2);
  const bok = new Bokeh(PL.el, { colores: [MARCA.acento, '#ffffff', MARCA.acentoClaro], z: 3, semilla: 21, n: 22 });
  const CON = Array.from({ length: 28 }, (_, i) => dEl(PL.el, '', `<div style="width:${12 + (i % 3) * 5}px;height:${20 + (i % 4) * 6}px;border-radius:3px;background:${[MARCA.acento, '#22d39a', '#ff4d6a', '#ffffff'][i % 4]}"></div>`, 6));
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
