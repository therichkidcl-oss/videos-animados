/* CLASE 1 · Bienvenida al curso (123 s, presentadora) */
CLASE({ num: 1, nombre: 'ANI', siguiente: 'Crea y optimiza tu cuenta', escenas: [
  { tipo: 'titulo', t: [0, 12.4], chip: 'CLASE 1', tit: ['Bienvenida', 'al curso'],
    pills: [{ ico: 'target', txt: 'Claridad', at: 'claridad' }, { ico: 'layers', txt: 'Estructura', at: 'estructura' }, { ico: 'arrowUpRight', txt: 'Dirección', at: 'direccion' }] },
  { tipo: 'tarjetas', t: [12.4, 28.6], tit: ['El error', 'más común'], cards: [
    { ico: 'triangleAlert', c: 'r', t: 'Todo a la vez', s: 'Querer *aprender todo al mismo tiempo*', at: 'absolutamente', ok: false },
    { ico: 'circleX', c: 'r', t: 'Sin ejecutar', s: 'Terminar *abrumado y sin hacer nada* bien', at: 'ejecutar', ok: false }] },
  { tipo: 'iconos', t: [28.6, 44.7], tit: ['Paso a paso', 'y ordenado'], nodos: [
    { ico: 'layers', c: 'p', l: 'Módulos en orden', at: 'modulo' }, { ico: 'building2', c: 'b', l: 'Base sólida', at: 'solida' }, { ico: 'arrowUpRight', c: 'o', l: 'Siguiente nivel', at: 'nivel' }] },
  { tipo: 'lista', t: [44.7, 66.9], n: 'LA REGLA', tit: 'No dejes pasos atrás', items: [
    ['¿Te pide configurar? Configúralo', 'configurar'], ['¿Investigar productos? Investiga', 'investigar'], ['¿Crear contenido? Publícalo', 'publicalo'],
    ['TikTok Shop se aprende ejecutando', 'ejecutando']] },
  { tipo: 'iconos', t: [66.9, 89.6], tit: ['Así es', 'cada clase'], nodos: [
    { ico: 'lightbulb', c: 'p', l: 'Explicación clara', at: 'explicacion' }, { ico: 'smartphone', c: 'o', l: 'Tutorial paso a paso', at: 'tutorial' }],
    pie: { ico: 'target', txt: 'Más claro, organizado y enfocado', at: 'enfocada' } },
  { tipo: 'tarjetas', t: [89.6, 107.9], tit: ['Encuentros', 'semanales'], cards: [
    { ico: 'users', c: 'p', t: 'Con la comunidad', s: 'Resolvemos *dudas* y reforzamos *estrategias*', at: 'comunidad' },
    { ico: 'trophy', c: 'o', t: 'No es talento', s: 'Es *estructura* y *acompañamiento*', at: 'talento' }] },
  { tipo: 'frase', t: [107.9, 'fin'], tit: ['Lección por', 'lección'], frase: 'Los que consiguen resultados *ejecutan constantemente* lo que aprendieron', at: 'resultados' },
] });
