const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = []; page.on('pageerror', (e) => errores.push(String(e)));
  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1600));
  let t = await page.evaluate(()=>document.body.innerText);

  check('1. Bienvenida muestra "KINœMOTION"', t.includes('KINœMOTION') || t.toUpperCase().includes('KINOEMOTION'));
  check('2. Ya NO muestra "mozionemozion"', !t.includes('mozionemozion'));

  // Color corporativo en la bienvenida
  const colorEmpresa = await page.evaluate(() => {
    const p = Array.from(document.querySelectorAll('p')).find(el =>
      el.textContent.trim().toUpperCase().includes('KIN') && el.textContent.trim().length < 20
    );
    return p ? getComputedStyle(p).color : null;
  });
  check('3. Nombre de empresa en color corporativo (#D6472B)', colorEmpresa === 'rgb(214, 71, 43)', `color=${colorEmpresa}`);

  // Footer
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('4. Footer muestra "KINœMOTION"', t.includes('KINœMOTION'));
  check('5. Footer ya NO menciona "mozionemozion"', !t.includes('mozionemozion'));

  // Legal
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await click('Términos de uso');
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('6. Términos de uso menciona "KINœMOTION"', t.includes('KINœMOTION'));
  check('7. Términos de uso ya NO menciona "mozionemozion"', !t.includes('mozionemozion'));

  check('8. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
