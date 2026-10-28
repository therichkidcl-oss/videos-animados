# Arma un reel vertical (1080x1920) del kit general de reels animados, para cualquier nicho.
#   python reels/armar.py <proyecto> <escenas.js> [--marca nova|iahub|neutra|<ruta.json>] [--cine] [--modulo trading ...]
#                         [--musica intro-scifi --desde 0 --nivel -16] [--sin-voz --dur 16]
# Con voz: <proyecto>/guion.json + <proyecto>/audio/<escena>.wav (node herramientas/voz.mjs <proyecto>). Une la voz con
# pausas cortas, escribe trabajo/guion.txt (campo "pantalla" de cada frase: ahi van las pronunciaciones entre llaves,
# ej. trading{tréiding}), alinea cada palabra (anim.py alinear) y arma index.html con FR / PALS + MARCA + reels/base.js
# (+ cine.js con --cine) + los modulos de nicho (reels/nichos/<modulo>.js) + las escenas del reel.
# Todo lo de la voz queda dentro de animaciones/ (ignorado por git).
import argparse, hashlib, json, re, shutil, subprocess, sys, unicodedata
from pathlib import Path

KIT = Path(__file__).resolve().parent
EST = KIT.parent
BASE = EST / "animaciones" / "dev-base"
PY = EST / ".venv-anim" / "Scripts" / "python.exe"
ANIM = EST / "motor-animaciones" / "scripts" / "anim.py"

ap = argparse.ArgumentParser()
ap.add_argument("proyecto"); ap.add_argument("escenas")
ap.add_argument("--marca", default="nova", help="nombre en reels/marcas/ o ruta a un .json con los colores")
ap.add_argument("--cine", action="store_true", help="carga reels/cine.js (formato cine: personajes, objetos con cara, camara)")
ap.add_argument("--modulo", action="append", default=[], help="modulo de nicho de reels/nichos/ (se puede repetir)")
ap.add_argument("--sin-voz", action="store_true"); ap.add_argument("--dur", type=float, default=0)
ap.add_argument("--musica", default="intro-scifi"); ap.add_argument("--desde", type=float, default=None)
ap.add_argument("--nivel", type=float, default=-16); ap.add_argument("--cola", type=float, default=2.2)
ap.add_argument("--pausa", type=float, default=.42, help="silencio entre escenas de la voz (s)")
ap.add_argument("--inicio", type=float, default=.3, help="silencio antes de la primera palabra (s)")
ap.add_argument("--realinear", action="store_true")
a = ap.parse_args()
P = Path(a.proyecto).resolve()
rm = Path(a.marca) if a.marca.endswith(".json") else KIT / "marcas" / f"{a.marca}.json"
MARCA = json.loads(rm.read_text(encoding="utf-8"))


def ffdur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)],
                                capture_output=True, text=True).stdout)


# 1) proyecto desde la base del motor (si no existe): motor, render (Chrome instalado), herramientas, fuentes
if not (P / "render.mjs").exists():
    P.mkdir(parents=True, exist_ok=True)
    for x in BASE.iterdir():
        if x.name in ("trabajo", "out"): continue
        d = P / x.name
        if x.is_dir(): shutil.copytree(x, d, dirs_exist_ok=True)
        else: shutil.copy2(x, d)
    (P / "trabajo").mkdir(exist_ok=True)
    shutil.copy2(BASE / "trabajo" / "index.base.html", P / "trabajo" / "index.base.html")
FUENTES = EST / "node_modules" / "@fontsource" / "inter" / "files"
for w in (500, 600, 700, 800, 900):
    f = P / "assets" / "fonts" / f"inter-latin-{w}-normal.woff2"
    if not f.exists(): shutil.copy2(FUENTES / f.name, f)
