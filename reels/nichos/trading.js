/* =====================================================================
   MODULO DE NICHO: TRADING (reels/nichos/trading.js) — se carga con armar.py --modulo trading
   - Velas: serie(), ondas(), extremo(), caminoVela() · Grafico (velas en vivo con zonas, lineas, fibo, posicion...)
   - velaCanvas, tarjetaPatron, VelaGigante (anatomia de una vela)
   - Luchador('toro' | 'oso'): velas con cara que pelean (formato cine; necesita cine.js cargado antes de crearlos)
   Usa los colores de la marca (VERDE, ROJO, ORO...) definidos en base.js.
   ===================================================================== */
/* tarjeta numerada con un patron de velas dibujado (estatico): para listas ("estas son cinco...") */
function tarjetaPatron(n, velas, w = 150, h = 200) {
  const el = mk('div', 'L pcard', null, `<b>${String(n).padStart(2, '0')}</b>`);
  const c = document.createElement('canvas'); c.width = w; c.height = h; el.appendChild(c);
  const x = c.getContext('2d');
  let lo = 1e9, hi = -1e9; for (const v of velas) { lo = Math.min(lo, v[2]); hi = Math.max(hi, v[1]); }
  const pad = (hi - lo) * .12, Y = p => 10 + (hi + pad - p) / (hi - lo + 2 * pad) * (h - 20), slot = w / velas.length;
  velas.forEach((v, i) => velaCanvas(x, slot * (i + .5), Math.min(46, slot * .55), Y(v[0]), Y(v[3]), Y(v[1]), Y(v[2]), v[3] >= v[0], 1, .5));
  return el;
}

/* =====================================================================
   VELAS: datos y formacion "en vivo"
   ===================================================================== */
/* serie de velas desde una lista de pasos:
   { mover: n, hasta: precio, vol: ruido (0..1 del paso), mecha: tamano de mechas } -> n velas de tendencia
   { vela: [o, h, l, c] } o { velas: [[o,h,l,c], ...] } -> velas exactas (patrones)
   { rel: [dO, dH, dL, dC] } -> vela relativa al cierre anterior */
function serie(pasos, semilla = 11, p0 = 100) {
  const r = rng(semilla), out = [];
  let p = p0;
  for (const s of pasos) {
    if (s.desde != null) p = s.desde;
    if (s.vela) { out.push(s.vela.slice()); p = s.vela[3]; continue; }
    if (s.velas) { for (const v of s.velas) out.push(v.slice()); p = s.velas[s.velas.length - 1][3]; continue; }
    if (s.rel) { const [a, b, c, d] = s.rel; out.push([p + a, p + b, p + c, p + d]); p = p + d; continue; }
    const n = s.mover, inicio = p, paso = (s.hasta - inicio) / n, vol = s.vol ?? .9, mecha = s.mecha ?? Math.abs(paso) * .6 + .15;
    const lim = Math.abs(paso) * 1.9 + .2, cs = [];
    for (let k = 0; k < n; k++) {
      let c = inicio + paso * (k + 1) + (r() - .5) * 2 * vol * Math.max(Math.abs(paso), .25);
      // de vez en cuando una vela contra la tendencia (se ve real)
      if (s.contra && r() < s.contra && k < n - 2) c = (k ? cs[k - 1] : inicio) - paso * (.4 + r() * .5);
      cs.push(c);
    }
    cs[n - 1] = s.hasta;
    // ningun cuerpo mas grande que ~2 pasos: se acota hacia adelante y hacia atras (la ultima vela llega a "hasta" sin saltar)
    for (let pasada = 0; pasada < 2; pasada++) {
      for (let k = 0; k < n - 1; k++) { const prev = k ? cs[k - 1] : inicio; cs[k] = clamp(cs[k], prev - lim, prev + lim); }
      for (let k = n - 2; k >= 0; k--) cs[k] = clamp(cs[k], cs[k + 1] - lim, cs[k + 1] + lim);
    }
    for (let k = 0; k < n; k++) {
      const o = p, c = cs[k];
      const h = Math.max(o, c) + r() * mecha, l = Math.min(o, c) - r() * mecha;
      out.push([o, h, l, c]); p = c;
    }
  }
  return out;
}
/* ondas: serie que pasa por estos giros [[n velas, precio destino], ...]; devuelve { V, giros: [[indice, precio], ...] }
   (el indice/precio de cada giro sale de la mecha real: maximo en los techos, minimo en los pisos) */
function ondas(desde, tramos, semilla = 11, vol = .55) {
  const V = serie([{ desde, mover: tramos[0][0], hasta: tramos[0][1], vol }, ...tramos.slice(1).map(([n, h]) => ({ mover: n, hasta: h, vol, contra: .15 }))], semilla);
  const giros = [[0, V[0][0]]]; let i = 0, prev = desde;
  for (const [n, h] of tramos) {
    i += n; const sube = h > prev;
    giros.push(extremo(V, Math.max(0, i - 2), Math.min(V.length - 1, i + 1), sube ? 'max' : 'min')); prev = h;
  }
  return { V, giros };
}
/* indice y precio del maximo (o minimo) de las velas i0..i1 */
function extremo(V, i0, i1, tipo = 'max') {
  let k = i0, p = tipo === 'max' ? -1e9 : 1e9;
  for (let i = i0; i <= i1; i++) { const v = V[i]; if (!v) continue; if (tipo === 'max' ? v[1] > p : v[2] < p) { p = tipo === 'max' ? v[1] : v[2]; k = i; } }
  return [k, p];
}
/* precio de una vela mientras se forma: f 0..1 -> { p: precio actual, hi, lo: extremos alcanzados }.
   Recorre apertura -> extremo contrario -> extremo a favor -> cierre (como se forma una vela de verdad). */
function caminoVela(v, f, temblor = .05) {
  const [o, h, l, c] = v;
  if (f >= 1) return { p: c, hi: h, lo: l };
  const pts = c >= o ? [o, l, h, c] : [o, h, l, c];
  const L = [Math.abs(pts[1] - pts[0]), Math.abs(pts[2] - pts[1]), Math.abs(pts[3] - pts[2])];
  let d = clamp(f) * (L[0] + L[1] + L[2] || 1), p = o, hi = o, lo = o;
  for (let k = 0; k < 3; k++) {
    const a = pts[k], b = pts[k + 1];
    if (d >= L[k]) { p = b; d -= L[k]; } else { p = a + (b - a) * (L[k] ? d / L[k] : 1); hi = Math.max(hi, p); lo = Math.min(lo, p); break; }
    hi = Math.max(hi, p); lo = Math.min(lo, p);
  }
  const tb = (h - l) * temblor * Math.sin(f * 37) * Math.sin(f * Math.PI);
  p = clamp(p + tb, lo, hi);
  return { p, hi, lo };
}

/* =====================================================================
   GRAFICO DE VELAS (canvas). Se crea una vez y se pinta en cada fotograma:
     const G = new Grafico({ velas, w, h });
     G.vista = norm([[t, { i0, i1, pmin, pmax }], ...])   ventana visible (indices de vela y precios); pmin/pmax null = auto
     G.rev = [[t0, n0], [t1, n1], ...]                    cuantas velas hay formadas (lineal entre puntos; la ultima se forma)
     G.zona({...}), G.linea({...}), G.marca({...}) ...    dibujos sobre el grafico (cada uno con su t0 / t1)
     G.foco(i0, i1, t0, t1)                               resalta esas velas y apaga las demas
     G.pintar(t, { x, y, s, o })
   ===================================================================== */
