/* ---------- CLASE ZERNIO · escenas a medida (las anclas `at` son palabras de la voz: 'palabra@fN') ---------- */
css(`
.zsg .brs i{transform-origin:50% 100%}
.zdu{display:flex;align-items:center;gap:60px}
.zdu .bx{display:flex;flex-direction:column;align-items:center;gap:22px}
.zdu .bx .cj{height:170px;padding:0 50px;border-radius:40px;background:#F0EFEB;display:flex;align-items:center;justify-content:center;box-shadow:0 40px 90px -30px rgba(0,0,0,.95)}
.zdu .bx .cj.d{background:#262624;border:1.5px solid rgba(255,255,255,.12)}
.zdu .bx span{font:800 30px var(--sans);color:#fff}
.zdu .mas{font:400 120px/1 Impact,sans-serif;color:#ff8a3d;text-shadow:0 0 30px rgba(255,106,26,.6)}
.zfl .rimg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.zfl .rbg{position:absolute;left:-30px;top:-30px;width:calc(100% + 60px);height:calc(100% + 60px);object-fit:cover;filter:blur(22px) brightness(.55)}
.zn img[data-logo="x"],.zn img[data-logo="threads"],.zn img[data-logo="github"],.zsg img[data-logo="github"]{filter:invert(1)}
.zn .tile:has(img[data-logo="tiktok"]){background:#000;border-color:#000}
.zfl .rh{font-size:26px}.zfl .cm div{font-size:21px}.zfl .cm div b{font-size:18px}.zfl .bu{font-size:21px}.zfl .bu .bb{font-size:19px;height:48px}
.zcl .um{font-size:28px}.zcl .tl{font-size:26px}.zcl .ar{font-size:28px}
.zfl .rsh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 50%,rgba(0,0,0,.8))}
.zfl .cap3{position:absolute;left:20px;right:20px;top:40%;text-align:center;font:900 36px/1.15 var(--sans);color:#fff;text-shadow:0 3px 14px rgba(0,0,0,.8)}
.zfl .cap3 span{color:#ffc23d}
.zfl .lv{position:absolute;left:16px;right:70px;bottom:46px;display:flex;flex-direction:column;gap:8px}
.zfl .lv div{opacity:0;padding:8px 12px;border-radius:14px;background:rgba(0,0,0,.6);font:600 17px var(--sans);color:#fff}
.zfl .lv b{color:#ffc23d}
`);

/* zDuo: el logo de Zernio + el de Claude. at: { a, b } */
ESC_TIPOS.zDuo = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], `<div class="L zdu"><div class="bx"><div class="cj">${zlogo(70)}</div><span>Publica y responde</span></div><i class="mas">+</i>` +
    `<div class="bx"><div class="cj d">${logo('claude', 96)}<b style="font:800 54px var(--sans);color:#f2efe9;margin-left:18px">Claude Code</b></div><span>Lo maneja por ti</span></div></div>`, (t, { a }) => {
    const [du] = e.$, [b1, mas, b2] = [...du.children];
    ent(du, t, a, CX, CY, { dy: 0 });
    pop(b1, P(t, A(s.at.a, P0) - .3, .5), .6); pop(mas, P(t, A(s.at.a, P0), .4), .3); pop(b2, P(t, A(s.at.b, P0) - .3, .5), .6);
  });
  sfx(A(s.at.a, P0) - .3, 'pop', { vol: .5 }); sfx(A(s.at.b, P0) - .3, 'pop', { vol: .5 });
  return e;
};

