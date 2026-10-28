const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1700));

  // 1. Corrimiento del logo (10% de su propio ancho, permanente tras la animación)
  const info = await page.evaluate(() => {
    const onda = document.querySelector('.ss-onda');
    const logoDiv = document.querySelector('.ss-bienvenida-logo');
    const rOnda = onda.getBoundingClientRect();
    const rLogo = logoDiv.getBoundingClientRect();
    return { corrimientoPx: Math.round((rLogo.left+rLogo.width/2) - (rOnda.left+rOnda.width/2)) };
  });
  check('1. Logo corrido a la derecha (~10% de su ancho)', info.corrimientoPx > 15 && info.corrimientoPx < 35, `${info.corrimientoPx}px`);

  // 2. Título ¡Suelta! resaltado con color de marca (no negro plano)
  const colorTitulo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return getComputedStyle(h1).color;
  });
  check('2. Título ¡Suelta! con color de marca (no INK/negro)', colorTitulo !== 'rgb(37, 51, 46)', colorTitulo);

  // 3. ¡Suelta! resaltado dentro del párrafo (elemento <strong>)
  const suelta_strong = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('strong')).some(s => s.textContent.trim() === '¡Suelta!');
  });
  check('3. "¡Suelta!" resaltado (strong) dentro del párrafo', suelta_strong);

  // 4. Di-á-logos sigue resaltado
  const dialogos_strong = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('strong')).some(s => s.textContent.trim() === 'Di-á-logos');
  });
  check('4. "Di-á-logos" resaltado (strong)', dialogos_strong);

  // 5. Ambos resaltados con el mismo color de marca
  const coloresIguales = await page.evaluate(() => {
    const strongs = Array.from(document.querySelectorAll('strong')).filter(s => ['¡Suelta!','Di-á-logos'].includes(s.textContent.trim()));
    const colores = strongs.map(s => getComputedStyle(s).color);
    return { cantidad: strongs.length, colores };
  });
  check('5. Ambos con el mismo color de resaltado', coloresIguales.cantidad === 2 && coloresIguales.colores[0] === coloresIguales.colores[1], JSON.stringify(coloresIguales));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
