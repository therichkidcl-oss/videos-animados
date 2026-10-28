// Estilo PAPEL: recortes con borde rasgado, trazos a mano que se dibujan (rough.js), stop-motion, sello y cortina.
// Cargar despues de base/vendor/rough.js y base/escena.js. TODO usa semillas: el render es cuadro a cuadro y
// debe salir igual cada vez (nada de Math.random).
(function () {
  function azar(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Poligono de un rectangulo w x h con los bordes rasgados (hacia adentro, para no salirse de su caja).
  // o.amp = cuanto muerde el borde (px), o.paso = cada cuantos px cambia, o.lados = 'tlbr' (que lados rasgar).
  function rasgado(w, h, o) {
    o = o || {};
    var r = azar(o.seed || 1), amp = o.amp == null ? 5 : o.amp, paso = o.paso || 9, lados = o.lados || 'tlbr';
    var pts = [];
    function borde(x0, y0, x1, y1, nx, ny, activo) {
      var largo = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(largo / paso));
      for (var i = 0; i < n; i++) {
        var k = i / n, d = 0;
        if (activo) d = r() * amp + (r() < 0.06 ? r() * amp * 1.6 : 0);
        pts.push([x0 + (x1 - x0) * k + nx * d, y0 + (y1 - y0) * k + ny * d]);
      }
    }
    borde(0, 0, w, 0, 0, 1, lados.indexOf('t') >= 0);
    borde(w, 0, w, h, -1, 0, lados.indexOf('r') >= 0);
    borde(w, h, 0, h, 0, -1, lados.indexOf('b') >= 0);
    borde(0, h, 0, 0, 1, 0, lados.indexOf('l') >= 0);
    return 'polygon(' + pts.map(function (p) { return (p[0] / w * 100).toFixed(2) + '% ' + (p[1] / h * 100).toFixed(2) + '%'; }).join(',') + ')';
  }

  // Rasga todos los .p-corte de la escena. data-amp, data-lados y data-seed en el .p-corte ajustan el corte.
  // Si el padre tiene .con-borde, agrega detras un borde blanco un poco mas grande (el filo blanco del papel rasgado).
  function rasgarTodo() {
    var semilla = 11;
    document.querySelectorAll('.p-corte').forEach(function (c) {
      var w = c.offsetWidth, h = c.offsetHeight;
      if (!w || !h) return;
      var amp = +(c.dataset.amp || 5), lados = c.dataset.lados || 'tlbr', seed = +(c.dataset.seed || (semilla += 7));
      c.style.clipPath = rasgado(w, h, { amp: amp, lados: lados, seed: seed, paso: +(c.dataset.paso || 9) });
      if (c.parentElement.classList.contains('con-borde') && !c.previousElementSibling?.classList?.contains('p-borde')) {
        var b = document.createElement('div');
        b.className = 'p-borde';
        b.style.clipPath = rasgado(w, h, { amp: Math.max(1, amp * 0.45), lados: lados, seed: seed + 3, paso: 7 });
        c.parentElement.insertBefore(b, c);
        c.style.clipPath = rasgado(w, h, { amp: amp * 1.5 + 3, lados: lados, seed: seed, paso: +(c.dataset.paso || 9) });
      }
    });
  }

  var NS = 'http://www.w3.org/2000/svg';
  var capa = null;
  function capaTrazos() {
    if (!capa) {
      capa = document.createElementNS(NS, 'svg');
      capa.setAttribute('class', 'p-trazos');
      capa.setAttribute('viewBox', '0 0 1920 1080');
      document.querySelector('.p-escena').appendChild(capa);
    }
    return capa;
  }

  // Los atributos SVG que escribe rough.js no entienden var(--x): se pasa el color real del tema
  function color(c) {
    var m = c && String(c).match(/^var\((--[\w-]+)\)$/);
    return m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() : c;
  }

  var semillaTrazo = 101;
  // Dibuja una figura con trazo a mano. tipo: 'linea' | 'rect' | 'elipse' | 'curva' | 'camino' | 'flecha'
  // Devuelve el <g> (oculto hasta que papel.dibujar lo anime). o.en = svg destino (por defecto la capa global).
  function trazo(tipo, args, o) {
    o = o || {};
    var svg = o.en || capaTrazos();
    var rc = rough.svg(svg);
    var op = {
      roughness: o.aspereza == null ? 1.3 : o.aspereza,
      bowing: o.curvatura == null ? 1.1 : o.curvatura,
      stroke: color(o.color || 'var(--tinta)'),
      strokeWidth: o.grosor || 4,
      seed: o.seed || (semillaTrazo += 13),
      fill: color(o.relleno),
      fillStyle: o.estiloRelleno || 'hachure',
      hachureGap: o.separacion || 12,
      fillWeight: o.grosorRelleno || 2.5,
      disableMultiStroke: !!o.unTrazo,
    };
    var g;
    if (tipo === 'linea') g = rc.line(args[0], args[1], args[2], args[3], op);
    else if (tipo === 'rect') g = rc.rectangle(args[0], args[1], args[2], args[3], op);
    else if (tipo === 'elipse') g = rc.ellipse(args[0], args[1], args[2], args[3], op);
    else if (tipo === 'curva') g = rc.curve(args, op);
    else if (tipo === 'camino') g = rc.path(args, op);
    else if (tipo === 'flecha') {
      // args = [x0, y0, x1, y1, curva]: linea curva + punta
      var x0 = args[0], y0 = args[1], x1 = args[2], y1 = args[3], cv = args[4] || 0;
      var mx = (x0 + x1) / 2 - (y1 - y0) * cv, my = (y0 + y1) / 2 + (x1 - x0) * cv;
      g = document.createElementNS(NS, 'g');
      g.appendChild(rc.curve([[x0, y0], [mx, my], [x1, y1]], op));
      var ang = Math.atan2(y1 - my, x1 - mx), L = 26;
      g.appendChild(rc.line(x1, y1, x1 - L * Math.cos(ang - 0.45), y1 - L * Math.sin(ang - 0.45), op));
      g.appendChild(rc.line(x1, y1, x1 - L * Math.cos(ang + 0.45), y1 - L * Math.sin(ang + 0.45), op));
    }
    if (o.clase) g.setAttribute('class', o.clase);
    svg.appendChild(g);
    g.querySelectorAll('path').forEach(function (p) {
      var largo = p.getTotalLength();
      p.style.strokeDasharray = largo + ' ' + largo;
      p.style.strokeDashoffset = largo;
    });
    return g;
  }

  // Anima el dibujo de uno o varios trazos (lineas que aparecen como hechas con plumon). Devuelve cuando termina.
  function dibujar(tl, grupos, t, dur) {
    if (!Array.isArray(grupos)) grupos = [grupos];
    var paths = [];
    grupos.forEach(function (g) { g.querySelectorAll('path').forEach(function (p) { paths.push(p); }); });
    if (!paths.length) return t;
    var total = paths.reduce(function (s, p) { return s + p.getTotalLength(); }, 0) || 1;
    var cursor = t;
    dur = dur || 0.7;
    paths.forEach(function (p) {
      var d = Math.max(0.03, dur * p.getTotalLength() / total);
      tl.to(p, { strokeDashoffset: 0, duration: d, ease: 'none' }, cursor);
      cursor += d * 0.92;
    });
    return +(t + dur).toFixed(3);
  }

  // Dibujos a mano listos (cada uno devuelve una lista de trazos para papel.dibujar). o.color, o.grosor.
  function op(svg, o, extra) {
    var r = { en: svg, color: (o && o.color) || '#1c1b18', grosor: (o && o.grosor) || 4 };
    for (var k in extra) r[k] = extra[k];
    return r;
  }
  var dibujos = {
    reloj: function (svg, cx, cy, r, o) {
      return [
        trazo('elipse', [cx, cy, r * 2, r * 2], op(svg, o)),
        trazo('rect', [cx - r * 0.2, cy - r * 1.34, r * 0.4, r * 0.24], op(svg, o)),
        trazo('linea', [cx, cy, cx, cy - r * 0.66], op(svg, o, { grosor: ((o && o.grosor) || 4) + 1 })),
        trazo('linea', [cx, cy, cx + r * 0.46, cy + r * 0.2], op(svg, o)),
      ];
    },
    calendario: function (svg, x, y, w, h, o) {
      var t = [trazo('rect', [x, y, w, h], op(svg, o)), trazo('linea', [x, y + h * 0.26, x + w, y + h * 0.26], op(svg, o))];
      t.push(trazo('linea', [x + w * 0.28, y - h * 0.1, x + w * 0.28, y + h * 0.12], op(svg, o)));
      t.push(trazo('linea', [x + w * 0.72, y - h * 0.1, x + w * 0.72, y + h * 0.12], op(svg, o)));
      for (var f = 0; f < 3; f++) for (var c = 0; c < 4; c++) {
        var px = x + w * (0.16 + c * 0.23), py = y + h * (0.44 + f * 0.2);
        t.push(trazo('linea', [px, py, px + w * 0.09, py], op(svg, o, { grosor: 3 })));
      }
      return t;
    },
    balanza: function (svg, cx, cy, s, o) {
      return [
        trazo('linea', [cx, cy - s * 0.5, cx, cy + s * 0.5], op(svg, o)),
        trazo('linea', [cx - s * 0.3, cy + s * 0.5, cx + s * 0.3, cy + s * 0.5], op(svg, o)),
        trazo('linea', [cx - s * 0.62, cy - s * 0.36, cx + s * 0.62, cy - s * 0.44], op(svg, o)),
        trazo('curva', [[cx - s * 0.82, cy - s * 0.02], [cx - s * 0.62, cy + s * 0.14], [cx - s * 0.42, cy - s * 0.02]], op(svg, o)),
        trazo('curva', [[cx + s * 0.42, cy - s * 0.1], [cx + s * 0.62, cy + s * 0.06], [cx + s * 0.82, cy - s * 0.1]], op(svg, o)),
        trazo('linea', [cx - s * 0.62, cy - s * 0.36, cx - s * 0.8, cy - s * 0.02], op(svg, o, { grosor: 2 })),
        trazo('linea', [cx - s * 0.62, cy - s * 0.36, cx - s * 0.44, cy - s * 0.02], op(svg, o, { grosor: 2 })),
        trazo('linea', [cx + s * 0.62, cy - s * 0.44, cx + s * 0.44, cy - s * 0.1], op(svg, o, { grosor: 2 })),
        trazo('linea', [cx + s * 0.62, cy - s * 0.44, cx + s * 0.8, cy - s * 0.1], op(svg, o, { grosor: 2 })),
      ];
    },
    moneda: function (svg, cx, cy, r, o) {
      var s = r * 1.1, x = cx - s / 2, y = cy - s / 2;
      var d = 'M ' + (x + s * 0.7) + ' ' + (y + s * 0.24) + ' C ' + (x + s * 0.58) + ' ' + (y + s * 0.08) + ', ' + (x + s * 0.18) + ' ' + (y + s * 0.12) + ', ' + (x + s * 0.24) + ' ' + (y + s * 0.36) +
        ' C ' + (x + s * 0.3) + ' ' + (y + s * 0.56) + ', ' + (x + s * 0.78) + ' ' + (y + s * 0.46) + ', ' + (x + s * 0.76) + ' ' + (y + s * 0.7) +
        ' C ' + (x + s * 0.74) + ' ' + (y + s * 0.92) + ', ' + (x + s * 0.32) + ' ' + (y + s * 0.92) + ', ' + (x + s * 0.24) + ' ' + (y + s * 0.74);
      return [
        trazo('elipse', [cx, cy, r * 2, r * 2], op(svg, o)),
        trazo('camino', d, op(svg, o, { aspereza: 0.8 })),
        trazo('linea', [cx, y - s * 0.06, cx, y + s * 1.06], op(svg, o)),
      ];
    },
    check: function (svg, x, y, s, o) {
      return [trazo('linea', [x, y + s * 0.55, x + s * 0.36, y + s], op(svg, o)), trazo('linea', [x + s * 0.36, y + s, x + s, y], op(svg, o))];
    },
    cruz: function (svg, x, y, s, o) {
      return [trazo('linea', [x, y, x + s, y + s], op(svg, o)), trazo('linea', [x + s, y, x, y + s], op(svg, o))];
    },
    enchufe: function (svg, x, y, s, o) {
      return [
        trazo('rect', [x, y, s, s * 0.7], op(svg, o)),
        trazo('linea', [x + s * 0.28, y, x + s * 0.28, y - s * 0.32], op(svg, o)),
        trazo('linea', [x + s * 0.72, y, x + s * 0.72, y - s * 0.32], op(svg, o)),
        trazo('curva', [[x + s * 0.5, y + s * 0.7], [x + s * 0.4, y + s * 1.1], [x + s * 0.8, y + s * 1.4], [x + s * 0.6, y + s * 1.8]], op(svg, o)),
      ];
    },
    claqueta: function (svg, x, y, w, h, o) {
      var t = [trazo('rect', [x, y + h * 0.28, w, h * 0.72], op(svg, o)), trazo('rect', [x, y, w, h * 0.22], op(svg, o))];
      for (var k = 0; k < 4; k++) t.push(trazo('linea', [x + w * (0.08 + k * 0.24), y + h * 0.22, x + w * (0.2 + k * 0.24), y], op(svg, o, { grosor: 3 })));
      return t;
    },
    flecha: function (svg, x0, y0, x1, y1, curva, o) { return [trazo('flecha', [x0, y0, x1, y1, curva || 0.15], op(svg, o))]; },
    subrayado: function (svg, x0, y0, x1, o) { return [trazo('linea', [x0, y0, x1, y0 - 3], op(svg, o, { aspereza: 1.5 }))]; },
  };

  window.papel = {
    azar: azar,
    rasgado: rasgado,
    trazo: trazo,
    dibujar: dibujar,
    dibujos: dibujos,

    // Prepara la escena: rasga los recortes. Llamar antes de armar el timeline.
    preparar: function () { rasgarTodo(); },

    // El recorte cae y aterriza (cae desde arriba con giro y rebote)
    soltar: function (tl, sel, t, o) {
      o = o || {};
      var giro = o.giro == null ? -7 : o.giro;
      tl.fromTo(sel, { opacity: 0, y: o.y == null ? -110 : o.y, rotation: giro * 2.2, scale: 1.08 },
        { opacity: 1, y: 0, rotation: o.final == null ? 0 : o.final, scale: 1, duration: o.dur || 0.62,
          stagger: o.stagger || 0.12, ease: 'back.out(1.5)' }, t);
    },
    // Entra deslizando desde un lado, como si lo empujaran sobre la mesa
    deslizar: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, x: o.x == null ? -260 : o.x, rotation: o.giro == null ? -10 : o.giro },
        { opacity: 1, x: 0, rotation: o.final == null ? 0 : o.final, duration: o.dur || 0.7, stagger: o.stagger || 0.1,
          ease: 'power4.out' }, t);
    },
    // Aparece con un "pop" de papel (escala con rebote)
    pop: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, scale: 0.4, rotation: o.giro == null ? -12 : o.giro },
        { opacity: 1, scale: 1, rotation: o.final == null ? 0 : o.final, duration: o.dur || 0.5, stagger: o.stagger || 0.08,
          ease: 'back.out(2.2)' }, t);
    },
    // Texto escrito a mano: se descubre de izquierda a derecha, a saltos (como trazos). El recorte deja margen
    // (inset negativo) porque las letras a mano sobresalen de su caja y si no se corta la ultima.
    escribir: function (tl, sel, t, dur) {
      tl.fromTo(sel, { clipPath: 'inset(-25% 100% -25% -6%)' },
        { clipPath: 'inset(-25% -10% -25% -6%)', duration: dur || 0.8, ease: 'steps(' + Math.max(4, Math.round((dur || 0.8) * 14)) + ')' }, t);
    },
    // Sello de goma: golpea y queda
    sello: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, scale: 2.6, rotation: (o.giro || -10) - 14 },
        { opacity: 1, scale: 1, rotation: o.giro || -10, duration: 0.2, ease: 'power4.in' }, t);
      tl.fromTo(sel, { x: 0 }, { x: 4, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, t + 0.2);
    },
    // Stop-motion: el elemento "tiembla" a saltos (como animacion cuadro a cuadro). Usar en un envoltorio
    // interno (.hierve) para no pelear con las entradas. fps 6-8 se ve hecho a mano.
    hervir: function (tl, sel, t0, t1, o) {
      o = o || {};
      var fps = o.fps || 6, amp = o.amp == null ? 1.6 : o.amp, giro = o.giro == null ? 0.9 : o.giro;
      document.querySelectorAll(sel).forEach(function (el, k) {
        var r = azar((o.seed || 7) + k * 31);
        for (var t = t0; t < t1; t += 1 / fps) {
          tl.set(el, { x: (r() - 0.5) * 2 * amp, y: (r() - 0.5) * 2 * amp, rotation: (r() - 0.5) * 2 * giro }, +t.toFixed(3));
        }
      });
    },
    // Hojas de fondo a la deriva (vuelven a su lugar al final)
    ambiente: function (tl) {
      var d = DUR() / 2;
      document.querySelectorAll('.p-hoja').forEach(function (h, k) {
        var r = azar(400 + k * 17);
        tl.to(h, { x: (r() - 0.5) * 70, y: (r() - 0.5) * 50, rotation: (r() - 0.5) * 3, duration: d, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
      });
    },
    // Cortina de papel negro: al inicio se va hacia la derecha descubriendo la escena; al final entra desde la
    // izquierda y la tapa. Asi el corte entre escenas pasa siempre tapado.
    cortina: function (tl, o) {
      o = o || {};
      var c = document.querySelector('.p-cortina');
      if (!c) return;
      if (o.entrada !== false) tl.fromTo(c, { x: 0 }, { x: 2400, duration: 0.6, ease: 'power3.in' }, 0.02);
      else tl.set(c, { x: 2400 }, 0);
      if (o.salida !== false) tl.fromTo(c, { x: -2400 }, { x: 0, duration: 0.6, ease: 'power3.out', immediateRender: false }, +(DUR() - 0.64).toFixed(3));
    },
  };
})();
