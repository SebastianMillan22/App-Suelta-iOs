const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });

  const probar = async (localeChrome, esperado) => {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': localeChrome });
    await page.emulateTimezone('America/Bogota');
    // Forzar navigator.language ANTES de que cargue el bundle de la app
    await page.evaluateOnNewDocument((loc) => {
      Object.defineProperty(navigator, 'language', { get: () => loc });
      Object.defineProperty(navigator, 'languages', { get: () => [loc] });
    }, localeChrome);
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    const t = await page.evaluate(() => document.body.innerText);
    check(`Detecta "${localeChrome}" → ${esperado}`, t.includes(esperado), t.match(/Idioma detectado[^\n]*/)?.[0] || 'no encontrado');
    await page.close();
  };

  await probar('es-CO', 'Español');
  await probar('en-US', 'English');
  await probar('pt-BR', 'Português');
  await probar('fr-FR', 'Français');
  await probar('it-IT', 'Italiano');
  await probar('de-DE', 'Español'); // idioma no soportado → cae a español por defecto

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
