#!/usr/bin/env bash
# Cola de render del curso TikTok Shop: renderiza cada clase marcada con cola/listo_<n> (en orden de llegada), la copia
# a Videos/Estudio IA-HUB/TikTok Shop con su nombre (nombres.txt: "<n>|Clase NN - Titulo"), y deja una hoja de cuadros
# + volumen en cola/hecho_<n>.png/.txt para revisarla. Corre hasta que exista cola/FIN y no queden pendientes.
cd "$(dirname "$0")"
EST=/c/Users/Reimo/Documents/Proyectos/estudio-videos
DEST="/c/Users/Reimo/Videos/Estudio IA-HUB/TikTok Shop"
mkdir -p cola "$DEST"
while true; do
  pend=$(ls -tr cola/listo_* 2>/dev/null | sed 's#cola/listo_##' | while read n; do [ -f "cola/hecho_$n.txt" ] || echo "$n"; done | head -1)
  if [ -z "$pend" ]; then [ -f cola/FIN ] && { echo "COLA TERMINADA $(date +%H:%M)"; break; }; sleep 20; continue; fi
  n=$pend; P="$EST/animaciones/tts-clase$n"
  echo "=== clase $n $(date +%H:%M:%S)"
  cd "$P" && rm -f out/*.mp4 && "$EST/.venv-anim/Scripts/python.exe" ../../motor-animaciones/scripts/anim.py render --fps=30 > trabajo/render.log 2>&1
  OUT=$(ls "$P"/out/*_1080p30.mp4 2>/dev/null | head -1)
  cd "$EST/tiktokshop"
  if [ -z "$OUT" ] || ! ffprobe -v error "$OUT" > /dev/null 2>&1; then echo "FALLO render $n" | tee "cola/hecho_$n.txt"; continue; fi
  NOM=$(grep "^$n|" nombres.txt | cut -d'|' -f2); [ -z "$NOM" ] && NOM="Clase $n"
  cp "$OUT" "$DEST/$NOM.mp4"
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")
  LU=$(ffmpeg -nostats -i "$OUT" -af ebur128 -f null - 2>&1 | tr -d '\r' | grep -A1 "Integrated" | grep "I:" | tail -1)
  python - "$OUT" "$DUR" "cola/hecho_$n.png" <<'PY'
import subprocess, sys
from PIL import Image
out, dur, dst = sys.argv[1], float(sys.argv[2]), sys.argv[3]
ts = [1.5 + i * (dur - 3) / 11 for i in range(12)]
ims = []
for t in ts:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", out, "-frames:v", "1", "-vf", "scale=640:360", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
    ims.append(Image.frombytes("RGB", (640, 360), raw))
S = Image.new("RGB", (640 * 4, 360 * 3))
for i, im in enumerate(ims): S.paste(im, ((i % 4) * 640, (i // 4) * 360))
S.save(dst)
PY
  echo "$NOM · ${DUR%.*} s · $LU" | tee "cola/hecho_$n.txt"
done
