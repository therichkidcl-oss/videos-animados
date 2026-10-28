# Borra los cuadros negros del final de cada clip de un proyecto ya preparado. Uso: python quitar_negros.py <n>
import sys
from pathlib import Path
import numpy as np
from PIL import Image
P = Path(__file__).resolve().parent.parent / "animaciones" / f"tts-clase{sys.argv[1]}" / "assets" / "clips"
for c in sorted(P.iterdir()):
    fs = sorted(c.glob("f*.jpg")); n0 = len(fs)
    while len(fs) > 30 and np.asarray(Image.open(fs[-1]).convert("L")).mean() < 14:
        fs.pop().unlink()
    print(sys.argv[1], c.name, n0, "->", len(fs))