class Grafico {
  constructor(o = {}) {
    this.o = { velas: [], w: 960, h: 820, eje: 124, cab: 78, padre: WORLD, z: 'z3', dec: 2, marco: true, tf: 'H1', titulo: 'GRÁFICO DE VELAS',
      precioVivo: true, rejilla: true, ...o };
    const O = this.o;
    this.c = mk('canvas', 'L graf ' + O.z, O.padre);
    this.c.width = O.w; this.c.height = O.h;
    this.x = this.c.getContext('2d');
    this.V = O.velas;
    this.vista = norm([[0, { i0: -.5, i1: 30, pmin: null, pmax: null }]]);
    this.rev = [[0, this.V.length]];
    this.ov = []; this.focos = [];
    this.area = { x0: 26, y0: O.marco ? O.cab : 20, x1: O.w - O.eje, y1: O.h - 26 };
  }
  nVelas(t) {                                                          // velas formadas en t (decimal: la ultima a medias)
    const R = this.rev;
    if (t <= R[0][0]) return R[0][1];
    for (let k = 1; k < R.length; k++) if (t < R[k][0]) return lerp(R[k - 1][1], R[k][1], (t - R[k - 1][0]) / (R[k][0] - R[k - 1][0]));
    return R[R.length - 1][1];
  }
  estadoVela(i, n) {                                                   // { o, p, hi, lo, f } de la vela i con n velas formadas
    const v = this.V[i];
    if (!v || i >= n) return null;
    const f = clamp(n - i);
    const c = caminoVela(v, f);
    return { o: v[0], p: c.p, hi: c.hi, lo: c.lo, f };
  }
  rangoAuto(t, i0, i1) {
    const n = this.nVelas(t);
    let lo = 1e9, hi = -1e9;
    for (let i = Math.max(0, Math.floor(i0)); i <= Math.min(this.V.length - 1, Math.ceil(i1)); i++) {
      const e = this.estadoVela(i, n); if (!e) continue;
      lo = Math.min(lo, e.lo); hi = Math.max(hi, e.hi);
    }
    if (lo > hi) { const v = this.V[0]; lo = v[2]; hi = v[1]; }
    const pad = (hi - lo) * .14 + 1e-6;
    return [lo - pad, hi + pad];
  }
  ventana(t) {
    const k = KF(t, this.vista);
    let { i0, i1, pmin, pmax } = k;
    if (this.o.seguir) { const n = this.nVelas(t), w = i1 - i0; const fin = Math.max(i1, n + (this.o.margen ?? 2.5)); i1 = fin; i0 = fin - w; }
    if (pmin == null || pmax == null || this.o.auto) {
      // rango automatico suavizado: promedio de los rangos de los ultimos 0,5 s (sigue siendo funcion pura de t)
      let a = 0, b = 0, m = 6;
      for (let j = 0; j < m; j++) { const r = this.rangoAuto(t - j * .09, i0, i1); a += r[0]; b += r[1]; }
      const ra = [a / m, b / m];
      if (pmin == null || this.o.auto) pmin = ra[0];
      if (pmax == null || this.o.auto) pmax = ra[1];
    }
    return { i0, i1, pmin, pmax };
  }
  X(i) { const A = this.area, v = this.v; return A.x0 + (i - v.i0) / (v.i1 - v.i0) * (A.x1 - A.x0); }
  Y(p) { const A = this.area, v = this.v; return A.y0 + (v.pmax - p) / (v.pmax - v.pmin) * (A.y1 - A.y0); }
  /* posicion en el escenario (para colgar piezas DOM sobre el grafico): requiere el put del ultimo pintar */
  aEscena(i, p) { const k = this.k || { x: CX, y: CY, s: 1 }; return { x: k.x + (this.X(i) - this.o.w / 2) * (k.s ?? 1), y: k.y + (this.Y(p) - this.o.h / 2) * (k.s ?? 1) }; }

  /* ---- dibujos (todos aceptan t0, t1 = salida, dur) ---- */
  add(o) { this.ov.push({ dur: .6, ...o }); return this; }
  zona(o) { return this.add({ tipo: 'zona', atras: true, rgb: ORO, ...o }); }          // {p0, p1, i0, i1|'fin', etiqueta, lado}
  linea(o) { return this.add({ tipo: 'linea', atras: true, rgb: ORO, ...o }); }        // {p, i0, i1, dash, etiqueta}
  segmento(o) { return this.add({ tipo: 'seg', rgb: ORO, ...o }); }                   // {i0, p0, i1, p1, ext}
  marca(o) { return this.add({ tipo: 'marca', rgb: ORO, ...o }); }                    // {i, p, texto, lado: 1 arriba / -1 abajo}
  flecha(o) { return this.add({ tipo: 'flecha', rgb: VERDE, ...o }); }               // {i, p, dir: 1 sube / -1 baja, largo}
  caja(o) { return this.add({ tipo: 'caja', rgb: ORO, ...o }); }                      // {i0, i1, p0?, p1?, etiqueta}
  zigzag(o) { return this.add({ tipo: 'zig', rgb: ORO, ...o }); }                     // {pts: [[i, p], ...], t1Dibujo}
  fibo(o) { return this.add({ tipo: 'fibo', atras: true, rgb: ORO, ...o }); }         // {iA, pA, iB, pB, niveles, zona}
  posicion(o) { return this.add({ tipo: 'pos', atras: true, ...o }); }                // {i0, i1, entrada, sl, tp, ratio}
  texto(o) { return this.add({ tipo: 'texto', rgb: CREMA, ...o }); }                  // {i, p, texto, tam}
  liquidez(o) { return this.add({ tipo: 'liq', rgb: ORO2, ...o }); }                  // {p, i0, i1, texto}
  foco(i0, i1, t0, t1 = 1e9, o = {}) { this.focos.push({ i0, i1, t0, t1, ...o }); return this; }

  alfaVela(t, i) {
    let a = 1;
    for (const f of this.focos) {
      const p = P(t, f.t0, .45, E.out3) * (1 - P(t, f.t1, .45, E.in3));
      if (p <= 0) continue;
      if (i < f.i0 || i > f.i1) a = Math.min(a, 1 - (1 - (f.min ?? .22)) * p);
    }
    return a;
  }
  brilloVela(t, i) {
    let g = 0;
    for (const f of this.focos) if (i >= f.i0 && i <= f.i1) g = Math.max(g, P(t, f.t0, .45, E.out3) * (1 - P(t, f.t1, .45, E.in3)));
    return g;
  }

