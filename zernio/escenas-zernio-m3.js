/* MODULO ZERNIO · CLASE 3 · Conecta Claude y automatiza la subida de tus reels (27/10/2026, voz v3). */
const PROMPT_CLASE = 'Quiero que automatices la publicación de los reels de mi modelo en Instagram con Zernio.\n' +
  '1. Conecta el MCP de Zernio con mi API key y guárdala en un .env privado.\n' +
  '2. Crea la carpeta *publicar/*: yo dejo cada reel en su propia carpeta.\n' +
  '3. Cada día: revisa los cuadros, escribe la descripción y prográmalo (máximo 2 al día).\n' +
  '4. Crea la automatización de comentarios: respuesta casual + mensaje privado con mi link secundario.\n' +
  '5. Deja una tarea programada diaria y prueba todo sin publicar.';
CLASE({ num: 3, siguiente: 'Descripciones y respuestas naturales', escenas: [
  { tipo: 'titulo', t: [0, 'f1'], chip: 'MÓDULO ZERNIO · CLASE 3', tit: ['Claude', 'publica por ti'],
    pills: [{ ico: 'calendarDays', txt: 'Todos los días', at: 'dias@f0' }, { ico: 'smartphone', txt: 'Sin abrir Instagram', at: 'abrir@f0' }] },
  { tipo: 'zClaude', t: ['f1', 'f4'], paso: ['PASO 4', 'Conecta Zernio a Claude'], umAt: 'abre@f2',
    um: 'Conecta el MCP de Zernio con mi API key: sk_7f3a9c2e5b81••••••••••••••••',
    lineas: [['ok', 'Llave guardada en .env (archivo privado)', 'guarda@f3'], ['w', 'zernio · accounts_list', 'revisa@f3'], ['ok', 'Instagram @itsrubylane conectada', 'conectada@f3']],
    ar: 'Listo. *Ya puedo publicar en tu Instagram.*', arAt: 'desde@f3' },
  { tipo: 'zClaude', t: ['f4', 'f6'], paso: ['PASO 5', 'Pega el prompt de la clase'], umAt: 'descripcion@f5', pegado: true, um: PROMPT_CLASE,
    lineas: [['w', 'Leyendo tu prompt y armando todo...', 'copias@f5']] },
  { tipo: 'zCarpeta', t: ['f6', 'f8'], hdAt: 'carpeta@f6',
    carpetas: [['01 - Domingo en casa', 'publicar@f6'], ['02 - Café con amigas', 'dejas@f6'], ['03 - Atardecer en la playa', 'propia@f6']],
    tarea: { at: 'tarea@f7', t: 'TAREA PROGRAMADA', s: 'Revisa la carpeta todos los días' } },
  { tipo: 'zDiario', t: ['f8', 'f12'], pasos: [['scanFace', 'Revisa los cuadros', 'cuadros@f9'], ['fileText', 'Escribe la descripción', 'descripcion@f10'],
    ['send', 'Lo sube a Zernio', 'sube@f11'], ['calendarDays', 'Lo programa', 'programa@f11']],
    fotos: [['ig-f1', '50% 30%'], ['ig-f2', '50% 30%'], ['ig-f3', '50% 30%'], ['ig-f4', '50% 30%']], ruta: 'publicar/01 - Domingo en casa/descripcion.txt',
    desc: ['Domingo en casa, versión cosplay.', 'Me lo pidieron tanto que tenía que hacerlo. ¿Qué personaje hago la próxima?', 'Te leo en los comentarios.',
      '#cosplay #pelirroja #domingo #lookdehoy #redhead'], hora: 'Programado: martes 27 · 20:00' },
  { tipo: 'zPosts', t: ['f12', 'f13'], desde: 'publicaciones@f12', publicado: 'publicado@f12',
    eventos: [[2, '20:00', 'Domingo en casa'], [3, '21:30', 'Café con amigas'], [4, '20:00', 'Atardecer en la playa'], [5, '21:30', 'Gym de mañana'],
      [6, '20:00', 'Noche de rooftop'], [7, '21:30', 'Vestido rojo'], [8, '20:00', 'Look de hoy']] },
  { tipo: 'tags', t: ['f13', 'f17'], tit: ['Para que no', 'te bloqueen'], tags: [
    { ico: 'video', c: 'o', txt: 'Máximo 2 o 3 reels al día', at: 'maximo@f14' }, { ico: 'circleX', c: 'r', txt: 'Nunca el mismo video muchas veces', at: 'mismo@f15' },
    { ico: 'triangleAlert', c: 'a', txt: 'Un reel publicado se borra en la app, no por API', at: 'borrar@f16' }] },
  { tipo: 'frase', t: ['f17', 'fin'], tit: ['Próxima', 'clase'], frase: 'Cómo Claude escribe tus *descripciones* y responde los *comentarios* de forma natural', at: 'descripciones@f17' },
] });
