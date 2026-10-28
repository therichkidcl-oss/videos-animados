/* =====================================================================
   REEL 07 · POR QUE EL PRECIO BARRE TU STOP LOSS (liquidez)
   f0-f1 gancho: el precio toca tu stop y se va a tu favor; no es mala suerte · f2 donde todos ponen el stop = liquidez
   f3 minimos y maximos iguales bajo un soporte obvio · f4-f5 las ordenes grandes necesitan liquidez: barrido y giro
   f6 la clave: no pongas el stop donde todos y espera el barrido · f7 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const enGraf = (G, t, s, o = {}) => { const p = ENT(t, s); G.pintar(t, { x: CX, y: (o.y ?? LAY.graf) + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 }); };

// gancho: entras, el precio barre tu stop y despues se va a tu favor
const VG = serie([{ desde: 104.2, mover: 4, hasta: 101.0, vol: .4 }, { vela: [101.0, 101.6, 100.6, 101.4] }, { mover: 2, hasta: 100.9, vol: .3 },
  { vela: [100.9, 101.2, 99.5, 100.8] }, { mover: 6, hasta: 106.6, vol: .5, contra: .1 }], 101);
const iEnt = 4, iBarG = 7;
// minimos iguales, maximos iguales, soporte obvio y el barrido
const VL = serie([{ desde: 106, mover: 3, hasta: 101.6, vol: .4 }, { vela: [101.6, 101.8, 100.9, 101.2] }, { mover: 2, hasta: 104.3, vol: .4 },
  { vela: [104.3, 105.0, 104.1, 104.6] }, { mover: 2, hasta: 101.5, vol: .4 }, { vela: [101.5, 101.7, 100.9, 101.3] }, { mover: 2, hasta: 104.4, vol: .4 },
  { vela: [104.4, 105.0, 104.2, 104.5] }, { mover: 2, hasta: 102.0, vol: .4 }, { vela: [102.0, 102.3, 100.0, 101.9] }, { mover: 5, hasta: 107.6, vol: .5 }], 102);
const iL1 = 3, iH1 = 6, iL2 = 9, iH2 = 12, iBar = 15, pMin = 100.9, pMax = 105.0;
const vistaL = norm([[0, { i0: -.6, i1: 21.6, pmin: 98.6, pmax: 109.2 }]]);

/* ---------- S1 · gancho: tocan tu stop... y despues se va a tu favor. No es mala suerte ---------- */
const S1 = escena(0, 1, eyebrow('TRADING · PARTE 7') + titulo(['¿TE HA', '*PASADO*?'], '', 160) +
  `<div class="L chn r xl">${icon('x', 40, 3)}<span>NO ES <b>MALA SUERTE</b></span></div>`, (t, s) => {
  const [ey, tt, c1] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'pasado'));
  G1.pintar(t, { x: CX, y: 1065 });
  ent(c1, t, tw(1, 'suerte') - .3, CX, 632, { dy: 20 });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: VG, h: 700, padre: S1.el, titulo: 'TU OPERACIÓN' });
G1.vista = norm([[0, { i0: -.6, i1: 14.6, pmin: 97.6, pmax: 108.2 }]]);
G1.rev = [[0, 5], [tw(0, 'toca') - .2, 7], [tw(0, 'loss') + .1, 8], [tw(0, 'favor'), 13], [finF(0) + .3, 14]];
G1.posicion({ i0: iEnt + .5, i1: 14.4, entrada: 101.4, sl: 100.1, tp: 104.0, t0: .2, etiquetaTp: 'OBJETIVO' });
G1.foco(iBarG, iBarG, tw(0, 'toca'), tw(0, 'favor'), { min: .5 });
G1.marca({ i: iBarG, p: 99.5, texto: 'STOP TOCADO', lado: -1, t0: tw(0, 'loss'), rgb: ROJO, tam: 22, solida: true });
G1.flecha({ i: 10, p: VG[10][2], dir: 1, t0: tw(0, 'favor'), largo: 80, rgb: VERDE });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'loss'), 'fallo', { vol: .6 }); sfx(tw(0, 'favor'), 'subida', { vol: .35 }); sfx(tw(1, 'suerte') - .3, 'golpe-corto', { vol: .7 });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(0, 'loss') - .1, {}], [tw(0, 'loss') + .3, { v: .9, r: -1 }], [tw(0, 'favor'), {}], [tw(0, 'favor') + .5, { v: .8, r: 1 }], [XC(1) - .2, {}], [XC(1) + .2, { v: 0 }]]);