  pintar(t, k = {}) {
    const O = this.o, x = this.x, Wc = O.w, Hc = O.h, A = this.area;
    this.k = { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1 };
    if ((k.o ?? 1) <= .002) { off(this.c); return; }
    this.v = this.ventana(t);
    const v = this.v, n = this.nVelas(t);
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, Wc, Hc);
    // marco (panel oscuro con filo dorado)
    if (O.marco) {
      const g = x.createLinearGradient(0, 0, 0, Hc);
      g.addColorStop(0, 'rgba(22,17,11,.88)'); g.addColorStop(1, 'rgba(10,8,5,.92)');
      x.fillStyle = g; rr(x, 1, 1, Wc - 2, Hc - 2, 34); x.fill();
      x.strokeStyle = 'rgba(212,175,55,.26)'; x.lineWidth = 1.5; rr(x, 1, 1, Wc - 2, Hc - 2, 34); x.stroke();
      // cabecera: punto en vivo + titulo + temporalidad
      const vivo = .55 + .45 * Math.sin(t * 5);
      x.fillStyle = `rgba(${ROJO},${(.5 + .5 * vivo).toFixed(3)})`; x.beginPath(); x.arc(44, 40, 7, 0, 6.2832); x.fill();
      x.fillStyle = `rgba(${ROJO},${(.18 * vivo).toFixed(3)})`; x.beginPath(); x.arc(44, 40, 15, 0, 6.2832); x.fill();
      x.font = "600 22px 'JetBrains Mono'"; x.textBaseline = 'middle'; x.textAlign = 'left';
      x.fillStyle = 'rgba(232,227,216,.78)'; x.fillText('EN VIVO', 62, 41);
      x.fillStyle = 'rgba(232,200,122,.85)'; x.fillText(O.titulo, 182, 41);
      x.textAlign = 'right'; x.fillStyle = 'rgba(232,227,216,.55)';
      rr(x, Wc - 96, 22, 70, 38, 12); x.strokeStyle = 'rgba(232,227,216,.2)'; x.lineWidth = 1.2; x.stroke();
      x.textAlign = 'center'; x.fillStyle = 'rgba(232,227,216,.8)'; x.fillText(O.tf, Wc - 61, 42);
      x.strokeStyle = 'rgba(232,227,216,.07)'; x.beginPath(); x.moveTo(20, O.cab - 10); x.lineTo(Wc - 20, O.cab - 10); x.stroke();
    }
    // rejilla y eje de precios
    if (O.rejilla) {
      const paso = pasoBonito((v.pmax - v.pmin) / 6);
      x.font = "500 21px 'JetBrains Mono'"; x.textAlign = 'left'; x.textBaseline = 'middle';
      for (let p = Math.ceil(v.pmin / paso) * paso; p <= v.pmax; p += paso) {
        const y = this.Y(p);
        if (y < A.y0 + 6 || y > A.y1 - 6) continue;
        x.strokeStyle = 'rgba(232,227,216,.055)'; x.lineWidth = 1; x.beginPath(); x.moveTo(A.x0, y); x.lineTo(A.x1, y); x.stroke();
        x.fillStyle = 'rgba(232,227,216,.4)'; x.fillText(fmt(p, O.dec), A.x1 + 16, y);
      }
    }
    x.save(); x.beginPath(); x.rect(A.x0 - 4, A.y0, A.x1 - A.x0 + 8, A.y1 - A.y0); x.clip();
    this._diferidas = [];
    for (const d of this.ov) if (d.atras) this.dibujo(t, d);
    // velas
    const slot = (A.x1 - A.x0) / (v.i1 - v.i0), bw = Math.max(3, slot * (O.anchoVela ?? .62));
    const iA = Math.max(0, Math.floor(v.i0 - 1)), iB = Math.min(this.V.length - 1, Math.ceil(v.i1 + 1));
    let ultima = null;
    for (let i = iA; i <= iB; i++) {
      const e = this.estadoVela(i, n); if (!e) continue;
      const a = this.alfaVela(t, i), g = this.brilloVela(t, i), viva = e.f < 1;
      velaCanvas(x, this.X(i), bw, this.Y(e.o), this.Y(e.p), this.Y(e.hi), this.Y(e.lo), e.p >= e.o, a, (viva ? .9 : 0) + g, O.relleno);
      ultima = e;
    }
    for (const [al, fn] of this._diferidas) { x.save(); x.globalAlpha = al; fn(); x.restore(); }
    this._diferidas = null;
    for (const d of this.ov) if (!d.atras) this.dibujo(t, d);
    x.restore();
    // precio en vivo: linea punteada + etiqueta en el eje
    if (O.precioVivo && ultima) {
      const y = this.Y(ultima.p), sube = ultima.p >= ultima.o, rgb = sube ? VERDE : ROJO;
      x.setLineDash([6, 7]); x.strokeStyle = `rgba(${rgb},.55)`; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(A.x0, y); x.lineTo(A.x1, y); x.stroke(); x.setLineDash([]);
      x.fillStyle = `rgb(${rgb})`; rr(x, A.x1 + 6, y - 19, O.eje - 14, 38, 9); x.fill();
      x.font = "700 21px 'JetBrains Mono'"; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillStyle = '#0b0805'; x.fillText(fmt(ultima.p, O.dec), A.x1 + 6 + (O.eje - 14) / 2, y + 1);
    }
    put(this.c, { x: this.k.x, y: this.k.y, s: this.k.s, o: k.o ?? 1, b: k.b ?? 0, rx: k.rx, ry: k.ry });
  }

  dibujo(t, d) {
    const p = P(t, d.t0, d.dur, d.ease ?? E.out3), q = d.t1 != null ? P(t, d.t1, .4, E.in3) : 0, al = p * (1 - q);
    if (al <= .002) return;
    const x = this.x, A = this.area, rgb = d.rgb;
    const Xi = i => i === 'fin' ? A.x1 : i === 'ini' ? A.x0 : this.X(i);
    // las etiquetas de los dibujos de fondo esperan a que esten las velas (asi no quedan debajo)
    const pildora = (...a) => this._diferidas ? this._diferidas.push([al, () => pildoraCanvas(...a)]) : pildoraCanvas(...a);
    x.save(); x.globalAlpha = al;
    if (d.tipo === 'zona') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.15)));
      const ya = this.Y(d.p1), yb = this.Y(d.p0);
      const g = x.createLinearGradient(0, ya, 0, yb);
      g.addColorStop(0, `rgba(${rgb},.26)`); g.addColorStop(.5, `rgba(${rgb},.12)`); g.addColorStop(1, `rgba(${rgb},.26)`);
      x.fillStyle = g; x.fillRect(xa, ya, xb - xa, yb - ya);
      x.strokeStyle = `rgba(${rgb},.75)`; x.lineWidth = 2;
      x.beginPath(); x.moveTo(xa, ya); x.lineTo(xb, ya); x.moveTo(xa, yb); x.lineTo(xb, yb); x.stroke();
      if (d.etiqueta) pildora(x, d.lado === 'der' ? xb - 14 : xa + 14, (ya + yb) / 2, d.etiqueta, rgb, d.lado === 'der' ? 'der' : 'izq', clamp(p * 1.5), d.tam);
    } else if (d.tipo === 'linea') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.1))), y = this.Y(d.p);
      x.strokeStyle = `rgba(${rgb},.9)`; x.lineWidth = d.ancho ?? 2.5; if (d.dash) x.setLineDash(d.dash);
      x.shadowColor = `rgba(${rgb},.6)`; x.shadowBlur = 10;
      x.beginPath(); x.moveTo(xa, y); x.lineTo(xb, y); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      if (d.etiqueta) pildora(x, d.lado === 'izq' ? xa + 14 : xb - 14, y + (d.dy ?? -30), d.etiqueta, rgb, d.lado === 'izq' ? 'izq' : 'der', clamp(p * 1.5), d.tam);
    } else if (d.tipo === 'seg') {
      const xa = this.X(d.i0), ya = this.Y(d.p0);
      let xb = this.X(d.i1), yb = this.Y(d.p1);
      if (d.ext) { const xe = this.X(d.i1 + d.ext), ye = this.Y(d.p1 + (d.p1 - d.p0) / (d.i1 - d.i0) * d.ext); xb = xe; yb = ye; }
      const k = E.io3(clamp(p * 1.05));
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = d.ancho ?? 3; if (d.dash) x.setLineDash(d.dash);
      x.shadowColor = `rgba(${rgb},.7)`; x.shadowBlur = 12;
      x.beginPath(); x.moveTo(xa, ya); x.lineTo(lerp(xa, xb, k), lerp(ya, yb, k)); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      if (d.puntos !== false) for (const [px, py] of [[xa, ya]]) { x.fillStyle = `rgb(${rgb})`; x.beginPath(); x.arc(px, py, 6, 0, 6.2832); x.fill(); }
      if (d.etiqueta && k > .6) pildora(x, Math.min(lerp(xa, xb, k), A.x1 - 8), lerp(ya, yb, k) + (d.dy ?? -30), d.etiqueta, rgb, 'der', clamp((k - .6) * 3), d.tam);
    } else if (d.tipo === 'marca') {
      const px = this.X(d.i), py = this.Y(d.p), lado = d.lado ?? 1, pb = E.back(clamp(p));
      x.fillStyle = `rgb(${rgb})`; x.shadowColor = `rgba(${rgb},.9)`; x.shadowBlur = 14;
      x.beginPath(); x.arc(px, py, 7 * pb, 0, 6.2832); x.fill(); x.shadowBlur = 0;
      pildora(x, px, py - lado * (d.sep ?? 48), d.texto, rgb, 'centro', clamp(p * 1.4), d.tam ?? 26, pb, d.solida);
    } else if (d.tipo === 'flecha') {
      // dir 1 = flecha alcista: nace debajo del precio y apunta hacia arriba; dir -1 = bajista, encima apuntando abajo
      const px = this.X(d.i), py = this.Y(d.p), dir = d.dir ?? 1, L = (d.largo ?? 110) * E.out3(clamp(p * 1.2));
      const punta = py + dir * (d.sep ?? 24), base = punta + dir * 28;
      x.strokeStyle = `rgb(${rgb})`; x.fillStyle = `rgb(${rgb})`; x.lineWidth = 7; x.lineCap = 'round';
      x.shadowColor = `rgba(${rgb},.8)`; x.shadowBlur = 16;
      x.beginPath(); x.moveTo(px, base + dir * L); x.lineTo(px, base - dir * 4); x.stroke();
      x.beginPath(); x.moveTo(px, punta); x.lineTo(px - 18, base); x.lineTo(px + 18, base); x.closePath(); x.fill();
      x.shadowBlur = 0; x.lineCap = 'butt';
    } else if (d.tipo === 'caja') {
      const xa = this.X(d.i0) - (d.pad ?? 26), xb = this.X(d.i1) + (d.pad ?? 26);
      let p0 = d.p0, p1 = d.p1;
      if (p0 == null || p1 == null) { p0 = 1e9; p1 = -1e9; for (let i = d.i0; i <= d.i1; i++) { const v = this.V[i]; if (v) { p0 = Math.min(p0, v[2]); p1 = Math.max(p1, v[1]); } } }
      const ya = this.Y(p1) - 22, yb = this.Y(p0) + 22, pb = E.back(clamp(p));
      const cx0 = (xa + xb) / 2, cy0 = (ya + yb) / 2, sw = (xb - xa) * lerp(1.25, 1, pb), sh = (yb - ya) * lerp(1.25, 1, pb);
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = 3; x.setLineDash(d.dash || []);
      x.shadowColor = `rgba(${rgb},.75)`; x.shadowBlur = 18;
      rr(x, cx0 - sw / 2, cy0 - sh / 2, sw, sh, 18); x.stroke(); x.setLineDash([]); x.shadowBlur = 0;
      x.fillStyle = `rgba(${rgb},.07)`; rr(x, cx0 - sw / 2, cy0 - sh / 2, sw, sh, 18); x.fill();
      if (d.etiqueta) pildora(x, cx0, d.abajo ? cy0 + sh / 2 + 34 : cy0 - sh / 2 - 34, d.etiqueta, rgb, 'centro', clamp(p * 1.4), d.tam ?? 28, 1, true);
    } else if (d.tipo === 'zig') {
      const pts = d.pts.map(([i, pp]) => [this.X(i), this.Y(pp)]);
      const tot = pts.reduce((s, c, j) => j ? s + Math.hypot(c[0] - pts[j - 1][0], c[1] - pts[j - 1][1]) : 0, 0);
      const k = d.t1Dibujo != null ? clamp((t - d.t0) / (d.t1Dibujo - d.t0)) : E.io3(clamp(p));
      let rest = tot * k;
      x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = d.ancho ?? 4; x.lineJoin = 'round';
      x.shadowColor = `rgba(${rgb},.7)`; x.shadowBlur = 14;
      x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
      for (let j = 1; j < pts.length && rest > 0; j++) {
        const L = Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]), f = Math.min(1, rest / L);
        x.lineTo(lerp(pts[j - 1][0], pts[j][0], f), lerp(pts[j - 1][1], pts[j][1], f)); rest -= L;
      }
      x.stroke(); x.shadowBlur = 0;
    } else if (d.tipo === 'fibo') {
      const niv = d.niveles ?? [0, .382, .5, .618, 1], xa = this.X(d.iA), xb = Xi(d.i1 ?? 'fin');
      const nivelP = r => d.pB - (d.pB - d.pA) * r;      // 0 = extremo B (maximo del impulso), 1 = extremo A
      if (d.zona) {
        const ya = this.Y(nivelP(d.zona[0])), yb = this.Y(nivelP(d.zona[1])), pz = P(t, d.tZona ?? d.t0, .6, E.out3);
        const g = x.createLinearGradient(0, ya, 0, yb);
        g.addColorStop(0, `rgba(${ORO2},${(.30 * pz).toFixed(3)})`); g.addColorStop(1, `rgba(${ORO},${(.16 * pz).toFixed(3)})`);
        x.fillStyle = g; x.fillRect(xa, ya, (xb - xa) * pz, yb - ya);
        if (d.etiquetaZona && pz > .2) pildora(x, xa + 16, (ya + yb) / 2, d.etiquetaZona, ORO2, 'izq', clamp((pz - .2) * 2), 26, 1, true);
      }
      niv.forEach((r, j) => {
        const pj = P(t, d.tiempos ? d.tiempos[j] : d.t0 + j * (d.paso ?? .12), .5, E.out3), y = this.Y(nivelP(r));   // tiempos: uno por nivel (cuando la voz lo dice)
        if (pj <= 0) return;
        const clave = r === .618 || r === .5;
        x.globalAlpha = al * pj;
        x.strokeStyle = clave ? `rgba(${ORO2},.95)` : 'rgba(232,227,216,.45)'; x.lineWidth = clave ? 2.5 : 1.6; x.setLineDash(clave ? [] : [8, 8]);
        x.beginPath(); x.moveTo(xa, y); x.lineTo(lerp(xa, xb, E.io3(pj)), y); x.stroke(); x.setLineDash([]);
        x.font = `${clave ? 700 : 500} 22px 'JetBrains Mono'`; x.textAlign = 'right'; x.textBaseline = 'bottom';
        x.fillStyle = clave ? `rgb(${ORO2})` : 'rgba(232,227,216,.7)';
        x.fillText((r * 100).toFixed(r === .382 || r === .618 ? 1 : 0).replace('.', ',') + ' %', xb - 10, y - 6);
      });
      x.globalAlpha = al;
    } else if (d.tipo === 'pos') {
      const xa = this.X(d.i0), xb = lerp(xa, this.X(d.i1), E.io3(clamp(p * 1.1))), ye = this.Y(d.entrada), ys = this.Y(d.sl), yt = this.Y(d.tp);
      const pt = d.tTp != null ? P(t, d.tTp, .5, E.out3) : 1, ps = d.tSl != null ? P(t, d.tSl, .5, E.out3) : 1;
      x.fillStyle = `rgba(${VERDE},${(.2 * pt).toFixed(3)})`; x.fillRect(xa, Math.min(ye, yt), xb - xa, Math.abs(yt - ye));
      x.fillStyle = `rgba(${ROJO},${(.2 * ps).toFixed(3)})`; x.fillRect(xa, Math.min(ye, ys), xb - xa, Math.abs(ys - ye));
      x.lineWidth = 2;
      x.strokeStyle = `rgba(${VERDE},${(.8 * pt).toFixed(3)})`; x.beginPath(); x.moveTo(xa, yt); x.lineTo(xb, yt); x.stroke();
      x.strokeStyle = `rgba(${ROJO},${(.8 * ps).toFixed(3)})`; x.beginPath(); x.moveTo(xa, ys); x.lineTo(xb, ys); x.stroke();
      x.strokeStyle = 'rgba(232,227,216,.9)'; x.beginPath(); x.moveTo(xa, ye); x.lineTo(xb, ye); x.stroke();
      const xl = xa + 14;
      if (pt > .3) pildora(x, xl, yt + (yt < ye ? 28 : -28), d.etiquetaTp ?? 'OBJETIVO', VERDE, 'izq', clamp((pt - .3) * 2), 24, 1, true);
      if (ps > .3) pildora(x, xl, ys + (ys > ye ? -28 : 28), d.etiquetaSl ?? 'STOP LOSS', ROJO, 'izq', clamp((ps - .3) * 2), 24, 1, true);
      pildora(x, xl, ye + (yt < ye ? 28 : -28), d.etiquetaEntrada ?? 'ENTRADA', CREMA, 'izq', clamp(p * 1.5), 24, 1, true);
      if (d.ratio && d.tRatio != null) { const pr = P(t, d.tRatio, .5, E.back); if (pr > 0) pildora(x, xb - 16, (yt + ye) / 2, d.ratio, VERDE, 'der', clamp(pr * 1.5), 30, lerp(.6, 1, pr), true); }
    } else if (d.tipo === 'texto') {
      x.font = `${d.peso ?? 400} ${d.tam ?? 40}px ${d.fuente ?? "'Bebas Neue'"}`; x.textAlign = d.al ?? 'center'; x.textBaseline = 'middle';
      x.fillStyle = `rgb(${rgb})`; x.shadowColor = `rgba(${rgb},.5)`; x.shadowBlur = 12;
      x.fillText(d.texto, this.X(d.i), this.Y(d.p) + (1 - E.out3(clamp(p))) * 16); x.shadowBlur = 0;
    } else if (d.tipo === 'liq') {
      const xa = Xi(d.i0 ?? 'ini'), xb = lerp(xa, Xi(d.i1 ?? 'fin'), E.io3(clamp(p * 1.1))), y = this.Y(d.p);
      x.strokeStyle = `rgba(${rgb},.85)`; x.lineWidth = 2; x.setLineDash([4, 8]);
      x.beginPath(); x.moveTo(xa, y); x.lineTo(xb, y); x.stroke(); x.setLineDash([]);
      const nn = d.n ?? 3;
      for (let j = 0; j < nn; j++) {
        const pj = P(t, d.t0 + .25 + j * .15, .4, E.back);
        if (pj > 0) pildora(x, lerp(xa, Xi(d.i1 ?? 'fin'), (j + 1) / (nn + 1)), y + (d.lado ?? 1) * 34, d.texto ?? '$$$', rgb, 'centro', clamp(pj * 1.6), 24, pj, false);
      }
    }
    x.restore();
  }
}

