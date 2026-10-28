/* CLASE 12.1 · Como pedir muestras (407 s, celular) */
CLASE({ num: '12.1', siguiente: 'Vende lo que ya tienes en casa', escenas: [
  { tipo: 'titulo', t: [0, 7.1], chip: 'CLASE 12.1', tit: ['Cómo pedir', 'muestras'] },
  { tipo: 'tarjetas', t: [7.1, 30.8], tit: ['Vitrina vs', 'tus pedidos'], cards: [
    { ico: 'store', c: 'o', t: 'Vitrina', s: 'Donde tienes *todos tus productos* de TikTok Shop', at: 'vitrina', ok: true },
    { ico: 'shoppingCart', c: 'p', t: 'Tus pedidos', s: 'Tu carrito y *lo que tú compraste*', at: 'pedidos' }] },
  { tipo: 'frase', t: [30.8, 47.7], tit: ['¿Por qué', 'importa?'], frase: 'Si el producto no está en tu *vitrina*, no lo puedes *anclar* a tu video', at: 'vitrina' },
  { tipo: 'lista', t: [47.7, 81.1], n: 'PASO 1', tit: 'Busca el producto', items: [
    ['Abre TikTok Studio', 'studio'], ['TikTok Shop para creadores', 'creadores'], ['Toca «Ver detalles»', 'detalles'],
    ['Entra a «Mercado de productos»', 'mercado'], ['Búscalo con la lupa', 'lupa']] },
  { tipo: 'tarjetas', t: [81.1, 128.8], tit: ['Antes de', 'elegir'], cards: [
    { ico: 'percent', c: 'o', t: 'Más de 15%', s: 'Que la *comisión* supere el 15%', at: '15' },
    { ico: 'coins', c: 'v', t: 'Mínimo $5', s: 'Que te deje al menos *5 dólares*', at: 'cinco' },
    { ico: 'star', c: 'b', t: 'Ventas', s: 'Revisa *valoraciones y vendidos*', at: 'vendidos' }] },
  { tipo: 'lista', t: [128.8, 210.2], n: 'PASO 2', tit: 'Pide la muestra gratis', items: [
    ['Abre el producto', 'comision@129'], ['Evita la «muestra reembolsable»', 'remorsable'], ['Busca una «muestra gratuita»', 'gratuita'],
    ['Toca «Obtener muestra gratuita»', 'obtenes'], ['Toca «Solicitar muestra»', 'solicitar'], ['Toca «Enviar»', 'enviar']] },
  { tipo: 'lista', t: [210.2, 233.0], n: 'PASO 3', tit: 'Mira tu solicitud', items: [
    ['Vuelve a la pantalla principal', 'principal'], ['Entra a «Mensajes»', 'mensajes'], ['Notificación del sistema', 'notificacion'],
    ['Pendiente de aprobación', 'pendiente', 'Espera que el vendedor la apruebe']] },
  { tipo: 'frase', t: [233.0, 255.3], tit: ['Súper', 'importante'], frase: 'Al principio, busca muestras *100% aprobadas*', at: 'aprobadas' },
  { tipo: 'lista', t: [255.3, 358.5], n: 'PASO 4', tit: 'Muestras 100% aprobadas', items: [
    ['Busca «muestras 100% aprobadas»', 'aprobadas'], ['Ejemplo: vale $22 y te deja $5', '22'], ['Toca «Obtener muestra gratuita»', 'obtener'],
    ['Elige la variante', 'negra'], ['Solicítala y toca «Enviar»', 'enviar'], ['Queda en espera de envío', 'espera']] },
  { tipo: 'tags', t: [358.5, 'fin'], tit: ['Hoy', 'aprendiste'], tags: [
    { ico: 'gift', c: 'o', txt: 'A pedir muestras gratuitas', at: 'gratuitas' }, { ico: 'circleCheck', c: 'v', txt: 'A pedir muestras 100% aprobadas', at: 'aprobadas' },
    { ico: 'video', c: 'p', txt: 'Próximo: tu video, hashtags y link', at: 'hashtag' }] },
] });
