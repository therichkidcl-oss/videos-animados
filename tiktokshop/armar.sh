#!/usr/bin/env bash
# Prepara (si falta), arma y valida una clase; deja hojas de revision cada PASO s. Uso: bash armar.sh <n> [paso]
cd "$(dirname "$0")"; N=$1; PASO=${2:-6}
P=../animaciones/tts-clase$N
[ -f "$P/trabajo/media.json" ] || python preparar.py $N || exit 1
cd $P && python ../../tiktokshop/parche_tts.py $N || exit 1
DUR=$(python -c "import json;print(json.load(open('trabajo/media.json'))['dur'])")
TS=$(python -c "d=$DUR;print(' '.join(str(round(x,1)) for x in [2+i*(d-2)/12 for i in range(13)]))")
node tools/_dbg.mjs $TS 2>&1 | grep -v "404\|logo sin cargar" | head -20
cd ../curso-podcast && bash _revisar.sh tts-clase$N $PASO 2 2>&1 | tail -1
