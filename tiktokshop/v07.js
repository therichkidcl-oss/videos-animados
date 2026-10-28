/* CLASE 7 · Cambia tu nombre de usuario y el nombre del canal (73 s, celular) */
CLASE({ num: 7, siguiente: 'Pon tu método de pago', escenas: [
  { tipo: 'titulo', t: [0, 11.1], chip: 'CLASE 7', tit: ['Cambia tu nombre', 'y tu usuario'],
    pills: [{ ico: 'users', txt: 'Nombre de usuario', at: 'usuario' }, { ico: 'penTool', txt: 'Nombre del canal', at: 'canal' }] },
  { tipo: 'lista', t: [11.1, 40.9], n: 'PASO 1', tit: 'Nombre de la cuenta', items: [
    ['Toca el lapicito', 'lapicito'], ['Toca tu nombre', 'tocas'], ['Escribe el nombre que quieras', 'decidas'], ['Toca «Guardar»', 'guardar']] },
  { tipo: 'lista', t: [40.9, 55.6], n: 'PASO 2', tit: 'Nombre de usuario', items: [
    ['Toca «Nombre de usuario»', 'usuario'], ['Escribe el que quieras', 'decides'], ['Toca «Guardar»', 'guardar']] },
  { tipo: 'tarjetas', t: [55.6, 'fin'], tit: ['Súper', 'importante'], cards: [
    { ico: 'triangleAlert', c: 'r', t: 'Piénsalo bien', s: 'Revisa el nombre antes de guardar', at: 'segura' },
    { ico: 'clock', c: 'o', t: 'Espera 30 días', s: 'No lo podrás volver a cambiar hasta *30 días* después', at: '30' }] },
] });
