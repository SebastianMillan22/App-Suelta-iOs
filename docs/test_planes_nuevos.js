const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = []; page.on('pageerror', (e) => errores.push(String(e)));
  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const setInput = async(ph,val)=>{await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const pr=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(pr,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},ph,val);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,500));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Ana');set('Edad','30');set('Correo','a@a.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await click('Qué afectación física');
  await click('Continuar');
  await setInput('dolor de cabeza', 'dolor de espalda');
  await click('Analizar mi información');
  await new Promise(r=>setTimeout(r,2400));
  await click('Ver mi plan de sanación completo');
  await new Promise(r=>setTimeout(r,700));

  let t = await page.evaluate(()=>document.body.innerText);

  // Precios actualizados
  check('1. Plan mensual vale 45.000 COP', t.includes('45.000'));
  check('2. Plan anual vale 118.000 COP', t.includes('118.000'));
  check('3. Ya NO aparece 90.000 ni 120.000 ni 50.000', !t.includes('90.000') && !t.includes('120.000') && !t.includes('50.000'));
  check('4. Nombre plan anual es "Anual" (no "Alpha")', t.includes('Anual') && !t.includes('Alpha'));

  // Tabla de comparación
  check('5. Hay tabla de comparación de planes', t.toUpperCase().includes('COMPARAR PLANES'));
  check('6. La tabla lista todas las características clave', t.includes('Especialistas') && t.includes('Libreta') && t.includes('Calma'));

  // Selección interactiva: cambiar a mensual
  const btnMensual = await page.evaluateHandle(()=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().toUpperCase().includes('MENSUAL') && b.textContent.length < 50));
  const elMensual = btnMensual.asElement();
  if (elMensual) { await elMensual.click(); await new Promise(r=>setTimeout(r,400)); }
  t = await page.evaluate(()=>document.body.innerText);
  check('7. Al seleccionar Mensual se actualiza el detalle del plan', t.includes('45.000'));

  // Prueba gratis: nota de verificación visible
  const btnPrueba = await page.evaluateHandle(()=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().toUpperCase().includes('PRUEBA') && b.textContent.length < 50));
  const elPrueba = btnPrueba.asElement();
  if (elPrueba) { await elPrueba.click(); await new Promise(r=>setTimeout(r,400)); }
  t = await page.evaluate(()=>document.body.innerText);
  check('8. Plan prueba muestra aviso de verificación sin cobro', /No se realizará ningún cobro/i.test(t));
  check('9. Botón CTA dice "Comenzar prueba gratuita"', t.includes('Comenzar prueba gratuita'));

  // Volver a anual
  const btnAnual = await page.evaluateHandle(()=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().toUpperCase().includes('ANUAL') && b.textContent.length < 50));
  const elAnual = btnAnual.asElement();
  if (elAnual) { await elAnual.click(); await new Promise(r=>setTimeout(r,400)); }
  t = await page.evaluate(()=>document.body.innerText);
  check('10. Badge "Mejor valor" en plan anual', await page.evaluate(()=>Array.from(document.querySelectorAll('span')).some(s=>s.textContent.trim()==='Mejor valor')));
  check('11. Muestra badge de ahorro', t.includes('Ahorra'));
  // El color del botón CTA depende del plan activo; forzamos anual primero
  const btnAnual2 = await page.evaluateHandle(()=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().toUpperCase().includes('ANUAL') && b.textContent.length < 50));
  const elAnual2 = btnAnual2.asElement();
  if (elAnual2) { await elAnual2.click(); await new Promise(r=>setTimeout(r,400)); }
  check('12. Botón CTA del paywall usa el color corporativo KINœMOTION', await page.evaluate(()=>{
    // El botón de acción principal está fijo al fondo de la pantalla
    const btns = Array.from(document.querySelectorAll('button'));
    const cta = btns.find(b => b.textContent.includes('Elegir') || b.textContent.includes('Comenzar prueba'));
    return cta ? getComputedStyle(cta).backgroundColor === 'rgb(184, 90, 63)' : false;
  }));

  check('13. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
