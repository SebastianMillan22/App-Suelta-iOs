const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1600)); // esperar a que terminen las animaciones de entrada

  let t = await page.evaluate(()=>document.body.innerText);

  // Contenido
  check('1. Muestra el nombre de la app', t.includes('¡Suelta!'));
  check('2. Explica qué encontrarás (reto, perspectivas, diario, calma)', /reto de 21 días/i.test(t) && /diario/i.test(t) && /constelaciones/i.test(t));
  check('3. Mensaje "Lo humano, primero" presente', /Lo humano, primero/i.test(t));
  check('4. Texto exacto: empatía / conectar con otra persona', /Por mucho que nos esforcemos en practicar la empatía/.test(t) && /nada reemplaza el valor de/.test(t));
  check('5. Menciona escucha activa y mirada ajena / resignificar', /escucha activa/i.test(t) && /mirada ajena/i.test(t) && /resignificar/i.test(t));
  check('6. Menciona Di-á-logos (hablan y recogen mutuamente)', /Di-á-logos/.test(t) && /hablan y recogen mutuamente/i.test(t));

  // Ya NO existe pantalla de selección de idioma manual
  check('7. No hay pantalla de selección de idioma', !/ELIGE TU IDIOMA/i.test(t));
  const idiomaDispositivo = await page.evaluate(() => navigator.language);
  const nombresIdiomas = ['Español','English','Português','Français','Italiano'];
  const detectaAlgunIdioma = nombresIdiomas.some((n) => t.includes(n));
  check('8. Muestra el idioma detectado del dispositivo', /Idioma detectado de tu dispositivo/i.test(t) && detectaAlgunIdioma, `navigator.language=${idiomaDispositivo}`);

  // Música ambiental disponible en la misma pantalla
  check('9. Control de sonido ambiental presente', /Sonido ambiental/i.test(t));
  const sliderPresente = await page.evaluate(() => !!document.querySelector('input[type="range"][aria-label="Volumen del sonido ambiental"]'));
  check('10. Slider de volumen presente', sliderPresente);

  // Animaciones montadas
  const anim = await page.evaluate(() => ({
    bloom: !!document.querySelector('.ss-bienvenida-logo'),
    ondas: document.querySelectorAll('.ss-onda').length,
    respira: !!document.querySelector('.ss-bienvenida-logo .ss-logo-respira'),
  }));
  check('11. Logo con florecimiento + respiración', anim.bloom && anim.respira);
  check('12. Tres ondas de calma detrás del logo', anim.ondas === 3, `ondas=${anim.ondas}`);

  const op1 = await page.evaluate(() => getComputedStyle(document.querySelector('.ss-onda')).opacity);
  await new Promise(r=>setTimeout(r,900));
  const op2 = await page.evaluate(() => getComputedStyle(document.querySelector('.ss-onda')).opacity);
  check('13. Las ondas están animando en vivo', op1 !== op2, `${op1} -> ${op2}`);

  // Silenciar/activar sonido desde la bienvenida
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Silenciar sonido"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,300));
  const silenciado = await page.evaluate(()=>!!document.querySelector('button[aria-label="Activar sonido"]'));
  check('14. Silenciar sonido desde la bienvenida funciona', silenciado);
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Activar sonido"]');if(b)b.click();});

  // Navegación: Comenzar lleva directo a Registro (ya no a idioma)
  await page.evaluate(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim()==='Comenzar');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('15. "Comenzar" lleva directo al registro (sin pantalla de idioma)', /Nombre completo|Crear mi espacio/i.test(t));

  // El botón home (⌂) regresa a la bienvenida
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Volver a la pantalla de bienvenida"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  t = await page.evaluate(()=>document.body.innerText);
  check('16. El botón home regresa a la bienvenida', /Lo humano, primero/i.test(t));

  // Cargar usuario de prueba sigue disponible desde la bienvenida
  t = await page.evaluate(()=>document.body.innerText);
  check('17. El botón "Comenzar" y el nombre de empresa están visibles', t.includes('Comenzar') && t.includes('KINœMOTION'));

  check('18. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0,150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
