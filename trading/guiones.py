# Guiones de la serie de reels de trading de Nova Profit (voz reimo-v3).
# Notacion: palabra{pronunciacion} -> la voz dice la pronunciacion; los subtitulos muestran la palabra.
#           1%{uno por ciento}     -> igual para cifras (los subtitulos muestran "1%").
# Genera animaciones/trading-NN-<slug>/guion.json (texto = lo que lee la voz; pantalla = guion para alinear).
# Uso: python trading/guiones.py [NN ...]   (sin argumentos: todos)   ·   python trading/guiones.py --md  (resumen legible)
import json, re, sys, unicodedata
from pathlib import Path

EST = Path(__file__).resolve().parent.parent
VOZ = {"proveedor": "qwen", "qwen": {"voz": "reimo-v3", "modelo": "1.7B", "dtype": "bf16", "lote": 4}}
CTA = ("Si quieres aprender trading{tréiding} y recibir señales gratis de alta efectividad, "
       "comenta la palabra TRADING{tréiding} y te envío la información.")

REELS = {
  "01": ("vela", "La vela japonesa", [
    ("gancho", ["Esta figura nació en los mercados de arroz de Japón, y hoy la usan traders{tréiders} de todo el mundo.",
                "Si aprendes a leerla, el gráfico empieza a hablarte."]),
    ("batalla", ["Cada vela muestra lo que hizo el precio en un tiempo determinado: un minuto, una hora o un día.",
                 "Y en ese tiempo hay una batalla entre compradores y vendedores."]),
    ("anatomia", ["Toda vela tiene cuatro datos: apertura, cierre, máximo y mínimo.",
                  "El cuerpo va desde la apertura hasta el cierre.",
                  "Si el precio cerró más arriba de donde abrió, la vela es verde: ganaron los compradores.",
                  "Si cerró más abajo, es roja: ganaron los vendedores."]),
    ("mechas", ["Las mechas marcan hasta dónde llegó el precio, y desde dónde fue rechazado.",
                "Una mecha larga abajo significa que los vendedores empujaron fuerte, pero los compradores devolvieron el precio hacia arriba.",
                "Esa vela ya te está diciendo algo."]),
    ("cta", [CTA]),
  ]),
  "02": ("cinco-velas", "5 velas que avisan un giro", [
    ("gancho", ["Hay velas que pueden avisarte que el precio está por girar.", "Estas son cinco de las más importantes."]),
    ("martillo", ["Uno: el martillo. Cuerpo pequeño arriba y una mecha larga abajo, de al menos el doble del cuerpo.",
                  "Aparece después de una caída: los vendedores empujaron, pero los compradores tomaron el control."]),
    ("estrella", ["Dos: la estrella fugaz. Es lo contrario: mecha larga arriba, después de una subida."]),
    ("doji", ["Tres: el doji{dóyi}. Abre y cierra casi en el mismo precio: nadie ganó la batalla."]),
    ("envolvente", ["Cuatro: la envolvente alcista. Una vela verde cuyo cuerpo cubre por completo a la roja anterior."]),
    ("manana", ["Cinco: la estrella de la mañana. Una roja fuerte, una pequeña que duda, y una verde que recupera más de la mitad de la roja."]),
    ("regla", ["Pero ojo: ninguna vela funciona sola. Lo que importa es dónde aparece.",
               "Un martillo sobre un soporte vale mucho más que uno en medio de la nada, y siempre espera la confirmación de la vela siguiente."]),
    ("cta", [CTA]),
  ]),
  "03": ("estructura", "Estructura del mercado", [
    ("gancho", ["Si no sabes leer esto, estás operando a ciegas."]),
    ("ondas", ["El precio nunca se mueve en línea recta: avanza en ondas, como una escalera."]),
    ("alcista", ["En una tendencia alcista, cada máximo es más alto que el anterior, y cada mínimo también."]),
    ("bajista", ["En una tendencia bajista es al revés: máximos y mínimos cada vez más bajos."]),
    ("rango", ["Y si el precio rebota entre un techo y un piso, sin dirección clara, está en rango."]),
    ("quiebre", ["La señal que más importa: si en una subida el precio rompe su último mínimo, la estructura se quiebra.",
                 "A eso se le llama cambio de carácter, y muchas veces anticipa un giro."]),
    ("regla", ["La regla es simple: opera a favor de la estructura, no en contra."]),
    ("cta", [CTA]),
  ]),
  "04": ("soportes", "Soportes y resistencias", [
    ("gancho", ["El precio tiene memoria, y estos niveles lo demuestran."]),
    ("soporte", ["Un soporte es un piso: una zona donde aparecen compradores y el precio deja de caer."]),
    ("resistencia", ["Una resistencia es un techo: una zona donde aparecen vendedores y el precio deja de subir."]),
    ("zonas", ["No son líneas exactas, son zonas. Por eso el precio a veces las perfora un poco antes de rebotar."]),
    ("polaridad", ["Y lo más poderoso: cuando una resistencia se rompe, muchas veces se convierte en soporte.", "El techo se vuelve piso."]),
    ("toques", ["Mientras más veces reacciona el precio en una zona, más traders{tréiders} la están mirando."]),
    ("cta", [CTA]),
  ]),
  "05": ("ruptura", "Ruptura y retesteo", [
    ("gancho", ["Esta es una de las estrategias más usadas en trading{tréiding}, y es más simple de lo que crees."]),
    ("paso1", ["Paso uno: marca una resistencia clara, una zona que el precio tocó varias veces sin poder pasar."]),
    ("paso2", ["Paso dos: espera que una vela fuerte la rompa y cierre por encima."]),
    ("paso3", ["Paso tres: no entres en la ruptura. Espera que el precio vuelva a probar el nivel desde arriba.", "Eso es el retesteo."]),
    ("paso4", ["Paso cuatro: si en el retesteo aparece una vela de confirmación, entras.",
               "Stop{stop} loss{los} debajo de la zona, y un objetivo de al menos el doble de lo que arriesgas."]),
    ("falla", ["¿Y si el precio vuelve a meterse bajo el nivel? La ruptura era falsa: sales con una pérdida pequeña y esperas la siguiente."]),
    ("cta", [CTA]),
  ]),
  "06": ("fibonacci", "La zona dorada de Fibonacci", [
    ("gancho", ["Muchos traders{tréiders} esperan justo aquí antes de entrar. La llaman la zona dorada."]),
    ("impulso", ["En una tendencia, el precio hace un impulso, retrocede, y vuelve a avanzar."]),
    ("trazar", ["Para medir ese retroceso se usa Fibonacci{Fibonachi}: lo trazas desde el inicio del impulso hasta su final."]),
    ("niveles", ["Aparecen los niveles: 38,2{treinta y ocho coma dos}, 50{cincuenta} y 61,8%{sesenta y uno coma ocho por ciento}."]),
    ("zona", ["La zona entre el 50{cincuenta} y el 61,8{sesenta y uno coma ocho} es donde muchos buscan entrar a favor de la tendencia."]),
    ("magia", ["No es magia ni garantía: muchos traders{tréiders} miran los mismos niveles, y por eso el precio a veces reacciona ahí.",
               "Por eso espera una vela de confirmación, y pon tu stop{stop} loss{los} debajo del inicio del impulso."]),
    ("cta", [CTA]),
  ]),
  "07": ("liquidez", "Por qué el precio barre tu stop loss", [
    ("gancho", ["¿Te ha pasado que el precio toca tu stop{stop} loss{los}, y justo después se va a tu favor?", "No es mala suerte."]),
    ("liquidez", ["Donde la mayoría pone su stop{stop} loss{los}, se acumulan órdenes. Eso es liquidez."]),
    ("iguales", ["Mínimos iguales, máximos iguales, justo debajo de un soporte obvio: ahí se juntan muchos stops."]),
    ("barrido", ["Las órdenes grandes necesitan esa liquidez para llenarse.",
                 "Por eso el precio a veces barre ese nivel, y se da vuelta."]),
    ("clave", ["La clave: no pongas tu stop donde lo pone todo el mundo, y espera a que ocurra el barrido antes de entrar."]),
    ("cta", [CTA]),
  ]),
  "08": ("riesgo", "La regla del 1 %", [
    ("gancho", ["La mayoría de las cuentas de trading{tréiding} minoristas pierden dinero.",
                "Y muchas veces el problema no es la estrategia: es el riesgo."]),
    ("regla", ["La regla de oro: no arriesgues más del 1%{uno por ciento} de tu cuenta en una sola operación.",
               "Con 1.000{mil} dólares, son 10{diez} dólares."]),
    ("racha", ["Mira la diferencia: con el 1%{uno por ciento}, diez pérdidas seguidas te dejan con más del 90%{noventa por ciento} de tu cuenta.",
               "Arriesgando el 10%{diez por ciento}, te queda poco más de un tercio."]),
    ("recuperar", ["Y recuperarse cuesta más de lo que parece: si pierdes el 50%{cincuenta por ciento}, necesitas ganar el 100%{cien por ciento} solo para volver al inicio."]),
    ("ratio", ["Ahora suma esto: si cada operación busca ganar el doble de lo que arriesga, puedes acertar solo cuatro de cada diez y aun así terminar en positivo."]),
    ("cierre", ["Primero cuida tu cuenta. Las ganancias vienen después."]),
    ("cta", [CTA]),
  ]),
  # ---- formato cine (26/10/2026): personajes y objetos con cara, mapa desde arriba, ambientes y camara que entra ----
  "09": ("toros-osos", "Toros contra osos", [
    ("gancho", ["En el mercado hay dos animales peleando todo el día, y si te pones del lado equivocado, te pasan por encima."]),
    ("toro", ["Los toros compran: empujan el precio hacia arriba, como un toro que levanta sus cuernos."]),
    ("oso", ["Los osos venden: lo empujan hacia abajo, como un oso que golpea con su garra."]),
    ("ronda", ["Cada vela es una ronda de esa pelea: si ganan los toros, cierra verde; si ganan los osos, cierra roja."]),
    ("tendencia", ["Cuando los toros ganan ronda tras ronda, el precio sube en escalera: eso es una tendencia alcista."]),
    ("rango", ["Y si nadie gana, el precio se queda de lado, rebotando entre un techo y un piso."]),
    ("regla", ["Por eso, no pelees contra el que va ganando: primero mira quién manda, y después elige tu lado."]),
    ("cta", [CTA]),
  ]),
  "10": ("fomo", "FOMO: por qué compras justo arriba", [
    ("gancho", ["¿Te ha pasado que compras justo cuando el precio empieza a caer? No es mala suerte: tiene nombre."]),
    ("fomo", ["Se llama FOMO{fómo}, el miedo a quedarte fuera: ves que algo sube, todos dicen que están ganando, y entras corriendo, sin plan."]),
    ("tarde", ["Pero cuando una subida ya está en boca de todos, muchas veces lo mejor ya pasó."]),
    ("estudio", ["Un estudio con usuarios de Robinhood{róbin jud} lo midió: las acciones más compradas de cada día rindieron casi un 5%{cinco por ciento} menos de lo normal en las cuatro semanas siguientes."]),
    ("plan", ["Para vencerlo, decide tu entrada antes de que el precio se mueva, con tu stop{stop} ya definido."]),
    ("bus", ["Y si se te pasó, déjalo ir: el mercado es como el bus, si se te fue uno, viene otro."]),
    ("cierre", ["El que persigue el precio, termina pagando el precio más caro."]),
    ("cta", [CTA]),
  ]),
  "11": ("apalancamiento", "El apalancamiento", [
    ("gancho", ["Con $100{cien dólares} puedes mover $10.000{diez mil} en el mercado. Suena increíble, hasta que el precio se mueve un 1%{uno por ciento} en tu contra."]),
    ("palanca", ["Eso es el apalancamiento, y viene de palanca: con poquita fuerza levantas algo muchísimo más pesado."]),
    ("broker", ["Tu bróker pone el resto, y tú controlas cien veces tu dinero."]),
    ("multiplica", ["Pero la palanca multiplica todo: lo que ganas, y también lo que pierdes."]),
    ("cuenta", ["Con palanca de cien, ese 1%{uno por ciento} en contra son $100{cien dólares}: toda tu cuenta."]),
    ("cierra", ["Y cuando tu dinero ya no alcanza, el bróker cierra tu operación sin preguntarte."]),
    ("europa", ["Por eso en Europa, a la gente común no le dejan usar más de 30:1{treinta a uno} en las divisas principales."]),
    ("truco", ["El truco no es usar más palanca, sino posiciones chicas, con su stop{stop} loss{los}."]),
    ("cta", [CTA]),
  ]),
}

