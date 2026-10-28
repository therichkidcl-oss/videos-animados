/* =====================================================================
   REEL 09 · TOROS CONTRA OSOS (formato cine)
   f0 gancho: la arena vista desde arriba (mapa) -> la camara se zambulle en el ring -> el Toro y el Oso pelean
      "todo el dia" (el marcador corre las horas) -> tu moneda se pone del lado equivocado -> el Toro la aplasta.
   f1-f2 estaciones con foco: el Toro pulsa COMPRAR y sube la linea del precio con los cuernos; la camara barre hasta el
      Oso, que pulsa VENDER y la hunde de un zarpazo.
   f3 la ronda: en el ring, la vela se forma con la barra que empujan los dos; gana el toro -> verde, gana el oso -> roja.
   f4 la escalera: las velas verdes forman una escalera y el Toro la sube: tendencia alcista.
   f5 el rango: los dos, agotados, miran el precio rebotar entre el techo y el piso.
   f6 la regla: tu moneda pelea contra el toro y sale volando; despues mira quien manda y se sube a su lado.
   f7 cierre: comenta TRADING.
   ===================================================================== */
const RESALTAR = [[0, 'animales'], [0, 'encima'], [1, 'compran'], [1, 'arriba'], [2, 'venden'], [2, 'abajo'], [3, 'ronda'], [3, 'verde'], [3, 'roja'],
  [4, 'escalera'], [4, 'alcista'], [5, 'techo'], [5, 'piso'], [6, 'ganando'], [6, 'manda'], [7, 'trading']];
const SUB = new SubViral({ resaltar: RESALTAR });
PINTAR.push(t => SUB.pintar(t));
const MUESTRA = NF === 1;                                               // proyecto de muestra: solo el gancho

/* ---------- tiempos del gancho ---------- */
const G0 = { mer: tw(0, 'mercado'), hay: tw(0, 'hay'), dos: tw(0, 'dos'), ani: tw(0, 'animales'), pel: tw(0, 'peleando'), todo: tw(0, 'todo'),
  dia: tw(0, 'dia'), y: tw(0, 'y'), te: tw(0, 'te'), pon: tw(0, 'pones'), lado: tw(0, 'lado'), equ: tw(0, 'equivocado'), te2: tw(0, 'te', 2),
  pas: tw(0, 'pasan'), por: tw(0, 'por'), enc: tw(0, 'encima') };
G0.zambulle = G0.pel - .02;                                             // centro del paso de la arena al ring
G0.golpes = [G0.pel + .12, G0.pel + .44, G0.todo + .18, G0.dia + .02];   // quien golpea: toro, oso, toro, oso
G0.carga = G0.pas - .04; G0.aplasta = G0.carga + .33;                   // el toro sale corriendo y pasa por encima de la moneda

/* =====================================================================
   1 · LA ARENA VISTA DESDE ARRIBA (canvas): graderias con publico, flashes, focos que barren y el ring al centro
   ===================================================================== */
