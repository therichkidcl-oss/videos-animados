/* CLASE 16 · Como contactar a los sellers o las marcas (98 s, celular) */
CLASE({ num: 16, siguiente: 'Cómo dar el ad code al seller', escenas: [
  { tipo: 'titulo', t: [0, 9.1], chip: 'CLASE 16', tit: ['Habla con', 'el seller'], sub: 'Por ejemplo, para pedir que te *aumenten la comisión*', subAt: 'aumenten' },
  { tipo: 'lista', t: [9.1, 29.3], n: 'PASO 1', tit: 'Abre el producto', items: [
    ['Ve a tu vitrina', 'vitrina'], ['Elige un producto', 'caminadora'], ['Desliza hacia arriba', 'desplazan'], ['Mira precio, descuento y valoraciones', 'valoraciones']] },
  { tipo: 'lista', t: [29.3, 62.0], n: 'PASO 2', tit: 'Colabora con el vendedor', items: [
    ['Toca «Muestra gratis»', 'muestra'], ['Desliza las opciones', 'desplazas'], ['Toca «Colaborar con el vendedor»', 'colaborar'], ['Se abre el chat con la tienda', 'chat']] },
  { tipo: 'lista', t: [62.0, 79.4], n: 'PASO 3', tit: 'Escríbele', items: [
    ['Toca «Comunicarse con el vendedor»', 'comunicarse'], ['Escribe tu mensaje abajo', 'mensaje'], ['Toca el botón rojo para enviar', 'enviar']] },
  { tipo: 'tarjetas', t: [79.4, 'fin'], tit: ['Tu', 'mensaje'], cards: [
    { ico: 'messageSquare', c: 'p', t: 'Con respeto', s: 'Siempre *desde el respeto*', at: 'respeto' },
    { ico: 'target', c: 'o', t: 'Consistente', s: 'Busca resolver tu situación', at: 'consistencia' },
    { ico: 'send', c: 'b', t: 'Producto primero', s: 'Envía el producto y luego tu mensaje', at: 'envias' }] },
] });
