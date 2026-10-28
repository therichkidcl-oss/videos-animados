/* CLASE 5 · Creando una cuenta de Instagram exitosa (doblada, voz v3). Tiempos por frase del guion: 'fN'. */
CLASE({ num: 5, siguiente: 'Calentando Instagram', escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'CLASE 5', tit: ['Tu cuenta', 'principal'],
    pills: [{ ico: 'star', txt: 'El activo más importante de tu negocio', at: 'activo' }, { ico: 'triangleAlert', txt: 'Si no se ve creíble, nada funciona', at: 'creible' }] },
  { tipo: 'tags', t: ['f2', 'f9'], img: 'c5-perfil', cap: 'Esta modelo es 100% IA', tit: ['¿Qué la hace', 'buena?'], tags: [
    { ico: 'scanFace', c: 'o', txt: 'Realismo', at: 'realismo' }, { ico: 'users', c: 'p', txt: 'Que se vea cercana', at: 'cercana' },
    { ico: 'repeat2', c: 'b', txt: 'Constancia', at: 'constancia' }, { ico: 'sparkles', c: 'a', txt: 'Autenticidad', at: 'autenticidad' },
    { ico: 'palette', c: 'v', txt: 'Ropa y fondos variados', at: 'ropa' }] },
  { tipo: 'tarjetas', t: ['f9', 'f14'], img: 'c5-proposito', cap: 'Una cuenta que se ve real', tit: ['Su', 'propósito'], cards: [
    { ico: 'shieldCheck', c: 'o', t: 'Cero dudas de IA', s: 'Que crean que *es una persona real*', at: 'eliminar' },
    { ico: 'link', c: 'p', t: 'Vínculo emocional', s: 'Sienten que *la conocen*', at: 'vinculo' },
    { ico: 'trendingUp', c: 'b', t: 'Vende de forma sutil', s: 'Sin *venta agresiva*', at: 'sutil' }] },
  { tipo: 'lista', t: ['f14', 'f20'], img: ['c5-ejemplo-a', 'c5-ejemplo-b'], cap: ['Restaurante, comida, piscina', 'Bikini y un paseo'], n: 'EL EJEMPLO', tit: 'Sus carruseles', items: [
    ['Luz realista y poses distintas', 'iluminacion'], ['Textos casuales de estilo de vida', 'casuales', '«ok, pero agosto estuvo increíble»'],
    ['Maquillaje suave, nada sobreproducido', 'maquillaje'], ['Un carrusel natural, de su día', 'restaurante'], ['Mezcla fotos de IA y reales', 'mezcla']] },
  { tipo: 'lista', t: ['f20', 'f29'], n: 'CHECKLIST', tit: 'Las claves', items: [
    ['Indistinguible de una influencer real', 'imposible'], ['Fotos elegidas y realistas', 'elegidas'], ['Insinuante, sin llenarla de lencería', 'provocativas'],
    ['Pocos reels, muy bien elegidos', 'reels@f24'], ['Destacadas que cuentan su historia', 'destacadas@f25'], ['Link suave: «mi página privada»', 'privada'], ['Detalles de su nicho', 'nicho@f27']] },
  { tipo: 'tags', t: ['f29', 'f35'], tit: ['Qué', 'evitar'], tags: [
    { ico: 'circleX', c: 'r', txt: 'Piel de IA o caras de plástico', at: 'plastico' }, { ico: 'circleX', c: 'r', txt: 'Si tú notas que es IA, no la subas', at: 'notas' },
    { ico: 'circleX', c: 'r', txt: 'Demasiada lencería', at: 'lenceria@f31' }, { ico: 'circleX', c: 'r', txt: 'Un millón de hashtags (máximo 4)', at: 'hashtags' },
    { ico: 'circleX', c: 'r', txt: 'Destacadas que se ven falsas', at: 'falsas@f33' }] },
  { tipo: 'iconos', t: ['f35', 'fin'], tit: ['Tus 3', 'cuentas'], nodos: [
    { ico: 'star', c: 'o', l: 'Principal', at: 'principal@f35' }, { ico: 'video', c: 'b', l: 'Reels', at: 'reels@f36' }, { ico: 'lock', c: 'p', l: 'Secreta', at: 'secreta' }],
    pie: { ico: 'arrowRight', txt: 'El tráfico de TikTok va a la cuenta secreta', at: 'trafico' } },
] });
