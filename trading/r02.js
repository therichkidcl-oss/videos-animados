/* =====================================================================
   REEL 02 · 5 VELAS QUE AVISAN UN GIRO
   f0-f1 gancho + las 5 tarjetas · f2-f3 martillo · f4 estrella fugaz (el martillo da la vuelta) · f5 doji
   f6 envolvente alcista · f7 estrella de la manana · f8-f9 la regla (importa donde + confirmacion) · f10 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const sinMarco = { marco: false, rejilla: false, precioVivo: false, eje: 26 };

/* ---------- S1 · gancho: el precio gira; "estas son cinco" ---------- */
const VA = serie([{ desde: 112, mover: 13, hasta: 100.2, vol: .6, contra: .2 }, { vela: [100.2, 100.7, 97.6, 100.5] }, { vela: [100.5, 102.4, 100.3, 102.2] },
  { mover: 6, hasta: 106.5, vol: .5, contra: .2 }], 51);
const PATRONES = [
  [[100, 100.8, 96.4, 100.6]],                                                          // martillo
  [[100, 104.1, 99.5, 99.6]],                                                           // estrella fugaz
  [[100, 102.6, 97.4, 100.05]],                                                         // doji
  [[101, 101.3, 99.4, 99.6], [99.4, 101.9, 99.2, 101.7]],                              // envolvente alcista
  [[103, 103.3, 99.6, 99.8], [99.6, 99.9, 98.9, 99.3], [99.5, 102.4, 99.3, 102.1]],   // estrella de la manana
];
const S1 = escena(0, 1, eyebrow('TRADING · PARTE 2') + titulo(['VELAS QUE AVISAN', 'UN *GIRO*'], '', 140), (t, s) => {
  const [ey, tt] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'girar'));
  const q = P(t, tw(1, 'estas') - .1, .4, E.in3), p = P(t, 0, .6, E.out3);
  if (q < 1) G1.pintar(t, { x: CX, y: LAY.graf + (1 - p) * 30, o: clamp(p * 2) * (1 - q), b: q * 10, s: 1 - .04 * q }); else off(G1.c);
  CARTAS.forEach((c, i) => {
    const x = 130 + i * 205, y = 950 + (i % 2) * 40;
    brote(c, t, tw(1, 'cinco') + i * .1, x, y, { s0: .4, pulso: tw(1, 'importantes') + i * .06 });
  });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: VA, h: LAY.grafH, padre: S1.el, titulo: 'GRÁFICO DE VELAS' });
G1.vista = norm([[0, { i0: -.6, i1: 21.6, pmin: 96.4, pmax: 113.6 }]]);
G1.rev = [[0, 9], [tw(0, 'girar') - .5, 13], [tw(0, 'girar'), 14], [XC(0) + .4, 18], [tw(1, 'estas'), 19]];
G1.caja({ i0: 13, i1: 13, etiqueta: 'GIRO', t0: tw(0, 'girar'), rgb: ORO2 });
G1.flecha({ i: 13, p: 97.6, dir: 1, t0: tw(0, 'girar') + .2, largo: 70, rgb: VERDE });
const CARTAS = PATRONES.map((v, i) => { const c = tarjetaPatron(i + 1, v); S1.el.appendChild(c); return c; });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'girar'), 'golpe-corto', { vol: .7 });
PATRONES.forEach((_, i) => sfx(tw(1, 'cinco') + i * .1, 'tick-suave', { vol: .75 }));
TINTE = norm([[0, { v: .6, r: -1 }], [tw(0, 'girar') - .2, {}], [tw(0, 'girar') + .5, { v: .8, r: 1 }], [XC(1) - .3, {}], [XC(1), { v: 0 }]]);

/* ---------- S2 · 1 · el martillo (la mecha mide el doble del cuerpo) y donde aparece ---------- */
const VB = serie([{ desde: 110, mover: 10, hasta: 100.3, vol: .55, contra: .2 }, { vela: [100.3, 100.6, 97.4, 100.45] },
  { mover: 5, hasta: 105.2, vol: .5, contra: .2 }], 52);
