import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizar, textoDeEscena, palabrasDesdeCaracteres, alinearFrases, armarTiempos,
} from './tiempos.mjs';

const frases = [
  { id: 'a', texto: '¿Qué hace cada pieza?' },
  { id: 'b', texto: 'El video pone el movimiento.' },
];

test('normalizar quita tildes, signos y mayusculas', () => {
  assert.equal(normalizar('¿Qué?'), 'que');
  assert.equal(normalizar('Ñandú,'), 'nandu');
  assert.equal(normalizar('@image1'), 'image1');
});

test('textoDeEscena une las frases con un espacio', () => {
  assert.equal(textoDeEscena(frases).texto, '¿Qué hace cada pieza? El video pone el movimiento.');
});

test('palabrasDesdeCaracteres arma palabras con el inicio del primer caracter y el fin del ultimo', () => {
  const texto = 'Hola mundo';
  const chars = [...texto];
  const alignment = {
    characters: chars,
    character_start_times_seconds: chars.map((_, i) => i * 0.1),
    character_end_times_seconds: chars.map((_, i) => i * 0.1 + 0.1),
  };
  const p = palabrasDesdeCaracteres(alignment);
  assert.equal(p.length, 2);
  assert.deepEqual(p[0], { text: 'Hola', start: 0, end: 0.4 });
  assert.equal(p[1].text, 'mundo');
  assert.equal(p[1].start, 0.5);
  assert.equal(+p[1].end.toFixed(2), 1.0);
});

test('alinearFrases ubica cada frase con palabras identicas', () => {
  const habladas = ['que', 'hace', 'cada', 'pieza', 'el', 'video', 'pone', 'el', 'movimiento']
    .map((text, i) => ({ text, start: i, end: i + 0.8 }));
  const t = alinearFrases(frases, habladas);
  assert.deepEqual([t.a.inicio, t.a.fin], [0, 3.8]);
  assert.deepEqual([t.b.inicio, t.b.fin], [4, 8.8]);
});

test('alinearFrases tolera numeros dichos como texto y palabras de mas', () => {
  const fr = [
    { id: 'x', texto: 'Dura entre 4 y 30 segundos.' },
    { id: 'y', texto: 'Y tiene un protagonista claro.' },
  ];
  const habladas = ['dura', 'entre', 'cuatro', 'y', 'treinta', 'segundos', 'eh', 'y', 'tiene', 'un', 'protagonista', 'claro']
    .map((text, i) => ({ text, start: i, end: i + 0.5 }));
  const t = alinearFrases(fr, habladas);
  assert.equal(t.x.inicio, 0);
  assert.equal(t.x.fin, 5.5);
  assert.equal(t.y.inicio, 7);
  assert.equal(t.y.fin, 11.5);
});

test('alinearFrases entrega el tiempo de cada palabra de la frase', () => {
  const habladas = ['que', 'hace', 'cada', 'pieza', 'el', 'video', 'pone', 'el', 'movimiento']
    .map((text, i) => ({ text, start: i, end: i + 0.8 }));
  const t = alinearFrases(frases, habladas);
  assert.deepEqual(t.b.palabras.map((w) => w.p), ['el', 'video', 'pone', 'el', 'movimiento']);
  assert.equal(t.b.palabras[4].t, 8);
});

test('una palabra no reconocida toma el tiempo interpolado de sus vecinas', () => {
  const fr = [{ id: 'x', texto: 'uno dos tres' }];
  const habladas = [{ text: 'uno', start: 0, end: 0.5 }, { text: 'tres', start: 2, end: 2.5 }];
  const t = alinearFrases(fr, habladas);
  assert.equal(t.x.palabras[1].t, 1);
});

test('alinearFrases interpola una frase que no se reconocio', () => {
  const fr = [
    { id: 'a', texto: 'uno dos' },
    { id: 'b', texto: 'zzz' },
    { id: 'c', texto: 'tres cuatro' },
  ];
  const habladas = ['uno', 'dos', 'tres', 'cuatro'].map((text, i) => ({ text, start: i, end: i + 0.5 }));
  const t = alinearFrases(fr, habladas);
  assert.equal(t.b.inicio, t.a.fin);
  assert.equal(t.b.fin, t.c.inicio);
});

test('armarTiempos desplaza por la entrada y calcula la duracion total', () => {
  const r = armarTiempos({
    escena: '01-intro',
    frases,
    tiempos: { a: { inicio: 0, fin: 1.2, palabras: [] }, b: { inicio: 1.4, fin: 3, palabras: [] } },
    duracionAudio: 3.2,
    entrada: 0.5,
    salida: 0.8,
  });
  assert.equal(r.duracion, 4.5);
  assert.deepEqual(r.frases.a, { inicio: 0.5, fin: 1.7, palabras: [] });
  assert.deepEqual(r.frases.b, { inicio: 1.9, fin: 3.5, palabras: [] });
  assert.equal(r.entrada, 0.5);
});