/* zSign: crear la cuenta. at: { google, dentro } */
ESC_TIPOS.zSign = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const bars = Array.from({ length: 26 }, (_, i) => `<i style="height:${(38 + 58 * Math.abs(Math.sin(i * 1.7 + .4))).toFixed(0)}%"></i>`).join('');
  const sign = `<div class="zsg" style="opacity:1"><div class="brs">${bars}</div><div class="lgz">${zlogo(26)}</div><div class="crd"><h2>Create an account</h2>` +
    `<div class="ob" data-k="google">${logo('google', 17)}Continue with Google</div><div class="ob">${logo('github', 17)}Continue with GitHub</div>` +
    `<div class="sep">Sign up with email ⌄</div><small>Already have an account? <b>Sign in</b></small></div>` +
    `<div class="lgl">By continuing, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b></div></div>`;
  const e = escenaT(s.t[0], s.t[1], zPaso('PASO 1', 'Crea tu cuenta') + ventanaZ('zernio.com/signup', [['sign', sign], ['con', zSide('Connections') + zConexiones()]]), (t, { a }) => {
    const [hd, win] = e.$, tg = at('google'), td = at('dentro');
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    pintarVentana(win, t, { pgs: [[a, 'sign', 'zernio.com/signup'], [td, 'con', 'zernio.com/dashboard/connections']],
      cur: [[a + .4, [760, 540]], [tg, '[data-k="google"]'], [td + .7, [640, 360]]], clics: [tg],
      zoom: [[a, 1.3, [600, 290]], [td - .3, 1, [600, 312]]] });
    zHL(win.querySelector('[data-k="google"]'), t >= tg - .3 && t < td);
    win.querySelectorAll('.brs i').forEach((b, i) => { b.style.transform = `scaleY(${(1 + .07 * Math.sin(t * 1.4 + i * .8)).toFixed(3)})`; });
  });
  sfx(at('google'), 'click', { vol: .7 }); sfx(at('dentro') - .1, 'aire', { vol: .5 });
  return e;
};

/* zConectar: nueva conexion -> Instagram -> permisos -> conectada. at: { nueva, ig, con, sesion, permisos, vuelves, conectada, vence } */
ESC_TIPOS.zConectar = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const pag = zSide('Connections') + zConexiones() + zPanelConexion() + `<div class="dim" data-k="dim2"></div>` + zPermisoIG();
  const e = escenaT(s.t[0], s.t[1], zPaso('PASO 2', 'Conecta tu Instagram') + ventanaZ('zernio.com/dashboard/connections', [['con', pag]]) +
    `<div class="L tag3" style="--c:${NEON.a}">${icon('clock', 28, 2.4)}El permiso vence cada ~60 días: si tus reels no salen, reconecta</div>`, (t, { a }) => {
    const [hd, win, tag] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    const T = {}; for (const k of Object.keys(s.at)) T[k] = at(k);
    const z = win.querySelector('[data-pg="con"]'), opt = z.querySelector('[data-k="opt"]');
    pintarVentana(win, t, { pgs: [[a, 'con', 'zernio.com/dashboard/connections'], [T.sesion - .1, 'con', 'instagram.com/oauth/authorize'], [T.vuelves, 'con', 'zernio.com/dashboard/connections']],
      cur: [[a + .4, [640, 380]], [T.nueva, '[data-k="nueva"]'], [T.ig, '[data-k="instagram-chv"]'], [T.con, '[data-k="conIG"]'], [T.permisos, '[data-k="permitir"]'], [T.vuelves + .6, [560, 300]]],
      clics: [T.nueva, T.ig, T.con, T.permisos],
      zoom: [[a, 1, [600, 312]], [T.nueva + .3, 1.3, [1010, 230]], [T.sesion - .2, 1.2, [600, 312]], [T.vuelves, 1, [600, 312]], [T.conectada - .3, 1.45, '[data-pc="instagram"]'], [T.vence + 2, 1, [600, 312]]],
      prep: () => { z.querySelector('.pnl').style.transform = 'none'; opt.style.height = '86px'; } });
    zPanel(win, 'con', t, T.nueva + .15, T.vuelves - .25);
    const po = P(t, T.ig + .1, .35, E.out3) * (1 - P(t, T.vuelves - .25, .3));
    opt.style.height = (86 * po).toFixed(1) + 'px'; opt.style.borderColor = po > .02 ? '#ecebe7' : 'transparent';
    const ig = z.querySelector('[data-k="ig"]'), pi = P(t, T.sesion - .1, .4, E.out3) * (1 - P(t, T.vuelves - .3, .3));
    ig.style.opacity = pi.toFixed(3); ig.style.transform = `scale(${lerp(.92, 1, pi).toFixed(3)})`; z.querySelector('[data-k="dim2"]').style.opacity = (pi * .9).toFixed(3);
    const card = z.querySelector('[data-pc="instagram"]'), conectada = t >= T.vuelves;
    card.classList.toggle('con', conectada);
    const sp = card.querySelector('.cn span'), tx = conectada ? 'Disconnect' : '+ Connect'; if (sp._t !== tx) { sp._t = tx; sp.textContent = tx; }
    zHL(card, t >= T.conectada - .3 && t < T.vence + 2);
    zHL(z.querySelector('[data-k="nueva"]'), t >= T.nueva - .4 && t < T.nueva + .5);
    zHL(z.querySelector('[data-pr="instagram"]'), t >= T.ig - .3 && t < T.con - .1);
    zHL(z.querySelector('[data-k="conIG"]'), t >= T.con - .3 && t < T.sesion);
    zHL(z.querySelector('[data-k="permitir"]'), t >= T.permisos - .4 && t < T.vuelves);
    fitW(tag, 1500); ent(tag, t, T.vence - .2, CX, 985, { ease: E.back, s0: .6, dy: 0 });
  });
  ['nueva', 'ig', 'con', 'permisos'].forEach(k => sfx(at(k), 'click', { vol: .7 }));
  sfx(at('nueva') + .15, 'aire', { vol: .45 }); sfx(at('conectada') - .2, 'brillo', { vol: .6 }); sfx(at('vence') - .2, 'pop', { vol: .45 });
  return e;
};

