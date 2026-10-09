// Carga .env y apaga lo que HyperFrames hace por su cuenta (telemetria, skills globales, avisos de version)
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const env = path.join(RAIZ, '.env');
if (existsSync(env)) process.loadEnvFile(env);

Object.assign(process.env, {
  HYPERFRAMES_NO_TELEMETRY: '1',
  HYPERFRAMES_NO_UPDATE_CHECK: '1',
  HYPERFRAMES_SKIP_SKILLS: '1',
});

// Binario local de HyperFrames (evita que npx descargue otra version)
export const HF_BIN = path.join(RAIZ, 'node_modules', '.bin', process.platform === 'win32' ? 'hyperframes.cmd' : 'hyperframes');
