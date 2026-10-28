/* =====================================================================
   CURSO IMPERIO TIKTOK SHOP (IA HUB) — piezas comunes de las clases animadas con la VOZ ORIGINAL (19/10/2026).
   Estetica del curso (sus PDF): fondo espacial oscuro con estrellas y halos morado/azul/naranjo, titulos blancos +
   naranjo, iconos en circulos neon (morado, naranjo, azul) y el logo IMPERIO original (assets/img/logo-imperio.png).
   Anclas por TIEMPO de la transcripcion: tp('palabra', desde_segundos) y escenas con escenaT(t0, t1, ...).
   ===================================================================== */
HALO = ['120,70,255', '50,110,255', '255,106,26'];
const NEON = { p: '#a970ff', o: '#ff7a1a', b: '#3fa9ff', v: '#2fd47a', r: '#ff4d5e' };
function tp(p, desde = 0, k = 1) {                                          // k-esima vez que dice la palabra desde ese segundo
  const n = nrm(p); let c = 0;
  for (const x of PALS) if (x[2] >= desde - .05 && x[1] === n && ++c === k) return x[2];
  console.error('No encuentro «' + p + '» desde ' + desde); return desde;
}
function corteEn(t) {                                                       // corte limpio: mitad de la pausa mas cercana
  if (t >= FR[FR.length - 1][1] - .05) return t;                              // despues de la ultima frase: tiempo exacto
  let best = t, d = 1e9;
  for (let i = 0; i < FR.length - 1; i++) { const m = (FR[i][1] + FR[i + 1][0]) / 2; if (Math.abs(m - t) < d) { d = Math.abs(m - t); best = m; } }
  return best;
}
function escenaT(t0, t1, html, pintar = () => {}) {
  const el = mk('div', 'L esc z5', WORLDF, html);
  el.style.width = CONFIG.ancho + 'px'; el.style.height = CONFIG.alto + 'px';
  const e = { a: t0 <= 0 ? 0 : corteEn(t0), b: t1 >= CONFIG.dur ? CONFIG.dur + 1 : corteEn(t1), el, pintar };
  e.q = s => el.querySelector(s); e.qa = s => [...el.querySelectorAll(s)];
  e.$ = [...el.children];
  ESCENAS.push(e);
  if (e.a > .1) sfx(e.a + .03, 'aire', { vol: .4 });
  return e;
}
const neo = (ico, c = 'o', tam = 120, txt = '', dentro = false) => `<div class="${dentro ? '' : 'L '}neo" style="--c:${NEON[c]};width:${tam}px;height:${tam}px">${ico.startsWith('logo:') ? logo(ico.slice(5), Math.round(tam * .5)) : icon(ico, Math.round(tam * .46), 2.2)}${txt ? `<span>${txt}</span>` : ''}</div>`;

