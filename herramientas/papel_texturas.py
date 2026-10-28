# Genera las texturas del estilo papel (sin descargar nada):
#   base/papel/papel.jpg  hoja crema 1920x1080 con fibras y manchas suaves (fondo de las escenas)
#   base/papel/grano.png  grano 512x512 que se repite sin costuras, para darle textura a los recortes de color
# Uso: python herramientas/papel_texturas.py
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "base" / "papel"
rng = np.random.default_rng(7)


def ruido(h, w, sigma, wrap=False):
    n = rng.standard_normal((h, w))
    n = gaussian_filter(n, sigma, mode="wrap" if wrap else "reflect")
    return n / (np.abs(n).max() + 1e-9)


def hoja(w=1920, h=1080, base=(242, 237, 226)):
    img = np.zeros((h, w, 3), np.float32) + np.array(base, np.float32)
    # manchas grandes muy suaves + textura media + grano fino
    luz = ruido(h, w, 140) * 6 + ruido(h, w, 22) * 3.2 + rng.standard_normal((h, w)) * 2.2
    img += luz[..., None]
    # viñeta leve, como una hoja bajo una lampara
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    img -= (np.clip(d - 0.55, 0, None) ** 2 * 26)[..., None]
    out = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    # fibras: trazos cortos y finos, algo mas oscuros o claros
    capa = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dib = ImageDraw.Draw(capa)
    for _ in range(5200):
        x, y = rng.uniform(0, w), rng.uniform(0, h)
        ang, largo = rng.uniform(0, np.pi), rng.uniform(6, 30)
        x2, y2 = x + np.cos(ang) * largo, y + np.sin(ang) * largo
        tono = 120 if rng.random() < 0.7 else 255
        dib.line([(x, y), (x2, y2)], fill=(tono, tono - 6, tono - 16, int(rng.uniform(10, 26))), width=1)
    capa = capa.filter(ImageFilter.GaussianBlur(0.6))
    out = Image.alpha_composite(out.convert("RGBA"), capa).convert("RGB")
    return out


def grano(lado=512):
    n = ruido(lado, lado, 0.9, wrap=True) * 0.6 + ruido(lado, lado, 6, wrap=True) * 0.4
    n = (n - n.min()) / (n.max() - n.min())
    # gris oscuro con alpha variable: con mix-blend-mode multiply oscurece un poco el color, como fibra de papel
    alpha = (n * 46 + 8).astype(np.uint8)
    rgba = np.zeros((lado, lado, 4), np.uint8)
    rgba[..., :3] = 60
    rgba[..., 3] = alpha
    return Image.fromarray(rgba, "RGBA")


def main():
    SALIDA.mkdir(parents=True, exist_ok=True)
    hoja().save(SALIDA / "papel.jpg", quality=88, optimize=True, progressive=True)
    grano().save(SALIDA / "grano.png", optimize=True)
    for f in sorted(SALIDA.iterdir()):
        print(f"{f.name}: {f.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
