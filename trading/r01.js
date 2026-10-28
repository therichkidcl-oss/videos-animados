/* =====================================================================
   REEL 01 · LA VELA JAPONESA (anatomia)
   f0 gancho (mercados de arroz de Japon -> todo el mundo) · f1 el grafico habla · f2 cada vela = un tiempo
   f3 batalla compradores vs vendedores · f4-f7 anatomia (4 datos, cuerpo, verde/roja) · f8-f9 mechas y rechazo
   f10 esa vela te dice algo · f11 CTA
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);                         // entrada comun de las piezas de una escena

/* ---------- S1 · gancho: la vela se forma en vivo (ya visible en el primer cuadro) ---------- */
const S1 = escena(0, 0, eyebrow('TRADING · PARTE 1') + titulo(['LA VELA', '*JAPONESA*'], '', 156) +
  chip('JAPÓN · <b>MERCADO DE ARROZ</b>') + `<div class="L chn">${icon('globe', 32, 2)}<span>TRADERS DE <b>TODO EL MUNDO</b></span></div>`,
  (t, s) => {
    const [ey, tt, c1, c2] = S1.$;
    put(ey, { x: CX, y: LAY.ey, o: 1 });
    put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, .35);
    ent(c1, t, tw(0, 'mercados') - .05, CX, 640, { t1: tw(0, 'traders') - .3 });
    ent(c2, t, tw(0, 'traders') - .05, CX, 640, { pulso: tw(0, 'mundo') });
    V1.pintar(t, { x: CX, y: 1060, s: lerp(.94, 1, P(t, 0, .8, E.out3)), f: lerp(.12, 1, clamp(t / (finF(0) - .2))) });
    void s;
  }, { sinEntrada: true });
const V1 = new VelaGigante({ v: [100, 131, 72, 121], w: 900, h: 760, ancho: 180, padre: S1.el, z: 'z3' });
sfx(.05, 'golpe', { vol: .85 }); sfx(.35, 'golpe-corto', { vol: .6 }); sfx(.2, 'subida', { vol: .3 });
sfx(tw(0, 'mercados'), 'tick', { vol: .7 }); sfx(tw(0, 'traders'), 'tick', { vol: .7 }); sfx(tw(0, 'mundo'), 'brillo', { vol: .5 });

/* ---------- S2 · si aprendes a leerla, el grafico te habla ---------- */
const VEL2 = serie([{ desde: 100, mover: 9, hasta: 108, vol: .7, contra: .3 }, { mover: 5, hasta: 104.2, vol: .5 }, { vela: [104.2, 104.6, 102.9, 104.4] },
  { mover: 9, hasta: 112.5, vol: .7, contra: .25 }], 31);
const S2 = escena(1, 1, eyebrow('LEER EL GRÁFICO') + titulo(['EL GRÁFICO', 'TE *HABLA*'], '', 150), (t, s) => {
  const [ey, tt] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(1, 'hablarte'));
  const p = ENT(t, s);
  G2.pintar(t, { x: CX, y: LAY.graf + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 });
});
const G2 = new Grafico({ velas: VEL2, h: LAY.grafH, padre: S2.el, titulo: 'GRÁFICO DE VELAS' });
G2.vista = norm([[0, { i0: -.6, i1: 25.5, pmin: 98.6, pmax: 114.2 }]]);
G2.rev = [[XC(0), 5], [tw(1, 'grafico'), 14], [tw(1, 'hablarte'), 24]];
G2.zona({ p0: 102.6, p1: 103.6, i0: 'ini', i1: 'fin', etiqueta: 'SOPORTE', t0: tw(1, 'empieza'), rgb: ORO });
G2.segmento({ i0: 0.6, p0: 99.2, i1: 15, p1: 102.95, ext: 9, etiqueta: 'TENDENCIA', t0: tw(1, 'hablarte') - .1, rgb: VERDE, dy: -34 });
sfx(tw(1, 'empieza'), 'barrido', { vol: .5 }); sfx(tw(1, 'hablarte'), 'tick', { vol: .8 });

