# Videos animados largos con Claude Code

Estudio para que **Claude Code** produzca, de punta a punta, videos animados largos (varios minutos) de
**texto + animaciones + voz en espanol**: guion por escenas, voz con ElevenLabs o MiniMax, animaciones
sincronizadas palabra por palabra con la voz, revision por capturas y render final en MP4 1920x1080.

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
- Una API key de voz: **ElevenLabs** (recomendado, sirve el plan gratis) o **MiniMax**
- Opcional: **Python 3.10+ con `faster-whisper`** (`pip install faster-whisper`): necesario para MiniMax, para la voz
  local de prueba y para revisar la pronunciacion
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

1. Abre `.env` y pega tu key (`ELEVENLABS_API_KEY=...` o `MINIMAX_API_KEY=...`). **Nunca la subas a git**:
   `.env` esta en `.gitignore`.
2. Corre `npm test` (debe salir todo en verde).
3. Reinicia Claude Code para que cargue la skill.

## Uso

En Claude Code, dentro de cualquier proyecto:

> Hazme un video animado explicando como funciona X

Claude escribe el guion, te lo muestra para que lo apruebes, genera la voz, arma las escenas, las revisa y
renderiza. El MP4 queda en `videos/<nombre>/salida/<nombre>.mp4`.

### Comandos (los usa Claude; tambien sirven a mano)

| Comando | Que hace |
|---|---|
| `node herramientas/voz.mjs videos/<nombre> [--proveedor elevenlabs\|minimax\|local]` | Voz por escena + tiempos de cada frase y palabra |
| `node herramientas/voz.mjs --voces elevenlabs` | Lista las voces de tu cuenta |
| `node herramientas/revisar.mjs videos/<nombre> <escena> [--at 3,7.5]` | Lint + capturas de una escena |
| `node herramientas/mosaico.mjs <carpeta-de-capturas>` | Junta capturas en hojas 2x2 |
| `node herramientas/render.mjs videos/<nombre> [--paralelo 5]` | Renderiza las escenas y arma el MP4 final |
| `python herramientas/transcribir.py <audio> <salida.json>` | Transcribe para revisar pronunciacion |
| `python herramientas/logo_sin_fondo.py <in.png> <out.png>` | Quita el fondo negro de un logo |

Para probar sin gastar creditos (Windows): `node herramientas/voz.mjs videos/higgsfield-api --proveedor local` y
luego `node herramientas/render.mjs videos/higgsfield-api`. Para la voz real, cambia `"proveedor"` en el
`guion.json` a `elevenlabs`.

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
- Licencias de terceros: HyperFrames (Apache-2.0), GSAP (licencia estandar gratuita de GreenSock), fuentes Inter,
  Space Grotesk y JetBrains Mono (OFL, via @fontsource). Revisa los terminos de tu plan de ElevenLabs/MiniMax
  antes de usar el audio en contenido comercial.
