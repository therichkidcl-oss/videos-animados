---
name: videos-animados
description: Crea VIDEOS ANIMADOS LARGOS (varios minutos) de texto + animaciones + voz hablada en espanol, renderizados en la PC del usuario con HyperFrames (HTML + GSAP -> MP4) y voz de ElevenLabs o MiniMax. Usala SIEMPRE que el usuario pida un video animado, explicativo, motion graphics, una leccion o tema de un curso en video, convertir una guia/articulo/documento en video, un tutorial animado, o diga "hazme un video explicando X", "anima esta guia", "video para el curso", aunque no diga "skill". NO es para video generado con IA (modelos de video): esto es animacion por codigo.
---

# Videos animados largos (HyperFrames + voz)

Estudio instalado en `{{ESTUDIO}}`. Todos los comandos se corren desde esa carpeta.
Ejemplos completos (usalos como referencia de cada patron):
- `videos/genjutsu-prompts/` — 10 escenas, ~5:45: explicar como escribir prompts (anatomia por colores, recetas, checklist).
- `videos/higgsfield-api/` — 8 escenas, ~2:46: explicar un servicio y como conectarlo (replicas de UI con cursor).

## Flujo (en este orden)

1. **Guion** -> `videos/<nombre>/guion.json`: escenas -> frases cortas (cada frase es un ancla de animacion).
   ~150 palabras por minuto. Espanol neutro con "tu", CON tildes (la voz pronuncia mejor). Frases que la voz va a
   leer: escribir numeros, URLs y menciones como se dicen ("console punto higgsfield punto a i", "arroba image uno").
   Si el video explica una app, sacar textos y botones del codigo/UI real (nunca inventarlos).
   **Mostrarle el guion al usuario y esperar su OK antes de generar la voz final** (gasta creditos de su API).
2. **Voz** -> `node herramientas/voz.mjs videos/<nombre> [--proveedor elevenlabs|minimax|local] [--escena 03]`
   - `local` = voz de Windows (es-MX), gratis, solo para desarrollar tiempos mientras el usuario revisa el guion.
   - `elevenlabs` (tiempos por caracter) o `minimax` (speech-2.8-hd, tiempos por transcripcion local con faster-whisper).
   - Keys en `.env` del estudio (`ELEVENLABS_API_KEY` / `MINIMAX_API_KEY`). Las pega el usuario; nunca al repo.
   - Ver voces: `node herramientas/voz.mjs --voces elevenlabs|minimax`. Config de voz en `guion.json > voz`.
   - Revisa los creditos antes de generar y aborta si no alcanzan (~5 min de video = ~5.000 caracteres).
   - Cache por hash: si el texto no cambio NO llama a la API. `--forzar` regenera (pedir permiso: gasta creditos).
   - Recorta el silencio de cada audio; la pausa entre escenas la controlan ENTRADA/SALIDA en voz.mjs.
   - Deja lista cada carpeta de escena (copia base/, voz y tiempos.js, y parcha `data-duration`).
3. **Escenas** -> `videos/<nombre>/escenas/<id>/index.html` (UNA composicion por carpeta; partir de
   `plantillas/escena.html`). Animar con los tiempos de la voz, nunca con segundos a mano:
   - `T('frase', +ajuste)` inicio de frase · `TF('frase')` fin · `TW('frase', 'palabra', n)` cuando dice esa palabra
     (palabra normalizada: sin tildes, minusculas; "480p", "iahub", "tamano").
   - `anim.entrar / pop / lado / tipear(dur) / marcar / destello / pulso / atenuar / resaltar / contar / salir / ambiente`
     (en `base/escena.js`). `anim.ambiente(tl)` al inicio y `anim.salir(tl)` al final en TODAS (cortes invisibles).
   - Clases de `base/tema.css`: `.cabecera` (eyebrow + h2), `.zona`, `.capa`, `.tarjeta`, `.tag`, `.chip.img/.vid`,
     `.prompt` (+ `.etiqueta`), `.parte.a1..a5` (5 colores), `.num-caja`, `.check`, `.marca` (logo de agua).
   - Patron que funciona bien: escena de bienvenida (saludo + agenda) al inicio y cierre con logo + fundido a negro.
4. **Revisar** -> `node herramientas/revisar.mjs videos/<nombre> <escena> [--at 3,7.5]` (lint + snapshots) y
   `node herramientas/mosaico.mjs videos/<nombre>/snapshots/<escena>` (hojas 2x2). Mirar TODAS las hojas;
   zoom (crop con ffmpeg) a lo dudoso. Nada encimado, nada fuera de cuadro, todo legible.
