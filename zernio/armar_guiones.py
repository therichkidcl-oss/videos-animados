# Arma los guiones de las 6 clases del modulo Zernio (curso NSFW) reutilizando las escenas ya narradas de
# videos/zernio-auto y videos/zernio-planes (copia su audio: voz.mjs no vuelve a generar lo que no cambio).
# Uso: python armar_guiones.py
import json, shutil
from pathlib import Path

R = Path(__file__).resolve().parent
V = R.parent / "videos"
AUTO = json.loads((V / "zernio-auto" / "guion.json").read_text(encoding="utf-8"))
PLAN = json.loads((V / "zernio-planes" / "guion.json").read_text(encoding="utf-8"))
VOZ = AUTO["voz"]


def esc(origen, ident):
    g = AUTO if origen == "auto" else PLAN
    return next(e for e in g["escenas"] if e["id"] == ident), V / ("zernio-auto" if origen == "auto" else "zernio-planes") / "audio"


def nueva(ident, *frases):
    return {"id": ident, "frases": [{"id": chr(97 + i), "texto": f} for i, f in enumerate(frases)]}, None


CLASES = {
    "zernio-m1": ("Qué es Zernio y cuánto cuesta", [
        nueva("00-intro", "Bienvenido al módulo de zernio. Aquí vas a dejar el Instagram de tu modelo publicando y respondiendo solo.",
              "Y en esta primera clase, te explico qué es zernio, cuánto cuesta y qué te permite."),
        esc("auto", "01-que-es"), esc("plan", "01-sin-planes"), esc("plan", "02-tramos"), esc("plan", "03-incluye"), esc("plan", "04-aparte"),
        esc("plan", "05-equis"), esc("plan", "06-para-ti"), esc("plan", "07-mas"), esc("plan", "08-cierre"),
        nueva("09-siguiente", "En la próxima clase creas tu cuenta y conectas el Instagram de tu modelo."),
    ]),
    "zernio-m2": ("Crea tu cuenta y conecta el Instagram de tu modelo", [
        nueva("00-intro", "En esta clase creas tu cuenta de zernio, conectas el Instagram de tu modelo y sacas la llave que vas a usar con clod."),
        esc("auto", "02-antes"), esc("auto", "03-cuenta"), esc("auto", "04-conectar"), esc("auto", "05-llave"),
        nueva("06-cierre", "Con tu cuenta conectada y tu llave guardada, ya tienes todo.",
              "En la próxima clase conectas zernio con clod y dejas la subida de tus reels en automático."),
    ]),
    "zernio-m3": ("Conecta Claude y automatiza la subida de tus reels", [
        nueva("00-intro", "Ahora viene lo bueno: que clod publique por ti, todos los días, sin que tengas que abrir Instagram."),
        esc("auto", "06-claude"), esc("auto", "07-prompt"), esc("auto", "08-diario"), esc("auto", "10-reglas"),
        nueva("11-cierre", "En la próxima clase vemos cómo clod escribe tus descripciones, y cómo responde los comentarios de forma natural."),
    ]),
    "zernio-m4": ("Descripciones y respuestas que se sienten naturales", [
        nueva("00-intro", "En esta clase vemos lo que hace que tu cuenta se sienta humana: las descripciones y las respuestas a los comentarios."),
        nueva("01-descripciones", "Primero, las descripciones. clod escribe una para cada reel, con la voz de tu modelo.",
              "Corta y casual, como la escribiría ella: una primera línea que enganche, una pregunta para que le comenten, y de tres a cinco hashtags.",
              "Y nunca vende en la descripción: nada de links, ni de más dieciocho, ni de compra. Eso le baja el alcance a tu reel."),
        nueva("02-respuestas", "Ahora, los comentarios. zernio puede responder en público cada comentario de tus reels, aunque estés durmiendo.",
              "Si dejas vacías las palabras clave, la automatización responde a cualquier comentario.",
              "El secreto es que la respuesta suene casual, y le calce a cualquier cosa que te escriban."),
        nueva("03-ejemplos", "Por ejemplo: jajaja, me sacaste una sonrisa. O: ay, qué lindo, gracias. O: tú sí sabes. O: y eso que no has visto lo mejor.",
              "Respuestas cortas, cálidas y un poco coquetas, que sirven igual para un saludo, un piropo o una pregunta."),
        nueva("04-evitar", "Lo que no debes hacer: responder te escribí por privado, o revisa tus mensajes. Suena a robot, y Instagram lo toma como spam.",
              "Y casi sin emojis: un corazón de vez en cuando está bien, pero no en todas las respuestas."),
        nueva("05-claude", "Pídele a clod de ocho a diez variaciones, para que nunca se repita la misma.",
              "Y activa dos cosas: dar me gusta al comentario, y un pequeño retraso antes de responder, para que no conteste al segundo exacto."),
        nueva("06-cierre", "En la próxima clase vemos el mensaje privado que le llega a cada persona que comenta, con tu link."),
    ]),
    "zernio-m5": ("El mensaje privado con tu link, sin que se note", [
        nueva("00-intro", "Cada persona que comenta tu reel es alguien interesado en tu modelo.",
              "En esta clase vemos cómo zernio le manda un mensaje privado con tu link, sin que se note que vendes."),
        nueva("01-como", "Junto con la respuesta en público, zernio le manda un mensaje directo a quien comentó.",
              "Ese mensaje lleva un botón a tu link secundario, el de linktri o link punto mi. Y ahí, en tu página, están tus botones a fanviu y a tu canal de Telegram."),
        nueva("02-indirecto", "La clave es que sea indirecto. Nada de más dieciocho, ni compra mi contenido, ni precios.",
              "Por ejemplo: holaa, gracias por comentar. Te dejo donde subo lo que no publico aquí.",
              "O: me encantó tu comentario. Aquí está mi rincón privado, por si te da curiosidad."),
        nueva("03-boton", "El botón, con un nombre suave, como ver más de mí, o mi rincón. Máximo veinte letras.",
              "Y la página de tu link tiene que estar limpia, sin fotos explícitas, como viste en la clase de la cuenta exitosa."),
        nueva("04-reglas", "Configúralo para que cada persona reciba el mensaje una sola vez por reel.",
              "Si quieres, activa la revisión de seguidores: si la persona no te sigue, primero le pide que te siga, y después le entrega el link.",
              "Y no te preocupes por el costo: los primeros diez mil mensajes al mes son gratis."),
        nueva("05-claude", "Todo esto lo arma clod solo, cada vez que programa un reel: la respuesta en público, el mensaje privado y el botón."),
        nueva("06-cierre", "En la última clase te muestro en qué se diferencia zernio del bot de interacción del curso, y cómo usar los dos juntos."),
    ]),
    "zernio-m6": ("Zernio o el bot de interacción: cómo funciona cada uno", [
        nueva("00-intro", "En el módulo de automatizaciones tienes el bot de interacción. Y ahora tienes zernio.",
              "¿Cuál usar? En esta clase te explico cómo funciona cada uno."),
        nueva("01-bot", "El bot de interacción es un programa que corre en tu computador. Lo manejas desde Telegram, abre Instagram en Chrome y actúa como si fueras tú.",
              "Le pegas el link de una publicación, y da me gusta y responde a las personas que comentaron. Su versión mejorada también publica y programa tus fotos y reels.",
              "Y va lento a propósito, con pausas, para parecer una persona."),
        nueva("02-zernio", "zernio, en cambio, vive en la nube. Se conecta con el permiso oficial de Instagram, y publica y responde desde sus servidores, aunque tu computador esté apagado."),
        nueva("03-diferencias", "La gran diferencia es hacia dónde apunta cada uno.",
              "zernio trabaja con tu propia audiencia: publica tus reels, responde los comentarios de tus publicaciones, y le manda tu link a quien comenta.",
              "El bot sale a buscar audiencia nueva: interactúa con la gente que comenta en otras publicaciones, para que vengan a tu perfil."),
        nueva("04-costos", "Los dos son gratis para empezar: zernio con sus dos cuentas gratis, y el bot sin costo, salvo que quieras sus respuestas con ia."),
        nueva("05-juntos", "Por eso no compiten: se complementan. zernio para publicar y atender a tu audiencia, y el bot para atraer gente nueva.",
              "Y para los dos, la misma regla: actívalos cuando tu cuenta ya esté calentada, y nunca con ritmos exagerados."),
        nueva("06-cierre", "Si te trabas en cualquier paso del módulo, conéctate a las sesiones en vivo de cada semana y lo vemos juntos."),
    ]),
}

for nombre, (titulo, escenas) in CLASES.items():
    d = V / nombre; (d / "audio").mkdir(parents=True, exist_ok=True)
    out = []
    for e, audio in escenas:
        out.append(e)
        if audio:                                           # escena ya narrada: copia su audio y tiempos
            for f in audio.glob(e["id"] + ".*"):
                shutil.copy2(f, d / "audio" / f.name)
    g = {"titulo": f"Curso Influencer IA 1.0 (NSFW) · Modulo Zernio · {titulo}", "nota": "Modulo Zernio 27/10/2026, voz reimo-v3.",
         "voz": VOZ, "escenas": out}
    (d / "guion.json").write_text(json.dumps(g, ensure_ascii=False, indent=2), encoding="utf-8")
    print(nombre, len(out), "escenas")
