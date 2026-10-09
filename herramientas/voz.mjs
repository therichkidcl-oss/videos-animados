// Genera la voz de cada escena del guion y los tiempos de cada frase.
//
// Uso:
//   node herramientas/voz.mjs videos/<nombre> [--proveedor elevenlabs|minimax|local] [--escena ID] [--forzar]
//   node herramientas/voz.mjs --voces elevenlabs|minimax      (lista las voces disponibles)
//
// Cache: si el texto y la config de voz no cambiaron, NO vuelve a llamar a la API (no gasta creditos).
import { RAIZ } from './entorno.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { textoDeEscena, palabrasDesdeCaracteres, alinearFrases, armarTiempos } from './tiempos.mjs';
import { prepararEscena } from './comun.mjs';

const ENTRADA = 0.4; // silencio antes de que hable la voz (s)
const SALIDA = 0.7; // respiro despues de la ultima palabra (s)

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : undefined; };
const flag = (n) => args.includes('--' + n);

// ---------- utilidades ----------
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function pedir(url, init, intentos = 4) {
  for (let k = 1; ; k++) {
    const r = await fetch(url, init);
    if (r.ok) return r;
    const txt = await r.text();
    if (k < intentos && (r.status === 429 || r.status >= 500)) { await esperar(2000 * 2 ** (k - 1)); continue; }
    throw new Error(`${url.split('?')[0]} -> HTTP ${r.status}: ${txt.slice(0, 400)}`);
  }
}

export function duracion(archivo) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', archivo], { encoding: 'utf8' });
  return +(+out.trim()).toFixed(3);
}

// Recorta el silencio que deja la voz al inicio y al final, asi las pausas entre escenas las controlan
// ENTRADA y SALIDA. Devuelve las palabras con sus tiempos corridos. Es idempotente.
function recortarSilencios(archivo, palabras) {
  if (!palabras.length) return palabras;
  const total = duracion(archivo);
  const ini = Math.max(0, +(palabras[0].start - 0.15).toFixed(3));
  const fin = Math.min(total, +(palabras[palabras.length - 1].end + 0.35).toFixed(3));
  if (ini < 0.05 && total - fin < 0.05) return palabras;
  const tmp = archivo.replace(/(\.\w+)$/, '.tmp$1');
  const codec = archivo.endsWith('.wav') ? ['-c:a', 'pcm_s16le'] : ['-c:a', 'libmp3lame', '-b:a', '192k'];
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', archivo, '-ss', String(ini), '-to', String(fin), ...codec, tmp]);
  renameSync(tmp, archivo);
  return palabras.map((w) => ({ ...w, start: +(w.start - ini).toFixed(3), end: +(w.end - ini).toFixed(3) }));
}

function transcribir(audio) {
  const salida = path.join(os.tmpdir(), `palabras-${process.pid}-${Date.now()}.json`);
  const python = process.platform === 'win32' ? 'python' : 'python3';
  execFileSync(python, [path.join(RAIZ, 'herramientas', 'transcribir.py'), audio, salida, 'small'], { stdio: ['ignore', 'ignore', 'inherit'] });
  const palabras = JSON.parse(readFileSync(salida, 'utf8'));
  rmSync(salida, { force: true });
  return palabras;
}

// ---------- proveedores ----------
// Creditos disponibles de ElevenLabs (caracteres). null si no se pudo consultar.
async function creditosElevenLabs() {
  const r = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY } });
  if (!r.ok) return null;
  const s = await r.json();
  return s.character_limit - s.character_count;
}

