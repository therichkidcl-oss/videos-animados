/* =====================================================================
   MUESTRA DE ESTILO (sin voz, ~17 s): gancho con la vela gigante que se forma y su anatomia -> grafico en vivo con
   soporte, martillo, flecha y la posicion (entrada / stop loss / objetivo 1:2) -> cierre con el CTA.
   Tiempos fijos en segundos (no hay voz). Los subtitulos usan palabras de prueba (trabajo/tiempos.json).
   ===================================================================== */
const T_B = 5.7, T_C = 12.1;

/* ---------- A · gancho: la vela japonesa ---------- */
const VG = new VelaGigante({ v: [100, 131, 72, 121], w: 1000, h: 860, ancho: 190, z: 'z4' });
const escA = escenaT(0, T_B, eyebrow('NOVA PROFIT · TRADING') + titulo(['LA VELA', '*JAPONESA*'], '', 156), (t) => {
  const [ey, tt] = escA.$;
  ent(ey, t, .12, CX, LAY.ey, { dy: 16 });
  ent(tt, t, .2, CX, LAY.tit, { dy: 0, s0: 1 }); palabras(tt, t, [.25, .45, .72]);
}, { mudo: true });
sfx(.25, 'golpe', { vol: .8 }); sfx(.72, 'golpe-corto', { vol: .7 });
PINTAR.push(t => {
  if (t > T_B) { off(VG.c); return; }
  const p = P(t, .5, .7, E.out4), q = P(t, T_B - SAL - .02, SAL, E.in3);      // sale entera antes del corte (sin encimarse)
  VG.pintar(t, { x: CX, y: 1010 - q * 40, s: lerp(.86, 1, p) * (1 - .35 * q), o: clamp(p * 1.6) * (1 - q), b: (1 - p) * 10 + q * 12,
    f: clamp((t - .6) / 2.5),
    et: { max: [3.3], cierre: [3.65], apertura: [3.95], min: [4.3], cuerpo: [4.6], mechaArriba: [4.85], mechaAbajo: [5.05] } });
});
sfx(.6, 'subida', { vol: .35 });
[3.3, 3.65, 3.95, 4.3].forEach(x => sfx(x, 'tick', { vol: .75 }));
[4.6, 4.85, 5.05].forEach(x => sfx(x, 'tick-suave', { vol: .8 }));

/* ---------- B · grafico en vivo: soporte + martillo + posicion ---------- */
const VELAS = serie([
  { velas: [[99.4, 99.8, 97.9, 98.3], [98.3, 99.9, 97.7, 99.6]] },             // primer toque del soporte
  { mover: 8, hasta: 106.8, vol: .7, contra: .25 },                               // subida
  { mover: 10, hasta: 98.9, vol: .6, contra: .2 },                                // caida de vuelta al soporte
  { vela: [98.9, 99.25, 97.45, 99.12] },                                          // 20: martillo (cuerpo chico arriba, mecha larga abajo)
  { vela: [99.12, 100.7, 98.95, 100.5] },                                         // 21: confirmacion
  { mover: 6, hasta: 104.2, vol: .5, contra: .2 },                                // el precio rebota
], 23);
const G = new Grafico({ velas: VELAS, w: 980, h: LAY.grafH, titulo: 'ACCIÓN DEL PRECIO', tf: 'H1', z: 'z3' });
G.vista = norm([[0, { i0: -.6, i1: 28.6, pmin: 95.9, pmax: 107.9 }],
  [8.6, {}], [9.3, { i0: 9.5, i1: 26.5, pmin: 96.2, pmax: 103.2 }, E.io4],      // la camara del grafico se acerca al martillo
  [10.4, {}], [11.2, { i0: -.6, i1: 28.6, pmin: 95.9, pmax: 107.9 }, E.io4]]);
G.rev = [[T_B, 7], [7.4, 20], [7.5, 20], [8.75, 21], [9.55, 21], [10.1, 22], [11.6, 28]];
G.zona({ p0: 97.35, p1: 98.45, i0: 'ini', i1: 'fin', etiqueta: 'SOPORTE', t0: 6.55, dur: .7, rgb: ORO });
G.foco(20, 20, 8.75, 10.15);
G.caja({ i0: 20, i1: 20, etiqueta: 'MARTILLO', t0: 8.8, t1: 10.15, rgb: ORO2 });
G.flecha({ i: 20, p: 97.45, dir: 1, t0: 9.2, t1: 10.15, largo: 90, rgb: VERDE });
G.posicion({ i0: 21.5, i1: 27.6, entrada: 100.5, sl: 97.2, tp: 107.1, t0: 10.2, tSl: 10.45, tTp: 10.75, ratio: '1 : 2', tRatio: 11.05 });
sfx(6.6, 'barrido', { vol: .55 }); sfx(6.9, 'tick', { vol: .7 });
sfx(8.75, 'swell', { vol: .6 }); sfx(8.8, 'golpe', { vol: .85 }); sfx(9.2, 'aire', { vol: .6 });
sfx(10.2, 'tick', { vol: .7 }); sfx(10.45, 'tick', { vol: .7 }); sfx(10.75, 'tick', { vol: .7 }); sfx(11.05, 'nota', { vol: .7 });
PINTAR.push(t => {
  if (t < T_B || t > T_C) { off(G.c); return; }
  const p = P(t, T_B + .02, .6, E.out4), q = P(t, T_C - SAL - .02, SAL, E.in3);
  G.pintar(t, { x: CX, y: LAY.graf + (1 - p) * 60, s: lerp(.92, 1, p) * (1 - .06 * q), o: clamp(p * 1.5) * (1 - q), b: (1 - p) * 12 + q * 12 });
});
const escB = escenaT(T_B, T_C, eyebrow('ACCIÓN DEL PRECIO') + titulo(['DONDE EL PRECIO', '*REBOTA*'], '', 132), (t) => {
  const [ey, tt] = escB.$;
  ent(ey, t, T_B + .1, CX, LAY.ey, { dy: 16 });
  ent(tt, t, T_B + .15, CX, LAY.tit, { dy: 0, s0: 1 }); palabras(tt, t, [T_B + .2, T_B + .38, T_B + .56, 8.8]);
});
TINTE = norm([[0, { v: 0, r: 0 }], [6.2, {}], [7.2, { v: .8, r: -1 }], [8.7, {}], [9.6, { v: 1, r: 1 }], [T_C, {}], [T_C + .8, { v: 0 }]]);

/* ---------- C · cierre ---------- */
const CTA = ctaNova({ a: T_C, tPregunta: 12.4, tSenales: 13.1, tEscribe: 13.75, tEnvia: 14.75 });
PINTAR.push(CTA.pintar);

/* camara: deriva lenta y un acercamiento al martillo */
CAMK = norm([[0, { x: CX, y: CY, s: 1.04 }], [2.5, { s: 1 }, E.io3], [8.6, {}], [9.2, { y: CY + 40, s: 1.05 }, E.io4], [10.4, {}], [11.1, { y: CY, s: 1 }, E.io4],
  [CONFIG.dur, { s: 1.02 }, E.ioSine]]);

/* subtitulos de prueba (en los reels salen de la voz alineada); se ocultan en el cierre, que ya trae su texto */
subtitulos({ ocultar: t => t > T_C - .2 });
