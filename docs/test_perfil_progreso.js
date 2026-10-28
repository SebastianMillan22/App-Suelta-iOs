const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--window-size=900,1400'] });
  const page = await browser.newPage();
  const errores = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.setViewport({ width: 900, height: 1400 });
  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const txt = ()=>page.evaluate(()=>document.body.innerText);
  const shot = async(n)=>{await new Promise(r=>setTimeout(r,400));await page.screenshot({path:`/home/claude/screenshots/${n}.png`});console.log('shot',n);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  let t = await txt();

  check('1. Muestra el correo del usuario', t.includes('camila@ejemplo.com'));
  check('2. Muestra sección "Tu progreso"', t.toUpperCase().includes('TU PROGRESO'));
  check('3. Muestra el reto de 21 días con el día actual', t.includes('Reto de 21 días') && t.includes('día 5'));
  check('4. Muestra el diario con conteo de entradas', t.includes('Diario de bienestar') && (t.includes('entrada registrada')||t.includes('entradas registradas')));
  check('5. Muestra sección "Cuenta"', t.toUpperCase().includes('CUENTA'));
  check('6. Muestra sección "Legal" con los dos enlaces', t.toUpperCase().includes('LEGAL') && t.includes('Términos de uso') && t.includes('Política de privacidad'));
  await shot('perfil_A_completo');

  // tocar el reto desde el perfil debe llevar a Mi Reto
  await click('Reto de 21 días');
  await new Promise(r=>setTimeout(r,400));
  t = await txt();
  check('7. Tocar el progreso del reto navega a Mi Reto', t.includes('Recordatorio diario')||t.includes('Práctica de hoy')||t.includes('Día 5 de 21'));
  await shot('perfil_B_reto_desde_perfil');

  // volver al perfil y tocar el diario
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  // ese botón vive en Inicio, no en Reto -- navegar bien
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,700));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await click('Diario de bienestar');
  await new Promise(r=>setTimeout(r,400));
  t = await txt();
  check('8. Tocar el diario navega a la pantalla del Diario', t.includes('Diario')&&(t.includes('escribir')||t.includes('Nueva entrada')||t.includes('entrada')));
  await shot('perfil_C_diario_desde_perfil');

  // legal desde perfil, y que vuelva a perfil (no a editarPerfil)
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,700));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await click('Términos de uso');
  await new Promise(r=>setTimeout(r,400));
  t = await txt();
  check('9. Abre Términos desde el Perfil', t.includes('Aceptación de los términos'));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  t = await txt();
  check('10. Al volver, regresa al Perfil (no a Inicio ni editarPerfil)', t.includes('Mi perfil')||t.toUpperCase().includes('TU PROGRESO'));
  await shot('perfil_D_vuelta_desde_legal');

  check('11. Sin errores de JavaScript', errores.filter(e=>!e.includes('favicon')).length===0, errores.join(' | '));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
