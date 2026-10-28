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

  // Familia del usuario de prueba: Marta(madre, cercano+protector), Roberto(padre, roto),
  // Lucía(hermana, cercano+conflictivo → ambivalente), Efraín(tío, distante, excluido=true)
  // Prioridad esperada: excluidos > rotos > conflictivos/ambivalentes...
  // Efraín está excluido=true → debería ser el patrón destacado (máxima prioridad).

  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));

  // ===== Carta natal =====
  await click('Carta natal');
  await new Promise(r=>setTimeout(r,600));
  let t = await page.evaluate(()=>document.body.innerText);
  check('1. Carta natal menciona el árbol familiar', /árbol familiar/i.test(t));
  check('2. Carta natal menciona a Efraín (excluido, máxima prioridad)', t.includes('Efraín'));
  check('3. Carta natal conecta con el signo solar (Sol en / sombra)', /Sol en/i.test(t));

  // volver al hub
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));

  // ===== Carta azteca =====
  await click('Carta azteca');
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('4. Carta azteca menciona el árbol familiar', /árbol familiar/i.test(t));
  check('5. Carta azteca menciona a Efraín', t.includes('Efraín'));
  check('6. Carta azteca menciona el tonalli/herencia energética', /tonalli|herencia energética/i.test(t));

  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));

  // ===== Carta astral =====
  await click('Carta astral');
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('7. Carta astral menciona el Fondo del Cielo / raíces junto al árbol', /Fondo del Cielo/i.test(t) && /árbol familiar/i.test(t));
  check('8. Carta astral menciona a Efraín', t.includes('Efraín'));

  // ===== Sin árbol familiar: no debe romperse ni mostrar el bloque =====
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));

  check('9. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
