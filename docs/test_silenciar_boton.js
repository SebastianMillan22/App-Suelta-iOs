const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = []; page.on('pageerror', (e) => errores.push(String(e)));

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1600));

  // 1. El botón "Silenciar" existe y es clicable
  const botonSilenciar = await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(b=>
      b.textContent.includes('Silenciar') && b.style.borderRadius === '999px'
    );
    return b ? { texto: b.textContent.trim(), visible: b.getBoundingClientRect().width > 0 } : null;
  });
  check('1. Botón "🔇 Silenciar" es visible y clicable', botonSilenciar?.visible === true, JSON.stringify(botonSilenciar));

  // 2. Al hacer click silencia la música (el botón cambia a "Activar")
  await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Silenciar') && b.style.borderRadius === '999px');
    if(b) b.click();
  });
  await new Promise(r=>setTimeout(r,300));
  const textoTrasClick = await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(b=>
      (b.textContent.includes('Activar') || b.textContent.includes('Silenciar')) && b.style.borderRadius === '999px'
    );
    return b?.textContent.trim();
  });
  check('2. Tras hacer click el botón cambia a "Activar"', textoTrasClick?.includes('Activar'), `texto=${textoTrasClick}`);

  // 3. Al hacer click de nuevo vuelve a "Silenciar"
  await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Activar') && b.style.borderRadius === '999px');
    if(b) b.click();
  });
  await new Promise(r=>setTimeout(r,300));
  const textoTrasReactivar = await page.evaluate(()=>{
    const b = Array.from(document.querySelectorAll('button')).find(b=>
      (b.textContent.includes('Silenciar') || b.textContent.includes('Activar')) && b.style.borderRadius === '999px'
    );
    return b?.textContent.trim();
  });
  check('3. Al reactivar vuelve a mostrar "Silenciar"', textoTrasReactivar?.includes('Silenciar'), `texto=${textoTrasReactivar}`);

  // 4. Sin aviso de especialistas en Perspectivas
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim()==='Comenzar');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Ana');set('Edad','30');set('Correo','a@a.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.includes('Crear mi espacio'));if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  const t = await page.evaluate(()=>document.body.innerText);
  check('4. En Perspectivas NO hay aviso de "especialistas exclusivo de Alpha"', !t.includes('directorio de especialistas es un beneficio exclusivo'));

  check('5. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