LLAVE = re.compile(r"(\S*?)\{([^}]*)\}")


def sin_tildes(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z ]", "", s).strip()


def hablado(f):          # lo que lee la voz
    return LLAVE.sub(lambda m: m.group(2), f)


def pantalla(f):         # guion para alinear y subtitular: palabra visible + {pronunciacion sin tildes}
    return LLAVE.sub(lambda m: f"{m.group(1)}{{{sin_tildes(m.group(2))}}}" if m.group(1) else sin_tildes(m.group(2)), f)


def visible(f):          # como se lee en los subtitulos
    return LLAVE.sub(lambda m: m.group(1) or m.group(2), f)


def carpeta(n):
    return EST / "animaciones" / f"trading-{n}-{REELS[n][0]}"


def generar(n):
    slug, titulo, escenas = REELS[n]
    g = {"titulo": f"Nova Profit · Trading {n} · {titulo}", "voz": VOZ,
         "nota": "Serie de reels de trading (vertical). texto = lo que lee la voz; pantalla = guion para alinear (pronunciacion entre llaves).",
         "escenas": [{"id": f"{i:02d}-{eid}", "frases": [{"id": chr(97 + j), "texto": hablado(f), "pantalla": pantalla(f)} for j, f in enumerate(fr)]}
                     for i, (eid, fr) in enumerate(escenas)]}
    d = carpeta(n); d.mkdir(parents=True, exist_ok=True)
    (d / "guion.json").write_text(json.dumps(g, ensure_ascii=False, indent=2), encoding="utf-8")
    pal = sum(len(hablado(f).split()) for _, fr in escenas for f in fr)
    return d, pal


if __name__ == "__main__":
    if "--md" in sys.argv:
        for n, (slug, titulo, escenas) in REELS.items():
            pal = sum(len(hablado(f).split()) for _, fr in escenas for f in fr)
            print(f"\n### Reel {n} · {titulo}  (~{pal} palabras, ~{round(pal / 2.55)} s)\n")
            for _, fr in escenas:
                print(" ".join(visible(f) for f in fr) + "\n")
        sys.exit()
    for n in (sys.argv[1:] or REELS):
        d, pal = generar(n)
        print(f"{d.name}: {pal} palabras (~{round(pal / 2.55)} s)")
