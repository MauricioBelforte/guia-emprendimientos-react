

## 📦 Clase 3 – Estilización del componente `EntradaMensaje`

### 🧠 Propósito emocional
En esta clase se trabajó sobre la expresión visual y conversacional del componente que permite al usuario enviar mensajes. Se buscó lograr un estilo cálido y familiar, similar a WhatsApp, reforzando claridad, accesibilidad y fluidez.

### 🔹 Componente trabajado
**EntradaMensaje.jsx**  
Componente funcional que contiene un campo de texto (`input`) y un botón (`button`) para enviar un mensaje. Se utilizó `useState` para gestionar el contenido del input y su validación.

### ✨ Cambios introducidos
- Estilos visuales adaptados con **TailwindCSS**, priorizando:
  - Layout responsivo y fluido (`flex`, `gap`, `flex-grow`)
  - Colores amigables (verde estilo WhatsApp)
  - Indicadores de error visual con `ring` y `border` condicional
  - Accesibilidad emocional con `placeholder` claro y feedback visual
- Botón con hover verde oscuro, efecto de transición y desactivación si el campo está vacío
- Validación defensiva: se previene el envío si el campo está vacío, con retroalimentación visual

---

## 🧵 Tailwind – Clases más usadas en esta clase

| 🌐 Clase               | 🧩 Propósito técnico                       |
|------------------------|-------------------------------------------|
| `flex`                 | Contenedor con distribución horizontal    |
| `gap-4`                | Espaciado entre elementos del formulario  |
| `flex-grow`            | El input ocupa el máximo espacio disponible |
| `px-4 py-2`            | Espaciado interno horizontal y vertical   |
| `rounded-md`           | Bordes suavemente redondeados             |
| `border`               | Bordes visibles para delimitar el input   |
| `border-gray-300`      | Borde suave y neutral                     |
| `ring-green-300`       | Efecto de foco con color verde WhatsApp   |
| `bg-[#25D366]`         | Color de fondo estilo WhatsApp            |
| `hover:bg-[#128C7E]`   | Color al pasar el mouse por el botón      |
| `text-white`           | Texto blanco en botón                     |
| `transition`           | Suaviza los cambios visuales              |
| `disabled:opacity-50`  | Reduce visibilidad del botón si está desactivado |

