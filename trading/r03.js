/* =====================================================================
   REEL 03 · ESTRUCTURA DEL MERCADO
   f0 gancho (¿sabes leer esto? -> a ciegas) · f1 ondas como escalera · f2 alcista · f3 bajista · f4 rango
   f5-f6 quiebre del ultimo minimo = cambio de caracter · f7 regla: a favor de la estructura · f8 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const enGraf = (G, t, s, o = {}) => { const p = ENT(t, s); G.pintar(t, { x: CX, y: LAY.graf + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8) * (o.o ?? 1), b: (1 - p) * 8 + (o.b ?? 0) }); };

/* datos: subida en escalera, bajada en escalera, rango y una subida que se quiebra */
const SUBE = ondas(100, [[5, 106], [3, 103], [5, 109.5], [3, 106.2], [5, 113], [3, 110], [4, 115.5]], 61);
const BAJA = ondas(115.5, [[5, 109.5], [3, 112.5], [5, 106], [3, 109.2], [5, 102.5], [3, 105.5], [4, 100]], 62);
const RANGO = ondas(104, [[4, 107], [4, 101.3], [4, 106.8], [4, 101.4], [4, 106.9], [3, 101.6], [3, 104.6]], 63, .45);
const QUIEBRE = ondas(100, [[5, 106], [3, 103], [5, 109.5], [3, 106.3], [4, 111], [5, 104.2], [2, 105.4], [5, 101]], 64);
const gS = SUBE.giros, gB = BAJA.giros, gQ = QUIEBRE.giros;

/* ---------- S1 · ¿sabes leer esto? (si no, operas a ciegas) ---------- */
const S1 = escena(0, 0, eyebrow('TRADING · PARTE 3') + titulo(['¿SABES LEER', '*ESTO*?'], '', 156), (t, s) => {
  const [ey, tt] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'esto'));
  const ciega = P(t, tw(0, 'ciegas') - .25, .5, E.io3);                                 // "a ciegas": el grafico se nubla
  G1.pintar(t, { x: CX, y: LAY.graf, o: 1 - .55 * ciega, b: 16 * ciega, s: 1 + .03 * ciega });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: SUBE.V, h: LAY.grafH, padre: S1.el, titulo: 'ESTRUCTURA' });
G1.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 98.4, pmax: 117.4 }]]);
G1.rev = [[0, 28]];
G1.zigzag({ pts: gS, t0: .2, t1Dibujo: tw(0, 'ciegas'), rgb: ORO2, ancho: 3 });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'ciegas') - .2, 'transicion', { vol: .5 });

/* ---------- S2 · el precio avanza en ondas, como una escalera ---------- */
const S2 = escena(1, 1, eyebrow('EL MOVIMIENTO') + titulo(['AVANZA EN', '*ONDAS*'], '', 156), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(1, 'ondas'));
  enGraf(G2, t, s);
});
const G2 = new Grafico({ velas: SUBE.V, h: LAY.grafH, padre: S2.el, titulo: 'ONDAS' });
G2.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 98.4, pmax: 117.4 }]]);
G2.rev = [[0, 28]];
G2.segmento({ i0: 0, p0: 100, i1: 27, p1: 115.5, rgb: ROJO, dash: [12, 10], t0: tw(1, 'recta') - .1, t1: tw(1, 'ondas') - .1, etiqueta: 'LÍNEA RECTA ✗', dy: -36, puntos: false });
G2.zigzag({ pts: gS, t0: tw(1, 'ondas') - .05, t1Dibujo: tw(1, 'escalera') + .2, rgb: ORO2, ancho: 4 });
for (let j = 2; j < gS.length - 1; j += 2) {                                              // peldanos: cada piso mas alto que el anterior
  G2.linea({ p: gS[j][1], i0: gS[j][0] - .5, i1: gS[j][0] + 4.5, rgb: VERDE, t0: tw(1, 'escalera') + (j - 2) * .1, ancho: 3 });
}
sfx(tw(1, 'recta'), 'descarte', { vol: .7 }); sfx(tw(1, 'ondas'), 'aire', { vol: .6 }); sfx(tw(1, 'escalera'), 'tick', { vol: .8 });

