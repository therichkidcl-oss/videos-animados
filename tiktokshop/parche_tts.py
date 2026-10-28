# Arma el index.html de una clase del curso TikTok Shop con la VOZ ORIGINAL de la clase:
#   tiempos desde la transcripcion de Whisper (trans/<n>.json: frases = segmentos, palabras con su inicio),
#   voz original normalizada, musica de fondo suave, fondo limpio, comun.js (curso-podcast) + tts-comun.js + v<n>.js y clips.
# Uso (en la carpeta del proyecto): python ../../tiktokshop/parche_tts.py <n> [cola_s]
import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

N = sys.argv[1]
COLA = float(sys.argv[2]) if len(sys.argv) > 2 else 3.0
R = Path(".")
TT = Path(__file__).resolve().parent
CP = TT.parent / "animaciones" / "curso-podcast"
h = (R / "trabajo" / "index.base.html").read_text(encoding="utf-8")


def nrm(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
    return "".join(c for c in s if c.isalnum() or c == "-")


tr = json.loads((TT / "trans" / f"{N}.json").read_text(encoding="utf-8"))
FR, PALS = [], []
for i, s in enumerate(tr["segs"]):
    FR.append([s["s"], s["e"]])
    for w in s["w"]:
        p = nrm(w[0])
        if p:
            PALS.append([i, p, w[1]])
bloque = "const T = {};\nconst FR = " + json.dumps(FR) + ";\nconst PALS = " + json.dumps(PALS, separators=(",", ":")) + ";"
ini = h.index("const T = {", h.index("Guion: inicio de cada palabra clave"))
fin = h.index("\n};", ini) + 3
h = h[:ini] + bloque + h[fin:]

voz = R / "assets/audio/voz.wav"
dvoz = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(voz)], capture_output=True, text=True).stdout)
dur = round(dvoz + COLA, 2)
h = re.sub(r"(const CONFIG = \{ dur: )[\d.]+", lambda m: f"{m.group(1)}{dur}", h, count=1)
h = h.replace("'assets/audio/voz.wav'", "'assets/audio/voz-cola.wav'", 1)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(voz), "-af", f"apad=whole_dur={dur}", str(R / "assets/audio/voz-cola.wav")], check=True)
tramos = [{"pista": "explicacion-tech", "t0": 0, "desde": 2.0, "nivel_db": -25, "entrada": 1.5, "salida": 2.5}]
h = h.replace('"fondo": "cortina"', '"fondo": "limpio"', 1)
h = h.replace('"camaraEnMano": false}', '"camaraEnMano": false, "tramosMusica": ' + json.dumps(tramos) + ', "ducking": 3}', 1)

clips = {c.name: {"n": len(list(c.glob("f*.jpg"))), "fps": 30} for c in sorted((R / "assets/clips").iterdir()) if c.is_dir()}
comun = (CP / "comun.js").read_text(encoding="utf-8").replace("/*CLIPS*/{}/*FIN*/", json.dumps(clips))
comun = comun.replace("sfx(X0 - SAL, 'transicion', { vol: .8 });", "")      # sin presentador de HeyGen: no hay transicion en la frase 0
media = R / "trabajo" / "media.json"
inyect = ""
if media.exists():                                     # tramos de presentador/celular y marcas rojas (preparar.py)
    md = json.loads(media.read_text(encoding="utf-8"))
    inyect = "const MEDIA = " + json.dumps(md["media"]) + ";\nconst MARCAS = " + json.dumps(md["marcas"]) + ";\n"
plant = (TT / "tts-plantillas.js").read_text(encoding="utf-8") if N != "02" else ""
esc = comun + "\n" + (TT / "tts-comun.js").read_text(encoding="utf-8") + "\n" + plant + "\n" + inyect + (TT / f"v{N}.js").read_text(encoding="utf-8")
a = h.index("/* =====================================================================\n   ELEMENTOS  (DEMO")
b = h.index("/* =========================== FIN DE LA DEMO =========================== */") + len("/* =========================== FIN DE LA DEMO =========================== */")
h = h[:a] + esc.strip("\n") + "\n" + h[b:]
a2 = "window.__render = async t => { await prepararCapas(t); render(t); };"
assert h.count(a2) == 1
h = h.replace(a2, "window.__render = async t => { await prepararCapas(t); render(t); await Promise.all(PEND.map(i => i.decode().catch(() => {}))); };")
(R / "index.html").write_text(h, encoding="utf-8")
print("listo clase", N, "· dur", dur, "· frases", len(FR), "· palabras", len(PALS), "· clips", {k: v["n"] for k, v in clips.items()})
