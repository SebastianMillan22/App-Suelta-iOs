const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 1600 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};
  const setInput = async(placeholder,valor)=>{await page.evaluate((p,v)=>{const el=Array.from(document.querySelectorAll('input,textarea')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}},placeholder,valor);};

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  await click('Comenzar');
  await new Promise(r=>setTimeout(r,500));
  await page.evaluate(()=>{const set=(p,v)=>{const el=Array.from(document.querySelectorAll('input')).find(i=>i.placeholder&&i.placeholder.includes(p));if(el){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}};set('Nombre completo','Camila');set('Edad','30');set('Correo','t@t.com');const s=document.querySelector('select');if(s){s.value='F';s.dispatchEvent(new Event('change',{bubbles:true}));}});
  await page.evaluate(()=>{const cb=document.querySelector('input[type="checkbox"]');if(cb)cb.click();});
  await click('Crear mi espacio');
  await click('Cuéntame tu historia');
  await click('Qué afectación física');
  await click('Continuar');
  await setInput('cuéntalo hablando', 'Siento que desde que mi papá murió no logro estar en paz');
  await setInput('dolor de cabeza', 'tengo un nudo en la garganta constante');
  await click('Analizar mi información');
  await new Promise(r=>setTimeout(r,2400));
  let t = await page.evaluate(()=>document.body.innerText);

  const contarOcurrencias = (texto, sub) => (texto.match(new RegExp(sub, 'gi')) || []).length;
  check('1. "diario de bienestar" aparece máximo 1 vez', contarOcurrencias(t, 'diario de bienestar') <= 1, `apariciones=${contarOcurrencias(t,'diario de bienestar')}`);
  check('2. El ejemplo cotidiano usa el término real (garganta)', /zona de.*garganta|reacción física en la zona/i.test(t));
  check('3. No repite "encaja con el patrón de" dos veces seguidas', contarOcurrencias(t, 'encaja con el patrón') <= 1);
  check('4. La lectura sigue siendo completa', t.includes('TAMBIÉN PODRÍAN INFLUIR') && t.includes('SI QUIERES PROFUNDIZAR'));
  check('5. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