bebas = P / "assets" / "fonts" / "bebas-neue-latin-400-normal.woff2"
if not bebas.exists(): shutil.copy2(KIT / "assets" / bebas.name, bebas)
(P / "assets" / "img").mkdir(parents=True, exist_ok=True)
for f in (KIT / "assets").glob("*.png"):
    if not (P / "assets" / "img" / f.name).exists(): shutil.copy2(f, P / "assets" / "img" / f.name)

# 2) voz unida + guion.txt + alineacion
FR, PALS = [], []
if a.sin_voz:
    dur = a.dur
    audio_cfg = ""
else:
    guion = json.loads((P / "guion.json").read_text(encoding="utf-8"))
    sr = "48000"
    args, k = [], 0
    for i, e in enumerate(guion["escenas"]):
        pausa = a.inicio if i == 0 else e.get("pausa", a.pausa)          # silencio antes de cada escena
        args += ["-f", "lavfi", "-t", f"{pausa:.3f}", "-i", f"anullsrc=r={sr}:cl=mono"]; k += 1
        args += ["-i", str(P / "audio" / f"{e['id']}.wav")]; k += 1
    # cada entrada se remuestrea a 48 kHz mono antes de concatenar
    fc = ";".join(f"[{i}:a]aresample={sr},aformat=channel_layouts=mono[c{i}]" for i in range(k)) + ";" + \
        "".join(f"[c{i}]" for i in range(k)) + f"concat=n={k}:v=0:a=1[a]"
    (P / "assets" / "audio").mkdir(parents=True, exist_ok=True)
    cruda = P / "trabajo" / "voz-unida.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", fc, "-map", "[a]", "-ar", sr, str(cruda)], check=True)
    voz = P / "assets" / "audio" / "voz.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(cruda), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", sr, str(voz)], check=True)
    lineas = [f.get("pantalla", f["texto"]) for e in guion["escenas"] for f in e["frases"]]
    (P / "trabajo" / "guion.txt").write_text("\n".join(lineas) + "\n", encoding="utf-8")
    firma = hashlib.sha1(voz.read_bytes() + "\n".join(lineas).encode()).hexdigest()
    marca = P / "trabajo" / "alineado.txt"
    if a.realinear or not (P / "trabajo" / "tiempos.json").exists() or not marca.exists() or marca.read_text() != firma:
        # index provisional con la ruta de la voz para que anim.py sepa que audio alinear
        h0 = (P / "trabajo" / "index.base.html").read_text(encoding="utf-8")
        h0 = re.sub(r"const CONFIG = \{ dur: [\d.]+, audio: '[^']*'", f"const CONFIG = {{ dur: {ffdur(voz):.2f}, audio: 'assets/audio/voz.wav'", h0, count=1)
        (P / "index.html").write_text(h0, encoding="utf-8")
        r = subprocess.run([str(PY), str(ANIM), "alinear"], cwd=P, capture_output=True, text=True, encoding="utf-8", errors="replace")
        print((r.stdout.strip().splitlines() or [r.stderr[-800:]])[-1])
        if not (P / "trabajo" / "tiempos.json").exists(): sys.exit("fallo la alineacion")
        marca.write_text(firma)

    def nrm(s):
        s = re.sub(r"\{[^}]*\}", "", s)
        s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
        return "".join(c for c in s if c.isalnum() or c == "-")
    pal = json.loads((P / "trabajo" / "tiempos.json").read_text(encoding="utf-8"))
    nf = max(p["frase"] for p in pal) + 1
    FR = [[1e9, 0] for _ in range(nf)]
    for p in pal:
        f = p["frase"]; FR[f][0] = min(FR[f][0], p["s"]); FR[f][1] = max(FR[f][1], p["e"])
        w = nrm(p["w"])
        if w: PALS.append([f, w, round(p["s"], 3)])
    FR = [[round(x, 3), round(y, 3)] for x, y in FR]
    dvoz = ffdur(voz)
    dur = round(dvoz + a.cola, 2)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(voz), "-af", f"apad=whole_dur={dur}", str(P / "assets" / "audio" / "voz-cola.wav")], check=True)
    audio_cfg = "assets/audio/voz-cola.wav"

