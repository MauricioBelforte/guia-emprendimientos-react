
## 📚 Clase 13 — Conexión segura con Supabase: claves, entorno y persistencia

---

### 🧠 ¿Por qué conectar con Supabase?

- 🔗 Para guardar cada ficha que el usuario completa en la base de datos `fichas_emprendimientos`.
- 🔒 Para hacerlo de forma segura, sin exponer claves directamente en el código.
- 🧠 Para mantener modularidad, claridad y trazabilidad emocional en cada paso del sistema.

---

### 🔍 ¿Cómo obtener los datos de conexión?

1. Ingresamos a [supabase.com](https://supabase.com) y accedemos a nuestro proyecto.
2. En el menú lateral izquierdo, vamos a **Settings → API**.
3. Copiamos los siguientes datos:

| Dato que necesitamos | Dónde lo encontramos | Ejemplo |
|----------------------|----------------------|---------|
| `supabaseUrl`        | Campo **Project URL** | `https://wmdkrgycokndrxjljosl.supabase.co` |
| `supabaseKey`        | Campo **anon public** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

> ⚠️ Usamos la clave `anon public`, que es segura para frontend. Nunca usar `service_role` en React.

---

### 🧱 ¿Cómo guardar estos datos en `.env.local`?

Creamos un archivo `.env.local` en la raíz del proyecto `frontend-chat`:

```env.local
VITE_SUPABASE_URL=https://wmdkrgycokndrxjljosl.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # clave pública
```

> ✅ En proyectos con Vite, las variables deben comenzar con `VITE_` para que estén disponibles en el frontend.

---

### 🔒 ¿Cómo evitar que se suba al repositorio?

Agregamos `.env.local` al archivo `.gitignore`:

```
# .gitignore
.env
```

Esto protege la clave si el proyecto se publica o se comparte.

---

### 🔌 ¿Cómo conectar la app con Supabase?

Creamos un archivo `supabaseClient.js` dentro de `frontend-chat/` (puede ir en `lib/` o `services/` si querés modularidad):

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

### 🧠 ¿Cómo guardar la ficha del usuario?

Agregamos esta función en `ChatApp.jsx`, justo después de `mostrarFicha`:

```js
import { supabase } from './supabaseClient'; // ajustá la ruta si es necesario

const guardarFichaEnSupabase = async (respuestas) => {
  const { error } = await supabase
    .from('fichas_emprendimientos')
    .insert([{
      instagram: respuestas.instagram,
      provincia: respuestas.provincia || 'No especificado',
      ciudad: respuestas.ciudad || 'No especificado',
      barrio: respuestas.barrio || 'No especificado',
      tipo: respuestas.tipo || 'No aclarado',
      rubro: respuestas.rubro || 'No definido',
      descripcion: respuestas.descripcion || 'No brindada',
      email: respuestas.email || 'No compartido',
      website: respuestas.website || 'No compartido'
    }]);

  if (error) {
    console.error("❌ Error al guardar en Supabase:", error.message);
    setMensajes(prev => [...prev, {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: `😕 Hubo un problema al guardar tu ficha. Podés intentar más tarde.`,
      timestamp: new Date().toISOString()
    }]);
  } else {
    console.log("✅ Ficha guardada en Supabase");
  }
};
```

Y la llamamos justo después de `mostrarFicha(...)`:

```js
mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
guardarFichaEnSupabase(respuestasUsuarioActualizadas);
setFlujoFinalizado(true);
```

---

### 🧠 Reflexión final

> Esta clase marca el momento en que el sistema deja de ser solo visual y se vuelve persistente. Cada ficha que el usuario completa queda guardada con respeto, seguridad y trazabilidad. Usamos `.env` para proteger las claves, y Supabase para mantener la modularidad y la empatía técnica que define todo el proyecto.

---
