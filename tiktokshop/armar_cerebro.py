# Arma el "cerebro" del curso TikTok Shop dentro de la carpeta de entrega: ficha de cada leccion, modulos (orden
# original de Ani & David), transcripciones, portadas, PDFs, curso.json y el prompt para el chat que lo sube.
# Uso: python armar_cerebro.py
import json, shutil, subprocess
from pathlib import Path

R = Path(__file__).resolve().parent
VID = Path(r"C:\Users\Reimo\Videos\Estudio IA-HUB\TikTok Shop")
DEST = VID / "CEREBRO DEL CURSO"
ANIM = R.parent / "animaciones"

NOMBRES = dict(l.strip().split("|", 1) for l in (R / "nombres.txt").read_text(encoding="utf-8").splitlines() if "|" in l)

MODULOS = [
    ("Bienvenida", ["01"]),
    ("Tu cuenta y tus primeros 5.000 seguidores", ["02", "03", "04"]),
    ("Entra a TikTok Shop", ["05", "06", "07", "08", "09"]),
    ("Tu vitrina y tus muestras", ["10", "11", "12", "12_1", "13"]),
    ("Publica y elige bien", ["14", "15"]),
    ("Trabaja con marcas", ["16", "17"]),
    ("Tus numeros y tu cuenta", ["18", "19", "20", "21"]),
    ("Codigo viral", ["22"]),
]

