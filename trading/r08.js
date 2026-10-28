/* =====================================================================
   REEL 08 · LA REGLA DEL 1 % (gestion de riesgo)
   f0-f1 la mayoria de las cuentas minoristas pierde (ESMA 74-89 %); el problema es el riesgo
   f2-f3 la regla de oro: 1 % por operacion (1.000 -> 10) · f4-f5 diez perdidas seguidas: 1 % -> 90,4 %, 10 % -> 34,9 %
   f6 perder 50 % exige ganar 100 % · f7 ratio 1:2: aciertas 4 de 10 y terminas en positivo · f8 primero cuida tu cuenta · f9 CTA
   Cifras verificadas en trading/investigacion.md (seccion 6 y 8).
   ===================================================================== */
const ENT = (t, s, d = .45) => P(t, s.a, d, E.out4);
const fmtPct = v => v.toFixed(1).replace('.', ',') + ' %';

css(`
.grid100{display:grid;grid-template-columns:repeat(10,46px);gap:12px}
.grid100 i{width:46px;height:46px;border-radius:50%;background:rgba(232,227,216,.1);border:2px solid rgba(232,227,216,.12);display:block}
.grid100 i.r{background:radial-gradient(circle at 35% 30%,#ff8fa1,#e0244a);border-color:rgba(255,77,106,.9);box-shadow:0 0 16px rgba(255,77,106,.45)}
.grid100 i.rr{background:rgba(255,77,106,.28);border-color:rgba(255,77,106,.7)}
.fuente{font:500 24px 'JetBrains Mono',monospace;letter-spacing:.08em;color:rgba(232,227,216,.55);white-space:nowrap}
.gigante{font-family:'Bebas Neue',sans-serif;font-size:330px;line-height:.85;white-space:nowrap;text-align:center}
.calc{display:flex;align-items:center;gap:26px;font-family:'Bebas Neue',sans-serif;font-size:120px;color:#efe9dc;white-space:nowrap}
.calc .op{color:rgba(232,227,216,.5);font-size:90px}
.calc .res{color:#f4c430;filter:drop-shadow(0 0 24px rgba(244,196,48,.4))}
.barras{display:flex;gap:50px;align-items:flex-end;height:660px}
.bcol{width:340px;display:flex;flex-direction:column;align-items:center;gap:16px}
.bcol .pista{position:relative;width:200px;height:520px;border-radius:26px;background:rgba(232,227,216,.05);border:1.5px dashed rgba(232,227,216,.18);overflow:hidden}
.bcol .lleno{position:absolute;left:0;right:0;bottom:0;border-radius:24px}
.bcol.v .lleno{background:linear-gradient(180deg,#7cf3c8,#14b886);box-shadow:0 0 40px rgba(34,211,154,.35)}
.bcol.r .lleno{background:linear-gradient(180deg,#ff8fa1,#e0244a);box-shadow:0 0 40px rgba(255,77,106,.35)}
.bcol .val{font:400 92px/1 'Bebas Neue',sans-serif;color:#efe9dc}
.bcol.v .val{color:#3fe0aa}.bcol.r .val{color:#ff6b83}
.bcol .eti{font:700 26px 'JetBrains Mono',monospace;color:#cfc6b6;letter-spacing:.04em;white-space:nowrap}
.cont{font:700 34px 'JetBrains Mono',monospace;color:#efe9dc;letter-spacing:.08em;white-space:nowrap}
.cont b{color:#ff6b83}
.trades{display:grid;grid-template-columns:repeat(5,160px);gap:22px}
.trades div{height:150px;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font:400 64px/1 'Bebas Neue',sans-serif;border:2px solid}
.trades div small{font:600 22px 'JetBrains Mono',monospace;letter-spacing:.08em}
.trades .g{color:#3fe0aa;border-color:rgba(34,211,154,.8);background:rgba(10,40,28,.85);box-shadow:0 0 30px rgba(34,211,154,.25)}
.trades .p{color:#ff6b83;border-color:rgba(255,77,106,.8);background:rgba(40,10,16,.85)}
.ratio{display:flex;gap:70px;align-items:flex-end}
.ratio div{width:230px;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:400 96px/1 'Bebas Neue',sans-serif;border:2px solid}
.ratio div small{font:700 24px 'JetBrains Mono',monospace;letter-spacing:.08em;margin-top:8px}
.ratio .r1{height:170px;color:#ff6b83;border-color:rgba(255,77,106,.8);background:rgba(40,10,16,.85)}
.ratio .r2{height:340px;color:#3fe0aa;border-color:rgba(34,211,154,.8);background:rgba(10,40,28,.85);box-shadow:0 0 40px rgba(34,211,154,.25)}
.total{font:400 120px/1 'Bebas Neue',sans-serif;color:#3fe0aa;white-space:nowrap;filter:drop-shadow(0 0 30px rgba(34,211,154,.4))}
.total small{font:600 30px 'JetBrains Mono',monospace;color:#cfc6b6;letter-spacing:.1em;margin-left:18px}
`);

