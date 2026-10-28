// Tiempos de la voz: en que segundo empieza y termina cada frase del guion.
// Funciones puras (sin red ni disco) para poder probarlas con node:test.

const r3 = (n) => +(+n).toFixed(3);

// "¿Qué?" -> "que". Solo letras y numeros, sin tildes ni mayusculas.
export function normalizar(palabra) {
  return String(palabra)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function palabras(texto) {
  return String(texto).split(/\s+/).map(normalizar).filter(Boolean);
}

// Texto que se manda a la voz: las frases de la escena unidas por un espacio.
export function textoDeEscena(frases) {
  return { texto: frases.map((f) => f.texto.trim()).join(' ') };
}

// Tiempos por caracter (ElevenLabs) -> palabras con inicio del primer caracter y fin del ultimo.
export function palabrasDesdeCaracteres(alignment) {
  const c = alignment.characters;
  const s = alignment.character_start_times_seconds;
  const e = alignment.character_end_times_seconds;
  const out = [];
  let actual = null;
  for (let i = 0; i < c.length; i++) {
    if (/\s/.test(c[i])) {
      if (actual) { out.push(actual); actual = null; }
      continue;
    }
    if (!actual) actual = { text: '', start: s[i], end: e[i] };
    actual.text += c[i];
    actual.end = e[i];
  }
  if (actual) out.push(actual);
  return out;
}

// ---------- numeros: la transcripcion los trae en cifras ("35") y el guion en palabras ("treinta y cinco") ----------
const UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce',
  'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidos',
  'veintitres', 'veinticuatro', 'veinticinco', 'veintiseis', 'veintisiete', 'veintiocho', 'veintinueve'];
const DECENAS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos',
  'ochocientos', 'novecientos'];

function menosDeMil(n) {
  if (n < 30) return UNIDADES[n];
  if (n < 100) return DECENAS[Math.floor(n / 10)] + (n % 10 ? ` y ${UNIDADES[n % 10]}` : '');
  if (n === 100) return 'cien';
  return CENTENAS[Math.floor(n / 100)] + (n % 100 ? ` ${menosDeMil(n % 100)}` : '');
}

// 35 -> "treinta y cinco", 1000 -> "mil" (sin tildes, como normalizar)
export function numeroEnPalabras(n) {
  n = Math.floor(Math.abs(n));
  if (n < 1000) return menosDeMil(n);
  const miles = Math.floor(n / 1000);
  const resto = n % 1000;
  const m = miles === 1 ? 'mil' : `${menosDeMil(miles)} mil`;
  return resto ? `${m} ${menosDeMil(resto)}` : m;
}

// Cada cifra de la transcripcion pasa a sus palabras y su tiempo se reparte entre ellas, asi la alineacion
// encuentra "treinta y cinco" aunque Whisper haya escrito "35". "2.5" -> dos punto cinco, "1.000" -> mil.
export function expandirNumeros(habladas) {
  const out = [];
  for (const w of habladas) {
    const m = String(w.text).match(/^\W*(\d+(?:[.,]\d+)*)\W*$/);
    if (!m) { out.push(w); continue; }
    const dec = m[1].match(/^(\d+)([.,])(\d{1,2})$/);
    const dichas = (dec
      ? `${numeroEnPalabras(+dec[1])} ${dec[2] === '.' ? 'punto' : 'coma'} ${numeroEnPalabras(+dec[3])}`
      : numeroEnPalabras(+m[1].replace(/[.,]/g, ''))).split(' ');
    const paso = (w.end - w.start) / dichas.length;
    dichas.forEach((p, k) => out.push({ text: p, start: r3(w.start + paso * k), end: r3(w.start + paso * (k + 1)) }));
  }
  return out;
}

// Empareja las palabras del guion con las habladas (ya normalizadas) usando distancia de edicion por
// palabras. Devuelve, para cada palabra del guion, el indice de su palabra hablada (o -1).
function emparejar(guion, h) {
  const n = guion.length;
  const m = h.length;
  const D = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  for (let i = 1; i <= n; i++) D[i][0] = i;
  for (let j = 1; j <= m; j++) D[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const sub = D[i - 1][j - 1] + (guion[i - 1] === h[j - 1] ? 0 : 1);
      D[i][j] = Math.min(sub, D[i - 1][j] + 1, D[i][j - 1] + 1);
    }
  }

  // Recorre hacia atras: cada palabra del guion queda con el indice de su palabra hablada (o -1)
  const mapa = new Array(n).fill(-1);
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    const sub = D[i - 1][j - 1] + (guion[i - 1] === h[j - 1] ? 0 : 1);
    if (D[i][j] === sub) { mapa[i - 1] = j - 1; i--; j--; }
    else if (D[i][j] === D[i - 1][j] + 1) i--;
    else j--;
  }
  return mapa;
}

