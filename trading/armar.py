# La serie de trading ahora se arma con el kit general de reels (reels/armar.py): marca Nova y modulo trading.
#   python trading/armar.py <proyecto> trading/rNN.js [--cine] [--musica ... --nivel ...]   (mismos argumentos que antes)
import subprocess, sys
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent / "reels" / "armar.py"
args = sys.argv[1:]
if "--marca" not in args: args += ["--marca", "nova"]
if "--modulo" not in args: args += ["--modulo", "trading"]
sys.exit(subprocess.call([sys.executable, str(KIT), *args]))