const AR = { cv: mk('canvas', 'L z4', WORLDF), tmp: document.createElement('canvas'), base: document.createElement('canvas') };
AR.cv.width = W; AR.cv.height = H; AR.tmp.width = W; AR.tmp.height = H; AR.base.width = 2600; AR.base.height = 2600;
AR.x = AR.cv.getContext('2d'); AR.tx = AR.tmp.getContext('2d');
const RRECT = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
const AR_FLASH = [];
(() => {
  const c = AR.base.getContext('2d'), M = 1300;                       // centro del mundo en el lienzo base
  c.fillStyle = '#04060c'; c.fillRect(0, 0, 2600, 2600);
  c.fillStyle = '#0a0e1a'; RRECT(c, M - 1220, M - 1220, 2440, 2440, 520); c.fill();
  c.strokeStyle = '#1a2236'; c.lineWidth = 10; c.stroke();
  const tonos = ['#3b4670', '#523f63', '#6a5238', '#3d6660', '#6a3f4c', '#7a849c', '#8f7a5c', '#56658e', '#2f3858'], r = rng(91);
  const pasillo = a => [0, 1, 2, 3, 4, 5, 6, 7].some(k => Math.abs(((a - k * Math.PI / 4 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .045);
  for (let k = 0; k < 15; k++) {
    const s = 820 + k * 104, rad = 120 + k * 30;
    c.strokeStyle = 'rgba(10,14,26,.95)'; c.lineWidth = 16; RRECT(c, M - s / 2, M - s / 2, s, s, rad); c.stroke();
    c.strokeStyle = 'rgba(40,52,82,.55)'; c.lineWidth = 2; RRECT(c, M - s / 2 - 22, M - s / 2 - 22, s + 44, s + 44, rad + 22); c.stroke();
    // cabezas del publico a lo largo de la fila
    const per = 4 * s - (8 - 2 * Math.PI) * rad, n = Math.floor(per / 17);
    for (let i = 0; i < n; i++) {
      const u = i / n; let px, py;                                       // punto sobre el rectangulo redondeado (aprox. por lados)
      const L = s - 2 * rad, q = u * 4, lado = Math.floor(q), f = q - lado;
      const ang = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][lado];
      if (f < L / (L + Math.PI * rad / 2)) {
        const d = f * (L + Math.PI * rad / 2);
        px = [M - L / 2 + d, M + s / 2, M + L / 2 - d, M - s / 2][lado]; py = [M - s / 2, M - L / 2 + d, M + s / 2, M + L / 2 - d][lado];
      } else {
        const a = ang + (f - L / (L + Math.PI * rad / 2)) / (1 - L / (L + Math.PI * rad / 2)) * Math.PI / 2;
        const cxr = [M + L / 2, M + L / 2, M - L / 2, M - L / 2][lado], cyr = [M - L / 2, M + L / 2, M + L / 2, M - L / 2][lado];
        px = cxr + Math.cos(a) * rad; py = cyr + Math.sin(a) * rad;
      }
      const a0 = Math.atan2(py - M, px - M);
      if (pasillo(a0)) continue;
      const jx = (r() - .5) * 8, jy = (r() - .5) * 8;
      c.fillStyle = tonos[Math.floor(r() * tonos.length)]; c.beginPath(); c.arc(px + jx, py + jy, 6.6 + r() * 1.8, 0, 6.283); c.fill();
      if (r() < .045) AR_FLASH.push({ x: px + jx - M, y: py + jy - M, f: r() * 6.28, v: 2 + r() * 5, c: r() < .3 ? '255,214,120' : '255,255,255' });
    }
  }
  // pasillos (lineas oscuras hacia afuera)
  c.strokeStyle = 'rgba(4,6,12,.9)'; c.lineWidth = 26;
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; c.beginPath(); c.moveTo(M + Math.cos(a) * 440, M + Math.sin(a) * 440); c.lineTo(M + Math.cos(a) * 1400, M + Math.sin(a) * 1400); c.stroke(); }
  // piso y ring
  c.fillStyle = '#121a30'; RRECT(c, M - 400, M - 400, 800, 800, 60); c.fill();
  const fl = c.createRadialGradient(M, M, 0, M, M, 520); fl.addColorStop(0, 'rgba(255,231,176,.3)'); fl.addColorStop(1, 'rgba(255,231,176,0)');
  c.fillStyle = fl; c.fillRect(M - 520, M - 520, 1040, 1040);
  c.strokeStyle = 'rgba(244,196,48,.3)'; c.lineWidth = 4; RRECT(c, M - 380, M - 380, 760, 760, 50); c.stroke();
  const gl = c.createLinearGradient(M - 230, M - 230, M + 230, M + 230); gl.addColorStop(0, '#3a4f86'); gl.addColorStop(1, '#22305a');
  c.fillStyle = '#0d1426'; c.fillRect(M - 262, M - 262, 524, 524);
  c.fillStyle = gl; c.fillRect(M - 236, M - 236, 472, 472);
  c.strokeStyle = 'rgba(244,196,48,.22)'; c.lineWidth = 5; c.beginPath(); c.arc(M, M, 92, 0, 6.283); c.stroke();
  c.fillStyle = 'rgba(244,196,48,.22)'; c.fillRect(M - 7, M - 60, 14, 120); c.fillRect(M - 26, M - 34, 52, 64);   // una vela dorada en la lona
  [8, 18, 28].forEach((d, i) => { c.strokeStyle = `rgba(250,246,236,${.95 - i * .15})`; c.lineWidth = 6; c.strokeRect(M - 236 - d + 12, M - 236 - d + 12, 472 + 2 * d - 24, 472 + 2 * d - 24); });
  [[-1, -1, '#22d39a'], [1, 1, '#ff4d6a'], [1, -1, '#e9e4d8'], [-1, 1, '#e9e4d8']].forEach(([sx, sy, col]) => {
    c.fillStyle = col; c.beginPath(); c.arc(M + sx * 252, M + sy * 252, 17, 0, 6.283); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 4; c.stroke(); });
})();
/* camara de la arena (mundo: el centro del ring es 0,0) */
const AR_CAM = [[0, { s: .6, fx: 30, fy: 120, r: -18 }], [G0.mer, { s: .66, fx: 20, fy: 80, r: -14 }, E.lin], [G0.dos, { s: .84, fx: 6, fy: 30, r: -8 }, E.io3],
  [G0.ani + .25, { s: 1.12, fx: 0, fy: 0, r: -3 }, E.io3], [G0.zambulle - .35, { s: 1.24, r: -2 }, E.lin]];
function pintarArena(t) {
  const fin = G0.zambulle + .4;
  if (t >= fin) { off(AR.cv); return; }
  let c = camaraEn(t, AR_CAM, { desenfoque: .6 }), o = 1, b = c.b;
  if (t > G0.zambulle - .35) { const z = atravesar(t, G0.zambulle, 0, 0, .7, 6, c.fx, c.fy, c.s).a; c = { ...c, s: z.s, fx: z.fx, fy: z.fy }; o = z.o; b = z.b; }
  const x = AR.x;
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.fillStyle = '#04060c'; x.fillRect(0, 0, W, H);
  x.setTransform(1, 0, 0, 1, CX, CY); x.rotate(c.r * Math.PI / 180); x.scale(c.s, c.s); x.translate(-c.fx, -c.fy);
  x.drawImage(AR.base, -1300, -1300);
  x.globalCompositeOperation = 'lighter';
  // focos que barren las graderias y terminan juntandose en el ring cuando dice "dos animales"
  const junta = P(t, G0.dos - .1, .7, E.io3);
  [[0, 0], [1, 2.1], [2, 4.2]].forEach(([i, f]) => {
    const px = lerp(Math.cos(t * .7 + f) * 760, [-90, 90, 0][i], junta), py = lerp(Math.sin(t * .55 + f * 1.3) * 820, [-20, 20, 0][i], junta);
    const rr = lerp(330, [150, 150, 300][i], junta), col = i === 0 ? '120,255,200' : i === 1 ? '255,140,160' : '255,226,150';
    const g = x.createRadialGradient(px, py, 0, px, py, rr); g.addColorStop(0, `rgba(${col},.42)`); g.addColorStop(.6, `rgba(${col},.12)`); g.addColorStop(1, `rgba(${col},0)`);
    x.fillStyle = g; x.beginPath(); x.arc(px, py, rr, 0, 6.283); x.fill();
  });
  // flashes de telefonos del publico (mas cuando dice "mercado")
  const viva = .45 + .55 * P(t, G0.mer - .1, .5, E.out3);
  for (const f of AR_FLASH) {
    const k = Math.max(0, Math.sin(t * f.v + f.f)); if (k < .82) continue;
    const a = (k - .82) / .18 * viva, g = x.createRadialGradient(f.x, f.y, 0, f.x, f.y, 16);
    g.addColorStop(0, `rgba(${f.c},${a.toFixed(3)})`); g.addColorStop(1, `rgba(${f.c},0)`); x.fillStyle = g; x.fillRect(f.x - 16, f.y - 16, 32, 32);
  }
  // los dos animales vistos desde arriba: aparecen con "dos animales"
  [[-96, -18, '34,211,154', G0.dos + .02, 'toro'], [96, 18, '255,77,106', G0.ani - .02, 'oso']].forEach(([px, py, col, t0, tipo]) => {
    const p = P(t, t0, .45, E.back); if (!(p > 0)) return;
    const g = x.createRadialGradient(px, py, 0, px, py, 120 * p); g.addColorStop(0, `rgba(${col},.55)`); g.addColorStop(1, `rgba(${col},0)`);
    x.fillStyle = g; x.beginPath(); x.arc(px, py, 120 * p, 0, 6.283); x.fill();
    x.globalCompositeOperation = 'source-over';
    x.save(); x.translate(px, py); x.scale(p, p); x.rotate(tipo === 'toro' ? 0 : Math.PI);
    if (tipo === 'toro') { x.fillStyle = '#f1ddb0'; [-1, 1].forEach(s => { x.beginPath(); x.moveTo(s * 18, -22); x.quadraticCurveTo(s * 52, -30, s * 58, -64); x.quadraticCurveTo(s * 40, -40, s * 10, -32); x.fill(); }); }
    else { x.fillStyle = '#b81c40'; [-1, 1].forEach(s => { x.beginPath(); x.arc(s * 26, -26, 15, 0, 6.283); x.fill(); }); }
    x.fillStyle = `rgb(${col})`; x.beginPath(); x.arc(0, 0, 38, 0, 6.283); x.fill();
    x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 4; x.stroke();
    x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.arc(-12, -12, 12, 0, 6.283); x.fill();
    x.restore(); x.globalCompositeOperation = 'lighter';
  });
  x.globalCompositeOperation = 'source-over'; x.setTransform(1, 0, 0, 1, 0, 0);
  // tilt-shift: arriba y abajo desenfocado (miniatura)
  const tx = AR.tx; tx.globalCompositeOperation = 'source-over'; tx.clearRect(0, 0, W, H); tx.filter = 'blur(7px)'; tx.drawImage(AR.cv, 0, 0); tx.filter = 'none';
  const m = tx.createLinearGradient(0, 0, 0, H); m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(.2, 'rgba(0,0,0,0)'); m.addColorStop(.74, 'rgba(0,0,0,0)'); m.addColorStop(1, 'rgba(0,0,0,1)');
  tx.globalCompositeOperation = 'destination-in'; tx.fillStyle = m; tx.fillRect(0, 0, W, H);
  x.drawImage(AR.tmp, 0, 0);
  const v = x.createRadialGradient(CX, CY * .96, 300, CX, CY, 1150); v.addColorStop(0, 'rgba(0,0,8,0)'); v.addColorStop(1, 'rgba(0,0,8,.78)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  put(AR.cv, { x: CX, y: CY, o: o * P(t, 0, .35, E.out3), b });
}
PINTAR.push(pintarArena);

/* =====================================================================
   2 · EL RING DE COSTADO: el Toro y el Oso pelean, el marcador corre las horas, llega tu moneda y el Toro la aplasta
   ===================================================================== */
const RG = new Plano(5);
const SVG_RING = `<svg width="1680" height="1920" viewBox="-300 0 1680 1920" style="display:block">
  <defs>${dGrad('rgP', [[0, '#05070f'], [.3, '#0b1124'], [.62, '#121b36'], [1, '#060912']])}${dGrad('rgL', [[0, '#2a3866'], [1, '#141d38']])}
    <linearGradient id="rgV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cffd0" stop-opacity=".36"/><stop offset="1" stop-color="#7cffd0" stop-opacity="0"/></linearGradient>
    <linearGradient id="rgR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8aa0" stop-opacity=".36"/><stop offset="1" stop-color="#ff8aa0" stop-opacity="0"/></linearGradient></defs>
  <rect x="-300" width="1680" height="1920" fill="url(#rgP)"/>
  ${Array.from({ length: 5 }, (_, f) => Array.from({ length: 23 + f }, (_, i) => {
    const x = -340 + i * (1760 / (22 + f)) + (f % 2) * 30, y = 760 + f * 74, s = .8 + f * .12, tono = ['#0e1428', '#111a33', '#152040', '#18244a', '#1c2a54'][f];
    return `<g transform="translate(${x.toFixed(0)} ${y}) scale(${s.toFixed(2)})"><circle cx="0" cy="-34" r="20" fill="${tono}"/><path d="M-34 30 Q-30 -12 0 -12 Q30 -12 34 30 Z" fill="${tono}"/></g>`; }).join('')).join('')}
  <path d="M120 0 L330 0 L560 1340 L-60 1340 Z" fill="url(#rgV)" style="mix-blend-mode:screen"/>
  <path d="M750 0 L960 0 L1140 1340 L520 1340 Z" fill="url(#rgR)" style="mix-blend-mode:screen"/>
  <path d="M-420 1244 L1500 1244 L1700 1540 L-620 1540 Z" fill="url(#rgL)"/>
  <path d="M-420 1244 L1500 1244" stroke="rgba(255,255,255,.18)" stroke-width="4"/>
  <ellipse cx="540" cy="1370" rx="540" ry="96" fill="rgba(244,196,48,.07)"/>
  <rect x="-300" y="1540" width="1680" height="80" fill="#0b1020"/><rect x="-300" y="1540" width="1680" height="5" fill="rgba(244,196,48,.4)"/>
  ${[934, 1018, 1102].map((y, i) => `<path d="M48 ${y} L1032 ${y}" stroke="rgba(236,232,222,${.78 - i * .1})" stroke-width="7" stroke-linecap="round"/>`).join('')}
  <rect x="26" y="880" width="44" height="390" rx="12" fill="#14b07e"/><rect x="26" y="880" width="12" height="390" rx="6" fill="rgba(255,255,255,.3)"/>
  <rect x="1010" y="880" width="44" height="390" rx="12" fill="#e03a5c"/><rect x="1010" y="880" width="12" height="390" rx="6" fill="rgba(255,255,255,.3)"/></svg>`;
const RG_FON = dEl(RG.el, '', SVG_RING, 2);
/* publico en primer plano (desenfocado, abajo): cabezas y un telefono que graba la pelea */
const SVG_PUB = `<svg width="1500" height="520" viewBox="-210 0 1500 520" style="display:block;overflow:visible">
  ${[[-150, 250, 1.25], [130, 300, 1.45], [470, 330, 1.2], [800, 290, 1.5], [1120, 250, 1.3]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-46" r="62" fill="#04060c"/><path d="M-120 120 Q-110 10 0 4 Q110 10 120 120 Z" fill="#04060c"/><path d="M-40 -96 Q-10 -110 30 -100" stroke="rgba(120,150,220,.35)" stroke-width="10" fill="none" stroke-linecap="round"/></g>`).join('')}
  <g transform="translate(610 70) rotate(-6)"><rect x="-70" y="-120" width="140" height="250" rx="22" fill="#0b0d12" stroke="#2c3240" stroke-width="5"/>
    <rect x="-60" y="-108" width="120" height="226" rx="14" fill="#1a2440"/><circle cx="0" cy="96" r="12" fill="#ff4d6a"/>
    <rect x="-44" y="-40" width="20" height="60" rx="4" fill="#22d39a"/><rect x="-12" y="-70" width="20" height="70" rx="4" fill="#22d39a"/><rect x="20" y="-30" width="20" height="56" rx="4" fill="#ff4d6a"/>
    <path d="M-90 140 Q-70 60 -40 40 L20 60 Q10 110 -20 160 Z" fill="#05070c"/></g></svg>`;
const RG_PUB = dEl(RG.el, '', SVG_PUB, 9);
const RG_BOK = new Bokeh(RG.el, { n: 30, colores: ['#ffffff', '#ffe7a0', '#9ad8ff'], z: 3, semilla: 9, tam: [18, 70], alto: 760 });
/* marcador colgante: TOROS · reloj · OSOS (el reloj corre las horas con "todo el dia") */
css(`.mrc{width:600px;height:150px;border-radius:26px;background:linear-gradient(180deg,#151b2e,#0a0e19);border:3px solid rgba(244,196,48,.55);
  box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 40px rgba(244,196,48,.18);display:flex;align-items:center;justify-content:space-between;padding:0 30px;box-sizing:border-box}
.mrc b{font:400 52px/1 'Bebas Neue',sans-serif;letter-spacing:.05em}.mrc .v{color:#3fe0aa}.mrc .r{color:#ff6b83}
.mrc .rel{display:flex;align-items:center;gap:12px;font:700 46px 'JetBrains Mono',monospace;color:#f4c430;text-shadow:0 0 18px rgba(244,196,48,.6)}
.mrc .ic{width:44px;height:44px;position:relative}.mrc .ic svg{position:absolute;inset:0}`);
const RG_MRC = dEl(RG.el, 'mrc', `<b class="v">TOROS</b><span class="rel"><span class="ic"><svg class="sol" viewBox="0 0 44 44" width="44" height="44"><circle cx="22" cy="22" r="10" fill="#f4c430"/>
  ${Array.from({ length: 8 }, (_, i) => `<rect x="20.5" y="1" width="3" height="8" rx="1.5" fill="#f4c430" transform="rotate(${i * 45} 22 22)"/>`).join('')}</svg>
  <svg class="luna" viewBox="0 0 44 44" width="44" height="44" style="opacity:0"><path d="M30 6 A17 17 0 1 0 38 30 A13 13 0 1 1 30 6 Z" fill="#cfe1ff"/></svg></span><span class="h">09:00</span></span><b class="r">OSOS</b>`, 6);
const RG_CAB = dEl(RG.el, '', '<svg width="600" height="600" style="display:block;overflow:visible"><path d="M120 0 L170 600 M480 0 L430 600" stroke="#2a3350" stroke-width="5"/></svg>', 5);
const RG_HORA = RG_MRC.querySelector('.h'), RG_SOL = RG_MRC.querySelector('.sol'), RG_LUNA = RG_MRC.querySelector('.luna');
/* personajes */
const TORO = new Luchador(RG.el, 'toro', { z: 6, semilla: 1 }), OSO = new Luchador(RG.el, 'oso', { z: 6, semilla: 4 });
const TORO_F = [new Luchador(RG.el, 'toro', { z: 5, semilla: 1 }), new Luchador(RG.el, 'toro', { z: 5, semilla: 1 })];   // estela de la carga
const MON = dEl(RG.el, '', dMoneda(150), 7), TU = dEl(RG.el, 'tuTag', 'TÚ', 8);
const CHIS = [0, 1, 2, 3].map(() => dEl(RG.el, '', dChispa(90), 8));
const VAPOR = [0, 1, 2, 3].map(() => dEl(RG.el, '', '<div style="width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#eef4ff 0,rgba(214,228,255,.8) 45%,rgba(214,228,255,0) 72%)"></div>', 8));
const POLVO = Array.from({ length: 9 }, () => dEl(RG.el, '', '<div style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(190,198,220,.75),rgba(190,198,220,0) 70%)"></div>', 7));
const ESTR = [0, 1, 2].map(() => dEl(RG.el, '', dEstrella(44), 9));
const RAYAS = dEl(RG.el, '', `<svg width="1080" height="400" viewBox="0 0 1080 400" style="display:block">${Array.from({ length: 7 }, (_, i) => `<rect class="ry" x="0" y="${30 + i * 52}" width="300" height="${6 + (i % 3) * 3}" rx="4" fill="rgba(255,255,255,.75)"/>`).join('')}</svg>`, 7);
const RAYAS_R = [...RAYAS.querySelectorAll('.ry')];
const RG_ROPE = dEl(RG.el, '', '<svg width="1200" height="40" style="display:block"><path d="M0 20 L1200 20" stroke="rgba(236,232,222,.85)" stroke-width="12" stroke-linecap="round"/></svg>', 9);
const RG_VIN = vineta(RG.el, .7, 9);
const RG_X = { toro: 370, oso: 712, y: 1352, s: .9 };

/* camara del ring: llega desde adentro de la arena, se acerca a la pelea y sigue la carga */
const RG_CAM = [[G0.zambulle, { s: 1, fx: CX, fy: 1020 }], [G0.y, { s: 1.04, fx: CX, fy: 1040 }, E.lin], [G0.te + .2, { s: 1.12, fx: 560, fy: 1140 }, E.io3],
  [G0.carga, { s: 1.1, fx: 600, fy: 1130 }, E.lin], [G0.aplasta + .1, { s: 1.04, fx: 640, fy: 1110 }, E.io3], [G0.enc + .6, { s: 1.16, fx: 620, fy: 1180 }, E.io3]];
sfx(.04, 'swell', { vol: .6 }); sfx(G0.dos + .02, 'pop', { vol: .5 }); sfx(G0.ani - .02, 'pop', { vol: .5 }); sfx(G0.zambulle - .32, 'barrido', { vol: .7 });
sfx(G0.pel - .06, 'campana', { vol: .75 });
G0.golpes.forEach(g => { sfx(g + .1, 'golpe-corto', { vol: .75 }); });
[0, 1, 2].forEach(i => sfx(G0.todo + .05 + i * .22, 'tick', { vol: .35 }));
sfx(G0.y + .02, 'pop', { vol: .45 }); sfx(G0.te + .05, 'pop', { vol: .45 }); sfx(G0.lado, 'pop', { vol: .45 }); sfx(G0.equ + .1, 'aire-salida', { vol: .5 });
sfx(G0.carga, 'barrido', { vol: .8 }); sfx(G0.aplasta, 'impacto', { vol: .95 }); sfx(G0.aplasta + .02, 'golpe-grave', { vol: .7 }); sfx(G0.enc + .08, 'brillo', { vol: .5 });

function pintarRing(t) {
  const fin = MUESTRA ? CONFIG.dur + 1 : XC(0) + .3;
  if (t < G0.zambulle - .35 || t >= fin) { off(RG.el); return; }
  const z = atravesar(t, G0.zambulle, 0, 0, .7), c = camaraEn(t, RG_CAM, { desenfoque: 4 }), sal = MUESTRA ? null : barrido(t, XC(0));
  const [sx, sy] = sacudones(t, [...G0.golpes.map(g => [g + .1, 7, .2]), [G0.aplasta, 22, .45]]);
  const s = c.s * (t < G0.zambulle + .35 ? z.b.s : 1), o = t < G0.zambulle + .35 ? z.b.o : 1, b = (t < G0.zambulle + .35 ? z.b.b : 0) + c.b + (sal ? sal.a.b : 0);
  const dxs = sal ? sal.a.dx / s : 0;
  if (!RG.ver({ s, fx: c.fx - sx / s - dxs, fy: c.fy - sy / s, o: o * (MUESTRA ? 1 - P(t, CONFIG.dur - .35, .3, E.in3) : 1), b })) return;
  const tp = deADos(t);
  put(RG_FON, { x: CX, y: CY });
  RG_BOK.pintar(t, .9, { x: CX, y: 760 });
  // marcador: el reloj corre de 09:00 a 23:59 mientras dice "todo el dia"
  const sube = P(t, G0.y - .15, .3, E.in2);                             // el marcador se apaga cuando llega tu moneda (no cruza los subtitulos)
  if (sube < 1) { put(RG_CAB, { x: CX, y: 340, o: 1 - sube }); put(RG_MRC, { x: CX, y: 650 + 6 * Math.sin(t * 1.4) - 60 * sube, s: 1 - .12 * sube, r: 1.2 * Math.sin(t * 1.1), o: 1 - sube, b: 6 * sube }); }
  else ocultar(RG_CAB, RG_MRC);
  const kh = P(t, G0.todo - .05, G0.dia + .3 - G0.todo, E.io3), min = Math.round(lerp(9 * 60, 23 * 60 + 59, kh)), hh = String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
  if (RG_HORA._h !== hh) { RG_HORA._h = hh; RG_HORA.textContent = hh; }
  const noche = P(t, G0.dia - .1, .3, E.out3); RG_SOL.style.opacity = (1 - noche).toFixed(3); RG_LUNA.style.opacity = noche.toFixed(3);
  // ---------- el Toro: pelea, se enoja cuando te pasas al otro lado, raspa el piso y carga
  const golpe = (t0, quien) => t >= t0 && t < t0 + .2 && quien;
  const [g1, g2, g3, g4] = G0.golpes;
  const pT = poseL(tp, [[0, 'guardia'], [g1, 'golpe', .12], [g1 + .2, 'guardia'], [g3, 'golpe', .12], [g3 + .2, 'guardia'], [G0.y, 'parado', .3], [G0.equ, 'agacha', .3], [G0.carga, 'carga', .15]]);
  const raspa = t > G0.equ + .15 && t < G0.carga ? Math.sin((t - G0.equ) * 22) * 40 : 0;
  const poseT = { ...pT, pI: [pT.pI[0] + raspa, pT.pI[1] - Math.max(0, raspa) * .4] };
  const kc = P(t, G0.carga, .62, E.in2), xT = lerp(RG_X.toro, 1500, kc);
  const golpeado = (t0) => bump(t, t0 + .1, .2);
  const caraT = t >= G0.carga ? { boca: 'grito', ceno: 1, mira: [1, 0] } : t >= G0.lado ? { boca: 'mueca', ceno: 1, mira: [1, .4] }
    : t >= G0.y ? { boca: 'o', ceno: .2, mira: [.6, 1] } : { boca: golpe(g1, 1) || golpe(g3, 1) ? 'dientes' : 'seria', ceno: .65, mira: [1, 0], cierre: golpeado(g2) * .8 + golpeado(g4) * .8 };
  const optT = { x: xT, y: RG_X.y, s: RG_X.s, pose: poseT, corre: t >= G0.carga ? 1 : 0, fase: t * 26, rebote: t < G0.y || t >= G0.carga ? 1 : 0, aplasta: golpeado(g2) + golpeado(g4), ...caraT };
  TORO.pintar(tp, optT);
  TORO_F.forEach((f, i) => { const dt = (i + 1) * .045, k2 = P(t - dt, G0.carga, .62, E.in2);
    if (t > G0.carga && kc < 1) f.pintar(tp, { ...optT, x: lerp(RG_X.toro, 1500, k2), o: .34 - i * .14 }); else off(f.el); });
  // vapor por la nariz antes de cargar
  VAPOR.forEach((v, i) => { const t0 = G0.equ + .1 + i * .18, k = P(t, t0, .5, E.out2);
    if (k > 0 && k < 1 && t < G0.carga + .1) { const [nx, ny] = TORO.punto([i % 2 ? 30 : -30, -250], { x: xT, y: RG_X.y, s: RG_X.s });
      put(v, { x: nx + 40 + 130 * k + (i % 2 ? 14 : -14), y: ny + 20 + 60 * k, s: .7 + 2.1 * k, o: (1 - k) * .95 }); } else off(v); });
  // ---------- el Oso: pelea, se alegra cuando llegas, salta asustado y vuelve
  const pO = poseL(tp, [[0, 'guardia'], [g2, 'golpe', .12], [g2 + .2, 'guardia'], [g4, 'golpe', .12], [g4 + .2, 'guardia'], [G0.y, 'parado', .3], [G0.lado + .1, 'festeja', .3],
    [G0.carga - .05, 'susto', .18], [G0.aplasta + .45, 'parado', .3]]);
  const saltoO = t > G0.carga - .05 && t < G0.aplasta + .5 ? -Math.sin(Math.PI * clamp((t - G0.carga + .05) / (.55 + .05))) * 260 : 0;
  const caraO = t >= G0.aplasta + .3 ? { boca: 'mueca', ceno: -.6, mira: [-.6, 1] } : t >= G0.carga - .05 ? { boca: 'o', ceno: -.8, mira: [-1, .2] }
    : t >= G0.lado + .1 ? { boca: 'feliz', ceno: -.2, mira: [-.6, .6] } : t >= G0.y ? { boca: 'o', ceno: 0, mira: [-.4, 1] }
    : { boca: golpe(g2, 1) || golpe(g4, 1) ? 'dientes' : 'seria', ceno: .55, mira: [1, 0], cierre: golpeado(g1) * .8 + golpeado(g3) * .8 };
  OSO.pintar(tp, { x: RG_X.oso, y: RG_X.y + saltoO, s: RG_X.s, flip: true, pose: pO, rebote: t < G0.y ? 1 : 0, aplasta: golpeado(g1) + golpeado(g3), ...caraO });
  // chispas en cada golpe (donde chocan los guantes)
  G0.golpes.forEach((g, i) => { const k = P(t, g + .08, .3, E.out2), el = CHIS[i];
    if (k > 0 && k < 1) put(el, { x: i % 2 ? 430 : 650, y: 1040 + (i % 2) * 14, s: .4 + 1.1 * E.back(clamp(k * 1.6)), r: k * 90, o: 1 - k }); else off(el); });
  // ---------- tu moneda: entra saltando, se pasa al lado del oso y el toro le pasa por encima
  const ent0 = P(t, G0.y - .02, .5, E.lin), salt = Math.abs(Math.sin(ent0 * Math.PI * 2)) * 130 * (1 - ent0 * .3);
  const va = P(t, G0.lado - .08, .42, E.io3);
  if (ent0 > 0) {
    const zc = t >= G0.carga ? '5' : '7'; if (MON.style.zIndex !== zc) MON.style.zIndex = zc;   // en la carga queda debajo del toro
    const xm = lerp(540, 620, va), ym = lerp(1780, RG_X.y, E.out3(ent0)) - (ent0 < 1 ? salt : Math.abs(Math.sin(va * Math.PI)) * 90);
    const ap1 = clamp((t - G0.aplasta) / .08), flaco = t >= G0.aplasta;
    const sq = flaco ? 1 : 0, rebote = flaco ? impulse(t - G0.aplasta, 14, .25) * .25 : 0;
    put(MON, { x: xm, y: ym + (flaco ? 0 : 0), ay: 92, sx: flaco ? 1.62 + rebote : 1, sy: flaco ? .2 - rebote * .3 : 1, r: flaco ? 0 : Math.sin(t * 9) * 4 * (1 - ent0) });
    void ap1; void sq;
    cara(MON, tp, flaco ? { boca: 'mueca', cierre: 1 } : t >= G0.equ + .2 ? { boca: 'o', mira: [-1, -.2], ceno: -.6 } : t >= G0.lado ? { boca: 'euforia', mira: [.8, -.6] } : { boca: 'feliz', mira: [-.3, -.4] });
    ap(TU, t, G0.te + .02, G0.carga + .05, { x: xm, y: ym - 205, s0: .4, dy: 20 });
    // estrellitas que giran sobre la moneda aplastada
    ESTR.forEach((e, i) => { const k = P(t, G0.aplasta + .05, .3, E.back), a = t * 5 + i * 2.094;
      if (flaco && k > 0) put(e, { x: xm + Math.cos(a) * 95, y: RG_X.y - 70 + Math.sin(a) * 26, s: k * (.8 + .2 * Math.sin(a)), r: t * 120, o: Math.sin(a) > -.6 ? 1 : .6 }); else off(e); });
  } else ocultar(MON, TU, ESTR);
  // polvo y rayas de velocidad de la carga
  POLVO.forEach((p, i) => { const t0 = G0.carga + .05 + i * .06, k = P(t, t0, .55, E.out2);
    if (k > 0 && k < 1) put(p, { x: lerp(RG_X.toro, 1500, P(t0, G0.carga, .62, E.in2)) - 40, y: RG_X.y - 10 - 50 * k, s: .5 + 1.5 * k, o: (1 - k) * .8 }); else off(p); });
  const kr = P(t, G0.carga + .05, .1, E.out3) * (1 - P(t, G0.carga + .62, .2, E.in3));
  if (kr > 0) { put(RAYAS, { x: xT - 260, y: RG_X.y - 230, o: kr * .7 }); RAYAS_R.forEach((r2, i) => r2.setAttribute('x', ((t * 900 + i * 97) % 220 - 60).toFixed(0))); } else off(RAYAS);
  put(RG_ROPE, { x: CX, y: 1482, b: 2.5, o: .9 });
  put(RG_PUB, { x: CX + 30 * Math.sin(t * .3), y: 1700, b: 7, o: .96 });
  put(RG_VIN, { x: CX, y: CY });
}
PINTAR.push(pintarRing);

if (!MUESTRA) {
/* =====================================================================
   3 · ESTACIONES (f1-f2): una pared-grafico larga con la linea del precio; foco verde para el Toro y rojo para el Oso.
   El Toro pulsa COMPRAR, empuja la linea y la dispara con los cuernos; la camara barre al Oso, que pulsa VENDER, la
   aplasta con las zarpas y la hunde de un zarpazo (tres rasgunos rojos en la pared).
   ===================================================================== */
const T1 = { toros: tw(1, 'toros'), com: tw(1, 'compran'), emp: tw(1, 'empujan'), pre: tw(1, 'precio'), arr: tw(1, 'arriba'), toro: tw(1, 'toro'), lev: tw(1, 'levanta'), cue: tw(1, 'cuernos') };
const T2 = { osos: tw(2, 'osos'), ven: tw(2, 'venden'), emp: tw(2, 'empujan'), aba: tw(2, 'abajo'), oso: tw(2, 'oso'), gol: tw(2, 'golpea'), gar: tw(2, 'garra') };
const ESA = 560, ESB = 1780, ESY = 1420, ESS = .9;
const ES = new Plano(5), ESF = new Plano(8);                            // ESF: delante y fijo (monedas grandes que cruzan en el barrido)
const ES_FON = dEl(ES.el, '', `<svg width="3000" height="1920" viewBox="-300 0 3000 1920" style="display:block">
  <defs>${dGrad('esP', [[0, '#04060d'], [.5, '#0c1330'], [.729, '#141d3c'], [.731, '#182241'], [1, '#05070d']])}
    <linearGradient id="esV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cffd0" stop-opacity=".42"/><stop offset="1" stop-color="#7cffd0" stop-opacity="0"/></linearGradient>
    <linearGradient id="esR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8aa0" stop-opacity=".42"/><stop offset="1" stop-color="#ff8aa0" stop-opacity="0"/></linearGradient>
    <radialGradient id="esPv"><stop offset="0" stop-color="#22d39a" stop-opacity=".5"/><stop offset="1" stop-color="#22d39a" stop-opacity="0"/></radialGradient>
    <radialGradient id="esPr"><stop offset="0" stop-color="#ff4d6a" stop-opacity=".5"/><stop offset="1" stop-color="#ff4d6a" stop-opacity="0"/></radialGradient></defs>
  <rect x="-300" width="3000" height="1920" fill="url(#esP)"/>
  ${Array.from({ length: 38 }, (_, i) => `<line x1="${-300 + i * 80}" y1="420" x2="${-300 + i * 80}" y2="1400" stroke="rgba(130,160,230,.08)" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 13 }, (_, i) => `<line x1="-300" y1="${440 + i * 80}" x2="2700" y2="${440 + i * 80}" stroke="rgba(130,160,230,.08)" stroke-width="2"/>`).join('')}
  <rect x="-300" y="1400" width="3000" height="4" fill="rgba(255,255,255,.12)"/>
  <path d="M${ESA - 90} 0 L${ESA + 90} 0 L${ESA + 400} 1420 L${ESA - 400} 1420 Z" fill="url(#esV)"/>
  <path d="M${ESB - 90} 0 L${ESB + 90} 0 L${ESB + 400} 1420 L${ESB - 400} 1420 Z" fill="url(#esR)"/>
  <ellipse cx="${ESA}" cy="1440" rx="440" ry="72" fill="url(#esPv)"/><ellipse cx="${ESB}" cy="1440" rx="440" ry="72" fill="url(#esPr)"/>
  ${Array.from({ length: 80 }, (_, i) => `<circle cx="${(-280 + hashC(i, 1) * 2960).toFixed(0)}" cy="${(80 + hashC(i, 2) * 1300).toFixed(0)}" r="${(1.2 + hashC(i, 3) * 2.2).toFixed(1)}" fill="#fff" opacity="${(.06 + hashC(i, 4) * .22).toFixed(2)}"/>`).join('')}</svg>`, 2);
const ES_LN = dEl(ES.el, '', `<svg width="3000" height="1920" viewBox="-300 0 3000 1920" style="display:block;overflow:visible">
  <path class="gl" fill="none" stroke="#f4c430" stroke-width="26" stroke-linejoin="round" stroke-linecap="round" opacity=".3" style="filter:blur(9px)"/>
  <path class="ln" fill="none" stroke="#ffe08a" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
  <circle class="pt" r="17" fill="#fff6d6" style="filter:drop-shadow(0 0 18px #f4c430)"/></svg>`, 4);
const ES_GL = ES_LN.querySelector('.gl'), ES_L = ES_LN.querySelector('.ln'), ES_PT = ES_LN.querySelector('.pt');
const ES_CH = dEl(ES.el, 'cchip o', '<b class="fl" style="font:800 30px Outfit">▲</b><span class="v">$ 100,00</span>', 7), ES_CHV = ES_CH.querySelector('.v'), ES_CHF = ES_CH.querySelector('.fl');
const TORO2 = new Luchador(ES.el, 'toro', { z: 6, semilla: 2 }), OSO2 = new Luchador(ES.el, 'oso', { z: 6, semilla: 5 });
const BT_C = dEl(ES.el, '', dBoton('COMPRAR'), 5), BT_V = dEl(ES.el, '', dBoton('VENDER', ['#ffadbd', '#ff4d6a', '#b81c40']), 5);
const BT_CT = BT_C.querySelector('.tapa'), BT_VT = BT_V.querySelector('.tapa');
const ES_RAS = dEl(ES.el, '', `<svg width="420" height="420" viewBox="-210 -210 420 420" style="display:block;overflow:visible">${[-1, 0, 1].map(i => `<path class="ra" d="M${-120 + i * 76} -180 Q${-10 + i * 76} 0 ${90 + i * 76} 170" fill="none" stroke="#ff4d6a" stroke-width="22" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="filter:drop-shadow(0 0 14px #ff4d6a)"/>`).join('')}</svg>`, 3);
const ES_RASP = [...ES_RAS.querySelectorAll('.ra')];
const ES_CHIS = [0, 1, 2, 3, 4].map(i => dEl(ES.el, '', dChispa(i % 2 ? 60 : 90, i % 2 ? '#fff6d6' : '#c9ffe9'), 8));
const ES_VIN = vineta(ES.el, .66, 9);
const ESF_MON = [[1700, 1580, 2.3], [2000, 760, 1.9]].map(([x0, y, s], i) => ({ el: dEl(ESF.el, '', dMoneda(200, { cara: false, signo: true }), 3), i, x0, y, s }));
const ES_TIP = norm([[XC(0) - .6, { x: 470, y: 1060 }], [T1.com - .05, { x: 500, y: 1062 }, E.lin], [T1.com + .25, { x: 520, y: 1008 }, E.back], [T1.emp, { x: 545, y: 1000 }, E.lin],
  [T1.arr + .1, { x: 600, y: 876 }, E.io3], [T1.lev, { x: 612, y: 880 }, E.io3], [T1.cue + .08, { x: 640, y: 696 }, E.out3], [XC(1) - .25, { x: 690, y: 708 }, E.io3],
  [XC(1) + .45, { x: 1560, y: 752 }, E.io3], [T2.ven - .05, { x: 1600, y: 772 }, E.lin], [T2.ven + .25, { x: 1615, y: 822 }, E.back], [T2.emp, { x: 1625, y: 832 }, E.lin],
  [T2.aba + .12, { x: 1650, y: 962 }, E.io3], [T2.gol + .02, { x: 1660, y: 952 }, E.lin], [T2.gol + .22, { x: 1690, y: 1236 }, E.in3], [XC(2), { x: 1720, y: 1196 }, E.out3]]);
const ruidoES = x => 10 * Math.sin(x * .061) + 7 * Math.sin(x * .17 + 1.3) + 4 * Math.sin(x * .41 + .4);
const precioDe = y => 100 + (1060 - y) / 40;
const ES_CAM = [[XC(0) - .3, { s: 1.0, fx: ESA + 30, fy: 1060 }], [T1.cue + .1, { s: 1.05, fx: ESA + 50, fy: 1020 }, E.io3], [XC(1) - .3, { s: 1.04, fx: ESA + 60, fy: 1030 }, E.lin],
  [XC(1) + .45, { s: 1.0, fx: ESB - 70, fy: 1060 }, E.io3], [T2.gol + .2, { s: 1.06, fx: ESB - 90, fy: 1100 }, E.io3], [XC(2), { s: 1.07 }, E.lin]];
sfx(T1.com, 'click', { vol: .8 }); sfx(T1.com + .05, 'subida', { vol: .35 }); sfx(T1.emp + .1, 'swell', { vol: .45 }); sfx(T1.cue + .02, 'golpe', { vol: .8 }); sfx(T1.cue + .06, 'brillo', { vol: .5 });
sfx(XC(1) - .2, 'barrido', { vol: .7 }); sfx(T2.ven, 'click', { vol: .8 }); sfx(T2.ven + .05, 'descarte', { vol: .45 }); sfx(T2.oso - .1, 'aire', { vol: .5 });
sfx(T2.gol + .12, 'impacto', { vol: .9 }); sfx(T2.gol + .14, 'golpe-grave', { vol: .6 }); sfx(XC(2) - .3, 'transicion', { vol: .55 });
function pintarEstaciones(t) {
  if (t < XC(0) - .3 || t >= XC(2) + .4) { off(ES.el); off(ESF.el); return; }
  const tp = deADos(t), en = barrido(t, XC(0));
  let c = camaraEn(t, ES_CAM, { desenfoque: 6 });
  const tip = KF(t, ES_TIP);
  let o = 1, b = c.b;
  if (t > XC(2) - .35) { const z = atravesar(t, XC(2), tip.x, tip.y, .7, 5, c.fx, c.fy, c.s).a; c = { ...c, s: z.s, fx: z.fx, fy: z.fy }; o = z.o; b += z.b; }
  const dxs = t < XC(0) + .3 ? en.b.dx / c.s : 0;
  const [sx, sy] = sacudones(t, [[T1.cue + .04, 12, .3], [T2.gol + .14, 24, .45]]);
  if (!ES.ver({ s: c.s, fx: c.fx - dxs - sx / c.s, fy: c.fy - sy / c.s, o, b: b + (t < XC(0) + .3 ? en.b.b : 0) })) { off(ESF.el); return; }
  put(ES_FON, { x: 1200, y: CY });
  // la linea del precio se dibuja con la punta
  const pts = []; for (let x = -300; x < ES_TIP[0][1].x; x += 24) pts.push([x, 1060 + ruidoES(x)]);
  for (let tau = ES_TIP[0][0]; tau < t; tau += 1 / 30) { const k = KF(tau, ES_TIP); pts.push([k.x, k.y + ruidoES(k.x * 1.7) * .55]); }
  pts.push([tip.x, tip.y]);
  const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  ES_GL.setAttribute('d', d); ES_L.setAttribute('d', d); ES_PT.setAttribute('cx', tip.x.toFixed(1)); ES_PT.setAttribute('cy', tip.y.toFixed(1));
  put(ES_LN, { x: 1200, y: CY });
  // la etiqueta del precio sigue a la punta (verde si sube, roja si baja)
  const antes = KF(t - .3, ES_TIP).y, est = tip.y < antes - 10 ? 'v' : tip.y > antes + 24 ? 'r' : (ES_CH._e || 'o');
  if (ES_CH._e !== est) { ES_CH._e = est; ES_CH.className = `L cchip ${est} z7`; ES_CHF.textContent = est === 'r' ? '▼' : '▲'; ES_CHF.style.color = est === 'r' ? '#ff6b83' : est === 'v' ? '#3fe0aa' : '#f4c430'; }
  const pr = '$ ' + precioDe(tip.y).toFixed(2).replace('.', ','); if (ES_CHV._p !== pr) { ES_CHV._p = pr; ES_CHV.textContent = pr; }
  put(ES_CH, { x: tip.x > 1200 ? tip.x - 190 : tip.x + 30, y: tip.x > 1200 ? tip.y - 60 : tip.y - 92, s: 1 + .1 * (bump(t, T1.cue + .05, .35) + bump(t, T2.gol + .2, .35)) });
  // botones
  const pc = bump(t, T1.com - .04, .26), pv = bump(t, T2.ven - .04, .26);
  BT_CT.setAttribute('transform', `translate(0 ${(16 * pc).toFixed(1)})`); BT_VT.setAttribute('transform', `translate(0 ${(16 * pv).toFixed(1)})`);
  put(BT_C, { x: 300, y: 1300 }); put(BT_V, { x: 2040, y: 1300 });
  // el Toro
  const pT = poseL(tp, [[0, 'guardia'], [T1.com - .25, 'pulsa', .2], [T1.com + .25, 'guardia', .25], [T1.emp - .15, 'empuja', .3], [T1.lev - .12, 'agacha', .2], [T1.cue - .06, 'cuernos', .14], [T1.cue + .45, 'festeja', .3]]);
  const cT = t >= T1.cue + .1 ? { boca: 'euforia', ceno: -.3, mira: [.6, -.8] } : t >= T1.lev - .12 ? { boca: 'grito', ceno: 1, mira: [.6, -1] }
    : t >= T1.emp - .15 ? { boca: 'dientes', ceno: .8, mira: [.3, -1] } : t >= T1.com - .25 ? { boca: 'feliz', ceno: .2, mira: [-.8, .4] } : { boca: 'seria', ceno: .4, mira: [.5, -.2] };
  TORO2.pintar(tp, { x: ESA, y: ESY, s: ESS, pose: pT, rebote: .6, ...cT });
  // el Oso
  const pO = poseL(tp, [[0, 'guardia'], [T2.ven - .25, 'pulsa', .2], [T2.ven + .25, 'guardia', .25], [T2.emp - .1, 'presiona', .3], [T2.oso - .15, 'zarpaArr', .25], [T2.gol + .02, 'zarpaFin', .1], [T2.gar - .05, 'zarpaArr', .3], [T2.gar + .5, 'festeja', .3]]);
  const cO = t >= T2.gol + .02 ? { boca: 'euforia', ceno: .5, mira: [.8, .8] } : t >= T2.oso - .15 ? { boca: 'grito', ceno: 1, mira: [.8, -.6] }
    : t >= T2.emp - .1 ? { boca: 'dientes', ceno: .8, mira: [.8, .6] } : t >= T2.ven - .25 ? { boca: 'feliz', ceno: .2, mira: [-.8, .4] } : { boca: 'seria', ceno: .4, mira: [.6, -.3] };
  OSO2.pintar(tp, { x: ESB, y: ESY, s: ESS, flip: true, pose: pO, rebote: .6, ...cO });
  // chispas de la cornada y rasgunos del zarpazo
  ES_CHIS.forEach((ch, i) => { const t0 = (i < 3 ? T1.cue + .04 : T2.gol + .14) + (i % 3) * .03, k = P(t, t0, .45, E.out2), pt = i < 3 ? [640, 700] : [1690, 1230], a = i * 2.1;
    if (k > 0 && k < 1) put(ch, { x: pt[0] + Math.cos(a) * 120 * k, y: pt[1] + Math.sin(a) * 90 * k, s: .5 + .9 * E.back(clamp(k * 1.5)), r: k * 140, o: 1 - k }); else off(ch); });
  const kr = P(t, T2.gol + .1, .25, E.out3);
  if (kr > 0) { ES_RASP.forEach((p, i) => p.setAttribute('stroke-dashoffset', (1 - clamp(kr * 1.3 - i * .12)).toFixed(3))); put(ES_RAS, { x: 1480, y: 950, o: 1 - P(t, XC(2) - .5, .4, E.in2) * .5 }); } else off(ES_RAS);
  put(ES_VIN, { x: CX, y: CY });
  // delante: monedas grandes desenfocadas que cruzan en el barrido (paralaje)
  ESF.ver({ o });
  ESF_MON.forEach(m => { const x = m.x0 - (c.fx - ESA) * 2.2;
    if (x > -300 && x < 1380) put(m.el, { x, y: m.y + 30 * Math.sin(t + m.i), s: m.s, r: t * 30 + m.i * 70, b: 14, o: .85 }); else off(m.el); });
}
PINTAR.push(pintarEstaciones);

/* =====================================================================
   4 · LA RONDA (f3): en el ring, la vela se forma con la barra que empujan los dos (el toro hacia arriba, el oso hacia
   abajo). Gana el toro -> la vela cierra verde; gana el oso -> cierra roja. El marcador anuncia cada ronda.
   ===================================================================== */
const T3 = { vela: tw(3, 'vela'), ron: tw(3, 'ronda'), pel: tw(3, 'pelea'), si: tw(3, 'si'), toros: tw(3, 'toros'), cie: tw(3, 'cierra'), ver: tw(3, 'verde'),
  si2: tw(3, 'si', 2), gan2: tw(3, 'ganan', 2), osos: tw(3, 'osos'), cie2: tw(3, 'cierra', 2), roja: tw(3, 'roja') };
const RN = new Plano(5), RN_Y0 = 1060, RN_X = 540, RN_PISO = 1430, RN_S = .85, RN_XT = 222, RN_XO = 858;
const RN_FON = dEl(RN.el, '', SVG_RING, 2), RN_BOK = new Bokeh(RN.el, { n: 30, colores: ['#ffffff', '#ffe7a0', '#9ad8ff'], z: 3, semilla: 13, tam: [18, 70], alto: 760 });
const RN_PUB = dEl(RN.el, '', SVG_PUB, 9), RN_VIN = vineta(RN.el, .7, 9);
css(`.mrc2{width:660px;height:150px;border-radius:26px;background:linear-gradient(180deg,#151b2e,#0a0e19);border:3px solid rgba(244,196,48,.55);box-sizing:border-box;
  box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 40px rgba(244,196,48,.18);display:flex;align-items:center;justify-content:center;gap:18px;font:400 72px/1 'Bebas Neue',sans-serif;letter-spacing:.05em;color:#f4c430}
.mrc2 svg{color:#f4c430}.mrc2.v{color:#3fe0aa;border-color:rgba(34,211,154,.8)}.mrc2.v svg{color:#3fe0aa}.mrc2.r{color:#ff6b83;border-color:rgba(255,77,106,.85)}.mrc2.r svg{color:#ff6b83}`);
const RN_MRC = dEl(RN.el, 'mrc2', '', 6), RN_CAB = dEl(RN.el, '', '<svg width="600" height="600" style="display:block;overflow:visible"><path d="M120 0 L170 600 M480 0 L430 600" stroke="#2a3350" stroke-width="5"/></svg>', 5);
const RN_VELA = dEl(RN.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block;overflow:visible">
  <line class="ap" x1="430" x2="650" stroke="#f4c430" stroke-width="5" stroke-dasharray="14 10" opacity=".85"/>
  <line class="me" x1="${RN_X}" x2="${RN_X}" stroke="#e9e4d8" stroke-width="9" stroke-linecap="round"/>
  <rect class="cu" x="${RN_X - 82}" width="164" rx="14"/><rect class="br" x="${RN_X - 60}" width="18" rx="9" fill="rgba(255,255,255,.35)"/></svg>`, 4);
const RN_AP = RN_VELA.querySelector('.ap'), RN_ME = RN_VELA.querySelector('.me'), RN_CU = RN_VELA.querySelector('.cu'), RN_BR = RN_VELA.querySelector('.br');
const RN_V1 = dEl(RN.el, '', '', 4);                                    // la vela de la ronda 1, ya cerrada
const RN_BARRA = dEl(RN.el, '', `<svg width="640" height="60" viewBox="-320 -30 640 60" style="display:block;overflow:visible"><defs>${dGrad('rnB', [[0, '#fff1b8'], [.45, '#f4c430'], [1, '#9c7206']])}</defs>
  <rect x="-300" y="-14" width="600" height="28" rx="14" fill="url(#rnB)" stroke="#7a5a08" stroke-width="3"/><rect x="-290" y="-11" width="580" height="7" rx="4" fill="rgba(255,255,255,.55)"/>
  <circle cx="-300" cy="0" r="22" fill="#d9a520" stroke="#7a5a08" stroke-width="3"/><circle cx="300" cy="0" r="22" fill="#d9a520" stroke="#7a5a08" stroke-width="3"/></svg>`, 7);
const TORO3 = new Luchador(RN.el, 'toro', { z: 6, semilla: 3 }), OSO3 = new Luchador(RN.el, 'oso', { z: 6, semilla: 6 });
const RN_GOT = [0, 1, 2, 3].map(() => dEl(RN.el, '', dGota(30), 8));
const R1 = norm([[T3.ron + .15, { d: 0 }], [T3.pel, { d: 70 }, E.io3], [T3.si, { d: -30 }, E.io3], [T3.toros + .12, { d: -240 }, E.out3], [T3.cie, { d: -172 }, E.io3], [T3.ver, { d: -186 }, E.io3]]);
const R2 = norm([[T3.si2, { d: 0 }], [T3.gan2, { d: -78 }, E.io3], [T3.osos + .12, { d: 246 }, E.out3], [T3.cie2, { d: 178 }, E.io3], [T3.roja, { d: 194 }, E.io3]]);
const extremos = (R, t) => { let lo = 0, hi = 0; for (let x = R[0][0]; x <= Math.min(t, R[R.length - 1][0]); x += 1 / 30) { const d = KF(x, R).d; lo = Math.min(lo, d); hi = Math.max(hi, d); } return [lo, hi]; };
const dVela = (o, c, lo, hi, w = 164) => { const sube = c <= o, col = sube ? ['#7ff7cc', '#22d39a', '#0b875d'] : ['#ffadbd', '#ff4d6a', '#b81c40'], g = dId('vc');
  return dSvg(`-120 ${lo - 20} 240 ${hi - lo + 40}`, 240, hi - lo + 40, `<defs>${dGrad(g, [[0, col[0]], [.5, col[1]], [1, col[2]]], 1, 1)}</defs>
    <line x1="0" y1="${lo}" x2="0" y2="${hi}" stroke="#e9e4d8" stroke-width="9" stroke-linecap="round"/>
    <rect x="${-w / 2}" y="${Math.min(o, c)}" width="${w}" height="${Math.max(16, Math.abs(c - o))}" rx="14" fill="url(#${g})" stroke="rgba(0,0,0,.3)" stroke-width="3"/>
    <rect x="${-w / 2 + 18}" y="${Math.min(o, c) + 10}" width="16" height="${Math.max(0, Math.abs(c - o) - 20)}" rx="8" fill="rgba(255,255,255,.35)"/>`); };
const RN_CAM = [[XC(2) - .35, { s: 1, fx: CX, fy: 990 }], [T3.ver, { s: 1.04, fx: CX, fy: 980 }, E.lin], [XC(3), { s: 1.07, fx: CX, fy: 990 }, E.lin]];
const RN_V1POS = [196, 826];
sfx(T3.ron - .02, 'campana', { vol: .8 }); sfx(T3.toros + .05, 'subida', { vol: .45 }); sfx(T3.ver - .02, 'golpe', { vol: .85 }); sfx(T3.ver + .05, 'nota', { vol: .6 });
sfx(T3.si2 - .02, 'campana', { vol: .75 }); sfx(T3.osos + .05, 'golpe-grave', { vol: .65 }); sfx(T3.roja - .02, 'golpe', { vol: .85 }); sfx(T3.roja + .05, 'fallo', { vol: .45 });
sfx(XC(3) - .3, 'transicion', { vol: .55 });
let RN_V1D = null;
function pintarRonda(t) {
  if (t < XC(2) - .35 || t >= XC(3) + .4) { off(RN.el); return; }
  const tp = deADos(t), z = atravesar(t, XC(2), 0, 0, .7);
  const c = camaraEn(t, RN_CAM, { desenfoque: 3 });
  let s = c.s * (t < XC(2) + .35 ? z.b.s : 1), o = t < XC(2) + .35 ? z.b.o : 1, b = (t < XC(2) + .35 ? z.b.b : 0) + c.b, fx = c.fx, fy = c.fy;
  if (t > XC(3) - .35) { const sal = atravesar(t, XC(3), RN_V1POS[0], RN_V1POS[1], .7, 6, fx, fy, s).a; s = sal.s; fx = sal.fx; fy = sal.fy; o = sal.o; b += sal.b; }
  const [sx, sy] = sacudones(t, [[T3.ver, 10, .3], [T3.roja, 12, .3]]);
  if (!RN.ver({ s, fx: fx - sx / s, fy: fy - sy / s, o, b })) return;
  put(RN_FON, { x: CX, y: CY }); RN_BOK.pintar(t, .9, { x: CX, y: 760 });
  // marcador: RONDA 1 -> GANAN LOS TOROS -> RONDA 2 -> GANAN LOS OSOS
  const est = t >= T3.roja ? 4 : t >= T3.si2 ? 3 : t >= T3.ver ? 2 : t >= T3.ron - .05 ? 1 : 0;
  if (RN_MRC._e !== est) { RN_MRC._e = est;
    RN_MRC.className = 'L mrc2 z6' + (est === 2 ? ' v' : est === 4 ? ' r' : '');
    RN_MRC.innerHTML = est === 1 ? `${icon('bell', 58, 2.4)}<span>RONDA 1</span>` : est === 2 ? `${icon('trophy', 58, 2.4)}<span>GANAN LOS TOROS</span>`
      : est === 3 ? `${icon('bell', 58, 2.4)}<span>RONDA 2</span>` : est === 4 ? `${icon('trophy', 58, 2.4)}<span>GANAN LOS OSOS</span>` : `${icon('bell', 58, 2.4)}<span>RONDA 1</span>`; }
  const golpeM = Math.max(bump(t, T3.ron - .05, .3), bump(t, T3.ver, .3), bump(t, T3.si2 - .05, .3), bump(t, T3.roja, .3));
  const vM = P(t, T3.ron - .3, .3, E.out3); put(RN_CAB, { x: CX, y: 300, o: vM }); put(RN_MRC, { x: CX, y: 620 + 6 * Math.sin(t * 1.4), s: (1 + .07 * golpeM) * lerp(.7, 1, vM), r: 1.2 * Math.sin(t * 1.1), o: vM });
  // la ronda activa y la vela que se forma
  const r2 = t >= T3.si2, R = r2 ? R2 : R1, d = KF(t, R).d, [lo, hi] = extremos(R, t), yb = RN_Y0 + d;
  const tCierre = r2 ? T3.roja : T3.ver, cerrada = t >= tCierre, sube = d <= 0;
  RN_AP.setAttribute('y1', RN_Y0); RN_AP.setAttribute('y2', RN_Y0);
  RN_ME.setAttribute('y1', (RN_Y0 + lo - 46).toFixed(1)); RN_ME.setAttribute('y2', (RN_Y0 + hi + 46).toFixed(1));
  const y0 = Math.min(RN_Y0, yb), alto = Math.max(14, Math.abs(yb - RN_Y0));
  RN_CU.setAttribute('y', y0.toFixed(1)); RN_CU.setAttribute('height', alto.toFixed(1)); RN_CU.setAttribute('fill', sube ? '#22d39a' : '#ff4d6a');
  RN_CU.setAttribute('stroke', cerrada ? '#fff6d6' : 'rgba(0,0,0,.3)'); RN_CU.setAttribute('stroke-width', cerrada ? (3 + 5 * bump(t, tCierre, .4)).toFixed(1) : '3');
  RN_BR.setAttribute('y', (y0 + 10).toFixed(1)); RN_BR.setAttribute('height', Math.max(0, alto - 20).toFixed(1));
  RN_VELA.style.filter = cerrada ? `drop-shadow(0 0 ${(30 * bump(t, tCierre, .5) + 8).toFixed(1)}px ${sube ? '#22d39a' : '#ff4d6a'})` : '';
  put(RN_VELA, { x: CX, y: CY, o: P(t, T3.vela - .1, .35, E.out3) });
  // la vela de la ronda 1 queda chiquita arriba a la izquierda
  if (r2) { if (!RN_V1D) { const [l1, h1] = extremos(R1, T3.ver); RN_V1D = 1; RN_V1.innerHTML = dVela(0, KF(T3.ver, R1).d, l1 - 46, h1 + 46); }
    const k = P(t, T3.si2 - .05, .45, E.io3), cy1 = RN_Y0 + KF(T3.ver, R1).d / 2;
    put(RN_V1, { x: lerp(RN_X, RN_V1POS[0], k), y: lerp(cy1, RN_V1POS[1], k), s: lerp(1, .5, k), o: 1 }); } else off(RN_V1);
  // la barra (el cierre) y quien la empuja
  const agarra = t >= T3.ron - .1 && !(t >= T3.ver + .05 && t < T3.si2 - .1) && !(t >= T3.roja + .05);
  put(RN_BARRA, { x: RN_X, y: yb, o: P(t, T3.ron - .3, .3, E.out3) });
  // Toro (izquierda): manos bajo la barra; se agacha si la barra baja mucho (los pies quedan en el piso)
  const dyT = yb > 1150 ? (yb - 1150) * .6 / RN_S : yb < 880 ? -(880 - yb) * .3 / RN_S : 0;
  const manoT = X => [(X - RN_XT) / RN_S, (yb + 20 - RN_PISO) / RN_S - dyT];
  const poseTg = { dy: dyT, rot: yb > 1150 ? 8 : 0, bI: manoT(258), bD: manoT(322), pI: [-64, -dyT], pD: [78, -dyT] };
  const poseTl = poseL(tp, [[0, 'guardia'], [T3.ver + .05, 'festeja', .25], [T3.si2 - .1, 'guardia', .2], [T3.roja + .05, 'cansado', .3]]);
  const cT = r2 ? (t >= T3.osos ? { boca: 'triste', ceno: -.7, mira: [.8, -.4] } : { boca: 'dientes', ceno: .9, mira: [.9, -.4] })
    : t >= T3.ver ? { boca: 'euforia', ceno: -.3, mira: [.4, -.6] } : t >= T3.toros ? { boca: 'grito', ceno: 1, mira: [.9, -.5] } : { boca: 'dientes', ceno: .8, mira: [.9, -.3] };
  TORO3.pintar(tp, { x: RN_XT, y: RN_PISO, s: RN_S, pose: agarra ? poseTg : poseTl, rebote: agarra ? 0 : .6, ...cT });
  // Oso (derecha): zarpas sobre la barra; si la barra sube mucho, queda colgando y patalea
  const cuelga = yb < 960 ? (960 - yb) / RN_S : 0, dyO = yb > 1150 ? (yb - 1150) * .5 / RN_S : -cuelga;
  const manoO = X => [(RN_XO - X) / RN_S, (yb - 22 - RN_PISO) / RN_S - dyO];
  const pata = cuelga > 0 ? 26 * Math.sin(t * 15) : 0;
  const poseOg = { dy: dyO, rot: yb > 1150 ? 10 : cuelga > 0 ? -6 : 0, bI: manoO(822), bD: manoO(758), pI: [-62 + pata, cuelga > 0 ? -10 : -Math.max(0, dyO)], pD: [74 - pata, cuelga > 0 ? -16 : -Math.max(0, dyO)] };
  const poseOl = poseL(tp, [[0, 'guardia'], [T3.ver + .05, 'cansado', .3], [T3.si2 - .1, 'guardia', .2], [T3.roja + .05, 'festeja', .25]]);
  const cO = r2 ? (t >= T3.roja ? { boca: 'euforia', ceno: -.3, mira: [.4, -.6] } : t >= T3.osos ? { boca: 'grito', ceno: 1, mira: [.9, .5] } : { boca: 'dientes', ceno: .8, mira: [.9, .3] })
    : t >= T3.toros ? { boca: 'o', ceno: -.8, mira: [.9, -.6] } : { boca: 'dientes', ceno: .8, mira: [.9, -.2] };
  OSO3.pintar(tp, { x: RN_XO, y: RN_PISO, s: RN_S, flip: true, pose: agarra ? poseOg : poseOl, rebote: agarra ? 0 : .6, ...cO });
  // gotas de sudor del que va perdiendo
  RN_GOT.forEach((g, i) => { const t0 = (i < 2 ? T3.toros : T3.osos) + .1 + (i % 2) * .35, k = P(t, t0, .6, E.in2), x0 = i < 2 ? RN_XO - 110 : RN_XT + 110;
    if (k > 0 && k < 1) put(g, { x: x0 + (i % 2 ? 30 : -20), y: (i < 2 ? RN_PISO + dyO * RN_S : RN_PISO + dyT * RN_S) - 420 + 160 * k, o: 1 - k * k }); else off(g); });
  put(RN_PUB, { x: CX + 30 * Math.sin(t * .3), y: 1700, b: 7, o: .96 }); put(RN_VIN, { x: CX, y: CY });
}
PINTAR.push(pintarRonda);

/* =====================================================================
   5 · LA ESCALERA (f4): las velas de cada ronda forman una escalera y el Toro la sube saltando: tendencia alcista
   ===================================================================== */
const T4 = { cuando: tw(4, 'cuando'), ganan: tw(4, 'ganan'), ron: tw(4, 'ronda'), tras: tw(4, 'tras'), ron2: tw(4, 'ronda', 2), pre: tw(4, 'precio'), sube: tw(4, 'sube'),
  esc: tw(4, 'escalera'), ten: tw(4, 'tendencia'), alc: tw(4, 'alcista') };
const EC = new Plano(5);
const EC_V = [[1700, 1500], [1500, 1388], [1388, 1438], [1438, 1290], [1290, 1168], [1168, 1214], [1214, 1060], [1060, 930]];   // [apertura, cierre] (y)
const EC_X = i => 230 + i * 168, EC_TOP = i => Math.min(...EC_V[i]), EC_BAJ = i => Math.max(...EC_V[i]);
const EC_MECHA = EC_V.map((_, i) => [26 + hashC(i, 7) * 34, 22 + hashC(i, 8) * 30]);
const EC_H = [T4.cuando - .25, T4.ganan, T4.ron, T4.tras, T4.ron2, T4.pre, T4.sube, T4.esc];
const EC_FON = dEl(EC.el, '', `<svg width="2600" height="2400" viewBox="-500 -300 2600 2400" style="display:block">
  <defs>${dGrad('ecP', [[0, '#04060d'], [.6, '#0c1330'], [1, '#05070d']])}<radialGradient id="ecL"><stop offset="0" stop-color="#f4c430" stop-opacity=".2"/><stop offset="1" stop-color="#f4c430" stop-opacity="0"/></radialGradient></defs>
  <rect x="-500" y="-300" width="2600" height="2400" fill="url(#ecP)"/>
  ${Array.from({ length: 34 }, (_, i) => `<line x1="${-500 + i * 80}" y1="-300" x2="${-500 + i * 80}" y2="2100" stroke="rgba(130,160,230,.07)" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 31 }, (_, i) => `<line x1="-500" y1="${-300 + i * 80}" x2="2100" y2="${-300 + i * 80}" stroke="rgba(130,160,230,.07)" stroke-width="2"/>`).join('')}
  <ellipse cx="1300" cy="700" rx="1100" ry="900" fill="url(#ecL)"/>
  ${Array.from({ length: 90 }, (_, i) => `<circle cx="${(-480 + hashC(i, 11) * 2560).toFixed(0)}" cy="${(-280 + hashC(i, 12) * 2360).toFixed(0)}" r="${(1.2 + hashC(i, 13) * 2.2).toFixed(1)}" fill="#fff" opacity="${(.06 + hashC(i, 14) * .2).toFixed(2)}"/>`).join('')}</svg>`, 2);
const EC_VS = EC_V.map(([o, c], i) => { const ba = EC_BAJ(i); return dEl(EC.el, '', dVela(o - ba, c - ba, Math.min(o, c) - ba - EC_MECHA[i][0], EC_MECHA[i][1], 146), 4); });
const EC_TL = dEl(EC.el, '', `<svg width="2600" height="2400" viewBox="-500 -300 2600 2400" style="display:block;overflow:visible"><path d="M${EC_X(0) - 90} ${EC_BAJ(0) + 30} L${EC_X(7) + 130} ${EC_BAJ(7) - 40}" fill="none" stroke="#f4c430" stroke-width="7" stroke-dasharray="18 14" stroke-linecap="round" opacity=".9" style="filter:drop-shadow(0 0 10px rgba(244,196,48,.6))"/></svg>`, 3);
const EC_BAN = dEl(EC.el, '', `<svg width="150" height="190" viewBox="0 0 150 190" style="display:block;overflow:visible"><rect x="10" y="0" width="9" height="190" rx="4" fill="#e9e4d8"/>
  <path d="M19 6 L140 34 L19 70 Z" fill="#f4c430" stroke="#a8801c" stroke-width="3" stroke-linejoin="round"/></svg>`, 5);
const TORO4 = new Luchador(EC.el, 'toro', { z: 6, semilla: 4 });
const EC_CHIP = dEl(WORLDF, 'cchip v', `${icon('trendingUp', 34, 2.6)}<span>TENDENCIA ALCISTA</span>`, 7);
const EC_PUF = [0, 1, 2, 3, 4, 5, 6, 7].map(() => dEl(EC.el, '', dChispa(54, '#c9ffe9'), 7));
EC_H.forEach((h, i) => { if (i) sfx(h + .18, 'pop', { vol: .45 }); });
sfx(T4.ten - .05, 'barrido', { vol: .45 }); sfx(T4.alc, 'nota-doble', { vol: .6 }); sfx(XC(4) - .25, 'barrido', { vol: .6 });
function posToro4(t) {                                                   // donde esta el toro: salta de vela en vela
  let i = 0; for (let k = 1; k < EC_H.length; k++) if (t >= EC_H[k] - .12) i = k;
  const h0 = EC_H[i] - .12, u = i === 0 ? 1 : clamp((t - h0) / .32), a = Math.max(0, i - 1), x = lerp(EC_X(a), EC_X(i), E.io3(u)), yb = lerp(EC_TOP(a), EC_TOP(i), E.io3(u));
  return { i, u, x, ybase: yb, y: yb - Math.sin(Math.PI * u) * 120 };
}
function pintarEscalera(t) {
  if (t < XC(3) - .35 || t >= XC(4) + .3) { off(EC.el); off(EC_CHIP); return; }
  const tp = deADos(t), z = atravesar(t, XC(3), 0, 0, .7), pt = posToro4(t), pc = posToro4(t - .15);
  const s = 1.02 * (t < XC(3) + .35 ? z.b.s : 1), o = t < XC(3) + .35 ? z.b.o : 1;
  let b = t < XC(3) + .35 ? z.b.b : 0, fx = pc.x + 120, fy = pc.ybase - 260;
  const sal = barrido(t, XC(4)); if (t > XC(4) - .3) { fx -= sal.a.dx / s; b += sal.a.b; }
  if (!EC.ver({ s, fx, fy, o, b })) { off(EC_CHIP); return; }
  put(EC_FON, { x: 800, y: 900 });
  EC_VS.forEach((v, i) => { const k = P(t, EC_H[i] - .4, .35, E.back); if (k > 0) put(v, { x: EC_X(i), y: EC_BAJ(i) + EC_MECHA[i][1] + 20, ay: 100, sy: k, o: clamp(k * 2) }); else off(v); });
  // linea de tendencia bajo los minimos y la bandera
  const kt = P(t, T4.ten - .1, .6, E.io3); EC_TL.style.clipPath = `inset(0 ${(100 - kt * 100).toFixed(1)}% 0 0)`;
  if (kt > 0) put(EC_TL, { x: 800, y: 900 }); else off(EC_TL);
  const kb = P(t, T4.alc - .05, .4, E.back); if (kb > 0) put(EC_BAN, { x: EC_X(7) + 70, y: EC_TOP(7), ax: 7, ay: 100, sy: kb, r: 4 * Math.sin(t * 3) * (1 - kb * .5) }); else off(EC_BAN);
  // el toro
  const enAire = pt.u > 0 && pt.u < 1;
  const pose = t >= T4.alc - .05 ? poseL(tp, [[0, 'guardia'], [T4.alc - .05, 'festeja', .25]]) : enAire ? POSES_L.susto : POSES_L.guardia;
  TORO4.pintar(tp, { x: pt.x, y: pt.y, s: .54, pose, rebote: enAire ? 0 : .5, aplasta: pt.i ? bump(t, EC_H[pt.i] + .2, .2) : 0,
    boca: t >= T4.alc - .05 ? 'euforia' : enAire ? 'o' : 'feliz', ceno: -.2, mira: [.7, -.5] });
  EC_PUF.forEach((p, i) => { const k = P(t, EC_H[i] + .2, .4, E.out2); if (i && k > 0 && k < 1) put(p, { x: EC_X(i) + (i % 2 ? 50 : -50) * k, y: EC_TOP(i) - 20 * k, s: .4 + .8 * k, o: 1 - k }); else off(p); });
  if (ent(EC_CHIP, t, T4.ten - .05, CX, 560, { dy: 16, s0: .8, pulso: T4.alc }) > 0 && t > XC(4) - .3) put(EC_CHIP, { x: CX + sal.a.dx, y: 560, o: 1 - sal.k });
}
PINTAR.push(pintarEscalera);

/* =====================================================================
   6 · EL RANGO (f5): los dos, agotados y sentados, miran el precio rebotar entre el techo y el piso
   ===================================================================== */
const T5 = { y: tw(5, 'y'), nadie: tw(5, 'nadie'), gana: tw(5, 'gana'), pre: tw(5, 'precio'), lado: tw(5, 'lado'), reb: tw(5, 'rebotando'), techo: tw(5, 'techo'), piso: tw(5, 'piso') };
const RA = new Plano(5), RA_TE = 790, RA_PI = 1190;
const RA_FON = dEl(RA.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block">
  <defs>${dGrad('raP', [[0, '#06081a'], [.55, '#12183a'], [.8, '#1a2148'], [.8, '#141a36'], [1, '#05060f']])}</defs>
  <rect width="1080" height="1920" fill="url(#raP)"/>
  ${Array.from({ length: 15 }, (_, i) => `<line x1="${i * 80}" y1="420" x2="${i * 80}" y2="1536" stroke="rgba(130,160,230,.07)" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 15 }, (_, i) => `<line x1="0" y1="${440 + i * 80}" x2="1080" y2="${440 + i * 80}" stroke="rgba(130,160,230,.07)" stroke-width="2"/>`).join('')}
  <rect y="${RA_TE - 4}" width="1080" height="8" fill="#ff4d6a" opacity=".85" style="filter:drop-shadow(0 0 14px #ff4d6a)"/>
  <rect y="${RA_PI - 4}" width="1080" height="8" fill="#22d39a" opacity=".85" style="filter:drop-shadow(0 0 14px #22d39a)"/>
  <rect y="${RA_TE}" width="1080" height="${RA_PI - RA_TE}" fill="rgba(244,196,48,.04)"/>
  <rect y="1536" width="1080" height="4" fill="rgba(255,255,255,.1)"/></svg>`, 2);
const RA_LN = dEl(RA.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block;overflow:visible"><path class="gl" fill="none" stroke="#f4c430" stroke-width="22" stroke-linejoin="round" opacity=".28" style="filter:blur(8px)"/>
  <path class="ln" fill="none" stroke="#ffe08a" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/></svg>`, 4);
const RA_GL = RA_LN.querySelector('.gl'), RA_L = RA_LN.querySelector('.ln');
const RA_BOLA = dEl(RA.el, '', '<div style="width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fffbe6,#f4c430 55%,#a8801c);box-shadow:0 0 40px 10px rgba(244,196,48,.55)"></div>', 6);
const RA_CT = dEl(RA.el, 'cchip r', `${icon('arrowUp', 30, 2.8)}<span>TECHO</span>`, 7), RA_CP = dEl(RA.el, 'cchip v', `${icon('arrowDown', 30, 2.8)}<span>PISO</span>`, 7);
const RA_FL = [0, 1, 2, 3, 4].map(() => dEl(RA.el, '', '<div style="width:180px;height:60px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.85),rgba(255,255,255,0))"></div>', 5));
const TORO5 = new Luchador(RA.el, 'toro', { z: 6, semilla: 5 }), OSO5 = new Luchador(RA.el, 'oso', { z: 6, semilla: 8 });
const RA_GOT = [0, 1, 2, 3].map(() => dEl(RA.el, '', dGota(28), 7));
const RA_VIN = vineta(RA.el, .65, 9);
const RA_HIT = (() => { const a = lerp(T5.reb, T5.techo, 1 / 3), b = lerp(T5.reb, T5.techo, 2 / 3); return [[T5.reb, RA_PI], [a, RA_TE], [b, RA_PI], [T5.techo, RA_TE], [T5.piso, RA_PI]]; })();
function bolaRA(t) {
  const x = lerp(130, 960, P(t, T5.pre - .25, XC(5) - T5.pre + .25, E.lin)), r = 30;
  let y;
  if (t < RA_HIT[0][0]) y = lerp(1000, RA_PI - r, E.in2(P(t, T5.lado, RA_HIT[0][0] - T5.lado, E.lin))) + (t < T5.lado ? 14 * Math.sin(t * 7) : 0);
  else if (t >= RA_HIT[4][0]) y = lerp(RA_PI - r, 990, E.out2(P(t, RA_HIT[4][0], .6, E.lin)));
  else { let i = 0; while (i < 3 && t >= RA_HIT[i + 1][0]) i++;
    const [ta, ya] = RA_HIT[i], [tb, yb] = RA_HIT[i + 1], u = (t - ta) / (tb - ta), ya2 = ya === RA_TE ? RA_TE + r : RA_PI - r, yb2 = yb === RA_TE ? RA_TE + r : RA_PI - r;
    y = lerp(ya2, yb2, E.ioSine(u)); }
  return [x, y];
}
RA_HIT.forEach(([h], i) => sfx(h, i >= 3 ? 'golpe-corto' : 'tick', { vol: i >= 3 ? .7 : .45 }));
sfx(XC(5) - .2, 'transicion', { vol: .5 });
function pintarRango(t) {
  if (t < XC(4) - .3 || t >= XC(5) + .45) { off(RA.el); return; }
  const tp = deADos(t), en = barrido(t, XC(4));
  const b = t < XC(4) + .3 ? en.b.b : 0, fx = CX - (t < XC(4) + .3 ? en.b.dx : 0);
  if (!RA.ver({ s: 1 + .03 * P(t, XC(4), 6, E.lin), fx, fy: 1000, o: 1, b })) return;
  put(RA_FON, { x: CX, y: CY });
  // el precio: una bola que va de lado y rebota entre el techo y el piso, dejando su linea
  const pts = []; for (let tau = T5.pre - .25; tau < t; tau += 1 / 30) pts.push(bolaRA(tau));
  const [bx, by] = bolaRA(t); pts.push([bx, by]);
  if (t >= T5.pre - .25) { const d = 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L'); RA_GL.setAttribute('d', d); RA_L.setAttribute('d', d); put(RA_LN, { x: CX, y: CY }); } else off(RA_LN);
  const golpeB = Math.max(...RA_HIT.map(([h]) => bump(t, h - .04, .16)));
  const pb = P(t, T5.pre - .25, .35, E.back); if (pb > .01) put(RA_BOLA, { x: bx, y: by, s: lerp(.3, 1, pb), sx: 1 + .25 * golpeB, sy: 1 - .25 * golpeB, o: clamp(pb * 2) }); else off(RA_BOLA);
  RA_HIT.forEach(([h, y], i) => { const k = P(t, h - .02, .4, E.out2); if (k > 0 && k < 1) put(RA_FL[i], { x: bolaRA(h)[0], y, s: .6 + 1.2 * k, o: (1 - k) * .9 }); else off(RA_FL[i]); });
  ap(RA_CT, t, T5.techo - .1, null, { x: 160, y: RA_TE - 58, s0: .5, dy: 10, s: 1 + .1 * bump(t, T5.techo, .3) });
  ap(RA_CP, t, T5.piso - .1, null, { x: 160, y: RA_PI + 58, s0: .5, dy: -10, s: 1 + .1 * bump(t, T5.piso, .3) });
  // los dos, sentados y agotados, siguen la bola con los ojos
  const miraA = (cx, cy, flip) => [clamp((bx - cx) / 360 * (flip ? -1 : 1), -1, 1), clamp((by - cy) / 360, -1, 1)];
  TORO5.pintar(tp, { x: 200, y: 1580, s: .66, pose: POSES_L.sentado, rebote: 0, boca: 'o', ceno: -.6, cierre: .25 + .1 * Math.sin(t * 6), mira: miraA(200, 1350, false) });
  OSO5.pintar(tp, { x: 880, y: 1580, s: .66, flip: true, pose: POSES_L.sentado, rebote: 0, boca: 'o', ceno: -.6, cierre: .25 + .1 * Math.sin(t * 6 + 1), mira: miraA(880, 1350, true) });
  RA_GOT.forEach((g, i) => { const t0 = XC(4) + .3 + (i % 2) * .5 + Math.floor(i / 2) * 1.1, k = ((t - t0) % 1.4) / 1.4;
    if (t > t0 && k < .8) put(g, { x: (i < 2 ? 200 : 880) + (i % 2 ? 70 : -60), y: 1300 + 160 * k * k, o: 1 - k / .8 }); else off(g); });
  put(RA_VIN, { x: CX, y: CY });
}
PINTAR.push(pintarRango);

/* =====================================================================
   7 · LA REGLA (f6): tu moneda vuelve a su forma, pelea contra el toro que viene ganando y sale volando; despues mira
   el grafico (manda el toro) y se sube a su lado, entre los cuernos.
   ===================================================================== */
const T6 = { por: tw(6, 'por'), no: tw(6, 'no'), pel: tw(6, 'pelees'), con: tw(6, 'contra'), gan: tw(6, 'ganando'), pri: tw(6, 'primero'), mira: tw(6, 'mira'),
  man: tw(6, 'manda'), des: tw(6, 'despues'), eli: tw(6, 'elige'), lado: tw(6, 'lado') };
const RE = new Plano(5), RE_PISO = 1450, RE_TX = 330;
const RE_FON = dEl(RE.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block">
  <defs>${dGrad('reP', [[0, '#04060d'], [.6, '#0d1534'], [.755, '#162042'], [.755, '#182241'], [1, '#05070d']])}<radialGradient id="reL"><stop offset="0" stop-color="#22d39a" stop-opacity=".22"/><stop offset="1" stop-color="#22d39a" stop-opacity="0"/></radialGradient></defs>
  <rect width="1080" height="1920" fill="url(#reP)"/><ellipse cx="540" cy="760" rx="620" ry="420" fill="url(#reL)"/>
  <rect y="1450" width="1080" height="4" fill="rgba(255,255,255,.12)"/></svg>`, 2);
const RE_PAN = dEl(RE.el, '', `<svg width="760" height="430" viewBox="0 0 760 430" style="display:block;overflow:visible"><defs>${dGrad('rePn', [[0, '#121a33'], [1, '#0a0f1f']])}</defs>
  <rect x="4" y="4" width="752" height="422" rx="30" fill="url(#rePn)" stroke="rgba(244,196,48,.5)" stroke-width="4"/>
  ${Array.from({ length: 9 }, (_, i) => `<line x1="${60 + i * 80}" y1="40" x2="${60 + i * 80}" y2="390" stroke="rgba(130,160,230,.1)" stroke-width="2"/>`).join('')}
  ${[[90, 330, 300], [160, 300, 250], [230, 262, 290], [300, 290, 220], [370, 222, 180], [440, 186, 214], [510, 214, 150], [580, 150, 110], [650, 110, 74]].map(([x, o, c]) => {
    const up = c < o; return `<line x1="${x}" y1="${Math.min(o, c) - 18}" x2="${x}" y2="${Math.max(o, c) + 16}" stroke="#e9e4d8" stroke-width="4"/>
      <rect x="${x - 20}" y="${Math.min(o, c)}" width="40" height="${Math.abs(c - o)}" rx="6" fill="${up ? '#22d39a' : '#ff4d6a'}"/>`; }).join('')}
  <path d="M70 360 L690 50" fill="none" stroke="#3fe0aa" stroke-width="6" stroke-dasharray="14 10" opacity=".8"/></svg>`, 3);
const RE_COR = dEl(RE.el, '', dCorona(130), 5), RE_CHIP = dEl(RE.el, 'cchip v', `${icon('crown', 32, 2.4)}<span>MANDAN LOS TOROS</span>`, 7);
const RE_NO = dEl(RE.el, '', `<div class="sino no">${icon('x', 70, 3)}</div>`, 8), RE_OK = dEl(RE.el, '', `<div class="sino ok">${icon('check', 70, 3)}</div>`, 8);
const TORO6 = new Luchador(RE.el, 'toro', { z: 6, semilla: 6 });
const RE_MON = dEl(RE.el, '', dMoneda(130), 7), RE_LUPA = dEl(RE.el, '', dLupa(150), 8);
const RE_CHIS = [0, 1, 2, 3].map(() => dEl(RE.el, '', dChispa(70, '#fff6d6'), 8));
const RE_VIN = vineta(RE.el, .62, 9);
sfx(T6.por - .05, 'pop', { vol: .6 }); sfx(T6.no, 'barrido', { vol: .6 }); sfx(T6.con, 'impacto', { vol: .8 }); sfx(T6.gan, 'fallo', { vol: .55 });
sfx(T6.pri, 'aire', { vol: .5 }); sfx(T6.man, 'nota', { vol: .6 }); sfx(T6.eli, 'pop', { vol: .6 }); sfx(T6.lado, 'nota-doble', { vol: .6 }); sfx(XC(6) - .3, 'transicion', { vol: .55 });
function pintarRegla(t) {
  if (t < XC(5) - .2 || t >= XC(6) + .5) { off(RE.el); return; }
  const tp = deADos(t), ki = P(t, XC(5) - .2, .55, E.io3);
  if (!RE.ver({ s: 1 + .04 * P(t, XC(5), 6, E.lin), fx: CX, fy: 1000, o: 1, b: (1 - ki) * 6 })) return;
  iris(RE.el, ki, 900, 1000);
  put(RE_FON, { x: CX, y: CY });
  put(RE_PAN, { x: CX, y: 760, s: 1 + .03 * bump(t, T6.man, .4) });
  // el toro llega corriendo desde la izquierda y se detiene
  const kc = P(t, T6.no - .1, .55, E.out2), xT = lerp(-260, RE_TX, kc);
  const pT = poseL(tp, [[0, 'carga'], [T6.con + .05, 'guardia', .25], [T6.eli + .15, 'festeja', .3]]);
  TORO6.pintar(tp, { x: xT, y: RE_PISO, s: .8, pose: pT, corre: t < T6.con ? 1 : 0, fase: t * 24, rebote: .5,
    boca: t >= T6.eli + .1 ? 'euforia' : t >= T6.con ? 'mueca' : 'grito', ceno: t >= T6.eli + .1 ? -.2 : 1, mira: [1, 0] });
  // tu moneda: vuelve a su forma, empuja al toro, sale volando, mira con la lupa y salta entre los cuernos
  const forma = P(t, T6.por - .1, .3, E.lin), boing = impulse(t - (T6.por - .1), 16, .22) * .35;
  const vuela = P(t, T6.con, .55, E.out2), salta = P(t, T6.eli - .25, .5, E.io3);
  let xm = 620, ym = RE_PISO, rm = 0;
  if (vuela > 0) { xm = lerp(620, 880, vuela); ym = RE_PISO - Math.sin(Math.PI * vuela) * 260; rm = vuela * 540; }
  if (salta > 0) { const cabeza = RE_PISO - 446 * .8 - 4; xm = lerp(880, RE_TX, salta); ym = lerp(RE_PISO, cabeza, salta) - Math.sin(Math.PI * salta) * 220; rm = 540 + salta * 360; }
  const empuja = t > T6.pel && t < T6.con ? -12 : 0;
  put(RE_MON, { x: xm, y: ym, ay: 92, sx: lerp(1.6, 1, forma) + boing, sy: lerp(.2, 1, forma) - boing, r: rm + empuja });
  cara(RE_MON, tp, t >= T6.eli ? { boca: 'euforia', mira: [0, -.5] } : t >= T6.pri ? { boca: 'seria', mira: [-.6, -1], ceno: .3 } : t >= T6.con ? { boca: 'o', cierre: .5 } : t >= T6.pel ? { boca: 'dientes', ceno: .9, mira: [-1, 0] } : { boca: 'feliz', mira: [-.6, -.3] });
  // la lupa mira el grafico
  const kl = P(t, T6.pri - .05, .35, E.back) * (1 - P(t, T6.eli - .3, .25, E.in2));
  if (kl > 0) put(RE_LUPA, { x: 820, y: 1220 - 30 * Math.sin(t * 2), s: kl, r: -30 }); else off(RE_LUPA);
  ap(RE_COR, t, T6.man - .05, null, { x: 850, y: 548, s0: .3, dy: -30, r: -10 });
  ap(RE_CHIP, t, T6.man - .02, null, { x: 724, y: 1022, s0: .7, dy: 14 });
  ap(RE_NO, t, T6.gan - .05, T6.pri + .1, { x: 560, y: 1120, s0: .3, dy: 0 });
  ap(RE_OK, t, T6.lado - .05, null, { x: 650, y: 1250, s0: .3, dy: 0 });
  RE_CHIS.forEach((c, i) => { const k = P(t, T6.con + i * .02, .4, E.out2), a = i * 1.6 - .4;
    if (k > 0 && k < 1) put(c, { x: 520 + Math.cos(a) * 110 * k, y: 1300 + Math.sin(a) * 90 * k, s: .5 + .8 * k, r: k * 120, o: 1 - k }); else off(c); });
  put(RE_VIN, { x: CX, y: CY });
}
PINTAR.push(pintarRegla);

/* =====================================================================
   8 · CIERRE (f7): comenta TRADING, con el toro, el oso y tu moneda celebrando
   ===================================================================== */
const T7 = { apr: tw(7, 'aprender'), sen: tw(7, 'senales'), com: tw(7, 'comenta'), tr2: tw(7, 'trading', 2), env: tw(7, 'envio') };
const CIERRE = ctaCine({ a: XC(6), tEscribe: T7.tr2 - .3, tEnvia: T7.env, yCaja: 1000, personajes: (t, k) => {
  const tp = deADos(t), fes = t >= T7.env;
  TORO7.pintar(tp, { x: 160, y: 1458 + (1 - k) * 300, s: .5, pose: poseL(tp, [[0, 'guardia'], [T7.env, 'festeja', .25]]), boca: fes ? 'euforia' : 'feliz', ceno: -.2, mira: [.8, -.6] });
  OSO7.pintar(tp, { x: 920, y: 1458 + (1 - k) * 300, s: .5, flip: true, pose: poseL(tp, [[0, 'guardia'], [T7.env + .1, 'festeja', .25]]), boca: fes ? 'euforia' : 'feliz', ceno: -.2, mira: [.8, -.6] });
  const sal = Math.abs(Math.sin((t - XC(6)) * 5)) * 60 * (1 - P(t, T7.tr2, .3, E.out2)) + (fes ? Math.abs(Math.sin((t - T7.env) * 7)) * 50 : 0);
  put(MON7, { x: CX, y: 838 - sal + (1 - k) * 200, ay: 92, o: k }); cara(MON7, tp, { boca: fes ? 'euforia' : 'feliz', mira: [0, .4] });
} });
const TORO7 = new Luchador(CIERRE.PL.el, 'toro', { z: 5, semilla: 7 }), OSO7 = new Luchador(CIERRE.PL.el, 'oso', { z: 5, semilla: 9 }), MON7 = dEl(CIERRE.PL.el, '', dMoneda(120), 8);
PINTAR.push(CIERRE.pintar);
}
