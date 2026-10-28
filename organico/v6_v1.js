/* CLASE 6 · Calentando Instagram (doblada, voz v3). Tiempos por frase del guion: 'fN'. Ultima clase del modulo. */
CLASE({ num: 6, escenas: [
  { tipo: 'titulo', t: [0, 'f5'], chip: 'CLASE 6', tit: ['Calienta tu', 'Instagram'],
    pills: [{ ico: 'users', txt: 'Que se vea como un usuario normal', at: 'normal' }, { ico: 'listChecks', txt: 'Qué hacer antes de publicar', at: 'publicar@f2' },
      { ico: 'shieldCheck', txt: 'Cómo evitar bloqueos', at: 'bloqueen' }] },
  { tipo: 'lista', t: ['f5', 'f12'], n: '¿POR QUÉ?', tit: 'Calentar importa', items: [
    ['Las cuentas nuevas son de alto riesgo', 'riesgo', 'Sobre todo los primeros 7 a 14 días'], ['La confianza se construye de a poco', 'confianza'],
    ['Imita el uso de una persona real', 'imita'], ['Menos riesgo de shadowban', 'shadowban'], ['Clave para el sistema de 3 cuentas', 'sistema']] },
  { tipo: 'tarjetas', t: ['f12', 'f20'], tit: ['El sistema de', '3 cuentas'], cards: [
    { ico: 'star', c: 'o', t: 'Principal', s: 'La cara de tu marca. *Sin links*', at: 'principal@f12' },
    { ico: 'link', c: 'r', t: 'Desechable', s: 'Foto, bio corta y *tu link*', at: 'desechable' },
    { ico: 'video', c: 'b', t: 'Reels', s: '*Volumen y alcance*', at: 'reels@f17' }] },
  { tipo: 'lista', t: ['f20', 'f24'], n: 'FASE 1', tit: 'Crea la cuenta', items: [
    ['Correo antiguo y teléfono nuevo', 'correo@f21'], ['Verifica correo y teléfono', 'verifica'], ['Foto de perfil y biografía', 'foto@f22'], ['Poca actividad, sin exagerar', 'actividad@f23']] },
  { tipo: 'lista', t: ['f24', 'f27'], n: 'FASE 2', tit: 'Actividad ligera', items: [
    ['10 a 15 me gusta al día', 'diez'], ['2 o 3 comentarios en tu nicho', 'comentarios'], ['Sin publicar y sin links', 'publiques'],
    ['Historias y reels, como uso normal', 'historias@f26'], ['Sin seguir y dejar de seguir rápido', 'evita']] },
  { tipo: 'tarjetas', t: ['f27', 'f31'], tit: ['Días', '8 a 14'], cards: [
    { ico: 'image', c: 'o', t: 'Principal', s: 'Primer carrusel de *2 a 4 fotos*', at: 'principal@f28' },
    { ico: 'video', c: 'b', t: 'Reels', s: '*1 reel cada 2 días*', at: 'reels@f29' },
    { ico: 'link', c: 'r', t: 'Desechable', s: 'Creada y *quieta*', at: 'desechable@f30' }] },
  { tipo: 'tarjetas', t: ['f31', 'f35'], tit: ['Días', '15 a 30'], cards: [
    { ico: 'image', c: 'o', t: 'Principal', s: 'Un carrusel *cada 10 días*', at: 'principal@f32' },
    { ico: 'video', c: 'b', t: 'Reels', s: '*2 o 3 reels* al día', at: 'reels@f32' },
    { ico: 'link', c: 'r', t: 'Desechable', s: 'Ya puedes *poner tu link*', at: 'desechable@f33' },
    { ico: 'lock', c: 'v', t: 'Principal sin links', s: '*Para siempre*', at: 'nunca' }] },
  { tipo: 'frase', t: ['f35', 'f39'], tit: ['Después de', '30 días'], frase: 'Promociona tu principal y sube a *3 o 4 reels al día*. Pero *no te apures*: es una marca a largo plazo', at: 'promocionar' },
  { tipo: 'tags', t: ['f39', 'f45'], tit: ['Lo que', 'debes evitar'], tags: [
    { ico: 'circleX', c: 'r', txt: 'Seguir y dejar de seguir en masa', at: 'masa' }, { ico: 'circleX', c: 'r', txt: 'Automatizar tu cuenta principal', at: 'automatizacion' },
    { ico: 'circleX', c: 'r', txt: 'Saltar entre cuentas muy rápido', at: 'rapido@f42' }, { ico: 'circleX', c: 'r', txt: 'Comprar seguidores', at: 'comprar' },
    { ico: 'circleX', c: 'r', txt: 'Anuncios antes de 6 semanas', at: 'publicidad' }] },
  { tipo: 'tarjetas', t: ['f45', 'f50'], tit: ['Un teléfono', 'nuevo'], cards: [
    { ico: 'smartphone', c: 'v', t: 'Uno de repuesto', s: 'Ayuda a que *no te marquen*', at: 'repuesto', ok: true },
    { ico: 'circleX', c: 'r', t: 'Uno bloqueado', s: 'Su IP *ya está quemada*', at: 'reutilices', ok: false },
    { ico: 'scanFace', c: 'p', t: 'Huella de datos', s: 'Tu modelo es *una persona nueva*', at: 'huella' }] },
  { tipo: 'tarjetas', t: ['f50', 'f53'], tit: ['Usa un', 'iPhone'], cards: [
    { ico: 'smartphone', c: 'o', t: 'iPhone 11 o superior', s: 'Meta *favorece a Apple*', at: 'aifon' },
    { ico: 'video', c: 'r', t: 'Android', s: '*Baja la resolución* de tus videos', at: 'android@f52', ok: false }] },
  { tipo: 'lista', t: ['f53', 'f55'], n: 'CORREOS', tit: 'Que se vea confiable', items: [
    ['Correo antiguo, no uno nuevo', 'antiguo'], ['Verificado con tu teléfono', 'verifica@f54'], ['Verificación en dos pasos', 'dos@f54']] },
  { tipo: 'lista', t: ['f55', 'fin'], n: 'EN RESUMEN', tit: 'Calienta con paciencia', items: [
    ['Construye confianza con el algoritmo', 'confianza@f55'], ['3 cuentas reparten el riesgo', 'reparte'], ['2 o 3 semanas antes de publicar de lleno', 'semanas'],
    ['Es una maratón, no una carrera', 'maraton'], ['Estúdialo y aplícalo', 'estudialo']] },
] });
