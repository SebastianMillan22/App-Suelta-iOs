const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const setInput = async(placeholder,valor)=>{await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},placeholder,valor);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  let t = await page.evaluate(()=>document.body.innerText);

  check('1. "Códigos sagrados" ya NO aparece en el hub', !t.includes('Códigos sagrados'));
  check('2. Las demás perspectivas siguen intactas', t.includes('Constelación familiar') && t.includes('Comunicación no violenta') && t.includes('Lectura de tarot'));

  // Verificar el diagnóstico: sin mención a Hamer/NMG, con Martel correcto
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,500));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Ana');set('Edad','30');set('Correo','a@a.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await click('Qué afectación física');
  await click('Continuar');
  await setInput('dolor de cabeza', 'tengo un dolor de cabeza fuerte');
  await click('Analizar mi información');
  await new Promise(r=>setTimeout(r,2400));
  t = await page.evaluate(()=>document.body.innerText);

  check('3. Ya NO menciona Hamer ni Nueva Medicina Germánica', !t.includes('Hamer') && !/Nueva Medicina Germánica/i.test(t));
  check('4. Cita de Martel con título y editorial correctos', /El gran diccionario de las dolencias y enfermedades/i.test(t) && t.includes('Quintessence'));
  check('5. Cita de Hay sigue presente', t.includes('Hay, L.'));
  check('6. Ya NO menciona "banco local" (residual interno)', !t.includes('banco local'));

  check('7. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
