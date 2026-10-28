# Videos animados largos con Claude Code

Estudio para que **Claude Code** produzca, de punta a punta, videos animados largos (varios minutos) de
**texto + animaciones + voz en espanol**: guion por escenas, voz con ElevenLabs, MiniMax o una voz local gratis
(Qwen3-TTS, que puede clonar tu propia voz), animaciones sincronizadas palabra por palabra con la voz, revision por
capturas y render final en MP4 1920x1080.

Motor: [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML + GSAP -> MP4, Apache-2.0), en la PC
y sin GPU (render con Chrome headless + ffmpeg).

Ejemplos incluidos (guion + escenas):

| Video | Duracion | Que muestra |
|---|---|---|
| `videos/genjutsu-prompts` | ~5:45 | Explicar como escribir prompts: anatomia por colores, niveles, recetas, errores, checklist |
| `videos/higgsfield-api` | ~2:46 | Explicar un servicio y como conectarlo: planes vs API, consola paso a paso, replica de UI con cursor |

## Requisitos

- **Node.js 22+** (probado con 24) y **npm**
- **ffmpeg y ffprobe** en el PATH (Windows: `winget install Gyan.FFmpeg`)
- **Google Chrome** (HyperFrames lo usa para renderizar)
- Una voz: **local con Qwen3-TTS** (gratis, sin limite; necesita [uv](https://docs.astral.sh/uv/)), o una API key de
  **ElevenLabs** (sirve el plan gratis) o **MiniMax**
- Opcional: **Python 3.10+ con `faster-whisper`** (`pip install faster-whisper`): necesario para la voz local, MiniMax
  y para revisar la pronunciacion
- Windows es el sistema probado (la voz local de prueba usa las voces de Windows). En Mac/Linux funciona con
  ElevenLabs o MiniMax.

## Instalacion (paso a paso)

```bash
git clone https://github.com/therichkidcl-oss/videos-animados.git estudio-videos
cd estudio-videos
npm install
npm run instalar
```

`npm run instalar` hace todo lo demas:

1. Copia las fuentes y GSAP a `base/`.
2. Crea `.env` desde `.env.example`.
3. Instala la skill `videos-animados` en `~/.claude/skills/` apuntando a esta carpeta.
4. Revisa que esten ffmpeg, ffprobe y (opcional) Python + faster-whisper.

Despues:

1. Elige la voz:
   - **Local y gratis**: `npm run instalar -- --voz-local` (ver "Voz local" abajo).
   - **ElevenLabs o MiniMax**: abre `.env` y pega tu key (`ELEVENLABS_API_KEY=...` o `MINIMAX_API_KEY=...`).
     **Nunca la subas a git**: `.env` esta en `.gitignore`.
2. Corre `npm test` (debe salir todo en verde).
3. Reinicia Claude Code para que cargue la skill.

## Voz local (gratis, en tu PC)

Qwen3-TTS (Apache-2.0) corre en la CPU, sin GPU ni API. Puede clonar una voz desde una grabacion corta o disenar una
nueva desde una descripcion.

1. Instala: `npm run instalar -- --voz-local` (crea `.venv-tts` con Python 3.12; los modelos, ~4 GB, bajan solos).
2. Crea la voz en `voces/<nombre>/`:
   - **Clonar** (tu propia voz o una que tengas permiso de usar): `referencia.wav` con 10-15 s de habla limpia que
     termine en una pausa, y `referencia.txt` con lo que dice, palabra por palabra
     (`python herramientas/transcribir.py referencia.wav palabras.json medium` ayuda). La copia toma el timbre, el ritmo
     y el tono de la grabacion: si quieres una voz de clase, graba en tono de clase.
   - **Disenar**: `.venv-tts\Scripts\python.exe herramientas/tts_qwen.py disenar --voz <nombre> --instruct "Male narrator, warm voice, neutral Latin American Spanish accent..." --texto "Hola, ..."`
3. En el `guion.json` del video:
   `"voz": { "proveedor": "qwen", "qwen": { "voz": "<nombre>", "modelo": "1.7B", "dtype": "bf16", "lote": 4 } }`

`voz.mjs` genera todas las escenas en un solo proceso (varias a la vez), saca los tiempos transcribiendo y avisa si
en alguna escena la voz se salto palabras. Velocidad medida en un Ryzen 9 9950X, solo CPU: ~1 segundo de calculo por
cada segundo de voz. La carpeta `voces/` esta en `.gitignore`: una voz real nunca se sube al repo.

## Uso

En Claude Code, dentro de cualquier proyecto:

> Hazme un video animado explicando como funciona X

Claude escribe el guion, te lo muestra para que lo apruebes, genera la voz, arma las escenas, las revisa y
renderiza. El MP4 queda en `videos/<nombre>/salida/<nombre>.mp4`.

### Comandos (los usa Claude; tambien sirven a mano)

| Comando | Que hace |
|---|---|
| `node herramientas/voz.mjs videos/<nombre> [--proveedor qwen\|elevenlabs\|minimax\|local]` | Voz por escena + tiempos de cada frase y palabra |
| `node herramientas/voz.mjs --voces qwen\|elevenlabs` | Lista las voces locales o las de tu cuenta |
| `node herramientas/revisar.mjs videos/<nombre> <escena> [--at 3,7.5]` | Lint + capturas de una escena |
| `node herramientas/mosaico.mjs <carpeta-de-capturas>` | Junta capturas en hojas 2x2 |
| `node herramientas/render.mjs videos/<nombre> [--paralelo 5]` | Renderiza las escenas y arma el MP4 final |
| `python herramientas/transcribir.py <audio> <salida.json>` | Transcribe para revisar pronunciacion |
| `python herramientas/logo_sin_fondo.py <in.png> <out.png>` | Quita el fondo negro de un logo |

Los ejemplos usan una voz local clonada que no viene en el repo (`voces/` es privada). Para correrlos, crea tu voz
(ver "Voz local") y pon su nombre en `voz.qwen.voz` del `guion.json`. Para probar sin crear una voz (Windows):
`node herramientas/voz.mjs videos/higgsfield-api --proveedor local` y luego
`node herramientas/render.mjs videos/higgsfield-api`. Con ElevenLabs, agrega `"elevenlabs": { "voz_id": "..." }` en
`voz` del `guion.json` y usa `--proveedor elevenlabs`.

## Estructura

```
herramientas/   voz, tiempos (con tests), revisar, mosaico, render, instalar, transcribir, logo_sin_fondo
base/           tema.css (look y componentes), escena.js (tiempos + animaciones), logo
plantillas/     escena.html (punto de partida de cada escena)
skill/          SKILL.md de Claude Code (la instala "npm run instalar")
videos/         un proyecto por video: guion.json + escenas/<id>/index.html
```

## Notas

- Las keys solo viven en `.env`. El repo no contiene ninguna.
- El logo y los colores por defecto son de IA-HUB. Para otra marca, reemplaza `base/logo-iahub.png` (y su copia
  `base/logo-iahub-marca.png`) y cambia las variables de `:root` en `base/tema.css`.
- Licencias de terceros: HyperFrames (Apache-2.0), GSAP (licencia estandar gratuita de GreenSock), Qwen3-TTS
  (Apache-2.0), fuentes Inter, Space Grotesk y JetBrains Mono (OFL, via @fontsource). Revisa los terminos de tu plan
  de ElevenLabs/MiniMax antes de usar el audio en contenido comercial. Clona solo voces con permiso de su dueno.
