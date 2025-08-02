
# 📚 Clase 15 — Conexión con Supabase y Guardado Ético Modular

## 🧱 Estructura actual del proyecto

Partimos desde la raíz `frontend-chat/`, con todo el sistema conversacional modularizado dentro de `src/`:

```
frontend-chat/
├── src/
│   ├── componentes/        # 🧩 Componentes visuales del sistema conversacional
│   │   ├── ChatApp.jsx     # Componente principal del flujo conversacional
│   │   └── (otros JSX visuales)
│   │
│   ├── lib/                # 🔌 Conexiones externas
│   │   └── supabaseClient.js # Cliente Supabase centralizado
│   │
│   ├── services/           # 🧠 Funciones que interactúan con la base
│   │   └── guardarFicha.js   # Inserta ficha con defaults éticos
│   │
│   ├── App.jsx             # Punto de entrada visual, conecta todo
│   └── index.js            # Entrada de la app
```

Esta estructura refleja que:

- `ChatApp.jsx` ya está dentro de `componentes/`, junto con todos los visuales  
- `App.jsx` es el punto de entrada que probablemente renderiza `<ChatApp />`  
- La lógica de conexión y guardado está separada y lista para escalar

---

## 🔌 Conexión con Supabase (`lib/supabaseClient.js`)

```js
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## 🧠 Guardado de ficha (`services/guardarFicha.js`)

```js
// src/services/guardarFicha.js
import { supabase } from '../lib/supabaseClient';

export const guardarFicha = async (respuestas, setMensajes) => {
  const { error } = await supabase
    .from('fichas_emprendimientos')
    .insert([{
      instagram: respuestas.instagram,
      provincia: respuestas.provincia || 'No compartido',
      ciudad: respuestas.ciudad || 'No compartido',
      barrio: respuestas.barrio || 'No compartido',
      tipo: respuestas.tipo || 'No compartido',
      rubro: respuestas.rubro || 'No compartido',
      descripcion: respuestas.descripcion || 'No compartido',
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

---

## 🎯 Uso en `ChatApp.jsx` (dentro de `componentes/`)

```js
import { guardarFicha } from '../services/guardarFicha';

mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
guardarFicha(respuestasUsuarioActualizadas, setMensajes);
setFlujoFinalizado(true);
```

---

## 💬 Mensaje emocional al usuario

> “Podés irte cuando quieras. Lo que ya compartiste queda guardado con cariño, y podés volver a editarlo más adelante.”

---

## 🧪 Pruebas sugeridas

- Crear ficha parcial y verificar guardado con defaults  
- Confirmar que `App.jsx` renderiza correctamente `ChatApp.jsx`  
- Simular errores y validar defensas emocionales

---


# Correccion en el corte del flujo
Ingresaba aca y no mandaba los datos a la base de datos

Gracias por compartir el código completo, Mauricio. Lo leí con atención y tenés razón: **el flujo se corta en el paso 1 si el usuario dice “no”**, y **no se llama a `guardarFicha()` ni a `mostrarFicha()`**, lo que impide que se guarde la ficha parcial.

Vamos a corregirlo sin romper tu lógica actual, manteniendo la empatía y modularidad que venís construyendo.

---

## 🛠️ Solución: guardar antes de salir en el paso 1

### 🔍 Problema actual

```js
if (indicePregunta === 1 && textoMensajeUsuario.toLowerCase().includes("no")) {
  setMensajes(prev => [...prev,
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
      timestamp
    }
  ]);
  return;
}
```

Este bloque **no guarda la ficha** ni muestra el resumen. Solo muestra un mensaje emocional y corta el flujo.

---

### ✅ Versión corregida

```js
if (indicePregunta === 1 && textoMensajeUsuario.toLowerCase().includes("no")) {
  mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
  guardarFicha(respuestasUsuarioActualizadas, setMensajes);
  setMensajes(prev => [...prev,
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
      timestamp
    }
  ]);
  setFlujoFinalizado(true);
  return;
}
```

---

## 🧠 ¿Por qué funciona?

- `respuestasUsuarioActualizadas` ya contiene la respuesta del paso 1 (`claveActual`)  
- Se guarda la ficha parcial con defaults éticos  
- Se muestra el resumen visual con `mostrarFicha()`  
- Se finaliza el flujo para habilitar edición posterior

---

## 🧪 Prueba sugerida

1. Ingresá un Instagram en el paso 0  
2. En el paso 1 (provincia), escribí “no”  
3. Deberías ver:
   - El resumen de ficha con `'No compartido'` en los campos vacíos  
   - El mensaje emocional  
   - La ficha guardada en Supabase  
   - El sistema listo para edición

---

¿