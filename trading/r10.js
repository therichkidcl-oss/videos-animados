/* =====================================================================
   REEL 10 · FOMO: POR QUE COMPRAS JUSTO ARRIBA (formato cine)
   f0 gancho (ambiente): un cuarto de noche; el telefono en la cama, tocas COMPRAR y el precio se da vuelta; un gato
      negro (¿mala suerte?) se tacha y una etiqueta «HOLA, ME LLAMO ???» cae sobre la escena.
   f1 la etiqueta dice FOMO; aparece el bicho del FOMO, temblando; el telefono sube y llueven avisos; mapa desde arriba:
      la ciudad corre hacia el mismo edificio y tu moneda corre con ellos, sin plan.
   f2 el cohete: el grafico sube, al principio nadie habla y arriba todos hablan; tu moneda se sube arriba y el cohete cae.
   f3 el dato: el estudio con usuarios de Robinhood (Journal of Finance, 2022): las mas compradas del dia, -4,7 % en 20 dias.
   f4 el plan (objetos con cara, escritorio desde arriba): la libreta y el lapiz dibujan ENTRADA y STOP antes de que se mueva.
   f5 el paradero: el bus de +40 % se va, tu moneda lo deja ir y llega el siguiente.
   f6 persigues la etiqueta del precio, que crece, y terminas pagando mas caro.
   f7 cierre: comenta TRADING.
   ===================================================================== */
const RESALTAR = [[0, 'caer'], [0, 'nombre'], [1, 'fomo'], [1, 'ganando'], [1, 'plan'], [2, 'todos'], [2, 'paso'], [3, 'robinhood'], [3, '5'], [3, 'normal'],
  [4, 'entrada'], [4, 'stop'], [5, 'bus'], [5, 'otro'], [6, 'caro'], [7, 'trading']];
const SUB = new SubViral({ resaltar: RESALTAR });
PINTAR.push(t => SUB.pintar(t));
const TU_C = '#f4c430';

css(`
.ftel{width:470px;height:940px;border-radius:64px;background:linear-gradient(180deg,#0b1020,#05060a);border:4px solid #3a3f4a;box-shadow:inset 0 0 0 10px #101318,0 50px 100px rgba(0,0,0,.7);overflow:hidden}
.ftel .isla{position:absolute;left:50%;top:22px;width:120px;height:34px;border-radius:17px;background:#000;transform:translateX(-50%)}
.ftel .bar{position:absolute;left:40px;right:40px;top:28px;display:flex;justify-content:space-between;font:700 22px Outfit;color:#e9e4d8}
.ftel .cab{position:absolute;left:32px;right:32px;top:96px;display:flex;align-items:center;gap:12px;font:700 26px Outfit;color:#fff}
.ftel .cab i{width:14px;height:14px;border-radius:50%;background:#22d39a;box-shadow:0 0 10px #22d39a}
.ftel .cab small{margin-left:auto;font:600 17px 'JetBrains Mono';letter-spacing:.12em;color:#8e9a86}
.ftel .pr{position:absolute;left:32px;top:146px;font:400 104px/1 'Bebas Neue';color:#fff;letter-spacing:.01em}
.ftel .ch{position:absolute;left:34px;top:254px;font:800 30px Outfit;color:#3fe0aa}
.ftel svg.gr{position:absolute;left:0;top:300px}
.ftel .bt{position:absolute;left:30px;right:30px;bottom:150px;height:112px;border-radius:30px;background:linear-gradient(180deg,#3fe0aa,#14b07e);display:flex;align-items:center;justify-content:center;
  font:800 42px Outfit;letter-spacing:.04em;color:#04140d;box-shadow:0 14px 34px rgba(34,211,154,.35)}
.ftel .bt2{position:absolute;left:30px;right:30px;bottom:54px;height:76px;border-radius:24px;background:#1b2030;display:flex;align-items:center;justify-content:center;font:700 30px Outfit;color:#8e96a8}
.ftel .toast{position:absolute;left:30px;right:30px;top:560px;height:84px;border-radius:22px;background:rgba(18,26,22,.96);border:2px solid rgba(34,211,154,.7);display:flex;align-items:center;gap:14px;
  padding:0 22px;font:700 28px Outfit;color:#c9ffe9;opacity:0}
.ftel .toast svg{color:#3fe0aa}
.fnot{width:440px;height:112px;border-radius:28px;background:rgba(36,38,48,.94);border:1.5px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:16px;padding:0 20px;box-sizing:border-box;
  box-shadow:0 16px 40px rgba(0,0,0,.55)}
.fnot .ic{width:64px;height:64px;flex:none;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff}
.fnot b{display:block;font:800 23px Outfit;color:#fff}.fnot span{display:block;font:600 22px/1.25 Outfit;color:#cfd3dc;margin-top:3px;white-space:nowrap}
.ftag{width:640px;height:440px;border-radius:36px;background:#fbfaf6;box-shadow:0 30px 70px rgba(0,0,0,.6);overflow:hidden}
.ftag .hd{height:160px;background:#ff4d6a;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff}
.ftag .hd b{font:400 98px/1 'Bebas Neue';letter-spacing:.06em}.ftag .hd small{font:800 26px Outfit;letter-spacing:.22em;margin-top:4px}
.ftag .nm{height:280px;display:flex;align-items:center;justify-content:center;font:400 190px/1 'Bebas Neue';color:#1d1b33;letter-spacing:.05em}
.fbur{padding:18px 28px;border-radius:30px;background:#fbfaf6;font:800 36px Outfit;color:#16131f;white-space:nowrap;box-shadow:0 14px 34px rgba(0,0,0,.45)}
.fpap{width:860px;padding:36px 44px 40px;border-radius:24px;background:#fbfaf6;box-shadow:0 40px 90px rgba(0,0,0,.6);box-sizing:border-box}
.fpap small{display:block;font:700 22px 'JetBrains Mono';letter-spacing:.18em;color:#6b6f7c}
.fpap h4{margin:16px 0 0;font:800 44px/1.15 Outfit;color:#16131f}
.fpap p{margin:16px 0 0;font:600 26px Outfit;color:#4b4f5c}
.fpap .rh{position:absolute;right:30px;top:-46px;width:110px;height:110px;border-radius:28px;background:#0b0f0a;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 40px rgba(0,0,0,.5);border:2px solid rgba(204,255,0,.5)}
.fpap .rh img{width:64px;height:64px}
.flb{width:860px;padding:30px 34px;border-radius:32px;background:linear-gradient(180deg,rgba(20,26,40,.96),rgba(10,13,22,.96));border:2px solid rgba(244,196,48,.35);box-sizing:border-box;box-shadow:0 40px 90px rgba(0,0,0,.6)}
.flb h5{margin:0 0 12px;display:flex;align-items:center;gap:12px;font:400 50px/1 'Bebas Neue';letter-spacing:.05em;color:#f4c430}
.flb .fi{display:flex;align-items:center;gap:18px;height:74px;opacity:0}
.flb .fi b{width:64px;font:400 46px 'Bebas Neue';color:#e9e4d8}.flb .fi i{flex:none;display:block;height:26px;border-radius:13px;background:linear-gradient(90deg,#22d39a,#7ff7cc)}
.flb .fi span{margin-left:auto;font:800 28px Outfit;color:#3fe0aa}
.fnum{font:400 250px/1 'Bebas Neue';color:#ff4d6a;letter-spacing:.01em;white-space:nowrap;text-shadow:0 0 50px rgba(255,77,106,.45)}
.fnumt{font:700 34px Outfit;color:#e9e4d8;white-space:nowrap;text-align:center}.fnumt b{color:#ff6b83}
.fcal{display:grid;grid-template-columns:repeat(5,108px);gap:14px}
.fcal i{display:block;height:74px;border-radius:14px;background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.1)}
.fcal i.on{background:rgba(255,77,106,.22);border-color:rgba(255,77,106,.8)}
.fcalt{font:400 54px 'Bebas Neue';letter-spacing:.06em;color:#e9e4d8;white-space:nowrap}
`);

