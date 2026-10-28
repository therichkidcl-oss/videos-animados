#!/usr/bin/env bash
# Espera hasta que aparezca un hecho_*.txt nuevo en cola/ (o 45 min) y muestra cual fue.
cd "$(dirname "$0")"
antes=$(ls cola/hecho_*.txt 2>/dev/null | wc -l)
for i in $(seq 1 90); do
  sleep 30
  ahora=$(ls cola/hecho_*.txt 2>/dev/null | wc -l)
  [ "$ahora" -gt "$antes" ] && break
done
ls -t cola/hecho_*.txt | head -$(( ahora - antes > 0 ? ahora - antes : 1 )) | while read f; do echo "== $f"; cat "$f"; done
tail -2 cola.log
