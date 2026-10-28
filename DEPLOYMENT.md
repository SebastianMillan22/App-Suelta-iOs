# Despliegue — Suelta y Sana

La app es un sitio estático generado por Vite (HTML + JS + CSS). No necesita servidor propio para funcionar en su estado actual (sin backend, sin base de datos remota — el progreso de cada persona vive en el `localStorage` de su propio navegador). Esto la hace desplegable en minutos en cualquiera de estas opciones.

No hay ninguna variable de entorno obligatoria para desplegar: `npm run build` funciona tal cual, sin configuración adicional.

---

## Opción recomendada para probar ya: Vercel

1. Crea una cuenta gratuita en [vercel.com](https://vercel.com).
2. Sube este proyecto a un repositorio de GitHub (puede ser privado).
3. En Vercel: **Add New → Project → Import** tu repositorio.
4. Vercel detecta automáticamente que es un proyecto Vite. Configuración por defecto:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Click **Deploy**. En ~1 minuto tienes una URL pública (`tu-proyecto.vercel.app`).

Cada vez que subas cambios a la rama principal del repositorio, Vercel vuelve a desplegar automáticamente.

---

## Alternativa: Netlify

1. Cuenta gratuita en [netlify.com](https://netlify.com).
2. **Add new site → Import an existing project**, conecta tu repositorio.
3. Configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy.

---

## Alternativa profesional/escalable: Firebase Hosting

Útil cuando llegue el momento de agregar una base de datos real (Firestore) para persistir el progreso entre dispositivos, o un backend mínimo para procesar cobros reales.

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## Sobre las llamadas externas en tiempo de ejecución

La app hace una llamada a un servicio externo gratuito y sin API key: **Nominatim (OpenStreetMap)**, para geocodificar el lugar de nacimiento cuando la persona escribe una ciudad que no está en la lista local precargada (ver `buscarCiudadesGeocodificacion` en `App.jsx`). No requiere configuración, pero vale la pena saber que existe esa dependencia de red en producción — si Nominatim no responde, la app degrada con gracia (deja de ofrecer esas sugerencias, y la persona puede ingresar coordenadas manualmente).

---

## Antes de lanzar a producción real (checklist)

- [ ] Conectar una base de datos real (Firestore/Supabase) para persistir el progreso entre dispositivos — hoy solo vive en el navegador de cada persona.
- [ ] Implementar el cobro real (Stripe/MercadoPago) en vez de la simulación actual de UI — esto requiere además agregar un backend mínimo, ya que hoy la app es 100% cliente.
- [ ] Retirar el "usuario de prueba" — ver `docs/ARQUITECTURA.md` para cómo eliminarlo limpiamente.
- [ ] Revisar textos legales: términos de uso, política de privacidad, y una nota clara de que la app no sustituye atención médica o psicológica profesional.
- [ ] Probar en dispositivos reales iOS y Android (hoy el diseño está optimizado para el marco de teléfono del prototipo web).
