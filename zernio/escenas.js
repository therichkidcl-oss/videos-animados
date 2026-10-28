/* CLASE 8 · Automatizaciones (curso NSFW) · Publica tus reels solo con Zernio y Claude Code (26/10/2026, voz v3).
   Paso a paso real del panel de Zernio recreado. Tiempos por frase del guion: 'fN' y 'palabra@fN'. */
const PROMPT_CLASE = 'Quiero que automatices la publicación de los reels de mi modelo en Instagram con Zernio.\n' +
  '1. Conecta el MCP de Zernio con mi API key y guárdala en un .env privado.\n' +
  '2. Crea la carpeta *publicar/*: yo dejo cada reel en su propia carpeta.\n' +
  '3. Cada día: revisa los cuadros, escribe la descripción y prográmalo (máximo 2 al día).\n' +
  '4. Si el reel pide comentar una palabra, crea la automatización *Comment-to-DM* con mi link secundario.\n' +
  '5. Deja una tarea programada diaria y prueba todo sin publicar.';
CLASE({ num: 8, escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'CLASE 8', tit: ['Instagram en', 'piloto automático'],
    pills: [{ ico: 'calendarDays', txt: 'Publica tus reels a la mejor hora', at: 'publica@f1' }, { ico: 'fileText', txt: 'Escribe la descripción', at: 'descripcion@f1' },
      { ico: 'messageSquare', txt: 'Responde los comentarios', at: 'responde@f1' }] },
  { tipo: 'zDuo', t: ['f2', 'f3'], at: { a: 'zernio@f2', b: 'clod@f2' } },
  { tipo: 'logos', t: ['f3', 'f7'], tit: ['¿Qué es', 'Zernio?'], logos: [
    { slug: 'instagram', l: 'Instagram', at: 'instagram@f4' }, { slug: 'tiktok', l: 'TikTok', at: 'tiktok@f4' }, { slug: 'facebook', l: 'Facebook', at: 'feisbuk@f4' },
    { slug: 'youtube', l: 'YouTube', at: 'iutub@f4' }, { slug: 'x', l: 'X', at: 'equis@f4' }, { slug: 'threads', l: 'Threads', at: 'threads@f4' }],
    pills: [{ ico: 'server', txt: 'Publica desde sus servidores, con tu PC apagado', at: 'servidores@f5' }, { ico: 'badgeDollarSign', txt: '2 cuentas gratis, sin tarjeta', at: 'gratis@f6' }] },
  { tipo: 'tarjetas', t: ['f7', 'f10'], tit: ['Antes de', 'empezar'], cards: [
    { ico: 'users', c: 'o', t: 'Cuenta de creador', s: 'O de empresa: *las personales no se pueden*', at: 'creador@f8' },
    { ico: 'clock', c: 'v', t: 'Cuenta ya calentada', s: 'Los *primeros 30 días*, todo a mano', at: 'calentada@f9' }] },
  { tipo: 'zSign', t: ['f10', 'f13'], at: { google: 'gugol@f11', dentro: 'segundos@f12' } },
  { tipo: 'zConectar', t: ['f13', 'f19'], at: { nueva: 'nueva@f14', ig: 'elige@f15', con: 'conectar@f15', sesion: 'sesion@f16', permisos: 'permisos@f16',
    vuelves: 'vuelves@f16', conectada: 'conectada@f17', vence: 'vence@f18' } },
  { tipo: 'zLlave', t: ['f19', 'f24'], at: { entra: 'entra@f20', crear: 'crear@f20', nombre: 'nombre@f21', lectura: 'lectura@f21', creala: 'creala@f21',
    copia: 'copiala@f22', nunca: 'contrasena@f23' } },
  { tipo: 'zClaude', t: ['f24', 'f27'], paso: ['PASO 4', 'Conecta Zernio a Claude'], umAt: 'conecta@f25',
    um: 'Conecta el MCP de Zernio con mi API key: sk_7f3a9c2e5b81••••••••••••••••',
    lineas: [['ok', 'Llave guardada en .env (archivo privado)', 'guarda@f26'], ['w', 'zernio · accounts_list', 'revisa@f26'], ['ok', 'Instagram @tu.modelo conectada', 'conectada@f26']],
    ar: 'Listo. *Ya puedo publicar en tu Instagram.*', arAt: 'desde@f26' },
  { tipo: 'zClaude', t: ['f27', 'f29'], paso: ['PASO 5', 'Pega el prompt de la clase'], umAt: 'pegas@f28', pegado: true, um: PROMPT_CLASE,
    lineas: [['w', 'Leyendo tu prompt y armando todo...', 'pegas@f28']] },
  { tipo: 'zCarpeta', t: ['f29', 'f31'], hdAt: 'carpeta@f29',
    carpetas: [['01 - Noche en Miami', 'publicar@f29'], ['02 - Domingo de playa', 'dejas@f29'], ['03 - Gym a las 7', 'propia@f29']],
    tarea: { at: 'tarea@f30', t: 'TAREA PROGRAMADA', s: 'Revisa la carpeta todos los días' } },
  { tipo: 'zDiario', t: ['f31', 'f35'], pasos: [['scanFace', 'Revisa los cuadros', 'cuadros@f32'], ['fileText', 'Escribe la descripción', 'descripcion@f33'],
    ['send', 'Lo sube a Zernio', 'sube@f34'], ['calendarDays', 'Lo programa', 'programa@f34']],
    fotos: [['ig-barco', '30% 40%'], ['ig-barco', '50% 45%'], ['ig-barco', '62% 52%'], ['ig-barco', '44% 60%']],
    desc: ['Una noche en Miami que no voy a olvidar.', 'Vestido blanco, la brisa del mar y la ciudad encendida de fondo.', '¿Tú qué harías esta noche? Te leo en los comentarios.',
      '#miami #noche #lookdehoy #viajes #lifestyle'], hora: 'Programado: martes 27 · 20:00' },
  { tipo: 'zPosts', t: ['f35', 'f36'], desde: 'publicaciones@f35', publicado: 'publicado@f35',
    eventos: [[2, '20:00', 'Noche en Miami'], [3, '21:30', 'Domingo de playa'], [4, '20:00', 'Gym a las 7'], [5, '21:30', 'Look de hoy'], [6, '20:00', 'Café y atardecer'],
      [7, '21:30', 'Un día conmigo'], [8, '20:00', 'Playa al atardecer']] },
  { tipo: 'zFlujo', modo: 'reel', t: ['f36', 'f38'], foto: 'ig-cena', resp: 'responde@f37',
    comentarios: [['carlos_88', 'LINK', 'comenta@f37'], ['mateo.rx', 'link porfa', 'link@f37'], ['jp_23', 'LINK', 'responde@f37']] },
  { tipo: 'zAuto', t: ['f38', 'f39'], at: { camp: 'campanas@f38', tab: 'pestana@f38', fila: 'automatizacion@f38' } },
  { tipo: 'zFlujo', modo: 'dm', t: ['f39', 'f41'], at: { like: 'gusta@f39', publico: 'publico@f39', dm: 'directo@f39', boton: 'boton@f39',
    revisar: 'revisar@f40', sigue: 'sigue@f40', primero: 'primero@f40' } },
  { tipo: 'tags', t: ['f41', 'f45'], tit: ['Para que no', 'te bloqueen'], tags: [
    { ico: 'video', c: 'o', txt: 'Máximo 2 o 3 reels al día', at: 'maximo@f42' }, { ico: 'circleX', c: 'r', txt: 'Nunca el mismo video muchas veces', at: 'mismo@f43' },
    { ico: 'triangleAlert', c: 'a', txt: 'Un reel publicado se borra en la app, no por API', at: 'borrar@f44' }] },
  { tipo: 'frase', t: ['f45', 'f46'], tit: ['Instagram en', 'piloto automático'], frase: 'Dejas tus reels en la carpeta y *se publican solos*, a la mejor hora, *con tu PC apagado*', at: 'carpeta@f45' },
  { tipo: 'tarjetas', t: ['f46', 'fin'], tit: ['¿Te', 'trabaste?'], cards: [
    { ico: 'video', c: 'o', t: 'Sesiones en vivo', s: '*Cada semana*: lo vemos juntos', at: 'vivo@f46' }] },
] });
