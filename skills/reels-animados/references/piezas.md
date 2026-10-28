# Piezas del kit (estudio-videos/reels)

Cada cuadro es `render(t)`: todo es funcion pura del tiempo. Motor base: `put(el, {x, y, s, sx, sy, r, o, b, br, ax, ay})`,
`off(el)`, `mk(tag, cls, padre, html)`, `css(txt)`, `P(t, t0, dur, curva)`, `E.out3/io3/in3/back/...`, `bump(t, t0, d)`,
`KF(t, norm(keys))`, `sfx(t, 'nombre', {vol})` (efectos: golpe, golpe-corto, golpe-grave, impacto, pop, tick, tick-suave,
aire, aire-salida, swell, barrido, transicion, campana, nota, nota-doble, brillo, click, tecla, tecleo, notificacion,
subida, fallo, descarte, glitch, corte, ping, bip), `icon(nombre, tam, grosor)` (lucide: trendingUp, trendingDown,
crown, users, coins, clock, lock, bell, trophy, scale, zap, check, x, arrowUp, arrowDown, shieldCheck, messageSquare...).

## base.js (los dos formatos)

- Tiempo: `FR` (inicio y fin de cada frase), `NF`, `tw(frase, 'palabra', n)`, `XC(i)` (corte tras la frase i),
  `ini(f)`, `finF(f)`, `en(t, a, b)`, `ocultar(...els)`, `rng(semilla)`, `hashC(i, k)` (en cine.js).
- Colores: `ACENTO`/`ACENTO2` (= `ORO`/`ORO2`), `CREMA`, `VERDE`, `ROJO`, `AZUL`, `GRIS` (rgb en texto para canvas) y
  `MARCA.acento`, `MARCA.acentoRGB`... para CSS.
- Formato grafico: `escena(f0, f1, html, pintar)` (entra al empezar la frase f0 y sale entera antes del corte tras f1),
  `titulo(['LINEA', '*CLAVE*'])` (`*` acento, `+` verde, `~` rojo), `titular(el, t, a, tAcento)`, `eyebrow(txt)`,
  `chip(txt, 'v'|'r')`, `ent(el, t, t0, x, y, {dy, s0, pulso, t1})`, `brote(...)`, `sino(ok)`, `LAY` (ey 262, tit 440,
  graf 1000, sub 1480), `subtitulos({ocultar})`, `ctaComentar({a, tPregunta, tClave, tSenales, tEscribe, tEnvia, palabra,
  lineas, sub, aviso})`, `TINTE` (halo verde/rojo del fondo), `CAMK` (camara general), `PINTAR.push(fn)`.
- Canvas: `rr()`, `pildoraCanvas()`, `pasoBonito()`, `mixRGB()`.

## cine.js (--cine)

- `Plano(z)`: capa de 1080x1920 con camara propia: `.ver({ s, fx, fy, r, o, b })` ((fx, fy) = punto del mundo al centro).
  Fondos que se panean: SVG mas ancho que 1080 (ej. viewBox -300 0 1680 1920 centrado en x 540).
- `camaraEn(t, [[t, {s, fx, fy, r}, curva], ...], {desenfoque})` -> camara + desenfoque segun la velocidad.
- Transiciones (corte en tc): `atravesar(t, tc, px, py, d, zoom, fx0, fy0, s0)` -> `.a` (la que entra en el punto) y `.b`
  (la nueva, que nace chica); `barrido(t, tc)` -> `.a.dx`/`.b.dx` y desenfoque; `iris(el, k, x, y)`.
- Ambiente: `Bokeh(padre, {colores, alto})`, `luz(padre, color)`, `etalonaje()`, `vineta(padre)`, `sacudones(t, [[t0, amp, dur]])`,
  `deADos(t)` (personajes a 15 cps).
- Caras: `dOjos(colorParpado, {x, y, e, sep})`, `dBoca(x, y, e)`, `dCarita()`, y `cara(el, t, {mira:[x,y], boca, cierre,
  ceno, semilla})`; bocas: feliz, euforia, triste, seria, o, mueca, grito, dientes. Cualquier SVG con esas piezas "actua".
- Objetos: `dMoneda(w, {cara, signo})` (el dinero del que mira; con etiqueta `tuTag` "TÚ"), `dMonedita`, `dChispa`,
  `dEstrella`, `dBoton(texto, colores)`, `dLupa`, `dGota`, `dCorona`, `dSello(texto, color)`, chips `cchip` (o/v/r).
- `ap(el, t, t0, t1, {x, y, s0, dy, r, d})`: entra con rebote y sale con fundido (devuelve el progreso).
- `SubViral({ resaltar: [[frase, 'palabra'], ...], ocultar })`: subtitulos arriba; `PINTAR.push(t => SUB.pintar(t))`.
- `ctaCine({ a: XC(n-1), tEscribe, tEnvia, palabra, personajes: (t, k) => {...} })`: cierre con caja de comentario;
  crea los personajes dentro de `CIERRE.PL.el`.

## Receta de una escena de cine (patron de r09-r11)

```js
const T2 = { ven: tw(2, 'venden'), gol: tw(2, 'golpea') };          // anclas de la frase 2
const PL2 = new Plano(5);
const FON2 = dEl(PL2.el, '', `<svg ...fondo con su ambiente...>`, 2);
const OBJ = dEl(PL2.el, '', dMoneda(140), 7);
sfx(T2.gol, 'impacto', { vol: .9 });
function pintar2(t) {
  if (t < XC(1) - .35 || t >= XC(2) + .35) { off(PL2.el); return; }     // ventana de la frase + transiciones
  const z = atravesar(t, XC(1), 0, 0, .7), entra = t < XC(1) + .35;
  if (!PL2.ver({ s: entra ? z.b.s : 1, o: entra ? z.b.o : 1, b: entra ? z.b.b : 0 })) return;
  put(FON2, { x: CX, y: CY });
  put(OBJ, { x: 540, y: 1300 - 200 * P(t, T2.ven, .4, E.back) }); cara(OBJ, deADos(t), { boca: t > T2.gol ? 'o' : 'feliz' });
}
PINTAR.push(pintar2);
```

## Modulo trading (nichos/trading.js)

`Grafico({velas, h, padre, titulo})` con `.vista`, `.rev`, `.zona()`, `.linea()`, `.marca()`, `.flecha()`, `.fibo()`,
`.posicion()`, `.liquidez()`, `.foco()`; `serie(pasos)`, `ondas()`, `VelaGigante`, `tarjetaPatron()`,
`Luchador(padre, 'toro'|'oso')` + `POSES_L` / `poseL(t, tramos)` (guardia, golpe, festeja, susto, carga, cansado,
sentado, pulsa, empuja, presiona...). Ejemplos de uso: `estudio-videos/trading/r01.js` ... `r11.js`.