# titulo para mostrar (con ñ), formato, descripcion corta, lo que aprende el alumno y avisos internos (NO publicar)
L = {
 "01": ("Bienvenida al curso", "Ani a camara",
  "Ani te presenta el curso y como sacarle provecho: avanzar modulo por modulo, sin saltarte pasos, y ejecutar cada clase antes de pasar a la siguiente.",
  ["El error mas comun: querer aprender todo al mismo tiempo", "El curso va paso a paso: cada modulo se apoya en el anterior",
   "La regla: si la clase pide configurar, investigar o publicar, hazlo antes de avanzar",
   "Cada clase trae explicacion + tutorial paso a paso en pantalla", "Encuentros semanales con la comunidad para dudas y estrategias"],
  ["Promete encuentros semanales con la comunidad: si se vende, hay que cumplirlo."]),
 "02": ("Crea y optimiza tu cuenta", "Ani a camara + tutorial en el celular",
  "Tu cuenta de TikTok Shop es una cuenta de ventas, no personal. Aprende a crear un correo exclusivo, abrir la cuenta correcta y dejar foto, nombre y descripcion listos para las marcas.",
  ["Trata la cuenta como cuenta de ventas: nada de contenido personal ni de otros temas",
   "Crea un Gmail exclusivo para TikTok Shop (registros y contratos con marcas)",
   "Usa una cuenta vieja solo si no tiene otro nicho; si no, crea una desde cero",
   "Agregar cuenta con correo (no con telefono) y cambiar entre cuentas",
   "Foto con tu rostro, nombre y usuario con tu nombre real", "Descripcion: a que te dedicas + \"Collab:\" con tu correo"], []),
 "03": ("Estrategia 1 para llegar a 5.000 seguidores", "Presentadora en selfie vertical",
  "Primera estrategia para llegar a los 5.000 seguidores que pide TikTok Shop: un video cantando un audio viral en español, con texto de seguimiento mutuo, impulsado con una promocion pagada.",
  ["Lo graba una mujer: segun la clase consigue mas alcance y un costo por seguidor mas bajo",
   "Audio en tendencia y en español; video expresivo cantando la cancion",
   "En pantalla y en la descripcion: \"#Teamwork\" y \"Sigueme y te sigo de vuelta\", letras blancas grandes",
   "Promocion: tres puntitos > Aumentar vistas > Mas seguidores > presupuesto del medio > Personalizar",
   "US$30 por dia durante 3 dias (US$90 en total)", "Meta: costo por seguidor bajo US$0,15",
   "Solo para cuentas de TikTok Shop, no para cuentas de nicho; al llegar a 5.000, ocultar ese video"],
  ["Obliga a pagar unos US$90 de promocion.",
   "Pide un video \"un poco sensual\": choca con la regla 5 de la clase 9 (nada sexualizado).",
   "El seguimiento mutuo (#teamwork) TikTok lo puede tomar como interaccion no autentica."]),
 "04": ("Estrategia 2 para llegar a 5.000 seguidores", "Tutorial en el celular",
  "Segunda estrategia de seguidores: tomar un video viral de baile, editarlo en CapCut con el texto de seguimiento mutuo y publicarlo con la misma descripcion.",
  ["Busca \"mujer bailando viral\" y elige un video que no sea exagerado",
   "Copia el enlace y descargalo sin marca de agua (web TikTokio)",
   "En CapCut: \"SIGUEME Y TE SIGO DE VUELTA #TEAMWORK\" en mayusculas, fondo blanco, sin tapar la cara",
   "Exporta y publica con el mismo texto en la descripcion"],
  ["Ensena a resubir videos de otras personas: contradice la regla 6 de la clase 9 (\"no copies videos de otros "
   "creadores\") y puede traer infracciones por contenido no original o derechos de autor."]),
 "05": ("Como aplicar al programa de TikTok Shop", "Tutorial en el celular",
  "Con tus 5.000 seguidores, aplica al programa correcto: TikTok Shop para creadores (no TikTok Shop Seller).",
  ["Entra a TikTok Studio (directo o por las tres rayitas)", "Monetizacion > Programas para ti",
   "Aplica a \"TikTok Shop para creadores\"", "Ojo: TikTok Shop Seller es para vender productos propios, no para promocionar",
   "Completa lo que te pida y espera la aprobacion"], []),
 "06": ("Optimizacion de perfil", "Tutorial en el celular",
  "Deja tu perfil como carta de presentacion profesional para tu audiencia y para las marcas: foto, nombre, usuario y descripcion con tu correo de colaboraciones.",
  ["Nombre profesional (nombre y apellido, nada de apodos); una vez elegido, no lo cambies",
   "Usuario facil de recordar y en minusculas", "Descripcion relacionada con ventas (puedes apoyarte en ChatGPT)",
   "\"Collab:\" + tu correo exclusivo para que las marcas te escriban", "Checklist final: foto, nombre, usuario y descripcion"], []),
 "07": ("Cambiar nombre de usuario y del canal", "Tutorial en el celular",
  "Como cambiar el nombre de la cuenta y el nombre de usuario desde el lapicito de editar perfil.",
  ["Lapicito > Nombre > escribe > Guardar", "Lo mismo en Nombre de usuario",
   "Piensalo bien: despues de guardar no podras cambiarlo por 30 dias"], []),
 "08": ("Como poner tu metodo de pago", "Tutorial en el celular",
  "Configura donde te paga TikTok: la cuenta bancaria a tu nombre donde recibes tus ganancias cada miercoles.",
  ["TikTok Studio > TikTok Shop para creadores > Ver detalles > Ganancias", "Administracion de tarjetas > Transferencia bancaria",
   "Numero de ruta y numero de cuenta", "La cuenta debe estar a tu nombre y apellido legal",
   "TikTok deposita automaticamente los miercoles"],
  ["\"Numero de ruta\" existe solo en bancos de EE. UU.: esta clase no sirve tal cual fuera de EE. UU."]),
 "09": ("Politicas y normas", "David a camara",
  "Las 7 reglas que debes respetar para vender en TikTok Shop sin poner en riesgo tu cuenta.",
  ["1. Sin afirmaciones falsas o exageradas: habla desde tu experiencia",
   "2. Cuidado con salud y bienestar: nada de \"cura, trata o previene\"",
   "3. Lo que muestras debe ser exactamente lo que vendes", "4. Los menores no venden: explica el adulto",
   "5. Nada de contenido sexualizado", "6. Nada de contenido engañoso, copiado o repetitivo",
   "7. La venta se queda dentro de TikTok Shop (sin WhatsApp ni links externos)",
   "Una cuenta sana vale mas que un video viral mal hecho"], []),
 "10": ("Como orientarte en TikTok Studio", "Tutorial en el celular",
  "Recorrido por tu panel de TikTok Shop para creadores: herramientas, campañas, ganancias, muestras, invitaciones y metricas principales.",
  ["Entrar: TikTok Studio > TikTok Shop para creadores (boton rosado)",
   "Kit de herramientas: Mercado de productos, Administrar vitrina y Campañas de creadores",
   "Campañas con tareas que pagan (ejemplo: US$100 por tarea)",
   "Ganancias, Gestionar muestras (con plazos para publicar) e Invitaciones de colaboracion",
   "Panel de arriba: GMV atribuido, articulos vendidos y comision", "Puntaje de seleccion de productos y que videos te vendieron"], []),
 "11": ("Agregar productos a la vitrina", "David a camara + tutorial en el celular",
  "Tu vitrina es parte de tu estructura de ventas. David explica por que agregar productos con estrategia y luego muestra paso a paso como hacerlo.",
  ["No es agregar por agregar: vitrina estrategica con productos con potencial",
   "La vitrina le dice a TikTok que contenido haces y a que audiencia atraes",
   "Errores comunes: cualquier producto, sin analizar o solo por cantidad",
   "TikTok Studio > TikTok Shop para creadores > Ver detalles > Mercado de productos",
   "Lupa > abre el producto > flechita > Agregar a la vitrina", "Revisalo en Vitrina desde la pantalla principal"], []),
 "12": ("Tipos de muestra", "David a camara + tutorial en el celular",
  "Los 3 tipos de muestra de TikTok Shop y como funciona cada una: 100% aprobada, gratis y reembolsable.",
  ["100% aprobada: la pides y queda aprobada al instante", "Gratis: el seller revisa tu perfil y decide",
   "Reembolsable: la compras y te devuelven el 100% al generar 3 ventas",
   "Donde verlas: Mercado de productos > Recomendado para ti > filtros de muestras",
   "Elige productos con evaluacion sobre 4 (ideal 4,3 o mas) y muchas ventas"], []),
 "12_1": ("Como pedir muestras", "Tutorial en el celular",
  "Paso a paso para pedir muestras gratis y 100% aprobadas, elegir bien la comision y seguir el estado de tu solicitud.",
  ["Vitrina no es lo mismo que Tus pedidos: sin el producto en la vitrina no puedes anclar el carrito",
   "Comision ideal sobre 15% y al menos US$5 por venta", "Si buscas gratis, evita la reembolsable y pide la muestra gratuita",
   "Obtener muestra gratuita > variante > Solicitar > Enviar",
   "Seguimiento: Mensajes > Notificaciones del sistema (pendiente de aprobacion)",
   "Para empezar, busca \"muestras 100% aprobadas\""], []),
 "13": ("Vende lo que ya tienes en casa", "Ani a camara + tutorial en el celular",
  "No necesitas esperar muestras ni invertir: muchos productos que ya tienes en casa estan en TikTok Shop. Encuentralos con una foto y agregalos a tu vitrina.",
  ["Belleza, cocina, organizacion, tecnologia, hogar y accesorios ya estan en TikTok Shop",
   "Busqueda por foto: lupa > camarita > foto del producto", "Elige el que sea identico al tuyo",
   "Desliza el menu hacia arriba y agregalo a tu vitrina", "Se acaba la excusa \"no tengo productos\""], []),
 "14": ("Como añadir el enlace del producto a tu video", "Tutorial en el celular",
  "Antes de publicar: descripcion, hashtags, portada con hook y el enlace del producto correcto desde tu vitrina.",
  ["Descripcion y hashtags del producto (apoyate en ChatGPT)", "Portada con un hook que llame la atencion",
   "Agregar enlace > Producto > elige el que esta bajo \"Tu vitrina\", no la \"Sugerencia de producto\"",
   "Busca el producto y toca Agregar; puedes editar el nombre si trae caracteres no permitidos",
   "Icono amarillo = enlace añadido; revisa el checklist antes de publicar"], []),
 "15": ("Como elegir un producto ganador", "Tutorial en el celular",
  "Como analizar si un producto vale la pena: reseñas, calificacion del producto y de la tienda, ventas y comision. Termina pidiendo la muestra y siguiendo el pedido.",
  ["Mercado de productos > lupa: revisa evaluaciones, reseñas positivas y unidades vendidas",
   "Sello \"Mas vendido\": analiza del puesto 1 al 20", "Regla: mas de 4,2 en reseñas positivas y con stock",
   "Revisa la tienda: estrella de oro, seguidores, ventas y evaluaciones",
   "Pide la muestra gratuita y sigue el estado en Mensajes > Notificaciones del sistema"], []),
 "16": ("Como contactar a los sellers o marcas", "Tutorial en el celular",
  "Como escribirle directamente al seller de un producto, por ejemplo para pedir mas comision o resolver un problema.",
  ["Abre el producto desde tu vitrina", "Muestra gratis > desliza las opciones > Colaborar con el vendedor",
   "Comunicarse con el vendedor: se abre el chat de la tienda", "Envia primero el producto y despues tu mensaje",
   "Siempre con respeto y consistencia"], []),
 "17": ("Como dar el ad code al seller", "Tutorial en el celular",
  "Genera el codigo de anuncio (ad code) de tu video para que el seller pueda pautarlo con publicidad.",
  ["En tu video: tres puntitos > Ajustes de publicidad", "Activa \"Ad authorization\"",
   "Recomendado: 30 dias (renovable) para proteger tu cuenta si el producto falla", "Guarda; luego Video code > Manage > Copy code",
   "Compartelo con el seller: asi corre anuncios con tu video"], []),
 "18": ("Que es el GMV, la comision y el PPI", "Tutorial en el celular",
  "Entiende los 3 numeros clave de tu panel: GMV, comision y PPI (puntaje de seleccion de productos).",
  ["GMV: lo que las marcas venden gracias a ti", "Articulos vendidos y comision estimada (lo que ganas tu)",
   "PPI: puntaje de seleccion de productos (ejemplo: 4,8 de 5)",
   "Un buen PPI: la tienda entrega a tiempo, cumple expectativas y tiene buena calidad",
   "Calificacion de clientes: excelente desde 97%"], []),
 "19": ("Estado de cuenta y apelar infracciones", "Tutorial en el celular",
  "Revisa la salud de tu cuenta, tus puntos e infracciones, y como apelar una sancion.",
  ["TikTok Studio > TikTok Shop para creadores > baja hasta Estado de cuenta",
   "Revisa si la cuenta esta en buen estado y si te quitaron puntos", "Infracciones: revisa cada caso y si se puede apelar",
   "Para apelar: redacta con ChatGPT por que no mereces la sancion", "Adjunta capturas de varios momentos del video"], []),
 "20": ("Estadisticas de tus videos de ventas", "Tutorial en el celular",
  "Analiza las estadisticas de un video de ventas y entiende por que, despues de los 5.000 seguidores, lo que importa es el contenido que vende.",
  ["Reproduce tu video > Mas estadisticas",
   "Resumen: visualizaciones, tiempo total y nuevos seguidores (posibles compradores)",
   "Fuente de trafico: casi todo viene del Para ti", "Espectadores: 83% nuevos y 100% no te seguian",
   "La leccion: un video de medio millon de vistas vendio sin ningun seguidor"], []),
 "21": ("Como ver tus metricas", "Tutorial en el celular",
  "Lee las analiticas de tu cuenta en TikTok Studio para saber que mejorar y cuando publicar.",
  ["TikTok Studio > Analiticas (ultimos 7 dias)", "Visualizaciones, visitas al perfil, me gusta, comentarios y compartidos",
   "Fuente de trafico: lo importante es salir en el Para ti", "Pestañas Contenido, Espectadores y Seguidores",
   "Hora de mayor actividad: publica en ese horario"], []),
 "22": ("Codigo viral para videos de TikTok Shop", "Presentadora en selfie vertical",
  "El metodo de Ani & David para crear videos que se hacen virales y venden: 5 estrategias, la formula hook + estrategia + llamado a la accion y el sistema de testear y escalar.",
  ["5 estrategias: replica de virales, hate como interaccion, storytelling, entretenimiento primero y CTAs con urgencia",
   "Formula: hook (3 primeros segundos) + una estrategia + llamado a la accion",
   "Ideas de hook: un chisme, una frase para parar, algo absurdo, un secreto",
   "Testea y escala: 10 videos del mismo producto con hooks distintos; replica el ganador en 10 mas",
   "Encuentra tu linea de viralidad y sigue creando nuevas", "Complementa con la clase escrita y los 2 PDF del modulo"], []),
}