/* ---------- S3 · cada vela = un tiempo (1 min / 1 hora / 1 dia) ---------- */
const TF = [['1 MIN', 'minuto'], ['1 HORA', 'hora'], ['1 DÍA', 'dia']];
css(`.tfs{display:flex;gap:18px}.tfs span{height:70px;padding:0 32px;border-radius:999px;display:flex;align-items:center;font:700 32px 'JetBrains Mono',monospace;color:rgba(232,227,216,.55);
  border:1.5px solid rgba(232,227,216,.18);background:rgba(16,12,8,.8)}
.tfs span.on{color:#1a1208;background:#f4c430;border-color:#f4c430;box-shadow:0 0 30px rgba(244,196,48,.45)}`);
const S3 = escena(2, 2, eyebrow('TEMPORALIDAD') + titulo(['CADA VELA', 'ES UN *TIEMPO*'], '', 150) +
  `<div class="L tfs">${TF.map(([x]) => `<span>${x}</span>`).join('')}</div>`, (t, s) => {
  const [ey, tt, tfs] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(2, 'tiempo'));
  ent(tfs, t, s.a + .25, CX, 640, { dy: 20 });
  const k = TF.reduce((a, [, w], i) => t >= tw(2, w) - .05 ? i : a, -1);
  [...tfs.children].forEach((e, i) => e.classList.toggle('on', i === k));
  const p = ENT(t, s);
  G3.forEach((g, i) => {
    if (i !== Math.max(0, k)) { off(g.c); return; }
    const pk = k >= 0 ? P(t, tw(2, TF[k][1]) - .05, .35, E.out3) : 1;
    g.pintar(t, { x: CX, y: LAY.graf + 50 + (1 - p) * 40, s: lerp(.95, 1, p) * lerp(.97, 1, pk), o: clamp(p * 1.8) * clamp(.3 + pk), b: (1 - pk) * 6 });
  });
});
const G3 = [41, 42, 43].map((sem, i) => {
  const v = serie([{ desde: 100, mover: 12, hasta: [104, 108, 115][i], vol: [1.3, .9, .7][i], contra: .35 }, { mover: 10, hasta: [101.5, 103, 109][i], vol: 1, contra: .35 }], sem);
  const g = new Grafico({ velas: v, h: 700, padre: S3.el, titulo: 'CADA VELA = UN PERIODO', tf: ['1M', 'H1', 'D1'][i] });
  g.vista = norm([[0, { i0: -.6, i1: 22.6, pmin: null, pmax: null }]]);
  g.rev = [[XC(1), 6], [XC(1) + 1, 22]];
  g.caja({ i0: 21, i1: 21, etiqueta: '1 VELA', t0: tw(2, 'vela') - .05, t1: tw(2, 'tiempo') + .6, rgb: ORO2, tam: 26 });
  return g;
});
TF.forEach(([, w]) => sfx(tw(2, w), 'tick', { vol: .8 })); sfx(tw(2, 'vela'), 'tick-suave', { vol: .8 });

/* ---------- S4 · la batalla: compradores contra vendedores ---------- */
const S4 = escena(3, 3, eyebrow('EN CADA VELA') + titulo(['UNA *BATALLA*'], '', 160) +
  `<div class="L chn v xl">${icon('arrowUp', 40, 2.8)}<span><b>COMPRADORES</b></span></div>` +
  `<div class="L chn r xl">${icon('arrowDown', 40, 2.8)}<span><b>VENDEDORES</b></span></div>`, (t, s) => {
  const [ey, tt, cv, cr] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(3, 'batalla'), LAY.tit - 50);
  V4.pintar(t, { x: CX, y: 1040, o: ENT(t, s), f: KF(t, F4).f });
  ent(cv, t, tw(3, 'compradores') - .05, 250, 1300, { dx: -40, dy: 0, pulso: tw(3, 'compradores') + .3 });
  ent(cr, t, tw(3, 'vendedores') - .05, 830, 720, { dx: 40, dy: 0, pulso: tw(3, 'vendedores') + .3 });
});
const V4 = new VelaGigante({ v: [100, 126, 86, 95], w: 900, h: 860, ancho: 180, padre: S4.el, z: 'z3' });
// sube primero (compradores, verde) y despues cae bajo la apertura (vendedores, roja)
const F4 = norm([[XC(2), { f: .03 }], [tw(3, 'batalla'), { f: .06 }], [tw(3, 'vendedores') - .1, { f: .36 }, E.io3], [finF(3) - .1, { f: .9 }, E.io3], [XC(3), { f: 1 }]]);
sfx(tw(3, 'batalla'), 'golpe', { vol: .8 }); sfx(tw(3, 'compradores'), 'tick', { vol: .8, pan: -.4 }); sfx(tw(3, 'vendedores'), 'tick', { vol: .8, pan: .4 });

