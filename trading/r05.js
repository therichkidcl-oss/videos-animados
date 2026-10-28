/* =====================================================================
   REEL 05 · RUPTURA Y RETESTEO
   f0 gancho · f1 paso 1 resistencia (3 toques) · f2 paso 2 vela fuerte que rompe y cierra encima
   f3-f4 paso 3 no entrar en la ruptura, esperar el retesteo · f5-f6 paso 4 confirmacion, entrada, stop y objetivo 1:2
   f7 si falla: ruptura falsa, perdida pequena · f8 CTA
   El mismo grafico avanza de escena en escena (mismas velas, cada vez mas formadas).
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const enGraf = (G, t, s, o = {}) => { const p = ENT(t, s); G.pintar(t, { x: CX, y: (o.y ?? LAY.graf) + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 }); };

const BASE = [{ desde: 98, mover: 5, hasta: 104.3, vol: .5 }, { mover: 3, hasta: 102, vol: .5 }, { mover: 3, hasta: 104.6, vol: .5 },
  { mover: 3, hasta: 102.3, vol: .5 }, { mover: 3, hasta: 104.5, vol: .5 }, { mover: 2, hasta: 103.4, vol: .5 },
  { vela: [103.4, 107.0, 103.2, 106.7] }];                                                          // 19: la vela fuerte que rompe
const VR = serie([...BASE, { mover: 2, hasta: 107.4, vol: .4 }, { mover: 3, hasta: 105.6, vol: .4 }, { vela: [105.6, 105.9, 104.9, 105.4] },
  { vela: [105.4, 107.1, 105.2, 106.9] }, { mover: 6, hasta: 112.4, vol: .5, contra: .15 }], 81);
const VF = serie([...BASE, { mover: 2, hasta: 107.2, vol: .4 }, { mover: 2, hasta: 105.6, vol: .4 }, { vela: [105.6, 106.4, 105.0, 106.2] },
  { vela: [106.2, 106.4, 103.6, 103.8] }, { mover: 3, hasta: 101.6, vol: .5 }], 81);
const iRup = 19, iRet = 25, iConf = 26, iFalla = 25;                                  // en VF la 24 es la entrada y la 25 la que vuelve abajo
const toques = [[2, 6], [8, 12], [14, 18]].map(([a, b]) => extremo(VR, a, b, 'max'));
const ZR = { p0: 104.35, p1: 105.3 };
const vistaR = () => norm([[0, { i0: -.6, i1: 33.6, pmin: 96.4, pmax: 114.2 }]]);
const zonaR = (G, t0, o = {}) => G.zona({ ...ZR, i0: 'ini', i1: 'fin', etiqueta: 'RESISTENCIA', t0, rgb: ROJO, ...o });

/* ---------- S1 · gancho: una de las estrategias mas usadas (avance rapido de todo el plan) ---------- */
const S1 = escena(0, 0, eyebrow('TRADING · PARTE 5') + titulo(['RUPTURA Y', '*RETESTEO*'], '', 156), (t, s) => {
  const [ey, tt] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'simple'));
  G1.pintar(t, { x: CX, y: LAY.graf });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: VR, h: LAY.grafH, padre: S1.el, titulo: 'ESTRATEGIA' });
G1.vista = vistaR();
G1.rev = [[0, 12], [finF(0), 33]];
zonaR(G1, .3);
G1.marca({ i: iRup, p: VR[iRup][1], texto: 'RUPTURA', lado: 1, t0: tw(0, 'usadas'), rgb: ORO2, tam: 22 });
G1.marca({ i: iRet, p: VR[iRet][2], texto: 'RETESTEO', lado: -1, t0: tw(0, 'simple') - .2, rgb: VERDE, tam: 22 });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'usadas'), 'tick', { vol: .7 }); sfx(tw(0, 'simple') - .2, 'tick', { vol: .7 });