5. **Render** -> `node herramientas/render.mjs videos/<nombre> [--paralelo 5]`: escenas en paralelo (solo las que
   cambiaron), concat sin recomprimir, audio con la duracion exacta de cada escena, loudnorm -16 LUFS ->
   `videos/<nombre>/salida/<nombre>.mp4`. Referencia: ~16 fps por escena con 1 worker en un Ryzen 9 9950X.
6. **QA final**: ffprobe (1920x1080, 30 fps, audio y video de igual duracion), cuadros de cada escena (mitad y final)
   en mosaico, y transcribir el audio para revisar pronunciacion
   (`python herramientas/transcribir.py audio.mp3 salida.json small`). Entregar el MP4 al usuario.

## Voz (ElevenLabs)

- Voz por defecto de los ejemplos: **Enrique M. Nieto** (biblioteca, es-MX neutro) = `gbTn1bmCvNgk0QEAVyfM`,
  modelo `eleven_multilingual_v2`. Si la cuenta no la tiene, agregarla (gratis) como se indica abajo.
- Plan gratis: las voces CLONADAS no funcionan (401 `ivc_not_permitted`, no cobra). Usar voces de la biblioteca:
  buscar con `GET /v1/shared-voices?language=es&use_cases=informative_educational`, elegir las
  `free_users_allowed=true` y agregarlas con `POST /v1/voices/add/{public_owner_id}/{voice_id}`.
  Las premade verificadas en espanol son es-ES (acento de Espana): evitarlas si el publico es latino.
- No agregar creditos ni atribuciones de la voz en el video salvo que el usuario lo pida.
- Si una palabra suena mal (ej. "Genjutsu" -> "Jenjutsu"), se corrige escribiendola como se dice en la frase
  hablada ("Guenyutsu") y usando esa forma en `TW(...)`. Cambiar texto = regenerar esa escena (pedir OK).

## Reglas de HyperFrames que ya mordieron

- Un proyecto = UN `index.html` con `data-composition-id` (si hay dos, lint `multiple_root_compositions`).
  Por eso cada escena vive en su carpeta.
- Un solo `gsap.timeline({ paused: true })` registrado en `window.__timelines['<data-composition-id>']`.
- La duracion la fija el `data-duration` del root (se lee antes de los scripts): lo parcha voz.mjs.
- Nada de `transform` en CSS sobre algo que GSAP mueve (usar `fromTo`). Nada de `<br>`.
- `scale` no funciona en `<span>` inline (texto dentro de un prompt): usar `anim.destello`. Chips (`inline-flex`) si escalan.
- Barras/rellenos animados: `display:block` + tamano real (si no, escalan "nada").
- Fuentes: solo locales (`@font-face` en tema.css, woff2 de @fontsource que copia `npm run instalar`).
- Render en Windows: `--workers 1` por escena (multi-worker escribe ~25 GB/min de frames a disco).
- Telemetria, skills globales y avisos de version de HyperFrames apagados en `herramientas/entorno.mjs`.
  Documentacion oficial: https://github.com/heygen-com/hyperframes/tree/main/skills (`hyperframes-core/SKILL.md`).
- `fromTo` aplica su estado inicial en t=0 (immediateRender): un "click" con `{opacity:1}` inicial se ve desde el
  principio -> agregar `immediateRender: false` en el "to". Para elementos que deben arrancar ocultos y no tienen
  entrada propia (modal, velo, estado final), mejor `opacity: 0` en el CSS.
- Pantallas apiladas (`position:absolute` una sobre otra): ocultar el CONTENEDOR de cada pantalla, no solo sus hijos;
  si no, su fondo tapa la pantalla de abajo.
- Dos `<img>` con el mismo `src` en una escena dan el aviso `duplicate_media_discovery_risk`: usar una copia
  (`base/logo-iahub-marca.png` para la marca de agua).
- Replicas de UI + cursor: el cursor es un `<span>` absoluto en #root y se mueve con x/y = destino - posicion
  inicial. Ejemplo completo: `videos/higgsfield-api/escenas/05-conectar`.

## Marca

- Logo: `base/logo-iahub.png` = PNG transparente. Para usar otro logo con fondo negro:
  `python herramientas/logo_sin_fondo.py <entrada.png> base/logo-iahub.png` (borra solo el negro conectado al borde,
  conserva las letras negras internas y el brillo). Nunca usar un logo con fondo y recortado en cuadro.
- Look por defecto: fondo #0f1012, lima #d1fe17, Space Grotesk 700 mayusculas, Inter, JetBrains Mono para prompts.
  Para otro look, cambiar las variables de `:root` en `base/tema.css`.

## Pruebas

`npm test` (alineacion de tiempos de la voz, node:test). Correrlo si se toca `herramientas/tiempos.mjs`.