/* ---------- S5 · anatomia: 4 datos, cuerpo, verde o roja ---------- */
const S5 = escena(4, 7, eyebrow('ANATOMÍA') + titulo(['4 DATOS EN', 'CADA *VELA*'], '', 150) +
  `<div class="L chn v xl">${icon('trendingUp', 40, 2.6)}<span>GANAN LOS <b>COMPRADORES</b></span></div>` +
  `<div class="L chn r xl">${icon('trendingDown', 40, 2.6)}<span>GANAN LOS <b>VENDEDORES</b></span></div>`, (t, s) => {
  const [ey, tt, cv, cr] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'vela'));
  const baja = P(t, tw(7, 'abajo') - .1, .7, E.io3);
  const pulso = 1 + .03 * bump(t, tw(6, 'verde'), .35) + .03 * bump(t, tw(7, 'roja'), .35);
  V5.pintar(t, { x: CX, y: 1065, s: pulso, o: ENT(t, s), f: 1, baja,
    et: { apertura: [tw(4, 'apertura')], cierre: [tw(4, 'cierre')], max: [tw(4, 'maximo')], min: [tw(4, 'minimo')], cuerpo: [tw(5, 'cuerpo')] } });
  ent(cv, t, tw(6, 'compradores') - .05, CX, 625, { dy: 20, t1: tw(7, 'si') - .2 });
  ent(cr, t, tw(7, 'vendedores') - .05, CX, 625, { dy: 20 });
});
const V5 = new VelaGigante({ v: [100, 131, 72, 121], w: 1000, h: 780, ancho: 180, padre: S5.el, z: 'z3' });
['apertura', 'cierre', 'maximo', 'minimo'].forEach(w => sfx(tw(4, w), 'tick', { vol: .75 }));
sfx(tw(5, 'cuerpo'), 'tick-suave', { vol: .8 }); sfx(tw(6, 'compradores'), 'nota', { vol: .6 });
sfx(tw(7, 'abajo') - .1, 'aire', { vol: .6 }); sfx(tw(7, 'vendedores'), 'golpe-corto', { vol: .7 });
TINTE = norm([[0, { v: 0, r: 0 }], [tw(6, 'verde') - .2, {}], [tw(6, 'verde') + .4, { v: .9, r: 1 }], [tw(7, 'roja') - .2, {}], [tw(7, 'roja') + .4, { v: .9, r: -1 }],
  [XC(7) - .3, {}], [XC(7) + .3, { v: 0 }]]);

