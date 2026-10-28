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

  // ===== PUNTO 1: constelación familiar con hijos/hermanos no nacidos, no conocidos, falleció antes de nacer =====
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  await click('Constelación familiar');
  await new Promise(r=>setTimeout(r,600));
  let t = await page.evaluate(()=>document.body.innerText);
  check('1. Lectura de hijo/hermano no nacido (Hermanito)', /no llegó a nacer|no llegaron a nacer/i.test(t) && t.includes('Hermanito'));
  check('2. Lectura de familiar no conocido (Abuelo Jacinto)', /nunca lo conociste|no llegaste a conocer/i.test(t) && t.includes('Jacinto'));
  check('3. Lectura de fallecimiento antes de nacer (Abuelo Jacinto)', /antes de que tú nacieras/i.test(t));

  await click('Editar mi árbol');
  await new Promise(r=>setTimeout(r,500));
  check('4. Formulario ofrece la opción "Nunca llegó a nacer"', await page.evaluate(()=>Array.from(document.querySelectorAll('option')).some(o=>o.textContent.includes('Nunca llegó a nacer'))));

  // Seleccionar estado no_nacido y verificar que se oculten los vínculos
  await page.evaluate(()=>{
    const s = document.querySelectorAll('select.ss-input')[1];
    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
    setter.call(s, 'no_nacido');
    s.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await new Promise(r=>setTimeout(r,300));
  t = await page.evaluate(()=>document.body.innerText);
  check('5. Al elegir "nunca nació" se oculta la selección de vínculo', !t.includes('¿Cómo es el vínculo?'));
  check('6. Muestra explicación sobre hijos/hermanos no nacidos', /sigue perteneciendo al sistema/i.test(t));

  // Volver a vivo y verificar checkbox de "no conocido"
  await page.evaluate(()=>{
    const s = document.querySelectorAll('select.ss-input')[1];
    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
    setter.call(s, 'vivo');
    s.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await new Promise(r=>setTimeout(r,300));
  t = await page.evaluate(()=>document.body.innerText);
  check('7. Checkbox "nunca lo conociste" disponible', /Nunca lo conociste o no tuviste relación/i.test(t));

  // Verificar checkbox "falleció antes de nacer" al elegir fallecido
  await page.evaluate(()=>{
    const s = document.querySelectorAll('select.ss-input')[1];
    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
    setter.call(s, 'fallecido');
    s.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await new Promise(r=>setTimeout(r,300));
  t = await page.evaluate(()=>document.body.innerText);
  check('8. Checkbox "Falleció antes de que tú nacieras" disponible', t.includes('Falleció antes de que tú nacieras'));

  // ===== PUNTO 2: ejemplos cotidianos en el diagnóstico =====
  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,500));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Test');set('Edad','30');set('Correo','t@t.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await click('Qué afectación física');
  await click('Continuar');
  await setInput('dolor de cabeza', 'tengo un dolor de cabeza fuerte');
  await click('Analizar mi información');
  await new Promise(r=>setTimeout(r,2400));
  t = await page.evaluate(()=>document.body.innerText);
  check('9. El diagnóstico incluye un ejemplo cotidiano concreto', /[Uu]n ejemplo|[Pp]ara ilustrarlo|[Pp]ara que se sienta más concreto/.test(t));

  // ===== PUNTO 3: citas reales para profundizar =====
  check('10. Muestra "Si quieres profundizar" con citas reales', t.toUpperCase().includes('SI QUIERES PROFUNDIZAR') && /Hamer|Martel|Hay, L\./.test(t));
  check('11. Ya NO muestra el texto interno "banco local"', !t.includes('banco local'));

  check('12. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
