/* ---------- MODULO ZERNIO (curso NSFW, 27/10/2026) · escenas de las clases 1, 4, 5 y 6 ----------
   zPrecio (pagina de precios de zernio.com recreada) · zIncluye (tabla de funciones) · zDesc (descripcion que se escribe)
   zForm (New Automation: cualquier comentario + respuesta publica) · zComentarios (respuestas casuales)
   zEmbudo (comentario -> DM -> link secundario -> Fanvue/Telegram) · zDMs (mensajes buenos vs malos) · zBot · zCompara */
css(`
.zpp{position:absolute;inset:0;background:#F0EFEB;font-family:'Geist';color:#1a1a1a;opacity:0}
.zpp .nb{display:flex;align-items:center;gap:26px;height:52px;padding:0 70px;font:500 12px 'Geist';color:#4a4a46}
.zpp .nb .r{margin-left:auto;display:flex;align-items:center;gap:14px}.zpp .nb .r b{background:${ZROJO};color:#fff;padding:7px 14px;border-radius:8px;font-weight:500}
.zpp .lab{text-align:center;margin-top:16px;font:500 11px 'Geist';color:${ZROJO}}
.zpp h1{text-align:center;margin:4px 0 0;font:500 34px 'Geist';letter-spacing:-.02em}
.zpp .sub{text-align:center;margin-top:8px;font:400 11.5px/1.55 'Geist';color:#4a4a46}
.zpp .ya{text-align:center;margin-top:18px;font:500 11px 'Geist';color:#4a4a46}
.zpp .nn{text-align:center;font:600 30px 'JetBrains Mono',monospace;margin-top:2px}
.zpp .sl{position:relative;margin:10px 90px 0;height:60px}
.zpp .sl .sg{position:absolute;top:8px;height:5px;border-radius:3px;background:#d9d8d3}
.zpp .sl .sg i{display:block;height:100%;width:0;border-radius:3px;background:${ZROJO}}
.zpp .sl .kn{position:absolute;top:2px;width:17px;height:17px;margin-left:-8px;border-radius:50%;background:${ZROJO};box-shadow:0 0 0 3px #fff}
.zpp .sl .tl2{position:absolute;top:24px;font:500 10px 'Geist';color:#6b6b66}.zpp .sl .tl2 b{display:block;color:#1a1a1a;font-weight:500}
.zpp .sl .tl2.on{color:${ZROJO}}.zpp .sl .tl2.on b{color:${ZROJO}}
.zpp .chs{display:flex;justify-content:center;gap:8px;margin-top:8px}
.zpp .chs span{padding:6px 12px;border-radius:999px;border:1px solid #d9d8d3;font:500 10.5px 'Geist';background:#fff;opacity:0}
.zpp .chs span.r{border-color:${ZROJO};color:${ZROJO}}.zpp .chs span em{font-style:normal;color:${ZROJO}}
.zpp .cds{display:flex;gap:14px;margin:16px 90px 0}
.zpp .cd{flex:1;border-radius:14px;padding:16px 18px;background:#fff;border:1px solid #e3e2dd}
.zpp .cd.e{background:transparent}
.zpp .cd .t{font:500 13px 'Geist'}.zpp .cd .t small{font:400 10.5px 'Geist';color:#6b6b66;margin-left:6px}
.zpp .cd .pr{display:flex;align-items:baseline;gap:6px;margin-top:8px;font:500 30px 'Geist'}.zpp .cd .pr small{font:400 10px 'Geist';color:#6b6b66}
.zpp .cd .pr em{margin-left:auto;font-style:normal;font:500 10px 'Geist';color:${ZROJO}}
.zpp .cd .bt2{margin-top:10px;height:28px;border-radius:7px;background:${ZROJO};color:#fff;display:flex;align-items:center;justify-content:center;font:500 11px 'Geist'}
.zpp .cd ul{margin:10px 0 0;padding:0;list-style:none}.zpp .cd li{font:400 10px/1.8 'Geist';color:#4a4a46}.zpp .cd li::before{content:'✓  ';color:#047756}
.zft{position:absolute;inset:0;background:#fff;font-family:'Geist';padding:22px 150px;opacity:0}
.zft h2{margin:0 0 4px;font:500 22px 'Geist'}.zft p.s{margin:0 0 14px;font:400 11px 'Geist';color:#6b6b66}
.zft .fr2{display:flex;align-items:center;min-height:52px;border-top:1px solid #ecebe7;padding:0 6px}
.zft .fr2 b{width:200px;font:500 12px 'Geist'}.zft .fr2 span{flex:1;font:400 10.5px 'Geist';color:#6b6b66}.zft .fr2 em{width:100px;text-align:right;font-style:normal;font:500 11px 'Geist';color:#047756}
.zft .fr2.on{background:rgba(235,53,20,.06);box-shadow:inset 3px 0 0 ${ZROJO}}
.zpc{width:520px;border-radius:30px;background:#000;border:1.5px solid rgba(255,255,255,.14);overflow:hidden;box-shadow:0 50px 110px -30px rgba(0,0,0,.95),0 0 60px rgba(255,106,26,.15)}
.zpc .vh{display:flex;align-items:center;gap:12px;padding:14px 18px;font:800 22px var(--sans);color:#fff}
.zpc .vh i{width:46px;height:46px;border-radius:50%;overflow:hidden;display:block}.zpc .vh img{width:100%;height:100%;object-fit:cover}
.zpc .im{height:520px;overflow:hidden}.zpc .im img{width:100%;height:100%;object-fit:cover;object-position:50% 25%}
.zpc .cp{padding:16px 20px 22px;font:500 22px/1.45 var(--sans);color:#ececee;min-height:190px}
.zpc .cp b{font-weight:800;color:#fff;margin-right:8px}.zpc .cp .h{color:#7cb7ff}
.zcm{width:620px;border-radius:30px;background:#0b0b0d;border:1.5px solid rgba(255,255,255,.12);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);padding:24px 26px}
.zcm .ht2{font:800 24px var(--sans);color:#fff;margin-bottom:14px}
.zcm .c{display:flex;gap:12px;align-items:flex-start;margin-top:14px;opacity:0}
.zcm .c .a{width:44px;height:44px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;font:800 18px var(--sans);color:#fff;overflow:hidden}
.zcm .c .a img{width:100%;height:100%;object-fit:cover}
.zcm .c div{font:500 21px/1.35 var(--sans);color:#e8e8ea}.zcm .c div b{display:block;font-weight:800;font-size:17px;color:#fff}
.zcm .c.r{margin-left:56px}.zcm .c.r div{color:#ffd8bd}
.zcm .lk{margin-left:auto;color:#ff3040;flex:none;padding-top:8px;opacity:0}
.zem{display:flex;align-items:center;gap:26px}
.zem .nd{display:flex;flex-direction:column;align-items:center;gap:14px;opacity:0}
.zem .nd .bx{width:250px;height:330px;border-radius:26px;background:#0b0b0d;border:1.5px solid rgba(255,255,255,.14);box-shadow:0 40px 90px -30px rgba(0,0,0,.95);padding:18px;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.zem .nd.on .bx{border-color:rgba(255,122,26,.9);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 50px rgba(255,122,26,.3)}
.zem .nd>span{font:800 24px var(--sans);color:#fff;white-space:nowrap}
.zem .ar2{color:#ff8a3d;opacity:0;filter:drop-shadow(0 0 12px rgba(255,106,26,.7))}
.zem .mini{font:500 16px/1.35 var(--sans);color:#e8e8ea;padding:10px 12px;border-radius:14px;background:#262629}
.zem .mini b{color:#ffc23d}.zem .btn3{height:40px;border-radius:12px;background:#f2f2f4;color:#111;display:flex;align-items:center;justify-content:center;font:800 15px var(--sans)}
.zem .av3{width:84px;height:84px;border-radius:50%;overflow:hidden;align-self:center;border:3px solid #fff}.zem .av3 img{width:100%;height:100%;object-fit:cover}
.zem .lg4{display:flex;justify-content:center;gap:16px;margin-top:auto}.zem .lg4 i{width:74px;height:74px;border-radius:20px;background:#141416;border:1.5px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center}
.zdm2{width:600px;padding:20px 24px;border-radius:24px;border:2px solid;display:flex;flex-direction:column;gap:10px;opacity:0}
.zdm2.si{border-color:rgba(91,227,141,.7);background:rgba(10,30,18,.9)}.zdm2.no{border-color:rgba(255,77,94,.7);background:rgba(40,8,12,.9)}
.zdm2 .hh{display:flex;align-items:center;gap:10px;font:800 24px var(--sans)}.zdm2.si .hh{color:#5be38d}.zdm2.no .hh{color:#ff6b78}
.zdm2 .m{font:500 21px/1.4 var(--sans);color:#f2f2f4;padding:12px 16px;border-radius:16px;background:rgba(255,255,255,.06);opacity:0}
.zdm2.no .m{text-decoration:line-through;text-decoration-color:#ff4d5e;color:#e9c2c6}
.zdm2 .m .bb{margin-top:10px;height:42px;border-radius:12px;background:#f2f2f4;color:#111;display:flex;align-items:center;justify-content:center;font:800 17px var(--sans);text-decoration:none}
.ztg{width:640px;border-radius:26px;background:#17212b;border:1.5px solid rgba(255,255,255,.1);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);overflow:hidden;font-family:var(--sans)}
.ztg .th{display:flex;align-items:center;gap:12px;padding:16px 20px;background:#202b36;font:800 22px var(--sans);color:#fff}
.ztg .th small{display:block;font:500 15px var(--sans);color:#7f91a4}
.ztg .tb2{padding:18px 20px;display:flex;flex-direction:column;gap:10px;min-height:380px}
.ztg .tm{max-width:82%;padding:12px 16px;border-radius:16px;font:500 20px/1.35 var(--sans);color:#fff;opacity:0}
.ztg .tm.u{align-self:flex-end;background:#2b5278}.ztg .tm.b{align-self:flex-start;background:#182533}
.ztg .tm code{font:600 17px var(--mono);color:#8fd0ff}
.zcp{width:1500px;border-radius:28px;background:linear-gradient(180deg,rgba(24,20,22,.96),rgba(12,10,12,.96));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);overflow:hidden}
.zcp .rw2{display:grid;grid-template-columns:330px 1fr 1fr;align-items:center;min-height:78px;border-top:1px solid rgba(255,255,255,.07);opacity:.18}
.zcp .rw2.h{min-height:110px;border-top:0;opacity:1}
.zcp .rw2>*{padding:0 26px}
.zcp .rw2 b{font:800 25px var(--sans);color:#b9b5bf}.zcp .rw2 span{display:flex;align-items:center;gap:12px;font:600 23px/1.3 var(--sans);color:#ece8ee}
.zcp .rw2 span i{flex:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;background:#2e9e5b}
.zcp .rw2 span i.no{background:#5a5660}
.zcp .rw2.on{opacity:1;background:rgba(255,106,26,.07)}.zcp .rw2.ok{opacity:.85}
.zcp .rw2.h span{justify-content:center;font:400 44px/1 Impact,'Arial Narrow Bold',sans-serif;letter-spacing:.02em}
`);

