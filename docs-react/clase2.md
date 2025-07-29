

# 🧠 Clase 2: Integración con Tailwind CSS



## ⚙️ Instalación de Tailwind CSS v4.1.11 con Vite

### 🧪 Prerrequisitos
- Proyecto creado con Vite (`npm create vite@latest`)
- Node y npm funcionando correctamente

### 🧵 Pasos para instalar Tailwind v4.1.11

```bash
# 1. Instalamos Tailwind y sus dependencias
npm install -D tailwindcss@4.1.11 postcss autoprefixer
```

> 🧠 En Tailwind v4 ya **no se usa** `npx tailwindcss init -p`. La configuración se hace directamente en el CSS o se crea manualmente si se desea personalizar.

---

### 🎨 Archivo CSS principal (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Y en `main.jsx`:

```js
import './index.css';
```

---

### 🧩 Configuración opcional (`tailwind.config.js`)

Si querés personalizar el tema o usar plugins, podés crear el archivo manualmente:
































¡Buena pregunta, Mauricio! El archivo `tailwind.config.js` debe ir en la **raíz del proyecto**, es decir, en el mismo nivel donde están tus archivos `package.json`, `vite.config.js`, y la carpeta `src`.

---

## 📁 Ubicación recomendada

```
guia-emprendimientos-react/
├── chat-react/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js ← aquí va
│   ├── postcss.config.js
│   ├── src/
│   │   └── index.css
│   └── ...
```

> Si estás dentro de `chat-react`, simplemente crealo ahí. Tailwind lo detecta automáticamente si está en la raíz del proyecto.

---

## 🧠 ¿Por qué ahí?

- Tailwind escanea los archivos desde la raíz para generar los estilos.
- Si lo ponés en otro lugar, tendrías que indicarle la ruta manualmente con `@config` en el CSS o en `postcss.config.js`.
- Mantenerlo en la raíz facilita el onboarding defensivo y la trazabilidad visual.





Contenido sugerido:

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---




### 📌 Propósito técnico
Agregar estilos rápidos, claros y personalizables al componente `EntradaMensaje`, usando clases de Tailwind en lugar de CSS tradicional.

### 🪡 Estilos aplicados
```jsx
<form
  onSubmit={manejarEnvio}
  className="flex gap-2 p-4 border-t border-gray-300"
>
  <input
    type="text"
    value={mensaje}
    onChange={manejarCambio}
    placeholder="Escribí tu mensaje..."
    className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
  >
    Enviar
  </button>
</form>
```

### 🎨 Traducción estilística
| Elemento       | Tailwind aplicado                                                                 |
|----------------|-------------------------------------------------------------------------------------|
| `form`         | `flex`, `gap-2`, `p-4`, `border-t`, `border-gray-300`                              |
| `input`        | `flex-1`, `px-4`, `py-2`, `rounded-md`, `border`, `focus:ring`                     |
| `button`       | `px-4`, `py-2`, `bg-indigo-600`, `hover:bg-indigo-700`, `transition`, `rounded-md` |

---