RECURSOS = [
    ("manual_viral.pdf", "Manual Metodo Viral de Ani y David (base para IA).pdf",
     "6 paginas. Manual de entrenamiento para una IA creadora de contenido: arquitectura del video (hook > estrategia > "
     "producto > CTA) y las 5 estrategias del metodo. Va con la clase 22."),
    ("hooks.pdf", "Hooks y angulos que venden en TikTok Shop.pdf",
     "8 paginas (en imagenes). Hooks y angulos de venta listos para usar. Va con la clase 22."),
]


def mmss(s):
    s = int(round(s)); return f"{s // 60}:{s % 60:02d}"


def probe(f):
    d = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration,size", "-of", "json", str(f)],
                                  capture_output=True, text=True, check=True).stdout)["format"]
    return float(d["duration"]), int(d["size"])


def tutorial_desde(k):
    f = ANIM / f"tts-clase{k}" / "trabajo" / "media.json"
    if not f.exists():
        return None
    med = json.loads(f.read_text(encoding="utf-8"))["media"]
    tipos = [m[2] for m in med]
    if "pres" in tipos and "cel" in tipos:
        return next(m[0] for m in med if m[2] == "cel")
    return None


for sub in ("transcripciones", "portadas", "recursos"):
    (DEST / sub).mkdir(parents=True, exist_ok=True)

