# Manda texto, fotos o videos a Reimo por Telegram con su bot Jeffri (para avisos y entregas cuando esta fuera del PC).
#   python herramientas/telegram_enviar.py --texto "hola"
#   python herramientas/telegram_enviar.py --foto hoja.jpg [--caption "..."]
#   python herramientas/telegram_enviar.py --video video.mp4 [--caption "..."]   (si pesa mas de 48 MB se comprime solo)
# El token y el chat se leen de C:\Users\Reimo\Desktop\pyton pantalla\.env y NUNCA se imprimen.
import argparse
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
import uuid
from pathlib import Path

ENV = Path(r"C:\Users\Reimo\Desktop\pyton pantalla\.env")
vals = {}
for linea in ENV.read_text(encoding="utf-8", errors="ignore").splitlines():
    if "=" in linea and not linea.strip().startswith("#"):
        k, v = linea.split("=", 1)
        vals[k.strip()] = v.strip().strip('"').strip("'")
TOKEN, CHAT = vals.get("TELEGRAM_BOT_TOKEN"), vals.get("TELEGRAM_ALLOWED_USER_ID")
if not TOKEN or not CHAT:
    sys.exit("Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_ALLOWED_USER_ID en el .env de Jeffri")
API = f"https://api.telegram.org/bot{TOKEN}"


def llamar(metodo, campos, archivo=None):
    if archivo is None:
        data = json.dumps(campos).encode()
        req = urllib.request.Request(f"{API}/{metodo}", data=data, headers={"Content-Type": "application/json"})
    else:
        borde = uuid.uuid4().hex
        cuerpo = b""
        for k, v in campos.items():
            cuerpo += f"--{borde}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode()
        nombre_campo, ruta = archivo
        cuerpo += (f"--{borde}\r\nContent-Disposition: form-data; name=\"{nombre_campo}\"; filename=\"{Path(ruta).name}\"\r\n"
                   f"Content-Type: application/octet-stream\r\n\r\n").encode() + Path(ruta).read_bytes() + f"\r\n--{borde}--\r\n".encode()
        req = urllib.request.Request(f"{API}/{metodo}", data=cuerpo, headers={"Content-Type": f"multipart/form-data; boundary={borde}"})
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            res = json.loads(r.read())
    except urllib.error.HTTPError as e:
        res = json.loads(e.read() or b"{}")
    if not res.get("ok"):
        sys.exit(f"Telegram respondio error en {metodo}: {res.get('description', res)}")
    return res


def comprimir(video):
    mb = os.path.getsize(video) / 1048576
    if mb <= 48:
        return video
    out = Path(tempfile.mkdtemp()) / (Path(video).stem + "_tg.mp4")
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video], capture_output=True, text=True).stdout)
    kbps = int(44 * 8192 / dur) - 160                      # deja ~44 MB para el video
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-c:v", "libx264", "-preset", "medium", "-b:v", f"{kbps}k", "-maxrate", f"{kbps}k",
                    "-bufsize", f"{2 * kbps}k", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(out)], check=True)
    return str(out)


ap = argparse.ArgumentParser()
ap.add_argument("--texto"); ap.add_argument("--foto"); ap.add_argument("--video"); ap.add_argument("--caption", default="")
a = ap.parse_args()
if a.texto:
    llamar("sendMessage", {"chat_id": CHAT, "text": a.texto})
if a.foto:
    llamar("sendPhoto", {"chat_id": CHAT, "caption": a.caption}, ("photo", a.foto))
if a.video:
    v = comprimir(a.video)
    llamar("sendVideo", {"chat_id": CHAT, "caption": a.caption, "supports_streaming": "true", "width": 1080, "height": 1920}, ("video", v))
print("enviado")
