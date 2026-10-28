/* =====================================================================
   CLASE 2 · Crea y optimiza tu cuenta de TikTok Shop (383 s, voz original de Ani).
   0-176 s Ani a camara (tarjeta a la izquierda + animaciones a la derecha) · 176-383 s tutorial en el celular
   (grabacion real en un celular + pasos que se encienden con la voz) · cierre de 3 s.
   ===================================================================== */
const FIN_ANI = 176.2, FIN_VOZ = 383.15, XR = 1320;
const ANI = tarjetaAni('ani', 0);
const CEL = celular('cel', 176.0);
const MARCAS = [[198.8, 201.7, 156, 292], [226.4, 229.3, 168, 214], [234.0, 236.0, 242, 832], [270.3, 273.2, 182, 210], [301.2, 311.4, 420, 238], [372.3, 375.2, 174, 302]];
const PASOS_T = [179.4, 182.0, 185.3, 198.5, 206.1, 212.8, 227.9, 237.5, 243.4, 246.8, 252.3, 257.8, 263.4, 273.4, 275.5, 277.7, 289.4, 290.5, 292.6, 295.2, 310.9, 319.1, 324.8, 335.5, 341.0, 355.4, 359.9, 366.3, 368.6];
function extra(t) {
  // Ani: entra al inicio y se va antes del tutorial
  const pa = P(t, .1, .6, E.out4), qa = P(t, FIN_ANI - .45, .4, E.in3);
  if (pa > 0 && qa < 1) {
    put(ANI.el, { x: 400 - (1 - pa) * 60, y: 556 + flota(t, 0, 3), s: lerp(.92, 1, pa) * (1 - .06 * qa), o: clamp(pa * 2) * (1 - qa), b: qa * 10 });
    verClip(ANI.img, ANI.clip, Math.min(t, FIN_ANI - .45), ANI.t0clip);       // nunca el primer cuadro del celular
  } else off(ANI.el);
  // celular: entra con el tutorial y se queda hasta el final de la voz
  const pc = P(t, FIN_ANI + .05, .6, E.out4), qc = P(t, FIN_VOZ + .1, .4, E.in3);
  if (pc > 0 && qc < 1) {
    const g = PASOS_T.reduce((m, x) => Math.max(m, bump(t, x - .15, .7)), 0);
    put(CEL.el, { x: 560, y: 540 + (1 - pc) * 60, s: lerp(.9, 1, pc) * (1 + .012 * g), o: clamp(pc * 2) * (1 - qc), b: qc * 8 });
    CEL.el.style.boxShadow = `0 0 0 2px rgba(255,255,255,.14),0 60px 140px -30px rgba(0,0,0,.95),0 0 ${(90 + 60 * g).toFixed(0)}px rgba(${g > .05 ? '255,122,26' : '169,112,255'},${(.3 + .3 * g).toFixed(2)})`;
    verClip(CEL.img, CEL.clip, t, CEL.t0clip);
    zoomCelular(CEL, t, MARCAS);
  } else off(CEL.el);
}
sfx(FIN_ANI - .3, 'transicion', { vol: .7 });

/* 1 · la cuenta de TikTok Shop es una cuenta de VENTAS, no personal */
const S1 = escenaT(0, 21.0, H.chip(2, 'CLASE') + H.tit('Tu cuenta de', 'TikTok Shop', 'c') +
  `<div class="L crd" style="width:470px;height:270px">${neo('shoppingCart', 'o', 100, '', true)}<div class="ct" style="top:150px">Cuenta de ventas</div><div class="cs" style="top:204px">Así se trabaja desde el día uno</div><span class="bdg" style="background:#2e9e5b">${icon('check', 30, 3)}</span></div>` +
  `<div class="L crd no" style="width:470px;height:270px">${neo('camera', 'p', 100, '', true)}<div class="ct" style="top:150px">Cuenta personal</div><div class="cs" style="top:204px">No la mezcles con tu vida</div><span class="bdg" style="background:#b8323d">${icon('x', 30, 3)}</span></div>`, (t, { a }) => {
  const [chip, tit, cV, cP] = S1.$;
  ent(chip, t, a + .3, XR, 190, { ay: 50 });
  ent(tit, t, a + .5, XR, 360, { s0: .85 });
  ent(cV, t, tp('ventas', 17) - .3, 1075, 770, { ease: E.back, s0: .7 });
  ent(cP, t, tp('personal', 19) - .3, 1565, 770, { ease: E.back, s0: .7 });
  [cV, cP].forEach(c => { const n = c.querySelector('.neo'); n.style.position = 'absolute'; n.style.left = '30px'; n.style.top = '26px'; });
  cV.classList.toggle('on', t >= tp('ventas', 17));
});
sfx(tp('ventas', 17) - .3, 'pop', { vol: .5 }); sfx(tp('personal', 19) - .3, 'pop', { vol: .5 });