/* zPrecio: pagina de precios recreada. at: { sinplanes, gratis, seis, tres, uno, ejemplo } */
ESC_TIPOS.zPrecio = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const SEG = [[90, 150, '1–2', 'Free'], [160, 255, '3–10', '$6/mo'], [265, 520, '11–100', '$3/mo'], [530, 780, '101+', '$1/mo'], [790, 1020, '2k – 10k', '$1/mo']];
  const pag = `<div class="zpp" style="opacity:1"><div class="nb">${zlogo(18)}<span>Product ⌄</span><span>Platforms ⌄</span><span>Docs</span><span style="color:#1a1a1a">Pricing</span><span>Affiliates</span>` +
    `<span class="r"><span>Log in</span><b>Start for free</b></span></div><div class="lab">Pricing</div><h1>Pay for what you use</h1>` +
    `<div class="sub" data-k="sub">One platform: social accounts, blogs, ads, phone numbers, calls, SMS, RCS, WhatsApp, iMessage.<br><b data-k="nop" style="font-weight:500">Every feature included, no plans, no seats.</b></div>` +
    `<div class="ya">${icon('users', 11, 2)} Your accounts</div><div class="nn" data-k="nn">1</div>` +
    `<div class="sl">${SEG.map(g => `<i class="sg" style="left:${g[0] - 90}px;width:${g[1] - g[0]}px"><i></i></i>`).join('')}<i class="kn"></i>` +
    SEG.map(g => `<span class="tl2" style="left:${g[0] - 90}px">${g[2]}<b>${g[3]}</b></span>`).join('') + '</div>' +
    `<div class="chs"><span class="r" data-k="c1">2 accounts free</span><span data-k="c2">8 accounts × $6 · <em>$48</em></span></div>` +
    `<div class="cds"><div class="cd" data-k="build"><div class="t">Build<small>Usage-based, card on file.</small></div><div class="pr">$<span data-k="pr">0</span><small>/month</small><em data-k="avg"></em></div>` +
    `<div class="bt2">Start for free</div><ul><li>2 accounts free to start, no credit card</li><li>Every feature included, nothing gated behind a plan</li></ul></div>` +
    `<div class="cd e"><div class="t">Enterprise<small>The same platform, custom terms.</small></div><div class="pr" style="color:#8a8984">Custom</div><ul><li>Available past 2.000 accounts</li></ul></div></div></div>`;
  const e = escenaT(s.t[0], s.t[1], zPaso('PRECIOS', 'Pagas por cuenta conectada') + ventanaZ('zernio.com/pricing', [['pp', pag]]), (t, { a, b }) => {
    const [hd, win] = e.$, T = {}; for (const k of Object.keys(s.at)) T[k] = at(k);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    // cuentas: 1 -> 2 (gratis) -> 10 (ejemplo)
    const n = t < T.gratis ? 1 : t < T.ejemplo - .3 ? 2 : Math.round(lerp(2, 10, P(t, T.ejemplo - .3, 1.4, E.io3)));
    const nn = win.querySelector('[data-k="nn"]'); if (nn._t !== n) { nn._t = n; nn.textContent = n; }
    const kx = n <= 2 ? lerp(90, 150, (n - 1)) : lerp(160, 255, (n - 3) / 7);
    win.querySelector('.kn').style.left = (kx - 90).toFixed(1) + 'px';
    win.querySelectorAll('.sg').forEach((g, i) => { const f = clamp((kx - SEG[i][0]) / (SEG[i][1] - SEG[i][0])); g.firstChild.style.width = (f * 100).toFixed(1) + '%'; });
    const act = t >= T.uno - .2 ? 3 : t >= T.tres - .2 ? 2 : t >= T.seis - .2 ? 1 : t >= T.gratis - .2 ? 0 : -1;
    win.querySelectorAll('.tl2').forEach((l, i) => l.classList.toggle('on', i === act && t < T.ejemplo - .3));
    win.querySelector('[data-k="c1"]').style.opacity = P(t, T.gratis, .35).toFixed(3);
    win.querySelector('[data-k="c2"]').style.opacity = P(t, T.ejemplo + .9, .35).toFixed(3);
    const pr = Math.round(48 * P(t, T.ejemplo + .9, 1.2, E.out3)), pe = win.querySelector('[data-k="pr"]'); if (pe._t !== pr) { pe._t = pr; pe.textContent = pr; }
    const av = win.querySelector('[data-k="avg"]'), at2 = pr === 48 ? 'avg $4.80 per account' : ''; if (av._t !== at2) { av._t = at2; av.textContent = at2; }
    zHL(win.querySelector('[data-k="nop"]'), t >= T.sinplanes && t < T.gratis - .3);
    zHL(win.querySelector('[data-k="build"]'), t >= T.ejemplo + 1.5);
    pintarVentana(win, t, { pgs: [[a, 'pp', 'zernio.com/pricing']],
      zoom: [[a, 1, [600, 312]], [T.sinplanes, 1.55, [600, 135]], [T.gratis - .3, 1.35, [440, 270]], [T.uno, 1.35, [600, 270]], [T.ejemplo + .6, 1.3, [600, 420]], [b - 1.2, 1, [600, 312]]] });
  });
  ['gratis', 'seis', 'tres', 'uno'].forEach(k => sfx(at(k) - .2, 'tick', { vol: .45 })); sfx(at('ejemplo') + .9, 'subida', { vol: .45 });
  return e;
};

