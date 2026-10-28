/* MODULO ZERNIO · CLASE 2 · Crea tu cuenta y conecta el Instagram de tu modelo (27/10/2026, voz v3). */
CLASE({ num: 2, siguiente: 'Conecta Claude y automatiza la subida', escenas: [
  { tipo: 'titulo', t: [0, 'f1'], chip: 'MÓDULO ZERNIO · CLASE 2', tit: ['Tu cuenta', 'en Zernio'],
    pills: [{ ico: 'users', txt: 'Crea tu cuenta', at: 'creas@f0' }, { ico: 'plug', txt: 'Conecta el Instagram de tu modelo', at: 'conectas@f0' },
      { ico: 'key', txt: 'Saca tu llave para Claude', at: 'llave@f0' }] },
  { tipo: 'tarjetas', t: ['f1', 'f4'], tit: ['Antes de', 'empezar'], cards: [
    { ico: 'users', c: 'o', t: 'Cuenta de creador', s: 'O de empresa: *las personales no se pueden*', at: 'creador@f2' },
    { ico: 'clock', c: 'v', t: 'Cuenta ya calentada', s: 'Los *primeros 30 días*, todo a mano', at: 'calentada@f3' }] },
  { tipo: 'zSign', t: ['f4', 'f7'], at: { google: 'gugol@f5', dentro: 'segundos@f6' } },
  { tipo: 'zConectar', t: ['f7', 'f13'], at: { nueva: 'nueva@f8', ig: 'elige@f9', con: 'conectar@f9', sesion: 'sesion@f10', permisos: 'permisos@f10',
    vuelves: 'vuelves@f10', conectada: 'conectada@f11', vence: 'vence@f12' } },
  { tipo: 'zLlave', t: ['f13', 'f18'], at: { entra: 'entra@f14', crear: 'crear@f14', nombre: 'nombre@f15', lectura: 'lectura@f15', creala: 'creala@f15',
    copia: 'copiala@f16', nunca: 'contrasena@f17' } },
  { tipo: 'lista', t: ['f18', 'fin'], n: 'LISTO', tit: 'Ya tienes todo', items: [
    ['Cuenta de Zernio creada', 'cuenta@f18'], ['Instagram de tu modelo conectado', 'conectada@f18'], ['Tu llave guardada', 'llave@f18']] },
] });
