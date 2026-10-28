/* CLASE 2 · Decidir el nicho y el publico objetivo de tu modelo (doblada, voz v3). Tiempos por frase del guion: 'fN'. */
CLASE({ num: 2, siguiente: 'Definiendo la personalidad de tu modelo', escenas: [
  { tipo: 'titulo', t: [0, 'f3'], chip: 'CLASE 2', tit: ['Tu nicho y tu', 'público objetivo'],
    pills: [{ ico: 'target', txt: 'Elige el nicho de tu modelo', at: 'nicho@f1' }, { ico: 'users', txt: 'Conoce a su audiencia ideal', at: 'audiencia' },
      { ico: 'messageSquare', txt: 'Una frase clara: a quién atrae y por qué', at: 'frase@f2' }] },
  { tipo: 'iconos', t: ['f3', 'f6'], tit: ['¿Qué es', 'un nicho?'], nodos: [
    { ico: 'scanFace', c: 'o', l: 'Look', at: 'look@f4' }, { ico: 'sparkles', c: 'p', l: 'Vibra', at: 'vibra' },
    { ico: 'video', c: 'b', l: 'Ángulo de contenido', at: 'angulo' }, { ico: 'users', c: 'a', l: 'Personalidad', at: 'personalidad' }],
    pie: { ico: 'check', txt: 'Un buen nicho se reconoce y se repite fácil', at: 'reconoce' } },
  { tipo: 'tarjetas', t: ['f6', 'f8'], img: 'c2-gamer-0', cap: 'Nicho: gamer, anime, waifu', tit: ['Se reconoce', 'al instante'], cards: [
    { ico: 'target', c: 'o', t: 'Estilo claro', s: 'Chica *gamer, anime, waifu*', at: 'gamer' },
    { ico: 'trendingUp', c: 'p', t: 'Más impacto', s: 'Define *a quién atrae* tu contenido', at: 'impacto' }] },
  { tipo: 'tags', t: ['f8', 'f11'], img: 'c2-dos-0', cap: 'Toda su cuenta gira en torno a eso', tit: ['Más que', 'el look'], tags: [
    { ico: 'sparkles', c: 'p', txt: 'La vibra de tu modelo', at: 'vibra@f8' }, { ico: 'video', c: 'b', txt: 'Sus ángulos de contenido', at: 'angulos' },
    { ico: 'users', c: 'o', txt: 'Su personalidad', at: 'personalidad@f8' }, { ico: 'scanFace', c: 'a', txt: 'También puede ser física', at: 'fisica' }] },
  { tipo: 'tags', t: ['f11', 'f17'], tit: ['Ejemplos', 'de nichos'], tags: [
    { ico: 'building2', c: 'o', txt: 'La chica de al lado', at: 'lado' }, { ico: 'users', c: 'p', txt: 'La mamá sexy de tu amigo', at: 'mama' },
    { ico: 'briefcase', c: 'b', txt: 'Cualquier profesión: enfermera, profesora...', at: 'enfermeras' },
    { ico: 'wandSparkles', c: 'r', txt: 'Fantasía', at: 'fantasia' }, { ico: 'layers', c: 'a', txt: 'O combina dos', at: 'combinar' }] },
  { tipo: 'frase', t: ['f17', 'f19'], tit: ['¿Qué es el', 'público objetivo?'], frase: 'El tipo *exacto* de persona que quieres atraer con tu modelo', at: 'tipo' },
  { tipo: 'lista', t: ['f19', 'f24'], n: 'PÚBLICO OBJETIVO', tit: 'Hazte 3 preguntas', items: [
    ['¿Qué les gusta mirar?', 'mirar', 'En el nicho gym: su cuerpo, sus rutinas'], ['¿Con qué fantasean?', 'fantasean', 'Seguridad, inocencia, algún fetiche'],
    ['¿En qué gastan su dinero?', 'gastar', 'Atención, exclusividad'], ['Que te compren una y otra vez', 'otra@f23']] },
  { tipo: 'frase', t: ['f24', 'f28'], img: 'c2-frase-1', cap: 'Vibra influencer, chica de al lado', tit: ['Descríbelo en', 'una frase'],
    frase: 'Hombres de *30 a 45 años* que buscan una mujer joven e inocente que les dé atención. Gastan en *acceso privado y chat*.', at: 'treinta' },
  { tipo: 'venn', t: ['f28', 'f33'], tit: ['Nicho ×', 'público'],
    a: { t: 'NICHO', s: 'el producto', at: 'nicho@f29' }, b: { t: 'PÚBLICO', s: 'el cliente', at: 'publico@f29' }, centro: { t: 'Aquí se gana el dinero', at: 'cruzan' },
    ejemplos: [['Botella de agua', 'Corredor con sed', 'botella'], ['Programa de entrenamiento', 'Persona con obesidad', 'programa'], ['Chica anime', 'Gamer de anime', 'anime@f32']] },
  { tipo: 'tarjetas', t: ['f33', 'f38'], tit: ['3 errores', 'comunes'], cards: [
    { ico: 'layers', c: 'r', t: 'Querer ser de todo', s: 'Sin identidad clara, *se olvida fácil*', at: 'todo@f34', ok: false },
    { ico: 'target', c: 'r', t: 'Demasiado amplio', s: 'Elige un carril y *ve con todo*', at: 'amplio', ok: false },
    { ico: 'circleX', c: 'r', t: 'Solo ser bonita', s: 'Sin *gancho*, nadie gasta', at: 'motivacion', ok: false }] },
  { tipo: 'tarjetas', t: ['f38', 'f45'], img: ['c2-amber-0', 'c2-amber-1'], cap: ['Nicho chica de campo', 'Nicho oficina'], tit: ['Varias', 'páginas'], cards: [
    { ico: 'trendingUp', c: 'o', t: 'Solo al escalar', s: 'Primero, que *una funcione*', at: 'escalando' },
    { ico: 'users', c: 'p', t: 'Un público por página', s: 'Hombres de *20 a 40* que buscan *clase*', at: 'veinte' }] },
  { tipo: 'frase', t: ['f45', 'f46'], tit: ['¿Qué los hace', 'gastar?'], frase: 'Ya tienes nicho y público. Ahora entiende *qué hace que esas personas gasten*', at: 'entender' },
  { tipo: 'contador', t: ['f46', 'f48'], tit: ['Busca a las', 'ballenas'], valor: 9.99, dec: 2, pre: '$', suf: ' no alcanza', at: ['nueve', 'noventa'],
    pills: [{ ico: 'users', txt: 'Que te sigan por el físico no basta', at: 'fisico' }, { ico: 'coins', txt: 'Los que gastan una y otra vez', at: 'ballenas' }] },
  { tipo: 'iconos', t: ['f48', 'f53'], tit: ['¿Por qué', 'gastan?'], nodos: [
    { ico: 'link', c: 'o', l: 'Conexión', at: 'conexion' }, { ico: 'rocket', c: 'p', l: 'Escape', at: 'escape' },
    { ico: 'messageSquare', c: 'b', l: 'Validación', at: 'validacion' }, { ico: 'star', c: 'a', l: 'Admiración', at: 'admiracion' }],
    pie: { ico: 'sparkles', txt: 'Reales o no, la gente gasta por esto', at: 'cuatro@f52' } },
  { tipo: 'lista', t: ['f53', 'f57'], img: ['c2-gotgym-0', 'c2-gotgym-1'], cap: ['Nicho gótico', 'Nicho gimnasio'], n: 'INVESTIGA', tit: 'Encuentra a tu público', items: [
    ['Busca creadoras de tu nicho', 'creadores'], ['Estudia su contenido y comentarios', 'estudia'], ['Replícalo con tu modelo', 'replica'], ['Estética limpia y reconocible', 'estetica']] },
  { tipo: 'lista', t: ['f57', 'f65'], n: 'TU PLAN', tit: '4 pasos', items: [
    ['Elige el nicho de tu modelo', 'uno@f57'], ['Ve con todo en ese nicho', 'dos@f58', 'Textos, ropa y tono alineados'],
    ['Domina tu nicho primero', 'tres@f61', 'Después ábrete a subnichos'], ['Opcional: prueba antes de decidir', 'cuatro@f63', 'El éxito viene de la profundidad']] },
  { tipo: 'frase', t: ['f65', 'fin'], tit: ['Ya tienes', 'tu nicho'], frase: 'Próxima clase: la *personalidad* de tu modelo y cómo hacer que se vea *real*', at: 'proxima' },
] });