/* ---------- S1 · la mayoria de las cuentas minoristas pierde dinero; el problema es el riesgo ---------- */
const S1 = escena(0, 1, eyebrow('TRADING · PARTE 8') + titulo(['LA REGLA DEL', '*1%*'], '', 150) +
  `<div class="L grid100">${Array.from({ length: 100 }, () => '<i></i>').join('')}</div>` +
  `<div class="L num" style="font-size:124px">74 – 89 %<small style="font-size:24px;letter-spacing:.1em">CUENTAS MINORISTAS DE CFD QUE PIERDEN · ESMA</small></div>` +
  `<div class="L chn xl" style="text-decoration:line-through">ESTRATEGIA</div>` + `<div class="L chn r xl">${icon('triangleAlert', 40, 2.4)}<span><b>RIESGO</b></span></div>`, (t, s) => {
  const [ey, tt, grid, num, cE, cR] = S1.$;
  put(ey, { x: CX, y: LAY.ey, o: 1 });
  put(tt, { x: CX, y: LAY.tit, s: lerp(1.05, 1, P(t, 0, .9, E.out3)) }); palabras(tt, t, -1); acento(tt, t, tw(0, 'pierden'));
  // cuadricula: se encienden 74 rojas (minimo) y 15 mas en rojo tenue (hasta 89)
  const pg = P(t, tw(0, 'mayoria') - .1, .4), q1 = P(t, tw(1, 'estrategia') - .35, .35, E.in3);
  put(grid, { x: CX, y: 920, o: pg * (1 - q1), s: lerp(.94, 1, pg) * (1 - .05 * q1), b: q1 * 8 });
  const n = Math.round(89 * clamp((t - tw(0, 'cuentas')) / Math.max(.6, tw(0, 'dinero') - tw(0, 'cuentas'))));
  grid.querySelectorAll('i').forEach((c, i) => { c.className = i < Math.min(n, 74) ? 'r' : i < n ? 'rr' : ''; });
  ent(num, t, tw(0, 'dinero') - .1, CX, 1300, { dy: 20, t1: tw(1, 'estrategia') - .35 });
  ent(cE, t, tw(1, 'estrategia') - .1, CX, 850, { dy: 20 });
  cE.style.filter = `grayscale(${P(t, tw(1, 'estrategia') + .3, .4).toFixed(2)})`; cE.style.opacity = (1 - .5 * P(t, tw(1, 'estrategia') + .3, .4)).toFixed(2);
  brote(cR, t, tw(1, 'riesgo') - .08, CX, 1050, { s: 1.35 });
}, { sinEntrada: true });
sfx(.05, 'golpe', { vol: .85 }); sfx(tw(0, 'cuentas'), 'aire', { vol: .5 }); sfx(tw(0, 'dinero'), 'golpe-corto', { vol: .7 });
sfx(tw(1, 'estrategia'), 'descarte', { vol: .7 }); sfx(tw(1, 'riesgo'), 'golpe', { vol: .8 });

/* ---------- S2 · la regla de oro: 1 % por operacion (con 1.000 dolares, 10) ---------- */
const S2 = escena(2, 3, eyebrow('LA REGLA DE ORO') + titulo(['NO MÁS DEL'], '', 140) + `<div class="L gigante oro">1 %</div>` +
  chip('<b>POR OPERACIÓN</b>', 'xl') +
  `<div class="L calc"><span>$1.000</span><span class="op">×</span><span>1 %</span><span class="op">=</span><span class="res">$10</span></div>`, (t, s) => {
  const [ey, tt, big, c1, calc] = S2.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, null, 400);
  brote(big, t, tw(2, '1%') - .1, CX, 720, { s0: .3, pulso: tw(3, '10') });
  ent(c1, t, tw(2, 'operacion') - .1, CX, 960, { dy: 20 });
  const pc = P(t, tw(3, '1.000') - .1, .45, E.out4);
  if (pc > 0) { put(calc, { x: CX, y: 1230 + (1 - pc) * 30, o: clamp(pc * 2) }); const sp = calc.children; [...sp].forEach((e, i) => { const tt0 = i < 2 ? tw(3, '1.000') : i < 4 ? tw(3, '1.000') + .35 : tw(3, '10') - .05; e.style.opacity = P(t, tt0, .3).toFixed(2); }); }
  else off(calc);
});
sfx(tw(2, '1%'), 'golpe', { vol: .85 }); sfx(tw(2, 'operacion'), 'tick', { vol: .7 }); sfx(tw(3, '1.000'), 'tick', { vol: .7 }); sfx(tw(3, '10'), 'nota', { vol: .7 });

