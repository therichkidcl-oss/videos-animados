# Hoja de contactos con el nombre de cada imagen. Uso: python hoja.py <salida.jpg> <cols> <ancho_celda> img1 img2 ...
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

out, cols, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
fs = sys.argv[4:]
ims = [Image.open(f) for f in fs]
h = round(w * ims[0].height / ims[0].width)
hoja = Image.new("RGB", (w * cols, h * ((len(fs) + cols - 1) // cols)), "black")
d = ImageDraw.Draw(hoja)
try:
    fnt = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 22)
except OSError:
    fnt = None
for i, (f, im) in enumerate(zip(fs, ims)):
    x, y = (i % cols) * w, (i // cols) * h
    hoja.paste(im.convert("RGB").resize((w, h)), (x, y))
    d.rectangle([x, y, x + 120, y + 30], fill="black")
    d.text((x + 5, y + 3), Path(f).stem, fill="yellow", font=fnt)
hoja.save(out, quality=85)
print(out)
