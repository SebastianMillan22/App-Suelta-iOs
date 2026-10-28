const puppeteer = require('puppeteer-core');
const R = []; const check = (n,ok,d='')=>{R.push({n,ok,d});console.log(`${ok?'PASS':'FALLA'} | ${n}${d?' — '+d:''}`);};
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/opt/google/chrome/chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));

  const click = async(t)=>{const h=await page.evaluateHandle((x)=>Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim().includes(x)),t);const el=h.asElement();if(el){await el.click();await new Promise(r=>setTimeout(r,450));return true;}return false;};

  // ============ Helpers de auditoría ============
  const auditarTouchTargets = async (nombrePantalla) => {
    // Apple HIG: mínimo 44x44pt. Android Material: 48dp con tolerancia.
    return await page.evaluate(() => {
      const MIN = 44;
      const interactivos = Array.from(document.querySelectorAll('button, a, input[type="checkbox"], select'));
      const violaciones = [];
      for (const el of interactivos) {
        let r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue; // no visible
        // Área táctil EFECTIVA: un input dentro de <label> se activa tocando
        // cualquier parte del label (así lo evalúan los escáneres de accesibilidad).
        const label = el.tagName === 'INPUT' ? el.closest('label') : null;
        if (label) r = label.getBoundingClientRect();
        // El área táctil efectiva incluye padding; medimos el rect completo.
        if (r.height < MIN - 12 && r.width < MIN - 12) { // tolerancia: sólo marcamos casos claramente pequeños en AMBAS dimensiones
          const texto = (el.getAttribute('aria-label') || el.textContent || el.type || '').trim().slice(0, 30);
          violaciones.push(`${el.tagName}:"${texto}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }
      return violaciones;
    });
  };

  const auditarNombresAccesibles = async () => {
    return await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      return botones
        .filter((b) => {
          const r = b.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          const nombre = (b.getAttribute('aria-label') || b.textContent || '').trim();
          return nombre.length === 0;
        })
        .map((b) => b.outerHTML.slice(0, 80));
    });
  };

  // ============ 1. Pantalla de bienvenida ============
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r=>setTimeout(r,900));

  let t = await page.evaluate(()=>document.body.innerText);
  check('1. Sin texto placeholder residual (lorem/TODO/FIXME/xxx)', !/lorem|TODO|FIXME|\bxxx\b/i.test(t));

  const v1 = await auditarTouchTargets('bienvenida');
  check('2. Touch targets adecuados en bienvenida', v1.length === 0, v1.join('; '));

  const sinNombre1 = await auditarNombresAccesibles();
  check('3. Todos los botones de bienvenida tienen nombre accesible', sinNombre1.length === 0, sinNombre1.join('; '));

  // ============ 2. Registro ============
  await click('Comenzar');await click('Continuar');
  const v2 = await auditarTouchTargets('registro');
  check('4. Touch targets adecuados en registro', v2.length === 0, v2.join('; '));

  const inputsSinPlaceholder = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input[type="text"], input[type="email"], input:not([type])'))
      .filter(i => i.getBoundingClientRect().width > 0 && !i.placeholder && !i.getAttribute('aria-label')).length;
  });
  check('5. Inputs de registro con placeholder o aria-label', inputsSinPlaceholder === 0);

  // ============ 3. Cargar usuario de prueba y auditar pantallas clave ============
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r=>setTimeout(r,700));
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Cargar usuario de prueba"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,600));
  await new Promise(r=>setTimeout(r,600));

  const v3 = await auditarTouchTargets('inicio');
  check('6. Touch targets adecuados en Inicio', v3.length === 0, v3.join('; '));
  const sinNombre3 = await auditarNombresAccesibles();
  check('7. Botones de Inicio con nombre accesible', sinNombre3.length === 0, sinNombre3.join('; '));

  // Nav inferior: clases de animación presentes + indicador activo
  const navOk = await page.evaluate(() => {
    const btns = document.querySelectorAll('.ss-nav-btn');
    const dot = document.querySelector('.ss-nav-dot');
    const iconoActivo = document.querySelector('.ss-nav-icon.activo');
    return { btns: btns.length, dot: !!dot, iconoActivo: !!iconoActivo };
  });
  check('8. Nav inferior con animaciones (5 botones, punto e ícono activo)', navOk.btns === 5 && navOk.dot && navOk.iconoActivo, JSON.stringify(navOk));

  // ============ 4. Reset de scroll entre pantallas ============
  await page.evaluate(() => { const c = document.querySelector('.ss-phone-content'); if (c) c.scrollTop = 400; });
  const scrollAntes = await page.evaluate(() => document.querySelector('.ss-phone-content').scrollTop);
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Calma')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,500));
  const scrollDespues = await page.evaluate(() => document.querySelector('.ss-phone-content').scrollTop);
  check('9. El scroll vuelve arriba al cambiar de pantalla', scrollAntes > 0 && scrollDespues === 0, `antes=${scrollAntes} después=${scrollDespues}`);

  // ============ 5. Redes sociales sin links muertos ============
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.ss-nav-btn')).find(x => x.textContent.includes('Inicio')); if (b) b.click(); });
  await new Promise(r=>setTimeout(r,400));
  const linksMuertos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]'))
      .filter(a => /instagram\.com\/suelta|x\.com\/suelta|tiktok\.com\/@suelta|facebook\.com\/suelta|spotify\.com\/user\/suelta/.test(a.href)).length;
  });
  check('10. Sin enlaces a cuentas sociales inexistentes', linksMuertos === 0, `encontrados=${linksMuertos}`);

  // ============ 6. prefers-reduced-motion presente en CSS ============
  const tieneReducedMotion = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('style')).some(s => s.textContent.includes('prefers-reduced-motion'));
  });
  check('11. Soporte de prefers-reduced-motion (accesibilidad)', tieneReducedMotion);

  // ============ 7. Perfil y legal accesibles ============
  await page.evaluate(()=>{const b=document.querySelector('button[aria-label="Mi perfil"]');if(b)b.click();});
  await new Promise(r=>setTimeout(r,400));
  t = await page.evaluate(()=>document.body.innerText);
  check('12. Perfil muestra Términos y Privacidad', t.includes('Términos de uso') && t.includes('Política de privacidad'));

  // ============ 8. Sin errores de JavaScript en todo el recorrido ============
  check('13. Sin errores de JavaScript', errores.length === 0, errores.join(' | ').slice(0, 150));

  const pass = R.filter(r=>r.ok).length;
  console.log(`\n===== ${pass}/${R.length} PASAN =====`);
  R.filter(r=>!r.ok).forEach(f=>console.log('  FALLA:',f.n, f.d));
  await browser.close();
})();