/* zIncluye: tabla de funciones (Compare all features). { filas:[[nombre, detalle, valor, at]] } */
ESC_TIPOS.zIncluye = s => {
  const P0 = s.t[0], F = s.filas;
  const pag = `<div class="zft" style="opacity:1"><h2>Every feature on every account</h2><p class="s">Build · Starting at $0/month</p>` +
    F.map(f => `<div class="fr2"><b>${f[0]}</b><span>${f[1]}</span><em>${f[2]}</em></div>`).join('') + '</div>';
  const e = escenaT(s.t[0], s.t[1], zPaso('INCLUIDO', 'Todo, en cada cuenta') + ventanaZ('zernio.com/pricing#features', [['ft', pag]]), (t, { a }) => {
    const [hd, win] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    const rows = [...win.querySelectorAll('.fr2')], T = F.map(f => A(f[3], P0));
    rows.forEach((r, i) => { r.classList.toggle('on', t >= T[i] - .1 && (i === rows.length - 1 || t < T[i + 1] - .1)); r.style.opacity = (.35 + .65 * P(t, T[i] - .3, .3)).toFixed(3); });
    pintarVentana(win, t, { pgs: [[a, 'ft', 'zernio.com/pricing#features']], zoom: [[a, 1.25, [600, 260]]] });
  });
  F.forEach(f => sfx(A(f[3], P0) - .2, 'tick', { vol: .4 }));
  return e;
};

