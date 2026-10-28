# B-roll de Pixabay (videos CC0: uso comercial sin credito) para los videos animados.
# La clave va en estudio-videos/.env como PIXABAY_API_KEY=... (nunca se imprime ni se sube al repo).
#
#   python herramientas/broll_pixabay.py buscar "tienda de ropa" [--orientacion vertical|horizontal] [--n 8]
#   python herramientas/broll_pixabay.py vista  "clothing store" [--n 12]  -> .cache/vistas/<busqueda>.png (miniaturas para elegir)
#   python herramientas/broll_pixabay.py bajar  "tienda de ropa" [--orientacion vertical] [--n 3] [--ids 123,456] [--salida broll/tienda]
#   python herramientas/broll_pixabay.py clip   broll/tienda/123.mp4 animaciones/<proyecto> <nombre> [--dur 4] [--desde 0]
#       -> assets/clips/<nombre>/f0001.jpg... (30 fps, recortado al tamano del proyecto) para el motor de animaciones
#
# Reglas de la API: maximo 100 consultas por minuto, guardar las busquedas 24 h (cache en .cache/pixabay/)
# y bajar los videos a disco (no enlazarlos directo). Los clips bajados NO se suben al repo.
import argparse
import hashlib
import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

R = Path(__file__).resolve().parent.parent
CACHE = R / ".cache" / "pixabay"
UA = {"User-Agent": "estudio-videos-broll/1.0"}


def clave():
    env = R / ".env"
    if env.exists():
        for linea in env.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*PIXABAY_API_KEY\s*=\s*(.+)", linea)
            if m:
                return m.group(1).strip().strip('"').strip("'")
    sys.exit("Falta PIXABAY_API_KEY en estudio-videos/.env (la clave aparece en pixabay.com/api/docs/ con la sesion iniciada).")


def buscar(q, n=20, orientacion=None, min_dur=0, lang="en", min_alto=0):
    params = {"q": q, "per_page": max(3, min(200, n * 4)), "safesearch": "true", "video_type": "film", "lang": lang}
    CACHE.mkdir(parents=True, exist_ok=True)
    f = CACHE / (hashlib.sha1(json.dumps(params, sort_keys=True).encode()).hexdigest()[:16] + ".json")
    if f.exists() and time.time() - f.stat().st_mtime < 24 * 3600:
        datos = json.loads(f.read_text(encoding="utf-8"))
    else:
        url = "https://pixabay.com/api/videos/?" + urllib.parse.urlencode({"key": clave(), **params})
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                datos = json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            sys.exit(f"Pixabay respondio {e.code}: {e.read().decode('utf-8', 'ignore')[:200]}")
        f.write_text(json.dumps(datos, ensure_ascii=False), encoding="utf-8")
    hits = []
    for h in datos.get("hits", []):
        v = mejor_version(h["videos"])
        if not v or h.get("duration", 0) < min_dur or min(v["width"], v["height"]) < min_alto:
            continue
        vert = v["height"] > v["width"]
        if orientacion == "vertical" and not vert or orientacion == "horizontal" and vert:
            continue
        hits.append({"id": h["id"], "dur": h.get("duration"), "w": v["width"], "h": v["height"], "url": v["url"],
                     "mb": round(v.get("size", 0) / 1e6, 1), "tags": h.get("tags", ""), "pagina": h.get("pageURL", ""),
                     "mini": v.get("thumbnail") or (h["videos"].get("medium") or {}).get("thumbnail", "")})
    return hits[:n]


def mejor_version(videos):
    for k in ("large", "medium", "small"):              # la mas grande que exista (large viene vacio si no hay 4K/FHD)
        v = videos.get(k) or {}
        if v.get("url"):
            return v
    return None