/* ---------- S2 · paso 1: una resistencia clara (la toco varias veces) ---------- */
const S2 = escena(1, 1, eyebrow('PASO 1 DE 4') + titulo(['MARCA LA', '~RESISTENCIA~'], '', 150), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(1, 'resistencia'));
  enGraf(G2, t, s);
});
const G2 = new Grafico({ velas: VR, h: LAY.grafH, padre: S2.el, titulo: 'PASO 1' });
G2.vista = norm([[0, { i0: -.6, i1: 22.6, pmin: 96.6, pmax: 108.8 }]]);
G2.rev = [[XC(0), 8], [tw(1, 'varias'), 19]];
zonaR(G2, tw(1, 'resistencia') - .05);
toques.forEach(([i, p], k) => G2.marca({ i, p, texto: `${k + 1}`, lado: 1, sep: 40, t0: tw(1, 'varias') + k * .18, rgb: ROJO, tam: 24, solida: true }));
sfx(tw(1, 'resistencia'), 'barrido', { vol: .5 }); [0, 1, 2].forEach(k => sfx(tw(1, 'varias') + k * .18, 'tick', { vol: .75 }));

/* ---------- S3 · paso 2: una vela fuerte rompe y cierra por encima ---------- */
const S3 = escena(2, 2, eyebrow('PASO 2 DE 4') + titulo(['ESPERA LA', '*RUPTURA*'], '', 150), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'rompa'));
  enGraf(G3, t, s);
});
const G3 = new Grafico({ velas: VR, h: LAY.grafH, padre: S3.el, titulo: 'PASO 2' });
G3.vista = norm([[0, { i0: -.6, i1: 22.6, pmin: 96.6, pmax: 108.8 }]]);
G3.rev = [[XC(1), 19], [tw(2, 'fuerte'), 19], [tw(2, 'encima'), 20]];
zonaR(G3, XC(1) + .1);
G3.foco(iRup, iRup, tw(2, 'fuerte'), 1e9, { min: .45 });
G3.marca({ i: iRup, p: VR[iRup][1], texto: 'CIERRA ENCIMA', lado: 1, t0: tw(2, 'encima'), rgb: VERDE, tam: 22, solida: true });
sfx(tw(2, 'fuerte'), 'subida', { vol: .3 }); sfx(tw(2, 'encima'), 'golpe', { vol: .8 });

/* ---------- S4 · paso 3: no entres en la ruptura, espera el retesteo ---------- */
const S4 = escena(3, 4, eyebrow('PASO 3 DE 4') + titulo(['ESPERA EL', '*RETESTEO*'], '', 150), (t, s) => {
  const [ey, tt] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'retesteo'));
  enGraf(G4, t, s);
});
const G4 = new Grafico({ velas: VR, h: LAY.grafH, padre: S4.el, titulo: 'PASO 3' });
G4.vista = norm([[0, { i0: 3.4, i1: 28.6, pmin: 99.2, pmax: 109.4 }]]);
G4.rev = [[XC(2), 20], [tw(3, 'espera'), 21], [tw(3, 'arriba'), 25], [tw(4, 'retesteo'), 26]];
zonaR(G4, XC(2) + .1, { etiqueta: 'NIVEL' });
G4.marca({ i: iRup, p: VR[iRup][1], texto: 'NO ENTRES AQUÍ', lado: 1, t0: tw(3, 'entres') - .05, t1: tw(3, 'espera') + .6, rgb: ROJO, tam: 22, solida: true });
G4.caja({ i0: 23, i1: iRet, p0: 104.7, p1: 106.6, etiqueta: 'RETESTEO', t0: tw(4, 'retesteo') - .05, rgb: VERDE, pad: 18, abajo: true });
sfx(tw(3, 'entres'), 'descarte', { vol: .7 }); sfx(tw(3, 'probar'), 'aire', { vol: .5 }); sfx(tw(4, 'retesteo'), 'golpe-corto', { vol: .8 });

