# Junta las hojas de cuadros de todas las clases (menos la 02) en mosaicos de 8 para revisar su formato.
import glob
import json
from pathlib import Path

from PIL import Image, ImageDraw

R = Path(__file__).resolve().parent
fs = [f for f in sorted(glob.glob(str(R / "orig" / "*_hoja.jpg"))) if not f.endswith("02_hoja.jpg")]
W = 640
tiles = []
for f in fs:
    n = Path(f).name.replace("_hoja.jpg", "")
    im = Image.open(f).convert("RGB")
    im = im.resize((W, int(im.height * W / im.width)))
    d = ImageDraw.Draw(im)
    dur = float(json.loads((R / "orig" / f"{n}.json").read_text(encoding="utf-8"))["format"]["duration"])
    d.rectangle([0, 0, 190, 30], fill="black")
    d.text((6, 8), f"CLASE {n}  {dur / 60:.1f} min", fill="yellow")
    tiles.append(im)
for g in range(0, len(tiles), 8):
    grp = tiles[g:g + 8]
    h = max(t.height for t in grp)
    S = Image.new("RGB", (W * 4, h * 2), "#222")
    for i, t in enumerate(grp):
        S.paste(t, ((i % 4) * W, (i // 4) * h))
    S.save(R / "orig" / f"mosaico_{g // 8}.jpg", quality=80)
print(len(tiles))
