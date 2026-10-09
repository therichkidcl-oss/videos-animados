# Transcribe un audio en espanol con tiempos por palabra (faster-whisper en CPU).
# Uso: python transcribir.py <audio> <salida.json> [modelo]
# Salida: [{"text": "...", "start": 0.0, "end": 0.4}, ...]
import json
import sys

from faster_whisper import WhisperModel


def main():
    audio, salida = sys.argv[1], sys.argv[2]
    modelo = sys.argv[3] if len(sys.argv) > 3 else "small"
    m = WhisperModel(modelo, device="cpu", compute_type="int8")
    segmentos, _ = m.transcribe(audio, language="es", word_timestamps=True, beam_size=5)
    palabras = []
    for s in segmentos:
        for w in s.words or []:
            texto = w.word.strip()
            if texto:
                palabras.append({"text": texto, "start": round(w.start, 3), "end": round(w.end, 3)})
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(palabras, f, ensure_ascii=False)


if __name__ == "__main__":
    main()
