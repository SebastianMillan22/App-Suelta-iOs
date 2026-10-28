# 🌿 Cómo abrir ¡Suelta! funcionando en tu computadora

Esta guía te lleva paso a paso para ver la app **funcionando de verdad** —tocando botones, escribiendo, navegando— en el navegador de tu computadora. No necesitas saber programar. Son unos 10 minutos la primera vez.

---

## Lo que vas a lograr
Al terminar, la app se abrirá en tu navegador (Chrome, Safari, etc.) en una dirección como `http://localhost:5173`, y podrás usarla completa: elegir idioma, escribir tu historia, ver el diagnóstico, el reto de 21 días, las cartas, el tarot, todo.

---

## PASO 1 — Instalar Node.js (solo la primera vez)

Node.js es el motor que hace funcionar la app. Es gratis y seguro.

1. Entra a **https://nodejs.org**
2. Descarga la versión que dice **"LTS"** (es la recomendada, botón verde)
3. Abre el archivo descargado y sigue el instalador (Siguiente → Siguiente → Instalar). Acepta todo por defecto.
4. Reinicia la computadora si te lo pide.

> ✅ Para confirmar que quedó instalado: abre la Terminal (ver Paso 2) y escribe `node --version`. Si te muestra algo como `v20.11.0`, ya está.

---

## PASO 2 — Abrir la Terminal

La Terminal es una ventana donde escribes comandos.

- **En Windows:** presiona la tecla Windows, escribe `cmd` y abre "Símbolo del sistema".
- **En Mac:** presiona `Cmd + Espacio`, escribe `Terminal` y ábrela.

---

## PASO 3 — Descomprimir el proyecto

1. Busca el archivo **`suelta-y-sana-proyecto-completo.zip`** que descargaste.
2. Descomprímelo (clic derecho → "Extraer todo" en Windows, o doble clic en Mac).
3. Vas a obtener una carpeta llamada **`suelta-y-sana`**. Recuerda dónde quedó (por ejemplo, en tu Escritorio o en Descargas).

---

## PASO 4 — Entrar a la carpeta desde la Terminal

En la Terminal, escribe `cd ` (con un espacio después) y luego **arrastra la carpeta `suelta-y-sana` a la ventana de la Terminal**. Esto pega la ruta automáticamente. Presiona Enter.

Ejemplo de cómo se verá (la ruta será la tuya):
```
cd C:\Users\TuNombre\Desktop\suelta-y-sana
```
o en Mac:
```
cd /Users/TuNombre/Desktop/suelta-y-sana
```

---

## PASO 5 — Instalar las piezas de la app (solo la primera vez)

Escribe este comando y presiona Enter:
```
npm install
```
Verás texto corriendo por unos minutos. Es normal. Espera a que se detenga y vuelva a aparecer la línea para escribir.

> Si ves algún mensaje amarillo de "warning" o "audit", **ignóralo**, no es un error.

---

## PASO 6 — ¡Encender la app!

Escribe este comando y presiona Enter:
```
npm run dev
```

Verás algo como esto:
```
  VITE v5.4.21  ready in 400 ms

  ➜  Local:   http://localhost:5173/
```

**Abre tu navegador** y entra a esa dirección: **http://localhost:5173**

🎉 ¡La app está funcionando! Ya puedes usarla completa.

---

## Para probar todo rápido

En la primera pantalla (elección de idioma) verás abajo un botón que dice **"Cargar usuario de prueba"**. Tócalo: entra como "Camila", una usuaria de ejemplo que ya tiene datos cargados (familia, 4 días del reto completados, datos de nacimiento). Así ves todas las funciones sin tener que llenar nada.

---

## Cuando termines

Para apagar la app: vuelve a la Terminal y presiona `Ctrl + C` (en Windows y Mac). Se detiene.

Para volver a abrirla otro día: repite solo los **Pasos 4 y 6** (ya no hace falta instalar nada de nuevo).

---

## ¿Algo no funcionó?

- **"npm no se reconoce como comando":** Node.js no quedó bien instalado. Repite el Paso 1 y reinicia la computadora.
- **"No se puede encontrar la carpeta":** revisa que en el Paso 4 la ruta sea la correcta. Vuelve a arrastrar la carpeta.
- **La página no abre:** asegúrate de escribir la dirección completa con `http://` adelante, y de que la Terminal siga mostrando el mensaje de "Local" (no la cierres mientras usas la app).

---

## Para publicarla en internet (más adelante)

Cuando quieras que otras personas la usen desde sus teléfonos sin instalar nada, revisa el archivo **`DEPLOYMENT.md`** que viene en esta misma carpeta. Explica cómo subirla gratis a servicios como Vercel o Netlify.