/* ---------- dibujos de este reel ---------- */
function dDedo(w = 160, piel = '#f1c7a5') {
  const g = dId('ded');
  return dSvg('0 0 160 360', w, w * 360 / 160, `<defs>${dGrad(g, [[0, '#d9a27c'], [.5, piel], [1, '#e8b48e']], 1, 0)}</defs>
  <path d="M40 0 L40 250 C40 300 56 340 80 340 C104 340 120 300 120 250 L120 0 Z" fill="url(#${g})"/>
  <path d="M56 246 C56 214 104 214 104 246 L104 290 C104 312 56 312 56 290 Z" fill="#fbe3d3" stroke="rgba(160,100,70,.35)" stroke-width="3"/>
  <path d="M46 120 Q80 132 114 120 M46 160 Q80 170 114 160" stroke="rgba(150,90,60,.35)" stroke-width="4" fill="none"/>`);
}
function dGato(w = 300) {
  return dSvg('-150 -170 300 290', w, w * 290 / 300, `${dSombra(0, 112, 110, 14, .45)}
    <path class="cola" d="M80 90 Q160 60 140 -10 Q130 -50 104 -40" fill="none" stroke="#0e0d14" stroke-width="22" stroke-linecap="round"/>
    <path d="M-92 110 Q-104 10 -70 -40 Q-40 -70 0 -70 Q40 -70 70 -40 Q104 10 92 110 Z" fill="#14121c"/>
    <path d="M-80 -60 L-96 -158 L-24 -96 Z M80 -60 L96 -158 L24 -96 Z" fill="#14121c"/>
    <path d="M-76 -78 L-84 -136 L-40 -98 Z M76 -78 L84 -136 L40 -98 Z" fill="#3a2a3a"/>
    <ellipse cx="0" cy="-40" rx="96" ry="78" fill="#14121c"/>
    <g class="ojos"><ellipse cx="-36" cy="-46" rx="22" ry="26" fill="#ffd23f"/><ellipse cx="36" cy="-46" rx="22" ry="26" fill="#ffd23f"/>
      <ellipse class="pup" cx="-36" cy="-46" rx="6" ry="20" fill="#0e0d14"/><ellipse class="pup" cx="36" cy="-46" rx="6" ry="20" fill="#0e0d14"/></g>
    <path d="M-8 -12 L8 -12 L0 -2 Z" fill="#ff8aa0"/><path d="M-60 -10 L-130 -24 M-60 0 L-128 6 M60 -10 L130 -24 M60 0 L128 6" stroke="rgba(255,255,255,.35)" stroke-width="3"/>`);
}
function dFomo(w = 320) {
  const g = dId('fo');
  return dSvg('-160 -170 320 330', w, w * 330 / 320, `<defs>${dRadial(g, [[0, '#d7b8ff'], [.55, '#9b5cff'], [1, '#5a23b8']], .38, .32, .75)}</defs>
    ${dSombra(0, 150, 110, 16, .45)}
    <path class="bI" d="M-118 30 Q-170 50 -168 100" fill="none" stroke="#6c32c9" stroke-width="22" stroke-linecap="round"/>
    <path class="bD" d="M118 30 Q170 50 168 100" fill="none" stroke="#6c32c9" stroke-width="22" stroke-linecap="round"/>
    <path d="M-130 20 Q-140 -110 -60 -138 Q0 -156 60 -138 Q140 -110 130 20 Q126 130 0 140 Q-126 130 -130 20 Z" fill="url(#${g})"/>
    ${[-90, -40, 20, 70, 110].map((x, i) => `<path d="M${x} ${-128 + Math.abs(x) * .1} q10 -34 24 -6" fill="#9b5cff" stroke="#6c32c9" stroke-width="4"/>`).join('')}
    <ellipse cx="-60" cy="-80" rx="34" ry="18" fill="rgba(255,255,255,.3)" transform="rotate(-24 -60 -80)"/>
    ${dOjos('#8a4ff0', { y: -30, e: 1.45, sep: 46 })}
    ${dBoca(0, 52, 1.1)}`);
}
function dCohete(w = 200) {
  const g = dId('co'), f = dId('fl');
  return dSvg('-100 -170 200 330', w, w * 330 / 200, `<defs>${dGrad(g, [[0, '#ffffff'], [.6, '#dfe3ea'], [1, '#9aa3b2']], 1, 0)}${dRadial(f, [[0, '#fff7c2'], [.5, '#f4c430'], [1, '#ff6a2a', 0]])}</defs>
    <ellipse class="fuego" cx="0" cy="118" rx="38" ry="64" fill="url(#${f})"/>
    <path d="M-46 40 L-82 96 L-40 86 Z M46 40 L82 96 L40 86 Z" fill="#ff4d6a" stroke="#a8173a" stroke-width="4" stroke-linejoin="round"/>
    <path d="M0 -150 Q58 -90 50 60 L-50 60 Q-58 -90 0 -150 Z" fill="url(#${g})" stroke="#7a8392" stroke-width="5"/>
    <path d="M0 -150 Q30 -120 40 -86 L-40 -86 Q-30 -120 0 -150 Z" fill="#ff4d6a"/>
    <rect x="-40" y="60" width="80" height="22" rx="6" fill="#5b6475"/>
    <circle cx="0" cy="-20" r="44" fill="#1d2a4a" stroke="#7a8392" stroke-width="6"/>
    ${dOjos('#1d2a4a', { y: -24, e: .62, sep: 30 })}${dBoca(0, 4, .5)}`);
}
function dLapiz(w = 150) {
  return dSvg('-40 -250 80 300', w * .27, w, `<rect x="-22" y="-240" width="44" height="40" rx="10" fill="#ff8aa0"/><rect x="-22" y="-206" width="44" height="18" fill="#c9ccd4"/>
    <rect x="-22" y="-190" width="44" height="190" fill="#f4c430"/><rect x="-22" y="-190" width="14" height="190" fill="#ffe27a"/>
    <path d="M-22 0 L22 0 L0 46 Z" fill="#f1d6a8"/><path d="M-7 31 L7 31 L0 46 Z" fill="#2a2a33"/>
    ${dOjos('#f4c430', { y: -120, e: .4, sep: 13 })}${dBoca(0, -98, .3)}`);
}
function dBus(w = 640, { color = ['#ffe27a', '#f4c430', '#c99a12'], letrero = '+40 %', tinta = '#1a1208' } = {}) {
  const g = dId('bu');
  return dSvg('-330 -190 660 330', w, w * 330 / 660, `<defs>${dGrad(g, [[0, color[0]], [.5, color[1]], [1, color[2]]])}</defs>
    ${dSombra(0, 132, 300, 18, .5)}
    <rect x="-310" y="-160" width="600" height="250" rx="44" fill="url(#${g})" stroke="rgba(0,0,0,.35)" stroke-width="4"/>
    <rect x="-290" y="-118" width="400" height="96" rx="16" fill="#1b2a4a"/>${[-190, -90, 10].map(x => `<line x1="${x}" y1="-118" x2="${x}" y2="-22" stroke="${color[2]}" stroke-width="8"/>`).join('')}
    <path d="M-280 -110 L-230 -110 L-270 -40 Z M-180 -110 L-140 -110 L-170 -50 Z" fill="rgba(255,255,255,.18)"/>
    <rect x="128" y="-118" width="70" height="170" rx="10" fill="#1b2a4a"/><line x1="163" y1="-118" x2="163" y2="52" stroke="${color[2]}" stroke-width="5"/>
    <path d="M214 -122 L272 -122 Q290 -122 290 -100 L290 -20 L214 -20 Z" fill="#1b2a4a"/>
    <rect x="-200" y="-182" width="300" height="44" rx="10" fill="#0b0f1a" stroke="${color[2]}" stroke-width="4"/>
    <text x="-50" y="-150" text-anchor="middle" fill="${letrero.startsWith('+') ? '#3fe0aa' : '#7ff7cc'}" style="font:400 34px 'Bebas Neue';letter-spacing:.08em">${letrero}</text>
    <rect x="-310" y="40" width="600" height="18" fill="rgba(0,0,0,.18)"/>
    <circle cx="276" cy="40" r="14" fill="#fff6c2" style="filter:drop-shadow(0 0 12px #fff6c2)"/>
    ${[-190, 170].map(x => `<g class="rueda" transform="translate(${x} 92)"><circle r="46" fill="#14161c"/><circle r="22" fill="#9aa3b2"/><rect x="-4" y="-22" width="8" height="44" fill="#5b6475"/></g>`).join('')}
    <g transform="translate(252 -68)">${dOjos(color[1], { e: .55, sep: 18 })}</g>`);
}
function dEtiqueta(w = 260, precio = '$ 100') {
  return dSvg('-140 -190 280 360', w, w * 360 / 280, `${dSombra(0, 160, 90, 12, .45)}
    <g class="patas"><path class="pI" d="M-30 70 L-40 150" stroke="#e9e4d8" stroke-width="12" stroke-linecap="round"/><path class="pD" d="M30 70 L40 150" stroke="#e9e4d8" stroke-width="12" stroke-linecap="round"/></g>
    <path d="M-110 -100 L-10 -170 L110 -170 L110 80 L-110 80 Z" fill="#fbfaf6" stroke="rgba(0,0,0,.3)" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="-40" cy="-118" r="14" fill="#1d1b33"/>
    <text class="tx" x="0" y="44" text-anchor="middle" fill="#1d1b33" style="font:400 76px 'Bebas Neue';letter-spacing:.02em">${precio}</text>
    ${dOjos('#e9e4d8', { x: 20, y: -60, e: .7, sep: 30 })}`);
}

/* =====================================================================
   0 · EL CUARTO DE NOCHE (f0): el telefono en la cama; tocas COMPRAR y el precio se da vuelta. ¿Mala suerte? No.
   ===================================================================== */
const T0 = { pas: tw(0, 'pasado'), com: tw(0, 'compras'), jus: tw(0, 'justo'), pre: tw(0, 'precio'), emp: tw(0, 'empieza'), cae: tw(0, 'caer'), no: tw(0, 'no'),
  mala: tw(0, 'mala'), sue: tw(0, 'suerte'), tie: tw(0, 'tiene'), nom: tw(0, 'nombre') };