const S2 = escena(2, 3, eyebrow('VELA 1 DE 5') + titulo(['EL *MARTILLO*'], '', 170) + chip('MECHA <b>≥ 2×</b> CUERPO', 'xl'), (t, s) => {
  const [ey, tt, c2] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'martillo'), LAY.tit - 40);
  const cambio = tw(3, 'aparece') - .1, q = P(t, cambio, .35, E.in3), p2 = P(t, cambio + .15, .45, E.out3);
  if (q < 1) VG2.pintar(t, { x: CX, y: 1040, o: ENT(t, s) * (1 - q), b: q * 10, f: clamp((t - s.a) / .9),
    et: { cuerpo: [tw(2, 'cuerpo')], mechaAbajo: [tw(2, 'mecha')] } }); else off(VG2.c);
  ent(c2, t, tw(2, 'doble') - .05, CX, 600, { dy: 20, t1: cambio - .25, pulso: tw(2, 'cuerpo', 2) });
  if (p2 > 0) G2.pintar(t, { x: CX, y: LAY.graf + (1 - p2) * 30, o: p2, b: (1 - p2) * 8 }); else off(G2.c);
});
const VG2 = new VelaGigante({ v: [100, 107, 82, 106], w: 1000, h: 820, ancho: 190, padre: S2.el, z: 'z3' });
const G2 = new Grafico({ velas: VB, h: LAY.grafH, padre: S2.el, titulo: 'DESPUÉS DE UNA CAÍDA' });
G2.vista = norm([[0, { i0: -.6, i1: 16.6, pmin: 96, pmax: 111.2 }]]);
G2.rev = [[tw(3, 'aparece'), 4], [tw(3, 'caida'), 10], [tw(3, 'vendedores') - .1, 10], [tw(3, 'pero'), 10.46], [tw(3, 'control'), 11], [XC(3) - .1, 16]];
G2.caja({ i0: 10, i1: 10, etiqueta: 'MARTILLO', t0: tw(3, 'control') - .1, rgb: ORO2 });
G2.flecha({ i: 10, p: 97.4, dir: 1, t0: tw(3, 'control'), largo: 70, rgb: VERDE });
sfx(tw(2, 'martillo'), 'golpe', { vol: .8 }); sfx(tw(2, 'cuerpo'), 'tick', { vol: .7 }); sfx(tw(2, 'mecha'), 'tick', { vol: .7 });
sfx(tw(2, 'doble'), 'golpe-corto', { vol: .7 }); sfx(tw(3, 'vendedores'), 'aire', { vol: .5 }); sfx(tw(3, 'control') - .1, 'golpe-corto', { vol: .75 });

/* ---------- S3 · 2 · estrella fugaz: el martillo da la vuelta ---------- */
const VC = serie([{ desde: 100, mover: 10, hasta: 108.6, vol: .5, contra: .2 }, { vela: [108.6, 111.4, 108.3, 108.2] },
  { mover: 4, hasta: 104.6, vol: .5 }], 53);
const S3 = escena(4, 4, eyebrow('VELA 2 DE 5') + titulo(['ESTRELLA *FUGAZ*'], '', 150), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'fugaz'), LAY.tit - 40);
  const giro = P(t, tw(4, 'contrario') - .15, .7, E.io3), cambio = tw(4, 'despues') - .1;
  const q = P(t, cambio, .35, E.in3), p2 = P(t, cambio + .15, .45, E.out3);
  if (q < 1) VG3.pintar(t, { x: CX, y: 1010, o: ENT(t, s) * (1 - q), b: q * 10, f: 1, baja: giro, r: 180 * giro }); else off(VG3.c);
  if (p2 > 0) G3.pintar(t, { x: CX, y: LAY.graf + (1 - p2) * 30, o: p2, b: (1 - p2) * 8 }); else off(G3.c);
});
const VG3 = new VelaGigante({ v: [100, 107, 82, 106], w: 1000, h: 820, ancho: 190, padre: S3.el, z: 'z3' });
const G3 = new Grafico({ velas: VC, h: LAY.grafH, padre: S3.el, titulo: 'DESPUÉS DE UNA SUBIDA' });
G3.vista = norm([[0, { i0: -.6, i1: 15.6, pmin: 98.6, pmax: 112.6 }]]);
G3.rev = [[tw(4, 'despues'), 6], [tw(4, 'subida'), 10], [tw(4, 'subida') + .5, 11], [XC(4) - .05, 14]];
G3.caja({ i0: 10, i1: 10, etiqueta: 'ESTRELLA', t0: tw(4, 'subida') + .45, rgb: ORO2 });
G3.flecha({ i: 10, p: 111.4, dir: -1, t0: tw(4, 'subida') + .6, largo: 60, rgb: ROJO });
sfx(tw(4, 'fugaz'), 'golpe', { vol: .8 }); sfx(tw(4, 'contrario') - .1, 'transicion', { vol: .5 }); sfx(tw(4, 'subida') + .45, 'golpe-corto', { vol: .7 });

