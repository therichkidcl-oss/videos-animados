/* MODULO ZERNIO · CLASE 1 · Que es Zernio y cuanto cuesta (27/10/2026, voz v3). Precios de zernio.com/pricing (27/10/2026). */
CLASE({ num: 1, siguiente: 'Crea tu cuenta y conecta el Instagram de tu modelo', escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'MÓDULO ZERNIO · CLASE 1', tit: ['¿Qué es', 'Zernio?'],
    pills: [{ ico: 'calendarDays', txt: 'Publica tus reels solo', at: 'publicando@f0' }, { ico: 'messageSquare', txt: 'Responde los comentarios', at: 'respondiendo@f0' },
      { ico: 'badgeDollarSign', txt: 'Cuánto cuesta y qué permite', at: 'cuesta@f1' }] },
  { tipo: 'logos', t: ['f2', 'f6'], tit: ['Una conexión,', 'todas tus redes'], logos: [
    { slug: 'instagram', l: 'Instagram', at: 'instagram@f3' }, { slug: 'tiktok', l: 'TikTok', at: 'tiktok@f3' }, { slug: 'facebook', l: 'Facebook', at: 'feisbuk@f3' },
    { slug: 'youtube', l: 'YouTube', at: 'iutub@f3' }, { slug: 'x', l: 'X', at: 'equis@f3' }, { slug: 'threads', l: 'Threads', at: 'threads@f3' }],
    pills: [{ ico: 'server', txt: 'Publica desde sus servidores, con tu PC apagado', at: 'servidores@f4' }, { ico: 'badgeDollarSign', txt: '2 cuentas gratis, sin tarjeta', at: 'gratis@f5' }] },
  { tipo: 'zPrecio', t: ['f6', 'f11'], at: { sinplanes: 'planes@f6', gratis: 'gratis@f7', seis: 'seis@f8', tres: 'tres@f9', uno: 'uno@f9', ejemplo: 'ejemplo@f10' } },
  { tipo: 'zIncluye', t: ['f11', 'f12'], filas: [
    ['Scheduling + publishing', 'Unlimited posts, threads, first comment, queue, calendar', 'Unlimited', 'ilimitadas@f11'],
    ['Video', 'Reels, TikTok, YouTube, Facebook, Pinterest', 'Included', 'reels@f11'],
    ['Analytics', 'Impressions, reach, engagement, follower tracking', 'Unlimited', 'estadisticas@f11'],
    ['Comments + messages', 'Reply to comments, read and send DMs', 'Included', 'comentarios@f11'],
    ['Full API + MCP', 'Every endpoint, webhooks', 'Unlimited', 'completo@f11']] },
  { tipo: 'tarjetas', t: ['f12', 'f15'], tit: ['Lo que se mide', 'aparte'], cards: [
    { ico: 'send', c: 'o', t: 'Mensajes enviados', s: '*10.000 gratis* al mes, luego *$1 cada 10.000*', at: 'mensajes@f13' },
    { ico: 'target', c: 'p', t: 'Anuncios', s: 'Los primeros *500 gratis*', at: 'anuncios@f14' }] },
  { tipo: 'tarjetas', t: ['f15', 'f17'], tit: ['Ojo con', 'X'], cards: [
    { ico: 'logo:x', c: 'b', t: 'Cada publicación', s: '*$0,015* · precio de X, sin recargo', at: 'equis@f15' },
    { ico: 'link', c: 'r', t: 'Con un link', s: '*$0,20* por publicación', at: 'veinte@f16' }] },
  { tipo: 'tarjetas', t: ['f17', 'f19'], tit: ['Para tu modelo:', '$0 al mes'], cards: [
    { ico: 'logo:instagram', c: 'o', t: 'Instagram', s: 'Cuenta 1 · *gratis*', at: 'instagram@f17' },
    { ico: 'logo:tiktok', c: 'b', t: 'TikTok', s: 'Cuenta 2 · *gratis*', at: 'tiktok@f17' },
    { ico: 'messageSquare', c: 'v', t: 'Mensajes automáticos', s: 'Dentro de los *10.000 gratis*', at: 'mensajes@f18' }] },
  { tipo: 'tags', t: ['f19', 'f21'], tit: ['Si creces', 'después'], tags: [
    { ico: 'users', c: 'o', txt: '+$6 al mes por cada cuenta extra', at: 'extra@f19' }, { ico: 'check', c: 'v', txt: 'Sin costo de entrada ni contrato', at: 'entrada@f20' },
    { ico: 'unlink', c: 'b', txt: 'Desconectas cuando quieras y dejas de pagar', at: 'desconectas@f20' }] },
  { tipo: 'frase', t: ['f21', 'fin'], tit: ['Empieza', 'gratis'], frase: 'Empiezas *gratis hoy mismo*, y solo pagas *si creces*', at: 'gratis@f21' },
] });
