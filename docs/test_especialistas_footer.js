const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = []; page.on('pageerror', (e) => errores.push(String(e)));

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));

  // 1. Especialistas NO aparece en la grilla de Perspectivas
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  let t = await page.evaluate(()=>document.body.innerText);
  check('1. "Hablar con un especialista" NO aparece en la grilla de Perspectivas', !t.includes('Hablar con un especialista'));
  check('2. Las demás perspectivas siguen (constelación, tarot, CNV...)', t.includes('Constelación familiar') && t.includes('Lectura de tarot') && t.includes('Comunicación no violenta'));

  // 2. Especialistas SÍ aparece en el footer
  const enFooter = await page.evaluate(()=>{
    const nav = document.querySelectorAll('.ss-nav-btn');
    return Array.from(nav).some(b => b.textContent.includes('Especialistas'));
  });
  check('3. "Especialistas" sigue en el footer (nav inferior)', enFooter);

  // 3. Al tocar Especialistas en el footer abre la pantalla correcta
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('.ss-nav-btn')).find(x=>x.textContent.includes('Especialistas'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('4. El footer de Especialistas abre la pantalla del directorio', /especialista|directorio|sesión/i.test(t));

  check('5. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
