// Renderiza todas las escenas en paralelo y arma el video final.
//
// Uso: node herramientas/render.mjs videos/<nombre> [--paralelo 5] [--escena ID] [--forzar] [--calidad high|standard|draft]
//
// 1. Prepara cada escena (base, voz, tiempos y duraciones reales).
// 2. Renderiza SOLO las escenas que cambiaron (1 worker por escena = stream directo a ffmpeg, sin frames en disco).
// 3. Une el video (concat sin recomprimir) y arma el audio con la duracion exacta de cada escena.
// 4. Normaliza el volumen (-16 LUFS) y entrega salida/<nombre>.mp4
import { RAIZ } from './entorno.mjs';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { leerGuion, leerTiempos, prepararEscena, carpetaEscena, hf, argumentos } from './comun.mjs';

const { opt, flag, posicional } = argumentos(process.argv);
const proyecto = path.resolve(posicional[0] || '');
const nombre = path.basename(proyecto);
const paralelo = +(opt('paralelo') || 5);
const calidad = opt('calidad') || 'high';

const guion = leerGuion(proyecto);
const salida = path.join(proyecto, 'salida');
const dirEscenas = path.join(salida, 'escenas');
const tmp = path.join(salida, 'tmp');
mkdirSync(dirEscenas, { recursive: true });
mkdirSync(tmp, { recursive: true });

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'ignore', 'inherit'] });
const probe = (archivo, entradas) => execFileSync('ffprobe', ['-v', 'error', ...entradas, '-of', 'csv=p=0', archivo], { encoding: 'utf8' }).trim();
const durVideo = (archivo) => +probe(archivo, ['-select_streams', 'v:0', '-show_entries', 'stream=duration']);

// Ultima modificacion de todo lo que afecta a una escena (para no re-renderizar lo que no cambio)
function ultimaModificacion(dir) {
  let max = 0;
  const recorrer = (d) => {
    for (const f of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) { if (!['snapshots', 'renders'].includes(f.name)) recorrer(p); }
      else max = Math.max(max, statSync(p).mtimeMs);
    }
  };
  recorrer(dir);
  return max;
}

async function renderEscena(e) {
  const dir = carpetaEscena(proyecto, e.id);
  const out = path.join(dirEscenas, `${e.id}.mp4`);
  if (!flag('forzar') && existsSync(out) && statSync(out).mtimeMs > ultimaModificacion(dir)) {
    console.log(`= ${e.id}: sin cambios, se reutiliza`);
    return out;
  }
  for (let intento = 1; intento <= 2; intento++) {
    const t0 = Date.now();
    const r = await hf(['render', '.', '--output', out, '--workers', '1', '--quality', calidad, '--quiet'], { cwd: dir, silencioso: true });
    if (r.code === 0 && existsSync(out)) {
      console.log(`> ${e.id}: listo en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
      return out;
    }
    console.log(`! ${e.id}: fallo el intento ${intento}${intento < 2 ? ', reintento' : ''}\n${r.out.split('\n').slice(-12).join('\n')}`);
  }
  throw new Error(`No se pudo renderizar ${e.id}`);
}

async function main() {
  const t0 = Date.now();
  const escenas = guion.escenas.filter((e) => !opt('escena') || e.id.startsWith(opt('escena')));

  // 1. Preparar
  for (const e of escenas) {
    const meta = JSON.parse(readFileSync(path.join(proyecto, 'audio', `${e.id}.meta.json`), 'utf8'));
    prepararEscena(proyecto, leerTiempos(proyecto, e.id), meta.archivo);
  }

  // 2. Renderizar en paralelo (cola con N trabajando a la vez)
  const cola = [...escenas];
  const trabajadores = Array.from({ length: Math.min(paralelo, cola.length) }, async () => {
    while (cola.length) await renderEscena(cola.shift());
  });
  await Promise.all(trabajadores);
  if (opt('escena')) { console.log('Escena renderizada (sin armar el video completo).'); return; }

  // 3. Verificar duraciones
  const piezas = guion.escenas.map((e) => {
    const archivo = path.join(dirEscenas, `${e.id}.mp4`);
    const dur = durVideo(archivo);
    const esperada = leerTiempos(proyecto, e.id).duracion;
    if (Math.abs(dur - esperada) > 0.15) console.log(`! ${e.id}: dura ${dur}s y deberia durar ${esperada}s`);
    return { id: e.id, archivo, dur };
  });

  // 4a. Video: concat sin recomprimir
  const lista = path.join(tmp, 'lista.txt');
  writeFileSync(lista, piezas.map((p) => `file '${p.archivo.replace(/\\/g, '/')}'`).join('\n'));
  const video = path.join(tmp, 'video.mp4');
  ff(['-f', 'concat', '-safe', '0', '-i', lista, '-an', '-c:v', 'copy', video]);

  // 4b. Audio: cada escena con su duracion exacta, unidas y normalizadas
  const wavs = piezas.map((p) => {
    const wav = path.join(tmp, `${p.id}.wav`);
    ff(['-i', p.archivo, '-vn', '-ac', '2', '-ar', '48000', '-af', 'apad', '-t', String(p.dur), '-c:a', 'pcm_s16le', wav]);
    return wav;
  });
  const listaA = path.join(tmp, 'lista-audio.txt');
  writeFileSync(listaA, wavs.map((w) => `file '${w.replace(/\\/g, '/')}'`).join('\n'));
  const audioJunto = path.join(tmp, 'audio.wav');
  ff(['-f', 'concat', '-safe', '0', '-i', listaA, '-c', 'copy', audioJunto]);
  const audio = path.join(tmp, 'audio.m4a');
  ff(['-i', audioJunto, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', audio]);

  // 5. Final
  const final = path.join(salida, `${nombre}.mp4`);
  ff(['-i', video, '-i', audio, '-map', '0:v', '-map', '1:a', '-c', 'copy', '-movflags', '+faststart', '-shortest', final]);
  rmSync(tmp, { recursive: true, force: true });

  const dur = +probe(final, ['-show_entries', 'format=duration']);
  const mb = (statSync(final).size / 1024 / 1024).toFixed(1);
  console.log(`\nVIDEO FINAL: ${final}`);
  console.log(`Duracion ${Math.floor(dur / 60)}:${String(Math.round(dur % 60)).padStart(2, '0')} · ${mb} MB · armado en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

main().catch((err) => { console.error(`\nERROR: ${err.message}`); process.exit(1); });
