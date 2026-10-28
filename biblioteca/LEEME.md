# Biblioteca de imagenes 3D para los videos

## 3d-iconos (3dicons de realvjy, licencia CC0)

Uso libre personal y comercial, sin atribucion (`3d-iconos/LICENSE-CC0.txt`). Fuente: github.com/realvjy/3dicons
(sus metadatos traen las URL del CDN) y 3dicons.co. 120 iconos.

- `premium/` = grafito y oro (el mas profesional) · `clay/` = blanco mate (minimalista).
- Angulos: `dynamic/` (3/4, 400 px), `iso/` (400 px), `front/` (de frente, 1000 px: para usarlos grandes).
- `catalogo-premium.png` y `catalogo-clay.png`: hoja con los 120 y sus nombres.

## Como usarlos en el motor (motor-animaciones)

Copiar los PNG al proyecto en `assets/3d/` y usar la pieza `Objeto3D` de `motor/piezas.js` (entra con muelle y giro,
flota con inclinacion 3D, sombra, halo y un destello que barre la forma):

    const o3 = new Objeto3D({ img: 'assets/3d/gift.png', t0: 7, t1: 9, tam: 250, rot: 12, halo: '255,205,110' });
    // en render: o3.pintar(t, { x: 905, y: 850 });

Ejemplo real: `animaciones/reel-claude-pro` (regalo, microfono, camara, burbuja de chat y corazon).

## Descartado

- Emojis (Fluent de Microsoft, Noto, etc.): se ven infantiles; nada de emojis en los videos.
- Icons8 3D Kit: exige un link a Icons8 en cada uso.
