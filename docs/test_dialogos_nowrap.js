const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });

  for (const w of [320, 360, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 780 });
    await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,1700));

    const info = await page.evaluate(() => {
      const strong = Array.from(document.querySelectorAll('strong')).find(s => s.textContent.trim() === 'Di-á-logos');
      const rects = strong.getClientRects(); // si se parte en 2 líneas, habrá más de un rect
      const cs = getComputedStyle(strong);
      return { numRects: rects.length, whiteSpace: cs.whiteSpace, texto: strong.textContent };
    });
    check(`Ancho ${w}px: "Di-á-logos" en una sola línea`, info.numRects === 1, JSON.stringify(info));
    await page.close();
  }

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  await browser.close();
})();
