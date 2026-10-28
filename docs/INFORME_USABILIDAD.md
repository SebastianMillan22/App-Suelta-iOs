# Informe de test de usabilidad — Suelta & Sana

**Método:** recorrido automatizado end-to-end con Chrome headless. 29 verificaciones sobre las 6 mejoras de esta ronda + validación de compilación.
**Resultado:** **29/29 pruebas pasan. Cero errores de JavaScript.**

---

## Las 6 mejoras de esta ronda

### 1. Animación de entrada suave en el dashboard principal
El Inicio ahora tiene una entrada más cuidada: el contenedor aparece con un fundido + leve escala (0.55s), y sus elementos internos (saludo, tarjeta de continuidad del reto, texto, opciones) se revelan en cascada con pequeños retrasos escalonados, dando sensación de marca pulida en vez de un simple "aparecer".

### 2. Especialistas como beneficio de mensual y anual (no de la prueba de 7 días)
El directorio de especialistas ahora es exclusivo de los planes mensual y anual — el plan semanal (prueba de 7 días) no lo incluye. El Hub muestra un aviso distinto según lo que le falta a cada plan:
- Plan semanal: "el directorio de especialistas y la libreta son beneficios de mensual y anual".
- Plan mensual: "la libreta es exclusiva del anual".

### 3. Frase de marca trasladada a Registro
*"Cada síntoma es un mensaje y cada historia, una puerta..."* ya no está en la pantalla de idioma; ahora aparece en la pantalla de Registro, debajo de "Cuéntanos quién eres", en el momento en que la persona ya decidió continuar y se dispone a contar de sí misma.

### 4. Selector de idioma como acordeón
"Elige tu idioma" ahora es un acordeón: colapsado muestra el idioma actual con una flecha, y al abrirse despliega el resto de opciones. Se amplió de 3 a 5 idiomas (se agregaron Français e Italiano) para que el acordeón tenga sentido con una lista más larga. (Nota: la selección sigue siendo visual, como ya estaba documentado — la traducción real del contenido es un pendiente conocido).

### 5. Barra de navegación inferior siempre presente
Antes solo aparecía en Inicio, Reto, Perspectivas y Diario. Ahora está presente en **todas** las pantallas posteriores al registro (captura, confirmar, diagnóstico, paywall, datos de nacimiento, herramientas, hub de detalle, etc.), para que el usuario nunca se sienta "perdido" sin manera de saltar a otra sección. Solo se oculta en Bienvenida y Registro (antes de tener un espacio creado). Los botones de reto/perspectivas siguen bloqueados con candado si el usuario no es premium.

### 6. Souvenir: solo libretas, con temática Bogotá
Las 4 portadas de la libreta se rediseñaron con motivos inspirados en Bogotá:
- **Bogotá clásica**: crema con cerros, campanario, taza de café y una franja de patrón textil andino.
- **Naturaleza andina**: verde-azul con palmera y la flor de acuarela de la marca.
- **La Candelaria**: terracota cálido evocando las calles coloniales.
- **Patrones andinos**: azul oscuro con motivo geométrico, ave (evocando el cóndor) y café.

El texto también se ajustó para dejar explícito que el souvenir es una libreta física (agenda/diario/journal), exclusiva del plan anual.

---

## Verificación (29/29)

**Animación (2/2):** clase de entrada presente, elementos en cascada.
**Frase de marca (2/2):** ausente en idioma, presente en registro.
**Acordeón de idioma (3/3):** inicia colapsado, despliega Français/Italiano, la selección actualiza el encabezado.
**Barra inferior (7/7):** ausente en idioma/registro, presente en inicio/captura/confirmar/diagnóstico/paywall.
**Especialistas y libreta por plan (8/8):** semanal no ve ninguno de los dos, mensual ve especialistas pero no libreta, anual ve ambos, mensajes de mejora correctos.
**Portadas Bogotá (7/7):** las 4 nuevas presentes, las 4 viejas eliminadas, menciona Bogotá, confirma elección.
**Salud técnica (1/1):** cero errores de JavaScript.

---

## Pendientes conocidos para producción (no son fallos)
- Conectar las 508 entradas del diccionario real al motor.
- Traducción real a los idiomas del acordeón (hoy la selección es visual).
- Persistencia de datos entre sesiones.
- Validación de formato en el registro.
- Producción real de las libretas físicas con los diseños Bogotá (hoy son representaciones visuales dentro de la app).
