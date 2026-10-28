/* =====================================================================
   REEL 04 · SOPORTES Y RESISTENCIAS
   f0 el precio tiene memoria · f1 soporte = piso · f2 resistencia = techo · f3 no son lineas, son zonas
   f4-f5 la resistencia rota se vuelve soporte (el techo se vuelve piso) · f6 cada toque cuenta · f7 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const enGraf = (G, t, s, o = {}) => { const p = ENT(t, s); G.pintar(t, { x: CX, y: (o.y ?? LAY.graf) + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 }); };

/* ---------- S1 · el precio tiene memoria: vuelve a reaccionar en el mismo nivel ---------- */
const MEM = ondas(104.5, [[5, 100.4], [4, 104.6], [4, 100.3], [4, 105.2], [4, 100.5], [4, 104.2]], 71, .5);
const pisoMem = Math.min(MEM.giros[1][1], MEM.giros[3][1], MEM.giros[5][1]);
const S1 = escena(0, 0, eyebrow('TRADING · PARTE 4') + titulo(['EL PRECIO TIENE', '*MEMORIA*'], '', 140), (t, s) => {
  const [ey, tt] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'memoria'));
  G1.pintar(t, { x: CX, y: LAY.graf });
}, { sinEntrada: true });
const G1 = new Grafico({ velas: MEM.V, h: LAY.grafH, padre: S1.el, titulo: 'MISMO NIVEL' });
G1.vista = norm([[0, { i0: -.6, i1: 25.6, pmin: 96.6, pmax: 107 }]]);
G1.rev = [[0, 9], [tw(0, 'niveles'), 25]];
G1.linea({ p: pisoMem + .25, i0: 'ini', i1: 'fin', rgb: ORO2, t0: tw(0, 'niveles') - .1, ancho: 3 });
[1, 3, 5].forEach((j, k) => G1.marca({ i: MEM.giros[j][0], p: MEM.giros[j][1], texto: `${k + 1}`, lado: -1, sep: 40, t0: tw(0, 'demuestran') + k * .15, rgb: ORO2, tam: 24, solida: true }));
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'niveles') - .1, 'barrido', { vol: .5 });
[0, 1, 2].forEach(k => sfx(tw(0, 'demuestran') + k * .15, 'tick', { vol: .75 }));

/* ---------- S2 · soporte = piso: aparecen compradores ---------- */
const SOP = ondas(108, [[5, 101.3], [3, 104.2], [4, 101.4], [5, 106.2]], 72, .5);
const S2 = escena(1, 1, eyebrow('SOPORTE') + titulo(['UN SOPORTE', 'ES UN +PISO+'], '', 150), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(1, 'piso'));
  enGraf(G2, t, s);
});
const G2 = new Grafico({ velas: SOP.V, h: LAY.grafH, padre: S2.el, titulo: 'SOPORTE' });
G2.vista = norm([[0, { i0: -.6, i1: 17.6, pmin: 98.8, pmax: 109.4 }]]);
G2.rev = [[XC(0), 4], [tw(1, 'compradores'), 13], [tw(1, 'caer'), 17]];
G2.zona({ p0: SOP.giros[1][1] - .3, p1: SOP.giros[1][1] + .7, etiqueta: 'SOPORTE', t0: tw(1, 'soporte') - .05, rgb: VERDE });
[1, 3].forEach((j, k) => G2.flecha({ i: SOP.giros[j][0], p: SOP.giros[j][1], dir: 1, t0: tw(1, 'compradores') + k * .25, largo: 60, rgb: VERDE }));
sfx(tw(1, 'soporte'), 'barrido', { vol: .5 }); sfx(tw(1, 'compradores'), 'tick', { vol: .8 }); sfx(tw(1, 'compradores') + .25, 'tick', { vol: .8 });

