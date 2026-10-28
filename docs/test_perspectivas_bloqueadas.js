const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });

  // ===== Plan ANUAL (usuario de prueba): todas desbloqueadas =====
  const pageA = await browser.newPage();
  await pageA.setViewport({ width: 390, height: 844 });
  const errA = []; pageA.on('pageerror', e => errA.push(String(e)));
  await pageA.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await pageA.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await pageA.evaluate(()=>{const b=Array.from(document.querySelectorAll('.ss-nav-btn')).find(x=>x.textContent.includes('Perspectivas'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  const totalA = await pageA.evaluate(()=>document.querySelectorAll('div[style*="grid-template-columns"] button').length);
  check('1. Plan anual: se muestran TODAS las perspectivas (8)', totalA === 8, `visibles=${totalA}`);
  const candadosA = await pageA.evaluate(()=>Array.from(document.querySelectorAll('div[style*="grid-template-columns"] button')).filter(b=>b.innerText.includes('🔒')).length);
  check('2. Plan anual: NINGUNA tiene candado', candadosA === 0, `candados=${candadosA}`);
  await pageA.close();

  // ===== Plan PRUEBA: usar window.__setPlanPago expuesto para testing =====
  const pageB = await browser.newPage();
  await pageB.setViewport({ width: 390, height: 844 });
  const errB = []; pageB.on('pageerror', e => errB.push(String(e)));
  await pageB.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await pageB.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  // Cambiar planPago a "prueba" via setter expuesto para testing
  await pageB.evaluate(()=>{ if(window.__setPlanPago) window.__setPlanPago('prueba'); });
  await new Promise(r=>setTimeout(r,300));
  // Navegar a perspectivas
  await pageB.evaluate(()=>{const b=Array.from(document.querySelectorAll('.ss-nav-btn')).find(x=>x.textContent.includes('Perspectivas'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));

  const totalB = await pageB.evaluate(()=>document.querySelectorAll('div[style*="grid-template-columns"] button').length);
  check('3. Plan prueba: se muestran TODAS las perspectivas (8)', totalB === 8, `visibles=${totalB}`);
  const candadosB = await pageB.evaluate(()=>Array.from(document.querySelectorAll('div[style*="grid-template-columns"] button')).filter(b=>b.innerText.includes('🔒')).length);
  check('4. Plan prueba: 5 perspectivas tienen candado (4ª en adelante)', candadosB === 5, `con candado=${candadosB}`);
  const libresB = await pageB.evaluate(()=>Array.from(document.querySelectorAll('div[style*="grid-template-columns"] button')).slice(0,3).every(b=>!b.innerText.includes('🔒')));
  check('5. Las primeras 3 perspectivas NO tienen candado', libresB);
  const tB = await pageB.evaluate(()=>document.body.innerText);
  check('6. Aviso "3 perspectivas" visible', tB.includes('3 perspectivas'));
  check('7. "Desbloquear" en las tarjetas bloqueadas', tB.includes('Desbloquear'));

  // Tocar bloqueada → paywall
  await pageB.evaluate(()=>{const b=Array.from(document.querySelectorAll('div[style*="grid-template-columns"] button')).find(x=>x.innerText.includes('🔒'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,500));
  const tPaywall = await pageB.evaluate(()=>document.body.innerText);
  check('8. Perspectiva bloqueada lleva al paywall', tPaywall.includes('45.000') || tPaywall.includes('118.000') || tPaywall.toUpperCase().includes('ELIGE TU PLAN'));
  await pageB.close();

  check('9. Sin errores de JavaScript', errA.length===0 && errB.length===0, [...errA,...errB].join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
