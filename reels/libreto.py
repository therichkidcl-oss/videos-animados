# Libreto -> guion.json para la voz (cualquier nicho).
#   python reels/libreto.py animaciones/<proyecto>          # lee <proyecto>/libreto.txt y escribe <proyecto>/guion.json
#   python reels/libreto.py animaciones/<proyecto> --leer   # solo muestra el guion para leerlo (palabras y duracion)
#
# Formato de libreto.txt (texto plano, una frase por linea; las frases son las anclas de la animacion):
#   # titulo: Toros contra osos
#   # voz: reimo-v3                     (opcional; por defecto reimo-v3)
#   ## gancho                           (cada "## nombre" abre una escena; su audio sale aparte)
#   En el mercado hay dos animales peleando todo el dia...
#   ## cta
#   Si quieres aprender trading{tréiding}, comenta la palabra TRADING{tréiding} y te envio la informacion.
# Notacion: palabra{pronunciacion} -> la voz dice la pronunciacion y los subtitulos muestran la palabra
# (1%{uno por ciento}, $100{cien dólares}, 30:1{treinta a uno}, FOMO{fómo}, stop{stop} loss{los}).
import json, re, sys, unicodedata
from pathlib import Path

LLAVE = re.compile(r"(\S*?)\{([^}]*)\}")
PALABRAS_POR_SEG = 2.9                                  # ritmo medido de la voz reimo-v3 (con las pausas entre escenas)


def sin_tildes(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z ]", "", s).strip()


def hablado(f):          # lo que lee la voz
    return LLAVE.sub(lambda m: m.group(2), f)


def pantalla(f):         # guion para alinear: palabra visible + {pronunciacion sin tildes}
    return LLAVE.sub(lambda m: f"{m.group(1)}{{{sin_tildes(m.group(2))}}}" if m.group(1) else sin_tildes(m.group(2)), f)


def visible(f):          # como se lee en los subtitulos
    return LLAVE.sub(lambda m: m.group(1) or m.group(2), f)


def leer(ruta):
    meta, escenas = {}, []
    for ln in ruta.read_text(encoding="utf-8").splitlines():
        ln = ln.strip()
        if not ln: continue
        if ln.startswith("## "): escenas.append((ln[3:].strip().lower().replace(" ", "-"), [])); continue
        if ln.startswith("# "):
            k, _, v = ln[2:].partition(":"); meta[k.strip().lower()] = v.strip(); continue
        if not escenas: escenas.append(("gancho", []))
        escenas[-1][1].append(ln)
    return meta, escenas


if __name__ == "__main__":
    P = Path(sys.argv[1]); meta, escenas = leer(P / "libreto.txt")
    pal = sum(len(hablado(f).split()) for _, fr in escenas for f in fr)
    if "--leer" in sys.argv:
        print(f"### {meta.get('titulo', P.name)}  (~{pal} palabras, ~{round(pal / PALABRAS_POR_SEG)} s)\n")
        for eid, fr in escenas: print(f"[{eid}] " + " ".join(visible(f) for f in fr) + "\n")
        sys.exit()
    voz = {"proveedor": "qwen", "qwen": {"voz": meta.get("voz", "reimo-v3"), "modelo": "1.7B", "dtype": "bf16", "lote": 4}}
    g = {"titulo": meta.get("titulo", P.name), "voz": voz,
         "nota": "Reel vertical (kit general de reels). texto = lo que lee la voz; pantalla = guion para alinear (pronunciacion entre llaves).",
         "escenas": [{"id": f"{i:02d}-{eid}", "frases": [{"id": chr(97 + j), "texto": hablado(f), "pantalla": pantalla(f)} for j, f in enumerate(fr)]}
                     for i, (eid, fr) in enumerate(escenas)]}
    (P / "guion.json").write_text(json.dumps(g, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{P.name}/guion.json: {len(escenas)} escenas, {pal} palabras (~{round(pal / PALABRAS_POR_SEG)} s)")