/* ---------- S5 · paso 4: confirmacion -> entrada, stop loss y objetivo 1:2 ---------- */
const S5 = escena(5, 6, eyebrow('PASO 4 DE 4') + titulo(['ENTRA CON', '*CONFIRMACIÓN*'], '', 140), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(5, 'confirmacion'));
  enGraf(G5, t, s);
});
const G5 = new Grafico({ velas: VR, h: LAY.grafH, padre: S5.el, titulo: 'PASO 4' });
G5.vista = norm([[0, { i0: 9.4, i1: 34.6, pmin: 101.4, pmax: 114 }]]);
G5.rev = [[XC(4), 26], [tw(5, 'confirmacion') - .1, 26], [tw(5, 'entras'), 27], [tw(6, 'doble') + .2, 27], [XC(6) - .2, 33]];
zonaR(G5, XC(4) + .1, { etiqueta: 'NIVEL' });
G5.marca({ i: iConf, p: VR[iConf][1], texto: 'CONFIRMACIÓN', lado: 1, t0: tw(5, 'confirmacion'), t1: tw(6, 'stop'), rgb: VERDE, tam: 22, solida: true });
G5.posicion({ i0: iConf + .5, i1: 34.2, entrada: 106.9, sl: 104.15, tp: 112.4, t0: tw(5, 'entras') - .05, tSl: tw(6, 'stop') - .05, tTp: tw(6, 'objetivo') - .05,
  ratio: '1 : 2', tRatio: tw(6, 'doble') - .05 });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(6, 'doble'), {}], [XC(6) - .2, { v: .9, r: 1 }], [XC(6) + .2, { v: 0 }]]);
sfx(tw(5, 'confirmacion'), 'tick', { vol: .8 }); sfx(tw(5, 'entras'), 'golpe-corto', { vol: .8 }); sfx(tw(6, 'stop'), 'tick', { vol: .75 });
sfx(tw(6, 'objetivo'), 'tick', { vol: .75 }); sfx(tw(6, 'doble'), 'nota', { vol: .7 });

/* ---------- S6 · ¿y si falla? ruptura falsa, perdida pequena ---------- */
const S6 = escena(7, 7, eyebrow('SI FALLA') + titulo(['RUPTURA', '~FALSA~'], '', 156) + chip('PÉRDIDA <b>PEQUEÑA</b> · SIGUIENTE', 'r xl'), (t, s) => {
  const [ey, tt, c1] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(7, 'falsa'));
  enGraf(G6, t, s, { y: 1050 });
  ent(c1, t, tw(7, 'pequena') - .1, CX, 640, { dy: 20 });
});
const G6 = new Grafico({ velas: VF, h: 700, padre: S6.el, titulo: 'SI FALLA' });
G6.vista = norm([[0, { i0: 7.4, i1: 31.6, pmin: 100, pmax: 111.4 }]]);
G6.rev = [[XC(6), 25], [tw(7, 'meterse') - .1, 25], [tw(7, 'nivel'), 26], [tw(7, 'falsa') + .4, 29]];
zonaR(G6, XC(6) + .1, { etiqueta: 'NIVEL' });
G6.posicion({ i0: 24.5, i1: 31.2, entrada: 106.2, sl: 104.1, tp: 110.4, t0: XC(6) + .2 });
G6.foco(iFalla, iFalla, tw(7, 'nivel'), 1e9, { min: .45 });
G6.marca({ i: iFalla, p: VF[iFalla][2], texto: 'VUELVE ABAJO', lado: -1, t0: tw(7, 'nivel') + .1, rgb: ROJO, tam: 22, solida: true });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(6, 'doble'), {}], [XC(6) - .2, { v: .9, r: 1 }], [XC(6) + .2, { v: 0 }],
  [tw(7, 'nivel'), {}], [tw(7, 'falsa'), { v: .9, r: -1 }], [XC(7) - .2, {}], [XC(7) + .2, { v: 0 }]]);
sfx(tw(7, 'nivel'), 'descarte', { vol: .8 }); sfx(tw(7, 'falsa'), 'golpe-corto', { vol: .7 }); sfx(tw(7, 'pequena'), 'tick', { vol: .7 });

/* ---------- S7 · cierre ---------- */
const CTA = ctaNova({ a: XC(7), tPregunta: tw(8, 'aprender') - .1, tClave: tw(8, 'trading'), tSenales: tw(8, 'senales'), tEscribe: tw(8, 'comenta'), tEnvia: tw(8, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(7) - .1 });
