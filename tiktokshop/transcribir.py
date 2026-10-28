# Transcribe las clases del curso TikTok Shop con palabras y tiempos (faster-whisper, CPU).
# Decodifica con ffmpeg a float32 (el av de .venv-anim falla con rutas) y guarda trans/<n>.json:
#   {"dur": s, "segs": [{"s","e","t","w":[[palabra, s, e, prob], ...]}]}  +  trans/<n>.txt legible con marcas de tiempo.
# Uso: python transcribir.py [modelo] [n ...]   (sin n = todas las de orig/ que falten)
import json
import subprocess
import sys
import time
from pathlib import Path

import numpy as np
from faster_whisper import WhisperModel

R = Path(__file__).resolve().parent
O, T = R / "orig", R / "trans"
T.mkdir(exist_ok=True)
modelo = sys.argv[1] if len(sys.argv) > 1 else "large-v3"
pedidas = sys.argv[2:]
m = WhisperModel(modelo, device="cpu", compute_type="int8", cpu_threads=16)
PROMPT = "Clase del curso Imperio TikTok Shop de Ani y David. TikTok Shop, TikTok Studio, seller, afiliados, vitrina, muestras, GMV, comision, ad code, hook, CTA."


def audio(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32)


for mp3 in sorted(O.glob("*_16k.mp3")):
    n = mp3.name.split("_16k")[0]
    if (pedidas and n not in pedidas) or (not pedidas and (T / f"{n}.json").exists()):
        continue
    t0 = time.time()
    a = audio(mp3)
    segs, info = m.transcribe(a, language="es", beam_size=5, word_timestamps=True, vad_filter=True, initial_prompt=PROMPT)
    out = []
    for s in segs:
        out.append({"s": round(s.start, 2), "e": round(s.end, 2), "t": s.text.strip(),
                    "w": [[w.word.strip(), round(w.start, 2), round(w.end, 2), round(w.probability, 2)] for w in (s.words or [])]})
    dur = len(a) / 16000
    (T / f"{n}.json").write_text(json.dumps({"dur": round(dur, 2), "segs": out}, ensure_ascii=False), encoding="utf-8")
    (T / f"{n}.txt").write_text("\n".join(f"[{int(s['s'] // 60)}:{s['s'] % 60:05.2f}] {s['t']}" for s in out), encoding="utf-8")
    print(f"{n}: {dur / 60:.1f} min de audio en {(time.time() - t0) / 60:.1f} min", flush=True)
