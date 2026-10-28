/* CLASE 5 v2 · Creando una cuenta de Instagram exitosa (23/10/2026): una sola cuenta, link secundario, etiqueta de IA
   o metadata limpia, perfil recreado en el celular, contenido original y otras redes. Tiempos por frase del guion: 'fN'. */
CLASE({ num: 5, siguiente: 'Calentando Instagram', escenas: [
  { tipo: 'titulo', t: [0, 'f2'], chip: 'CLASE 5', tit: ['Tu cuenta de', 'Instagram'],
    pills: [{ ico: 'scanFace', txt: 'Que se vea real', at: 'real@f0' }, { ico: 'trendingUp', txt: 'Que crezca', at: 'crezca@f0' },
      { ico: 'shieldCheck', txt: 'Que no la bloqueen', at: 'bloqueen@f0' }, { ico: 'triangleAlert', txt: 'La regla cambió', at: 'regla@f1' }] },
  { tipo: 'unaCuenta', t: ['f2', 'f6'], at: { tres: 'tres@f2', ch0: 'celular@f3', ch1: 'internet@f3', ch2: 'correo@f3', ch3: 'forma@f3',
    sancion: 'sancion@f4', caen: 'caer@f4', una: 'sola@f5', energia: 'energia@f5' } },
  { tipo: 'lista', t: ['f6', 'f10'], n: 'CLASE 1', tit: 'Cómo se crea', items: [
    ['Fuera del centro de cuentas de tu Instagram', 'centro@f7', 'Para que Meta no la relacione contigo'],
    ['Su propio correo y su propio teléfono', 'correo@f8', 'Y si puedes, un celular solo para ella'],
    ['Etiqueta de creador de contenido con IA', 'etiqueta@f9']] },
  { tipo: 'tags', t: ['f10', 'f12'], vis: { tipo: 'metadata', img: 'ig-cena', etiqueta: 'marca@f10', scan: 'metadata@f11' }, tit: ['Instagram', 'marca la IA'], tags: [
    { ico: 'scanFace', c: 'o', txt: 'Perfiles generados con IA', at: 'perfiles@f10' }, { ico: 'image', c: 'p', txt: 'Publicaciones hechas con IA', at: 'publicaciones@f10' },
    { ico: 'fileCode', c: 'b', txt: 'Lo detecta por la metadata', at: 'metadata@f11' }, { ico: 'search', c: 'a', txt: 'Una marca invisible en el archivo', at: 'invisible@f11' }] },
  { tipo: 'caminos', t: ['f12', 'f15'], at: { uno: 'declararlo@f12', dos: 'segundo@f13', img: 'imagenes@f13', vid: 'videos@f14', ver: 'revisa@f14' } },
  { tipo: 'tarjetas', t: ['f15', 'f17'], tit: ['Ojo con', 'esto'], cards: [
    { ico: 'triangleAlert', c: 'r', t: 'Quedarte a medias', s: 'Sin declararlo y detectado: *fuera de recomendaciones*', at: 'medias@f15', ok: false },
    { ico: 'logo:tiktok', c: 'b', t: 'En TikTok', s: 'Lo detecta igual: *activa la etiqueta tú mismo*', at: 'tiktok@f16' }] },
  { tipo: 'lista', t: ['f17', 'f23'], n: 'EL PERFIL', tit: 'Lo primero que ven', tel: { modo: 'perfil',
      partes: { stats: 'segundos@f17', botones: 'segundos@f17', grid: 'segundos@f17', foto: 'foto@f18', nombre: 'nombre@f19', usuario: 'usuario@f20', bio: 'biografia@f21', destacadas: 'destacadas@f22' },
      resaltar: [['foto@f18', 'f19', 'foto'], ['nombre@f19', 'f20', 'nombre'], ['usuario@f20', 'f21', 'usuario'], ['biografia@f21', 'f22', 'bio'], ['destacadas@f22', 'fin', 'destacadas']] },
    items: [['Foto: su cara, natural, sin provocar', 'foto@f18'], ['Nombre + una palabra de su nicho', 'nombre@f19', 'El nombre aparece en el buscador'],
      ['Usuario corto y simple', 'usuario@f20'], ['Biografía con su personalidad', 'biografia@f21', 'De dónde es, qué le gusta, que te escriban'], ['Destacadas: de 4 a 6', 'destacadas@f22']] },
  { tipo: 'linkDer', t: ['f23', 'f29'], tel: { modo: 'perfil', link: [['fanviu@f24', 'fanvue.com/rubylane', 'mal'], ['linktri@f25', 'linktr.ee/rubylane', 'bien']],
      partes: { link: 'fanviu@f24' }, resaltar: [['f23', 'fin', 'link']] },
    at: { fv: 'fanviu@f24', of: 'onlifans@f24', tg: 'telegram@f24', restr: 'restringe@f24', lt: 'linktri@f25', flujo: 'intermedia@f25',
      pagina: 'ojo@f26', revisa: 'revisa@f26', sinfotos: 'explicitas@f26', botones: 'botones@f26', lista: 'f27', despues: 'f28' } },
  { tipo: 'tags', t: ['f29', 'f35'], vis: { tipo: 'carrusel', fotos: ['ig-blanco', 'ig-paella', 'ig-jugo', 'ig-sendero', 'ig-barco'], texto: 'un domingo cualquiera' }, tit: ['Un feed', 'de chica real'], tags: [
    { ico: 'layers', c: 'o', txt: 'Carruseles de un mismo día', at: 'carruseles@f30' }, { ico: 'sun', c: 'a', txt: 'Luz natural, como con su celular', at: 'natural@f30' },
    { ico: 'scanFace', c: 'p', txt: 'La misma cara: entrena su LoRA', at: 'cara@f31' }, { ico: 'image', c: 'b', txt: 'Su café, su mascota, sus viajes', at: 'cafe@f32' },
    { ico: 'circleX', c: 'r', txt: 'Nada demasiado provocativo', at: 'provocativo@f33' }, { ico: 'messageSquare', c: 'v', txt: 'Textos cortos y casuales + ubicación', at: 'textos@f34' }] },
  { tipo: 'leyenda', t: ['f35', 'f38'], vis: { tipo: 'buscar', escribe: 'buscador@f35', texto: 'gym miami', resultados: [
      ['ig-avatar', 'itsrubylane', 'Ruby Lane | <em>Gym</em> & <em>Miami</em>'], [null, 'miami.food', 'Comida en <em>Miami</em>'], [null, 'gymdiaries', 'Rutinas de <em>gym</em>']] },
    tit: ['Instagram es', 'un buscador'], capAt: 'palabras@f36', texto: 'Día de [[gym|gym@f37]] en [[Miami|miami@f37]]. El [[look de hoy|look@f37]], por si preguntan',
    hashtags: ['#gym', '#miami', '#lookdehoy'], hAt: 'hashtags@f36', maxAt: 'maximo@f37' },
  { tipo: 'tags', t: ['f38', 'f43'], vis: { tipo: 'marca', img: 'ig-barco', marca: 'marca@f39', texto: 'texto@f40', borde: 'borde@f40', acelerar: 'acelerar@f40', limpia: 'limpia@f41' },
    tit: ['Contenido', 'original'], tags: [
    { ico: 'repeat2', c: 'r', txt: 'Resubido: no', at: 'resubidos@f39' }, { ico: 'circleX', c: 'r', txt: 'Con marca de agua: no', at: 'marca@f39' },
    { ico: 'layers', c: 'r', txt: 'Casi igual a otro: no', at: 'iguales@f39' }, { ico: 'slidersHorizontal', c: 'r', txt: 'Texto, borde o velocidad: ya no sirve', at: 'texto@f40' },
    { ico: 'download', c: 'v', txt: 'Exporta la versión limpia', at: 'limpia@f41' }, { ico: 'wandSparkles', c: 'v', txt: 'Recréalo con tu modelo', at: 'recrealo@f42' }] },
  { tipo: 'redes', t: ['f43', 'f49'], tit: ['Cada red,', 'sus reglas'], redes: [
    { slug: 'tiktok', nombre: 'TIKTOK', at: 'tiktok@f44', reglas: [['Menos picante que en Instagram', 'picante@f44'], ['Activa la etiqueta de IA', 'etiqueta@f44'], ['Variado, nunca en masa', 'variado@f45']] },
    { slug: 'x', nombre: 'X (TWITTER)', at: 'equis@f46', reglas: [['Adultos: sí, marcado como sensible', 'sensible@f46'], ['Nada explícito en perfil ni portada', 'portada@f46', false]] },
    { slug: 'facebook', nombre: 'FACEBOOK', at: 'feisbuk@f47', reglas: [['Una página, no un perfil', 'pagina@f47'], ['Las mismas reglas de originalidad', 'originalidad@f47']] }],
    pie: { txt: 'En todas: el mismo link secundario', at: 'todas@f48' } },
  { tipo: 'lista', t: ['f49', 'f55'], n: 'RESUMEN', tit: 'Tu cuenta exitosa', tel: { modo: 'perfil', partes: { etiqueta: 'etiqueta@f51' }, contar: ['f52', 'f54'],
      resaltar: [['etiqueta@f51', 'f52', 'etiqueta'], ['perfil@f52', 'f53', 'foto'], ['perfil@f52', 'f53', 'nombre'], ['perfil@f52', 'f53', 'bio'], ['perfil@f52', 'f53', 'destacadas'], ['link@f53', 'f54', 'link']] },
    items: [['Una sola cuenta, separada de la tuya', 'sola@f50'], ['Etiqueta de IA activada', 'etiqueta@f51'], ['Perfil completo', 'perfil@f52', 'Foto, nombre con palabra clave, bio y destacadas'],
      ['Link secundario, nunca directo', 'link@f53'], ['Contenido original y constante', 'original@f54']] },
  { tipo: 'tarjetas', t: ['f55', 'f57'], tit: ['¿Tienes', 'dudas?'], cards: [
    { ico: 'video', c: 'o', t: 'Sesiones en vivo', s: '*Cada semana*: pregunta directo', at: 'vivo@f55' },
    { ico: 'graduationCap', c: 'p', t: 'Capacitaciones extras', s: 'Clases para *crecer* y *vender*', at: 'capacitaciones@f56' }] },
  { tipo: 'frase', t: ['f57', 'fin'], tit: ['Próxima', 'clase'], frase: 'Vas a *calentar* tu cuenta y hacerla *crecer con reels virales*', at: 'calentar@f57' },
] });
