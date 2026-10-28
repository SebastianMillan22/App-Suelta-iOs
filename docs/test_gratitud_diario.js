const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = []; page.on('pageerror', (e) => errores.push(String(e)));
  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Cargar usuario de prueba');
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Calma')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,400));
  await click('Gratitud');
  await new Promise(r=>setTimeout(r,400));
  await page.evaluate(() => { const inputs = Array.from(document.querySelectorAll('input')); if(inputs[0]) inputs[0].value=''; });
  await page.type('input', 'Un café con calma');
  await click('Guardar en mi diario');
  await new Promise(r=>setTimeout(r,600));
  let t = await page.evaluate(()=>document.body.innerText);
  check('1. Confirma guardado en el diario', t.includes('Quedó guardado en tu diario'));
  await click('Volver');
  await new Promise(r=>setTimeout(r,400));
  await click('Volver'); // desde herramientas al hub de Calma si aplica
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Calma')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,400));
  await click('Tu diario');
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('2. La nueva entrada de gratitud aparece con título "Momento de gratitud"', t.includes('Momento de gratitud'));
  check('3. Contiene el texto capturado', /Un café con calma/.test(t));
  check('4. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
