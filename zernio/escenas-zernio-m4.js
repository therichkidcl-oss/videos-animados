/* MODULO ZERNIO · CLASE 4 · Descripciones y respuestas que se sienten naturales (27/10/2026, voz v3). */
CLASE({ num: 4, siguiente: 'El mensaje privado con tu link', escenas: [
  { tipo: 'titulo', t: [0, 'f1'], chip: 'MÓDULO ZERNIO · CLASE 4', tit: ['Que se sienta', 'humano'],
    pills: [{ ico: 'fileText', txt: 'Descripciones', at: 'descripciones@f0' }, { ico: 'messageSquare', txt: 'Respuestas a comentarios', at: 'respuestas@f0' }] },
  { tipo: 'zDesc', t: ['f1', 'f4'], foto: 'ig-negro', desde: 'escribe@f1',
    lineas: [['Domingo de vestido negro y cero planes.'], ['¿Tú qué harías esta noche?'], ['#pelirroja #ootd #lookdehoy #redhead', 'h']],
    puntos: [['sparkles', 'Una primera línea que enganche', 'enganche@f2'], ['messageSquare', 'Una pregunta para que comenten', 'pregunta@f2'],
      ['layers', 'De 3 a 5 hashtags', 'hashtags@f2'], ['circleX', 'Nada de links, +18 ni "compra"', 'vende@f3', 1]] },
  { tipo: 'zForm', t: ['f4', 'f7'], at: { vacio: 'vacias@f5', publica: 'casual@f6', like: 'calce@f6', retraso: 'escriban@f6' } },
  { tipo: 'zComentarios', t: ['f7', 'f9'], pares: [
    ['marco.rv', 'qué hermosa estás', 'jajaja, me sacaste una sonrisa', 'sonrisa@f7'],
    ['juanp_89', 'de dónde eres?', 'ay, qué lindo, gracias', 'lindo@f7'],
    ['el.tano', 'ese vestido te queda increíble', 'tú sí sabes', 'sabes@f7'],
    ['diegox', 'sube más fotos así', 'y eso que no has visto lo mejor', 'mejor@f7']] },
  { tipo: 'tarjetas', t: ['f9', 'f11'], tit: ['Lo que', 'no debes hacer'], cards: [
    { ico: 'circleX', c: 'r', t: '"Te escribí por privado"', s: 'Suena a *robot*', at: 'escribi@f9', ok: false },
    { ico: 'circleX', c: 'r', t: '"Revisa tus mensajes"', s: 'Instagram lo toma como *spam*', at: 'revisa@f9', ok: false },
    { ico: 'sparkles', c: 'a', t: 'Corazones en todas', s: '*Uno de vez en cuando*, no siempre', at: 'corazon@f10' }] },
  { tipo: 'tags', t: ['f11', 'f13'], tit: ['Pídeselo', 'a Claude'], tags: [
    { ico: 'repeat2', c: 'o', txt: 'De 8 a 10 variaciones de respuesta', at: 'variaciones@f11' }, { ico: 'check', c: 'v', txt: 'Que nunca se repita la misma', at: 'repita@f11' },
    { ico: 'thumbsUp', c: 'p', txt: 'Me gusta al comentario: activado', at: 'gusta@f12' }, { ico: 'clock', c: 'b', txt: 'Un pequeño retraso antes de responder', at: 'retraso@f12' }] },
  { tipo: 'frase', t: ['f13', 'fin'], tit: ['Próxima', 'clase'], frase: 'El *mensaje privado* que le llega a cada persona que comenta, *con tu link*', at: 'privado@f13' },
] });
