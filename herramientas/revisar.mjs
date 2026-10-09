// Revisa UNA escena: lint + snapshots en los momentos clave (para mirarlos con zoom).
//
// Uso: node herramientas/revisar.mjs videos/<nombre> <escena> [--at 1.5,4,9] [--check]
//   Sin --at toma: 1.3 s despues del inicio de cada frase + casi el final.
import { mkdirSync, readdirSync, rmSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { sincronizarBase, leerGuion, leerTiempos, buscarEscena, carpetaEscena, prepararEscena, hf, argumentos } from './comun.mjs';

const { opt, flag, posicional } = argumentos(process.argv);
const proyecto = path.resolve(posicional[0] || '');
if (!posicional[1]) throw new Error('Uso: revisar.mjs videos/<nombre> <escena>');

const escena = buscarEscena(leerGuion(proyecto), posicional[1]);
const t = leerTiempos(proyecto, escena.id);
const dir = carpetaEscena(proyecto, escena.id);
const meta = JSON.parse(readFileSync(path.join(proyecto, 'audio', `${escena.id}.meta.json`), 'utf8'));
prepararEscena(proyecto, t, meta.archivo);
sincronizarBase(dir);

const momentos = opt('at')
  ? opt('at')
  : [...Object.values(t.frases).map((f) => Math.min(+(f.inicio + 1.3).toFixed(2), t.duracion - 0.1)), +(t.duracion - 0.9).toFixed(2)].join(',');

const lint = await hf(['lint', '.'], { cwd: dir });
if (lint.code !== 0) process.exit(lint.code);
if (flag('check')) await hf(['check', '.', '--no-contrast'], { cwd: dir });

const salida = path.join(proyecto, 'snapshots', escena.id);
rmSync(salida, { recursive: true, force: true });
mkdirSync(salida, { recursive: true });
const snap = await hf(['snapshot', '.', '--at', momentos, '--no-end', '--describe', 'false', '--output', salida], { cwd: dir, silencioso: true });
if (snap.code !== 0) { console.error(snap.out); process.exit(snap.code); }
console.log(`\nSnapshots (${escena.id}, ${t.duracion}s):`);
for (const f of readdirSync(salida).filter((x) => x.endsWith('.png'))) console.log(path.join(salida, f));