/* 2 · el error mas comun: mezclar contenidos confunde al algoritmo y a las personas */
const MEZCLA = [['camera', 'p'], ['shoppingCart', 'o'], ['gamepad2', 'b'], ['music', 'p'], ['image', 'b'], ['video', 'o']];
const S2 = escenaT(21.0, 47.0, H.tit('No la', 'mezcles', 'c') + `<div class="L tag3" style="--c:${NEON.r}">${icon('triangleAlert', 30, 2.4)}El error más común</div>` +
  MEZCLA.map(([ic, c]) => neo(ic, c, 150)).join('') + neo('cpu', 'b', 170, 'ALGORITMO') + neo('users', 'p', 170, 'PERSONAS') +
  H.pill('circleHelp', 'Confusión total', '') , (t, { a }) => {
  const [tit, aviso, ...r] = S2.$;
  const tiles = r.slice(0, 6), [nA, nP, pc] = r.slice(6);
  const tAl = tp('algoritmo', 43);
  ent(tit, t, a + .2, XR, 240, { s0: .85 });
  ent(aviso, t, tp('errores', 28) - .3, XR, 390, { ease: E.back, s0: .6, dy: 0 });
  const t0 = tp('cualquier', 23), al = tp('aleatorios', 38);
  tiles.forEach((el, i) => {
    const sx = (i % 3 - 1) * 200, sy = Math.floor(i / 3) * 190;
    const sh = bump(t, al - .1 + i * .05, .5) * (i % 2 ? 1 : -1) * 14;
    ent(el, t, t0 + i * .45, XR + sx + sh, 610 + sy + flota(t, i, 4), { ease: E.back, s0: .5, dy: 0, t1: tAl - .5, r: sh * .6 });
  });
  ent(nA, t, tAl - .25, XR - 190, 640, { ease: E.back, s0: .5, dy: 0 });
  ent(nP, t, tp('personas', 44) - .25, XR + 190, 640, { ease: E.back, s0: .5, dy: 0 });
  ent(pc, t, tp('personas', 44) + .4, XR, 900, { ease: E.back, s0: .6, dy: 0 });
});
sfx(tp('errores', 28) - .3, 'fallo', { vol: .35 }); sfx(tp('aleatorios', 38) - .1, 'glitch', { vol: .3 });

/* 3 · la base de tu cuenta: correo -> cuenta -> optimizacion */
const RUTA = [['mail', 'p', 'Correo', tp('correo', 53)], ['smartphone', 'o', 'Cuenta', tp('creacion', 56)], ['sparkles', 'b', 'Optimización', tp('optimizacion', 57)]];
const S3 = escenaT(47.0, 60.4, H.tit('La base de', 'tu cuenta', 'c') + RUTA.map(([ic, c, l]) => neo(ic, c, 170, l)).join('') + H.lin(220) + H.lin(220), (t, { a }) => {
  const [tit, ...r] = S3.$;
  ent(tit, t, a + .2, XR, 290, { s0: .85 });
  r.slice(0, 3).forEach((el, i) => ent(el, t, RUTA[i][3] - .3, 990 + i * 330, 610, { ease: E.back, s0: .5, dy: 0 }));
  r.slice(3).forEach((ln, i) => {
    const p = P(t, RUTA[i + 1][3] - .45, .35, E.io3);
    if (p > 0) { put(ln, { x: 1100 + i * 330, y: 610, ax: 0, o: 1 }); ln.style.transform += ` scaleX(${p.toFixed(3)})`; } else off(ln);
  });
});
RUTA.forEach(x => sfx(x[3] - .3, 'pop', { vol: .45 }));

