/* CLASE 3 · Estrategia 1 para llegar a 5.000 seguidores (375 s, vertical) */
CLASE({ num: 3, siguiente: 'Estrategia 2 para llegar a 5.000 seguidores', escenas: [
  { tipo: 'titulo', t: [0, 14.0], chip: 'CLASE 3', tit: ['5.000', 'seguidores'],
    pills: [{ ico: 'video', txt: 'El video para crecer', at: 'video' }, { ico: 'store', txt: 'Y empezar en TikTok Shop', at: 'comenzar' }] },
  { tipo: 'tarjetas', t: [14.0, 35.0], tit: ['¿Por qué', 'una mujer?'], cards: [
    { ico: 'users', c: 'p', t: 'Más facilidad', s: 'Consigue *más alcance* que un hombre', at: 'facilidades' },
    { ico: 'coins', c: 'o', t: 'Más barato', s: 'El *costo por seguidor* es mucho menor', at: 'costo' }] },
  { tipo: 'tarjetas', t: [35.0, 56.5], tit: ['El', 'audio'], cards: [
    { ico: 'play', c: 'b', t: 'En tendencia', s: 'La canción *más viral en español*', at: 'tendencia' },
    { ico: 'video', c: 'p', t: 'Cantando', s: 'Un video *expresivo* cantando la canción', at: 'cantando' }] },
  { tipo: 'lista', t: [56.5, 75.4], n: 'EL PLAN', tit: 'Lo que vas a ver', items: [
    ['Qué escribir en pantalla', 'pantalla'], ['Qué poner en la descripción', 'descripcion'], ['Cómo pagar la promoción', 'promocion']] },
  { tipo: 'tarjetas', t: [75.4, 125.0], tit: ['¿Eres', 'hombre?'], cards: [
    { ico: 'trophy', c: 'o', t: 'Ya funcionó', s: 'Así llevó *sus cuentas* a 5.000', at: 'cuentas' },
    { ico: 'users', c: 'p', t: 'Pide ayuda', s: 'Una *amiga o hermana* puede grabarlo', at: 'amiga' }] },
  { tipo: 'frase', t: [125.0, 138.5], tit: ['Simple y', 'expresivo'], frase: 'Solo un video *cantando una canción*, sin mostrar nada más', at: 'cantando' },
  { tipo: 'lista', t: [138.5, 187.5], n: 'EN PANTALLA', tit: 'Lo que debe decir', items: [
    ['#Teamwork en pantalla', 'teamwork'], ['«Sígueme y te sigo de vuelta»', 'sigueme'], ['Lo mismo en la descripción', 'descripcion@160'],
    ['Letras blancas y grandes', 'blancas'], ['El audio más viral en español', 'viral']] },
  { tipo: 'lista', t: [187.5, 231.8], n: 'PASO 1', tit: 'Promociona el video', items: [
    ['Toca los tres puntitos', 'puntitos'], ['«Aumentar vistas»', 'aumentar'], ['Elige «Más seguidores»', 'seguidores'],
    ['El presupuesto del medio', 'presupuesto'], ['Toca «Personalizar»', 'personalizar'], ['Espectadores por defecto', 'espectadores']] },
  { tipo: 'lista', t: [231.8, 267.5], n: 'PASO 2', tit: 'Tu presupuesto', items: [
    ['Elige «por día»', 'dia'], ['Pon 30 dólares por día', '30'], ['Toca «Editar» y ajusta', 'editar'], ['Confirma', 'confirmar'], ['Durante 3 días', '3']] },
  { tipo: 'contador', t: [267.5, 278.0], tit: ['Costo', 'total'], valor: 90, pre: '$', suf: ' en total', at: ['costo', 'dolares@269'],
    pills: [{ ico: 'shoppingCart', txt: 'Paga con tu tarjeta', at: 'pagar' }, { ico: 'play', txt: 'La promoción se activa', at: 'activar' }] },
  { tipo: 'tarjetas', t: [278.0, 332.5], tit: ['Ojo con', 'esto'], cards: [
    { ico: 'store', c: 'v', t: 'Solo TikTok Shop', s: 'Sirven seguidores *de cualquier nicho*', at: 'funcionar', ok: true },
    { ico: 'target', c: 'b', t: 'TikTok sabe', s: '*A quién mostrar* tu contenido de ventas', at: 'sabe' },
    { ico: 'circleX', c: 'r', t: 'Cuentas de nicho', s: 'En *marketing de afiliado* no sirve', at: 'nicho@305', ok: false }] },
  { tipo: 'contador', t: [332.5, 350.0], tit: ['Costo por', 'seguidor'], valor: .15, dec: 2, pre: '$', suf: ' o menos', at: ['menos', '15'],
    pills: [{ ico: 'video', txt: 'Revisa tus métricas', at: 'metricas' }, { ico: 'thumbsUp', txt: 'Así funciona perfecto', at: 'perfectamente' }] },
  { tipo: 'lista', t: [350.0, 'fin'], n: 'DESPUÉS', tit: 'Al llegar a 5.000', items: [
    ['Entras al programa de TikTok Shop', 'programa'], ['Oculta ese video', 'oculto'], ['Que solo lo veas tú', 'solamente']] },
] });
