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

  // 1. Palabra "silenciar" visible en la bienvenida
  check('1. Palabra "silenciar" visible en la caja de sonido', t.includes('silenciar'));

  // 2. No existe el botón de cargar usuario de prueba
  check('2. No hay botón "Cargar usuario de prueba" en la bienvenida', !t.includes('Cargar usuario de prueba'));

  // 4. Comunidad: verificar en ScreenHerramientas (Calma → sección al fondo)
  // Crear sesión con usuario registrado → ir a Calma
  const pageCom = await browser.newPage();
  await pageCom.setViewport({ width: 390, height: 1600 });
  await pageCom.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await pageCom.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim()==='Comenzar');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await pageCom.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Test');set('Edad','30');set('Correo','t@t.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await pageCom.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await pageCom.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.includes('Crear mi espacio'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  await pageCom.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Calma')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,600));
  const tCom = await pageCom.evaluate(()=>document.body.innerText);
  check('4. SeccionComunidad tiene "Únete a la comunidad" en pantalla Calma', tCom.includes('Únete a la comunidad'));
  check('4b. Texto actualizado: "soltando lo que ya no les pertenece"', tCom.includes('soltando lo que ya no les pertenece'));
  await pageCom.close();

  // Ir a perspectivas con usuario
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,400));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Ana');set('Edad','30');set('Correo','a@a.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await new Promise(r=>setTimeout(r,400));

  // 5. Perspectivas sin el aviso de especialistas
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  t = await page.evaluate(()=>document.body.innerText);
  check('5. El aviso de "especialistas exclusivo de Alpha" ya NO aparece', !t.includes('directorio de especialistas es un beneficio exclusivo'));

  // 3. Verificar que el botón CTA del paywall usa KINOEMOTION_UI (más suave)
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,400));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Ana');set('Edad','30');set('Correo','a@a.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await click('Qué afectación física');
  await click('Continuar');
  await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const pr=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(pr,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},'dolor de cabeza','dolor de espalda');
  await click('Analizar mi información');
  await new Promise(r=>setTimeout(r,2400));
  await click('Ver mi plan de sanación completo');
  await new Promise(r=>setTimeout(r,600));
  const colorCTA = await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(x=>x.textContent.includes('Elegir') || x.textContent.includes('Comenzar prueba'));
    return b ? getComputedStyle(b).backgroundColor : null;
  });
  // KINOEMOTION_UI = #B85A3F = rgb(184, 90, 63)
  check('3. Botón CTA usa el color terracota suavizado (no el rojo fuerte)', colorCTA === 'rgb(184, 90, 63)', `color=${colorCTA}`);

  check('6. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