/* 4 · un correo solo para esto */
const USOS = [['Registros', 'registros', 75], ['Accesos', 'accesos', 75.8], ['Colaboraciones', 'colaboraciones', 77], ['Contratos con marcas', 'contratos', 78]];
const S4 = escenaT(60.4, 82.0, H.tit('Un correo', 'solo para esto', 'c') + H.tile('gmail', 210) + `<div class="L tag3" style="--c:${NEON.p}">${icon('plus', 26, 2.6)}¿No tienes? Lo creamos desde cero</div>` +
  USOS.map(([txt], i) => `<div class="L tag3" style="--c:${[NEON.o, NEON.b, NEON.p, NEON.o][i]}">${icon(['fileText', 'key', 'users', 'briefcase'][i], 28, 2.4)}${txt}</div>`).join(''), (t, { a }) => {
  const [tit, gm, cero, ...us] = S4.$;
  ent(tit, t, a + .2, XR, 230, { s0: .85 });
  brote(gm, t, tp('exclusivamente', 63) - .4, 1060, 560, { pulso: tp('correo', 72) });
  ent(cero, t, tp('cero', 70) - .3, 1060, 800, { ease: E.back, s0: .6, dy: 0 });
  us.forEach((u, i) => ent(u, t, tp(USOS[i][1], USOS[i][2]) - .25, 1440, 470 + i * 100, { ax: 0, dx: 50, dy: 0 }));
});
USOS.forEach(u => sfx(tp(u[1], u[2]) - .25, 'tick', { vol: .4 }));

/* 5 · ¿cuenta vieja? sirve solo si no la usas para otra cosa; si no, creala desde cero */
const CONDS = [['La usas para otra cosa', 'cosa', 103], ['Tiene contenido de otro nicho', 'nicho', 105], ['La quieres seguir usando personal', 'personal', 107], ['Volverás a subir otro contenido', 'contenido', 113]];
const S5 = escenaT(82.0, 118.85, H.tit('¿Tienes una', 'cuenta vieja?', 'c') +
  `<div class="L crd" style="width:460px;height:420px;--c:${NEON.v}">${neo('check', 'v', 90, '', true)}<div class="ct" style="top:126px">Sin uso</div><div class="cs" style="top:178px">Úsala y trabájala hasta llegar a</div><div class="cnt" style="left:30px;top:250px">0</div></div>` +
  `<div class="L crd" style="width:560px;height:520px">${neo('x', 'r', 90, '', true)}<div class="ct" style="top:126px">No la uses si...</div>` +
  CONDS.map(([c], i) => `<div class="tag3" style="--c:${NEON.r};left:30px;top:${190 + i * 76}px;height:58px;font-size:24px;opacity:0">${icon('x', 24, 3)}${c}</div>`).join('') + '</div>' +
  H.pill('sparkles', 'Créate una cuenta desde cero', 'll'), (t, { a }) => {
  const [tit, cV, cN, pz] = S5.$;
  ent(tit, t, tp('vieja', 84) - .4, XR, 220, { s0: .85 });
  [cV, cN].forEach(c => { const n = c.querySelector('.neo'); n.style.position = 'absolute'; n.style.left = '30px'; n.style.top = '24px'; });
  ent(cV, t, tp('utilizarla', 94) - .4, 1040, 600, { ease: E.back, s0: .7 });
  const tc0 = tp('utilizarla', 94) + .3, tc1 = tp('seguidores', 97) + .2, n = Math.round(5000 * P(t, tc0, tc1 - tc0, E.out3));
  const cnt = cV.querySelector('.cnt'); const txt = miles(n); if (cnt._t !== txt) { cnt._t = txt; cnt.innerHTML = `${txt}<small>seguidores</small>`; }
  ent(cN, t, tp('inteligente', 100) - .3, 1580, 600, { ease: E.back, s0: .7 });
  [...cN.querySelectorAll('.tag3')].forEach((g, i) => { const p = P(t, tp(CONDS[i][1], CONDS[i][2]) - .25, .3); g.style.opacity = p.toFixed(3); g.style.transform = `translateX(${((1 - p) * 30).toFixed(1)}px)`; });
  ent(pz, t, tp('create', 116) - .2, 1580, 935, { ease: E.back, s0: .6, dy: 0 });
});
sfx(tp('utilizarla', 94) - .4, 'pop', { vol: .5 }); sfx(tp('inteligente', 100) - .3, 'pop', { vol: .5 });
CONDS.forEach(c => sfx(tp(c[1], c[2]) - .25, 'tick', { vol: .4 })); sfx(tp('create', 116) - .2, 'brillo', { vol: .55 });

