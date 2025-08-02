### Clase 16 — Pie de página emocional y persistente

Se implementa el componente `PieDePagina.jsx` como cierre emocional del sistema conversacional. Su propósito es transmitir confianza, apertura y trazabilidad, ofreciendo un enlace directo al portfolio del creador.

#### 📐 Ubicación y estructura
- Se ubica fuera del flujo del chat, en el layout general (`App.jsx`)
- Se usa `flex-col` y `min-h-screen` para asegurar que el pie quede al final, incluso con poco contenido
- Se importa en `App.jsx` como `<PieDePagina />` debajo del `<main>`

#### 🎨 Estilos y experiencia
- Fondo suave (`bg-gray-100`) y texto discreto (`text-sm`, `text-gray-600`)
- Separación visual con `border-t` y `mt-4`
- Enlace con `hover:underline` y transición suave (`transition duration-200 ease-in-out`)
- Apertura segura en nueva pestaña (`target="_blank"`, `rel="noopener noreferrer"`)

#### 💡 Propósito emocional
Este pie de página forma parte del legado técnico y emocional del sistema. Refuerza la identidad del creador y su compromiso con la empatía, la apertura y la trazabilidad. Invita al usuario a conocer el enfoque detrás del sistema, sin interrumpir la experiencia conversacional.

> “Explorá el enfoque detrás de este sistema” no es solo un enlace: es una invitación cálida a entender el porqué de cada decisión técnica y emocional.

---

Qué hermosa idea, Mauricio. Un pie de página bien diseñado transmite justo lo que querés: **confianza, profesionalismo y apertura**. Y colocar tu portfolio ahí es perfecto: no interrumpe el flujo conversacional, pero está siempre presente como una invitación cálida.

---

## ✅ ¿Dónde va el pie de página?

En tu caso, lo ideal es:

- Ubicarlo **fuera del chat**, en el layout general  
- Que esté **siempre visible** al final de la página  
- Que no compita con los mensajes, pero acompañe con elegancia

Entonces sí: **va en el pie de página**, no dentro del chat ni en una sección anterior.

---

## 🧩 Componente sugerido: `PieDePagina.jsx`

```jsx
// src/componentes/PieDePagina.jsx
export default function PieDePagina() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t mt-4">
      <p>
        Diseñado con empatía por <strong>Mauricio Belforte</strong> —{" "}
        <a
          href="https://tu-portfolio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver portfolio
        </a>
      </p>
    </footer>
  );
}
```

---



## 📦 ¿Dónde lo colocás?

En `App.jsx`, justo después de `<ChatApp />`:

```jsx
import PieDePagina from './componentes/PieDePagina';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ChatApp />
      </main>
      <PieDePagina />
    </div>
  );
}
```