/* ---------- S3 · resistencia = techo: aparecen vendedores ---------- */
const RES = ondas(99, [[5, 105.8], [3, 103], [4, 105.7], [5, 100.8]], 73, .5);
const S3 = escena(2, 2, eyebrow('RESISTENCIA') + titulo(['UNA RESISTENCIA', 'ES UN ~TECHO~'], '', 140), (t, s) => {
  const [ey, tt] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'techo'));
  enGraf(G3, t, s);
});
const G3 = new Grafico({ velas: RES.V, h: LAY.grafH, padre: S3.el, titulo: 'RESISTENCIA' });
G3.vista = norm([[0, { i0: -.6, i1: 17.6, pmin: 97.8, pmax: 108.6 }]]);
G3.rev = [[XC(1), 4], [tw(2, 'vendedores'), 13], [tw(2, 'subir'), 17]];
G3.zona({ p0: RES.giros[1][1] - .7, p1: RES.giros[1][1] + .3, etiqueta: 'RESISTENCIA', t0: tw(2, 'resistencia') - .05, rgb: ROJO });
[1, 3].forEach((j, k) => G3.flecha({ i: RES.giros[j][0], p: RES.giros[j][1], dir: -1, t0: tw(2, 'vendedores') + k * .25, largo: 60, rgb: ROJO }));
sfx(tw(2, 'resistencia'), 'barrido', { vol: .5 }); sfx(tw(2, 'vendedores'), 'tick', { vol: .8 }); sfx(tw(2, 'vendedores') + .25, 'tick', { vol: .8 });

/* ---------- S4 · no son lineas exactas: son zonas (las mechas perforan un poco) ---------- */
const ZON = serie([{ desde: 106, mover: 5, hasta: 101.9, vol: .5 }, { vela: [101.9, 102.1, 100.6, 101.7] }, { mover: 3, hasta: 103.9, vol: .5 },
  { mover: 3, hasta: 102.1, vol: .5 }, { vela: [102.1, 102.3, 100.7, 102.0] }, { mover: 5, hasta: 105.6, vol: .5 }], 74);
const S4 = escena(3, 3, eyebrow('NO SON LÍNEAS') + titulo(['SON *ZONAS*'], '', 170), (t, s) => {
  const [ey, tt] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(3, 'zonas'), LAY.tit - 40);
  enGraf(G4, t, s);
});
const G4 = new Grafico({ velas: ZON, h: LAY.grafH, padre: S4.el, titulo: 'ZONA, NO LÍNEA' });
G4.vista = norm([[0, { i0: -.6, i1: 18.6, pmin: 99.2, pmax: 107.4 }]]);
G4.rev = [[0, 18]];
G4.linea({ p: 101.6, i0: 'ini', i1: 'fin', rgb: CREMA, t0: tw(3, 'lineas') - .1, t1: tw(3, 'zonas') - .05, ancho: 2, etiqueta: 'LÍNEA', lado: 'izq', dy: -28 });
G4.zona({ p0: 100.5, p1: 101.9, etiqueta: 'ZONA', t0: tw(3, 'zonas') - .05, rgb: ORO });
G4.caja({ i0: 5, i1: 5, p0: 100.6, p1: 102.1, t0: tw(3, 'perfora') - .05, rgb: ORO2, pad: 16 });
G4.caja({ i0: 12, i1: 12, p0: 100.7, p1: 102.3, t0: tw(3, 'perfora') + .1, rgb: ORO2, pad: 16, etiqueta: 'PERFORA', tam: 22 });
G4.flecha({ i: 12, p: 100.7, dir: 1, t0: tw(3, 'rebotar'), largo: 60, rgb: VERDE });
sfx(tw(3, 'lineas'), 'tick', { vol: .7 }); sfx(tw(3, 'zonas'), 'golpe-corto', { vol: .75 }); sfx(tw(3, 'perfora'), 'tick', { vol: .8 }); sfx(tw(3, 'rebotar'), 'aire', { vol: .5 });

/* ---------- S5 · la resistencia rota se vuelve soporte: el techo se vuelve piso ---------- */
const POL = serie([{ desde: 99, mover: 4, hasta: 104.5, vol: .5 }, { mover: 3, hasta: 102.8, vol: .5 }, { mover: 3, hasta: 104.6, vol: .5 },
  { mover: 2, hasta: 103.1, vol: .5 }, { vela: [103.1, 107.0, 102.9, 106.8] }, { mover: 2, hasta: 107.6, vol: .5 }, { mover: 3, hasta: 105.3, vol: .4 },
  { vela: [105.3, 105.6, 104.4, 105.5] }, { mover: 5, hasta: 109.6, vol: .5 }], 75);
