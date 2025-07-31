
## 📚 Clase 9 - Barra de Navegación Modular en una Single Page App (SPA)

---


### 🧩 ¿Qué es este componente?

Un módulo visual emocional que actúa como **centro de control de navegación interna** en una SPA. No redirige, sino que comunica cambios de vista al componente padre mediante props.

---

### 🔍 ¿Quién lo llama?

El componente padre que gestiona el estado global de vista es `App.jsx` (u otro layout superior como `LayoutPrincipal.jsx`).

---

### 🧨 ¿Cómo lo llama y qué props le pasa?

```jsx
<BarraNavegacion
  vistaActual={vistaActual}           // Estado actual controlado en App
  onCambiarVista={setVistaActual}    // Setter que modifica ese estado desde los botones
/>
```

- `vistaActual`: es el valor actual (`'Chat'`, `'Emprendimientos'`, `'Perfil'`).
- `onCambiarVista`: función que actualiza ese valor desde los botones internos.

---

### ⏱️ ¿Cuándo se renderiza?

- En el **montaje inicial** de la SPA (al renderizar `App`).
- Se vuelve a renderizar **cada vez que cambia `vistaActual`**, para actualizar estilos y destacar el botón activo.

---

### 🎯 ¿Qué devuelve?

- Devuelve un `<nav>` con:
  - Un título visual (branding del sistema).
  - Un grupo de botones.
  - Estilos dinámicos según la vista activa.
  - Propiedad `aria-current` para accesibilidad.

---

### 🔄 ¿En qué momento se activa el cambio de vista?

- Al **hacer clic en un botón** del menú.
- El `onClick` llama a `onCambiarVista(vista)`, lo que modifica el estado en `App` y provoca:
  - Un re-render del centro de la vista (`<VistaCentral />`).
  - Un cambio de contenido visual sin recargar la página.

---

### 🧠 Explicación con comentarios en el código

```jsx
// BarraNavegacion.jsx
// Componente visual para navegación interna en una SPA modular.

import React from 'react';

// Recibe: 
// - vistaActual (string): vista activa ('Chat', etc.)
// - onCambiarVista (función): setter que actualiza esa vista en App
export default function BarraNavegacion({ vistaActual, onCambiarVista }) {
  // Vistas que el usuario puede activar desde la barra
  const vistas = ['Chat', 'Emprendimientos', 'Perfil'];

  return (
    <nav className="h-16 bg-blue-600 text-white flex items-center justify-between px-4 shadow-md">
      
      {/* Branding visual con propósito emocional */}
      <h1 className="text-lg font-bold">
        Guia de Emprendimientos y Servicios Locales
      </h1>

      {/* Botones para cambiar la vista interna */}
      <div className="flex space-x-4">
        {vistas.map((vista) => (
          <button
            key={vista}
            onClick={() => onCambiarVista(vista)} // Al presionar, comunica la nueva vista al componente padre
            className={`py-1 px-3 rounded transition-colors ${
              vistaActual === vista
                ? 'bg-white text-blue-600 font-semibold' // Botón activo resaltado
                : 'hover:bg-blue-500'                    // Botón inactivo con hover
            }`}
            aria-current={vistaActual === vista ? 'page' : undefined} // Mejora accesibilidad
          >
            {vista}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

---

## 🧪 Simulación del flujo completo

```jsx
// App.jsx

import { useState } from 'react';
import BarraNavegacion from './componentes/BarraNavegacion';
import ChatConversacional from './vistas/ChatConversacional';
import ListaEmprendimientos from './vistas/ListaEmprendimientos';
import VistaPerfil from './vistas/VistaPerfil';

export default function App() {
  // Estado que controla qué vista se muestra
  const [vistaActual, setVistaActual] = useState('Chat');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Llamada al componente de navegación */}
      <BarraNavegacion
        vistaActual={vistaActual}        // Valor actual del estado
        onCambiarVista={setVistaActual} // Setter que se pasa como prop
      />

      {/* Vista central que cambia según el estado */}
      <main className="p-4">
        {vistaActual === 'Chat' && <ChatConversacional />}
        {vistaActual === 'Emprendimientos' && <ListaEmprendimientos />}
        {vistaActual === 'Perfil' && <VistaPerfil />}
      </main>
    </div>
  );
}
```

---



## 🧭 Propósito emocional del componente

| Propósito | Detalle emocional-técnico |
|----------|-----------------------------|
| Ubicación | Ayuda al usuario a saber dónde está y qué puede explorar. |
| Modularidad | Cada botón representa una vista fácilmente escalable. |
| Calidez visual | Tipografía clara, colores familiares, sin sobrecargas ni sombras agresivas. |
| Accesibilidad | Botón activo distinguible, navegación sin distracciones ni recargas. |

---

## 🧠 Comportamiento de la barra

- Usa un estado para definir la **vista actual**.
- Comunica al componente padre cuando se cambia la vista (`onCambiarVista`).
- Activa el componente correspondiente desde `App.jsx`.

---

## 🔧 Código con comentarios explicativos

```jsx
// Componente BarraNavegacion.jsx
import React from 'react';

// Recibe la vista actual y una función para cambiarla desde el padre (App)
export default function BarraNavegacion({ vistaActual, onCambiarVista }) {
  const vistas = ['Chat', 'Emprendimientos', 'Perfil']; // Vistas internas que activaremos desde la barra

  return (
    <nav className="h-16 bg-blue-600 text-white flex items-center justify-between px-4 shadow-md">
      {/* Branding emocional del ecosistema */}
      <h1 className="text-lg font-bold">🌱 Tu Ecosistema Modular</h1>

      <div className="flex space-x-4">
        {vistas.map((vista) => (
          <button
            key={vista}
            onClick={() => onCambiarVista(vista)} // Cambia la vista en el estado del componente padre
            className={`py-1 px-3 rounded transition-colors ${
              vistaActual === vista
                ? 'bg-white text-blue-600 font-semibold' // Estilos defensivos para el botón activo
                : 'hover:bg-blue-500'
            }`}
            aria-current={vistaActual === vista ? 'page' : undefined} // Mejora de accesibilidad
          >
            {vista}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

---

## 📦 Ejemplo de integración en `App.jsx` (simulación modular)

```jsx
// En el componente principal que maneja el estado de la vista
import { useState } from 'react';
import BarraNavegacion from './componentes/BarraNavegacion';
import ChatConversacional from './vistas/ChatConversacional';
import ListaEmprendimientos from './vistas/ListaEmprendimientos';
import VistaPerfil from './vistas/VistaPerfil';

export default function App() {
  const [vistaActual, setVistaActual] = useState('Chat'); // Vista inicial

  return (
    <div className="min-h-screen bg-gray-100">
      <BarraNavegacion
        vistaActual={vistaActual}
        onCambiarVista={setVistaActual}
      />

      {/* Renderización condicional según la vista seleccionada */}
      <main className="p-4">
        {vistaActual === 'Chat' && <ChatConversacional />}
        {vistaActual === 'Emprendimientos' && <ListaEmprendimientos />}
        {vistaActual === 'Perfil' && <VistaPerfil />}
      </main>
    </div>
  );
}
```

---

## 📌 Notas didácticas y defensivas

- Evitamos recargas y rutas externas: todo se mantiene dentro del flujo SPA.
- Modularidad asegurada: cada vista es un componente separado.
- Escalable: podés añadir nuevas vistas simplemente agregando al array `vistas` y creando el componente correspondiente.
- Accesibilidad: `aria-current` ayuda a usuarios con lectores de pantalla.

---

