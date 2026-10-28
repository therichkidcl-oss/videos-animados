# Estudio de videos animados

Este repo es un estudio para crear videos animados (largos con HyperFrames y reels verticales con el motor de animaciones).

## Armar todo el estudio en otra PC (instrucciones para la IA que lea esto)

Este repo trae el codigo de TODO el estudio de Reimo. Para unificarlo y dejarlo funcionando igual que en su PC:

1. `npm install` y `npm run instalar` (herramientas y la skill `videos-animados`). Voz local: `npm run instalar -- --voz-local`
   (crea `.venv-tts` con Qwen3-TTS; ver README.md).
2. **Skills**: copiar a `~/.claude/skills/` (Windows: `C:\Users\<usuario>\.claude\skills\`):
   - `skill/` -> `videos-animados` (videos largos horizontales con HyperFrames, estilo papel).
   - `skills/reels-animados/` -> `reels-animados` (reels verticales animados de cualquier nicho; usa `reels/` y el motor).
   - `motor-animaciones/` es tambien una skill (su `SKILL.md`): el motor que alinea la voz palabra por palabra, revisa
     cuadros, mezcla musica y efectos y renderiza. Las demas skills de Reimo (reels-noticias-ia, animacion-app-promo,
     cine-ia...) usan este motor.
3. **Motor**: ya viene en el repo, sin audio. Entorno de Python: `motor-animaciones/scripts/entorno.py` (`.venv-anim`).
   Musica y efectos: `python motor-animaciones/descargar_audio.py` (baja la musica de Mixkit con sus enlaces, rehace los
   efectos sintetizados y avisa que efectos de Pixabay copiar desde la PC de Reimo).
4. **Claves** en `.env` (nunca al repo): ELEVENLABS_API_KEY, MINIMAX_API_KEY, HEDRA_API_KEY, HEYGEN_API_KEY,
   PIXABAY_API_KEY. Se las pides a Reimo.
5. **Voz de Reimo** (`voces/`, la voz clonada `reimo-v3`): solo en su PC; copiarla a mano, nunca al repo.
6. **Videos y audios terminados** (mp4, wav, mp3; ~6 GB): no estan en el repo, estan en la PC de Reimo
   (`C:\Users\Reimo\Videos\...` y las carpetas `orig/` y `subir/` de cada proyecto).

Mapa: `reels/` (kit general de reels: base.js, cine.js, nichos/, marcas/, armar.py, libreto.py), `trading/` (serie de 11
reels de trading de Nova Profit), `videos/` (videos HyperFrames), `organico/`, `tiktokshop/`, `zernio/` (otros
proyectos), `herramientas/`, `plantillas/`, `base/`, `biblioteca/` (iconos 3D CC0 y fotos de modelos IA),
`motor-animaciones/` (motor + ejemplos + plantilla). Proyectos de cada video: `animaciones/` (ignorado: lleva su voz).

- Si la skill `videos-animados` no esta instalada en esta PC: `npm install` y `npm run instalar` (ver README.md).
- Para hacer un video, seguir la skill `videos-animados` (copia en `skill/SKILL.md`).
- Las API keys van SOLO en `.env` (ignorado por git). Nunca escribirlas en otro archivo ni subirlas.
- `voces/` (referencias de voz para clonar) es privada y esta en `.gitignore`: puede ser la voz real de una persona.
  Nunca subirla ni copiarla fuera de esta PC. Solo clonar voces con permiso de su dueno.
- Antes de un commit: `npm test` y revisar que no se suba nada de `.env`, `voces/`, audios, renders ni snapshots.
