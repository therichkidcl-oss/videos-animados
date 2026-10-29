#!/usr/bin/env bash
# Trae del Oracle cada <n>_src.mp4 (fuente para animar) apenas esta listo, hasta tener las 23 clases. Luego lo borra alla.
cd "$(dirname "$0")"
# El servidor y la llave van en el .env de la raiz (no se sube a git): ORACLE_SSH=usuario@servidor y ORACLE_KEY=ruta.
leer() { grep -m1 "^$1=" ../.env 2>/dev/null | cut -d= -f2- | tr -d '\r'; }
K="${ORACLE_KEY:-$(leer ORACLE_KEY)}"; H="${ORACLE_SSH:-$(leer ORACLE_SSH)}"; RD=/home/ubuntu/tiktokshop
[ -n "$K" ] && [ -n "$H" ] || { echo "Falta ORACLE_SSH y ORACLE_KEY en .env"; exit 1; }
while true; do
  lista=$(ssh -i "$K" -o ConnectTimeout=20 $H "cd $RD && ls *_src.mp4 2>/dev/null; grep -c '^FIN' fuente.log" 2>/dev/null)
  fin=$(echo "$lista" | tail -1)
  for f in $(echo "$lista" | sed '$d'); do
    [ -f "orig/$f" ] && continue
    scp -q -i "$K" "$H:$RD/$f" "orig/$f.part" && mv "orig/$f.part" "orig/$f" && echo "traida $f $(date +%H:%M)"
  done
  n=$(ls orig/*_src.mp4 2>/dev/null | wc -l)
  if [ "$fin" = "1" ] && [ "$n" -ge 22 ]; then echo "FUENTES LISTAS ($n) $(date +%H:%M)"; break; fi
  sleep 45
done