/* zLlave: API Keys -> Create key -> nombre -> lectura y escritura -> la llave (una vez) -> fila. at: { entra, crear, nombre, lectura, creala, copia, nunca } */
ESC_TIPOS.zLlave = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const e = escenaT(s.t[0], s.t[1], zPaso('PASO 3', 'Crea tu llave (API key)') +
    ventanaZ('zernio.com/dashboard/connections', [['con', zSide('Connections') + zConexiones()], ['keys', zSide('API Keys') + zLlaves() + zPanelLlave()]]) +
    `<div class="L tag3" style="--c:${NEON.r}">${icon('lock', 28, 2.4)}Es como tu contraseña: nunca la compartas</div>`, (t, { a, b }) => {
    const [hd, win, tag] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    const T = {}; for (const k of Object.keys(s.at)) T[k] = at(k);
    const zc = win.querySelector('[data-pg="con"]'), zk = win.querySelector('[data-pg="keys"]'), q = sel => zk.querySelector(sel);
    zc.querySelector('[data-pc="instagram"]').classList.add('con');
    const fila = q('[data-k="fila"]'), mdl = q('[data-k="mdl"]');
    pintarVentana(win, t, { pgs: [[a, 'con', 'zernio.com/dashboard/connections'], [T.entra, 'keys', 'zernio.com/dashboard/api-keys']],
      cur: [[a + .4, [520, 300]], [T.entra, '[data-pg="con"] [data-nv="API Keys"]'], [T.crear, '[data-pg="keys"] [data-k="crear"]'], [T.nombre, '[data-pg="keys"] [data-k="nombre"]'],
        [T.lectura, '[data-pg="keys"] [data-k="perm"]'], [T.creala, '[data-pg="keys"] [data-k="crearK"]'], [T.copia, '[data-pg="keys"] [data-k="copiar"]'], [T.nunca + .6, [700, 340]]],
      clics: [T.entra, T.crear, T.nombre, T.creala, T.copia],
      zoom: [[a, 1, [600, 312]], [T.entra - .5, 1.35, [140, 330]], [T.crear - .2, 1, [600, 312]], [T.crear + .4, 1.35, [1010, 200]], [T.creala + .3, 1.35, [600, 312]],
        [T.nunca - .2, 1, [600, 312]], [T.nunca + .6, 1.4, '[data-pg="keys"] [data-k="fila"]'], [b - 1.6, 1, [600, 312]]],
      prep: () => { q('.pnl').style.transform = 'none'; fila.style.display = 'flex'; mdl.style.opacity = 1; } });
    zPanel(win, 'keys', t, T.crear + .15, T.creala + .35);
    const fl = q('[data-k="nombre"]');
    fl.classList.toggle('f', t >= T.nombre && t < T.lectura);
    if (t >= T.nombre + .15) { if (!fl._tx) { fl._tx = 1; fl.innerHTML = '<span></span>'; } escribir(fl.firstChild, 'claude', t, T.nombre + .15, T.nombre + .75); }
    else if (fl._tx) { fl._tx = 0; fl.innerHTML = '<span class="ph">e.g., Production API Key</span>'; }
    const pm = P(t, T.creala + .4, .35, E.out3) * (1 - P(t, T.nunca - .3, .3));
    mdl.style.opacity = pm.toFixed(3); mdl.style.transform = `scale(${lerp(.94, 1, pm).toFixed(3)})`;
    const ct = q('[data-k="copTx"]'), cx = t >= T.copia ? 'Copied' : 'Copy'; if (ct._t !== cx) { ct._t = cx; ct.textContent = cx; }
    const lista = t >= T.nunca - .25;
    fila.style.display = lista ? 'flex' : 'none'; q('[data-k="vacio"]').style.display = lista ? 'none' : 'flex';
    const nk = q('[data-k="nkeys"]'), nt = lista ? '1' : '0'; if (nk._t !== nt) { nk._t = nt; nk.textContent = nt; }
    zHL(zc.querySelector('[data-nv="API Keys"]'), t >= T.entra - .4 && t < T.entra + .2);
    zHL(q('[data-k="crear"]'), t >= T.crear - .4 && t < T.crear + .3);
    zHL(q('[data-k="perm"]'), t >= T.lectura - .3 && t < T.creala - .2);
    zHL(q('[data-k="crearK"]'), t >= T.creala - .4 && t < T.creala + .3);
    zHL(q('.key'), t >= T.creala + .5 && t < T.nunca - .3);
    zHL(fila, t >= T.nunca + .3);
    fitW(tag, 1500); ent(tag, t, T.nunca - .1, CX, 985, { ease: E.back, s0: .6, dy: 0 });
  });
  ['entra', 'crear', 'nombre', 'creala', 'copia'].forEach(k => sfx(at(k), 'click', { vol: .7 }));
  sfx(at('nombre') + .15, 'tecleo', { vol: .45 }); sfx(at('creala') + .4, 'brillo', { vol: .5 }); sfx(at('nunca') - .1, 'fallo', { vol: .4 });
  return e;
};

