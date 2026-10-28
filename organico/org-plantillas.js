/* =====================================================================
   MODULO ORGANICO (curso NSFW) · PLANTILLAS (de TikTok Shop) + armador de clase (23/10/2026).
   La media de la clase (presentador en tarjeta o grabacion en el celular, a la izquierda) sale de MEDIA/MARCAS
   (preparar.py) y las animaciones van SIEMPRE en la zona derecha. Cada clase es un CLASE({...}) con datos:
     escenas: [{ tipo, t: [t0, t1 | 'fin'], ... }]  ·  anclas `at`: segundos | 'palabra' | 'palabra#2' | 'palabra@123.4'
   tipos: titulo · tarjetas · iconos · lista · contador · frase · tags · logos
   ===================================================================== */
const XZ = 1320, ZW = 980;
let FIN_VOZ = 0;
function A(v, desde) {                                                     // ancla -> segundos
  if (typeof v === 'number') return v;
  if (/^f\d+$/.test(v)) return FR[+v.slice(1)][0];
  let w = String(v), k = 1, d = desde;
  const mf = w.match(/@f(\d+)$/); if (mf) { d = FR[+mf[1]][0]; w = w.slice(0, mf.index); }
  const m1 = w.match(/@([\d.]+)$/); if (m1) { d = +m1[1]; w = w.slice(0, m1.index); }
  const m2 = w.match(/#(\d+)$/); if (m2) { k = +m2[1]; w = w.slice(0, m2.index); }
  return tp(w, d - .3, k);
}
function fitW(el, maxW) {                                                  // achica la letra hasta que quepa en maxW
  if (!el || el._fit) return; el._fit = 1;
  const w = el.scrollWidth; if (!(w > maxW)) return;
  const k = maxW / w, ss = el.querySelectorAll('span');
  (ss.length ? [...ss] : [el]).forEach(s => { s.style.fontSize = (parseFloat(getComputedStyle(s).fontSize) * k).toFixed(1) + 'px'; });
}
const bTxt = s => String(s).replace(/\*([^*]+)\*/g, '<b>$1</b>');

css(`
.txt2{width:900px;font:600 32px/1.35 var(--sans);color:#d9d5ea;text-align:center;white-space:normal}
.txt2 b{color:#ff8a3d}
.crd2{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:26px 28px 30px;border-radius:30px;
  background:linear-gradient(180deg,rgba(26,22,44,.95),rgba(12,10,22,.95));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 40px 90px -30px rgba(0,0,0,.95)}
.crd2.on{border-color:rgba(255,122,26,.9);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 60px rgba(255,122,26,.3)}
.crd2.no{filter:saturate(.45)}
.crd2 .ct{width:100%;font:400 44px/1.02 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#fff;white-space:nowrap;letter-spacing:.01em}
.crd2 .cs{font:600 24px/1.35 var(--sans);color:#b9b5cc}
.crd2 .cs b{color:#ffb27a}
.crd2 .bdg{position:absolute;right:20px;top:20px;width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff}
.frs{width:920px;padding:46px 54px;border-radius:32px;background:linear-gradient(180deg,rgba(26,20,44,.94),rgba(12,10,22,.94));border:1.5px solid rgba(169,112,255,.55);
  box-shadow:0 40px 100px -30px rgba(0,0,0,.95),0 0 60px rgba(169,112,255,.2)}
.frs .q{position:absolute;left:30px;top:-6px;font:400 150px/1 Georgia,serif;color:#a970ff;opacity:.55}
.frs p{margin:0;font:800 44px/1.28 var(--sans);color:#fff;text-align:center}
.frs p b{color:#ff8a3d}
.frs .au{margin-top:22px;text-align:center;font:600 24px var(--mono);letter-spacing:.14em;color:#b9b5cc}
.big2{font:400 168px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;white-space:nowrap;text-shadow:0 0 34px rgba(255,122,26,.55)}
.big2 small{font:700 34px var(--sans);color:#ffb27a;margin-left:16px;text-shadow:none}
.labz{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%);font:800 26px var(--sans);color:#fff;white-space:nowrap}
`);

const ESC_TIPOS = {};
/* titulo: { chip?, num?, tit:[a,b], at?, sub?, subAt?, pills?:[{ico, txt, at, cls}] } */
ESC_TIPOS.titulo = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], pills = s.pills || [];
  const e = escenaT(s.t[0], s.t[1], (s.chip ? H.chip(s.num ?? null, s.chip) : '') + H.tit(s.tit[0], s.tit[1] || '', 'c') +
    (s.sub ? `<div class="L txt2">${bTxt(s.sub)}</div>` : '') + pills.map(p => H.pill(p.ico || 'check', p.txt, p.cls || '')).join(''), (t, { a }) => {
    const $ = e.$; let k = 0;
    const chip = s.chip ? $[k++] : null, tit = $[k++], sub = s.sub ? $[k++] : null, ps = $.slice(k);
    const yT = pills.length > 3 ? 230 : pills.length ? 300 : (s.sub ? 420 : 520);
    fitW(tit, ZX);
    const tt = s.at != null ? A(s.at, P0) - .35 : a + .15;
    if (chip) ent(chip, t, a + .05, X, yT - 150, { ay: 50 });
    ent(tit, t, tt, X, yT, { s0: .85 });
    if (sub) ent(sub, t, s.subAt != null ? A(s.subAt, P0) - .3 : tt + .45, X, yT + 170, { ay: 0, dy: 20 });
    const y0 = yT + (sub ? 330 : 200);
    pills.forEach((p, i) => { fitW(ps[i], ZX); ent(ps[i], t, A(p.at, P0) - .3, X, y0 + i * 102, { ease: E.back, s0: .6, dy: 0 }); });
  });
  pills.forEach(p => sfx(A(p.at, P0) - .3, 'pop', { vol: .45 }));
  return e;
};
/* tarjetas: { tit?:[a,b], cards:[{ ico, c, t, s?, at, ok? }] } (1 a 4; ok true/false pone visto o X) */
ESC_TIPOS.tarjetas = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], cs = s.cards, n = cs.length, W2 = s.img ? 820 : n === 3 ? 318 : n === 1 ? 640 : 470;
  const e = escenaT(s.t[0], s.t[1], (s.tit ? H.tit(s.tit[0], s.tit[1] || '', 'c') : '') + cs.map(c =>
    `<div class="L crd2${s.img ? ' h' : ''}${c.ok === false ? ' no' : ''}" style="width:${W2}px">${neo(c.ico, c.c || 'o', n === 4 ? 68 : 84, '', true)}<div class="ct">${c.t}</div>` +
    `${c.s ? `<div class="cs">${bTxt(c.s)}</div>` : ''}${c.ok != null ? `<span class="bdg" style="background:${c.ok ? '#2e9e5b' : '#b8323d'}">${icon(c.ok ? 'check' : 'x', 28, 3)}</span>` : ''}</div>`).join(''), (t, { a }) => {
    const $ = e.$, tit = s.tit ? $[0] : null, cards = $.slice(s.tit ? 1 : 0);
    if (tit) { fitW(tit, ZX); ent(tit, t, a + .15, X, n === 4 ? 215 : 270, { s0: .85 }); }
    cards.forEach((c, i) => {
      const ct = c.querySelector('.ct'); fitW(ct, W2 - (s.img ? 170 : 56));
      let x = X, y = 640;
      if (s.img) { y = 470 + (3 - n) * 85 + i * 170; }
      else if (n === 2) { x = X + (i ? 250 : -250); y = 650; }
      else if (n === 3) { x = X + (i - 1) * 338; y = 650; }
      else if (n === 4) { x = X + (i % 2 ? 250 : -250); y = 500 + Math.floor(i / 2) * 285; }
      const tc = A(cs[i].at, P0), tn = i < n - 1 ? A(cs[i + 1].at, P0) : 1e9;
      ent(c, t, tc - .3, x, y, { ease: E.back, s0: .7 });
      c.classList.toggle('on', cs[i].ok !== false && t >= tc && t < tn);
    });
  });
  cs.forEach(c => sfx(A(c.at, P0) - .3, 'pop', { vol: .45 }));
  return e;
};
/* iconos: { tit:[a,b], nodos:[{ ico, c, l, at }], pie?:{ ico, txt, at, cls } } (2 a 5, unidos por lineas) */
ESC_TIPOS.iconos = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], ns = s.nodos, n = ns.length;
  const tam = n <= 3 ? 170 : n === 4 ? 148 : 126, gap = n <= 3 ? 330 : n === 4 ? 252 : 200;
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') + ns.map(nd => neo(nd.ico, nd.c || 'o', tam, nd.l)).join('') +
    ns.slice(1).map(() => H.lin(gap - tam - 28)).join('') + (s.pie ? H.pill(s.pie.ico || 'sparkles', s.pie.txt, s.pie.cls ?? 'll') : ''), (t, { a }) => {
    const $ = e.$, tit = $[0], nodos = $.slice(1, 1 + n), lins = $.slice(1 + n, 2 * n), pie = s.pie ? $[2 * n] : null;
    fitW(tit, ZX); ent(tit, t, a + .15, X, 270, { s0: .85 });
    const xs = ns.map((_, i) => X + (i - (n - 1) / 2) * gap), ts = ns.map(nd => A(nd.at, P0));
    nodos.forEach((el, i) => ent(el, t, ts[i] - .3, xs[i], 590, { ease: E.back, s0: .5, dy: 0 }));
    lins.forEach((ln, i) => {
      const p = P(t, ts[i + 1] - .45, .35, E.io3);
      if (p > 0) { put(ln, { x: xs[i] + tam / 2 + 14, y: 590, ax: 0, o: 1 }); ln.style.transform += ` scaleX(${p.toFixed(3)})`; } else off(ln);
    });
    if (pie) { fitW(pie, ZX); ent(pie, t, A(s.pie.at, P0) - .3, X, 900, { ease: E.back, s0: .6, dy: 0 }); }
  });
  ns.forEach(nd => sfx(A(nd.at, P0) - .3, 'pop', { vol: .45 }));
  return e;
};
/* lista: { n?, tit, items:[[texto, at, sub?]] } -> pasos que se encienden y se marcan (como el piloto) */
ESC_TIPOS.lista = s => escenaPasos(s.t[0], s.t[1], { n: s.n, titulo: s.tit, x: s.img ? XZ : CX, items: s.items.map(it => [it[0], A(it[1], s.t[0]), it[2]]) });
/* contador: { tit:[a,b], valor, pre?, suf?, at:[desde, hasta], pills? } */
ESC_TIPOS.contador = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], pills = s.pills || [];
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') + '<div class="L big2">0</div>' + pills.map(p => H.pill(p.ico || 'check', p.txt, p.cls || '')).join(''), (t, { a }) => {
    const [tit, num, ...ps] = e.$;
    fitW(tit, ZX); ent(tit, t, a + .15, X, 260, { s0: .85 });
    const t0 = A(s.at[0], P0), t1 = A(s.at[1], P0);
    ent(num, t, t0 - .3, X, 520, { ease: E.back, s0: .6, dy: 0 });
    const v = s.valor * P(t, t0, Math.max(.4, t1 - t0), E.out3), txt = `${s.pre || ''}${s.dec ? v.toFixed(s.dec).replace('.', ',') : miles(Math.round(v))}`;
    if (num._t !== txt) { num._t = txt; num.innerHTML = `${txt}${s.suf ? `<small>${s.suf}</small>` : ''}`; }
    pills.forEach((p, i) => ent(ps[i], t, A(p.at, P0) - .3, X, 720 + i * 102, { ease: E.back, s0: .6, dy: 0 }));
  });
  sfx(A(s.at[0], P0) - .3, 'subida', { vol: .4 }); pills.forEach(p => sfx(A(p.at, P0) - .3, 'pop', { vol: .45 }));
  return e;
};
/* frase: { tit?:[a,b], frase:'texto con *resaltado*', at, autor? } */
ESC_TIPOS.frase = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], (s.tit ? H.tit(s.tit[0], s.tit[1] || '', 'c') : '') +
    `<div class="L frs"><i class="q">“</i><p>${bTxt(s.frase)}</p>${s.autor ? `<div class="au">${s.autor}</div>` : ''}</div>`, (t, { a }) => {
    const $ = e.$, tit = s.tit ? $[0] : null, fr = $[s.tit ? 1 : 0];
    if (tit) { fitW(tit, ZX); ent(tit, t, a + .15, X, 250, { s0: .85 }); }
    ent(fr, t, (s.at != null ? A(s.at, P0) : a + .3) - .3, X, tit ? 620 : 540, { s0: .9 });
  });
  sfx((s.at != null ? A(s.at, P0) : s.t[0]) - .3, 'brillo', { vol: .5 });
  return e;
};
/* tags: { tit:[a,b], tags:[{ ico, c, txt, at }] } (lista vertical de etiquetas) */
ESC_TIPOS.tags = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], tg = s.tags;
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') + tg.map(g => `<div class="L tag3" style="--c:${NEON[g.c || 'o']}">${icon(g.ico || 'check', 28, 2.4)}${g.txt}</div>`).join(''), (t, { a }) => {
    const [tit, ...gs] = e.$;
    fitW(tit, ZX); ent(tit, t, a + .15, X, tg.length > 4 ? 230 : 270, { s0: .85 });
    const y0 = tg.length > 4 ? 400 : 450;
    gs.forEach((g, i) => { fitW(g, ZX); ent(g, t, A(tg[i].at, P0) - .25, X, y0 + i * 100, { dx: 40, dy: 0 }); });
  });
  tg.forEach(g => sfx(A(g.at, P0) - .25, 'tick', { vol: .4 }));
  return e;
};
/* logos: { tit:[a,b], logos:[{ slug, l, at }], pills? } (logos oficiales de assets/logos) */
ESC_TIPOS.logos = s => {
  const X = s.img ? XZ : CX, ZX = s.img ? ZW : 1500;
  const P0 = s.t[0], lg = s.logos, n = lg.length, pills = s.pills || [], gap = n <= 3 ? 300 : 230;
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') + lg.map(l => `<div class="L"><div class="tile" style="position:relative;width:170px;height:170px">${logo(l.slug, 96)}</div>${l.l ? `<span class="labz">${l.l}</span>` : ''}</div>`).join('') +
    pills.map(p => H.pill(p.ico || 'check', p.txt, p.cls || '')).join(''), (t, { a }) => {
    const [tit, ...r] = e.$, ts = r.slice(0, n), ps = r.slice(n);
    fitW(tit, ZX); ent(tit, t, a + .15, X, 270, { s0: .85 });
    ts.forEach((el, i) => brote(el, t, A(lg[i].at, P0) - .2, X + (i - (n - 1) / 2) * gap, 560));
    pills.forEach((p, i) => ent(ps[i], t, A(p.at, P0) - .3, X, 820 + i * 100, { ease: E.back, s0: .6, dy: 0 }));
  });
  lg.forEach(l => sfx(A(l.at, P0) - .2, 'pop', { vol: .45 }));
  return e;
};