const iRup = 12, iRet = 18;                                                               // vela que rompe y vela del retesteo
const S5 = escena(4, 5, eyebrow('LO MÁS PODEROSO') + titulo(['EL TECHO SE', 'VUELVE *PISO*'], '', 150), (t, s) => {
  const [ey, tt] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(5, 'piso'));
  enGraf(G5, t, s);
});
const G5 = new Grafico({ velas: POL, h: LAY.grafH, padre: S5.el, titulo: 'CAMBIO DE ROL' });
G5.vista = norm([[0, { i0: -.6, i1: 23.6, pmin: 97.8, pmax: 111.2 }]]);
G5.rev = [[XC(3), 9], [tw(4, 'rompe') - .3, iRup], [tw(4, 'rompe') + .4, iRup + 1], [tw(4, 'convierte'), iRet], [tw(4, 'soporte') + .2, iRet + 1], [tw(5, 'piso') + .3, 24]];
G5.zona({ p0: 104.2, p1: 105.0, etiqueta: 'RESISTENCIA', t0: XC(3) + .2, t1: tw(4, 'convierte'), rgb: ROJO });
G5.zona({ p0: 104.2, p1: 105.0, etiqueta: 'SOPORTE', t0: tw(4, 'convierte') + .05, rgb: VERDE, dur: .4 });
G5.marca({ i: iRup, p: POL[iRup][1], texto: 'RUPTURA', lado: 1, t0: tw(4, 'rompe') + .3, rgb: ORO2, tam: 22 });
G5.flecha({ i: iRet, p: POL[iRet][2], dir: 1, t0: tw(5, 'piso'), largo: 70, rgb: VERDE });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(4, 'convierte'), {}], [tw(4, 'convierte') + .5, { v: .9, r: 1 }], [XC(5) - .3, {}], [XC(5) + .3, { v: 0 }]]);
sfx(tw(4, 'rompe'), 'golpe', { vol: .8 }); sfx(tw(4, 'convierte'), 'transicion', { vol: .45 }); sfx(tw(5, 'piso'), 'golpe-corto', { vol: .75 });

/* ---------- S6 · cada toque cuenta: mas traders mirando esa zona ---------- */
const TOQ = ondas(106.5, [[4, 101.6], [4, 104.6], [3, 101.5], [4, 105.1], [4, 101.7], [4, 106.4]], 76, .5);
const S6 = escena(6, 6, eyebrow('CADA TOQUE CUENTA') + titulo(['MÁS TOQUES,', 'MÁS *MIRADAS*'], '', 150) +
  `<div class="L chn xl">${icon('users', 40, 2.2)}<span>MÁS <b>TRADERS</b> LA MIRAN</span></div>`, (t, s) => {
  const [ey, tt, c1] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, 'mirando'));
  enGraf(G6, t, s, { y: 1050 });
  ent(c1, t, tw(6, 'traders') - .1, CX, 640, { dy: 20 });
});
const G6 = new Grafico({ velas: TOQ.V, h: 700, padre: S6.el, titulo: 'ZONA CLAVE' });
G6.vista = norm([[0, { i0: -.6, i1: 23.6, pmin: 98.3, pmax: 108 }]]);
G6.rev = [[XC(5), 6], [tw(6, 'zona'), 23]];
G6.zona({ p0: 100.9, p1: 101.9, i0: 'ini', i1: 'fin', etiqueta: 'ZONA', t0: XC(5) + .1, rgb: ORO });
[1, 3, 5].forEach((j, k) => G6.marca({ i: TOQ.giros[j][0], p: TOQ.giros[j][1], texto: `${k + 1}`, lado: -1, sep: 38, t0: tw(6, 'veces') + k * .35, rgb: ORO2, tam: 24, solida: true }));
[0, 1, 2].forEach(k => sfx(tw(6, 'veces') + k * .35, 'tick', { vol: .8 })); sfx(tw(6, 'traders') - .1, 'nota', { vol: .6 });

/* ---------- S7 · cierre ---------- */
const CTA = ctaNova({ a: XC(6), tPregunta: tw(7, 'aprender') - .1, tClave: tw(7, 'trading'), tSenales: tw(7, 'senales'), tEscribe: tw(7, 'comenta'), tEnvia: tw(7, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(6) - .1 });
