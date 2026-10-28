# ¡Suelta!

App de bienestar emocional basada en biodescodificación, astrología (carta natal / astral / azteca) y constelaciones familiares.

**Nombre en inglés:** Health Motion
**Empresa:** KINœMOTION
**Modelo de negocio:** freemium — diagnóstico gratuito, Reto 21 Días + Hub de Perspectivas por suscripción (prueba / mensual / anual)

Este repositorio contiene el prototipo funcional (React + Vite) y la documentación necesaria para desplegarlo. Corre 100% en el cliente: no tiene backend propio ni base de datos en la nube (ver "Limitaciones conocidas" abajo).

---

## Arranque rápido

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. No necesitas nada más para probarla — no hay claves ni variables de entorno obligatorias.

Para generar el build de producción:

```bash
npm run build
npm run preview   # sirve el build localmente para verificarlo
```

---

## Estructura del proyecto

```
suelta-y-sana/
├── index.html
├── package.json / package-lock.json
├── vite.config.js              → incluye un ajuste de resolución necesario para
│                                  circular-natal-horoscope-js (ver comentario en el archivo)
├── .env.example                 → no hay variables obligatorias hoy; ver más abajo
├── src/
│   ├── main.jsx                 → punto de entrada de React
│   └── App.jsx                  → toda la app (pantallas, lógica, cálculos, narrativas,
│                                   diccionario de 515 entradas, base de ciudades, etc.)
├── public/
│   └── audio/sonido-ambiental.mp3
├── docs/
│   ├── ARQUITECTURA.md          → decisiones de producto y flujo completo, explicado
│   ├── DISENO.md                → guía de estilos (colores, tipografía, componentes)
│   ├── banco_conocimiento_esoterico.json → material de referencia (no se importa en
│   │                               código; su contenido ya está copiado dentro de App.jsx)
│   ├── flujograma.mermaid / .pdf → diagrama de flujo de la arquitectura
│   └── test_*.js                → notas de prueba manual por funcionalidad
└── DEPLOYMENT.md                → cómo publicar la app (Vercel, Netlify)
```

---

## Qué funciona ya en el prototipo

- Flujo completo: registro → selección combinable (historia/síntoma/emoción, con dictado por voz) → diagnóstico gratuito → paywall → datos de nacimiento → Reto 21 Días → Hub de Perspectivas (Carta Natal, Carta Astral, Carta Azteca, Constelación Familiar, Números Sagrados, Tarot, Comunicación No Violenta) → Diario de Bienestar.
- Motor de búsqueda de biodescodificación con **515 entradas propias** (constante `DICTIONARY` en `App.jsx`), no una muestra de ejemplo.
- Carta astral **real**: Sol, Luna, Ascendente, Medio Cielo, Fondo del Cielo y las 12 casas, calculados con una tabla de efemérides real (`circular-natal-horoscope-js`) a partir de fecha, hora y lugar de nacimiento.
  - El lugar de nacimiento se resuelve con una lista local de ~55 ciudades para respuesta instantánea, y con **geocodificación en vivo vía Nominatim/OpenStreetMap** (gratuita, sin API key) como respaldo para cualquier otro lugar del mundo.
- Cálculo real de Tonalli (Tonalpohualli azteca, correlación de Alfonso Caso).
- Árbol genealógico interactivo con notas libres por familiar, conectado a una visualización de constelación familiar con lecturas basadas en los tres Órdenes del Amor de Bert Hellinger.
- Todo el storytelling es **algorítmico** (plantillas + datos), no generado por IA — decisión de producto deliberada, no una limitación pendiente.
- **Persistencia local**: el progreso de la persona (diagnóstico, datos de nacimiento, árbol familiar, Reto 21 Días, diario) se guarda en `localStorage` del navegador y sobrevive recargar la página. Vive solo en ese dispositivo (no sincroniza entre dispositivos — ver limitaciones). Hay un botón "Borrar mis datos guardados" en Mi Perfil.
- Usuario de prueba cargable con un botón (ver `docs/ARQUITECTURA.md`, sección "Usuario de prueba").

## Limitaciones conocidas antes de producción real

- **Sin base de datos en la nube:** el progreso vive solo en `localStorage` del navegador/dispositivo donde se usó. Si la persona cambia de teléfono o borra datos del navegador, pierde su progreso. Para sincronizar entre dispositivos hace falta un backend real (Firebase, Supabase, etc.) — no incluido.
- **Cobro simulado:** el flujo de pago (tarjeta, confirmación) es una simulación completa de UI; no procesa cobros reales. Falta integrar un procesador real (Stripe, MercadoPago), lo que además requiere agregar un backend mínimo (esta app hoy es 100% cliente).
- **Usuario de prueba embebido:** hay una constante `TEST_USER` y un botón oculto para cargarla, pensados solo para demos — ver `docs/ARQUITECTURA.md` para retirarlos limpiamente antes de un lanzamiento real.

## Próximos pasos técnicos (no incluidos todavía)

1. Conectar una base de datos real (Firebase, Supabase) para persistir el progreso entre dispositivos, no solo en el navegador local.
2. Implementar el cobro real (Stripe, MercadoPago, etc.) — hoy la pantalla de pago es una simulación de UI.
3. Retirar el bloque de "usuario de prueba" antes de lanzar a producción (instrucciones en `docs/ARQUITECTURA.md`).
4. Revisar textos legales (términos, privacidad) y confirmar que reflejan el modelo de negocio y el manejo de datos actual.