curso = {"curso": "TikTok Shop para creadores (metodo de Ani & David)", "marca_original": "Imperio TikTok Shop",
         "carpeta_videos": str(VID), "orden": "orden original de los autores (1, 2, ... 12, 12.1, 13 ... 22); no reordenar",
         "modulos": [], "recursos": []}
total = 0
siguiente_n = 0
for mi, (mtit, claves) in enumerate(MODULOS, 1):
    mod = {"numero": mi, "titulo": mtit, "lecciones": []}
    for k in claves:
        siguiente_n += 1
        nombre = NOMBRES[k]
        mp4 = VID / f"{nombre}.mp4"
        dur, size = probe(mp4)
        total += dur
        tit, formato, desc, puntos, avisos = L[k]
        tr = DEST / "transcripciones" / f"{nombre}.txt"
        tr.write_text(f"{nombre}\n(Los tiempos coinciden con el video final: la voz es la original y empieza en 0:00)\n\n"
                      + (R / "trans" / f"{k}.txt").read_text(encoding="utf-8"), encoding="utf-8")
        por = DEST / "portadas" / f"{nombre}.jpg"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "2.5", "-i", str(mp4), "-frames:v", "1",
                        "-vf", "scale=1280:-2", "-q:v", "2", str(por)], check=True)
        td = tutorial_desde(k)
        mod["lecciones"].append({
            "orden": siguiente_n, "clase": k.replace("_", "."), "titulo": tit, "archivo": str(mp4),
            "duracion_s": round(dur, 1), "duracion": mmss(dur), "peso_mb": round(size / 2**20),
            "formato": formato, "tutorial_en_pantalla_desde": mmss(td) if td else None,
            "descripcion": desc, "lo_que_aprendes": puntos, "avisos_internos_no_publicar": avisos,
            "transcripcion": str(tr), "portada": str(por),
            "recursos": [str(DEST / "recursos" / r[1]) for r in RECURSOS] if k == "22" else []})
    curso["modulos"].append(mod)