/* ---------- S2 · donde todos ponen el stop se acumulan ordenes: liquidez ---------- */
const S2 = escena(2, 2, eyebrow('LA CLAVE DE TODO') + titulo(['ESO ES', '*LIQUIDEZ*'], '', 156), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'liquidez'));
  enGraf(G2, t, s);
});
const G2 = new Grafico({ velas: VL, h: LAY.grafH, padre: S2.el, titulo: 'DÓNDE ESTÁN LOS STOPS' });
G2.vista = vistaL;
G2.rev = [[0, 14]];
G2.zona({ p0: pMin, p1: 101.9, etiqueta: 'SOPORTE', t0: XC(1) + .2, rgb: VERDE });
G2.liquidez({ p: pMin - .45, i0: 1, i1: 'fin', texto: 'SL', n: 6, t0: tw(2, 'pone') - .2, rgb: ROJO });
G2.texto({ i: 7, p: 99.3, texto: 'LIQUIDEZ $$$', tam: 54, rgb: ORO2, t0: tw(2, 'liquidez') - .05 });
sfx(tw(2, 'pone'), 'tick-suave', { vol: .7 }); sfx(tw(2, 'acumulan'), 'tick-suave', { vol: .7 }); sfx(tw(2, 'liquidez'), 'golpe', { vol: .8 });

/* ---------- S3 · minimos iguales, maximos iguales, debajo de un soporte obvio ---------- */
const S3 = escena(3, 3, eyebrow('DÓNDE SE JUNTAN') + titulo(['MÍNIMOS Y MÁXIMOS', '*IGUALES*'], '', 132), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(3, 'iguales'));
  enGraf(G3, t, s);
});
const G3 = new Grafico({ velas: VL, h: LAY.grafH, padre: S3.el, titulo: 'LIQUIDEZ' });
G3.vista = vistaL;
G3.rev = [[0, 14]];
G3.linea({ p: pMin, i0: iL1 - .5, i1: 'fin', rgb: ROJO, dash: [8, 7], t0: tw(3, 'minimos') - .05, etiqueta: 'MÍNIMOS IGUALES', lado: 'der', dy: 30, ancho: 2.5 });
G3.linea({ p: pMax, i0: iH1 - .5, i1: 'fin', rgb: VERDE, dash: [8, 7], t0: tw(3, 'maximos') - .05, etiqueta: 'MÁXIMOS IGUALES', lado: 'der', dy: -30, ancho: 2.5 });
[iL1, iL2].forEach((i, k) => G3.marca({ i, p: pMin, texto: '=', lado: -1, sep: 34, t0: tw(3, 'minimos') + k * .15, rgb: ROJO, tam: 22 }));
[iH1, iH2].forEach((i, k) => G3.marca({ i, p: pMax, texto: '=', lado: 1, sep: 34, t0: tw(3, 'maximos') + k * .15, rgb: VERDE, tam: 22 }));
G3.zona({ p0: pMin + .05, p1: 102.0, etiqueta: 'SOPORTE OBVIO', t0: tw(3, 'soporte') - .05, rgb: ORO, lado: 'izq' });
G3.texto({ i: 15.5, p: 99.4, texto: '$$$ STOPS', tam: 46, rgb: ORO2, t0: tw(3, 'stops') - .1 });
sfx(tw(3, 'minimos'), 'tick', { vol: .8 }); sfx(tw(3, 'maximos'), 'tick', { vol: .8 }); sfx(tw(3, 'soporte'), 'barrido', { vol: .5 }); sfx(tw(3, 'stops'), 'golpe-corto', { vol: .7 });

