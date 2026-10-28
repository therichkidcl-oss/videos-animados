# Serie de reels de trading · Nova Profit (26/10/2026)

> Desde el 28/10/2026 la serie se arma con el kit general `estudio-videos/reels/` (base.js, cine.js, nichos/trading.js,
> marcas/nova.json) y la skill `reels-animados`. `trading/armar.py` ya llama a `reels/armar.py --marca nova --modulo
> trading`. `comun.js` y `cine.js` de esta carpeta quedan solo como referencia de como estaban.

Reels verticales (1080x1920, 30 fps) educativos de trading con la voz clonada de Reimo (`reimo-v3`, Qwen3-TTS local),
animados con el motor de `motor-animaciones` (HTML -> MP4, efectos + musica a -14 LUFS). Al final, CTA:
"comenta TRADING" para aprender trading y recibir senales gratis. Carpeta ignorada por git (marca y logo de Nova Profit).

## Estilo (concepto "el mercado en oro")
- Paleta Nova Profit: obsidiana calida (#0d0a06 -> #030202) + oro (#d4af37 / #f4c430), crema #e8e3d8.
  Velas: verde esmeralda (34,211,154) y rojo coral (255,77,106). Fondo limpio con halo dorado que respira y un tinte
  verde/rojo muy suave segun el mercado (`TINTE`). Cero emojis, cero B-roll: todo dibujado con codigo.
- Tipografias: Bebas Neue (titulos), Instrument Serif italica (acentos), JetBrains Mono (precios, etiquetas), Inter
  (subtitulos palabra por palabra, palabra activa en oro).
- Maqueta vertical (`LAY` en comun.js): eyebrow y=262, titulo y=440, grafico y=1000 (alto 790), subtitulos y=1480.
  Nada importante arriba de 250 ni abajo de 1540 (interfaz de Reels/TikTok); abajo a la derecha van sus botones.
- Transiciones sin encimarse: cada escena sale entera antes del corte (mitad de la pausa entre frases).

## Archivos
- `comun.js`: base de la serie. `Grafico` (velas que se forman en vivo, ventana/zoom por fotogramas clave, zona,
  linea, segmento, marca, flecha, caja, zigzag, fibo, posicion entrada/SL/TP, liquidez, foco), `VelaGigante`
  (anatomia con etiquetas, color que sigue al precio mientras se forma, paso a roja con `baja`), `serie()` para
  generar velas, titulos palabra a palabra, chips, escenas ancladas a la voz (`escena(f0, f1, html, pintar)` +
  `tw(frase, 'palabra')`), `ctaNova()` (logo + pregunta + caja de comentario que escribe TRADING + aviso de riesgo),
  `FondoNova`, `render()` y `subtitulos()`.
- `guiones.py`: los 8 guiones (notacion `palabra{pronunciacion}`, ej. `trading{tréiding}`, `1%{uno por ciento}`).
  Genera `animaciones/trading-NN-<slug>/guion.json` con `texto` (lo que lee la voz) y `pantalla` (para alinear).
- `armar.py <proyecto> <rNN.js>`: crea el proyecto desde `animaciones/dev-base`, une la voz por escenas (0,3 s al
  inicio, 0,42 s entre escenas), alinea cada palabra (`anim.py alinear`) y arma index.html (FR/PALS + comun + escenas).
- `rNN.js`: escenas de cada reel. `muestra.js`: muestra de estilo sin voz.
- `investigacion.md`: ficha verificada con fuentes (velas, patrones, accion del precio, estrategias, riesgo).

## Receta por reel
```bash
cd /c/Users/Reimo/Documents/Proyectos/estudio-videos
python trading/guiones.py 01                                   # guion.json
node herramientas/voz.mjs animaciones/trading-01-vela          # voz reimo-v3 (qwen, gratis; --proveedor local = voz de prueba)
PYTHONIOENCODING=utf-8 python trading/armar.py animaciones/trading-01-vela trading/r01.js --musica intro-scifi --nivel -15
cd animaciones/trading-01-vela && node tools/_dbg.mjs 5 20 40        # errores de JS
../../.venv-anim/Scripts/python.exe ../../motor-animaciones/scripts/anim.py revisar 2 10 20 --hoja r   # cuadros
../../.venv-anim/Scripts/python.exe ../../motor-animaciones/scripts/anim.py render --fps=30            # MP4 (~15 fps de render)
```
Entrega: `C:\Users\Reimo\Videos\Nova Profit\Reels Trading\NN - Titulo.mp4`.

## Formato cine (reels 09-11, 26/10/2026)
Pedido de Reimo: "otro formato mas animado". Usa el estilo cine que aprobo el 24/10 en VIDEOS DEVELOPER
(docs/ESTILO-CINE.md): objetos y personajes con cara, mapa desde arriba, ambientes y camara que entra de un plano al
siguiente; subtitulos virales arriba (y 360) con caja dorada en las claves. Nada de titulos grandes.
- `cine.js` (se carga con `armar.py --cine`): `Plano` (camara propia), `atravesar`, `barrido`, `iris`, `Bokeh`, `luz`,
  `vineta`, `sacudones`, caras (`dOjos`, `dBoca`, `cara`), `Luchador('toro'|'oso')` con `POSES_L`/`poseL`, `dMoneda`
  (tu dinero), `dBoton`, `dLupa`, `dGota`, `dCorona`, `dSello`, `SubViral({ resaltar })` y `ctaCine()` (cierre dorado
  con la caja que escribe TRADING y el aviso de riesgo).
- Cada escena es una funcion `pintarX(t)` en `PINTAR`, con su ventana `[XC(i-1), XC(i)]` y la transicion en el corte.
- `r09.js` toros y osos (arena desde arriba, ring, estaciones con la linea del precio, la ronda que forma la vela,
  escalera, rango, regla), `r10.js` FOMO (cuarto de noche, ciudad desde arriba, cohete, estudio de Robinhood, plan,
  paradero, etiqueta que crece), `r11.js` apalancamiento (palanca y roca, atardecer, broker con cara, cuenta en $0,
  tijeras, mapa de Europa en puntos con el limite 30:1 de ESMA, red de stop loss).
- Muestra del gancho del 09: `animaciones/trading-09-muestra`. Mapa de Europa: `mapa_puntos.py --ancho 7000
  --centro 0,0 --paso 15 --lat 34,71` -> `europa_puntos.txt` (se incrusta en r11.js).
- Ojo: no usar `rng(semilla + i)` con semillas seguidas para repartir cosas (salen casi iguales): usar `hashC(i, k)`.
- Musica: 09 con `intro-tambores` a -18 dB; 10 y 11 con `explicacion-tech` a -18 dB. Mezcla final ~ -14 LUFS.
