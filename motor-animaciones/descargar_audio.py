# Deja la musica y los efectos de sonido del motor listos en una PC nueva (el repo publico no trae audio).
#   python motor-animaciones/descargar_audio.py
# - Musica: la baja de Mixkit (enlaces en musica/musica.json y musica/CREDITOS.md, licencia gratuita de Mixkit).
# - Efectos sintetizados: los rehace scripts/biblioteca_sonidos.py.
# - Efectos de Pixabay: si faltan, avisa cuales copiar desde la PC de Reimo (motor-animaciones/sonidos/) o bajar de
#   pixabay.com/sound-effects (los nombres estan en scripts/biblioteca_sonidos.py, tabla PIX).
import json, re, subprocess, sys, urllib.request
from pathlib import Path

M = Path(__file__).resolve().parent
for st in (sys.stdout, sys.stderr):
    try: st.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass

mus = json.loads((M / "musica" / "musica.json").read_text(encoding="utf-8"))
for clave, v in mus.items():
    destino = M / "musica" / v["archivo"]
    if destino.exists(): print(f"musica {clave}: ya esta"); continue
    url = re.search(r"\((https://assets\.mixkit\.co/[^)]+\.mp3)\)", v.get("fuente", ""))
    if not url: print(f"musica {clave}: sin enlace directo, bajala a mano ({v.get('fuente')})"); continue
    req = urllib.request.Request(url.group(1), headers={"User-Agent": "Mozilla/5.0"})
    destino.write_bytes(urllib.request.urlopen(req, timeout=60).read())
    print(f"musica {clave}: bajada de Mixkit")

son = json.loads((M / "sonidos" / "sonidos.json").read_text(encoding="utf-8"))
faltan = [k for k, v in son.items() if not (M / "sonidos" / v["archivo"]).exists()]
if not faltan: print("efectos: estan todos"); sys.exit()
sint = [k for k in faltan if "sintetizado" in son[k].get("origen", "")]
pix = [k for k in faltan if k not in sint]
if sint:
    print("efectos sintetizados que faltan:", ", ".join(sint), "-> corre: python motor-animaciones/scripts/biblioteca_sonidos.py")
if pix:
    print("efectos de Pixabay que faltan:", ", ".join(pix))
    print("  copialos desde la PC de Reimo (estudio-videos/motor-animaciones/sonidos/) o bajalos de pixabay.com/sound-effects")
