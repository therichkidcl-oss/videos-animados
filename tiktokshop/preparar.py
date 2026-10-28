# Prepara una clase del curso TikTok Shop para animarla con su voz original:
#   1) proyecto animaciones/tts-clase<n> (copia de dev-base) y la voz original normalizada (assets/audio/voz.wav)
#   2) tramos de media: fuente vertical = todo en el celular; horizontal = se detecta cuando es presentador a camara
#      (tarjeta con la cara centrada) y cuando es grabacion del celular (franjas negras a los lados -> captura completa)
#   3) cuadros de cada tramo en assets/clips/m<i>, marcas rojas (flechas/circulos) y trabajo/media.json
#   4) hoja trabajo/revision/media.png con el primer cuadro de cada tramo para revisar
# Uso: python preparar.py <n>
import json
import shutil
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw

R = Path(__file__).resolve().parent
N = sys.argv[1]
SRC = R / "orig" / f"{N}_src.mp4"
P = R.parent / "animaciones" / f"tts-clase{N}"
FPS = 30
# ajuste del recorte del presentador por clase: (zoom, x minimo) para dejar fuera letreros de la fuente
AJUSTE_PRES = {"11": (.85, 886), "12": (.85, 890), "09": (.82, 935)}


def sh(*a):
    subprocess.run([str(x) for x in a], check=True)


def probe(f):
    d = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height:format=duration", "-of", "json", str(f)],
                                  capture_output=True, text=True).stdout)
    v = [s for s in d["streams"] if s["codec_type"] == "video"][0]
    return v["width"], v["height"], float(d["format"]["duration"])


def grises(t0=None, dur=None, fps=2, w=160, h=90):
    a = ["ffmpeg", "-v", "error"] + (["-ss", f"{t0:.3f}", "-t", f"{dur:.3f}"] if t0 is not None else []) + ["-i", str(SRC), "-vf", f"fps={fps},scale={w}:{h},format=gray", "-f", "rawvideo", "-"]
    raw = subprocess.run(a, capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w)


def es_cel(f):                                         # franjas negras y parejas a ambos lados = grabacion del celular
    L, Rr = f[..., :22], f[..., -22:]
    return (L.mean((-1, -2)) < 14) & (Rr.mean((-1, -2)) < 14) & (L.std((-1, -2)) < 8) & (Rr.std((-1, -2)) < 8)


def cuadro(t, escala=None):
    a = ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(SRC), "-frames:v", "1"] + (["-vf", f"scale={escala}"] if escala else []) + ["-f", "image2pipe", "-vcodec", "png", "-"]
    return cv2.imdecode(np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.uint8), cv2.IMREAD_COLOR)


W, H, DUR = probe(SRC)
if not P.exists():
    shutil.copytree(R.parent / "animaciones" / "dev-base", P, ignore=shutil.ignore_patterns("revision"))
(P / "assets/audio").mkdir(parents=True, exist_ok=True)
(P / "trabajo/revision").mkdir(parents=True, exist_ok=True)
VOZ = R / "orig" / f"{N}_voz.m4a"
sh("ffmpeg", "-v", "error", "-y", "-i", VOZ if VOZ.exists() else SRC, "-vn", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", 48000, P / "assets/audio/voz.wav")

# ---------- tramos ----------
if H > W:
    tramos = [["cel", 0.0, DUR]]
else:
    g = grises()
    c = es_cel(g).astype(float)
    c = np.array([np.median(c[max(0, i - 2):i + 3]) for i in range(len(c))]) > .5
    segs, ini = [], 0
    for i in range(1, len(c) + 1):
        if i == len(c) or c[i] != c[ini]:
            segs.append(["cel" if c[ini] else "pres", ini / 2, i / 2]); ini = i
    tramos = []
    for s in segs:                                     # tramos cortos (<2,5 s) se pegan al anterior
        if tramos and (s[2] - s[1] < 2.5 or tramos[-1][0] == s[0]):
            tramos[-1][2] = s[2]
        else:
            tramos.append(s)
    if len(tramos) > 1 and tramos[0][2] - tramos[0][1] < 2.5:
        tramos[1][1] = 0.0; tramos.pop(0)
    for i in range(1, len(tramos)):                    # corte exacto (cuadro a cuadro) en cada cambio
        b = tramos[i][1]
        gg = grises(max(0, b - 1.2), 2.4, fps=FPS)
        cc = es_cel(gg)
        quiere = tramos[i][0] == "cel"
        k = [j for j in range(1, len(cc)) if cc[j] == quiere and cc[j - 1] != quiere]
        if k:
            j = min(k, key=lambda j: abs(j - len(cc) / 2))
            b = max(0, b - 1.2) + j / FPS
        tramos[i - 1][2] = tramos[i][1] = round(b, 3)
    tramos[-1][2] = DUR

face = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
clips = P / "assets/clips"
if clips.exists():
    shutil.rmtree(clips)
media, info = [], []
for i, (tipo, t0, t1) in enumerate(tramos):
    out = clips / f"m{i}"
    out.mkdir(parents=True)
    if tipo == "cel" and H > W:
        vf = "scale=-2:1012:flags=lanczos"
    elif tipo == "cel":                                # columnas/filas con contenido = el celular dentro del cuadro
        cols, rows = np.zeros(W, bool), np.zeros(H, bool)
        for t in np.linspace(t0 + .3, t1 - .3, 5):
            f = cv2.cvtColor(cuadro(t), cv2.COLOR_BGR2GRAY)
            cols |= f.max(0) > 28; rows |= f.max(1) > 28
        xs, ys = np.where(cols)[0], np.where(rows)[0]
        x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        cw, chh = (x1 - x0) // 2 * 2, (y1 - y0) // 2 * 2
        vf = f"crop={cw}:{chh}:{x0}:{y0},scale=-2:1012:flags=lanczos"
    else:                                              # presentador: tarjeta 640x768 con la cara centrada
        cxs = []
        for t in np.linspace(t0 + .5, t1 - .5, 12):
            f = cuadro(t, "960:-2")
            k = W / f.shape[1]
            for (x, y, w, h) in face.detectMultiScale(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY), 1.1, 6, minSize=(70, 70)):
                cxs.append((x + w / 2) * k)
        z, xmin = AJUSTE_PRES.get(N, (1, 0))
        cw, chh = int(H * z * 640 / 768) // 2 * 2, int(H * z) // 2 * 2
        cx = float(np.median(cxs)) if cxs else W / 2
        x = int(min(max(cx - cw / 2, xmin), W - cw))
        print(f"  presentador: cara cx={cx:.0f} recorte x={x} ancho={cw}")
        vf = f"crop={cw}:{chh}:{x}:0,scale=640:768:flags=lanczos"
    sh("ffmpeg", "-v", "error", "-y", "-ss", f"{t0:.3f}", "-t", f"{t1 - t0 + .3:.3f}", "-i", SRC, "-vf", f"fps={FPS},{vf}", "-q:v", 3, out / "f%04d.jpg")
    fs = sorted(out.glob("f*.jpg"))                    # cuadros negros del final (fundido) fuera: queda el ultimo cuadro real
    while len(fs) > 30 and np.asarray(Image.open(fs[-1]).convert("L")).mean() < 14:
        fs.pop().unlink()
    media.append([round(t0, 3), round(t1, 3), tipo, f"m{i}"])
    info.append((tipo, t0, t1, out / "f0005.jpg" if (out / "f0005.jpg").exists() else out / "f0001.jpg"))