/* venn: { tit, a:{t, s, at}, b:{t, s, at}, centro:{t, at}, ejemplos:[[izq, der, at], ...] } nicho (producto) x publico (cliente) */
ESC_TIPOS.venn = s => {
  const X = s.img ? XZ : CX, P0 = s.t[0], ej = s.ejemplos || [];
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1] || '', 'c') +
    `<div class="L vn a"><b>${s.a.t}</b><span>${s.a.s}</span></div><div class="L vn b"><b>${s.b.t}</b><span>${s.b.s}</span></div>` +
    `<div class="L vnc">${icon('coins', 64, 2.2)}</div><div class="L vnt">${s.centro.t}</div>` +
    ej.map(x => `<div class="L vej"><span>${x[0]}</span><i>×</i><span>${x[1]}</span></div>`).join(''), (t, { a }) => {
    const [tit, ca, cb, cc, ct, ...es] = e.$;
    fitW(tit, 1500); ent(tit, t, a + .15, X, 190, { s0: .85 });
    const ta = A(s.a.at, P0), tb = A(s.b.at, P0), tc = A(s.centro.at, P0);
    const junta = P(t, tc - .5, .8, E.io3), sep = 150 - 60 * junta;
    ent(ca, t, ta - .3, X - sep, 520, { ease: E.back, s0: .5, dy: 0 });
    ent(cb, t, tb - .3, X + sep, 520, { ease: E.back, s0: .5, dy: 0 });
    ent(cc, t, tc - .2, X, 520, { ease: E.back, s0: .3, dy: 0, pulso: tc + .2 });
    ent(ct, t, tc, X, 790, { dy: 20 });
    es.forEach((el, i) => { const t0 = A(ej[i][2], P0), t1 = i < es.length - 1 ? A(ej[i + 1][2], P0) - .3 : 1e9;
      ent(el, t, t0 - .3, X, 900, { t1, dy: 26 }); });
  });
  sfx(A(s.a.at, P0) - .3, 'pop', { vol: .45 }); sfx(A(s.b.at, P0) - .3, 'pop', { vol: .45 }); sfx(A(s.centro.at, P0) - .2, 'golpe', { vol: .7 });
  ej.forEach(x => sfx(A(x[2], P0) - .3, 'tick', { vol: .4 }));
  return e;
};
css(`
.vn{width:420px;height:420px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;mix-blend-mode:screen}
.vn.a{border:4px solid #ff7a1a;background:radial-gradient(circle,rgba(255,106,26,.22),rgba(255,106,26,.05));box-shadow:0 0 50px rgba(255,106,26,.35)}
.vn.b{border:4px solid #c084fc;background:radial-gradient(circle,rgba(192,132,252,.22),rgba(192,132,252,.05));box-shadow:0 0 50px rgba(192,132,252,.35)}
.vn b{font:400 64px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em}
.vn span{font:600 26px var(--mono);letter-spacing:.14em;color:#e6dfe2;text-transform:uppercase}
.vn.a b,.vn.a span{transform:translateX(-100px)}.vn.b b,.vn.b span{transform:translateX(100px)}
.vnc{display:flex;align-items:center;justify-content:center;width:110px;height:110px;border-radius:50%;color:#ffd36b;background:rgba(20,14,6,.85);
  border:2px solid rgba(255,211,107,.7);box-shadow:0 0 40px rgba(255,200,60,.55)}
.vnt{font:400 46px/1 Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#ffd36b;white-space:nowrap;letter-spacing:.02em;text-shadow:0 0 26px rgba(255,200,60,.5)}
.crd2.h{display:grid;grid-template-columns:auto 1fr;column-gap:26px;row-gap:6px;align-items:center;padding:22px 30px}
.crd2.h .neo{grid-row:1/3}
.crd2.h .ct{grid-column:2;align-self:end}
.crd2.h .cs{grid-column:2;align-self:start}
.vej{display:flex;align-items:center;gap:22px;height:70px;padding:0 30px;border-radius:999px;background:rgba(18,14,14,.92);border:1.5px solid rgba(255,255,255,.14);
  font:700 30px var(--sans);color:#fff;white-space:nowrap;box-shadow:0 20px 50px -20px rgba(0,0,0,.9)}
.vej i{font-style:normal;color:#ffd36b;font-size:34px}
`);