# 3) index.html
h = (P / "trabajo" / "index.base.html").read_text(encoding="utf-8")
ff = ("@font-face{font-family:'Bebas Neue';font-weight:400;font-display:block;src:url(assets/fonts/bebas-neue-latin-400-normal.woff2) format('woff2')}\n" +
      "".join(f"@font-face{{font-family:'Inter';font-weight:{w};font-display:block;src:url(assets/fonts/inter-latin-{w}-normal.woff2) format('woff2')}}\n" for w in (500, 600, 700, 800, 900)))
i = h.index("\n", h.rindex("@font-face")) + 1
h = h[:i] + ff + h[i:]
h = re.sub(r"const CONFIG = \{[^\n]*", f"const CONFIG = {{ dur: {dur}, audio: '{audio_cfg}', ancho: 1080, alto: 1920, montaje: false, capas: false }};", h, count=1)
mus = json.loads((EST / "motor-animaciones" / "musica" / "musica.json").read_text(encoding="utf-8"))[a.musica]
tramo = {"pista": a.musica, "t0": 0, "t1": dur, "desde": a.desde if a.desde is not None else mus["desde"], "nivel_db": a.nivel, "entrada": .4, "salida": 2.0}
estilo = {"modo": "audio", "tema": "profundidad", "fondo": "limpio", "acabado": "solido", "tipo": "grotesk", "acento": MARCA["acento"].upper(), "sonido": "musica",
          "musica": a.musica, "densidad": "espectaculo", "subtitulos": False, "camaraEnMano": False, "ducking": 3, "tramosMusica": [tramo]}
h = re.sub(r"const ESTILO = \{[^\n]*", lambda m: "const ESTILO = " + json.dumps(estilo, ensure_ascii=False) + ";", h, count=1)
bloque = "const T = {};\nconst FR = " + json.dumps(FR) + ";\nconst PALS = " + json.dumps(PALS, ensure_ascii=False, separators=(",", ":")) + ";"
i0 = h.index("const T = {", h.index("Guion: inicio de cada palabra clave"))
i1 = h.index("\n};", i0) + 3
h = h[:i0] + bloque + h[i1:]
partes = ["const MARCA = " + json.dumps(MARCA, ensure_ascii=False) + ";", (KIT / "base.js").read_text(encoding="utf-8")]
if a.cine: partes.append((KIT / "cine.js").read_text(encoding="utf-8"))
for m in a.modulo:
    partes.append((KIT / "nichos" / f"{m}.js").read_text(encoding="utf-8"))
partes.append(Path(a.escenas).read_text(encoding="utf-8"))
esc = "\n".join(partes)
A = h.index("/* =====================================================================\n   ELEMENTOS  (DEMO")
B = h.index("/* =========================== FIN DE LA DEMO =========================== */")
h = h[:A] + esc.strip("\n") + "\n" + h[B:]
viejo = "window.__render = async t => { await prepararCapas(t); render(t); };"
assert h.count(viejo) == 1
h = h.replace(viejo, "window.__render = async t => { await prepararCapas(t); render(t); await Promise.all(PEND.map(i => i.decode().catch(() => {}))); };")
h = h.replace("const fonts = ['400 20px Outfit',", "const fonts = ['400 20px \"Bebas Neue\"', '500 20px Inter', '600 20px Inter', '700 20px Inter', '800 20px Inter', '900 20px Inter', '400 20px Outfit',", 1)
h = re.sub(r"<title>[^<]*</title>", f"<title>{MARCA.get('nombre', 'Reel')} · {P.name}</title>", h, count=1)
(P / "index.html").write_text(h, encoding="utf-8")
print(f"listo {P.name} · marca {MARCA.get('nombre')} · dur {dur} s · frases {len(FR)} · palabras {len(PALS)}")
