const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,500));return true;}return false;};
  const setInput = async(placeholder,valor)=>{await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},placeholder,valor);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,800));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));

  // Ir a Perspectivas (hub) y abrir Constelación familiar
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Perspectivas')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  await click('Constelación familiar');
  await new Promise(r=>setTimeout(r,600));

  let t = await page.evaluate(()=>document.body.innerText);

  // 1-3. Lecturas nuevas generadas con la familia del usuario de prueba
  check('1. Lectura de vínculo ambivalente (Lucía: cercano+conflictivo)', /cercano y tenso a la vez/.test(t) && t.includes('Lucía') && /ambivalencia/.test(t));
  check('2. Lectura de rol protector (Marta: cercano+protector)', t.includes('protector') && t.includes('Marta'));
  check('3. Lecturas clásicas siguen: roto (Roberto) y excluido (Efraín)', t.includes('Roberto') && t.includes('Efraín'));

  // 4. Editar árbol: chips presentes
  await click('Editar mi árbol');
  await new Promise(r=>setTimeout(r,500));
  const chips = await page.evaluate(() => Array.from(document.querySelectorAll('button.ss-chip')).map(c => c.textContent.trim()));
  check('4. Muestra 8 características de vínculo', chips.length === 8, chips.join(' | '));

  // 5. Tarjetas de miembros muestran vínculos múltiples
  t = await page.evaluate(()=>document.body.innerText);
  check('5. Marta muestra "cercano, protector / de cuidado"', /cercano, protector/i.test(t));
  check('6. Lucía muestra "cercano, conflictivo"', /cercano, conflictivo/i.test(t));

  // 7. Multi-selección: activar Distante y Frío además de Cercano
  const toggleChip = async (label) => { await page.evaluate((l) => { const c = Array.from(document.querySelectorAll('button.ss-chip')).find(x => x.textContent.trim() === l); if (c) c.click(); }, label); await new Promise(r=>setTimeout(r,250)); };
  await toggleChip('Distante');
  await toggleChip('Frío / formal');
  let activos = await page.evaluate(() => Array.from(document.querySelectorAll('button.ss-chip.active')).map(c => c.textContent.trim()));
  check('7. Se pueden seleccionar varias a la vez', activos.length === 3 && activos.includes('Cercano') && activos.includes('Distante') && activos.includes('Frío / formal'), activos.join(', '));

  // 8. No se puede deseleccionar la última
  await toggleChip('Distante');
  await toggleChip('Frío / formal');
  await toggleChip('Cercano'); // intento de dejar cero
  activos = await page.evaluate(() => Array.from(document.querySelectorAll('button.ss-chip.active')).map(c => c.textContent.trim()));
  check('8. Siempre queda al menos un vínculo seleccionado', activos.length === 1 && activos[0] === 'Cercano', activos.join(', '));

  // 9. Agregar miembro con 2 vínculos y verificar en tarjeta
  await setInput('Nombre', 'Abuela Rosa');
  await page.evaluate(() => { const s = document.querySelector('select.ss-input'); if (s) { s.value = Array.from(s.options).find(o => /abuel/i.test(o.textContent) && /matern/i.test(o.textContent))?.value || s.value; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await toggleChip('Dependiente'); // queda Cercano + Dependiente
  await click('Añadir al árbol');
  t = await page.evaluate(()=>document.body.innerText);
  check('9. Nuevo miembro con 2 vínculos aparece en el árbol', t.includes('Abuela Rosa') && /Abuela Rosa[\s\S]{0,120}cercano, dependiente/i.test(t));

  // 10. La constelación regenera con la lectura de dependencia
  await click('Ver mi constelación familiar');
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('10. Lectura de dependencia (Abuela Rosa)', t.includes('dependencia') && t.includes('Abuela Rosa'));

  check('11. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
