# Prepara una clase doblada del modulo organico: une la voz v3 por escenas (videos/organico-c<n>/audio), crea el proyecto
# animaciones/org-c<n> desde dev-base, copia voz y fotos (assets/img/c<n>-*.png), escribe trabajo/guion.txt con las
# frases del guion y alinea cada palabra con la voz (anim.py alinear, alineacion forzada: las palabras son las del guion).
# Uso: python preparar_org.py <n>
import json, shutil, subprocess, sys
from pathlib import Path

R = Path(__file__).resolve().parent
EST = R.parent
N = sys.argv[1]
G = EST / "videos" / f"organico-c{N}"
P = EST / "animaciones" / f"org-c{N}"
PY = EST / ".venv-anim" / "Scripts" / "python.exe"
ANIM = EST / "motor-animaciones" / "scripts" / "anim.py"
guion = json.loads((G / "guion.json").read_text(encoding="utf-8"))

# 1) voz unida: 0,6 s al inicio, 0,8 s entre escenas
sr = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=sample_rate", "-of", "csv=p=0",
                     str(G / "audio" / f"{guion['escenas'][0]['id']}.wav")], capture_output=True, text=True).stdout.strip()
args, filt, k = [], [], 0
for i, e in enumerate(guion["escenas"]):
    args += ["-f", "lavfi", "-t", "0.6" if i == 0 else "0.8", "-i", f"anullsrc=r={sr}:cl=mono"]; filt.append(f"[{k}:a]"); k += 1
    args += ["-i", str(G / "audio" / f"{e['id']}.wav")]; filt.append(f"[{k}:a]"); k += 1
fc = "".join(filt) + f"concat=n={k}:v=0:a=1,aformat=channel_layouts=mono[a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", fc, "-map", "[a]", "-ar", sr, str(G / "voz.wav")], check=True)

# 2) proyecto
if not P.exists():
    shutil.copytree(EST / "animaciones" / "dev-base", P, ignore=shutil.ignore_patterns("revision"))
(P / "assets" / "audio").mkdir(parents=True, exist_ok=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(G / "voz.wav"), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "48000",
                str(P / "assets" / "audio" / "voz.wav")], check=True)
(P / "assets" / "img").mkdir(parents=True, exist_ok=True)
for f in [*(R / "assets" / "img").glob(f"c{N}-*.png"), *((R / "assets" / "img").glob("ig-*.png") if N in ("5", "6") else [])]:
    shutil.copy2(f, P / "assets" / "img" / f.name)

# 3) guion.txt (una frase por linea) + alineacion forzada
lineas = [f["texto"] for e in guion["escenas"] for f in e["frases"]]
(P / "trabajo" / "guion.txt").write_text("\n".join(lineas) + "\n", encoding="utf-8")
r = subprocess.run([str(PY), str(ANIM), "alinear"], cwd=P, capture_output=True, text=True, encoding="utf-8", errors="replace")
print(r.stdout.strip().splitlines()[-2] if r.stdout.strip() else r.stderr[-800:])
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(G / "voz.wav")],
                           capture_output=True, text=True).stdout)
print(f"clase {N}: voz {dur:.1f} s · {len(lineas)} frases · proyecto {P.name}")