/* 6 · todo alineado al objetivo de vender + claridad para el algoritmo y las personas */
const ALI = [['Contenido', 'contenido', 125, 'video'], ['Imagen', 'imagen', 126.5, 'image'], ['Estrategia', 'estrategia', 127.5, 'target'], ['Dirección', 'direccion', 128.5, 'arrowUpRight']];
const S6 = escenaT(118.85, 139.3, H.tit('Se trabaja como', 'cuenta de ventas', 'c') +
  ALI.map(([txt, , , ic], i) => `<div class="L tag3" style="--c:${[NEON.p, NEON.b, NEON.o, NEON.p][i]};width:380px">${icon(ic, 28, 2.4)}${txt}</div>`).join('') +
  neo('target', 'o', 190, 'UN SOLO OBJETIVO') + H.tit('', 'Claridad', 'c') + neo('cpu', 'b', 150, 'ALGORITMO') + neo('users', 'p', 150, 'PERSONAS'), (t, { a }) => {
  const [tit, ...r] = S6.$;
  const tags = r.slice(0, 4), [obj, tc, nA, nP] = r.slice(4);
  const tCl = tp('claridad', 133);
  ent(tit, t, a + .2, XR, 230, { s0: .85, t1: tCl - .75 });
  tags.forEach((g, i) => ent(g, t, tp(ALI[i][1], ALI[i][2]) - .25, 990, 430 + i * 100, { ax: 0, dx: -40, dy: 0, t1: tCl - .4 }));
  ent(obj, t, tp('alineadas', 131) - .3, 1600, 560, { ease: E.back, s0: .5, dy: 0, t1: tCl - .4, pulso: tp('alineadas', 131) + .4 });
  ent(tc, t, tCl - .05, XR, 330, { s0: .8 });
  ent(nA, t, tp('algoritmo', 135) - .25, XR - 200, 640, { ease: E.back, s0: .5, dy: 0 });
  ent(nP, t, tp('personas', 136) - .25, XR + 200, 640, { ease: E.back, s0: .5, dy: 0 });
});
ALI.forEach(x => sfx(tp(x[1], x[2]) - .25, 'tick', { vol: .4 })); sfx(tp('claridad', 133) - .2, 'brillo', { vol: .5 });

