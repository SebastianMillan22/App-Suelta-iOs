# Arquitectura — Suelta y Sana

Este documento resume las decisiones de producto y la lógica del flujo completo, para que cualquier desarrollador o diseñador que se sume pueda entender el "por qué" detrás del código.

## 1. Identidad

| | |
|---|---|
| Nombre (ES) | Suelta y Sana |
| Nombre (EN) | Health Motion |
| Empresa | KINœMOTION |
| Disciplinas integradas | Biodescodificación, Nueva Medicina Germánica (Dr. Ryke Geerd Hamer), epigenética, astrología occidental, Tonalpohualli (calendario azteca), constelaciones familiares (Bert Hellinger) |
| Modelo de negocio | Freemium: diagnóstico gratuito + Premium de 10 USD (pago único) |

## 2. Flujo completo (ver también `flujograma.mermaid` / `.pdf`)

### Plan gratuito
1. **Selección de idioma** (español / inglés / portugués) — va primero, antes del registro.
2. **Registro:** nombre, edad, sexo, correo, celular.
3. **Inicio:** el usuario elige **una, varias o las tres** opciones, de forma combinable:
   - Cuéntame tu historia (texto libre, con dictado por voz)
   - Qué afectación física tienes (incluye mención a un futuro "escáner holográfico")
   - Qué emoción sientes (selector de chips: miedo, culpa, rabia, tristeza, ansiedad, abandono, vergüenza, impotencia)
4. **Confirmación:** el usuario revisa y puede editar antes de continuar.
5. **Motor de análisis:** cruza lo que el usuario compartió contra el banco local (diccionario de biodescodificación). Devuelve hasta 2 coincidencias ordenadas por relevancia.
6. **Diagnóstico:** narrativa personalizada de mínimo 4 párrafos que:
   - Nombra al usuario y cita fragmentos reales de lo que escribió
   - Explica la causa emocional probable, según la capa embrionaria (endodermo/mesodermo/ectodermo) o el tipo de emoción
   - Incluye una caja separada de "otras posibles causas" — ejemplos abiertos de situaciones típicamente asociadas al mismo conflicto, para que el usuario "ate cabos" sin que la app se los imponga
   - Cita la fuente exacta en una caja aparte del texto narrativo (nunca mezclada con la conversación)
7. **Herramientas para este momento** (gratuitas, sin límite de uso): accesibles desde el Inicio en cualquier momento, sin necesidad de completar el diagnóstico. Cuatro ejercicios interactivos:
   - **Respiración guiada:** círculo animado con ciclo de 4-4-4 segundos (inhala / sostén / exhala), contador de ciclos completos.
   - **Ejercicio de presente:** técnica de anclaje 5-4-3-2-1 (vista, tacto, oído, olfato, gusto), paso a paso con espacio para escribir.
   - **Gratitud:** tres campos de texto libre que se guardan directamente en el Diario de Bienestar.
   - **Relajación corporal:** recorrido guiado por el cuerpo (body scan), paso a paso.
8. **Paywall:** aquí termina lo demás gratuito (el diagnóstico). Se muestra el precio (10 USD) y lo que desbloquea.

### Plan premium (tras pagar)
9. **Datos de nacimiento:** fecha y hora exactas (necesarias para las cartas).
10. **Explicación del Reto 21 Días** antes de pedir que lo acepte.
11. **Reto 21 Días:** calendario visual, notificaciones diarias personalizadas. Si ya hay un reto activo, se pregunta si reemplazarlo o terminar el actual primero.
12. **Hub de Perspectivas** (opcional dentro de premium, no obligatorio para sanar):
    - **Carta Natal:** signo solar calculado con la fecha de nacimiento (astrología tropical occidental). Incluye elemento, modalidad, planeta regente, luz y sombra.
    - **Carta Astral:** capa adicional sobre la Carta Natal — polaridad y "signo espejo" (el opuesto en la rueda zodiacal).
    - **Carta Azteca:** cálculo real del Tonalli en el Tonalpohualli (calendario sagrado de 260 días: 20 signos × 13 números), usando la correlación de Alfonso Caso. Incluye deidad patrona y trecena.
    - **Constelación Familiar:** fusionada con el Árbol Genealógico en un solo flujo — si el usuario no tiene datos, primero construye el árbol (agrega familiares con parentesco, estado, tipo de vínculo, y si están excluidos del sistema); luego ve la visualización espacial de la constelación con lecturas basadas en los tres Órdenes del Amor de Hellinger (pertenencia, jerarquía, equilibrio dar-recibir).
13. **Diario de Bienestar:** disponible en ambos planes, registro libre de entradas.

### Puntos de guardado
Autoguardado en cada entrada de usuario (historia, síntoma, emoción), tras confirmar datos, y diariamente en el reto.

## 3. El diccionario y sus tres estados

El diccionario original (`diccionario_enfermedades_emocionales_completo.json`, subido por el cliente) tenía **843 entradas**, pero la extracción automática desde el PDF original dañó gran parte de la estructura (títulos perdidos, contenido desalineado). Tras reparación:

