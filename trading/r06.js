/* =====================================================================
   REEL 06 · LA ZONA DORADA (FIBONACCI)
   f0 gancho: muchos esperan aqui · f1 impulso, retroceso, avance · f2 se traza del inicio al final del impulso
   f3 niveles 38,2 / 50 / 61,8 · f4 la zona entre 50 y 61,8 · f5 no es magia ni garantia · f6 confirmacion + stop · f7 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const enGraf = (G, t, s, o = {}) => { const p = ENT(t, s); G.pintar(t, { x: CX, y: (o.y ?? LAY.graf) + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 }); };

// A = inicio del impulso (minimo), B = final del impulso (maximo); retroceso hasta la zona dorada, confirmacion y nuevo avance
const VF = serie([{ desde: 102.2, mover: 3, hasta: 100.6, vol: .4 }, { vela: [100.6, 100.9, 99.8, 100.7] }, { mover: 8, hasta: 109.2, vol: .5, contra: .12 },
  { vela: [109.2, 110.4, 109.0, 110.0] }, { mover: 5, hasta: 104.6, vol: .35 }, { vela: [104.6, 104.8, 104.0, 104.5] },
  { vela: [104.5, 106.3, 104.3, 106.1] }, { mover: 6, hasta: 112.2, vol: .5, contra: .15 }], 91);
const iA = 3, pA = 99.8, iB = 12, pB = 110.4, iToque = 18, iConf = 19;
const nivel = r => pB - (pB - pA) * r;
const vistaF = norm([[0, { i0: -.6, i1: 26.6, pmin: 97.6, pmax: 113.8 }]]);
const FIBO = (G, t0, o = {}) => G.fibo({ iA, pA, iB, pB, niveles: [0, .382, .5, .618, 1], zona: [.5, .618], t0, tZona: t0, i1: 'fin', etiquetaZona: 'ZONA DORADA', ...o });

/* ---------- S1 · gancho: muchos esperan justo aqui (la zona dorada) ---------- */
const S1 = escena(0, 0, eyebrow('TRADING · PARTE 6') + titulo(['LA ZONA', '*DORADA*'], '', 160), (t, s) => {
  const [ey, tt] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'dorada'));
  G1.pintar(t, { x: CX, y: LAY.graf });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: VF, h: LAY.grafH, padre: S1.el, titulo: 'FIBONACCI' });
G1.vista = vistaF;
G1.rev = [[0, 15], [tw(0, 'aqui'), 19], [finF(0), 26]];
FIBO(G1, .2, { niveles: [.5, .618], tZona: tw(0, 'aqui') - .2 });
G1.flecha({ i: iToque, p: 104.0, dir: 1, t0: tw(0, 'entrar'), largo: 70, rgb: VERDE });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'aqui') - .2, 'brillo', { vol: .6 }); sfx(tw(0, 'dorada'), 'golpe-corto', { vol: .7 });

/* ---------- S2 · impulso, retroceso y vuelve a avanzar ---------- */
const S2 = escena(1, 1, eyebrow('LA TENDENCIA') + titulo(['IMPULSO Y', '*RETROCESO*'], '', 150), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(1, 'retrocede'));
  enGraf(G2, t, s);
});
const G2 = new Grafico({ velas: VF, h: LAY.grafH, padre: S2.el, titulo: 'TENDENCIA' });
G2.vista = vistaF;
G2.rev = [[XC(0), 4], [tw(1, 'impulso') + .3, 13], [tw(1, 'retrocede') + .3, 19], [tw(1, 'avanzar') + .4, 26]];
G2.segmento({ i0: iA, p0: pA, i1: iB, p1: pB, rgb: VERDE, t0: tw(1, 'impulso') - .1, etiqueta: 'IMPULSO', dy: -30, ancho: 4 });
G2.segmento({ i0: iB, p0: pB, i1: iToque, p1: 104.0, rgb: ROJO, t0: tw(1, 'retrocede') - .05, etiqueta: 'RETROCESO', dy: 34, ancho: 4, puntos: false });
G2.segmento({ i0: iToque, p0: 104.0, i1: 25, p1: 112.2, rgb: VERDE, t0: tw(1, 'avanzar') - .05, ancho: 4, puntos: false });
sfx(tw(1, 'impulso'), 'aire', { vol: .6 }); sfx(tw(1, 'retrocede'), 'aire-salida', { vol: .6 }); sfx(tw(1, 'avanzar'), 'subida', { vol: .3 });

/* ---------- S3 · se traza desde el inicio del impulso hasta su final ---------- */
const S3 = escena(2, 2, eyebrow('LA HERRAMIENTA') + titulo(['TRAZA EL', '*FIBONACCI*'], '', 150), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'fibonacci'));
  enGraf(G3, t, s);
});
const G3 = new Grafico({ velas: VF, h: LAY.grafH, padre: S3.el, titulo: 'FIBONACCI' });
G3.vista = vistaF;
G3.rev = [[0, 19]];
G3.marca({ i: iA, p: pA, texto: 'INICIO', lado: -1, t0: tw(2, 'inicio') - .05, rgb: ORO2, tam: 24, solida: true });
G3.marca({ i: iB, p: pB, texto: 'FINAL', lado: 1, t0: tw(2, 'final') - .05, rgb: ORO2, tam: 24, solida: true });
G3.segmento({ i0: iA, p0: pA, i1: iB, p1: pB, rgb: ORO2, dash: [12, 9], t0: tw(2, 'inicio') + .1, dur: Math.max(.4, tw(2, 'final') - tw(2, 'inicio') - .1), puntos: false });
sfx(tw(2, 'inicio'), 'tick', { vol: .8 }); sfx(tw(2, 'final'), 'tick', { vol: .8 });