/* 7 · optimiza tu perfil: foto, descripcion y estructura -> limpia, clara y preparada para crecer */
css(`
.perf{width:560px;height:640px;border-radius:34px;background:#fff;overflow:hidden;box-shadow:0 50px 120px -30px rgba(0,0,0,.95),0 0 60px rgba(169,112,255,.25)}
.perf .av{position:absolute;left:50%;top:40px;width:150px;height:150px;margin-left:-75px;border-radius:50%;overflow:hidden;border:4px solid #fff;box-shadow:0 0 0 4px #ff7a1a}
.perf .av img{width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.perf .nm2{position:absolute;left:0;right:0;top:210px;text-align:center;font:800 30px var(--sans);color:#161823}
.perf .us{position:absolute;left:0;right:0;top:252px;text-align:center;font:600 22px var(--sans);color:#6b6d76}
.perf .bio{position:absolute;left:60px;right:60px;top:300px;display:flex;flex-direction:column;gap:10px;align-items:center}
.perf .bio i{display:block;height:14px;border-radius:7px;background:#d9dae0}
.perf .gr{position:absolute;left:14px;right:14px;top:420px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.perf .gr i{display:block;height:200px;border-radius:8px;background:linear-gradient(160deg,#ede9ff,#ffd9c2)}
`);
const S7 = escenaT(139.3, 155.3, H.tit('Optimiza', 'tu perfil', 'c') +
  `<div class="L perf"><div class="av"><img alt="" src="${fotoClip('ani', 2400)}"></div><div class="nm2">Tu nombre y apellido</div><div class="us">@tunombre</div>` +
  `<div class="bio"><i style="width:90%"></i><i style="width:75%"></i><i style="width:55%"></i></div><div class="gr">${'<i></i>'.repeat(6)}</div></div>` +
  [['Foto de perfil', 'foto', 143], ['Descripción', 'descripcion', 145], ['Estructura', 'estructura', 146.5]].map(([x], i) => `<div class="L tag3" style="--c:${[NEON.o, NEON.p, NEON.b][i]}">${icon(['camera', 'fileText', 'layoutTemplate'][i], 28, 2.4)}${x}</div>`).join('') +
  ['Limpia', 'Clara', 'Lista para crecer'].map(x => H.pill('check', x, 'ok')).join(''), (t, { a }) => {
  const [tit, pf, g1, g2, g3, k1, k2, k3] = S7.$;
  ent(tit, t, a + .2, XR, 200, { s0: .85 });
  ent(pf, t, a + .4, 1150, 640, { s0: .9 });
  const tF = tp('foto', 143), tD = tp('descripcion', 145), tE = tp('estructura', 146.5);
  pop(pf.querySelector('.av'), P(t, tF - .2, .4), .4);
  [...pf.querySelectorAll('.bio i')].forEach((b, i) => { b.style.transformOrigin = '50% 50%'; b.style.transform = `scaleX(${P(t, tD - .1 + i * .12, .35).toFixed(3)})`; });
  [...pf.querySelectorAll('.gr i')].forEach((b, i) => pop(b, P(t, tE - .1 + i * .08, .3), .6));
  [g1, g2, g3].forEach((g, i) => ent(g, t, [tF, tD, tE][i] - .25, 1480, 450 + i * 100, { ax: 0, dx: 40, dy: 0 }));
  [k1, k2, k3].forEach((k, i) => ent(k, t, tp(['limpia', 'clara', 'preparada'][i], 150) - .25, 1480, 800 + i * 0, { ax: 0, ease: E.back, s0: .6, dy: 0, t1: i < 2 ? tp(['clara', 'preparada'][i], 150) - .3 : null }));
});
['foto', 'descripcion', 'estructura'].forEach((w, i) => sfx(tp(w, [143, 145, 146.5][i]) - .25, 'tick', { vol: .4 }));

/* 8 · no te saltes el tutorial: mira hasta el final, aplica cada paso y deja tu cuenta lista */
const S8 = escenaT(155.3, FIN_ANI, H.tit('No te saltes', 'el tutorial', 'c') + neo('play', 'o', 130) +
  `<div class="L" style="width:700px;height:20px;border-radius:10px;background:#221f33;overflow:hidden"><i style="display:block;height:100%;width:100%;background:linear-gradient(90deg,#a970ff,#ff7a1a);transform-origin:0 50%;transform:scaleX(0)"></i></div>` +
  [['Mira la clase hasta el final', 'final', 168], ['Aplica cada paso', 'paso', 170], ['Deja tu cuenta lista', 'lista', 172], ['Siguiente módulo', 'siguiente', 174]].map(([x], i) => `<div class="L tag3" style="--c:${i === 3 ? NEON.o : NEON.v}">${icon(i === 3 ? 'arrowRight' : 'check', 28, 2.6)}${x}</div>`).join(''), (t, { a }) => {
  const [tit, pl, bar, ...ks] = S8.$;
  ent(tit, t, tp('tutorial', 157) - .5, XR, 240, { s0: .85 });
  brote(pl, t, tp('tutorial', 157), 1000, 520);
  ent(bar, t, tp('tutorial', 157) + .2, 1440, 520, { dy: 0 });
  bar.firstChild.style.transform = `scaleX(${P(t, tp('tutorial', 157) + .3, tp('final', 168) - tp('tutorial', 157), E.io3).toFixed(4)})`;
  ks.forEach((k, i) => ent(k, t, tp(['final', 'paso', 'lista', 'siguiente'][i], [168, 170, 172, 174][i]) - .25, 1000, 660 + i * 90, { ax: 0, dx: 40, dy: 0 }));
});
['final', 'paso', 'lista', 'siguiente'].forEach((w, i) => sfx(tp(w, [168, 170, 172, 174][i]) - .25, 'tick', { vol: .4 }));

