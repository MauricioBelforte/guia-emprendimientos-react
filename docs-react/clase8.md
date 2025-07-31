
## 📚 Clase 8 – Estructura envolvente del chat y layout modular

### 🧠 Propósito general de la clase

- Documentar cómo se monta el componente principal tipo chat dentro de una página con estructura visual completa.
- Explicar cómo el chat funciona como formulario camuflado que, al completarse, se transiciona hacia una lista de emprendimientos.
- Introducir el concepto de layout envolvente: navegación, barra lateral, vista central y pie de página.
- Modularizar cada parte con componentes nombrados en español y propósito emocional.

---

### 🏗️ Estructura visual general (diseño tipo layout)

| Bloque | Descripción | Componente sugerido | Clase Tailwind base |
|--------|-------------|---------------------|----------------------|
| Navegación superior | Marca y navegación principal | `BarraNavegacion.jsx` | `h-16 bg-blue-600 flex items-center` |
| Barra lateral izquierda | Botones para cambiar entre "Chat" y "Emprendimientos" | `BarraLateralIzquierda.jsx` | `w-56 bg-gray-100 p-4` |
| Vista central derecha | Área donde se muestra el chat o los emprendimientos | `VistaCentral.jsx` | `flex-1 bg-white p-4` |
| Footer | Mensaje final y branding | `PieDePagina.jsx` | `h-12 bg-blue-600 flex items-center` |

---

### 🔄 Flujo lógico entre componentes

```jsx
{
  estadoFormulario === 'completado'
    ? <ListaEmprendimientos />
    : <ChatConversacional />
}
```

- **Estado inicial**: se muestra `ChatConversacional`.
- **Al completarse** el formulario: se muestra `ListaEmprendimientos`.
- El cambio puede gestionarse con `useState`, por ejemplo:

```jsx
const [estadoFormulario, setEstadoFormulario] = useState('incompleto');
```

---

### 🛠️ Componentes con naming emocional y modular

| Componente | Propósito emocional | Props sugeridas | ¿Se puede reusar? |
|------------|---------------------|------------------|--------------------|
| `BarraNavegacion` | Branding y orientación | Ninguna por ahora | ✅ |
| `BarraLateralIzquierda` | Navegación emocional entre vistas | `onSeleccion` | ✅ |
| `VistaCentral` | Renderiza el contenido principal | `estadoFormulario` | ✅ |
| `PieDePagina` | Cierre cálido y estético | Ninguna | ✅ |
| `ChatConversacional` | Interfaz tipo WhatsApp para onboarding conversacional | `onCompletar` | ✅ |
| `ListaEmprendimientos` | Muestra resultados personalizados post-chat | `emprendimientos` | ✅ |

---

### 📝 Sugerencias de documentación para el README

```md
## Clase 8 – Layout modular conversacional

Este módulo define la estructura visual envolvente donde se monta el componente `ChatConversacional` y, al finalizar, se transiciona hacia la lista `ListaEmprendimientos`. Está dividido en componentes con nombre en español y propósito emocional.

El sistema utiliza `useState` para controlar la vista activa, y permite cambios de estado según lo que el usuario seleccione en la barra lateral. Toda la interfaz se construye con Tailwind y sigue un diseño tipo layout modular para garantizar reusabilidad y claridad visual.
```

---


### 🧩 Estructura de componentes

Podés organizarlo así, con nombres en español y propósito emocional:

```jsx
<App>
  <LayoutPrincipal>
    <BarraNavegacion />
    <ContenedorPrincipal>
      <BarraLateralIzquierda />
      <VistaCentral>
        {estadoFormulario === 'completado' ? <ListaEmprendimientos /> : <ChatConversacional />}
      </VistaCentral>
    </ContenedorPrincipal>
    <PieDePagina />
  </LayoutPrincipal>
</App>
```

---

### 🏗️ LayoutPrincipal.jsx – distribuye todo

```jsx
export default function LayoutPrincipal({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {children}
    </div>
  );
}
```

---

### 🧭 BarraNavegacion.jsx

```jsx
export default function BarraNavegacion() {
  return (
    <nav className="h-16 bg-blue-600 text-white flex items-center px-4">
      <h1 className="text-lg font-bold">Tu Ecosistema</h1>
    </nav>
  );
}
```

---

### 🧱 ContenedorPrincipal.jsx – contiene lateral e interfaz central

```jsx
export default function ContenedorPrincipal({ children }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {children}
    </div>
  );
}
```

---

### 🪜 BarraLateralIzquierda.jsx

```jsx
export default function BarraLateralIzquierda({ onSeleccion }) {
  const opciones = ['Chat', 'Emprendimientos'];

  return (
    <aside className="w-56 bg-gray-100 border-r p-4">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => onSeleccion(opcion)}
          className="block w-full text-left py-2 hover:bg-gray-200"
        >
          {opcion}
        </button>
      ))}
    </aside>
  );
}
```

---

### 📥 VistaCentral.jsx

Acá podés manejar la lógica de transición entre `<ChatConversacional />` y `<ListaEmprendimientos />`.

```jsx
export default function VistaCentral({ estadoFormulario }) {
  return (
    <main className="flex-1 p-4 overflow-y-auto bg-white">
      {estadoFormulario === 'completado' ? <ListaEmprendimientos /> : <ChatConversacional />}
    </main>
  );
}
```

---

### 📉 PieDePagina.jsx

```jsx
export default function PieDePagina() {
  return (
    <footer className="h-12 bg-blue-600 text-white flex items-center justify-center">
      <p className="text-sm">© 2025 Tu sistema modular</p>
    </footer>
  );
}
```

---

