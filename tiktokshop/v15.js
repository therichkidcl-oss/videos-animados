/* CLASE 15 · Como elegir un producto ganador (359 s, celular) */
CLASE({ num: 15, siguiente: 'Cómo contactar a los sellers', escenas: [
  { tipo: 'titulo', t: [0, 25.5], chip: 'CLASE 15', tit: ['Elige un producto', 'ganador'],
    pills: [{ ico: 'messageSquare', txt: 'Sus reseñas', at: 'resenas' }, { ico: 'star', txt: 'Calificación del producto y la tienda', at: 'calificaciones' }, { ico: 'percent', txt: 'La comisión', at: 'comision' }] },
  { tipo: 'lista', t: [25.5, 61.5], n: 'PASO 1', tit: 'Encuentra productos', items: [
    ['Abre TikTok Studio', 'studio'], ['TikTok Shop para creadores', 'agregadores'], ['Mercado de productos', 'mercado'], ['Busca con la lupita', 'lupita']] },
  { tipo: 'tags', t: [61.5, 104.4], tit: ['Mira sus', 'números'], tags: [
    { ico: 'star', c: 'o', txt: '4,7 en evaluaciones', at: 'evaluaciones' }, { ico: 'thumbsUp', c: 'v', txt: '33,6 mil reseñas positivas', at: 'resenas' },
    { ico: 'shoppingCart', c: 'b', txt: '426 mil vendidos', at: 'vendido' }, { ico: 'trophy', c: 'p', txt: 'Es un producto ganador', at: 'ganador' }] },
  { tipo: 'lista', t: [104.4, 157.6], n: 'PASO 2', tit: 'Los más vendidos', items: [
    ['Toca el sello «Más vendido»', 'tocas'], ['Revisa del 1 al 20', '20'], ['Abre uno y mira sus reseñas', 'cuatro']] },
  { tipo: 'tarjetas', t: [157.6, 198.9], tit: ['La regla', 'del 4,2'], cards: [
    { ico: 'star', c: 'o', t: 'Más de 4,2', s: 'En *reseñas positivas*, para no afectar tu cuenta', at: 'encima' },
    { ico: 'store', c: 'v', t: 'Con stock', s: 'Que haya *unidades en existencia*', at: 'existencias' }] },
  { tipo: 'tags', t: [198.9, 239.8], tit: ['Revisa', 'la tienda'], tags: [
    { ico: 'medal', c: 'o', txt: 'Estrella de oro', at: 'oro' }, { ico: 'users', c: 'p', txt: '63,3 mil seguidores', at: 'seguidores' },
    { ico: 'shoppingCart', c: 'b', txt: 'Productos vendidos', at: 'vendido' }, { ico: 'star', c: 'v', txt: 'Evaluaciones de 4,5 a 4,6', at: 'evaluaciones' }] },
  { tipo: 'lista', t: [239.8, 283.3], n: 'PASO 3', tit: 'Pide la muestra', items: [
    ['Toca «Muestra gratuita»', 'muestra'], ['Toca «Obtener muestra gratuita»', 'obtener'], ['Elige una y la cantidad', 'cantidad'],
    ['Toca «Solicitar muestra gratuita»', 'solicitar'], ['Marca la casilla y envía', 'enviar']] },
  { tipo: 'lista', t: [283.3, 'fin'], n: 'PASO 4', tit: 'Sigue tu pedido', items: [
    ['Entra a «Mensajes»', 'mensajes'], ['Notificaciones del sistema', 'notificaciones'], ['Pendiente de aprobación', 'pendiente'],
    ['El vendedor revisa tu solicitud', 'revisar'], ['Aprobada: va en camino', 'transito']] },
] });
