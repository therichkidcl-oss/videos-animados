# Transcribe el audio en ingles (britanico) de las clases del modulo organico con palabras y tiempos.
# Guarda trans/c<n>.json {"dur", "segs":[{"s","e","t","w":[[pal,s,e,p]]}]} y trans/c<n>.txt legible.
# Uso: python transcribir_en.py [modelo] [n ...]
import json, subprocess, sys, time
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel

R = Path(__file__).resolve().parent
modelo = sys.argv[1] if len(sys.argv) > 1 else "medium"
ns = sys.argv[2:] or ["2", "3", "4", "5", "6"]
m = WhisperModel(modelo, device="cpu", compute_type="int8", cpu_threads=16)
PROMPT = ("British English lesson about growing AI influencer models on Instagram, Threads, TikTok and Fanvue: "
          "niche, target audience, personality, marketing, organic growth, warming up an account, shadowban, subscribers, OnlyFans.")

for n in ns:
    src = R / "orig" / f"c{n}.mp4"
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32)
    t0 = time.time()
    segs, info = m.transcribe(a, language="en", initial_prompt=PROMPT, word_timestamps=True, beam_size=5,
                              vad_filter=True, condition_on_previous_text=True)
    out = []
    for s in segs:
        out.append({"s": round(s.start, 2), "e": round(s.end, 2), "t": s.text.strip(),
                    "w": [[w.word.strip(), round(w.start, 2), round(w.end, 2), round(w.probability, 2)] for w in (s.words or [])]})
    (R / "trans" / f"c{n}.json").write_text(json.dumps({"dur": len(a) / 16000, "segs": out}, ensure_ascii=False), encoding="utf-8")
    txt = "\n".join(f"[{int(s['s'] // 60)}:{s['s'] % 60:05.2f}] {s['t']}" for s in out)
    (R / "trans" / f"c{n}.txt").write_text(txt, encoding="utf-8")
    print(f"clase {n}: {len(out)} segmentos, {sum(len(s['t'].split()) for s in out)} palabras, {time.time() - t0:.0f} s", flush=True)