/* ---------- S4 · 3 · doji: abre y cierra en el mismo precio ---------- */
const S4 = escena(5, 5, eyebrow('VELA 3 DE 5') + titulo(['EL *DOJI*'], '', 180) + chip('APERTURA <b>=</b> CIERRE', 'xl') +
  `<div class="L chn xl">${icon('scale', 40, 2.2)}<span><b>INDECISIÓN</b></span></div>`, (t, s) => {
  const [ey, tt, c1, c2] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(5, 'doji'), LAY.tit - 40);
  VG4.pintar(t, { x: CX, y: 1030, o: ENT(t, s), f: clamp((t - tw(5, 'abre') + .1) / (tw(5, 'precio') + .3 - tw(5, 'abre'))) });
  ent(c1, t, tw(5, 'mismo') - .05, CX, 600, { dy: 20, t1: tw(5, 'nadie') - .2 });
  ent(c2, t, tw(5, 'batalla') - .3, CX, 600, { dy: 20 });
});
const VG4 = new VelaGigante({ v: [100, 116, 85, 100.3], w: 1000, h: 820, ancho: 190, padre: S4.el, z: 'z3' });
sfx(tw(5, 'doji'), 'golpe', { vol: .8 }); sfx(tw(5, 'mismo'), 'tick', { vol: .8 }); sfx(tw(5, 'batalla') - .3, 'nota', { vol: .6 });

/* ---------- S5 · 4 · envolvente alcista ---------- */
const S5 = escena(6, 6, eyebrow('VELA 4 DE 5') + titulo(['ENVOLVENTE', '*ALCISTA*'], '', 150), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, 'alcista'));
  G5.pintar(t, { x: CX, y: 1030, o: ENT(t, s) });
});
const G5 = new Grafico({ velas: [[103.9, 104.4, 100.9, 101.3], [101.1, 105.4, 100.6, 105.0]], w: 860, h: 780, padre: S5.el, ...sinMarco, anchoVela: .5 });
G5.vista = norm([[0, { i0: -.9, i1: 1.9, pmin: 99.6, pmax: 106.3 }]]);
G5.rev = [[XC(5), .4], [XC(5) + .6, 1], [tw(6, 'verde') - .1, 1], [tw(6, 'completo') + .1, 2]];
G5.linea({ p: 103.9, i0: -.45, i1: 1.45, dash: [10, 10], rgb: CREMA, t0: tw(6, 'cubre') - .1, ancho: 2 });
G5.linea({ p: 101.3, i0: -.45, i1: 1.45, dash: [10, 10], rgb: CREMA, t0: tw(6, 'cubre'), ancho: 2 });
G5.caja({ i0: 0, i1: 1, p0: 100.6, p1: 105.4, etiqueta: 'LA ENVUELVE', t0: tw(6, 'completo'), rgb: ORO2, pad: 70, abajo: true });
sfx(tw(6, 'verde'), 'aire', { vol: .6 }); sfx(tw(6, 'cubre'), 'barrido', { vol: .4 }); sfx(tw(6, 'completo'), 'golpe-corto', { vol: .75 });
TINTE = norm([[0, { v: .6, r: -1 }], [tw(0, 'girar') - .2, {}], [tw(0, 'girar') + .5, { v: .8, r: 1 }], [XC(1) - .3, {}], [XC(1), { v: 0 }],
  [tw(6, 'verde'), {}], [tw(6, 'completo'), { v: .8, r: 1 }], [XC(6) - .3, {}], [XC(6), { v: 0 }]]);

/* ---------- S6 · 5 · estrella de la manana ---------- */
const S6 = escena(7, 7, eyebrow('VELA 5 DE 5') + titulo(['ESTRELLA DE', 'LA *MAÑANA*'], '', 150), (t, s) => {
  const [ey, tt] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(7, 'manana'));
  G6.pintar(t, { x: CX, y: 1040, o: ENT(t, s) });
});
const G6 = new Grafico({ velas: [[106.2, 106.5, 101.3, 101.6], [101.3, 101.9, 100.2, 100.9], [101.2, 105.3, 100.9, 104.9]], w: 940, h: 780,
  padre: S6.el, ...sinMarco, anchoVela: .52 });
G6.vista = norm([[0, { i0: -.8, i1: 2.8, pmin: 99.4, pmax: 107.2 }]]);
G6.rev = [[XC(6), 0], [tw(7, 'roja') - .2, 0], [tw(7, 'fuerte') + .1, 1], [tw(7, 'pequena') - .1, 1], [tw(7, 'duda') + .1, 2], [tw(7, 'verde') - .1, 2], [tw(7, 'mitad'), 3]];
G6.linea({ p: 103.9, i0: -.4, i1: 2.45, dash: [10, 9], rgb: ORO2, etiqueta: '50 %', t0: tw(7, 'mitad') - .1, dy: -30 });
G6.caja({ i0: 0, i1: 2, p0: 100.2, p1: 106.5, etiqueta: 'GIRO ALCISTA', t0: tw(7, 'roja', 2) + .1, rgb: VERDE, pad: 50, abajo: true });
sfx(tw(7, 'roja'), 'tick', { vol: .7 }); sfx(tw(7, 'pequena'), 'tick', { vol: .7 }); sfx(tw(7, 'verde'), 'aire', { vol: .6 });
sfx(tw(7, 'mitad'), 'golpe-corto', { vol: .75 }); sfx(tw(7, 'roja', 2) + .1, 'nota', { vol: .6 });