/* zClaude: chat de Claude Code. { paso:[n, txt], um, umAt, pegado, lineas:[[ok|w, txt, at]], ar, arAt } */
ESC_TIPOS.zClaude = s => {
  const P0 = s.t[0], L = s.lineas || [];
  const e = escenaT(s.t[0], s.t[1], zPaso(s.paso[0], s.paso[1]) +
    `<div class="L zcl"><div class="ch">${logo('claude', 30)}Claude Code<small>~/mi-modelo</small></div><div class="bd"><div class="um"></div>` +
    L.map(l => `<div class="tl"><i class="${l[0] === 'w' ? 'w' : ''}">${icon(l[0] === 'w' ? 'zap' : 'check', 18, 3)}</i><span>${l[1]}</span></div>`).join('') +
    `<div class="ar">${bTxt(s.ar || '')}</div></div><div class="inp2">Escribe a Claude...</div></div>`, (t, { a }) => {
    const [hd, cl] = e.$, um = cl.querySelector('.um'), tu = A(s.umAt, P0);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(cl, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    um.style.opacity = P(t, tu - .2, .3).toFixed(3);
    if (s.pegado) { if (!um._p && t >= tu - .2) { um._p = 1; um.innerHTML = bTxt(s.um); } }
    else escribir(um, s.um, t, tu, tu + Math.min(2.2, s.um.length * .03));
    [...cl.querySelectorAll('.tl')].forEach((x, i) => { const p = P(t, A(L[i][2], P0) - .2, .35); x.style.opacity = p.toFixed(3); x.style.transform = `translateY(${((1 - p) * 14).toFixed(1)}px)`; });
    const ar = cl.querySelector('.ar'); ar.style.opacity = s.arAt ? P(t, A(s.arAt, P0) - .2, .4).toFixed(3) : 0;
  });
  sfx(A(s.umAt, P0) - .1, s.pegado ? 'pop' : 'tecleo', { vol: .45 }); L.forEach(l => sfx(A(l[2], P0) - .2, 'tick', { vol: .4 })); if (s.arAt) sfx(A(s.arAt, P0) - .2, 'brillo', { vol: .45 });
  return e;
};

/* zCarpeta: carpeta publicar/ + tarea programada. { hdAt, carpetas:[[nombre, at]], tarea:{ at, t, s } } */
ESC_TIPOS.zCarpeta = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], zPaso('PASO 5', 'Claude arma todo solo') +
    `<div class="L zfx"><div class="fh">${icon('folder', 32, 2.2)}publicar/</div>` +
    s.carpetas.map(c => `<div class="fr">${icon('folder', 26, 2)}${c[0]}/<span class="st p">pendiente</span></div><div class="fr s">${icon('video', 22, 2)}reel.mp4</div>`).join('') + '</div>' +
    `<div class="L ztk"><i>${icon('clock', 34, 2.2)}</i><div><b>${s.tarea.t}</b><small>${s.tarea.s}</small></div></div>`, (t, { a }) => {
    const [hd, fx, tk] = e.$;
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(fx, t, a + .25, 720, 590, { s0: .9, s: 1.15 });
    const rows = [...fx.querySelectorAll('.fr')];
    s.carpetas.forEach((c, i) => { const tc = A(c[1], P0);
      [rows[i * 2], rows[i * 2 + 1]].forEach((r, j) => { const p = P(t, tc - .2 + j * .25, .35); r.style.opacity = p.toFixed(3); r.style.transform = `translateX(${((1 - p) * 30).toFixed(1)}px)`; });
      const st = rows[i * 2].querySelector('.st'); st.style.opacity = P(t, tc + .5, .3).toFixed(3); });
    ent(tk, t, A(s.tarea.at, P0) - .3, 1480, 590, { ease: E.back, s0: .6, dy: 0, s: 1.15 });
  });
  s.carpetas.forEach(c => sfx(A(c[1], P0) - .2, 'tick', { vol: .4 })); sfx(A(s.tarea.at, P0) - .3, 'pop', { vol: .5 });
  return e;
};