for src, dst, desc in RECURSOS:
    shutil.copy2(R / src, DEST / "recursos" / dst)
    curso["recursos"].append({"archivo": str(DEST / "recursos" / dst), "descripcion": desc, "modulo": 8, "clase": "22"})
curso["duracion_total"] = mmss(total)
curso["total_lecciones"] = siguiente_n
(DEST / "curso.json").write_text(json.dumps(curso, ensure_ascii=False, indent=2), encoding="utf-8")

# ---------- LEEME ----------
md = [f"# Cerebro del curso: TikTok Shop para creadores (Ani & David)", "",
      f"Todo lo necesario para subir el curso. {siguiente_n} lecciones, {len(MODULOS)} modulos, {mmss(total)} de video en total.",
      "Los datos estructurados estan en `curso.json` (mismo contenido que este archivo, listo para automatizar).", "",
      "## Que es", "",
      "- Curso practico de TikTok Shop para AFILIADOS (creadores que promocionan productos de otras marcas y ganan comision).",
      "- Autores originales: Ani y David (marca \"Imperio TikTok Shop\"). Material fuente en su Drive:",
      "  https://drive.google.com/drive/folders/1txSPDswlLPNfpFO-vTiUuQY7fhRWO-fj",
      "- Los videos fueron re-editados: se mantiene la VOZ ORIGINAL y la persona o la grabacion del celular a un lado,",
      "  con animaciones del contenido a la derecha. Sin logos agregados.",
      "- Cada video abre con \"CLASE N\" y cierra con \"Clase N completada · Siguiente: <la clase que sigue>\".",
      "- Formato: MP4 H.264 1920x1080 a 30 fps, audio AAC a -14 LUFS (volumen parejo entre clases).", "",
      "## OJO antes de venderlo: paises", "",
      "- El curso esta hecho para TikTok Shop de ESTADOS UNIDOS (latinos que viven alla): cobro con \"numero de ruta\"",
      "  (bancos de EE. UU.), dolares, productos y tiendas de EE. UU., requisito de 5.000 seguidores del programa de EE. UU.",
      "- En Latinoamerica, TikTok Shop solo opera en Mexico y Brasil (y con otros requisitos de cobro). Chile, Colombia,",
      "  Argentina, Peru, etc. NO pueden usar el programa de afiliados.",
      "- Recomendacion: avisar los paises en la pagina de venta para evitar compras que no se pueden usar y reembolsos.", "",
      "## Modulos y lecciones (ORDEN ORIGINAL de los autores, no reordenar)", "",
      "| Modulo | Lecciones | Duracion |", "|---|---|---|"]
