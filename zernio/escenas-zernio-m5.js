/* MODULO ZERNIO · CLASE 5 · El mensaje privado con tu link, sin que se note (27/10/2026, voz v3). */
CLASE({ num: 5, siguiente: 'Zernio o el bot de interacción', escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'MÓDULO ZERNIO · CLASE 5', tit: ['Tu link,', 'por privado'],
    pills: [{ ico: 'users', txt: 'Cada comentario es alguien interesado', at: 'interesado@f0' }, { ico: 'send', txt: 'Le llega tu link, sin que se note', at: 'note@f1' }] },
  { tipo: 'zEmbudo', t: ['f2', 'f4'], at: { c: 'respuesta@f2', dm: 'directo@f2', lt: 'linktri@f3', fin: 'fanviu@f3' } },
  { tipo: 'zDMs', t: ['f4', 'f7'], no: [['"Contenido +18 aquí"', 'dieciocho@f4'], ['"Compra mi contenido"', 'compra@f4'], ['"Fotos a $5"', 'precios@f4']],
    si: [['Holaa, gracias por comentar. Te dejo donde subo lo que no publico aquí', 'Ver más de mí', 'holaa@f5'],
      ['Me encantó tu comentario. Aquí está mi rincón privado, por si te da curiosidad', 'Mi rincón', 'encanto@f6']] },
  { tipo: 'tarjetas', t: ['f7', 'f9'], tit: ['El botón', 'y tu página'], cards: [
    { ico: 'link', c: 'o', t: 'Nombre suave', s: '"Ver más de mí" · *máximo 20 letras*', at: 'boton@f7' },
    { ico: 'shieldCheck', c: 'v', t: 'Página limpia', s: '*Sin fotos explícitas* en tu Linktree', at: 'limpia@f8' }] },
  { tipo: 'tarjetas', t: ['f9', 'f12'], tit: ['Cómo', 'configurarlo'], cards: [
    { ico: 'repeat2', c: 'o', t: 'Una vez por reel', s: 'Cada persona recibe *un solo mensaje*', at: 'sola@f9' },
    { ico: 'users', c: 'p', t: 'Revisa que te siga', s: 'Si no te sigue, *primero se lo pide*', at: 'revision@f10' },
    { ico: 'badgeDollarSign', c: 'v', t: '10.000 gratis', s: 'Mensajes al mes *sin costo*', at: 'costo@f11' }] },
  { tipo: 'zClaude', t: ['f12', 'f13'], paso: ['CLAUDE', 'Lo arma solo con cada reel'], umAt: 'arma@f12', pegado: true,
    um: 'Programa el reel 02 y deja su automatización de comentarios',
    lineas: [['w', 'zernio · comment_automations_create', 'arma@f12'], ['ok', 'Respuesta en público: 10 variaciones casuales', 'publico@f12'],
      ['ok', 'Mensaje privado + botón "Ver más de mí"', 'privado@f12']] },
  { tipo: 'frase', t: ['f13', 'fin'], tit: ['Última', 'clase'], frase: 'En qué se diferencia Zernio del *bot de interacción*, y cómo usar *los dos juntos*', at: 'diferencia@f13' },
] });
