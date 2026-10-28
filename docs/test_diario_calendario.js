const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const setInput = async(sel,valor)=>{await page.evaluate((s,v)=>{const el=document.querySelector(s);if(el){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},sel,valor);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Cargar usuario de prueba');
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  await click('Diario de bienestar');
  await new Promise(r=>setTimeout(r,600));

  let t = await page.evaluate(()=>document.body.innerText);

  // ===== 1. Estructura de calendario =====
  check('1. Encabezado "Tu calendario de entradas"', /TU CALENDARIO DE ENTRADAS/i.test(t));
  check('2. Agrupa por día (HOY / AYER / fecha completa)', t.includes('HOY') && t.includes('AYER'));

  // ===== Sin logo ni tarjeta de "sigue una ruta" (simplificado a pedido) =====
  const cantidadLogos = await page.evaluate(() => document.querySelectorAll('img[alt="¡Suelta!"]').length);
  check('sinlogo. El diario no muestra el logo', cantidadLogos === 0, `cantidadLogos=${cantidadLogos}`);
  check('sinruta. No aparece "Cuéntanos tu vida en tres etapas"', !t.includes('Cuéntanos tu vida en tres etapas') && !t.includes('sigue una ruta'));

  const badges = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button.ss-card')).filter(c => /^[A-Z]{3}$/.test(c.innerText.trim().split('\n')[1] || '')).length;
  });
  check('3. Cada entrada tiene badge de fecha (día + mes)', badges >= 3, `badges=${badges}`);

  // ===== 2. Título por entrada =====
  check('4. Las entradas existentes muestran título propio', t.includes('Un mejor día') && t.includes('Gratitud de hoy') && t.includes('Noche difícil'));

  // ===== 3. Puedo escribir una entrada CON título y aparece en el calendario =====
  await setInput('input[placeholder*="Título de esta entrada"]', 'Prueba de título nuevo');
  await setInput('textarea[placeholder*="Cómo te sientes"]', 'Este es un texto de prueba para verificar el calendario.');
  await click('Continuar');
  await new Promise(r=>setTimeout(r,400));
  await click('Guardar y refinar');
  await new Promise(r=>setTimeout(r,3000)); // la confirmación "Guardado en tu diario" dura 2.6s antes de volver al calendario
  t = await page.evaluate(()=>document.body.innerText);
  check('5. Nueva entrada con título personalizado aparece en el calendario', t.includes('Prueba de título nuevo'));

  // ===== 4. Sin título: se autogenera de la primera línea =====
  await setInput('textarea[placeholder*="Cómo te sientes"]', 'Este texto no tiene título asignado.');
  await click('Continuar');
  await new Promise(r=>setTimeout(r,400));
  await click('Omitir');
  await new Promise(r=>setTimeout(r,3000));
  t = await page.evaluate(()=>document.body.innerText);
  check('6. Sin título: se autogenera de la primera línea del texto', t.includes('Este texto no tiene título asignado'));

  // ===== 5. Diseño distinto de "Cuéntame tu historia" (pantalla de captura única, sin calendario) =====
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,500));
  // Registro rápido
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Test');set('Edad','30');set('Correo','t@t.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('7. "Cuéntame tu historia" existe como opción de captura separada', t.includes('Cuéntame tu historia'));

  await click('Cuéntame tu historia');
  await click('Continuar');
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  const tieneTituloInput = await page.evaluate(() => !!document.querySelector('input[placeholder*="Título de esta entrada"]'));
  check('8. Esa pantalla NO tiene calendario de entradas (es captura única)', !/TU CALENDARIO DE ENTRADAS/i.test(t));
  check('9. La pantalla de captura no incluye el input de título del diario', !tieneTituloInput);

  check('10. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
