

## 🧩 Separación de componentes (versión inicial en español)

| Componente              | Rol principal                              | ¿Es reutilizable? | ¿Escalable? |
|------------------------|---------------------------------------------|-------------------|-------------|
| `EntradaMensaje.jsx`   | Entrada de texto del usuario                | ✅ Sí, puede usarse en cualquier flujo de input | 🛠️ Puede incluir validaciones, sugerencias, accesibilidad |
| `BurbujaMensaje.jsx`   | Visualiza cada mensaje (usuario o sistema)  | ✅ Sí, unidad visual con contexto | 🎨 Se puede personalizar por tipo, estilo, estado |
| `HistorialMensajes.jsx`| Renderiza todos los mensajes usando `BurbujaMensaje` | ⚠️ Reutilizable si se parametriza bien | 🔁 Puede adaptarse como logger, timeline o espacio de feedback |
| `ChatSimulado.jsx`     | Orquestador del flujo completo              | 🚫 No se reutiliza directamente | 🧠 Se documenta como raíz del sistema conversacional |

---


## 🧱 1. Estructura básica del componente

Creamos la carpeta componentes en la ruta:

```bash
src/componentes
```

Creamos el archivo en la carpeta de componentes:

```bash
src/componentes/EntradaMensaje.jsx
```

Y lo llenamos con esta primera versión:

```jsx
import { useState } from 'react';

function EntradaMensaje({ onEnviar }) {
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => setMensaje(e.target.value);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      onEnviar(mensaje);
      setMensaje('');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="entrada-mensaje">
      <input
        type="text"
        value={mensaje}
        onChange={manejarCambio}
        placeholder="Escribí tu mensaje..."
        className="input-texto"
      />
      <button type="submit" className="boton-enviar">
        Enviar
      </button>
    </form>
  );
}

export default EntradaMensaje;
```

---

## 📘 2. Documentación técnica defensiva

```md
# EntradaMensaje.jsx

Componente conversacional que captura el texto del usuario.

## Props
- `onEnviar (función)`: se llama cuando el usuario envía un mensaje.

## Estado interno
- `mensaje`: almacena el texto actual del input.

## Comportamiento
- El botón "Enviar" está vinculado al form, con validación básica para evitar envíos vacíos.
- El input está controlado, lo que permite agregar funcionalidades futuras como validación, autocompletado o comandos.

## Estilos recomendados (ejemplo con Tailwind)
- `entrada-mensaje`: flex, gap entre elementos, padding
- `input-texto`: border, padding, rounded
- `boton-enviar`: bg color, hover, rounded
```

---

## 💬 3. Propósito emocional

Este componente representa:
- **La voz del usuario**: su primera intención, su huella.
- **El inicio de la conversación**: el lugar donde nace el flujo.
- **Un espacio empático**: visualmente claro, sin fricción, listo para recibir ideas.

---

