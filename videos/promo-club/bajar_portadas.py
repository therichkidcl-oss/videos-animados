# Baja las portadas REALES de los modulos de los 3 cursos del club (orden del curso) a portadas/<curso>-NN.jpg
# (1280x720) y escribe portadas/cursos.json con nombre, color y titulos. Fuente: cursos_club.json (Firestore).
# Uso: python bajar_portadas.py <cursos_club.json>
import json, sys, subprocess, urllib.request
from pathlib import Path

D = Path(__file__).resolve().parent / "portadas"
D.mkdir(exist_ok=True)
src = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
CURSOS = [("nsfw", "influencer-1.0", "Influencer IA NSFW", "#FF6A1A"),
          ("ecom", "influencer-ecom-1.0", "Influencer IA ECOM", "#22C55E"),
          ("dev", "developer-ia", "Developer IA", "#A855F7")]
out = []
for clave, cid, nombre, color in CURSOS:
    c = src[cid]
    mods = []
    for i, m in enumerate(c["lista"], 1):
        url = m["portada"]
        if url.startswith("/"):
            url = "https://video-cdn.ia-hub.cl" + url
        tmp = D / f"_{clave}-{i:02d}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        tmp.write_bytes(urllib.request.urlopen(req, timeout=60).read())
        dst = D / f"{clave}-{i:02d}.jpg"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-vf",
                        "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720", "-q:v", "3", str(dst)], check=True)
        tmp.unlink()
        mods.append({"n": i, "titulo": m["titulo"].strip(), "img": dst.name})
    out.append({"clave": clave, "nombre": nombre, "color": color, "modulos": len(mods), "clases": c["clases"], "lista": mods})
    print(clave, len(mods), "portadas,", c["clases"], "clases")
(D / "cursos.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
