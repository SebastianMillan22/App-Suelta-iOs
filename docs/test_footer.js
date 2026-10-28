const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--window-size=900,1300'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1300 });
  const errores = [];
  page.on('pageerror', e => errores.push(e.message));
  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const setInput = async(placeholder,valor)=>{await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},placeholder,valor);};
  const txt = ()=>page.evaluate(()=>document.body.innerText);
  const shot = async(n)=>{await new Promise(r=>setTimeout(r,400));await page.screenshot({path:`/home/claude/screenshots/${n}.png`});console.log('shot',n);};
  const navLabels = () => page.evaluate(()=>Array.from(document.querySelectorAll('button')).map(b=>b.textContent.trim()).filter(t=>t.includes('Inicio')||t.includes('Mi reto')||t.includes('Calma')||t.includes('Perspectivas')||t.includes('Especialistas')||t.includes('Diario')));

  // Usuario de prueba = plan anual (ve todo)
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  let t = await txt();
  check('1. Inicio ya NO tiene tarjeta duplicada de herramientas', !t.includes('Herramientas para este momento'));
  check('2. Inicio menciona "Calma" como referencia al footer', t.includes('Calma'));
  await shot('foot_A_inicio_sin_tarjeta');

  const labels = await navLabels();
  console.log('Botones de navegación detectados:', JSON.stringify(labels));
  check('3. Footer tiene 5 pestañas: Inicio, Mi reto, Calma, Perspectivas, Especialistas',
    labels.some(l=>l.includes('Inicio')) && labels.some(l=>l.includes('Mi reto')) && labels.some(l=>l.includes('Calma')) && labels.some(l=>l.includes('Perspectivas')) && labels.some(l=>l.includes('Especialistas')));
  check('4. Footer YA NO tiene pestaña Diario', !labels.some(l=>l.includes('Diario')));
  await shot('foot_B_barra_5_tabs');

  // Tocar "Calma" en el footer
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim().includes('Calma'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  t = await txt();
  check('5. Calma abre herramientas (respiración, presente...)', t.includes('Respiración')&&t.includes('Gratitud'));
  check('6. Calma NO tiene flecha atrás (es pantalla principal)', !(await page.evaluate(()=>!!document.querySelector('button[aria-label="Volver"]'))));
  check('7. Calma ofrece acceso al diario', t.includes('Tu diario'));
  await shot('foot_C_calma_con_diario');
  await click('Tu diario');
  t = await txt();
  check('8. El enlace lleva realmente al diario', t.includes('Cómo te sientes')||t.includes('tres etapas'));
  await shot('foot_D_diario_desde_calma');

  // Tocar "Especialistas" en el footer (plan anual: debe abrir directo)
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim().includes('Especialistas'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  t = await txt();
  check('9. Especialistas (plan anual) abre el directorio directo', t.includes('Psicóloga')&&t.includes('Solicitar una sesión'));
  await shot('foot_E_especialistas_directo');

  const errReales = errores.filter(e=>!e.includes('favicon'));
  check('X. Sin errores de JavaScript', errReales.length===0, errReales.join(' | '));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
