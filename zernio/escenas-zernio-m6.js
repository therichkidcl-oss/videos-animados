/* MODULO ZERNIO · CLASE 6 · Zernio o el bot de interaccion: como funciona cada uno (27/10/2026, voz v3).
   Datos del bot: modulo Automatizaciones (v2 y v4: Python + Selenium en tu PC, se maneja por Telegram, publica y programa). */
CLASE({ num: 6, escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'MÓDULO ZERNIO · CLASE 6', tit: ['Zernio', 'y el bot'],
    pills: [{ ico: 'workflow', txt: 'Cómo funciona cada uno', at: 'funciona@f1' }] },
  { tipo: 'zBot', t: ['f2', 'f5'], msgs: [['u', '/start', 'manejas@f2'], ['u', '<code>instagram.com/p/C9x...</code>', 'pegas@f3'],
      ['b', 'Abriendo la publicación... 32 me gusta y 30 respuestas', 'responde@f3'], ['b', 'Reel programado para mañana 20:00', 'programa@f3']],
    notas: [['laptop', 'Corre en tu computador, en Chrome', 'computador@f2'], ['send', 'Lo manejas desde Telegram', 'telegram@f2'],
      ['calendarDays', 'También publica y programa', 'programa@f3'], ['clock', 'Lento a propósito, como una persona', 'lento@f4', 'a']] },
  { tipo: 'tags', t: ['f5', 'f6'], tit: ['Zernio', 'vive en la nube'], tags: [
    { ico: 'shieldCheck', c: 'v', txt: 'Permiso oficial de Instagram', at: 'oficial@f5' }, { ico: 'server', c: 'o', txt: 'Publica y responde desde sus servidores', at: 'servidores@f5' },
    { ico: 'moon', c: 'b', txt: 'Funciona con tu PC apagado', at: 'apagado@f5' }] },
  { tipo: 'zCompara', t: ['f6', 'f10'], filas: [
    ['Dónde corre', 'En la nube', 'En tu computador', 'diferencia@f6', true, true],
    ['Publica y programa', 'Sí', 'Sí (versión mejorada)', 'publica@f7', true, true],
    ['Tu audiencia', 'Responde tus comentarios y manda tu link', 'Responde comentarios del post que le pegas', 'responde@f7', true, true],
    ['Audiencia nueva', 'No sale a buscarla', 'Interactúa en otras publicaciones', 'nueva@f8', false, true],
    ['Costo', '2 cuentas gratis', 'Gratis (IA opcional, pagada)', 'gratis@f9', true, true]] },
  { tipo: 'venn', t: ['f10', 'f11'], tit: ['No compiten,', 'se complementan'], a: { t: 'ZERNIO', s: 'Tu audiencia', at: 'zernio@f10' },
    b: { t: 'BOT', s: 'Gente nueva', at: 'bot@f10' }, centro: { t: 'Más seguidores y más ventas', at: 'nueva@f10' } },
  { tipo: 'tags', t: ['f11', 'f12'], tit: ['Para los', 'dos'], tags: [
    { ico: 'clock', c: 'v', txt: 'Actívalos con la cuenta ya calentada', at: 'calentada@f11' }, { ico: 'gauge', c: 'a', txt: 'Nunca con ritmos exagerados', at: 'ritmos@f11' }] },
  { tipo: 'tarjetas', t: ['f12', 'fin'], tit: ['¿Te', 'trabaste?'], cards: [
    { ico: 'video', c: 'o', t: 'Sesiones en vivo', s: '*Cada semana*: lo vemos juntos', at: 'vivo@f12' }] },
] });