/* una vela: x centro, ancho, y de apertura, y del precio actual, y de maximo y minimo; alfa y brillo (glow) */
function velaCanvas(x, xc, bw, yo, yp, yhi, ylo, sube, alfa = 1, brillo = 0, relleno) {
  const rgb = sube ? VERDE : ROJO;
  x.save(); x.globalAlpha = alfa;
  if (brillo > 0) { x.shadowColor = `rgba(${rgb},${(.85 * Math.min(1, brillo)).toFixed(3)})`; x.shadowBlur = 10 + 26 * Math.min(1, brillo); }
  x.strokeStyle = `rgba(${rgb},.95)`; x.lineWidth = Math.max(2, Math.min(5, bw * .12)); x.lineCap = 'round';
  x.beginPath(); x.moveTo(xc, yhi); x.lineTo(xc, ylo); x.stroke();
  const top = Math.min(yo, yp), alto = Math.max(3, Math.abs(yp - yo));
  const g = x.createLinearGradient(0, top, 0, top + alto);
  if (sube) { g.addColorStop(0, '#7cf3c8'); g.addColorStop(1, '#14b886'); } else { g.addColorStop(0, '#ff8fa1'); g.addColorStop(1, '#e0244a'); }
  x.fillStyle = relleno === false && sube ? '#0b0805' : g;
  rr(x, xc - bw / 2, top, bw, alto, Math.min(5, bw / 4)); x.fill();
  if (relleno === false && sube) { x.strokeStyle = 'rgba(124,243,200,.95)'; x.lineWidth = 2; rr(x, xc - bw / 2, top, bw, alto, Math.min(5, bw / 4)); x.stroke(); }
  x.restore();
}

