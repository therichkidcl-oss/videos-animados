// Ayudas para escenas: tiempos de la voz + animaciones GSAP seekables.
// Cada escena carga antes: base/vendor/gsap.min.js y audio/<escena>.tiempos.js (window.TIEMPOS).
(function () {
  var TI = window.TIEMPOS;
  if (!TI) throw new Error('Falta audio/<escena>.tiempos.js (corre voz.mjs primero)');

  function frase(id) {
    var f = TI.frases[id];
    if (!f) throw new Error('Frase sin tiempo en el guion: ' + id);
    return f;
  }
  // Segundo en que la voz EMPIEZA / TERMINA una frase (+ ajuste opcional)
  window.T = function (id, extra) { return +(frase(id).inicio + (extra || 0)).toFixed(3); };
  window.TF = function (id, extra) { return +(frase(id).fin + (extra || 0)).toFixed(3); };
  window.DUR = function () { return TI.duracion; };

  function normalizar(p) {
    return String(p).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  }
  // Segundo en que la voz dice una PALABRA dentro de una frase (n = numero de aparicion, 1 por defecto)
  window.TW = function (id, palabra, n, extra) {
    var f = frase(id);
    var p = normalizar(palabra);
    var k = 0;
    for (var i = 0; i < f.palabras.length; i++) {
      if (f.palabras[i].p === p && ++k === (n || 1)) return +(f.palabras[i].t + (extra || 0)).toFixed(3);
    }
    throw new Error('La palabra "' + palabra + '" no esta en la frase ' + id);
  };

  // Parte el texto de un elemento en unidades para el tipeo: un <span> por caracter, recorriendo spans
  // internos (.parte, b, etc.). Las menciones (.chip) cuentan como UNA unidad: aparecen enteras.
  function partirCaracteres(el) {
    var unidades = [];
    function recorrer(nodo) {
      Array.from(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          Array.from(n.nodeValue).forEach(function (c) {
            var s = document.createElement('span');
            s.className = 'car';
            s.textContent = c;
            frag.appendChild(s);
            unidades.push(s);
          });
          nodo.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          if (n.classList.contains('chip')) unidades.push(n);
          else recorrer(n);
        }
      });
    }
    recorrer(el);
    return unidades;
  }

  window.anim = {
    // Entrada estandar: sube y aparece
    entrar: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, y: o.y == null ? 34 : o.y },
        { opacity: 1, y: 0, duration: o.dur || 0.6, stagger: o.stagger || 0.09, ease: o.ease || 'power3.out' }, t);
    },
    // Entrada con rebote suave (tarjetas, chips)
    pop: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, scale: 0.9, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: o.dur || 0.55, stagger: o.stagger || 0.1, ease: 'back.out(1.7)' }, t);
    },
    // Entrada desde un lado
    lado: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { opacity: 0, x: o.x == null ? -60 : o.x },
        { opacity: 1, x: 0, duration: o.dur || 0.6, stagger: o.stagger || 0.09, ease: 'power3.out' }, t);
    },
    // Baja la opacidad de algo que ya se explico (para enfocar lo nuevo)
    atenuar: function (tl, sel, t, a) {
      tl.to(sel, { opacity: a == null ? 0.35 : a, duration: 0.4, ease: 'power2.out' }, t);
    },
    resaltar: function (tl, sel, t) {
      tl.to(sel, { opacity: 1, duration: 0.4, ease: 'power2.out' }, t);
    },
    // Tipeo caracter por caracter. o.dur = segundos que debe tardar (si no, o.cps caracteres/s).
    // Devuelve el segundo en que termina.
    tipear: function (tl, el, t, o) {
      o = o || {};
      if (typeof el === 'string') el = document.querySelector(el);
      var unidades = partirCaracteres(el);
      var cps = o.dur ? Math.max(unidades.length / o.dur, 14) : (o.cps || 40);
      tl.fromTo(unidades, { opacity: 0 }, { opacity: 1, duration: 0.02, stagger: 1 / cps, ease: 'none' }, t);
      return +(t + unidades.length / cps).toFixed(3);
    },
    // Destello para texto en linea (spans dentro de un prompt), donde scale no funciona
    destello: function (tl, sel, t, o) {
      o = o || {};
      var c = o.color || '255, 192, 97';
      tl.fromTo(sel, { boxShadow: '0 0 0 0px rgba(' + c + ', 0)' },
        { boxShadow: '0 0 0 6px rgba(' + c + ', 0.6)', duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.inOut' }, t);
    },
    // Pulso de atencion (chips, tarjetas: elementos de bloque o inline-flex): crece un poco y vuelve
    pulso: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { scale: 1 }, { scale: o.escala || 1.12, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
    },
    // Marcador: el fondo de color se pinta de izquierda a derecha
    marcar: function (tl, sel, t, o) {
      o = o || {};
      tl.fromTo(sel, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: o.dur || 0.6, ease: 'power2.inOut' }, t);
    },
    // Numero que sube (ej. 0 -> 25)
    contar: function (tl, el, t, desde, hasta, dur) {
      tl.fromTo(el, { textContent: desde }, { textContent: hasta, duration: dur || 1.2, ease: 'power2.out', snap: { textContent: 1 } }, t);
    },
    // Movimiento lento del fondo: vuelve a su lugar al final, asi el corte con la escena siguiente no salta
    ambiente: function (tl) {
      var d = DUR() / 2;
      tl.to('.fondo .b1', { x: 160, y: 90, duration: d, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
      tl.to('.fondo .b2', { x: -140, y: -80, duration: d, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
    },
    // Salida: todo el contenido se funde al fondo antes del corte
    salir: function (tl, sel, o) {
      o = o || {};
      var dur = o.dur || 0.5;
      tl.to(sel || '.contenido', { opacity: 0, y: -16, duration: dur, ease: 'power2.in' }, +(DUR() - dur - 0.12).toFixed(3));
    },
  };
})();