/* ---------- S3 · diez perdidas seguidas: 1 % vs 10 % ---------- */
const S3 = escena(4, 5, eyebrow('DIEZ PÉRDIDAS SEGUIDAS') + titulo(['MIRA LA', '*DIFERENCIA*'], '', 150) +
  `<div class="L cont">PÉRDIDA <b>0</b> DE 10</div>` +
  `<div class="L barras"><div class="bcol v"><div class="val">100 %</div><div class="pista"><div class="lleno"></div></div><div class="eti">ARRIESGANDO 1 %</div></div>` +
  `<div class="bcol r"><div class="val">100 %</div><div class="pista"><div class="lleno"></div></div><div class="eti">ARRIESGANDO 10 %</div></div></div>`, (t, s) => {
  const [ey, tt, cont, barras] = S3.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(4, 'diferencia'));
  ent(barras, t, s.a + .1, CX, 1100, { dy: 30 });
  // las 10 perdidas caen entre "diez perdidas" y "cuenta"; el saldo queda en 0,99^10 y 0,9^10
  const t0 = tw(4, 'diez'), t1 = tw(4, 'cuenta'), k = clamp((t - t0) / (t1 - t0)) * 10, kk = Math.floor(k + 1e-6);
  ent(cont, t, t0 - .2, CX, 640, { dy: 16 });
  cont.querySelector('b').textContent = String(Math.min(10, kk));
  const saldo = r => Math.pow(1 - r, Math.min(10, kk)) * 100;
  const cols = barras.querySelectorAll('.bcol');
  [[.01, 0], [.1, 1]].forEach(([r, i]) => {
    const v = saldo(r), col = cols[i];
    col.querySelector('.lleno').style.height = v.toFixed(2) + '%';
    col.querySelector('.val').textContent = kk >= 10 ? fmtPct(v) : Math.round(v) + ' %';
  });
  cols[1].style.transform = `scale(${(1 + .05 * bump(t, tw(5, 'tercio') - .1, .5)).toFixed(3)})`;
  cols[0].style.transform = `scale(${(1 + .05 * bump(t, tw(4, '90%') - .1, .5)).toFixed(3)})`;
});
for (let j = 0; j < 10; j++) sfx(tw(4, 'diez') + (tw(4, 'cuenta') - tw(4, 'diez')) * j / 10 + .02, 'tick-suave', { vol: .6 });
sfx(tw(4, '90%'), 'nota', { vol: .6 }); sfx(tw(5, 'tercio'), 'golpe-corto', { vol: .75 });

/* ---------- S4 · recuperarse cuesta mas: -50 % exige +100 % ---------- */
const S4 = escena(6, 6, eyebrow('RECUPERARSE CUESTA MÁS') + titulo(['PIERDES 50 %', 'NECESITAS *+100%*'], '', 130) +
  `<div class="L barras"><div class="bcol r"><div class="val">−50 %</div><div class="pista"><div class="lleno"></div></div><div class="eti">$1.000 → $500</div></div>` +
  `<div class="bcol v"><div class="val">+100 %</div><div class="pista"><div class="lleno"></div></div><div class="eti">$500 → $1.000</div></div></div>`, (t, s) => {
  const [ey, tt, barras] = S4.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(6, '100%'));
  ent(barras, t, s.a + .1, CX, 1080, { dy: 30 });
  const cols = barras.querySelectorAll('.bcol');
  const pa = P(t, tw(6, '50%') - .1, .6, E.io3), pb = P(t, tw(6, '100%') - .1, .9, E.io3);
  cols[0].querySelector('.lleno').style.height = lerp(100, 50, pa).toFixed(1) + '%';
  cols[0].querySelector('.val').style.opacity = P(t, tw(6, '50%') - .1, .3).toFixed(2);
  cols[1].querySelector('.lleno').style.height = lerp(50, 100, pb).toFixed(1) + '%';
  cols[1].style.opacity = P(t, tw(6, '100%') - .3, .3).toFixed(2);
});
sfx(tw(6, '50%'), 'aire-salida', { vol: .6 }); sfx(tw(6, '100%'), 'subida', { vol: .35 }); sfx(tw(6, 'inicio'), 'golpe-corto', { vol: .7 });