/* =====================================================================
   VELA GIGANTE con su anatomia (apertura, cierre, maximo, minimo, cuerpo, mechas)
     const VG = new VelaGigante({ v: [o, h, l, c] });
     VG.pintar(t, { x, y, s, o, f (formacion 0..1), baja (0 verde -> 1 roja), et: { max: [t0, t1], cierre: ..., ... } })
   ===================================================================== */
class VelaGigante {
  constructor(o = {}) {
    this.o = { v: [100, 132, 72, 122], w: 1000, h: 1060, ancho: 210, padre: WORLD, z: 'z4', ...o };
    this.c = mk('canvas', 'L vgig ' + this.o.z, this.o.padre);
    this.c.width = this.o.w; this.c.height = this.o.h; this.x = this.c.getContext('2d');
  }
  pintar(t, k = {}) {
    if ((k.o ?? 1) <= .002) { off(this.c); return; }
    const O = this.o, x = this.x, [o, h, l, c] = O.v, Wc = O.w, Hc = O.h, cx = k.cx ?? Wc / 2;
    const pad = (h - l) * .1, Y = p => 60 + (h + pad - p) / (h - l + 2 * pad) * (Hc - 120);
    const f = k.f ?? 1, baja = k.baja ?? 0;
    // vela bajista = la misma forma con apertura y cierre invertidos
    const vv = baja > .5 ? [c, h, l, o] : [o, h, l, c];
    const e = caminoVela(vv, f, .03);
    const sube = f < 1 ? e.p >= vv[0] : baja <= .5;                  // mientras se forma, el color sigue al precio (la batalla)
    this.Y = Y; this.kk = { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1 };
    x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, Wc, Hc);
    // al pasar de verde a roja (baja) el color se funde en vez de saltar
    const m = f < 1 ? (sube ? 0 : 1) : E.io3(clamp(baja));
    const rgb = mixRGB(VERDE, ROJO, m), bw = O.ancho;
    // halo
    const gh = x.createRadialGradient(cx, Y((e.hi + e.lo) / 2), 0, cx, Y((e.hi + e.lo) / 2), 420);
    gh.addColorStop(0, `rgba(${rgb},.20)`); gh.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = gh; x.fillRect(0, 0, Wc, Hc);
    x.save(); x.shadowColor = `rgba(${rgb},.75)`; x.shadowBlur = 50;
    x.strokeStyle = `rgb(${rgb})`; x.lineWidth = 12; x.lineCap = 'round';
    x.beginPath(); x.moveTo(cx, Y(e.hi)); x.lineTo(cx, Y(e.lo)); x.stroke();
    const top = Y(Math.max(vv[0], e.p)), bot = Y(Math.min(vv[0], e.p)), alto = Math.max(6, bot - top);
    const g = x.createLinearGradient(0, top, 0, top + alto);
    g.addColorStop(0, `rgb(${mixRGB('154,247,212', '255,163,178', m)})`); g.addColorStop(.5, `rgb(${mixRGB('46,224,164', '255,83,114', m)})`);
    g.addColorStop(1, `rgb(${mixRGB('15,158,114', '196,24,60', m)})`);
    x.fillStyle = g; rr(x, cx - bw / 2, top, bw, alto, 22); x.fill();
    x.shadowBlur = 0;
    // brillo interior (cristal)
    const gi = x.createLinearGradient(cx - bw / 2, 0, cx + bw / 2, 0);
    gi.addColorStop(0, 'rgba(255,255,255,.28)'); gi.addColorStop(.35, 'rgba(255,255,255,.06)'); gi.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gi; rr(x, cx - bw / 2 + 8, top + 8, bw * .4, Math.max(0, alto - 16), 16); x.fill();
    x.restore();
    // etiquetas: a la derecha precios (max, cierre/apertura, min); a la izquierda corchetes (mecha, cuerpo, mecha)
    const et = k.et || {}, yA = Y(o), yC = Y(c);
    const yTopCuerpo = Y(Math.max(o, c)), yBotCuerpo = Y(Math.min(o, c));
    const yCierre = lerp(yC, yA, E.io3(baja)), yApertura = lerp(yA, yC, E.io3(baja));
    const der = [['max', 'MÁXIMO', Y(h), CREMA], ['cierre', 'CIERRE', yCierre, ORO2], ['apertura', 'APERTURA', yApertura, ORO2], ['min', 'MÍNIMO', Y(l), CREMA]];
    for (const [id, txt, y, col] of der) {
      const w = et[id]; if (!w) continue;
      const p = P(t, w[0], .45, E.out3) * (w[1] != null ? 1 - P(t, w[1], .35, E.in3) : 1); if (p <= 0) continue;
      x.save(); x.globalAlpha = p;
      const x0 = cx + (id === 'max' || id === 'min' ? 22 : bw / 2 + 10), x1 = cx + bw / 2 + 74;
      x.strokeStyle = `rgba(${col},.85)`; x.lineWidth = 2.5; x.setLineDash([7, 7]);
      x.beginPath(); x.moveTo(x0, y); x.lineTo(lerp(x0, x1, E.out3(p)), y); x.stroke(); x.setLineDash([]);
      x.fillStyle = `rgb(${col})`; x.beginPath(); x.arc(x0, y, 7, 0, 6.2832); x.fill();
      x.font = "400 66px 'Bebas Neue'"; x.textAlign = 'left'; x.textBaseline = 'middle';
      x.fillStyle = `rgb(${col})`; x.shadowColor = `rgba(${col},.45)`; x.shadowBlur = 16;
      x.fillText(txt, x1 + 16 - (1 - p) * 20, y + 3); x.restore();
    }
    const izq = [['mechaArriba', 'MECHA', Y(h), yTopCuerpo], ['cuerpo', 'CUERPO', yTopCuerpo, yBotCuerpo], ['mechaAbajo', 'MECHA', yBotCuerpo, Y(l)]];
    for (const [id, txt, ya, yb] of izq) {
      const w = et[id]; if (!w) continue;
      const p = P(t, w[0], .45, E.out3) * (w[1] != null ? 1 - P(t, w[1], .35, E.in3) : 1); if (p <= 0) continue;
      const col = id === 'cuerpo' ? ORO2 : CREMA, xb = cx - bw / 2 - 40, ym = (ya + yb) / 2, hh = (yb - ya) / 2 * E.out3(p);
      x.save(); x.globalAlpha = p; x.strokeStyle = `rgba(${col},.9)`; x.lineWidth = 3;
      x.beginPath(); x.moveTo(xb + 16, ym - hh + 4); x.lineTo(xb, ym - hh + 4); x.lineTo(xb, ym + hh - 4); x.lineTo(xb + 16, ym + hh - 4); x.stroke();
      x.font = "400 58px 'Bebas Neue'"; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = `rgb(${col})`;
      x.shadowColor = `rgba(${col},.4)`; x.shadowBlur = 14;
      x.fillText(txt, xb - 22 + (1 - p) * 20, ym + 3); x.restore();
    }
    put(this.c, { x: k.x ?? CX, y: k.y ?? CY, s: k.s ?? 1, o: k.o ?? 1, b: k.b ?? 0, r: k.r ?? 0 });
  }
  /* punto del escenario a la altura del precio p (dx px a la derecha del centro de la vela): para colgar chips */
  aEscena(p, dx = 0) { const k = this.kk || { x: CX, y: CY, s: 1 }; return { x: k.x + dx * k.s, y: k.y + (this.Y(p) - this.o.h / 2) * k.s }; }
}
/* mezcla de dos colores 'r,g,b' (p 0..1) -> 'r,g,b' */

