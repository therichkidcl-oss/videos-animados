---
name: reels-animados
description: Reels verticales educativos y animados para CUALQUIER nicho (trading, finanzas, salud, cocina, marketing, negocios, IA, fitness...) con la voz clonada de Reimo (reimo-v3), subtitulos palabra por palabra y cierre "comenta PALABRA y te envio...". Dos formatos ya aprobados - grafico premium (titulos, chips y graficos que se dibujan con la voz) y cine (personajes y objetos con cara, mapa desde arriba, ambientes y una camara que entra de un plano al siguiente). Kit propio en estudio-videos/reels (marca configurable: Nova, IA HUB o neutra; modulos por nicho). Usala SIEMPRE que Reimo pida reels o videos educativos, explicativos o animados de un tema, una serie de reels para un nicho, "hazme un reel de X", "videos con mi voz v3", "mas animado", "como los de trading", aunque no diga la palabra skill. No es para noticias de IA con su voz grabada y HeyGen (reels-noticias-ia), promos de una app (animacion-app-promo) ni videos largos horizontales de papel (videos-animados).
---

# Reels animados para cualquier nicho

Responde siempre en espanol neutro con "tu" (nunca voseo). Archivos y comentarios sin tildes (con ñ); lo que lee la
voz SI lleva tildes. Kit en `C:\Users\Reimo\Documents\Proyectos\estudio-videos\reels\`; ejemplo completo y probado:
la serie de trading de Nova Profit (`estudio-videos\trading\`, 11 reels: r01-r08 grafico, r09-r11 cine).

## Reglas de Reimo (no negociables)

- **Cantidad exacta**: los videos que pida. Si no dice cuantos, UNO. Nunca una tanda que no pidio.
- **Guion antes que voz**: muestrale el libreto completo (y, si el formato es nuevo, una muestra corta del estilo) y
  espera su OK antes de generar la voz final. La muestra es una vista previa, no se deja en su carpeta como un video mas.
- **Voz**: solo `reimo-v3` (Qwen3-TTS local, gratis). Nada de otras voces.
- **Datos verificados**: cada cifra en pantalla sale de una fuente real (estudio, regulador, documento oficial) y se
  muestra la fuente en gris chico. Si no se puede verificar, no se pone como dato; nada de numeros de relleno.
  Frases honestas: "pueden avisarte", "muchas veces", "no es garantia". Si el cierre promete algo sin datos (ej.
  "senales de alta efectividad"), dejalo si el lo pidio pero avisale una vez del riesgo en anuncios pagados.
- **Marca y estilo**: sin logo salvo que lo pida, cero emojis, sin B-roll, todo dibujado con codigo.
- **Entrega**: cada reel apenas este listo en la carpeta de su serie (ej. `C:\Users\Reimo\Videos\Nova Profit\Reels
  Trading\NN - Titulo.mp4`) y SendUserFile. Sin preguntar.
- **Ritmo**: Reimo se molesta si tardas. Revisa cuadros clave (no cientos), no re-renderices por detalles menores y no
  hagas pruebas que no pidio. Avisos cortos de avance en espanol mientras trabajas.

## Flujo

1. **Tema e investigacion**: datos reales con fuente (si el tema lo pide, un subagente con WebSearch; ejemplo de ficha:
   `trading/investigacion.md`). Ideas de gancho: dolor del que mira, brecha de curiosidad, numero concreto.
2. **Libreto** en `animaciones/<serie>-NN-<slug>/libreto.txt` (formato abajo). 45-55 s: gancho (1 frase) ->
   explicacion (4-6 frases cortas, una idea cada una) -> dato con fuente o regla -> cierre con la palabra a comentar.
   Cada frase es un ancla de animacion. Muestraselo y espera el OK.
3. **Voz**: `python reels/libreto.py animaciones/<proy>` (crea guion.json) y `node herramientas/voz.mjs animaciones/<proy>`
   (~1 s de calculo por segundo de voz; cobertura 88-100 %; si falta una palabra de verdad: `--escena <id> --forzar`).
4. **Armar**: `PYTHONIOENCODING=utf-8 python reels/armar.py animaciones/<proy> <serie>/rNN.js --marca nova [--cine]
   [--modulo trading] --musica explicacion-tech --nivel -18` (alinea cada palabra; imprime duracion y frases).
5. **Escenas** en `<serie>/rNN.js` (ver formatos). Tiempos SIEMPRE desde la voz: `tw(frase, 'palabra')`, `XC(i)` = corte
   entre la frase i y la i+1. Copia el patron del reel de ejemplo mas parecido.
6. **Revisar**: desde el proyecto, `node tools/_dbg.mjs 3 15 30` (errores de JS) y
   `../../.venv-anim/Scripts/python.exe ../../motor-animaciones/scripts/anim.py revisar 2 8 14 --hoja r` (hoja de
   cuadros en trabajo/revision/r.png; mirala con Read). Corrige lo encimado, cortado o vacio.
7. **Render**: `...anim.py render --fps=30` (~14 fps, ~2 min por reel de 50 s; mezcla voz + musica + efectos a ~-14 LUFS).
8. **QA rapido**: hoja de cuadros del MP4 (`ffmpeg -i out/*.mp4 -vf "fps=1/1.6,scale=216:-1,tile=8x5" -frames:v 1 hoja.jpg`)
   y volumen (`-af ebur128`). Entrega.

### libreto.txt

```
# titulo: Toros contra osos
## gancho
En el mercado hay dos animales peleando todo el día, y si te pones del lado equivocado, te pasan por encima.
## toro
Los toros compran: empujan el precio hacia arriba, como un toro que levanta sus cuernos.
## cta
Si quieres aprender trading{tréiding} y recibir señales gratis, comenta la palabra TRADING{tréiding} y te envío la información.
```
`palabra{pronunciacion}`: la voz dice la pronunciacion y los subtitulos muestran la palabra (`1%{uno por ciento}`,
`$100{cien dólares}`, `30:1{treinta a uno}`, `FOMO{fómo}`, `stop{stop} loss{los}`, marcas en ingles). En `tw()` la
palabra va normalizada: sin tildes ni simbolos (`'100'`, `'10000'`, `'1'`, `'301'`, `'senales'`).

## Los dos formatos

**Grafico premium** (r01-r08): fondo limpio de la marca con halo, eyebrow + titulo Bebas palabra a palabra con la palabra
clave en el acento, chips, tarjetas y graficos que se dibujan con la voz; subtitulos abajo (`subtitulos()`, y 1480);
cierre `ctaComentar()`. Ideal para conceptos, datos y comparaciones. Piezas en `reels/base.js` (+ modulo del nicho).

**Cine** (r09-r11, `--cine`), el que pide cuando dice "mas animado": cada idea es un plano con su ambiente y su
camara; personajes y objetos con cara que actuan (la moneda = el dinero del que mira, el toro y el oso, un telefono,
una libreta, un bus...); mezclar en cada reel al menos 3 de: ambiente sin personas, mapa desde arriba, objetos con
cara, personaje cartoon; sin repetir formato en bloques seguidos. Subtitulos virales arriba (`SubViral`, y 360, caja
del acento en las claves), un dibujo nuevo cada 2-3 s, un efecto de sonido por evento, transicion de cine en cada corte
(`atravesar` = entrar en un objeto, `barrido`, `iris`) y cierre `ctaCine()` con los personajes del reel.
Detalle de piezas y receta de escena: `references/piezas.md`.

## Marca y nichos

- `reels/marcas/<marca>.json`: `nova` (oro sobre obsidiana), `iahub` (lima), `neutra` (celeste). Para otra marca, copia
  un json y cambia los colores; todo el kit (titulos, chips, subtitulos, cierre) toma esos colores.
- `reels/nichos/<nicho>.js`: dibujos y piezas propios del nicho. `trading.js` trae Grafico (velas en vivo con zonas,
  fibo, posicion...), VelaGigante, serie()/ondas() y los personajes Toro/Oso. Para un nicho nuevo, crea su modulo solo
  si lo vas a reutilizar; si no, dibuja en el rNN.js. Pensar metaforas visuales del nicho (objetos con cara que
  representen el dinero, el cuerpo, la comida, el cliente...).
- Musica disponible (`motor-animaciones/musica/musica.json`): `intro-tambores` (epica, peleas), `explicacion-tech`
  (neutra, sirve casi siempre), `intro-scifi`, `explicacion-jazz`. Nivel -18 dB.

## Trampas que ya mordieron

- Zonas seguras: nada importante arriba de y 250 ni abajo de 1540; subtitulos virales en 360: no subas paneles ahi
  (un marcador que sube con la camara los tapa: apagalo antes).
- Chips y etiquetas cerca del borde se cortan: dejalos dentro de x 120-960. Al panear la camara, el fondo debe ser
  mas ancho que 1080 o aparece un borde negro.
- Medio segundo vacio entre planos se nota: el plano que entra ya debe tener contenido durante la transicion.
- `rng(semilla + i)` con semillas seguidas da casi el mismo numero: para repartir cosas usa `hashC(i, k)`.
- `ap()` devuelve un progreso minimo positivo antes de empezar: si despues haces otro `put()`, pasale la opacidad.
- Objetos que un personaje "pisa" o "atraviesa": z-index dinamico (debajo en el momento del paso).
- Heredocs muy largos rompen el Bash de Windows: escribe los .js con Write y ejecuta.