# ---------- marcas rojas (flechas o circulos de la grabacion) solo en tramos del celular ----------
marcas = []                                            # 19/10: sin anillos (quedaban mal ubicados; la grabacion ya trae sus flechas)
for (t0, t1, tipo, clip) in []:
    if tipo != "cel":
        continue
    fs = sorted((clips / clip).glob("f*.jpg"))
    pts = []
    for k in range(0, len(fs), 3):
        im = np.asarray(Image.open(fs[k]).convert("RGB").resize((240, 520))).astype(int)
        r, g_, b = im[..., 0], im[..., 1], im[..., 2]
        m = (r > 175) & (g_ < 60) & (b < 60) & (r - b > 135)
        m[:26] = False; m[-16:] = False
        if m.sum() > 120:
            ys, xs = np.where(m)
            pts.append((k, float(np.median(xs)) / 240, float(np.median(ys)) / 520))
    grupos, cur = [], None
    for k, x, y in pts:
        if cur and k - cur["k1"] <= 6 and abs(x - cur["x"]) < .2 and abs(y - cur["y"]) < .12:
            cur["k1"] = k; cur["xs"].append(x); cur["ys"].append(y)
        else:
            if cur: grupos.append(cur)
            cur = {"k0": k, "k1": k, "x": x, "y": y, "xs": [x], "ys": [y]}
    if cur: grupos.append(cur)
    for gr in grupos:
        a, b = t0 + gr["k0"] / FPS, t0 + gr["k1"] / FPS
        if gr["k1"] > gr["k0"] and b - a <= 15 and (b - a) < .8 * (t1 - t0):
            marcas.append([round(a, 2), round(max(b, a + 1.2), 2), round(float(np.median(gr["xs"])), 3), round(float(np.median(gr["ys"])), 3)])

(P / "trabajo/media.json").write_text(json.dumps({"media": media, "marcas": marcas, "orient": "v" if H > W else "h", "dur": DUR}), encoding="utf-8")

# ---------- hoja de revision ----------
tiles = []
for tipo, t0, t1, f in info:
    im = Image.open(f).convert("RGB")
    im.thumbnail((300, 360))
    t = Image.new("RGB", (300, 400), "#111"); t.paste(im, ((300 - im.width) // 2, 36))
    ImageDraw.Draw(t).text((8, 8), f"{tipo} {t0:.1f}-{t1:.1f}", fill="yellow")
    tiles.append(t)
cols = min(6, len(tiles)); filas = (len(tiles) + cols - 1) // cols
S = Image.new("RGB", (300 * cols, 400 * filas), "#000")
for i, t in enumerate(tiles):
    S.paste(t, ((i % cols) * 300, (i // cols) * 400))
S.save(P / "trabajo/revision/media.png")
print(f"clase {N}: {W}x{H} {DUR:.0f} s · tramos", [(m[2], m[0], m[1]) for m in media], "· marcas", len(marcas))
