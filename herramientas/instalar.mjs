// Deja el estudio listo en esta PC:
//   1. copia las fuentes (@fontsource) y GSAP desde node_modules a base/
//   2. crea .env desde .env.example (vacio: el usuario pega su key)
//   3. instala la skill de Claude Code (skill/SKILL.md) apuntando a esta carpeta
//   4. revisa que esten ffmpeg, ffprobe y (opcional) Python + faster-whisper
//
// Uso: npm install && npm run instalar
//      npm run instalar -- --forzar                (reemplaza una skill ya instalada)
//      npm run instalar -- --skills-dir <carpeta>  (otra carpeta de skills, ej. para probar)
import { RAIZ } from './entorno.mjs';
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { argumentos } from './comun.mjs';

const { opt, flag } = argumentos(process.argv);
const nm = path.join(RAIZ, 'node_modules');
if (!existsSync(path.join(nm, 'hyperframes'))) {
  console.error('Falta instalar las dependencias. Corre primero: npm install');
  process.exit(1);
}

// 1. Fuentes y GSAP
const FUENTES = [
  ['@fontsource/space-grotesk', 'space-grotesk-latin-500-normal.woff2'],
  ['@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff2'],
  ['@fontsource/inter', 'inter-latin-400-normal.woff2'],
  ['@fontsource/inter', 'inter-latin-500-normal.woff2'],
  ['@fontsource/inter', 'inter-latin-600-normal.woff2'],
  ['@fontsource/inter', 'inter-latin-700-normal.woff2'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2'],
  ['@fontsource/jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff2'],
];
mkdirSync(path.join(RAIZ, 'base', 'fuentes'), { recursive: true });
mkdirSync(path.join(RAIZ, 'base', 'vendor'), { recursive: true });
for (const [pkg, archivo] of FUENTES) {
  copyFileSync(path.join(nm, pkg, 'files', archivo), path.join(RAIZ, 'base', 'fuentes', archivo));
}
copyFileSync(path.join(nm, 'gsap', 'dist', 'gsap.min.js'), path.join(RAIZ, 'base', 'vendor', 'gsap.min.js'));
console.log('✓ Fuentes y GSAP copiados a base/');

// 2. .env
const env = path.join(RAIZ, '.env');
if (!existsSync(env)) {
  copyFileSync(path.join(RAIZ, '.env.example'), env);
  console.log('✓ Creado .env (pega ahi tu ELEVENLABS_API_KEY o MINIMAX_API_KEY)');
} else {
  console.log('= .env ya existe (no se toco)');
}

// 3. Skill de Claude Code
const skillsDir = path.resolve(opt('skills-dir') || path.join(os.homedir(), '.claude', 'skills'));
const destino = path.join(skillsDir, 'videos-animados', 'SKILL.md');
const skill = readFileSync(path.join(RAIZ, 'skill', 'SKILL.md'), 'utf8').replaceAll('{{ESTUDIO}}', RAIZ);
if (existsSync(destino) && !flag('forzar')) {
  console.log(`= La skill ya existe en ${destino} (usa --forzar para reemplazarla)`);
} else {
  mkdirSync(path.dirname(destino), { recursive: true });
  writeFileSync(destino, skill);
  console.log(`✓ Skill instalada en ${destino}`);
}

// 4. Herramientas del sistema
function hay(cmd, args) {
  try { execFileSync(cmd, args, { stdio: 'ignore' }); return true; } catch { return false; }
}
const python = hay('python', ['--version']) ? 'python' : (hay('python3', ['--version']) ? 'python3' : null);
const chequeos = [
  ['ffmpeg', hay('ffmpeg', ['-version']), 'obligatorio: https://ffmpeg.org (en Windows: winget install Gyan.FFmpeg)'],
  ['ffprobe', hay('ffprobe', ['-version']), 'obligatorio: viene con ffmpeg'],
  ['python', !!python, 'opcional: solo para MiniMax, la voz local y revisar pronunciacion'],
  ['faster-whisper', !!python && hay(python, ['-c', 'import faster_whisper']), `opcional: ${python || 'python'} -m pip install faster-whisper`],
];
console.log('\nHerramientas:');
for (const [nombre, ok, ayuda] of chequeos) console.log(`  ${ok ? '✓' : '✗'} ${nombre}${ok ? '' : `  -> ${ayuda}`}`);

console.log(`
Listo. Siguientes pasos:
  1. Pega tu key de ElevenLabs (o MiniMax) en ${env}
  2. npm test
  3. En Claude Code pide: "hazme un video animado explicando <tema>"`);