/* ---------- S3 · tendencia alcista: maximos y minimos mas altos ---------- */
const S3 = escena(2, 2, eyebrow('TENDENCIA') + titulo(['TENDENCIA', '+ALCISTA+'], '', 156), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'alcista'));
  enGraf(G3, t, s);
});
const G3 = new Grafico({ velas: SUBE.V, h: LAY.grafH, padre: S3.el, titulo: 'TENDENCIA ALCISTA' });
G3.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 97.4, pmax: 118.6 }]]);
G3.rev = [[0, 28]];
G3.zigzag({ pts: gS, t0: XC(1), dur: .4, rgb: ORO2, ancho: 2 });
[1, 3, 5, 7].forEach((j, k) => G3.marca({ i: gS[j][0], p: gS[j][1], texto: k ? 'MÁX ↑' : 'MÁX', lado: 1, t0: tw(2, 'maximo') + k * .18, rgb: VERDE, tam: 22 }));
[2, 4, 6].forEach((j, k) => G3.marca({ i: gS[j][0], p: gS[j][1], texto: k ? 'MÍN ↑' : 'MÍN', lado: -1, t0: tw(2, 'minimo') + k * .18, rgb: VERDE, tam: 22 }));
G3.segmento({ i0: gS[2][0], p0: gS[2][1], i1: gS[6][0], p1: gS[6][1], ext: 4, rgb: VERDE, dash: [8, 8], t0: tw(2, 'tambien'), puntos: false });
sfx(tw(2, 'maximo'), 'tick', { vol: .8 }); sfx(tw(2, 'minimo'), 'tick', { vol: .8 }); sfx(tw(2, 'tambien'), 'nota', { vol: .5 });

/* ---------- S4 · tendencia bajista: al reves ---------- */
const S4 = escena(3, 3, eyebrow('TENDENCIA') + titulo(['TENDENCIA', '~BAJISTA~'], '', 156), (t, s) => {
  const [ey, tt] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(3, 'bajista'));
  enGraf(G4, t, s);
});
const G4 = new Grafico({ velas: BAJA.V, h: LAY.grafH, padre: S4.el, titulo: 'TENDENCIA BAJISTA' });
G4.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 95.6, pmax: 118.6 }]]);
G4.rev = [[XC(2), 8], [XC(2) + 1.2, 28]];
[1, 3, 5, 7].forEach((j, k) => G4.marca({ i: gB[j][0], p: gB[j][1], texto: k ? 'MÍN ↓' : 'MÍN', lado: -1, t0: tw(3, 'minimos') + k * .16, rgb: ROJO, tam: 22 }));
[2, 4, 6].forEach((j, k) => G4.marca({ i: gB[j][0], p: gB[j][1], texto: k ? 'MÁX ↓' : 'MÁX', lado: 1, t0: tw(3, 'maximos') + k * .16, rgb: ROJO, tam: 22 }));
sfx(tw(3, 'maximos'), 'tick', { vol: .8 }); sfx(tw(3, 'minimos'), 'tick', { vol: .8 });

/* ---------- S5 · rango: entre un techo y un piso ---------- */
const S5 = escena(4, 4, eyebrow('SIN DIRECCIÓN') + titulo(['EN *RANGO*'], '', 170), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'rango'), LAY.tit - 40);
  enGraf(G5, t, s);
});
const G5 = new Grafico({ velas: RANGO.V, h: LAY.grafH, padre: S5.el, titulo: 'RANGO' });
G5.vista = norm([[0, { i0: -.6, i1: 26.6, pmin: 98.6, pmax: 109.6 }]]);
G5.rev = [[XC(3), 6], [tw(4, 'rango'), 26]];
G5.zona({ p0: 106.3, p1: 107.4, etiqueta: 'TECHO', t0: tw(4, 'techo') - .05, rgb: ROJO });
G5.zona({ p0: 100.8, p1: 101.9, etiqueta: 'PISO', t0: tw(4, 'piso') - .05, rgb: VERDE });
sfx(tw(4, 'techo'), 'barrido', { vol: .45 }); sfx(tw(4, 'piso'), 'barrido', { vol: .45 });