const CU = new Plano(5), TEL0 = [540, 1010];
const CU_FON = dEl(CU.el, '', `<svg width="1400" height="2200" viewBox="-160 -140 1400 2200" style="display:block">
  <defs>${dGrad('cuP', [[0, '#070a1e'], [.6, '#10163a'], [1, '#0a0d24']])}${dGrad('cuB', [[0, '#3b2f7a'], [1, '#1a1440']])}${dGrad('cuV', [[0, '#0b1640'], [1, '#2a3a7a']])}</defs>
  <rect x="-160" y="-140" width="1400" height="2200" fill="url(#cuP)"/>
  <rect x="60" y="120" width="380" height="480" rx="18" fill="url(#cuV)" stroke="#2c3566" stroke-width="16"/>
  <line x1="250" y1="120" x2="250" y2="600" stroke="#2c3566" stroke-width="10"/><line x1="60" y1="360" x2="440" y2="360" stroke="#2c3566" stroke-width="10"/>
  <circle cx="340" cy="220" r="40" fill="#fff6d6" opacity=".9"/><circle cx="356" cy="208" r="36" fill="#0b1640"/>
  ${[[90, 520, 60, 70], [160, 490, 40, 100], [210, 530, 50, 60], [280, 470, 46, 120], [340, 510, 60, 80], [400, 540, 40, 50]].map(([x, y, w2, h2]) => `<rect x="${x}" y="${y}" width="${w2}" height="${h2 + 60}" fill="#141b3d"/>`).join('')}
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${100 + (i * 23) % 320}" y="${500 + (i * 37) % 80}" width="8" height="10" fill="#ffd36b" opacity=".7"/>`).join('')}
  <path d="M-160 1260 Q300 1180 700 1230 Q1050 1270 1240 1220 L1240 2060 L-160 2060 Z" fill="url(#cuB)"/>
  <path d="M-160 1330 Q200 1270 560 1320 Q900 1370 1240 1300" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="10"/>
  <path d="M-160 1480 Q260 1420 620 1480 Q980 1540 1240 1470" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="14"/>
  <rect x="920" y="900" width="300" height="340" rx="16" fill="#2a2140"/><rect x="940" y="930" width="260" height="20" rx="8" fill="#3a2f55"/>
  <path d="M1010 900 L1050 760 L1110 760 L1150 900 Z" fill="#4a3d6a"/><rect x="1075" y="700" width="10" height="70" fill="#3a2f55"/></svg>`, 2);
const CU_LUZ = luz(CU.el, '#3fe0aa', 3, 1100), CU_TEL = dEl(CU.el, 'ftel', `<div class="isla"></div><div class="bar"><span class="hora">2:47</span><span>5G ▮▮▮</span></div>
  <div class="cab"><i></i>Mercado<small>EN VIVO</small></div><div class="pr">$ 100,00</div><div class="ch">▲ +12,4 %</div>
  <svg class="gr" width="470" height="260" viewBox="0 0 470 260"><defs><linearGradient id="cuG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fe0aa" stop-opacity=".35"/><stop offset="1" stop-color="#3fe0aa" stop-opacity="0"/></linearGradient></defs>
    ${[60, 120, 180].map(y => `<line x1="0" y1="${y}" x2="470" y2="${y}" stroke="rgba(255,255,255,.06)" stroke-width="2"/>`).join('')}
    <path class="ar" fill="url(#cuG)"/><path class="ln" fill="none" stroke="#3fe0aa" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle class="pt" r="9" fill="#fff"/></svg>
  <div class="toast">${icon('circleCheck', 34, 2.6)}<span>Compra ejecutada</span></div>
  <div class="bt">COMPRAR</div><div class="bt2">Vender</div>`, 5);
const CU_PR = CU_TEL.querySelector('.pr'), CU_CH = CU_TEL.querySelector('.ch'), CU_LN = CU_TEL.querySelector('.ln'), CU_AR = CU_TEL.querySelector('.ar'), CU_PT = CU_TEL.querySelector('.pt');
const CU_BT = CU_TEL.querySelector('.bt'), CU_TO = CU_TEL.querySelector('.toast');
const CU_DEDO = dEl(CU.el, '', dDedo(150), 7), CU_GATO = dEl(CU.el, '', dGato(300), 6), CU_GPU = [...CU_GATO.querySelectorAll('.pup')];
const CU_X = dEl(CU.el, '', dSello('NO ES MALA SUERTE'), 8);
const CU_TAG = dEl(CU.el, 'ftag', '<div class="hd"><b>HOLA</b><small>ME LLAMO</small></div><div class="nm">???</div>', 8);
const CU_VIN = vineta(CU.el, .7, 9);
/* precio del telefono: sube hasta que tocas COMPRAR y se da vuelta justo despues */
const CU_P = norm([[0, { p: 100 }], [T0.com, { p: 112.4 }, E.io3], [T0.pre, { p: 112.8 }, E.lin], [T0.cae + .2, { p: 104.6 }, E.in3], [T0.sue, { p: 101.2 }, E.out3]]);
const CU_CAM = [[0, { s: .96, fx: 560, fy: 1000 }], [T0.com - .2, { s: 1.12, fx: 540, fy: 1040 }, E.io3], [T0.cae + .1, { s: 1.16, fx: 540, fy: 1000 }, E.lin],
  [T0.no + .05, { s: 1.0, fx: 640, fy: 1120 }, E.io3], [T0.tie - .05, { s: 1.04, fx: 560, fy: 1060 }, E.io3]];
sfx(.05, 'swell', { vol: .5 }); sfx(T0.com - .02, 'click', { vol: .9 }); sfx(T0.com + .06, 'nota', { vol: .5 }); sfx(T0.emp, 'descarte', { vol: .6 }); sfx(T0.cae + .02, 'fallo', { vol: .6 });
sfx(T0.no - .05, 'aire', { vol: .5 }); sfx(T0.sue, 'golpe', { vol: .8 }); sfx(T0.tie - .02, 'golpe-grave', { vol: .7 }); sfx(XC(0) - .25, 'transicion', { vol: .5 });
function curvaTel(t) {                                                 // puntos del grafico del telefono (ultimo = precio actual)
  const pts = [], n = 36, pAct = KF(t, CU_P).p;
  for (let i = 0; i <= n; i++) { const u = i / n, x = u * 440 + 15;
    const base = i < n ? 96 + (pAct - 96) * Math.pow(u, 1.8) + 2.2 * Math.sin(i * 1.7) + 1.4 * Math.sin(i * 3.1) : pAct;
    pts.push([x, 220 - (base - 94) * 9.5]); }
  return pts;
}
function pintarCuarto(t) {
  if (t >= XC(0) + .4) { off(CU.el); return; }
  const tp = deADos(t);
  let c = camaraEn(t, CU_CAM, { desenfoque: 3 }), o = P(t, 0, .3, E.out3), b = c.b;
  if (t > XC(0) - .35) { const z = atravesar(t, XC(0), CX, 960, .7, 4, c.fx, c.fy, c.s).a; c = { ...c, s: z.s, fx: z.fx, fy: z.fy }; o = z.o; b += z.b; }
  const [sx, sy] = sacudones(t, [[T0.cae, 10, .4], [T0.tie, 14, .35]]);
  if (!CU.ver({ s: c.s, fx: c.fx - sx / c.s, fy: c.fy - sy / c.s, o, b })) return;
  put(CU_FON, { x: 540, y: 960 });
  const p = KF(t, CU_P).p, cae = t >= T0.emp - .05;
  const pts = curvaTel(t), d = 'M' + pts.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L'), col = cae ? '#ff4d6a' : '#3fe0aa';
  CU_LN.setAttribute('d', d); CU_LN.setAttribute('stroke', col); CU_AR.setAttribute('d', d + ' L455 260 L15 260 Z'); CU_AR.style.opacity = cae ? .25 : 1;
  CU_PT.setAttribute('cx', pts[pts.length - 1][0]); CU_PT.setAttribute('cy', pts[pts.length - 1][1]);
  const pr = '$ ' + p.toFixed(2).replace('.', ','); if (CU_PR._p !== pr) { CU_PR._p = pr; CU_PR.textContent = pr; }
  const ch = cae ? `▼ ${((p / 112.8 - 1) * 100).toFixed(1).replace('.', ',')} %` : `▲ +${((p / 100 - 1) * 100).toFixed(1).replace('.', ',')} %`;
  if (CU_CH._c !== ch) { CU_CH._c = ch; CU_CH.textContent = ch; CU_CH.style.color = cae ? '#ff6b83' : '#3fe0aa'; }
  const pul = bump(t, T0.com - .04, .22); CU_BT.style.transform = `scale(${(1 - .06 * pul).toFixed(3)})`; CU_BT.style.filter = pul > .01 ? `brightness(${(1 + .4 * pul).toFixed(2)})` : '';
  const to = P(t, T0.com + .05, .25, E.out3) * (1 - P(t, T0.emp, .2, E.in2)); CU_TO.style.opacity = to.toFixed(3);
  const vib = cae && t < T0.cae + .6 ? Math.sin(t * 70) * 6 * (1 - P(t, T0.cae, .6, E.lin)) : 0;
  put(CU_TEL, { x: TEL0[0] + vib, y: TEL0[1], r: -4 + vib * .2 });
  put(CU_LUZ, { x: TEL0[0], y: TEL0[1], s: 1, o: .55 }); CU_LUZ.style.background = `radial-gradient(closest-side, ${cae ? '#ff4d6a' : '#3fe0aa'}, transparent)`;
  // el dedo toca COMPRAR
  const kd = P(t, T0.com - .35, .3, E.out3) * (1 - P(t, T0.com + .15, .35, E.in2));
  if (kd > .01) put(CU_DEDO, { x: 560, y: lerp(1900, 1620, kd), ay: 92, r: -8, o: 1 }); else off(CU_DEDO);
  // el gato negro: ¿mala suerte? no
  const kg = P(t, T0.no - .15, .35, E.back) * (1 - P(t, T0.tie - .2, .3, E.in2));
  if (kg > .01) { put(CU_GATO, { x: 905, y: lerp(1480, 1270, kg), o: clamp(kg * 2) }); CU_GPU.forEach(pp => pp.setAttribute('rx', (6 - 3 * bump(t, T0.mala, .5)).toFixed(1))); } else off(CU_GATO);
  ap(CU_X, t, T0.sue - .05, T0.tie - .05, { x: 790, y: 1050, s0: 2.2, dy: 0, d: .25, e: E.out3 });
  // la etiqueta del nombre cae sobre la escena
  const kt = P(t, T0.tie - .12, .3, E.in3);
  if (kt > .01) put(CU_TAG, { x: CX, y: 960, s: lerp(2.2, 1, kt) * (1 + .04 * bump(t, T0.tie + .18, .25)), r: lerp(-14, -5, kt) + 2 * Math.sin(t * 2), o: clamp(kt * 3) }); else off(CU_TAG);
  put(CU_VIN, { x: CX, y: CY });
  void tp;
}
PINTAR.push(pintarCuarto);

/* =====================================================================
   1 · FOMO (f1): la etiqueta dice FOMO; el bicho tiembla de miedo; el telefono sube y llueven avisos; mapa desde
   arriba: la ciudad corre hacia el mismo edificio y tu moneda corre con ellos, sin plan.
   ===================================================================== */
const T1 = { llama: tw(1, 'llama'), fomo: tw(1, 'fomo'), mie: tw(1, 'miedo'), que: tw(1, 'quedarte'), fue: tw(1, 'fuera'), ves: tw(1, 'ves'), sube: tw(1, 'sube'),
  todos: tw(1, 'todos'), dicen: tw(1, 'dicen'), gan: tw(1, 'ganando'), ent: tw(1, 'entras'), cor: tw(1, 'corriendo'), sin: tw(1, 'sin'), plan: tw(1, 'plan') };
const FO = new Plano(5);
const FO_FON = dEl(FO.el, '', `<div style="width:1080px;height:1920px;background:radial-gradient(ellipse 80% 60% at 50% 46%,#3a1670,#170830 60%,#08030f)"></div>`, 2);
const FO_BOK = new Bokeh(FO.el, { colores: ['#b07cff', '#ff8aa0', '#ffffff'], z: 3, semilla: 31, n: 22 });
const FO_TAG = dEl(FO.el, 'ftag', '<div class="hd"><b>HOLA</b><small>ME LLAMO</small></div><div class="nm"></div>', 6), FO_NM = FO_TAG.querySelector('.nm');
const FO_BICHO = dEl(FO.el, '', dFomo(330), 7), FO_BBI = FO_BICHO.querySelector('.bI'), FO_BBD = FO_BICHO.querySelector('.bD');
const FO_GOT = [0, 1, 2].map(() => dEl(FO.el, '', dGota(34), 8));
const FO_TEL = dEl(FO.el, 'ftel', `<div class="isla"></div><div class="bar"><span>2:48</span><span>5G ▮▮▮</span></div>
  <div class="cab"><i></i>Mercado<small>EN VIVO</small></div><div class="pr">$ 140,20</div><div class="ch">▲ +40,2 %</div>
  <svg class="gr" width="470" height="260" viewBox="0 0 470 260"><path class="ln" d="M15 230 L60 222 L100 226 L140 210 L180 214 L220 190 L260 170 L300 176 L340 130 L380 96 L420 60 L455 22" fill="none" stroke="#3fe0aa" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
  <div class="bt">COMPRAR</div><div class="bt2">Vender</div>`, 5), FO_TLN = FO_TEL.querySelector('.ln');
const NOTIS = [['Grupo Trading', '¡Ya vamos en +40 %!', '#2c6bed', 'users'], ['Juan', '¿Todavía no entras?', '#22a35f', 'messageSquare'], ['Ana', '¡Me hice el mes en un día!', '#e0559a', 'messageSquare']];
const FO_NOT = NOTIS.map(([a, b, c, ic]) => dEl(FO.el, 'fnot', `<div class="ic" style="background:${c}">${icon(ic, 34, 2.4)}</div><div><b>${a}</b><span>${b}</span></div>`, 7));
/* la ciudad vista desde arriba (canvas): cuadras, calles y gente que corre al mismo edificio */
const CI = { cv: mk('canvas', 'L z4', FO.el), base: document.createElement('canvas') };
CI.cv.width = W; CI.cv.height = H; CI.base.width = 2200; CI.base.height = 2800; CI.x = CI.cv.getContext('2d');
const CI_PASO = 180, CI_CALLE = 46, CI_META = [0, -360];
(() => {
  const c = CI.base.getContext('2d'), M = [1100, 1400], r = rng(41);
  c.fillStyle = '#0b0d18'; c.fillRect(0, 0, 2200, 2800);
  c.fillStyle = '#161a2c';
  for (let gx = -6; gx <= 6; gx++) for (let gy = -8; gy <= 8; gy++) {
    const x = M[0] + gx * CI_PASO + CI_CALLE / 2, y = M[1] + gy * CI_PASO + CI_CALLE / 2, w = CI_PASO - CI_CALLE;
    c.fillStyle = r() < .2 ? '#14261e' : '#1a1f36'; c.fillRect(x, y, w, w);
    if (r() < .85) { c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(x + 12, y + 12, w - 24, w - 24); }
    for (let k = 0; k < 6; k++) if (r() < .5) { c.fillStyle = r() < .5 ? 'rgba(255,214,120,.55)' : 'rgba(160,190,255,.45)'; c.fillRect(x + 16 + r() * (w - 40), y + 16 + r() * (w - 40), 8, 8); }
  }
  c.strokeStyle = 'rgba(255,255,255,.06)'; c.lineWidth = 2; c.setLineDash([14, 14]);
  for (let gx = -6; gx <= 7; gx++) { const x = M[0] + gx * CI_PASO; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 2800); c.stroke(); }
  for (let gy = -8; gy <= 9; gy++) { const y = M[1] + gy * CI_PASO; c.beginPath(); c.moveTo(0, y); c.lineTo(2200, y); c.stroke(); }
  c.setLineDash([]);
  const [mx, my] = [M[0] + CI_META[0] + CI_CALLE / 2, M[1] + CI_META[1] + CI_CALLE / 2];
  c.fillStyle = '#2a2410'; c.fillRect(mx - CI_PASO, my - CI_PASO, CI_PASO * 2 - CI_CALLE, CI_PASO * 2 - CI_CALLE);
})();
const CI_GENTE = Array.from({ length: 260 }, (_, i) => {
  const h = k => hashC(i + 1, k), fila = Math.round((h(1) - .5) * 14), col = Math.round((h(2) - .5) * 10);
  const vertical = h(3) < .35, sx = vertical ? (Math.round((h(4) - .5) * 8)) * CI_PASO + (h(5) - .5) * 14 : col * CI_PASO, sy = vertical ? fila * CI_PASO : fila * CI_PASO + (h(6) - .5) * 14;
  return { sx, sy, v: 150 + h(7) * 160, d: h(8) * 1.6, c: h(9) < .12 ? '255,214,120' : h(10) < .5 ? '220,230,255' : '255,180,200' };
});
const CI_TU = dEl(FO.el, 'tuTag', 'TÚ', 8), CI_SP = dEl(FO.el, 'cchip r', `${icon('x', 30, 3)}<span>SIN PLAN</span>`, 8), CI_META_CH = dEl(FO.el, 'cchip v', `${icon('trendingUp', 30, 2.6)}<span>+40 %</span>`, 7);
function posGente(g, u) {                                               // recorrido en L por las calles hasta la meta
  const [tx, ty] = CI_META, d1 = Math.abs(tx - g.sx), d2 = Math.abs(ty - g.sy), dist = g.v * u;
  if (dist < d1) return [g.sx + Math.sign(tx - g.sx) * dist, g.sy];
  if (dist < d1 + d2) return [tx, g.sy + Math.sign(ty - g.sy) * (dist - d1)];
  return null;
}
const FO_CAM = [[XC(0) - .3, { s: 1, fx: CX, fy: 960 }], [T1.ves - .2, { s: 1.04, fx: CX, fy: 980 }, E.lin], [T1.ves + .35, { s: 1, fx: CX, fy: 1000 }, E.io3]];
sfx(T1.fomo - .05, 'golpe', { vol: .7 }); sfx(T1.mie, 'glitch', { vol: .35 }); sfx(T1.ves - .1, 'barrido', { vol: .55 }); sfx(T1.sube, 'subida', { vol: .4 });
NOTIS.forEach((_, i) => sfx([T1.todos, T1.dicen + .1, T1.gan][i], 'notificacion', { vol: .55 }));
sfx(T1.ent - .15, 'transicion', { vol: .55 }); sfx(T1.cor, 'barrido', { vol: .4 }); sfx(T1.sin, 'descarte', { vol: .6 }); sfx(XC(1) - .25, 'barrido', { vol: .5 });
function pintarFomo(t) {
  if (t < XC(0) - .35 || t >= XC(1) + .35) { off(FO.el); return; }
  const tp = deADos(t), z = atravesar(t, XC(0), CX, 960, .7);
  const c = camaraEn(t, FO_CAM, { desenfoque: 3 }), ent = t < XC(0) + .35;
  const s = c.s * (ent ? z.b.s : 1), o = ent ? z.b.o : 1;
  const sal = barrido(t, XC(1)), dxs = t > XC(1) - .3 ? sal.a.dx / s : 0;
  if (!FO.ver({ s, fx: c.fx - dxs, fy: c.fy, o, b: (ent ? z.b.b : 0) + (t > XC(1) - .3 ? sal.a.b : 0) })) return;
  put(FO_FON, { x: CX, y: CY }); FO_BOK.pintar(t, .8);
  const mapa = t >= T1.ent - .15;                                        // al final: la ciudad desde arriba
  // a) la etiqueta FOMO y el bicho
  const kA = 1 - P(t, T1.ves - .25, .35, E.in2);
  if (kA > .01 && !mapa) {
    const nm = t >= T1.fomo - .05 ? 'FOMO' : ''; if (FO_NM._n !== nm) { FO_NM._n = nm; FO_NM.textContent = nm; }
    put(FO_TAG, { x: CX, y: lerp(820, 700, P(t, T1.mie - .2, .4, E.io3)) - 400 * (1 - kA), s: (1 + .08 * bump(t, T1.fomo - .05, .3)) * lerp(1, .82, P(t, T1.mie - .2, .4, E.io3)), r: -5 + 2 * Math.sin(t * 2), o: kA });
    const kb = P(t, T1.mie - .2, .4, E.back), tiembla = t > T1.mie ? Math.sin(t * 55) * 5 : 0;
    if (kb > .01) { put(FO_BICHO, { x: CX + tiembla, y: lerp(1500, 1230, kb) + 300 * (1 - kA), s: kb * (1 + .1 * P(t, T1.que, .6, E.out3)), o: clamp(kb * 2) * kA });
      cara(FO_BICHO, tp, t >= T1.fue - .1 ? { boca: 'grito', ceno: -.9, mira: [1, -.4] } : { boca: 'o', ceno: -.7, mira: [-.3, -1] });
      const br = 10 * Math.sin(t * 30); FO_BBI.setAttribute('transform', `rotate(${br.toFixed(1)} -118 30)`); FO_BBD.setAttribute('transform', `rotate(${(-br).toFixed(1)} 118 30)`); } else off(FO_BICHO);
    FO_GOT.forEach((g, i) => { const k = ((t - T1.mie - i * .3) % 1) / 1; if (t > T1.mie && k < .8 && kb > .5) put(g, { x: CX + (i - 1) * 120, y: 1100 + 140 * k * k, o: (1 - k / .8) * kA }); else off(g); });
  } else ocultar(FO_TAG, FO_BICHO, FO_GOT);
  // b) el telefono sube y llueven los avisos
  const kB = P(t, T1.ves - .2, .45, E.out3) * (1 - P(t, T1.ent - .2, .25, E.in2));
  if (kB > .01 && !mapa) {
    FO_TLN.setAttribute('stroke-dashoffset', (1 - P(t, T1.ves, T1.sube + .3 - T1.ves, E.io3)).toFixed(3));
    put(FO_TEL, { x: CX, y: lerp(1500, 1080, kB), r: lerp(8, -3, kB), o: clamp(kB * 2) });
    FO_NOT.forEach((n, i) => { const t0 = [T1.todos, T1.dicen + .1, T1.gan][i] - .08, k = P(t, t0, .35, E.back), baja = [0, 1, 2].filter(j => j > i && t >= [T1.todos, T1.dicen + .1, T1.gan][j] - .08).length;
      if (k > .01) put(n, { x: CX, y: 640 + 128 * baja + (1 - k) * -40, s: lerp(.8, 1, k), o: clamp(k * 2) * kB }); else off(n); });
  } else ocultar(FO_TEL, FO_NOT);
  // c) la ciudad desde arriba
  if (mapa) {
    const k = P(t, T1.ent - .15, .4, E.out3), cs = lerp(1.25, .78, P(t, T1.ent - .15, 1.6, E.io3)), rot = lerp(-10, -4, P(t, T1.ent, 1.5, E.lin));
    const x = CI.x, u0 = t - (T1.ent - .15);
    x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = '#05060c'; x.fillRect(0, 0, W, H);
    x.setTransform(1, 0, 0, 1, CX, 1020); x.rotate(rot * Math.PI / 180); x.scale(cs, cs); x.translate(0, 120);
    x.drawImage(CI.base, -1100, -1400);
    x.globalCompositeOperation = 'lighter';
    const gm = x.createRadialGradient(CI_META[0], CI_META[1], 0, CI_META[0], CI_META[1], 380); gm.addColorStop(0, 'rgba(255,214,120,.5)'); gm.addColorStop(1, 'rgba(255,214,120,0)');
    x.fillStyle = gm; x.fillRect(CI_META[0] - 380, CI_META[1] - 380, 760, 760);
    for (const g of CI_GENTE) { const p = posGente(g, Math.max(0, u0 * 1.3 + g.d)); if (!p) continue;
      x.fillStyle = `rgba(${g.c},.9)`; x.beginPath(); x.arc(p[0], p[1], 5.5, 0, 6.283); x.fill(); }
    x.globalCompositeOperation = 'source-over';
    // tu moneda corre por la calle hacia la meta
    const tu = posGente({ sx: -2 * CI_PASO, sy: 3 * CI_PASO, v: 300 }, Math.max(0, u0)) || CI_META;
    x.fillStyle = '#f4c430'; x.strokeStyle = '#fff6c2'; x.lineWidth = 4; x.beginPath(); x.arc(tu[0], tu[1], 15, 0, 6.283); x.fill(); x.stroke();
    x.setTransform(1, 0, 0, 1, 0, 0);
    const v = x.createRadialGradient(CX, 1000, 300, CX, 1000, 1150); v.addColorStop(0, 'rgba(0,0,8,0)'); v.addColorStop(1, 'rgba(0,0,8,.8)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
    put(CI.cv, { x: CX, y: CY, o: k });
    const aP = ([wx, wy]) => { const a = rot * Math.PI / 180, X = wx * cs, Y = (wy + 120) * cs; return [CX + X * Math.cos(a) - Y * Math.sin(a), 1020 + X * Math.sin(a) + Y * Math.cos(a)]; };
    const [tx, ty] = aP(tu), [mx, my] = aP(CI_META);
    put(CI_TU, { x: tx, y: ty - 60, s: .8, o: k });
    ap(CI_SP, t, T1.sin - .05, null, { x: tx + 10, y: ty + 76, s0: .5, dy: 10 });
    put(CI_META_CH, { x: mx, y: my - 90, o: k });
  } else ocultar(CI.cv, CI_TU, CI_SP, CI_META_CH);
}
PINTAR.push(pintarFomo);

/* =====================================================================
   2 · EL COHETE (f2): el grafico sube; abajo nadie hablaba, arriba todos hablan; tu moneda se sube arriba y cae
   ===================================================================== */
const T2 = { pero: tw(2, 'pero'), sub: tw(2, 'subida'), boca: tw(2, 'boca'), todos: tw(2, 'todos'), muc: tw(2, 'muchas'), mej: tw(2, 'mejor'), pas: tw(2, 'paso') };
const CO = new Plano(5);
const CO_FON = dEl(CO.el, '', `<svg width="1080" height="2600" viewBox="0 -680 1080 2600" style="display:block">
  <defs>${dGrad('coP', [[0, '#02030a'], [.5, '#0a1030'], [1, '#141c46']])}</defs><rect y="-680" width="1080" height="2600" fill="url(#coP)"/>
  ${Array.from({ length: 120 }, (_, i) => `<circle cx="${(hashC(i, 21) * 1080).toFixed(0)}" cy="${(-660 + hashC(i, 22) * 2400).toFixed(0)}" r="${(1 + hashC(i, 23) * 2).toFixed(1)}" fill="#fff" opacity="${(.15 + hashC(i, 24) * .5).toFixed(2)}"/>`).join('')}
  ${Array.from({ length: 13 }, (_, i) => `<line x1="${60 + i * 80}" y1="-600" x2="${60 + i * 80}" y2="1700" stroke="rgba(130,160,230,.06)" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 29 }, (_, i) => `<line x1="0" y1="${-600 + i * 80}" x2="1080" y2="${-600 + i * 80}" stroke="rgba(130,160,230,.06)" stroke-width="2"/>`).join('')}</svg>`, 2);
const CO_LN = dEl(CO.el, '', `<svg width="1080" height="2600" viewBox="0 -680 1080 2600" style="display:block;overflow:visible"><path class="gl" fill="none" stroke="#3fe0aa" stroke-width="24" stroke-linejoin="round" opacity=".3" style="filter:blur(8px)"/>
  <path class="ln" fill="none" stroke="#3fe0aa" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><path class="rj" fill="none" stroke="#ff4d6a" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>`, 4);
const CO_GL = CO_LN.querySelector('.gl'), CO_L = CO_LN.querySelector('.ln'), CO_RJ = CO_LN.querySelector('.rj');
const CO_COH = dEl(CO.el, '', dCohete(190), 6), CO_FUE = CO_COH.querySelector('.fuego');
const CO_MON = dEl(CO.el, '', dMoneda(110), 7);
const CO_NADIE = dEl(CO.el, 'cchip', `${icon('clock', 30, 2.4)}<span>AQUÍ NADIE HABLABA</span>`, 7), CO_TODOS = dEl(CO.el, 'cchip o', `${icon('users', 30, 2.4)}<span>AQUÍ TODOS HABLAN</span>`, 7);
const BURS = ['¡+40 %!', '¡Compra ya!', '¡Todos adentro!', '¡No te lo pierdas!'], CO_BUR = BURS.map(b => dEl(CO.el, 'fbur', b, 8));
const CO_HUMO = [0, 1, 2, 3, 4].map(() => dEl(CO.el, '', '<div style="width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,rgba(200,205,220,.85),rgba(200,205,220,0) 70%)"></div>', 5));
/* la curva: sube suave, despues empinada hasta la cima; al final se da vuelta */
const CO_PTS = Array.from({ length: 40 }, (_, i) => { const u = i / 39; return [80 + u * 820, 1500 - 140 * u - 760 * Math.pow(u, 3.2) + 14 * Math.sin(i * 1.9)]; });
const CO_CIMA = CO_PTS[39];
const CO_K = norm([[XC(1) - .3, { k: .1 }], [T2.sub, { k: .45 }, E.io3], [T2.todos + .1, { k: 1 }, E.io3]]);
const CO_CAM = [[XC(1) - .3, { s: 1, fx: 540, fy: 1250 }], [T2.todos + .1, { s: 1.05, fx: 620, fy: 860 }, E.io3], [T2.pas + .3, { s: 1.08, fx: 650, fy: 840 }, E.io3]];
sfx(XC(1) - .1, 'swell', { vol: .45 }); sfx(T2.sub, 'tick', { vol: .4 }); BURS.forEach((_, i) => sfx(T2.boca - .05 + i * .14, 'pop', { vol: .4 }));
sfx(T2.muc, 'pop', { vol: .5 }); sfx(T2.mej, 'glitch', { vol: .4 }); sfx(T2.pas - .05, 'golpe-grave', { vol: .7 }); sfx(T2.pas + .05, 'fallo', { vol: .5 }); sfx(XC(2) - .3, 'transicion', { vol: .5 });
function pintarCohete(t) {
  if (t < XC(1) - .3 || t >= XC(2) + .35) { off(CO.el); return; }
  const tp = deADos(t), en = barrido(t, XC(1)), c = camaraEn(t, CO_CAM, { desenfoque: 3 });
  let s = c.s, fx = c.fx + (t < XC(1) + .3 ? -en.b.dx / s : 0), fy = c.fy, o = 1, b = c.b + (t < XC(1) + .3 ? en.b.b : 0);
  if (t > XC(2) - .35) { const z = atravesar(t, XC(2), 540, 900, .7, 4, fx, fy, s).a; s = z.s; fx = z.fx; fy = z.fy; o = z.o; b += z.b; }
  const [sx, sy] = sacudones(t, [[T2.pas, 16, .4]]);
  if (!CO.ver({ s, fx: fx - sx / s, fy: fy - sy / s, o, b })) return;
  put(CO_FON, { x: 540, y: 620 });
  const k = KF(t, CO_K).k, n = Math.max(2, Math.round(k * 39) + 1), pts = CO_PTS.slice(0, n);
  const cae = P(t, T2.pas - .15, .6, E.in2), caida = [[CO_CIMA[0], CO_CIMA[1]], [CO_CIMA[0] + 40 * cae, CO_CIMA[1] + 90 * cae], [CO_CIMA[0] + 70 * cae, CO_CIMA[1] + 300 * cae]];
  const d = 'M' + pts.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L');
  CO_GL.setAttribute('d', d); CO_L.setAttribute('d', d); CO_RJ.setAttribute('d', cae > 0 ? 'M' + caida.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L') : '');
  put(CO_LN, { x: 540, y: 620 });
  // el cohete en la punta (o cayendo)
  const tip = cae > 0 ? caida[2] : pts[pts.length - 1], prev = pts[Math.max(0, pts.length - 3)];
  const ang = cae > 0 ? lerp(30, 160, cae) : Math.atan2(tip[1] - prev[1], tip[0] - prev[0]) * 180 / Math.PI + 90;
  put(CO_COH, { x: tip[0], y: tip[1], r: ang, s: 1 });
  CO_FUE.setAttribute('ry', (cae > 0 ? 10 : 64 + 14 * Math.sin(t * 40)).toFixed(1));
  cara(CO_COH, tp, cae > 0 ? { boca: 'triste', ceno: -.8, cierre: .3 } : t >= T2.boca ? { boca: 'euforia', mira: [.4, -.6] } : { boca: 'feliz', mira: [.6, -.8] });
  // tu moneda se sube arriba
  const km = P(t, T2.muc - .1, .45, E.io3);
  if (km > 0) { const mx = lerp(300, tip[0] - 30, km), my = lerp(1500, tip[1] - 70, km) - Math.sin(Math.PI * km) * 260;
    put(CO_MON, { x: mx, y: my + (cae > 0 ? 0 : 0), r: cae * 200, o: 1 }); cara(CO_MON, tp, cae > 0 ? { boca: 'grito', ceno: -.8 } : { boca: 'euforia', mira: [.5, -.5] }); } else off(CO_MON);
  ap(CO_NADIE, t, T2.sub - .05, null, { x: 330, y: 1580, s0: .6, dy: 14 });
  ap(CO_TODOS, t, T2.todos - .05, null, { x: 560, y: 520, s0: .6, dy: 14 });
  CO_BUR.forEach((bb, i) => { const pos = [[260, 700], [800, 610], [330, 860], [840, 980]][i];
    ap(bb, t, T2.boca - .08 + i * .14, T2.pas + .2, { x: pos[0], y: pos[1], s0: .3, dy: 20, r: (i % 2 ? 4 : -4) }); });
  CO_HUMO.forEach((h, i) => { const kk = P(t, T2.mej + i * .12, .6, E.out2); if (kk > 0 && kk < 1) put(h, { x: tip[0] - 20 + i * 14, y: tip[1] + 60 - 120 * kk, s: .5 + 1.6 * kk, o: (1 - kk) * .9 }); else off(h); });
}
PINTAR.push(pintarCohete);

/* =====================================================================
   3 · EL DATO (f3): el estudio con usuarios de Robinhood (The Journal of Finance, 2022): las acciones mas compradas
   de cada dia rindieron -4,7 % frente a lo normal en las 20 jornadas siguientes (Barber, Huang, Odean y Schwarz).
   ===================================================================== */
const T3 = { est: tw(3, 'estudio'), usu: tw(3, 'usuarios'), rob: tw(3, 'robinhood'), mid: tw(3, 'midio'), acc: tw(3, 'acciones'), comp: tw(3, 'compradas'), dia: tw(3, 'dia'),
  rin: tw(3, 'rindieron'), casi: tw(3, 'casi'), cin: tw(3, '5'), men: tw(3, 'menos'), nor: tw(3, 'normal'), cua: tw(3, 'cuatro'), sem: tw(3, 'semanas'), sig: tw(3, 'siguientes') };
const ES = new Plano(5);
const ES_FON = dEl(ES.el, '', `<div style="width:1080px;height:1920px;background:radial-gradient(ellipse 80% 55% at 50% 45%,#162036,#0a0e1a 60%,#05070d)"></div>`, 2);
const ES_PAP = dEl(ES.el, 'fpap', `<div class="rh"><img alt="" src="assets/logos/robinhood.svg"></div><small>THE JOURNAL OF FINANCE · 2022</small>
  <h4>Attention-Induced Trading and Returns: Evidence from Robinhood Users</h4><p>Barber, Huang, Odean y Schwarz</p>`, 6), ES_RH = ES_PAP.querySelector('.rh');
const ES_USU = dEl(ES.el, '', `<svg width="900" height="300" viewBox="0 0 900 300" style="display:block">${Array.from({ length: 36 }, (_, i) => { const x = 50 + (i % 12) * 73, y = 50 + Math.floor(i / 12) * 95;
  return `<g class="u" opacity="0" transform="translate(${x} ${y})"><circle r="30" fill="#2a3350"/><circle cy="-6" r="11" fill="#9aa6c4"/><path d="M-18 20 Q0 2 18 20" fill="#9aa6c4"/></g>`; }).join('')}</svg>`, 5);
const ES_USUS = [...ES_USU.querySelectorAll('.u')];
const ES_LB = dEl(ES.el, 'flb', `<h5>${icon('zap', 40, 2.4)}LAS MÁS COMPRADAS HOY</h5>${[100, 86, 74, 62, 55].map((w2, i) => `<div class="fi"><b>#${i + 1}</b><i style="width:${w2 * 5}px"></i><span>▲</span></div>`).join('')}`, 6);
const ES_FIS = [...ES_LB.querySelectorAll('.fi')];
const ES_NUM = dEl(ES.el, 'fnum', '0,0 %', 6), ES_NUMT = dEl(ES.el, 'fnumt', 'frente a lo <b>normal</b>, en promedio', 6);
const ES_GR = dEl(ES.el, '', `<svg width="760" height="300" viewBox="0 0 760 300" style="display:block;overflow:visible">
  <line x1="20" y1="40" x2="20" y2="270" stroke="rgba(255,255,255,.15)" stroke-width="3"/><line x1="20" y1="270" x2="740" y2="270" stroke="rgba(255,255,255,.15)" stroke-width="3"/>
  <path class="n" d="M20 150 L200 146 L380 140 L560 136 L740 132" fill="none" stroke="#9aa6c4" stroke-width="7" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1" stroke-linecap="round"/>
  <path class="r" d="M20 150 L200 170 L380 196 L560 214 L740 236" fill="none" stroke="#ff4d6a" stroke-width="8" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1" stroke-linecap="round"/>
  <text class="tn" x="748" y="128" fill="#9aa6c4" opacity="0" style="font:700 24px Outfit">NORMAL</text><text class="tr" x="748" y="250" fill="#ff6b83" opacity="0" style="font:700 24px Outfit">MÁS COMPRADAS</text></svg>`, 6);
const ES_GN = ES_GR.querySelector('.n'), ES_GRR = ES_GR.querySelector('.r'), ES_TN = ES_GR.querySelector('.tn'), ES_TR = ES_GR.querySelector('.tr');
const ES_CAL = dEl(ES.el, 'fcal', Array.from({ length: 20 }, () => '<i></i>').join(''), 6), ES_CALS = [...ES_CAL.querySelectorAll('i')];
const ES_CALT = dEl(ES.el, 'fcalt', '4 SEMANAS · 20 DÍAS DE BOLSA', 6);
const ES_SRC = dEl(ES.el, 'cfuente', 'Barber, Huang, Odean y Schwarz · The Journal of Finance (2022)', 7);
sfx(T3.est - .05, 'aire', { vol: .5 }); sfx(T3.usu, 'tick-suave', { vol: .5 }); sfx(T3.rob, 'pop', { vol: .6 }); sfx(T3.acc - .1, 'barrido', { vol: .5 });
[0, 1, 2, 3, 4].forEach(i => sfx(T3.acc + i * .12, 'tick', { vol: .35 })); sfx(T3.rin - .05, 'transicion', { vol: .45 }); sfx(T3.cin + .1, 'golpe', { vol: .85 }); sfx(T3.cua, 'tick-suave', { vol: .4 });
function pintarDato(t) {
  if (t < XC(2) - .35 || t >= XC(3) + .3) { off(ES.el); return; }
  const z = atravesar(t, XC(2), 0, 0, .7), ent = t < XC(2) + .35, sal = barrido(t, XC(3));
  const s = ent ? z.b.s : 1, fx = CX - (t > XC(3) - .3 ? sal.a.dx / s : 0);
  if (!ES.ver({ s, fx, fy: CY, o: ent ? z.b.o : 1, b: (ent ? z.b.b : 0) + (t > XC(3) - .3 ? sal.a.b : 0) })) return;
  put(ES_FON, { x: CX, y: CY });
  // el paper y los usuarios
  const sube = P(t, T3.acc - .2, .5, E.io3);
  ap(ES_PAP, t, XC(2) + .05, T3.rin + .05, { x: CX, y: lerp(900, 560, sube), s: lerp(1, .78, sube), s0: .8, dy: 50 });
  ES_RH.style.transform = `scale(${(P(t, T3.rob - .05, .3, E.back) * (1 + .12 * bump(t, T3.rob + .25, .3))).toFixed(3)})`;
  const ku = P(t, T3.usu - .1, .5, E.out3) * (1 - P(t, T3.acc - .3, .3, E.in2));
  if (ku > .01) { ES_USUS.forEach((u, i) => u.setAttribute('opacity', clamp(ku * 3 - i * .06).toFixed(3))); put(ES_USU, { x: CX, y: 1330, o: 1 }); } else off(ES_USU);
  // la tabla de las mas compradas
  const klb = ap(ES_LB, t, T3.acc - .15, T3.rin + .05, { x: CX, y: 1120, s0: .85, dy: 40 });
  if (klb > 0) ES_FIS.forEach((f, i) => { const k = P(t, T3.acc + i * .12, .3, E.out3); f.style.opacity = k.toFixed(3); f.style.transform = `translateX(${((1 - k) * -40).toFixed(1)}px)`; });
  // el contador y las dos curvas
  const kn = P(t, T3.rin - .1, T3.cin + .12 - (T3.rin - .1), E.out3), val = -4.7 * kn, txt = (val === 0 ? '0,0' : val.toFixed(1).replace('.', ',')) + ' %';
  if (ES_NUM._t !== txt) { ES_NUM._t = txt; ES_NUM.textContent = txt.replace('-', '−'); }
  const up = P(t, T3.cua - .2, .4, E.io3);
  ap(ES_NUM, t, T3.rin - .12, null, { x: CX, y: lerp(820, 700, up), s0: .7, dy: 0, s: (1 + .08 * bump(t, T3.cin + .1, .35)) * lerp(1, .8, up) });
  ap(ES_NUMT, t, T3.men - .05, null, { x: CX, y: lerp(980, 830, up), s0: .8, dy: 14 });
  const kg = ap(ES_GR, t, T3.men - .1, T3.cua - .05, { x: CX, y: 1210, s0: .9, dy: 30 });
  if (kg > 0) { const dl = P(t, T3.men, T3.nor + .3 - T3.men, E.io3); ES_GN.setAttribute('stroke-dashoffset', (1 - dl).toFixed(3)); ES_GRR.setAttribute('stroke-dashoffset', (1 - dl).toFixed(3));
    ES_TN.setAttribute('opacity', (dl > .95 ? 1 : 0)); ES_TR.setAttribute('opacity', (dl > .95 ? 1 : 0)); }
  // el calendario de 4 semanas
  const kc = ap(ES_CAL, t, T3.cua - .1, null, { x: CX, y: 1170, s0: .85, dy: 30 });
  if (kc > 0) { const n = Math.floor(20 * P(t, T3.cua, T3.sig + .4 - T3.cua, E.lin)); ES_CALS.forEach((c2, i) => { const on = i < n; if (c2._o !== on) { c2._o = on; c2.className = on ? 'on' : ''; } }); }
  ap(ES_CALT, t, T3.sem - .05, null, { x: CX, y: 1400, s0: .8, dy: 14 });
  ap(ES_SRC, t, T3.rin, null, { x: CX, y: 1500, s0: .9, dy: 8 });
}
PINTAR.push(pintarDato);

/* =====================================================================
   4 · EL PLAN (f4): escritorio desde arriba; la libreta con cara y el lapiz dibujan ENTRADA y STOP antes de que el precio
   se mueva, y el stop queda con candado.
   ===================================================================== */
const T4 = { ven: tw(4, 'vencerlo'), dec: tw(4, 'decide'), ent: tw(4, 'entrada'), ant: tw(4, 'antes'), pre: tw(4, 'precio'), mue: tw(4, 'mueva'), stop: tw(4, 'stop'), def: tw(4, 'definido') };
const PL = new Plano(5), HOJA = { x: 540, y: 1030, w: 780, h: 900 };
const PL_FON = dEl(PL.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block"><defs>${dGrad('plM', [[0, '#6b4528'], [1, '#3a2414']], 1, 1)}</defs>
  <rect width="1080" height="1920" fill="url(#plM)"/>${Array.from({ length: 26 }, (_, i) => `<path d="M0 ${40 + i * 74} Q540 ${10 + i * 74 + (i % 3) * 18} 1080 ${50 + i * 74}" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="${3 + (i % 3) * 2}"/>`).join('')}
  <circle cx="930" cy="430" r="96" fill="#e9e4d8"/><circle cx="930" cy="430" r="74" fill="#3a2414"/><circle cx="930" cy="430" r="62" fill="#5a3a20"/><path d="M1026 430 Q1070 430 1060 470" fill="none" stroke="#e9e4d8" stroke-width="18"/>
  <rect x="40" y="1640" width="250" height="150" rx="24" fill="#111" transform="rotate(-12 165 1715)"/></svg>`, 2);
const PL_HOJA = dEl(PL.el, '', `<svg width="${HOJA.w}" height="${HOJA.h + 60}" viewBox="0 -60 ${HOJA.w} ${HOJA.h + 60}" style="display:block;overflow:visible">
  ${dSombra(HOJA.w / 2, HOJA.h + 10, 360, 20, .5)}<rect width="${HOJA.w}" height="${HOJA.h}" rx="20" fill="#fbfaf6"/>
  ${Array.from({ length: 22 }, (_, i) => `<line x1="20" y1="${70 + i * 38}" x2="${HOJA.w - 20}" y2="${70 + i * 38}" stroke="rgba(76,141,255,.18)" stroke-width="2"/>`).join('')}
  <line x1="90" y1="0" x2="90" y2="${HOJA.h}" stroke="rgba(255,77,106,.35)" stroke-width="3"/>
  ${Array.from({ length: 13 }, (_, i) => `<circle cx="${50 + i * 57}" cy="0" r="16" fill="none" stroke="#9aa3b2" stroke-width="7"/>`).join('')}
  <text x="120" y="120" fill="#2a3350" style="font:800 46px Outfit">MI PLAN</text>
  ${dOjos('#fbfaf6', { x: 620, y: 100, e: .75, sep: 34 })}${dBoca(620, 140, .6)}
  <path class="pr" d="M120 520 L180 500 L230 520 L280 470 L330 490 L380 440 L430 460" fill="none" stroke="#2a3350" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
  <path class="pr2" d="M430 460 L480 520 L520 600 L560 580 L610 470 L660 400" fill="none" stroke="#22a35f" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
  <line class="le" x1="110" y1="600" x2="${HOJA.w - 40}" y2="600" stroke="#d9a520" stroke-width="7" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1"/>
  <text class="te" x="${HOJA.w - 40}" y="584" text-anchor="end" fill="#b0830f" opacity="0" style="font:800 30px Outfit">ENTRADA</text>
  <line class="ls" x1="110" y1="700" x2="${HOJA.w - 40}" y2="700" stroke="#ff4d6a" stroke-width="7" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1"/>
  <text class="ts" x="${HOJA.w - 40}" y="684" text-anchor="end" fill="#d6304f" opacity="0" style="font:800 30px Outfit">STOP</text>
  ${['Entrada definida', 'Stop definido'].map((tx, i) => `<g transform="translate(120 ${790 + i * 54})"><rect x="0" y="-26" width="34" height="34" rx="8" fill="none" stroke="#2a3350" stroke-width="4"/>
    <path class="ck${i}" d="M6 -10 L14 0 L30 -20" fill="none" stroke="#22a35f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <text x="54" y="0" fill="#2a3350" style="font:700 30px Outfit">${tx}</text></g>`).join('')}
  <g class="fom" transform="translate(520 300) scale(.35)"><circle r="90" fill="#9b5cff" opacity=".85"/><circle cx="-30" cy="-10" r="18" fill="#fff"/><circle cx="30" cy="-10" r="18" fill="#fff"/></g></svg>`, 4);
const PL_Q = s => PL_HOJA.querySelector(s), PL_LE = PL_Q('.le'), PL_TE = PL_Q('.te'), PL_LS = PL_Q('.ls'), PL_TS = PL_Q('.ts'), PL_PR2 = PL_Q('.pr2'), PL_CK = [PL_Q('.ck0'), PL_Q('.ck1')], PL_FOM = PL_Q('.fom');
const PL_LAP = dEl(PL.el, '', dLapiz(260), 7), PL_CAN = dEl(PL.el, '', `<div style="width:84px;height:84px;border-radius:22px;background:#ff4d6a;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 12px 26px rgba(0,0,0,.45)">${icon('lock', 46, 2.6)}</div>`, 8);
const PL_RELOJ = dEl(PL.el, 'cchip o', `${icon('clock', 32, 2.4)}<span>ANTES</span>`, 8);
const hojaA = (x, y) => [HOJA.x - HOJA.w / 2 + x, HOJA.y - HOJA.h / 2 + y];
const PL_RUTA = norm([[XC(3), { x: 760, y: 440 }], [T4.ven, { x: 520, y: 300 }, E.io3], [T4.ven + .5, { x: 540, y: 320 }, E.lin], [T4.dec, { x: 110, y: 600 }, E.io3], [T4.ent + .35, { x: HOJA.w - 40, y: 600 }, E.io3],
  [T4.ant, { x: 430, y: 470 }, E.io3], [T4.mue + .1, { x: 600, y: 520 }, E.io3], [T4.stop - .25, { x: 110, y: 700 }, E.io3], [T4.stop + .45, { x: HOJA.w - 40, y: 700 }, E.io3], [T4.def + .1, { x: 160, y: 830 }, E.io3]]);
sfx(T4.ven, 'descarte', { vol: .5 }); sfx(T4.dec, 'tecleo', { vol: .3 }); sfx(T4.ent, 'tick', { vol: .6 }); sfx(T4.ant, 'tick-suave', { vol: .5 });
sfx(T4.stop, 'tick', { vol: .6 }); sfx(T4.def, 'click', { vol: .8 }); sfx(T4.def + .1, 'nota-doble', { vol: .55 }); sfx(XC(4) - .25, 'transicion', { vol: .5 });
function pintarPlan(t) {
  if (t < XC(3) - .3 || t >= XC(4) + .35) { off(PL.el); return; }
  const tp = deADos(t), en = barrido(t, XC(3)), sal = atravesar(t, XC(4), 540, 1200, .7, 4, CX, 1000, 1.02);
  let s = 1.02, fx = CX - (t < XC(3) + .3 ? en.b.dx / s : 0), fy = 1000, o = 1, b = t < XC(3) + .3 ? en.b.b : 0;
  if (t > XC(4) - .35) { s = sal.a.s; fx = sal.a.fx; fy = sal.a.fy; o = sal.a.o; b += sal.a.b; }
  if (!PL.ver({ s, fx, fy, o, b })) return;
  put(PL_FON, { x: CX, y: CY }); put(PL_HOJA, { x: HOJA.x, y: HOJA.y - 30 });
  cara(PL_HOJA, tp, t >= T4.def ? { boca: 'euforia', mira: [0, .4] } : t >= T4.dec ? { boca: 'feliz', mira: [-.2, .8] } : { boca: 'seria', mira: [0, .6] });
  // el lapiz borra al bicho del FOMO (para vencerlo) y despues dibuja la entrada y el stop
  const borra = P(t, T4.ven + .05, .5, E.in2); PL_FOM.setAttribute('opacity', (1 - borra).toFixed(3));
  const le = P(t, T4.dec, T4.ent + .35 - T4.dec, E.io3), ls = P(t, T4.stop - .25, .7, E.io3);
  PL_LE.setAttribute('stroke-dashoffset', (1 - le).toFixed(3)); PL_TE.setAttribute('opacity', le > .9 ? 1 : 0);
  PL_LS.setAttribute('stroke-dashoffset', (1 - ls).toFixed(3)); PL_TS.setAttribute('opacity', ls > .9 ? 1 : 0);
  PL_PR2.setAttribute('stroke-dashoffset', (1 - P(t, T4.mue - .1, .7, E.io3)).toFixed(3));
  PL_CK.forEach((ck, i) => ck.setAttribute('stroke-dashoffset', (1 - P(t, (i ? T4.def : T4.ent + .4), .3, E.out3)).toFixed(3)));
  const lp = KF(t, PL_RUTA), [lx, ly] = hojaA(lp.x, lp.y - 30), garabato = borra > 0 && borra < 1 ? 14 * Math.sin(t * 40) : 0;
  put(PL_LAP, { x: lx + garabato, y: ly, ax: 50, ay: 100, r: 24 + 6 * Math.sin(t * 6) });
  cara(PL_LAP, tp, t >= T4.def ? { boca: 'euforia', mira: [.5, -.5] } : { boca: 'feliz', mira: [-.4, .6] });
  ap(PL_RELOJ, t, T4.ant - .05, T4.stop - .2, { x: 300, y: 560, s0: .5, dy: 10 });
  const [cx2, cy2] = hojaA(HOJA.w - 140, 700); ap(PL_CAN, t, T4.def - .05, null, { x: cx2, y: cy2 - 30, s0: 2, dy: 0, d: .25, e: E.out3 });
}
PINTAR.push(pintarPlan);

/* =====================================================================
   5 · EL PARADERO (f5): el bus de +40 % se va; tu moneda corre, lo deja ir y llega el siguiente
   ===================================================================== */
const T5 = { y: tw(5, 'y'), pas: tw(5, 'paso'), dej: tw(5, 'dejalo'), ir: tw(5, 'ir'), mer: tw(5, 'mercado'), bus: tw(5, 'bus'), fue: tw(5, 'fue'), uno: tw(5, 'uno'), vie: tw(5, 'viene'), otro: tw(5, 'otro') };
const PA = new Plano(5), PA_PISO = 1420;
const PA_FON = dEl(PA.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block"><defs>${dGrad('paC', [[0, '#05071a'], [.6, '#16205a'], [1, '#2a2a6a']])}</defs>
  <rect width="1080" height="1920" fill="url(#paC)"/>
  ${Array.from({ length: 60 }, (_, i) => `<circle cx="${(hashC(i, 41) * 1080).toFixed(0)}" cy="${(80 + hashC(i, 42) * 700).toFixed(0)}" r="${(1 + hashC(i, 43) * 1.6).toFixed(1)}" fill="#fff" opacity="${(.2 + hashC(i, 44) * .5).toFixed(2)}"/>`).join('')}
  ${[[0, 900, 160, 360], [150, 780, 140, 480], [280, 860, 180, 400], [450, 720, 150, 540], [600, 830, 200, 430], [790, 760, 150, 500], [930, 880, 160, 380]].map(([x, y, w2, h2]) =>
    `<rect x="${x}" y="${y}" width="${w2}" height="${h2}" fill="#0d1230"/>${Array.from({ length: 10 }, (_, k) => `<rect x="${x + 16 + (k % 4) * 34}" y="${y + 24 + Math.floor(k / 4) * 50}" width="16" height="20" fill="${k % 3 ? '#ffd36b' : '#2a3366'}" opacity=".7"/>`).join('')}`).join('')}
  <rect y="1260" width="1080" height="12" fill="#3a3f5a"/><rect y="1272" width="1080" height="160" fill="#1a1d2e"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 130 + 20}" y="1346" width="70" height="10" rx="5" fill="#e9e4d8" opacity=".55"/>`).join('')}
  <rect y="1432" width="1080" height="70" fill="#2c3046"/><rect y="1432" width="1080" height="8" fill="#4a5070"/><rect y="1502" width="1080" height="420" fill="#14172a"/>
  <rect x="160" y="1090" width="14" height="350" fill="#9aa3b2"/><rect x="104" y="1010" width="126" height="126" rx="20" fill="#2c6bed" stroke="#fff" stroke-width="6"/>
  <path d="M132 1050 h70 v40 h-70 z M140 1100 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M178 1100 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0" fill="#fff"/>
  <rect x="96" y="1146" width="142" height="40" rx="8" fill="#0b0f1a"/><text x="167" y="1175" text-anchor="middle" fill="#f4c430" style="font:400 30px 'Bebas Neue';letter-spacing:.1em">PARADA</text>
  <rect x="860" y="980" width="12" height="460" fill="#5b6475"/><path d="M820 980 Q866 940 912 980" fill="#5b6475"/><ellipse cx="866" cy="990" rx="40" ry="12" fill="#fff6c2" style="filter:drop-shadow(0 0 20px #fff6c2)"/></svg>`, 2);
const PA_LUZ = luz(PA.el, '#fff3c2', 3, 700);
const PA_BUS1 = dEl(PA.el, '', dBus(620, { letrero: '+40 %' }), 6), PA_BUS2 = dEl(PA.el, '', dBus(620, { letrero: 'PRÓXIMA', color: ['#7ff7cc', '#22d39a', '#0b875d'] }), 6);
const PA_RU = [...PA_BUS1.querySelectorAll('.rueda'), ...PA_BUS2.querySelectorAll('.rueda')];
const PA_MON = dEl(PA.el, '', dMoneda(120), 7), PA_SUS = dEl(PA.el, '', '<div style="width:70px;height:46px;border-radius:50%;background:radial-gradient(closest-side,rgba(220,230,255,.85),rgba(220,230,255,0))"></div>', 8);
const PA_UNO = dEl(PA.el, 'cchip', `${icon('x', 30, 3)}<span>SE FUE UNO</span>`, 8), PA_OTRO = dEl(PA.el, 'cchip v', `${icon('check', 30, 3)}<span>VIENE OTRO</span>`, 8);
const PA_VIN = vineta(PA.el, .6, 9);
sfx(T5.pas - .1, 'barrido', { vol: .6 }); sfx(T5.dej + .1, 'aire-salida', { vol: .55 }); sfx(T5.uno, 'tick', { vol: .5 }); sfx(T5.vie - .3, 'swell', { vol: .45 }); sfx(T5.otro, 'campana', { vol: .55 });
sfx(XC(5) - .25, 'transicion', { vol: .5 });
function pintarParada(t) {
  if (t < XC(4) - .35 || t >= XC(5) + .35) { off(PA.el); return; }
  const tp = deADos(t), z = atravesar(t, XC(4), 0, 0, .7), ent = t < XC(4) + .35, sal = barrido(t, XC(5));
  const s = ent ? z.b.s : 1, fx = CX - (t > XC(5) - .3 ? sal.a.dx / s : 0);
  if (!PA.ver({ s: s * 1.2 * (1 + .03 * P(t, XC(4), 5, E.lin)), fx, fy: 1170, o: ent ? z.b.o : 1, b: (ent ? z.b.b : 0) + (t > XC(5) - .3 ? sal.a.b : 0) })) return;
  put(PA_FON, { x: CX, y: CY }); put(PA_LUZ, { x: 866, y: 1060, o: .5 });
  // bus 1: parado al principio, arranca con «se te paso» y se va
  const k1 = P(t, T5.pas - .2, 1.6, E.in2), x1 = lerp(560, 1700, k1);
  if (x1 < 1500) put(PA_BUS1, { x: x1, y: PA_PISO - 120, r: k1 > 0 && k1 < .2 ? -1.5 : 0 }); else off(PA_BUS1);
  cara(PA_BUS1, tp, { boca: 'feliz', mira: [1, 0] });
  // bus 2: llega con «viene otro» y se detiene
  const k2 = P(t, T5.vie - .45, .75, E.out3), x2 = lerp(-500, 520, k2);
  if (k2 > 0) put(PA_BUS2, { x: x2, y: PA_PISO - 120, r: k2 > .85 && k2 < 1 ? 1 : 0 }); else off(PA_BUS2);
  cara(PA_BUS2, tp, { boca: 'feliz', mira: [1, .2] });
  PA_RU.forEach((r2, i) => r2.setAttribute('transform', r2.getAttribute('transform').replace(/ rotate\([^)]*\)/, '') + ` rotate(${((i < 2 ? k1 * 1100 : k2 * 1020) * 1.2).toFixed(1)})`));
  // tu moneda: corre detras del bus, se rinde, suspira y sube al siguiente
  const corre = P(t, T5.pas - .05, .7, E.out2), vuelve = P(t, T5.ir, .5, E.io3), sube = P(t, T5.otro + .1, .45, E.io3);
  let xm = lerp(300, 820, corre) - 200 * vuelve, ym = PA_PISO + 40 - Math.abs(Math.sin(corre * Math.PI * 4)) * 50 * (1 - vuelve);
  if (sube > 0) { xm = lerp(xm, 560, sube); ym = lerp(ym, PA_PISO - 100, sube) - Math.sin(Math.PI * sube) * 160; }
  put(PA_MON, { x: xm, y: ym, ay: 92, r: corre < 1 ? Math.sin(t * 20) * 8 : 0, o: 1 - P(t, T5.otro + .5, .2, E.in2) });
  cara(PA_MON, tp, sube > 0 ? { boca: 'euforia', mira: [0, -.4] } : t >= T5.vie - .2 ? { boca: 'o', mira: [-1, 0] } : t >= T5.dej ? { boca: 'seria', cierre: .4, mira: [1, .2] } : { boca: 'grito', mira: [1, -.2] });
  const ks = P(t, T5.dej + .05, .7, E.out2); if (ks > 0 && ks < 1) put(PA_SUS, { x: xm + 60 + 50 * ks, y: ym - 80 - 30 * ks, s: .6 + ks, o: 1 - ks }); else off(PA_SUS);
  ap(PA_UNO, t, T5.uno - .1, T5.vie, { x: 760, y: 1000, s0: .6, dy: 12 });
  ap(PA_OTRO, t, T5.otro - .05, null, { x: 540, y: 1000, s0: .6, dy: 12 });
  put(PA_VIN, { x: CX, y: CY });
}
PINTAR.push(pintarParada);

/* =====================================================================
   6 · PERSEGUIR EL PRECIO (f6): la etiqueta del precio corre y crece; cuando la alcanzas, pagas mas caro
   ===================================================================== */
const T6 = { per: tw(6, 'persigue'), pre: tw(6, 'precio'), ter: tw(6, 'termina'), pag: tw(6, 'pagando'), pre2: tw(6, 'precio', 2), mas: tw(6, 'mas'), caro: tw(6, 'caro') };
const PE = new Plano(5), PE_PISO = 1430;
const PE_FON = dEl(PE.el, '', `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="display:block"><defs>${dGrad('peP', [[0, '#0a0614'], [.7, '#24123a'], [.745, '#2e1848'], [.745, '#1b0f2c'], [1, '#07040d']])}</defs>
  <rect width="1080" height="1920" fill="url(#peP)"/><ellipse cx="540" cy="1440" rx="520" ry="80" fill="rgba(244,196,48,.08)"/></svg>`, 2);
const PE_TAG = dEl(PE.el, '', dEtiqueta(250), 6), PE_TX = PE_TAG.querySelector('.tx'), PE_PI = PE_TAG.querySelector('.pI'), PE_PD = PE_TAG.querySelector('.pD');
const PE_MON = dEl(PE.el, '', dMoneda(120), 7), PE_SELLO = dEl(PE.el, '', dSello('MÁS CARO'), 8);
const PE_POL = [0, 1, 2, 3].map(() => dEl(PE.el, '', '<div style="width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(200,190,230,.6),rgba(200,190,230,0) 70%)"></div>', 5));
sfx(T6.per - .05, 'barrido', { vol: .5 }); [T6.ter, T6.pag].forEach(x => sfx(x, 'pop', { vol: .5 })); sfx(T6.caro - .05, 'golpe', { vol: .85 }); sfx(T6.caro + .05, 'fallo', { vol: .45 });
sfx(XC(6) - .3, 'transicion', { vol: .5 });
function pintarPersigue(t) {
  if (t < XC(5) - .3 || t >= XC(6) + .45) { off(PE.el); return; }
  const tp = deADos(t), en = barrido(t, XC(5));
  if (!PE.ver({ s: 1.12, fx: CX - (t < XC(5) + .3 ? en.b.dx / 1.12 : 0), fy: 1240, o: 1, b: t < XC(5) + .3 ? en.b.b : 0 })) return;
  put(PE_FON, { x: CX, y: CY });
  // la etiqueta corre adelante y se infla en cada paso
  const kx = P(t, T6.per - .3, T6.caro - T6.per + .2, E.io3), crece = 1 + .3 * P(t, T6.ter - .1, .3, E.back) + .3 * P(t, T6.pag - .1, .3, E.back) + .3 * P(t, T6.mas - .1, .3, E.back);
  const xt = lerp(560, 720, kx), salto = Math.abs(Math.sin(t * 12)) * 40 * (1 - P(t, T6.caro - .2, .2, E.lin));
  const pr = '$ ' + Math.round(100 * (t >= T6.mas - .05 ? 1.25 : t >= T6.pag - .05 ? 1.16 : t >= T6.ter - .05 ? 1.08 : 1)); if (PE_TX._p !== pr) { PE_TX._p = pr; PE_TX.textContent = pr; }
  put(PE_TAG, { x: xt, y: PE_PISO - salto, ay: 90, s: .82 * crece, r: Math.sin(t * 10) * 4 });
  const pa = Math.sin(t * 24) * 22; PE_PI.setAttribute('transform', `rotate(${pa.toFixed(1)} -30 70)`); PE_PD.setAttribute('transform', `rotate(${(-pa).toFixed(1)} 30 70)`);
  cara(PE_TAG, tp, t >= T6.caro ? { boca: 'feliz', mira: [-1, .4] } : { boca: 'euforia', mira: [-1, 0] });
  // tu moneda la persigue
  const xm = lerp(120, 470 + 120 * P(t, T6.caro - .3, .3, E.out2), kx), ym = PE_PISO + 10 - Math.abs(Math.sin(t * 14)) * 60 * (1 - P(t, T6.caro, .2, E.lin));
  put(PE_MON, { x: xm, y: ym, ay: 92, r: Math.sin(t * 20) * 10 * (1 - P(t, T6.caro, .2, E.lin)) });
  cara(PE_MON, tp, t >= T6.caro ? { boca: 'triste', ceno: -.7, mira: [1, -.6] } : { boca: 'dientes', ceno: .7, mira: [1, -.2] });
  PE_POL.forEach((p, i) => { const k = ((t - T6.per - i * .18) % .72) / .72; if (t > T6.per && t < T6.caro && k > 0) put(p, { x: xm - 70 - 60 * k, y: PE_PISO - 10, s: .5 + k, o: (1 - k) * .8 }); else off(p); });
  ap(PE_SELLO, t, T6.caro - .05, null, { x: xt - 30, y: PE_PISO - 560, s0: 2.4, dy: 0, d: .22, e: E.out3, r: -8 });
}
PINTAR.push(pintarPersigue);

/* =====================================================================
   7 · CIERRE (f7): comenta TRADING (el bicho del FOMO ya tranquilo, la libreta y tu moneda)
   ===================================================================== */
const T7 = { tr2: tw(7, 'trading', 2), env: tw(7, 'envio') };
const CIERRE = ctaCine({ a: XC(6), tEscribe: T7.tr2 - .3, tEnvia: T7.env, yCaja: 1000, personajes: (t, k) => {
  const tp = deADos(t), fes = t >= T7.env;
  put(C7_BICHO, { x: 175, y: 1350 + (1 - k) * 300 - (fes ? Math.abs(Math.sin((t - T7.env) * 7)) * 40 : 0), s: .62 });
  cara(C7_BICHO, tp, { boca: fes ? 'euforia' : 'feliz', mira: [.6, -.6] });
  put(C7_LAP, { x: 900, y: 1450 + (1 - k) * 300, ax: 50, ay: 100, r: fes ? 12 * Math.sin((t - T7.env) * 9) : 8 });
  cara(C7_LAP, tp, { boca: fes ? 'euforia' : 'feliz', mira: [-.6, -.6] });
  const sal = Math.abs(Math.sin((t - XC(6)) * 5)) * 60 * (1 - P(t, T7.tr2, .3, E.out2)) + (fes ? Math.abs(Math.sin((t - T7.env) * 7)) * 50 : 0);
  put(C7_MON, { x: CX, y: 838 - sal + (1 - k) * 200, ay: 92, o: k }); cara(C7_MON, tp, { boca: fes ? 'euforia' : 'feliz', mira: [0, .4] });
} });
const C7_BICHO = dEl(CIERRE.PL.el, '', dFomo(300), 5), C7_LAP = dEl(CIERRE.PL.el, '', dLapiz(330), 5), C7_MON = dEl(CIERRE.PL.el, '', dMoneda(120), 8);
PINTAR.push(CIERRE.pintar);
