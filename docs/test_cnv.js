const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));

  // Ir a Perspectivas
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));

  let t = await page.evaluate(()=>document.body.innerText);
  check('1. Aparece la tarjeta "Comunicación no violenta" en el hub', t.includes('Comunicación no violenta'));

  await click('Comunicación no violenta');
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);

  check('2. Explica qué es la CNV (Marshall Rosenberg)', /Marshall Rosenberg/.test(t) && /defensividad/.test(t));
  check('3. Los cuatro pilares están presentes', t.includes('Observación, sin juicio') && t.includes('Sentimiento') && t.includes('Necesidad') && t.includes('Petición concreta'));
  check('4. Incluye al menos 6 frases de reencuadre', (t.match(/EN VEZ DE|AL PONER|AL RECIBIR/gi) || []).length >= 6);
  check('5. Muestra ejemplo de frase habitual vs. CNV', /Nunca me ayudas con nada/.test(t) && /Necesito sentir que esto lo llevamos entre los dos/.test(t));
  check('6. Tiene botón para ir al reto (CTA)', /reto/i.test(t));

  // Navegar de vuelta al hub
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('7. Vuelve correctamente al hub de Perspectivas', t.includes('Constelación familiar') && t.includes('Comunicación no violenta'));

  check('8. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