/* ---------- S6 · la senal: rompe su ultimo minimo -> cambio de caracter ---------- */
const S6 = escena(5, 6, eyebrow('LA SEÑAL QUE MÁS IMPORTA') + titulo(['CAMBIO DE', '*CARÁCTER*'], '', 156), (t, s) => {
  const [ey, tt] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, 'caracter'));
  enGraf(G6, t, s);
});
const iHL = gQ[4][0], pHL = gQ[4][1];                                                     // el ultimo minimo alto de la subida
const iRompe = QUIEBRE.V.findIndex((v, i) => i > gQ[5][0] && v[3] < pHL);                 // la vela que cierra debajo
const G6 = new Grafico({ velas: QUIEBRE.V, h: LAY.grafH, padre: S6.el, titulo: 'ESTRUCTURA' });
G6.vista = norm([[0, { i0: -.6, i1: 32.6, pmin: 98.6, pmax: 113.2 }]]);
G6.rev = [[XC(4), 14], [tw(5, 'subida'), gQ[5][0] + 1], [tw(5, 'rompe') - .2, iRompe], [tw(5, 'quiebra'), iRompe + 1], [tw(6, 'giro'), iRompe + 3], [XC(6) - .2, 32]];
G6.zigzag({ pts: gQ.slice(0, 6), t0: tw(5, 'subida'), dur: .9, rgb: VERDE, ancho: 3 });
G6.marca({ i: iHL, p: pHL, texto: 'ÚLTIMO MÍNIMO', lado: -1, t0: tw(5, 'ultimo') - .05, rgb: ORO2, tam: 22 });
G6.linea({ p: pHL, i0: iHL, i1: 'fin', rgb: ORO2, dash: [10, 8], t0: tw(5, 'minimo'), ancho: 2.5 });
G6.foco(iRompe, iRompe, tw(5, 'quiebra') - .2, tw(6, 'giro'), { min: .4 });
G6.marca({ i: iRompe, p: QUIEBRE.V[iRompe][2], texto: 'QUIEBRE', lado: -1, t0: tw(5, 'quiebra') - .1, rgb: ROJO, tam: 24, solida: true });
G6.flecha({ i: iRompe + 2, p: QUIEBRE.V[iRompe + 2][1], dir: -1, t0: tw(6, 'giro'), largo: 70, rgb: ROJO });
TINTE = norm([[0, { v: 0, r: 0 }], [XC(1), {}], [XC(1) + .5, { v: .8, r: 1 }], [XC(2) - .3, {}], [XC(2) + .3, { v: .8, r: -1 }], [XC(3) - .3, {}], [XC(3) + .3, { v: 0 }],
  [tw(5, 'quiebra') - .2, {}], [tw(5, 'quiebra') + .4, { v: 1, r: -1 }], [XC(6) - .3, {}], [XC(6) + .3, { v: 0 }]]);
sfx(tw(5, 'ultimo'), 'tick', { vol: .8 }); sfx(tw(5, 'quiebra') - .1, 'golpe-grave', { vol: .8 }); sfx(tw(6, 'caracter'), 'golpe-corto', { vol: .7 });

/* ---------- S7 · la regla: a favor de la estructura, no en contra ---------- */
const S7 = escena(7, 7, eyebrow('LA REGLA') + titulo(['A FAVOR DE LA', '*ESTRUCTURA*'], '', 140) +
  `<div class="L chn v xl">${icon('check', 40, 3)}<span><b>A FAVOR</b></span></div>` + `<div class="L chn r xl">${icon('x', 40, 3)}<span><b>EN CONTRA</b></span></div>`, (t, s) => {
  const [ey, tt, si, no] = S7.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(7, 'estructura'));
  const p = ENT(t, s);
  G7.pintar(t, { x: CX, y: 1070 + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 });
  ent(si, t, tw(7, 'favor') - .05, 300, 650, { dx: -30, dy: 0, pulso: tw(7, 'favor') + .3 });
  const nq = P(t, tw(7, 'contra') + .35, .4, E.out3);
  ent(no, t, tw(7, 'contra') - .1, 790, 650, { dx: 30, dy: 0 });
  no.style.filter = nq > 0 ? `grayscale(${nq.toFixed(2)})` : '';
});
const G7 = new Grafico({ velas: SUBE.V, h: 640, padre: S7.el, titulo: 'OPERA A FAVOR' });
G7.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 98.4, pmax: 117.4 }]]);
G7.rev = [[0, 28]];
G7.segmento({ i0: gS[2][0], p0: gS[2][1], i1: gS[6][0], p1: gS[6][1], ext: 6, rgb: VERDE, t0: tw(7, 'favor') - .1, ancho: 5, etiqueta: 'A FAVOR', dy: 40 });
sfx(tw(7, 'favor'), 'nota', { vol: .7 }); sfx(tw(7, 'contra'), 'descarte', { vol: .7 });

/* ---------- S8 · cierre ---------- */
const CTA = ctaNova({ a: XC(7), tPregunta: tw(8, 'aprender') - .1, tClave: tw(8, 'trading'), tSenales: tw(8, 'senales'), tEscribe: tw(8, 'comenta'), tEnvia: tw(8, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(7) - .1 });
