/* CLASE 14 · Como anadir el enlace del producto a tu video (147 s, celular) */
CLASE({ num: 14, siguiente: 'Cómo elegir un producto ganador', escenas: [
  { tipo: 'titulo', t: [0, 16.0], chip: 'CLASE 14', tit: ['Agrega el enlace', 'del producto'],
    pills: [{ ico: 'fileText', txt: 'Una descripción', at: 'descripcion' }, { ico: 'listChecks', txt: 'Hashtags del producto', at: 'hashtags' }] },
  { tipo: 'lista', t: [16.0, 47.6], n: 'PASO 1', tit: 'Descripción y portada', items: [
    ['Apóyate en ChatGPT', 'chatgpt'], ['Edita la portada', 'portada'], ['Ponle un hook que llame la atención', 'hook'], ['Toca «Guardar»', 'guardar']] },
  { tipo: 'lista', t: [47.6, 76.9], n: 'PASO 2', tit: 'Agrega el enlace', items: [
    ['Toca «Agregar enlace»', 'agregar'], ['Elige «Producto»', 'producto'], ['Se abre tu vitrina', 'vitrina'],
    ['Evita la «Sugerencia de producto»', 'sugerencia', 'Elige el que está bajo «Tu vitrina»']] },
  { tipo: 'lista', t: [76.9, 119.6], n: 'PASO 3', tit: 'Elige tu producto', items: [
    ['Búscalo en tu vitrina', 'buscar'], ['Toca «Agregar»', 'agregar'], ['Puedes editar el nombre', 'nombre', 'Si salen caracteres no permitidos']] },
  { tipo: 'lista', t: [119.6, 'fin'], n: 'CHECKLIST', tit: 'Listo para publicar', items: [
    ['Ícono amarillo: enlace añadido', 'amarillo'], ['Descripción y hashtags', 'descripcion'], ['Portada editada', 'portada'],
    ['Producto agregado', 'producto@131'], ['Revisa que no falte ningún paso', 'pasos']] },
] });