/* ---------- armador de la clase: escenas + laminas con fotos (s.img) + malla de fondo + cierre ---------- */
function CLASE(spec) {
  FIN_VOZ = spec.finVoz ?? +(FR[FR.length - 1][1] + .25).toFixed(2);
  (spec.escenas || []).forEach(s => {
    const T = s.t.map(v => v === 'fin' ? FIN_VOZ : (typeof v === 'string' && /^f\d+$/.test(v)) ? FR[+v.slice(1)][0] - .05 : v);
    if (!ESC_TIPOS[s.tipo]) { console.error('tipo de escena desconocido: ' + s.tipo); return; }
    const lst = (s.items || []).map(i => i[1]).concat((s.cards || s.nodos || s.tags || s.logos || s.pills || []).map(c => c.at)).filter(v => v != null);
    let prev = -1;
    lst.forEach(v => { const x = A(v, T[0]); if (x < T[0] - .6 || x > T[1] + .6) console.error(`ANCLA fuera de escena [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`);
      if (x < prev - .05) console.error(`ANCLA desordenada en [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`); prev = x; });
    const esc = ESC_TIPOS[s.tipo]({ ...s, t: T });
    if (s.img && esc) lamina(esc, [].concat(s.img), [].concat(s.cap || []));
  });
  window.extra = t => { pintarMalla(t); pintarLaminas(t); };
  const SF = escenaT(FIN_VOZ, CONFIG.dur, H.tit(`Clase ${spec.num}`, 'completada', 'c') +
    (spec.siguiente ? `<div class="L tag3" style="--c:${NEON.o}">${icon('arrowRight', 28, 2.6)}Siguiente: ${spec.siguiente}</div>` : ''), (t, { a }) => {
    const [tit, sig] = SF.$;
    ent(tit, t, a + .55, CX, 470, { s0: .85 });
    if (sig) { fitW(sig, 1500); ent(sig, t, a + 1.05, CX, 700, { ease: E.back, s0: .6, dy: 0 }); }
  });
  sfx(FIN_VOZ + .2, 'golpe', { vol: .7 });
  activarPro(ESCENAS.slice(0, -1).map(e => e.b), { grano: .05 });
}
