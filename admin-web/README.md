# ¡Suelta! · Consola de Administración Web (LA ^ VACHE)

Consola administrativa web completamente independiente y autónoma para la gestión de usuarios, especialistas, diagnósticos y configuración de la aplicación **¡Suelta!**, bajo la organización **LA ^ VACHE**.

---

## 🚀 Opciones para Montar y Desplegar en la Web

Este portal es **100% estático y autónomo** (HTML5 + ESM JavaScript con Firebase 10 vía CDN + Lucide Icons). No requiere Node.js, compilación ni servidor backend para ejecutarse. Puede montarse en cualquier servicio web en segundos:

### Opción 1: Vercel / Netlify / Cloudflare Pages
1. Arrastra y suelta la carpeta `admin-web/` (o vincula este repositorio).
2. Como es un archivo estático, no configures ningún comando de compilación (Build command: vacío / directorio de publicación: `./` o `admin-web/`).
3. La consola estará disponible inmediatamente en una URL segura HTTPS.

### Opción 2: Firebase Hosting
Si tienes el proyecto de Firebase configurado:
```bash
firebase init hosting
# Seleccionar admin-web como public directory
firebase deploy --only hosting
```

### Opción 3: Servidor Web Tradicional (cPanel / Apache / Nginx / Hostinger)
1. Sube el archivo `index.html` a la carpeta pública de tu servidor (ej. `public_html/admin/` o en un subdominio `admin.suelta.app`).
2. ¡Listo! Al acceder a la URL cargará de inmediato.

### Opción 4: Servidor Local de Pruebas
Puedes abrir `index.html` en tu navegador con cualquier servidor local:
```bash
npx serve admin-web
# o con Python
python -m http.server 8080 --directory admin-web
```

---

## 🔑 Credenciales de Acceso a la Consola

Para acceder al panel de administración tienes 2 métodos:

1. **Código Maestro de Acceso (Passcode):**
   - Claves válidas: `SueltaAdmin2026`, `LaVache2026`, `SueltaAdmin` o `Admin2026`

2. **Acceso con Google (1-Click):**
   - Correo autorizado: `sebastianmillan2002@gmail.com`

---

## 🛠️ Módulos y Capacidades Administrativas

1. **👥 Usuarios & Licencias:**
   - Visualización en tiempo real de todos los usuarios registrados en Firestore.
   - Cálculo dinámico de período de prueba (Día 1/3, 2/3, 3/3, Vencido).
   - Concesión/Revocación de Acceso Total (VIP) en 1 clic.
   - Reinicio de prueba a Día 1 o expiración inmediata.
   - Otorgamiento de VIP por correo electrónico anticipado (`vip_emails`).
   - Exportación de la base de usuarios en JSON.

2. **🩺 Especialistas & Terapeutas:**
   - Directorio en vivo conectado a la colección `specialists`.
   - Creación de nuevos especialistas con foto, WhatsApp, biografía y especialidades.
   - **Edición y modificación en tiempo real**: Al hacer clic en "Editar", el formulario se precarga y actualiza el documento en Firestore (`merge: true`).
   - Eliminación de especialistas con confirmación de seguridad.

3. **🔬 Revisión de la App (Diagnóstico en Vivo):**
   - Ping y latencia de conexión a Firestore en milisegundos.
   - Estado de autenticación Firebase.
   - Verificación de algoritmos clave: Biodescodificación (519 patologías), Efemérides astronómicas suizas y Tonalli azteca Caso 1521.
   - **Playground y Simulador de Casos**: Permite probar síntomas, cartas natales y Tonalli en vivo.

4. **⚙️ Ajustes Generales:**
   - Días de prueba de la app (por defecto 3 días).
   - Precios de referencia de suscripciones (Mensual y Anual en COP y USD).
   - Interruptor y texto del banner global de anuncios.
   - Canales oficiales de soporte y contacto (WhatsApp y Correo).

5. **📖 Manifiesto & Funcionamiento (LA ^ VACHE):**
   - Manifiesto corporativo de **LA ^ VACHE** y **KINœMOTION**.
   - Desglose metodológico de las 7 disciplinas integradas en la app.
   - Mapa de viaje del usuario (User Journey) y arquitectura de datos.

6. **📊 Métricas & KPIs:**
   - Indicadores de usuarios activos, VIPs y usuarios en prueba.
   - Gráficos de distribución demográfica por género y rangos de edad.