css(`
:root{--grad1:#ffd2b0;--grad2:#FF6A1A}
.estrellas{position:absolute;inset:0;pointer-events:none}
.estrellas i{position:absolute;border-radius:50%;background:#fff}
.logoimp{width:210px;height:auto;opacity:.92;filter:drop-shadow(0 4px 14px rgba(0,0,0,.6))}
.neo{border-radius:50%;border:3px solid var(--c);background:radial-gradient(circle,rgba(10,8,22,.6),rgba(10,8,22,.92));color:var(--c);display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 26px color-mix(in srgb,var(--c) 70%,transparent),inset 0 0 22px color-mix(in srgb,var(--c) 45%,transparent)}
.neo span{position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%);font:800 26px var(--sans);color:#fff;white-space:nowrap;text-align:center}
.neo img{filter:none}
.crd .neo{position:absolute}
.crd .tag3,.crd .cnt{position:absolute}
.anic{width:640px;height:768px;border-radius:36px;overflow:hidden;background:#000;box-shadow:0 50px 120px -30px rgba(0,0,0,.95),0 0 70px rgba(169,112,255,.28)}
.anic img.cl{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.anic .brd{position:absolute;inset:0;border-radius:36px;padding:4px;background:linear-gradient(160deg,#a970ff,#3fa9ff 45%,#ff7a1a);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.anic .nm{position:absolute;left:22px;bottom:22px;display:flex;align-items:center;gap:10px;height:50px;padding:0 20px 0 14px;border-radius:999px;background:rgba(8,6,16,.78);
  border:1.5px solid rgba(169,112,255,.6);font:700 20px var(--mono);letter-spacing:.14em;color:#fff;white-space:nowrap}
.anic .nm b{width:12px;height:12px;border-radius:50%;background:#ff4d5e;box-shadow:0 0 12px #ff4d5e}
.tel2{width:490px;height:1030px;border-radius:60px;background:linear-gradient(160deg,#1b1a22,#0b0b0e);
  box-shadow:0 0 0 2px rgba(255,255,255,.14),0 60px 140px -30px rgba(0,0,0,.95),0 0 90px rgba(169,112,255,.3)}
.tel2 .scr{position:absolute;left:12px;top:12px;right:12px;bottom:12px;border-radius:48px;overflow:hidden;background:#000}
.tel2 .scr img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}
.tel2 .scr .anillo{position:absolute;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;border:5px solid #ff7a1a;box-shadow:0 0 30px rgba(255,122,26,.9),inset 0 0 20px rgba(255,122,26,.5);opacity:0;z-index:2}
.tel2 .isla{position:absolute;left:50%;top:26px;width:120px;height:32px;margin-left:-60px;border-radius:20px;background:#000;z-index:2}
.phd{display:flex;align-items:center;gap:18px}
.phd .pn{display:flex;align-items:center;justify-content:center;height:56px;padding:0 22px;border-radius:999px;background:linear-gradient(180deg,#ff8a3d,#ff6a1a);
  font:800 24px var(--mono);letter-spacing:.12em;color:#fff;white-space:nowrap;box-shadow:0 0 30px rgba(255,106,26,.45)}
.phd .pt{font:400 64px/1 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#fff;white-space:nowrap;letter-spacing:.01em}
.lst{display:flex;flex-direction:column;gap:14px;width:900px}
.lst .it{position:relative;display:flex;align-items:center;gap:20px;min-height:86px;padding:14px 26px;border-radius:22px;background:rgba(16,14,30,.88);
  border:1.5px solid rgba(255,255,255,.08);font:700 30px/1.25 var(--sans);color:#8e8aa6;opacity:0}
.lst .it i{display:flex;align-items:center;justify-content:center;flex:none;width:50px;height:50px;border-radius:50%;background:#26233a;font:800 24px var(--sans);color:#b9b5cc;font-style:normal}
.lst .it.on{color:#fff;border-color:rgba(255,122,26,.9);box-shadow:0 0 0 1px rgba(255,122,26,.4),0 0 40px rgba(255,122,26,.25);background:rgba(30,18,22,.92)}
.lst .it.on i{background:linear-gradient(180deg,#ff8a3d,#ff6a1a);color:#fff}
.lst .it.ok{color:#dcd8ea}
.lst .it.ok i{background:#2e9e5b;color:#fff}
.lst .it small{display:block;font:600 22px var(--sans);color:#ffb27a;margin-top:4px}
.crd{border-radius:30px;background:linear-gradient(180deg,rgba(26,22,44,.95),rgba(12,10,22,.95));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 40px 90px -30px rgba(0,0,0,.95)}
.crd.on{border-color:rgba(255,122,26,.9);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 60px rgba(255,122,26,.3)}
.crd.no{opacity:.9;filter:saturate(.4)}
.crd .ct{position:absolute;left:30px;right:24px;font:400 46px/1 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#fff;letter-spacing:.01em}
.crd .cs{position:absolute;left:30px;right:24px;font:600 24px/1.35 var(--sans);color:#b9b5cc}
.crd .bdg{position:absolute;right:22px;top:22px;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff}
.tag3{display:flex;align-items:center;gap:12px;height:62px;padding:0 26px 0 18px;border-radius:999px;background:rgba(14,12,26,.9);border:1.5px solid var(--c,rgba(255,255,255,.2));
  font:700 27px var(--sans);color:#fff;white-space:nowrap;box-shadow:0 0 24px color-mix(in srgb,var(--c,#000) 35%,transparent)}
.tag3 svg{color:var(--c,#fff)}
.cnt{font:400 120px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;white-space:nowrap;text-shadow:0 0 30px rgba(255,122,26,.55)}
.cnt small{font:700 30px var(--sans);color:#ffb27a;margin-left:14px;letter-spacing:.02em}
`);

