# Lista las palabras normalizadas (como las busca tp) con su tiempo en un rango. Uso: python palabras.py <n> <t0> <t1>
import json, sys, unicodedata
def nrm(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
    return "".join(c for c in s if c.isalnum() or c == "-")
n, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
d = json.load(open(f"trans/{n}.json", encoding="utf-8"))
print(" ".join(f"{nrm(w[0])}@{w[1]:.1f}" for s in d["segs"] for w in s["w"] if a <= w[1] <= b))