/* ---------- S7 · la regla: importa donde aparece (y espera la confirmacion) ---------- */
const VNADA = serie([{ desde: 104, mover: 6, hasta: 106, vol: 1.2, contra: .4 }, { mover: 5, hasta: 103.8, vol: 1.2, contra: .4 },
  { vela: [103.8, 104.2, 101.9, 104.0] }, { mover: 5, hasta: 104.6, vol: 1.1, contra: .45 }], 54);
const VSOP = serie([{ desde: 106, mover: 6, hasta: 101.2, vol: .5 }, { vela: [101.2, 102.4, 100.9, 102.2] }, { mover: 4, hasta: 104, vol: .5 },
  { mover: 5, hasta: 101.4, vol: .5 }, { vela: [101.4, 101.7, 99.9, 101.6] }, { vela: [101.6, 103.2, 101.5, 103.0] }], 55);
const S7 = escena(8, 9, eyebrow('LA REGLA') + titulo(['IMPORTA *DÓNDE*'], '', 150) + sino(false) + sino(true), (t, s) => {
  const [ey, tt, no, si] = S7.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(8, 'donde'), LAY.tit - 40);
  const p = ENT(t, s);
  G7a.pintar(t, { x: CX, y: 790 + (1 - p) * 30, o: clamp(p * 1.8) });
  G7b.pintar(t, { x: CX, y: 1205 + (1 - p) * 30, o: clamp(p * 1.8) * P(t, s.a + .15, .4) });
  brote(no, t, tw(9, 'nada') - .05, 930, 650, { s0: .3 });
  brote(si, t, tw(9, 'soporte') - .05, 930, 1065, { s0: .3 });
});
const G7a = new Grafico({ velas: VNADA, h: 380, padre: S7.el, titulo: 'EN MEDIO DE LA NADA', cab: 70 });
G7a.vista = norm([[0, { i0: -.6, i1: 17.6, pmin: null, pmax: null }]]);
G7a.rev = [[XC(7), 9], [XC(7) + 1, 17]];
G7a.foco(11, 11, tw(9, 'nada') - .1, 1e9, { min: .35 });
G7a.caja({ i0: 11, i1: 11, t0: tw(9, 'nada') - .1, rgb: ROJO, pad: 18 });
const G7b = new Grafico({ velas: VSOP, h: 380, padre: S7.el, titulo: 'SOBRE UN SOPORTE', cab: 70 });
G7b.vista = norm([[0, { i0: -.6, i1: 19.6, pmin: 99.2, pmax: 106.6 }]]);
G7b.rev = [[XC(7), 10], [XC(7) + 1, 17], [tw(9, 'confirmacion') - .1, 17], [tw(9, 'confirmacion') + .7, 18]];
G7b.zona({ p0: 99.9, p1: 101.2, i0: 'ini', i1: 'fin', t0: tw(9, 'soporte') - .2, rgb: ORO, etiqueta: 'SOPORTE', tam: 20 });
G7b.foco(16, 17, tw(9, 'soporte') - .1, 1e9, { min: .35 });
G7b.caja({ i0: 16, i1: 16, t0: tw(9, 'soporte') - .1, rgb: VERDE, pad: 18 });
G7b.marca({ i: 17, p: 103.2, texto: 'CONFIRMACIÓN', t0: tw(9, 'confirmacion') + .3, rgb: VERDE, tam: 20, sep: 36, solida: true });
sfx(tw(8, 'donde'), 'golpe', { vol: .8 }); sfx(tw(9, 'soporte'), 'nota', { vol: .7 }); sfx(tw(9, 'nada'), 'descarte', { vol: .8 });
sfx(tw(9, 'confirmacion'), 'nota-doble', { vol: .6 });

/* ---------- S8 · cierre ---------- */
const CTA = ctaNova({ a: XC(9), tPregunta: tw(10, 'aprender') - .1, tClave: tw(10, 'trading'), tSenales: tw(10, 'senales'), tEscribe: tw(10, 'comenta'), tEnvia: tw(10, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(9) - .1 });