/* ---------- S6 · las mechas: hasta donde llego el precio y el rechazo ---------- */
const S6 = escena(8, 9, eyebrow('LAS MECHAS') + titulo(['DONDE EL PRECIO', 'FUE *RECHAZADO*'], '', 132) +
  chip('<b>RECHAZO</b>', 'xl') + `<div class="L chn r xl">${icon('arrowDown', 40, 2.8)}<span><b>VENDEDORES</b></span></div>` +
  `<div class="L chn v xl">${icon('arrowUp', 40, 2.8)}<span><b>COMPRADORES</b></span></div>`, (t, s) => {
  const [ey, tt, rech, cr, cv] = S6.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(8, 'rechazado'));
  // f8: la vela roja de la anatomia con sus mechas; f9: un martillo que se forma con la voz
  const cambio = tw(9, 'una') - .15, q8 = P(t, cambio, .35, E.in3), p9 = P(t, cambio + .2, .45, E.out3);
  if (q8 < 1) V6a.pintar(t, { x: CX, y: 1030, o: (1 - q8) * ENT(t, s), b: q8 * 10, f: 1, baja: 1,
    et: { mechaArriba: [tw(8, 'mechas')], mechaAbajo: [tw(8, 'mechas') + .15] } });
  else off(V6a.c);
  if (p9 > 0) V6b.pintar(t, { x: CX, y: 1030, o: p9, b: (1 - p9) * 10, f: KF(t, F6).f, et: t > tw(9, 'arriba') ? { mechaAbajo: [tw(9, 'arriba') + .1] } : {} });
  else off(V6b.c);
  const pr = V6a.Y ? V6a.aEscena(131, 0) : { x: CX, y: 640 };
  ent(rech, t, tw(8, 'rechazado') - .05, CX + 260, pr.y + 10, { dx: 30, dy: 0, t1: cambio - .3 });
  ent(cr, t, tw(9, 'vendedores') - .05, 250, 1330, { dx: -40, dy: 0, t1: tw(9, 'compradores') + 1.2 });
  ent(cv, t, tw(9, 'compradores') - .05, 830, 700, { dx: 40, dy: 0 });
});
const V6a = new VelaGigante({ v: [100, 131, 72, 121], w: 1000, h: 820, ancho: 180, padre: S6.el, z: 'z3' });
const V6b = new VelaGigante({ v: [104, 108, 72, 106], w: 1000, h: 820, ancho: 180, padre: S6.el, z: 'z3' });
// martillo: abre en 104, los vendedores lo llevan a 72 (mecha larga) y los compradores lo devuelven a 106
const F6 = norm([[0, { f: 0 }], [tw(9, 'vendedores') - .1, { f: .02 }], [tw(9, 'pero') - .1, { f: .5 }, E.io3], [tw(9, 'arriba'), { f: .97 }, E.io3], [tw(9, 'arriba') + .4, { f: 1 }]]);
sfx(tw(8, 'mechas'), 'tick', { vol: .8 }); sfx(tw(8, 'rechazado'), 'golpe-corto', { vol: .7 });
sfx(tw(9, 'vendedores'), 'aire', { vol: .6 }); sfx(tw(9, 'compradores'), 'subida', { vol: .3 }); sfx(tw(9, 'arriba'), 'golpe', { vol: .7 });

/* ---------- S7 · esa vela ya te esta diciendo algo: el martillo en un soporte ---------- */
const VEL7 = serie([{ velas: [[99.4, 99.8, 97.9, 98.3], [98.3, 99.9, 97.7, 99.6]] }, { mover: 8, hasta: 106.8, vol: .7, contra: .25 },
  { mover: 9, hasta: 99.6, vol: .5, contra: .2 }, { vela: [99.6, 99.8, 98.7, 98.9] },
  { vela: [98.9, 99.25, 97.45, 99.12] }, { vela: [99.12, 100.7, 98.95, 100.5] }, { mover: 5, hasta: 104.5, vol: .5, contra: .2 }], 23);
const S7 = escena(10, 10, eyebrow('ACCIÓN DEL PRECIO') + titulo(['ESA VELA', 'TE DICE *ALGO*'], '', 150), (t, s) => {
  const [ey, tt] = S7.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(10, 'algo'));
  const p = ENT(t, s);
  G7.pintar(t, { x: CX, y: LAY.graf + (1 - p) * 40, s: lerp(.95, 1, p), o: clamp(p * 1.8), b: (1 - p) * 8 });
});
const G7 = new Grafico({ velas: VEL7, h: LAY.grafH, padre: S7.el, titulo: 'ACCIÓN DEL PRECIO' });
G7.vista = norm([[0, { i0: -.6, i1: 27.6, pmin: 95.9, pmax: 108.2 }]]);
G7.rev = [[XC(9), 20], [tw(10, 'vela'), 21], [tw(10, 'diciendo'), 22], [XC(10) - .2, 28]];
G7.zona({ p0: 97.35, p1: 98.45, i0: 'ini', i1: 'fin', etiqueta: 'SOPORTE', t0: XC(9) + .2, rgb: ORO });
G7.caja({ i0: 21, i1: 21, etiqueta: 'MARTILLO', t0: tw(10, 'vela') + .25, rgb: ORO2 });
G7.flecha({ i: 21, p: 97.45, dir: 1, t0: tw(10, 'algo'), largo: 80, rgb: VERDE });
sfx(tw(10, 'vela') + .25, 'golpe-corto', { vol: .7 }); sfx(tw(10, 'algo'), 'subida', { vol: .3 });

/* ---------- S8 · cierre ---------- */
const CTA = ctaNova({ a: XC(10), tPregunta: tw(11, 'aprender') - .1, tClave: tw(11, 'trading'), tSenales: tw(11, 'senales'), tEscribe: tw(11, 'comenta'), tEnvia: tw(11, 'envio') });
PINTAR.push(CTA.pintar);

CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(10) - .1 });