/* zDiario: lo que hace Claude cada dia. { pasos:[[ico, txt, at]] (4), fotos:[[img, pos]], desc:[lineas], hora } */
ESC_TIPOS.zDiario = s => {
  const P0 = s.t[0], ps = s.pasos;
  const e = escenaT(s.t[0], s.t[1], zPaso('CADA DÍA', 'Claude lo hace por ti') +
    ps.map(p => `<div class="L zst"><i>${icon(p[0], 28, 2.2)}</i><span>${p[1]}</span></div>`).join('') +
    `<div class="L zdv"><div class="fs">${s.fotos.map(f => `<i><img alt="" src="${IMG(f[0])}" style="object-position:${f[1]}"></i>`).join('')}</div><i class="scn"></i>` +
    `<div class="okc">${icon('check', 24, 3)}Es el video correcto</div>` +
    `<div class="tx"><div class="fn">${s.ruta || 'publicar/01 - Domingo en casa/descripcion.txt'}</div>${s.desc.map((l, i) => `<p class="${i === 0 ? 'g' : i === s.desc.length - 1 ? 'h' : ''}"></p>`).join('')}</div>` +
    `<div class="up"><div class="lz">${zlogo(52)}</div><div class="pb"><i></i></div><div class="pt2">Subiendo reel.mp4 · 18 MB</div><div class="prg">${icon('calendarDays', 24, 2.4)}${s.hora}</div></div></div>`, (t, { a, b }) => {
    const [hd, ...r] = e.$, st = r.slice(0, ps.length), dv = r[ps.length], T = ps.map(p => A(p[2], P0));
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    st.forEach((x, i) => {
      const tn = i < ps.length - 1 ? T[i + 1] : b + 1, p = P(t, T[i] - .25, .35);
      put(x, { x: 380, y: 330 + i * 128, o: Math.max(p, P(t, a + .2 + i * .15, .35) * .55) });
      x.classList.toggle('on', t >= T[i] - .1 && t < tn - .1); x.classList.toggle('ok', t >= tn - .1);
    });
    ent(dv, t, a + .2, 1200, 600, { s0: .94, dy: 30 });
    // 1) cuadros
    const fs = [...dv.querySelectorAll('.fs i')], sc = dv.querySelector('.scn'), t0 = T[0];
    const vis1 = 1 - P(t, T[1] - .3, .3);
    fs.forEach((f, i) => { f.style.opacity = (P(t, t0 - .3 + i * .15, .3) * vis1).toFixed(3); f.classList.toggle('ok', t >= t0 + .6 + i * .45); });
    const ps2 = clamp((t - (t0 + .3)) / 1.9); sc.style.opacity = (t >= t0 + .3 && ps2 < 1 ? 1 : 0) * vis1; sc.style.left = (30 + ps2 * 834).toFixed(1) + 'px';
    const ok = dv.querySelector('.okc'); ok.style.opacity = (P(t, t0 + 2.2, .35) * vis1).toFixed(3);
    // 2) descripcion
    const tx = dv.querySelector('.tx'), v2 = P(t, T[1] - .2, .3) * (1 - P(t, T[2] - .3, .3)); tx.style.opacity = v2.toFixed(3);
    [...tx.querySelectorAll('p')].forEach((p, i) => { const ti = T[1] + .2 + i * .95; escribir(p, s.desc[i], t, ti, ti + .85); });
    // 3) subir y 4) programar
    const up = dv.querySelector('.up'); up.style.opacity = P(t, T[2] - .2, .3).toFixed(3);
    up.querySelector('.pb i').style.width = (P(t, T[2] + .2, 1.6, E.io3) * 100).toFixed(1) + '%';
    const pg = up.querySelector('.prg'), pp = P(t, T[3] - .2, .45, E.back); pg.style.opacity = clamp(pp * 2).toFixed(3); pg.style.transform = `scale(${lerp(.6, 1, pp).toFixed(3)})`;
  });
  ps.forEach(p => sfx(A(p[2], P0) - .2, 'tick', { vol: .45 })); sfx(A(ps[0][2], P0) + .3, 'subida', { vol: .4 }); sfx(A(ps[1][2], P0) + .2, 'tecleo', { vol: .4 }); sfx(A(ps[3][2], P0) - .2, 'brillo', { vol: .5 });
  return e;
};

