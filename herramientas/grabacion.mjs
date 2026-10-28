// Usa una GRABACION REAL (tu propia voz) en vez de una voz generada: transcribe la grabacion, alinea las frases del
// guion, la corta por escenas y deja los mismos archivos que voz.mjs (audio/<escena>.wav + palabras + tiempos + meta),
// asi revisar.mjs y render.mjs funcionan igual. Las escenas quedan pegadas, sin silencios agregados: cada una dura
// exactamente lo que dura su tramo de la grabacion.
//
//   node herramientas/grabacion.mjs videos/<nombre> --audio grabacion.wav [--modelo medium]
//
// En guion.json las frases deben decir lo que dice la grabacion (la alineacion tolera diferencias chicas).
// Una escena puede fijar donde empieza con "desde" (segundos de la grabacion), por ejemplo para calzar con un clip de
// avatar cortado de la misma grabacion. Si no, el corte va a la mitad del silencio entre una escena y la siguiente.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { RAIZ } from './entorno.mjs';
import { argumentos, leerGuion, prepararEscena } from './comun.mjs';
import { alinearFrases, armarTiempos, expandirNumeros } from './tiempos.mjs';

const { opt, posicional } = argumentos(process.argv);
if (!posicional[0] || !opt('audio')) {
  console.error('Uso: node herramientas/grabacion.mjs videos/<nombre> --audio grabacion.wav [--modelo medium]');
  process.exit(1);
}
const proyecto = path.resolve(posicional[0]);
const grabacion = path.resolve(opt('audio'));
const guion = leerGuion(proyecto);
const carpeta = path.join(proyecto, 'audio');
mkdirSync(carpeta, { recursive: true });
const r3 = (x) => Math.round(x * 1000) / 1000;
const duracionDe = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim();

// 1) Transcribir la grabacion completa (se guarda: si la grabacion no cambia, no se repite)
const cache = path.join(carpeta, 'grabacion.palabras.json');
const firma = `${grabacion}|${duracionDe(grabacion)}`;
let palabras;
if (existsSync(cache) && JSON.parse(readFileSync(cache, 'utf8')).firma === firma) {
  palabras = JSON.parse(readFileSync(cache, 'utf8')).palabras;
} else {
  console.log('Transcribiendo la grabacion...');
  const tmp = path.join(carpeta, 'grabacion.tmp.json');
  const python = process.platform === 'win32' ? 'python' : 'python3';
  execFileSync(python, [path.join(RAIZ, 'herramientas', 'transcribir.py'), grabacion, tmp, opt('modelo') || 'medium'], { stdio: ['ignore', 'ignore', 'inherit'] });
  palabras = expandirNumeros(JSON.parse(readFileSync(tmp, 'utf8')));
  writeFileSync(cache, JSON.stringify({ firma, palabras }));
}

// 2) Alinear todas las frases contra la grabacion entera
const frases = guion.escenas.flatMap((e) => e.frases);
const tiempos = alinearFrases(frases, palabras);
const total = duracionDe(grabacion);

// 3) Limites de cada escena
const escenas = guion.escenas.map((e) => ({
  e,
  primera: tiempos[e.frases[0].id].inicio,
  ultima: tiempos[e.frases[e.frases.length - 1].id].fin,
}));
escenas.forEach((x, i) => {
  if (x.e.desde != null) x.ini = x.e.desde;
  else if (i === 0) x.ini = 0;
  else x.ini = r3((escenas[i - 1].ultima + x.primera) / 2);
});
escenas.forEach((x, i) => { x.fin = i + 1 < escenas.length ? escenas[i + 1].ini : r3(total); });

// 4) Cortar y escribir los archivos de cada escena
for (const { e, ini, fin } of escenas) {
  const archivo = `${e.id}.wav`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(ini), '-to', String(fin), '-i', grabacion, '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', path.join(carpeta, archivo)]);
  const rel = {};
  for (const f of e.frases) {
    const t = tiempos[f.id];
    rel[f.id] = { inicio: r3(t.inicio - ini), fin: r3(t.fin - ini), palabras: (t.palabras || []).map((w) => ({ p: w.p, t: r3(w.t - ini) })) };
  }
  const t = armarTiempos({ escena: e.id, frases: e.frases, tiempos: rel, duracionAudio: r3(fin - ini), entrada: 0, salida: 0 });
  writeFileSync(path.join(carpeta, `${e.id}.tiempos.json`), JSON.stringify(t, null, 2));
  writeFileSync(path.join(carpeta, `${e.id}.palabras.json`), JSON.stringify(palabras.filter((w) => w.start >= ini && w.end <= fin).map((w) => ({ ...w, start: r3(w.start - ini), end: r3(w.end - ini) }))));
  writeFileSync(path.join(carpeta, `${e.id}.meta.json`), JSON.stringify({ prov: 'grabacion', archivo, desde: ini, hasta: fin }, null, 2));
  const lista = prepararEscena(proyecto, t, archivo) ? '' : ' (falta escenas/' + e.id + '/index.html)';
  console.log(`${e.id}: ${ini.toFixed(2)} -> ${fin.toFixed(2)} s (${(fin - ini).toFixed(2)} s)${lista}`);
}