for m in curso["modulos"]:
    md.append(f"| {m['numero']}. {m['titulo']} | " + " · ".join(f"{l['clase']} {l['titulo']}" for l in m["lecciones"])
              + f" | {mmss(sum(l['duracion_s'] for l in m['lecciones']))} |")
md += ["", "Recursos del modulo 8 (van con la clase 22): los 2 PDF de la carpeta `recursos/`.", "",
       "## Ficha de cada leccion", "",
       "Cada ficha trae: archivo, duracion, formato, descripcion (lista para pegar en la plataforma), lo que aprende el",
       "alumno y avisos internos (son para nosotros: NO publicarlos).", ""]
for m in curso["modulos"]:
    md += [f"### Modulo {m['numero']}: {m['titulo']}", ""]
    for l in m["lecciones"]:
        md += [f"#### Clase {l['clase']} · {l['titulo']}", "",
               f"- Archivo: `{Path(l['archivo']).name}`",
               f"- Duracion: {l['duracion']} · {l['peso_mb']} MB · {l['formato']}"
               + (f" (el tutorial en pantalla parte en {l['tutorial_en_pantalla_desde']})" if l["tutorial_en_pantalla_desde"] else ""),
               f"- Portada: `portadas/{Path(l['portada']).name}` · Transcripcion: `transcripciones/{Path(l['transcripcion']).name}`", "",
               f"**Descripcion:** {l['descripcion']}", "", "**Lo que aprendes:**", ""]
        md += [f"- {p}" for p in l["lo_que_aprendes"]]
        if l["recursos"]:
            md += ["", "**Recursos:** " + " · ".join(f"`recursos/{Path(r).name}`" for r in l["recursos"])]
        if l["avisos_internos_no_publicar"]:
            md += ["", "**Aviso interno (no publicar):**", ""] + [f"- {a}" for a in l["avisos_internos_no_publicar"]]
        md.append("")