// Cuanto del guion dijo la voz, segun la transcripcion. Sirve para las voces sin tiempos propios:
// una palabra saltada o cambiada baja la cobertura. Devuelve { dichas, total, faltan: [palabras] }.
export function cobertura(frases, habladas) {
  const guion = frases.flatMap((f) => palabras(f.texto));
  const h = expandirNumeros(habladas).map((w) => normalizar(w.text)).filter(Boolean);
  const mapa = emparejar(guion, h);
  const faltan = guion.filter((p, k) => mapa[k] < 0 || h[mapa[k]] !== p);
  return { dichas: guion.length - faltan.length, total: guion.length, faltan };
}

// Alinea las palabras del guion con las palabras habladas (que traen tiempos) usando distancia de
// edicion por palabras. Tolera numeros dichos en letras, palabras de mas o de menos y errores de la
// transcripcion. Devuelve { fraseId: { inicio, fin } }.
export function alinearFrases(frases, habladas) {
  const guion = [];
  for (const f of frases) for (const p of palabras(f.texto)) guion.push({ frase: f.id, p });
  const h = expandirNumeros(habladas)
    .map((w) => ({ start: w.start, end: w.end, p: normalizar(w.text) }))
    .filter((w) => w.p);
  const mapa = emparejar(guion.map((g) => g.p), h.map((w) => w.p));

  const out = {};
  for (const f of frases) {
    const idx = [];
    guion.forEach((g, k) => { if (g.frase === f.id && mapa[k] >= 0) idx.push(mapa[k]); });
    out[f.id] = idx.length ? { inicio: r3(h[idx[0]].start), fin: r3(h[idx[idx.length - 1]].end) } : null;
  }

  // Frases sin ninguna palabra reconocida: se interpolan entre sus vecinas
  const ids = frases.map((f) => f.id);
  ids.forEach((id, k) => {
    if (out[id]) return;
    const prev = ids.slice(0, k).reverse().map((x) => out[x]).find(Boolean);
    const next = ids.slice(k + 1).map((x) => out[x]).find(Boolean);
    const inicio = prev ? prev.fin : (next ? next.inicio : 0);
    const fin = next ? next.inicio : inicio + 0.5;
    out[id] = { inicio: r3(inicio), fin: r3(Math.max(fin, inicio)) };
  });

  // Nunca hacia atras: cada frase empieza despues (o junto) de la anterior
  for (let k = 1; k < ids.length; k++) {
    const a = out[ids[k - 1]];
    const b = out[ids[k]];
    if (b.inicio < a.inicio) b.inicio = a.inicio;
    if (b.fin < b.inicio) b.fin = b.inicio;
  }

  // Tiempo de cada palabra de la frase (para que algo entre justo cuando se dice esa palabra).
  // Las palabras no reconocidas se interpolan entre sus vecinas dentro de la frase.
  for (const f of frases) {
    const lista = [];
    guion.forEach((g, k) => { if (g.frase === f.id) lista.push({ p: g.p, t: mapa[k] >= 0 ? h[mapa[k]].start : null }); });
    const { inicio, fin } = out[f.id];
    for (let k = 0; k < lista.length; k++) {
      if (lista[k].t != null) continue;
      let a = k - 1;
      while (a >= 0 && lista[a].t == null) a--;
      let b = k + 1;
      while (b < lista.length && lista[b].t == null) b++;
      const ta = a >= 0 ? lista[a].t : inicio;
      const tb = b < lista.length ? lista[b].t : fin;
      const ia = a >= 0 ? a : -1;
      const ib = b < lista.length ? b : lista.length;
      lista[k].t = ta + ((tb - ta) * (k - ia)) / (ib - ia);
    }
    out[f.id].palabras = lista.map((w) => ({ p: w.p, t: r3(w.t) }));
  }
  return out;
}

// Objeto final que lee la escena: todo desplazado por el silencio de entrada.
export function armarTiempos({ escena, frases, tiempos, duracionAudio, entrada = 0.5, salida = 0.8 }) {
  const fr = {};
  for (const f of frases) {
    const t = tiempos[f.id];
    fr[f.id] = {
      inicio: r3(t.inicio + entrada),
      fin: r3(t.fin + entrada),
      palabras: (t.palabras || []).map((w) => ({ p: w.p, t: r3(w.t + entrada) })),
    };
  }
  return {
    escena,
    entrada: r3(entrada),
    duracionAudio: r3(duracionAudio),
    duracion: r3(entrada + duracionAudio + salida),
    frases: fr,
  };
}