/* zDesc: la descripcion que escribe Claude + lo que lleva. { foto, lineas:[[texto, cls]], items:[[ico, txt, at, no?]] , desde } */
ESC_TIPOS.zDesc = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], zPaso('DESCRIPCIONES', 'Con la voz de tu modelo') +
    `<div class="L zpc"><div class="vh"><i><img alt="" src="${IMG('ig-avatar')}"></i>${PERFIL.usuario}</div><div class="im"><img alt="" src="${IMG(s.foto)}"></div>` +
    `<div class="cp"><b>${PERFIL.usuario}</b>${s.lineas.map(l => `<span class="${l[1] || ''}"></span>`).join('<br>')}</div></div>` +
    s.puntos.map(it => `<div class="L tag3" style="--c:${it[3] ? NEON.r : NEON.v}">${icon(it[0], 28, 2.4)}${it[1]}</div>`).join(''), (t, { a }) => {
    const [hd, pc, ...tg] = e.$, t0 = A(s.desde, P0);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(pc, t, a + .2, 560, 590, { s0: .92, dy: 40, s: .96 });
    [...pc.querySelectorAll('.cp span')].forEach((sp, i) => escribir(sp, s.lineas[i][0], t, t0 + i * 1.1, t0 + i * 1.1 + 1));
    tg.forEach((g, i) => { fitW(g, 900); ent(g, t, A(s.puntos[i][2], P0) - .25, 1340, 360 + i * 110, { dx: 40, dy: 0 }); });
  });
  sfx(A(s.desde, P0), 'tecleo', { vol: .4 }); s.puntos.forEach(it => sfx(A(it[2], P0) - .25, 'tick', { vol: .4 }));
  return e;
};