/* ---------- S5 · ratio 1:2: aciertas 4 de 10 y terminas en positivo ---------- */
const S5 = escena(7, 7, eyebrow('AHORA SUMA ESTO') + titulo(['RATIO', '*1:2*'], '', 160) +
  `<div class="L trades">${Array.from({ length: 10 }, (_, i) => i < 4 ? '<div class="g">+2<small>GANA</small></div>' : '<div class="p">−1<small>PIERDE</small></div>').join('')}</div>` +
  `<div class="L total">+2<small>EN POSITIVO</small></div>` +
  `<div class="L ratio"><div class="r1">−1<small>ARRIESGAS</small></div><div class="r2">+2<small>BUSCAS GANAR</small></div></div>`, (t, s) => {
  const [ey, tt, tr, tot, ra] = S5.$;
  ent(ey, t, s.a, CX, LAY.ey, { dy: 16 });
  titular(tt, t, s.a, tw(7, 'doble'));
  ent(ra, t, tw(7, 'operacion') - .1, CX, 960, { dy: 30, t1: tw(7, 'acertar') - .45, pulso: tw(7, 'doble') });
  ent(tr, t, tw(7, 'acertar') - .15, CX, 900, { dy: 30 });
  [...tr.children].forEach((c, i) => {
    const t0 = i < 4 ? tw(7, 'cuatro') + i * .12 : tw(7, 'diez') + (i - 4) * .08;
    const p = P(t, t0 - .05, .35, E.back);
    c.style.opacity = clamp(p * 2).toFixed(2); c.style.transform = `scale(${lerp(.5, 1, p).toFixed(3)})`;
  });
  brote(tot, t, tw(7, 'positivo') - .1, CX, 1290, { s0: .4 });
});
sfx(tw(7, 'doble'), 'golpe-corto', { vol: .7 }); [0, 1, 2, 3].forEach(i => sfx(tw(7, 'cuatro') + i * .12, 'tick', { vol: .7 }));
sfx(tw(7, 'diez'), 'tick-suave', { vol: .6 }); sfx(tw(7, 'positivo'), 'nota-doble', { vol: .75 });

/* ---------- S6 · primero cuida tu cuenta ---------- */
const S6 = escena(8, 8, titulo(['PRIMERO', 'CUIDA TU *CUENTA*'], '', 150) + `<div class="L sr">las ganancias <b>vienen después</b></div>` +
  `<div class="L sino ok" style="width:170px;height:170px">${icon('shieldCheck', 96, 2.2)}</div>`, (t, s) => {
  const [tt, sr, esc] = S6.$;
  titular(tt, t, s.a, tw(8, 'cuenta'), 700);
  ent(sr, t, tw(8, 'ganancias') - .1, CX, 900, { dy: 20 });
  brote(esc, t, tw(8, 'cuida') - .1, CX, 1150, { s0: .3 });
});
sfx(tw(8, 'cuida'), 'golpe', { vol: .8 }); sfx(tw(8, 'ganancias'), 'nota', { vol: .6 });

/* ---------- S7 · cierre ---------- */
const CTA = ctaNova({ a: XC(8), tPregunta: tw(9, 'aprender') - .1, tClave: tw(9, 'trading'), tSenales: tw(9, 'senales'), tEscribe: tw(9, 'comenta'), tEnvia: tw(9, 'envio') });
PINTAR.push(CTA.pintar);

TINTE = norm([[0, { v: .7, r: -1 }], [XC(1) - .3, {}], [XC(1) + .3, { v: 0, r: 0 }], [tw(7, 'positivo') - .2, {}], [tw(7, 'positivo') + .4, { v: .8, r: 1 }], [XC(7) - .2, {}], [XC(7) + .2, { v: 0 }]]);
CAMK = norm([[0, { x: CX, y: CY, s: 1.035 }], [XC(0), { s: 1 }, E.io3], [CONFIG.dur, { s: 1.02 }, E.ioSine]]);
subtitulos({ ocultar: t => t > XC(8) - .1 });