/* =====================================================================
   LUCHADORES: el Toro (vela verde, compra) y el Oso (vela roja, vende)
   Coordenadas del dibujo: (0,0) = el piso entre los pies, mirando hacia +x (flip: true lo da vuelta). El cuerpo es la
   vela (y -445 a -105) con su mecha arriba; brazos y piernas de goma; manos: guantes (toro) o zarpas con garras (oso).
   pose = { dy, rot, bI, bD, pI, pD }: salto, inclinacion y la posicion de cada mano y pie.
   ===================================================================== */
const POSES_L = {
  guardia:  { dy: 0, rot: 0, bI: [-112, -388], bD: [138, -378], pI: [-64, 0], pD: [78, 0] },
  golpe:    { dy: 0, rot: 7, bI: [-108, -392], bD: [352, -350], pI: [-78, 0], pD: [104, 0] },
  gancho:   { dy: 0, rot: 4, bI: [262, -416], bD: [146, -396], pI: [-64, 0], pD: [84, 0] },
  parado:   { dy: 0, rot: 0, bI: [-156, -196], bD: [156, -196], pI: [-58, 0], pD: [58, 0] },
  festeja:  { dy: -46, rot: 0, bI: [-178, -566], bD: [178, -566], pI: [-72, -12], pD: [72, -12] },
  cuernos:  { dy: -18, rot: -12, bI: [-166, -246], bD: [164, -246], pI: [-58, 0], pD: [72, 0] },
  agacha:   { dy: 24, rot: 10, bI: [-158, -226], bD: [170, -268], pI: [-74, 0], pD: [92, 0] },
  zarpaArr: { dy: -12, rot: -8, bI: [-140, -300], bD: [120, -640], pI: [-62, 0], pD: [74, 0] },
  zarpaAba: { dy: 8, rot: 12, bI: [-140, -300], bD: [330, -150], pI: [-62, 0], pD: [86, 0] },
  susto:    { dy: -96, rot: -10, bI: [-196, -520], bD: [196, -520], pI: [-96, -34], pD: [96, -46] },
  carga:    { dy: 0, rot: 18, bI: [-40, -320], bD: [190, -300], pI: [-70, 0], pD: [92, 0] },
  cansado:  { dy: 18, rot: 4, bI: [-150, -150], bD: [150, -150], pI: [-70, 0], pD: [70, 0] },
  sentado:  { dy: 84, rot: -5, bI: [-168, -150], bD: [158, -150], pI: [70, -6], pD: [156, -6] },
  pulsa:    { dy: 6, rot: -8, bI: [-282, -180], bD: [140, -360], pI: [-70, 0], pD: [74, 0] },
  empuja:   { dy: -8, rot: 2, bI: [20, -600], bD: [90, -600], pI: [-64, 0], pD: [74, 0] },
  presiona: { dy: 20, rot: 10, bI: [110, -500], bD: [180, -500], pI: [-74, 0], pD: [92, 0] },
  zarpaFin: { dy: 10, rot: 12, bI: [-140, -300], bD: [112, -228], pI: [-62, 0], pD: [86, 0] },
};
/* tramos [[t, 'pose', dur?], ...]: cada cambio dura dur (.22 s) con rebote */
function poseL(t, tramos) {
  let a = POSES_L[tramos[0][1]], b = a, k = 1;
  for (let i = 1; i < tramos.length; i++) {
    const [t0, n, d = .22] = tramos[i];
    if (t >= t0) { a = POSES_L[tramos[i - 1][1]]; b = POSES_L[n]; k = E.back(clamp((t - t0) / d)); }
  }
  if (b === a) return a;
  const L = (x, y) => lerp(x, y, k), LL = (x, y) => [L(x[0], y[0]), L(x[1], y[1])];
  return { dy: L(a.dy, b.dy), rot: L(a.rot, b.rot), bI: LL(a.bI, b.bI), bD: LL(a.bD, b.bD), pI: LL(a.pI, b.pI), pD: LL(a.pD, b.pD) };
}
class Luchador {
  constructor(padre, tipo = 'toro', { z = 6, semilla = 1 } = {}) {
    this.tipo = tipo; this.seed = semilla;
    const T = tipo === 'toro';
    const C = this.C = T ? { c0: '#7ff7cc', c1: '#22d39a', c2: '#0b875d', lim: '#0d6f4c', osc: '#053b28', hoc: '#c8f6e1', par: '#1fc28e' }
      : { c0: '#ffadbd', c1: '#ff4d6a', c2: '#b81c40', lim: '#9b1634', osc: '#4a0918', hoc: '#ffd9d1', par: '#f2445f' };
    const g = dId('lg'), h = dId('lh'), m = dId('lm'), sn = dId('ls');
    const cuernos = `<g class="cuernos">${[1, -1].map(s => `<g transform="scale(${s} 1)">
        <path d="M-104 -404 C-158 -414 -196 -470 -184 -566 C-168 -512 -134 -476 -76 -448 Z" fill="url(#${h})" stroke="#a5813a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M-124 -412 C-128 -424 -116 -440 -104 -446" fill="none" stroke="rgba(165,129,58,.75)" stroke-width="5" stroke-linecap="round"/>
        <path d="M-146 -432 C-150 -446 -140 -462 -128 -466" fill="none" stroke="rgba(165,129,58,.6)" stroke-width="4" stroke-linecap="round"/></g>`).join('')}</g>`;
    const orejasOso = [1, -1].map(s => `<g transform="scale(${s} 1)"><circle cx="-90" cy="-436" r="46" fill="${C.c2}"/><circle cx="-90" cy="-436" r="25" fill="#ffb8c6"/></g>`).join('');
    const orejasToro = [1, -1].map(s => `<g transform="scale(${s} 1)"><path d="M-110 -398 Q-176 -414 -194 -368 Q-152 -352 -110 -366 Z" fill="${C.c2}"/>
        <path d="M-118 -390 Q-164 -398 -176 -372 Q-148 -366 -118 -374 Z" fill="#ff9fb3" opacity=".7"/></g>`).join('');
    const hocico = T ? `<ellipse cx="0" cy="-258" rx="88" ry="52" fill="url(#${sn})"/>
        <ellipse cx="-30" cy="-264" rx="10" ry="14" fill="${C.osc}"/><ellipse cx="30" cy="-264" rx="10" ry="14" fill="${C.osc}"/>
        <ellipse cx="-36" cy="-282" rx="22" ry="8" fill="rgba(255,255,255,.35)"/>
        <circle class="aro" cx="0" cy="-221" r="15" fill="none" stroke="#f4c430" stroke-width="7"/>`
      : `<ellipse cx="0" cy="-262" rx="72" ry="52" fill="url(#${sn})"/>
        <path d="M-24 -300 Q0 -312 24 -300 Q18 -278 0 -273 Q-18 -278 -24 -300 Z" fill="#2a1418"/><ellipse cx="-8" cy="-302" rx="7" ry="4" fill="rgba(255,255,255,.55)"/>`;
    const mano = T ? `<g class="mano"><ellipse cx="10" cy="0" rx="44" ry="38" fill="url(#${m})"/><ellipse cx="2" cy="-30" rx="18" ry="12" fill="${C.c1}"/>
        <ellipse cx="22" cy="-10" rx="16" ry="9" fill="rgba(255,255,255,.35)"/><rect x="-40" y="-26" width="20" height="52" rx="9" fill="#f4f1ea"/></g>`
      : `<g class="mano"><circle r="36" fill="url(#${m})"/>${[-18, 0, 18].map(y => `<path d="M26 ${y - 7} Q50 ${y - 4} 58 ${y + 3} Q44 ${y + 6} 26 ${y + 7} Z" fill="#fff6ee" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`).join('')}
        <circle cx="-8" cy="-12" r="9" fill="rgba(255,255,255,.25)"/></g>`;
    const pie = T ? `<g class="pie"><path d="M-34 0 Q-36 -30 0 -30 Q36 -30 40 0 Z" fill="#2c3138"/><path d="M4 -28 L4 0" stroke="#111418" stroke-width="5"/><rect x="-36" y="-4" width="78" height="8" rx="4" fill="#1b1e23"/></g>`
      : `<g class="pie"><ellipse cx="4" cy="-14" rx="40" ry="20" fill="${C.lim}"/>${[-18, 2, 22].map(x => `<circle cx="${x}" cy="-26" r="8" fill="#ffb8c6"/>`).join('')}</g>`;
    this.el = mk('div', `L z${z}`, padre, `<svg viewBox="-280 -660 560 680" width="560" height="680" style="display:block;overflow:visible">
      <defs>${dGrad(g, [[0, C.c0], [.42, C.c1], [1, C.c2]], .4, 1)}${dGrad(h, [[0, '#fffaf0'], [.55, '#f1ddb0'], [1, '#c8a45c']], 1, 1)}
        ${dRadial(m, [[0, C.c1], [1, C.lim]], .35, .3, .75)}${dGrad(sn, [[0, '#ffffff'], [1, C.hoc]])}</defs>
      <ellipse class="sombra" cx="0" cy="8" rx="150" ry="22" fill="rgba(0,0,0,.45)" style="filter:blur(7px)"/>
      <g class="raiz">
        ${['pI', 'pD'].map(c => `<g class="${c}"><path class="pierna" fill="none" stroke="${C.lim}" stroke-width="32" stroke-linecap="round"/>${pie}</g>`).join('')}
        <g class="cuerpo">
          ${T ? cuernos : orejasOso}
          <line x1="0" y1="-440" x2="0" y2="-512" stroke="${C.osc}" stroke-width="12" stroke-linecap="round"/>
          <rect x="-118" y="-446" width="236" height="342" rx="56" fill="url(#${g})"/>
          <rect x="-118" y="-446" width="236" height="342" rx="56" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="4"/>
          <path d="M-90 -414 Q-104 -300 -94 -170" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="15" stroke-linecap="round"/>
          <path d="M96 -200 Q104 -150 80 -118" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="12" stroke-linecap="round"/>
          ${T ? orejasToro : ''}
          <ellipse cx="-80" cy="-300" rx="22" ry="12" fill="rgba(255,120,150,.32)"/><ellipse cx="80" cy="-300" rx="22" ry="12" fill="rgba(255,120,150,.32)"/>
          ${dOjos(C.par, { y: -352, e: 1.16, sep: 46 })}
          <path class="cjI" d="M-84 -404 Q-56 -420 -28 -408" fill="none" stroke="${C.osc}" stroke-width="13" stroke-linecap="round"/>
          <path class="cjD" d="M28 -408 Q56 -420 84 -404" fill="none" stroke="${C.osc}" stroke-width="13" stroke-linecap="round"/>
          ${hocico}
          ${T ? dBoca(0, -186, .9) : dBoca(0, -246, .74)}
        </g>
        ${['bI', 'bD'].map(c => `<g class="${c}"><path class="brazo" fill="none" stroke="${C.lim}" stroke-width="28" stroke-linecap="round"/>${mano}</g>`).join('')}
      </g></svg>`);
    const q = s => this.el.querySelector(s);
    this.r = { raiz: q('.raiz'), cuerpo: q('.cuerpo'), sombra: q('.sombra'), cI: q('.cjI'), cD: q('.cjD'),
      ext: ['bI', 'bD', 'pI', 'pD'].map(c => { const gg = q('.' + c); return { c, p: gg.querySelector('.brazo,.pierna'), m: gg.querySelector('.mano,.pie') }; }) };
  }
  /* (x, y) = el piso entre los pies en la capa padre · corre: 0..1 mezcla un ciclo de carrera (fase en radianes) */
  pintar(t, { x = CX, y = 1300, s = 1, flip = false, o = 1, b = 0, r = 0, br = 1, pose = POSES_L.guardia, mira = [0, 0], boca = 'seria', ceno = 0, cierre = 0,
    corre = 0, fase = 0, rebote = 1, aplasta = 0 } = {}) {
    if (!(o > .002)) { off(this.el); return; }
    const R = this.r, sd = this.seed;
    let { dy, rot, bI, bD, pI, pD } = pose;
    dy += -Math.abs(Math.sin(t * 5.2 + sd)) * 10 * rebote;                     // saltito de boxeador
    if (corre > 0) {
      const sI = Math.sin(fase), cI = Math.cos(fase);
      pI = [lerp(pI[0], -40 + 92 * sI, corre), lerp(pI[1], -Math.max(0, 62 * cI), corre)];
      pD = [lerp(pD[0], 46 - 92 * sI, corre), lerp(pD[1], -Math.max(0, -62 * cI), corre)];
      dy -= Math.abs(Math.sin(fase)) * 26 * corre;
      bI = [lerp(bI[0], -30 - 80 * sI, corre), bI[1]]; bD = [lerp(bD[0], 170 + 80 * sI, corre), bD[1]];
    }
    R.raiz.setAttribute('transform', `translate(0 ${dy.toFixed(1)}) rotate(${rot.toFixed(2)} 0 -110)`);
    // aplastarse / estirarse (golpes): el cuerpo se ensancha y baja desde los pies
    R.cuerpo.setAttribute('transform', aplasta ? `translate(0 -110) scale(${(1 + .14 * aplasta).toFixed(3)} ${(1 - .14 * aplasta).toFixed(3)}) translate(0 110)` : '');
    const sh = [[-112, -318], [112, -318]], cad = [[-56, -112], [56, -112]];
    R.ext.forEach((e, i) => {
      const brazo = i < 2, [x0, y0] = brazo ? sh[i] : cad[i - 2], [x1, y1] = [bI, bD, pI, pD][i];
      const dx = x1 - x0, dy2 = y1 - y0, L = Math.hypot(dx, dy2) || 1;
      let nx = -dy2 / L, ny = dx / L; if (ny < 0) { nx = -nx; ny = -ny; }                // el codo/rodilla cae hacia abajo
      const doble = brazo ? 30 * clamp(1 - L / 260) + 10 : 8 * (i === 2 ? -1 : 1);
      const cx = (x0 + x1) / 2 + nx * doble, cy = (y0 + y1) / 2 + ny * doble;
      e.p.setAttribute('d', `M${x0} ${y0} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
      const ang = Math.atan2(y1 - cy, x1 - cx) * 180 / Math.PI;
      e.m.setAttribute('transform', brazo ? `translate(${x1.toFixed(1)} ${y1.toFixed(1)}) rotate(${ang.toFixed(1)})` : `translate(${x1.toFixed(1)} ${y1.toFixed(1)})`);
    });
    cara(this.el, t, { mira, boca, cierre, ceno, semilla: sd });
    const ca = ceno * 20, cy = ceno > 0 ? 6 * ceno : -10 * -ceno;
    R.cI.setAttribute('transform', `translate(0 ${cy.toFixed(1)}) rotate(${ca.toFixed(1)} -56 -410)`);
    R.cD.setAttribute('transform', `translate(0 ${cy.toFixed(1)}) rotate(${(-ca).toFixed(1)} 56 -410)`);
    R.sombra.setAttribute('transform', `scale(${(1 - clamp(-dy / 300) * .5).toFixed(3)} 1)`);
    put(this.el, { x, y, s, sx: flip ? -1 : 1, o, b, r, br, ax: 50, ay: 660 / 680 * 100 });
  }
  /* un punto del dibujo (local) en la capa padre, con la misma colocacion que pintar */
  punto([lx, ly], { x = CX, y = 1300, s = 1, flip = false } = {}) { return [x + (flip ? -lx : lx) * s, y + ly * s]; }
}