/* zForm: formulario New Automation recreado. at: { abre, vacio, publica, like, retraso } */
ESC_TIPOS.zForm = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const form = `<div class="dim" style="opacity:1"></div><div class="pnl" style="transform:none;width:430px;overflow:hidden"><h2>New Automation</h2>` +
    `<label class="lb">Name <b>*</b></label><div class="fld">Comentarios · itsrubylane</div>` +
    `<label class="lb">Account <b>*</b></label><div class="fld" style="gap:6px">${logo('instagram', 12)}@itsrubylane</div>` +
    `<div class="tg" style="justify-content:flex-start;gap:8px">Trigger <span class="chip">Comment</span></div>` +
    `<div data-k="kw"><label class="lb">TRIGGER KEYWORDS (OPTIONAL)</label><p style="margin:-2px 0 5px;font:400 9px 'Geist';color:#6b6b66">Leave empty to trigger on any comment.</p>` +
    `<div class="fld"><span class="ph">info, price, link (comma separated)</span></div></div>` +
    `<label class="lb">DM MESSAGE <b>*</b></label><div class="fld" style="height:44px;align-items:flex-start;padding-top:7px;font-size:10px">Holaa, gracias por comentar. Te dejo donde subo lo que no publico aquí</div>` +
    `<div data-k="pub" style="margin-top:10px;font:500 10px 'Geist';color:${ZROJO}">+ Add public reply</div>` +
    `<div class="tg" data-k="like">Like the comment<i class="sw"></i></div>` +
    `<div data-k="ret"><label class="lb">Send the DM</label><div class="fld" style="justify-content:space-between"><span data-k="retTx">Immediately</span>⌄</div></div></div>`;
  const e = escenaT(s.t[0], s.t[1], zPaso('EN ZERNIO', 'Responde cualquier comentario') +
    ventanaZ('zernio.com/dashboard/inbox-campaigns', [['f', zAutos() + form]]), (t, { a, b }) => {
    const [hd, win] = e.$, T = {}; for (const k of Object.keys(s.at)) T[k] = at(k);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    zHL(win.querySelector('[data-k="kw"]'), t >= T.vacio - .2 && t < T.publica - .2);
    zHL(win.querySelector('[data-k="pub"]'), t >= T.publica - .2 && t < T.like - .2);
    win.querySelector('[data-k="like"] .sw').classList.toggle('on', t >= T.like);
    zHL(win.querySelector('[data-k="like"]'), t >= T.like - .2 && t < T.retraso - .2);
    const rt = win.querySelector('[data-k="retTx"]'), rx = t >= T.retraso + .3 ? 'After 2 minutes' : 'Immediately'; if (rt._t !== rx) { rt._t = rx; rt.textContent = rx; }
    zHL(win.querySelector('[data-k="ret"]'), t >= T.retraso - .2);
    pintarVentana(win, t, { pgs: [[a, 'f', 'zernio.com/dashboard/inbox-campaigns']],
      zoom: [[a, 1.15, [980, 250]], [T.vacio - .2, 1.6, [990, 220]], [T.publica - .2, 1.55, [990, 420]], [b - 1, 1.15, [980, 300]]] });
  });
  ['vacio', 'publica', 'like', 'retraso'].forEach(k => sfx(at(k) - .2, 'tick', { vol: .45 }));
  return e;
};

