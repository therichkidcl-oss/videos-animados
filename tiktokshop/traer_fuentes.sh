#!/usr/bin/env bash
# Trae del Oracle cada <n>_src.mp4 (fuente para animar) apenas esta listo, hasta tener las 23 clases. Luego lo borra alla.
cd "$(dirname "$0")"
K="C:/Users/Reimo/Downloads/ssh-key-2026-07-18.key"; H=ubuntu@148.116.107.133; RD=/home/ubuntu/tiktokshop
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
