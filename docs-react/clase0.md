

## 📘 `docs-react/clase0.md` — Preparando mi entorno de desarrollo


# 🧩 Clase 0 – Crear el repo e instalar React con Vite

---

## 🎯 Objetivo

Instalar React de forma moderna usando Vite, y entender para qué sirve cada archivo que se genera. Este es el punto de partida de la guía de emprendimientos compartidos.

---

## ⚙️ ¿Por qué usamos Vite y no `create-react-app`?

Antes se usaba:

```bash
npx create-react-app nombre-del-proyecto
```

Pero eso creaba proyectos pesados y lentos de iniciar. Ahora usamos **Vite**, que es:

- 🌀 Más rápido (no hace bundling inicial)
- 🧩 Modular desde el comienzo
- 🔧 Menos configuración, más enfoque en el código

---

##  Instalación paso a paso

1. Crear carpeta o repo GitHub (ej: `guia-emprendimientos-react`)
2. Ejecutar instalación:

```bash
npm create vite@latest
```

Elegir:

- **Framework:** React
- **Variant:** JavaScript

3. Instalar dependencias y correr el proyecto:

```bash
npm install
npm run dev
```

Abrí [`http://localhost:5173`](http://localhost:5173) para ver la app funcionando 🎉

---


## 📁 Secuencia de ejecución en un proyecto React con Vite

| Archivo / Carpeta     | ¿Qué rol cumple en la ejecución?                                                                 |
|-----------------------|--------------------------------------------------------------------------------------------------|
| `package.json`        | Define tu proyecto: dependencias, comandos (`npm run dev`) y metadatos iniciales                |
| `node_modules/`       | Librerías instaladas según `package.json`. Se usan para que React funcione                      |
| `vite.config.js` *(opcional)* | Configuración de Vite (si la agregás). Define cómo se compila y sirve la app             |
| `index.html`          | Entrada principal: Vite inyecta todo en este archivo, dentro del `<div id="root">`              |
| `main.jsx`            | Es el archivo que React ejecuta primero. Monta el componente `App` dentro de `#root` del HTML   |
| `App.jsx`             | Primer componente React que se renderiza. Tu interfaz arranca acá.                              |
| `src/`                | Carpeta donde vivirá todo tu código React: componentes, estilos, lógica                         |
| `public/`             | Archivos estáticos que se pueden usar en la app sin pasar por el compilador (ej. imágenes)      |

---

## 🧠 Flujo explicado paso a paso

1. Ejecutás `npm run dev` → **Vite lee `package.json`**, instala y corre todo.
2. Se levanta **`index.html`**, el archivo base de tu app.
3. En el HTML hay un `<div id="root">` → ahí React va a insertar la interfaz.
4. **`main.jsx`** usa `ReactDOM.createRoot()` para montar el componente `App.jsx`.
5. Se renderiza **`App.jsx`**, donde vos empezás a construir con JSX.
6. Todo tu código vive en la carpeta **`src/`**, y desde ahí creás componentes nuevos.
7. Si necesitás imágenes o assets, los podés poner en **`public/`**.

---

¡Excelente decisión, Mauricio! Acá te dejo el contenido para el bloque final de `docs-react/clase0.md`, en formato cápsulas técnicas que trazan los dos errores que encontraste: la versión mínima de Node requerida por Vite, y el bloqueo de scripts `.ps1` en PowerShell.

---



## 📌 Cápsulas defensivas: errores comunes al iniciar con Vite

### 🛠️ Error EBADENGINE: Versión de Node incompatible

Este error aparece si tu versión de Node.js es **inferior a la mínima requerida** por `create-vite@7.0.3`. Por ejemplo:

```bash
npm WARN EBADENGINE Unsupported engine {
  package: 'create-vite@7.0.3',
  required: { node: '^20.19.0 || >=22.12.0' },
  current: { node: 'v20.14.0' }
}
```

#### ✅ Solución
- Actualizar Node.js desde [nodejs.org](https://nodejs.org/en/download/)
- Verificar la versión con:
  ```bash
  node -v
  npm -v
  ```

> También se puede usar `nvm-windows` para manejar varias versiones en paralelo.

---

### 🔐 Error npm.ps1 no está firmado digitalmente (PowerShell)

Al ejecutar `npm create vite@latest` desde PowerShell, puede aparecer este error:

```bash
No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1.
No está firmado digitalmente. No se puede ejecutar este script.
```

#### ✅ Solución
1. Abrí PowerShell como administrador
2. Ejecutá:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   ```
3. Aceptá el cambio (`S` o `Sí a todo`)
4. Cerrá PowerShell y volvé a intentar el comando

> Esta política permite ejecutar scripts locales sin firma, manteniendo seguridad para los remotos.

---

Estas cápsulas te ayudan a resolver fallos comunes desde el arranque y fortalecer el onboarding técnico para vos y tu comunidad. ¿Querés que también armemos una sección tipo “Verificación del entorno” para que cada usuario pueda validar que tiene Node y npm listos antes de seguir? 🚀🧩📘


---