async function elevenlabs(texto, cfg) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error('Falta ELEVENLABS_API_KEY en estudio-videos/.env');
  if (!cfg.voz_id) throw new Error('Falta voz.elevenlabs.voz_id en guion.json (usa --voces elevenlabs para ver las voces)');
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${cfg.voz_id}/with-timestamps?output_format=mp3_44100_128`;
  const body = {
    text: texto,
    model_id: cfg.modelo || 'eleven_multilingual_v2',
    voice_settings: {
      stability: cfg.estabilidad ?? 0.5,
      similarity_boost: cfg.similitud ?? 0.75,
      style: cfg.estilo ?? 0,
      use_speaker_boost: true,
      speed: cfg.velocidad ?? 1,
    },
  };
  const r = await pedir(url, { method: 'POST', headers: { 'xi-api-key': key, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  return { audio: Buffer.from(j.audio_base64, 'base64'), ext: 'mp3', palabras: palabrasDesdeCaracteres(j.alignment) };
}

async function minimax(texto, cfg) {
  const key = process.env.MINIMAX_API_KEY;
  if (!key) throw new Error('Falta MINIMAX_API_KEY en estudio-videos/.env');
  const r = await pedir('https://api.minimax.io/v1/t2a_v2', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: cfg.modelo || 'speech-2.8-hd',
      text: texto,
      stream: false,
      language_boost: 'Spanish',
      voice_setting: { voice_id: cfg.voz_id, speed: cfg.velocidad ?? 1, vol: 1, pitch: 0 },
      audio_setting: { sample_rate: 44100, bitrate: 128000, format: 'mp3', channel: 1 },
    }),
  });
  const j = await r.json();
  if (j.base_resp?.status_code !== 0) throw new Error(`MiniMax ${j.base_resp?.status_code}: ${j.base_resp?.status_msg}`);
  return { audio: Buffer.from(j.data.audio, 'hex'), ext: 'mp3', palabras: null };
}

// Voz de Windows (gratis, sin internet). Solo para desarrollar: suena robotica.
async function local(texto, cfg) {
  if (process.platform !== 'win32') throw new Error('La voz local usa las voces de Windows. En Mac/Linux usa --proveedor elevenlabs o minimax.');
  const wav = path.join(os.tmpdir(), `voz-${process.pid}-${Date.now()}.wav`);
  const txt = wav.replace(/\.wav$/, '.txt');
  writeFileSync(txt, texto, 'utf8');
  const ps = [
    'Add-Type -AssemblyName System.Speech',
    '$s = New-Object System.Speech.Synthesis.SpeechSynthesizer',
    `$s.SelectVoice('${cfg.voz || 'Microsoft Sabina Desktop'}')`,
    `$s.Rate = ${cfg.velocidad ?? 0}`,
    `$s.SetOutputToWaveFile('${wav}')`,
    `$s.Speak([IO.File]::ReadAllText('${txt}', [Text.Encoding]::UTF8))`,
    '$s.Dispose()',
  ].join('; ');
  execFileSync('powershell', ['-NoProfile', '-Command', ps]);
  const audio = readFileSync(wav);
  rmSync(wav, { force: true });
  rmSync(txt, { force: true });
  return { audio, ext: 'wav', palabras: null };
}

const PROVEEDORES = { elevenlabs, minimax, local };

// ---------- listar voces ----------
async function listarVoces(prov) {
  if (prov === 'elevenlabs') {
    const r = await pedir('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY } });
    const j = await r.json();
    for (const v of j.voices) console.log(`${v.voice_id}  ${v.name}  ${JSON.stringify(v.labels || {})}`);
  } else if (prov === 'minimax') {
    const r = await pedir('https://api.minimax.io/v1/get_voice', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.MINIMAX_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ voice_type: 'all' }),
    });
    const j = await r.json();
    for (const v of [...(j.system_voice || []), ...(j.voice_cloning || []), ...(j.voice_generation || [])]) {
      if (/spanish|espa/i.test(v.voice_id + ' ' + (v.description || []).join(' '))) console.log(`${v.voice_id}  ${v.voice_name || ''}  ${(v.description || []).join(' ')}`);
    }
  }
}

// ---------- principal ----------
async function main() {
  if (opt('voces')) return listarVoces(opt('voces'));

  const valores = new Set(args.filter((a, i) => i > 0 && args[i - 1].startsWith('--') && !a.startsWith('--')));
  const proyecto = path.resolve(args.find((a) => !a.startsWith('--') && !valores.has(a)) || '');
  const guion = JSON.parse(readFileSync(path.join(proyecto, 'guion.json'), 'utf8'));
  const prov = opt('proveedor') || guion.voz.proveedor;
  const cfg = guion.voz[prov] || {};
  if (!PROVEEDORES[prov]) throw new Error(`Proveedor desconocido: ${prov}`);

  const carpeta = path.join(proyecto, 'audio');
  mkdirSync(carpeta, { recursive: true });

  const escenas = guion.escenas;

  // Antes de gastar: cuantos caracteres hay que generar y si alcanzan los creditos
  const pendientes = escenas.filter((e) => {
    if (opt('escena') && !e.id.startsWith(opt('escena'))) return false;
    const { texto } = textoDeEscena(e.frases);
    const hash = createHash('sha1').update(JSON.stringify({ prov, cfg, texto })).digest('hex').slice(0, 16);
    const mp = path.join(carpeta, `${e.id}.meta.json`);
    return flag('forzar') || !existsSync(mp) || JSON.parse(readFileSync(mp, 'utf8')).hash !== hash;
  });
  const necesarios = pendientes.reduce((s, e) => s + textoDeEscena(e.frases).texto.length, 0);
  if (prov === 'elevenlabs' && necesarios > 0) {
    const disponibles = await creditosElevenLabs();
    console.log(`ElevenLabs: hay que generar ${necesarios} caracteres (${pendientes.length} escenas); disponibles: ${disponibles ?? '?'}`);
    if (disponibles != null && disponibles < necesarios) throw new Error('No alcanzan los creditos de ElevenLabs: no se genero nada.');
  }

  for (let k = 0; k < escenas.length; k++) {
    const e = escenas[k];
    if (opt('escena') && !e.id.startsWith(opt('escena'))) continue;

    const { texto } = textoDeEscena(e.frases);
    const hash = createHash('sha1').update(JSON.stringify({ prov, cfg, texto })).digest('hex').slice(0, 16);
    const metaPath = path.join(carpeta, `${e.id}.meta.json`);
    const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, 'utf8')) : null;

    const palabrasPath = path.join(carpeta, `${e.id}.palabras.json`);
    if (!flag('forzar') && meta?.hash === hash && existsSync(path.join(carpeta, meta.archivo)) && existsSync(palabrasPath)) {
      // Sin llamar a la API: se recalculan los tiempos con las palabras ya guardadas
      const audioPath = path.join(carpeta, meta.archivo);
      const palabras = recortarSilencios(audioPath, JSON.parse(readFileSync(palabrasPath, 'utf8')));
      writeFileSync(palabrasPath, JSON.stringify(palabras));
      const t = escribirTiempos(proyecto, carpeta, e, palabras, duracion(audioPath), meta.archivo);
      console.log(`= ${e.id}: sin cambios (${t.duracion}s), no se llamo a la API`);
      continue;
    }

    process.stdout.write(`> ${e.id}: generando voz (${prov}, ${texto.length} caracteres)... `);
    const r = await PROVEEDORES[prov](texto, cfg);

    const archivo = `${e.id}.${r.ext}`;
    const destino = path.join(carpeta, archivo);
    writeFileSync(destino, r.audio);
    const palabras = recortarSilencios(destino, r.palabras || transcribir(destino));
    const durAudio = duracion(destino);
    writeFileSync(palabrasPath, JSON.stringify(palabras));
    writeFileSync(metaPath, JSON.stringify({ hash, prov, archivo, generado: new Date().toISOString() }, null, 2));
    const t = escribirTiempos(proyecto, carpeta, e, palabras, durAudio, archivo);
    console.log(`listo ${t.duracion}s`);
  }
}

// Alinea las frases con las palabras habladas, guarda los tiempos y deja lista la carpeta de la escena
function escribirTiempos(proyecto, carpeta, e, palabras, durAudio, archivo) {
  const tiempos = alinearFrases(e.frases, palabras);
  const t = armarTiempos({ escena: e.id, frases: e.frases, tiempos, duracionAudio: durAudio, entrada: ENTRADA, salida: SALIDA });
  writeFileSync(path.join(carpeta, `${e.id}.tiempos.json`), JSON.stringify(t, null, 2));
  rmSync(path.join(carpeta, `${e.id}.tiempos.js`), { force: true });
  prepararEscena(proyecto, t, archivo);
  return t;
}

main().catch((err) => { console.error(`\nERROR: ${err.message}`); process.exit(1); });