md += ["## Recursos (PDF)", ""] + [f"- `recursos/{d}`: {x}" for _, d, x in RECURSOS] + ["",
       "## Contenido de esta carpeta", "",
       "- `00 - LEEME PRIMERO.md`: este archivo.",
       "- `curso.json`: modulos, lecciones, rutas, duraciones, descripciones y avisos en formato estructurado.",
       "- `transcripciones/`: texto completo de cada clase con tiempos (coinciden con el video final).",
       "- `portadas/`: un cuadro 1280x720 del inicio de cada video (titulo de la clase), sirve de miniatura.",
       "- `recursos/`: los 2 PDF del curso.",
       "- `PROMPT PARA EL CHAT QUE LO SUBE.md`: texto listo para pegar en el chat que hara la subida.", "",
       "## Si hay que corregir un video", "",
       "El proyecto editable esta en `C:\\Users\\Reimo\\Documents\\Proyectos\\estudio-videos\\tiktokshop\\` (un archivo",
       "`v<n>.js` por clase; `bash armar.sh <n>` para revisar y `cola/listo_<n>` + `cola_render.sh` para renderizar).",
       "La copia de los originales esta en el Drive de Reimo: carpeta \"TikTok Shop - originales para animar\".", "",
       "## Pendiente (no hecho todavia)", "",
       "- Nombre final del curso dentro de la plataforma.",
       "- Portadas de cada MODULO (solo hay miniaturas por leccion).",
       "- Texto de la pagina de venta con el aviso de paises."]
(DEST / "00 - LEEME PRIMERO.md").write_text("\n".join(md) + "\n", encoding="utf-8")

# ---------- PROMPT ----------
prompt = f"""Proyecto IA-HUB. Lee CLAUDE.md.

TAREA: subir a IA HUB un curso nuevo de TikTok Shop ({siguiente_n} lecciones en {len(MODULOS)} modulos, {mmss(total)} de video).
Los videos ya estan renderizados y listos; no hay que editarlos.

Todo el material esta en: {DEST}
1. Lee completo "00 - LEEME PRIMERO.md" y usa "curso.json" como fuente de datos (rutas, duraciones, descripciones).
2. Respeta los modulos y el ORDEN ORIGINAL tal cual estan (1, 2, 3 ... 12, 12.1, 13 ... 22). No reordenes lecciones.
3. Cada leccion lleva su video, su descripcion y la lista "lo que aprendes". Los "avisos internos" NO se publican.
4. La clase 22 lleva como descargas los 2 PDF de la carpeta recursos/.
5. Antes de subir, revisa como se suben hoy los cursos en IA HUB (CLAUDE.md puntos 12 y 14, y las memorias de videos
   privados en Drive, trozos de video, portadas de modulo y bloques de descripcion) y sigue ese mismo camino.
6. Deja el curso visible SOLO para admins hasta que yo lo revise y te de el OK.
7. El curso es para TikTok Shop de EE. UU.: cuando lleguemos a la venta, hay que avisar los paises (ver el LEEME).
"""
(DEST / "PROMPT PARA EL CHAT QUE LO SUBE.md").write_text(prompt, encoding="utf-8")
print("cerebro listo:", DEST, "|", siguiente_n, "lecciones |", mmss(total))
