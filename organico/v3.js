/* CLASE 3 · Definiendo la personalidad de tu modelo (doblada, voz v3). Tiempos por frase del guion: 'fN'. */
CLASE({ num: 3, siguiente: 'Aprende a hacer marketing con tu modelo', escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'CLASE 3', tit: ['La persona de', 'tu modelo'],
    pills: [{ ico: 'scanFace', txt: 'Su nombre y su edad', at: 'nombre@f1' }, { ico: 'users', txt: 'Su look y su personalidad', at: 'look@f1' },
      { ico: 'smartphone', txt: 'Sus usuarios en redes', at: 'usuarios@f1' }] },
  { tipo: 'iconos', t: ['f2', 'f5'], tit: ['¿Qué es', 'su persona?'], nodos: [
    { ico: 'scanFace', c: 'o', l: 'Nombre', at: 'nombre@f3' }, { ico: 'calendarDays', c: 'p', l: 'Edad', at: 'edad@f3' }, { ico: 'building2', c: 'b', l: 'Dónde vive', at: 'lugar@f3' },
    { ico: 'smartphone', c: 'a', l: 'Usuario', at: 'usuario@f3' }, { ico: 'globe', c: 'v', l: 'Origen', at: 'origen@f3' }] },
  { tipo: 'tags', t: ['f5', 'f11'], tit: ['Su', 'nombre'], tags: [
    { ico: 'check', c: 'v', txt: 'Corto, fácil de recordar y realista', at: 'corto@f5' }, { ico: 'scanFace', c: 'o', txt: 'Ava Lane · Maya Díaz · Yuna Kai', at: 'ava' },
    { ico: 'smartphone', c: 'b', txt: 'Que esté libre como usuario de Instagram', at: 'instagram@f7' }, { ico: 'globe', c: 'p', txt: 'Un apellido que calce con su etnia', at: 'apellido' }] },
  { tipo: 'tarjetas', t: ['f11', 'f14'], tit: ['Su', 'edad'], cards: [
    { ico: 'calendarDays', c: 'o', t: '18 a 23 años', s: 'Encaja con la *fantasía* de tu audiencia', at: 'dieciocho' },
    { ico: 'users', c: 'p', t: 'Su audiencia', s: 'Hombres *mayores e inseguros*', at: 'mayores' }] },
  { tipo: 'tags', t: ['f14', 'f16'], tit: ['Su', 'etnia'], tags: [
    { ico: 'sparkles', c: 'o', txt: 'Depende completamente de ti', at: 'depende' }, { ico: 'target', c: 'p', txt: 'Que calce con tu público y se vea real', at: 'preferencias' },
    { ico: 'globe', c: 'b', txt: 'Negra · mestiza · latina · asiática · europea', at: 'negra' }] },
  { tipo: 'tarjetas', t: ['f16', 'f21'], tit: ['¿Dónde', 'vive?'], cards: [
    { ico: 'globe', c: 'p', t: 'De dónde es', s: '*No importa*', at: 'donde@f16' },
    { ico: 'building2', c: 'o', t: 'Dónde vive', s: 'Sí importa: *sueñan con conocerla*', at: 'vive@f16' },
    { ico: 'flag', c: 'v', t: 'EE. UU., Reino Unido, Canadá', s: 'Donde están *los que más gastan*', at: 'recomiendo', ok: true },
    { ico: 'circleX', c: 'r', t: 'Tailandia o Singapur', s: '«A esta chica *nunca la voy a ver*»', at: 'tailandia', ok: false }] },
  { tipo: 'tags', t: ['f21', 'f24'], tit: ['Su usuario', 'de Instagram'], tags: [
    { ico: 'check', c: 'v', txt: 'Corto y simple: @avalanexo · @itsonlyluna', at: 'corto@f21' },
    { ico: 'circleX', c: 'r', txt: 'Nada de números y letras al azar', at: 'numeros' },
    { ico: 'circleX', c: 'r', txt: 'Nada demasiado sexual', at: 'sexual' }] },
  { tipo: 'lista', t: ['f24', 'f29'], n: 'QUE SE VEA REAL', tit: 'Crea un personaje', items: [
    ['Usa el storytelling', 'storytelling', 'Solo un poquito de su historia'], ['Historias como una persona real', 'historias@f26'], ['Con defectos y manías', 'defectos'],
    ['Uno o dos pasatiempos', 'pasatiempos'], ['Todo alineado con su personalidad', 'alinea']] },
  { tipo: 'tarjetas', t: ['f29', 'f33'], tit: ['Pistas de', 'su historia'], cards: [
    { ico: 'rocket', c: 'o', t: 'Se mudó de país', s: 'Algo *nuevo en su vida*', at: 'mudar' },
    { ico: 'graduationCap', c: 'p', t: 'Va a la universidad', s: '*UCLA* + emojis de libros en la bio', at: 'universidad' },
    { ico: 'store', c: 'b', t: 'Tiene un negocio', s: 'Fotos de *pestañas* en sus historias', at: 'negocio' }] },
  { tipo: 'tags', t: ['f33', 'f38'], img: ['c3-historias-a', 'c3-historias-b'], cap: ['Con su mascota y con amigas', 'Selfies y memes'], tit: ['Sus', 'historias'], tags: [
    { ico: 'circleX', c: 'r', txt: 'No todo sexual: rompe la ilusión', at: 'sexuales' }, { ico: 'sparkles', c: 'o', txt: 'Mascotas', at: 'mascotas' },
    { ico: 'users', c: 'p', txt: 'Amigas', at: 'amigas' }, { ico: 'camera', c: 'b', txt: 'Selfies y memes', at: 'selfies' }, { ico: 'wandSparkles', c: 'v', txt: 'Todo hecho con IA', at: 'crear@f35' }] },
  { tipo: 'tags', t: ['f38', 'f42'], tit: ['Detalles', 'humanos'], tags: [
    { ico: 'palette', c: 'o', txt: 'Hobbies: pintar, esquiar...', at: 'pintar' }, { ico: 'clock', c: 'p', txt: '«Soy pésima para llegar a la hora»', at: 'pesima' },
    { ico: 'trendingUp', c: 'b', txt: '«Tratando de ir al gym 3 veces por semana»', at: 'gimnasio' }, { ico: 'sparkles', c: 'a', txt: '«No puedo vivir sin mi latte de avena»', at: 'latte' }] },
  { tipo: 'lista', t: ['f42', 'f44'], n: 'CHECKLIST', tit: 'Tu modelo ya tiene', items: [
    ['Nombre', 'nombre@f42'], ['Edad', 'edad@f42'], ['Etnia', 'etnia@f42'], ['Dónde vive', 'lugar@f42'], ['Usuario de Instagram', 'usuario@f42']] },
  { tipo: 'frase', t: ['f44', 'fin'], tit: ['Ahora, su', 'rostro'], frase: 'Créalo en el módulo *Creando tu modelo IA*: lo vas a usar en *todas sus imágenes*', at: 'rostro@f44' },
] });
