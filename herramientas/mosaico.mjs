// Junta snapshots en hojas de 2x2 (cada cuadro a 960x540) para revisarlos rapido.
// Uso: node herramientas/mosaico.mjs <carpeta-con-png> -> <carpeta>/mosaico-N.png
import { readdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

// drawtext necesita un archivo de fuente explicito (ffmpeg en Windows no trae fontconfig). Sin fuente, sin etiquetas.
const FUENTE = ['C:/Windows/Fonts/arial.ttf', '/System/Library/Fonts/Supplemental/Arial.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']
  .find((f) => existsSync(f));
const FUENTE_FILTRO = FUENTE ? FUENTE.replace(':', '\\:') : null;

const dir = path.resolve(process.argv[2] || '.');
for (const f of readdirSync(dir)) if (f.startsWith('mosaico-')) rmSync(path.join(dir, f));
const pngs = readdirSync(dir).filter((f) => /^frame-.*\.png$/.test(f)).sort();

for (let i = 0, hoja = 1; i < pngs.length; i += 4, hoja++) {
  const grupo = pngs.slice(i, i + 4);
  while (grupo.length < 4) grupo.push(null);
  const entradas = [];
  const filtros = [];
  grupo.forEach((f, k) => {
    if (f) entradas.push('-i', path.join(dir, f));
    else entradas.push('-f', 'lavfi', '-i', 'color=c=black:s=1920x1080');
    const nombre = f ? f.replace(/^frame-\d+-at-|\.png$/g, '') : '';
    const texto = nombre && FUENTE_FILTRO ? `,drawtext=fontfile='${FUENTE_FILTRO}':text='${nombre}':x=20:y=16:fontsize=34:fontcolor=white:box=1:boxcolor=black@0.6` : '';
    filtros.push(`[${k}:v]scale=960:540${texto}[v${k}]`);
  });
  const salida = path.join(dir, `mosaico-${hoja}.png`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...entradas, '-filter_complex',
    `${filtros.join(';')};[v0][v1][v2][v3]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0`, '-frames:v', '1', salida]);
  console.log(salida);
}
