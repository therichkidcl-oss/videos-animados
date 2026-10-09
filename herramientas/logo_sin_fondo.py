# Quita el fondo negro de un logo (PNG sin transparencia) y lo deja en PNG transparente recortado.
# Solo borra el negro CONECTADO al borde de la imagen: las letras negras dentro del logo se conservan.
# El brillo (glow) alrededor queda como transparencia suave (negro -> alfa).
# Uso: python logo_sin_fondo.py <entrada.png> <salida.png>
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def main():
    entrada, salida = sys.argv[1], sys.argv[2]
    rgb = np.asarray(Image.open(entrada).convert("RGB")).astype(np.float32) / 255.0
    v = rgb.max(axis=2)

    # Fondo = zonas oscuras conectadas al borde
    oscuro = v <= 0.16
    etiquetas, _ = ndimage.label(oscuro)
    borde = np.unique(np.concatenate([etiquetas[0, :], etiquetas[-1, :], etiquetas[:, 0], etiquetas[:, -1]]))
    fondo = np.isin(etiquetas, borde[borde > 0])

    # Alfa: opaco en el logo; en el fondo, negro -> transparente (el brillo queda suave)
    alfa = np.where(fondo, np.clip(v / 0.16, 0, 1) * v, 1.0)
    # Borde suave entre logo y fondo (evita escalones)
    alfa = np.maximum(alfa, ndimage.gaussian_filter((~fondo).astype(np.float32), 1.0) * (~fondo))
    color = np.where(alfa[..., None] > 0, rgb / np.maximum(alfa[..., None], 1e-4), 0)
    color = np.where(fondo[..., None], np.clip(color, 0, 1), rgb)

    rgba = np.dstack([color, alfa])
    ys, xs = np.where(alfa > 0.03)
    pad = 24
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, rgba.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, rgba.shape[1])
    rgba = rgba[y0:y1, x0:x1]
    Image.fromarray((rgba * 255).round().astype(np.uint8), "RGBA").save(salida, optimize=True)
    print(f"{salida}: {x1 - x0}x{y1 - y0}")


if __name__ == "__main__":
    main()