/* zPosts: calendario de Zernio con los reels programados; el de hoy pasa a publicado. { eventos:[[celda, hora, titulo]], desde, publicado } */
ESC_TIPOS.zPosts = s => {
  const P0 = s.t[0];
  const e = escenaT(s.t[0], s.t[1], zPaso('EN ZERNIO', 'Tus reels, en su día y su hora') + ventanaZ('zernio.com/dashboard/posts-all', [['posts', zPosts()]]), (t, { a, b }) => {
    const [hd, win] = e.$, td = A(s.desde, P0), tp = A(s.publicado, P0);
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    if (!win._ev) { win._ev = s.eventos.map(ev => { const c = win.querySelector(`[data-dia="${ev[0]}"]`), d = document.createElement('div');
      d.className = 'ev'; d.innerHTML = `<em>${ev[1]} · ${logo('instagram', 8).replace('display:block', 'display:inline-block;vertical-align:-1px')}</em>${ev[2]}<span class="stt"></span>`; c.appendChild(d); return d; }); }
    win._ev.forEach((d, i) => { const p = P(t, td + i * .22, .3); d.style.opacity = p.toFixed(3); d.style.transform = `translateY(${((1 - p) * 6).toFixed(1)}px)`; });
    const d0 = win._ev[0], pub = t >= tp; d0.classList.toggle('pub', pub);
    const k = P(t, tp, 2.2, E.out3), stt = d0.querySelector('.stt'), txt = pub ? `${SVG_CORAZON.replace(/width="40" height="40"/, 'width="8" height="8"')} ${milK(1240 * k)} &nbsp;${icon('play', 7, 2.4)} ${milK(18400 * k)}` : '';
    if (stt._t !== txt) { stt._t = txt; stt.innerHTML = txt; }
    pintarVentana(win, t, { pgs: [[a, 'posts', 'zernio.com/dashboard/posts-all']],
      zoom: [[a, 1, [600, 312]], [td + .3, 1.15, [700, 330]], [tp - .3, 1.7, '[data-dia="2"]'], [b - 1.4, 1, [600, 312]]] });
  });
  s.eventos.forEach((_, i) => sfx(A(s.desde, P0) + i * .22, 'tick', { vol: .3 })); sfx(A(s.publicado, P0), 'notificacion', { vol: .55 });
  return e;
};