/* zComentarios: hilo de comentarios con respuestas casuales. { pares:[[usuario, comentario, respuesta, at]] } */
ESC_TIPOS.zComentarios = s => {
  const P0 = s.t[0], PR = s.pares;
  const AV2 = `<span class="a"><img alt="" src="${IMG('ig-avatar')}"></span>`;
  const e = escenaT(s.t[0], s.t[1], zPaso('RESPUESTAS', 'Casuales, que le calcen a todo') +
    `<div class="L zcm"><div class="ht2">Comentarios</div>` + PR.map((p, i) => `<div class="c"><span class="a" style="background:${['#3a5bff', '#2e9e5b', '#b04bff', '#e23a4a'][i % 4]}">${p[0][0].toUpperCase()}</span>` +
      `<div><b>${p[0]}</b>${p[1]}</div><span class="lk">${SVG_CORAZON.replace(/width="40" height="40"/, 'width="22" height="22"')}</span></div><div class="c r">${AV2}<div><b>${PERFIL.usuario}</b>${p[2]}</div></div>`).join('') + '</div>', (t, { a }) => {
    const [hd, cm] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(cm, t, a + .2, CX, 590, { s0: .94, dy: 40, s: 1.15 });
    const cs = [...cm.querySelectorAll('.c')];
    PR.forEach((p, i) => { const ti = A(p[3], P0), c1 = cs[i * 2], c2 = cs[i * 2 + 1];
      const p1 = P(t, ti - .6, .35), p2 = P(t, ti - .1, .35); c1.style.opacity = p1.toFixed(3); c2.style.opacity = p2.toFixed(3);
      c2.style.transform = `translateY(${((1 - p2) * 12).toFixed(1)}px)`;
      const lk = c1.querySelector('.lk'); lk.style.opacity = P(t, ti - .3, .25).toFixed(3); lk.style.transform = `scale(${(1 + .5 * bump(t, ti - .3, .35)).toFixed(3)})`; });
  });
  PR.forEach(p => { sfx(A(p[3], P0) - .6, 'notificacion', { vol: .3 }); sfx(A(p[3], P0) - .1, 'pop', { vol: .4 }); });
  return e;
};

