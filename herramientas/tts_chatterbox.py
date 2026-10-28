# Voz local con Chatterbox Multilingual V3 (MIT), en CPU. Corre con el entorno .venv-chatterbox (Python 3.11).
# Clona la misma referencia que usa Qwen (voces/<voz>/referencia.wav) para comparar en igualdad de condiciones.
#
#    .venv-chatterbox\Scripts\python.exe herramientas/tts_chatterbox.py --voz narrador-a --trabajos trabajos.json
#    trabajos.json = [{"texto": "...", "salida": "ruta.wav"}, ...]
import argparse
import json
import os
import time
from pathlib import Path

import torch
import torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

RAIZ = Path(__file__).resolve().parent.parent
torch.set_num_threads(max(1, os.cpu_count() // 2))


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--voz", required=True)
    p.add_argument("--trabajos", required=True)
    p.add_argument("--exageracion", type=float, default=0.5)
    p.add_argument("--cfg", type=float, default=0.5)
    a = p.parse_args()

    ref = str(RAIZ / "voces" / a.voz / "referencia.wav")
    trabajos = json.loads(Path(a.trabajos).read_text(encoding="utf-8"))
    t0 = time.time()
    modelo = ChatterboxMultilingualTTS.from_pretrained(device="cpu", t3_model="v3")
    print(f"modelo cargado en {time.time() - t0:.0f} s", flush=True)

    total_audio = 0.0
    total_gen = 0.0
    for t in trabajos:
        t0 = time.time()
        wav = modelo.generate(t["texto"], language_id="es", audio_prompt_path=ref,
                              exaggeration=a.exageracion, cfg_weight=a.cfg)
        Path(t["salida"]).parent.mkdir(parents=True, exist_ok=True)
        ta.save(t["salida"], wav, modelo.sr)
        dur = wav.shape[-1] / modelo.sr
        gen = time.time() - t0
        total_audio += dur
        total_gen += gen
        print(f"{Path(t['salida']).name}: {dur:.1f} s de audio en {gen:.0f} s (RTF {gen / dur:.2f})", flush=True)
    if total_audio:
        print(f"TOTAL: {total_audio:.1f} s de audio en {total_gen:.0f} s (RTF {total_gen / total_audio:.2f})", flush=True)


if __name__ == "__main__":
    main()