/* zAuto: Campaigns -> Comment-to-DM -> la automatizacion que dejo Claude. at: { camp, tab, fila } */
ESC_TIPOS.zAuto = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const e = escenaT(s.t[0], s.t[1], zPaso('EN ZERNIO', 'La automatización de comentarios') + ventanaZ('zernio.com/dashboard/inbox-campaigns', [['auto', zAutos()]]), (t, { a, b }) => {
    const [hd, win] = e.$, tc = at('camp'), tt = at('tab'), tf = at('fila');
    ent(hd, t, a + .05, 180, 80, { ax: 0, dx: -30, dy: 0 });
    ent(win, t, a + .15, CX, 600, { s0: .94, dy: 40 });
    const fila = win.querySelector('[data-k="fila"]'); fila.style.opacity = P(t, tf - .2, .4).toFixed(3);
    const na = win.querySelector('[data-k="nauto"]'), nt = t >= tf - .2 ? '1' : '0'; if (na._t !== nt) { na._t = nt; na.textContent = nt; }
    const k = P(t, tf + .6, 3.5, E.out3);
    [['trig', 12], ['sent', 9]].forEach(([q, v]) => { const el = win.querySelector(`[data-k="${q}"]`), x = String(Math.round(v * k)); if (el._t !== x) { el._t = x; el.textContent = x; } });
    zHL(win.querySelector('[data-nv="Campaigns"]'), t >= tc - .4 && t < tc + .4);
    zHL(win.querySelector('[data-k="tab"]'), t >= tt - .4 && t < tt + .4);
    zHL(fila, t >= tf + .2);
    pintarVentana(win, t, { pgs: [[a, 'auto', 'zernio.com/dashboard/inbox-campaigns']],
      cur: [[a + .3, [420, 300]], [tc, '[data-nv="Campaigns"]'], [tt, '[data-k="tab"]'], [tf + .5, [760, 260]]], clics: [tc, tt],
      zoom: [[a, 1, [600, 312]], [tf - .1, 1.5, '[data-k="fila"]'], [b - 1.2, 1, [600, 312]]] });
  });
  sfx(at('camp'), 'click', { vol: .7 }); sfx(at('tab'), 'click', { vol: .7 }); sfx(at('fila') - .2, 'pop', { vol: .5 });
  return e;
};

/* zFlujo: el reel pide comentar (modo 'reel') o el flujo completo comentario -> me gusta -> respuesta -> DM con boton (modo 'dm').
   reel: { img, comentarios:[[usuario, texto, at]] } · dm: at: { like, publico, dm, revisar, sigue, primero } */