/* zEmbudo: comentario -> mensaje privado -> link secundario -> Fanvue / Telegram. at: { c, dm, lt, fin } */
ESC_TIPOS.zEmbudo = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const flecha = `<span class="ar2">${icon('arrowRight', 54, 2.6)}</span>`;
  const e = escenaT(s.t[0], s.t[1], zPaso('EL CAMINO', 'Del comentario a tu link') +
    `<div class="L zem">` +
    `<div class="nd"><div class="bx"><div class="mini"><b>carlos_88</b><br>qué linda foto</div><div class="mini" style="background:#3a2a20">${PERFIL.usuario}<br>ay, gracias, me sacaste una sonrisa</div></div><span>1 · Comenta</span></div>${flecha}` +
    `<div class="nd"><div class="bx"><div class="mini">Holaa, gracias por comentar. Te dejo donde subo lo que no publico aquí</div><div class="btn3">Ver más de mí</div></div><span>2 · Mensaje privado</span></div>${flecha}` +
    `<div class="nd"><div class="bx" style="background:linear-gradient(180deg,#1f3b2c,#0f1712)"><div class="av3"><img alt="" src="${IMG('ig-avatar')}"></div><b style="text-align:center;font:800 20px var(--sans);color:#fff">Ruby Lane</b>` +
    `<div class="btn3">Contenido exclusivo</div><div class="btn3">Mi canal privado</div></div><span>3 · Tu Linktree</span></div>${flecha}` +
    `<div class="nd"><div class="bx" style="justify-content:center"><div class="lg4"><i>${logo('fanvue', 46)}</i><i>${logo('telegram', 46)}</i></div><b style="text-align:center;font:700 19px var(--sans);color:#b9b5bf;margin-top:16px">Ahí ve tu contenido</b></div><span>4 · Fanvue o Telegram</span></div></div>`, (t, { a }) => {
    const [hd, em] = e.$, T = ['c', 'dm', 'lt', 'fin'].map(at);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(em, t, a + .1, CX, 600, { dy: 0, s: 1.35 });
    const nds = [...em.querySelectorAll('.nd')], ars = [...em.querySelectorAll('.ar2')];
    nds.forEach((n, i) => { const p = P(t, T[i] - .3, .45, E.back); n.style.opacity = clamp(p * 2).toFixed(3); n.style.transform = `translateY(${((1 - p) * 30).toFixed(1)}px)`;
      n.classList.toggle('on', t >= T[i] - .1 && (i === 3 || t < T[i + 1] - .1)); });
    ars.forEach((r, i) => { r.style.opacity = P(t, T[i + 1] - .45, .3).toFixed(3); });
  });
  ['c', 'dm', 'lt', 'fin'].forEach(k => sfx(at(k) - .3, 'pop', { vol: .45 }));
  return e;
};