/* ---------- tutorial en el celular (176-383 s) ---------- */
escenaPasos(FIN_ANI, 219.6, { n: 'PASO 1', titulo: 'Crea tu correo', items: [['Abre Gmail', tp('gmail', 179)], ['Toca «Agregar otra cuenta»', tp('agregar', 181)], ['Elige Google', tp('google', 185)],
  ['Toca «Crear una cuenta»', tp('crear', 198)], ['Nombre y fecha de nacimiento', tp('nombre', 205)], ['Tu correo queda listo', tp('listo', 212), 'Con él abres tu cuenta de TikTok Shop']] });
escenaPasos(219.6, 268.1, { n: 'PASO 2', titulo: 'Agrega tu cuenta', items: [['Toca tu nombre arriba', tp('nombre', 227)], ['Elige «Agregar cuenta»', tp('agregar', 237)], ['Regístrate con correo', tp('registrar', 243)],
  ['Pon tu fecha de nacimiento', tp('nacimiento', 246)], ['Correo, no teléfono', tp('telefono', 252), 'El correo que creaste'], ['Toca «Continuar»', tp('continuar', 257)], ['Cuenta creada', tp('creada', 263)]] });
escenaPasos(268.1, 282.7, { n: 'TIP', titulo: 'Cambia de cuenta', items: [['Toca tu nombre', tp('nombre', 273)], ['Se abre el panel abajo', tp('panel', 275)], ['Elige la cuenta que quieras', tp('cuentas', 277)]] });
escenaPasos(282.7, 297.6, { n: 'PASO 3', titulo: 'Foto de perfil', items: [['Tu rostro', tp('rostro', 289)], ['Clara y visible', tp('clara', 290)], ['Sin logo ni texto', tp('logo', 292)], ['Que se vea confiable', tp('confiable', 295)]] });
escenaPasos(297.6, 347.7, { n: 'PASO 4', titulo: 'Nombre y usuario', items: [['Toca la flechita para editar', tp('flechita', 310)], ['Cambia tu nombre', tp('nombre', 319)], ['Nombre con tus apellidos', tp('apellido', 324), 'Nada de apodos'],
  ['Toca «Guardar»', tp('guardar', 335)], ['Usuario: nombre y apellido', tp('usuario', 340)]] });
escenaPasos(347.7, FIN_VOZ, { n: 'PASO 5', titulo: 'Descripción', items: [['Qué haces en tu cuenta', tp('descripcion', 355)], ['Vender y recomendar productos', tp('vender', 359)], ['Apóyate en ChatGPT', tp('chat', 366)],
  ['Correo de colaboraciones', tp('colaboraciones', 368), 'Collab: tucorreo@gmail.com']] });

/* cierre */
const SF = escenaT(FIN_VOZ, CONFIG.dur, H.tit('Clase 2', 'completada', 'c') +
  `<div class="L tag3" style="--c:${NEON.o}">${icon('arrowRight', 28, 2.6)}Siguiente: estrategia para llegar a 5.000 seguidores</div>`, (t, { a }) => {
  const [tit, sig] = SF.$;
  ent(tit, t, a + .2, CX, 470, { s0: .85 });
  ent(sig, t, a + .7, CX, 700, { ease: E.back, s0: .6, dy: 0 });
});
sfx(FIN_VOZ + .2, 'golpe', { vol: .7 });
MARCAS.forEach(m => sfx(m[0] - .2, 'aire', { vol: .45 }));
activarPro(ESCENAS.slice(0, -1).map(e => e.b), { grano: 0 });
