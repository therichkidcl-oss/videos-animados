/* CLASE 6 v2 · Calentando Instagram (23/10/2026): calentamiento de UNA cuenta en un calendario de 30 dias, reels virales
   clonados con Wan Video / Genjutsu / MiniMax, senales, horarios, que evitar y estado de la cuenta. Tiempos por frase: 'fN'. */
CLASE({ num: 6, escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'CLASE 6', tit: ['Calienta tu', 'Instagram'],
    pills: [{ ico: 'trendingUp', txt: 'Que crezca', at: 'crece@f0' }, { ico: 'shieldCheck', txt: 'Que no la bloqueen', at: 'bloquean@f0' },
      { ico: 'users', txt: 'De a poco, como una persona real', at: 'real@f1' }] },
  { tipo: 'contador', t: ['f2', 'f3'], tit: ['Bajo la', 'lupa'], valor: 14, suf: 'días de más riesgo', at: ['primeras@f2', 'riesgo@f2'] },
  { tipo: 'iconos', t: ['f3', 'f4'], tit: ['¿Persona', 'o robot?'], nodos: [
    { ico: 'image', c: 'o', l: 'Publica mucho', at: 'publica@f3' }, { ico: 'link', c: 'r', l: 'Pone links', at: 'links@f3' }, { ico: 'users', c: 'p', l: 'Sigue a cientos', at: 'cientos@f3' }],
    pie: { ico: 'triangleAlert', txt: 'Cuenta nueva sospechosa', at: 'sospechosa@f3' } },
  { tipo: 'frase', t: ['f4', 'f5'], tit: ['Una sola', 'cuenta'], frase: 'No te puedes dar el lujo de *quemarla*: la paciencia de estas semanas *vale oro*', at: 'sola@f4' },
  { tipo: 'tarjetas', t: ['f5', 'f10'], tit: ['Antes de', 'empezar'], cards: [
    { ico: 'smartphone', c: 'o', t: 'iPhone 11 o más', s: 'Solo para tu modelo · en Android *baja la calidad*', at: 'aifon@f6' },
    { ico: 'circleX', c: 'r', t: 'Celular marcado', s: 'Si ya bloquearon una cuenta ahí, *no lo uses*', at: 'bloqueada@f7', ok: false },
    { ico: 'mail', c: 'b', t: 'Correo antiguo', s: 'Y un *número propio* para ella', at: 'correo@f8' },
    { ico: 'shieldCheck', c: 'v', t: 'Verificación en 2 pasos', s: 'Hay una *persona real* cuidándola', at: 'verificacion@f9' }] },
  { tipo: 'calendario', t: ['f10', 'f24'], fases: [
    { desde: 'f10', lab: 'DÍAS 1-7', chip: 'SEMANA 1', tit: 'Solo actividad ligera', dias: [1, 7], items: [
      ['clock', '2 o 3 veces al día · 15 minutos', 'veces@f11'], ['play', 'Mira historias y reels', 'historias@f12'],
      ['thumbsUp', '10 a 15 me gusta al día', 'gusta@f12'], ['messageSquare', '2 o 3 comentarios reales', 'comentarios@f12'],
      ['users', 'Sigue a pocas cuentas', 'sigue@f13'], ['circleX', 'Sin publicar ni poner links', 'publiques@f13', 1]] },
    { desde: 'f14', lab: 'DÍAS 8-14', chip: 'SEMANA 2', tit: 'Empiezas a publicar', dias: [8, 14], items: [
      ['image', 'Primer carrusel de 2 a 4 fotos', 'carrusel@f15'], ['camera', 'Historias de su día a día', 'historias@f15'],
      ['video', '1 reel cada 2 días', 'reel@f16'], ['repeat2', 'Sigue interactuando igual', 'interactuando@f16']] },
    { desde: 'f17', lab: 'DÍAS 15-30', chip: 'DÍAS 15 A 30', tit: 'Subes el ritmo', dias: [15, 30], items: [
      ['video', '1 reel al día, después 2', 'reel@f18'], ['camera', 'Historias todos los días', 'historias@f18'],
      ['link', 'Ahora sí: tu link secundario', 'link@f19'], ['circleX', 'Nunca un link directo', 'directo@f19', 1]] },
    { desde: 'f20', lab: 'DÍA 30+', chip: 'DESDE EL DÍA 30', tit: 'Historial y confianza', dias: [30, 30], items: [
      ['trendingUp', '2 a 3 reels al día', 'reels@f21'], ['rocket', 'Promociona tu cuenta', 'promocionar@f21'],
      ['bot', 'Automatizaciones: recién ahora y lentas', 'automatizaciones@f22'], ['coins', 'Publicidad: solo con ventas', 'publicidad@f23']] }] },
  { tipo: 'lista', t: ['f24', 'f28'], n: 'REEL DE REFERENCIA', tit: 'Parte de un viral', tel: { modo: 'reel', reel: { img: 'ig-estudio', clip: 'clon1', avatar: 'ig-avatar', cuenta: 'cuentachica',
      texto: 'Cuando por fin te sale la foto', vistas: 46200, n: { gusta: 5100, coment: 312, enviar: 2800, guardar: 3900 }, prom: 'cinco@f25',
      resaltar: [['envien@f27', 'f28', 'enviar'], ['guarden@f27', 'f28', 'guardar']] } },
    items: [['Menos de 14 días', 'catorce@f25'], ['De una cuenta chica', 'chica@f25'], ['5 veces sus vistas normales', 'cinco@f25'],
      ['Una famosa no te sirve', 'famosa@f26'], ['Lo comparten, lo envían y lo guardan', 'compartan@f27', 'Las señales que más empujan un reel']] },
  { tipo: 'clonar', t: ['f28', 'f34'], ref: 'ig-estudio', tuyo: 'ig-cena', at: { inicio: 'clonas@f28', wan: 'wan@f29', genj: 'yenyutsu@f30', mini: 'minimax@f31', cambia: 'ropa@f32', cien: 'cien@f33' } },
  { tipo: 'lista', t: ['f34', 'f39'], n: 'SEÑALES', tit: 'Que tu reel llegue lejos', tel: { modo: 'reel', reel: { img: 'ig-barco', clip: 'clon2', avatar: 'ig-avatar', cuenta: 'itsrubylane',
      texto: 'Domingo en casa', vistas: 128000, n: { gusta: 9800, coment: 640, enviar: 6100, guardar: 7400 }, gancho: 'gancho@f35', prueba: 'prueba@f38',
      resaltar: [['envios@f37', 'f38', 'enviar'], ['guardados@f37', 'f38', 'guardar']] } },
    items: [['El gancho: los primeros 2 segundos', 'gancho@f35'], ['Tiempo de visualización', 'tiempo@f36', 'Cortos, menos de 3 minutos, que se vean completos'],
      ['Envíos y guardados, más que me gusta', 'envios@f37'], ['Reels de prueba', 'prueba@f38', 'Primero a quienes no te siguen']] },
  { tipo: 'tarjetas', t: ['f39', 'f42'], tit: ['Los', 'horarios'], cards: [
    { ico: 'clock', c: 'o', t: 'Reels: 20 a 22 h', s: 'Hora de *Nueva York*, si apuntas a EE. UU.', at: 'ocho@f39' },
    { ico: 'calendarDays', c: 'p', t: 'Fotos: mié y jue', s: 'Los días que *mejor funcionan*', at: 'miercoles@f40' },
    { ico: 'layers', c: 'b', t: 'Crea en tanda', s: '*1 o 2 semanas* programadas', at: 'tanda@f41' }] },
  { tipo: 'tags', t: ['f42', 'f48'], tit: ['Lo que', 'nunca debes hacer'], tags: [
    { ico: 'circleX', c: 'r', txt: 'Seguir y dejar de seguir en masa', at: 'seguir@f43' }, { ico: 'circleX', c: 'r', txt: 'Comprar seguidores o me gusta', at: 'comprar@f44' },
    { ico: 'circleX', c: 'r', txt: 'Dar tu contraseña a apps de crecimiento', at: 'contrasena@f45' }, { ico: 'circleX', c: 'r', txt: 'Repetir videos o subirlos con marca de agua', at: 'mismo@f46' },
    { ico: 'circleX', c: 'r', txt: 'Muchas cuentas en el mismo celular', at: 'cuentas@f47' }] },
  { tipo: 'lista', t: ['f48', 'f51'], n: 'TRUCO', tit: 'Estado de la cuenta', tel: { modo: 'estado',
      estado: { filas: ['estado@f48', 'recomendaciones@f49', 'restriccion@f49', 'mismo@f49'], apelar: 'apelar@f49' } },
    items: [['Configuración: estado de la cuenta', 'configuracion@f48'], ['¿Sales en las recomendaciones?', 'recomendaciones@f49'],
      ['Restricciones y apelaciones', 'restriccion@f49'], ['Revísalo cada semana', 'semana@f50', 'Si algo cambia: frena y corrige']] },
  { tipo: 'lista', t: ['f51', 'f53'], n: 'EN RESUMEN', tit: 'Crece sin quemarla', items: [
    ['Calienta con paciencia', 'calienta@f51'], ['Contenido original', 'original@f51'], ['Apóyate en los reels virales', 'virales@f51'], ['Una maratón, no una carrera', 'maraton@f52']] },
  { tipo: 'tarjetas', t: ['f53', 'f54'], tit: ['¿Tienes', 'dudas?'], cards: [
    { ico: 'video', c: 'o', t: 'Sesiones en vivo', s: '*Cada semana*: pregunta directo', at: 'vivo@f53' },
    { ico: 'graduationCap', c: 'p', t: 'Capacitaciones extras', s: 'Master class de *reels ganadores* y más', at: 'capacitaciones@f53' }] },
  { tipo: 'frase', t: ['f54', 'fin'], frase: 'Nos vemos en el *próximo módulo*', at: 'vemos@f54' },
] });