/* zDMs: mensajes buenos (indirectos) vs malos (directos). { si:[[texto, boton, at]], no:[[texto, at]] } */
ESC_TIPOS.zDMs = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], zPaso('EL MENSAJE', 'Indirecto, nunca venta directa') +
    `<div class="L zdm2 no"><div class="hh">${icon('circleX', 28, 2.6)}Así no</div>${s.no.map(m => `<div class="m">${m[0]}</div>`).join('')}</div>` +
    `<div class="L zdm2 si"><div class="hh">${icon('circleCheck', 28, 2.6)}Así sí</div>${s.si.map(m => `<div class="m">${m[0]}${m[1] ? `<div class="bb">${m[1]}</div>` : ''}</div>`).join('')}</div>`, (t, { a }) => {
    const [hd, no, si] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    const tn = A(s.no[0][1], P0), ts = A(s.si[0][2], P0);
    ent(no, t, tn - .4, 520, 560, { s0: .94, s: 1.2 }); ent(si, t, ts - .4, 1380, 560, { s0: .94, s: 1.2 });
    [...no.querySelectorAll('.m')].forEach((m, i) => { m.style.opacity = P(t, A(s.no[i][1], P0) - .2, .3).toFixed(3); });
    [...si.querySelectorAll('.m')].forEach((m, i) => { const p = P(t, A(s.si[i][2], P0) - .2, .35); m.style.opacity = p.toFixed(3); m.style.transform = `translateY(${((1 - p) * 14).toFixed(1)}px)`; });
  });
  s.no.forEach(m => sfx(A(m[1], P0) - .2, 'descarte', { vol: .4 })); s.si.forEach(m => sfx(A(m[2], P0) - .2, 'pop', { vol: .45 }));
  return e;
};

/* zBot: el bot de interaccion (Telegram + tu PC). { msgs:[[u|b, html, at]], pc:{at} , tags:[[ico, txt, at]] } */
ESC_TIPOS.zBot = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], zPaso('EL BOT DEL CURSO', 'Corre en tu computador') +
    `<div class="L ztg"><div class="th">${logo('telegram', 34)}<div>Tu bot de interacción<small>bot</small></div></div><div class="tb2">` +
    s.msgs.map(m => `<div class="tm ${m[0]}">${m[1]}</div>`).join('') + '</div></div>' +
    s.notas.map(g => `<div class="L tag3" style="--c:${NEON[g[3] || 'o']}">${icon(g[0], 28, 2.4)}${g[1]}</div>`).join(''), (t, { a }) => {
    const [hd, tg, ...ts] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(tg, t, a + .2, 540, 590, { s0: .94, dy: 40, s: 1.3 });
    [...tg.querySelectorAll('.tm')].forEach((m, i) => { const p = P(t, A(s.msgs[i][2], P0) - .2, .3); m.style.opacity = p.toFixed(3); m.style.transform = `translateY(${((1 - p) * 12).toFixed(1)}px)`; });
    ts.forEach((g, i) => { fitW(g, 820); ent(g, t, A(s.notas[i][2], P0) - .25, 1380, 380 + i * 115, { dx: 40, dy: 0 }); });
  });
  s.msgs.forEach(m => sfx(A(m[2], P0) - .2, 'notificacion', { vol: .3 })); s.notas.forEach(g => sfx(A(g[2], P0) - .25, 'tick', { vol: .4 }));
  return e;
};

/* zCompara: tabla Zernio vs bot. { filas:[[criterio, zernio, bot, at, zOk, bOk]] } */
ESC_TIPOS.zCompara = s => {
  const P0 = s.t[0], F = s.filas;
  const ck = ok => `<i class="${ok === false ? 'no' : ''}">${icon(ok === false ? 'minus' : 'check', 18, 3)}</i>`;
  const e = escenaT(s.t[0], s.t[1], `<div class="L zcp"><div class="rw2 h"><b></b><span>${zlogo(46)}</span><span style="color:#8fd0ff">${logo('telegram', 46)}&nbsp;BOT</span></div>` +
    F.map(f => `<div class="rw2"><b>${f[0]}</b><span>${ck(f[4])}${f[1]}</span><span>${ck(f[5])}${f[2]}</span></div>`).join('') + '</div>', (t, { a, b }) => {
    const [cp] = e.$;
    ent(cp, t, a + .1, CX, CY, { s0: .95, dy: 30, s: 1.18 });
    const rows = [...cp.querySelectorAll('.rw2:not(.h)')], T = F.map(f => A(f[3], P0));
    rows.forEach((r, i) => { const tn = i < rows.length - 1 ? T[i + 1] : b + 1; r.classList.toggle('on', t >= T[i] - .1 && t < tn - .1); r.classList.toggle('ok', t >= tn - .1); });
  });
  F.forEach(f => sfx(A(f[3], P0) - .2, 'tick', { vol: .4 }));
  return e;
};
