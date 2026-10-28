#!/usr/bin/env bash
# Prepara (si falta), arma y valida una clase doblada del modulo organico; deja hojas de revision cada PASO s.
# Uso: bash armar_org.sh <n> [paso]
cd "$(dirname "$0")"; N=$1; PASO=${2:-8}
P=../animaciones/org-c$N
[ -f "$P/trabajo/tiempos.json" ] || PYTHONIOENCODING=utf-8 python preparar_org.py $N || exit 1
PYTHONIOENCODING=utf-8 python hacer_plantillas.py > /dev/null
cd $P && PYTHONIOENCODING=utf-8 python ../../organico/parche_org.py $N || exit 1
DUR=$(python -c "import re;h=open('index.html',encoding='utf-8').read();print(re.search(r'const CONFIG = \{ dur: ([\d.]+)',h).group(1))")
TS=$(python -c "d=$DUR;print(' '.join(str(round(x,1)) for x in [2+i*(d-2)/12 for i in range(13)]))")
node tools/_dbg.mjs $TS 2>&1 | grep -v "404\|logo sin cargar" | head -20
cd ../curso-podcast && bash _revisar.sh org-c$N $PASO 2 2>&1 | tail -1