/* fondo: estrellas fijas (semilla fija para que cada render sea igual) */
const ESTR = (() => {
  const el = document.createElement('div'); el.className = 'estrellas';
  let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let html = '';
  for (let i = 0; i < 140; i++) { const z = rnd() < .85 ? 1.6 : 2.8; html += `<i style="left:${(rnd() * 100).toFixed(2)}%;top:${(rnd() * 100).toFixed(2)}%;width:${z}px;height:${z}px;opacity:${(.15 + rnd() * .55).toFixed(2)}"></i>`; }
  el.innerHTML = html; STAGE.insertBefore(el, WORLD);
  return el;
})();

/* ---------- Ani en su tarjeta (la clase original, recortada) ---------- */
function tarjetaAni(clip, t0clip, nombre = 'ANI') {
  const el = mk('div', 'L anic z5', WORLDF, `<img class="cl" alt="" src="${fotoClip(clip, 1)}"><i class="brd"></i><span class="nm"><b></b>${nombre}</span>`);
  return { el, img: el.querySelector('img'), clip, t0clip };
}
/* ---------- el celular con la grabacion real ---------- */
function celular(clip, t0clip) {
  const el = mk('div', 'L tel2 z5', WORLDF, `<div class="scr"><img alt="" src="${fotoClip(clip, 1)}"><i class="anillo"></i></div>`);
  return { el, img: el.querySelector('.scr img'), anillo: el.querySelector('.anillo'), clip, t0clip };
}
/* ---------- pantalla de pasos al lado del celular: cabecera + lista que se enciende con la voz ---------- */
function escenaPasos(t0, t1, { n, titulo, items, x = 1330, y0 = 250, extra }) {
  const e = escenaT(t0, t1, `<div class="L phd">${n ? `<span class="pn">${n}</span>` : ''}<span class="pt">${titulo}</span></div>` +
    `<div class="L lst">${items.map((it, i) => `<div class="it"><i>${i + 1}</i><span>${it[0]}${it[2] ? `<small>${it[2]}</small>` : ''}</span></div>`).join('')}</div>` + (extra ? extra.html : ''),
    (t, { a, b }) => {
      const [hd, lst] = e.$;
      if (typeof fitW === "function") fitW(hd, 940);
      ent(hd, t, a + .05, x, y0 - 90, { ax: 50, dy: 0, dx: 40 });
      ent(lst, t, a + .15, x, y0, { ax: 50, ay: 0, dy: 20 });
      const its = [...lst.children];
      items.forEach((it, i) => {
        const ti = it[1], tn = i < items.length - 1 ? items[i + 1][1] : b + 1;
        const p = P(t, ti - .25, .35);
        its[i].style.opacity = p.toFixed(3); its[i].style.transform = `translateX(${((1 - p) * 40).toFixed(1)}px)`;
        its[i].classList.toggle('on', t >= ti - .1 && t < tn - .1);
        its[i].classList.toggle('ok', t >= tn - .1);
        const ic = its[i].querySelector('i'), st = t >= tn - .1 ? 'ok' : 'n';
        if (ic._st !== st) { ic._st = st; if (st === 'ok') ic.innerHTML = icon('check', 26, 3.2); else ic.textContent = i + 1; }
      });
      if (extra) extra.pintar(t, e);
    });
  items.forEach(it => sfx(it[1] - .2, 'tick', { vol: .4 }));
  return e;
}

/* marca sobre la captura del celular: donde la grabacion original tiene una flecha/circulo rojo, un anillo naranjo late
   encima. La captura queda ENTERA y quieta (sin zoom ni recorte: Reimo 19/10). marcas: [[t0, t1, x, y]] en px del cuadro
   original del celular (anchoW x altoH). */
function zoomCelular(cel, t, marcas, anchoW = 500, altoH = 1080) {
  let z = 0, m = null;
  for (const mk2 of marcas) { const k = Math.min(P(t, mk2[0] - .2, .35, E.out3), 1 - P(t, mk2[1] + .2, .35, E.in3)); if (k > z) { z = k; m = mk2; } }
  cel.img.style.transform = 'none';
  if (!m || z <= .001) { cel.anillo.style.opacity = 0; return; }
  cel.anillo.style.left = (m[2] / anchoW * 100).toFixed(2) + '%'; cel.anillo.style.top = (m[3] / altoH * 100).toFixed(2) + '%';
  cel.anillo.style.opacity = (z * (.7 + .3 * Math.sin(t * 8))).toFixed(3);
  cel.anillo.style.transform = `scale(${(lerp(1.6, 1, z) * (.92 + .1 * Math.sin(t * 8))).toFixed(3)})`;
}
