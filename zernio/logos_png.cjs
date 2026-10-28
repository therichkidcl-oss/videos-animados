// Convierte los logos oficiales (SVG) de Zernio y Claude a PNG con fondo transparente, para subirlos a ChatGPT
// (portada del modulo). Uso (desde estudio-videos): node zernio/logos_png.cjs
const path = require('path'), fs = require('fs');
const { chromium } = require(path.resolve('animaciones/dev-base/node_modules/playwright-core'));
const LG = path.resolve('animaciones/dev-base/assets/logos'), OUT = path.resolve('zernio/modelo');
const b64 = f => 'data:image/svg+xml;base64,' + fs.readFileSync(f).toString('base64');
(async () => {
  const br = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });   // el Chrome instalado (no se descarga nada)
  const pg = await br.newPage({ deviceScaleFactor: 2 });
  const piezas = {
    'logo-zernio.png': `<img src="${b64(path.resolve('zernio/assets/zernio-logo.svg'))}" style="height:120px">`,
    'logo-claude.png': `<div style="display:flex;align-items:center;gap:26px"><img src="${b64(path.join(LG, 'claude.svg'))}" style="height:120px">` +
      `<img src="${b64(path.join(LG, 'claude-text.svg'))}" style="height:84px"></div>`,
  };
  for (const [nombre, html] of Object.entries(piezas)) {
    await pg.setContent(`<html><body style="margin:0;background:transparent"><div id="x" style="display:inline-block;padding:24px">${html}</div></body></html>`);
    await pg.waitForTimeout(300);
    await (await pg.$('#x')).screenshot({ path: path.join(OUT, nombre), omitBackground: true });
    console.log('ok', nombre);
  }
  await br.close();
})().catch(e => { console.error(e.message); process.exit(1); });
