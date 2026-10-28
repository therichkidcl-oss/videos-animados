# Estudio de videos animados

Este repo es un estudio para crear videos animados largos (texto + animaciones + voz) con HyperFrames.

- Si la skill `videos-animados` no esta instalada en esta PC: `npm install` y `npm run instalar` (ver README.md).
- Para hacer un video, seguir la skill `videos-animados` (copia en `skill/SKILL.md`).
- Las API keys van SOLO en `.env` (ignorado por git). Nunca escribirlas en otro archivo ni subirlas.
- `voces/` (referencias de voz para clonar) es privada y esta en `.gitignore`: puede ser la voz real de una persona.
  Nunca subirla ni copiarla fuera de esta PC. Solo clonar voces con permiso de su dueno.
- Antes de un commit: `npm test` y revisar que no se suba nada de `.env`, `voces/`, audios, renders ni snapshots.