| Archivo | Entradas | Estado |
|---|---|---|
| `diccionario_reparado_final.json` | 508 | Recuperadas y usables — título y contenido correctamente emparejados |
| `diccionario_redirecciones.json` | 108 | Entradas tipo "ver también" — sin contenido propio, solo remiten a otra entrada. Útiles para sinónimos/búsqueda |
| `diccionario_pendiente_revision.json` | 227 | Perdieron su contenido real en la extracción original; requieren volver al PDF fuente para recuperarlas manualmente |

**Importante:** el motor de búsqueda actual en `App.jsx` (constante `DICTIONARY`) usa solo **12 entradas de ejemplo** escritas a mano (5 síntomas físicos + 7 emociones), para que el prototipo funcionara de punta a punta sin depender de resolver primero la integración completa. Conectar las 508 entradas reales es el trabajo pendiente más importante antes de producción.

### Cómo conectar el diccionario completo (guía rápida)
1. Importar `src/data/diccionario_reparado_final.json` en `App.jsx`.
2. Adaptar `buscarEnDiccionario()` para que use `enfermedad` (título) como `termino` y `descripcion` como `sentido`, generando `keywords` a partir de palabras clave del título (o implementando búsqueda difusa/fuzzy matching, recomendado dado el volumen).
3. Los campos `capa`, `enfoque` y `otrasCausas` que hoy existen en el `DICTIONARY` de ejemplo no existen en el diccionario de 508 entradas — hay que decidir si se infieren automáticamente, se piden a Gemini al momento de generar la narrativa, o se completan manualmente por lotes.

## 4. El banco de conocimiento esotérico

`banco_conocimiento_esoterico.json` documenta, con fuente exacta citada, el contenido usado en Carta Natal, Carta Azteca y Constelación Familiar:

- **Carta Natal:** astrología tropical occidental (convención estándar, sin autor único).
- **Carta Azteca:** Caso, A. (1967). *Los calendarios prehispánicos*. México: UNAM.
- **Constelaciones:** Hellinger, B. (2001). *Órdenes del amor*. Barcelona: Herder.

Este archivo está pensado para usarse como **contexto/grounding de un prompt a Gemini**: en vez de dejar que el modelo invente la interpretación, se le pasa este JSON como base factual y se le pide que redacte la narrativa personalizada citándolo.

## 5. Limitaciones técnicas honestas (no ocultarlas al usuario)

- La Carta Natal solo calcula el **signo solar**. Ascendente, Luna y casas requieren hora y lugar exactos procesados con una tabla de efemérides real (ej. Swiss Ephemeris) — no implementado todavía.
- El Tonalli azteca usa la correlación de Alfonso Caso, la más aceptada en México, pero **no es la única**: León-Portilla y GMT pueden dar resultados distintos para la misma fecha. Esto se explica dentro de la propia narrativa de la app.
- Los 13 números sagrados del Tonalpohualli no tienen una fuente académica única y estandarizada — se marca explícitamente como "lectura numerológica simplificada" en el banco de conocimiento.
- Las lecturas de constelación familiar dependen exclusivamente de lo que el usuario reporta sobre su propia familia; no sustituyen una sesión con un facilitador certificado.

## 6. Usuario de prueba

Para facilitar QA y demos, existe un usuario de prueba (`TEST_USER`) cargable con un botón en la pantalla de idioma ("Cargar usuario de prueba") y borrable desde la pantalla de inicio ("Borrar usuario de prueba y reiniciar").

Todo el código relacionado está delimitado con comentarios `// ===== BLOQUE USUARIO DE PRUEBA — INICIO/FIN =====` en tres puntos de `App.jsx`:
1. La constante `TEST_USER` con los datos de ejemplo.
2. Las funciones `cargarUsuarioPrueba` / `borrarUsuarioPrueba` dentro del componente principal.
3. Los botones en `ScreenIdioma` y `ScreenInicio`, envueltos en `{onCargarPrueba && (...)}` / `{onBorrarPrueba && (...)}`.

**Para eliminarlo de producción:** borrar los tres bloques marcados y dejar de pasar las props `onCargarPrueba` / `onBorrarPrueba`. Los botones desaparecen automáticamente porque están condicionados a que esas props existan. Ningún otro archivo depende de este bloque.

## 7. Historial de decisiones relevantes (por si se preguntan "por qué así")

- El idioma se pregunta **antes** que el registro (no al revés) para mostrar el formulario ya en el idioma correcto.
- El escáner holográfico corporal solo aparece dentro de la opción "afectación física", no en las otras dos.
- El Árbol Genealógico se fusionó con la Constelación Familiar en una sola entrada del Hub (antes eran dos tarjetas separadas) porque conceptualmente es un solo flujo: primero se construye el árbol, después se visualiza.
- El corte freemium está justo después del diagnóstico gratuito (no antes, no después) — el usuario recibe valor real antes de que se le pida pagar.
- Los datos de nacimiento se piden recién *después* de pagar, no antes, para no pedir información sensible sin haber generado valor primero.
