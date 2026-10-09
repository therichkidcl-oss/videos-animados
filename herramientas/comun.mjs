// Utilidades compartidas por voz.mjs, render.mjs y revisar.mjs
//
// Estructura de un video:
//   videos/<nombre>/guion.json
//   videos/<nombre>/audio/<escena>.(mp3|wav|palabras.json|meta.json|tiempos.json)   (cache de voz)
//   videos/<nombre>/escenas/<escena>/index.html   (proyecto HyperFrames de UNA escena)
//        + base/ (copia), voz.<ext> (copia) y tiempos.js (generado)
import { RAIZ, HF_BIN } from './entorno.mjs';
import { cpSync, readFileSync, writeFileSync, existsSync, copyFileSync, rmSync, readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

export const carpetaEscena = (proyecto, id) => path.join(proyecto, 'escenas', id);

// Copia estudio-videos/base -> escenas/<id>/base (las escenas usan rutas relativas base/...).
// Conserva las fechas para que render.mjs no crea que la escena cambio.
export function sincronizarBase(dirEscena) {
  cpSync(path.join(RAIZ, 'base'), path.join(dirEscena, 'base'), { recursive: true, force: true, preserveTimestamps: true });
}

// Escribe/copia solo si el contenido cambio (asi no se re-renderizan escenas iguales)
function escribirSiCambia(destino, contenido) {
  if (existsSync(destino) && readFileSync(destino).equals(Buffer.from(contenido))) return;
  writeFileSync(destino, contenido);
}

export function leerGuion(proyecto) {
  return JSON.parse(readFileSync(path.join(proyecto, 'guion.json'), 'utf8'));
}

export function leerTiempos(proyecto, id) {
  const p = path.join(proyecto, 'audio', `${id}.tiempos.json`);
  if (!existsSync(p)) throw new Error(`Faltan los tiempos de ${id}: corre voz.mjs primero`);
  return JSON.parse(readFileSync(p, 'utf8'));
}

export function buscarEscena(guion, parcial) {
  const e = guion.escenas.find((x) => x.id.startsWith(parcial));
  if (!e) throw new Error(`No existe la escena ${parcial}`);
  return e;
}

// Deja la carpeta de la escena lista para HyperFrames: base, voz, tiempos.js y duraciones reales
export function prepararEscena(proyecto, t, archivoAudio) {
  const dir = carpetaEscena(proyecto, t.escena);
  const html = path.join(dir, 'index.html');
  if (!existsSync(html)) return false;
  sincronizarBase(dir);
  const ext = path.extname(archivoAudio);
  for (const f of readdirSync(dir)) if (/^voz\.(mp3|wav)$/.test(f) && f !== `voz${ext}`) rmSync(path.join(dir, f));
  escribirSiCambia(path.join(dir, `voz${ext}`), readFileSync(path.join(proyecto, 'audio', archivoAudio)));
  escribirSiCambia(path.join(dir, 'tiempos.js'), `window.TIEMPOS = ${JSON.stringify(t)};\n`);
  let s = readFileSync(html, 'utf8');
  s = s.replace(/<div id="root"[^>]*>/, (tag) => tag.replace(/data-duration="[^"]*"/, `data-duration="${t.duracion}"`));
  s = s.replace(/<audio id="voz"[^>]*>/, (tag) => tag
    .replace(/src="[^"]*"/, `src="voz${ext}"`)
    .replace(/data-start="[^"]*"/, `data-start="${t.entrada}"`)
    .replace(/data-duration="[^"]*"/, `data-duration="${t.duracionAudio}"`));
  escribirSiCambia(html, s);
  return true;
}

// Ejecuta la CLI local de HyperFrames y devuelve { code, out }
export function hf(args, { cwd, silencioso = false } = {}) {
  const comando = [`"${HF_BIN}"`, ...args.map((a) => (/[\s",]/.test(a) ? `"${a}"` : a))].join(' ');
  return new Promise((resolve) => {
    const p = spawn(comando, { cwd, shell: true, env: process.env });
    let out = '';
    p.stdout.on('data', (d) => { out += d; if (!silencioso) process.stdout.write(d); });
    p.stderr.on('data', (d) => { out += d; if (!silencioso) process.stderr.write(d); });
    p.on('close', (code) => resolve({ code, out }));
  });
}

export function argumentos(argv) {
  const args = argv.slice(2);
  const opt = (n) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : undefined; };
  const flag = (n) => args.includes('--' + n);
  const valores = new Set(args.filter((a, i) => i > 0 && args[i - 1].startsWith('--') && !a.startsWith('--')));
  const posicional = args.filter((a) => !a.startsWith('--') && !valores.has(a));
  return { opt, flag, posicional };
}