ESC_TIPOS.zFlujo = s => {
  const P0 = s.t[0];
  const tel = (cls, inner) => `<div class="L tlf zfl ${cls}"><div class="scr"><div class="sb"><span>9:41</span><span class="bat"></span></div><i class="isla"></i>${inner}</div></div>`;
  const AV = `<span class="av2"><img alt="" src="${IMG('ig-avatar')}"></span>`;
  if (s.modo === 'reel') {
    const e = escenaT(s.t[0], s.t[1], tel('', `<img class="rbg" alt="" src="${IMG(s.foto)}"><img class="rimg" alt="" src="${IMG(s.foto)}"><i class="rsh"></i><div class="cap3">Comenta <span>LINK</span><br>y te lo mando</div>` +
      `<div class="lv">${s.comentarios.map(c => `<div><b>${c[0]}</b> ${c[1]}</div>`).join('')}</div>`) +
      `<div class="L ztk"><i>${icon('zap', 34, 2.2)}</i><div><b>ZERNIO RESPONDE SOLO</b><small>Aunque estés durmiendo</small></div></div>`, (t, { a }) => {
      const [ph, tk] = e.$;
      ent(ph, t, a + .1, 640, 548, { s0: .92, dy: 40 });
      ph.querySelector('.rimg').style.transform = `scale(${(1.12 - .1 * clamp((t - a) / 6)).toFixed(4)})`;
      [...ph.querySelectorAll('.lv div')].forEach((d, i) => { const p = P(t, A(s.comentarios[i][2], P0) - .2, .35, E.back); d.style.opacity = clamp(p * 2).toFixed(3); d.style.transform = `translateY(${((1 - p) * 20).toFixed(1)}px)`; });
      ent(tk, t, A(s.resp, P0) - .3, 1340, 548, { ease: E.back, s0: .6, dy: 0 });
    });
    s.comentarios.forEach(c => sfx(A(c[2], P0) - .2, 'notificacion', { vol: .35 })); sfx(A(s.resp, P0) - .3, 'pop', { vol: .5 });
    return e;
  }
  const T = {}; for (const k of Object.keys(s.at)) T[k] = A(s.at[k], P0);
  const e = escenaT(s.t[0], s.t[1],
    tel('cmt', `<div class="rh">Comentarios</div><div class="rm"><div class="cm"><span class="av2">C</span><div><b>carlos_88</b><span class="kw">LINK</span></div><span class="ht">${SVG_CORAZON.replace(/width="40" height="40"/, 'width="24" height="24"')}</span></div>` +
      `<div class="cm r">${AV}<div><b>tu.modelo</b>¡Te lo mandé por mensaje, Carlos! Revisa tus DMs.</div></div></div>`) +
    tel('dm', `<div class="rh">tu.modelo</div><div class="rm">` +
      `<div class="bu in g1">¡Hola, Carlos! Aquí tienes mi link: ahí está todo mi contenido.<div class="bb">Ver mi link</div></div>` +
      `<div class="bu in g2">¡Hola, Carlos! Para mandarte el link, primero sígueme y toca el botón.<div class="bb" data-k="ya">Ya te sigo</div></div>` +
      `<div class="bu in g3">¡Gracias por seguirme! Aquí está:<div class="bb">Ver mi link</div></div></div>`) +
    `<div class="L tag3" style="--c:${NEON.v}">${logo('linktree', 30)}El botón lleva a tu link secundario</div>` +
    `<div class="L tag3" style="--c:${NEON.a}">${icon('users', 28, 2.4)}Si no te sigue, primero le pide que te siga</div>`, (t, { a }) => {
    const [c1, c2, g1, g2] = e.$;
    ent(c1, t, a + .1, 560, 548, { s0: .92, dy: 40 });
    ent(c2, t, T.dm - .4, 1360, 548, { s0: .92, dy: 40 });
    const [cm1, cm2] = [...c1.querySelectorAll('.cm')];
    cm1.style.opacity = P(t, a + .3, .35).toFixed(3);
    const ht = cm1.querySelector('.ht'); ht.classList.toggle('on', t >= T.like); ht.style.transform = `scale(${(1 + .5 * bump(t, T.like, .35)).toFixed(3)})`;
    cm2.style.opacity = P(t, T.publico - .2, .35).toFixed(3); cm2.style.transform = `translateY(${((1 - P(t, T.publico - .2, .35)) * 14).toFixed(1)}px)`;
    // DM: primero la entrega directa; desde "revisar" se muestra la puerta de seguimiento
    const [b1, b2, b3] = [...c2.querySelectorAll('.bu')], gate = t >= T.revisar - .3;
    const p1 = P(t, T.dm - .1, .35) * (1 - P(t, T.revisar - .3, .3)); b1.style.opacity = p1.toFixed(3); b1.style.display = gate && p1 < .01 ? 'none' : '';
    b2.style.opacity = P(t, T.revisar - .1, .35).toFixed(3); b2.style.display = gate ? '' : 'none';
    b2.querySelector('[data-k="ya"]').classList.toggle('on', t >= T.sigue);
    b3.style.opacity = P(t, T.primero - .1, .35).toFixed(3); b3.style.display = gate ? '' : 'none';
    fitW(g1, 1400); fitW(g2, 1400);
    ent(g1, t, T.boton - .2, CX, 985, { ease: E.back, s0: .6, dy: 0, t1: T.revisar - .3 });
    ent(g2, t, T.revisar, CX, 985, { ease: E.back, s0: .6, dy: 0 });
  });
  sfx(T.like, 'pop', { vol: .55 }); sfx(T.publico - .2, 'tick', { vol: .4 }); sfx(T.dm - .1, 'notificacion', { vol: .5 }); sfx(T.boton - .2, 'brillo', { vol: .45 });
  sfx(T.revisar - .1, 'notificacion', { vol: .45 }); sfx(T.sigue, 'click', { vol: .6 }); sfx(T.primero - .1, 'brillo', { vol: .5 });
  return e;
};