/* ---------- S4 · los niveles: 38,2 · 50 · 61,8 % ---------- */
const S4 = escena(3, 3, eyebrow('APARECEN') + titulo(['LOS *NIVELES*'], '', 160), (t, s) => {
  const [ey, tt] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(3, 'niveles'), LAY.tit - 40);
  enGraf(G4, t, s);
});
const G4 = new Grafico({ velas: VF, h: LAY.grafH, padre: S4.el, titulo: 'NIVELES' });
G4.vista = vistaF;
G4.rev = [[0, 19]];
FIBO(G4, XC(2) + .1, { zona: null, tiempos: [XC(2) + .1, tw(3, '38,2') - .05, tw(3, '50') - .05, tw(3, '61,8%') - .05, XC(2) + .2] });
['38,2', '50', '61,8%'].forEach(w => sfx(tw(3, w), 'tick', { vol: .8 }));

/* ---------- S5 · la zona entre 50 y 61,8: entrar a favor de la tendencia ---------- */
const S5 = escena(4, 4, eyebrow('ENTRE 50 Y 61,8 %') + titulo(['LA ZONA', '*DORADA*'], '', 160), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'zona'));
  enGraf(G5, t, s);
});
const G5 = new Grafico({ velas: VF, h: LAY.grafH, padre: S5.el, titulo: 'ZONA DORADA' });
G5.vista = vistaF;
G5.rev = [[XC(3), 13], [tw(4, 'entrar') - .2, 19], [tw(4, 'favor'), 20], [XC(4), 24]];
FIBO(G5, XC(3), { tZona: tw(4, 'zona') - .05 });
G5.flecha({ i: iToque, p: 104.0, dir: 1, t0: tw(4, 'favor') - .1, largo: 70, rgb: VERDE });
sfx(tw(4, 'zona'), 'brillo', { vol: .6 }); sfx(tw(4, 'favor'), 'golpe-corto', { vol: .7 });

/* ---------- S6 · no es magia ni garantia: muchos miran los mismos niveles ---------- */
const S6 = escena(5, 5, eyebrow('OJO') + titulo(['NO ES *MAGIA*'], '', 160) +
  `<div class="L chn r xl">${icon('x', 40, 3)}<span>NI <b>GARANTÍA</b></span></div>` +
  `<div class="L chn xl">${icon('users', 40, 2.2)}<span>MUCHOS MIRAN <b>LO MISMO</b></span></div>`, (t, s) => {
  const [ey, tt, c1, c2] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(5, 'magia'), LAY.tit - 40);
  ent(c1, t, tw(5, 'garantia') - .05, CX, 600, { dy: 20, t1: tw(5, 'miran') - .25 });
  ent(c2, t, tw(5, 'miran') - .05, CX, 600, { dy: 20 });
  enGraf(G6, t, s, { y: 1040 });
});
const G6 = new Grafico({ velas: VF, h: 720, padre: S6.el, titulo: 'REACCIÓN' });
G6.vista = vistaF;
G6.rev = [[0, 18], [tw(5, 'reacciona') - .1, 21]];
FIBO(G6, XC(4), { niveles: [.5, .618] });
G6.caja({ i0: iToque, i1: iConf, p0: 103.9, p1: 106.4, etiqueta: 'REACCIONA', t0: tw(5, 'reacciona') - .05, rgb: VERDE, pad: 18, abajo: true });
sfx(tw(5, 'garantia'), 'descarte', { vol: .7 }); sfx(tw(5, 'miran'), 'tick', { vol: .8 }); sfx(tw(5, 'reacciona'), 'golpe-corto', { vol: .7 });

/* ---------- S7 · vela de confirmacion + stop loss debajo del inicio del impulso ---------- */
const S7 = escena(6, 6, eyebrow('CÓMO ENTRAR') + titulo(['CONFIRMA Y', '*PROTEGE*'], '', 156), (t, s) => {
  const [ey, tt] = S7.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, 'stop'));
  enGraf(G7, t, s);
});
const G7 = new Grafico({ velas: VF, h: LAY.grafH, padre: S7.el, titulo: 'ENTRADA' });
G7.vista = vistaF;
G7.rev = [[XC(5), 19], [tw(6, 'confirmacion') - .2, 19], [tw(6, 'confirmacion') + .4, 20]];
FIBO(G7, XC(5), { niveles: [.5, .618] });
G7.marca({ i: iConf, p: VF[iConf][1], texto: 'CONFIRMACIÓN', lado: 1, t0: tw(6, 'confirmacion') + .3, rgb: VERDE, tam: 22, solida: true });
G7.marca({ i: iA, p: pA, texto: 'INICIO', lado: 1, sep: 40, t0: tw(6, 'inicio') - .1, rgb: ORO2, tam: 22 });
G7.linea({ p: pA - .45, i0: iA - .5, i1: 'fin', rgb: ROJO, t0: tw(6, 'debajo') - .1, etiqueta: 'STOP LOSS', lado: 'der', dy: 30, ancho: 3 });
sfx(tw(6, 'confirmacion'), 'tick', { vol: .8 }); sfx(tw(6, 'debajo'), 'barrido', { vol: .5 });

/* ---------- S8 · cierre ---------- */
const CTA = ctaNova({ a: XC(6), tPregunta: tw(7, 'aprender') - .1, tClave: tw(7, 'trading'), tSenales: tw(7, 'senales'), tEscribe: tw(7, 'comenta'), tEnvia: tw(7, 'envio') });
PINTAR.push(CTA.pintar);

TINTE = norm([[0, { v: 0, r: 0 }]]);
CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(6) - .1 });
