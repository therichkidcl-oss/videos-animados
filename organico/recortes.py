# Recorta las capturas de ejemplo (perfiles, fotos) de la pizarra original: busca los bloques OSCUROS grandes sobre la
# pizarra blanca de un cuadro, deja fuera la camara del profesor (abajo a la izquierda) y la franja de subtitulos.
# Uso: python recortes.py <n> <seg> <nombre> [indice|todos] [x0,y0,x1,y1]
#   sin indice: lista los bloques encontrados; con indice/"todos": guarda assets/img/<nombre>[-k].png (escala x2, lanczos)
#   con caja explicita x0,y0,x1,y1 (px del cuadro 1108x720): recorta eso tal cual.
import subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
import cv2

R = Path(__file__).resolve().parent
n, seg, nombre = sys.argv[1], float(sys.argv[2]), sys.argv[3]
cual = sys.argv[4] if len(sys.argv) > 4 else None
caja = [int(v) for v in sys.argv[5].split(",")] if len(sys.argv) > 5 else None
raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(seg), "-i", str(R / "orig" / f"c{n}.mp4"), "-frames:v", "1",
                      "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
img = np.frombuffer(raw, np.uint8).reshape(720, 1108, 3)
dst = R / "assets" / "img"; dst.mkdir(parents=True, exist_ok=True)

def guardar(box, sufijo=""):
    x0, y0, x1, y1 = box
    im = Image.fromarray(img[y0:y1, x0:x1]).resize(((x1 - x0) * 2, (y1 - y0) * 2), Image.LANCZOS)
    p = dst / f"{nombre}{sufijo}.png"; im.save(p); print("guardado", p.name, im.size)

if caja:
    guardar(caja); sys.exit()
g = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
m = (g < 200).astype(np.uint8)                    # todo lo que no es pizarra blanca
m[560:, :] = 0                                    # subtitulos y camara del profesor
m[:, :40] = 0                                     # barra de herramientas de la pizarra
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
k, lab, st, _ = cv2.connectedComponentsWithStats(m)
cajas = []
for i in range(1, k):
    x, y, w, h, a = st[i]
    if w > 90 and h > 90 and a > 0.55 * w * h:    # bloque solido (captura), no texto suelto ni flechas
        cajas.append((x, y, x + w, y + h))
cajas.sort(key=lambda b: (b[0], b[1]))
for j, b in enumerate(cajas):
    print(j, b, "tam", b[2] - b[0], "x", b[3] - b[1])
if cual == "todos":
    for j, b in enumerate(cajas): guardar(b, f"-{j}")
elif cual is not None:
    guardar(cajas[int(cual)])
