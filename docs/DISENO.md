# Guía de estilos — Suelta y Sana

Todos los valores de esta guía están tomados directamente de las constantes al inicio de `src/App.jsx` — si cambias uno ahí, actualiza también esta tabla.

## Paleta de color

| Token | Hex | Uso |
|---|---|---|
| `SAGE` | `#6fa892` | Acento secundario, elementos activos suaves |
| `SAGE_DARK` | `#3f6b5b` | Color primario de marca — botones principales, títulos de sección, "Tú" en la constelación |
| `SAGE_TINT` | `#eaf3ef` | Fondos suaves para tarjetas de plan gratuito, banners informativos |
| `CREAM` | `#faf8f3` | Fondo general de la app (dentro del marco de teléfono) |
| `INK` | `#25332e` | Texto principal (casi negro, con tinte verde para calidez) |
| `MUTED` | `#6b7b74` | Texto secundario, descripciones, ayudas |
| `LAVENDER` | `#8a6bb8` | Color de marca para todo lo **premium**: paywall, hub de perspectivas, cartas, botón de micrófono en reposo... espera, el micrófono usa rojo al grabar |
| `LAVENDER_TINT` | `#f1ecf9` | Fondos suaves para contenido premium (precio, resultado de tonalli/signo) |
| `LINE` | `#e1e0d6` | Bordes por defecto en tarjetas e inputs |

Colores puntuales fuera de la paleta base (usados en contextos específicos, no como tokens reutilizables):
- `#e0564d` — rojo del botón de micrófono mientras graba
- `#8a4bbf` / `#f2e6f7` — variante premium usada en el flujograma Mermaid/Graphviz (no en la app)
- `#20241f` — fondo oscuro del lienzo de la constelación familiar (para que los nodos "floten" en el espacio)

## Tipografía

| Token | Familia | Uso |
|---|---|---|
| `FONT_DISPLAY` | `'Fraunces', serif` | Títulos (`h1`, `h2`, `h3`), cifras destacadas (precio, signo astrológico, tonalli), frases de marca/inspiracionales |
| `FONT_BODY` | `'Plus Jakarta Sans', sans-serif` | Todo el resto: párrafos, botones, inputs, labels |

Ambas se cargan vía Google Fonts dentro de `GlobalStyle` (`@import url(...)`). Si vas a producción y te importa el rendimiento, migra ese `@import` a un `<link rel="preload">` en `index.html`.

## Marco visual (`PhoneFrame`) y comportamiento responsivo

El componente `PhoneFrame` ahora usa clases CSS con media queries reales (`.ss-phone-outer`, `.ss-phone-frame`, `.ss-phone-notch`, `.ss-phone-content`), no estilos inline fijos. Se comporta en tres tramos:

| Ancho de pantalla | Comportamiento |
|---|---|
| **> 900px** (desktop) | Maqueta de teléfono centrada, 380×780px, con marco negro y muesca decorativa — pensado para revisar el diseño en el navegador de escritorio |
| **481–900px** (tablet) | Misma maqueta, un poco más ancha (420×820px) para aprovechar el espacio sin saltar directo al layout de escritorio |
| **≤ 480px** (móvil real) | La maqueta desaparece: el contenido ocupa el 100% del ancho y el 100% de la altura real del dispositivo (`100dvh`), sin bordes, sin radio de esquina, sin muesca — se comporta como una app real instalada, no como una demo dentro de un marco |

Además, en móvil (≤480px) los inputs suben a `font-size: 16px` automáticamente — es el umbral que evita que iOS Safari haga zoom automático al enfocar un campo (un input a 15px o menos dispara ese zoom, que es una de las causas más comunes de que un prototipo "se sienta mal" en iPhone real aunque se vea bien en desktop).

**Lienzo de la Constelación Familiar:** este es el único elemento que antes tenía un ancho de referencia fijo (320px) usado para calcular la posición de cada nodo. Ahora mide su propio contenedor en tiempo real con `ResizeObserver` (ver `ScreenConstelacion` en `App.jsx`) y recalcula las posiciones cuando el ancho disponible cambia — así los nodos se distribuyen correctamente sea cual sea el ancho real de pantalla, en vez de quedar apretados a la izquierda en pantallas más anchas que la maqueta original.

Si vas a envolver esto en Capacitor/Expo para iOS/Android nativo, el breakpoint de ≤480px ya deja el contenido listo para ocupar toda la pantalla sin cambios adicionales.

## Componentes recurrentes

- **`.ss-btn`** — botón base (radio 999px, padding 13px/26px). Variantes: `.ss-btn-primary` (verde sólido, acción principal gratuita), `.ss-btn-ghost` (contorno, acción secundaria), `.ss-btn-premium` (lavanda sólido, todo lo relacionado a pago/premium).
- **`.ss-chip`** — selector tipo píldora (idioma, emociones). Estado activo: fondo `SAGE_DARK`, texto blanco.
- **`.ss-input`** — inputs y textareas, radio 12px, borde `LINE`, foco en `SAGE`.
- **`TopBar`** — encabezado reutilizable con botón de volver opcional y barra de progreso opcional (usado en registro y captura de datos).
- **`Narrativa`** — componente que renderiza un array de párrafos con espaciado uniforme; lo usan las 4 narrativas generadas (diagnóstico, carta natal, carta azteca, constelación).

## Iconografía

No se usa una librería de iconos — todo son caracteres Unicode (♥ ✦ ● ⚘ ✓ ✕ 🔔 🎙) elegidos por disponibilidad universal sin dependencias extra. Si el proyecto crece, vale la pena migrar a una librería real (Lucide, Phosphor) para consistencia visual y accesibilidad (`aria-label` ya está puesto donde corresponde, pero un sistema de iconos real da más control sobre tamaño/peso).

## Principio de diseño aplicado

- **Verde salvia** = todo lo gratuito/esencial (la ruta mínima para sanar).
- **Lavanda** = todo lo premium/opcional (cartas, constelación, reto de 21 días).
- Esta separación de color es intencional y consistente en toda la app — ayuda al usuario a entender de un vistazo qué es gratis y qué no, sin necesidad de leer etiquetas.