def vista(hits, png):
    """Hoja de miniaturas (id + resolucion) para elegir los clips mirandolos."""
    from io import BytesIO
    from PIL import Image, ImageDraw
    tam, cols = 360, 4
    filas = max(1, (len(hits) + cols - 1) // cols)
    S = Image.new("RGB", (cols * tam, filas * (tam * 9 // 16 + 26)), "#111")
    d = ImageDraw.Draw(S)
    for i, h in enumerate(hits):
        x, y = (i % cols) * tam, (i // cols) * (tam * 9 // 16 + 26)
        try:
            with urllib.request.urlopen(urllib.request.Request(h["mini"], headers=UA), timeout=30) as r:
                im = Image.open(BytesIO(r.read())).convert("RGB")
            im.thumbnail((tam, tam * 9 // 16))
            S.paste(im, (x + (tam - im.width) // 2, y + 22))
        except Exception:
            pass
        d.text((x + 4, y + 4), f"{h['id']} {h['w']}x{h['h']} {h['dur']}s", fill="white")
    png.parent.mkdir(parents=True, exist_ok=True)
    S.save(png)
    print("  hoja ->", png)


def bajar(hits, salida):
    salida.mkdir(parents=True, exist_ok=True)
    reg = salida / "pixabay.json"
    hechos = json.loads(reg.read_text(encoding="utf-8")) if reg.exists() else []
    for h in hits:
        dst = salida / f"{h['id']}.mp4"
        if not dst.exists():
            with urllib.request.urlopen(urllib.request.Request(h["url"], headers=UA), timeout=120) as r:
                dst.write_bytes(r.read())
        if not any(x["id"] == h["id"] for x in hechos):
            hechos.append({k: h[k] for k in ("id", "dur", "w", "h", "tags", "pagina")})
        print(f"  {dst.relative_to(R)}  {h['w']}x{h['h']}  {h['dur']} s  ({h['tags']})")
    reg.write_text(json.dumps(hechos, ensure_ascii=False, indent=1), encoding="utf-8")


def clip(video, proyecto, nombre, dur, desde):
    html = (proyecto / "index.html").read_text(encoding="utf-8")
    m = re.search(r"ancho:\s*(\d+),\s*alto:\s*(\d+)", html)
    w, h = (int(m.group(1)), int(m.group(2))) if m else (1920, 1080)
    dst = proyecto / "assets" / "clips" / nombre
    dst.mkdir(parents=True, exist_ok=True)
    for viejo in dst.glob("f*.jpg"):
        viejo.unlink()
    vf = f"fps=30,scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(desde), "-t", str(dur), "-i", str(video), "-vf", vf,
                    "-q:v", "3", str(dst / "f%04d.jpg")], check=True)
    print(f"  {len(list(dst.glob('f*.jpg')))} cuadros -> {dst.relative_to(proyecto)} ({w}x{h})")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("accion", choices=["buscar", "bajar", "clip", "vista"])
    ap.add_argument("args", nargs="+")
    ap.add_argument("--orientacion", choices=["vertical", "horizontal"])
    ap.add_argument("--n", type=int, default=8)
    ap.add_argument("--min-dur", type=float, default=4)
    ap.add_argument("--salida")
    ap.add_argument("--lang", default="en")
    ap.add_argument("--min-alto", type=int, default=1080, help="lado corto minimo del video (1080 = FHD)")
    ap.add_argument("--ids", help="bajar solo estos ids (separados por coma)")
    ap.add_argument("--dur", type=float, default=4)
    ap.add_argument("--desde", type=float, default=0)
    a = ap.parse_args()
    if a.accion == "clip":
        clip(Path(a.args[0]), Path(a.args[1]), a.args[2], a.dur, a.desde)
    else:
        q = " ".join(a.args)
        hits = buscar(q, a.n, a.orientacion, a.min_dur, a.lang, a.min_alto)
        if a.ids:
            hits = [h for h in hits if str(h["id"]) in a.ids.split(",")]
        print(f"{len(hits)} videos para «{q}»" + (f" ({a.orientacion})" if a.orientacion else ""))
        if a.accion == "vista":
            vista(hits, R / ".cache" / "vistas" / (re.sub(r"[^a-z0-9]+", "-", q.lower()).strip("-") + ".png"))
        elif a.accion == "buscar":
            for h in hits:
                print(f"  {h['id']}  {h['w']}x{h['h']}  {h['dur']} s  {h['mb']} MB  ({h['tags']})")
        else:
            slug = re.sub(r"[^a-z0-9]+", "-", q.lower()).strip("-")
            bajar(hits, R / (a.salida or f"broll/{slug}"))
