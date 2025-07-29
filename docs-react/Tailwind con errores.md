

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











