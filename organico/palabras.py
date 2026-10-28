# Lista las palabras alineadas de una clase (para escribir las anclas de v<n>.js). Uso: python palabras.py <n> [t0] [t1]
import json, sys, unicodedata
from pathlib import Path

n = sys.argv[1]; t0 = float(sys.argv[2]) if len(sys.argv) > 2 else 0; t1 = float(sys.argv[3]) if len(sys.argv) > 3 else 1e9
pal = json.loads((Path(__file__).resolve().parent.parent / "animaciones" / f"org-c{n}" / "trabajo" / "tiempos.json").read_text(encoding="utf-8"))
nrm = lambda s: "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn" and (c.isalnum() or c == "-"))
fr = -1
for p in pal:
    if t0 <= p["s"] <= t1:
        if p["frase"] != fr: fr = p["frase"]; print(f"\n[{fr}] ", end="")
        print(f"{nrm(p['w'])}@{p['s']:.1f}", end=" ")
print()
