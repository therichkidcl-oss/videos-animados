# Arma el index.html de una clase del modulo organico (voz doblada + animaciones). Tiempos desde trabajo/tiempos.json
# (alineacion forzada: frase = linea del guion). Inyecta comun.js (curso-podcast) + org-comun.js + org-plantillas.js + v<n>.js.
# Uso (en la carpeta del proyecto animaciones/org-c<n>): python ../../organico/parche_org.py <n> [cola_s]
import json, re, subprocess, sys, unicodedata
from pathlib import Path

N = sys.argv[1]
COLA = float(sys.argv[2]) if len(sys.argv) > 2 else 3.0
R = Path(".")
OR = Path(__file__).resolve().parent
CP = OR.parent / "animaciones" / "curso-podcast"
h = (R / "trabajo" / "index.base.html").read_text(encoding="utf-8")


def nrm(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
    return "".join(c for c in s if c.isalnum() or c == "-")


pal = json.loads((R / "trabajo" / "tiempos.json").read_text(encoding="utf-8"))
nf = max(p["frase"] for p in pal) + 1
FR = [[1e9, 0] for _ in range(nf)]
PALS = []
for p in pal:
    f = p["frase"]; FR[f][0] = min(FR[f][0], p["s"]); FR[f][1] = max(FR[f][1], p["e"])
    w = nrm(p["w"])
    if w: PALS.append([f, w, p["s"]])
FR = [[round(a, 2), round(b, 2)] for a, b in FR]
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

clips = {d.name: {"n": len(list(d.glob("f*.jpg"))), "fps": 30} for d in sorted((R / "assets" / "clips").glob("*")) if d.is_dir() and any(d.glob("f*.jpg"))}
comun = (CP / "comun.js").read_text(encoding="utf-8").replace("/*CLIPS*/{}/*FIN*/", json.dumps(clips))   # clips de la modelo (cuadros JPG a 30 fps)
comun = comun.replace("sfx(X0 - SAL, 'transicion', { vol: .8 });", "")
v2 = (OR / "org-v2.js").read_text(encoding="utf-8") + "\n" if N in ("5", "6") else ""   # clases 5 y 6 rehechas (fondo limpio + celular)
esc = comun + "\n" + (OR / "org-comun.js").read_text(encoding="utf-8") + "\n" + (OR / "org-plantillas.js").read_text(encoding="utf-8") + "\n" + v2 + \
    (OR / f"v{N}.js").read_text(encoding="utf-8")
a = h.index("/* =====================================================================\n   ELEMENTOS  (DEMO")
b = h.index("/* =========================== FIN DE LA DEMO =========================== */") + len("/* =========================== FIN DE LA DEMO =========================== */")
h = h[:a] + esc.strip("\n") + "\n" + h[b:]
a2 = "window.__render = async t => { await prepararCapas(t); render(t); };"
assert h.count(a2) == 1
h = h.replace(a2, "window.__render = async t => { await prepararCapas(t); render(t); await Promise.all(PEND.map(i => i.decode().catch(() => {}))); };")
(R / "index.html").write_text(h, encoding="utf-8")
print("listo clase", N, "· dur", dur, "· frases", len(FR), "· palabras", len(PALS))