/* ---------- S4 · las ordenes grandes necesitan esa liquidez: el barrido y el giro ---------- */
const S4 = escena(4, 5, eyebrow('LAS ÓRDENES GRANDES') + titulo(['EL *BARRIDO*'], '', 170) +
  `<div class="L chn xl">${icon('building2', 40, 2.2)}<span>ÓRDENES <b>GRANDES</b></span></div>`, (t, s) => {
  const [ey, tt, c1] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(5, 'barre'), LAY.tit - 40);
  ent(c1, t, tw(4, 'ordenes') - .05, CX, 600, { dy: 20, pulso: tw(4, 'llenarse') });
  enGraf(G4, t, s, { y: 1040 });
});
const G4 = new Grafico({ velas: VL, h: 720, padre: S4.el, titulo: 'BARRIDO' });
G4.vista = norm([[0, { i0: 1.4, i1: 21.6, pmin: 98.4, pmax: 109.2 }]]);
G4.rev = [[0, 15], [tw(5, 'barre') - .2, 15], [tw(5, 'nivel') + .1, 16], [tw(5, 'vuelta') + .7, 20]];
G4.linea({ p: pMin, i0: iL1 - .5, i1: 'fin', rgb: ROJO, dash: [8, 7], t0: XC(3) + .1, ancho: 2.5 });
G4.liquidez({ p: pMin - .45, i0: 2, i1: 'fin', texto: '$$$', n: 3, t0: tw(4, 'liquidez') - .1, rgb: ORO2 });
G4.foco(iBar, iBar, tw(5, 'barre'), 1e9, { min: .45 });
G4.marca({ i: iBar, p: VL[iBar][2], texto: 'BARRIDO', lado: -1, t0: tw(5, 'nivel'), rgb: ORO2, tam: 22, solida: true });
G4.flecha({ i: iBar + 1, p: VL[iBar + 1][2], dir: 1, t0: tw(5, 'vuelta'), largo: 70, rgb: VERDE });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(0, 'loss') - .1, {}], [tw(0, 'loss') + .3, { v: .9, r: -1 }], [tw(0, 'favor'), {}], [tw(0, 'favor') + .5, { v: .8, r: 1 }], [XC(1) - .2, {}], [XC(1) + .2, { v: 0 }],
  [tw(5, 'vuelta') - .1, {}], [tw(5, 'vuelta') + .5, { v: .8, r: 1 }], [XC(5) - .2, {}], [XC(5) + .2, { v: 0 }]]);
sfx(tw(4, 'ordenes'), 'tick', { vol: .8 }); sfx(tw(5, 'barre'), 'barrido', { vol: .7 }); sfx(tw(5, 'nivel'), 'golpe-grave', { vol: .7 }); sfx(tw(5, 'vuelta'), 'subida', { vol: .35 });

/* ---------- S5 · la clave: no pongas el stop donde todos; espera el barrido y entra despues ---------- */
const S5 = escena(6, 6, eyebrow('LA CLAVE') + titulo(['ESPERA EL', '*BARRIDO*'], '', 156), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, 'barrido'));
  enGraf(G5, t, s);
});
const G5 = new Grafico({ velas: VL, h: LAY.grafH, padre: S5.el, titulo: 'CÓMO ENTRAR' });
G5.vista = norm([[0, { i0: 1.4, i1: 21.6, pmin: 98.4, pmax: 109.2 }]]);
G5.rev = [[0, 15], [tw(6, 'barrido') - .2, 15], [tw(6, 'barrido') + .5, 16], [tw(6, 'entrar') + .5, 21]];
G5.liquidez({ p: pMin - .45, i0: 2, i1: 14, texto: 'SL', n: 4, t0: tw(6, 'pongas') - .1, rgb: ROJO });
G5.texto({ i: 8, p: 99.2, texto: '✗ DONDE TODOS', tam: 44, rgb: ROJO, t0: tw(6, 'mundo') - .1, t1: tw(6, 'espera') + .3 });
G5.marca({ i: iBar, p: VL[iBar][2], texto: 'BARRIDO', lado: -1, t0: tw(6, 'barrido') + .2, rgb: ORO2, tam: 22, solida: true });
G5.marca({ i: iBar + 1, p: VL[iBar + 1][1], texto: 'ENTRA DESPUÉS', lado: 1, t0: tw(6, 'entrar') - .05, rgb: VERDE, tam: 22, solida: true });
sfx(tw(6, 'mundo'), 'descarte', { vol: .7 }); sfx(tw(6, 'barrido'), 'barrido', { vol: .6 }); sfx(tw(6, 'entrar'), 'nota', { vol: .7 });

/* ---------- S6 · cierre ---------- */
const CTA = ctaNova({ a: XC(6), tPregunta: tw(7, 'aprender') - .1, tClave: tw(7, 'trading'), tSenales: tw(7, 'senales'), tEscribe: tw(7, 'comenta'), tEnvia: tw(7, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(1), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(6) - .1 });
