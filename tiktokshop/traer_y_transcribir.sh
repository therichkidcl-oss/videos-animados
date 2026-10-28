#!/usr/bin/env bash
# Trae del Oracle (a medida que terminan) la info, el audio 16k y la hoja de cada clase del curso TikTok Shop y la
# transcribe con Whisper medium. Termina cuando el Oracle dice FIN y todas estan transcritas.
cd "$(dirname "$0")"
K="C:/Users/Reimo/Downloads/ssh-key-2026-07-18.key"; H=ubuntu@148.116.107.133; RD=/home/ubuntu/tiktokshop
mkdir -p orig trans
while true; do
  listos=$(ssh -i "$K" -o ConnectTimeout=20 $H "cd $RD && ls *_hoja.jpg 2>/dev/null | sed 's/_hoja.jpg//'; grep -c '^FIN' prep.log" 2>/dev/null)
  fin=$(echo "$listos" | tail -1)
  for n in $(echo "$listos" | sed '$d'); do
    [ -f "orig/${n}_hoja.jpg" ] && continue
    scp -q -i "$K" "$H:$RD/${n}.json" "$H:$RD/${n}_16k.mp3" "$H:$RD/${n}_hoja.jpg" orig/ && echo "traida $n $(date +%H:%M)"
  done
  HF_HUB_OFFLINE=1 ../.venv-anim/Scripts/python.exe transcribir.py medium 2>&1 | grep -v -i warning
  falta=0; for f in orig/*_16k.mp3; do n=$(basename "$f" _16k.mp3); [ -f "trans/$n.json" ] || falta=1; done
  if [ "$fin" = "1" ] && [ "$falta" = "0" ]; then echo "TODO LISTO $(date +%H:%M)"; break; fi
  sleep 60
done
